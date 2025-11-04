import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Star, CheckCircle2, FileText } from "lucide-react";
import { format } from "date-fns";

interface Reference {
  id: string;
  factory_id: string;
  reference_text: string;
  rating: number;
  created_at: string;
  verified: boolean;
  factory_profile?: {
    full_name: string;
    factory_id: string | null;
  };
}

export default function WorkerReferences() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("worker_references")
        .select(`
          *,
          factory_profile:profiles!worker_references_factory_id_fkey(full_name, factory_id)
        `)
        .eq("worker_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReferences(data || []);
    } catch (error) {
      toast.error("Failed to load references");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading references...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">References & Recommendations</h2>
      </div>

      {references.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No references yet. References from previous employers will appear here.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {references.map((reference) => (
            <Card key={reference.id} className="p-6 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">
                        {reference.factory_profile?.full_name || "Factory"}
                      </h4>
                      {reference.verified && (
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < reference.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        {reference.rating}/5
                      </span>
                    </div>
                  </div>
                  <Badge variant={reference.verified ? "secondary" : "outline"}>
                    {reference.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{reference.reference_text}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(reference.created_at), "MMMM dd, yyyy")}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-6 bg-accent">
        <h4 className="font-medium mb-2">About References</h4>
        <p className="text-sm text-muted-foreground">
          References are provided by factory managers you've worked with. They help other
          employers understand your work quality and reliability. Verified references have been
          confirmed by our system.
        </p>
      </Card>
    </div>
  );
}