'use client';

import { useEffect, useMemo, type MouseEvent, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { ButtonExternal } from '@/components/ui/Button';
import {
  bookingWhatsappMessage,
  deliveryFee,
  site,
  toEur,
  whatsappHref,
  type BookingMessageLabels,
} from '@/lib/site';
import { setWhatsappDraft } from '@/lib/whatsapp-draft';
import { daysBetween, todayIso } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface BookingVehicleOption {
  slug: string;
  name: string;
  /** Riders the scooter is homologated for — the most the form offers. */
  seats: number;
  /** Pricing tiers, so the estimate updates as dates change. */
  pricing: { minDays: number; maxDays: number | null; pricePerDay: number }[];
  deposit?: number;
}

const OPEN = site.openingHours.open;
const CLOSE = site.openingHours.close;

/**
 * Booking takes two steps: fill in the form, tap the button. WhatsApp opens
 * with every detail already written and the visitor only presses Send — no
 * email, no confirmation page, nothing to type twice. A second link opens
 * WhatsApp straight away for anyone who would rather not fill in the form.
 *
 * The button is a real link to wa.me, rebuilt as the visitor types, rather
 * than a script that opens WhatsApp after the check: phones open the app
 * straight from a tapped link, while a scripted window can be blocked as a
 * pop-up. Tapping it checks the form first and only stops if something
 * required is missing — the errors then show and the page moves to the first.
 */
export function BookingForm({ vehicles }: { vehicles: BookingVehicleOption[] }) {
  const t = useTranslations('book');
  const tc = useTranslations('common');
  const locale = useLocale();
  const fee = deliveryFee(locale);
  const maxRiders = Math.max(1, ...vehicles.map((vehicle) => vehicle.seats));

  const schema = useMemo(
    () =>
      z
        .object({
          vehicle: z.string().optional(),
          startDate: z.string().min(1, t('errors.startRequired')),
          endDate: z.string().min(1, t('errors.endRequired')),
          deliveryTime: z
            .string()
            .optional()
            .refine((time) => !time || (time >= OPEN && time <= CLOSE), {
              message: t('errors.deliveryTimeRange', { open: OPEN, close: CLOSE }),
            }),
          riders: z.string().optional(),
          name: z.string().trim().min(2, t('errors.nameRequired')),
          phone: z
            .string()
            .trim()
            .min(6, t('errors.phoneRequired'))
            .regex(/^[+0-9\s().-]{6,25}$/, t('errors.phoneInvalid')),
          email: z
            .string()
            .trim()
            .email(t('errors.emailInvalid'))
            .optional()
            .or(z.literal('')),
          deliveryPlace: z.string().trim().optional(),
          message: z.string().trim().max(1000).optional(),
        })
        .refine((data) => daysBetween(data.startDate, data.endDate) > 0, {
          path: ['endDate'],
          message: t('errors.endBeforeStart'),
        })
        .refine((data) => !data.startDate || data.startDate >= todayIso(), {
          path: ['startDate'],
          message: t('errors.startInPast'),
        }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicle: '',
      startDate: '',
      endDate: '',
      deliveryTime: '',
      riders: '',
      name: '',
      phone: '',
      email: '',
      deliveryPlace: '',
      message: '',
    },
  });

  // Arriving from a scooter page (/reservation?vehicle=…), that scooter is
  // already selected. Read after load, so the page itself stays static.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('vehicle');
    if (slug && vehicles.some((vehicle) => vehicle.slug === slug)) {
      setValue('vehicle', slug);
    }
  }, [vehicles, setValue]);

  const values = watch();
  const days = daysBetween(values.startDate ?? '', values.endDate ?? '');
  const selected = vehicles.find((v) => v.slug === values.vehicle);

  // Live estimate, so the visitor sees the price before committing to anything.
  const estimate = useMemo(() => {
    if (!selected || days <= 0) return null;
    const tier =
      selected.pricing.find(
        (p) => days >= p.minDays && (p.maxDays === null || days <= p.maxDays),
      ) ?? selected.pricing[selected.pricing.length - 1];
    return {
      perDay: tier.pricePerDay,
      total: tier.pricePerDay * days,
      deposit: selected.deposit ?? 0,
    };
  }, [selected, days]);

  /* Everything typed so far, laid out as labelled lines in the visitor's
     language so the request can be read off a notification. */
  const labels: BookingMessageLabels = {
    heading: t('wa.heading'),
    line: (label, value) => t('wa.line', { label, value }),
    name: t('wa.name'),
    phone: t('wa.phone'),
    email: t('wa.email'),
    vehicle: t('wa.vehicle'),
    startDate: t('wa.startDate'),
    endDate: t('wa.endDate'),
    duration: t('wa.duration'),
    total: t('wa.total'),
    delivery: t('wa.delivery'),
    deliveryPlace: t('wa.deliveryPlace'),
    deliveryTime: t('wa.deliveryTime'),
    riders: t('wa.riders'),
    language: t('wa.language'),
    message: t('wa.message'),
  };

  const bookingHref = whatsappHref(
    bookingWhatsappMessage(
      {
        name: values.name,
        phone: values.phone,
        email: values.email,
        vehicle: selected?.name ?? t('vehicleAny'),
        startDate: values.startDate,
        endDate: values.endDate,
        duration: days > 0 ? t('wa.days', { count: days }) : undefined,
        total: estimate
          ? `${estimate.total} DT (${tc('approxEur', { price: toEur(estimate.total) })})`
          : undefined,
        deliveryPlace: values.deliveryPlace,
        deliveryTime: values.deliveryTime,
        riders: values.riders,
        message: values.message,
      },
      labels,
      locale,
    ),
  );

  // The direct option opens WhatsApp without any check. It still carries
  // whatever has been typed, so switching to it never loses anything; with
  // an untouched form it opens the short greeting used across the site.
  const hasTyped = [
    values.vehicle,
    values.startDate,
    values.endDate,
    values.deliveryTime,
    values.riders,
    values.name,
    values.phone,
    values.email,
    values.deliveryPlace,
    values.message,
  ].some((value) => Boolean(value?.trim()));
  const directHref = hasTyped ? bookingHref : whatsappHref(t('whatsappMessage'));

  // The floating WhatsApp button follows the same rule while the form is open.
  useEffect(() => {
    setWhatsappDraft(directHref);
  }, [directHref]);
  useEffect(() => () => setWhatsappDraft(null), []);

  function onBookClick(event: MouseEvent<HTMLAnchorElement>) {
    // Everything required is there: let the link open WhatsApp as normal.
    if (schema.safeParse(getValues()).success) return;
    // Otherwise stay on the page, show what is missing and go to the first.
    event.preventDefault();
    void handleSubmit(() => undefined)();
  }

  /** Error and hint wiring, so screen readers announce what is wrong where. */
  function describe(name: keyof FormValues, hint = false) {
    const ids = [errors[name] ? `${name}-error` : '', hint ? `${name}-hint` : '']
      .filter(Boolean)
      .join(' ');
    return {
      'aria-invalid': errors[name] ? true : undefined,
      'aria-describedby': ids || undefined,
    } as const;
  }

  return (
    <form onSubmit={(event) => event.preventDefault()} noValidate className="grid gap-5">
      <Field label={t('vehicle')} htmlFor="vehicle">
        <select id="vehicle" className={inputClass} {...register('vehicle')}>
          <option value="">{t('vehicleAny')}</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.slug} value={vehicle.slug}>
              {vehicle.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('startDate')} htmlFor="startDate" error={errors.startDate?.message} required>
          <input
            id="startDate"
            type="date"
            min={todayIso()}
            aria-required
            className={cn(inputClass, errors.startDate && errorClass)}
            {...describe('startDate')}
            {...register('startDate')}
          />
        </Field>

        <Field label={t('endDate')} htmlFor="endDate" error={errors.endDate?.message} required>
          <input
            id="endDate"
            type="date"
            min={values.startDate || todayIso()}
            aria-required
            className={cn(inputClass, errors.endDate && errorClass)}
            {...describe('endDate')}
            {...register('endDate')}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('deliveryTime')}
          htmlFor="deliveryTime"
          error={errors.deliveryTime?.message}
          hint={t('deliveryTimeHint', { open: OPEN, close: CLOSE })}
        >
          <input
            id="deliveryTime"
            type="time"
            min={OPEN}
            max={CLOSE}
            className={cn(inputClass, errors.deliveryTime && errorClass)}
            {...describe('deliveryTime', true)}
            {...register('deliveryTime')}
          />
        </Field>

        <Field label={t('riders')} htmlFor="riders">
          <select id="riders" className={inputClass} {...register('riders')}>
            <option value="">{t('ridersAny')}</option>
            {Array.from({ length: maxRiders }, (_, index) => index + 1).map((count) => (
              <option key={count} value={String(count)}>
                {t('ridersOption', { count })}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {estimate ? (
        <div className="rounded-xl border border-dashed p-4 text-sm" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="font-semibold" style={{ color: 'var(--text-strong)' }}>
            {t('summaryTitle')}
          </p>
          <dl className="mt-2 space-y-1">
            <Row label={t('summaryDays', { count: days })} value={t('summaryRate', { price: estimate.perDay })} />
            <Row label={t('summaryTotal')} value={`${estimate.total} DT`} strong />
            {/* Its own line, never added to the dinar total */}
            <Row label={t('summaryDelivery')} value={fee} />
            {estimate.deposit > 0 ? (
              <Row label={t('summaryDeposit')} value={`${estimate.deposit} DT`} />
            ) : null}
          </dl>
          <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            {t('summaryNote')}
          </p>
        </div>
      ) : null}

      <Field label={t('name')} htmlFor="name" error={errors.name?.message} required>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={t('namePlaceholder')}
          aria-required
          className={cn(inputClass, errors.name && errorClass)}
          {...describe('name')}
          {...register('name')}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('phone')} htmlFor="phone" error={errors.phone?.message} required>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t('phonePlaceholder')}
            aria-required
            className={cn(inputClass, errors.phone && errorClass)}
            {...describe('phone')}
            {...register('phone')}
          />
        </Field>

        <Field label={t('email')} htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            className={cn(inputClass, errors.email && errorClass)}
            {...describe('email')}
            {...register('email')}
          />
        </Field>
      </div>

      <Field label={t('deliveryPlace')} htmlFor="deliveryPlace">
        <input
          id="deliveryPlace"
          type="text"
          placeholder={t('deliveryPlaceholder')}
          className={inputClass}
          {...register('deliveryPlace')}
        />
      </Field>

      <Field label={t('message')} htmlFor="message">
        <textarea
          id="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className={inputClass}
          {...register('message')}
        />
      </Field>

      <div className="grid gap-3">
        <div className="flex flex-col sm:flex-row">
          <ButtonExternal
            href={bookingHref}
            onClick={onBookClick}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
          >
            {t('submitWhatsapp')}
          </ButtonExternal>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('submitHint')}
        </p>
        <p className="text-sm">
          <a
            href={directHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-whatsapp-dark underline underline-offset-4 hover:no-underline dark:text-whatsapp"
          >
            {t('directWhatsapp')}
          </a>
        </p>
      </div>
    </form>
  );
}

/* scroll-margin keeps a field clear of the sticky header when the form moves
   to the first error. */
const inputClass =
  'w-full scroll-mt-28 rounded-xl border bg-[var(--surface)] px-4 py-3 text-[var(--text-body)] outline-none transition-colors focus:border-sea-500';

const errorClass = 'border-gold-500';

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold"
        style={{ color: 'var(--text-strong)' }}
      >
        {label}
        {required ? (
          <span aria-hidden className="ml-0.5 text-gold-600">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm text-gold-700 dark:text-gold-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt style={{ color: 'var(--text-muted)' }}>{label}</dt>
      <dd className={strong ? 'font-bold text-gold-700 dark:text-gold-300' : ''}>{value}</dd>
    </div>
  );
}
