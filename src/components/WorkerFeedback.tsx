import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const WorkerFeedback = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comments.trim() || rating === 0) {
      toast.error("Please provide a rating and comments");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to submit feedback");
        return;
      }

      const { error } = await supabase.from("feedbacks").insert({
        from_user_id: user.id,
        to_user_id: user.id, // For general feedback
        feedback_type: "worker_to_worker",
        rating,
        comments,
        category: category || "General"
      });

      if (error) throw error;

      toast.success("Feedback submitted successfully");
      setComments("");
      setRating(0);
      setCategory("");
    } catch (error) {
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 shadow-soft">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        Share Your Feedback
      </h3>
      <p className="text-muted-foreground mb-6">
        Help improve our workplace by sharing your experience
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Rate Your Experience</Label>
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
          <Label>Category</Label>
          <div className="flex flex-wrap gap-2">
            {["Work Environment", "Management", "Safety", "Facilities", "General"].map((cat) => (
              <Badge
                key={cat}
                variant={category === cat ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Your Comments</Label>
          <Textarea
            id="comments"
            placeholder="Share your thoughts, suggestions, or concerns..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5}
          />
        </div>

        <Button 
          className="w-full bg-gradient-hero" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </Card>
  );
};

export default WorkerFeedback;
