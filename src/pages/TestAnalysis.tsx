import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  Brain,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Lightbulb,
  BarChart3,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { useState } from "react";
import { cn } from "@/lib/utils";

const subjectAnalysis = [
  { subject: "Physics", correct: 8, incorrect: 2, skipped: 0, accuracy: 80 },
  { subject: "Chemistry", correct: 7, incorrect: 2, skipped: 1, accuracy: 70 },
  { subject: "Mathematics", correct: 6, incorrect: 3, skipped: 1, accuracy: 60 },
];

const difficultyAnalysis = [
  { difficulty: "Easy", correct: 12, total: 15 },
  { difficulty: "Medium", correct: 7, total: 12 },
  { difficulty: "Hard", correct: 2, total: 3 },
];

const radarData = [
  { subject: "Kinematics", score: 85, fullMark: 100 },
  { subject: "Thermodynamics", score: 72, fullMark: 100 },
  { subject: "Optics", score: 90, fullMark: 100 },
  { subject: "Organic", score: 65, fullMark: 100 },
  { subject: "Calculus", score: 78, fullMark: 100 },
  { subject: "Algebra", score: 82, fullMark: 100 },
];

const aiSuggestions = [
  {
    type: "focus",
    title: "Focus on Organic Chemistry",
    description: "Your accuracy in GOC and Stereochemistry is below average. Consider revising these topics.",
    priority: "high"
  },
  {
    type: "time",
    title: "Improve Time Management",
    description: "You spent 40% more time on difficult questions. Practice timed tests to improve speed.",
    priority: "medium"
  },
  {
    type: "practice",
    title: "Practice More Integration",
    description: "You struggled with definite integrals. Try our focused practice sets.",
    priority: "medium"
  }
];

export default function TestAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  // Mock data (in real app, this would come from location.state)
  const score = 21;
  const total = 30;
  const accuracy = Math.round((score / total) * 100);
  const timeTaken = 32; // minutes
  const percentile = 87.5;

  const pieData = [
    { name: "Correct", value: 21, color: "#22c55e" },
    { name: "Incorrect", value: 7, color: "#ef4444" },
    { name: "Skipped", value: 2, color: "#6b7280" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-display">Test Analysis</h1>
            <p className="text-sm text-muted-foreground">JEE Main Mock Test 5</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/tests">
              <Button variant="glass">
                <BookOpen className="w-5 h-5" />
                More Tests
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="gradient">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Score Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 glass-card p-6 flex items-center gap-6"
          >
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-secondary"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${accuracy * 3.52} 352`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold font-display">{accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-4xl font-bold font-display mb-2">
                <span className="gradient-text">{score}</span>
                <span className="text-muted-foreground text-2xl">/{total}</span>
              </div>
              <p className="text-muted-foreground mb-4">Questions Answered Correctly</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle2 className="w-4 h-4" /> {score} Correct
                </span>
                <span className="flex items-center gap-1 text-destructive">
                  <XCircle className="w-4 h-4" /> 7 Incorrect
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  2 Skipped
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-warning" />
              <span className="text-xs text-success">Top 13%</span>
            </div>
            <div className="text-3xl font-bold font-display mb-1">{percentile}%</div>
            <div className="text-sm text-muted-foreground">Percentile</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-accent" />
              <span className="text-xs text-muted-foreground">45 min allowed</span>
            </div>
            <div className="text-3xl font-bold font-display mb-1">{timeTaken} min</div>
            <div className="text-sm text-muted-foreground">Time Taken</div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Subject Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-semibold font-display mb-6">Subject-wise Performance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectAnalysis} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                  <XAxis type="number" stroke="#888" fontSize={12} />
                  <YAxis dataKey="subject" type="category" stroke="#888" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(222, 47%, 11%)',
                      border: '1px solid hsl(217, 33%, 20%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="correct" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="incorrect" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="skipped" stackId="a" fill="#6b7280" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Difficulty Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-semibold font-display mb-6">Difficulty Breakdown</h2>
            <div className="space-y-4">
              {difficultyAnalysis.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "text-sm font-medium",
                      item.difficulty === "Easy" && "text-success",
                      item.difficulty === "Medium" && "text-warning",
                      item.difficulty === "Hard" && "text-destructive"
                    )}>
                      {item.difficulty}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.correct}/{item.total} ({Math.round((item.correct / item.total) * 100)}%)
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.correct / item.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      className={cn(
                        "h-full rounded-full",
                        item.difficulty === "Easy" && "bg-success",
                        item.difficulty === "Medium" && "bg-warning",
                        item.difficulty === "Hard" && "bg-destructive"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(222, 47%, 11%)',
                      border: '1px solid hsl(217, 33%, 20%)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold font-display">AI-Powered Recommendations</h2>
              <p className="text-sm text-muted-foreground">Personalized suggestions to improve faster</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {aiSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className={cn(
                  "p-4 rounded-xl border",
                  suggestion.priority === "high" && "border-destructive/30 bg-destructive/5",
                  suggestion.priority === "medium" && "border-warning/30 bg-warning/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    suggestion.type === "focus" && "bg-destructive/20",
                    suggestion.type === "time" && "bg-warning/20",
                    suggestion.type === "practice" && "bg-primary/20"
                  )}>
                    {suggestion.type === "focus" && <Target className="w-4 h-4 text-destructive" />}
                    {suggestion.type === "time" && <Clock className="w-4 h-4 text-warning" />}
                    {suggestion.type === "practice" && <Lightbulb className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chapter-wise Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold font-display mb-6">Chapter-wise Strengths</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888" fontSize={10} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(222, 47%, 11%)',
                    border: '1px solid hsl(217, 33%, 20%)',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
