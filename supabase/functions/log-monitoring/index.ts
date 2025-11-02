import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Input validation schema
const activityTypes = ['Page View', 'Login', 'Logout', 'Task Complete', 'Break'] as const;
const statusTypes = ['active', 'inactive', 'break'] as const;

function validateInput(data: any): { valid: boolean; error?: string } {
  if (!data.activity_type || typeof data.activity_type !== 'string') {
    return { valid: false, error: 'activity_type is required and must be a string' };
  }
  
  if (data.activity_type.length > 100) {
    return { valid: false, error: 'activity_type must be less than 100 characters' };
  }
  
  if (data.description && typeof data.description !== 'string') {
    return { valid: false, error: 'description must be a string' };
  }
  
  if (data.description && data.description.length > 500) {
    return { valid: false, error: 'description must be less than 500 characters' };
  }
  
  if (data.location && typeof data.location !== 'string') {
    return { valid: false, error: 'location must be a string' };
  }
  
  if (data.location && data.location.length > 200) {
    return { valid: false, error: 'location must be less than 200 characters' };
  }
  
  if (data.status && typeof data.status !== 'string') {
    return { valid: false, error: 'status must be a string' };
  }
  
  if (data.status && data.status.length > 50) {
    return { valid: false, error: 'status must be less than 50 characters' };
  }
  
  return { valid: true };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Verify the user's JWT token
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Invalid authentication')
    }

    const body = await req.json()
    
    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { activity_type, description, location, status } = body;

    // Insert monitoring log using service role
    const { error: insertError } = await supabaseClient
      .from('monitoring_logs')
      .insert({
        worker_id: user.id,
        activity_type,
        description,
        location,
        status
      })

    if (insertError) {
      throw insertError
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error logging monitoring:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
