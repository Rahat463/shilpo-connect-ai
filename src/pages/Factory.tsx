import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, TrendingUp, AlertCircle, CheckCircle2, 
  Search, Filter, UserPlus, Clock, DollarSign
} from "lucide-react";
import factoryImage from "@/assets/factory-interior.jpg";

const Factory = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const mockWorkers = [
    {
      id: 1,
      name: "Fatema Begum",
      skills: ["Sewing", "Quality Control", "Pattern Making"],
      experience: "5 years",
      rating: 4.8,
      location: "Gazipur",
      salary: "BDT 18,000",
      match: 95,
      verified: true
    },
    {
      id: 2,
      name: "Rahima Khatun",
      skills: ["Cutting", "Fabric Knowledge", "Machine Operation"],
      experience: "4 years",
      rating: 4.6,
      location: "Savar",
      salary: "BDT 16,000",
      match: 88,
      verified: true
    },
    {
      id: 3,
      name: "Sultana Akter",
      skills: ["Quality Control", "Inspection", "Documentation"],
      experience: "3 years",
      rating: 4.7,
      location: "Ashulia",
      salary: "BDT 15,000",
      match: 82,
      verified: true
    }
  ];

  const attritionAlerts = [
    { worker: "Ayesha Rahman", risk: "High", reason: "Low engagement, missed shifts", days: 15 },
    { worker: "Nasrin Sultana", risk: "Medium", reason: "External job offers", days: 30 },
    { worker: "Shapla Begum", risk: "Medium", reason: "Salary dissatisfaction", days: 20 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Factory Dashboard</h1>
          <p className="text-muted-foreground">
            AI-powered workforce management and hiring platform
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="hiring">Hire Workers</TabsTrigger>
            <TabsTrigger value="analytics">Predictive Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Active Workers</span>
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-secondary mt-1">+12% from last month</p>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Retention Rate</span>
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-3xl font-bold">87.5%</div>
                <p className="text-sm text-secondary mt-1">+8% improvement</p>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Avg. Hiring Time</span>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold">3 days</div>
                <p className="text-sm text-secondary mt-1">90% reduction</p>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Cost Savings</span>
                  <DollarSign className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-3xl font-bold">25%</div>
                <p className="text-sm text-secondary mt-1">BDT 2.5M saved</p>
              </Card>
            </div>

            {/* Factory Overview */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-4">Factory Profile</h3>
                <div className="space-y-4">
                  <img
                    src={factoryImage}
                    alt="Factory interior"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Factory Name:</span>
                      <p className="font-medium">Akij Textile Mills Ltd.</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium">Gazipur, Dhaka</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capacity:</span>
                      <p className="font-medium">1,500 workers</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Specialization:</span>
                      <p className="font-medium">Garment Manufacturing</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge>ISO Certified</Badge>
                    <Badge>LEED Certified</Badge>
                    <Badge>Fair Wages</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Search Workers
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by Skills
                  </Button>
                </div>
              </Card>
            </div>

            {/* Attrition Alerts */}
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Attrition Risk Alerts
              </h3>
              <div className="space-y-3">
                {attritionAlerts.map((alert, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium">{alert.worker}</p>
                        <Badge variant={alert.risk === "High" ? "destructive" : "secondary"}>
                          {alert.risk} Risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{alert.days} days</p>
                      <p className="text-xs text-muted-foreground">until likely exit</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Alerts
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="hiring" className="space-y-6 animate-fade-in">
            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Search by skill, experience, location..." />
                </div>
                <Button>
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              {mockWorkers.map((worker, index) => (
                <Card 
                  key={worker.id}
                  className="p-6 shadow-soft hover:shadow-strong transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xl font-semibold">{worker.name}</h4>
                            {worker.verified && (
                              <CheckCircle2 className="h-5 w-5 text-secondary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {worker.experience} experience • {worker.location}
                          </p>
                        </div>
                        <Badge className="bg-secondary text-secondary-foreground">
                          {worker.match}% Match
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {worker.skills.map((skill) => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{worker.rating}</span>
                        </div>
                        <span className="text-muted-foreground">Expected: {worker.salary}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline">View Profile</Button>
                      <Button className="bg-gradient-hero hover:opacity-90">
                        Send Offer
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-soft">
                <h3 className="text-lg font-semibold mb-4">Attrition Prediction</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Month Forecast</span>
                    <span className="font-medium">8.5% attrition</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-hero" style={{ width: "15%" }}></div>
                  </div>
                  <p className="text-sm text-secondary">
                    3% improvement from AI-driven interventions
                  </p>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <h3 className="text-lg font-semibold mb-4">Workforce Efficiency</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Productivity Score</span>
                    <span className="font-medium">92/100</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: "92%" }}></div>
                  </div>
                  <p className="text-sm text-secondary">
                    15% increase since using ShilpoAI
                  </p>
                </div>
              </Card>
            </div>

            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">67%</div>
                  <p className="text-sm text-muted-foreground">Workers retained via early intervention</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">30 days</div>
                  <p className="text-sm text-muted-foreground">Average prediction window</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">89%</div>
                  <p className="text-sm text-muted-foreground">Prediction accuracy</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">Schedule retention conversations</p>
                    <p className="text-sm text-muted-foreground">
                      3 workers showing high attrition risk - engage within 7 days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">Adjust compensation packages</p>
                    <p className="text-sm text-muted-foreground">
                      Market rate analysis suggests 5% increase for senior operators
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">Expand training programs</p>
                    <p className="text-sm text-muted-foreground">
                      Workers with ongoing training show 40% lower attrition
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Factory;
