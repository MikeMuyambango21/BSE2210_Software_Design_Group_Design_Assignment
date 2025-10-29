import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Events App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover and join amazing events near you
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/events"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium"
          >
            Browse Events
          </Link>
          <Link
            to="/register"
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md text-lg font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
          <p className="text-gray-600">
            Browse through a wide variety of events happening around you
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold mb-2">Create Your Own</h3>
          <p className="text-gray-600">
            Organize and share your events with the community
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2">Connect</h3>
          <p className="text-gray-600">
            Meet new people and build lasting connections
          </p>
        </div>
      </div>
    </div>
  );
}
