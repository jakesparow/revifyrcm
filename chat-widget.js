/* RevifyRCM floating widgets — Sarah (chat), Aria (voice), WhatsApp */
(function() {
  if (window.__revifyChatLoaded) return;
  window.__revifyChatLoaded = true;

  const css = `
  .rv-fab { position: fixed; bottom: 24px; right: 24px; z-index: 999; display: flex; flex-direction: column-reverse; gap: 12px; align-items: flex-end; font-family: var(--sans, system-ui); }
  .rv-fab.hidden { display: none; }
  .rv-icon { position: relative; width: 56px; height: 56px; border-radius: 50%; border: 0; cursor: pointer; box-shadow: 0 14px 38px rgba(0,0,0,0.4); transition: transform .25s cubic-bezier(.34,1.56,.64,1); display: flex; align-items: center; justify-content: center; }
  .rv-icon:hover { transform: translateY(-3px) scale(1.04); }
  .rv-icon::after { content: attr(data-name); position: absolute; right: 70px; top: 50%; transform: translateY(-50%) translateX(8px); background: rgba(10,11,14,0.94); color: #F4F2EE; padding: 8px 12px; border-radius: 10px; font-size: 12px; font-family: var(--mono, ui-monospace); letter-spacing: .04em; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .18s, transform .18s; border: 1px solid rgba(255,255,255,0.08); }
  .rv-icon:hover::after { opacity: 1; transform: translateY(-50%) translateX(0); }
  .rv-icon.chat { background: var(--accent, #C7FF3F); color: #0A0B0E; }
  .rv-icon.chat .badge { position: absolute; top: -2px; right: -2px; width: 14px; height: 14px; border-radius: 50%; background: #FF4D4D; border: 2px solid #0A0B0E; display: none; }
  .rv-icon.chat.has-unread .badge { display: block; animation: rv-bounce 1.6s ease-in-out infinite; }
  .rv-icon.wa { background: #25D366; color: white; }
  .rv-icon.voice { background: #1A1D24; color: var(--accent, #C7FF3F); border: 1px solid rgba(255,255,255,0.14); }
  .rv-icon.voice .ring { position: absolute; inset: -3px; border-radius: 50%; border: 1.5px solid var(--accent, #C7FF3F); animation: rv-ring 2.4s ease-out infinite; opacity: 0; pointer-events: none; }
  @keyframes rv-ring { 0% { opacity: .8; transform: scale(1) } 100% { opacity: 0; transform: scale(1.35) } }
  @keyframes rv-bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.18); } }
  .rv-icon svg { width: 22px; height: 22px; }

  /* Proactive greeting bubble */
  .rv-greet { position: fixed; bottom: 96px; right: 24px; max-width: 280px; background: #111318; color: #F4F2EE; border: 1px solid rgba(255,255,255,0.14); border-radius: 18px; padding: 14px 16px; box-shadow: 0 14px 38px rgba(0,0,0,0.4); z-index: 998; font-size: 13px; line-height: 1.5; transform: translateY(8px); opacity: 0; pointer-events: none; transition: opacity .25s, transform .25s; }
  .rv-greet.show { opacity: 1; transform: translateY(0); pointer-events: auto; cursor: pointer; }
  .rv-greet::after { content: ""; position: absolute; bottom: -7px; right: 24px; width: 14px; height: 14px; background: #111318; border-right: 1px solid rgba(255,255,255,0.14); border-bottom: 1px solid rgba(255,255,255,0.14); transform: rotate(45deg); }
  .rv-greet .who { display: flex; align-items: center; gap: 8px; font-family: var(--mono, ui-monospace); font-size: 10px; color: #8A887F; text-transform: uppercase; letter-spacing: .14em; margin-bottom: 6px; }
  .rv-greet .av { width: 22px; height: 22px; border-radius: 50%; background: var(--accent, #C7FF3F); color: #0A0B0E; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 11px; font-family: var(--sans, system-ui); }
  .rv-greet .x { position: absolute; top: 6px; right: 8px; background: transparent; border: 0; color: #8A887F; cursor: pointer; font-size: 14px; padding: 4px; }
  .rv-greet .x:hover { color: #F4F2EE; }

  /* Chat panel */
  .rv-chat { position: fixed; bottom: 24px; right: 24px; width: 400px; max-width: calc(100vw - 32px); height: 620px; max-height: calc(100vh - 48px); background: #0F1116; border: 1px solid rgba(255,255,255,0.12); border-radius: 22px; z-index: 1000; box-shadow: 0 30px 80px rgba(0,0,0,0.65); display: flex; flex-direction: column; overflow: hidden; opacity: 0; pointer-events: none; transform: translateY(12px) scale(.97); transition: opacity .22s ease, transform .22s ease; color: #F4F2EE; font-family: var(--sans, system-ui); }
  .rv-chat.open { opacity: 1; pointer-events: auto; transform: translateY(0) scale(1); }

  .rv-head { padding: 16px 18px; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; gap: 12px; background: linear-gradient(180deg, rgba(199,255,63,0.05), transparent); position: relative; }
  .rv-head .av { width: 40px; height: 40px; border-radius: 50%; background: var(--accent, #C7FF3F); display: flex; align-items: center; justify-content: center; color: #0A0B0E; font-weight: 600; font-size: 16px; position: relative; flex-shrink: 0; }
  .rv-head .av::after { content: ""; position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; border-radius: 50%; background: #4ADE80; border: 2px solid #0F1116; }
  .rv-head .title { font-size: 15px; font-weight: 500; line-height: 1.1; }
  .rv-head .sub { font-family: var(--mono, ui-monospace); font-size: 10px; color: #8A887F; margin-top: 4px; text-transform: uppercase; letter-spacing: .14em; }
  .rv-head .actions { margin-left: auto; display: flex; gap: 6px; }
  .rv-head button { background: transparent; border: 0; color: #8A887F; cursor: pointer; padding: 7px; border-radius: 8px; transition: all .15s; }
  .rv-head button:hover { background: rgba(255,255,255,0.06); color: #F4F2EE; }
  .rv-head svg { width: 16px; height: 16px; }

  .rv-body { flex: 1; padding: 18px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; font-size: 14px; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
  .rv-body::-webkit-scrollbar { width: 4px; }
  .rv-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

  .rv-row { display: flex; gap: 8px; align-items: flex-end; max-width: 88%; animation: rv-slide-in .25s ease-out; }
  .rv-row.user { align-self: flex-end; flex-direction: row-reverse; }
  .rv-row .av-mini { width: 24px; height: 24px; border-radius: 50%; background: var(--accent, #C7FF3F); color: #0A0B0E; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 10px; flex-shrink: 0; margin-bottom: 2px; }
  .rv-row.user .av-mini { background: #2A2D34; color: #F4F2EE; }
  .rv-msg { padding: 10px 14px; border-radius: 16px; line-height: 1.5; word-wrap: break-word; }
  .rv-row.bot .rv-msg { background: #1A1D24; border-top-left-radius: 4px; }
  .rv-row.user .rv-msg { background: var(--accent, #C7FF3F); color: #0A0B0E; border-top-right-radius: 4px; }
  @keyframes rv-slide-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  .rv-typing { display: flex; gap: 4px; padding: 12px 14px; }
  .rv-typing span { width: 6px; height: 6px; border-radius: 50%; background: #8A887F; animation: rv-typ 1.2s ease-in-out infinite; }
  .rv-typing span:nth-child(2) { animation-delay: .15s; }
  .rv-typing span:nth-child(3) { animation-delay: .3s; }
  @keyframes rv-typ { 0%, 60%, 100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-4px); opacity: 1; } }

  .rv-quick { display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 18px 12px; }
  .rv-quick button { background: transparent; border: 1px solid rgba(255,255,255,0.14); color: #C8C6C0; padding: 7px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; font-family: inherit; transition: all .15s; white-space: nowrap; }
  .rv-quick button:hover { border-color: var(--accent, #C7FF3F); color: var(--accent, #C7FF3F); transform: translateY(-1px); }
  .rv-quick button.cta { background: var(--accent, #C7FF3F); color: #0A0B0E; border-color: var(--accent, #C7FF3F); font-weight: 500; }
  .rv-quick button.cta:hover { color: #0A0B0E; }

  .rv-input { padding: 10px 12px 14px; border-top: 1px solid rgba(255,255,255,0.07); display: flex; gap: 8px; align-items: center; }
  .rv-input input { flex: 1; background: #1A1D24; border: 1px solid rgba(255,255,255,0.08); color: #F4F2EE; padding: 11px 16px; border-radius: 999px; font-family: inherit; font-size: 13px; outline: 0; transition: border-color .15s; }
  .rv-input input:focus { border-color: var(--accent, #C7FF3F); }
  .rv-input button { background: var(--accent, #C7FF3F); border: 0; color: #0A0B0E; width: 38px; height: 38px; border-radius: 50%; cursor: pointer; font-size: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .rv-input button:hover { transform: scale(1.06); }
  .rv-foot { padding: 8px 18px 10px; font-family: var(--mono, ui-monospace); font-size: 9px; color: #5C5A52; text-align: center; letter-spacing: .12em; text-transform: uppercase; }

  /* Voice modal */
  .rv-voice { position: fixed; bottom: 24px; right: 24px; width: 340px; background: #0F1116; border: 1px solid rgba(255,255,255,0.12); border-radius: 22px; z-index: 1001; box-shadow: 0 30px 80px rgba(0,0,0,0.65); padding: 32px 28px; display: none; color: #F4F2EE; text-align: center; }
  .rv-voice.open { display: block; animation: rv-pop .25s ease-out; }
  @keyframes rv-pop { from { opacity: 0; transform: translateY(8px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .rv-voice-orb { width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px; background: radial-gradient(circle at 30% 30%, var(--accent, #C7FF3F), color-mix(in oklab, var(--accent, #C7FF3F) 30%, transparent) 60%, transparent 80%); animation: rv-orb 2.4s ease-in-out infinite; position: relative; }
  .rv-voice-orb::after { content: ""; position: absolute; inset: -10px; border-radius: 50%; border: 1px solid color-mix(in oklab, var(--accent, #C7FF3F) 50%, transparent); animation: rv-orb-ring 2.4s ease-out infinite; }
  @keyframes rv-orb { 0%,100% { transform: scale(1) } 50% { transform: scale(1.07) } }
  @keyframes rv-orb-ring { 0% { opacity: 1; transform: scale(1) } 100% { opacity: 0; transform: scale(1.45) } }
  .rv-voice h4 { font-size: 24px; font-weight: 600; margin: 0 0 4px; letter-spacing: -0.02em; }
  .rv-voice p { font-family: var(--mono, ui-monospace); font-size: 10px; text-transform: uppercase; letter-spacing: .16em; color: #8A887F; margin: 0 0 24px; }
  .rv-voice .row { display: flex; gap: 8px; }
  .rv-voice .row button { flex: 1; padding: 13px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.14); background: transparent; color: #F4F2EE; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 500; transition: all .15s; }
  .rv-voice .row button:hover { border-color: var(--accent, #C7FF3F); color: var(--accent, #C7FF3F); }
  .rv-voice .row button.primary { background: var(--accent, #C7FF3F); color: #0A0B0E; border-color: var(--accent, #C7FF3F); }
  .rv-voice .row button.primary:hover { color: #0A0B0E; transform: translateY(-1px); }
  .rv-voice .x { position: absolute; top: 14px; right: 14px; background: transparent; border: 0; color: #8A887F; cursor: pointer; font-size: 22px; line-height: 1; padding: 6px; }
  .rv-voice .x:hover { color: #F4F2EE; }
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  // Conversation tree — Sarah
  const tree = {
    root: { msgs: ["Hi 👋 I'm Sarah at Revify.", "Quick question — what brings you here?"], options: [
      { t: "Hospital / health system", k: "h" },
      { t: "Independent practice", k: "p" },
      { t: "Existing billing co.", k: "b" },
      { t: "Investor", k: "i" },
      { t: "I'm just looking", k: "l" }
    ]},
    h: { msgs: ["Got it. Most CFOs ask three things first."], options: [
      { t: "Pricing", k: "h_p" }, { t: "Onboarding", k: "h_o" }, { t: "Proof / case studies", k: "h_c" }, { t: "EHR support", k: "h_e" }
    ]},
    h_p: { msgs: ["4–9% of net collected dollars. Locked in writing.", "No FTE fees. No per-claim. No setup. You only pay on what we post to your bank."], options: [
      { t: "How is that possible?", k: "h_p2" }, { t: "Book a call", k: "_demo", cta: true }
    ]},
    h_p2: { msgs: ["Agents do 80% of clicks. Humans handle exceptions. Our cost-to-serve is ~1/4 of an offshore BPO — and we share that gain with you."], options: [
      { t: "Show me the numbers", k: "_outcomes" }, { t: "Book a call", k: "_demo", cta: true }
    ]},
    h_o: { msgs: ["30 days shadow on your last 90 days of claims.", "Then we go live in 60. Agents are benchmarked against your current vendor before any switchover — you see the proof first."], options: [
      { t: "Start the shadow run", k: "_demo", cta: true }, { t: "What about my team?", k: "h_o2" }
    ]},
    h_o2: { msgs: ["No layoffs needed. Your billers move from clicking portals to handling exceptions and edge cases — better work, same headcount."], options: [
      { t: "Book a call", k: "_demo", cta: true }
    ]},
    h_c: { msgs: ["Three recent ones:", "• Houston multi-specialty: +14.2% net collections, AR 38d → 19d", "• Charlotte ortho group: $612K underpayments recovered Q1", "• Texas behavioral health network: 41% denial drop in 90 days"], options: [
      { t: "More case studies", k: "_outcomes" }, { t: "Book a call", k: "_demo", cta: true }
    ]},
    h_e: { msgs: ["Epic, Athena, eClinicalWorks, Tebra/Kareo, AdvancedMD, NextGen, Cerner/Oracle, Greenway, eMDs, Valant — and any FHIR-capable EHR."], options: [
      { t: "Book a call", k: "_demo", cta: true }, { t: "Other questions", k: "root" }
    ]},
    p: { msgs: ["Independent practices are our sweet spot.", "What's the biggest pain right now?"], options: [
      { t: "Denials piling up", k: "p_d" }, { t: "Slow AR / cash flow", k: "p_a" }, { t: "Coding errors", k: "p_c" }, { t: "All of the above", k: "p_all" }
    ]},
    p_d: { msgs: ["Our Denial Triage agent files appeals in under 5 min — typically 25–40% drop in 90 days.", "Want me to send the denial-management one-pager?"], options: [
      { t: "Yes, send it", k: "_demo", cta: true }, { t: "Book a call instead", k: "_demo", cta: true }
    ]},
    p_a: { msgs: ["Average client moves AR from 41d to 22d in the first 60.", "Daily cash deposit visible in your portal."], options: [
      { t: "Book a call", k: "_demo", cta: true }
    ]},
    p_c: { msgs: ["ICD Intel (built in-house): 96.8% no-touch coding accuracy. Tuned for 17 specialties.", "Which specialty?"], options: [
      { t: "Primary care", k: "p_c2" }, { t: "Behavioral health", k: "p_c2" }, { t: "Specialty", k: "p_c2" }, { t: "Multi-spec", k: "p_c2" }
    ]},
    p_c2: { msgs: ["We're trained on it. ICD Intel reads notes, suggests codes, flags compliance risks before claims go out."], options: [
      { t: "Book a call", k: "_demo", cta: true }
    ]},
    p_all: { msgs: ["Then full RCM is the right fit. We replace your billing vendor end-to-end and price on what we post."], options: [
      { t: "Book a call", k: "_demo", cta: true }, { t: "Pricing details", k: "h_p" }
    ]},
    b: { msgs: ["We white-label our agent stack.", "Embed Eligibility / Coding / Denial / AR agents inside your existing service. Your brand, our infrastructure."], options: [
      { t: "Partnership terms", k: "_demo", cta: true }, { t: "How does it work?", k: "b2" }
    ]},
    b2: { msgs: ["API-level integration. Agents run inside your tenant. Audit trail in your portal. Revenue share or per-volume pricing."], options: [
      { t: "Talk to partnerships", k: "_demo", cta: true }
    ]},
    i: { msgs: ["We're talking to a small set of investors.", "Want to see the deck and recent metrics?"], options: [
      { t: "Yes — request access", k: "_demo", cta: true }, { t: "What's your stage?", k: "i2" }
    ]},
    i2: { msgs: ["Operationally profitable on outcome-based revenue. Multi-state footprint. Scaling agent coverage across the cycle."], options: [
      { t: "Request the deck", k: "_demo", cta: true }
    ]},
    l: { msgs: ["No worries — take your time.", "Want a guided tour, or jump into a specific topic?"], options: [
      { t: "How is Revify different?", k: "l_diff" }, { t: "See agents", k: "_agents" }, { t: "Pricing", k: "h_p" }, { t: "Free-form question", k: "_free" }
    ]},
    l_diff: { msgs: ["Three things, in plain English:", "1. Agent-first — not a BPO with a chatbot bolted on.", "2. You pay on collections — not seats or per-claim.", "3. Open-ledger audit — every agent action is logged and reviewable."], options: [
      { t: "Book a call", k: "_demo", cta: true }, { t: "Browse agents", k: "_agents" }
    ]}
  };

  function buildUI() {
    const fab = document.createElement('div');
    fab.className = 'rv-fab';
    fab.innerHTML = `
      <button class="rv-icon chat" id="rvOpen" data-name="Chat with Sarah" aria-label="Chat with Sarah">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z"/></svg>
        <span class="badge"></span>
      </button>
      <button class="rv-icon wa" id="rvWa" data-name="WhatsApp us" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 0C7.2 0 0 7.2 0 16c0 2.8.8 5.5 2.2 7.8L0 32l8.5-2.2c2.2 1.2 4.8 1.9 7.5 1.9 8.8 0 16-7.2 16-16S24.8 0 16 0zm0 29.3c-2.5 0-4.9-.7-7-1.9l-.5-.3-5 1.3 1.3-4.9-.3-.5A13.2 13.2 0 0 1 2.7 16C2.7 8.7 8.7 2.7 16 2.7S29.3 8.7 29.3 16 23.3 29.3 16 29.3zm7.4-9.9c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2s-1 1.3-1.3 1.6c-.2.2-.5.2-.9 0a10.8 10.8 0 0 1-5.4-4.7c-.4-.7.4-.6 1.2-2.1.1-.3.1-.5 0-.7l-1.2-2.9c-.3-.7-.7-.6-.9-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.2 1.4 3.7 1.6 4 2.7 4.1 6.5 5.7c.9.4 1.6.6 2.2.8.9.3 1.7.2 2.4.1.7-.1 2.3-.9 2.6-1.8s.4-1.7.3-1.8c-.2-.2-.4-.3-.8-.5z"/></svg>
      </button>
      <button class="rv-icon voice" id="rvVoice" data-name="Talk to Aria — voice agent" aria-label="Talk to Aria, voice agent">
        <span class="ring"></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8"/></svg>
      </button>
    `;
    document.body.appendChild(fab);

    const greet = document.createElement('div');
    greet.className = 'rv-greet';
    greet.innerHTML = `
      <button class="x" aria-label="Dismiss">×</button>
      <div class="who"><span class="av">S</span><span>Sarah · online</span></div>
      <div>👋 Curious about agent-based RCM? I can answer pricing, onboarding, or pull a denial audit on your TIN.</div>
    `;
    document.body.appendChild(greet);

    const chat = document.createElement('div');
    chat.className = 'rv-chat';
    chat.innerHTML = `
      <div class="rv-head">
        <div class="av">S</div>
        <div><div class="title">Sarah · Revify</div><div class="sub">Online · replies in seconds</div></div>
        <div class="actions">
          <button id="rvReset" aria-label="Reset conversation" title="Start over"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg></button>
          <button id="rvClose" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>
      </div>
      <div class="rv-body" id="rvBody"></div>
      <div class="rv-quick" id="rvQuick"></div>
      <div class="rv-input">
        <input id="rvIn" placeholder="Or type a question…" aria-label="Message" />
        <button id="rvSend" aria-label="Send">→</button>
      </div>
      <div class="rv-foot">Powered by Revify · SOC 2 · HIPAA · zero retention</div>
    `;
    document.body.appendChild(chat);

    const voice = document.createElement('div');
    voice.className = 'rv-voice';
    voice.innerHTML = `
      <button class="x" id="rvVoiceX" aria-label="Close">×</button>
      <div class="rv-voice-orb"></div>
      <h4>Aria</h4>
      <p>Voice agent · always on</p>
      <div class="row">
        <button id="rvVoiceCall" class="primary">Call now</button>
        <button id="rvVoiceSchedule">Book a time</button>
      </div>
    `;
    document.body.appendChild(voice);

    return { fab, greet, chat, voice };
  }

  const ui = buildUI();
  const fab = ui.fab, greet = ui.greet, chat = ui.chat, voice = ui.voice;

  let state = 'root';
  let history = []; // { role: 'bot'|'user', text }
  const STORE = 'rv_chat_v2';
  try { const s = JSON.parse(localStorage.getItem(STORE) || 'null'); if (s && s.history) history = s.history; if (s && s.state) state = s.state; } catch {}

  function persist() { try { localStorage.setItem(STORE, JSON.stringify({ state, history: history.slice(-30) })); } catch {} }

  function renderBody() {
    const body = document.getElementById('rvBody');
    body.innerHTML = '';
    history.forEach(h => {
      const row = document.createElement('div'); row.className = 'rv-row ' + h.role;
      const av = document.createElement('div'); av.className = 'av-mini'; av.textContent = h.role === 'bot' ? 'S' : 'You'.charAt(0);
      const m = document.createElement('div'); m.className = 'rv-msg'; m.textContent = h.text;
      row.appendChild(av); row.appendChild(m);
      body.appendChild(row);
    });
    body.scrollTop = body.scrollHeight;
  }

  function renderOptions(opts) {
    const q = document.getElementById('rvQuick');
    q.innerHTML = '';
    opts.forEach(o => {
      const b = document.createElement('button');
      b.textContent = o.t;
      if (o.cta) b.classList.add('cta');
      b.onclick = () => {
        if (o.k === '_demo') { window.location.href = 'contact.html#book'; return; }
        if (o.k === '_outcomes') { window.location.href = 'outcomes.html'; return; }
        if (o.k === '_agents') { window.location.href = 'agents.html'; return; }
        if (o.k === '_free') { document.getElementById('rvIn').focus(); q.innerHTML = ''; return; }
        // record user click
        history.push({ role: 'user', text: o.t });
        renderBody();
        showTyping();
        setTimeout(() => { hideTyping(); state = o.k; runNode(); }, 480 + Math.random() * 320);
      };
      q.appendChild(b);
    });
  }

  function showTyping() {
    const body = document.getElementById('rvBody');
    if (document.getElementById('rvTyping')) return;
    const row = document.createElement('div'); row.className = 'rv-row bot'; row.id = 'rvTyping';
    row.innerHTML = `<div class="av-mini">S</div><div class="rv-msg" style="padding:0;background:#1A1D24;"><div class="rv-typing"><span></span><span></span><span></span></div></div>`;
    body.appendChild(row); body.scrollTop = body.scrollHeight;
  }
  function hideTyping() { const t = document.getElementById('rvTyping'); if (t) t.remove(); }

  async function runNode() {
    const cur = tree[state] || tree.root;
    const msgs = cur.msgs;
    for (let i = 0; i < msgs.length; i++) {
      showTyping();
      await new Promise(r => setTimeout(r, 420 + Math.random() * 300 + msgs[i].length * 8));
      hideTyping();
      history.push({ role: 'bot', text: msgs[i] });
      renderBody();
    }
    renderOptions(cur.options);
    persist();
  }

  function openChat() {
    chat.classList.add('open');
    fab.classList.add('hidden');
    greet.classList.remove('show');
    document.getElementById('rvOpen').classList.remove('has-unread');
    if (history.length === 0) { state = 'root'; runNode(); }
    else { renderBody(); const cur = tree[state] || tree.root; renderOptions(cur.options); }
  }
  function closeChat() { chat.classList.remove('open'); fab.classList.remove('hidden'); }
  function resetChat() { history = []; state = 'root'; persist(); renderBody(); document.getElementById('rvQuick').innerHTML = ''; runNode(); }

  document.getElementById('rvOpen').onclick = openChat;
  document.getElementById('rvClose').onclick = closeChat;
  document.getElementById('rvReset').onclick = resetChat;
  document.getElementById('rvWa').onclick = () => window.open('https://wa.me/15125550199?text=Hi%20Revify', '_blank');
  document.getElementById('rvVoice').onclick = () => { voice.classList.add('open'); fab.classList.add('hidden'); };
  document.getElementById('rvVoiceX').onclick = () => { voice.classList.remove('open'); fab.classList.remove('hidden'); };
  document.getElementById('rvVoiceCall').onclick = () => { history.push({ role: 'bot', text: "Aria is connecting… (in production, opens the Vapi voice channel)" }); voice.classList.remove('open'); fab.classList.remove('hidden'); openChat(); };
  document.getElementById('rvVoiceSchedule').onclick = () => { window.location.href = 'contact.html#book'; };

  greet.querySelector('.x').onclick = (e) => { e.stopPropagation(); greet.classList.remove('show'); sessionStorage.setItem('rv_greet_dismissed', '1'); };
  greet.onclick = openChat;

  async function sendFree(text) {
    if (!text.trim()) return;
    history.push({ role: 'user', text });
    document.getElementById('rvIn').value = '';
    document.getElementById('rvQuick').innerHTML = '';
    renderBody();
    showTyping();
    try {
      const reply = await window.claude.complete({
        messages: [{ role: 'user', content: `You are Sarah, an inside sales rep at RevifyRCM (AI-native revenue cycle company in Bastrop TX, outcome-based pricing, replaces offshore BPOs). Answer in 1-2 short sentences (max 30 words). Be direct, friendly, and confident. End with either a follow-up question or "Want to book a call?". Do not use exclamation marks.

Visitor's question: ${text}` }]
      });
      hideTyping();
      history.push({ role: 'bot', text: (reply || "Want to book a call? Tap the button above.").trim() });
      renderBody();
      renderOptions([{ t: "Book a call", k: "_demo", cta: true }, { t: "Other questions", k: "root" }, { t: "See pricing", k: "h_p" }]);
      persist();
    } catch {
      hideTyping();
      history.push({ role: 'bot', text: "Let me get a human on that. Want to book a call?" });
      renderBody();
      renderOptions([{ t: "Book a call", k: "_demo", cta: true }, { t: "Start over", k: "root" }]);
      persist();
    }
  }
  document.getElementById('rvSend').onclick = () => sendFree(document.getElementById('rvIn').value);
  document.getElementById('rvIn').addEventListener('keydown', e => { if (e.key === 'Enter') sendFree(e.target.value); });

  // Auto-dismiss the proactive bubble after 5s so it doesn't block content,
  // but only show it once per session, and only on the first page load.
  if (!sessionStorage.getItem('rv_greet_dismissed') && !sessionStorage.getItem('rv_greet_shown')) {
    setTimeout(() => {
      if (!chat.classList.contains('open') && !voice.classList.contains('open')) {
        greet.classList.add('show');
        document.getElementById('rvOpen').classList.add('has-unread');
        sessionStorage.setItem('rv_greet_shown', '1');
        // self-dismiss after 5s so it stops blocking the page
        setTimeout(() => { greet.classList.remove('show'); }, 5000);
      }
    }, 8000);
  }
})();
