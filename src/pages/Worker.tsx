import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  User, MapPin, Briefcase, Star, TrendingUp, Clock, 
  DollarSign, Mic, Video, CheckCircle2, Upload, Search
} from "lucide-react";
import workerImage from "@/assets/worker-profile.jpg";
import WorkerFeedback from "@/components/WorkerFeedback";
import ManagerDashboard from "@/components/ManagerDashboard";
import WorkerMonitoring from "@/components/WorkerMonitoring";

const Worker = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? "Voice recording stopped" : "Voice recording started - speak in Bengali");
  };

  const handleSkillAssessment = () => {
    toast.success("Skill assessment video uploaded - AI analyzing your skills...");
  };

  const mockJobs = [
    {
      id: 1,
      title: "Senior Sewing Operator",
      factory: "Akij Textile Mills Ltd.",
      location: "Gazipur, Dhaka",
      salary: "BDT 18,000 - 22,000",
      match: 95,
      skills: ["Sewing", "Quality Control", "Pattern Making"],
      type: "Full-time"
    },
    {
      id: 2,
      title: "Cutting Machine Operator",
      factory: "Square Textiles",
      location: "Savar, Dhaka",
      salary: "BDT 16,000 - 20,000",
      match: 88,
      skills: ["Cutting", "Fabric Knowledge", "Machine Operation"],
      type: "Full-time"
    },
    {
      id: 3,
      title: "Quality Inspector",
      factory: "Beximco Textiles",
      location: "Ashulia, Dhaka",
      salary: "BDT 15,000 - 18,000",
      match: 82,
      skills: ["Quality Control", "Attention to Detail", "Documentation"],
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WorkerMonitoring />
      
      <div className="container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Worker Dashboard</h1>
          <p className="text-muted-foreground">
            Find the perfect job match powered by AI | আপনার দক্ষতা অনুযায়ী চাকরি খুঁজুন
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 shadow-soft">
              <div className="flex flex-col items-center text-center space-y-4">
                <img
                  src={workerImage}
                  alt="Worker profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                />
                <div>
                  <h3 className="font-semibold text-lg">Fatema Begum</h3>
                  <p className="text-sm text-muted-foreground">Senior Sewing Operator</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">4.8/5.0</span>
                  <span className="text-sm text-muted-foreground">(156 reviews)</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Sewing</Badge>
                <Badge>Pattern Making</Badge>
                <Badge>Quality Control</Badge>
                <Badge>Machine Operation</Badge>
              </div>
            </Card>

            <Card className="p-6 shadow-soft space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Preferences
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">Gazipur, Dhaka</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Salary:</span>
                  <span className="font-medium">BDT 18,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">5 years</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="jobs">AI Job Matches</TabsTrigger>
                <TabsTrigger value="assessment">Skill Assessment</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="manager">Manager Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6 animate-fade-in">
                <Card className="p-6 shadow-soft">
                  <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
                  <p className="text-muted-foreground mb-6">
                    Use voice input in Bengali or type your information
                  </p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name | সম্পূর্ণ নাম</Label>
                      <div className="flex gap-2">
                        <Input id="name" placeholder="Enter your name" />
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={handleVoiceInput}
                          className={isRecording ? "bg-destructive text-destructive-foreground" : ""}
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number | ফোন নম্বর</Label>
                      <Input id="phone" placeholder="+880 1XXX XXXXXX" type="tel" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location | অবস্থান</Label>
                      <Input id="location" placeholder="District, Division" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience | অভিজ্ঞতা</Label>
                      <Input id="experience" placeholder="Years" type="number" />
                    </div>

                    <Button className="w-full bg-gradient-hero">
                      Save Profile | প্রোফাইল সংরক্ষণ করুন
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="jobs" className="space-y-6 animate-fade-in">
                <Card className="p-6 shadow-soft">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Search jobs by skill or location..." />
                    </div>
                    <Button>Search</Button>
                  </div>
                </Card>

                <div className="space-y-4">
                  {mockJobs.map((job, index) => (
                    <Card 
                      key={job.id} 
                      className="p-6 shadow-soft hover:shadow-strong transition-all animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-xl font-semibold">{job.title}</h4>
                              <p className="text-muted-foreground">{job.factory}</p>
                            </div>
                            <Badge className="bg-secondary text-secondary-foreground">
                              {job.match}% Match
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.type}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="bg-gradient-hero hover:opacity-90 whitespace-nowrap">
                          Apply Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-6 animate-fade-in">
                <Card className="p-6 shadow-soft">
                  <h3 className="text-xl font-semibold mb-4">AI Skill Assessment</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload a short video demonstrating your skills. Our AI will analyze and verify your expertise.
                  </p>

                  <div className="space-y-6">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Record or Upload Video</h4>
                        <p className="text-sm text-muted-foreground">
                          Show your sewing, cutting, or other garment skills (Max 2 minutes)
                        </p>
                      </div>
                      <Button variant="outline" onClick={handleSkillAssessment}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Video
                      </Button>
                    </div>

                    <Card className="p-4 bg-accent">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                        Assessment Tips
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Ensure good lighting and clear visibility</li>
                        <li>• Demonstrate your skills step-by-step</li>
                        <li>• Show finished work quality</li>
                        <li>• Speak about your experience (optional)</li>
                      </ul>
                    </Card>

                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">AI</div>
                        <p className="text-sm text-muted-foreground">Computer Vision Analysis</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">95%</div>
                        <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">2 min</div>
                        <p className="text-sm text-muted-foreground">Processing Time</p>
                      </Card>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6 animate-fade-in">
                <WorkerFeedback />
              </TabsContent>

              <TabsContent value="manager" className="space-y-6 animate-fade-in">
                <ManagerDashboard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worker;
