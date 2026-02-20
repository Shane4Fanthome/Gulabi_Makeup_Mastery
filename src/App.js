import { useState, useEffect } from "react";

/* ── Font injection ─────────────────────────────────────────── */
(function injectFonts() {
  if (document.getElementById("gf")) return;
  const l = document.createElement("link");
  l.id = "gf"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;0,6..96,400;1,6..96,300;1,6..96,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap";
  document.head.appendChild(l);
})();

/* ── Global CSS ─────────────────────────────────────────────── */
const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:      #FAF6EE;
    --bg2:     #F3EDE0;
    --bg3:     #EDE4D3;
    --ink:     #1A1108;
    --ink2:    #3D2E1A;
    --ink3:    #6B5540;
    --bord:    #7A1030;
    --crim:    #9E1838;
    --ant:     #B8924A;
    --gold:    #C9A96E;
    --deep:    #8A6830;
    --champ:   #E8D4A0;
    --hair:    rgba(139,106,48,.18);
    --hair2:   rgba(139,106,48,.09);
    --shadow:  rgba(26,17,8,.08);
  }
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--ink);font-family:'Cormorant Garamond',Georgia,serif;overflow-x:hidden}
  ::selection{background:var(--crim);color:#FAF6EE}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-track{background:var(--bg)}
  ::-webkit-scrollbar-thumb{background:var(--ant)}

  @keyframes rUp   {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes rLeft {from{opacity:0;transform:translateX(-38px)}to{opacity:1;transform:translateX(0)}}
  @keyframes fIn   {from{opacity:0}to{opacity:1}}
  @keyframes sCIn  {from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
  @keyframes drift {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(1deg)}}
  @keyframes shg   {0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes tick  {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes pls   {0%,100%{opacity:.5}50%{opacity:1}}
  @keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes floatIn{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}

  .u-up  {animation:rUp   .85s cubic-bezier(.22,.68,0,1.15) both}
  .u-lft {animation:rLeft .85s cubic-bezier(.22,.68,0,1.15) both}
  .u-in  {animation:fIn   .7s ease both}
  .u-sc  {animation:sCIn  .6s ease both}
  .u-dr  {animation:drift 9s ease-in-out infinite}

  .gt{
    background:linear-gradient(90deg,#7A5320 0%,#C9A96E 30%,#E8D4A0 50%,#C9A96E 70%,#7A5320 100%);
    background-size:200% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;animation:shg 5s linear infinite;
  }

  .e-nav{
    font-family:'Montserrat',sans-serif;font-size:.58rem;font-weight:400;
    letter-spacing:.2em;text-transform:uppercase;
    color:var(--ink3);cursor:pointer;text-decoration:none;transition:color .3s;
  }
  .e-nav:hover,.e-nav.act{color:var(--bord)}

  /* Card / Panel */
  .card{
    background:#fff;border:1px solid var(--hair);
    box-shadow:0 2px 24px var(--shadow);
    transition:box-shadow .35s,border-color .35s,transform .35s;
  }
  .card:hover{box-shadow:0 8px 48px rgba(26,17,8,.13);border-color:var(--gold)}

  /* Glass for dark modals only */
  .glass-d{
    background:rgba(26,17,8,.88);backdrop-filter:blur(24px);
    border:1px solid rgba(201,169,110,.2);
  }

  .btn-g{
    font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:500;
    letter-spacing:.22em;text-transform:uppercase;
    color:#fff;background:linear-gradient(135deg,#7A1030,#B01848,#7A1030);
    background-size:200%;border:none;cursor:pointer;transition:all .35s;
  }
  .btn-g:hover{background-position:100%;box-shadow:0 8px 32px rgba(122,16,48,.35);transform:translateY(-2px)}

  .btn-o{
    font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:400;
    letter-spacing:.22em;text-transform:uppercase;
    color:var(--bord);background:transparent;
    border:1px solid rgba(122,16,48,.35);cursor:pointer;transition:all .3s;
  }
  .btn-o:hover{border-color:var(--bord);background:rgba(122,16,48,.05);transform:translateY(-2px)}

  .btn-gold{
    font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:500;
    letter-spacing:.22em;text-transform:uppercase;
    color:var(--ink);background:linear-gradient(135deg,#C9A96E,#E8D4A0,#C9A96E);
    background-size:200%;border:none;cursor:pointer;transition:all .35s;
  }
  .btn-gold:hover{background-position:100%;box-shadow:0 8px 28px rgba(201,169,110,.4);transform:translateY(-2px)}

  .ef{
    width:100%;background:transparent;border:0;
    border-bottom:1px solid var(--hair);
    padding:13px 0;color:var(--ink);
    font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:300;
    outline:none;transition:border-color .3s;
  }
  .ef:focus{border-color:var(--ant)}
  .ef::placeholder{color:var(--ink3);font-style:italic;opacity:.6}

  .ca{
    font-family:'Montserrat',sans-serif;font-size:.55rem;letter-spacing:.12em;
    padding:7px 15px;border:1px solid var(--hair);
    color:var(--ink2);cursor:pointer;transition:all .25s;
    text-transform:uppercase;background:#fff;
  }
  .ca:hover,.ca.sel{background:var(--bord);border-color:var(--bord);color:#fff}
  .cb{
    font-family:'Montserrat',sans-serif;font-size:.55rem;letter-spacing:.12em;
    padding:7px 15px;border:1px solid var(--hair2);
    color:var(--ink3);cursor:not-allowed;text-decoration:line-through;
    text-transform:uppercase;background:var(--bg2);opacity:.55;
  }

  .bdg{
    display:inline-block;font-family:'Montserrat',sans-serif;font-size:.46rem;
    font-weight:600;letter-spacing:.18em;text-transform:uppercase;
    padding:3px 11px;border-radius:0;
  }
  .bdg-red{background:rgba(122,16,48,.1);color:var(--bord);border:1px solid rgba(122,16,48,.2)}
  .bdg-gold{background:rgba(201,169,110,.12);color:var(--deep);border:1px solid rgba(201,169,110,.3)}

  /* Course card */
  .cc{
    background:#fff;border:1px solid var(--hair);
    position:relative;overflow:hidden;
    transition:border-color .4s,transform .4s,box-shadow .4s;
  }
  .cc:hover{border-color:var(--gold);transform:translateY(-6px);box-shadow:0 28px 60px rgba(26,17,8,.12)}

  .st{height:2px;background:var(--bg3)}
  .sf{height:100%;background:linear-gradient(90deg,var(--bord),var(--gold));transition:width .8s}

  /* Metric card */
  .mc{background:#fff;border:1px solid var(--hair);box-shadow:0 2px 16px var(--shadow);position:relative;overflow:hidden}
  .mc::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}

  .tc{border:1px solid var(--hair);background:#fff;transition:border-color .4s,box-shadow .3s}
  .tc:hover{border-color:var(--gold);box-shadow:0 6px 32px var(--shadow)}

  .uo{
    border:1px solid var(--hair);padding:14px 19px;
    display:flex;align-items:center;gap:11px;cursor:pointer;
    transition:all .25s;font-family:'Montserrat',sans-serif;
    font-size:.6rem;letter-spacing:.1em;
    color:var(--ink2);text-transform:uppercase;background:#fff;
  }
  .uo:hover,.uo.sel{border-color:var(--bord);background:rgba(122,16,48,.04);color:var(--bord)}

  /* Modal */
  .mb{position:fixed;inset:0;z-index:2000;background:rgba(26,17,8,.7);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;animation:fIn .3s ease}
  .mbx{background:#FAF6EE;border:1px solid var(--hair);box-shadow:0 32px 80px rgba(26,17,8,.25);max-width:500px;width:92%;max-height:92vh;overflow-y:auto;animation:sCIn .35s ease}

  .dt{font-family:'Montserrat',sans-serif;font-size:.5rem;letter-spacing:.2em;color:var(--ink3);text-transform:uppercase}

  .dtb{font-family:'Montserrat',sans-serif;font-size:.54rem;letter-spacing:.16em;text-transform:uppercase;padding:9px 20px;border:0;border-bottom:2px solid transparent;cursor:pointer;transition:all .25s;color:var(--ink3);background:transparent}
  .dtb.act{border-bottom-color:var(--bord);color:var(--bord)}
  .dtb:hover:not(.act){color:var(--ink)}

  .sn{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Bodoni Moda',serif;font-style:italic;font-size:.88rem;border:1.5px solid;transition:all .35s}
  .ld{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:pls 2s ease-in-out infinite}

  .mq{overflow:hidden;background:var(--bg2);border-top:1px solid var(--hair);border-bottom:1px solid var(--hair)}
  .mqi{display:flex;gap:0;white-space:nowrap;animation:tick 28s linear infinite}

  .dc{padding:13px 10px;text-align:center;cursor:pointer;border:1px solid var(--hair);min-width:62px;transition:all .25s;background:#fff}
  .dc:hover,.dc.sel{border-color:var(--bord);background:rgba(122,16,48,.05)}
  .dc.nx{opacity:.3;cursor:not-allowed;background:var(--bg2)}

  .rb{background:linear-gradient(180deg,var(--bord),rgba(201,169,110,.5));border-radius:2px 2px 0 0;transition:height .6s}

  /* Section label */
  .sec-label{font-family:'Montserrat',sans-serif;font-size:.52rem;letter-spacing:.32em;color:var(--bord);text-transform:uppercase}

  /* Divider line */
  .hairline{width:100%;height:1px;background:var(--hair)}

  @media(max-width:768px){.hb{font-size:3.4rem !important}.hs{font-size:1.1rem !important}.mh{display:none !important}.tc2{grid-template-columns:1fr !important}}
`;

(function injectCSS() {
  if (document.getElementById("gc")) return;
  const s = document.createElement("style"); s.id = "gc"; s.textContent = CSS; document.head.appendChild(s);
})();

/* ── Icons ─────────────────────────────────────────────────── */
const I = {
  Bridal: () => <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"><circle cx="13" cy="9" r="5.2"/><path d="M7.5 21C7.5 16 10 14 13 14s5.5 2 5.5 7"/><path d="M10 6.5Q13 3.5 16 6.5"/><path d="M4.5 7.5Q7.5 4.5 10 6.5"/><path d="M21.5 7.5Q18.5 4.5 16 6.5"/></svg>,
  Party: () => <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"><path d="M13 2.5 L14.6 8.3H21L16.1 12.2 17.7 18 13 14.4 8.3 18 9.9 12.2 5 8.3H11.4Z"/><path d="M6 22v.3" strokeWidth="1.5"/><path d="M20 22v.3" strokeWidth="1.5"/></svg>,
  Ring: () => <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"><circle cx="13" cy="15.5" r="7.2"/><circle cx="13" cy="15.5" r="4.4"/><path d="M10.2 8L13 3.5 15.8 8"/><line x1="13" y1="3.5" x2="13" y2="8"/></svg>,
  Grad: () => <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"><path d="M3 11L13 6l10 5-10 5Z"/><path d="M7.5 13.5v6.5Q13 23 18.5 20V13.5"/><path d="M23 11v5"/></svg>,
  Diamond: () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth=".85" strokeLinejoin="round"><path d="M6.5 1L12.5 5.2 6.5 12 .5 5.2Z"/><path d="M.5 5.2h12"/><path d="M4.2 1l2.3 4.2L8.8 1"/></svg>,
  Arrow: () => <svg width="19" height="10" viewBox="0 0 19 10" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"><path d="M1 5h17M12 1.5l5.5 3.5-5.5 3.5"/></svg>,
  Check: () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M1.5 6.5l3 3 6-7"/></svg>,
  Close: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><path d="M2 2l10 10M12 2L2 12"/></svg>,
  Star: () => <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor"><path d="M5.5 1 6.7 4.1h3.5L7.5 5.9l1.2 3.1L5.5 7.1 2.3 9l1.2-3.1L.8 4.1h3.5Z"/></svg>,
  Insta: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg>,
  Play: () => <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 2.5L13 8 4 13.5Z" fill="currentColor"/></svg>,
  Orn: () => <svg width="120" height="14" viewBox="0 0 120 14" fill="none"><line x1="0" y1="7" x2="44" y2="7" stroke="rgba(139,106,48,.3)" strokeWidth=".8"/><path d="M50 7l3.5-4 3.5 4-3.5 4Z" stroke="rgba(139,106,48,.5)" strokeWidth=".8" fill="none"/><circle cx="60" cy="7" r="2" stroke="rgba(139,106,48,.55)" strokeWidth=".8" fill="none"/><path d="M63 7l3.5-4 3.5 4-3.5 4Z" stroke="rgba(139,106,48,.5)" strokeWidth=".8" fill="none"/><line x1="76" y1="7" x2="120" y2="7" stroke="rgba(139,106,48,.3)" strokeWidth=".8"/></svg>,
  CTL: () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(139,106,48,.3)" strokeWidth=".9"><path d="M1 13V1h12"/></svg>,
  CBR: () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(139,106,48,.3)" strokeWidth=".9"><path d="M27 15v12H15"/></svg>,
  QR: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><rect x="2" y="2" width="8" height="8"/><rect x="14" y="2" width="8" height="8"/><rect x="2" y="14" width="8" height="8"/><rect x="5" y="5" width="2" height="2" fill="currentColor" stroke="none"/><rect x="17" y="5" width="2" height="2" fill="currentColor" stroke="none"/><rect x="5" y="17" width="2" height="2" fill="currentColor" stroke="none"/><path d="M14 14h2v2h-2zM18 14h4M14 18h2M18 18h4v4M22 14v2"/></svg>,
};

/* ── Data ───────────────────────────────────────────────────── */
const SVCS = [
  { id:"bridal",  no:"I",   title:"Bridal Artistry",     sub:"The Ceremonial Look",      desc:"Timeless, camera-perfect makeup crafted to last 14+ hours. Every detail calibrated to your skin, heritage and vision.", price:"₹8,000 – ₹25,000", icon:"Bridal" },
  { id:"party",   no:"II",  title:"Evening Glamour",      sub:"The Statement Look",       desc:"Commanding, luminous looks for soirées, receptions and galas — from barely-there radiance to bold editorial drama.",    price:"₹3,000 – ₹8,000",  icon:"Party"  },
  { id:"engage",  no:"III", title:"Engagement Beauty",    sub:"The Promise Look",         desc:"Photograph-ready artistry for your ceremony — luminous skin, defined eyes, an impeccable finish that lasts.",          price:"₹5,000 – ₹15,000", icon:"Ring"   },
  { id:"groom",   no:"IV",  title:"Grooming Ateliers",    sub:"The Education Experience", desc:"Intimate batches of ten. Master professional technique under direct guidance — contouring, eye architecture, longevity.",price:"₹14,999 / batch",  icon:"Grad"   },
];
const CRS = [
  { id:1, no:"I",   title:"Bridal Glow Masterclass",    hrs:"24-Hour Intensive",  price:4999,  orig:8999,  seats:3, total:10, badge:"BESTSELLER",  btype:"red",  acc:"#7A1030", desc:"Foundation mastery, bridal contouring, longevity rituals and the signature Gulabi glow.",   mods:["Foundation & Skin Prep","Bridal Contouring","Eye Drama Technique","Longevity Masterclass"] },
  { id:2, no:"II",  title:"Evening Glam Deep Dive",     hrs:"36-Hour Programme",  price:6999,  orig:12999, seats:5, total:10, badge:"PREMIUM",     btype:"gold", acc:"#8A6830", desc:"Smokey architecture, editorial highlights, glass-skin techniques and night-ready artistry.",  mods:["Smokey Eye Architecture","Glass Skin Ritual","Highlight Mastery","Colour Theory"] },
  { id:3, no:"III", title:"The Complete Grooming Bible", hrs:"36-Hour Curriculum", price:8999,  orig:16999, seats:2, total:10, badge:"MASTER CLASS",btype:"red",  acc:"#7A1030", desc:"Full-spectrum curriculum — every technique, live model sessions and certification included.", mods:["Skincare Foundation","All Makeup Genres","Live Model Sessions","Certificate Awarded"] },
];
const TESTI = [
  { name:"Priya Sharma",   role:"Bride · Leela Palace Reception",       text:"Gulabi transformed me into the most radiant version of myself. The makeup lasted 14 hours and every photograph was flawless. Absolute mastery." },
  { name:"Ananya Reddy",   role:"Guest · Corporate Gala, ITC Windsor",  text:"I have sat in many artists' chairs. Gulabi's understanding of light, structure and skin is in an entirely different league. Extraordinary." },
  { name:"Meera Krishnan", role:"Student · 36-Hour Masterclass",         text:"The curriculum changed everything I understood about makeup. The precision, the patience, the artistry — I now run my own studio." },
  { name:"Divya Patel",    role:"Bride · Engagement & Wedding",          text:"From the first trial to the final day, Gulabi was impeccable. She captured my vision before I could articulate it. A true artiste." },
  { name:"Rhea Nair",      role:"Brand Manager · Campaign Collaboration",text:"Working with Gulabi on our product campaign was revelatory. She brought an editorial sensibility that elevated the entire production." },
];
const SLOTS  = { "2025-02-22":["10:00 AM","12:00 PM","3:00 PM","5:00 PM"],"2025-02-23":["11:00 AM","2:00 PM","4:00 PM"],"2025-02-24":["10:00 AM","1:00 PM"],"2025-02-25":["11:00 AM","12:00 PM","3:00 PM","6:00 PM"],"2025-02-26":["10:00 AM","2:00 PM","5:00 PM"] };
const BOOKED = { "2025-02-22":["12:00 PM"],"2025-02-24":["10:00 AM"],"2025-02-26":["10:00 AM","5:00 PM"] };
const UPI_ID = "9632272041@pthdfc";

/* ── Abstract Glamour Hero Artwork ─────────────────────────── */
/* Vogue-editorial luxury composition — geometric & floral abstraction */
function GlamourArt() {
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {/* Slow rotating outer ring */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg viewBox="0 0 480 480" style={{ width:"100%", height:"100%", animation:"rotate 60s linear infinite", opacity:.22 }}>
          <circle cx="240" cy="240" r="220" stroke="#8A6830" strokeWidth=".8" fill="none" strokeDasharray="8 14"/>
        </svg>
      </div>
      {/* Counter-rotating middle ring */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg viewBox="0 0 480 480" style={{ width:"100%", height:"100%", animation:"rotate 40s linear infinite reverse", opacity:.18 }}>
          <circle cx="240" cy="240" r="180" stroke="#B8924A" strokeWidth=".6" fill="none" strokeDasharray="3 8"/>
        </svg>
      </div>

      {/* Main composition SVG */}
      <svg viewBox="0 0 480 480" style={{ width:"90%", height:"90%", position:"absolute" }}>
        <defs>
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A96E" stopOpacity=".25"/>
            <stop offset="100%" stopColor="#7A1030" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="glow2" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#E8D4A0" stopOpacity=".3"/>
            <stop offset="100%" stopColor="#C9A96E" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="strokeG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A1030"/>
            <stop offset="50%" stopColor="#C9A96E"/>
            <stop offset="100%" stopColor="#7A1030"/>
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {/* Soft glow background */}
        <ellipse cx="240" cy="240" rx="200" ry="200" fill="url(#glow1)"/>
        <ellipse cx="240" cy="200" rx="140" ry="160" fill="url(#glow2)"/>

        {/* Architectural concentric arcs — top half */}
        <path d="M 80 260 A 160 160 0 0 1 400 260" stroke="#C9A96E" strokeWidth="1" fill="none" opacity=".35"/>
        <path d="M 100 260 A 140 140 0 0 1 380 260" stroke="#C9A96E" strokeWidth=".6" fill="none" opacity=".28"/>
        <path d="M 120 260 A 120 120 0 0 1 360 260" stroke="#8A6830" strokeWidth=".5" fill="none" opacity=".25"/>

        {/* Central elegant frame */}
        <rect x="155" y="110" width="170" height="230" stroke="url(#strokeG)" strokeWidth="1" fill="none" rx="0" opacity=".4"/>
        <rect x="163" y="118" width="154" height="214" stroke="#C9A96E" strokeWidth=".5" fill="none" opacity=".2"/>

        {/* Corner flourishes on inner frame */}
        <path d="M155 130 L155 110 L175 110" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M325 130 L325 110 L305 110" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M155 320 L155 340 L175 340" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M325 320 L325 340 L305 340" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

        {/* Abstract face — ultra minimal, fashion illustration style */}
        {/* Elegant oval head */}
        <ellipse cx="240" cy="205" rx="52" ry="65" fill="none" stroke="#8A6830" strokeWidth="1" opacity=".55"/>

        {/* Flowing hair — left side sweeping lines */}
        <path d="M 188 175 Q 170 150 178 115 Q 185 90 200 80" stroke="#4A2810" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".7"/>
        <path d="M 186 190 Q 162 170 168 130 Q 174 100 190 85" stroke="#4A2810" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".45"/>
        <path d="M 190 200 Q 168 188 172 155 Q 176 128 188 112" stroke="#6B3C18" strokeWidth=".8" fill="none" strokeLinecap="round" opacity=".35"/>

        {/* Flowing hair — right side */}
        <path d="M 292 175 Q 310 150 302 115 Q 295 90 280 80" stroke="#4A2810" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".7"/>
        <path d="M 294 190 Q 318 170 312 130 Q 306 100 290 85" stroke="#4A2810" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".45"/>

        {/* Hair top sweep */}
        <path d="M 200 80 Q 240 60 280 80" stroke="#4A2810" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".65"/>
        <path d="M 195 88 Q 240 68 285 88" stroke="#6B3C18" strokeWidth="1" fill="none" strokeLinecap="round" opacity=".4"/>

        {/* Minimal eye — left, just a refined stroke */}
        <path d="M 212 190 Q 220 184 228 190 Q 220 196 212 190Z" fill="#2A1508" opacity=".8"/>
        <path d="M 210 189 Q 220 181 230 189" stroke="#1A0A04" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M 228 189 L 233 184" stroke="#1A0A04" strokeWidth=".9" strokeLinecap="round"/>

        {/* Minimal eye — right */}
        <path d="M 252 190 Q 260 184 268 190 Q 260 196 252 190Z" fill="#2A1508" opacity=".8"/>
        <path d="M 250 189 Q 260 181 270 189" stroke="#1A0A04" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M 268 189 L 273 184" stroke="#1A0A04" strokeWidth=".9" strokeLinecap="round"/>

        {/* Arched brows — thin and precise */}
        <path d="M 209 181 Q 220 175 229 178" stroke="#2A1508" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".8"/>
        <path d="M 251 178 Q 260 175 271 181" stroke="#2A1508" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".8"/>

        {/* Lips — bold, sculpted */}
        <path d="M 222 228 Q 232 221 240 224 Q 248 221 258 228 Q 252 239 240 243 Q 228 239 222 228Z" fill="#9E1838" opacity=".85"/>
        <path d="M 222 228 Q 230 220 237 223 Q 240 219 243 223 Q 250 220 258 228 Q 249 224 240 225 Q 231 224 222 228Z" fill="#B82040" opacity=".6"/>
        <ellipse cx="235" cy="232" rx="5.5" ry="2" fill="rgba(255,255,255,.18)"/>

        {/* Nose — barely-there suggestion */}
        <path d="M 234 200 Q 232 214 228 220 Q 235 223 252 220 Q 248 214 246 200" stroke="rgba(100,55,20,.22)" strokeWidth=".9" fill="none" strokeLinecap="round"/>

        {/* Gold tiara / headpiece */}
        <path d="M 200 105 Q 220 88 240 82 Q 260 88 280 105" stroke="#C9A96E" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".9"/>
        <circle cx="240" cy="79" r="4" fill="#C9A96E" opacity=".9"/>
        <circle cx="240" cy="79" r="2" fill="#E8D4A0" opacity=".95"/>
        <line x1="225" y1="93" x2="225" y2="100" stroke="#C9A96E" strokeWidth="1" opacity=".6"/>
        <line x1="240" y1="88" x2="240" y2="96" stroke="#C9A96E" strokeWidth="1.1" opacity=".7"/>
        <line x1="255" y1="93" x2="255" y2="100" stroke="#C9A96E" strokeWidth="1" opacity=".6"/>
        <circle cx="225" cy="98" r="1.5" fill="#C9A96E" opacity=".7"/>
        <circle cx="255" cy="98" r="1.5" fill="#C9A96E" opacity=".7"/>

        {/* Drop earring — left */}
        <line x1="189" y1="218" x2="189" y2="232" stroke="#C9A96E" strokeWidth="1" opacity=".7"/>
        <ellipse cx="189" cy="236" rx="3.5" ry="5" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".65"/>
        <ellipse cx="189" cy="236" rx="1.5" ry="2" fill="#C9A96E" opacity=".5"/>

        {/* Drop earring — right */}
        <line x1="291" y1="218" x2="291" y2="232" stroke="#C9A96E" strokeWidth="1" opacity=".7"/>
        <ellipse cx="291" cy="236" rx="3.5" ry="5" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".65"/>
        <ellipse cx="291" cy="236" rx="1.5" ry="2" fill="#C9A96E" opacity=".5"/>

        {/* Elegant neckline suggestion */}
        <path d="M 210 270 Q 240 285 270 270 Q 280 290 260 310 Q 240 320 220 310 Q 200 290 210 270Z" stroke="#8A6830" strokeWidth=".8" fill="rgba(201,169,110,.08)" opacity=".6"/>

        {/* Decorative gold dots — scattered */}
        {[[130,150],[130,330],[350,150],[350,330],[90,240],[390,240]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#C9A96E" opacity=".35"/>
        ))}

        {/* Petal / leaf flourishes */}
        <path d="M 130 240 Q 110 220 120 200 Q 135 215 130 240Z" fill="#C9A96E" opacity=".18"/>
        <path d="M 130 240 Q 110 260 120 280 Q 135 265 130 240Z" fill="#C9A96E" opacity=".15"/>
        <path d="M 350 240 Q 370 220 360 200 Q 345 215 350 240Z" fill="#C9A96E" opacity=".18"/>
        <path d="M 350 240 Q 370 260 360 280 Q 345 265 350 240Z" fill="#C9A96E" opacity=".15"/>

        {/* Fine horizontal rule with diamonds */}
        <line x1="60" y1="355" x2="420" y2="355" stroke="#C9A96E" strokeWidth=".6" opacity=".3"/>
        <path d="M 232 355 l 8-6 8 6-8 6Z" fill="#C9A96E" opacity=".55"/>

        {/* Signature text */}
        <text x="240" y="380" textAnchor="middle" fontFamily="'Bodoni Moda',serif" fontSize="22" fontStyle="italic" fill="#8A6830" opacity=".7">Gulabi</text>
        <text x="240" y="398" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="7.5" fill="#8A6830" opacity=".45" letterSpacing="5">BANGALORE</text>
      </svg>
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────── */
function Nav({ sec, goTo, admin, setAdmin }) {
  const [scr, setScr] = useState(false);
  useEffect(() => { const h = () => setScr(window.scrollY > 55); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const lnks = [["home","Home"],["services","Services"],["book","Book"],["courses","Courses"],["portfolio","Portfolio"],["testimonials","Testimonials"],["social","Social"]];
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:900,
      background: scr ? "rgba(250,246,238,.96)" : "transparent",
      backdropFilter: scr ? "blur(20px)" : "none",
      borderBottom: scr ? "1px solid var(--hair)" : "1px solid transparent",
      transition:"all .4s", padding:"0 5%",
      boxShadow: scr ? "0 2px 24px rgba(26,17,8,.07)" : "none" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",height:"68px" }}>
        <div>
          <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.9rem",
            background:"linear-gradient(135deg,#7A1030,#B8924A,#7A1030)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1 }}>Gulabi</div>
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".42rem",letterSpacing:".3em",color:"var(--ink3)",textTransform:"uppercase",marginTop:"2px" }}>
            Makeup Artistry · Bangalore
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:"28px" }} className="mh">
          {lnks.map(([id,l]) => <span key={id} className={`e-nav ${sec===id?"act":""}`} onClick={() => goTo(id)}>{l}</span>)}
          <div onClick={() => setAdmin(a => !a)} style={{ display:"inline-flex",alignItems:"center",gap:"7px",
            border:"1px solid rgba(122,16,48,.2)",padding:"6px 15px",cursor:"pointer",
            fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".14em",
            color:"var(--bord)",transition:"all .3s",textTransform:"uppercase",background:"transparent" }}>
            <div className="ld"/>
            {admin ? "Exit Dashboard" : "AI Dashboard"}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero({ onBook }) {
  const txts = ["Bridal Artistry","Evening Glamour","Timeless Radiance","Your Finest Self"];
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx(i => (i+1) % txts.length), 3000); return () => clearInterval(t); }, []);
  return (
    <section id="home" style={{ minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",overflow:"hidden",paddingTop:"68px",
      background:"linear-gradient(135deg, #FAF6EE 0%, #F5EDE0 40%, #EDE4D0 100%)" }}>

      {/* Subtle warm texture overlay */}
      <div style={{ position:"absolute",inset:0,opacity:.04,
        backgroundImage:"radial-gradient(circle, #8A6830 1px, transparent 1px)",
        backgroundSize:"32px 32px", pointerEvents:"none" }}/>

      {/* Warm glow spot */}
      <div style={{ position:"absolute",right:"42%",top:"30%",width:"600px",height:"600px",borderRadius:"50%",
        background:"radial-gradient(circle, rgba(201,169,110,.14) 0%, transparent 70%)",
        pointerEvents:"none" }} className="mh"/>

      {/* Architectural vertical line */}
      <div style={{ position:"absolute",left:"5%",top:"15%",bottom:"15%",width:"1px",background:"var(--hair)",opacity:.6 }} className="mh"/>

      {/* Artwork — right */}
      <div className="mh u-dr" style={{ position:"absolute",right:"0",top:"50%",transform:"translateY(-50%)",
        width:"min(430px,44vw)",height:"min(480px,50vw)" }}>
        <GlamourArt/>
      </div>

      {/* Content */}
      <div style={{ position:"relative",zIndex:1,padding:"0 5%",maxWidth:"600px" }}>

        {/* Category label */}
        <div className="u-in" style={{ display:"flex",alignItems:"center",gap:"14px",marginBottom:"36px" }}>
          <div style={{ height:"1px",width:"36px",background:"var(--bord)",opacity:.5 }}/>
          <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".26em",color:"var(--bord)",textTransform:"uppercase" }}>
            Renowned Make-Up Artist in Bangalore
          </span>
          <div style={{ height:"1px",width:"36px",background:"var(--bord)",opacity:.5 }}/>
        </div>

        <h1 className="hb u-lft" style={{ fontFamily:"'Bodoni Moda',serif",
          fontSize:"clamp(3.4rem,6.8vw,6rem)",lineHeight:.93,
          letterSpacing:"-.01em",marginBottom:"18px",animationDelay:".1s" }}>
          <span style={{ display:"block",color:"var(--ink)",fontWeight:300 }}>Art</span>
          <span className="gt" style={{ display:"block",fontStyle:"italic" }}>meets</span>
          <span style={{ display:"block",color:"var(--ink)",fontWeight:300 }}>Beauty.</span>
        </h1>

        <div style={{ height:"48px",display:"flex",alignItems:"center",marginBottom:"22px",animationDelay:".22s" }} className="u-lft">
          <div style={{ width:"22px",height:"1px",background:"var(--bord)",marginRight:"13px",flexShrink:0 }}/>
          <h2 className="hs" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",
            fontSize:"1.55rem",fontWeight:300,color:"var(--bord)" }}>{txts[idx]}</h2>
        </div>

        <p className="u-lft" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",
          lineHeight:1.88,fontWeight:300,color:"var(--ink2)",maxWidth:"480px",
          marginBottom:"44px",animationDelay:".34s" }}>
          Gulabi crafts extraordinary looks that honour your story — from ethereal bridal ceremonies to electrifying evening occasions. Every face a canvas; every session a considered work of art.
        </p>

        <div className="u-up" style={{ display:"flex",gap:"12px",flexWrap:"wrap",animationDelay:".46s" }}>
          <button className="btn-g" style={{ padding:"15px 36px",fontSize:".6rem" }} onClick={onBook}>Reserve Your Session</button>
          <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
            <button className="btn-o" style={{ padding:"15px 36px",fontSize:".6rem" }}>View Portfolio</button>
          </a>
        </div>

        {/* Stats */}
        <div className="u-up" style={{ display:"flex",gap:"44px",marginTop:"60px",
          paddingTop:"28px",borderTop:"1px solid var(--hair)",animationDelay:".58s" }}>
          {[["500+","Brides Adorned"],["1,200+","Transformations"],["4.9","Client Rating"]].map(([n,l]) => (
            <div key={l}>
              <div className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"2rem",fontWeight:300,lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".48rem",letterSpacing:".2em",color:"var(--ink3)",textTransform:"uppercase",marginTop:"5px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services ───────────────────────────────────────────────── */
function Services({ onBook }) {
  const IcMap = { Bridal:<I.Bridal/>, Party:<I.Party/>, Ring:<I.Ring/>, Grad:<I.Grad/> };
  return (
    <section id="services" style={{ padding:"108px 5%",background:"var(--bg)" }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto 68px",display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"22px" }}>
        <div>
          <div className="sec-label" style={{ marginBottom:"12px" }}>The Atelier</div>
          <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.5rem)",color:"var(--ink)",lineHeight:1 }}>Signature Services</h2>
          <div style={{ marginTop:"16px" }}><I.Orn/></div>
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.1rem",fontWeight:300,color:"var(--ink2)",maxWidth:"360px",lineHeight:1.88 }}>
          Each session is a bespoke ritual — unhurried, meticulous, and wholly attuned to you.
        </p>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(252px,1fr))",gap:"16px",maxWidth:"1200px",margin:"0 auto" }}>
        {SVCS.map((s,i) => (
          <div key={s.id} className="card u-up" style={{ padding:"40px 32px",cursor:"pointer",animationDelay:`${i*.1}s`,position:"relative",overflow:"hidden" }}
            onClick={() => onBook(s.id)}>
            <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"5rem",fontWeight:300,fontStyle:"italic",
              color:"rgba(122,16,48,.06)",position:"absolute",top:"8px",right:"18px",lineHeight:1,userSelect:"none" }}>{s.no}</div>
            <div style={{ color:"var(--bord)",marginBottom:"22px",opacity:.7 }}>{IcMap[s.icon]}</div>
            <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".2em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"6px" }}>{s.sub}</div>
            <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.5rem",color:"var(--ink)",marginBottom:"14px" }}>{s.title}</h3>
            <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:".98rem",fontWeight:300,lineHeight:1.9,color:"var(--ink2)",marginBottom:"26px" }}>{s.desc}</p>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"18px",borderTop:"1px solid var(--hair)" }}>
              <span className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1rem",fontWeight:300 }}>{s.price}</span>
              <div style={{ display:"flex",alignItems:"center",gap:"6px",fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",letterSpacing:".12em",color:"var(--bord)",textTransform:"uppercase" }}>Enquire <I.Arrow/></div>
            </div>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div className="mq" style={{ marginTop:"80px",padding:"16px 0" }}>
        <div className="mqi">
          {[...Array(2)].flatMap(() => ["◆  Bridal Specialist","—  Evening Glamour","◆  Photoshoot Ready","—  Grooming Ateliers","◆  Celebrity Artistry","—  Bangalore","◆  500+ Happy Brides","—  Engagement Artistry","◆  Award Winning"].map(t => (
            <span key={t+Math.random()} style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",letterSpacing:".26em",color:"var(--ink3)",padding:"0 28px",textTransform:"uppercase",whiteSpace:"nowrap" }}>{t}</span>
          )))}
        </div>
      </div>
    </section>
  );
}

/* ── Booking ────────────────────────────────────────────────── */
function Booking() {
  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({ name:"",phone:"",email:"",notes:"" });
  const [aiSt, setAiSt] = useState("idle");
  const today = new Date();
  const dates = Array.from({length:7}, (_,i) => { const d = new Date(today); d.setDate(today.getDate()+i+1); return d.toISOString().split("T")[0]; });
  const confirm = async () => { setAiSt("processing"); await new Promise(r => setTimeout(r,2200)); const ok=(SLOTS[date]||[]).includes(slot)&&!(BOOKED[date]||[]).includes(slot); setAiSt(ok?"ok":"no"); setStep(4); };
  const reset = () => { setStep(1);setSvc("");setDate("");setSlot("");setAiSt("idle");setForm({name:"",phone:"",email:"",notes:""}); };
  const svcLbl = { bridal:"Bridal Artistry",party:"Evening Glamour",engage:"Engagement Beauty",groom:"Grooming Atelier" };
  return (
    <section id="book" style={{ padding:"108px 5%",background:"var(--bg2)" }}>
      <div style={{ maxWidth:"860px",margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:"60px" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(122,16,48,.18)",padding:"6px 16px",marginBottom:"20px",background:"rgba(122,16,48,.03)" }}>
            <div className="ld"/>
            <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".16em",color:"var(--bord)",textTransform:"uppercase" }}>AI Agent · Auto-managing availability</span>
          </div>
          <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2rem,3.6vw,3.1rem)",color:"var(--ink)" }}>Reserve Your Session</h2>
          <div style={{ marginTop:"16px",display:"flex",justifyContent:"center" }}><I.Orn/></div>
        </div>

        {/* Step indicators */}
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"44px" }}>
          {["Service","Date & Time","Details","Confirmation"].map((s,i) => (
            <div key={s} style={{ display:"flex",alignItems:"center" }}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"6px" }}>
                <div className="sn" style={{ borderColor:step>i+1?"var(--ant)":step===i+1?"var(--bord)":"var(--hair)", background:step>i+1?"var(--ant)":step===i+1?"rgba(122,16,48,.08)":"transparent", color:step>i+1?"#fff":step===i+1?"var(--bord)":"var(--ink3)" }}>
                  {step>i+1 ? <I.Check/> : <span style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic" }}>{i+1}</span>}
                </div>
                <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".46rem",letterSpacing:".12em",textTransform:"uppercase",color:step===i+1?"var(--bord)":"var(--ink3)" }}>{s}</span>
              </div>
              {i<3 && <div style={{ width:"68px",height:"1px",background:step>i+1?"var(--ant)":"var(--hair)",margin:"0 5px",marginBottom:"24px",transition:"background .4s" }}/>}
            </div>
          ))}
        </div>

        <div className="card" style={{ padding:"48px" }}>
          {step===1 && <div className="u-up">
            <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.7rem",color:"var(--ink)",marginBottom:"28px" }}>Select a Service</h3>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px" }} className="tc2">
              {SVCS.map(s => (
                <div key={s.id} onClick={() => setSvc(s.id)} style={{ padding:"18px",border:`1px solid ${svc===s.id?"var(--bord)":"var(--hair)"}`,cursor:"pointer",transition:"all .25s",background:svc===s.id?"rgba(122,16,48,.04)":"#fff",boxShadow:svc===s.id?"0 2px 16px rgba(122,16,48,.1)":"none" }}>
                  <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.08rem",color:"var(--ink)",marginBottom:"3px" }}>{s.title}</div>
                  <div className="gt" style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".6rem" }}>{s.price}</div>
                </div>
              ))}
            </div>
            <button className="btn-g" style={{ width:"100%",padding:"15px",marginTop:"28px",fontSize:".58rem",opacity:svc?1:.35,pointerEvents:svc?"auto":"none" }} onClick={() => svc&&setStep(2)}>Continue →</button>
          </div>}

          {step===2 && <div className="u-up">
            <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.7rem",color:"var(--ink)",marginBottom:"7px" }}>Choose Date & Time</h3>
            <p className="dt" style={{ marginBottom:"28px" }}>Availability managed in real time by AI</p>
            <div style={{ display:"flex",gap:"6px",marginBottom:"30px",overflowX:"auto",paddingBottom:"4px" }}>
              {dates.map(d => {
                const o=new Date(d),has=(SLOTS[d]||[]).length>0;
                return <div key={d} className={`dc ${!has?"nx":date===d?"sel":""}`} onClick={() => has&&setDate(d)}>
                  <div className="dt" style={{ marginBottom:"3px" }}>{o.toLocaleDateString("en-IN",{weekday:"short"})}</div>
                  <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.35rem",color:date===d?"var(--bord)":"var(--ink)",lineHeight:1.15 }}>{o.getDate()}</div>
                  <div className="dt" style={{ marginTop:"3px",fontSize:".42rem" }}>{o.toLocaleDateString("en-IN",{month:"short"})}</div>
                </div>;
              })}
            </div>
            {date && <><div className="dt" style={{ marginBottom:"12px" }}>Available Times</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:"28px" }}>
                {(SLOTS[date]||[]).map(t => { const bk=(BOOKED[date]||[]).includes(t); return <div key={t} className={bk?"cb":`ca${slot===t?" sel":""}`} onClick={() => !bk&&setSlot(t)}>{t}</div>; })}
              </div>
            </>}
            <div style={{ display:"flex",gap:"8px" }}>
              <button className="btn-o" style={{ padding:"13px 22px",fontSize:".56rem",flex:1 }} onClick={() => setStep(1)}>← Back</button>
              <button className="btn-g" style={{ padding:"13px 22px",fontSize:".56rem",flex:2,opacity:slot?1:.35,pointerEvents:slot?"auto":"none" }} onClick={() => slot&&setStep(3)}>Continue →</button>
            </div>
          </div>}

          {step===3 && <div className="u-up">
            <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.7rem",color:"var(--ink)",marginBottom:"28px" }}>Your Details</h3>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 26px" }} className="tc2">
              {[["name","Full Name"],["phone","Phone Number"],["email","Email Address"]].map(([k,l]) => (
                <div key={k} style={{ marginBottom:"22px" }}>
                  <label className="dt" style={{ display:"block",marginBottom:"6px" }}>{l}</label>
                  <input className="ef" value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} placeholder={l}/>
                </div>
              ))}
              <div style={{ marginBottom:"22px",gridColumn:"1/-1" }}>
                <label className="dt" style={{ display:"block",marginBottom:"6px" }}>Special Notes</label>
                <textarea className="ef" rows={3} style={{ resize:"none" }} value={form.notes} onChange={e => setForm(f => ({...f,notes:e.target.value}))} placeholder="Inspiration, skin notes, occasion details…"/>
              </div>
            </div>
            <div style={{ padding:"18px",border:"1px solid var(--hair)",marginBottom:"22px",background:"var(--bg2)" }}>
              <div className="dt" style={{ marginBottom:"10px" }}>Booking Summary</div>
              {[["Service",svcLbl[svc]],["Date",date],["Time",slot]].map(([k,v]) => (
                <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--hair2)" }}>
                  <span className="dt">{k}</span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1rem",fontWeight:300,color:"var(--ink)" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex",gap:"8px" }}>
              <button className="btn-o" style={{ padding:"13px 22px",fontSize:".56rem",flex:1 }} onClick={() => setStep(2)}>← Back</button>
              <button className="btn-g" style={{ padding:"13px 22px",fontSize:".56rem",flex:2,opacity:form.name&&form.phone&&aiSt!=="processing"?1:.35,pointerEvents:form.name&&form.phone&&aiSt!=="processing"?"auto":"none" }} onClick={confirm}>
                {aiSt==="processing" ? "AI Processing…" : "Confirm Reservation"}
              </button>
            </div>
          </div>}

          {step===4 && <div className="u-sc" style={{ textAlign:"center",padding:"16px 0" }}>
            {aiSt==="ok" ? (<>
              <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(34,197,94,.25)",padding:"7px 18px",marginBottom:"24px",background:"rgba(34,197,94,.05)" }}><div className="ld"/><span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".16em",color:"#16a34a",textTransform:"uppercase" }}>AI Agent — Booking Confirmed</span></div>
              <h3 className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.5rem",marginBottom:"12px" }}>You are confirmed.</h3>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.12rem",color:"var(--ink2)",maxWidth:"370px",margin:"0 auto 28px",lineHeight:1.9 }}>A confirmation will be sent to your phone shortly. We look forward to welcoming you.</p>
              <button className="btn-g" style={{ padding:"13px 32px",fontSize:".58rem" }} onClick={reset}>Book Another Session</button>
            </>) : (<>
              <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(220,38,38,.2)",padding:"7px 18px",marginBottom:"24px" }}><div style={{ width:"7px",height:"7px",borderRadius:"50%",background:"#dc2626" }}/><span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".16em",color:"#dc2626",textTransform:"uppercase" }}>Slot Unavailable</span></div>
              <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.9rem",color:"var(--ink)",marginBottom:"12px" }}>This slot was just reserved.</h3>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.02rem",color:"var(--ink2)",marginBottom:"24px" }}>Please select another available time.</p>
              <button className="btn-g" style={{ padding:"13px 28px",fontSize:".58rem" }} onClick={() => { setStep(2);setSlot("");setAiSt("idle"); }}>Choose Another Time</button>
            </>)}
          </div>}
        </div>
      </div>
    </section>
  );
}

/* ── QR Code Component ──────────────────────────────────────── */
function PaymentQR({ amount, upiApp }) {
  const upiData = `upi://pay?pa=${UPI_ID}&pn=Gulabi%20Makeup%20Artistry&am=${amount}&cu=INR&tn=Course%20Payment`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiData)}&color=1A1108&bgcolor=FAF6EE&margin=12`;
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ display:"inline-block",padding:"16px",border:"1px solid var(--hair)",background:"#fff",boxShadow:"0 4px 24px var(--shadow)",position:"relative" }}>
        {!loaded && (
          <div style={{ width:"200px",height:"200px",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg2)" }}>
            <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",color:"var(--ink3)",letterSpacing:".1em" }}>Loading QR…</div>
          </div>
        )}
        <img src={qrUrl} alt="UPI QR Code" width={200} height={200} onLoad={() => setLoaded(true)} style={{ display:loaded?"block":"none" }}/>
        {/* Gold corner accents */}
        <div style={{ position:"absolute",top:"6px",left:"6px",width:"14px",height:"14px",borderTop:"1.5px solid var(--ant)",borderLeft:"1.5px solid var(--ant)" }}/>
        <div style={{ position:"absolute",top:"6px",right:"6px",width:"14px",height:"14px",borderTop:"1.5px solid var(--ant)",borderRight:"1.5px solid var(--ant)" }}/>
        <div style={{ position:"absolute",bottom:"6px",left:"6px",width:"14px",height:"14px",borderBottom:"1.5px solid var(--ant)",borderLeft:"1.5px solid var(--ant)" }}/>
        <div style={{ position:"absolute",bottom:"6px",right:"6px",width:"14px",height:"14px",borderBottom:"1.5px solid var(--ant)",borderRight:"1.5px solid var(--ant)" }}/>
      </div>
      <div style={{ marginTop:"14px",fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",letterSpacing:".16em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"4px" }}>
        Scan to Pay · {upiApp}
      </div>
      <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.5rem",color:"var(--bord)" }}>₹{amount.toLocaleString()}</div>
      <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",color:"var(--ink3)",marginTop:"4px",letterSpacing:".1em" }}>UPI ID: {UPI_ID}</div>
      <div style={{ marginTop:"16px",padding:"10px 14px",background:"rgba(34,197,94,.07)",border:"1px solid rgba(34,197,94,.2)",display:"inline-flex",alignItems:"center",gap:"7px" }}>
        <I.Check/>
        <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".1em",color:"#15803d",textTransform:"uppercase" }}>Works with PhonePe · GPay · Paytm · Any UPI app</span>
      </div>
    </div>
  );
}

/* ── Courses ────────────────────────────────────────────────── */
function Courses() {
  const [sel, setSel] = useState(null);
  const [pSt, setPSt] = useState(1);
  const [upi, setUpi] = useState("");
  const [bf, setBf] = useState({ name:"",phone:"" });
  const [payDone, setPayDone] = useState(false);
  const upiA = [{ id:"phonepe",l:"PhonePe",c:"#5f259f" },{ id:"gpay",l:"Google Pay",c:"#4285F4" },{ id:"paytm",l:"Paytm",c:"#00BAF2" },{ id:"other",l:"Any UPI App",c:"#22c55e" }];
  const close = () => { setSel(null);setPSt(1);setUpi("");setBf({name:"",phone:""});setPayDone(false); };
  return (
    <section id="courses" style={{ padding:"108px 5%",background:"var(--bg)" }}>
      <div style={{ textAlign:"center",marginBottom:"68px" }}>
        <div className="sec-label" style={{ marginBottom:"12px" }}>Online Learning</div>
        <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.3rem)",color:"var(--ink)" }}>Grooming Masterclasses</h2>
        <div style={{ marginTop:"16px",display:"flex",justifyContent:"center" }}><I.Orn/></div>
        <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.08rem",fontWeight:300,color:"var(--ink2)",maxWidth:"440px",margin:"20px auto 0",lineHeight:1.88 }}>
          Limited enrolments. Maximum personal attention. Learn directly from Bangalore's most celebrated artiste.
        </p>
      </div>

      {/* Batch banner */}
      <div style={{ maxWidth:"980px",margin:"0 auto 56px",border:"1px solid var(--hair)",padding:"46px 54px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"28px",position:"relative",background:"linear-gradient(135deg,rgba(122,16,48,.03),#fff)",boxShadow:"0 4px 32px var(--shadow)" }}>
        <div style={{ position:"absolute",top:"12px",left:"12px" }}><I.CTL/></div>
        <div style={{ position:"absolute",bottom:"12px",right:"12px" }}><I.CBR/></div>
        <div>
          <div style={{ display:"inline-block",background:"rgba(220,38,38,.08)",border:"1px solid rgba(220,38,38,.2)",padding:"3px 12px",marginBottom:"14px",fontFamily:"'Montserrat',sans-serif",fontSize:".48rem",letterSpacing:".16em",color:"#dc2626",textTransform:"uppercase" }}>◆ Batch Filling — Limited Seats</div>
          <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2rem",color:"var(--ink)",marginBottom:"9px" }}>Live Grooming Ateliers</h3>
          <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1rem",fontWeight:300,lineHeight:1.9,color:"var(--ink2)",marginBottom:"16px",maxWidth:"420px" }}>
            Intimate batches of max 10 students. Direct, hands-on guidance from Gulabi. Certificate awarded on completion.
          </p>
          <div style={{ display:"flex",gap:"22px",flexWrap:"wrap" }}>
            {["10 Per Batch","25% Advance Required","Certificate Included","Live + Recorded"].map(f => (
              <div key={f} style={{ display:"flex",alignItems:"center",gap:"6px" }}>
                <div style={{ color:"var(--bord)" }}><I.Check/></div>
                <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",letterSpacing:".07em",color:"var(--ink2)",textTransform:"uppercase" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",color:"var(--ink3)",textDecoration:"line-through",marginBottom:"2px" }}>₹20,000</div>
          <div className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.9rem",lineHeight:1 }}>₹14,999</div>
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",color:"var(--bord)",marginBottom:"20px",marginTop:"3px",textTransform:"uppercase",letterSpacing:".1em" }}>25% Advance — ₹3,750</div>
          <button className="btn-g" style={{ padding:"12px 28px",fontSize:".56rem" }}>Enquire & Reserve</button>
        </div>
      </div>

      {/* Course cards */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"16px",maxWidth:"980px",margin:"0 auto" }}>
        {CRS.map((c,i) => {
          const pct = ((c.total-c.seats)/c.total)*100;
          return (
            <div key={c.id} className={`cc u-up`} style={{ animationDelay:`${i*.13}s` }}>
              <div style={{ height:"3px",background:`linear-gradient(90deg,${c.acc},transparent)` }}/>
              <div style={{ padding:"34px 30px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"20px" }}>
                  <div>
                    <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"3.5rem",fontWeight:300,color:`${c.acc}11`,lineHeight:1,marginBottom:"-8px",userSelect:"none" }}>{c.no}</div>
                    <div className={`bdg bdg-${c.btype}`}>{c.badge}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",color:"var(--ink3)",textDecoration:"line-through",marginBottom:"1px" }}>₹{c.orig.toLocaleString()}</div>
                    <div className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.9rem",lineHeight:1 }}>₹{c.price.toLocaleString()}</div>
                    <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".46rem",color:"#16a34a",letterSpacing:".07em",marginTop:"2px" }}>Save ₹{(c.orig-c.price).toLocaleString()}</div>
                  </div>
                </div>
                <div className="dt" style={{ marginBottom:"5px" }}>{c.hrs}</div>
                <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.36rem",color:"var(--ink)",marginBottom:"10px" }}>{c.title}</h3>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".92rem",fontWeight:300,lineHeight:1.85,color:"var(--ink2)",marginBottom:"18px" }}>{c.desc}</p>
                <div style={{ marginBottom:"18px" }}>
                  {c.mods.map(m => (
                    <div key={m} style={{ display:"flex",alignItems:"center",gap:"8px",padding:"5px 0",borderBottom:"1px solid var(--hair2)" }}>
                      <div style={{ color:"var(--ant)",opacity:.7 }}><I.Diamond/></div>
                      <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",letterSpacing:".04em",color:"var(--ink2)" }}>{m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:"20px" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"6px" }}>
                    <span className="dt">Enrolment</span>
                    <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",fontWeight:500,letterSpacing:".04em",color:c.seats<=2?"#dc2626":"var(--bord)" }}>
                      {c.seats<=2 ? `◆ Only ${c.seats} seats remain` : `${c.seats} of ${c.total} remaining`}
                    </span>
                  </div>
                  <div className="st"><div className="sf" style={{ width:`${pct}%` }}/></div>
                </div>
                <button className="btn-g" style={{ width:"100%",padding:"13px",fontSize:".56rem" }} onClick={() => setSel(c)}>
                  Enrol — Instant Access
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Modal */}
      {sel && (
        <div className="mb" onClick={e => e.target===e.currentTarget && close()}>
          <div className="mbx">
            <div style={{ height:"3px",background:`linear-gradient(90deg,${sel.acc},transparent)` }}/>
            <div style={{ padding:"36px 40px" }}>

              {/* Step 1 — Choose UPI */}
              {pSt===1 && <div className="u-up">
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"24px" }}>
                  <div>
                    <div className="dt" style={{ marginBottom:"4px" }}>Enrolment</div>
                    <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.55rem",color:"var(--ink)" }}>{sel.title}</h3>
                  </div>
                  <button onClick={close} style={{ background:"none",border:"none",color:"var(--ink3)",cursor:"pointer" }}><I.Close/></button>
                </div>

                {/* Amount box */}
                <div style={{ padding:"18px",border:"1px solid var(--hair)",marginBottom:"22px",background:"var(--bg2)" }}>
                  {[["Course Price",`₹${sel.price.toLocaleString()}`],["You Save",`₹${(sel.orig-sel.price).toLocaleString()}`]].map(([k,v],i) => (
                    <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i===0?"1px solid var(--hair2)":"none" }}>
                      <span className="dt">{k}</span>
                      <span style={{ fontFamily:"'Bodoni Moda',serif",fontSize:".95rem",color:i===1?"#16a34a":"var(--ink)" }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex",justifyContent:"space-between",paddingTop:"12px" }}>
                    <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",letterSpacing:".1em",color:"var(--bord)",textTransform:"uppercase" }}>Total Due</span>
                    <span className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.4rem" }}>₹{sel.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="dt" style={{ marginBottom:"10px" }}>Choose UPI App</div>
                <div style={{ display:"flex",flexDirection:"column",gap:"6px",marginBottom:"22px" }}>
                  {upiA.map(a => (
                    <div key={a.id} className={`uo ${upi===a.id?"sel":""}`} onClick={() => setUpi(a.id)}>
                      <div style={{ width:"8px",height:"8px",borderRadius:"50%",background:a.c,opacity:.8 }}/>{a.l}
                      {upi===a.id && <div style={{ marginLeft:"auto",color:"var(--bord)" }}><I.Check/></div>}
                    </div>
                  ))}
                </div>
                <button className="btn-g" style={{ width:"100%",padding:"14px",fontSize:".58rem",opacity:upi?1:.3,pointerEvents:upi?"auto":"none" }} onClick={() => setPSt(2)}>
                  Scan QR to Pay ₹{sel.price.toLocaleString()} →
                </button>
              </div>}

              {/* Step 2 — QR Code */}
              {pSt===2 && <div className="u-up">
                <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"24px" }}>
                  <button onClick={() => setPSt(1)} style={{ background:"none",border:"none",color:"var(--ink3)",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".1em",display:"flex",alignItems:"center",gap:"5px",textTransform:"uppercase" }}>← Back</button>
                </div>
                <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.55rem",color:"var(--ink)",marginBottom:"22px",textAlign:"center" }}>Scan & Pay</h3>

                <PaymentQR amount={sel.price} upiApp={upiA.find(u => u.id===upi)?.l}/>

                <div style={{ marginTop:"24px" }}>
                  <div className="dt" style={{ marginBottom:"10px",textAlign:"center" }}>After payment, enter your details below</div>
                  <div style={{ display:"flex",flexDirection:"column",gap:"12px",marginBottom:"20px" }}>
                    {[["name","Your Name"],["phone","Phone / WhatsApp Number"]].map(([k,l]) => (
                      <div key={k}>
                        <label className="dt" style={{ display:"block",marginBottom:"5px" }}>{l}</label>
                        <input className="ef" value={bf[k]} onChange={e => setBf(f => ({...f,[k]:e.target.value}))} placeholder={l}/>
                      </div>
                    ))}
                  </div>
                  <button className="btn-gold" style={{ width:"100%",padding:"15px",fontSize:".58rem",opacity:bf.name&&bf.phone?1:.35,pointerEvents:bf.name&&bf.phone?"auto":"none" }}
                    onClick={() => { setPayDone(true); setPSt(3); }}>
                    I Have Paid — Confirm Enrolment
                  </button>
                </div>
              </div>}

              {/* Step 3 — Confirmed */}
              {pSt===3 && <div className="u-sc" style={{ textAlign:"center",padding:"16px 0" }}>
                <div style={{ width:"64px",height:"64px",borderRadius:"50%",background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",color:"#16a34a" }}>
                  <I.Check/>
                </div>
                <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(34,197,94,.2)",padding:"7px 18px",marginBottom:"22px",background:"rgba(34,197,94,.04)" }}>
                  <div className="ld"/>
                  <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".14em",color:"#16a34a",textTransform:"uppercase" }}>Enrolment Request Received</span>
                </div>
                <h3 className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.2rem",marginBottom:"12px" }}>Welcome to the Masterclass.</h3>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.02rem",fontWeight:300,color:"var(--ink2)",marginBottom:"10px",lineHeight:1.88 }}>
                  Once your payment is verified, course materials and access link will be sent to <strong>{bf.phone}</strong> within 24 hours.
                </p>
                <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".1em",color:"var(--ink3)",marginBottom:"28px",textTransform:"uppercase" }}>
                  UPI ID: {UPI_ID}
                </p>
                <button className="btn-g" style={{ padding:"12px 28px",fontSize:".56rem" }} onClick={close}>Done</button>
              </div>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Portfolio ──────────────────────────────────────────────── */
function Portfolio() {
  const panels = [
    {l:"Bridal Ceremony",s:"The Ceremonial Look",n:"I"},{l:"Smokey Evening",s:"The Statement Look",n:"II"},
    {l:"Engagement Grace",s:"The Promise Look",n:"III"},{l:"Editorial Campaign",s:"The Editorial Look",n:"IV"},
    {l:"Reception Splendour",s:"The Reception Look",n:"V"},{l:"Ethereal Bride",s:"The Ethereal Look",n:"VI"},
    {l:"Bordeaux Drama",s:"The Drama Look",n:"VII"},{l:"Festive Radiance",s:"The Festive Look",n:"VIII"},
    {l:"Midnight Noir",s:"The Noir Look",n:"IX"},
  ];
  const grads = ["linear-gradient(145deg,#F5E6E8,#D9B4C0)","linear-gradient(145deg,#E8E0F0,#BBA8D8)","linear-gradient(145deg,#F5EDD8,#D8C090)","linear-gradient(145deg,#E0EAF5,#A8BCD8)","linear-gradient(145deg,#F0E8E0,#D0A890)","linear-gradient(145deg,#E8F0E8,#A8C8A8)","linear-gradient(145deg,#F5E8E0,#D8A890)","linear-gradient(145deg,#F0E0F0,#C8A0C8)","linear-gradient(145deg,#E8ECF0,#B0B8C8)"];

  return (
    <section id="portfolio" style={{ padding:"108px 5%",background:"var(--bg2)" }}>
      <div style={{ textAlign:"center",marginBottom:"68px" }}>
        <div className="sec-label" style={{ marginBottom:"12px" }}>The Work</div>
        <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.3rem)",color:"var(--ink)" }}>Portfolio</h2>
        <div style={{ marginTop:"16px",display:"flex",justifyContent:"center" }}><I.Orn/></div>
        <div style={{ display:"inline-flex",alignItems:"center",gap:"9px",border:"1px solid var(--hair)",padding:"6px 18px",marginTop:"20px",background:"#fff" }}>
          <div style={{ width:"5px",height:"5px",borderRadius:"50%",background:"var(--ant)",opacity:.6 }}/>
          <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".48rem",letterSpacing:".16em",color:"var(--ink3)",textTransform:"uppercase" }}>Gallery updating with actual client sessions</span>
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px",maxWidth:"1000px",margin:"0 auto",border:"1px solid var(--hair)",boxShadow:"0 4px 32px var(--shadow)" }}>
        {panels.map((p,i) => (
          <div key={i} style={{ aspectRatio:"1",background:grads[i],position:"relative",overflow:"hidden",cursor:"pointer" }}>
            {/* Architectural overlay */}
            <svg viewBox="0 0 200 200" style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:.1,pointerEvents:"none" }}>
              <circle cx="100" cy="100" r="76" stroke="rgba(139,106,48,1)" strokeWidth=".5" fill="none"/>
              <circle cx="100" cy="100" r="52" stroke="rgba(139,106,48,1)" strokeWidth=".3" fill="none" strokeDasharray="4 7"/>
              <path d="M100 24 L100 176 M24 100 L176 100" stroke="rgba(139,106,48,1)" strokeWidth=".3"/>
            </svg>
            <div style={{ position:"absolute",top:"12px",left:"14px",fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"2.4rem",color:"rgba(139,106,48,.22)",lineHeight:1,userSelect:"none" }}>{p.n}</div>
            <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"18px 15px",background:"linear-gradient(0deg,rgba(26,17,8,.55),transparent)" }}>
              <div className="dt" style={{ marginBottom:"2px",fontSize:".42rem",color:"rgba(244,236,213,.8)" }}>{p.s}</div>
              <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1rem",color:"#fff" }}>{p.l}</div>
            </div>
            <div style={{ position:"absolute",inset:0,background:"rgba(122,16,48,.7)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)" }}
              onMouseEnter={e => e.currentTarget.style.opacity="1"} onMouseLeave={e => e.currentTarget.style.opacity="0"}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:".98rem",color:"#fff",marginBottom:"6px" }}>{p.l}</div>
                <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".42rem",color:"rgba(255,255,255,.7)",letterSpacing:".14em",textTransform:"uppercase" }}>@makeupbygulabi_bangalore</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center",marginTop:"36px" }}>
        <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
          <button className="btn-o" style={{ padding:"13px 36px",fontSize:".56rem" }}>Follow on Instagram</button>
        </a>
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────────────────── */
function Testimonials() {
  const [act, setAct] = useState(0);
  useEffect(() => { const t = setInterval(() => setAct(i => (i+1)%TESTI.length), 4500); return () => clearInterval(t); }, []);
  return (
    <section id="testimonials" style={{ padding:"108px 5%",background:"var(--bg)" }}>
      <div style={{ textAlign:"center",marginBottom:"68px" }}>
        <div className="sec-label" style={{ marginBottom:"12px" }}>Client Stories</div>
        <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.3rem)",color:"var(--ink)" }}>Testimonials</h2>
        <div style={{ marginTop:"16px",display:"flex",justifyContent:"center" }}><I.Orn/></div>
      </div>
      <div style={{ maxWidth:"820px",margin:"0 auto" }}>
        <div className="tc" style={{ padding:"48px 52px",marginBottom:"28px",background:"linear-gradient(145deg,rgba(122,16,48,.03),#fff)",position:"relative",boxShadow:"0 4px 32px var(--shadow)" }}>
          <div style={{ position:"absolute",top:"-5px",left:"36px",fontFamily:"'Bodoni Moda',serif",fontSize:"7rem",fontWeight:300,color:"rgba(122,16,48,.07)",lineHeight:1,userSelect:"none" }}>"</div>
          <div style={{ display:"flex",gap:"4px",marginBottom:"16px" }}>{[...Array(5)].map((_,i) => <div key={i} style={{ color:"var(--ant)" }}><I.Star/></div>)}</div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.35rem",lineHeight:1.9,color:"var(--ink)",marginBottom:"24px" }}>"{TESTI[act].text}"</p>
          <div style={{ display:"flex",alignItems:"center",gap:"16px",paddingTop:"22px",borderTop:"1px solid var(--hair)" }}>
            <div style={{ width:"40px",height:"40px",border:"1px solid rgba(122,16,48,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.05rem",color:"var(--bord)",background:"rgba(122,16,48,.04)" }}>{TESTI[act].name[0]}</div>
            <div>
              <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.02rem",color:"var(--ink)" }}>{TESTI[act].name}</div>
              <div className="dt" style={{ marginTop:"2px",fontSize:".48rem" }}>{TESTI[act].role}</div>
            </div>
          </div>
        </div>
        <div style={{ display:"flex",justifyContent:"center",gap:"8px",marginBottom:"28px" }}>
          {TESTI.map((_,i) => <div key={i} onClick={() => setAct(i)} style={{ width:i===act?"24px":"7px",height:"7px",borderRadius:"4px",background:i===act?"var(--bord)":"var(--hair)",cursor:"pointer",transition:"all .3s" }}/>)}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))",gap:"1px",background:"var(--hair)",border:"1px solid var(--hair)" }}>
          {TESTI.map((t,i) => (
            <div key={t.name} onClick={() => setAct(i)} className="tc" style={{ padding:"18px 16px",cursor:"pointer",background:"#fff",opacity:act===i?1:.5,transition:"opacity .3s" }}>
              <div style={{ display:"flex",gap:"3px",marginBottom:"8px" }}>{[...Array(5)].map((_,j) => <div key={j} style={{ color:"var(--ant)" }}><I.Star/></div>)}</div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:".86rem",color:"var(--ink2)",marginBottom:"8px",lineHeight:1.6 }}>"{t.text.slice(0,60)}…"</p>
              <div className="dt" style={{ fontSize:".46rem" }}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Social ─────────────────────────────────────────────────── */
function Social() {
  const posts = Array.from({length:6}, (_,i) => ({
    id:i,
    likes: Math.floor(Math.random()*3000)+500,
    grad: ["linear-gradient(145deg,#F5E6E8,#D4A0B0)","linear-gradient(145deg,#F0E8D8,#D0B080)","linear-gradient(145deg,#E8E0F0,#B0A0D0)","linear-gradient(145deg,#E8F0E8,#90B890)","linear-gradient(145deg,#E0ECF5,#90B0D0)","linear-gradient(145deg,#F5F0E8,#C8B880)"][i],
    cap: ["Bridal Look","Evening Glam","Engagement","Editorial","Natural Glow","Night Out"][i],
  }));
  const ytvids = [{ t:"Bridal Makeup Tutorial — The Dewy Veil Look",v:"42K" },{ t:"5-Minute Evening Glam · Gulabi Bangalore",v:"28K" },{ t:"Complete Eye Architecture Masterclass",v:"61K" }];
  return (
    <section id="social" style={{ padding:"108px 5%",background:"var(--bg2)" }}>
      <div style={{ textAlign:"center",marginBottom:"68px" }}>
        <div className="sec-label" style={{ marginBottom:"12px" }}>Stay Connected</div>
        <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.3rem)",color:"var(--ink)" }}>Social Presence</h2>
        <div style={{ marginTop:"16px",display:"flex",justifyContent:"center" }}><I.Orn/></div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px",maxWidth:"1160px",margin:"0 auto" }} className="tc2">
        {/* Instagram */}
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:"14px",marginBottom:"22px",paddingBottom:"16px",borderBottom:"1px solid var(--hair)" }}>
            <div style={{ color:"var(--bord)" }}><I.Insta/></div>
            <div>
              <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.15rem",color:"var(--ink)" }}>@makeupbygulabi_bangalore</div>
              <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer">
                <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".1em",color:"var(--bord)",textDecoration:"none",textTransform:"uppercase",cursor:"pointer" }}>Follow on Instagram</span>
              </a>
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px",border:"1px solid var(--hair)" }}>
            {posts.map(p => (
              <div key={p.id} style={{ aspectRatio:"1",background:p.grad,position:"relative",overflow:"hidden",cursor:"pointer" }}>
                <svg viewBox="0 0 100 100" style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:.1,pointerEvents:"none" }}><circle cx="50" cy="50" r="34" stroke="rgba(139,106,48,1)" strokeWidth=".5" fill="none"/><circle cx="50" cy="50" r="20" stroke="rgba(139,106,48,1)" strokeWidth=".3" fill="none"/><path d="M50 16 L50 84 M16 50 L84 50" stroke="rgba(139,106,48,1)" strokeWidth=".3"/></svg>
                <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"8px",background:"linear-gradient(0deg,rgba(26,17,8,.55),transparent)" }}>
                  <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:".78rem",color:"#fff" }}>{p.cap}</div>
                </div>
                <div style={{ position:"absolute",inset:0,background:"rgba(122,16,48,.7)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(3px)" }}
                  onMouseEnter={e => e.currentTarget.style.opacity="1"} onMouseLeave={e => e.currentTarget.style.opacity="0"}>
                  <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".58rem",color:"rgba(255,255,255,.9)",letterSpacing:".12em" }}>◆ {p.likes.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube */}
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:"14px",marginBottom:"22px",paddingBottom:"16px",borderBottom:"1px solid var(--hair)" }}>
            <div style={{ color:"#dc2626",opacity:.7,fontSize:"1.1rem" }}>▶</div>
            <div>
              <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.15rem",color:"var(--ink)" }}>Gulabi — Makeup Artistry</div>
              <div className="dt" style={{ fontSize:".48rem" }}>YouTube Channel</div>
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:"8px" }}>
            {ytvids.map((v,i) => (
              <div key={v.t} className="card" style={{ padding:"18px 20px",display:"flex",gap:"14px",alignItems:"center",cursor:"pointer" }}>
                <div style={{ width:"66px",height:"48px",flexShrink:0,background:"linear-gradient(135deg,rgba(122,16,48,.15),rgba(255,255,255,.5))",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid var(--hair)" }}>
                  <div style={{ color:"var(--bord)",opacity:.7 }}><I.Play/></div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".96rem",fontWeight:300,color:"var(--ink)",marginBottom:"3px",lineHeight:1.4 }}>{v.t}</div>
                  <div className="dt" style={{ fontSize:".46rem" }}>{v.v} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collab banner */}
      <div style={{ maxWidth:"920px",margin:"88px auto 0",border:"1px solid var(--hair)",padding:"64px 72px",textAlign:"center",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,rgba(122,16,48,.03),#fff)",boxShadow:"0 4px 40px var(--shadow)" }}>
        <div style={{ position:"absolute",top:"16px",left:"16px" }}><I.CTL/></div>
        <div style={{ position:"absolute",bottom:"16px",right:"16px" }}><I.CBR/></div>
        <div className="sec-label" style={{ marginBottom:"14px" }}>◆ &nbsp; Open for Partnerships</div>
        <h3 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(1.7rem,3.3vw,2.7rem)",color:"var(--ink)",marginBottom:"18px",lineHeight:1.1 }}>Brand Collaborations<br/>& Paid Partnerships</h3>
        <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.08rem",fontWeight:300,color:"var(--ink2)",maxWidth:"480px",margin:"0 auto 36px",lineHeight:1.9 }}>
          With 1,200+ transformations and a highly engaged audience across Bengaluru, Gulabi partners with beauty, skincare and lifestyle brands that share her commitment to excellence.
        </p>
        <div style={{ display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap" }}>
          <button className="btn-g" style={{ padding:"14px 38px",fontSize:".58rem" }}>Send Collaboration Brief</button>
          <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
            <button className="btn-o" style={{ padding:"14px 38px",fontSize:".58rem" }}>View on Instagram</button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Dashboard ──────────────────────────────────────────────── */
function Dashboard() {
  const [tab, setTab] = useState("overview");
  const METRICS = [{ l:"Site Visitors Today",v:"1,247",c:"+18%" },{ l:"Appointments This Month",v:"34",c:"+12" },{ l:"Revenue This Month",v:"₹2.84L",c:"+24%" },{ l:"Course Enrolments",v:"89",c:"+31%" },{ l:"Enquiries",v:"156",c:"+8" },{ l:"Collab Requests",v:"12",c:"NEW" }];
  const BKS = [{ n:"Priya S.",s:"Bridal",dt:"22 Feb",t:"3:00 PM",st:"confirmed",a:"₹15,000" },{ n:"Ananya R.",s:"Evening Glam",dt:"23 Feb",t:"11:00 AM",st:"confirmed",a:"₹4,500" },{ n:"Meera K.",s:"Engagement",dt:"24 Feb",t:"2:00 PM",st:"pending",a:"₹8,000" },{ n:"Divya P.",s:"Bridal Trial",dt:"25 Feb",t:"3:00 PM",st:"confirmed",a:"₹2,500" }];
  const SALES = [{ c:"Bridal Glow Masterclass",u:34,r:"₹1.70L",p:38 },{ c:"Evening Glam Deep Dive",u:28,r:"₹1.96L",p:31 },{ c:"Complete Grooming Bible",u:27,r:"₹2.43L",p:30 }];
  const ENQ = [{ tp:"Booking",n:"Sunita Verma",m:"I'd like to book bridal makeup for March 15. Can you confirm availability?",ag:"2h",tg:"booking" },{ tp:"Brand Collab",n:"NYKAA Beauty",m:"We'd like to discuss a paid partnership for our new product launch campaign.",ag:"5h",tg:"collab" },{ tp:"Course",n:"Keerthi Mohan",m:"I'm interested in the 36-hour masterclass. When does the next batch commence?",ag:"1d",tg:"course" },{ tp:"Partnership",n:"Sugar Cosmetics",m:"We'd love to send our new collection for review. Open to a collaboration?",ag:"2d",tg:"collab" }];
  const rBars = [38,52,32,68,58,80,90,72,86,95,84,92];
  const stC = { confirmed:"#16a34a",pending:"#d97706",cancelled:"#dc2626" };
  const tgC = { collab:"var(--ant)",booking:"var(--bord)",course:"var(--ink3)" };
  const tgBg = { collab:"rgba(201,169,110,.1)",booking:"rgba(122,16,48,.08)",course:"rgba(26,17,8,.05)" };
  return (
    <section id="dashboard" style={{ padding:"92px 5% 108px",minHeight:"80vh",background:"var(--bg)" }}>
      <div style={{ maxWidth:"1180px",margin:"0 auto" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"40px",paddingBottom:"28px",borderBottom:"1px solid var(--hair)",flexWrap:"wrap",gap:"18px" }}>
          <div>
            <div className="sec-label" style={{ marginBottom:"10px" }}>Admin Portal</div>
            <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.6rem",color:"var(--ink)" }}>AI Dashboard</h2>
          </div>
          <div style={{ display:"inline-flex",alignItems:"center",gap:"9px",border:"1px solid rgba(34,197,94,.25)",padding:"7px 16px",background:"rgba(34,197,94,.04)" }}>
            <div className="ld"/>
            <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".15em",color:"#16a34a",textTransform:"uppercase" }}>AI Agent Monitoring · Live</span>
          </div>
        </div>
        <div style={{ display:"flex",gap:"0",marginBottom:"32px",borderBottom:"1px solid var(--hair)" }}>
          {["overview","appointments","courses","enquiries"].map(t => (
            <button key={t} className={`dtb ${tab===t?"act":""}`} onClick={() => setTab(t)} style={{ textTransform:"capitalize" }}>{t}</button>
          ))}
        </div>

        {tab==="overview" && (<>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:"12px",marginBottom:"12px" }}>
            {METRICS.map(m => (
              <div key={m.l} className="mc" style={{ padding:"24px 20px" }}>
                <div className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2rem",lineHeight:1,marginBottom:"6px" }}>{m.v}</div>
                <div className="dt" style={{ marginBottom:"8px",lineHeight:1.45 }}>{m.l}</div>
                <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",color:"#16a34a",fontWeight:500 }}>{m.c}</div>
              </div>
            ))}
          </div>
          <div className="mc" style={{ padding:"32px" }}>
            <div className="dt" style={{ marginBottom:"20px" }}>Monthly Revenue</div>
            <div style={{ display:"flex",alignItems:"flex-end",gap:"8px",height:"84px" }}>
              {rBars.map((h,i) => (
                <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"5px" }}>
                  <div className="rb" style={{ width:"100%",height:`${h}%`,opacity:i===11?1:.55 }}/>
                  <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".44rem",color:"var(--ink3)" }}>{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </>)}

        {tab==="appointments" && (
          <div className="mc" style={{ padding:"32px" }}>
            <div className="dt" style={{ marginBottom:"20px" }}>Upcoming Appointments</div>
            <div style={{ display:"flex",flexDirection:"column",gap:"1px",background:"var(--hair)" }}>
              {BKS.map((b,i) => (
                <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",background:"#fff",flexWrap:"wrap",gap:"10px" }}>
                  <div style={{ display:"flex",gap:"14px",alignItems:"center" }}>
                    <div style={{ width:"36px",height:"36px",border:"1px solid rgba(122,16,48,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:".96rem",color:"var(--bord)",background:"rgba(122,16,48,.04)" }}>{b.n[0]}</div>
                    <div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.02rem",color:"var(--ink)" }}>{b.n}</div>
                      <div className="dt" style={{ marginTop:"1px" }}>{b.s} · {b.dt} · {b.t}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.02rem",marginBottom:"2px" }}>{b.a}</div>
                    <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:stC[b.st] }}>{b.st}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="courses" && (
          <div className="mc" style={{ padding:"32px" }}>
            <div className="dt" style={{ marginBottom:"20px" }}>Course Performance</div>
            {SALES.map((s,i) => (
              <div key={s.c} style={{ padding:"20px 0",borderBottom:i<SALES.length-1?"1px solid var(--hair2)":"none" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"8px" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.05rem",color:"var(--ink)" }}>{s.c}</div>
                  <div className="gt" style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.05rem" }}>{s.r}</div>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"7px" }}>
                  <span className="dt">{s.u} enrolments</span>
                  <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",color:"#16a34a" }}>+{Math.floor(Math.random()*16+8)}% this month</span>
                </div>
                <div className="st"><div className="sf" style={{ width:`${s.p}%` }}/></div>
              </div>
            ))}
          </div>
        )}

        {tab==="enquiries" && (
          <div style={{ display:"flex",flexDirection:"column",gap:"8px" }}>
            {ENQ.map((e,i) => (
              <div key={i} className="mc" style={{ display:"flex",gap:"16px",alignItems:"start",padding:"20px 24px",background:"#fff" }}>
                <div style={{ background:tgBg[e.tg],border:`1px solid ${tgC[e.tg]}33`,padding:"3px 11px",flexShrink:0,fontFamily:"'Montserrat',sans-serif",fontSize:".46rem",fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",color:tgC[e.tg] }}>{e.tp}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:".96rem",color:"var(--ink)",marginBottom:"5px" }}>{e.n}</div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:".92rem",color:"var(--ink2)",lineHeight:1.7 }}>{e.m}</p>
                </div>
                <div className="dt" style={{ flexShrink:0,fontSize:".46rem" }}>{e.ag}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--hair)",padding:"64px 5% 36px",background:"var(--bg3)" }}>
      <div style={{ maxWidth:"1180px",margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:"48px",marginBottom:"48px" }}>
          <div>
            <div style={{ fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"2rem",background:"linear-gradient(135deg,#7A1030,#B8924A,#7A1030)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"16px" }}>Gulabi</div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:".97rem",lineHeight:1.9,color:"var(--ink2)",marginBottom:"22px" }}>Bangalore's celebrated makeup artiste — crafting extraordinary transformations for brides, tastemakers and beauty connoisseurs.</p>
            <div style={{ display:"flex",gap:"10px" }}>
              <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{ width:"36px",height:"36px",border:"1px solid var(--hair)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--bord)",textDecoration:"none",transition:"all .3s",background:"#fff" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(122,16,48,.06)"} onMouseLeave={e => e.currentTarget.style.background="#fff"}>
                <I.Insta/>
              </a>
            </div>
          </div>
          <div>
            <div className="sec-label" style={{ marginBottom:"18px" }}>Services</div>
            {["Bridal Artistry","Evening Glamour","Engagement Beauty","Grooming Ateliers","Online Masterclasses"].map(s => (
              <div key={s} style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".97rem",fontWeight:300,color:"var(--ink2)",padding:"5px 0",cursor:"pointer",transition:"color .25s",borderBottom:"1px solid var(--hair2)" }}
                onMouseEnter={e => e.target.style.color="var(--bord)"} onMouseLeave={e => e.target.style.color="var(--ink2)"}>{s}</div>
            ))}
          </div>
          <div>
            <div className="sec-label" style={{ marginBottom:"18px" }}>Contact</div>
            {["Bangalore, Karnataka, India","By Appointment Only","gulabi.makeup@gmail.com","Mon – Sat  ·  9 AM – 7 PM"].map(t => (
              <div key={t} style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:".97rem",color:"var(--ink2)",padding:"5px 0",borderBottom:"1px solid var(--hair2)" }}>{t}</div>
            ))}
          </div>
          <div>
            <div className="sec-label" style={{ marginBottom:"18px" }}>Find Us</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
              {["Bridal Makeup Bangalore","Best Makeup Artist","Party Makeup","Grooming Classes","Makeup Artist Near Me","Engagement Makeup"].map(k => (
                <span key={k} style={{ border:"1px solid var(--hair)",padding:"3px 10px",fontFamily:"'Montserrat',sans-serif",fontSize:".46rem",letterSpacing:".09em",color:"var(--ink3)",textTransform:"uppercase",background:"#fff" }}>{k}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop:"1px solid var(--hair)",paddingTop:"22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px" }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:".48rem",letterSpacing:".1em",color:"var(--ink3)" }}>© 2025 Gulabi Makeup Artistry · All Rights Reserved</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".88rem",color:"var(--ant)" }}>Renowned Make-Up Artist in Bangalore</div>
        </div>
      </div>
    </footer>
  );
}

/* ── App ────────────────────────────────────────────────────── */
export default function App() {
  const [sec, setSec] = useState("home");
  const [admin, setAdmin] = useState(false);
  const goTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setSec(id); };

  useEffect(() => {
    document.title = "Gulabi — Renowned Make-Up Artist in Bangalore | Bridal, Party & Grooming";
  }, []);

  useEffect(() => {
    const h = () => {
      const ss = ["home","services","book","courses","portfolio","testimonials","social"];
      for (const s of ss) { const el = document.getElementById(s); if (el) { const r = el.getBoundingClientRect(); if (r.top <= 75 && r.bottom >= 75) { setSec(s); break; } } }
    };
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background:"var(--bg)",minHeight:"100vh" }}>
      <Nav sec={sec} goTo={goTo} admin={admin} setAdmin={setAdmin}/>
      {admin ? (
        <div style={{ paddingTop:"68px" }}><Dashboard/></div>
      ) : (
        <>
          <Hero onBook={() => goTo("book")}/>
          <Services onBook={() => goTo("book")}/>
          <Booking/>
          <Courses/>
          <Portfolio/>
          <Testimonials/>
          <Social/>
        </>
      )}
      <Footer/>
    </div>
  );
}
