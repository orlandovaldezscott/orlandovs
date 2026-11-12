/* CV tailorer — first-visit industry prompt + tailored CV on /about/ */
(function(){
const KEY='ovs-industry';
const IND={
  finance:{label:'Finance & Banking',short:'Finance'},
  data:{label:'Data & Technology',short:'Data & Tech'},
  accounting:{label:'Accounting & Audit',short:'Accounting'},
  economics:{label:'Economics & Policy',short:'Economics'},
  business:{label:'Business & Management',short:'Business'},
  marketing:{label:'Marketing & Creative',short:'Marketing'},
  general:{label:'Just looking around',short:'General'}
};
const ARMY='Growing up as an Army child taught me to adapt quickly, build relationships fast and stay resilient.';
const SUM={
  finance:'Sixth Form student and Head of Entrepreneurship with a clear ambition to build a career in financial services and markets. With no prior coding experience, I taught myself to program and built Taciturn, an autonomous algorithmic trading system for gold and silver that became my EPQ. A wealth management placement showed me how client advice, financial planning and portfolio management fit together, and a marketing placement at N.Peal gave me real commercial experience.',
  data:'Self-taught developer and Sixth Form student aiming to build a career in data and technology. With no prior coding experience, I built Taciturn, an autonomous trading system (4,000+ lines of Python running on a cloud server), then added LightGBM machine-learning models and built Alladin, which uses weather data to predict commodity prices. I have also built a native iOS app and AI search tools.',
  accounting:'Detail-focused Sixth Form student and Head of Entrepreneurship, aiming to qualify as a Chartered Accountant. Building Taciturn, my self-taught trading system and EPQ, taught me to test every assumption against data, keep accurate records and control risk with clear rules. I pair that analytical rigour with leadership and commercial placements, and take pride in accuracy, integrity and reliability.',
  economics:'Curious Sixth Form student and Head of Entrepreneurship with a strong interest in how economic and world events move markets. I built a news terminal aggregating 16+ live feeds onto a world map, and my project Alladin uses weather anomalies and El Niño data to predict commodity prices — positive in 14 of 17 years of testing. I want to use data to answer real economic questions clearly.',
  business:'Sixth Form student and Head of Entrepreneurship aiming to build a career in business. I lead the school\u2019s entrepreneurship programme, run a new weekly society, design a school-wide trading competition and organise external speakers. I also lead wellbeing as Head of Mental Health for my boarding house, built Taciturn (my EPQ) from scratch, and bring commercial experience from N.Peal and a wealth management placement.',
  marketing:'Sixth Form student with hands-on marketing experience at British luxury cashmere brand N.Peal, which began as work experience and became a placement. I study Business and Photography, design and build my own brands and websites, organise speakers including a Business of Fashion session, and am co-creating products for my school\u2019s centenary. I bring a builder\u2019s mindset: I taught myself to code and ship my own products.',
  general:'Sixth Form student, self-taught developer and Head of Entrepreneurship. With no prior coding experience I built an autonomous trading system, a weather-driven commodity model and a native iOS app, alongside marketing and wealth management placements and school leadership roles.'
};
const EDU=[
  ['2025 – 2027','OCR Cambridge Technicals Level 3 in Business and A-Level Photography — predicted A*, A*, B'],
  ['2026','Extended Project Qualification: Taciturn — building an autonomous algorithmic trading system'],
  ['2024','GCSEs — full pass in all subjects']
];
const ROLES={t:'Head of Entrepreneurship (E&I Prefect)',d:'2026 – present',b:[
  'Leading entrepreneurship and innovation across the school, including a new weekly extracurricular society.',
  'Designing a half-termly trading competition: students manage a £5,000 virtual portfolio, tracked on a live website.',
  'Running teaching sessions on trading strategies and how finance links to other subjects, from biology to politics.',
  'Organising external speakers, including a Business of Fashion session, streamed via the school radio.',
  'Collaborating on a student enterprise to design and sell products for the school\u2019s centenary.'
],extra:['Head of Mental Health, boarding house — leading wellbeing support and initiatives.','Acting Prefect.']};
const WORK={
  wm:{t:'Montgomery Associates — Wealth Management',d:'Summer 2026',b:[
    'One of five students selected across four schools and a university for the firm\u2019s first two-day programme.',
    'Learnt how wealth management fits within financial services: client advice, financial planning and portfolio management.',
    'Helped test the firm\u2019s new platform of ready-made portfolios for next-generation investors.']},
  np:{t:'N.Peal — Marketing (luxury cashmere, London)',d:'2025 – 2026',b:[
    'Started as marketing work experience at a British luxury brand and was invited back, turning it into a work placement.']}
};
const PROJ={
  taciturn:{t:'Taciturn — Autonomous Algorithmic Trading System (EPQ)',d:'2026',b:[
    'Built from scratch in Python/Flask (4,000+ lines); traded gold and silver 24/7 via the OANDA v20 API on a London cloud server. Now shelved.',
    'Backtested every candlestick pattern over 20 years of data; added VWAP reversion, volume-weighted momentum and RSI strategies.',
    'Real-time risk management: ATR-based sizing, trailing and hard stops, trend filters, live dashboard and phone alerts.',
    'Added a LightGBM machine-learning layer to filter out low-quality trades.']},
  alladin:{t:'Alladin — Weather-Driven Commodity Signals',d:'2026 – present',b:[
    'LightGBM model predicting 20-day direction for nine commodity futures from growing-region weather anomalies and El Niño data.',
    'Walk-forward backtest 2010–2026: positive in 14 of 17 years.']},
  kassi:{t:'Kassi — iOS Personal Dashboard',d:'2026 – present',b:[
    'Native SwiftUI app for money, health, training and time on one screen; local-first with no accounts or tracking. Own brand, site and App Store submission.']},
  other:{t:'Other builds',d:'',b:['Neural Link (AI search over my notes), a geopolitical news terminal (16+ live feeds on a world map), and this site.']}
};
const ORDER={
  finance:{s:['work','projects','roles'],p:['taciturn','alladin','kassi','other'],w:['wm','np']},
  data:{s:['projects','work','roles'],p:['taciturn','alladin','kassi','other'],w:['wm','np']},
  accounting:{s:['work','projects','roles'],p:['taciturn','alladin','kassi','other'],w:['wm','np']},
  economics:{s:['projects','work','roles'],p:['alladin','taciturn','other','kassi'],w:['wm','np']},
  business:{s:['roles','work','projects'],p:['kassi','taciturn','alladin','other'],w:['np','wm']},
  marketing:{s:['work','roles','projects'],p:['kassi','other','taciturn','alladin'],w:['np','wm']},
  general:{s:['projects','work','roles'],p:['taciturn','alladin','kassi','other'],w:['wm','np']}
};
const SKILLS={
  finance:'Markets and risk: live trading of gold and silver, ATR-based position sizing, stop-loss and trend-filter controls; backtesting and financial data analysis. I manage my own equity portfolio. Technical: Python (pandas, NumPy, LightGBM), JavaScript, SwiftUI, Linux servers, Git.',
  data:'Python (pandas, NumPy, LightGBM), machine learning, walk-forward backtesting and data analysis; SwiftUI, JavaScript, Flask; REST APIs, Linux cloud servers, Git, Cloudflare; ChromaDB and LLM tools. I design, deploy and monitor systems that run 24/7.',
  accounting:'Financial data analysis and accurate record-keeping — I review my own trading records to find errors and improve decisions. Python (pandas, NumPy) for large financial datasets; checking results against 20 years of data; rules-based risk controls.',
  economics:'Economic and financial data analysis in Python (pandas, NumPy, LightGBM); building and testing models over long historical datasets; turning results into clear dashboards and explanations.',
  business:'Leadership and project management: launching a society, running events, coordinating speakers and staff. Commercial awareness from Business studies, marketing at N.Peal and a student enterprise. Technical: Python, data analysis, websites and dashboards.',
  marketing:'Brand and visual identity, photography and art direction (A-Level Photography), web design and building (Hugo, HTML/CSS), app branding and App Store presentation; event and speaker organisation; commercial awareness from Business studies.',
  general:'Python (pandas, NumPy, LightGBM), SwiftUI, JavaScript, Flask, Linux servers, Git; data analysis and backtesting; leadership, event organisation and commercial experience.'
};
const COMMON='Strong communication, organisation and teamwork from school leadership and placements.';
const INTERESTS='Financial markets, quant finance and AI (which led me to teach myself to code), geopolitics and how world events move markets, photography, fashion and watches.';

const get=()=>{const q=new URLSearchParams(location.search).get('for');if(q&&IND[q]){try{localStorage.setItem(KEY,q)}catch(e){}return q}try{return localStorage.getItem(KEY)}catch(e){return null}};
const set=k=>{try{localStorage.setItem(KEY,k)}catch(e){}};

const css=`
.cvt-ov{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:color-mix(in srgb,var(--cream) 70%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);animation:cvtF .5s ease both}
.cvt-box{width:min(560px,100%);background:var(--cream);border:1px solid var(--border);padding:3rem 2.5rem 2.5rem;text-align:center;animation:cvtU .7s cubic-bezier(.2,.7,.2,1) both}
.cvt-over{font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:1.2rem}
.cvt-h{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.8rem,4vw,2.4rem);font-weight:300;line-height:1.15;color:var(--ink);margin-bottom:.8rem}
.cvt-h em{font-style:italic;color:var(--gold)}
.cvt-p{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:1.1rem;color:var(--mid);line-height:1.6;margin-bottom:2rem}
.cvt-grid{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border);border-left:1px solid var(--border)}
.cvt-grid button{background:none;border:none;border-right:1px solid var(--border);border-bottom:1px solid var(--border);padding:1.05rem .6rem;font-family:'DM Mono',monospace;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);cursor:pointer;transition:background .2s,color .2s}
.cvt-grid button:hover{background:var(--ink);color:var(--cream)}
.cvt-skip{display:inline-block;margin-top:1.6rem;background:none;border:none;border-bottom:1px solid var(--border);padding-bottom:.2rem;font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mid);cursor:pointer}
.cvt-skip:hover{color:var(--gold);border-color:var(--gold)}
.cvt-out{animation:cvtO .4s ease both}
.cvt-toast{position:fixed;left:50%;bottom:1.8rem;translate:-50% 0;z-index:1000;background:var(--ink);color:var(--cream);padding:.85rem 1.3rem;font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;animation:cvtU .6s ease both}
.cvt-toast a{color:var(--gold);text-decoration:none;margin-left:.8rem}
@keyframes cvtF{from{opacity:0}}@keyframes cvtU{from{opacity:0;transform:translateY(18px)}}@keyframes cvtO{to{opacity:0}}
@media(max-width:520px){.cvt-box{padding:2.2rem 1.4rem 1.8rem}.cvt-grid{grid-template-columns:1fr}}
#cv{max-width:820px;margin:0 auto;padding:5rem 2rem 6rem}
.cv-bar{display:flex;flex-wrap:wrap;gap:1.4rem;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:1.2rem;margin-bottom:3rem}
.cv-chips{display:flex;flex-wrap:wrap;gap:1.2rem}
.cv-chips button,.cv-dl{background:none;border:none;border-bottom:1px solid transparent;padding:0 0 .2rem;font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:var(--mid);cursor:pointer}
.cv-chips button.on{color:var(--ink);border-color:var(--gold)}
.cv-dl{color:var(--gold);border:1px solid var(--gold);padding:.45rem .8rem}
.cv-dl:hover{background:var(--gold);color:var(--cream)}
.cv-doc{font-family:'Cormorant Garamond',Georgia,serif;color:var(--ink);transition:opacity .35s}
.cv-doc.fade{opacity:0}
.cv-name{font-size:2.4rem;font-weight:300;line-height:1}
.cv-links{font-family:'DM Mono',monospace;font-size:.68rem;letter-spacing:.06em;color:var(--mid);margin:.8rem 0 1.6rem}
.cv-links a{color:var(--mid);text-decoration:none}.cv-links a:hover{color:var(--gold)}
.cv-sum{font-size:1.15rem;line-height:1.7;color:var(--mid);margin-bottom:2.2rem}
.cv-sec{margin-bottom:2rem}
.cv-sec h3{font-family:'DM Mono',monospace;font-size:.65rem;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);border-bottom:1px solid var(--border);padding-bottom:.5rem;margin-bottom:1rem}
.cv-item{margin-bottom:1rem}
.cv-row{display:flex;justify-content:space-between;gap:1rem;font-size:1.15rem}
.cv-row span{font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.08em;color:var(--mid);white-space:nowrap;padding-top:.35rem}
.cv-item ul{margin:.3rem 0 0 1.1rem}
.cv-item li,.cv-txt{font-size:1.05rem;line-height:1.6;color:var(--mid)}
@media print{
  @page{margin:12mm}
  body *{visibility:hidden!important}
  #cv,#cv *{visibility:visible!important}
  #cv{position:absolute;left:0;top:0;width:100%;padding:0;max-width:none}
  .cv-bar{display:none!important}
  .cv-doc,.cv-doc *{color:#111!important}
  .cv-sec h3{color:#8a6d3b!important}
  .cv-name{font-size:22pt}.cv-sum,.cv-row,.cv-item li,.cv-txt{font-size:10pt;line-height:1.4}
  .cv-sec{margin-bottom:9pt}.cv-item{margin-bottom:5pt}.cv-sum{margin-bottom:10pt}
}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

function prompt(){
  const ov=document.createElement('div');ov.className='cvt-ov';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');
  ov.innerHTML=`<div class="cvt-box"><div class="cvt-over">Welcome</div><div class="cvt-h">What industry do you <em>work in?</em></div><p class="cvt-p">My CV on the About page tailors itself to you.</p><div class="cvt-grid">${Object.keys(IND).filter(k=>k!=='general').map(k=>`<button data-k="${k}">${IND[k].short}</button>`).join('')}<button data-k="general">Other</button></div><button class="cvt-skip" data-k="general">Just looking around</button></div>`;
  ov.addEventListener('click',e=>{const k=e.target.dataset&&e.target.dataset.k;if(!k)return;set(k);ov.classList.add('cvt-out');setTimeout(()=>ov.remove(),400);
    if(document.getElementById('cv'))render(k);else if(k!=='general')toast(k)});
  document.body.appendChild(ov);
}
function toast(k){const t=document.createElement('div');t.className='cvt-toast';t.innerHTML=`CV tailored for ${IND[k].short}<a href="/about/#cv">View →</a>`;document.body.appendChild(t);setTimeout(()=>{t.classList.add('cvt-out');setTimeout(()=>t.remove(),400)},5000)}

const item=x=>`<div class="cv-item"><div class="cv-row">${x.t}<span>${x.d}</span></div>${x.b?`<ul>${x.b.map(b=>`<li>${b}</li>`).join('')}</ul>`:''}</div>`;
function render(k){
  const host=document.getElementById('cv');if(!host)return;k=IND[k]?k:'general';const o=ORDER[k];
  const sec={
    work:`<div class="cv-sec"><h3>Work Experience</h3>${o.w.map(w=>item(WORK[w])).join('')}</div>`,
    projects:`<div class="cv-sec"><h3>Projects</h3>${o.p.map(p=>item(PROJ[p])).join('')}</div>`,
    roles:`<div class="cv-sec"><h3>Positions of Responsibility</h3>${item(ROLES)}${ROLES.extra.map(x=>`<p class="cv-txt">${x}</p>`).join('')}</div>`
  };
  const doc=`<div class="cv-name">Orlando Valdes-Scott</div>
  <div class="cv-links"><a href="/contact/">Contact via orlandovs.pages.dev/contact</a> · <a href="https://github.com/orlandovaldezscott">github.com/orlandovaldezscott</a> · <a href="https://www.linkedin.com/in/orlandovaldezscott">LinkedIn</a></div>
  <p class="cv-sum">${SUM[k]} ${ARMY}</p>
  <div class="cv-sec"><h3>Education</h3>${EDU.map(e=>`<div class="cv-item"><div class="cv-row">${e[1]}<span>${e[0]}</span></div></div>`).join('')}</div>
  ${o.s.map(s=>sec[s]).join('')}
  <div class="cv-sec"><h3>Skills</h3><p class="cv-txt">${SKILLS[k]} ${COMMON}</p></div>
  <div class="cv-sec"><h3>Interests</h3><p class="cv-txt">${INTERESTS}</p></div>
  <p class="cv-txt">References available on request.</p>`;
  if(!host.querySelector('.cv-doc')){
    host.innerHTML=`<div class="cv-bar"><div class="cv-chips">${Object.keys(IND).map(x=>`<button data-k="${x}">${IND[x].short}</button>`).join('')}</div><button class="cv-dl" onclick="print()">Download PDF</button></div><div class="cv-doc"></div>`;
    host.querySelector('.cv-chips').addEventListener('click',e=>{const x=e.target.dataset.k;if(x){set(x);render(x)}});
  }
  host.querySelectorAll('.cv-chips button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));
  const d=host.querySelector('.cv-doc');d.classList.add('fade');setTimeout(()=>{d.innerHTML=doc;d.classList.remove('fade')},d.innerHTML?250:0);
}

const go=()=>{const k=get();if(document.getElementById('cv'))render(k||'general');if(!k)setTimeout(prompt,700)};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go();
})();
