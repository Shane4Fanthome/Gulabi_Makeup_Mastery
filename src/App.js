import { useState, useEffect } from "react";

(function injectFonts() {
  if (document.getElementById("gf")) return;
  const l = document.createElement("link");
  l.id = "gf"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;0,6..96,400;1,6..96,300;1,6..96,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap";
  document.head.appendChild(l);
})();

const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --ink:#070504;--deep:#0D0A07;--bord:#6B1028;--crim:#9E1838;
    --ant:#C9A96E;--gold:#D4AF6A;--champ:#EDD9A3;--ivory:#F4ECD5;
    --hair:rgba(201,169,110,.14);--hair2:rgba(201,169,110,.07);--dim:rgba(244,236,213,.42);
  }
  html{scroll-behavior:smooth}
  body{background:var(--ink);color:var(--ivory);font-family:'Cormorant Garamond',Georgia,serif;overflow-x:hidden}
  ::selection{background:var(--bord);color:var(--ivory)}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--ink)}::-webkit-scrollbar-thumb{background:var(--ant)}

  @keyframes rUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes rLeft{from{opacity:0;transform:translateX(-42px)}to{opacity:1;transform:translateX(0)}}
  @keyframes fIn{from{opacity:0}to{opacity:1}}
  @keyframes sCIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
  @keyframes drift{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
  @keyframes shg{0%{background-position:-220% center}100%{background-position:220% center}}
  @keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes pls{0%,100%{opacity:.5}50%{opacity:1}}
  @keyframes pup{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:.8}90%{opacity:.3}100%{transform:translateY(-106vh) translateX(var(--dx));opacity:0}}

  .u-up{animation:rUp .8s cubic-bezier(.22,.68,0,1.15) both}
  .u-lft{animation:rLeft .8s cubic-bezier(.22,.68,0,1.15) both}
  .u-in{animation:fIn .7s ease both}
  .u-sc{animation:sCIn .6s ease both}
  .u-dr{animation:drift 7s ease-in-out infinite}

  .gt{background:linear-gradient(90deg,#7A5320 0%,#D4AF6A 30%,#EDD9A3 50%,#D4AF6A 70%,#7A5320 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shg 5s linear infinite}

  .e-nav{font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,236,213,.42);cursor:pointer;text-decoration:none;transition:color .3s}
  .e-nav:hover,.e-nav.act{color:var(--ant)}

  .glass{background:rgba(13,10,7,.5);backdrop-filter:blur(24px);border:1px solid var(--hair);transition:border-color .4s,box-shadow .4s}
  .glass:hover{border-color:rgba(201,169,110,.34);box-shadow:0 18px 55px rgba(107,16,40,.1)}

  .btng{font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--ink);background:linear-gradient(135deg,#C9A96E,#EDD9A3,#C9A96E);background-size:220%;border:none;cursor:pointer;transition:all .35s;display:inline-block}
  .btng:hover{background-position:100% 100%;box-shadow:0 10px 34px rgba(201,169,110,.28);transform:translateY(-2px)}

  .btno{font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--ant);background:transparent;border:1px solid rgba(201,169,110,.3);cursor:pointer;transition:all .3s;display:inline-block}
  .btno:hover{border-color:var(--ant);background:rgba(201,169,110,.06);transform:translateY(-2px)}

  .ef{width:100%;background:transparent;border:0;border-bottom:1px solid rgba(201,169,110,.2);padding:13px 0;color:var(--ivory);font-family:'Cormorant Garamond',serif;font-size:1.02rem;font-weight:300;outline:none;transition:border-color .3s}
  .ef:focus{border-color:var(--ant)}
  .ef::placeholder{color:rgba(244,236,213,.24);font-style:italic}

  .ca{font-family:'Montserrat',sans-serif;font-size:.56rem;letter-spacing:.13em;padding:7px 15px;border:1px solid rgba(201,169,110,.24);color:var(--ant);cursor:pointer;transition:all .25s;text-transform:uppercase;background:transparent}
  .ca:hover,.ca.sel{background:rgba(201,169,110,.07);border-color:var(--ant);color:var(--ivory)}
  .cb{font-family:'Montserrat',sans-serif;font-size:.56rem;letter-spacing:.13em;padding:7px 15px;border:1px solid rgba(244,236,213,.06);color:rgba(244,236,213,.18);cursor:not-allowed;text-decoration:line-through;text-transform:uppercase;background:transparent}

  .bdg{display:inline-block;font-family:'Montserrat',sans-serif;font-size:.48rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:3px 11px;border:1px solid rgba(201,169,110,.26);color:var(--ant)}

  .cc{border:1px solid var(--hair);background:linear-gradient(155deg,rgba(107,16,40,.1),rgba(13,10,7,.9));position:relative;overflow:hidden;transition:border-color .4s,transform .4s,box-shadow .4s}
  .cc::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,169,110,.03),transparent 60%);pointer-events:none}
  .cc:hover{border-color:rgba(201,169,110,.4);transform:translateY(-7px);box-shadow:0 34px 66px rgba(107,16,40,.2)}

  .st{height:2px;background:rgba(244,236,213,.05)}
  .sf{height:100%;background:linear-gradient(90deg,var(--bord),var(--ant));transition:width .8s}

  .mc{border:1px solid var(--hair);background:rgba(13,10,7,.7);position:relative;overflow:hidden}
  .mc::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--ant),transparent)}

  .tc{border:1px solid var(--hair);transition:border-color .4s}
  .tc:hover{border-color:rgba(201,169,110,.36)}

  .uo{border:1px solid var(--hair);padding:14px 19px;display:flex;align-items:center;gap:11px;cursor:pointer;transition:all .25s;font-family:'Montserrat',sans-serif;font-size:.6rem;letter-spacing:.1em;color:rgba(244,236,213,.52);text-transform:uppercase;background:transparent}
  .uo:hover,.uo.sel{border-color:var(--ant);background:rgba(201,169,110,.05);color:var(--ivory)}

  .mb{position:fixed;inset:0;z-index:2000;background:rgba(7,5,4,.9);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;animation:fIn .3s ease}
  .mbx{background:linear-gradient(155deg,#130910,#0d0a07);border:1px solid rgba(201,169,110,.17);max-width:476px;width:92%;max-height:92vh;overflow-y:auto;animation:sCIn .35s ease}

  .dt{font-family:'Montserrat',sans-serif;font-size:.5rem;letter-spacing:.2em;color:rgba(244,236,213,.26);text-transform:uppercase}

  .dtb{font-family:'Montserrat',sans-serif;font-size:.56rem;letter-spacing:.16em;text-transform:uppercase;padding:8px 18px;border:1px solid transparent;cursor:pointer;transition:all .25s;color:rgba(244,236,213,.32);background:transparent}
  .dtb.act{border-color:rgba(201,169,110,.28);color:var(--ant)}
  .dtb:hover:not(.act){color:rgba(244,236,213,.62)}

  .sn{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Bodoni Moda',serif;font-style:italic;font-size:.88rem;border:1px solid;transition:all .35s}
  .ld{width:7px;height:7px;border-radius:50%;background:#4ADE80;animation:pls 2s ease-in-out infinite}
  .mq{overflow:hidden}
  .mqi{display:flex;gap:0;white-space:nowrap;animation:tick 25s linear infinite}
  .dc{padding:12px 9px;text-align:center;cursor:pointer;border:1px solid rgba(201,169,110,.1);min-width:60px;transition:all .25s}
  .dc:hover,.dc.sel{border-color:rgba(201,169,110,.44);background:rgba(201,169,110,.05)}
  .dc.nx{opacity:.2;cursor:not-allowed}
  .rb{background:linear-gradient(180deg,rgba(201,169,110,.62),rgba(107,16,40,.42));border-radius:1px 1px 0 0;transition:height .6s}

  @media(max-width:768px){.hb{font-size:3.6rem !important}.hs{font-size:1.1rem !important}.mh{display:none !important}.tc2{grid-template-columns:1fr !important}}
`;

(function injectCSS(){
  if(document.getElementById("gc"))return;
  const s=document.createElement("style");s.id="gc";s.textContent=CSS;document.head.appendChild(s);
})();

/* ─── Icons ──────────────────────────────────────────────────── */
const I={
  Bridal:()=><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth=".85" strokeLinecap="round"><circle cx="13" cy="9" r="5.2"/><path d="M7.5 21 C7.5 16 10 14 13 14 C16 14 18.5 16 18.5 21"/><path d="M10.2 6.5 Q13 3.5 15.8 6.5"/><path d="M4.8 7.5 Q7.5 4.5 10.2 6.5"/><path d="M21.2 7.5 Q18.5 4.5 15.8 6.5"/></svg>,
  Party:()=><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth=".85" strokeLinecap="round"><path d="M13 2.5 L14.6 8.3H21 L16.1 12.2 17.7 18 13 14.4 8.3 18 9.9 12.2 5 8.3H11.4Z"/><path d="M6 22 L6 22.3" strokeWidth="1.6"/><path d="M20 22 L20 22.3" strokeWidth="1.6"/><path d="M13 21 L13 24" opacity=".32"/></svg>,
  Ring:()=><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth=".85" strokeLinecap="round"><circle cx="13" cy="15.5" r="7.2"/><circle cx="13" cy="15.5" r="4.4"/><path d="M10.2 8 L13 3.5 L15.8 8"/><line x1="13" y1="3.5" x2="13" y2="8"/></svg>,
  Grad:()=><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth=".85" strokeLinecap="round"><path d="M3 11 L13 6 L23 11 L13 16Z"/><path d="M7.5 13.5 L7.5 20 Q13 23 18.5 20 L18.5 13.5"/><path d="M23 11 L23 16"/></svg>,
  Diamond:()=><svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth=".85" strokeLinejoin="round"><path d="M6.5 1 L12.5 5.2 L6.5 12 L.5 5.2Z"/><path d="M.5 5.2 L12.5 5.2"/><path d="M4.2 1 L6.5 5.2 L8.8 1"/></svg>,
  Arrow:()=><svg width="19" height="10" viewBox="0 0 19 10" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"><path d="M1 5 L18 5 M12 1.5 L18 5 L12 8.5"/></svg>,
  Check:()=><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M1.5 6.5 L4.5 9.5 L10.5 2.5"/></svg>,
  Close:()=><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><path d="M2 2 L12 12 M12 2 L2 12"/></svg>,
  Star:()=><svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor"><path d="M5.5 1 L6.7 4.1H10.2L7.5 5.9 8.7 9 5.5 7.1 2.3 9 3.5 5.9 .8 4.1H4.3Z"/></svg>,
  Insta:()=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/></svg>,
  Play:()=><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2.5 L13 8 L4 13.5Z" fill="rgba(201,169,110,.5)" stroke="none"/></svg>,
  Orn:()=><svg width="128" height="14" viewBox="0 0 128 14" fill="none"><line x1="0" y1="7" x2="48" y2="7" stroke="rgba(201,169,110,.24)" strokeWidth=".8"/><path d="M54 7 L57.5 3 L61 7 L57.5 11Z" stroke="rgba(201,169,110,.44)" strokeWidth=".8" fill="none"/><circle cx="64" cy="7" r="2" stroke="rgba(201,169,110,.54)" strokeWidth=".8" fill="none"/><path d="M67 7 L70.5 3 L74 7 L70.5 11Z" stroke="rgba(201,169,110,.44)" strokeWidth=".8" fill="none"/><line x1="80" y1="7" x2="128" y2="7" stroke="rgba(201,169,110,.24)" strokeWidth=".8"/></svg>,
  CTL:()=><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(201,169,110,.28)" strokeWidth=".8"><path d="M1 13 L1 1 L13 1"/></svg>,
  CBR:()=><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(201,169,110,.28)" strokeWidth=".8"><path d="M27 15 L27 27 L15 27"/></svg>,
};

/* ─── Data ───────────────────────────────────────────────────── */
const SVCS=[
  {id:"bridal",no:"I",  title:"Bridal Artistry",    sub:"The Ceremonial Look",      desc:"Timeless, camera-perfect makeup crafted to last 14+ hours. Every detail calibrated to your skin, heritage and vision.", price:"₹8,000 – ₹25,000",tag:"Most Booked",   icon:"Bridal"},
  {id:"party", no:"II", title:"Evening Glamour",    sub:"The Statement Look",       desc:"Commanding, luminous looks for soirées, receptions and galas — from barely-there radiance to bold editorial drama.",    price:"₹3,000 – ₹8,000", tag:"Fan Favourite",icon:"Party"},
  {id:"engage",no:"III",title:"Engagement Beauty",  sub:"The Promise Look",         desc:"Photograph-ready artistry for your ceremony — luminous skin, defined eyes, an impeccable finish that lasts.",          price:"₹5,000 – ₹15,000",tag:"Trending",      icon:"Ring"},
  {id:"groom", no:"IV", title:"Grooming Ateliers",  sub:"The Education Experience", desc:"Intimate batches of ten. Master professional technique under direct guidance — contouring, eye architecture, longevity.",price:"₹14,999 / batch",  tag:"25% Advance", icon:"Grad"},
];
const CRS=[
  {id:1,no:"I",  title:"Bridal Glow Masterclass",    hrs:"24-Hour Intensive",  price:4999, orig:8999, seats:3,total:10,badge:"BESTSELLER",  acc:"#A01840",desc:"Foundation mastery, bridal contouring, longevity rituals and the signature Gulabi glow.",   mods:["Foundation & Skin Prep","Bridal Contouring","Eye Drama Technique","Longevity Masterclass"]},
  {id:2,no:"II", title:"Evening Glam Deep Dive",     hrs:"36-Hour Programme",  price:6999, orig:12999,seats:5,total:10,badge:"PREMIUM",     acc:"#C9A96E",desc:"Smokey architecture, editorial highlights, glass-skin techniques and night-ready artistry.",  mods:["Smokey Eye Architecture","Glass Skin Ritual","Highlight Mastery","Colour Theory"]},
  {id:3,no:"III",title:"The Complete Grooming Bible",hrs:"36-Hour Curriculum", price:8999, orig:16999,seats:2,total:10,badge:"MASTER CLASS",acc:"#EDD9A3",desc:"Full-spectrum curriculum — every technique, live model sessions and certification included.", mods:["Skincare Foundation","All Makeup Genres","Live Model Sessions","Certificate Awarded"]},
];
const TESTI=[
  {name:"Priya Sharma",  role:"Bride · Leela Palace Reception",       text:"Gulabi transformed me into the most radiant version of myself. The makeup lasted 14 hours and every photograph was flawless. Absolute mastery."},
  {name:"Ananya Reddy",  role:"Guest · Corporate Gala, ITC Windsor",  text:"I have sat in many artists' chairs. Gulabi's understanding of light, structure and skin is in an entirely different league. Extraordinary."},
  {name:"Meera Krishnan",role:"Student · 36-Hour Masterclass",         text:"The curriculum changed everything I understood about makeup. The precision, the patience, the artistry — I now run my own studio."},
  {name:"Divya Patel",   role:"Bride · Engagement & Wedding",          text:"From the first trial to the final day, Gulabi was impeccable. She captured my vision before I could articulate it. A true artiste."},
  {name:"Rhea Nair",     role:"Brand Manager · Campaign Collaboration",text:"Working with Gulabi on our product campaign was revelatory. She brought an editorial sensibility that elevated the entire production."},
];
const SLOTS={"2025-02-22":["10:00 AM","12:00 PM","3:00 PM","5:00 PM"],"2025-02-23":["11:00 AM","2:00 PM","4:00 PM"],"2025-02-24":["10:00 AM","1:00 PM"],"2025-02-25":["11:00 AM","12:00 PM","3:00 PM","6:00 PM"],"2025-02-26":["10:00 AM","2:00 PM","5:00 PM"]};
const BOOKED={"2025-02-22":["12:00 PM"],"2025-02-24":["10:00 AM"],"2025-02-26":["10:00 AM","5:00 PM"]};

/* ─── Gold Dust ─────────────────────────────────────────────── */
function Dust(){
  const pts=Array.from({length:20},(_,i)=>({id:i,l:Math.random()*100,sz:.7+Math.random()*1.4,dur:9+Math.random()*10,d:Math.random()*9,dx:(Math.random()-.5)*70+"px"}));
  return(
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      {pts.map(p=>(
        <div key={p.id} style={{position:"absolute",bottom:"-6px",left:`${p.l}%`,width:p.sz,height:p.sz,borderRadius:"50%",background:`rgba(201,169,110,${.22+Math.random()*.42})`,animation:`pup ${p.dur}s ease-in ${p.d}s infinite`,["--dx"]:p.dx}}/>
      ))}
    </div>
  );
}

/* ─── SVG Portrait ──────────────────────────────────────────── */
function Portrait(){
  return(
    <svg viewBox="0 0 370 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",filter:"drop-shadow(0 0 42px rgba(107,16,40,.17))"}}>
      <defs>
        <radialGradient id="sg" cx="50%" cy="37%" r="55%"><stop offset="0%" stopColor="#F0C8A0"/><stop offset="65%" stopColor="#D49268"/><stop offset="100%" stopColor="#A46438"/></radialGradient>
        <radialGradient id="aura" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#C9A96E" stopOpacity=".09"/><stop offset="100%" stopColor="#6B1028" stopOpacity="0"/></radialGradient>
        <linearGradient id="hg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1C0A0A"/><stop offset="100%" stopColor="#090404"/></linearGradient>
        <linearGradient id="lg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#9E1838"/><stop offset="100%" stopColor="#5C0E22"/></linearGradient>
        <linearGradient id="gl" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#C9A96E"/><stop offset="100%" stopColor="transparent"/></linearGradient>
      </defs>
      <ellipse cx="185" cy="245" rx="164" ry="214" fill="url(#aura)"/>
      <circle cx="185" cy="218" r="170" stroke="rgba(201,169,110,.04)" strokeWidth="1"/>
      <circle cx="185" cy="218" r="146" stroke="rgba(160,24,64,.04)" strokeWidth=".6"/>
      <circle cx="185" cy="218" r="126" stroke="rgba(201,169,110,.03)" strokeWidth=".4" strokeDasharray="5 10"/>
      <path d="M16 16 L16 50 M16 16 L50 16" stroke="rgba(201,169,110,.2)" strokeWidth=".8"/>
      <path d="M354 16 L354 50 M354 16 L320 16" stroke="rgba(201,169,110,.2)" strokeWidth=".8"/>
      <path d="M16 484 L16 450 M16 484 L50 484" stroke="rgba(201,169,110,.2)" strokeWidth=".8"/>
      <path d="M354 484 L354 450 M354 484 L320 484" stroke="rgba(201,169,110,.2)" strokeWidth=".8"/>
      <path d="M55 500 C65 428 97 386 130 358 L142 370 Q185 386 228 370 L240 358 C273 386 305 428 315 500Z" fill="url(#sg)" opacity=".56"/>
      <path d="M161 315 Q185 330 209 315 L211 358 Q185 372 159 358Z" fill="url(#sg)"/>
      <path d="M76 182 C60 142 66 92 90 66 C116 38 152 24 185 22 C218 24 254 38 280 66 C304 92 310 142 294 182 C304 162 312 122 306 88 C294 40 256 6 185 4 C114 6 76 40 64 88 C58 122 66 162 76 182Z" fill="url(#hg)"/>
      <path d="M76 182 C58 222 54 275 64 314 C76 346 104 362 130 358 L142 332 C110 316 92 288 88 252 C84 226 84 206 88 188Z" fill="url(#hg)"/>
      <path d="M294 182 C312 222 316 275 306 314 C294 346 266 362 240 358 L228 332 C260 316 278 288 282 252 C286 226 286 206 282 188Z" fill="url(#hg)"/>
      <path d="M112 130 C119 70 150 36 185 32 C220 36 251 70 258 130 C248 100 230 76 185 73 C140 76 122 100 112 130Z" fill="#090404"/>
      <ellipse cx="185" cy="198" rx="83" ry="108" fill="url(#sg)"/>
      <ellipse cx="142" cy="212" rx="23" ry="12" fill="#D47070" opacity=".11"/>
      <ellipse cx="228" cy="212" rx="23" ry="12" fill="#D47070" opacity=".11"/>
      <path d="M138 148 Q154 139 172 141" stroke="#1C0808" strokeWidth="2.7" strokeLinecap="round" fill="none"/>
      <path d="M198 141 Q216 139 232 148" stroke="#1C0808" strokeWidth="2.7" strokeLinecap="round" fill="none"/>
      <path d="M136 167 Q154 157 172 167 Q154 178 136 167Z" fill="white" opacity=".92"/>
      <ellipse cx="154" cy="167" rx="6.8" ry="7.8" fill="#150808"/>
      <ellipse cx="154" cy="167" rx="4" ry="4.7" fill="#2A1010"/>
      <circle cx="157" cy="164" r="1.9" fill="white" opacity=".88"/>
      <path d="M134 166 Q154 155 174 166" stroke="#090404" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M172 166 L178 161" stroke="#090404" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M136 167 Q154 157 172 167 Q154 161 136 167Z" fill="#9E1838" opacity=".2"/>
      <path d="M138 166 L133 160 M143 164 L139 158 M149 162 L146 156 M155 161 L154 155" stroke="#090404" strokeWidth="1" strokeLinecap="round"/>
      <path d="M198 167 Q216 157 234 167 Q216 178 198 167Z" fill="white" opacity=".92"/>
      <ellipse cx="216" cy="167" rx="6.8" ry="7.8" fill="#150808"/>
      <ellipse cx="216" cy="167" rx="4" ry="4.7" fill="#2A1010"/>
      <circle cx="219" cy="164" r="1.9" fill="white" opacity=".88"/>
      <path d="M196 166 Q216 155 236 166" stroke="#090404" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M234 166 L240 161" stroke="#090404" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M198 167 Q216 157 234 167 Q216 161 198 167Z" fill="#9E1838" opacity=".2"/>
      <path d="M232 166 L237 160 M227 164 L231 158 M221 162 L224 156 M216 161 L217 155" stroke="#090404" strokeWidth="1" strokeLinecap="round"/>
      <path d="M179 176 Q178 200 172 214 Q179 218 198 214 Q192 200 191 176" stroke="rgba(125,65,28,.28)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M161 254 Q171 245 185 248 Q199 245 209 254 Q202 266 185 271 Q168 266 161 254Z" fill="url(#lg)"/>
      <path d="M161 254 Q170 243 180 247 Q185 243 190 247 Q200 243 209 254 Q196 250 185 251 Q174 250 161 254Z" fill="#AE1C42"/>
      <ellipse cx="180" cy="258" rx="6.5" ry="2.5" fill="rgba(255,255,255,.12)"/>
      <ellipse cx="185" cy="162" rx="12" ry="8" fill="rgba(255,245,230,.08)"/>
      <circle cx="103" cy="217" r="4.4" stroke="#C9A96E" strokeWidth="1.1" fill="none"/>
      <path d="M103 221 L103 234" stroke="#C9A96E" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M99.5 234 Q103 240 106.5 234" stroke="#C9A96E" strokeWidth=".9" fill="none" strokeLinecap="round"/>
      <ellipse cx="103" cy="244" rx="3.4" ry="2.2" fill="#C9A96E" opacity=".7"/>
      <circle cx="267" cy="217" r="4.4" stroke="#C9A96E" strokeWidth="1.1" fill="none"/>
      <path d="M267 221 L267 234" stroke="#C9A96E" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M263.5 234 Q267 240 270.5 234" stroke="#C9A96E" strokeWidth=".9" fill="none" strokeLinecap="round"/>
      <ellipse cx="267" cy="244" rx="3.4" ry="2.2" fill="#C9A96E" opacity=".7"/>
      <circle cx="185" cy="136" r="2.5" fill="#C9A96E" opacity=".58"/>
      <circle cx="185" cy="136" r="1.2" fill="#EDD9A3" opacity=".84"/>
      <path d="M142 57 Q185 39 228 57" stroke="url(#gl)" strokeWidth=".7" fill="none" strokeDasharray="3 5"/>
      <path d="M118 70 Q185 47 252 70" stroke="url(#gl)" strokeWidth=".4" fill="none" strokeDasharray="2 8"/>
      <text x="185" y="472" textAnchor="middle" fontFamily="'Bodoni Moda',serif" fontSize="17" fontStyle="italic" fill="rgba(201,169,110,.48)">Gulabi</text>
      <line x1="115" y1="480" x2="255" y2="480" stroke="rgba(201,169,110,.14)" strokeWidth=".7"/>
      <text x="185" y="494" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="7" fill="rgba(244,236,213,.18)" letterSpacing="4.5">BANGALORE</text>
    </svg>
  );
}

/* ─── Navbar ────────────────────────────────────────────────── */
function Nav({sec,goTo,admin,setAdmin}){
  const [scr,setScr]=useState(false);
  useEffect(()=>{const h=()=>setScr(window.scrollY>55);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  const lnks=[["home","Home"],["services","Services"],["book","Book"],["courses","Courses"],["portfolio","Portfolio"],["testimonials","Testimonials"],["social","Social"]];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:900,background:scr?"rgba(7,5,4,.93)":"transparent",backdropFilter:scr?"blur(24px)":"none",borderBottom:scr?"1px solid var(--hair)":"1px solid transparent",transition:"all .4s",padding:"0 5%"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"67px"}}>
        <div>
          <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.82rem",background:"linear-gradient(135deg,#C9A96E,#EDD9A3,#C9A96E)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>Gulabi</div>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".42rem",letterSpacing:".3em",color:"rgba(201,169,110,.38)",textTransform:"uppercase",marginTop:"2px"}}>Makeup Artistry · Bangalore</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"28px"}} className="mh">
          {lnks.map(([id,l])=><span key={id} className={`e-nav ${sec===id?"act":""}`} onClick={()=>goTo(id)}>{l}</span>)}
          <div onClick={()=>setAdmin(a=>!a)} style={{display:"inline-flex",alignItems:"center",gap:"7px",border:"1px solid rgba(201,169,110,.17)",padding:"5px 14px",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".14em",color:"rgba(201,169,110,.58)",transition:"all .3s",textTransform:"uppercase"}}>
            <div className="ld"/>{admin?"Exit Dashboard":"AI Dashboard"}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function Hero({onBook}){
  const txts=["Bridal Artistry","Evening Glamour","Timeless Radiance","Your Finest Self"];
  const [idx,setIdx]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setIdx(i=>(i+1)%txts.length),3000);return()=>clearInterval(t);},[]);
  return(
    <section id="home" style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",overflow:"hidden",paddingTop:"67px"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 22% 52%, rgba(107,16,40,.3) 0%, transparent 50%), radial-gradient(ellipse at 78% 18%, rgba(201,169,110,.07) 0%, transparent 44%), linear-gradient(180deg,#070504 0%,#110810 54%,#070504 100%)"}}/>
      <Dust/>
      <div style={{position:"absolute",left:"5%",top:"22%",bottom:"22%",width:"1px",background:"var(--hair)",opacity:.52}} className="mh"/>
      <div style={{position:"absolute",right:"44%",top:"18%",bottom:"18%",width:"1px",background:"var(--hair)",opacity:.22}} className="mh"/>
      {/* Portrait */}
      <div className="u-sc mh u-dr" style={{position:"absolute",right:"2%",top:"50%",transform:"translateY(-50%)",width:"min(405px,43vw)",height:"min(526px,57vw)"}}>
        <Portrait/>
      </div>
      {/* Content */}
      <div style={{position:"relative",zIndex:1,padding:"0 5%",maxWidth:"630px"}}>
        <div className="u-in" style={{display:"flex",alignItems:"center",gap:"13px",marginBottom:"34px"}}>
          <div style={{height:"1px",width:"34px",background:"var(--ant)",opacity:.52}}/>
          <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".26em",color:"var(--ant)",textTransform:"uppercase"}}>Renowned Make-Up Artist in Bangalore</span>
          <div style={{height:"1px",width:"34px",background:"var(--ant)",opacity:.52}}/>
        </div>
        <h1 className="hb u-lft" style={{fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(3.3rem,6.6vw,5.9rem)",lineHeight:.93,letterSpacing:"-.01em",marginBottom:"16px",animationDelay:".1s"}}>
          <span style={{display:"block",color:"var(--ivory)",fontWeight:300}}>Art</span>
          <span className="gt" style={{display:"block",fontStyle:"italic"}}>meets</span>
          <span style={{display:"block",color:"var(--ivory)",fontWeight:300}}>Beauty.</span>
        </h1>
        <div style={{height:"48px",display:"flex",alignItems:"center",marginBottom:"20px"}} className="u-lft" data-delay=".24">
          <div style={{width:"20px",height:"1px",background:"var(--bord)",marginRight:"13px",flexShrink:0}}/>
          <h2 className="hs" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.5rem",fontWeight:300,color:"rgba(201,169,110,.8)"}}>{txts[idx]}</h2>
        </div>
        <p className="u-lft" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",lineHeight:1.9,fontWeight:300,color:"rgba(244,236,213,.48)",maxWidth:"480px",marginBottom:"42px",animationDelay:".38s"}}>
          Gulabi crafts extraordinary looks that honour your story — from ethereal bridal ceremonies to electrifying evening occasions. Every face a canvas; every session a considered work of art.
        </p>
        <div className="u-up" style={{display:"flex",gap:"11px",flexWrap:"wrap",animationDelay:".52s"}}>
          <button className="btng" style={{padding:"14px 33px",fontSize:".58rem"}} onClick={onBook}>Reserve Your Session</button>
          <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button className="btno" style={{padding:"14px 33px",fontSize:".58rem"}}>View Portfolio</button>
          </a>
        </div>
        <div className="u-up" style={{display:"flex",gap:"42px",marginTop:"60px",paddingTop:"30px",borderTop:"1px solid var(--hair)",animationDelay:".66s"}}>
          {[["500+","Brides Adorned"],["1,200+","Transformations"],["4.9","Client Rating"]].map(([n,l])=>(
            <div key={l}>
              <div className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.95rem",fontWeight:300,lineHeight:1}}>{n}</div>
              <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".48rem",letterSpacing:".2em",color:"rgba(244,236,213,.26)",textTransform:"uppercase",marginTop:"5px"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────────── */
function Services({onBook}){
  const IcMap={Bridal:<I.Bridal/>,Party:<I.Party/>,Ring:<I.Ring/>,Grad:<I.Grad/>};
  return(
    <section id="services" style={{padding:"108px 5%",position:"relative"}}>
      <div style={{position:"absolute",left:0,right:0,top:0,height:"1px",background:"linear-gradient(90deg,transparent,var(--ant),transparent)",opacity:.16}}/>
      <div style={{maxWidth:"1200px",margin:"0 auto 68px",display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"22px"}}>
        <div>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".28em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"12px"}}>The Atelier</div>
          <h2 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.5rem)",color:"var(--ivory)",lineHeight:1}}>Signature Services</h2>
          <div style={{marginTop:"16px"}}><I.Orn/></div>
        </div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.06rem",fontWeight:300,color:"rgba(244,236,213,.38)",maxWidth:"355px",lineHeight:1.88}}>Each session is a bespoke ritual — unhurried, meticulous, and wholly attuned to you.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(252px,1fr))",gap:"1px",maxWidth:"1200px",margin:"0 auto",background:"var(--hair)"}}>
        {SVCS.map((s,i)=>(
          <div key={s.id} className="u-up" style={{background:"var(--ink)",padding:"44px 32px",cursor:"pointer",transition:"background .3s",animationDelay:`${i*.1}s`,position:"relative",overflow:"hidden"}}
            onClick={()=>onBook(s.id)}
            onMouseEnter={e=>e.currentTarget.style.background="#0D0A07"}
            onMouseLeave={e=>e.currentTarget.style.background="var(--ink)"}>
            <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:"5.2rem",fontWeight:300,fontStyle:"italic",color:"rgba(201,169,110,.055)",position:"absolute",top:"10px",right:"20px",lineHeight:1,userSelect:"none"}}>{s.no}</div>
            <div style={{color:"rgba(201,169,110,.52)",marginBottom:"24px"}}>{IcMap[s.icon]}</div>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",letterSpacing:".2em",color:"rgba(244,236,213,.28)",textTransform:"uppercase",marginBottom:"6px"}}>{s.sub}</div>
            <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.5rem",color:"var(--ivory)",marginBottom:"16px"}}>{s.title}</h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".96rem",fontWeight:300,lineHeight:1.9,color:"rgba(244,236,213,.44)",marginBottom:"28px"}}>{s.desc}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"20px",borderTop:"1px solid var(--hair)"}}>
              <span className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1rem",fontWeight:300}}>{s.price}</span>
              <div style={{display:"flex",alignItems:"center",gap:"6px",fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".12em",color:"var(--ant)",textTransform:"uppercase"}}>Enquire <I.Arrow/></div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:"84px",borderTop:"1px solid var(--hair)",borderBottom:"1px solid var(--hair)",padding:"17px 0"}}>
        <div className="mq"><div className="mqi">
          {[...Array(2)].flatMap(()=>["◆  Bridal Specialist","—  Evening Glamour","◆  Photoshoot Ready","—  Grooming Ateliers","◆  Celebrity Artistry","—  Bangalore","◆  500+ Happy Brides","—  Engagement Artistry","◆  Award Winning"].map(t=>(
            <span key={t+Math.random()} style={{fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",letterSpacing:".26em",color:"rgba(201,169,110,.27)",padding:"0 28px",textTransform:"uppercase",whiteSpace:"nowrap"}}>{t}</span>
          )))}
        </div></div>
      </div>
    </section>
  );
}

/* ─── Booking ───────────────────────────────────────────────── */
function Booking(){
  const [step,setStep]=useState(1);
  const [svc,setSvc]=useState("");
  const [date,setDate]=useState("");
  const [slot,setSlot]=useState("");
  const [form,setForm]=useState({name:"",phone:"",email:"",notes:""});
  const [aiSt,setAiSt]=useState("idle");
  const today=new Date();
  const dates=Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(today.getDate()+i+1);return d.toISOString().split("T")[0];});
  const confirm=async()=>{setAiSt("processing");await new Promise(r=>setTimeout(r,2200));const ok=(SLOTS[date]||[]).includes(slot)&&!(BOOKED[date]||[]).includes(slot);setAiSt(ok?"ok":"no");setStep(4);};
  const reset=()=>{setStep(1);setSvc("");setDate("");setSlot("");setAiSt("idle");setForm({name:"",phone:"",email:"",notes:""});};
  const svcLbl={bridal:"Bridal Artistry",party:"Evening Glamour",engage:"Engagement Beauty",groom:"Grooming Atelier"};
  return(
    <section id="book" style={{padding:"108px 5%",background:"linear-gradient(180deg,transparent,rgba(107,16,40,.03),transparent)"}}>
      <div style={{maxWidth:"860px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"64px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(201,169,110,.15)",padding:"6px 16px",marginBottom:"20px"}}>
            <div className="ld"/><span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".16em",color:"rgba(201,169,110,.62)",textTransform:"uppercase"}}>AI Agent · Auto-managing availability</span>
          </div>
          <h2 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(1.9rem,3.6vw,3.1rem)",color:"var(--ivory)"}}>Reserve Your Session</h2>
          <div style={{marginTop:"16px",display:"flex",justifyContent:"center"}}><I.Orn/></div>
        </div>
        {/* Steps */}
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"48px"}}>
          {["Service","Date & Time","Details","Confirmation"].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px"}}>
                <div className="sn" style={{borderColor:step>i+1?"var(--ant)":step===i+1?"var(--crim)":"rgba(244,236,213,.07)",background:step>i+1?"var(--ant)":step===i+1?"rgba(158,24,56,.16)":"transparent",color:step>i+1?"var(--ink)":step===i+1?"var(--ivory)":"rgba(244,236,213,.18)"}}>
                  {step>i+1?<I.Check/>:<span style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic"}}>{i+1}</span>}
                </div>
                <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".46rem",letterSpacing:".12em",textTransform:"uppercase",color:step===i+1?"var(--ant)":"rgba(244,236,213,.16)"}}>{s}</span>
              </div>
              {i<3&&<div style={{width:"68px",height:"1px",background:step>i+1?"var(--ant)":"rgba(244,236,213,.07)",margin:"0 5px",marginBottom:"24px",transition:"background .4s"}}/>}
            </div>
          ))}
        </div>
        <div className="glass" style={{padding:"50px"}}>
          {step===1&&<div className="u-up">
            <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.7rem",color:"var(--ivory)",marginBottom:"30px"}}>Select a Service</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"9px"}} className="tc2">
              {SVCS.map(s=>(
                <div key={s.id} onClick={()=>setSvc(s.id)} style={{padding:"19px 17px",border:`1px solid ${svc===s.id?"var(--ant)":"rgba(201,169,110,.1)"}`,cursor:"pointer",transition:"all .25s",background:svc===s.id?"rgba(201,169,110,.05)":"transparent"}}>
                  <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.08rem",color:"var(--ivory)",marginBottom:"3px"}}>{s.title}</div>
                  <div className="gt" style={{fontFamily:"'Montserrat',sans-serif",fontSize:".6rem",letterSpacing:".07em"}}>{s.price}</div>
                </div>
              ))}
            </div>
            <button className="btng" style={{width:"100%",padding:"14px",marginTop:"28px",fontSize:".56rem",opacity:svc?1:.32,pointerEvents:svc?"auto":"none"}} onClick={()=>svc&&setStep(2)}>Continue</button>
          </div>}
          {step===2&&<div className="u-up">
            <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.7rem",color:"var(--ivory)",marginBottom:"7px"}}>Choose Date & Time</h3>
            <p className="dt" style={{marginBottom:"30px"}}>Availability managed in real time by AI</p>
            <div style={{display:"flex",gap:"6px",marginBottom:"34px",overflowX:"auto",paddingBottom:"4px"}}>
              {dates.map(d=>{const o=new Date(d),has=(SLOTS[d]||[]).length>0;return(
                <div key={d} className={`dc ${!has?"nx":date===d?"sel":""}`} onClick={()=>has&&setDate(d)}>
                  <div className="dt" style={{marginBottom:"3px"}}>{o.toLocaleDateString("en-IN",{weekday:"short"})}</div>
                  <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.35rem",color:date===d?"var(--ant)":"var(--ivory)",lineHeight:1.15}}>{o.getDate()}</div>
                  <div className="dt" style={{marginTop:"3px",fontSize:".42rem"}}>{o.toLocaleDateString("en-IN",{month:"short"})}</div>
                </div>);
              })}
            </div>
            {date&&<><div className="dt" style={{marginBottom:"12px"}}>Available Times</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:"30px"}}>
                {(SLOTS[date]||[]).map(t=>{const bk=(BOOKED[date]||[]).includes(t);return <div key={t} className={bk?"cb":`ca${slot===t?" sel":""}`} onClick={()=>!bk&&setSlot(t)}>{t}</div>;})}
              </div>
            </>}
            <div style={{display:"flex",gap:"8px"}}>
              <button className="btno" style={{padding:"12px 22px",fontSize:".56rem",flex:1}} onClick={()=>setStep(1)}>← Back</button>
              <button className="btng" style={{padding:"12px 22px",fontSize:".56rem",flex:2,opacity:slot?1:.32,pointerEvents:slot?"auto":"none"}} onClick={()=>slot&&setStep(3)}>Continue →</button>
            </div>
          </div>}
          {step===3&&<div className="u-up">
            <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.7rem",color:"var(--ivory)",marginBottom:"30px"}}>Your Details</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 26px"}} className="tc2">
              {[["name","Full Name"],["phone","Phone Number"],["email","Email Address"]].map(([k,l])=>(
                <div key={k} style={{marginBottom:"24px"}}>
                  <label className="dt" style={{display:"block",marginBottom:"6px"}}>{l}</label>
                  <input className="ef" value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={l}/>
                </div>
              ))}
              <div style={{marginBottom:"24px",gridColumn:"1/-1"}}>
                <label className="dt" style={{display:"block",marginBottom:"6px"}}>Special Notes</label>
                <textarea className="ef" rows={3} style={{resize:"none"}} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Inspiration, skin notes, occasion details…"/>
              </div>
            </div>
            <div style={{padding:"20px",border:"1px solid var(--hair)",marginBottom:"24px"}}>
              <div className="dt" style={{marginBottom:"12px"}}>Booking Summary</div>
              {[["Service",svcLbl[svc]],["Date",date],["Time",slot]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid rgba(201,169,110,.05)"}}>
                  <span className="dt">{k}</span>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1rem",fontWeight:300,color:"var(--ivory)"}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              <button className="btno" style={{padding:"12px 22px",fontSize:".56rem",flex:1}} onClick={()=>setStep(2)}>← Back</button>
              <button className="btng" style={{padding:"12px 22px",fontSize:".56rem",flex:2,opacity:form.name&&form.phone&&aiSt!=="processing"?1:.32,pointerEvents:form.name&&form.phone&&aiSt!=="processing"?"auto":"none"}} onClick={confirm}>
                {aiSt==="processing"?"AI Processing…":"Confirm Reservation"}
              </button>
            </div>
          </div>}
          {step===4&&<div className="u-sc" style={{textAlign:"center",padding:"14px 0"}}>
            {aiSt==="ok"?(<>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(74,222,128,.17)",padding:"7px 18px",marginBottom:"26px",background:"rgba(74,222,128,.03)"}}><div className="ld"/><span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".16em",color:"#4ADE80",textTransform:"uppercase"}}>AI Agent — Booking Confirmed</span></div>
              <h3 className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.6rem",marginBottom:"13px"}}>You are confirmed.</h3>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.12rem",color:"rgba(244,236,213,.48)",maxWidth:"370px",margin:"0 auto 30px",lineHeight:1.88}}>A confirmation will be sent to your phone shortly. We look forward to welcoming you.</p>
              <button className="btng" style={{padding:"12px 30px",fontSize:".56rem"}} onClick={reset}>Book Another Session</button>
            </>):(<>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(239,68,68,.17)",padding:"7px 18px",marginBottom:"26px"}}><div style={{width:"7px",height:"7px",borderRadius:"50%",background:"#EF4444"}}/><span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".16em",color:"#EF4444",textTransform:"uppercase"}}>Slot Unavailable</span></div>
              <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.9rem",color:"var(--ivory)",marginBottom:"13px"}}>This slot was just reserved.</h3>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.02rem",color:"rgba(244,236,213,.4)",marginBottom:"26px"}}>Please select another available time.</p>
              <button className="btng" style={{padding:"12px 28px",fontSize:".56rem"}} onClick={()=>{setStep(2);setSlot("");setAiSt("idle");}}>Choose Another Time</button>
            </>)}
          </div>}
        </div>
      </div>
    </section>
  );
}

/* ─── Courses ───────────────────────────────────────────────── */
function Courses(){
  const [sel,setSel]=useState(null);
  const [pSt,setPSt]=useState(1);
  const [upi,setUpi]=useState("");
  const [bf,setBf]=useState({name:"",phone:""});
  const upiA=[{id:"phonepe",l:"PhonePe",c:"#5f259f"},{id:"gpay",l:"Google Pay",c:"#4285F4"},{id:"paytm",l:"Paytm",c:"#00BAF2"}];
  const doPay=async()=>{await new Promise(r=>setTimeout(r,1400));setPSt(3);};
  const close=()=>{setSel(null);setPSt(1);setUpi("");setBf({name:"",phone:""});};
  return(
    <section id="courses" style={{padding:"108px 5%"}}>
      <div style={{textAlign:"center",marginBottom:"68px"}}>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".28em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"12px"}}>Online Learning</div>
        <h2 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.3rem)",color:"var(--ivory)"}}>Grooming Masterclasses</h2>
        <div style={{marginTop:"16px",display:"flex",justifyContent:"center"}}><I.Orn/></div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.06rem",fontWeight:300,color:"rgba(244,236,213,.36)",maxWidth:"440px",margin:"20px auto 0",lineHeight:1.88}}>Limited enrolments. Maximum personal attention. Learn directly from Bangalore's most celebrated artiste.</p>
      </div>
      {/* Batch Banner */}
      <div style={{maxWidth:"1000px",margin:"0 auto 60px",border:"1px solid rgba(201,169,110,.17)",padding:"48px 56px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"30px",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,rgba(107,16,40,.11),rgba(13,10,7,.82))"}}>
        <div style={{position:"absolute",top:"13px",left:"13px"}}><I.CTL/></div>
        <div style={{position:"absolute",bottom:"13px",right:"13px"}}><I.CBR/></div>
        <div>
          <div style={{display:"inline-block",border:"1px solid rgba(239,68,68,.32)",padding:"3px 12px",marginBottom:"14px",fontFamily:"'Montserrat',sans-serif",fontSize:".48rem",letterSpacing:".16em",color:"rgba(239,68,68,.78)",textTransform:"uppercase"}}>◆ Batch Filling — Limited Seats</div>
          <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2rem",color:"var(--ivory)",marginBottom:"9px"}}>Live Grooming Ateliers</h3>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".98rem",fontWeight:300,lineHeight:1.9,color:"rgba(244,236,213,.44)",marginBottom:"16px",maxWidth:"430px"}}>Intimate batches of max 10 students. Direct, hands-on guidance from Gulabi. Certificate awarded on completion.</p>
          <div style={{display:"flex",gap:"22px",flexWrap:"wrap"}}>
            {["10 Per Batch","25% Advance Required","Certificate Included","Live + Recorded"].map(f=>(
              <div key={f} style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{color:"rgba(201,169,110,.58)"}}><I.Check/></div><span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".07em",color:"rgba(244,236,213,.48)",textTransform:"uppercase"}}>{f}</span></div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",letterSpacing:".09em",color:"rgba(244,236,213,.2)",textDecoration:"line-through",marginBottom:"2px"}}>₹20,000</div>
          <div className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.9rem",lineHeight:1}}>₹14,999</div>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".1em",color:"var(--ant)",marginBottom:"20px",marginTop:"3px",textTransform:"uppercase"}}>25% Advance — ₹3,750</div>
          <button className="btng" style={{padding:"12px 28px",fontSize:".56rem"}}>Enquire & Reserve</button>
        </div>
      </div>
      {/* Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"1px",maxWidth:"1000px",margin:"0 auto",background:"var(--hair)"}}>
        {CRS.map((c,i)=>{const pct=((c.total-c.seats)/c.total)*100;return(
          <div key={c.id} className={`cc u-up`} style={{animationDelay:`${i*.13}s`}}>
            <div style={{height:"2px",background:`linear-gradient(90deg,${c.acc},transparent)`}}/>
            <div style={{padding:"36px 32px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"22px"}}>
                <div>
                  <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"3.6rem",fontWeight:300,color:"rgba(201,169,110,.065)",lineHeight:1,marginBottom:"-9px",userSelect:"none"}}>{c.no}</div>
                  <div className="bdg">{c.badge}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",letterSpacing:".09em",color:"rgba(244,236,213,.19)",textDecoration:"line-through",marginBottom:"1px"}}>₹{c.orig.toLocaleString()}</div>
                  <div className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.88rem",lineHeight:1}}>₹{c.price.toLocaleString()}</div>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".46rem",color:"#4ADE80",letterSpacing:".07em",marginTop:"2px"}}>Save ₹{(c.orig-c.price).toLocaleString()}</div>
                </div>
              </div>
              <div className="dt" style={{marginBottom:"5px"}}>{c.hrs}</div>
              <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.36rem",color:"var(--ivory)",marginBottom:"11px"}}>{c.title}</h3>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".9rem",fontWeight:300,lineHeight:1.84,color:"rgba(244,236,213,.4)",marginBottom:"20px"}}>{c.desc}</p>
              <div style={{marginBottom:"20px"}}>
                {c.mods.map(m=>(
                  <div key={m} style={{display:"flex",alignItems:"center",gap:"8px",padding:"5px 0",borderBottom:"1px solid rgba(201,169,110,.04)"}}>
                    <div style={{color:"rgba(201,169,110,.42)"}}><I.Diamond/></div>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",letterSpacing:".04em",color:"rgba(244,236,213,.5)"}}>{m}</span>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:"22px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                  <span className="dt">Enrolment</span>
                  <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",fontWeight:500,letterSpacing:".04em",color:c.seats<=2?"#EF4444":"var(--ant)"}}>
                    {c.seats<=2?`◆ Only ${c.seats} seats remain`:`${c.seats} of ${c.total} remaining`}
                  </span>
                </div>
                <div className="st"><div className="sf" style={{width:`${pct}%`}}/></div>
              </div>
              <button className="btng" style={{width:"100%",padding:"13px",fontSize:".56rem"}} onClick={()=>setSel(c)}>Enrol — Instant Access</button>
            </div>
          </div>);
        })}
      </div>
      {/* Modal */}
      {sel&&(
        <div className="mb" onClick={e=>e.target===e.currentTarget&&close()}>
          <div className="mbx">
            <div style={{height:"2px",background:`linear-gradient(90deg,${sel.acc},transparent)`}}/>
            <div style={{padding:"36px 40px"}}>
              {pSt===1&&<div className="u-up">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"26px"}}>
                  <div>
                    <div className="dt" style={{marginBottom:"4px"}}>Purchase</div>
                    <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.55rem",color:"var(--ivory)"}}>{sel.title}</h3>
                  </div>
                  <button onClick={close} style={{background:"none",border:"none",color:"rgba(244,236,213,.28)",cursor:"pointer"}}><I.Close/></button>
                </div>
                <div style={{border:"1px solid var(--hair)",padding:"20px",marginBottom:"22px"}}>
                  {[["Course Price",`₹${sel.price.toLocaleString()}`],["You Save",`₹${(sel.orig-sel.price).toLocaleString()}`]].map(([k,v],i)=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i===0?"1px solid rgba(201,169,110,.04)":"none"}}>
                      <span className="dt">{k}</span>
                      <span style={{fontFamily:"'Bodoni Moda',serif",fontSize:".94rem",color:i===1?"#4ADE80":"var(--ivory)"}}>{v}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",paddingTop:"12px"}}>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",letterSpacing:".1em",color:"var(--ant)",textTransform:"uppercase"}}>Total Due</span>
                    <span className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.38rem"}}>₹{sel.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="dt" style={{marginBottom:"11px"}}>Pay Via</div>
                <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"22px"}}>
                  {upiA.map(a=>(
                    <div key={a.id} className={`uo ${upi===a.id?"sel":""}`} onClick={()=>setUpi(a.id)}>
                      <div style={{width:"7px",height:"7px",borderRadius:"50%",background:a.c,opacity:.72}}/>{a.l}
                      {upi===a.id&&<div style={{marginLeft:"auto",color:"var(--ant)"}}><I.Check/></div>}
                    </div>
                  ))}
                </div>
                <button className="btng" style={{width:"100%",padding:"14px",fontSize:".56rem",opacity:upi?1:.3,pointerEvents:upi?"auto":"none"}} onClick={()=>setPSt(2)}>Proceed to Pay ₹{sel.price.toLocaleString()} →</button>
              </div>}
              {pSt===2&&<div className="u-up">
                <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.55rem",color:"var(--ivory)",marginBottom:"22px"}}>Complete Payment</h3>
                <div style={{border:"1px solid var(--hair)",padding:"30px",textAlign:"center",marginBottom:"22px"}}>
                  <div className="dt" style={{marginBottom:"7px"}}>{upiA.find(u=>u.id===upi)?.l} · UPI</div>
                  <div className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.5rem",marginBottom:"6px"}}>₹{sel.price.toLocaleString()}</div>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".58rem",letterSpacing:".09em",color:"rgba(244,236,213,.26)"}}>UPI ID: gulabi.makeup@paytm</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"13px",marginBottom:"20px"}}>
                  {[["name","Your Name"],["phone","Phone Number"]].map(([k,l])=>(
                    <div key={k}><label className="dt" style={{display:"block",marginBottom:"5px"}}>{l}</label><input className="ef" value={bf[k]} onChange={e=>setBf(f=>({...f,[k]:e.target.value}))} placeholder={l}/></div>
                  ))}
                </div>
                <button className="btng" style={{width:"100%",padding:"14px",fontSize:".56rem"}} onClick={doPay}>Payment Done — Confirm Enrolment</button>
              </div>}
              {pSt===3&&<div className="u-sc" style={{textAlign:"center",padding:"14px 0"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(74,222,128,.16)",padding:"6px 18px",marginBottom:"22px"}}><div className="ld"/><span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".14em",color:"#4ADE80",textTransform:"uppercase"}}>Enrolment Confirmed</span></div>
                <h3 className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.2rem",marginBottom:"12px"}}>Welcome to the Masterclass.</h3>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.02rem",fontWeight:300,color:"rgba(244,236,213,.44)",marginBottom:"26px",lineHeight:1.88}}>Your course materials and access link will be sent within 24 hours.</p>
                <button className="btng" style={{padding:"12px 28px",fontSize:".56rem"}} onClick={close}>Done</button>
              </div>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Portfolio ─────────────────────────────────────────────── */
function Portfolio(){
  const panels=[{l:"Bridal Ceremony",s:"The Ceremonial Look",n:"I"},{l:"Smokey Evening",s:"The Statement Look",n:"II"},{l:"Engagement Grace",s:"The Promise Look",n:"III"},{l:"Editorial Campaign",s:"The Editorial Look",n:"IV"},{l:"Reception Splendour",s:"The Reception Look",n:"V"},{l:"Ethereal Bride",s:"The Ethereal Look",n:"VI"},{l:"Bordeaux Drama",s:"The Drama Look",n:"VII"},{l:"Festive Radiance",s:"The Festive Look",n:"VIII"},{l:"Midnight Noir",s:"The Noir Look",n:"IX"}];
  const grads=["linear-gradient(145deg,#280810,#681028)","linear-gradient(145deg,#100818,#381040)","linear-gradient(145deg,#1C1408,#584010)","linear-gradient(145deg,#080E1A,#1A2C58)","linear-gradient(145deg,#1A0C08,#582818)","linear-gradient(145deg,#161616,#383838)","linear-gradient(145deg,#0C1808,#284820)","linear-gradient(145deg,#100814,#3C1846)","linear-gradient(145deg,#080808,#1E181E)"];
  return(
    <section id="portfolio" style={{padding:"108px 5%"}}>
      <div style={{textAlign:"center",marginBottom:"68px"}}>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".28em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"12px"}}>The Work</div>
        <h2 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.3rem)",color:"var(--ivory)"}}>Portfolio</h2>
        <div style={{marginTop:"16px",display:"flex",justifyContent:"center"}}><I.Orn/></div>
        <div style={{display:"inline-flex",alignItems:"center",gap:"9px",border:"1px solid var(--hair)",padding:"6px 18px",marginTop:"20px"}}>
          <div style={{width:"4px",height:"4px",borderRadius:"50%",background:"var(--ant)",opacity:.4}}/>
          <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".48rem",letterSpacing:".16em",color:"rgba(244,236,213,.24)",textTransform:"uppercase"}}>Gallery updating with actual client sessions</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1px",maxWidth:"1000px",margin:"0 auto",background:"var(--hair)"}}>
        {panels.map((p,i)=>(
          <div key={i} style={{aspectRatio:"1",background:grads[i],position:"relative",overflow:"hidden",cursor:"pointer"}}>
            <svg viewBox="0 0 200 200" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.06,pointerEvents:"none"}}>
              <circle cx="100" cy="100" r="76" stroke="rgba(201,169,110,1)" strokeWidth=".5" fill="none"/>
              <circle cx="100" cy="100" r="54" stroke="rgba(201,169,110,1)" strokeWidth=".3" fill="none" strokeDasharray="4 7"/>
              <circle cx="100" cy="100" r="34" stroke="rgba(201,169,110,1)" strokeWidth=".3" fill="none"/>
              <path d="M100 24 L100 176 M24 100 L176 100" stroke="rgba(201,169,110,1)" strokeWidth=".3"/>
              <path d="M46 46 L154 154 M154 46 L46 154" stroke="rgba(201,169,110,1)" strokeWidth=".18"/>
            </svg>
            <div style={{position:"absolute",top:"13px",left:"16px",fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"2.6rem",color:"rgba(201,169,110,.15)",lineHeight:1,userSelect:"none"}}>{p.n}</div>
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px",background:"linear-gradient(0deg,rgba(7,5,4,.9),transparent)"}}>
              <div className="dt" style={{marginBottom:"2px",fontSize:".42rem"}}>{p.s}</div>
              <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.02rem",color:"var(--ivory)"}}>{p.l}</div>
            </div>
            <div style={{position:"absolute",inset:0,background:"rgba(107,16,40,.66)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}
              onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:".98rem",color:"var(--ivory)",marginBottom:"6px"}}>{p.l}</div>
                <div className="dt" style={{fontSize:".42rem"}}>@makeupbygulabi_bangalore</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginTop:"40px"}}>
        <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <button className="btno" style={{padding:"13px 36px",fontSize:".56rem"}}>Follow on Instagram</button>
        </a>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────────────── */
function Testimonials(){
  const [act,setAct]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setAct(i=>(i+1)%TESTI.length),4500);return()=>clearInterval(t);},[]);
  return(
    <section id="testimonials" style={{padding:"108px 5%",background:"linear-gradient(180deg,transparent,rgba(107,16,40,.03),transparent)"}}>
      <div style={{textAlign:"center",marginBottom:"68px"}}>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".28em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"12px"}}>Client Stories</div>
        <h2 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.3rem)",color:"var(--ivory)"}}>Testimonials</h2>
        <div style={{marginTop:"16px",display:"flex",justifyContent:"center"}}><I.Orn/></div>
      </div>
      <div style={{maxWidth:"820px",margin:"0 auto"}}>
        <div className="tc" style={{padding:"48px 52px",marginBottom:"32px",background:"linear-gradient(145deg,rgba(107,16,40,.07),rgba(13,10,7,.7))",position:"relative"}}>
          <div style={{position:"absolute",top:"-7px",left:"36px",fontFamily:"'Bodoni Moda',serif",fontSize:"7rem",fontWeight:300,color:"rgba(201,169,110,.065)",lineHeight:1,userSelect:"none"}}>"</div>
          <div style={{display:"flex",gap:"5px",marginBottom:"18px"}}>{[...Array(5)].map((_,i)=><div key={i} style={{color:"rgba(201,169,110,.72)"}}><I.Star/></div>)}</div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.35rem",lineHeight:1.9,color:"rgba(244,236,213,.78)",marginBottom:"26px"}}>"{TESTI[act].text}"</p>
          <div style={{display:"flex",alignItems:"center",gap:"16px",paddingTop:"22px",borderTop:"1px solid var(--hair)"}}>
            <div style={{width:"38px",height:"38px",border:"1px solid rgba(201,169,110,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.05rem",color:"var(--ant)"}}>{TESTI[act].name[0]}</div>
            <div>
              <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.02rem",color:"var(--ivory)"}}>{TESTI[act].name}</div>
              <div className="dt" style={{marginTop:"2px",fontSize:".48rem"}}>{TESTI[act].role}</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"32px"}}>
          {TESTI.map((_,i)=><div key={i} onClick={()=>setAct(i)} style={{width:i===act?"24px":"7px",height:"7px",borderRadius:"4px",background:i===act?"var(--ant)":"rgba(244,236,213,.09)",cursor:"pointer",transition:"all .3s"}}/>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))",gap:"1px",background:"var(--hair)"}}>
          {TESTI.map((t,i)=>(
            <div key={t.name} onClick={()=>setAct(i)} className="tc" style={{padding:"18px 16px",cursor:"pointer",background:"var(--deep)",opacity:act===i?1:.4,transition:"opacity .3s"}}>
              <div style={{display:"flex",gap:"3px",marginBottom:"8px"}}>{[...Array(5)].map((_,j)=><div key={j} style={{color:"rgba(201,169,110,.52)"}}><I.Star/></div>)}</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:".86rem",color:"rgba(244,236,213,.46)",marginBottom:"8px",lineHeight:1.6}}>"{t.text.slice(0,60)}…"</p>
              <div className="dt" style={{fontSize:".46rem"}}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Social ────────────────────────────────────────────────── */
function Social(){
  const posts=Array.from({length:6},(_,i)=>({id:i,likes:Math.floor(Math.random()*3000)+500,grad:["linear-gradient(145deg,#280810,#681028)","linear-gradient(145deg,#1C1408,#584010)","linear-gradient(145deg,#100818,#381040)","linear-gradient(145deg,#0C1808,#284820)","linear-gradient(145deg,#080E1A,#1A2C58)","linear-gradient(145deg,#161616,#383838)"][i],cap:["Bridal Look","Evening Glam","Engagement","Editorial","Natural Glow","Night Out"][i]}));
  const ytvids=[{t:"Bridal Makeup Tutorial — The Dewy Veil Look",v:"42K"},{t:"5-Minute Evening Glam · Gulabi Bangalore",v:"28K"},{t:"Complete Eye Architecture Masterclass",v:"61K"}];
  return(
    <section id="social" style={{padding:"108px 5%"}}>
      <div style={{textAlign:"center",marginBottom:"68px"}}>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".28em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"12px"}}>Stay Connected</div>
        <h2 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(2.1rem,3.7vw,3.3rem)",color:"var(--ivory)"}}>Social Presence</h2>
        <div style={{marginTop:"16px",display:"flex",justifyContent:"center"}}><I.Orn/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"56px",maxWidth:"1180px",margin:"0 auto"}} className="tc2">
        {/* IG */}
        <div>
          <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px",paddingBottom:"18px",borderBottom:"1px solid var(--hair)"}}>
            <div style={{color:"rgba(201,169,110,.55)"}}><I.Insta/></div>
            <div>
              <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.15rem",color:"var(--ivory)"}}>@makeupbygulabi_bangalore</div>
              <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer">
                <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".1em",color:"rgba(201,169,110,.46)",textDecoration:"none",textTransform:"uppercase",cursor:"pointer"}}>Follow on Instagram</span>
              </a>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px"}}>
            {posts.map(p=>(
              <div key={p.id} style={{aspectRatio:"1",background:p.grad,position:"relative",overflow:"hidden",cursor:"pointer"}}>
                <svg viewBox="0 0 100 100" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.08,pointerEvents:"none"}}><circle cx="50" cy="50" r="34" stroke="rgba(201,169,110,1)" strokeWidth=".5" fill="none"/><circle cx="50" cy="50" r="20" stroke="rgba(201,169,110,1)" strokeWidth=".3" fill="none"/><path d="M50 16 L50 84 M16 50 L84 50" stroke="rgba(201,169,110,1)" strokeWidth=".3"/></svg>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"9px 9px",background:"linear-gradient(0deg,rgba(7,5,4,.88),transparent)"}}>
                  <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:".78rem",color:"var(--ivory)"}}>{p.cap}</div>
                </div>
                <div style={{position:"absolute",inset:0,background:"rgba(107,16,40,.68)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(3px)"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}>
                  <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".58rem",color:"rgba(244,236,213,.78)",letterSpacing:".12em"}}>◆ {p.likes.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* YT */}
        <div>
          <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px",paddingBottom:"18px",borderBottom:"1px solid var(--hair)"}}>
            <div style={{color:"rgba(239,68,68,.55)"}}><I.Play/></div>
            <div>
              <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.15rem",color:"var(--ivory)"}}>Gulabi — Makeup Artistry</div>
              <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".1em",color:"rgba(244,236,213,.22)",textTransform:"uppercase"}}>YouTube Channel</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
            {ytvids.map((v,i)=>(
              <div key={v.t} className="glass" style={{padding:"20px 22px",display:"flex",gap:"16px",alignItems:"center",cursor:"pointer"}}>
                <div style={{width:"68px",height:"50px",flexShrink:0,background:"linear-gradient(145deg,rgba(107,16,40,.55),rgba(13,10,7,.9))",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid var(--hair)"}}>
                  <I.Play/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".96rem",fontWeight:300,color:"var(--ivory)",marginBottom:"3px",lineHeight:1.4}}>{v.t}</div>
                  <div className="dt" style={{fontSize:".46rem"}}>{v.v} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Collab */}
      <div style={{maxWidth:"940px",margin:"88px auto 0",border:"1px solid rgba(201,169,110,.14)",padding:"68px 76px",textAlign:"center",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,rgba(107,16,40,.09),rgba(13,10,7,.8))"}}>
        <div style={{position:"absolute",top:"18px",left:"18px"}}><I.CTL/></div>
        <div style={{position:"absolute",bottom:"18px",right:"18px"}}><I.CBR/></div>
        <div style={{position:"absolute",top:"-55px",right:"-55px",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle,rgba(201,169,110,.045),transparent)"}}/>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".56rem",letterSpacing:".26em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"14px"}}>◆ &nbsp; Open for Partnerships</div>
        <h3 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(1.75rem,3.4vw,2.7rem)",color:"var(--ivory)",marginBottom:"18px",lineHeight:1.08}}>Brand Collaborations<br/>& Paid Partnerships</h3>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.08rem",fontWeight:300,color:"rgba(244,236,213,.42)",maxWidth:"500px",margin:"0 auto 36px",lineHeight:1.92}}>With 1,200+ transformations and a highly engaged audience across Bengaluru, Gulabi partners with beauty, skincare and lifestyle brands that share her commitment to excellence.</p>
        <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btng" style={{padding:"14px 38px",fontSize:".58rem"}}>Send Collaboration Brief</button>
          <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button className="btno" style={{padding:"14px 38px",fontSize:".58rem"}}>View on Instagram</button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Dashboard ─────────────────────────────────────────────── */
function Dashboard(){
  const [tab,setTab]=useState("overview");
  const METRICS=[{l:"Site Visitors Today",v:"1,247",c:"+18%"},{l:"Appointments This Month",v:"34",c:"+12"},{l:"Revenue This Month",v:"₹2.84L",c:"+24%"},{l:"Course Enrolments",v:"89",c:"+31%"},{l:"Enquiries",v:"156",c:"+8"},{l:"Collab Requests",v:"12",c:"NEW"}];
  const BKS=[{n:"Priya S.",s:"Bridal",dt:"22 Feb",t:"3:00 PM",st:"confirmed",a:"₹15,000"},{n:"Ananya R.",s:"Evening Glam",dt:"23 Feb",t:"11:00 AM",st:"confirmed",a:"₹4,500"},{n:"Meera K.",s:"Engagement",dt:"24 Feb",t:"2:00 PM",st:"pending",a:"₹8,000"},{n:"Divya P.",s:"Bridal Trial",dt:"25 Feb",t:"3:00 PM",st:"confirmed",a:"₹2,500"}];
  const SALES=[{c:"Bridal Glow Masterclass",u:34,r:"₹1.70L",p:38},{c:"Evening Glam Deep Dive",u:28,r:"₹1.96L",p:31},{c:"Complete Grooming Bible",u:27,r:"₹2.43L",p:30}];
  const ENQ=[{tp:"Client Booking",n:"Sunita Verma",m:"I'd like to book bridal makeup for March 15. Can you confirm availability?",ag:"2h",tg:"booking"},{tp:"Brand Collab",n:"NYKAA Beauty",m:"We'd like to discuss a paid partnership for our new product launch campaign.",ag:"5h",tg:"collab"},{tp:"Course",n:"Keerthi Mohan",m:"I'm interested in the 36-hour masterclass. When does the next batch commence?",ag:"1d",tg:"course"},{tp:"Partnership",n:"Sugar Cosmetics",m:"We'd love to send our new collection for review. Open to a collaboration?",ag:"2d",tg:"collab"}];
  const rBars=[38,52,32,68,58,80,90,72,86,95,84,92];
  const stC={confirmed:"#4ADE80",pending:"#C9A96E",cancelled:"#EF4444"};
  const tgC={collab:"var(--ant)",booking:"var(--crim)",course:"rgba(244,236,213,.55)"};
  return(
    <section id="dashboard" style={{padding:"96px 5% 108px",minHeight:"80vh"}}>
      <div style={{maxWidth:"1180px",margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"44px",paddingBottom:"28px",borderBottom:"1px solid var(--hair)",flexWrap:"wrap",gap:"18px"}}>
          <div>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".28em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"10px"}}>Admin Portal</div>
            <h2 style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.7rem",color:"var(--ivory)"}}>AI Dashboard</h2>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:"9px",border:"1px solid rgba(74,222,128,.18)",padding:"7px 16px"}}>
            <div className="ld"/><span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",letterSpacing:".15em",color:"rgba(74,222,128,.78)",textTransform:"uppercase"}}>AI Agent Monitoring · Live</span>
          </div>
        </div>
        <div style={{display:"flex",gap:"0",marginBottom:"36px",borderBottom:"1px solid var(--hair)"}}>
          {["overview","appointments","courses","enquiries"].map(t=>(
            <button key={t} className={`dtb ${tab===t?"act":""}`} onClick={()=>setTab(t)} style={{textTransform:"capitalize"}}>{t}</button>
          ))}
        </div>
        {tab==="overview"&&(<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:"1px",background:"var(--hair)",marginBottom:"2px"}}>
            {METRICS.map(m=>(
              <div key={m.l} className="mc" style={{padding:"26px 22px"}}>
                <div className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontWeight:300,fontSize:"2.1rem",lineHeight:1,marginBottom:"7px"}}>{m.v}</div>
                <div className="dt" style={{marginBottom:"9px",lineHeight:1.45}}>{m.l}</div>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".58rem",color:"#4ADE80",fontWeight:500}}>{m.c}</div>
              </div>
            ))}
          </div>
          <div className="mc" style={{padding:"34px",marginTop:"2px"}}>
            <div className="dt" style={{marginBottom:"24px"}}>Monthly Revenue</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:"9px",height:"88px"}}>
              {rBars.map((h,i)=>(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}>
                  <div className="rb" style={{width:"100%",height:`${h}%`,opacity:i===11?1:.52}}/>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".45rem",color:"rgba(244,236,213,.18)"}}>{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </>)}
        {tab==="appointments"&&(
          <div className="mc" style={{padding:"34px"}}>
            <div className="dt" style={{marginBottom:"24px"}}>Upcoming Appointments</div>
            <div style={{display:"flex",flexDirection:"column",gap:"1px",background:"var(--hair)"}}>
              {BKS.map((b,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",background:"var(--deep)",flexWrap:"wrap",gap:"10px"}}>
                  <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
                    <div style={{width:"36px",height:"36px",border:"1px solid rgba(201,169,110,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:".98rem",color:"var(--ant)"}}>{b.n[0]}</div>
                    <div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.02rem",color:"var(--ivory)"}}>{b.n}</div>
                      <div className="dt" style={{marginTop:"1px"}}>{b.s} · {b.dt} · {b.t}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.05rem",marginBottom:"2px"}}>{b.a}</div>
                    <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".5rem",fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",color:stC[b.st]}}>{b.st}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="courses"&&(
          <div className="mc" style={{padding:"34px"}}>
            <div className="dt" style={{marginBottom:"24px"}}>Course Performance</div>
            {SALES.map((s,i)=>(
              <div key={s.c} style={{padding:"22px 0",borderBottom:i<SALES.length-1?"1px solid var(--hair)":"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"9px"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.06rem",color:"var(--ivory)"}}>{s.c}</div>
                  <div className="gt" style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"1.06rem"}}>{s.r}</div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                  <span className="dt">{s.u} enrolments</span>
                  <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:".52rem",color:"#4ADE80"}}>+{Math.floor(Math.random()*16+8)}% this month</span>
                </div>
                <div className="st"><div className="sf" style={{width:`${s.p}%`}}/></div>
              </div>
            ))}
          </div>
        )}
        {tab==="enquiries"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"1px",background:"var(--hair)"}}>
            {ENQ.map((e,i)=>(
              <div key={i} className="mc" style={{display:"flex",gap:"18px",alignItems:"start",padding:"22px 26px",background:"var(--deep)"}}>
                <div style={{border:`1px solid ${e.tg==="collab"?"rgba(201,169,110,.28)":e.tg==="booking"?"rgba(158,24,56,.28)":"rgba(244,236,213,.09)"}`,padding:"3px 11px",flexShrink:0,fontFamily:"'Montserrat',sans-serif",fontSize:".46rem",fontWeight:500,letterSpacing:".13em",textTransform:"uppercase",color:tgC[e.tg]}}>
                  {e.tp}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:".96rem",color:"var(--ivory)",marginBottom:"5px"}}>{e.n}</div>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:".92rem",color:"rgba(244,236,213,.4)",lineHeight:1.7}}>{e.m}</p>
                </div>
                <div className="dt" style={{flexShrink:0,fontSize:".46rem"}}>{e.ag}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function Footer(){
  return(
    <footer style={{borderTop:"1px solid var(--hair)",padding:"68px 5% 38px",background:"rgba(0,0,0,.28)"}}>
      <div style={{maxWidth:"1180px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(215px,1fr))",gap:"52px",marginBottom:"52px"}}>
          <div>
            <div style={{fontFamily:"'Bodoni Moda',serif",fontStyle:"italic",fontSize:"2.1rem",background:"linear-gradient(135deg,#C9A96E,#EDD9A3,#C9A96E)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"18px"}}>Gulabi</div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:".97rem",lineHeight:1.92,color:"rgba(244,236,213,.36)",marginBottom:"24px"}}>Bangalore's celebrated makeup artiste. Crafting extraordinary transformations for brides, tastemakers and beauty connoisseurs.</p>
            <div style={{display:"flex",gap:"12px"}}>
              <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{width:"36px",height:"36px",border:"1px solid rgba(201,169,110,.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(201,169,110,.5)",textDecoration:"none",transition:"all .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--ant)";e.currentTarget.style.color="var(--ant)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,169,110,.18)";e.currentTarget.style.color="rgba(201,169,110,.5)"}}>
                <I.Insta/>
              </a>
              <div style={{width:"36px",height:"36px",border:"1px solid rgba(244,236,213,.09)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(244,236,213,.28)",cursor:"pointer",transition:"all .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(239,68,68,.38)";e.currentTarget.style.color="rgba(239,68,68,.56)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(244,236,213,.09)";e.currentTarget.style.color="rgba(244,236,213,.28)"}}>
                <I.Play/>
              </div>
            </div>
          </div>
          <div>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".26em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"22px"}}>Services</div>
            {["Bridal Artistry","Evening Glamour","Engagement Beauty","Grooming Ateliers","Online Masterclasses"].map(s=>(
              <div key={s} style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".97rem",fontWeight:300,color:"rgba(244,236,213,.36)",padding:"6px 0",cursor:"pointer",transition:"color .25s",borderBottom:"1px solid rgba(201,169,110,.04)"}}
                onMouseEnter={e=>e.target.style.color="var(--ant)"} onMouseLeave={e=>e.target.style.color="rgba(244,236,213,.36)"}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".26em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"22px"}}>Contact</div>
            {["Bangalore, Karnataka, India","By Appointment Only","gulabi.makeup@gmail.com","Mon – Sat  ·  9 AM – 7 PM"].map(t=>(
              <div key={t} style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:".97rem",color:"rgba(244,236,213,.36)",padding:"6px 0",borderBottom:"1px solid rgba(201,169,110,.04)"}}>{t}</div>
            ))}
          </div>
          <div>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".54rem",letterSpacing:".26em",color:"var(--ant)",textTransform:"uppercase",marginBottom:"22px"}}>Find Us</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
              {["Bridal Makeup Bangalore","Best Makeup Artist","Party Makeup HSR","Grooming Classes","Makeup Artist Near Me","Engagement Makeup"].map(k=>(
                <span key={k} style={{border:"1px solid rgba(201,169,110,.09)",padding:"3px 11px",fontFamily:"'Montserrat',sans-serif",fontSize:".46rem",letterSpacing:".09em",color:"rgba(244,236,213,.22)",textTransform:"uppercase"}}>{k}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid var(--hair)",paddingTop:"24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"14px"}}>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:".48rem",letterSpacing:".1em",color:"rgba(244,236,213,.18)"}}>© 2025 Gulabi Makeup Artistry · All Rights Reserved</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".88rem",color:"rgba(201,169,110,.28)"}}>Bangalore's Celebrated Makeup Artiste</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────────── */
export default function App(){
  const [sec,setSec]=useState("home");
  const [admin,setAdmin]=useState(false);
  const goTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setSec(id);};

  useEffect(()=>{
    document.title="Gulabi — Renowned Make-Up Artist in Bangalore | Bridal, Party & Grooming";
    const m=document.createElement("meta");m.name="description";
    m.content="Gulabi is Bangalore's most celebrated makeup artiste — specialising in bridal, engagement and evening glamour. Book appointments, buy online grooming masterclasses. Serving HSR Layout, Koramangala, Indiranagar & across Bangalore.";
    document.head.appendChild(m);
  },[]);

  useEffect(()=>{
    const h=()=>{const ss=["home","services","book","courses","portfolio","testimonials","social"];for(const s of ss){const el=document.getElementById(s);if(el){const r=el.getBoundingClientRect();if(r.top<=75&&r.bottom>=75){setSec(s);break;}}}};
    window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);
  },[]);

  return(
    <div style={{background:"var(--ink)",minHeight:"100vh"}}>
      <Nav sec={sec} goTo={goTo} admin={admin} setAdmin={setAdmin}/>
      {admin?<div style={{paddingTop:"67px"}}><Dashboard/></div>:<>
        <Hero onBook={()=>goTo("book")}/>
        <Services onBook={()=>goTo("book")}/>
        <Booking/>
        <Courses/>
        <Portfolio/>
        <Testimonials/>
        <Social/>
      </>}
      <Footer/>
    </div>
  );
}
