import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm.jsx'
import { EmployeesApi } from '../api.js'

export default function EmployeeEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setError(null)
        setLoading(true)
        const data = await EmployeesApi.get(id)
        if (!cancelled) setEmployee(data)
      } catch (err) {
        if (!cancelled) setError(err?.message ?? 'Failed to load employee')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [id])

  async function onSubmit(payload) {
    const updated = await EmployeesApi.update(id, payload)
    navigate(`/employees/${updated.id}`)
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2 className="pageTitle">Edit Employee</h2>
          <div className="muted">Update employee information.</div>
        </div>
      </div>

      {error ? <div className="alert alert--error">{error}</div> : null}

      <div className="card">
        {loading ? (
          <div className="muted">Loading…</div>
        ) : employee ? (
          <EmployeeForm initialValue={employee} submitLabel="Save" onSubmit={onSubmit} />
        ) : null}
      </div>
    </div>
  )
}

