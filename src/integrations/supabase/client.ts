// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kuyzrfwcogdtamlplviw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eXpyZndjb2dkdGFtbHBsdml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Njg3NzAsImV4cCI6MjA1ODU0NDc3MH0.Fbhoe9DKxuNr5XiZZEvqGlZAg5J7rxM2vsZYgkIzKN0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);