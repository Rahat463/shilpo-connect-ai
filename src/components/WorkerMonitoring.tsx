import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const WorkerMonitoring = () => {
  useEffect(() => {
    const logActivity = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Log worker activity via edge function
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-monitoring`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              activity_type: "Page View",
              description: `Visited ${window.location.pathname}`,
              status: "active",
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to log activity');
        }
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
