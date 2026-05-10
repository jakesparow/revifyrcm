/* Shared nav — single source of truth. Injects mega-menu nav into every page. */
(function () {
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  function active(href) { return path === href.toLowerCase() ? ' active' : ''; }
  var html = ''
    + '<a href="index.html" class="logo"><span class="logo-mark"></span> Revify<span style="color:var(--fg-3)">RCM</span></a>'
    + '<div class="nav-links">'

    /* Product */
    + '<div class="nav-item">'
    + '<a class="nav-link">Product <svg class="caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5l3 3 3-3"/></svg></a>'
    + '<div class="mega"><div class="mega-grid"><div class="mega-col">'
    +   '<h6>The agent workforce</h6>'
    +   '<a class="mega-link" href="agents.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6M12 3v6m0 6v6"/></svg></span><div><div class="t">14 production agents</div><div class="d">From eligibility to cash. Always-on.</div></div></a>'
    +   '<a class="mega-link" href="platform.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></span><div><div class="t">Platform &amp; integrations</div><div class="d">Epic, Athena, eCW, Tebra. Bi-directional.</div></div></a>'
    +   '<a class="mega-link" href="https://icdintel.getmaxhealthcare.com" target="_blank" rel="noopener"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span><div><div class="t">ICD Intel</div><div class="d">Autonomous medical coding.</div></div></a>'
    +   '<a class="mega-link" href="outcomes.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 14l4-4 4 4 5-5"/></svg></span><div><div class="t">Outcomes</div><div class="d">96% clean-claim · 22-day AR.</div></div></a>'
    + '</div><div class="mega-feat">'
    +   '<div class="label">Featured</div><h5>Outcomes &amp; pricing</h5>'
    +   '<p>Paid only on what we collect. No platform fees.</p>'
    +   '<a href="outcomes.html" class="arr">See the numbers →</a>'
    + '</div></div></div></div>'

    /* Solutions */
    + '<div class="nav-item">'
    + '<a class="nav-link">Solutions <svg class="caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5l3 3 3-3"/></svg></a>'
    + '<div class="mega"><div class="mega-grid"><div class="mega-col">'
    +   '<h6>By organization</h6>'
    +   '<a class="mega-link" href="contact.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h6M9 13h6M9 17h6"/></svg></span><div><div class="t">Hospitals &amp; health systems</div><div class="d">Multi-specialty, multi-site.</div></div></a>'
    +   '<a class="mega-link" href="contact.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a6 6 0 016-6h6a6 6 0 016 6v2"/></svg></span><div><div class="t">Independent practices</div><div class="d">Solo &amp; small group ownership.</div></div></a>'
    +   '<a class="mega-link" href="contact.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 14l4-4 4 4 5-5"/></svg></span><div><div class="t">RCM companies</div><div class="d">White-label our agents.</div></div></a>'
    +   '<a class="mega-link" href="contact.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span><div><div class="t">Specialty groups</div><div class="d">Cardiology, ortho, oncology, behavioral.</div></div></a>'
    + '</div><div class="mega-feat">'
    +   '<div class="label">Case study</div><h5>$612K recovered</h5>'
    +   '<p>How a 24-provider orthopedic group fixed underpayments in 90 days.</p>'
    +   '<a href="outcomes.html" class="arr">Read the case →</a>'
    + '</div></div></div></div>'

    /* Customers (flat) */
    + '<a class="nav-link' + active('outcomes.html') + '" href="outcomes.html">Customers</a>'

    /* Resources */
    + '<div class="nav-item">'
    + '<a class="nav-link">Resources <svg class="caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5l3 3 3-3"/></svg></a>'
    + '<div class="mega"><div class="mega-grid"><div class="mega-col">'
    +   '<h6>Learn</h6>'
    +   '<a class="mega-link" href="insights.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4h10v18l-5-3-5 3zM12 4h10v18l-5-3-5 3z"/></svg></span><div><div class="t">Insights</div><div class="d">Long-form on AI, denials, the cycle.</div></div></a>'
    +   '<a class="mega-link" href="outcomes.html#roi"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg></span><div><div class="t">ROI calculator</div><div class="d">What a faster AR is worth.</div></div></a>'
    +   '<a class="mega-link" href="security.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span><div><div class="t">Security &amp; HIPAA</div><div class="d">SOC 2, BAA, subprocessors.</div></div></a>'
    +   '<a class="mega-link" href="platform.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></span><div><div class="t">Platform docs</div><div class="d">Integrations &amp; the layer cake.</div></div></a>'
    + '</div><div class="mega-feat">'
    +   '<div class="label">New · this week</div><h5>Monday Read-out</h5>'
    +   '<p>One paragraph on what shifted in healthcare revenue, every Monday.</p>'
    +   '<a href="insights.html" class="arr">Subscribe →</a>'
    + '</div></div></div></div>'

    /* Company */
    + '<div class="nav-item">'
    + '<a class="nav-link">Company <svg class="caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5l3 3 3-3"/></svg></a>'
    + '<div class="mega"><div class="mega-grid"><div class="mega-col">'
    +   '<h6>Who we are</h6>'
    +   '<a class="mega-link" href="company.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 2"/></svg></span><div><div class="t">About</div><div class="d">Bastrop, Texas. Built by operators.</div></div></a>'
    +   '<a class="mega-link" href="team.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M3 21v-1a5 5 0 015-5h2a5 5 0 015 5v1M16 4a4 4 0 010 8M21 21v-1a5 5 0 00-3-4.6"/></svg></span><div><div class="t">Team</div><div class="d">Amanda, Sriram, Greg + the crew.</div></div></a>'
    +   '<a class="mega-link" href="contact.html"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1 0 2 1 2 2v12c0 1-1 2-2 2H4c-1 0-2-1-2-2V6c0-1 1-2 2-2z"/><path d="M22 6L12 13 2 6"/></svg></span><div><div class="t">Contact</div><div class="d">Talk to a human in &lt; 1 day.</div></div></a>'
    +   '<a class="mega-link" href="https://getmaxglobal.com" target="_blank" rel="noopener"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg></span><div><div class="t">getmaxglobal.com ↗</div><div class="d">Our parent platform.</div></div></a>'
    + '</div><div class="mega-feat">'
    +   '<div class="label">Hiring</div><h5>Build with us in Bastrop or Chennai</h5>'
    +   '<p>Healthcare engineers, RCM operators, clinical reviewers.</p>'
    +   '<a href="contact.html" class="arr">Get in touch →</a>'
    + '</div></div></div></div>'

    + '</div>' /* /nav-links */

    + '<div class="nav-cta">'
    +   '<a href="https://getmaxglobal.com" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">Sign in</a>'
    +   '<a href="contact.html#book" class="btn btn-primary btn-sm">Book a demo →</a>'
    + '</div>';

  function mount() {
    var nav = document.querySelector('nav.nav');
    if (!nav) return;
    /* Wipe ANY pre-existing children (nav-inner + stray nav-cta) and rebuild. */
    nav.innerHTML = '<div class="nav-inner">' + html + '</div>';
    var inner = nav.querySelector('.nav-inner');
    /* Tap-to-open on touch (hover doesn't work). */
    inner.querySelectorAll('.nav-item > .nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var item = link.parentElement;
        if (window.matchMedia('(hover: none)').matches) {
          e.preventDefault();
          var open = item.classList.contains('open');
          inner.querySelectorAll('.nav-item.open').forEach(function (n) { n.classList.remove('open'); });
          if (!open) item.classList.add('open');
        }
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-item')) {
        inner.querySelectorAll('.nav-item.open').forEach(function (n) { n.classList.remove('open'); });
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
