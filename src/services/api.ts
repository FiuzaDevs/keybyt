import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vkaeuedswexyubwdmnwc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDMxMTk3OCwiZXhwIjoxOTM1ODg3OTc4fQ.e0woaV0If5hs6V-PGzCiD4fSQbjJqfxoJjQbGQnKUdQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
