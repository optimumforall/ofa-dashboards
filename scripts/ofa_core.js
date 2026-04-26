/**
 * OFA CORE SYSTEM V1.0
 * Logic for Security, Compliance, and Data Sync
 */

const OFA_CONFIG = {
    supabaseUrl: 'https://pzjdruihfqtflugypcgl.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6amRydWloZnF0Zmx1Z3lwY2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODE4NzQsImV4cCI6MjA5MjM1Nzg3NH0.aYY7WaTvKqpFtzZPt2DY4Ag-_KLmBcRhJwLX_lGhKf4',
    airtableBase: 'apph3dLtvwNZEmgQ5',
    driveLink: 'https://drive.google.com/drive/u/0/folders/YOUR_SHARED_DRIVE_ID'
};

document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initCompliance();
    initAirtableData();
});

// 🛡️ SECURITY & AUTH (Handled natively in index.html now)
async function initAuth() {
    // Legacy check removed to prevent conflicts with new Supabase auth
    console.log('OFA Security: Delegated to Master Controller.');
}

// 🍪 COMPLIANCE (GDPR)
function initCompliance() {
    if (localStorage.getItem('ofa_cookies_accepted')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
        <div>
            <strong>OFA Compliance:</strong> We use essential cookies to ensure the security of the App Factory. 
            <a href="#" style="color: #14b8a6;">Privacy Policy</a>
        </div>
        <button class="btn-primary" onclick="acceptCookies()" style="padding: 6px 15px; font-size: 12px;">Accept All</button>
    `;
    document.body.appendChild(banner);
}

function acceptCookies() {
    localStorage.setItem('ofa_cookies_accepted', 'true');
    document.getElementById('cookie-banner').remove();
}

// 📊 AIRTABLE DATA SYNC
async function initAirtableData() {
    console.log("OFA Core: Syncing data from Airtable...");
    // Logic to populate task lists automatically will go here
}

// 📂 DRIVE ACCESS
function openDrive() {
    window.open(OFA_CONFIG.driveLink, '_blank');
}
