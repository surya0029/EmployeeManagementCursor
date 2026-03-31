const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080'

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    ...options
  })

  if (res.status === 204) return null

  const contentType = res.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await res.json() : await res.text()

  if (!res.ok) {
    const message =
      (payload && typeof payload === 'object' && payload.message) ? payload.message : `Request failed (${res.status})`
    const fieldErrors =
      (payload && typeof payload === 'object' && payload.fieldErrors) ? payload.fieldErrors : null
    const err = new Error(message)
    err.status = res.status
    err.fieldErrors = fieldErrors
    throw err
  }

  return payload
}

export const EmployeesApi = {
  list: () => request('/employees'),
  get: (id) => request(`/employees/${id}`),
  create: (body) => request('/employees', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id) => request(`/employees/${id}`, { method: 'DELETE' })
}

