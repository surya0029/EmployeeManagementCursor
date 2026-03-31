import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import EmployeeListPage from './pages/EmployeeListPage.jsx'
import EmployeeCreatePage from './pages/EmployeeCreatePage.jsx'
import EmployeeEditPage from './pages/EmployeeEditPage.jsx'
import EmployeeDetailsPage from './pages/EmployeeDetailsPage.jsx'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <div className="brand__title">Employee Management</div>
            <div className="brand__subtitle">Spring Boot + H2 + React</div>
          </div>
          <nav className="nav">
            <Link to="/employees" className="nav__link">Employees</Link>
            <Link to="/employees/new" className="btn btn--primary">Add Employee</Link>
          </nav>
        </div>
      </header>

      <main className="container main">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/new" element={<EmployeeCreatePage />} />
          <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
          <Route path="/employees/:id/edit" element={<EmployeeEditPage />} />
          <Route path="*" element={<div className="card">Not found</div>} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span className="muted">Backend: <code>{API_BASE}</code></span>
          <span className="muted">UI: <code>http://localhost:5173</code></span>
        </div>
      </footer>
    </div>
  )
}

