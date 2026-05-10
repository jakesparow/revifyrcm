/* Revi — the happy verifier agent. Carries a clipboard. Looks where the cursor goes. Dodges when chased. */
(function () {
  const css = `
  .revi { position: fixed; z-index: 90; width: 84px; height: 96px; pointer-events: auto; cursor: pointer; transition: transform .55s cubic-bezier(.34,1.56,.64,1), left .55s cubic-bezier(.34,1.56,.64,1), top .55s cubic-bezier(.34,1.56,.64,1), opacity .25s; user-select: none; filter: drop-shadow(0 8px 22px rgba(26,24,20,0.18)); }
  .revi.idle { animation: revi-bob 3.6s ease-in-out infinite; }
  @keyframes revi-bob { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-6px) rotate(1deg); } }
  .revi.spin .body { animation: revi-spin 0.9s cubic-bezier(.4,0,.2,1) 1; }
  @keyframes revi-spin { 0% { transform: rotate(0) scale(1); } 50% { transform: rotate(180deg) scale(0.85); } 100% { transform: rotate(360deg) scale(1); } }
  .revi.wiggle .body { animation: revi-wiggle 0.6s ease-in-out 1; }
  @keyframes revi-wiggle { 0%,100% { transform: skewX(0) scaleY(1); } 20% { transform: skewX(-12deg) scaleY(0.94); } 40% { transform: skewX(10deg) scaleY(1.08); } 60% { transform: skewX(-8deg) scaleY(0.96); } 80% { transform: skewX(6deg) scaleY(1.04); } }
  .revi.naughty { animation: revi-shimmy 0.4s ease-in-out infinite; }
  @keyframes revi-shimmy { 0%,100% { transform: translateX(0) rotate(-3deg); } 50% { transform: translateX(8px) rotate(3deg); } }
  .revi .body { width: 100%; height: 100%; }
  .revi .speech { position: absolute; bottom: calc(100% + 4px); left: 50%; transform: translateX(-50%) translateY(4px); background: var(--ink, #1A1814); color: var(--paper, #F7F4EE); font-family: 'Source Serif 4', Georgia, serif; font-size: 12px; padding: 6px 10px; border-radius: 10px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }
  .revi .speech::after { content: ""; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 5px solid transparent; border-top-color: var(--ink, #1A1814); }
  .revi.show-speech .speech { opacity: 1; transform: translateX(-50%) translateY(0); }
  .revi.dodging { transition-duration: .35s; transition-timing-function: cubic-bezier(.22,1.5,.36,1); }
  .revi-checkmark { position: fixed; pointer-events: none; z-index: 89; font-family: 'JetBrains Mono', monospace; color: var(--accent, #C25B3F); font-size: 22px; font-weight: 700; opacity: 0; transition: opacity .4s, transform .8s ease-out; }
  .revi-checkmark.go { opacity: 1; transform: translateY(-30px) scale(1.1); }
  @media (max-width: 720px) { .revi { display: none; } }
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  // SVG character: round body (terracotta), white eye sclera, dark pupils that track cursor,
  // tiny smile, holding a clipboard with a green check.
  const svg = `
  <svg class="body" viewBox="0 0 84 96" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="rv-grad" cx="0.35" cy="0.3" r="0.85">
        <stop offset="0" stop-color="#E89A82"/>
        <stop offset="0.55" stop-color="#C25B3F"/>
        <stop offset="1" stop-color="#9C4530"/>
      </radialGradient>
      <filter id="rv-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4"/>
      </filter>
    </defs>
    <!-- shadow under body -->
    <ellipse cx="42" cy="90" rx="22" ry="3.5" fill="rgba(26,24,20,0.18)"/>
    <!-- antenna -->
    <line x1="42" y1="14" x2="42" y2="6" stroke="#1A1814" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="42" cy="5" r="3" fill="#6E8B6B"/>
    <!-- body (squircle/blob) -->
    <path d="M14 36 C 14 22, 28 12, 42 12 S 70 22, 70 36 L 70 64 C 70 78, 58 84, 42 84 S 14 78, 14 64 Z" fill="url(#rv-grad)"/>
    <!-- inner highlight -->
    <ellipse cx="32" cy="28" rx="10" ry="6" fill="rgba(255,255,255,0.22)"/>
    <!-- face plate -->
    <ellipse cx="42" cy="46" rx="22" ry="18" fill="#F7F4EE"/>
    <!-- eyes (whites) -->
    <ellipse cx="34" cy="44" rx="5" ry="6" fill="#FFFFFF"/>
    <ellipse cx="50" cy="44" rx="5" ry="6" fill="#FFFFFF"/>
    <!-- pupils (move via JS) -->
    <g class="pupils">
      <circle class="pupil" data-cx="34" cy="44" cx="34" r="2.6" fill="#1A1814"/>
      <circle class="pupil" data-cx="50" cy="44" cx="50" r="2.6" fill="#1A1814"/>
    </g>
    <!-- cheek blush -->
    <ellipse cx="28" cy="52" rx="3" ry="2" fill="#E89A82" opacity="0.55"/>
    <ellipse cx="56" cy="52" rx="3" ry="2" fill="#E89A82" opacity="0.55"/>
    <!-- smile -->
    <path class="mouth" d="M37 56 Q 42 60 47 56" fill="none" stroke="#1A1814" stroke-width="1.6" stroke-linecap="round"/>
    <!-- arm + clipboard -->
    <g class="clipboard">
      <rect x="58" y="60" width="18" height="22" rx="2" fill="#F7F4EE" stroke="#1A1814" stroke-width="1.2"/>
      <rect x="64" y="58" width="6" height="3" rx="1" fill="#1A1814"/>
      <line x1="61" y1="66" x2="73" y2="66" stroke="#C7BCA4" stroke-width="0.8"/>
      <line x1="61" y1="70" x2="73" y2="70" stroke="#C7BCA4" stroke-width="0.8"/>
      <line x1="61" y1="74" x2="73" y2="74" stroke="#C7BCA4" stroke-width="0.8"/>
      <path class="check" d="M62 76 l3 3 l7 -7" fill="none" stroke="#6E8B6B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <!-- little feet -->
    <ellipse cx="34" cy="84" rx="5" ry="2.5" fill="#1A1814"/>
    <ellipse cx="50" cy="84" rx="5" ry="2.5" fill="#1A1814"/>
  </svg>`;

  const el = document.createElement('div');
  el.className = 'revi idle';
  el.setAttribute('aria-label', 'Revi — the verifier agent');
  el.innerHTML = svg + '<div class="speech">All systems verified ✓</div>';
  document.body.appendChild(el);

  const phrases = [
    "All systems verified ✓",
    "Looking good!",
    "Claims clean — 98.7%",
    "I checked twice :)",
    "Try to catch me!",
    "AR is healthy today",
    "Hi, I'm Revi",
    "Audit log: open ledger",
    "Denials triaged ✓"
  ];

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;

  // Place at corner initially
  let x = W() - 120, y = H() - 140;
  el.style.left = x + 'px';
  el.style.top = y + 'px';

  let mx = x + 42, my = y + 48;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    // pupils track cursor
    const cx = x + 42, cy = y + 44;
    const dx = mx - cx, dy = my - cy;
    const d = Math.hypot(dx, dy) || 1;
    const ox = Math.max(-1.6, Math.min(1.6, dx / d * 1.6));
    const oy = Math.max(-1.6, Math.min(1.6, dy / d * 1.6));
    el.querySelectorAll('.pupil').forEach(p => {
      const baseX = parseFloat(p.dataset.cx);
      p.setAttribute('cx', (baseX + ox).toFixed(2));
      p.setAttribute('cy', (44 + oy).toFixed(2));
    });
    // dodge if too close
    const closeR = 110;
    if (d < closeR && !el._dodgeCool) {
      dodge();
    }
  });

  function dodge() {
    el._dodgeCool = true;
    el.classList.add('dodging');
    el.classList.remove('idle');
    // Pick a far quadrant
    const margin = 100;
    const candidates = [
      [margin, margin],
      [W() - 120, margin],
      [margin, H() - 140],
      [W() - 120, H() - 140],
      [W() / 2 - 42, H() - 140],
      [W() / 2 - 42, margin]
    ].filter(([px, py]) => Math.hypot(px + 42 - mx, py + 48 - my) > 260);
    const pick = candidates[Math.floor(Math.random() * candidates.length)] || [margin, margin];
    // Pop check effect at old spot
    spawnCheck(x + 42, y + 20);
    el.style.opacity = '0.2';
    setTimeout(() => {
      x = pick[0]; y = pick[1];
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.opacity = '1';
      sayRandom();
    }, 220);
    setTimeout(() => {
      el.classList.remove('dodging');
      el.classList.add('idle');
      el._dodgeCool = false;
    }, 900);
  }

  function spawnCheck(cx, cy) {
    const c = document.createElement('div');
    c.className = 'revi-checkmark';
    c.textContent = '✓';
    c.style.left = (cx - 8) + 'px';
    c.style.top = (cy - 12) + 'px';
    document.body.appendChild(c);
    requestAnimationFrame(() => c.classList.add('go'));
    setTimeout(() => c.remove(), 1100);
  }

  function sayRandom() {
    const p = phrases[Math.floor(Math.random() * phrases.length)];
    el.querySelector('.speech').textContent = p;
    el.classList.add('show-speech');
    clearTimeout(el._sTo);
    el._sTo = setTimeout(() => el.classList.remove('show-speech'), 2200);
  }

  // Periodic wander + speech + occasional antics
  setInterval(() => {
    if (el._dodgeCool) return;
    const r = Math.random();
    if (r < 0.18) {
      // SPIN trick
      el.classList.remove('idle'); el.classList.add('spin');
      setTimeout(() => { el.classList.remove('spin'); el.classList.add('idle'); }, 950);
      sayRandom();
    } else if (r < 0.32) {
      // WIGGLE trick
      el.classList.remove('idle'); el.classList.add('wiggle');
      setTimeout(() => { el.classList.remove('wiggle'); el.classList.add('idle'); }, 650);
    } else if (r < 0.6) {
      // hop to corner
      const margin = 100;
      const corners = [[margin, margin], [W() - 120, margin], [margin, H() - 140], [W() - 120, H() - 140]];
      const pick = corners[Math.floor(Math.random() * corners.length)];
      x = pick[0]; y = pick[1];
      el.style.left = x + 'px'; el.style.top = y + 'px';
    }
    if (Math.random() < 0.45) sayRandom();
  }, 6500);

  // NAUGHTY MODE — once in a while, follow the cursor for a few seconds like a puppy
  setInterval(() => {
    if (el._dodgeCool || el.classList.contains('naughty')) return;
    if (Math.random() < 0.22) {
      el.classList.remove('idle'); el.classList.add('naughty');
      el.querySelector('.speech').textContent = "wheee 🌀";
      el.classList.add('show-speech');
      let ticks = 0;
      const follow = setInterval(() => {
        ticks++;
        // approach cursor but stop short so dodge doesn't trigger immediately
        const tx = mx - 42, ty = my - 130;
        const dx = tx - x, dy = ty - y;
        x += dx * 0.18; y += dy * 0.18;
        x = Math.max(8, Math.min(W() - 92, x));
        y = Math.max(8, Math.min(H() - 104, y));
        el.style.left = x + 'px'; el.style.top = y + 'px';
        if (ticks > 24 || Math.hypot(dx, dy) < 50) {
          clearInterval(follow);
          el.classList.remove('naughty', 'show-speech');
          el.classList.add('idle');
        }
      }, 90);
    }
  }, 14000);

  // Click → spin trick + check burst
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    el.classList.remove('idle'); el.classList.add('spin');
    setTimeout(() => { el.classList.remove('spin'); el.classList.add('idle'); }, 950);
    sayRandom();
    spawnCheck(x + 42, y + 20);
  });

  // Reposition on resize
  window.addEventListener('resize', () => {
    x = Math.min(x, W() - 100);
    y = Math.min(y, H() - 110);
    el.style.left = x + 'px'; el.style.top = y + 'px';
  });
})();
