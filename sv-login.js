/* SV Apps login gate + login log. Include: <script src="/sv-login.js" data-app="AppName" defer></script> */
(function () {
  var APP = (document.currentScript && document.currentScript.getAttribute('data-app')) || 'Unknown App';
  var KEY = 'sv.login.v1';
  var LOG_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfAccvHMtx-nvEFsLtdQbjYo03twnJmWvX390zD3R0ya0RUNQ/formResponse';
  var E_NAME = 'entry.1092863471', E_PHONE = 'entry.1251157095', E_APP = 'entry.1851605452';
  function log(name, phone) {
    try {
      var p = new URLSearchParams();
      p.append(E_NAME, name); p.append(E_PHONE, phone); p.append(E_APP, APP);
      fetch(LOG_URL, { method: 'POST', mode: 'no-cors', body: p }).catch(function () {});
    } catch (e) {}
  }
  function stored() {
    try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.name && /^[0-9]{10}$/.test(s.phone)) return s; } catch (e) {}
    return null;
  }
  function show() {
    var te = (navigator.language || '').toLowerCase().indexOf('te') === 0;
    var o = document.createElement('div');
    o.id = 'sv-login-gate';
    o.innerHTML =
      '<div style="position:fixed;inset:0;z-index:999999;background:#0b1220;display:flex;align-items:center;justify-content:center;padding:18px;font-family:system-ui,\'Nirmala UI\',sans-serif">' +
      '<div style="background:#16223a;border:1px solid #3a5170;border-radius:18px;padding:26px;max-width:420px;width:100%;color:#f2f6ff">' +
      '<div style="font-size:19px;font-weight:800;margin-bottom:4px">SV Apps</div>' +
      '<div style="color:#bcd;font-size:14px;margin-bottom:16px">' + (te ? 'కొనసాగడానికి మీ పేరు + మొబైల్ నంబర్ ఇవ్వండి' : 'Enter your name + mobile number to continue') + '</div>' +
      '<label style="display:block;font-size:13px;color:#bcd;margin:10px 0 4px">' + (te ? 'మీ పేరు' : 'Your name') + ' *</label>' +
      '<input id="sv-lg-name" autocomplete="name" style="width:100%;box-sizing:border-box;min-height:46px;padding:10px;border-radius:10px;border:1px solid #4a628a;background:#0e1730;color:#fff;font-size:16px">' +
      '<label style="display:block;font-size:13px;color:#bcd;margin:12px 0 4px">' + (te ? 'మొబైల్ నంబర్ (10 అంకెలు)' : 'Mobile number (10 digits)') + ' *</label>' +
      '<input id="sv-lg-phone" inputmode="numeric" autocomplete="tel" style="width:100%;box-sizing:border-box;min-height:46px;padding:10px;border-radius:10px;border:1px solid #4a628a;background:#0e1730;color:#fff;font-size:16px">' +
      '<div id="sv-lg-err" style="color:#ff9b9b;font-size:13px;min-height:18px;margin-top:8px"></div>' +
      '<button id="sv-lg-go" style="width:100%;min-height:50px;margin-top:10px;border:0;border-radius:12px;background:#ffd166;color:#3a2a00;font-weight:800;font-size:16px;cursor:pointer">' + (te ? 'కొనసాగండి' : 'Continue') + '</button>' +
      '<div style="margin-top:12px;font-size:12px;color:#8fa5c4;text-align:center"><a style="color:#7fd4ff" href="https://docs.google.com/forms/d/e/1FAIpQLSd5HiAFGELLqTeisbQN9uPx69FRHnKWrbLKff4Qdu4FONLC7A/viewform" target="_blank" rel="noopener">' + (te ? 'అభిప్రాయం పంపండి' : 'Send feedback') + '</a></div>' +
      '</div></div>';
    function mount() {
      document.body.appendChild(o);
      o.querySelector('#sv-lg-go').addEventListener('click', function () {
        var n = o.querySelector('#sv-lg-name').value.trim();
        var p = o.querySelector('#sv-lg-phone').value.replace(/[^0-9]/g, '');
        var err = o.querySelector('#sv-lg-err');
        if (n.length < 2) { err.textContent = te ? 'పేరు ఇవ్వండి' : 'Please enter your name'; return; }
        if (!/^[0-9]{10}$/.test(p)) { err.textContent = te ? 'సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి' : 'Enter a valid 10-digit mobile number'; return; }
        try { localStorage.setItem(KEY, JSON.stringify({ name: n, phone: p })); } catch (e) {}
        log(n, p);
        o.remove();
      });
    }
    if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  }
  var s = stored();
  if (s) { try { var k2 = 'svl.logged.' + APP; if (!sessionStorage.getItem(k2)) { sessionStorage.setItem(k2, '1'); log(s.name, s.phone); } } catch (e) { log(s.name, s.phone); } } else { show(); }
})();
