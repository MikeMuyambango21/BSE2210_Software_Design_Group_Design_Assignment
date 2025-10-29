# Events App

A full-stack event management application with user authentication, event CRUD operations, and RSVP/bookings functionality.

## Features

- ✅ User authentication (Register/Login with JWT)
- ✅ CRUD operations for events
- ✅ RSVP/Booking system
- ✅ Event search and pagination
- ✅ User profile management
- ✅ Modern, responsive UI with Tailwind CSS

## Tech Stack

### Backend

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- React Query
- Tailwind CSS
- React Hot Toast

## Getting Started

### Option 1: Using Docker (Recommended)

1. **Install Docker Desktop**

   - Download from <https://www.docker.com/products/docker-desktop>

2. **Start the application**

   ```bash
   docker-compose up -d
   ```

3. **Access the application**

   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:3000>
   - Prisma Studio: `docker-compose exec backend npx prisma studio`

### Option 2: Local Development

#### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- npm or yarn

#### Backend Setup

1. **Navigate to backend folder**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file with:

   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/events_app
   JWT_SECRET=your-secret-key-change-in-production
   PORT=3000
   NODE_ENV=development
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

6. **Start the backend server**

   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend folder**

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

4. **Access the application**

   - Open <http://localhost:5173>

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Events

- `GET /api/events` - Get all events (with pagination and search)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

### Bookings/RSVPs

- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create RSVP (protected)
- `PUT /api/bookings/:id` - Update RSVP status
- `DELETE /api/bookings/:id` - Cancel RSVP

## Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── controllers/ # Business logic
│   │   ├── middleware/  # Auth & validation middleware
│   │   ├── utils/       # Utility functions
│   │   ├── db.ts        # Prisma client
│   │   ├── app.ts       # Express app setup
│   │   └── server.ts    # Server entry point
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── api/         # API client
│   │   ├── hooks/       # Custom hooks
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Database Schema

- **User**: email, password, name, role
- **Event**: title, description, location, startAt, endAt, imageUrl, published
- **RSVP**: userId, eventId, status (going/interested/not_going)

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key
PORT=3000
NODE_ENV=development
```

### Frontend Variables

```env
VITE_API_URL=http://localhost:3000
```

## Development

- Backend runs on `http://localhost:3000`
- Frontend runs on `http://localhost:5173`
- Use Prisma Studio for database management: `npx prisma studio`

## License

ISC
