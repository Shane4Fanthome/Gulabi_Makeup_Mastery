import { useState, useEffect } from "react";

(function injectFonts() {
  if (document.getElementById("gf")) return;
  const l = document.createElement("link");
  l.id = "gf"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap";
  document.head.appendChild(l);
})();

const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --plum:#1A0818;--plum2:#2D0F26;--wine:#5C1035;--crim:#8B1A3A;--rose:#C4496A;
    --gold:#C8973A;--gold2:#E2BC72;--gold3:#F0D898;
    --white:#FFFFFF;--ivory:#FBF8F4;--cream:#F5EFE6;
    --ink:#1A1108;--ink2:#3D2E20;--ink3:#7A6654;--success:#15803d;
  }
  html{scroll-behavior:smooth}
  body{background:var(--ivory);color:var(--ink);font-family:'DM Sans',sans-serif;overflow-x:hidden}
  ::selection{background:var(--wine);color:#fff}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--plum)}::-webkit-scrollbar-thumb{background:var(--gold)}
  @keyframes rUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes rLeft{from{opacity:0;transform:translateX(-44px)}to{opacity:1;transform:translateX(0)}}
  @keyframes fIn{from{opacity:0}to{opacity:1}}
  @keyframes sCIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
  @keyframes shg{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes pls{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
  @keyframes rot{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes rotrev{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
  .u-up{animation:rUp .85s cubic-bezier(.22,.68,0,1.15) both}
  .u-lft{animation:rLeft .85s cubic-bezier(.22,.68,0,1.15) both}
  .u-in{animation:fIn .7s ease both}
  .u-sc{animation:sCIn .6s ease both}
  .gt{background:linear-gradient(90deg,#8A6020 0%,#C8973A 28%,#F0D898 50%,#C8973A 72%,#8A6020 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shg 5s linear infinite}
  .nav-wrap{position:fixed;top:0;left:0;right:0;z-index:900;transition:all .4s;padding:0 5%}
  .nav-wrap.scrolled{background:rgba(26,8,24,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(200,151,58,.18);box-shadow:0 4px 32px rgba(26,8,24,.5)}
  .nav-link{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55);cursor:pointer;text-decoration:none;transition:color .3s}
  .nav-link:hover,.nav-link.act{color:var(--gold2)}
  .hero{min-height:100vh;background:linear-gradient(135deg,#1A0818 0%,#2D0F26 35%,#1A0818 65%,#0D0412 100%);position:relative;overflow:hidden;display:flex;align-items:center;padding-top:76px}
  .btn-primary{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#fff;background:linear-gradient(135deg,#8B1A3A,#C4496A,#8B1A3A);background-size:200%;border:none;cursor:pointer;transition:all .35s;padding:16px 38px;display:inline-block}
  .btn-primary:hover{background-position:100%;box-shadow:0 12px 40px rgba(139,26,58,.5);transform:translateY(-2px)}
  .btn-gold{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--ink);background:linear-gradient(135deg,#C8973A,#F0D898,#C8973A);background-size:200%;border:none;cursor:pointer;transition:all .35s;padding:16px 38px;display:inline-block}
  .btn-gold:hover{background-position:100%;box-shadow:0 12px 36px rgba(200,151,58,.45);transform:translateY(-2px)}
  .btn-outline{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:#fff;background:transparent;border:1px solid rgba(255,255,255,.3);cursor:pointer;transition:all .3s;padding:16px 38px;display:inline-block}
  .btn-outline:hover{border-color:var(--gold2);color:var(--gold2);transform:translateY(-2px)}
  .btn-dark{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#fff;background:var(--wine);border:none;cursor:pointer;transition:all .35s;padding:15px 36px;display:inline-block}
  .btn-dark:hover{background:var(--crim);box-shadow:0 8px 28px rgba(139,26,58,.4);transform:translateY(-2px)}
  .btn-dark-o{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:var(--wine);background:transparent;border:1.5px solid rgba(139,26,58,.35);cursor:pointer;transition:all .3s;padding:14px 34px;display:inline-block}
  .btn-dark-o:hover{border-color:var(--wine);background:rgba(139,26,58,.06);transform:translateY(-2px)}
  .sec{padding:100px 5%}
  .sec-label{font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);display:inline-flex;align-items:center;gap:10px}
  .sec-label::before{content:'';display:block;width:28px;height:1px;background:var(--gold);opacity:.6}
  .sec-h{font-family:'Playfair Display',serif;font-weight:500;line-height:1.05;letter-spacing:-.01em}
  .svc-card{background:#fff;border:1px solid rgba(26,8,24,.06);box-shadow:0 2px 20px rgba(26,8,24,.06);transition:all .35s;cursor:pointer;position:relative;overflow:hidden}
  .svc-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--wine),var(--gold));transform:scaleX(0);transform-origin:left;transition:transform .35s}
  .svc-card:hover{box-shadow:0 16px 52px rgba(26,8,24,.14);transform:translateY(-6px)}
  .svc-card:hover::after{transform:scaleX(1)}
  .course-card{background:#fff;border:1px solid rgba(26,8,24,.07);box-shadow:0 4px 24px rgba(26,8,24,.07);position:relative;overflow:hidden;transition:all .4s}
  .course-card:hover{box-shadow:0 24px 64px rgba(26,8,24,.14);transform:translateY(-8px)}
  .trust-strip{background:linear-gradient(135deg,#2D0F26,#1A0818);border-top:1px solid rgba(200,151,58,.18);border-bottom:1px solid rgba(200,151,58,.18)}
  .step-dot{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-style:italic;font-size:.95rem;border:1.5px solid;transition:all .35s;flex-shrink:0}
  .field{width:100%;background:transparent;border:0;border-bottom:1.5px solid rgba(26,8,24,.15);padding:12px 0;color:var(--ink);font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;outline:none;transition:border-color .3s}
  .field:focus{border-color:var(--wine)}.field::placeholder{color:var(--ink3);opacity:.7}
  .dt-chip{font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;padding:8px 16px;border:1px solid rgba(26,8,24,.12);cursor:pointer;transition:all .25s;background:#fff;color:var(--ink2);text-align:center}
  .dt-chip:hover,.dt-chip.sel{background:var(--wine);border-color:var(--wine);color:#fff}
  .dt-chip.na{opacity:.3;cursor:not-allowed;background:var(--cream);text-decoration:line-through}
  .time-chip{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;padding:9px 18px;border:1px solid rgba(26,8,24,.12);cursor:pointer;transition:all .25s;background:#fff;color:var(--ink2)}
  .time-chip:hover,.time-chip.sel{background:var(--wine);border-color:var(--wine);color:#fff}
  .time-chip.bk{background:var(--cream);color:var(--ink3);cursor:not-allowed;text-decoration:line-through;opacity:.5}
  .prog-bg{height:3px;background:rgba(26,8,24,.08);overflow:hidden}
  .prog-fill{height:100%;background:linear-gradient(90deg,var(--wine),var(--gold));transition:width .8s}
  .modal-bg{position:fixed;inset:0;z-index:2000;background:rgba(26,8,24,.75);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;animation:fIn .3s ease}
  .modal-box{background:var(--white);max-width:500px;width:92%;max-height:92vh;overflow-y:auto;animation:sCIn .35s ease;box-shadow:0 40px 100px rgba(26,8,24,.4)}
  .live-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:pls 2s ease-in-out infinite}
  .mq-outer{overflow:hidden}.mq-inner{display:flex;white-space:nowrap;animation:tick 30s linear infinite}
  .upi-opt{border:1px solid rgba(26,8,24,.1);padding:14px 18px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all .25s;font-family:'DM Sans',sans-serif;font-size:.7rem;font-weight:400;color:var(--ink2);background:#fff}
  .upi-opt:hover,.upi-opt.sel{border-color:var(--wine);background:rgba(139,26,58,.04);color:var(--wine)}
  .tab-btn{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:400;letter-spacing:.14em;text-transform:uppercase;padding:10px 22px;border:0;border-bottom:2px solid transparent;cursor:pointer;transition:all .25s;color:var(--ink3);background:transparent}
  .tab-btn.act{border-bottom-color:var(--wine);color:var(--wine);font-weight:500}
  .tab-btn:hover:not(.act){color:var(--ink)}
  .metric{background:#fff;border:1px solid rgba(26,8,24,.07);box-shadow:0 2px 16px rgba(26,8,24,.05);padding:22px 18px;position:relative;overflow:hidden}
  .metric::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--wine),var(--gold))}
  .rev-bar{background:linear-gradient(180deg,var(--rose),var(--wine));border-radius:2px 2px 0 0;transition:height .6s}
  @media(max-width:768px){.hero-h{font-size:3.2rem !important}.hide-mob{display:none !important}.two-col{grid-template-columns:1fr !important}}
`;
(function injectCSS(){if(document.getElementById("gc"))return;const s=document.createElement("style");s.id="gc";s.textContent=CSS;document.head.appendChild(s);})();

const UPI_ID="gulabi.makeup@paytm";

const Ic={
  Check:()=><svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1.5 7L5 10.5 11.5 2.5"/></svg>,
  Close:()=><svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M2 2L13 13M13 2L2 13"/></svg>,
  Star:()=><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1 7.5 4.5H11.5L8.5 6.8 9.8 10.5 6 8.2 2.2 10.5 3.5 6.8.5 4.5H4.5Z"/></svg>,
  Arrow:()=><svg width="18" height="9" viewBox="0 0 18 9" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M1 4.5H17M11.5 1L17 4.5 11.5 8"/></svg>,
  Insta:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>,
  Play:()=><svg width="15" height="15" viewBox="0 0 15 15"><path d="M3 2L13 7.5 3 13Z" fill="currentColor"/></svg>,
  QR:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><rect x="2" y="2" width="8" height="8"/><rect x="14" y="2" width="8" height="8"/><rect x="2" y="14" width="8" height="8"/><rect x="4.5" y="4.5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="16.5" y="4.5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="4.5" y="16.5" width="3" height="3" fill="currentColor" stroke="none"/><path d="M14 14h2v2M18 14h4M14 18v4M18 18h4"/></svg>,
  Shield:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6Z"/><path d="M9 12l2 2 4-4"/></svg>,
  Award:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="12" cy="9" r="7"/><path d="M8.2 15.8L6 22l6-3 6 3-2.2-6.2"/></svg>,
  Heart:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/></svg>,
};

const SVCS=[
  {id:"bridal",no:"01",title:"Bridal Artistry",sub:"The Ceremonial Look",desc:"14+ hour lasting, camera-perfect bridal makeup personalised to your skin, heritage and vision — for a look you'll cherish forever.",price:"8,000 – 25,000",tag:"Most Booked"},
  {id:"party",no:"02",title:"Evening Glamour",sub:"The Statement Look",desc:"Bold, luminous looks for galas, receptions and soirees. From barely-there radiance to high-impact editorial drama.",price:"3,000 – 8,000",tag:"Fan Favourite"},
  {id:"engage",no:"03",title:"Engagement Beauty",sub:"The Promise Look",desc:"Photograph-ready artistry for your engagement — luminous skin, defined eyes and an impeccable finish from the first frame to the last.",price:"5,000 – 15,000",tag:"Trending Now"},
  {id:"groom",no:"04",title:"Grooming Ateliers",sub:"The Education Experience",desc:"Intimate batches of 10. Master professional technique under direct guidance — contouring, eye architecture and longevity secrets.",price:"14,999 / batch",tag:"25% Advance"},
];
const CRS=[
  {id:1,title:"Bridal Glow Masterclass",hrs:"24 Hours",price:4999,orig:8999,seats:3,total:10,badge:"BESTSELLER",desc:"Foundation mastery, bridal contouring, longevity rituals and the signature Gulabi glow technique.",mods:["Foundation & Skin Prep","Bridal Contouring","Eye Drama Technique","Longevity Masterclass"],color:"#8B1A3A"},
  {id:2,title:"Evening Glam Deep Dive",hrs:"36 Hours",price:6999,orig:12999,seats:5,total:10,badge:"PREMIUM",desc:"Smokey architecture, editorial highlights, glass-skin techniques and electrifying night-ready artistry.",mods:["Smokey Eye Architecture","Glass Skin Ritual","Highlight Mastery","Colour Theory"],color:"#7A5320"},
  {id:3,title:"The Complete Grooming Bible",hrs:"48 Hours",price:8999,orig:16999,seats:2,total:10,badge:"MASTER CLASS",desc:"Full-spectrum curriculum — every technique, live model sessions and industry-recognised certification.",mods:["Skincare Foundation","All Makeup Genres","Live Model Sessions","Certificate Awarded"],color:"#8B1A3A"},
];
const TESTI=[
  {name:"Priya Sharma",role:"Bride · Leela Palace Reception",rating:5,text:"Gulabi transformed me into the most radiant version of myself. The makeup lasted 14 hours, every photograph was flawless. I have never felt more beautiful in my life."},
  {name:"Ananya Reddy",role:"Guest · ITC Windsor Gala",rating:5,text:"I have sat in many artists chairs across Mumbai and Bangalore. Gulabis understanding of light, structure and skin is in an entirely different league. Extraordinary."},
  {name:"Meera Krishnan",role:"Student · 36-Hour Masterclass",rating:5,text:"The curriculum completely changed my understanding of makeup. The precision, patience and artistry Gulabi teaches is world-class. I now run my own successful studio."},
  {name:"Divya Patel",role:"Bride · Engagement and Wedding",rating:5,text:"From the first trial to the final day, impeccable. Gulabi captured my vision before I could even articulate it. Worth every rupee and so much more."},
  {name:"Rhea Nair",role:"Brand Manager · Campaign Collaboration",rating:5,text:"Working with Gulabi on our campaign was revelatory. Her editorial sensibility and professionalism elevated the entire production. Will collaborate again without hesitation."},
];
const SLOTS={"2025-02-22":["10:00 AM","12:00 PM","3:00 PM","5:00 PM"],"2025-02-23":["11:00 AM","2:00 PM","4:00 PM"],"2025-02-24":["10:00 AM","1:00 PM"],"2025-02-25":["11:00 AM","12:00 PM","3:00 PM","6:00 PM"],"2025-02-26":["10:00 AM","2:00 PM","5:00 PM"]};
const BOOKED={"2025-02-22":["12:00 PM"],"2025-02-24":["10:00 AM"],"2025-02-26":["10:00 AM","5:00 PM"]};

function HeroArt(){
  return(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <svg viewBox="0 0 500 580" style={{width:"100%",height:"100%",overflow:"visible"}}>
        <defs>
          <radialGradient id="gg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#C8973A" stopOpacity=".22"/><stop offset="100%" stopColor="#C8973A" stopOpacity="0"/></radialGradient>
          <radialGradient id="gg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#C4496A" stopOpacity=".14"/><stop offset="100%" stopColor="#C4496A" stopOpacity="0"/></radialGradient>
          <linearGradient id="gl1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="transparent"/><stop offset="40%" stopColor="#C8973A" stopOpacity=".6"/><stop offset="100%" stopColor="transparent"/></linearGradient>
          <filter id="gf1"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <ellipse cx="250" cy="290" rx="220" ry="240" fill="url(#gg1)"/>
        <ellipse cx="200" cy="200" rx="160" ry="160" fill="url(#gg2)"/>
        <circle cx="250" cy="290" r="200" stroke="rgba(200,151,58,.18)" strokeWidth="1" fill="none" strokeDasharray="6 12" style={{animation:"rot 80s linear infinite",transformOrigin:"250px 290px"}}/>
        <circle cx="250" cy="290" r="164" stroke="rgba(200,151,58,.28)" strokeWidth=".8" fill="none" style={{animation:"rotrev 55s linear infinite",transformOrigin:"250px 290px"}}/>
        <circle cx="250" cy="290" r="126" stroke="rgba(196,73,106,.22)" strokeWidth=".6" fill="none" strokeDasharray="3 9"/>
        <circle cx="250" cy="290" r="94" stroke="rgba(200,151,58,.12)" strokeWidth="1.2" fill="none"/>
        <line x1="250" y1="50" x2="250" y2="530" stroke="rgba(200,151,58,.1)" strokeWidth=".5"/>
        <line x1="10" y1="290" x2="490" y2="290" stroke="rgba(200,151,58,.1)" strokeWidth=".5"/>
        <line x1="50" y1="90" x2="450" y2="490" stroke="rgba(200,151,58,.06)" strokeWidth=".4"/>
        <line x1="450" y1="90" x2="50" y2="490" stroke="rgba(200,151,58,.06)" strokeWidth=".4"/>
        <path d="M250 235 L285 290 L250 345 L215 290 Z" stroke="#C8973A" strokeWidth="1.2" fill="rgba(200,151,58,.07)" filter="url(#gf1)"/>
        <path d="M250 255 L272 290 L250 325 L228 290 Z" stroke="rgba(200,151,58,.5)" strokeWidth=".7" fill="rgba(200,151,58,.04)"/>
        <circle cx="140" cy="130" r="52" stroke="rgba(200,151,58,.3)" strokeWidth="1" fill="rgba(200,151,58,.04)"/>
        <circle cx="140" cy="130" r="38" stroke="rgba(200,151,58,.2)" strokeWidth=".6" fill="rgba(200,151,58,.04)"/>
        <circle cx="140" cy="130" r="24" stroke="rgba(200,151,58,.28)" strokeWidth=".8" fill="rgba(200,151,58,.08)"/>
        <circle cx="140" cy="130" r="10" fill="rgba(200,151,58,.35)"/>
        <path d="M124 122 Q140 116 156 122" stroke="rgba(255,255,255,.3)" strokeWidth=".8" fill="none"/>
        <circle cx="370" cy="160" r="44" stroke="rgba(196,73,106,.28)" strokeWidth="1" fill="rgba(196,73,106,.04)"/>
        <circle cx="370" cy="160" r="30" stroke="rgba(196,73,106,.2)" strokeWidth=".6" fill="rgba(196,73,106,.04)"/>
        <circle cx="370" cy="160" r="16" stroke="rgba(196,73,106,.3)" strokeWidth=".8" fill="rgba(196,73,106,.1)"/>
        <circle cx="370" cy="160" r="6" fill="rgba(196,73,106,.5)"/>
        <circle cx="120" cy="420" r="40" stroke="rgba(200,151,58,.25)" strokeWidth=".8" fill="rgba(200,151,58,.03)"/>
        <circle cx="120" cy="420" r="26" stroke="rgba(200,151,58,.18)" strokeWidth=".5" fill="rgba(200,151,58,.04)"/>
        <circle cx="120" cy="420" r="12" fill="rgba(200,151,58,.2)"/>
        <circle cx="390" cy="420" r="35" stroke="rgba(196,73,106,.22)" strokeWidth=".7" fill="rgba(196,73,106,.03)"/>
        <circle cx="390" cy="420" r="22" stroke="rgba(196,73,106,.18)" strokeWidth=".5" fill="rgba(196,73,106,.04)"/>
        <circle cx="390" cy="420" r="10" fill="rgba(196,73,106,.2)"/>
        <path d="M310 80 L420 190" stroke="url(#gl1)" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="313" cy="83" rx="10" ry="6" transform="rotate(-45 313 83)" stroke="#C8973A" strokeWidth=".8" fill="rgba(200,151,58,.15)"/>
        <path d="M418 188 L422 192 L416 196 L412 192 Z" fill="#C8973A" opacity=".7"/>
        <path d="M80 340 L60 460" stroke="rgba(196,73,106,.35)" strokeWidth="1.2" strokeLinecap="round"/>
        {[[88,200],[420,280],[192,60],[340,490],[460,340]].map(([cx,cy],i)=>(
          <g key={i} transform={"translate("+cx+","+cy+")"}>
            <path d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z" fill="#C8973A" opacity={.35+i*.06}/>
          </g>
        ))}
        <path d="M62 200 A190 190 0 0 1 438 200" stroke="rgba(200,151,58,.12)" strokeWidth=".8" fill="none" strokeDasharray="3 7"/>
        <path d="M70 370 A190 190 0 0 0 430 370" stroke="rgba(200,151,58,.1)" strokeWidth=".6" fill="none" strokeDasharray="3 7"/>
        <rect x="432" y="280" width="14" height="48" rx="2" stroke="#C8973A" strokeWidth=".8" fill="rgba(200,151,58,.06)"/>
        <path d="M432 280 Q439 266 446 280" stroke="#C4496A" strokeWidth=".9" fill="rgba(196,73,106,.3)"/>
        <line x1="432" y1="295" x2="446" y2="295" stroke="rgba(200,151,58,.4)" strokeWidth=".5"/>
        <rect x="188" y="460" width="124" height="70" rx="4" stroke="rgba(200,151,58,.28)" strokeWidth=".9" fill="rgba(200,151,58,.04)"/>
        {[0,1,2,3,4,5].map(i=>(
          <circle key={i} cx={204+i*20} cy={491} r="7" stroke="rgba(200,151,58,.3)" strokeWidth=".6" fill={["rgba(200,151,58,.25)","rgba(196,73,106,.25)","rgba(139,26,58,.25)","rgba(200,151,58,.18)","rgba(196,73,106,.18)","rgba(139,26,58,.18)"][i]}/>
        ))}
        <text x="250" y="524" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7" fill="rgba(200,151,58,.5)" letterSpacing="2">GULABI ARTISTRY</text>
        <line x1="20" y1="550" x2="220" y2="550" stroke="rgba(200,151,58,.22)" strokeWidth=".7"/>
        <path d="M250 543 L258 550 L250 557 L242 550 Z" fill="rgba(200,151,58,.5)"/>
        <line x1="280" y1="550" x2="480" y2="550" stroke="rgba(200,151,58,.22)" strokeWidth=".7"/>
      </svg>
    </div>
  );
}

function Nav({sec,goTo,admin,setAdmin}){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>60);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  const links=[["home","Home"],["services","Services"],["book","Book"],["courses","Courses"],["portfolio","Portfolio"],["testimonials","Testimonials"],["social","Social"]];
  return(
    <nav className={"nav-wrap "+(scrolled?"scrolled":"")} style={{background:!scrolled?"rgba(26,8,24,.7)":""}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"76px"}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.85rem",fontStyle:"italic",fontWeight:400,background:"linear-gradient(135deg,#C8973A,#F0D898,#C8973A)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>Gulabi</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".44rem",letterSpacing:".28em",color:"rgba(240,216,152,.45)",textTransform:"uppercase",marginTop:"2px"}}>Makeup Artistry · Bangalore</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"26px"}} className="hide-mob">
          {links.map(([id,l])=><span key={id} className={"nav-link "+(sec===id?"act":"")} onClick={()=>goTo(id)}>{l}</span>)}
          <div onClick={()=>setAdmin(a=>!a)} style={{display:"inline-flex",alignItems:"center",gap:"7px",border:"1px solid rgba(200,151,58,.3)",padding:"7px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".14em",color:"var(--gold2)",transition:"all .3s",textTransform:"uppercase"}}>
            <div className="live-dot"/>{admin?"Exit Dashboard":"Dashboard"}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero({onBook}){
  const txts=["Bridal Artistry","Evening Glamour","Timeless Radiance","Your Finest Self"];
  const [idx,setIdx]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setIdx(i=>(i+1)%txts.length),3200);return()=>clearInterval(t);},[]);
  return(
    <section className="hero" id="home">
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(200,151,58,.12) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"-10%",right:"30%",width:"700px",height:"700px",borderRadius:"50%",background:"radial-gradient(circle,rgba(200,151,58,.07) 0%,transparent 65%)",pointerEvents:"none"}} className="hide-mob"/>
      <div className="hide-mob" style={{position:"absolute",right:"-2%",top:"50%",transform:"translateY(-50%)",width:"min(500px,46vw)",height:"min(580px,60vw)",opacity:.85}}>
        <HeroArt/>
      </div>
      <div style={{position:"relative",zIndex:1,padding:"0 5%",maxWidth:"640px"}}>
        <div className="u-in" style={{display:"inline-flex",alignItems:"center",gap:"10px",border:"1px solid rgba(200,151,58,.3)",padding:"7px 18px",marginBottom:"36px",background:"rgba(200,151,58,.07)"}}>
          <div className="live-dot"/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".22em",color:"var(--gold2)",textTransform:"uppercase"}}>Renowned Make-Up Artist in Bangalore</span>
        </div>
        <h1 className="hero-h u-lft" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(3.6rem,7vw,6.4rem)",fontWeight:400,lineHeight:.93,letterSpacing:"-.02em",marginBottom:"20px",animationDelay:".12s"}}>
          <span style={{display:"block",color:"rgba(255,255,255,.95)"}}>Art</span>
          <span className="gt" style={{display:"block",fontStyle:"italic"}}>meets</span>
          <span style={{display:"block",color:"rgba(255,255,255,.95)"}}>Beauty.</span>
        </h1>
        <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"26px"}}>
          <div style={{width:"24px",height:"1px",background:"var(--gold)",opacity:.7,flexShrink:0}}/>
          <span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.6rem",fontWeight:400,color:"rgba(200,151,58,.88)"}}>{txts[idx]}</span>
        </div>
        <p className="u-up" style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.2rem",fontWeight:300,lineHeight:1.85,color:"rgba(255,255,255,.52)",maxWidth:"500px",marginBottom:"44px",animationDelay:".36s"}}>
          Gulabi crafts extraordinary looks that honour your story — from ethereal bridal ceremonies to electrifying evening occasions. Every face a canvas; every session a considered work of art.
        </p>
        <div className="u-up" style={{display:"flex",gap:"12px",flexWrap:"wrap",animationDelay:".5s"}}>
          <button className="btn-primary" onClick={onBook}>Reserve Your Session</button>
          <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button className="btn-outline">View Portfolio</button>
          </a>
        </div>
        <div className="u-up" style={{display:"flex",gap:"40px",marginTop:"56px",paddingTop:"28px",borderTop:"1px solid rgba(200,151,58,.18)",animationDelay:".6s"}}>
          {[["500+","Brides"],["1,200+","Transformations"],["4.9 Star","Rating"]].map(([n,l])=>(
            <div key={l}>
              <div className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"2rem",fontWeight:400,lineHeight:1}}>{n}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".54rem",letterSpacing:".18em",color:"rgba(255,255,255,.32)",textTransform:"uppercase",marginTop:"4px"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustStrip(){
  const items=[[<Ic.Shield/>,"500+ Happy Brides"],[<Ic.Award/>,"Certified Professional"],[<Ic.Heart/>,"4.9 / 5 Rating"],[<Ic.Check/>,"25% Advance Booking"],[<Ic.Shield/>,"Makeup Since 2015"],[<Ic.Award/>,"Bangalore Top Artist"]];
  return(
    <div className="trust-strip" style={{padding:"18px 0"}}>
      <div className="mq-outer">
        <div className="mq-inner">
          {[...Array(3)].flatMap((_,k)=>items.map(([icon,txt],i)=>(
            <div key={""+k+i} style={{display:"inline-flex",alignItems:"center",gap:"9px",padding:"0 36px",flexShrink:0}}>
              <div style={{color:"var(--gold2)",opacity:.8}}>{icon}</div>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".62rem",letterSpacing:".22em",color:"rgba(240,216,152,.55)",textTransform:"uppercase",whiteSpace:"nowrap"}}>{txt}</span>
              <span style={{color:"rgba(200,151,58,.3)",marginLeft:"8px"}}>◆</span>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

function Services({onBook}){
  return(
    <section className="sec" id="services" style={{background:"var(--white)"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"22px",marginBottom:"64px"}}>
          <div>
            <div className="sec-label" style={{marginBottom:"14px"}}>The Atelier</div>
            <h2 className="sec-h" style={{fontSize:"clamp(2.2rem,3.8vw,3.6rem)",color:"var(--ink)"}}>Signature Services</h2>
          </div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.15rem",fontWeight:300,color:"var(--ink2)",maxWidth:"360px",lineHeight:1.88}}>Each session is a bespoke ritual — unhurried, meticulous and wholly attuned to you.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(258px,1fr))",gap:"20px"}}>
          {SVCS.map((s,i)=>(
            <div key={s.id} className="svc-card u-up" style={{padding:"40px 32px",animationDelay:i*.1+"s"}} onClick={()=>onBook(s.id)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"22px"}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"3.2rem",fontWeight:400,color:"rgba(139,26,58,.07)",lineHeight:1,userSelect:"none"}}>{s.no}</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".5rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:"3px 10px",background:"rgba(139,26,58,.08)",color:"var(--wine)",border:"1px solid rgba(139,26,58,.15)"}}>{s.tag}</span>
              </div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".55rem",letterSpacing:".2em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"7px"}}>{s.sub}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.55rem",fontWeight:500,color:"var(--ink)",marginBottom:"14px",lineHeight:1.15}}>{s.title}</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".9rem",lineHeight:1.82,color:"var(--ink2)",fontWeight:300,marginBottom:"28px"}}>{s.desc}</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"18px",borderTop:"1px solid rgba(26,8,24,.07)"}}>
                <span className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem"}}>Rs {s.price}</span>
                <div style={{display:"inline-flex",alignItems:"center",gap:"7px",fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".12em",color:"var(--wine)",textTransform:"uppercase",fontWeight:500}}>Book <Ic.Arrow/></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mq-outer" style={{marginTop:"80px",borderTop:"1px solid rgba(26,8,24,.07)",borderBottom:"1px solid rgba(26,8,24,.07)",padding:"16px 0"}}>
        <div className="mq-inner">
          {[...Array(3)].flatMap(()=>["Bridal Specialist","Evening Glamour","Photoshoot Ready","Grooming Ateliers","Celebrity Artistry","Bangalore","500+ Happy Brides","Engagement Artistry"].map(t=>(
            <span key={t+Math.random()} style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".26em",color:"var(--ink3)",padding:"0 32px",textTransform:"uppercase",whiteSpace:"nowrap",fontWeight:400}}>{t}   ◆   </span>
          )))}
        </div>
      </div>
    </section>
  );
}

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
    <section className="sec" id="book" style={{background:"var(--cream)"}}>
      <div style={{maxWidth:"860px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"60px"}}>
          <div className="sec-label" style={{justifyContent:"center",marginBottom:"14px"}}>Book Now</div>
          <h2 className="sec-h" style={{fontSize:"clamp(2rem,3.6vw,3.2rem)",color:"var(--ink)"}}>Reserve Your Session</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".88rem",color:"var(--ink3)",marginTop:"14px"}}>Real-time availability · AI-managed · Instant confirmation</p>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"44px"}}>
          {["Service","Date and Time","Your Details","Confirmation"].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"7px"}}>
                <div className="step-dot" style={{borderColor:step>i+1?"var(--wine)":step===i+1?"var(--wine)":"rgba(26,8,24,.15)",background:step>i+1?"var(--wine)":step===i+1?"rgba(139,26,58,.08)":"transparent",color:step>i+1?"#fff":step===i+1?"var(--wine)":"var(--ink3)"}}>
                  {step>i+1?<Ic.Check/>:<span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>{i+1}</span>}
                </div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".48rem",letterSpacing:".12em",textTransform:"uppercase",color:step===i+1?"var(--wine)":"var(--ink3)",fontWeight:step===i+1?500:400}}>{s}</span>
              </div>
              {i<3&&<div style={{width:"60px",height:"1px",background:step>i+1?"var(--wine)":"rgba(26,8,24,.1)",margin:"0 4px",marginBottom:"24px",transition:"background .4s"}}/>}
            </div>
          ))}
        </div>
        <div style={{background:"var(--white)",padding:"48px",boxShadow:"0 4px 40px rgba(26,8,24,.08)",border:"1px solid rgba(26,8,24,.06)"}}>
          {step===1&&<div className="u-up">
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.7rem",fontWeight:500,color:"var(--ink)",marginBottom:"28px"}}>Choose a Service</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}} className="two-col">
              {SVCS.map(s=>(
                <div key={s.id} onClick={()=>setSvc(s.id)} style={{padding:"18px",border:"1.5px solid "+(svc===s.id?"var(--wine)":"rgba(26,8,24,.09)"),cursor:"pointer",transition:"all .25s",background:svc===s.id?"rgba(139,26,58,.04)":"#fff",boxShadow:svc===s.id?"0 4px 20px rgba(139,26,58,.12)":"none"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:500,color:"var(--ink)",marginBottom:"3px"}}>{s.title}</div>
                  <div className="gt" style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:500}}>Rs {s.price}</div>
                </div>
              ))}
            </div>
            <button className="btn-dark" style={{width:"100%",marginTop:"28px",opacity:svc?1:.3,pointerEvents:svc?"auto":"none"}} onClick={()=>svc&&setStep(2)}>Continue</button>
          </div>}
          {step===2&&<div className="u-up">
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.7rem",fontWeight:500,color:"var(--ink)",marginBottom:"6px"}}>Pick a Date and Time</h3>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".78rem",color:"var(--ink3)",marginBottom:"28px"}}>AI is managing real-time availability</p>
            <div style={{display:"flex",gap:"6px",marginBottom:"28px",overflowX:"auto",paddingBottom:"4px"}}>
              {dates.map(d=>{const o=new Date(d),has=(SLOTS[d]||[]).length>0;return(
                <div key={d} className={"dt-chip "+(!has?"na":date===d?"sel":"")} onClick={()=>has&&setDate(d)} style={{minWidth:"62px"}}>
                  <div style={{fontSize:".5rem",letterSpacing:".1em",marginBottom:"3px"}}>{o.toLocaleDateString("en-IN",{weekday:"short"})}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.35rem",lineHeight:1.1}}>{o.getDate()}</div>
                  <div style={{fontSize:".44rem",marginTop:"3px"}}>{o.toLocaleDateString("en-IN",{month:"short"})}</div>
                </div>);})}
            </div>
            {date&&<><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".18em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"12px",fontWeight:500}}>Available Times</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:"28px"}}>
                {(SLOTS[date]||[]).map(t=>{const bk=(BOOKED[date]||[]).includes(t);return <div key={t} className={bk?"time-chip bk":"time-chip"+(slot===t?" sel":"")} onClick={()=>!bk&&setSlot(t)}>{t}</div>;})}
              </div></>}
            <div style={{display:"flex",gap:"8px"}}>
              <button className="btn-dark-o" style={{flex:1,padding:"13px"}} onClick={()=>setStep(1)}>Back</button>
              <button className="btn-dark" style={{flex:2,padding:"13px",opacity:slot?1:.3,pointerEvents:slot?"auto":"none"}} onClick={()=>slot&&setStep(3)}>Continue</button>
            </div>
          </div>}
          {step===3&&<div className="u-up">
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.7rem",fontWeight:500,color:"var(--ink)",marginBottom:"28px"}}>Your Details</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 28px"}} className="two-col">
              {[["name","Full Name"],["phone","Phone Number"],["email","Email Address"]].map(([k,l])=>(
                <div key={k} style={{marginBottom:"22px"}}>
                  <label style={{display:"block",fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".15em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"7px",fontWeight:500}}>{l}</label>
                  <input className="field" value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={l}/>
                </div>
              ))}
              <div style={{marginBottom:"22px",gridColumn:"1/-1"}}>
                <label style={{display:"block",fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".15em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"7px",fontWeight:500}}>Special Notes</label>
                <textarea className="field" rows={3} style={{resize:"none"}} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Inspiration, skin concerns, occasion details"/>
              </div>
            </div>
            <div style={{padding:"18px 20px",background:"var(--cream)",border:"1px solid rgba(26,8,24,.07)",marginBottom:"22px"}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".15em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"12px",fontWeight:500}}>Booking Summary</div>
              {[["Service",svcLbl[svc]],["Date",date],["Time",slot]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid rgba(26,8,24,.06)"}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".68rem",color:"var(--ink3)"}}>{k}</span>
                  <span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",color:"var(--ink)"}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              <button className="btn-dark-o" style={{flex:1,padding:"13px"}} onClick={()=>setStep(2)}>Back</button>
              <button className="btn-dark" style={{flex:2,padding:"13px",opacity:form.name&&form.phone&&aiSt!=="processing"?1:.3,pointerEvents:form.name&&form.phone&&aiSt!=="processing"?"auto":"none"}} onClick={confirm}>
                {aiSt==="processing"?"AI Processing":"Confirm Reservation"}
              </button>
            </div>
          </div>}
          {step===4&&<div className="u-sc" style={{textAlign:"center",padding:"16px 0"}}>
            {aiSt==="ok"?(<>
              <div style={{width:"68px",height:"68px",borderRadius:"50%",background:"rgba(21,128,61,.08)",border:"1.5px solid rgba(21,128,61,.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 22px",color:"var(--success)"}}><Ic.Check/></div>
              <h3 className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"2.4rem",marginBottom:"12px"}}>You are confirmed.</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".9rem",color:"var(--ink2)",maxWidth:"370px",margin:"0 auto 28px",lineHeight:1.8}}>Confirmation sent to your phone shortly. We look forward to welcoming you.</p>
              <button className="btn-dark" style={{padding:"13px 32px"}} onClick={reset}>Book Another Session</button>
            </>):(<>
              <div style={{width:"68px",height:"68px",borderRadius:"50%",background:"rgba(220,38,38,.06)",border:"1.5px solid rgba(220,38,38,.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 22px",color:"#dc2626"}}><Ic.Close/></div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.9rem",fontWeight:500,color:"var(--ink)",marginBottom:"12px"}}>Slot just taken.</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".88rem",color:"var(--ink2)",marginBottom:"24px"}}>Please select another available time.</p>
              <button className="btn-dark" style={{padding:"13px 28px"}} onClick={()=>{setStep(2);setSlot("");setAiSt("idle");}}>Choose Another Time</button>
            </>)}
          </div>}
        </div>
      </div>
    </section>
  );
}

function QRCode({amount,appName}){
  const upiData="upi://pay?pa="+UPI_ID+"&pn=Gulabi%20Makeup%20Artistry&am="+amount+"&cu=INR&tn=Course%20Enrolment";
  const qrUrl="https://api.qrserver.com/v1/create-qr-code/?size=210x210&data="+encodeURIComponent(upiData)+"&color=1A1108&bgcolor=FFFFFF&margin=14&qzone=1";
  const [loaded,setLoaded]=useState(false);
  return(
    <div style={{textAlign:"center"}}>
      <div style={{display:"inline-block",padding:"16px",border:"2px solid rgba(26,8,24,.08)",background:"#fff",boxShadow:"0 6px 32px rgba(26,8,24,.1)",position:"relative"}}>
        {!loaded&&<div style={{width:"210px",height:"210px",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--cream)",fontFamily:"'DM Sans',sans-serif",fontSize:".68rem",color:"var(--ink3)"}}>Generating QR...</div>}
        <img src={qrUrl} alt="UPI QR Code" width={210} height={210} onLoad={()=>setLoaded(true)} style={{display:loaded?"block":"none"}}/>
        <div style={{position:"absolute",top:"4px",left:"4px",width:"16px",height:"16px",borderTop:"2px solid var(--gold)",borderLeft:"2px solid var(--gold)"}}/>
        <div style={{position:"absolute",top:"4px",right:"4px",width:"16px",height:"16px",borderTop:"2px solid var(--gold)",borderRight:"2px solid var(--gold)"}}/>
        <div style={{position:"absolute",bottom:"4px",left:"4px",width:"16px",height:"16px",borderBottom:"2px solid var(--gold)",borderLeft:"2px solid var(--gold)"}}/>
        <div style={{position:"absolute",bottom:"4px",right:"4px",width:"16px",height:"16px",borderBottom:"2px solid var(--gold)",borderRight:"2px solid var(--gold)"}}/>
      </div>
      <div style={{marginTop:"14px",fontFamily:"'DM Sans',sans-serif",fontSize:".62rem",letterSpacing:".16em",color:"var(--ink3)",textTransform:"uppercase",fontWeight:500}}>Scan to Pay · {appName}</div>
      <div className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.7rem",marginTop:"4px"}}>Rs {amount.toLocaleString()}</div>
      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",color:"var(--ink3)",marginTop:"4px",letterSpacing:".08em"}}>UPI ID: {UPI_ID}</div>
      <div style={{marginTop:"14px",padding:"9px 14px",background:"rgba(21,128,61,.06)",border:"1px solid rgba(21,128,61,.2)",display:"inline-flex",alignItems:"center",gap:"8px"}}>
        <Ic.Check/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".56rem",letterSpacing:".1em",color:"var(--success)",textTransform:"uppercase",fontWeight:500}}>Works with all UPI apps</span>
      </div>
    </div>
  );
}

function Courses(){
  const [sel,setSel]=useState(null);
  const [pSt,setPSt]=useState(1);
  const [upi,setUpi]=useState("");
  const [bf,setBf]=useState({name:"",phone:""});
  const upiApps=[{id:"phonepe",l:"PhonePe",c:"#5f259f"},{id:"gpay",l:"Google Pay",c:"#4285F4"},{id:"paytm",l:"Paytm",c:"#00BAF2"},{id:"other",l:"Any UPI App",c:"#22c55e"}];
  const close=()=>{setSel(null);setPSt(1);setUpi("");setBf({name:"",phone:""});};
  return(
    <section className="sec" id="courses" style={{background:"var(--plum)"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"68px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"10px",fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",fontWeight:500,letterSpacing:".3em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"14px"}}>
            <span style={{display:"block",width:"28px",height:"1px",background:"var(--gold)",opacity:.6}}/>Online Learning
          </div>
          <h2 className="sec-h" style={{fontSize:"clamp(2.2rem,3.8vw,3.5rem)",color:"var(--white)"}}>Grooming Masterclasses</h2>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.15rem",fontWeight:300,color:"rgba(255,255,255,.45)",maxWidth:"440px",margin:"18px auto 0",lineHeight:1.88}}>Limited enrolments. Maximum personal attention. Globally recognised techniques.</p>
        </div>
        <div style={{border:"1px solid rgba(200,151,58,.22)",padding:"44px 52px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"28px",marginBottom:"52px",background:"rgba(200,151,58,.04)",position:"relative"}}>
          <div style={{position:"absolute",top:"12px",left:"12px",width:"22px",height:"22px",borderTop:"1px solid rgba(200,151,58,.35)",borderLeft:"1px solid rgba(200,151,58,.35)"}}/>
          <div style={{position:"absolute",bottom:"12px",right:"12px",width:"22px",height:"22px",borderBottom:"1px solid rgba(200,151,58,.35)",borderRight:"1px solid rgba(200,151,58,.35)"}}/>
          <div>
            <div style={{display:"inline-block",background:"rgba(220,38,38,.15)",border:"1px solid rgba(220,38,38,.3)",padding:"3px 12px",marginBottom:"14px",fontFamily:"'DM Sans',sans-serif",fontSize:".52rem",letterSpacing:".16em",color:"#f87171",textTransform:"uppercase",fontWeight:500}}>Filling Fast - Limited Seats</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:500,color:"#fff",marginBottom:"9px"}}>Live Grooming Ateliers</h3>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".88rem",lineHeight:1.82,color:"rgba(255,255,255,.42)",marginBottom:"18px",maxWidth:"420px",fontWeight:300}}>Max 10 students per batch. Hands-on guidance from Gulabi.</p>
            <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>
              {["Max 10 Per Batch","25% Advance to Secure","Certificate Included","Live + Recorded Access"].map(f=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <div style={{color:"var(--gold2)"}}><Ic.Check/></div>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".06em",color:"rgba(255,255,255,.5)",textTransform:"uppercase"}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",color:"rgba(255,255,255,.25)",textDecoration:"line-through",marginBottom:"2px"}}>Rs 20,000</div>
            <div className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"3rem",fontWeight:400,lineHeight:1}}>Rs 14,999</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".54rem",color:"var(--gold2)",marginBottom:"20px",marginTop:"4px",textTransform:"uppercase",letterSpacing:".1em"}}>25% Advance - Rs 3,750</div>
            <button className="btn-gold" style={{padding:"13px 30px",fontSize:".6rem"}}>Enquire Now</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"20px"}}>
          {CRS.map((c,i)=>{
            const pct=((c.total-c.seats)/c.total)*100;
            return(
              <div key={c.id} className="course-card u-up" style={{animationDelay:i*.12+"s"}}>
                <div style={{height:"4px",background:"linear-gradient(90deg,"+c.color+",transparent)"}}/>
                <div style={{padding:"34px 30px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"18px"}}>
                    <span style={{display:"inline-block",fontFamily:"'DM Sans',sans-serif",fontSize:".5rem",fontWeight:600,letterSpacing:".16em",textTransform:"uppercase",padding:"3px 10px",background:c.color+"18",border:"1px solid "+c.color+"40",color:c.color}}>{c.badge}</span>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".54rem",color:"var(--ink3)",textDecoration:"line-through"}}>Rs {c.orig.toLocaleString()}</div>
                      <div className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.85rem",fontWeight:400,lineHeight:1}}>Rs {c.price.toLocaleString()}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".5rem",color:"var(--success)",marginTop:"2px",fontWeight:500}}>Save Rs {(c.orig-c.price).toLocaleString()}</div>
                    </div>
                  </div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".54rem",letterSpacing:".16em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"5px",fontWeight:500}}>{c.hrs}</div>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.35rem",fontWeight:500,color:"var(--ink)",marginBottom:"12px"}}>{c.title}</h3>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".86rem",lineHeight:1.82,color:"var(--ink2)",fontWeight:300,marginBottom:"18px"}}>{c.desc}</p>
                  <div style={{marginBottom:"18px"}}>
                    {c.mods.map(m=>(
                      <div key={m} style={{display:"flex",alignItems:"center",gap:"9px",padding:"5px 0",borderBottom:"1px solid rgba(26,8,24,.05)"}}>
                        <div style={{color:"var(--gold)",opacity:.8,flexShrink:0}}><Ic.Check/></div>
                        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".68rem",color:"var(--ink2)",fontWeight:400}}>{m}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{marginBottom:"20px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"7px"}}>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",color:"var(--ink3)",textTransform:"uppercase",letterSpacing:".1em",fontWeight:500}}>Enrolment</span>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",fontWeight:600,color:c.seats<=2?"#dc2626":"var(--wine)"}}>
                        {c.seats<=2?"Only "+c.seats+" seats left":c.seats+" / "+c.total+" remaining"}
                      </span>
                    </div>
                    <div className="prog-bg"><div className="prog-fill" style={{width:pct+"%"}}/></div>
                  </div>
                  <button className="btn-dark" style={{width:"100%",padding:"13px",fontSize:".62rem"}} onClick={()=>setSel(c)}>Enrol - Scan QR to Pay</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {sel&&(
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&close()}>
          <div className="modal-box">
            <div style={{height:"4px",background:"linear-gradient(90deg,"+sel.color+",transparent)"}}/>
            <div style={{padding:"36px 40px"}}>
              {pSt===1&&<div className="u-up">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"24px"}}>
                  <div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".18em",color:"var(--ink3)",textTransform:"uppercase",fontWeight:500,marginBottom:"5px"}}>Enrol Now</div>
                    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.55rem",fontWeight:500,color:"var(--ink)"}}>{sel.title}</h3>
                  </div>
                  <button onClick={close} style={{background:"none",border:"none",color:"var(--ink3)",cursor:"pointer"}}><Ic.Close/></button>
                </div>
                <div style={{background:"var(--cream)",padding:"18px 20px",border:"1px solid rgba(26,8,24,.07)",marginBottom:"22px"}}>
                  {[["Course Price","Rs "+sel.price.toLocaleString()],["You Save","Rs "+(sel.orig-sel.price).toLocaleString()]].map(([k,v],i)=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i===0?"1px solid rgba(26,8,24,.06)":"none"}}>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".68rem",color:"var(--ink3)"}}>{k}</span>
                      <span style={{fontFamily:"'Playfair Display',serif",fontSize:".98rem",color:i===1?"var(--success)":"var(--ink)"}}>{v}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",paddingTop:"12px"}}>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",color:"var(--wine)",textTransform:"uppercase",letterSpacing:".12em",fontWeight:600}}>Total Due</span>
                    <span className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.4rem"}}>Rs {sel.price.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".14em",color:"var(--ink3)",textTransform:"uppercase",fontWeight:500,marginBottom:"12px"}}>Choose UPI App</div>
                <div style={{display:"flex",flexDirection:"column",gap:"7px",marginBottom:"22px"}}>
                  {upiApps.map(a=>(
                    <div key={a.id} className={"upi-opt "+(upi===a.id?"sel":"")} onClick={()=>setUpi(a.id)}>
                      <div style={{width:"9px",height:"9px",borderRadius:"50%",background:a.c,flexShrink:0}}/>{a.l}
                      {upi===a.id&&<div style={{marginLeft:"auto",color:"var(--wine)"}}><Ic.Check/></div>}
                    </div>
                  ))}
                </div>
                <button className="btn-dark" style={{width:"100%",padding:"15px",opacity:upi?1:.3,pointerEvents:upi?"auto":"none"}} onClick={()=>setPSt(2)}>
                  <span style={{display:"inline-flex",alignItems:"center",gap:"8px"}}><Ic.QR/> Scan QR to Pay Rs {sel.price.toLocaleString()}</span>
                </button>
              </div>}
              {pSt===2&&<div className="u-up">
                <div style={{marginBottom:"24px"}}>
                  <button onClick={()=>setPSt(1)} style={{background:"none",border:"none",cursor:"pointer",color:"var(--ink3)",fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:"5px"}}>Back</button>
                </div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.55rem",fontWeight:500,color:"var(--ink)",marginBottom:"24px",textAlign:"center"}}>Scan and Pay</h3>
                <QRCode amount={sel.price} appName={upiApps.find(u=>u.id===upi)?.l}/>
                <div style={{marginTop:"26px"}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".14em",color:"var(--ink3)",textTransform:"uppercase",fontWeight:500,marginBottom:"14px",textAlign:"center"}}>After payment, enter your details</div>
                  <div style={{display:"flex",flexDirection:"column",gap:"14px",marginBottom:"20px"}}>
                    {[["name","Your Name"],["phone","Phone / WhatsApp"]].map(([k,l])=>(
                      <div key={k}>
                        <label style={{display:"block",fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".14em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"6px",fontWeight:500}}>{l}</label>
                        <input className="field" value={bf[k]} onChange={e=>setBf(f=>({...f,[k]:e.target.value}))} placeholder={l}/>
                      </div>
                    ))}
                  </div>
                  <button className="btn-gold" style={{width:"100%",padding:"15px",opacity:bf.name&&bf.phone?1:.3,pointerEvents:bf.name&&bf.phone?"auto":"none"}} onClick={()=>setPSt(3)}>I have Paid - Confirm Enrolment</button>
                </div>
              </div>}
              {pSt===3&&<div className="u-sc" style={{textAlign:"center",padding:"16px 0"}}>
                <div style={{width:"70px",height:"70px",borderRadius:"50%",background:"rgba(21,128,61,.08)",border:"1.5px solid rgba(21,128,61,.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",color:"var(--success)"}}><Ic.Award/></div>
                <div style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"1px solid rgba(21,128,61,.2)",padding:"7px 18px",marginBottom:"22px",background:"rgba(21,128,61,.04)"}}><div className="live-dot"/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".54rem",letterSpacing:".14em",color:"var(--success)",textTransform:"uppercase",fontWeight:500}}>Enrolment Received</span></div>
                <h3 className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"2.2rem",marginBottom:"12px"}}>Welcome to the Masterclass.</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".88rem",color:"var(--ink2)",marginBottom:"10px",lineHeight:1.8}}>Once payment is verified, your course link will be sent to {bf.phone} within 24 hours.</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".1em",color:"var(--ink3)",marginBottom:"28px",textTransform:"uppercase"}}>UPI: {UPI_ID}</p>
                <button className="btn-dark" style={{padding:"12px 28px"}} onClick={close}>Done</button>
              </div>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Portfolio(){
  const panels=[{l:"Bridal Ceremony",c:"#D4A8B8"},{l:"Smokey Evening",c:"#B8A8D4"},{l:"Engagement Grace",c:"#D4C8A8"},{l:"Editorial Campaign",c:"#A8C8D4"},{l:"Reception Splendour",c:"#D4B8A8"},{l:"Ethereal Bride",c:"#C8D4A8"},{l:"Bordeaux Drama",c:"#D4A8A8"},{l:"Festive Radiance",c:"#D4D4A8"},{l:"Midnight Noir",c:"#B8B8C8"}];
  return(
    <section className="sec" id="portfolio" style={{background:"var(--white)"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"64px"}}>
          <div className="sec-label" style={{justifyContent:"center",marginBottom:"14px"}}>The Work</div>
          <h2 className="sec-h" style={{fontSize:"clamp(2.2rem,3.8vw,3.5rem)",color:"var(--ink)"}}>Portfolio</h2>
          <div style={{display:"inline-flex",alignItems:"center",gap:"9px",border:"1px solid rgba(26,8,24,.09)",padding:"7px 18px",marginTop:"18px",background:"var(--cream)"}}>
            <div style={{width:"5px",height:"5px",borderRadius:"50%",background:"var(--wine)",opacity:.5}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".52rem",letterSpacing:".16em",color:"var(--ink3)",textTransform:"uppercase",fontWeight:500}}>Updating with actual client photography</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"3px",boxShadow:"0 8px 48px rgba(26,8,24,.1)"}}>
          {panels.map((p,i)=>(
            <div key={i} style={{aspectRatio:"1",background:"linear-gradient(145deg,"+p.c+"66,"+p.c+")",position:"relative",overflow:"hidden",cursor:"pointer"}}>
              <div style={{position:"absolute",top:"14px",left:"16px",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"2.2rem",color:"rgba(26,8,24,.12)",lineHeight:1,userSelect:"none"}}>{String(i+1).padStart(2,"0")}</div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px",background:"linear-gradient(0deg,rgba(26,8,24,.65),transparent)"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",color:"#fff"}}>{p.l}</div>
              </div>
              <div style={{position:"absolute",inset:0,background:"rgba(139,26,58,.75)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(5px)"}}
                onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",color:"#fff",marginBottom:"6px"}}>{p.l}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".52rem",color:"rgba(255,255,255,.7)",letterSpacing:".14em",textTransform:"uppercase"}}>@makeupbygulabi_bangalore</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"36px"}}>
          <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button className="btn-dark-o" style={{padding:"13px 36px"}}>Follow on Instagram</button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials(){
  const [act,setAct]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setAct(i=>(i+1)%TESTI.length),4800);return()=>clearInterval(t);},[]);
  return(
    <section className="sec" id="testimonials" style={{background:"var(--cream)"}}>
      <div style={{textAlign:"center",marginBottom:"64px"}}>
        <div className="sec-label" style={{justifyContent:"center",marginBottom:"14px"}}>Client Stories</div>
        <h2 className="sec-h" style={{fontSize:"clamp(2.2rem,3.8vw,3.5rem)",color:"var(--ink)"}}>What They Say</h2>
      </div>
      <div style={{maxWidth:"820px",margin:"0 auto"}}>
        <div style={{background:"var(--white)",padding:"48px 52px",marginBottom:"28px",boxShadow:"0 6px 40px rgba(26,8,24,.09)",border:"1px solid rgba(26,8,24,.06)",position:"relative"}}>
          <div style={{position:"absolute",top:"-2px",left:"36px",fontFamily:"'Playfair Display',serif",fontSize:"7rem",fontWeight:400,color:"rgba(139,26,58,.08)",lineHeight:1,userSelect:"none"}}>"</div>
          <div style={{display:"flex",gap:"4px",marginBottom:"18px"}}>{[...Array(TESTI[act].rating)].map((_,i)=><div key={i} style={{color:"var(--gold)"}}><Ic.Star/></div>)}</div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,fontSize:"1.35rem",lineHeight:1.88,color:"var(--ink)",marginBottom:"28px"}}>"{TESTI[act].text}"</p>
          <div style={{display:"flex",alignItems:"center",gap:"16px",paddingTop:"20px",borderTop:"1px solid rgba(26,8,24,.07)"}}>
            <div style={{width:"42px",height:"42px",border:"1.5px solid rgba(139,26,58,.25)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.1rem",color:"var(--wine)",background:"rgba(139,26,58,.05)",flexShrink:0}}>{TESTI[act].name[0]}</div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",color:"var(--ink)",fontWeight:500}}>{TESTI[act].name}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".12em",color:"var(--ink3)",textTransform:"uppercase",marginTop:"2px"}}>{TESTI[act].role}</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"32px"}}>
          {TESTI.map((_,i)=><div key={i} onClick={()=>setAct(i)} style={{width:i===act?"26px":"7px",height:"7px",borderRadius:"4px",background:i===act?"var(--wine)":"rgba(26,8,24,.12)",cursor:"pointer",transition:"all .3s"}}/>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:"2px",background:"rgba(26,8,24,.06)"}}>
          {TESTI.map((t,i)=>(
            <div key={t.name} onClick={()=>setAct(i)} style={{padding:"18px 16px",cursor:"pointer",background:act===i?"var(--white)":"var(--cream)",opacity:act===i?1:.6,transition:"all .3s"}}>
              <div style={{display:"flex",gap:"3px",marginBottom:"7px"}}>{[...Array(5)].map((_,j)=><div key={j} style={{color:"var(--gold)"}}><Ic.Star/></div>)}</div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".78rem",color:"var(--ink2)",marginBottom:"7px",lineHeight:1.55,fontWeight:300}}>"{t.text.slice(0,55)}..."</p>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".52rem",color:"var(--ink3)",fontWeight:500,textTransform:"uppercase",letterSpacing:".1em"}}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Social(){
  const posts=Array.from({length:6},(_,i)=>({id:i,likes:Math.floor(Math.random()*3500)+600,cap:["Bridal Look","Evening Glam","Engagement","Editorial","Natural Glow","Night Out"][i],bg:["#F2DDE5","#E8DDF2","#F2EDD4","#DCE9F2","#F2E9E0","#E8F2E8"][i]}));
  const vids=[{t:"Bridal Makeup Tutorial - The Dewy Veil Look",v:"42K"},{t:"5-Minute Evening Glam - Gulabi Bangalore",v:"28K"},{t:"Complete Eye Architecture Masterclass",v:"61K"}];
  return(
    <section className="sec" id="social" style={{background:"var(--white)"}}>
      <div style={{maxWidth:"1180px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"64px"}}>
          <div className="sec-label" style={{justifyContent:"center",marginBottom:"14px"}}>Stay Connected</div>
          <h2 className="sec-h" style={{fontSize:"clamp(2.2rem,3.8vw,3.5rem)",color:"var(--ink)"}}>Social Presence</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"52px"}} className="two-col">
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"20px",paddingBottom:"16px",borderBottom:"1px solid rgba(26,8,24,.08)"}}>
              <div style={{color:"var(--wine)"}}><Ic.Insta/></div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.15rem",color:"var(--ink)"}}>@makeupbygulabi_bangalore</div>
                <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer">
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".55rem",letterSpacing:".12em",color:"var(--wine)",textDecoration:"none",textTransform:"uppercase",cursor:"pointer",fontWeight:500}}>Follow on Instagram</span>
                </a>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"3px",boxShadow:"0 4px 24px rgba(26,8,24,.08)"}}>
              {posts.map(p=>(
                <div key={p.id} style={{aspectRatio:"1",background:p.bg,position:"relative",overflow:"hidden",cursor:"pointer"}}>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"8px",background:"linear-gradient(0deg,rgba(26,8,24,.6),transparent)"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:".78rem",color:"#fff"}}>{p.cap}</div>
                  </div>
                  <div style={{position:"absolute",inset:0,background:"rgba(139,26,58,.72)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(3px)"}}
                    onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".64rem",color:"#fff",letterSpacing:".12em",fontWeight:500}}>♥ {p.likes.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"20px",paddingBottom:"16px",borderBottom:"1px solid rgba(26,8,24,.08)"}}>
              <div style={{color:"#dc2626",fontSize:"1.1rem"}}><Ic.Play/></div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.15rem",color:"var(--ink)"}}>Gulabi - Makeup Artistry</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".55rem",letterSpacing:".12em",color:"var(--ink3)",textTransform:"uppercase"}}>YouTube Channel</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {vids.map(v=>(
                <div key={v.t} style={{padding:"16px 20px",display:"flex",gap:"14px",alignItems:"center",cursor:"pointer",border:"1px solid rgba(26,8,24,.07)",background:"var(--ivory)",transition:"all .25s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(139,26,58,.25)";e.currentTarget.style.background="#fff"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(26,8,24,.07)";e.currentTarget.style.background="var(--ivory)"}}>
                  <div style={{width:"66px",height:"48px",flexShrink:0,background:"linear-gradient(135deg,rgba(139,26,58,.12),rgba(255,255,255,.6))",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(26,8,24,.07)"}}>
                    <div style={{color:"var(--wine)",opacity:.7}}><Ic.Play/></div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:".96rem",color:"var(--ink)",marginBottom:"3px",lineHeight:1.35}}>{v.t}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".56rem",color:"var(--ink3)"}}>{v.v} views</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{marginTop:"80px",background:"linear-gradient(135deg,var(--plum),var(--plum2))",padding:"60px 68px",textAlign:"center",position:"relative",overflow:"hidden",boxShadow:"0 12px 52px rgba(26,8,24,.25)"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(200,151,58,.08) 1px,transparent 1px)",backgroundSize:"36px 36px",pointerEvents:"none"}}/>
          <div style={{position:"absolute",top:"16px",left:"16px",width:"22px",height:"22px",borderTop:"1px solid rgba(200,151,58,.35)",borderLeft:"1px solid rgba(200,151,58,.35)"}}/>
          <div style={{position:"absolute",bottom:"16px",right:"16px",width:"22px",height:"22px",borderBottom:"1px solid rgba(200,151,58,.35)",borderRight:"1px solid rgba(200,151,58,.35)"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",letterSpacing:".28em",color:"var(--gold2)",textTransform:"uppercase",marginBottom:"14px",fontWeight:500}}>Open for Partnerships</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.4vw,2.8rem)",fontWeight:400,color:"#fff",marginBottom:"18px",lineHeight:1.08}}>Brand Collaborations and Paid Partnerships</h3>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".9rem",fontWeight:300,color:"rgba(255,255,255,.42)",maxWidth:"500px",margin:"0 auto 36px",lineHeight:1.9}}>With 1,200+ transformations and a highly engaged Bangalore audience, Gulabi partners with beauty, skincare and lifestyle brands that share her commitment to excellence.</p>
            <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn-primary">Send Collaboration Brief</button>
              <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <button className="btn-outline">View on Instagram</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dashboard(){
  const [tab,setTab]=useState("overview");
  const M=[{l:"Visitors Today",v:"1,247",c:"+18%"},{l:"Appointments",v:"34",c:"+12"},{l:"Revenue MTD",v:"Rs 2.84L",c:"+24%"},{l:"Course Sales",v:"89",c:"+31%"},{l:"Enquiries",v:"156",c:"+8"},{l:"Collabs",v:"12",c:"NEW"}];
  const BK=[{n:"Priya S.",s:"Bridal",dt:"22 Feb",t:"3:00 PM",st:"confirmed",a:"Rs 15,000"},{n:"Ananya R.",s:"Evening Glam",dt:"23 Feb",t:"11:00 AM",st:"confirmed",a:"Rs 4,500"},{n:"Meera K.",s:"Engagement",dt:"24 Feb",t:"2:00 PM",st:"pending",a:"Rs 8,000"},{n:"Divya P.",s:"Bridal Trial",dt:"25 Feb",t:"3:00 PM",st:"confirmed",a:"Rs 2,500"}];
  const CS=[{c:"Bridal Glow Masterclass",u:34,r:"Rs 1.70L",p:38},{c:"Evening Glam Deep Dive",u:28,r:"Rs 1.96L",p:31},{c:"Complete Grooming Bible",u:27,r:"Rs 2.43L",p:30}];
  const EN=[{tp:"Booking",n:"Sunita Verma",m:"I'd like to book bridal makeup for March 15. Can you confirm?",ag:"2h",tg:"booking"},{tp:"Brand Collab",n:"NYKAA Beauty",m:"Interested in a paid partnership for our new launch campaign.",ag:"5h",tg:"collab"},{tp:"Course",n:"Keerthi Mohan",m:"Interested in the 36-hour masterclass. When does next batch start?",ag:"1d",tg:"course"},{tp:"Partnership",n:"Sugar Cosmetics",m:"We would love to send our collection for review. Open to collaborate?",ag:"2d",tg:"collab"}];
  const rB=[38,52,32,68,58,80,90,72,86,95,84,92];
  const stC={confirmed:"var(--success)",pending:"#d97706",cancelled:"#dc2626"};
  return(
    <section style={{padding:"88px 5% 108px",background:"var(--ivory)",minHeight:"80vh"}}>
      <div style={{maxWidth:"1180px",margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"40px",paddingBottom:"24px",borderBottom:"1px solid rgba(26,8,24,.09)",flexWrap:"wrap",gap:"16px"}}>
          <div>
            <div className="sec-label" style={{marginBottom:"10px"}}>Admin</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"2.6rem",fontWeight:500,color:"var(--ink)"}}>AI Dashboard</h2>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:"9px",border:"1px solid rgba(21,128,61,.25)",padding:"7px 16px",background:"rgba(21,128,61,.04)"}}>
            <div className="live-dot"/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".56rem",letterSpacing:".15em",color:"var(--success)",textTransform:"uppercase",fontWeight:500}}>Live Monitoring</span>
          </div>
        </div>
        <div style={{display:"flex",borderBottom:"1px solid rgba(26,8,24,.09)",marginBottom:"32px"}}>
          {["overview","appointments","courses","enquiries"].map(t=>(
            <button key={t} className={"tab-btn "+(tab===t?"act":"")} onClick={()=>setTab(t)} style={{textTransform:"capitalize"}}>{t}</button>
          ))}
        </div>
        {tab==="overview"&&<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(168px,1fr))",gap:"12px",marginBottom:"12px"}}>
            {M.map(m=><div key={m.l} className="metric"><div className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"2rem",lineHeight:1,marginBottom:"6px"}}>{m.v}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".1em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"8px"}}>{m.l}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",color:"var(--success)",fontWeight:600}}>{m.c}</div></div>)}
          </div>
          <div style={{background:"var(--white)",border:"1px solid rgba(26,8,24,.07)",padding:"28px",boxShadow:"0 2px 16px rgba(26,8,24,.05)"}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".18em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"22px",fontWeight:500}}>Monthly Revenue</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:"8px",height:"80px"}}>
              {rB.map((h,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}>
                <div className="rev-bar" style={{width:"100%",height:h+"%",opacity:i===11?1:.55}}/>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".44rem",color:"var(--ink3)"}}>{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</div>
              </div>)}
            </div>
          </div>
        </>}
        {tab==="appointments"&&<div style={{background:"var(--white)",border:"1px solid rgba(26,8,24,.07)",padding:"28px",boxShadow:"0 2px 16px rgba(26,8,24,.05)"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".16em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"20px",fontWeight:500}}>Upcoming Appointments</div>
          <div style={{display:"flex",flexDirection:"column",gap:"1px",background:"rgba(26,8,24,.06)"}}>
            {BK.map((b,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:"var(--white)",flexWrap:"wrap",gap:"10px"}}>
              <div style={{display:"flex",gap:"14px",alignItems:"center"}}>
                <div style={{width:"38px",height:"38px",borderRadius:"50%",border:"1.5px solid rgba(139,26,58,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",color:"var(--wine)",background:"rgba(139,26,58,.05)"}}>{b.n[0]}</div>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",color:"var(--ink)"}}>{b.n}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",color:"var(--ink3)",marginTop:"1px"}}>{b.s} - {b.dt} - {b.t}</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",marginBottom:"2px"}}>{b.a}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".55rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:stC[b.st]}}>{b.st}</div>
              </div>
            </div>)}
          </div>
        </div>}
        {tab==="courses"&&<div style={{background:"var(--white)",border:"1px solid rgba(26,8,24,.07)",padding:"28px",boxShadow:"0 2px 16px rgba(26,8,24,.05)"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",letterSpacing:".16em",color:"var(--ink3)",textTransform:"uppercase",marginBottom:"20px",fontWeight:500}}>Course Performance</div>
          {CS.map((s,i)=><div key={s.c} style={{padding:"18px 0",borderBottom:i<CS.length-1?"1px solid rgba(26,8,24,.06)":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",color:"var(--ink)"}}>{s.c}</div>
              <div className="gt" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem"}}>{s.r}</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",color:"var(--ink3)"}}>{s.u} enrolments</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",color:"var(--success)",fontWeight:500}}>+{Math.floor(Math.random()*16+8)}% this month</span>
            </div>
            <div className="prog-bg"><div className="prog-fill" style={{width:s.p+"%"}}/></div>
          </div>)}
        </div>}
        {tab==="enquiries"&&<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {EN.map((e,i)=><div key={i} style={{display:"flex",gap:"16px",alignItems:"start",padding:"20px 24px",background:"var(--white)",border:"1px solid rgba(26,8,24,.07)",boxShadow:"0 1px 8px rgba(26,8,24,.04)"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".52rem",fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",padding:"3px 11px",flexShrink:0,
              background:e.tg==="collab"?"rgba(200,151,58,.1)":e.tg==="booking"?"rgba(139,26,58,.08)":"rgba(26,8,24,.05)",
              border:"1px solid "+(e.tg==="collab"?"rgba(200,151,58,.3)":e.tg==="booking"?"rgba(139,26,58,.2)":"rgba(26,8,24,.1)"),
              color:e.tg==="collab"?"var(--gold)":e.tg==="booking"?"var(--wine)":"var(--ink3)"}}>{e.tp}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:".98rem",color:"var(--ink)",marginBottom:"5px"}}>{e.n}</div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".8rem",color:"var(--ink2)",lineHeight:1.65,fontWeight:300}}>{e.m}</p>
            </div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".56rem",color:"var(--ink3)",flexShrink:0}}>{e.ag}</div>
          </div>)}
        </div>}
      </div>
    </section>
  );
}

function Footer(){
  return(
    <footer style={{background:"var(--plum)",borderTop:"1px solid rgba(200,151,58,.15)",padding:"60px 5% 32px"}}>
      <div style={{maxWidth:"1180px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:"48px",marginBottom:"48px"}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"2rem",fontWeight:400,background:"linear-gradient(135deg,#C8973A,#F0D898,#C8973A)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"16px"}}>Gulabi</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".85rem",lineHeight:1.9,color:"rgba(255,255,255,.35)",marginBottom:"22px",fontWeight:300}}>Bangalore's celebrated makeup artiste crafting extraordinary transformations for brides, tastemakers and beauty connoisseurs.</p>
            <a href="https://www.instagram.com/makeupbygulabi_bangalore/" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"8px",color:"var(--gold2)",textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",fontWeight:500}}>
              <Ic.Insta/> Follow on Instagram
            </a>
          </div>
          <div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".56rem",letterSpacing:".26em",color:"var(--gold)",textTransform:"uppercase",marginBottom:"20px",fontWeight:500}}>Services</div>
            {["Bridal Artistry","Evening Glamour","Engagement Beauty","Grooming Ateliers","Online Masterclasses"].map(s=>(
              <div key={s} style={{fontFamily:"'DM Sans',sans-serif",fontSize:".85rem",color:"rgba(255,255,255,.32)",padding:"6px 0",cursor:"pointer",transition:"color .25s",borderBottom:"1px solid rgba(200,151,58,.06)",fontWeight:300}}
                onMouseEnter={e=>e.target.style.color="var(--gold2)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.32)"}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".56rem",letterSpacing:".26em",color:"var(--gold)",textTransform:"uppercase",marginBottom:"20px",fontWeight:500}}>Contact</div>
            {["Bangalore, Karnataka, India","By Appointment Only","gulabi.makeup@gmail.com","Mon - Sat  9 AM - 7 PM"].map(t=>(
              <div key={t} style={{fontFamily:"'DM Sans',sans-serif",fontSize:".85rem",color:"rgba(255,255,255,.32)",padding:"6px 0",borderBottom:"1px solid rgba(200,151,58,.06)",fontWeight:300}}>{t}</div>
            ))}
          </div>
          <div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".56rem",letterSpacing:".26em",color:"var(--gold)",textTransform:"uppercase",marginBottom:"20px",fontWeight:500}}>Find Us</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
              {["Bridal Makeup Bangalore","Best Makeup Artist","Party Makeup","Grooming Classes","Makeup Artist Near Me","Engagement Makeup"].map(k=>(
                <span key={k} style={{border:"1px solid rgba(200,151,58,.15)",padding:"3px 10px",fontFamily:"'DM Sans',sans-serif",fontSize:".5rem",letterSpacing:".09em",color:"rgba(255,255,255,.22)",textTransform:"uppercase"}}>{k}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(200,151,58,.12)",paddingTop:"22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:".52rem",letterSpacing:".1em",color:"rgba(255,255,255,.2)"}}>2025 Gulabi Makeup Artistry - All Rights Reserved</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:".9rem",color:"rgba(200,151,58,.4)"}}>Renowned Make-Up Artist in Bangalore</div>
        </div>
      </div>
    </footer>
  );
}

export default function App(){
  const [sec,setSec]=useState("home");
  const [admin,setAdmin]=useState(false);
  const goTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setSec(id);};
  useEffect(()=>{
    document.title="Gulabi - Renowned Make-Up Artist in Bangalore | Bridal, Party and Grooming";
    let m=document.querySelector('meta[name="description"]');
    if(!m){m=document.createElement("meta");m.name="description";document.head.appendChild(m);}
    m.content="Gulabi is Bangalore's most celebrated makeup artiste. Bridal, engagement and evening glamour. Book online, buy masterclasses, instant UPI payment. Serving Koramangala, Indiranagar, HSR Layout and across Bangalore.";
  },[]);
  useEffect(()=>{
    const h=()=>{const ss=["home","services","book","courses","portfolio","testimonials","social"];for(const s of ss){const el=document.getElementById(s);if(el){const r=el.getBoundingClientRect();if(r.top<=80&&r.bottom>=80){setSec(s);break;}}}};
    window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);
  },[]);
  return(
    <div style={{background:"var(--ivory)",minHeight:"100vh"}}>
      <Nav sec={sec} goTo={goTo} admin={admin} setAdmin={setAdmin}/>
      {admin
        ?<div style={{paddingTop:"76px"}}><Dashboard/></div>
        :<>
          <Hero onBook={()=>goTo("book")}/>
          <TrustStrip/>
          <Services onBook={()=>goTo("book")}/>
          <Booking/>
          <Courses/>
          <Portfolio/>
          <Testimonials/>
          <Social/>
        </>
      }
      <Footer/>
    </div>
  );
}
