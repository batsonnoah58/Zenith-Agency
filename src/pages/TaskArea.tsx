import * as React from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaClock, FaStar, FaSpinner } from 'react-icons/fa';
import Skeleton from '../components/Skeleton';

const initialTasks = [
  { 
    id: 1, 
    title: 'Share your referral link', 
    description: 'Invite a friend using your referral link.', 
    reward: 100, 
    completed: false, 
    details: 'Share your unique referral link with friends. You earn KSh 100 for each friend who signs up.',
    estimatedTime: '2 minutes',
    difficulty: 'Easy'
  },
  { 
    id: 2, 
    title: 'Complete profile', 
    description: 'Fill out your account profile information.', 
    reward: 30, 
    completed: true, 
    details: 'Go to your account page and complete all required profile fields.',
    estimatedTime: '5 minutes',
    difficulty: 'Easy'
  },
  { 
    id: 3, 
    title: 'Join Telegram group', 
    description: 'Join our official Telegram group for updates.', 
    reward: 20, 
    completed: false, 
    details: 'Click the link to join our Telegram group and stay updated with the latest news.',
    estimatedTime: '1 minute',
    difficulty: 'Easy'
  },
  { 
    id: 4, 
    title: 'Join Whatsapp group', 
    description: 'Join our official Whatsapp group for updates.', 
    reward: 30, 
    completed: false, 
    details: 'Click the link to join our Whatsapp group and stay updated with the latest news.',
    estimatedTime: '1 minute',
    difficulty: 'Easy'
  },
];

const TaskArea = () => {
  const [tasks, setTasks] = React.useState(initialTasks);
  const [selectedTask, setSelectedTask] = React.useState<null | typeof initialTasks[0]>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [completingTask, setCompletingTask] = React.useState<number | null>(null);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = async (id: number) => {
    setCompletingTask(id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTasks(tasks => tasks.map(task => 
      task.id === id ? { ...task, completed: true } : task
    ));
    
    setCompletingTask(null);
    toast.success('Task completed! +KSh ' + tasks.find(t => t.id === id)?.reward);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full border border-gray-100">
          <Skeleton className="w-48 h-8 mb-6" />
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-3/4 h-4 mb-6" />
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-16 h-6" />
                </div>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-3/4 h-4 mb-4" />
                <Skeleton className="w-24 h-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full border border-gray-100"
      >
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Task Area</h1>
        
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-blue-900">Daily Progress</span>
            <span className="text-blue-600 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{completedCount} of {tasks.length} tasks completed</span>
            <span>+KSh {tasks.filter(t => t.completed).reduce((sum, t) => sum + t.reward, 0)} earned</span>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-6">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 border border-gray-100 transition-all duration-200 hover:shadow-lg ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-semibold text-blue-900">{task.title}</h2>
                      {task.completed && (
                        <FaCheckCircle className="text-green-500 text-lg" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-blue-500" />
                        {task.estimatedTime}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                        {task.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{task.details}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-green-600 font-bold text-lg">+KSh {task.reward}</div>
                    <div className="text-xs text-gray-500">Reward</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className={`px-6 py-3 rounded-lg font-semibold shadow transition-all duration-200 flex items-center gap-2 ${
                      task.completed 
                        ? 'bg-green-400 text-white cursor-not-allowed' 
                        : completingTask === task.id
                          ? 'bg-blue-400 text-white cursor-not-allowed'
                          : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300 hover:scale-105'
                    }`}
                    onClick={() => handleComplete(task.id)}
                    disabled={task.completed || completingTask === task.id}
                  >
                    {completingTask === task.id ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Completing...
                      </>
                    ) : task.completed ? (
                      <>
                        <FaCheckCircle />
                        Completed
                      </>
                    ) : (
                      <>
                        <FaStar />
                        Mark as Complete
                      </>
                    )}
                  </button>
                  
                  {task.completed && (
                    <div className="text-green-600 text-sm font-medium">
                      Completed today
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completion Summary */}
        {completedCount === tasks.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center"
          >
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-900 mb-2">All tasks completed!</h3>
            <p className="text-green-700">
              Great job! You've earned KSh {tasks.reduce((sum, t) => sum + t.reward, 0)} today.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TaskArea;