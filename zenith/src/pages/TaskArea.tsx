import * as React from 'react';
import toast from 'react-hot-toast';

const initialTasks = [
  { id: 1, title: 'Share your referral link', description: 'Invite a friend using your referral link.', reward: 50, completed: false, details: 'Share your unique referral link with friends. You earn KSh 50 for each friend who signs up.' },
  { id: 2, title: 'Complete profile', description: 'Fill out your account profile information.', reward: 30, completed: true, details: 'Go to your account page and complete all required profile fields.' },
  { id: 3, title: 'Join Telegram group', description: 'Join our official Telegram group for updates.', reward: 20, completed: false, details: 'Click the link to join our Telegram group and stay updated with the latest news.' },
];

const TaskArea = () => {
  const [tasks, setTasks] = React.useState(initialTasks);
  const [selectedTask, setSelectedTask] = React.useState<null | typeof initialTasks[0]>(null);

  const handleComplete = (id: number) => {
    setTasks(tasks => tasks.map(task => task.id === id ? { ...task, completed: true } : task));
    toast.success('Task marked as complete!');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Task Area</h1>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-blue-900">Progress</span>
            <span className="text-blue-600 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="space-y-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-blue-900">{task.title}</h2>
                <span className="text-green-600 font-bold">+KSh {task.reward}</span>
              </div>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p className="text-gray-500 text-sm mb-2">{task.details}</p>
              <button
                className={`px-4 py-2 rounded font-semibold shadow transition-colors ${task.completed ? 'bg-green-400 text-white cursor-not-allowed' : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'}`}
                onClick={() => handleComplete(task.id)}
                disabled={task.completed}
              >
                {task.completed ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskArea;