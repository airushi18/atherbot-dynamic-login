
import { supabase } from '@/integrations/supabase/client';

export type ApiKey = {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used_at: string | null;
  active: boolean;
};

export type ApiRequest = {
  id: string;
  endpoint: string;
  method: string;
  status: number;
  response_time: number;
  created_at: string;
  tokens_used: number;
};

// Get all API keys for current user
export const getApiKeys = async (): Promise<ApiKey[]> => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

// Create a new API key
export const createApiKey = async (name: string, prefix: string = 'ather'): Promise<ApiKey> => {
  // Use the database function to generate a secure key
  const { data: keyData, error: keyError } = await supabase
    .rpc('generate_api_key', { prefix });
  
  if (keyError) throw keyError;
  
  const key = keyData as string;
  
  // Insert the new key into the database
  const { data, error } = await supabase
    .from('api_keys')
    .insert([{ name, key }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Delete an API key
export const deleteApiKey = async (keyId: string): Promise<void> => {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', keyId);
  
  if (error) throw error;
};

// Update API key (e.g. activate/deactivate)
export const updateApiKey = async (keyId: string, updates: Partial<Omit<ApiKey, 'id' | 'key' | 'created_at'>>): Promise<ApiKey> => {
  const { data, error } = await supabase
    .from('api_keys')
    .update(updates)
    .eq('id', keyId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Get API usage statistics
export const getApiUsageStats = async (period: 'day' | 'week' | 'month' = 'month') => {
  let dateFilter;
  const now = new Date();
  
  switch (period) {
    case 'day':
      // Last 24 hours
      dateFilter = new Date(now.setDate(now.getDate() - 1)).toISOString();
      break;
    case 'week':
      // Last 7 days
      dateFilter = new Date(now.setDate(now.getDate() - 7)).toISOString();
      break;
    case 'month':
    default:
      // Last 30 days
      dateFilter = new Date(now.setDate(now.getDate() - 30)).toISOString();
      break;
  }
  
  // Get total requests count
  const { count: totalRequests, error: countError } = await supabase
    .from('api_requests')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', dateFilter);
  
  if (countError) throw countError;
  
  // Get total tokens used
  const { data: tokensData, error: tokensError } = await supabase
    .from('api_requests')
    .select('tokens_used')
    .gte('created_at', dateFilter);
  
  if (tokensError) throw tokensError;
  
  const totalTokens = tokensData.reduce((sum, request) => sum + request.tokens_used, 0);
  
  // Get recent requests
  const { data: recentRequests, error: recentError } = await supabase
    .from('api_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (recentError) throw recentError;
  
  return {
    totalRequests: totalRequests || 0,
    totalTokens,
    recentRequests: recentRequests || [],
  };
};

// Get all API requests for current user
export const getApiRequests = async (limit: number = 50, offset: number = 0): Promise<ApiRequest[]> => {
  const { data, error } = await supabase
    .from('api_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data || [];
};
