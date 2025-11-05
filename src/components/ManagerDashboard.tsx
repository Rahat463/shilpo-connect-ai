import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, TrendingUp, AlertTriangle, CheckCircle2, 
  UserCheck, Clock, Target, BarChart3 
} from "lucide-react";

export default function ManagerDashboard() {
  const teamMetrics = {
    totalWorkers: 45,
    activeToday: 42,
    onLeave: 3,
    productivity: 87,
    qualityScore: 92
  };

  const workerPerformance = [
    { name: "Fatema Begum", role: "Senior Operator", productivity: 95, quality: 98, status: "excellent" },
    { name: "Rahima Khatun", role: "Machine Operator", productivity: 88, quality: 90, status: "good" },
    { name: "Sultana Akter", role: "Quality Inspector", productivity: 82, quality: 95, status: "good" },
    { name: "Ayesha Rahman", role: "Junior Operator", productivity: 65, quality: 70, status: "needs-attention" }
  ];

  const pendingTasks = [
    { title: "Approve leave requests", count: 3, urgent: true },
    { title: "Review quality assessments", count: 7, urgent: false },
    { title: "Schedule team meetings", count: 2, urgent: true },
    { title: "Process feedback forms", count: 5, urgent: false }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Manager Dashboard</h2>
        <p className="text-muted-foreground">Team management and performance overview</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Team</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">{teamMetrics.totalWorkers}</div>
        </Card>

        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Active Today</span>
            <UserCheck className="h-4 w-4 text-secondary" />
          </div>
          <div className="text-2xl font-bold">{teamMetrics.activeToday}</div>
        </Card>

        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">On Leave</span>
            <Clock className="h-4 w-4 text-accent" />
          </div>
          <div className="text-2xl font-bold">{teamMetrics.onLeave}</div>
        </Card>

        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Productivity</span>
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">{teamMetrics.productivity}%</div>
        </Card>

        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Quality Score</span>
            <BarChart3 className="h-4 w-4 text-secondary" />
          </div>
          <div className="text-2xl font-bold">{teamMetrics.qualityScore}%</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Team Performance */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Team Performance
          </h3>
          <div className="space-y-4">
            {workerPerformance.map((worker) => (
              <div key={worker.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{worker.name}</p>
                    <p className="text-sm text-muted-foreground">{worker.role}</p>
                  </div>
                  <Badge 
                    variant={worker.status === "excellent" ? "default" : worker.status === "good" ? "secondary" : "destructive"}
                  >
                    {worker.status === "excellent" ? "Excellent" : worker.status === "good" ? "Good" : "Needs Attention"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Productivity</span>
                      <span>{worker.productivity}%</span>
                    </div>
                    <Progress value={worker.productivity} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Quality</span>
                      <span>{worker.quality}%</span>
                    </div>
                    <Progress value={worker.quality} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Pending Tasks
          </h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div 
                key={task.title}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  {task.urgent && <AlertTriangle className="h-4 w-4 text-destructive" />}
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.count} pending</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <Button variant="outline" className="w-full">
            <Users className="mr-2 h-4 w-4" />
            Assign Workers
          </Button>
          <Button variant="outline" className="w-full">
            <Target className="mr-2 h-4 w-4" />
            Set Goals
          </Button>
          <Button variant="outline" className="w-full">
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="w-full">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Create Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
}
