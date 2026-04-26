/**
 * OFA SECURITY GATE
 * Handles session verification and redirects.
 */

const SUPABASE_URL = 'https://pzjdruihfqtflugypcgl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6amRydWloZnF0Zmx1Z3lwY2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODE4NzQsImV4cCI6MjA5MjM1Nzg3NH0.aYY7WaTvKqpFtzZPt2DY4Ag-_KLmBcRhJwLX_lGhKf4';
const WHITELIST = [
    'mvillar65@gmail.com', 
    'vpns2011@gmail.com', 
    'vpns74@gmail.com',
    'info@optimumforall.es'
];

// ⚠️ PHASE 1 SECURITY: Hide UI immediately before auth resolves
document.documentElement.style.display = 'none';

document.addEventListener('DOMContentLoaded', async () => {
    // Import Supabase
    const { createClient } = supabase;
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 1. Check current session
    const { data: { session }, error } = await client.auth.getSession();

    if (!session) {
        // No user logged in, send to login
        window.location.href = 'login.html';
        return;
    }

    // 2. Check Whitelist
    const userEmail = session.user.email;
    if (!WHITELIST.includes(userEmail)) {
        alert('Access Denied: Your account is not authorized for this dashboard.');
        await client.auth.signOut();
        window.location.href = 'login.html';
    }

    // 3. Phase 1 Security: 12h Session Expiration Enforced Auto-Logout
    const now = new Date().getTime();
    let loginTime = sessionStorage.getItem('ofa_session_start');
    
    if (!loginTime) {
        // Migration: If no local timestamp, set one now to start the 12h ticker
        loginTime = now;
        sessionStorage.setItem('ofa_session_start', loginTime);
    }
    
    const HOURS_12_MS = 12 * 60 * 60 * 1000;
    if (now - parseInt(loginTime) > HOURS_12_MS) {
        console.warn('Session expired (12h limit reached). Logging out...');
        sessionStorage.removeItem('ofa_session_start');
        await client.auth.signOut();
        window.location.href = './login.html';
        return;
    }

    // Success! Show UI
    document.documentElement.style.display = 'block';
    console.log('Access Granted to: ' + userEmail);
});
