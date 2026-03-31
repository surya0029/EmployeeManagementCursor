import React from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm.jsx'
import { EmployeesApi } from '../api.js'

export default function EmployeeCreatePage() {
  const navigate = useNavigate()

  async function onSubmit(payload) {
    const created = await EmployeesApi.create(payload)
    navigate(`/employees/${created.id}`)
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2 className="pageTitle">Add Employee</h2>
          <div className="muted">Create a new employee record.</div>
        </div>
      </div>
      <div className="card">
        <EmployeeForm submitLabel="Create" onSubmit={onSubmit} />
      </div>
    </div>
  )
}

