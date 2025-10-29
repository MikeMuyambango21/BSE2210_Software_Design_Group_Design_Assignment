# Events App - Start Here

## 🚀 Quick Start

### Option 1: With Docker (Easiest)

1. **Install Docker Desktop** if not already installed

   - Download: <https://www.docker.com/products/docker-desktop>

2. **Start the application**

   ```powershell
   docker-compose up -d --build
   ```

3. **Access the application**

   - Frontend: <http://localhost:5173>
   - Backend: <http://localhost:3000>

4. **Stop the application**

   ```powershell
   docker-compose down
   ```

### Option 2: Manual Setup

#### Prerequisites

- Node.js 18+
- PostgreSQL 15+

#### Steps

1. **Start PostgreSQL server**

2. **Backend Setup**

   ```powershell
   cd backend
   npm install
   npx prisma migrate dev
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**

   - Frontend: <http://localhost:5173>
   - Backend: <http://localhost:3000>

## 📝 What's Implemented

✅ **Backend**

- User authentication with JWT
- CRUD operations for events
- RSVP/Booking system
- Search and pagination
- Authentication middleware
- Error handling

✅ **Frontend**

- React with TypeScript
- Tailwind CSS styling
- User authentication UI
- Event browsing and search
- Create/Edit events
- RSVP management
- My bookings page

## 🎯 Getting Started

1. **Register an account** at <http://localhost:5173/register>
2. **Browse events** at <http://localhost:5173/events>
3. **Create an event** - requires login
4. **RSVP to events** - click on any event
5. **View bookings** - see your RSVPs in "My Bookings"

## 📚 Documentation

- See `README.md` for project overview
- See `INSTALLATION.md` for detailed setup

## 🛠️ Troubleshooting

**Can't connect to database:**

- Ensure PostgreSQL is running (for manual setup)
- Or start Docker containers

**Port already in use:**

- Kill the process using the port
- Or change ports in docker-compose.yml

**Build errors:**

- Run `npm install` in both backend and frontend folders
- Run `npx prisma generate` in backend folder
