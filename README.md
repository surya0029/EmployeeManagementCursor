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

