import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  BookmarkPlus,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  chapter: string;
  difficulty: "easy" | "medium" | "hard";
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "A ball is thrown vertically upward with a velocity of 20 m/s from the top of a building 50m high. What is the maximum height reached by the ball from the ground?",
    options: [
      "70.4 m",
      "60.2 m",
      "80.0 m",
      "55.8 m"
    ],
    correctAnswer: 0,
    subject: "Physics",
    chapter: "Kinematics",
    difficulty: "medium"
  },
  {
    id: 2,
    text: "The hybridization of carbon in graphite is:",
    options: [
      "sp",
      "sp²",
      "sp³",
      "sp³d"
    ],
    correctAnswer: 1,
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    difficulty: "easy"
  },
  {
    id: 3,
    text: "If f(x) = x³ - 3x² + 2x, then f'(1) equals:",
    options: [
      "0",
      "-1",
      "1",
      "2"
    ],
    correctAnswer: 1,
    subject: "Mathematics",
    chapter: "Calculus",
    difficulty: "medium"
  },
  {
    id: 4,
    text: "The acceleration due to gravity at a height h from the surface of Earth is g/4. The value of h is:",
    options: [
      "R",
      "R/2",
      "2R",
      "R/4"
    ],
    correctAnswer: 0,
    subject: "Physics",
    chapter: "Gravitation",
    difficulty: "hard"
  },
  {
    id: 5,
    text: "Which of the following compounds shows optical isomerism?",
    options: [
      "CH₃CHO",
      "CH₃CHOHCOOH",
      "CH₃COOH",
      "HCOOH"
    ],
    correctAnswer: 1,
    subject: "Chemistry",
    chapter: "Stereochemistry",
    difficulty: "medium"
  },
];

export default function TestInterface() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [showPalette, setShowPalette] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const toggleMarkForReview = () => {
    const newMarked = new Set(markedForReview);
    if (newMarked.has(currentQuestion)) {
      newMarked.delete(currentQuestion);
    } else {
      newMarked.add(currentQuestion);
    }
    setMarkedForReview(newMarked);
  };

  const handleSubmit = () => {
    navigate(`/test/${testId}/analysis`, { 
      state: { 
        answers, 
        questions: sampleQuestions,
        timeTaken: 45 * 60 - timeLeft 
      } 
    });
  };

  const getQuestionStatus = (index: number) => {
    if (index === currentQuestion) return "current";
    if (markedForReview.has(index)) return "marked";
    if (answers[index] !== undefined) return "answered";
    return "unanswered";
  };

  const question = sampleQuestions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const markedCount = markedForReview.size;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary"
            >
              {showPalette ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-semibold font-display hidden sm:block">JEE Main Mock Test 5</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold",
              timeLeft < 300 ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
            )}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>

            <Button variant="gradient" onClick={() => setShowSubmitModal(true)}>
              Submit Test
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Question Palette - Sidebar */}
        <AnimatePresence>
          {(showPalette || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-72 border-r border-border bg-card/80 backdrop-blur-xl p-4 z-40 overflow-y-auto"
            >
              <h3 className="font-semibold font-display mb-4">Question Palette</h3>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="palette-btn answered w-6 h-6" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="palette-btn w-6 h-6" />
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="palette-btn marked w-6 h-6" />
                  <span>Marked ({markedCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="palette-btn current w-6 h-6" />
                  <span>Current</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {sampleQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestion(index);
                      setShowPalette(false);
                    }}
                    className={cn(
                      "palette-btn",
                      getQuestionStatus(index)
                    )}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Question Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </span>
                <span className="px-3 py-1 rounded-lg bg-secondary text-muted-foreground text-sm">
                  {question.subject}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-lg text-sm",
                  question.difficulty === "easy" && "bg-success/10 text-success",
                  question.difficulty === "medium" && "bg-warning/10 text-warning",
                  question.difficulty === "hard" && "bg-destructive/10 text-destructive"
                )}>
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
              </div>
              <Button
                variant={markedForReview.has(currentQuestion) ? "default" : "glass"}
                size="sm"
                onClick={toggleMarkForReview}
              >
                <Flag className="w-4 h-4" />
                {markedForReview.has(currentQuestion) ? "Marked" : "Mark for Review"}
              </Button>
            </div>

            {/* Question Content */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 mb-6"
            >
              <p className="text-lg leading-relaxed mb-8">{question.text}</p>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={cn(
                      "question-option w-full text-left flex items-center gap-4",
                      answers[currentQuestion] === index && "selected"
                    )}
                  >
                    <span className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm",
                      answers[currentQuestion] === index 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="glass"
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>

              <Button
                variant="gradient"
                onClick={() => setCurrentQuestion((prev) => Math.min(sampleQuestions.length - 1, prev + 1))}
                disabled={currentQuestion === sampleQuestions.length - 1}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Submit Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSubmitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 max-w-md w-full"
            >
              <h2 className="text-xl font-bold font-display mb-4">Submit Test?</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                  <span className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-5 h-5" />
                    Answered
                  </span>
                  <span className="font-bold">{answeredCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <XCircle className="w-5 h-5" />
                    Not Answered
                  </span>
                  <span className="font-bold">{sampleQuestions.length - answeredCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                  <span className="flex items-center gap-2 text-warning">
                    <Flag className="w-5 h-5" />
                    Marked for Review
                  </span>
                  <span className="font-bold">{markedCount}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="glass" className="flex-1" onClick={() => setShowSubmitModal(false)}>
                  Continue Test
                </Button>
                <Button variant="gradient" className="flex-1" onClick={handleSubmit}>
                  Submit Now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
