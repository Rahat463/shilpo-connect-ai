import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Brain, Users, TrendingUp, Shield, Smartphone, Award, CheckCircle2, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-workers.jpg";
import aiMatchingImage from "@/assets/ai-matching.jpg";

const Index = () => {
  const stats = [
    { value: "4M+", label: "Target Workers" },
    { value: "4,500+", label: "Factories" },
    { value: "30-40%", label: "Turnover Reduced" },
    { value: "25%", label: "Cost Savings" },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Job Matching",
      description: "Intelligent algorithms match workers with suitable factory positions based on skills, location, and preferences."
    },
    {
      icon: Smartphone,
      title: "Voice-First Interface",
      description: "Bengali voice input for easy profile creation, making it accessible for low-literacy workers."
    },
    {
      icon: Award,
      title: "Skill Assessment",
      description: "Computer vision analyzes video demos to verify sewing and cutting skills objectively."
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast worker attrition and help factories take proactive retention measures."
    },
    {
      icon: Users,
      title: "Fair Employment",
      description: "Eliminate middlemen exploitation with direct connections and transparent wage information."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Integrated payment systems (bKash/Nagad) and verified profiles ensure trust and security."
    },
  ];

  const benefits = [
    "Reduce hiring time from 30 days to 3 days",
    "Increase worker retention by 25%",
    "15-20% wage increase for workers",
    "100% transparency in recruitment",
    "Digital skill verification",
    "Offline-first mobile design"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingChatButton />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container relative py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-accent rounded-full text-sm font-medium text-accent-foreground">
                AI-Powered Workforce Ecosystem
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Transforming Bangladesh's{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  $45B Garment Industry
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connecting 4 million+ skilled workers with factories through intelligent job matching, 
                skill assessment, and predictive analytics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-gradient-hero hover:opacity-90 shadow-strong">
                  <Link to="/worker">
                    For Workers <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/factory">For Factories</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl"></div>
              <img
                src={heroImage}
                alt="Garment workers using ShilpoAI platform"
                className="relative rounded-2xl shadow-strong w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-card border-y">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">The Challenge We're Solving</h2>
            <p className="text-xl text-muted-foreground">
              Bangladesh's garment industry faces chronic worker shortages, 30-40% annual turnover, 
              and severe skill mismatches. Factories lose millions during peak seasons, while workers 
              suffer from low transparency, unstable jobs, and middlemen exploitation.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 text-center shadow-soft hover:shadow-strong transition-all">
                <div className="text-3xl font-bold text-destructive mb-2">30-40%</div>
                <div className="text-sm text-muted-foreground">Annual Worker Turnover</div>
              </Card>
              <Card className="p-6 text-center shadow-soft hover:shadow-strong transition-all">
                <div className="text-3xl font-bold text-destructive mb-2">80%</div>
                <div className="text-sm text-muted-foreground">Female Workforce</div>
              </Card>
              <Card className="p-6 text-center shadow-soft hover:shadow-strong transition-all">
                <div className="text-3xl font-bold text-destructive mb-2">Millions</div>
                <div className="text-sm text-muted-foreground">Lost in Peak Seasons</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">Our Solution</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered platform that connects skilled workers with factories through intelligent 
              matching and transparent processes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 space-y-4 shadow-soft hover:shadow-strong transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Matching Showcase */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold">
                AI-Powered Intelligence at Work
              </h2>
              <p className="text-lg text-muted-foreground">
                Our advanced AI algorithms analyze worker profiles, skills, and preferences to create 
                perfect matches with factory requirements. Predictive analytics help prevent attrition 
                and optimize workforce planning.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in">
              <img
                src={aiMatchingImage}
                alt="AI matching dashboard"
                className="rounded-2xl shadow-strong w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Our Vision for Impact</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Empowering 4 million+ workers with transparency, fair wages, and career growth 
            opportunities while building a sustainable digital ecosystem for Bangladesh's 
            largest employment sector.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold">500K+</div>
              <div className="opacity-90">Workers in Year 1</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">500+</div>
              <div className="opacity-90">Partner Factories</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">25%</div>
              <div className="opacity-90">Retention Increase</div>
            </div>
          </div>
          <div className="pt-8">
            <Button size="lg" variant="secondary" asChild className="shadow-strong">
              <Link to="/docs">Learn More About Our Approach</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="p-12 text-center space-y-6 shadow-strong bg-gradient-card">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Workforce?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of workers and factories already benefiting from our AI-powered platform
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-hero hover:opacity-90 shadow-soft">
                <Link to="/worker">Get Started as Worker</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/factory">Register Your Factory</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SA</span>
                </div>
                <span className="font-bold text-xl">ShilpoAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-Powered Workforce Ecosystem for Bangladesh's Garment Industry
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/worker" className="hover:text-foreground">Find Jobs</Link></li>
                <li><Link to="/worker" className="hover:text-foreground">Skill Assessment</Link></li>
                <li><Link to="/worker" className="hover:text-foreground">Training</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Factories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/factory" className="hover:text-foreground">Hire Workers</Link></li>
                <li><Link to="/factory" className="hover:text-foreground">Analytics</Link></li>
                <li><Link to="/factory" className="hover:text-foreground">Integration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/docs" className="hover:text-foreground">Documentation</Link></li>
                <li><Link to="/analytics" className="hover:text-foreground">Analytics</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ShilpoAI. Built for SOLVIO AI Hackathon Phase 2.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
