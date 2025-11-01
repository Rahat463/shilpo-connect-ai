import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const WorkerMonitoring = () => {
  useEffect(() => {
    const logActivity = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Log worker activity
        await supabase.from("monitoring_logs").insert({
          worker_id: user.id,
          activity_type: "Page View",
          description: `Visited ${window.location.pathname}`,
          status: "active",
        });
      } catch (error) {
        console.error("Error logging activity:", error);
      }
    };

    logActivity();

    // Log activity every 5 minutes
    const interval = setInterval(logActivity, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
};

export default WorkerMonitoring;
