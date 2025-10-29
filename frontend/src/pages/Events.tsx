import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventsAPI } from '../api';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function Events() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading } = useQuery({
    queryKey: ['events', page, search],
    queryFn: () => eventsAPI.getAll(page, limit, search),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Events</h1>
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-gray-500">Loading events...</div>
        </div>
      ) : data?.events?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">No events found</div>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data?.events?.map((event: any) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {event.imageUrl && (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="mr-4">📅 {format(new Date(event.startAt), 'MMM dd, yyyy')}</span>
                    {event.location && <span>📍 {event.location}</span>}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>👤 {event.author?.name || event.author?.email}</span>
                    {event._count?.rsvps > 0 && (
                      <span className="ml-4">👥 {event._count.rsvps} attendees</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {data?.pagination && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {data.pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                disabled={page === data.pagination.totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
