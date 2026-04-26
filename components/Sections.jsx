// Sections.jsx — All page sections

function DownloadBanner() {
  return (
    <section style={{borderTop:'1px solid var(--line)'}}>
      <div style={{background:'var(--ink)',padding:'48px 0'}}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
          <div>
            <div className="eyebrow" style={{color:'rgba(255,255,255,0.35)',marginBottom:10}}>AVAILABLE NOW</div>
            <h2 className="serif" style={{fontSize:'clamp(24px,3vw,38px)',color:'#fff',fontWeight:400}}>
              Download Bronn and start your first <em style={{color:'var(--warm)'}}>strategic decision.</em>
            </h2>
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="download.html" className="btn" style={{background:'#fff',color:'var(--ink)'}}>Download for Mac</a>
            <a href="download.html" className="btn" style={{background:'rgba(255,255,255,0.1)',color:'#fff',border:'1px solid rgba(255,255,255,0.15)'}}>Download for Windows</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {n:'01',title:'Open Bronn',copy:'Launch the desktop app. Bronn greets you with the week ahead — drawn from everything it already knows.',mockup:<MockupNavBar/>},
    {n:'02',title:'Ask Anything',copy:'Type the strategic question on your mind. Get a recommendation, the math behind it, and the next move.',mockup:<MockupChat/>},
    {n:'03',title:'See the Growth',copy:'Model burn, runway, and pricing. Show your investors the math with beautiful projections.',mockup:<MockupGraph/>},
  ];
  return (
    <section id="how" style={{padding:'100px 0',borderTop:'1px solid var(--line)'}}>
      <div className="container">
        <div className="reveal" style={{marginBottom:70}}>
          <div className="eyebrow" style={{marginBottom:16}}>HOW IT WORKS</div>
          <h2 className="serif" style={{fontSize:'clamp(36px,5vw,64px)',marginBottom:16}}>Three steps. <em style={{color:'var(--muted)'}}>Five minutes.</em></h2>
          <p style={{fontSize:17,color:'var(--text-2)',lineHeight:1.65,maxWidth:'50ch'}}>From install to your first defensible decision — built to feel calm, engineered for trust.</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {steps.map((s,i) => {
            const ev = i%2===1;
            return (
              <div key={i} className="reveal" style={{background:'var(--bg-2)',borderRadius:24,border:'1px solid var(--line)',overflow:'hidden',display:'flex',flexDirection:ev?'row-reverse':'row',alignItems:'center',minHeight:400}}>
                <div style={{flex:'0 0 42%',padding:60}}>
                  <div className="mono" style={{fontSize:13,color:'var(--amber)',letterSpacing:'0.14em',marginBottom:18}}>{s.n}</div>
                  <h3 className="serif" style={{fontSize:'clamp(26px,3vw,42px)',marginBottom:16,color:'var(--text)'}}>{s.title}</h3>
                  <p style={{fontSize:16,lineHeight:1.7,color:'var(--text-2)',maxWidth:'36ch'}}>{s.copy}</p>
                </div>
                <div style={{flex:1,padding:ev?'40px 0 40px 40px':'40px 40px 40px 0',display:'flex',alignItems:'center'}}>{s.mockup}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    {label:'SCENARIO ENGINE',title:'Up to 8 strategic paths from one prompt.',copy:'Compare growth, risk, and the math side-by-side.',icon:'\u25C8'},
    {label:'CITATIONS ALWAYS',title:'Every claim links to the source.',copy:'No black box. No hallucinations. Complete transparency.',icon:'\u2295'},
    {label:'NATIVE DATA',title:'14 integrations built in.',copy:'Connect your data stack with one click. Always in sync.',icon:'\u25C9'},
    {label:'BOARD-READY',title:'Formatted for the room.',copy:'Decision memos, slide-ready charts, and reasoning trails.',icon:'\u25EB'},
  ];
  return (
    <section style={{padding:'100px 0',borderTop:'1px solid var(--line)'}}>
      <div className="container">
        <div className="reveal" style={{marginBottom:70}}>
          <div className="eyebrow" style={{marginBottom:16}}>CAPABILITIES</div>
          <h2 className="serif" style={{fontSize:'clamp(36px,5vw,64px)',marginBottom:16}}>Built like a tool, <em style={{color:'var(--muted)'}}>not a toy.</em></h2>
          <p style={{fontSize:17,color:'var(--text-2)',lineHeight:1.65,maxWidth:'50ch'}}>The features your strategy team actually needs.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
          {feats.map((f,i) => <FeatureCard key={i} {...f}/>)}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({label,title,copy,icon}) {
  const [h,sH] = React.useState(false);
  return (
    <div className="reveal" onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{
      padding:40,borderRadius:20,
      background:h?'var(--bg-3)':'var(--bg-2)',
      border:'1px solid '+(h?'var(--line-med)':'var(--line)'),
      transition:'all 0.35s ease',
      transform:h?'translateY(-4px)':'none',
      boxShadow:h?'0 20px 40px rgba(26,24,18,0.08)':'none',
    }}>
      <div style={{fontSize:32,marginBottom:20}}>{icon}</div>
      <div className="eyebrow-accent" style={{marginBottom:14}}>{label}</div>
      <h3 className="serif" style={{fontSize:22,color:'var(--text)',marginBottom:12,lineHeight:1.3}}>{title}</h3>
      <p style={{fontSize:15,lineHeight:1.7,color:'var(--text-2)'}}>{copy}</p>
    </div>
  );
}

function UseCases() {
  const [tab,setTab] = React.useState(0);
  const cases = [
    {tag:'FOR FOUNDERS',title:'Pressure-test the next 18 months.',copy:'Model burn, runway, hiring, pricing. Show your investors the math.',prompts:['What is our path to Series A?','Cut burn 20% — what goes first?','When should we raise?']},
    {tag:'FOR STRATEGY TEAMS',title:'Replace the all-hands deck.',copy:'Generate board-ready scenarios in hours. Sources and contingencies handled.',prompts:['Map our Q3 expansion risks','Compare three pricing tiers','Build the board scenario pack']},
    {tag:'FOR OPERATORS',title:'Decide faster, defend better.',copy:'When the CFO asks why — Bronn has already shown you the path not taken.',prompts:['Why this market vs. LATAM?','Show the hiring plan math','What is our worst-case runway?']},
  ];
  const c = cases[tab];
  return (
    <section id="use-cases" style={{padding:'100px 0',borderTop:'1px solid var(--line)'}}>
      <div className="container">
        <div className="reveal" style={{marginBottom:56}}>
          <div className="eyebrow" style={{marginBottom:16}}>IN PRACTICE</div>
          <h2 className="serif" style={{fontSize:'clamp(36px,5vw,64px)',marginBottom:16}}>Three teams, <em style={{color:'var(--muted)'}}>one tool.</em></h2>
        </div>
        <div style={{display:'flex',gap:8,marginBottom:40,flexWrap:'wrap'}}>
          {cases.map((cs,i) => (
            <button key={i} onClick={()=>setTab(i)} style={{
              padding:'10px 20px',borderRadius:100,
              border:'1px solid '+(tab===i?'var(--ink)':'var(--line)'),
              background:tab===i?'var(--ink)':'transparent',
              color:tab===i?'var(--cream)':'var(--text-2)',
              fontSize:13,fontWeight:500,cursor:'pointer',
              transition:'all 0.2s',fontFamily:'Inter,sans-serif',
            }}>{cs.tag}</button>
          ))}
        </div>
        <div key={tab} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'center',animation:'scaleIn 0.3s ease'}}>
          <div>
            <h3 className="serif" style={{fontSize:'clamp(24px,3vw,42px)',color:'var(--text)',marginBottom:18,lineHeight:1.2}}>{c.title}</h3>
            <p style={{fontSize:17,color:'var(--text-2)',lineHeight:1.7,marginBottom:32}}>{c.copy}</p>
            <a href="download.html" className="btn btn-primary">Try Bronn free <span className="arrow">\u2192</span></a>
          </div>
          <div style={{background:'var(--bg-2)',borderRadius:16,border:'1px solid var(--line)',padding:28}}>
            <div className="eyebrow" style={{marginBottom:18}}>SAMPLE QUESTIONS</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {c.prompts.map((p,j) => (
                <div key={j} style={{padding:'14px 18px',background:'var(--bg)',border:'1px solid var(--line)',borderRadius:10,fontSize:14,color:'var(--text-2)',display:'flex',justifyContent:'space-between',cursor:'default'}}>
                  <span>{p}</span><span style={{opacity:0.3}}>\u2192</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {name:'SOLO',price:'$24',per:'/mo',desc:'For founders flying solo.',feats:['1 workspace','6 data sources','Scenario engine','Local-first','Email support'],cta:'Start free',hot:false},
    {name:'TEAM',price:'$96',per:'/seat\u00B7mo',desc:'For strategy teams of 3\u201325.',feats:['Unlimited workspaces','Unlimited sources','Shared scenarios','SSO + audit log','Priority support','Board exports'],cta:'Start trial',hot:true},
    {name:'ENTERPRISE',price:'Custom',per:'',desc:'Bespoke deployment, SLAs.',feats:['Self-hosted option','Custom connectors','Dedicated capacity','SSO, SCIM, audit','Solutions architect','On-call SLA'],cta:'Talk to sales',hot:false},
  ];
  return (
    <section id="pricing" style={{padding:'100px 0',borderTop:'1px solid var(--line)'}}>
      <div className="container">
        <div className="reveal" style={{marginBottom:60}}>
          <div className="eyebrow" style={{marginBottom:16}}>PRICING</div>
          <h2 className="serif" style={{fontSize:'clamp(36px,5vw,64px)',marginBottom:12}}>Plain and fair. <em style={{color:'var(--muted)'}}>Cancel anytime.</em></h2>
          <p style={{fontSize:16,color:'var(--text-2)'}}>14-day trial on every plan, no credit card.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,alignItems:'center',paddingTop:20}}>
          {tiers.map((t,i) => (
            <div key={i} className="reveal" style={{
              padding:'40px 32px',borderRadius:24,
              background:t.hot?'var(--ink)':'var(--bg-card)',
              color:t.hot?'var(--cream)':'var(--text)',
              border:t.hot?'1px solid rgba(255,255,255,0.1)':'1px solid var(--line)',
              display:'flex',flexDirection:'column',minHeight: t.hot ? 520 : 480,position:'relative',
              transform: t.hot ? 'translateY(-20px)' : 'none',
              boxShadow: t.hot ? '0 40px 100px -20px rgba(26,24,18,0.22), 0 16px 40px rgba(26,24,18,0.1)' : '0 10px 40px -10px rgba(26,24,18,0.05)',
              transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = t.hot ? 'translateY(-26px)' : 'translateY(-8px)';
              e.currentTarget.style.boxShadow = t.hot ? '0 50px 120px -20px rgba(26,24,18,0.3), 0 20px 50px rgba(26,24,18,0.15)' : '0 20px 60px -10px rgba(26,24,18,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = t.hot ? 'translateY(-20px)' : 'none';
              e.currentTarget.style.boxShadow = t.hot ? '0 40px 100px -20px rgba(26,24,18,0.22), 0 16px 40px rgba(26,24,18,0.1)' : '0 10px 40px -10px rgba(26,24,18,0.05)';
            }}
            >
              {t.hot && <div style={{position:'absolute',inset:0,borderRadius:24,background:'radial-gradient(ellipse at top, rgba(201,124,71,0.15), transparent 70%)',pointerEvents:'none'}} />}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                <div className="head" style={{fontSize:26,letterSpacing:'0.05em'}}>{t.name}</div>
                {t.hot && <span className="mono" style={{fontSize:10,color:'var(--amber)',letterSpacing:'0.08em'}}>RECOMMENDED</span>}
              </div>
              <p style={{fontSize:13,opacity: t.hot ? 0.7 : 0.65,marginBottom:24}}>{t.desc}</p>
              <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:28}}>
                <span className="serif" style={{fontSize:48,lineHeight:1}}>{t.price}</span>
                <span style={{fontSize:13,opacity:0.5}}>{t.per}</span>
              </div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:12,marginBottom:32,flex:1}}>
                {t.feats.map((f,j) => (
                  <li key={j} style={{fontSize:14,display:'flex',gap:12,alignItems:'center',opacity: t.hot ? 0.9 : 0.8}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.hot ? 'var(--amber)' : 'var(--green)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="download.html" className="btn" style={{background:t.hot?'var(--amber)':'var(--bg-2)',color:t.hot?'#fff':'var(--text)',justifyContent:'center',border:t.hot?'none':'1px solid var(--line)'}}>
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadCTA() {
  return (
    <section id="download" style={{padding:'120px 0',borderTop:'1px solid var(--line)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:700,height:500,background:'radial-gradient(ellipse,rgba(201,124,71,0.06),transparent 65%)',pointerEvents:'none'}}/>
      <div className="container reveal" style={{textAlign:'center'}}>
        <div className="eyebrow" style={{marginBottom:24}}>GET STARTED</div>
        <h2 className="serif" style={{fontSize:'clamp(44px,7vw,96px)',color:'var(--text)',marginBottom:24,lineHeight:1.05}}>
          The next call <em style={{color:'var(--muted)'}}>is on you.</em>
        </h2>
        <p style={{fontSize:18,color:'var(--text-2)',maxWidth:'46ch',margin:'0 auto 44px',lineHeight:1.65}}>
          Download Bronn. Connect a source. Ask the question that has been keeping you up.
        </p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:24}}>
          <a href="download.html" className="btn btn-primary" style={{padding:'16px 28px',fontSize:15}}>
            Download for Mac <span className="arrow">\u2192</span>
          </a>
          <a href="download.html" className="btn btn-ghost" style={{padding:'16px 28px',fontSize:15}}>
            Download for Windows <span className="arrow">\u2192</span>
          </a>
        </div>
        <div className="mono" style={{fontSize:11,color:'var(--muted)',display:'flex',justifyContent:'center',gap:20,flexWrap:'wrap'}}>
          <span>v 2.4.1</span><span>\u00B7</span><span>macOS 12+ / Windows 10+</span><span>\u00B7</span><span>84 mb</span><span>\u00B7</span><span>code-signed</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{padding:'60px 0 36px',borderTop:'1px solid var(--line)'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:50,marginBottom:60}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <span style={{width:30,height:30,borderRadius:8,background:'var(--ink)',display:'grid',placeItems:'center'}}>
                <span className="head" style={{color:'var(--cream)',fontSize:14,fontWeight:600}}>B</span>
              </span>
              <span className="head" style={{fontSize:20,fontWeight:500,letterSpacing:'0.06em'}}>BRONN</span>
            </div>
            <p style={{fontSize:14,color:'var(--text-2)',maxWidth:300,lineHeight:1.65,opacity:0.8}}>
              The AI strategist for modern businesses. Built for the room where the call gets made.
            </p>
          </div>
          {[
            {h:'PRODUCT',l:['Download','Changelog','Integrations','Roadmap']},
            {h:'RESOURCES',l:['Docs','Security','Privacy','Terms']},
          ].map(col => (
            <div key={col.h}>
              <div className="mono" style={{fontSize:10,letterSpacing:'0.14em',color:'var(--muted)',marginBottom:18}}>{col.h}</div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:11}}>
                {col.l.map(item => <li key={item}><a href="#" style={{color:'var(--text-2)',textDecoration:'none',fontSize:14}}>{item}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="head" style={{fontSize:'clamp(72px,14vw,200px)',lineHeight:0.85,color:'var(--bg-3)',marginBottom:24,fontWeight:600,letterSpacing:'0.02em',userSelect:'none'}}>BRONN.</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid var(--line)',paddingTop:18,flexWrap:'wrap',gap:10}}>
          <span className="mono" style={{fontSize:11,color:'var(--muted)'}}>© 2026 BRONN LABS · ALL RIGHTS RESERVED</span>
          <span className="mono" style={{fontSize:11,color:'var(--muted)'}}>MADE WITH INTENT · SAN FRANCISCO</span>
        </div>
      </div>
    </footer>
  );
}

window.LogoStrip = LogoStrip;
window.DownloadBanner = DownloadBanner;
window.HowItWorks = HowItWorks;
window.Features = Features;
window.UseCases = UseCases;
window.Pricing = Pricing;
window.DownloadCTA = DownloadCTA;
window.Footer = Footer;
