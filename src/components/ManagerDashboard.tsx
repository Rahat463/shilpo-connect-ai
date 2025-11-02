import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Worker {
  id: string;
  full_name: string;
  position: string;
  department: string;
}

const ManagerDashboard = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [qualityScore, setQualityScore] = useState("");
  const [efficiencyScore, setEfficiencyScore] = useState("");
  const [workCompleted, setWorkCompleted] = useState("");

  useEffect(() => {
    fetchMyWorkers();
  }, []);

  const fetchMyWorkers = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("manager_workers")
        .select(`
          worker_id,
          profiles!manager_workers_worker_id_fkey(id, full_name, position, department)
        `)
        .eq("manager_id", user.id);

      if (error) throw error;

      const workersList = data?.map((item: any) => ({
        id: item.profiles.id,
        full_name: item.profiles.full_name,
        position: item.profiles.position,
        department: item.profiles.department
      })) || [];

      setWorkers(workersList);
    } catch (error) {
      toast.error("Failed to load workers");
    }
  };

  const handleSubmitFeedback = async () => {
    if (!selectedWorker || !comments.trim() || rating === 0) {
      toast.error("Please select a worker, provide rating and comments");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login to submit feedback");
        return;
      }

      const { error } = await supabase.from("feedbacks").insert({
        from_user_id: user.id,
        to_user_id: selectedWorker,
        feedback_type: "manager_to_worker",
        rating,
        comments,
        category: "Manager Feedback"
      });

      if (error) throw error;

      toast.success("Feedback submitted successfully");
      setComments("");
      setRating(0);
      setSelectedWorker("");
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  const handleSubmitQualityAssessment = async () => {
    if (!selectedWorker || !qualityScore || !efficiencyScore) {
      toast.error("Please fill all quality assessment fields");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login to submit assessment");
        return;
      }

      const { error } = await supabase.from("quality_assessments").insert({
        worker_id: selectedWorker,
        assessed_by: user.id,
        work_completed: parseInt(workCompleted) || 0,
        quality_score: parseInt(qualityScore),
        efficiency_score: parseInt(efficiencyScore),
        comments
      });

      if (error) throw error;

      toast.success("Quality assessment submitted successfully");
      setQualityScore("");
      setEfficiencyScore("");
      setWorkCompleted("");
      setComments("");
    } catch (error) {
      toast.error("Failed to submit assessment");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          My Team
        </h3>
        
        {workers.length === 0 ? (
          <p className="text-muted-foreground">No workers assigned yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {workers.map((worker) => (
              <Card key={worker.id} className="p-4">
                <h4 className="font-semibold">{worker.full_name}</h4>
                <p className="text-sm text-muted-foreground">{worker.position}</p>
                <Badge variant="outline" className="mt-2">{worker.department}</Badge>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold mb-4">Give Feedback to Worker</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Worker</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
            >
              <option value="">Choose a worker...</option>
              {workers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Performance Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-comments">Feedback Comments</Label>
            <Textarea
              id="feedback-comments"
              placeholder="Provide constructive feedback..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            className="w-full bg-gradient-hero" 
            onClick={handleSubmitFeedback}
          >
            Submit Feedback
          </Button>
        </div>
      </Card>

      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Quality Assessment
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Worker</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
            >
              <option value="">Choose a worker...</option>
              {workers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="work-completed">Work Completed (units)</Label>
              <Input
                id="work-completed"
                type="number"
                placeholder="e.g., 50"
                value={workCompleted}
                onChange={(e) => setWorkCompleted(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality-score">Quality Score (1-10)</Label>
              <Input
                id="quality-score"
                type="number"
                min="1"
                max="10"
                placeholder="1-10"
                value={qualityScore}
                onChange={(e) => setQualityScore(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="efficiency-score">Efficiency Score (1-10)</Label>
              <Input
                id="efficiency-score"
                type="number"
                min="1"
                max="10"
                placeholder="1-10"
                value={efficiencyScore}
                onChange={(e) => setEfficiencyScore(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessment-comments">Assessment Notes</Label>
            <Textarea
              id="assessment-comments"
              placeholder="Additional notes about today's work..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            className="w-full bg-gradient-hero" 
            onClick={handleSubmitQualityAssessment}
          >
            Submit Quality Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ManagerDashboard;
