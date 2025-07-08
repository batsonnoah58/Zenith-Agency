import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Default 404 page, displayed when a user attempts to access a non-existent route.
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 not found: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-100 flex flex-col items-center"
      >
        <h1 className="text-6xl font-extrabold mb-4 text-blue-900">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-8 py-3 bg-yellow-400 text-blue-900 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors shadow"
        >
          Return home
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
