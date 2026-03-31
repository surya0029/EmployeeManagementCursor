import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmployeesApi } from '../api.js'

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  async function load() {
    try {
      setError(null)
      setLoading(true)
      const data = await EmployeesApi.list()
      setEmployees(data)
    } catch (err) {
      setError(err?.message ?? 'Failed to load employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return employees
    return employees.filter((e) =>
      [e.name, e.email, e.department].some((x) => String(x ?? '').toLowerCase().includes(q))
    )
  }, [employees, query])

  async function onDelete(id) {
    const ok = window.confirm('Delete this employee?')
    if (!ok) return
    try {
      await EmployeesApi.remove(id)
      await load()
    } catch (err) {
      alert(err?.message ?? 'Delete failed')
    }
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2 className="pageTitle">Employees</h2>
          <div className="muted">Create, edit, view, and delete employees.</div>
        </div>
        <div className="pageHeader__actions">
          <input
            className="input input--search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, department…"
          />
          <Link to="/employees/new" className="btn btn--primary">Add</Link>
        </div>
      </div>

      {error ? <div className="alert alert--error">{error}</div> : null}

      <div className="card">
        {loading ? (
          <div className="muted">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="muted">No employees found.</div>
        ) : (
          <div className="tableWrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th className="right">Salary</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <Link to={`/employees/${e.id}`} className="link">
                        {e.name}
                      </Link>
                    </td>
                    <td className="muted">{e.email}</td>
                    <td>{e.department}</td>
                    <td className="right">
                      {Number(e.salary).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                    </td>
                    <td className="right">
                      <div className="rowActions">
                        <Link className="btn btn--ghost" to={`/employees/${e.id}`}>View</Link>
                        <Link className="btn btn--ghost" to={`/employees/${e.id}/edit`}>Edit</Link>
                        <button className="btn btn--danger" onClick={() => onDelete(e.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

