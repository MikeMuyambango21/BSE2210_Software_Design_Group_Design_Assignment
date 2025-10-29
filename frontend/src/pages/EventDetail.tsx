import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsAPI, bookingsAPI } from '../api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventsAPI.getById(Number(id)),
    enabled: !!id,
  });

  const { mutate: rsvpMutate } = useMutation({
    mutationFn: (status: string) => bookingsAPI.create({ eventId: Number(id), status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      toast.success('RSVP created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create RSVP');
    },
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  if (!event) {
    return <div className="container mx-auto px-4 py-12 text-center">Event not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {event.imageUrl && (
            <img src={event.imageUrl} alt={event.title} className="w-full h-96 object-cover" />
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
            <p className="text-gray-700 mb-6">{event.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                <p className="text-gray-600">
                  {format(new Date(event.startAt), 'PPP p')}
                  {event.endAt && ` - ${format(new Date(event.endAt), 'p')}`}
                </p>
              </div>
              {event.location && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Organized by</h3>
                <p className="text-gray-600">{event.author?.name || event.author?.email}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Attendees</h3>
                <p className="text-gray-600">{event._count?.rsvps || 0} people attending</p>
              </div>
            </div>

            {isAuthenticated() && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => rsvpMutate('going')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
                >
                  RSVP - Going
                </button>
                <button
                  onClick={() => navigate('/events')}
                  className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-md"
                >
                  Back to Events
                </button>
              </div>
            )}
          </div>
        </div>

        {event.rsvps && event.rsvps.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendees</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {event.rsvps.map((rsvp: any) => (
                <div key={rsvp.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {(rsvp.user?.name || rsvp.user?.email || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{rsvp.user?.name || rsvp.user?.email}</p>
                    <p className="text-sm text-gray-500">{rsvp.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
