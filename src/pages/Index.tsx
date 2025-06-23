/**
 * Default index page used for new projects. Replace this with the user's actual index page.
 */
import { motion } from "framer-motion";

function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-100 flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome to Zenith Agency</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">Your project will appear here. Use the navigation to get started.</p>
        <a
          href="/"
          className="px-8 py-3 bg-yellow-400 text-blue-900 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors shadow"
        >
          Go to Home
        </a>
      </motion.div>
    </div>
  );
}

export default Index;
