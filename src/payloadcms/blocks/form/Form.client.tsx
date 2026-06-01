'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import type { Form, Service } from '@/payload-types'
import { cn } from '@/lib/utils'

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICE_FIELD_NAME = 'typeOfSupport'

// Match actual field names + option values set in the form builder
const HIGH_EFFORT_URGENCY_FIELD = 'ugency'
const HIGH_EFFORT_URGENCY_VALUE = 'urgent'
const HIGH_EFFORT_SCOPE_FIELD = 'scopeSize'
const HIGH_EFFORT_SCOPE_VALUE = 'full-audit'

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputClass =
  'w-full rounded-lg border border-warm-gray-300 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-warm-gray-400 transition-colors focus:border-navy-main focus:outline-none focus:ring-2 focus:ring-navy-main/20'

const errorInputClass = 'border-red-400 focus:border-red-500 focus:ring-red-500/20'

// Selects need extra right padding so text doesn't run under the native chevron
const selectClass = cn(inputClass, 'pr-10')

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  form: Form
  services: Service[]
}

type FormField = NonNullable<Form['fields']>[number]
type FieldRow = FormField | [FormField, FormField]

// ─── Layout helpers ───────────────────────────────────────────────────────────

/**
 * Groups fields into rows based on their width value.
 * Two consecutive 50-width fields are paired into a 2-column row.
 * A lone 50-width field (no 50-width neighbour) is rendered full-width.
 */
function groupIntoRows(fields: FormField[]): FieldRow[] {
  const rows: FieldRow[] = []
  let i = 0
  while (i < fields.length) {
    const field = fields[i]
    const width = 'width' in field ? (field.width ?? 100) : 100
    if (width === 50) {
      const next = fields[i + 1]
      const nextWidth = next && 'width' in next ? (next.width ?? 100) : 100
      if (next && nextWidth === 50) {
        rows.push([field, next] as [FormField, FormField])
        i += 2
        continue
      }
    }
    rows.push(field)
    i += 1
  }
  return rows
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RequestSupportForm({ form, services }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  // Derived state
  const selectedService = services.find((s) => s.slug === values[SERVICE_FIELD_NAME]) ?? null
  const isLimited = selectedService?.status === 'limited'
  const isHighEffort =
    values[HIGH_EFFORT_URGENCY_FIELD] === HIGH_EFFORT_URGENCY_VALUE &&
    values[HIGH_EFFORT_SCOPE_FIELD] === HIGH_EFFORT_SCOPE_VALUE

  // Pre-select service from ?service=<slug>
  useEffect(() => {
    const slug = searchParams.get('service')
    if (!slug) return
    const match = services.find((s) => s.slug === slug)
    if (match) setValues((prev) => ({ ...prev, [SERVICE_FIELD_NAME]: match.slug }))
  }, [searchParams, services])

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    for (const field of form.fields ?? []) {
      if (!('name' in field) || !field.required) continue
      const val = values[field.name] ?? ''
      if (field.blockType === 'checkbox') {
        if (val !== 'true') newErrors[field.name] = 'This field is required'
      } else if (val.trim() === '') {
        newErrors[field.name] = 'This field is required'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError(false)
    try {
      const submissionData = Object.entries(values).map(([field, value]) => {
        if (field === SERVICE_FIELD_NAME) {
          const svc = services.find((s) => s.slug === value)
          return { field, value: svc?.title ?? value }
        }
        return { field, value }
      })

      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })
      if (!res.ok) throw new Error('Submission failed')

      // Honour the form's confirmationType setting
      if (form.confirmationType === 'redirect' && form.redirect?.url) {
        router.push(form.redirect.url)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const rows = groupIntoRows(form.fields ?? [])

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 mx-auto"
      style={{ maxWidth: 600 }}
    >
      {/* Limited availability notice */}
      {isLimited && (
        <div className="rounded-lg border border-amber/40 bg-amber-light/60 px-4 py-3 text-sm text-amber-dark">
          <strong>{selectedService!.title}</strong> is currently operating at limited capacity. Your
          request will be subject to availability review before confirmation.
        </div>
      )}

      {/* High-effort warning */}
      {isHighEffort && (
        <div className="rounded-lg border border-warm-gray-300 bg-warm-gray-100 px-4 py-3 text-sm text-warm-gray-700">
          Due to the scope and urgency of this request, manual review will be required before we can
          confirm availability. We aim to respond within 2 business days.
        </div>
      )}

      {/* Field rows */}
      {rows.map((row, rowIdx) => {
        if (Array.isArray(row)) {
          return (
            <div key={rowIdx} className="grid grid-cols-2 gap-4">
              {row.map((field) => renderField(field, values, errors, handleChange, services))}
            </div>
          )
        }
        return (
          <React.Fragment key={rowIdx}>
            {renderField(row, values, errors, handleChange, services)}
          </React.Fragment>
        )
      })}

      {submitError && (
        <p className="text-sm text-red-600">
          Something went wrong — please try again or contact us directly.
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-mid disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : (form.submitButtonLabel ?? 'Submit Request')}
        </button>
      </div>
    </form>
  )
}

// ─── Field Renderer ───────────────────────────────────────────────────────────

function renderField(
  field: FormField,
  values: Record<string, string>,
  errors: Record<string, string>,
  handleChange: (name: string, value: string) => void,
  services: Service[],
): React.ReactNode {
  if (field.blockType === 'message') return null

  const name = 'name' in field ? field.name : null
  if (!name) return null

  const error = errors[name]
  const isRequired = field.required ?? false
  const label = ('label' in field ? field.label : null) ?? name

  // ── typeOfSupport: dynamic service select ──────────────────────────────────
  if (name === SERVICE_FIELD_NAME) {
    return (
      <div key={name} className="flex flex-col gap-1.5">
        <Label htmlFor={name} required={isRequired}>
          {label}
        </Label>
        <select
          id={name}
          value={values[name] ?? ''}
          onChange={(e) => handleChange(name, e.target.value)}
          className={cn(selectClass, error && errorInputClass)}
          required={isRequired}
        >
          <option value="">
            {'placeholder' in field && field.placeholder ? field.placeholder : 'Select a service…'}
          </option>
          {services.map((svc) => (
            <option key={svc.slug} value={svc.slug}>
              {svc.title}
              {svc.status === 'limited' ? ' — Limited availability' : ''}
            </option>
          ))}
        </select>
        <FieldError error={error} />
      </div>
    )
  }

  // ── text / email ───────────────────────────────────────────────────────────
  if (field.blockType === 'text' || field.blockType === 'email') {
    return (
      <div key={name} className="flex flex-col gap-1.5">
        <Label htmlFor={name} required={isRequired}>
          {label}
        </Label>
        <input
          id={name}
          type={field.blockType === 'email' ? 'email' : 'text'}
          value={values[name] ?? ''}
          onChange={(e) => handleChange(name, e.target.value)}
          className={cn(inputClass, error && errorInputClass)}
          required={isRequired}
        />
        <FieldError error={error} />
      </div>
    )
  }

  // ── textarea ───────────────────────────────────────────────────────────────
  if (field.blockType === 'textarea') {
    return (
      <div key={name} className="flex flex-col gap-1.5">
        <Label htmlFor={name} required={isRequired}>
          {label}
        </Label>
        <textarea
          id={name}
          rows={5}
          value={values[name] ?? ''}
          onChange={(e) => handleChange(name, e.target.value)}
          className={cn(inputClass, error && errorInputClass)}
          required={isRequired}
        />
        <FieldError error={error} />
      </div>
    )
  }

  // ── select (standard form builder options) ─────────────────────────────────
  if (field.blockType === 'select') {
    const placeholder = field.placeholder ?? 'Select…'
    return (
      <div key={name} className="flex flex-col gap-1.5">
        <Label htmlFor={name} required={isRequired}>
          {label}
        </Label>
        <select
          id={name}
          value={values[name] ?? ''}
          onChange={(e) => handleChange(name, e.target.value)}
          className={cn(selectClass, error && errorInputClass)}
          required={isRequired}
        >
          <option value="">{placeholder}</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <FieldError error={error} />
      </div>
    )
  }

  // ── checkbox ───────────────────────────────────────────────────────────────
  if (field.blockType === 'checkbox') {
    return (
      <div key={name} className="flex flex-col gap-1">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id={name}
            type="checkbox"
            checked={values[name] === 'true'}
            onChange={(e) => handleChange(name, e.target.checked ? 'true' : 'false')}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-warm-gray-300 accent-navy-main"
            required={isRequired}
          />
          <span className="text-sm leading-snug text-navy">
            {label}
            {isRequired && <span className="ml-1 text-red-500">*</span>}
          </span>
        </label>
        <FieldError error={error} className="ml-7" />
      </div>
    )
  }

  return null
}

// ─── Micro-components ─────────────────────────────────────────────────────────

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string
  required: boolean
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-navy">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  )
}

function FieldError({ error, className }: { error?: string; className?: string }) {
  if (!error) return null
  return <p className={cn('text-xs text-red-600', className)}>{error}</p>
}
