
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.26.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    // Get the API key from headers
    const authHeader = req.headers.get('authorization') || ''
    const apiKey = authHeader.replace('Bearer ', '')
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key is required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Verify the API key
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .eq('active', true)
      .single()
    
    if (keyError || !keyData) {
      return new Response(
        JSON.stringify({ error: 'Invalid or inactive API key' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Update the last_used_at field
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', keyData.id)
    
    // Parse request body
    const { endpoint, method, body } = await req.json()
    
    // In a real implementation, you would handle the actual API request here
    // For demo purposes, we'll just return a simulated response
    
    // Track the API request
    const startTime = performance.now()
    const tokens = Math.floor(Math.random() * 100) + 50 // Random token count for demo
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const endTime = performance.now()
    const responseTime = Math.floor(endTime - startTime)
    
    // Create a record of this API request
    await supabase
      .from('api_requests')
      .insert({
        api_key_id: keyData.id,
        user_id: keyData.user_id,
        endpoint: endpoint || req.url,
        method: method || req.method,
        status: 200,
        response_time: responseTime,
        tokens_used: tokens
      })
    
    // Return a simulated response
    const simulatedResponse = {
      id: 'resp_' + Math.random().toString(36).substring(2, 10),
      created: new Date().toISOString(),
      model: 'atherbot-1',
      choices: [
        {
          text: "Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. AI encompasses various technologies including machine learning, natural language processing, computer vision, and more. These systems can perform tasks that typically require human intelligence such as visual perception, speech recognition, decision-making, and language translation.",
          finish_reason: "length"
        }
      ],
      usage: {
        prompt_tokens: Math.floor(tokens / 3),
        completion_tokens: Math.floor(tokens * 2 / 3),
        total_tokens: tokens
      }
    }
    
    return new Response(
      JSON.stringify(simulatedResponse),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error in API playground function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
