import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vkaeuedswexyubwdmnwc.supabase.co";
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDE1NDQwNywiZXhwIjoxOTM1NzMwNDA3fQ.BrFriW7vKHEpU7jLQAS3QrNhcnOtVa87HiB7AzdOBTI'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
