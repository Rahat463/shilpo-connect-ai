import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Briefcase, Plus, Edit, Trash2, MapPin, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface JobPost {
  id: string;
  title: string;
  description: string;
  salary_range: string | null;
  location: string | null;
  employment_type: string | null;
  status: string;
  created_at: string;
}

export default function JobPosting() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary_range: "",
    location: "",
    employment_type: "Full-time",
    requirements: [] as string[]
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("job_posts")
        .select("*")
        .eq("factory_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      toast.error("Failed to load job posts");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const jobData = {
        factory_id: user.id,
        title: formData.title,
        description: formData.description,
        salary_range: formData.salary_range,
        location: formData.location,
        employment_type: formData.employment_type,
        requirements: { skills: formData.requirements }
      };

      if (editingJob) {
        const { error } = await supabase
          .from("job_posts")
          .update(jobData)
          .eq("id", editingJob.id);

        if (error) throw error;
        toast.success("Job post updated successfully");
      } else {
        const { error } = await supabase
          .from("job_posts")
          .insert(jobData);

        if (error) throw error;
        toast.success("Job post created successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchJobs();
    } catch (error) {
      toast.error("Failed to save job post");
    }
  };

  const handleDelete = async (jobId: string) => {
    const { error } = await supabase
      .from("job_posts")
      .delete()
      .eq("id", jobId);

    if (error) {
      toast.error("Failed to delete job post");
    } else {
      setJobs(jobs.filter(j => j.id !== jobId));
      toast.success("Job post deleted");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      salary_range: "",
      location: "",
      employment_type: "Full-time",
      requirements: []
    });
    setEditingJob(null);
  };

  const openEditDialog = (job: JobPost) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      salary_range: job.salary_range || "",
      location: job.location || "",
      employment_type: job.employment_type || "Full-time",
      requirements: []
    });
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading job posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          Job Posts
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-hero" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Create Job Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingJob ? "Edit Job Post" : "Create New Job Post"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Senior Sewing Operator"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed job description..."
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Salary Range</Label>
                  <Input
                    value={formData.salary_range}
                    onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                    placeholder="BDT 18,000 - 22,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Gazipur, Dhaka"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Select value={formData.employment_type} onValueChange={(value) => setFormData({ ...formData, employment_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingJob ? "Update Job Post" : "Create Job Post"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {jobs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No job posts yet. Create your first one!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <Badge variant={job.status === "active" ? "secondary" : "outline"}>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {job.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                    )}
                    {job.salary_range && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary_range}
                      </div>
                    )}
                    {job.employment_type && (
                      <Badge variant="outline">{job.employment_type}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Posted {format(new Date(job.created_at), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => openEditDialog(job)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(job.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}