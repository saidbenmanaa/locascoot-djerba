'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const t = useTranslations('contactForm');
  const tb = useTranslations('book');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const schema = z.object({
    name: z.string().trim().min(2, tb('errors.nameRequired')),
    email: z.string().trim().email(tb('errors.emailInvalid')),
    message: z.string().trim().min(5),
    website: z.string().max(0).optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setStatus('submitting');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="flex items-center gap-3 rounded-xl bg-whatsapp/10 p-5 text-sm font-medium">
        <CheckCircle2 className="size-5 shrink-0 text-whatsapp" aria-hidden />
        {t('successText')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <div aria-hidden className="hidden">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div>
        <label htmlFor="contact-name" className={labelClass}>
          {t('name')}
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={cn(inputClass, errors.name && 'border-gold-500')}
          {...register('name')}
        />
        {errors.name ? (
          <p role="alert" className={errorTextClass}>
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          {t('email')}
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={cn(inputClass, errors.email && 'border-gold-500')}
          {...register('email')}
        />
        {errors.email ? (
          <p role="alert" className={errorTextClass}>
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          className={cn(inputClass, errors.message && 'border-gold-500')}
          {...register('message')}
        />
      </div>

      {status === 'error' ? (
        <p className="flex items-start gap-2 rounded-lg bg-gold-50 p-3 text-sm text-gold-800 dark:bg-gold-950/40 dark:text-gold-200">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {tb('errorText')}
        </p>
      ) : null}

      <Button type="submit" disabled={status === 'submitting'} className="justify-self-start">
        {status === 'submitting' ? tb('submitting') : t('submit')}
      </Button>
    </form>
  );
}

const labelClass = 'mb-1.5 block text-sm font-semibold text-[var(--text-strong)]';
const inputClass =
  'w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-[var(--text-body)] outline-none transition-colors focus:border-sea-500';
const errorTextClass = 'mt-1.5 text-sm text-gold-700 dark:text-gold-300';
