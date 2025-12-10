import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  ChevronRight,
  Zap,
  GraduationCap,
  Atom,
  Calculator,
  Leaf,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const subjects = [
  { id: "physics", name: "Physics", icon: Atom, color: "#3b82f6", tests: 45, chapters: 12 },
  { id: "chemistry", name: "Chemistry", icon: Leaf, color: "#22c55e", tests: 38, chapters: 10 },
  { id: "mathematics", name: "Mathematics", icon: Calculator, color: "#f59e0b", tests: 52, chapters: 15 },
  { id: "biology", name: "Biology", icon: GraduationCap, color: "#8b5cf6", tests: 41, chapters: 14 },
];

const tests = [
  {
    id: "1",
    name: "JEE Main Mock Test 6",
    type: "Full Length",
    subject: "All Subjects",
    questions: 90,
    duration: 180,
    difficulty: "Medium",
    attempts: 1234,
    rating: 4.8,
    isNew: true
  },
  {
    id: "2",
    name: "Physics - Wave Optics",
    type: "Chapter Test",
    subject: "Physics",
    questions: 25,
    duration: 45,
    difficulty: "Hard",
    attempts: 567,
    rating: 4.5,
    isNew: false
  },
  {
    id: "3",
    name: "Organic Chemistry - GOC",
    type: "Chapter Test",
    subject: "Chemistry",
    questions: 30,
    duration: 50,
    difficulty: "Medium",
    attempts: 892,
    rating: 4.7,
    isNew: true
  },
  {
    id: "4",
    name: "Calculus - Integration",
    type: "Chapter Test",
    subject: "Mathematics",
    questions: 20,
    duration: 40,
    difficulty: "Hard",
    attempts: 432,
    rating: 4.6,
    isNew: false
  },
  {
    id: "5",
    name: "NEET Mock Test 4",
    type: "Full Length",
    subject: "All Subjects",
    questions: 200,
    duration: 200,
    difficulty: "Medium",
    attempts: 2341,
    rating: 4.9,
    isNew: false
  },
  {
    id: "6",
    name: "Thermodynamics Mastery",
    type: "Topic Test",
    subject: "Physics",
    questions: 15,
    duration: 25,
    difficulty: "Easy",
    attempts: 789,
    rating: 4.4,
    isNew: true
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "text-success bg-success/10",
  Medium: "text-warning bg-warning/10",
  Hard: "text-destructive bg-destructive/10",
};

export default function TestLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || test.subject === selectedSubject || test.subject === "All Subjects";
    return matchesSearch && matchesSubject;
  });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold font-display mb-2">
            Test <span className="gradient-text">Library</span>
          </h1>
          <p className="text-muted-foreground">
            Choose from our comprehensive collection of tests
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {subjects.map((subject, index) => (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)}
              className={`stat-card text-left transition-all ${
                selectedSubject === subject.name ? "ring-2 ring-primary" : ""
              }`}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${subject.color}20` }}
              >
                <subject.icon className="w-6 h-6" style={{ color: subject.color }} />
              </div>
              <h3 className="font-semibold font-display mb-1">{subject.name}</h3>
              <p className="text-sm text-muted-foreground">
                {subject.tests} tests • {subject.chapters} chapters
              </p>
            </motion.button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
          <Button variant="glass" className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>

        {/* Test Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card p-6 group hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {test.type}
                  </span>
                  {test.isNew && (
                    <span className="px-2 py-1 rounded-md bg-success/10 text-success text-xs font-medium">
                      New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-warning">
                  <Star className="w-4 h-4 fill-warning" />
                  <span className="text-sm font-medium">{test.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold font-display mb-2 group-hover:text-primary transition-colors">
                {test.name}
              </h3>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {test.questions} Q
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {test.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${difficultyColors[test.difficulty]}`}>
                    {test.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {test.attempts.toLocaleString()} attempts
                  </span>
                </div>
                <Link to={`/test/${test.id}`}>
                  <Button variant="glass" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Zap className="w-4 h-4" />
                    Start
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
