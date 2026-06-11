'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'

import type { Form, Service } from '@/payload-types'
import { ServiceGridClient } from '@/payloadcms/blocks/service-grid/Component.client'
import { cn } from '@/lib/utils'

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICE_FIELD_NAME = 'typeOfSupport'

const HIGH_EFFORT_URGENCY_FIELD = 'ugency'
const HIGH_EFFORT_URGENCY_VALUE = 'urgent'
const HIGH_EFFORT_SCOPE_FIELD = 'scopeSize'
const HIGH_EFFORT_SCOPE_VALUE = 'full-audit'

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputClass =
  'w-full rounded-lg border border-warm-gray-300 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-warm-gray-400 transition-colors focus:border-navy-main focus:outline-none focus:ring-2 focus:ring-navy-main/20'

const errorInputClass = 'border-red-400 focus:border-red-500 focus:ring-red-500/20'

const selectClass = cn(inputClass, 'pr-10')

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  form: Form
  services: Service[]
}

type FormField = NonNullable<Form['fields']>[number]
type FieldRow = FormField | [FormField, FormField]

// ─── Layout helpers ───────────────────────────────────────────────────────────

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

// ─── Step indicator ───────────────────────────────────────────────────────────

type StepIndicatorProps = {
  currentStep: 1 | 2
  onBack: () => void
}

function StepIndicator({ currentStep, onBack }: StepIndicatorProps) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="flex items-center gap-2">
        {/* Step 1 */}
        <div
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors',
            currentStep === 1 ? 'bg-navy text-white' : 'bg-teal text-white',
          )}
        >
          {currentStep === 2 ? (
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            '1'
          )}
        </div>
        <span className={cn('text-sm font-medium', currentStep === 1 ? 'text-navy' : 'text-teal')}>
          Select services
        </span>
      </div>

      {/* Connector */}
      <div
        className={cn(
          'h-px flex-1 transition-colors',
          currentStep === 2 ? 'bg-teal' : 'bg-warm-gray-200',
        )}
      />

      {/* Step 2 */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors',
            currentStep === 2 ? 'bg-navy text-white' : 'bg-warm-gray-200 text-warm-gray-500',
          )}
        >
          2
        </div>
        <span
          className={cn(
            'text-sm font-medium',
            currentStep === 2 ? 'text-navy' : 'text-warm-gray-400',
          )}
        >
          Your details
        </span>
      </div>

      {/* Back button — only visible on step 2 */}
      {currentStep === 2 && (
        <button
          type="button"
          onClick={onBack}
          className="ml-auto flex items-center gap-1.5 text-xs font-medium text-warm-gray-500 transition-colors hover:text-navy"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
      )}
    </div>
  )
}

// ─── Selected services summary pill strip ─────────────────────────────────────

function SelectedServicesSummary({
  selectedServices,
  onRemove,
}: {
  selectedServices: Service[]
  onRemove: (slug: string) => void
}) {
  if (selectedServices.length === 0) return null

  return (
    <div className="mb-6 rounded-lg border border-warm-gray-200 bg-warm-gray-50 px-4 py-3">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-warm-gray-400">
        Selected ({selectedServices.length})
      </p>
      <div className="flex flex-wrap gap-2">
        {selectedServices.map((svc) => (
          <span
            key={svc.slug}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
              svc.status === 'limited'
                ? 'bg-amber-light text-amber-dark'
                : 'bg-navy-tint text-navy',
            )}
          >
            {svc.title}
            {svc.status === 'limited' && <span className="opacity-70">· Limited</span>}
            <button
              type="button"
              onClick={() => onRemove(svc.slug)}
              className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100"
              aria-label={`Remove ${svc.title}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-2.5 w-2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RequestSupportForm({ form, services }: Props) {
  const router = useRouter()

  // Two-step state
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedServiceSlugs, setSelectedServiceSlugs] = useState<Set<string>>(new Set())

  // Step 2 field state
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  // Derived
  const selectedServices = services.filter((s) => selectedServiceSlugs.has(s.slug))
  const hasLimited = selectedServices.some((s) => s.status === 'limited')
  const isHighEffort =
    values[HIGH_EFFORT_URGENCY_FIELD] === HIGH_EFFORT_URGENCY_VALUE &&
    values[HIGH_EFFORT_SCOPE_FIELD] === HIGH_EFFORT_SCOPE_VALUE

  // ── Service selection ──────────────────────────────────────────────────────

  const handleSelectService = (service: Service) => {
    setSelectedServiceSlugs((prev) => {
      const next = new Set(prev)
      // Toggle: selecting an already-selected service deselects it
      if (next.has(service.slug)) {
        next.delete(service.slug)
      } else {
        next.add(service.slug)
      }
      return next
    })
  }

  const handleRemoveService = (slug: string) => {
    setSelectedServiceSlugs((prev) => {
      const next = new Set(prev)
      next.delete(slug)
      return next
    })
  }

  const handleProceedToDetails = () => {
    if (selectedServiceSlugs.size === 0) {
      // Shake / highlight handled by the empty-state below, nothing to proceed with
      return
    }
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Field change / validation ──────────────────────────────────────────────

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    for (const field of form.fields ?? []) {
      if (!('name' in field) || !field.required) continue
      // Skip the service field — handled in step 1
      if (field.name === SERVICE_FIELD_NAME) continue
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

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError(false)

    try {
      // All non-service fields
      const submissionData = Object.entries(values).map(([field, value]) => ({
        field,
        value,
      }))

      // Multi-service field: join titles into one human-readable string for {{*:table}} emails
      const serviceValue = selectedServices
        .map((s) => `${s.title}${s.status === 'limited' ? ' (Limited)' : ''}`)
        .join(', ')
      submissionData.push({ field: SERVICE_FIELD_NAME, value: serviceValue })

      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })

      if (!res.ok) throw new Error('Submission failed')

      if (form.confirmationType === 'redirect' && form.redirect?.url) {
        router.push(form.redirect.url)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Non-service form fields (step 2) ──────────────────────────────────────

  // Filter out the typeOfSupport field — it's handled by the grid in step 1
  const detailFields = (form.fields ?? []).filter(
    (f) => !('name' in f) || f.name !== SERVICE_FIELD_NAME,
  )
  const rows = groupIntoRows(detailFields)

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full" style={{ maxWidth: 860 }}>
      <StepIndicator currentStep={step} onBack={() => setStep(1)} />

      <AnimatePresence mode="wait">
        {/* ── Step 1: Service selection ── */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 text-sm text-warm-gray-500">
              Choose one or more services you need support with. You can select multiple.
            </p>

            <ServiceGridClient
              blockType="service-grid"
              services={services}
              showDeliverables={false}
              showFilterOptions={false}
              showStatusBadge={false}
              isSelectable={true}
              selectAction={handleSelectService}
              // Override card styles to show selected state — handled inside ServiceGridClient
              // Pass selected slugs so cards can reflect checked state
              selectedSlugs={selectedServiceSlugs}
              className="!px-0 !pb-0 !pt-0"
            />

            {/* Selection summary + proceed */}
            <div className="mt-8 flex flex-col gap-4">
              <SelectedServicesSummary
                selectedServices={selectedServices}
                onRemove={handleRemoveService}
              />

              {selectedServiceSlugs.size === 0 ? (
                <p className="text-center text-sm text-warm-gray-400">
                  Select at least one service to continue.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleProceedToDetails}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-mid"
                >
                  Continue with {selectedServiceSlugs.size}{' '}
                  {selectedServiceSlugs.size === 1 ? 'service' : 'services'}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Contact details ── */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Selected services recap */}
            <SelectedServicesSummary
              selectedServices={selectedServices}
              onRemove={(slug) => {
                handleRemoveService(slug)
                // If all services removed while on step 2, go back
                if (selectedServiceSlugs.size <= 1) setStep(1)
              }}
            />

            {/* Notices */}
            {hasLimited && (
              <div className="mb-5 rounded-lg border border-amber/40 bg-amber-light/60 px-4 py-3 text-sm text-amber-dark">
                <strong>
                  {selectedServices
                    .filter((s) => s.status === 'limited')
                    .map((s) => s.title)
                    .join(', ')}
                </strong>{' '}
                {selectedServices.filter((s) => s.status === 'limited').length === 1 ? 'is' : 'are'}{' '}
                currently at limited capacity. Your request will be subject to availability review
                before confirmation.
              </div>
            )}

            {isHighEffort && (
              <div className="mb-5 rounded-lg border border-warm-gray-300 bg-warm-gray-100 px-4 py-3 text-sm text-warm-gray-700">
                Due to the scope and urgency of this request, manual review will be required before
                we can confirm availability. We aim to respond within 2 business days.
              </div>
            )}

            {/* Detail fields */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {rows.map((row, rowIdx) => {
                if (Array.isArray(row)) {
                  return (
                    <div key={rowIdx} className="grid grid-cols-2 gap-4">
                      {row.map((field) => renderField(field, values, errors, handleChange))}
                    </div>
                  )
                }
                return (
                  <React.Fragment key={rowIdx}>
                    {renderField(row, values, errors, handleChange)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Field Renderer ───────────────────────────────────────────────────────────

function renderField(
  field: FormField,
  values: Record<string, string>,
  errors: Record<string, string>,
  handleChange: (name: string, value: string) => void,
): React.ReactNode {
  if (field.blockType === 'message') return null

  const name = 'name' in field ? field.name : null
  if (!name) return null

  const error = errors[name]
  const isRequired = field.required ?? false
  const label = ('label' in field ? field.label : null) ?? name

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
