import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award,
  BookOpen,
  ArrowRight,
  BarChart2,
  Zap,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const performanceData = [
  { name: "Week 1", accuracy: 65, tests: 4 },
  { name: "Week 2", accuracy: 72, tests: 6 },
  { name: "Week 3", accuracy: 68, tests: 5 },
  { name: "Week 4", accuracy: 78, tests: 7 },
  { name: "Week 5", accuracy: 82, tests: 8 },
  { name: "Week 6", accuracy: 85, tests: 6 },
];

const subjectData = [
  { name: "Physics", value: 78, color: "#3b82f6" },
  { name: "Chemistry", value: 65, color: "#8b5cf6" },
  { name: "Mathematics", value: 82, color: "#06b6d4" },
  { name: "Biology", value: 71, color: "#22c55e" },
];

const recentTests = [
  { id: 1, name: "JEE Main Mock Test 5", score: 85, total: 100, date: "Today", status: "completed" },
  { id: 2, name: "Physics Chapter Test - Waves", score: 18, total: 20, date: "Yesterday", status: "completed" },
  { id: 3, name: "Chemistry Full Syllabus", score: 72, total: 100, date: "2 days ago", status: "completed" },
  { id: 4, name: "Mathematics - Calculus", score: null, total: 30, date: "Scheduled", status: "upcoming" },
];

const stats = [
  { icon: Target, label: "Overall Accuracy", value: "78.5%", change: "+5.2%", positive: true },
  { icon: Clock, label: "Avg. Time/Question", value: "1.2 min", change: "-0.3min", positive: true },
  { icon: BookOpen, label: "Tests Completed", value: "36", change: "+8", positive: true },
  { icon: Award, label: "Percentile", value: "92.4", change: "+2.1", positive: true },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-display mb-1">
              Welcome back, <span className="gradient-text">Student</span>
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your performance
            </p>
          </div>
          <Link to="/tests">
            <Button variant="gradient">
              <Zap className="w-5 h-5" />
              Start New Test
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="stat-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-sm font-medium flex items-center gap-1 ${stat.positive ? "text-success" : "text-destructive"}`}>
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold font-display mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold font-display">Performance Trend</h2>
                <p className="text-sm text-muted-foreground">Your accuracy over the past weeks</p>
              </div>
              <select className="bg-secondary border border-border rounded-lg px-3 py-2 text-sm">
                <option>Last 6 weeks</option>
                <option>Last 3 months</option>
                <option>All time</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'hsl(222, 47%, 11%)', 
                      border: '1px solid hsl(217, 33%, 20%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorAccuracy)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Subject Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-semibold font-display mb-6">Subject Performance</h2>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {subjectData.map((subject, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: subject.color }}
                    />
                    <span>{subject.name}</span>
                  </div>
                  <span className="font-medium">{subject.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold font-display">Recent Tests</h2>
            <Link to="/attempts" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    test.status === "completed" ? "bg-success/20" : "bg-primary/20"
                  }`}>
                    {test.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Clock className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  {test.status === "completed" ? (
                    <>
                      <div className="font-bold text-lg">
                        {test.score}/{test.total}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((test.score! / test.total) * 100)}% accuracy
                      </div>
                    </>
                  ) : (
                    <Button variant="glass" size="sm">
                      Start Test
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
