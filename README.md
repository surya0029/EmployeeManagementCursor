# Employee Management Application (Spring Boot + React)

This repository contains a complete full-stack Employee Management Application:

- Backend: Spring Boot + Spring Data JPA + Validation + H2 (in-memory)  
- Frontend: React (Vite) + React Router

## Backend (Spring Boot)

### Prerequisites
- Java **21** installed (`java -version`)
- Maven installed (`mvn -v`)

### Run
From the project root:

```powershell
cd .\backend
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`

### H2 Console
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:employeedb`
- Username: `sa`
- Password: *(blank)*

### REST API
- `POST /employees`
- `GET /employees`
- `GET /employees/{id}`
- `PUT /employees/{id}`
- `DELETE /employees/{id}`

Sample data is loaded automatically from `backend/src/main/resources/data.sql`.

## Frontend (React UI)

### Prerequisites
- Node.js 20+ recommended (`node -v`)
- npm (`npm -v`)

### Run
From the project root:

```powershell
cd .\frontend
npm install
npm run dev
```

UI runs at `http://localhost:5173`

### Backend URL configuration
The UI calls the backend at `http://localhost:8080` by default.
Optionally override it:

```powershell
$env:VITE_API_BASE="http://localhost:8080"
npm run dev
```

## Deploy on Render (backend + frontend)

This repo includes a Render blueprint file: `render.yaml`.

1. Push latest code to GitHub.
2. In Render, click **New +** -> **Blueprint**.
3. Connect this repo: [surya0029/EmployeeManagementCursor](https://github.com/surya0029/EmployeeManagementCursor.git).
4. Render will create:
   - `employee-management-backend` (Java web service)
   - `employee-management-frontend` (Static site)
5. After backend deploy finishes, copy backend URL (example: `https://employee-management-backend.onrender.com`).
6. Open frontend service settings and set env var:
   - `VITE_API_BASE` = your backend URL
7. Open backend service settings and set env var:
   - `APP_CORS_ALLOWED_ORIGINS` = your frontend URL
8. Redeploy frontend and backend once after setting env vars.

Notes:
- Backend uses Render `PORT` automatically via `server.port=${PORT:8080}`.
- Frontend SPA routing is handled with a rewrite rule in `render.yaml`.

