import React, { useMemo, useState } from 'react'

function normalizeForm(value) {
  return {
    name: value?.name ?? '',
    email: value?.email ?? '',
    department: value?.department ?? '',
    salary: value?.salary ?? ''
  }
}

export default function EmployeeForm({ initialValue, onSubmit, submitLabel }) {
  const initial = useMemo(() => normalizeForm(initialValue), [initialValue])
  const [value, setValue] = useState(initial)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setFieldErrors(null)

    const payload = {
      name: value.name.trim(),
      email: value.email.trim(),
      department: value.department.trim(),
      salary: value.salary === '' ? null : Number(value.salary)
    }

    try {
      setSubmitting(true)
      await onSubmit(payload)
    } catch (err) {
      setError(err?.message ?? 'Something went wrong')
      setFieldErrors(err?.fieldErrors ?? null)
    } finally {
      setSubmitting(false)
    }
  }

  function setField(field, fieldValue) {
    setValue((v) => ({ ...v, [field]: fieldValue }))
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error ? (
        <div className="alert alert--error">
          <div className="alert__title">Request failed</div>
          <div className="alert__body">{error}</div>
        </div>
      ) : null}

      <div className="grid">
        <div className="field">
          <label className="label">Name</label>
          <input
            className="input"
            value={value.name}
            onChange={(e) => setField('name', e.target.value)}
            placeholder="e.g. Meera Iyer"
            required
          />
          {fieldErrors?.name ? <div className="field__error">{fieldErrors.name}</div> : null}
        </div>

        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={value.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="e.g. meera.iyer@example.com"
            required
          />
          {fieldErrors?.email ? <div className="field__error">{fieldErrors.email}</div> : null}
        </div>

        <div className="field">
          <label className="label">Department</label>
          <input
            className="input"
            value={value.department}
            onChange={(e) => setField('department', e.target.value)}
            placeholder="e.g. Engineering"
            required
          />
          {fieldErrors?.department ? <div className="field__error">{fieldErrors.department}</div> : null}
        </div>

        <div className="field">
          <label className="label">Salary</label>
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            value={value.salary}
            onChange={(e) => setField('salary', e.target.value)}
            placeholder="e.g. 75000"
            required
          />
          {fieldErrors?.salary ? <div className="field__error">{fieldErrors.salary}</div> : null}
        </div>
      </div>

      <div className="actions">
        <button className="btn btn--primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}

