import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Users, Factory, TrendingUp, Shield, Code, ExternalLink } from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8 max-w-4xl">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">ShilpoAI Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Complete guide to our AI-powered workforce ecosystem
          </p>
        </div>

        {/* Tech Stack */}
        <Card className="p-8 mb-8 shadow-soft animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            Technology Stack
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Backend</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Python</Badge>
                <Badge>Django</Badge>
                <Badge>FastAPI</Badge>
                <Badge>PostgreSQL</Badge>
                <Badge>Redis</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Mobile App</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Flutter</Badge>
                <Badge>Offline-First Architecture</Badge>
                <Badge>Bengali Voice Support</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">AI/ML Models</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>TensorFlow</Badge>
                <Badge>PyTorch</Badge>
                <Badge>Computer Vision</Badge>
                <Badge>Hugging Face Transformers</Badge>
                <Badge>Scikit-learn</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Integrations</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>bKash API</Badge>
                <Badge>Nagad API</Badge>
                <Badge>Google Speech-to-Text (Bengali)</Badge>
                <Badge>Factory HR Systems</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Problem & Solution */}
        <Card className="p-8 mb-8 shadow-soft animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Problem Statement
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Bangladesh's $45B+ garment industry, the backbone of our economy, faces chronic worker 
              shortages, 30-40% annual turnover, and severe skill mismatches. Factories lose millions 
              during peak seasons, while workers suffer from low transparency, unstable jobs, and 
              middlemen exploitation who charge hidden fees.
            </p>
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Key Challenges:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>4 million+ workers, 80% women, facing job instability</li>
                <li>30-40% annual turnover costing factories millions</li>
                <li>Middlemen exploitation with hidden fees</li>
                <li>Skill mismatches and verification challenges</li>
                <li>Low transparency in recruitment processes</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Solution Overview */}
        <Card className="p-8 mb-8 shadow-soft animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Proposed Solution</h2>
          <p className="text-muted-foreground mb-4">
            ShilpoAI is an AI-powered workforce ecosystem that connects skilled garment workers with 
            factories through intelligent job matching, skill assessment, and predictive analytics.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="workers">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>For Workers</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 ml-7 text-muted-foreground">
                  <li>• Create profiles via smartphone with Bengali voice input</li>
                  <li>• Computer vision evaluates skills through short video demos</li>
                  <li>• AI-based job matching based on skill, location, and wage preferences</li>
                  <li>• Access to micro-learning modules for upskilling</li>
                  <li>• Direct integration with bKash/Nagad for payments</li>
                  <li>• Offline-first design for low-connectivity areas</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="factories">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Factory className="h-5 w-5 text-primary" />
                  <span>For Factories</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 ml-7 text-muted-foreground">
                  <li>• Intelligent candidate matching with verified skills</li>
                  <li>• Predictive analytics for worker attrition</li>
                  <li>• Reduce hiring time from 30 days to 3 days</li>
                  <li>• Integration with existing HR and attendance systems</li>
                  <li>• 25% cost savings through efficient recruitment</li>
                  <li>• Real-time workforce analytics and insights</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ai">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>AI & Automation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 ml-7 text-muted-foreground">
                  <li>• <strong>Computer Vision:</strong> Video-based skill verification using TensorFlow/PyTorch</li>
                  <li>• <strong>NLP:</strong> Bengali voice processing with Hugging Face Transformers</li>
                  <li>• <strong>Predictive Analytics:</strong> Worker attrition forecasting with 89% accuracy</li>
                  <li>• <strong>Recommendation System:</strong> Collaborative filtering for job matching</li>
                  <li>• <strong>Speech Recognition:</strong> Google Speech-to-Text for Bengali language</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Impact Metrics */}
        <Card className="p-8 mb-8 shadow-soft animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Projected Impact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Worker Benefits
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 500,000+ workers in first year (expanding to 4 million)</li>
                <li>• 15-20% average wage increase</li>
                <li>• 100% transparency in recruitment</li>
                <li>• Career growth through upskilling</li>
                <li>• Financial inclusion via mobile payments</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Factory className="h-5 w-5 text-primary" />
                Factory Benefits
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 500+ factories in first year</li>
                <li>• 90% reduction in hiring time</li>
                <li>• 25% reduction in turnover-related costs</li>
                <li>• Improved workforce planning</li>
                <li>• Higher productivity and efficiency</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Implementation Phases */}
        <Card className="p-8 mb-8 shadow-soft animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Implementation Roadmap</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">Phase 1: Pilot (6 months)</h3>
              <p className="text-sm text-muted-foreground">
                Launch with 50 factories in Dhaka/Gazipur region. Test core features and gather feedback.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h3 className="font-semibold mb-1">Phase 2: Expansion (12 months)</h3>
              <p className="text-sm text-muted-foreground">
                Scale to 500+ factories. Introduce gig-work and freelance garment services.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">Phase 3: Diversification (18 months)</h3>
              <p className="text-sm text-muted-foreground">
                Extend to textile, leather, and footwear industries across Bangladesh.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h3 className="font-semibold mb-1">Phase 4: International (24+ months)</h3>
              <p className="text-sm text-muted-foreground">
                Export model to India, Vietnam, and Cambodia's garment sectors.
              </p>
            </div>
          </div>
        </Card>

        {/* Security & Sustainability */}
        <Card className="p-8 mb-8 shadow-soft animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Security & Sustainability
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Data Security</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>End-to-end encryption for all personal data</li>
                <li>GDPR-compliant data handling practices</li>
                <li>Secure payment integration with bKash/Nagad</li>
                <li>Regular security audits and penetration testing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Sustainability</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Revenue model: Factory subscriptions + commission on successful hires</li>
                <li>Micro-learning course fees for skill development</li>
                <li>Long-term partnerships with BGMEA and BKMEA</li>
                <li>Social impact measurement and reporting</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Evaluation Criteria */}
        <Card className="p-8 mb-8 shadow-soft animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">SOLVIO AI Hackathon Evaluation</h2>
          <p className="text-muted-foreground mb-4">
            This prototype addresses all evaluation criteria for Phase 2:
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">Solution Journey</span>
              <Badge>15%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">Prototype Execution</span>
              <Badge>20%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">AI/Automation</span>
              <Badge>20%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">Sustainability</span>
              <Badge>10%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">Documentation & Database</span>
              <Badge>10%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">UI/UX</span>
              <Badge>10%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">Feasibility & Scalability</span>
              <Badge>10%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">Pitch Deck Quality</span>
              <Badge>5%</Badge>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-8 text-center shadow-strong bg-gradient-card animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Ready to Learn More?</h2>
          <p className="text-muted-foreground mb-6">
            Explore our prototype and see how AI transforms workforce management in Bangladesh's garment industry
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-gradient-hero hover:opacity-90">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Demo
            </Button>
            <Button variant="outline">
              Contact Us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;
