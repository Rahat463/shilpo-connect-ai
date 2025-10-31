import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Briefcase, Target, Clock, DollarSign } from "lucide-react";
import aiMatchingImage from "@/assets/ai-matching.jpg";

const Analytics = () => {
  const platformStats = [
    { label: "Total Workers", value: "127,450", change: "+23%", icon: Users },
    { label: "Active Factories", value: "342", change: "+15%", icon: Briefcase },
    { label: "Successful Matches", value: "89,234", change: "+31%", icon: Target },
    { label: "Avg. Match Time", value: "2.4 days", change: "-65%", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Platform Analytics</h1>
          <p className="text-muted-foreground">
            Real-time insights into ShilpoAI's impact on Bangladesh's garment industry
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {platformStats.map((stat, index) => (
            <Card 
              key={index}
              className="p-6 shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
                <span className="text-secondary text-sm font-medium">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* AI Dashboard Showcase */}
        <Card className="p-6 shadow-soft mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">AI-Powered Analytics Dashboard</h2>
          <img 
            src={aiMatchingImage} 
            alt="AI Analytics Dashboard"
            className="w-full rounded-lg shadow-strong"
          />
          <p className="text-muted-foreground mt-4">
            Our AI dashboard provides real-time insights into job matching, worker retention, and factory performance.
          </p>
        </Card>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-soft animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Worker Benefits
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Average Wage Increase</span>
                  <span className="font-medium">18.5%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Job Placement Rate</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-hero" style={{ width: "94%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Worker Satisfaction</span>
                  <span className="font-medium">4.7/5.0</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-hero" style={{ width: "94%" }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Factory Impact
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Retention Improvement</span>
                  <span className="font-medium">27.3%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: "73%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Hiring Time Reduction</span>
                  <span className="font-medium">90%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-hero" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Cost Savings</span>
                  <span className="font-medium">25.8%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-hero" style={{ width: "78%" }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ROI Breakdown */}
        <Card className="p-6 shadow-soft animate-fade-in">
          <h3 className="text-xl font-semibold mb-6">Economic Impact</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <DollarSign className="h-10 w-10 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-2">BDT 125M</div>
              <p className="text-sm text-muted-foreground">Total wages distributed</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <DollarSign className="h-10 w-10 mx-auto mb-3 text-secondary" />
              <div className="text-3xl font-bold mb-2">BDT 45M</div>
              <p className="text-sm text-muted-foreground">Factory cost savings</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <DollarSign className="h-10 w-10 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-2">BDT 12M</div>
              <p className="text-sm text-muted-foreground">Eliminated middlemen fees</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
