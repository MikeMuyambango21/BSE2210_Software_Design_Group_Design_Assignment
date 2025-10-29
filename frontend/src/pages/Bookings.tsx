import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsAPI } from '../api';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function Bookings() {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => bookingsAPI.getAll(),
  });

  const { mutate: cancelMutate } = useMutation({
    mutationFn: bookingsAPI.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    },
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {!bookings || bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 mb-4">You haven't booked any events yet.</p>
          <Link
            to="/events"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking: any) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <Link to={`/events/${booking.event.id}`} className="block mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                    {booking.event.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">{booking.event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">📅 {format(new Date(booking.event.startAt), 'MMM dd, yyyy')}</span>
                    {booking.event.location && <span>📍 {booking.event.location}</span>}
                  </div>
                  <div className="text-sm text-gray-500">
                    Status: <span className={`font-medium ${booking.status === 'going' ? 'text-green-600' : 'text-yellow-600'}`}>{booking.status}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/events/${booking.event.id}`}
                    className="flex-1 text-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md"
                  >
                    View Event
                  </Link>
                  <button
                    onClick={() => cancelMutate(booking.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Cancel RSVP
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
