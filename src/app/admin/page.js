"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  RiUser3Line,
  RiBook2Line,
  RiMoneyDollarCircleLine,
  RiEyeLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiAddLine,
  RiArticleLine,
  RiTimeLine,
  RiCheckLine,
  RiMoreFill,
  RiGroupLine,
  RiStarLine,
  RiDashboardLine,
  RiCalendarLine,
  RiBarChartLine,
  RiUserAddLine,
  RiVideoLine,
  RiFileListLine,
  RiSettings4Line,
  RiNotification3Line,
  RiSearchLine,
  RiExchangeLine,
  RiWalletLine,
  RiMedalLine,
  RiShoppingBagLine,
  RiHeartLine,
  RiMessage2Line,
  RiShieldCheckLine,
  RiGlobalLine
} from 'react-icons/ri';

// Mock data
const mockStats = [
  {
    title: 'Total Users',
    value: '12,456',
    change: '+12.5%',
    changeType: 'positive',
    icon: RiUser3Line,
    subtext: 'Active users',
    color: 'blue'
  },
  {
    title: 'Total Comments',
    value: '156',
    change: '+8',
    changeType: 'positive',
    icon: RiBook2Line,
    subtext: 'Published courses',
    color: 'emerald'
  },
  {
    title: 'Total Blog',
    value: '15',
    change: '+18.2%',
    changeType: 'positive',
    icon: RiMoneyDollarCircleLine,
    subtext: 'This month',
    color: 'purple'
  },
  {
    title: 'Total Category',
    value: '5',
    change: '-2.4%',
    changeType: 'negative',
    icon: RiEyeLine,
    subtext: 'Last 30 days',
    color: 'amber'
  },
];

const mockRecentUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', date: '2 mins ago', avatar: 'JD', status: 'online', courses: 3 },
  { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Premium', date: '15 mins ago', avatar: 'SW', status: 'online', courses: 8 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', date: '1 hour ago', avatar: 'MJ', status: 'offline', courses: 2 },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Expert', date: '2 hours ago', avatar: 'EB', status: 'online', courses: 12 },
  { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Student', date: '3 hours ago', avatar: 'DL', status: 'away', courses: 4 },
];

const mockRecentTransactions = [
  { id: 1, user: 'John Doe', amount: '$299', type: 'Course Purchase', status: 'completed', date: '5 mins ago', method: 'Credit Card' },
  { id: 2, user: 'Sarah Wilson', amount: '$499', type: 'Premium Membership', status: 'completed', date: '1 hour ago', method: 'PayPal' },
  { id: 3, user: 'Mike Johnson', amount: '$149', type: 'Course Purchase', status: 'pending', date: '2 hours ago', method: 'Bank Transfer' },
  { id: 4, user: 'Emily Brown', amount: '$99', type: 'Course Purchase', status: 'completed', date: '3 hours ago', method: 'Credit Card' },
  { id: 5, user: 'Alex Chen', amount: '$599', type: 'Expert Session', status: 'processing', date: '4 hours ago', method: 'PayPal' },
];

const mockCourses = [
  { id: 1, title: 'Forex Trading Fundamentals', students: 2341, rating: 4.8, status: 'published', revenue: '$45,678', lessons: 24 },
  { id: 2, title: 'Advanced Stock Analysis', students: 1856, rating: 4.9, status: 'published', revenue: '$32,456', lessons: 18 },
  { id: 3, title: 'Risk Management Masterclass', students: 987, rating: 4.7, status: 'draft', revenue: '$12,345', lessons: 15 },
  { id: 4, title: 'Trading Psychology', students: 1234, rating: 4.6, status: 'published', revenue: '$23,456', lessons: 12 },
  { id: 5, title: 'Crypto Trading Strategies', students: 2345, rating: 4.9, status: 'published', revenue: '$56,789', lessons: 21 },
];

const quickActions = [
  { icon: RiAddLine, label: 'Add Course', href: '/admin/courses/add', color: 'emerald', description: 'Create new course' },
  { icon: RiArticleLine, label: 'Write Blog', href: '/admin/blog/add', color: 'blue', description: 'Share insights' },
  { icon: RiUserAddLine, label: 'Add User', href: '/admin/users/add', color: 'purple', description: 'New member' },
  { icon: RiVideoLine, label: 'Upload Video', href: '/admin/videos/add', color: 'amber', description: 'Course content' },
  { icon: RiFileListLine, label: 'Create Quiz', href: '/admin/quizzes/add', color: 'pink', description: 'Assessment' },
  { icon: RiSettings4Line, label: 'Settings', href: '/admin/settings', color: 'gray', description: 'Configure' },
];

const activityData = [
  { time: '09:00', event: 'New user registered', user: 'Sarah Wilson', icon: RiUserAddLine },
  { time: '10:30', event: 'Course purchased', user: 'Mike Johnson', icon: RiShoppingBagLine },
  { time: '11:45', event: 'New comment', user: 'Emily Brown', icon: RiMessage2Line },
  { time: '13:15', event: 'Payment received', user: 'John Doe', icon: RiMoneyDollarCircleLine },
  { time: '14:30', event: 'Course completed', user: 'David Lee', icon: RiMedalLine },
  { time: '15:45', event: 'New review', user: 'Alex Chen', icon: RiStarLine },
];

// Color configurations
const colorConfig = {
  blue: {
    bg: 'bg-blue-50',
    light: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/20'
  },
  emerald: {
    bg: 'bg-emerald-50',
    light: 'bg-emerald-100',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    gradient: 'from-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/20'
  },
  purple: {
    bg: 'bg-purple-50',
    light: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/20'
  },
  amber: {
    bg: 'bg-amber-50',
    light: 'bg-amber-100',
    text: 'text-amber-600',
    border: 'border-amber-200',
    gradient: 'from-amber-500 to-amber-600',
    shadow: 'shadow-amber-500/20'
  },
  pink: {
    bg: 'bg-pink-50',
    light: 'bg-pink-100',
    text: 'text-pink-600',
    border: 'border-pink-200',
    gradient: 'from-pink-500 to-pink-600',
    shadow: 'shadow-pink-500/20'
  },
  gray: {
    bg: 'bg-gray-50',
    light: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
    gradient: 'from-gray-500 to-gray-600',
    shadow: 'shadow-gray-500/20'
  }
};

// Custom Arrow Right Icon component
const RiArrowRightLine = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
  </svg>
);

function StatCard({ stat, index }) {
  const Icon = stat.icon;
  const isPositive = stat.changeType === 'positive';
  const colors = colorConfig[stat.color];

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-gray-100">
      {/* Decorative gradient line */}
      <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3.5 rounded-xl ${colors.bg} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`text-xl ${colors.text}`} />
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
        }`}>
          {isPositive ? <RiArrowUpLine className="text-xs" /> : <RiArrowDownLine className="text-xs" />}
          <span>{stat.change}</span>
        </div>
      </div>
      
      <div>
        <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <RiTimeLine className="text-gray-400" />
          {stat.subtext}
        </p>
      </div>
    </div>
  );
}

function QuickActionButton({ action }) {
  const Icon = action.icon;
  const colors = colorConfig[action.color];

  return (
    <Link
      href={action.href}
      className={`group relative flex items-center gap-4 p-4 ${colors.bg} rounded-xl hover:shadow-lg hover:${colors.shadow} transition-all duration-300 border ${colors.border} hover:border-transparent overflow-hidden`}
    >
      {/* Hover effect background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className={`relative p-3 rounded-xl bg-white shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300 ${colors.text}`}>
        <Icon className="text-lg" />
      </div>
      
      <div className="relative flex-1">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{action.label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
      </div>
      
      <div className={`relative opacity-0 group-hover:opacity-100 transition-opacity ${colors.text}`}>
        <RiArrowRightLine className="text-lg" />
      </div>
    </Link>
  );
}

function ActivityItem({ activity }) {
  const Icon = activity.icon;
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
      <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-white group-hover:shadow-sm transition-all">
        <Icon className="text-sm text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{activity.event}</p>
        <p className="text-xs text-gray-500 mt-0.5">{activity.user}</p>
      </div>
      <span className="text-xs text-gray-400">{activity.time}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
      
      const hour = now.getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 py-6">
      

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockStats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {quickActions.map((action) => (
          <QuickActionButton key={action.label} action={action} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Users */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-lg">
                <RiGroupLine className="text-blue-600 text-lg" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">Recent Users</h2>
            </div>
            <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All
              <RiArrowRightLine className="text-sm" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Courses</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Joined</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockRecentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-medium text-white shadow-md">
                            {user.avatar}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                            user.status === 'online' ? 'bg-emerald-500' :
                            user.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                        user.role === 'Premium' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        user.role === 'Expert' ? 'bg-purple-50 text-purple-600 border border-purple-200' :
                        'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-gray-600">{user.courses} courses</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <RiTimeLine className="text-gray-400" />
                        {user.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <RiMoreFill className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 rounded-lg">
                <RiExchangeLine className="text-purple-600 text-lg" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">Live Activity</h2>
            </div>
            <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full font-medium">Live</span>
          </div>
          
          <div className="p-4">
            {activityData.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </div>
        </div>
      </div>

      {/* Popular Courses */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-lg">
              <RiMedalLine className="text-emerald-600 text-lg" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">Popular Courses</h2>
          </div>
          <Link href="/admin/courses" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
            View All Courses
            <RiArrowRightLine className="text-sm" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Students</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Lessons</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{course.title}</p>
                    <p className="text-xs text-gray-500 mt-1">ID: CRS-{course.id.toString().padStart(3, '0')}</p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <RiGroupLine className="text-gray-400 text-sm" />
                      <span className="text-sm text-gray-600">{course.students.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    <span className="text-sm text-gray-600">{course.lessons} lessons</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1">
                      <RiStarLine className="text-amber-400 text-sm" />
                      <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                      <span className="text-xs text-gray-400">/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm font-semibold text-emerald-600">{course.revenue}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`inline-flex px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                      course.status === 'published' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/courses/${course.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                    >
                      Edit
                      <RiArrowRightLine className="text-sm" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
    </div>
  );
}