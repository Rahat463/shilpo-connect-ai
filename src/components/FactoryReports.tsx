import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Activity, BarChart3, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Feedback {
  id: string;
  rating: number;
  comments: string;
  category: string;
  created_at: string;
  from_profile: { full_name: string; position: string };
  to_profile: { full_name: string; position: string };
  feedback_type: string;
}

interface MonitoringLog {
  id: string;
  activity_type: string;
  description: string;
  status: string;
  logged_at: string;
  worker_profile: { full_name: string; department: string };
}

interface QualityAssessment {
  id: string;
  date: string;
  work_completed: number;
  quality_score: number;
  efficiency_score: number;
  comments: string;
  worker_profile: { full_name: string; position: string };
  assessor_profile: { full_name: string };
}

const FactoryReports = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [monitoringLogs, setMonitoringLogs] = useState<MonitoringLog[]>([]);
  const [qualityAssessments, setQualityAssessments] = useState<QualityAssessment[]>([]);

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      // Fetch feedbacks
      const { data: feedbackData } = await supabase
        .from("feedbacks")
        .select(`
          *,
          from_profile:profiles!from_user_id(full_name, position),
          to_profile:profiles!to_user_id(full_name, position)
        `)
        .order("created_at", { ascending: false })
        .limit(20);

      if (feedbackData) setFeedbacks(feedbackData as any);

      // Fetch monitoring logs
      const { data: logsData } = await supabase
        .from("monitoring_logs")
        .select(`
          *,
          worker_profile:profiles!worker_id(full_name, department)
        `)
        .order("logged_at", { ascending: false })
        .limit(30);

      if (logsData) setMonitoringLogs(logsData as any);

      // Fetch quality assessments
      const { data: assessmentData } = await supabase
        .from("quality_assessments")
        .select(`
          *,
          worker_profile:profiles!worker_id(full_name, position),
          assessor_profile:profiles!assessed_by(full_name)
        `)
        .order("date", { ascending: false })
        .limit(20);

      if (assessmentData) setQualityAssessments(assessmentData as any);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <Tabs defaultValue="feedbacks" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
        <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        <TabsTrigger value="quality">Quality Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="feedbacks" className="space-y-4">
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Worker Feedbacks
          </h3>

          {feedbacks.length === 0 ? (
            <p className="text-muted-foreground">No feedback submissions yet</p>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="p-4 border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{feedback.from_profile.full_name}</p>
                        <span className="text-sm text-muted-foreground">→</span>
                        <p className="text-sm text-muted-foreground">{feedback.to_profile.full_name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(feedback.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={feedback.feedback_type === "manager_to_worker" ? "default" : "secondary"}>
                        {feedback.feedback_type.replace(/_/g, " ")}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{feedback.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {feedback.category && (
                    <Badge variant="outline" className="mb-2">{feedback.category}</Badge>
                  )}
                  <p className="text-sm">{feedback.comments}</p>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </TabsContent>

      <TabsContent value="monitoring" className="space-y-4">
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Worker Monitoring Logs
          </h3>

          {monitoringLogs.length === 0 ? (
            <p className="text-muted-foreground">No monitoring logs yet</p>
          ) : (
            <div className="space-y-3">
              {monitoringLogs.map((log) => (
                <Card key={log.id} className="p-4 border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{log.worker_profile.full_name}</p>
                        <Badge variant="outline">{log.worker_profile.department}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(log.logged_at).toLocaleString()}
                      </p>
                      <p className="text-sm"><span className="font-medium">Activity:</span> {log.activity_type}</p>
                      {log.description && (
                        <p className="text-sm text-muted-foreground mt-1">{log.description}</p>
                      )}
                    </div>
                    <Badge 
                      variant={
                        log.status === "active" ? "default" : 
                        log.status === "idle" ? "secondary" : 
                        "destructive"
                      }
                    >
                      {log.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </TabsContent>

      <TabsContent value="quality" className="space-y-4">
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Quality Assessments
          </h3>

          {qualityAssessments.length === 0 ? (
            <p className="text-muted-foreground">No quality assessments yet</p>
          ) : (
            <div className="space-y-4">
              {qualityAssessments.map((assessment) => (
                <Card key={assessment.id} className="p-4 border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{assessment.worker_profile.full_name}</p>
                      <p className="text-sm text-muted-foreground">{assessment.worker_profile.position}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Assessed by {assessment.assessor_profile.full_name} • {new Date(assessment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <p className="text-2xl font-bold text-primary">{assessment.work_completed}</p>
                      <p className="text-xs text-muted-foreground">Units Completed</p>
                    </div>
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <p className="text-2xl font-bold text-primary">{assessment.quality_score}/10</p>
                      <p className="text-xs text-muted-foreground">Quality Score</p>
                    </div>
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <p className="text-2xl font-bold text-primary">{assessment.efficiency_score}/10</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>

                  {assessment.comments && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm">{assessment.comments}</p>
                    </div>
                  )}

                  {(assessment.quality_score < 5 || assessment.efficiency_score < 5) && (
                    <div className="mt-3 flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm font-medium">Needs Improvement</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default FactoryReports;
