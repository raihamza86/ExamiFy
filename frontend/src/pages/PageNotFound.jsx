import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-700 text-white p-4">
      <h2 className="text-3xl font-semibold">Ooops..</h2>
      <p className="text-2xl font-semibold mt-2">
        This <span className="text-yellow-400">Page Is Not On Our Route</span>
      </p>
      <h1 className="text-7xl font-bold text-yellow-400 mt-4">404</h1>
      
      {/* Horizontal line */}
      <hr className="w-1/2 border-yellow-400 my-6" />
      
      {/* Link button back to home */}
      <Link
        to="/"
        className="px-6 py-2 bg-yellow-400 text-green-900 font-semibold rounded-md shadow-lg hover:bg-yellow-500 transition"
      >
        Back To Home Page
      </Link>
    </div>
  );
}
