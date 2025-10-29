# Events App is Running on Localhost

## ðŸŒ Access the Application

- **Frontend UI**: <http://localhost:5173>
- **Backend API**: <http://localhost:3000>

## ðŸš€ Getting Started

### Step 1: Register an Account

1. Open <http://localhost:5173> in your browser
2. Click "Register" in the navigation
3. Enter your email and password
4. You'll be automatically logged in

### Step 2: Explore Events

- Browse all events on the Events page
- Use the search bar to find specific events
- Click on any event to view details

### Step 3: Create Your Own Event

1. Click "Create Event" (requires login)
2. Fill in the event details:

   - Title (required)
   - Description (required)
   - Location (optional)
   - Start Date & Time (required)
   - End Date & Time (optional)
   - Image URL (optional)

3. Click "Create Event"

### Step 4: RSVP to Events

1. Browse events and click on one that interests you
2. Click "RSVP - Going" to book your spot
3. View all your bookings in "My Bookings"

## ðŸ›‘ Stopping the Servers

You'll see two PowerShell windows that were opened:

- One is running the backend server
- One is running the frontend server

**To stop the servers:**

- Close both PowerShell windows, OR
- Press `Ctrl+C` in each window

## ðŸ“ Features Available

âœ… User Registration & Login  
âœ… Browse all events with search  
âœ… Create, view, edit, and delete events  
âœ… RSVP to events  
âœ… View your bookings  
âœ… Pagination for events list  
âœ… Responsive UI with Tailwind CSS

## ðŸ—„ï¸ Database

The app uses SQLite database stored at:

- `backend/prisma/dev.db`

You can view the database using Prisma Studio:

```powershell
cd backend
npx prisma studio
```

## ðŸ”§ Troubleshooting

**If the page doesn't load:**

- Wait a few seconds for servers to fully start
- Check that both servers are running on ports 3000 and 5173
- Look for any errors in the PowerShell windows

**To restart the servers:**

1. Close both PowerShell windows
2. Run: `.\start-local.ps1` from the project root

## ðŸ“š API Documentation

**Health Check:**

- GET <http://localhost:3000/health>

**Authentication:**

- POST <http://localhost:3000/api/auth/register>
- POST <http://localhost:3000/api/auth/login>
- GET <http://localhost:3000/api/auth/me> (requires token)

**Events:**

- GET <http://localhost:3000/api/events>
- GET <http://localhost:3000/api/events/:id>
- POST <http://localhost:3000/api/events> (auth required)
- PUT <http://localhost:3000/api/events/:id> (auth required)
- DELETE <http://localhost:3000/api/events/:id> (auth required)

**Bookings:**

- GET <http://localhost:3000/api/bookings> (auth required)
- POST <http://localhost:3000/api/bookings> (auth required)
- DELETE <http://localhost:3000/api/bookings/:id> (auth required)

---

## Happy Event Planning! ðŸŽ‰
