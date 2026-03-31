import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EmployeesApi } from '../api.js'

export default function EmployeeDetailsPage() {
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

  async function onDelete() {
    const ok = window.confirm('Delete this employee?')
    if (!ok) return
    try {
      await EmployeesApi.remove(id)
      navigate('/employees')
    } catch (err) {
      alert(err?.message ?? 'Delete failed')
    }
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2 className="pageTitle">Employee Details</h2>
          <div className="muted">View employee information.</div>
        </div>
        <div className="pageHeader__actions">
          <Link to={`/employees/${id}/edit`} className="btn btn--primary">Edit</Link>
          <button className="btn btn--danger" onClick={onDelete}>Delete</button>
        </div>
      </div>

      {error ? <div className="alert alert--error">{error}</div> : null}

      <div className="card">
        {loading ? (
          <div className="muted">Loading…</div>
        ) : employee ? (
          <div className="details">
            <div className="details__row">
              <div className="details__label">Name</div>
              <div className="details__value">{employee.name}</div>
            </div>
            <div className="details__row">
              <div className="details__label">Email</div>
              <div className="details__value">{employee.email}</div>
            </div>
            <div className="details__row">
              <div className="details__label">Department</div>
              <div className="details__value">{employee.department}</div>
            </div>
            <div className="details__row">
              <div className="details__label">Salary</div>
              <div className="details__value">
                {Number(employee.salary).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

