import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/auth";

function Home() {
  const user = useAuthStore((state) => state.user);
  const features = [
    {
      icon: "👥",
      title: "Referral System",
      description: "Earn through our 3-level referral program. Invite friends and earn from their activities."
    },
    {
      icon: "📋",
      title: "Task Completion",
      description: "Complete various tasks to earn additional income and boost your earnings."
    },
    {
      icon: "💰",
      title: "Wallet Management",
      description: "Easy recharge and withdrawal system to manage your earnings efficiently."
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      description: "Monitor your referrals, earnings, and progress through our comprehensive dashboard."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "KSh 2M+", label: "Total Earnings Paid" },
    { number: "50,000+", label: "Tasks Completed" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="bg-white">
      {/* Personalized Greeting for Logged-in Users */}
      {user && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-10 border border-gray-100 text-center"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Welcome back, {user.name}!</h2>
            <p className="text-lg text-gray-700 mb-4">Glad to see you again. Here's a quick summary of your progress:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                <div className="text-xl font-bold text-blue-600 mb-1">12</div>
                <div className="text-gray-700 text-sm">Referrals</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                <div className="text-xl font-bold text-blue-600 mb-1">34</div>
                <div className="text-gray-700 text-sm">Tasks Completed</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                <div className="text-xl font-bold text-green-600 mb-1">KSh 1,200</div>
                <div className="text-gray-700 text-sm">Total Earnings</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow">Dashboard</Link>
              <Link to="/tasks" className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow">Tasks</Link>
              <Link to="/profit" className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow">Profit</Link>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 select-all text-sm">
                https://zenithagency.com/ref/{user.id}
              </span>
              <button
                className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors shadow text-sm"
                onClick={() => navigator.clipboard.writeText(`https://zenithagency.com/ref/${user.id}`)}
              >
                Copy Referral Link
              </button>
            </div>
          </motion.div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Start Earning with
              <span className="block text-yellow-300">Zenith Agency</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join thousands of users earning money through referrals and task completion. 
              Start your journey with just KSh 100 activation fee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={user ? "/tasks" : "/signup"}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg"
              >
                Get Started - KSh 100
              </Link>
              {!user && (
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-ping"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Zenith Agency?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers multiple ways to earn money with a user-friendly interface 
              and reliable payment system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Start earning in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Create your account and pay KSh 100 activation fee" },
              { step: "2", title: "Get Your Link", desc: "Receive your unique referral link to share" },
              { step: "3", title: "Invite & Earn", desc: "Share your link and earn from 3 referral levels" },
              { step: "4", title: "Complete Tasks", desc: "Do tasks for additional income and withdraw earnings" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Levels Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              3-Level Referral System
            </h2>
            <p className="text-xl text-gray-600">
              Earn from multiple levels of referrals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { level: "A", title: "Direct Referrals", desc: "Users you directly invite", color: "from-green-500 to-green-600" },
              { level: "B", title: "Second Level", desc: "Users invited by your Level A referrals", color: "from-blue-500 to-blue-600" },
              { level: "C", title: "Third Level", desc: "Users invited by your Level B referrals", color: "from-purple-500 to-purple-600" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${item.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                  {item.level}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of users who are already earning with Zenith Agency. 
              Your financial freedom starts with just KSh 100.
            </p>
            <Link
              to={user ? "/tasks" : "/signup"}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg inline-block"
            >
              Start Earning Now - KSh 100
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;