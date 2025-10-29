import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { useAuth } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function Header() {
  const { isAuthenticated, getUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    authAPI.logout();
    queryClient.clear();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const user = getUser();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Events App
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-indigo-600">
              Events
            </Link>

            {isAuthenticated() ? (
              <>
                <Link to="/create-event" className="text-gray-700 hover:text-indigo-600">
                  Create Event
                </Link>
                <Link to="/bookings" className="text-gray-700 hover:text-indigo-600">
                  My Bookings
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">{user?.name || user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
