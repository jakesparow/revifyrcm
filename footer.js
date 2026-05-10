/* Shared footer — single source of truth across every page. */
(function () {
  var html = ''
    + '<div class="container">'
    +   '<div>'
    +     '<div class="logo" style="margin-bottom:16px;"><span class="logo-mark"></span> Revify<span style="color:var(--fg-3)">RCM</span></div>'
    +     '<p class="brand-blurb"><b>The AI-native revenue cycle.</b> Headquartered in Bastrop, Texas. Engineering in Chennai. Operations across the U.S. South.</p>'
    +   '</div>'
    +   '<div><h5>Product</h5><ul>'
    +     '<li><a href="agents.html">Agents</a></li>'
    +     '<li><a href="platform.html">Platform</a></li>'
    +     '<li><a href="outcomes.html">Outcomes</a></li>'
    +     '<li><a href="https://icdintel.getmaxhealthcare.com" target="_blank" rel="noopener">ICD Intel ↗</a></li>'
    +   '</ul></div>'
    +   '<div><h5>Solutions</h5><ul>'
    +     '<li><a href="contact.html">Hospitals</a></li>'
    +     '<li><a href="contact.html">Practices</a></li>'
    +     '<li><a href="contact.html">RCM companies</a></li>'
    +     '<li><a href="outcomes.html">Customers</a></li>'
    +   '</ul></div>'
    +   '<div><h5>Resources</h5><ul>'
    +     '<li><a href="insights.html">Insights</a></li>'
    +     '<li><a href="outcomes.html#roi">ROI calculator</a></li>'
    +     '<li><a href="security.html">Security &amp; HIPAA</a></li>'
    +   '</ul></div>'
    +   '<div><h5>Company</h5><ul>'
    +     '<li><a href="company.html">About</a></li>'
    +     '<li><a href="team.html">Team</a></li>'
    +     '<li><a href="contact.html">Contact</a></li>'
    +     '<li><a href="https://getmaxglobal.com" target="_blank" rel="noopener">getmaxglobal.com ↗</a></li>'
    +   '</ul></div>'
    + '</div>'
    + '<div class="footer-bottom">'
    +   '<span>© 2026 RevifyRCM, Inc. · Bastrop, TX · <a href="privacy.html" style="color:inherit;text-decoration:underline;text-decoration-color:rgba(247,244,238,0.25);">Privacy</a> · <a href="terms.html" style="color:inherit;text-decoration:underline;text-decoration-color:rgba(247,244,238,0.25);">Terms</a> · <a href="security.html" style="color:inherit;text-decoration:underline;text-decoration-color:rgba(247,244,238,0.25);">Security</a></span>'
    +   '<span class="mono" style="display:flex;gap:14px;align-items:center;">'
    +     '<span>SOC 2 · HIPAA · HITRUST</span>'
    +     '<span class="footer-socials" style="display:inline-flex;gap:12px;margin-left:8px;">'
    +       '<a href="https://www.linkedin.com/company/revify-rcm-group" aria-label="LinkedIn" target="_blank" rel="noopener" style="color:rgba(247,244,238,0.55);"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 11.001 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM10 9h3.6v1.7h.05c.5-.95 1.74-1.95 3.58-1.95 3.83 0 4.54 2.52 4.54 5.8V21H17v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10z"/></svg></a>'
    +       '<a href="https://x.com/revifyrcm" aria-label="X" target="_blank" rel="noopener" style="color:rgba(247,244,238,0.55);"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21l-6.5 7.43L22 22h-6.78l-4.7-6.13L4.92 22H2.16l6.95-7.95L2 2h6.93l4.25 5.56L18.244 2zm-1.18 18h1.62L7.04 4H5.3l11.764 16z"/></svg></a>'
    +     '</span>'
    +   '</span>'
    + '</div>';
  function mount() {
    var f = document.querySelector('footer.footer');
    if (!f) return;
    f.innerHTML = html;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
