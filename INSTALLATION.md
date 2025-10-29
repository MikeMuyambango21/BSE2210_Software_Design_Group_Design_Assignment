# Events App - Installation Guide

## Quick Start with Docker (Recommended)

### Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop/))

### Steps

1. **Ensure Docker Desktop is running**

2. **Start the application**

   ```bash
   docker-compose up -d
   ```

3. **View the application**

   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:3000>

4. **View logs**

   ```bash
   docker-compose logs -f
   ```

5. **Stop the application**

   ```bash
   docker-compose down
   ```

---

## Manual Setup (Without Docker)

### Required Software

- Node.js 18+ ([Download here](https://nodejs.org/))
- PostgreSQL 15+ ([Download here](https://www.postgresql.org/download/windows/))

### Database Setup

1. **Install PostgreSQL**

   - Download and install from official website
   - During installation, remember the postgres user password (default: `postgres`)

2. **Create database**

   ```bash
   psql -U postgres
   CREATE DATABASE events_app;
   \q
   ```

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   - The `.env` file should already be configured for Docker
   - For local PostgreSQL, update `backend/.env`:

   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/events_app
   JWT_SECRET=your-secret-key-change-in-production
   PORT=3000
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the backend server**

   ```bash
   npm run dev
   ```

   - Server will run on <http://localhost:3000>

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   - Frontend will run on <http://localhost:5173>

---

## Using the Application

### First Steps

1. **Open the application**

   - Visit <http://localhost:5173> (or <http://localhost:3000> if using Docker)

2. **Register a new account**

   - Click "Register" in the navigation
   - Enter your email and password
   - You'll be automatically logged in

3. **Browse events**

   - View all available events
   - Use the search bar to find specific events

4. **Create an event**

   - Click "Create Event" (requires login)
   - Fill in event details
   - Submit to create your event

5. **RSVP to events**

   - Click on any event to view details
   - Click "RSVP - Going" to book your spot
   - View your bookings in "My Bookings"

### Features

- ✅ User authentication with JWT
- ✅ Create, read, update, delete events
- ✅ Search and filter events
- ✅ RSVP/Booking system
- ✅ View event attendees
- ✅ User profile management

### API Endpoints

**Authentication:**

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

**Events:**

- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (auth required)
- `PUT /api/events/:id` - Update event (auth required)
- `DELETE /api/events/:id` - Delete event (auth required)

**Bookings:**

- `GET /api/bookings` - Get user bookings (auth required)
- `POST /api/bookings` - Create RSVP (auth required)
- `PUT /api/bookings/:id` - Update RSVP
- `DELETE /api/bookings/:id` - Cancel RSVP

---

## Troubleshooting

### Database Connection Troubleshooting

- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `psql -U postgres -l`

### Port Already in Use

- Backend (3000): Change PORT in `.env`
- Frontend (5173): Kill the process using the port

### Prisma Issues

- Run `npx prisma generate` in backend folder
- Run `npx prisma migrate dev` to apply migrations
- Reset database: `npx prisma migrate reset`

---

## Development Tools

- **Prisma Studio**: Database GUI

  ```bash
  cd backend
  npx prisma studio
  ```

- **View API docs**: Visit <http://localhost:3000/health>

---

## Need Help?

If you encounter any issues:

1. Check Docker is running (if using Docker)
2. Verify PostgreSQL is running (if not using Docker)
3. Check console logs for errors
4. Ensure all dependencies are installed (`npm install` in both folders)
