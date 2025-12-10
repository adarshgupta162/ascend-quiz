import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap,
  Edit3,
  Trophy,
  Target,
  Clock,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";

const achievements = [
  { icon: Trophy, title: "Top Scorer", description: "Scored in top 5% in JEE Mock", date: "Dec 5, 2024" },
  { icon: Target, title: "Perfect Score", description: "100% in Physics Chapter Test", date: "Nov 28, 2024" },
  { icon: Clock, title: "Speed Demon", description: "Completed test 20 min early", date: "Nov 15, 2024" },
  { icon: BookOpen, title: "Consistent", description: "7-day practice streak", date: "Nov 10, 2024" },
];

const stats = [
  { label: "Tests Completed", value: "36" },
  { label: "Questions Solved", value: "1,240" },
  { label: "Study Hours", value: "128" },
  { label: "Rank Improvement", value: "+234" },
];

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 lg:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl lg:text-4xl font-bold">
                JS
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <Edit3 className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold font-display mb-1">John Student</h1>
                  <p className="text-muted-foreground">JEE Aspirant 2025</p>
                </div>
                <Button variant="glass">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-3 rounded-xl bg-secondary/50">
                    <div className="text-xl lg:text-2xl font-bold font-display gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-semibold font-display mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Full Name</div>
                  <div className="font-medium">John Student</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="font-medium">john.student@email.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="font-medium">+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Date of Birth</div>
                  <div className="font-medium">15 March 2006</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="font-medium">Mumbai, Maharashtra</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Target Exam</div>
                  <div className="font-medium">JEE Advanced 2025</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-semibold font-display mb-6">Recent Achievements</h2>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <achievement.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground mb-1">{achievement.description}</div>
                    <div className="text-xs text-muted-foreground">{achievement.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
