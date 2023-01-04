import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.REACT_APP_supabaseUrl,
  process.env.REACT_APP_supabaseKey
);

export default supabase;
