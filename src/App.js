import React, { useState, useEffect, useMemo } from "react";
import { dbGet, dbSet } from "./firebase";

const M = [
  {n:1,d:"11/06",t:"16:00",g:"A",h:"México",a:"Sudáfrica"},{n:2,d:"11/06",t:"23:00",g:"A",h:"Corea del Sur",a:"Chequia"},
  {n:3,d:"12/06",t:"16:00",g:"B",h:"Canadá",a:"Bosnia"},{n:4,d:"12/06",t:"22:00",g:"D",h:"Estados Unidos",a:"Paraguay"},
  {n:5,d:"13/06",t:"19:00",g:"C",h:"Brasil",a:"Marruecos"},{n:6,d:"13/06",t:"01:00",g:"D",h:"Australia",a:"Turquía"},
  {n:7,d:"13/06",t:"22:00",g:"C",h:"Haití",a:"Escocia"},{n:8,d:"13/06",t:"16:00",g:"B",h:"Qatar",a:"Suiza"},
  {n:9,d:"14/06",t:"14:00",g:"E",h:"Alemania",a:"Curazao"},{n:10,d:"14/06",t:"20:00",g:"E",h:"Costa de Marfil",a:"Ecuador"},
  {n:11,d:"14/06",t:"17:00",g:"F",h:"Países Bajos",a:"Japón"},{n:12,d:"14/06",t:"23:00",g:"F",h:"Suecia",a:"Túnez"},
  {n:13,d:"15/06",t:"13:00",g:"H",h:"España",a:"Cabo Verde"},{n:14,d:"15/06",t:"19:00",g:"H",h:"Arabia Saudita",a:"Uruguay"},
  {n:15,d:"15/06",t:"16:00",g:"G",h:"Bélgica",a:"Egipto"},{n:16,d:"15/06",t:"22:00",g:"G",h:"Irán",a:"Nueva Zelanda"},
  {n:17,d:"16/06",t:"16:00",g:"I",h:"Francia",a:"Senegal"},{n:18,d:"16/06",t:"19:00",g:"I",h:"Irak",a:"Noruega"},
  {n:19,d:"16/06",t:"22:00",g:"J",h:"Argentina",a:"Argelia"},{n:20,d:"16/06",t:"01:00",g:"J",h:"Austria",a:"Jordania"},
  {n:21,d:"17/06",t:"17:00",g:"L",h:"Inglaterra",a:"Croacia"},{n:22,d:"17/06",t:"20:00",g:"L",h:"Ghana",a:"Panamá"},
  {n:23,d:"17/06",t:"14:00",g:"K",h:"Portugal",a:"RD Congo"},{n:24,d:"17/06",t:"23:00",g:"K",h:"Uzbekistán",a:"Colombia"},
  {n:25,d:"18/06",t:"13:00",g:"A",h:"Chequia",a:"Sudáfrica"},{n:26,d:"18/06",t:"16:00",g:"B",h:"Suiza",a:"Bosnia"},
  {n:27,d:"18/06",t:"19:00",g:"B",h:"Canadá",a:"Qatar"},{n:28,d:"18/06",t:"22:00",g:"A",h:"México",a:"Corea del Sur"},
  {n:29,d:"19/06",t:"22:00",g:"C",h:"Brasil",a:"Haití"},{n:30,d:"19/06",t:"19:00",g:"C",h:"Escocia",a:"Marruecos"},
  {n:31,d:"19/06",t:"01:00",g:"D",h:"Turquía",a:"Paraguay"},{n:32,d:"19/06",t:"16:00",g:"D",h:"Estados Unidos",a:"Australia"},
  {n:33,d:"20/06",t:"17:00",g:"E",h:"Alemania",a:"Costa de Marfil"},{n:34,d:"20/06",t:"21:00",g:"E",h:"Ecuador",a:"Curazao"},
  {n:35,d:"20/06",t:"14:00",g:"F",h:"Países Bajos",a:"Suecia"},{n:36,d:"20/06",t:"01:00",g:"F",h:"Túnez",a:"Japón"},
  {n:37,d:"21/06",t:"13:00",g:"H",h:"España",a:"Arabia Saudita"},{n:38,d:"21/06",t:"19:00",g:"H",h:"Uruguay",a:"Cabo Verde"},
  {n:39,d:"21/06",t:"16:00",g:"G",h:"Bélgica",a:"Irán"},{n:40,d:"21/06",t:"22:00",g:"G",h:"Nueva Zelanda",a:"Egipto"},
  {n:41,d:"22/06",t:"18:00",g:"I",h:"Francia",a:"Irak"},{n:42,d:"22/06",t:"21:00",g:"I",h:"Noruega",a:"Senegal"},
  {n:43,d:"22/06",t:"14:00",g:"J",h:"Argentina",a:"Austria"},{n:44,d:"22/06",t:"00:00",g:"J",h:"Jordania",a:"Argelia"},
  {n:45,d:"23/06",t:"17:00",g:"L",h:"Inglaterra",a:"Ghana"},{n:46,d:"23/06",t:"20:00",g:"L",h:"Panamá",a:"Croacia"},
  {n:47,d:"23/06",t:"14:00",g:"K",h:"Portugal",a:"Uzbekistán"},{n:48,d:"23/06",t:"23:00",g:"K",h:"Colombia",a:"RD Congo"},
  {n:49,d:"24/06",t:"19:00",g:"C",h:"Escocia",a:"Brasil"},{n:50,d:"24/06",t:"19:00",g:"C",h:"Marruecos",a:"Haití"},
  {n:51,d:"24/06",t:"16:00",g:"B",h:"Suiza",a:"Canadá"},{n:52,d:"24/06",t:"16:00",g:"B",h:"Bosnia",a:"Qatar"},
  {n:53,d:"24/06",t:"22:00",g:"A",h:"Chequia",a:"México"},{n:54,d:"24/06",t:"22:00",g:"A",h:"Sudáfrica",a:"Corea del Sur"},
  {n:55,d:"25/06",t:"17:00",g:"E",h:"Ecuador",a:"Alemania"},{n:56,d:"25/06",t:"17:00",g:"E",h:"Curazao",a:"Costa de Marfil"},
  {n:57,d:"25/06",t:"20:00",g:"F",h:"Túnez",a:"Países Bajos"},{n:58,d:"25/06",t:"20:00",g:"F",h:"Japón",a:"Suecia"},
  {n:59,d:"25/06",t:"23:00",g:"D",h:"Turquía",a:"Estados Unidos"},{n:60,d:"25/06",t:"23:00",g:"D",h:"Paraguay",a:"Australia"},
  {n:61,d:"26/06",t:"16:00",g:"I",h:"Noruega",a:"Francia"},{n:62,d:"26/06",t:"16:00",g:"I",h:"Senegal",a:"Irak"},
  {n:63,d:"26/06",t:"00:00",g:"G",h:"Nueva Zelanda",a:"Bélgica"},{n:64,d:"26/06",t:"00:00",g:"G",h:"Egipto",a:"Irán"},
  {n:65,d:"26/06",t:"21:00",g:"H",h:"Uruguay",a:"España"},{n:66,d:"26/06",t:"21:00",g:"H",h:"Cabo Verde",a:"Arabia Saudita"},
  {n:67,d:"27/06",t:"18:00",g:"L",h:"Panamá",a:"Inglaterra"},{n:68,d:"27/06",t:"18:00",g:"L",h:"Croacia",a:"Ghana"},
  {n:69,d:"27/06",t:"23:00",g:"J",h:"Jordania",a:"Argentina"},{n:70,d:"27/06",t:"23:00",g:"J",h:"Argelia",a:"Austria"},
  {n:71,d:"27/06",t:"20:30",g:"K",h:"Colombia",a:"Portugal"},{n:72,d:"27/06",t:"20:30",g:"K",h:"RD Congo",a:"Uzbekistán"},
];
const FL={"México":"🇲🇽","Sudáfrica":"🇿🇦","Corea del Sur":"🇰🇷","Chequia":"🇨🇿","Canadá":"🇨🇦","Bosnia":"🇧🇦","Qatar":"🇶🇦","Suiza":"🇨🇭","Brasil":"🇧🇷","Marruecos":"🇲🇦","Haití":"🇭🇹","Escocia":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Estados Unidos":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Turquía":"🇹🇷","Alemania":"🇩🇪","Curazao":"🇨🇼","Costa de Marfil":"🇨🇮","Ecuador":"🇪🇨","Países Bajos":"🇳🇱","Japón":"🇯🇵","Suecia":"🇸🇪","Túnez":"🇹🇳","España":"🇪🇸","Cabo Verde":"🇨🇻","Arabia Saudita":"🇸🇦","Uruguay":"🇺🇾","Bélgica":"🇧🇪","Egipto":"🇪🇬","Irán":"🇮🇷","Nueva Zelanda":"🇳🇿","Francia":"🇫🇷","Senegal":"🇸🇳","Irak":"🇮🇶","Noruega":"🇳🇴","Argentina":"🇦🇷","Argelia":"🇩🇿","Austria":"🇦🇹","Jordania":"🇯🇴","Inglaterra":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croacia":"🇭🇷","Ghana":"🇬🇭","Panamá":"🇵🇦","Portugal":"🇵🇹","RD Congo":"🇨🇩","Uzbekistán":"🇺🇿","Colombia":"🇨🇴"};
const ADMIN_U="admin",ADMIN_P="prode2026admin";
const LOCK=new Date("2026-06-09T00:00:00-03:00");
const FEE=25000;
const fmt$=n=>"$"+n.toLocaleString("es-AR");

/* Scoring */
function calcPts(p,r){
  if(p.h===""||p.a===""||r.h===""||r.a==="")return null;
  const ph=+p.h,pa=+p.a,rh=+r.h,ra=+r.a;
  if([ph,pa,rh,ra].some(isNaN))return null;
  if(ph===rh&&pa===ra)return 3;
  if((ph>pa&&rh>ra)||(ph<pa&&rh<ra)||(ph===pa&&rh===ra))return 1;
  return 0;
}
function streak(points){let b=0,s=0;for(const p of points){if(p===3)s++;else s=0;if(s===3)b+=1;if(s===5)b+=3;}return b;}
function calcTotal(preds,res){
  const p=M.map(m=>calcPts(preds[m.n]||{h:"",a:""},res[m.n]||{h:"",a:""}));
  return{mp:p.reduce((s,v)=>s+(v??0),0),bo:streak(p.map(v=>v??-1)),tot:p.reduce((s,v)=>s+(v??0),0)+streak(p.map(v=>v??-1)),ex:p.filter(v=>v===3).length,si:p.filter(v=>v===1).length,p};
}

/* CSS */
const css=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
:root{--bg:#050c18;--bg2:#0b1829;--bg3:rgba(12,22,40,0.85);--border:#162845;--gold:#d4a843;--gold2:#f0d060;--red:#dc3545;--green:#22c55e;--orange:#f59e0b;--txt:#c8d6e5;--txt2:#6b8299;--txt3:#3d556b;--white:#f0f4f8;}
*{margin:0;padding:0;box-sizing:border-box;}body{background:var(--bg);color:var(--txt);font-family:'DM Sans',sans-serif;}input,button,select{font-family:inherit;}
::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-thumb{background:#1e3350;border-radius:3px;}
.fade-in{animation:fadeIn .4s ease;}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.hdr{font-family:'Bebas Neue',sans-serif;letter-spacing:2px;color:var(--gold);}
.card{background:var(--bg3);border:1px solid var(--border);border-radius:14px;padding:20px;backdrop-filter:blur(12px);}
.btn-gold{background:linear-gradient(135deg,var(--gold),var(--gold2));color:var(--bg);border:none;border-radius:8px;padding:10px 28px;font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:1.5px;cursor:pointer;transition:transform .15s,box-shadow .15s;}
.btn-gold:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(212,168,67,.3);}
.btn-gold:disabled{opacity:.5;cursor:default;transform:none;box-shadow:none;}
.btn-red{background:var(--red);color:#fff;border:none;border-radius:8px;padding:10px 28px;font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:1.5px;cursor:pointer;}
.btn-sm{padding:4px 12px;font-size:12px;border-radius:5px;cursor:pointer;font-weight:600;border:none;transition:all .15s;}
.inp{width:100%;padding:11px 14px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--white);font-size:14px;outline:none;transition:border .2s;}.inp:focus{border-color:var(--gold);}
.score-inp{width:38px;height:38px;text-align:center;background:var(--bg);border:2px solid rgba(212,168,67,.25);border-radius:7px;color:var(--white);font-size:17px;font-weight:700;outline:none;transition:border .2s;}.score-inp:focus{border-color:var(--gold);}.score-inp:disabled{border-color:var(--border);opacity:.6;}
.tag{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;display:inline-block;}
.match-row{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;background:var(--bg3);border:1px solid var(--border);transition:border .2s;}.match-row:hover{border-color:#1e3855;}
.nav-btn{background:transparent;color:var(--txt2);border:1px solid var(--border);border-radius:7px;padding:7px 16px;font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:1px;cursor:pointer;transition:all .2s;}.nav-btn.active{background:var(--gold);color:var(--bg);border-color:var(--gold);}.nav-btn:hover:not(.active){border-color:var(--gold);color:var(--gold);}
.filter-btn{background:transparent;color:var(--txt3);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;font-weight:600;transition:all .15s;}.filter-btn.active{background:var(--gold);color:var(--bg);border-color:var(--gold);}
@media(max-width:640px){.match-row{flex-wrap:wrap;justify-content:center;}.match-teams{min-width:100%!important;justify-content:center;}}
`;

function Header({user,isAdmin,onLogout,view,setView}){
  const locked=new Date()>=LOCK;
  const items=[{id:"home",l:"Inicio"},{id:"preds",l:"Predicciones"},{id:"table",l:"Tabla"},{id:"compare",l:"Comparar"},{id:"rules",l:"Reglas"}];
  return(
    <header style={{background:"linear-gradient(135deg,#070e1c,#0f2240,#091630)",borderBottom:"2px solid var(--gold)",position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setView("home")}>
          <span style={{fontSize:26}}>⚽</span>
          <div><div className="hdr" style={{fontSize:19}}>PRODE MUNDIAL 2026</div><div style={{fontSize:9,color:"var(--txt3)",letterSpacing:4}}>USA • MÉXICO • CANADÁ</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
          {items.map(v=><button key={v.id} className={`nav-btn${view===v.id?" active":""}`} onClick={()=>setView(v.id)}>{v.l}</button>)}
          {isAdmin&&<button className={`nav-btn${view==="admin"?" active":""}`} onClick={()=>setView("admin")} style={{color:view==="admin"?"#fff":"var(--red)",borderColor:"var(--red)",background:view==="admin"?"var(--red)":"transparent"}}>Admin</button>}
          <div style={{display:"flex",alignItems:"center",gap:6,marginLeft:6}}>
            <span style={{color:"var(--gold)",fontSize:12,fontWeight:700}}>{user}</span>
            {locked&&<span className="tag" style={{background:"var(--red)",color:"#fff",fontSize:8,animation:"pulse 2s infinite"}}>LOCKED</span>}
            <button onClick={onLogout} style={{background:"transparent",color:"var(--txt3)",border:"1px solid var(--border)",borderRadius:4,padding:"3px 8px",fontSize:10,cursor:"pointer"}}>Salir</button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Login({onLogin}){
  const[mode,setMode]=useState("login");
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  const[err,setErr]=useState("");
  const[loading,setLoading]=useState(false);
  const go=async()=>{
    if(mode==="register"&&(!name.trim()||!email.trim()||!pass.trim())){setErr("Completá todos los campos");return;}
    if(mode==="login"&&(!email.trim()||!pass.trim())){setErr("Completá email y contraseña");return;}
    setLoading(true);setErr("");
    if(email.trim().toLowerCase()===ADMIN_U&&pass===ADMIN_P){onLogin(ADMIN_U,true);setLoading(false);return;}
    const users=await dbGet("users")||{};
    const key=email.trim().toLowerCase();
    if(mode==="register"){
      if(Object.values(users).some(u=>u.email===key)){setErr("Ese email ya está registrado");setLoading(false);return;}
      const id=name.trim().toLowerCase().replace(/[^a-z0-9]/g,"")+"_"+Date.now().toString(36);
      users[id]={pass,name:name.trim(),email:key,approved:false,paid:false,created:Date.now()};
      await dbSet("users",users);onLogin(id,false);
    }else{
      const entry=Object.entries(users).find(([,u])=>u.email===key&&u.pass===pass);
      if(!entry){setErr("Email o contraseña incorrectos");setLoading(false);return;}
      onLogin(entry[0],false);
    }
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 30% 20%,#0d1f3a,#050c18 70%)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{css}</style>
      <div style={{width:"100%",maxWidth:400}} className="fade-in">
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:56,marginBottom:4}}>⚽</div>
          <h1 className="hdr" style={{fontSize:42,margin:0}}>PRODE MUNDIAL</h1>
          <h2 className="hdr" style={{fontSize:64,color:"var(--white)",margin:"-4px 0 2px",letterSpacing:4}}>2026</h2>
          <p style={{color:"var(--txt3)",fontSize:11,letterSpacing:6}}>USA • MÉXICO • CANADÁ</p>
        </div>
        <div className="card" style={{padding:28}}>
          <div style={{display:"flex",marginBottom:22,borderRadius:7,overflow:"hidden",border:"1px solid var(--border)"}}>
            {["login","register"].map(m=>(<button key={m} onClick={()=>{setMode(m);setErr("")}} style={{flex:1,padding:"9px 0",background:mode===m?"var(--gold)":"transparent",color:mode===m?"var(--bg)":"var(--txt3)",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:1,cursor:"pointer"}}>{m==="login"?"ENTRAR":"REGISTRARME"}</button>))}
          </div>
          {mode==="register"&&<div style={{marginBottom:14}}><label style={{color:"var(--txt3)",fontSize:10,letterSpacing:2,display:"block",marginBottom:5}}>NOMBRE</label><input className="inp" value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre o apodo"/></div>}
          <div style={{marginBottom:14}}><label style={{color:"var(--txt3)",fontSize:10,letterSpacing:2,display:"block",marginBottom:5}}>EMAIL</label><input className="inp" type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="tu@email.com"/></div>
          <div style={{marginBottom:18}}><label style={{color:"var(--txt3)",fontSize:10,letterSpacing:2,display:"block",marginBottom:5}}>CONTRASEÑA</label><input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="••••••"/></div>
          {err&&<div style={{color:"var(--red)",fontSize:12,textAlign:"center",marginBottom:10}}>{err}</div>}
          <button className="btn-gold" onClick={go} disabled={loading} style={{width:"100%",fontSize:16}}>{loading?"...":mode==="login"?"ENTRAR":"REGISTRARME"}</button>
          {mode==="register"&&<div style={{marginTop:14,background:"rgba(212,168,67,.08)",border:"1px solid rgba(212,168,67,.25)",borderRadius:8,padding:14}}><p style={{color:"var(--gold)",fontSize:13,fontWeight:700,textAlign:"center",marginBottom:8}}>💰 PARA PODER JUGAR</p><p style={{color:"var(--txt)",fontSize:12,textAlign:"center",lineHeight:1.6}}>Transferí <strong style={{color:"var(--gold)"}}>$25.000</strong> a este alias de Mercado Pago:</p><div style={{background:"rgba(0,0,0,.3)",borderRadius:6,padding:"8px 12px",margin:"8px 0",textAlign:"center"}}><span style={{color:"var(--white)",fontFamily:"Bebas Neue,sans-serif",fontSize:20,letterSpacing:2}}>fran.quiros.mp</span></div><p style={{color:"var(--txt)",fontSize:12,textAlign:"center",lineHeight:1.6}}>Después mandá el comprobante al <strong style={{color:"var(--white)"}}>2235638732</strong></p><p style={{color:"var(--txt3)",fontSize:10,textAlign:"center",marginTop:6}}>El organizador te habilita cuando confirme el pago.</p></div>}
        </div>
      </div>
    </div>
  );
}

function Home({users,results}){
  const paid=Object.values(users).filter(u=>u.paid).length;
  const pool=paid*FEE;
  const approved=Object.values(users).filter(u=>u.approved).length;
  const played=M.filter(m=>results[m.n]&&results[m.n].h!==""&&results[m.n].a!=="").length;
  const locked=new Date()>=LOCK;
  return(
    <div style={{maxWidth:820,margin:"0 auto",padding:"28px 16px"}} className="fade-in">
      <div style={{textAlign:"center",marginBottom:28}}><h2 className="hdr" style={{fontSize:30}}>BIENVENIDO AL PRODE</h2><p style={{color:"var(--txt2)",fontSize:13,marginTop:4}}>Fase de Grupos • 72 partidos • 12 grupos</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14,marginBottom:28}}>
        {[{i:"🏆",l:"POZO",v:fmt$(pool),s:`${paid} pagaron`},{i:"👥",l:"JUGADORES",v:approved,s:"habilitados"},{i:"⚽",l:"PARTIDOS",v:`${played}/72`,s:"jugados"},{i:locked?"🔒":"✏️",l:"PREDICCIONES",v:locked?"LOCKED":"ABIERTAS",s:locked?"Desde 9/06":"Hasta 9/06"}].map((c,i)=>(
          <div key={i} className="card" style={{textAlign:"center",padding:18}}><div style={{fontSize:26,marginBottom:4}}>{c.i}</div><div style={{color:"var(--txt3)",fontSize:9,letterSpacing:2}}>{c.l}</div><div className="hdr" style={{fontSize:26,color:"var(--white)"}}>{c.v}</div><div style={{color:"var(--txt3)",fontSize:10}}>{c.s}</div></div>
        ))}
      </div>
      <div className="card">
        <h3 className="hdr" style={{fontSize:18,marginBottom:14}}>💰 PREMIOS</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[{p:"🥇 1°",pct:70,c:"#FFD700"},{p:"🥈 2°",pct:20,c:"#C0C0C0"},{p:"🥉 3°",pct:10,c:"#CD7F32"}].map(x=>(
            <div key={x.p} style={{textAlign:"center",padding:14,background:"rgba(0,0,0,.25)",borderRadius:8,border:`1px solid ${x.c}22`}}><div style={{fontSize:18}}>{x.p}</div><div className="hdr" style={{fontSize:22,color:x.c}}>{fmt$(Math.floor(pool*x.pct/100))}</div><div style={{color:"var(--txt3)",fontSize:10}}>{x.pct}%</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Preds({currentUser,results}){
  const[preds,setPreds]=useState({});const[saving,setSaving]=useState(false);const[saved,setSaved]=useState(false);const[filter,setFilter]=useState("all");
  const locked=new Date()>=LOCK;
  useEffect(()=>{(async()=>{const d=await dbGet(`preds-${currentUser}`);if(d)setPreds(d)})()},[currentUser]);
  const chg=(n,side,val)=>{if(locked)return;const v=val.replace(/[^0-9]/g,"").slice(0,2);setPreds(p=>({...p,[n]:{...(p[n]||{h:"",a:""}),[side]:v}}));setSaved(false);};
  const save=async()=>{setSaving(true);await dbSet(`preds-${currentUser}`,preds);setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2500)};
  const groups=[...new Set(M.map(m=>m.g))].sort();
  const filtered=filter==="all"?M:M.filter(m=>m.g===filter);
  const filled=M.filter(m=>preds[m.n]&&preds[m.n].h!==""&&preds[m.n].a!=="").length;
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}} className="fade-in">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
        <div><h2 className="hdr" style={{fontSize:24}}>MIS PREDICCIONES</h2><p style={{color:"var(--txt2)",fontSize:11,marginTop:2}}>{filled}/72 completados{locked?" • 🔒 Bloqueado":""}</p></div>
        {!locked&&<button className="btn-gold" onClick={save} disabled={saving} style={{background:saved?"var(--green)":"",color:saved?"#fff":""}}>{saving?"Guardando...":saved?"✓ Guardado":"GUARDAR"}</button>}
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:14}}>
        <button className={`filter-btn${filter==="all"?" active":""}`} onClick={()=>setFilter("all")}>Todos</button>
        {groups.map(g=><button key={g} className={`filter-btn${filter===g?" active":""}`} onClick={()=>setFilter(g)}>{g}</button>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {filtered.map(m=>{const p=preds[m.n]||{h:"",a:""};const r=results[m.n]||{h:"",a:""};const pt=calcPts(p,r);const hasR=r.h!==""&&r.a!=="";
          return(<div key={m.n} className="match-row"><div style={{width:34,textAlign:"center"}}><div style={{color:"var(--txt3)",fontSize:10,fontWeight:600}}>#{m.n}</div><div style={{color:"var(--txt3)",fontSize:9}}>{m.d}</div></div>
            <span className="tag" style={{background:"var(--border)",color:"var(--gold)",fontSize:9}}>G{m.g}</span>
            <div className="match-teams" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,minWidth:250}}>
              <span style={{fontSize:12,color:"var(--txt)",textAlign:"right",flex:1,fontWeight:500}}>{FL[m.h]||""} {m.h}</span>
              <input className="score-inp" value={p.h} onChange={e=>chg(m.n,"h",e.target.value)} disabled={locked} placeholder="-" maxLength={2}/>
              <span style={{color:"var(--txt3)",fontSize:11,fontWeight:700}}>–</span>
              <input className="score-inp" value={p.a} onChange={e=>chg(m.n,"a",e.target.value)} disabled={locked} placeholder="-" maxLength={2}/>
              <span style={{fontSize:12,color:"var(--txt)",textAlign:"left",flex:1,fontWeight:500}}>{m.a} {FL[m.a]||""}</span>
            </div>
            {hasR&&<div style={{display:"flex",alignItems:"center",gap:5,minWidth:85}}><span style={{color:"var(--txt3)",fontSize:10}}>Real {r.h}-{r.a}</span>{pt!==null&&<span className="tag" style={{background:pt===3?"var(--green)":pt===1?"var(--orange)":"var(--red)",color:"#fff"}}>{pt===3?"EXACTO":pt===1?"SIGNO":"✗"}</span>}</div>}
          </div>);
        })}
      </div>
      {!locked&&<div style={{textAlign:"center",marginTop:18}}><button className="btn-gold" onClick={save} disabled={saving} style={{background:saved?"var(--green)":"",color:saved?"#fff":"",fontSize:16,padding:"12px 40px"}}>{saving?"Guardando...":saved?"✓ Guardado":"GUARDAR PREDICCIONES"}</button></div>}
    </div>
  );
}

function Table({users,results,currentUser}){
  const locked=new Date()>=LOCK;const[allPreds,setAllPreds]=useState({});const[loading,setLoading]=useState(true);
  useEffect(()=>{(async()=>{setLoading(true);const ap={};for(const u of Object.keys(users)){ap[u]=await dbGet(`preds-${u}`)||{}}setAllPreds(ap);setLoading(false)})()},[users]);
  const paid=Object.values(users).filter(u=>u.paid).length;const pool=paid*FEE;
  const ranks=useMemo(()=>Object.entries(users).filter(([,u])=>u.approved).map(([id,u])=>({id,name:u.name,paid:u.paid,...calcTotal(allPreds[id]||{},results)})).sort((a,b)=>b.tot-a.tot||b.ex-a.ex),[users,allPreds,results]);
  const myStats=calcTotal(allPreds[currentUser]||{},results);const myPaid=users[currentUser]?.paid;
  if(!locked)return(<div style={{maxWidth:700,margin:"0 auto",padding:"50px 20px",textAlign:"center"}} className="fade-in"><div style={{fontSize:56,marginBottom:12}}>🔒</div><h2 className="hdr" style={{fontSize:28}}>TABLA BLOQUEADA</h2><p style={{color:"var(--txt2)",fontSize:14,marginTop:8}}>Se habilita el 9 de junio.</p>
    <div className="card" style={{maxWidth:380,margin:"28px auto 0"}}><h3 className="hdr" style={{margin:"0 0 10px"}}>💰 POZO</h3><div className="hdr" style={{fontSize:38,color:"var(--white)"}}>{fmt$(pool)}</div><div style={{color:"var(--txt3)",fontSize:11,marginTop:2}}>{paid} pagaron</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:14}}>{[{l:"🥇",p:70,c:"#FFD700"},{l:"🥈",p:20,c:"#C0C0C0"},{l:"🥉",p:10,c:"#CD7F32"}].map(x=>(<div key={x.l} style={{textAlign:"center"}}><div>{x.l}</div><div className="hdr" style={{fontSize:16,color:x.c}}>{fmt$(Math.floor(pool*x.p/100))}</div></div>))}</div></div></div>);
  if(loading)return<div style={{textAlign:"center",padding:60,color:"var(--txt2)"}}>Cargando tabla...</div>;
  const paidRanks=ranks.filter(r=>r.paid);
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}} className="fade-in">
      <h2 className="hdr" style={{fontSize:26,textAlign:"center"}}>🏆 TABLA GENERAL</h2>
      <p style={{color:"var(--txt2)",fontSize:11,textAlign:"center",margin:"4px 0 18px"}}>Pozo: {fmt$(pool)} • 1°: {fmt$(Math.floor(pool*.7))} • 2°: {fmt$(Math.floor(pool*.2))} • 3°: {fmt$(Math.floor(pool*.1))}</p>
      {!myPaid&&users[currentUser]?.approved&&(<div className="card" style={{borderColor:"var(--red)",marginBottom:18,textAlign:"center"}}><p style={{color:"var(--red)",fontSize:12,fontWeight:600}}>No aparecés en la tabla porque no pagaste.</p><div style={{display:"flex",justifyContent:"center",gap:20,marginTop:8}}>{[{v:myStats.tot,l:"total"},{v:myStats.ex,l:"exactos"},{v:myStats.bo,l:"bonus"}].map(x=>(<div key={x.l}><span className="hdr" style={{fontSize:22,color:"var(--white)"}}>{x.v}</span> <span style={{color:"var(--txt3)",fontSize:10}}>{x.l}</span></div>))}</div></div>)}
      <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:"var(--bg2)"}}>{["#","Participante","Pts","Bonus","Total","Exactos","Signos"].map(h=>(<th key={h} style={{padding:"9px 7px",color:"var(--txt3)",fontSize:10,letterSpacing:1,borderBottom:"2px solid var(--border)",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif"}}>{h}</th>))}</tr></thead>
        <tbody>{paidRanks.map((r,i)=>{const me=r.id===currentUser;const bg=i===0?"rgba(212,168,67,.1)":i===1?"rgba(192,192,192,.06)":i===2?"rgba(205,127,50,.06)":me?"rgba(46,117,182,.08)":"transparent";const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":"";
          return(<tr key={r.id} style={{background:bg,borderBottom:"1px solid var(--border)"}}><td style={{padding:"9px 7px",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontWeight:700,color:"var(--gold)"}}>{medal}{i+1}</td><td style={{padding:"9px 7px",color:me?"var(--gold)":"var(--txt)",fontWeight:me?700:400}}>{r.name}{me?" (Vos)":""}</td><td style={{padding:"9px 7px",textAlign:"center",color:"var(--txt2)"}}>{r.mp}</td><td style={{padding:"9px 7px",textAlign:"center",color:r.bo>0?"var(--green)":"var(--txt3)"}}>{r.bo>0?`+${r.bo}`:0}</td><td style={{padding:"9px 7px",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:20,fontWeight:700,color:"var(--white)"}}>{r.tot}</td><td style={{padding:"9px 7px",textAlign:"center",color:"var(--green)"}}>{r.ex}</td><td style={{padding:"9px 7px",textAlign:"center",color:"var(--orange)"}}>{r.si}</td></tr>);
        })}</tbody></table>{paidRanks.length===0&&<p style={{textAlign:"center",color:"var(--txt3)",padding:30}}>Todavía nadie pagó.</p>}</div>
    </div>
  );
}

function Compare({users,results}){
  const locked=new Date()>=LOCK;const[allPreds,setAllPreds]=useState({});const[sel,setSel]=useState("");const[loading,setLoading]=useState(true);
  useEffect(()=>{(async()=>{setLoading(true);const ap={};for(const u of Object.keys(users)){ap[u]=await dbGet(`preds-${u}`)||{}}setAllPreds(ap);setLoading(false)})()},[users]);
  if(!locked)return(<div style={{maxWidth:700,margin:"0 auto",padding:"50px 20px",textAlign:"center"}} className="fade-in"><div style={{fontSize:48,marginBottom:12}}>🔒</div><h2 className="hdr" style={{fontSize:24}}>PREDICCIONES BLOQUEADAS</h2><p style={{color:"var(--txt2)",fontSize:13,marginTop:8}}>Después del 9/06 podés ver lo que puso cada uno.</p></div>);
  if(loading)return<div style={{textAlign:"center",padding:60,color:"var(--txt2)"}}>Cargando...</div>;
  const approved=Object.entries(users).filter(([,u])=>u.approved);
  return(
    <div style={{maxWidth:950,margin:"0 auto",padding:"24px 16px"}} className="fade-in">
      <h2 className="hdr" style={{fontSize:24,textAlign:"center",marginBottom:16}}>👀 COMPARAR PREDICCIONES</h2>
      <div style={{marginBottom:18,textAlign:"center"}}><select value={sel} onChange={e=>setSel(e.target.value)} style={{padding:"8px 16px",background:"var(--bg)",border:"1px solid var(--border)",borderRadius:8,color:"var(--white)",fontSize:13,outline:"none",minWidth:200}}><option value="">— Elegí un participante —</option><option value="__ALL__">📊 Ver todos en tabla</option>{approved.map(([id,u])=><option key={id} value={id}>{u.name}</option>)}</select></div>
      {sel&&sel!=="__ALL__"&&(()=>{const up=allPreds[sel]||{};const u=users[sel];const stats=calcTotal(up,results);
        return(<div><div className="card" style={{marginBottom:16,textAlign:"center"}}><h3 className="hdr" style={{fontSize:18}}>{u?.name}</h3><div style={{display:"flex",justifyContent:"center",gap:20,marginTop:8}}>{[{v:stats.tot,l:"total"},{v:stats.ex,l:"exactos"},{v:stats.si,l:"signos"},{v:stats.bo,l:"bonus"}].map(x=>(<div key={x.l}><span className="hdr" style={{fontSize:22,color:"var(--white)"}}>{x.v}</span><br/><span style={{color:"var(--txt3)",fontSize:10}}>{x.l}</span></div>))}</div></div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>{M.map(m=>{const p=up[m.n]||{h:"",a:""};const r=results[m.n]||{h:"",a:""};const pt=calcPts(p,r);const hasR=r.h!==""&&r.a!=="";const hasPred=p.h!==""&&p.a!=="";
            return(<div key={m.n} className="match-row" style={{padding:"8px 12px"}}><span style={{color:"var(--txt3)",fontSize:10,width:28,textAlign:"center"}}>#{m.n}</span><span className="tag" style={{background:"var(--border)",color:"var(--gold)",fontSize:9}}>G{m.g}</span>
              <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,minWidth:200}}><span style={{fontSize:11,color:"var(--txt)",textAlign:"right",flex:1}}>{FL[m.h]||""} {m.h}</span><span style={{fontWeight:700,color:hasPred?"var(--white)":"var(--txt3)",fontSize:14,minWidth:40,textAlign:"center"}}>{hasPred?`${p.h} - ${p.a}`:"— —"}</span><span style={{fontSize:11,color:"var(--txt)",textAlign:"left",flex:1}}>{m.a} {FL[m.a]||""}</span></div>
              {hasR&&<div style={{display:"flex",alignItems:"center",gap:4}}><span style={{color:"var(--txt3)",fontSize:10}}>Real {r.h}-{r.a}</span>{pt!==null&&<span className="tag" style={{background:pt===3?"var(--green)":pt===1?"var(--orange)":"var(--red)",color:"#fff"}}>{pt===3?"+3":pt===1?"+1":"0"}</span>}</div>}</div>);})}</div></div>);})()}
      {sel==="__ALL__"&&(<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{background:"var(--bg2)"}}><th style={{padding:6,color:"var(--txt3)",position:"sticky",left:0,background:"var(--bg2)",textAlign:"left",minWidth:50}}>Partido</th><th style={{padding:6,color:"var(--txt3)",textAlign:"center",minWidth:60}}>Real</th>{approved.map(([id,u])=><th key={id} style={{padding:6,color:"var(--gold)",textAlign:"center",minWidth:55,fontSize:10}}>{u.name}</th>)}</tr></thead>
        <tbody>{M.map(m=>{const r=results[m.n]||{h:"",a:""};const hasR=r.h!==""&&r.a!=="";
          return(<tr key={m.n} style={{borderBottom:"1px solid var(--border)"}}><td style={{padding:"5px 6px",position:"sticky",left:0,background:"var(--bg)",fontSize:10,whiteSpace:"nowrap"}}>{FL[m.h]||""}{m.h} vs {m.a}{FL[m.a]||""}</td><td style={{padding:"5px 6px",textAlign:"center",fontWeight:700,color:hasR?"var(--white)":"var(--txt3)"}}>{hasR?`${r.h}-${r.a}`:"—"}</td>
            {approved.map(([id])=>{const p=(allPreds[id]||{})[m.n]||{h:"",a:""};const pt=calcPts(p,r);const hasPred=p.h!==""&&p.a!=="";const bg=pt===3?"rgba(34,197,94,.15)":pt===1?"rgba(245,158,11,.1)":pt===0?"rgba(220,53,69,.08)":"transparent";return<td key={id} style={{padding:"5px 6px",textAlign:"center",background:bg,color:hasPred?"var(--txt)":"var(--txt3)"}}>{hasPred?`${p.h}-${p.a}`:"—"}</td>})}</tr>);})}</tbody></table></div>)}
    </div>
  );
}

function Rules(){
  const sections=[
    {t:"Puntuación",items:["✅ 3 puntos — Resultado exacto (decís 2-1 y termina 2-1)","🟡 1 punto — Acertás el signo (decís 1-0 y termina 3-2, ganó el mismo)","❌ 0 puntos — No acertás nada"]},
    {t:"Bonus por Rachas de Exactos",items:["🔥 +1 punto extra por 3 resultados exactos seguidos","🔥🔥 +3 puntos extra por 5 resultados exactos seguidos","Solo cuentan los resultados EXACTOS (3 pts) para las rachas"]},
    {t:"Desempate",items:["🏆 Si dos personas empatan en puntos, gana quien tenga más resultados exactos"]},
    {t:"Plazos",items:["📅 Las predicciones se pueden cargar y editar hasta el 9 de junio","🔒 Después del 9/06 se bloquean y se habilita la tabla general","👀 Después del 9/06 podés ver las predicciones de todos en la sección Comparar"]},
    {t:"Premios",items:["💰 La inscripción es de $25.000 por persona","🥇 1er puesto → 70% del pozo total","🥈 2do puesto → 20% del pozo total","🥉 3er puesto → 10% del pozo total","Si no pagás podés jugar y ver tus puntos, pero no aparecés en la tabla ni ganás premios"]},
  ];
  return(
    <div style={{maxWidth:700,margin:"0 auto",padding:"28px 16px"}} className="fade-in">
      <h2 className="hdr" style={{fontSize:28

function Admin({users,setUsers,results,setResults}){
  const[tab,setTab]=useState("users");const[saving,setSaving]=useState(false);const[localR,setLocalR]=useState({...results});const[filter,setFilter]=useState("all");
  const approve=async(id)=>{const u={...users,[id]:{...users[id],approved:true}};setUsers(u);await dbSet("users",u)};
  const reject=async(id)=>{const u={...users,[id]:{...users[id],approved:false}};setUsers(u);await dbSet("users",u)};
  const pay=async(id,p)=>{const u={...users,[id]:{...users[id],paid:p}};setUsers(u);await dbSet("users",u)};
  const chgR=(n,side,val)=>{const v=val.replace(/[^0-9]/g,"").slice(0,2);setLocalR(p=>({...p,[n]:{...(p[n]||{h:"",a:""}),[side]:v}}))};
  const saveR=async()=>{setSaving(true);setResults(localR);await dbSet("results",localR);setSaving(false)};
  const paid=Object.values(users).filter(u=>u.paid).length;const pool=paid*FEE;const pending=Object.values(users).filter(u=>!u.approved).length;
  const groups=[...new Set(M.map(m=>m.g))].sort();const filteredM=filter==="all"?M:M.filter(m=>m.g===filter);
  return(
    <div style={{maxWidth:950,margin:"0 auto",padding:"24px 16px"}} className="fade-in">
      <h2 className="hdr" style={{fontSize:24,color:"var(--red)"}}>⚙️ ADMIN</h2>
      <div style={{display:"flex",gap:6,marginTop:12,marginBottom:18,flexWrap:"wrap"}}>
        {[{id:"users",l:`Usuarios${pending>0?` (${pending})`:""}`},{id:"results",l:"Resultados"},{id:"stats",l:"Stats"}].map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} className="nav-btn" style={{background:tab===t.id?"var(--red)":"transparent",color:tab===t.id?"#fff":"var(--red)",borderColor:"var(--red)"}}>{t.l}</button>))}
      </div>
      {tab==="users"&&<div>{Object.entries(users).sort(([,a],[,b])=>a.approved===b.approved?0:a.approved?1:-1).map(([id,u])=>(<div key={id} className="card" style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,padding:"10px 14px",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:140}}><span style={{color:"var(--white)",fontWeight:600,fontSize:13}}>{u.name}</span><span style={{color:"var(--txt3)",fontSize:10,marginLeft:6}}>{u.email}</span></div>
        <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
          {u.approved?<span className="tag" style={{background:"rgba(34,197,94,.15)",color:"var(--green)"}}>Habilitado</span>:<span className="tag" style={{background:"rgba(220,53,69,.15)",color:"var(--red)"}}>Pendiente</span>}
          {u.paid?<span className="tag" style={{background:"rgba(212,168,67,.15)",color:"var(--gold)"}}>💰 Pagó</span>:<span style={{color:"var(--txt3)",fontSize:10}}>No pagó</span>}
          {!u.approved&&<button className="btn-sm" style={{background:"var(--green)",color:"#fff"}} onClick={()=>approve(id)}>Habilitar</button>}
          {u.approved&&<button className="btn-sm" style={{background:"transparent",color:"var(--red)",border:"1px solid var(--red)"}} onClick={()=>reject(id)}>Deshabilitar</button>}
          {!u.paid&&u.approved&&<button className="btn-sm" style={{background:"var(--gold)",color:"var(--bg)"}} onClick={()=>pay(id,true)}>Marcar Pagó</button>}
          {u.paid&&<button className="btn-sm" style={{background:"transparent",color:"var(--gold)",border:"1px solid var(--gold)"}} onClick={()=>pay(id,false)}>Quitar Pago</button>}
        </div></div>))}{Object.keys(users).length===0&&<p style={{textAlign:"center",color:"var(--txt3)",padding:30}}>No hay usuarios.</p>}</div>}
      {tab==="results"&&<div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}><button className={`filter-btn${filter==="all"?" active":""}`} onClick={()=>setFilter("all")} style={filter==="all"?{background:"var(--red)",borderColor:"var(--red)"}:{}}>Todos</button>{groups.map(g=><button key={g} className={`filter-btn${filter===g?" active":""}`} onClick={()=>setFilter(g)} style={filter===g?{background:"var(--red)",borderColor:"var(--red)"}:{}}>G{g}</button>)}</div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>{filteredM.map(m=>{const r=localR[m.n]||{h:"",a:""};return(<div key={m.n} className="match-row" style={{padding:"8px 12px"}}><span style={{color:"var(--txt3)",fontSize:10,width:28}}>#{m.n}</span><span className="tag" style={{background:"var(--border)",color:"var(--red)",fontSize:9}}>G{m.g}</span>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,minWidth:220}}><span style={{fontSize:11,color:"var(--txt)",textAlign:"right",flex:1}}>{FL[m.h]||""} {m.h}</span><input className="score-inp" value={r.h} onChange={e=>chgR(m.n,"h",e.target.value)} placeholder="-" maxLength={2} style={{borderColor:"rgba(220,53,69,.3)"}}/><span style={{color:"var(--txt3)",fontSize:10}}>–</span><input className="score-inp" value={r.a} onChange={e=>chgR(m.n,"a",e.target.value)} placeholder="-" maxLength={2} style={{borderColor:"rgba(220,53,69,.3)"}}/><span style={{fontSize:11,color:"var(--txt)",textAlign:"left",flex:1}}>{m.a} {FL[m.a]||""}</span></div></div>);})}</div>
        <div style={{textAlign:"center",marginTop:14}}><button className="btn-red" onClick={saveR} disabled={saving}>{saving?"Guardando...":"GUARDAR RESULTADOS"}</button></div></div>}
      {tab==="stats"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10}}>{[{l:"Registrados",v:Object.keys(users).length},{l:"Habilitados",v:Object.values(users).filter(u=>u.approved).length},{l:"Pagaron",v:paid},{l:"Pendientes",v:pending},{l:"Pozo",v:fmt$(pool)},{l:"1°",v:fmt$(Math.floor(pool*.7))},{l:"2°",v:fmt$(Math.floor(pool*.2))},{l:"3°",v:fmt$(Math.floor(pool*.1))}].map(s=>(<div key={s.l} className="card" style={{textAlign:"center",padding:14}}><div style={{color:"var(--txt3)",fontSize:9,letterSpacing:2}}>{s.l}</div><div className="hdr" style={{fontSize:24,color:"var(--white)"}}>{s.v}</div></div>))}</div>}
    </div>
  );
}

export default function App(){
  const[user,setUser]=useState(null);const[isAdmin,setIsAdmin]=useState(false);const[users,setUsers]=useState({});const[results,setResults]=useState({});const[view,setView]=useState("home");const[loading,setLoading]=useState(true);
  useEffect(()=>{(async()=>{const u=await dbGet("users");if(u)setUsers(u);const r=await dbGet("results");if(r)setResults(r);
    const sess=JSON.parse(localStorage.getItem("prode-session")||"null");if(sess){setUser(sess.user);setIsAdmin(sess.isAdmin);}setLoading(false)})()},[]);
  useEffect(()=>{if(!user)return;const iv=setInterval(async()=>{const u=await dbGet("users");if(u)setUsers(u);const r=await dbGet("results");if(r)setResults(r)},15000);return()=>clearInterval(iv)},[user]);
  const login=async(id,admin)=>{setUser(id);setIsAdmin(admin);localStorage.setItem("prode-session",JSON.stringify({user:id,isAdmin:admin}));const u=await dbGet("users");if(u)setUsers(u);const r=await dbGet("results");if(r)setResults(r)};
  const logout=()=>{setUser(null);setIsAdmin(false);setView("home");localStorage.removeItem("prode-session")};
  if(loading)return(<div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center"}}><style>{css}</style><div style={{textAlign:"center"}}><div style={{fontSize:48}}>⚽</div><div className="hdr" style={{fontSize:20,marginTop:8,animation:"pulse 1.5s infinite"}}>CARGANDO...</div></div></div>);
  if(!user)return<><style>{css}</style><Login onLogin={login}/></>;
  const approved=isAdmin||users[user]?.approved;
  return(
    <div style={{minHeight:"100vh",background:"var(--bg)"}}><style>{css}</style>
      <Header user={isAdmin?"ADMIN":users[user]?.name||user} isAdmin={isAdmin} onLogout={logout} view={view} setView={setView}/>
      {!approved&&!isAdmin?(<div style={{textAlign:"center",padding:50}} className="fade-in"><div style={{fontSize:48,marginBottom:12}}>⏳</div><h2 className="hdr" style={{fontSize:24}}>ESPERANDO APROBACIÓN</h2><p style={{color:"var(--txt2)",fontSize:13,marginTop:6}}>El organizador tiene que habilitarte.</p></div>):(
        <>{view==="home"&&<Home users={users} results={results}/>}{view==="preds"&&!isAdmin&&<Preds currentUser={user} results={results}/>}{view==="preds"&&isAdmin&&<div style={{textAlign:"center",padding:50,color:"var(--txt2)"}}>Como admin, cargá resultados desde Admin.</div>}{view==="table"&&<Table users={users} results={results} currentUser={user}/>}{view==="compare"&&<Compare users={users} results={results}/>}{view==="rules"&&<Rules/>}{view==="admin"&&isAdmin&&<Admin users={users} setUsers={setUsers} results={results} setResults={setResults}/>}</>
      )}
    </div>
  );
}
