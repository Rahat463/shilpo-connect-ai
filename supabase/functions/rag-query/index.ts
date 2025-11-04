import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, documentType } = await req.json();
    
    if (!query) {
      throw new Error("Query is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      throw new Error("AI service not configured");
    }

    // For now, RAG system is a placeholder that uses the chat assistant
    // Future implementation will include:
    // 1. Generating embeddings for the query
    // 2. Searching document_embeddings table for similar content
    // 3. Building context from matched documents
    // 4. Generating answer using context

    const systemPrompt = `You are a helpful AI assistant for ShilpoAI. Answer questions about:
- Job matching and recruitment in garment industry
- Worker skills and qualifications
- Factory management best practices
- Skill assessment and training
- Workforce analytics and predictions

Provide accurate, helpful information based on your knowledge of the garment industry in Bangladesh.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service payment required. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error("No response from AI service");
    }

    return new Response(
      JSON.stringify({ 
        answer,
        sources: [] // Future: Include matched documents
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("RAG query error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred",
        answer: "I apologize, but I'm having trouble processing your question right now."
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});