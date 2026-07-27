'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button, ButtonExternal } from '@/components/ui/Button';
import { bookingWhatsappMessage, whatsappHref } from '@/lib/site';
import { daysBetween, todayIso } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface BookingVehicleOption {
  slug: string;
  name: string;
  /** Pricing tiers, so the estimate updates as dates change. */
  pricing: { minDays: number; maxDays: number | null; pricePerDay: number }[];
  deposit?: number;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function BookingForm({
  vehicles,
  defaultVehicle,
}: {
  vehicles: BookingVehicleOption[];
  /** Pre-selects the vehicle when arriving from a vehicle page. */
  defaultVehicle?: string;
}) {
  const t = useTranslations('book');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  const schema = useMemo(
    () =>
      z
        .object({
          vehicle: z.string().optional(),
          startDate: z.string().min(1, t('errors.startRequired')),
          endDate: z.string().min(1, t('errors.endRequired')),
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
          /* Honeypot: invisible to people, irresistible to bots. A filled value
             means the submission is discarded server-side. */
          website: z.string().max(0).optional(),
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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { vehicle: defaultVehicle ?? '' },
  });

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

  async function onSubmit(data: FormValues) {
    setStatus('submitting');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          locale,
          days: days > 0 ? days : undefined,
          total: estimate?.total,
        }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  /* Carries everything typed so far straight into WhatsApp, laid out as
     labelled lines so the enquiry can be read off a notification. Fields left
     blank are omitted rather than sent as empty placeholders. */
  const whatsappMessage = bookingWhatsappMessage(
    {
      name: values.name,
      phone: values.phone,
      vehicle: selected?.name,
      startDate: values.startDate,
      endDate: values.endDate,
      days: days > 0 ? days : undefined,
      total: estimate?.total,
      place: values.deliveryPlace,
    },
    locale,
  );

  if (status === 'success') {
    return (
      <div className="surface-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-whatsapp" aria-hidden />
        <h2 className="mt-4 text-[length:var(--text-h3)]">{t('successTitle')}</h2>
        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
          {t('successText')}
        </p>
        <ButtonExternal
          href={whatsappHref(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          className="mt-6"
        >
          {t('orWhatsapp')}
        </ButtonExternal>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      {/* Honeypot — hidden from people and from screen readers */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

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
            className={cn(inputClass, errors.startDate && errorClass)}
            {...register('startDate')}
          />
        </Field>

        <Field label={t('endDate')} htmlFor="endDate" error={errors.endDate?.message} required>
          <input
            id="endDate"
            type="date"
            min={values.startDate || todayIso()}
            className={cn(inputClass, errors.endDate && errorClass)}
            {...register('endDate')}
          />
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
          className={cn(inputClass, errors.name && errorClass)}
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
            className={cn(inputClass, errors.phone && errorClass)}
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

      {status === 'error' ? (
        <p className="flex items-start gap-2 rounded-lg bg-gold-50 p-3 text-sm text-gold-800 dark:bg-gold-950/40 dark:text-gold-200">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <strong className="font-semibold">{t('errorTitle')}</strong> — {t('errorText')}
          </span>
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('submitting') : t('submit')}
        </Button>

        <ButtonExternal
          href={whatsappHref(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          size="lg"
        >
          {t('orWhatsapp')}
        </ButtonExternal>
      </div>
    </form>
  );
}

const inputClass =
  'w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-[var(--text-body)] outline-none transition-colors focus:border-sea-500';

const errorClass = 'border-gold-500';

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold"
        style={{ color: 'var(--text-strong)' }}
      >
        {label}
        {required ? <span className="ml-0.5 text-gold-600">*</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-sm text-gold-700 dark:text-gold-300">
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
