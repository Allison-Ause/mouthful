const SUPABASE_URL = 'https://yavjmsfnxelnvzpgaxrb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhdmptc2ZueGVsbnZ6cGdheHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc5Mjg5MjEsImV4cCI6MTk3MzUwNDkyMX0.u0Rn9ZsRbvg8dVVJSBHNZZ2D6m-UpIooFkL9zRiry6M';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function checkResponse(response) {
    if (response.error) {
        // eslint-disable-next-line no-console
        console.trace(response.error);
        return null;
    }
    return response.data;
}
