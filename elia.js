(function() {
    // --- Configuration ---
    const SUPA_URL = 'https://pzjdruihfqtflugypcgl.supabase.co';
    const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6amRydWloZnF0Zmx1Z3lwY2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODE4NzQsImV4cCI6MjA5MjM1Nzg3NH0.aYY7WaTvKqpFtzZPt2DY4Ag-_KLmBcRhJwLX_lGhKf4';
    
    // Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #elia-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: 'Inter', -apple-system, sans-serif;
        }
        #elia-bubble {
            width: 60px;
            height: 60px;
            background: #14b8a6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(20, 184, 166, 0.3);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #elia-bubble:hover { transform: scale(1.1) rotate(5deg); }
        #elia-chat-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 360px;
            height: 500px;
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.1);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(226, 232, 240, 0.8);
            transform-origin: bottom right;
            transition: all 0.3s ease;
        }
        #elia-header {
            background: linear-gradient(135deg, #14b8a6, #0d9488);
            color: white;
            padding: 24px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #elia-body {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .elia-msg {
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.92rem;
            line-height: 1.5;
            max-width: 80%;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .elia-bot { background: white; color: #1e293b; border: 1px solid #e2e8f0; border-top-left-radius: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .elia-user { background: #14b8a6; color: white; align-self: flex-end; border-top-right-radius: 2px; }
        
        #elia-typing {
            font-size: 0.8rem;
            color: #94a3b8;
            padding: 5px 20px;
            display: none;
        }
        
        #elia-footer {
            padding: 16px;
            background: white;
            display: flex;
            gap: 8px;
            border-top: 1px solid #f1f5f9;
        }
        #elia-input {
            flex: 1;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 10px 14px;
            outline: none;
            font-size: 0.9rem;
            transition: border 0.3s;
        }
        #elia-input:focus { border-color: #14b8a6; }
        #elia-send {
            background: #14b8a6;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
        }
        #elia-send:hover { background: #0d9488; }
    `;
    document.head.appendChild(style);

    // Create DOM
    const container = document.createElement('div');
    container.id = 'elia-widget-container';
    container.innerHTML = `
        <div id="elia-chat-window">
            <div id="elia-header">
                <div>
                    <div style="font-size: 1.1rem;">Asistente Virtual</div>
                    <div style="font-size: 0.75rem; opacity: 0.8; font-weight: 400;">Servicio de atención al cliente</div>
                </div>
                <span id="elia-close" style="cursor:pointer; font-size:1.5rem; opacity: 0.8;">×</span>
            </div>
            <div id="elia-body">
                <div class="elia-msg elia-bot">Hola, bienvenido. Soy Elia, su asistente virtual de atención al cliente. ¿En qué puedo ayudarle hoy?</div>
            </div>
            <div id="elia-typing">Elia está escribiendo...</div>
            <div id="elia-footer">
                <input type="text" id="elia-input" placeholder="Escriba su consulta aquí...">
                <button id="elia-send">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
        <div id="elia-bubble">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
    `;
    document.body.appendChild(container);

    const bubble = document.getElementById('elia-bubble');
    const windowEl = document.getElementById('elia-chat-window');
    const closeBtn = document.getElementById('elia-close');
    const input = document.getElementById('elia-input');
    const sendBtn = document.getElementById('elia-send');
    const body = document.getElementById('elia-body');
    const typingIndicator = document.getElementById('elia-typing');

    let step = 0; 
    let leadData = { 
        email: '', 
        name: '', 
        status: 'new', 
        source: 'Elia Web Widget', 
        tenant_id: 'OFA',
        metadata: {} 
    };

    bubble.onclick = () => {
        const isVisible = windowEl.style.display === 'flex';
        windowEl.style.display = isVisible ? 'none' : 'flex';
        if(!isVisible) input.focus();
    };
    closeBtn.onclick = () => windowEl.style.display = 'none';

    function addMessage(text, role) {
        const div = document.createElement('div');
        div.className = `elia-msg elia-${role}`;
        div.textContent = text;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function showTyping(show) {
        typingIndicator.style.display = show ? 'block' : 'none';
        body.scrollTop = body.scrollHeight;
    }

    async function eliaRespond(text, delay = 1800) {
        showTyping(true);
        setTimeout(() => {
            showTyping(false);
            addMessage(text, 'bot');
        }, delay);
    }

    async function handleSend() {
        const text = input.value.trim();
        if(!text) return;
        addMessage(text, 'user');
        input.value = '';

        if(step === 0) {
            leadData.metadata.initial_msg = text;
            eliaRespond("Entendido. Para poder gestionar su solicitud correctamente, ¿podría decirme su nombre, por favor?");
            step = 1;
        } else if(step === 1) {
            leadData.name = text;
            eliaRespond(`Gracias, ${text}. Para que un responsable de nuestro equipo le dé una respuesta detallada, ¿qué teléfono o email de contacto prefiere dejarnos?`);
            step = 2;
        } else if(step === 2) {
            leadData.email = text;
            eliaRespond(`Perfecto, ${leadData.name}. He tomado nota de su necesidad. En breve nos pondremos en contacto con usted. ¿Desea consultarnos alguna otra cosa?`);
            step = 3;
            saveLead();
        } else {
            eliaRespond("Recibido. Su información ha sido enviada con prioridad para que le respondamos lo antes posible.");
        }
    }

    async function saveLead() {
        try {
            // Save to Supabase
            const res = await fetch(`${SUPA_URL}/rest/v1/leads`, {
                method: 'POST',
                headers: {
                    'apikey': SUPA_KEY,
                    'Authorization': `Bearer ${SUPA_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(leadData)
            });
            const result = await res.json();
            console.log("Supabase Save:", result);

            // Send to n8n Webhook for instant notification
            sendToN8N(leadData);

        } catch(e) {
            console.error("Save Error:", e);
        }
    }

    async function sendToN8N(data) {
        const N8N_URL = 'https://n8n.optimumforall.es/webhook/ofa-inbound-lead';
        try {
            await fetch(N8N_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'new_lead',
                    project: 'Elia Web',
                    ...data
                })
            });
            console.log("n8n Notification Sent");
        } catch(e) {
            console.warn("n8n Webhook failed (expected if URL not active)", e);
        }
    }

    sendBtn.onclick = handleSend;
    input.onkeydown = (e) => { if(e.key === 'Enter') handleSend(); };

})();
