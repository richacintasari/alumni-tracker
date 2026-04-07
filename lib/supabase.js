import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dzbynobtuazfxhcpnbmq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6Ynlub2J0dWF6ZnhoY3BuYm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjkxNDAsImV4cCI6MjA5MTA0NTE0MH0.0nsCofNWHT8Dnd0fbscT2rK2rZIdJe62_eFYIgMxsXI";

export const supabase = createClient(supabaseUrl, supabaseKey);