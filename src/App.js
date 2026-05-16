import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
const ADMIN_U="ranieri",ADMIN_P="R.anieri58";
const LOCK=new Date("2026-06-09T00:00:00-03:00");
const PAY_DL=new Date("2026-06-08T23:59:59-03:00");
const FEE=25000;
const fmt$=n=>"$"+n.toLocaleString("es-AR");
const AI_IDS=["claude_ai","gemini_ai","chatgpt_ai"];
const AI_INFO={claude_ai:{name:"Claude",flag:"🤖",color:"#d97706"},gemini_ai:{name:"Gemini",flag:"🔮",color:"#7c3aed"},chatgpt_ai:{name:"ChatGPT",flag:"🧠",color:"#16a34a"}};
const AI_PREDS={chatgpt_ai:{1:{h:"2",a:"0"},2:{h:"1",a:"1"},3:{h:"2",a:"1"},4:{h:"2",a:"0"},5:{h:"3",a:"1"},6:{h:"1",a:"2"},7:{h:"0",a:"2"},8:{h:"0",a:"1"},9:{h:"5",a:"0"},10:{h:"1",a:"1"},11:{h:"2",a:"1"},12:{h:"1",a:"0"},13:{h:"4",a:"0"},14:{h:"0",a:"2"},15:{h:"2",a:"0"},16:{h:"1",a:"0"},17:{h:"2",a:"1"},18:{h:"0",a:"2"},19:{h:"3",a:"0"},20:{h:"2",a:"0"},21:{h:"2",a:"1"},22:{h:"2",a:"1"},23:{h:"4",a:"0"},24:{h:"1",a:"2"},25:{h:"2",a:"0"},26:{h:"2",a:"1"},27:{h:"3",a:"1"},28:{h:"2",a:"1"},29:{h:"6",a:"0"},30:{h:"1",a:"1"},31:{h:"2",a:"1"},32:{h:"2",a:"1"},33:{h:"2",a:"1"},34:{h:"3",a:"0"},35:{h:"1",a:"0"},36:{h:"1",a:"2"},37:{h:"3",a:"0"},38:{h:"2",a:"0"},39:{h:"2",a:"1"},40:{h:"1",a:"1"},41:{h:"4",a:"0"},42:{h:"1",a:"1"},43:{h:"2",a:"0"},44:{h:"0",a:"1"},45:{h:"3",a:"1"},46:{h:"0",a:"2"},47:{h:"3",a:"1"},48:{h:"2",a:"0"},49:{h:"0",a:"3"},50:{h:"2",a:"0"},51:{h:"1",a:"1"},52:{h:"2",a:"0"},53:{h:"1",a:"1"},54:{h:"1",a:"1"},55:{h:"1",a:"3"},56:{h:"0",a:"2"},57:{h:"0",a:"2"},58:{h:"1",a:"1"},59:{h:"1",a:"2"},60:{h:"2",a:"1"},61:{h:"1",a:"2"},62:{h:"2",a:"0"},63:{h:"0",a:"4"},64:{h:"1",a:"1"},65:{h:"1",a:"2"},66:{h:"1",a:"1"},67:{h:"0",a:"4"},68:{h:"2",a:"1"},69:{h:"0",a:"5"},70:{h:"1",a:"2"},71:{h:"1",a:"2"},72:{h:"0",a:"1"}},gemini_ai:{1:{h:"2",a:"1"},2:{h:"1",a:"1"},3:{h:"2",a:"0"},4:{h:"3",a:"1"},5:{h:"2",a:"0"},6:{h:"1",a:"2"},7:{h:"0",a:"3"},8:{h:"1",a:"2"},9:{h:"4",a:"0"},10:{h:"1",a:"1"},11:{h:"2",a:"1"},12:{h:"2",a:"0"},13:{h:"3",a:"0"},14:{h:"0",a:"2"},15:{h:"2",a:"1"},16:{h:"1",a:"0"},17:{h:"3",a:"1"},18:{h:"0",a:"2"},19:{h:"3",a:"0"},20:{h:"2",a:"0"},21:{h:"1",a:"1"},22:{h:"2",a:"1"},23:{h:"4",a:"1"},24:{h:"0",a:"2"},25:{h:"2",a:"1"},26:{h:"2",a:"0"},27:{h:"3",a:"1"},28:{h:"1",a:"2"},29:{h:"5",a:"0"},30:{h:"1",a:"1"},31:{h:"2",a:"1"},32:{h:"2",a:"0"},33:{h:"2",a:"1"},34:{h:"3",a:"0"},35:{h:"2",a:"2"},36:{h:"0",a:"1"},37:{h:"2",a:"0"},38:{h:"4",a:"0"},39:{h:"3",a:"0"},40:{h:"0",a:"2"},41:{h:"4",a:"0"},42:{h:"1",a:"1"},43:{h:"2",a:"0"},44:{h:"1",a:"2"},45:{h:"3",a:"1"},46:{h:"0",a:"3"},47:{h:"2",a:"0"},48:{h:"3",a:"1"},49:{h:"0",a:"2"},50:{h:"4",a:"0"},51:{h:"1",a:"1"},52:{h:"2",a:"1"},53:{h:"1",a:"2"},54:{h:"0",a:"2"},55:{h:"1",a:"2"},56:{h:"0",a:"2"},57:{h:"0",a:"3"},58:{h:"1",a:"2"},59:{h:"1",a:"2"},60:{h:"1",a:"1"},61:{h:"0",a:"2"},62:{h:"3",a:"0"},63:{h:"0",a:"4"},64:{h:"1",a:"0"},65:{h:"1",a:"1"},66:{h:"1",a:"2"},67:{h:"0",a:"4"},68:{h:"2",a:"1"},69:{h:"0",a:"5"},70:{h:"1",a:"1"},71:{h:"1",a:"2"},72:{h:"1",a:"1"}},claude_ai:{}};


function calcPts(p,r){
  if(p.h===""||p.a===""||r.h===""||r.a==="")return null;
  const ph=+p.h,pa=+p.a,rh=+r.h,ra=+r.a;
  if([ph,pa,rh,ra].some(isNaN))return null;
  if(ph===rh&&pa===ra)return 3;
  if((ph>pa&&rh>ra)||(ph<pa&&rh<ra)||(ph===pa&&rh===ra))return 1;
  return 0;
}
function calcStreak(pts){
  // Bonus: EXACTOS SEGUIDOS only. Sign OR error breaks the bonus streak.
  // +1 at 3 exactos, +3 at 5 exactos, cycle resets at 5.
  // 10 exactos = 2 cycles of 5 = +8
  // Boost: active when 2+ exactos in a row, stays while NO ERROR (sign keeps boost), error kills boost.
  let bonus=0,s=0,ms3=0,ms5=0,ls=0,cur=0;
  let boostActive=false,boostLen=0;
  let sInCycle=0;
  for(const p of pts){
    if(p===3){
      s++;cur++;sInCycle++;
      if(sInCycle===3){bonus+=1;ms3++;}
      if(sInCycle===5){bonus+=3;ms5++;sInCycle=0;}
      if(s>=2){if(!boostActive)boostActive=true;boostLen++;}
    }else if(p===1){
      // Sign: BREAKS bonus streak, but boost stays active
      if(cur>ls)ls=cur;s=0;cur=0;sInCycle=0;
      // boost continues (not an error)
    }else{
      // Error: breaks everything including boost
      if(cur>ls)ls=cur;s=0;cur=0;sInCycle=0;
      boostActive=false;boostLen=0;
    }
  }
  if(cur>ls)ls=cur;
  return{bonus,ms3,ms5,ls,boostActive,boostLen};
}
function calcTotal(preds,res){
  const p=M.map(m=>calcPts(preds[m.n]||{h:"",a:""},res[m.n]||{h:"",a:""}));
  const mp=p.reduce((s,v)=>s+(v??0),0);
  const ex=p.filter(v=>v===3).length,si=p.filter(v=>v===1).length;
  const {bonus,ms3,ms5,ls}=calcStreak(p.map(v=>v??-1));
  const gf=M.reduce((s,m)=>{const pr=preds[m.n];return s+(pr&&pr.h!==""?+pr.h:0);},0);
  return{mp,bo:bonus,tot:mp+bonus,ex,si,ms3,ms5,ls,gf,pts:p};
}
function cmp(a,b){
  if(b.tot!==a.tot)return b.tot-a.tot;
  if(b.ex!==a.ex)return b.ex-a.ex;
  if(b.ms5!==a.ms5)return b.ms5-a.ms5;
  if(b.ms3!==a.ms3)return b.ms3-a.ms3;
  if(b.ls!==a.ls)return b.ls-a.ls;
  return b.gf-a.gf;
}

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
:root{--bg:#050c18;--bg2:#0b1829;--bg3:rgba(12,22,40,0.85);--bd:#162845;--gold:#d4a843;--gold2:#f0d060;--red:#dc3545;--grn:#22c55e;--org:#f59e0b;--txt:#c8d6e5;--txt2:#6b8299;--txt3:#3d556b;--wht:#f0f4f8;}
*{margin:0;padding:0;box-sizing:border-box;}body{background:var(--bg);color:var(--txt);font-family:'DM Sans',sans-serif;}input,button,select{font-family:inherit;}
::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-thumb{background:#1e3350;border-radius:3px;}
.fi{animation:fi .4s ease;}@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes pls{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes cf{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
@keyframes fp{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
@keyframes rd{0%{transform:translateY(-10px);opacity:.8}100%{transform:translateY(100vh);opacity:0}}
@keyframes bi{0%{transform:scale(.3);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
.hdr{font-family:'Bebas Neue',sans-serif;letter-spacing:2px;color:var(--gold);}
.card{background:var(--bg3);border:1px solid var(--bd);border-radius:14px;padding:20px;backdrop-filter:blur(12px);}
.bg{background:linear-gradient(135deg,var(--gold),var(--gold2));color:var(--bg);border:none;border-radius:8px;padding:10px 28px;font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:1.5px;cursor:pointer;transition:transform .15s,box-shadow .15s;}
.bg:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(212,168,67,.3);}
.bg:disabled{opacity:.5;cursor:default;transform:none;box-shadow:none;}
.br{background:var(--red);color:#fff;border:none;border-radius:8px;padding:10px 28px;font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:1.5px;cursor:pointer;}
.bsm{padding:4px 12px;font-size:12px;border-radius:5px;cursor:pointer;font-weight:600;border:none;transition:all .15s;}
.inp{width:100%;padding:11px 14px;background:var(--bg);border:1px solid var(--bd);border-radius:8px;color:var(--wht);font-size:14px;outline:none;transition:border .2s;}.inp:focus{border-color:var(--gold);}
.si{width:38px;height:38px;text-align:center;background:var(--bg);border:2px solid rgba(212,168,67,.25);border-radius:7px;color:var(--wht);font-size:17px;font-weight:700;outline:none;transition:border .2s;}.si:focus{border-color:var(--gold);}.si:disabled{border-color:var(--bd);opacity:.6;}
.tg{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;display:inline-block;}
.mr{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;background:var(--bg3);border:1px solid var(--bd);transition:border .2s;}.mr:hover{border-color:#1e3855;}
.nb{background:transparent;color:var(--txt2);border:1px solid var(--bd);border-radius:7px;padding:6px 12px;font-family:'Bebas Neue',sans-serif;font-size:11px;letter-spacing:1px;cursor:pointer;transition:all .2s;white-space:nowrap;}.nb.act{background:var(--gold);color:var(--bg);border-color:var(--gold);}.nb:hover:not(.act){border-color:var(--gold);color:var(--gold);}
.fb{background:transparent;color:var(--txt3);border:1px solid var(--bd);border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;font-weight:600;transition:all .15s;}.fb.act{background:var(--gold);color:var(--bg);border-color:var(--gold);}
.bex{background:rgba(34,197,94,.2);border:1px solid rgba(34,197,94,.4);color:#22c55e;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;}
.bsi{background:rgba(245,158,11,.2);border:1px solid rgba(245,158,11,.4);color:#f59e0b;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;}
.bms{background:rgba(220,53,69,.2);border:1px solid rgba(220,53,69,.4);color:#dc3545;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;}
.map-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:12px;align-items:start;}
@media(max-width:640px){.mr{flex-wrap:wrap;justify-content:center;}.map-grid{grid-template-columns:1fr;}}
`;

function Anim({type,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,3500);return()=>clearTimeout(t);},[onDone]);
  const base={position:"fixed",inset:0,zIndex:1000,pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"};
  if(type==="exact")return(
    <div style={base}>
      {[...Array(40)].map((_,i)=><div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-20px",fontSize:`${12+Math.random()*16}px`,animation:`cf ${1.5+Math.random()*2}s linear ${Math.random()*.5}s forwards`,opacity:0}}>{["🌟","⭐","✨","🎉","🏆","⚽"][Math.floor(Math.random()*6)]}</div>)}
      <div style={{background:"rgba(0,0,0,.9)",borderRadius:16,padding:"20px 40px",textAlign:"center",animation:"bi .4s ease",border:"2px solid #22c55e"}}>
        <div style={{fontSize:48,marginBottom:8}}>🎯</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"#22c55e",letterSpacing:3}}>RESULTADO EXACTO!</div>
        <div style={{color:"rgba(255,255,255,.7)",fontSize:14,marginTop:4}}>Sumás 3 puntos</div>
      </div>
    </div>
  );
  if(type==="sign")return(
    <div style={base}>
      {[...Array(20)].map((_,i)=><div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-20px",fontSize:20,animation:`cf ${2+Math.random()*1.5}s linear ${Math.random()*.8}s forwards`,opacity:0}}>🔥</div>)}
      <div style={{background:"rgba(0,0,0,.9)",borderRadius:16,padding:"20px 40px",textAlign:"center",animation:"bi .4s ease",border:"2px solid #f59e0b"}}>
        <div style={{fontSize:48,marginBottom:8,animation:"fp 1s infinite"}}>🔥</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"#f59e0b",letterSpacing:3}}>ACERTASTE EL SIGNO!</div>
        <div style={{color:"rgba(255,255,255,.7)",fontSize:14,marginTop:4}}>Sumás 1 punto</div>
      </div>
    </div>
  );
  if(type==="miss")return(
    <div style={base}>
      {[...Array(15)].map((_,i)=><div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-10px",fontSize:18,animation:`rd ${1+Math.random()}s linear ${Math.random()*.5}s forwards`,opacity:0}}>💧</div>)}
      <div style={{background:"rgba(0,0,0,.9)",borderRadius:16,padding:"20px 40px",textAlign:"center",animation:"bi .4s ease",border:"2px solid #dc3545"}}>
        <div style={{fontSize:48,marginBottom:8}}>😬</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"#dc3545",letterSpacing:3}}>ERRASTE!</div>
        <div style={{color:"rgba(255,255,255,.7)",fontSize:14,marginTop:4}}>Esta vez no sumás</div>
      </div>
    </div>
  );
  return null;
}

function PayBanner(){
  const now=new Date();
  if(now>PAY_DL)return null;
  const d=Math.ceil((PAY_DL-now)/(864e5));
  return(
    <div style={{background:"rgba(220,53,69,.08)",border:"1px solid rgba(220,53,69,.35)",borderRadius:12,padding:"14px 20px",margin:"0 auto 14px",maxWidth:700}}>
      <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
        <div style={{fontSize:22}}>⚠️</div>
        <div>
          <div style={{color:"#dc3545",fontWeight:700,fontSize:13,marginBottom:5}}>IMPORTANTE: Tenés hasta el 8 de junio para pagar ({d} día{d!==1?"s":""} restante{d!==1?"s":""})</div>
          <div style={{color:"var(--txt2)",fontSize:12,lineHeight:1.6}}>Transferí <strong style={{color:"var(--gold)"}}>$25.000</strong> al alias:</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6,flexWrap:"wrap"}}>
            <button onClick={()=>{navigator.clipboard.writeText("fran.quiros.mp").then(()=>{const el=document.getElementById("alias-copied");if(el){el.style.display="inline";setTimeout(()=>el.style.display="none",2000);}});}} style={{background:"rgba(0,0,0,.3)",padding:"5px 14px",borderRadius:6,fontFamily:"'Bebas Neue',sans-serif",fontSize:17,color:"var(--wht)",letterSpacing:2,border:"1px solid rgba(255,215,0,.3)",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
              fran.quiros.mp <span style={{fontSize:12}}>📋</span>
            </button>
            <span id="alias-copied" style={{display:"none",color:"var(--grn)",fontSize:11,fontWeight:700}}>✓ Copiado!</span>
            <a href="https://wa.me/542235638732" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:6,background:"#25D366",color:"#fff",padding:"5px 14px",borderRadius:6,fontSize:12,fontWeight:600,textDecoration:"none"}}>
              📲 Enviar comprobante
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hdr({user,isAdmin,onLogout,view,setView,adminMode,setAdminMode,onPreview}){
  const locked=new Date()>=LOCK;
  const[menuOpen,setMenuOpen]=useState(false);
  // Main nav - 5 items max, shown horizontally below logo on mobile
  const mainNav=[{id:"home",l:"Inicio"},{id:"bracket",l:"🏟️ Bracket"},{id:"compare",l:"Comparar"},{id:"ia",l:"🤖 IA"},{id:"map",l:"🌍 Mapa"}];
  // Hamburger - exclude items already in bottom nav (hoy, preds, table, chat, perfil)
  const moreNav=[{id:"h2h",l:"⚔️ H2H"},{id:"leagues",l:"🏅 Ligas"},{id:"thermo",l:"🌡️ Confianza"},{id:"buscar",l:"🔍 Buscar"},{id:"stats",l:"📊 Stats"},{id:"podio",l:"🏆 Podio"},{id:"rules",l:"Reglas"}];
  const activeInMore=moreNav.some(v=>v.id===view);
  return(
    <header style={{background:"linear-gradient(135deg,#070e1c,#0f2240,#091630)",borderBottom:"2px solid var(--gold)",position:"sticky",top:0,zIndex:100}}>
      {/* Row 1: Logo LEFT, user+hamburger RIGHT */}
      <div style={{padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setView("home")}>
          <span style={{fontSize:22}}>⚽</span>
          <div><div className="hdr" style={{fontSize:16,lineHeight:1}}>PRODE MUNDIAL 2026</div><div style={{fontSize:8,color:"var(--txt3)",letterSpacing:3}}>USA • MÉXICO • CANADÁ</div></div>
        </div>
        {/* Right side: user info + admin buttons + hamburger */}
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {isAdmin&&onPreview&&<button onClick={onPreview} style={{padding:"5px 8px",background:"#7c3aed",color:"#fff",border:"none",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:600}}>👁</button>}
          {isAdmin&&<button onClick={()=>setAdminMode(!adminMode)} style={{padding:"5px 8px",background:adminMode?"#7c3aed":"transparent",color:adminMode?"#fff":"#a78bfa",border:"1px solid #7c3aed44",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:600}}>{adminMode?"👑":"👤"}</button>}
          <span style={{color:"var(--gold)",fontSize:11,fontWeight:700}}>{user}</span>
          {locked&&<span className="tg" style={{background:"var(--red)",color:"#fff",fontSize:7,animation:"pls 2s infinite"}}>🔒</span>}
          <button onClick={onLogout} style={{background:"transparent",color:"var(--txt3)",border:"1px solid var(--bd)",borderRadius:4,padding:"3px 7px",fontSize:10,cursor:"pointer"}}>Salir</button>
          {/* Hamburger - always visible, top right */}
          <div style={{position:"relative"}}>
            <button onClick={()=>setMenuOpen(o=>!o)}
              style={{padding:"6px 12px",background:menuOpen||activeInMore?"rgba(212,168,67,.2)":"rgba(255,255,255,.08)",color:activeInMore?"var(--gold)":"var(--wht)",border:`1px solid ${activeInMore?"var(--gold)":"rgba(255,255,255,.2)"}`,borderRadius:7,fontSize:18,cursor:"pointer",lineHeight:1,fontWeight:300}}>
              ☰
            </button>
            {menuOpen&&<>
              <div onClick={()=>setMenuOpen(false)} style={{position:"fixed",inset:0,zIndex:199}}/>
              <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:"#0b1829",border:"1px solid var(--bd)",borderRadius:10,padding:8,minWidth:200,zIndex:200,boxShadow:"0 8px 30px rgba(0,0,0,.7)"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                  {moreNav.map(v=>(
                    <button key={v.id} onClick={()=>{setView(v.id);setMenuOpen(false);}}
                      style={{padding:"8px 10px",background:view===v.id?"var(--gold)":"var(--bg3)",color:view===v.id?"var(--bg)":"var(--txt)",border:`1px solid ${view===v.id?"var(--gold)":"var(--bd)"}`,borderRadius:7,fontSize:11,cursor:"pointer",textAlign:"left"}}>
                      {v.l}
                    </button>
                  ))}
                  {isAdmin&&<button onClick={()=>{setView("admin");setMenuOpen(false);}} style={{padding:"8px 10px",background:view==="admin"?"var(--red)":"var(--bg3)",color:view==="admin"?"#fff":"var(--red)",border:"1px solid var(--red)",borderRadius:7,fontSize:11,cursor:"pointer",gridColumn:"span 2"}}>⚙️ Admin</button>}
                </div>
              </div>
            </>}
          </div>
        </div>
      </div>
      {/* Row 2: Nav full width */}
      <div style={{display:"flex",borderTop:"1px solid var(--bd)",overflowX:"auto",WebkitOverflowScrolling:"touch"}} onMouseLeave={()=>{}}>
        {mainNav.map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)}
            style={{flex:1,minWidth:0,padding:"8px 4px",background:view===v.id?"rgba(212,168,67,.15)":"transparent",color:view===v.id?"var(--gold)":"var(--txt3)",border:"none",borderBottom:view===v.id?"2px solid var(--gold)":"2px solid transparent",fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:.5,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s",textAlign:"center"}}>
            {v.l}
          </button>
        ))}
      </div>
    </header>
  );
}


function Login({onLogin}){
  const[mode,setMode]=useState("login");
  const[name,setName]=useState(""),[ email,setEmail]=useState(""),[ pass,setPass]=useState("");
  const[err,setErr]=useState(""),[ loading,setLoading]=useState(false);
  const go=async()=>{
    if(mode==="register"&&(!name.trim()||!email.trim()||!pass.trim())){setErr("Completá todos los campos");return;}
    if(mode==="login"&&(!email.trim()||!pass.trim())){setErr("Completá email y contraseña");return;}
    setLoading(true);setErr("");
    if(email.trim().toLowerCase()===ADMIN_U&&pass===ADMIN_P){onLogin(ADMIN_U,true);setLoading(false);return;}
    const users=await dbGet("users")||{};const key=email.trim().toLowerCase();
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
      <style>{CSS}</style>
      <div style={{width:"100%",maxWidth:400}} className="fi">
        <div style={{textAlign:"center",marginBottom:32}}><div style={{fontSize:52}}>⚽</div><h1 className="hdr" style={{fontSize:38}}>PRODE MUNDIAL</h1><h2 className="hdr" style={{fontSize:58,color:"var(--wht)",margin:"-4px 0 2px",letterSpacing:4}}>2026</h2></div>
        <div className="card" style={{padding:26}}>
          <div style={{display:"flex",marginBottom:20,borderRadius:7,overflow:"hidden",border:"1px solid var(--bd)"}}>
            {["login","register"].map(m=>(<button key={m} onClick={()=>{setMode(m);setErr("")}} style={{flex:1,padding:"9px 0",background:mode===m?"var(--gold)":"transparent",color:mode===m?"var(--bg)":"var(--txt3)",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:1,cursor:"pointer"}}>{m==="login"?"ENTRAR":"REGISTRARME"}</button>))}
          </div>
          {mode==="register"&&<div style={{marginBottom:12}}><label style={{color:"var(--txt3)",fontSize:10,letterSpacing:2,display:"block",marginBottom:4}}>NOMBRE</label><input className="inp" value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre o apodo"/></div>}
          <div style={{marginBottom:12}}><label style={{color:"var(--txt3)",fontSize:10,letterSpacing:2,display:"block",marginBottom:4}}>EMAIL</label><input className="inp" type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="tu@email.com"/></div>
          <div style={{marginBottom:16}}><label style={{color:"var(--txt3)",fontSize:10,letterSpacing:2,display:"block",marginBottom:4}}>CONTRASEÑA</label><input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="••••••"/></div>
          {err&&<div style={{color:"var(--red)",fontSize:12,textAlign:"center",marginBottom:8}}>{err}</div>}
          <button className="bg" onClick={go} disabled={loading} style={{width:"100%",fontSize:16}}>{loading?"...":mode==="login"?"ENTRAR":"REGISTRARME"}</button>
          {mode==="register"&&<div style={{marginTop:12,background:"rgba(212,168,67,.08)",border:"1px solid rgba(212,168,67,.25)",borderRadius:8,padding:12}}>
            <p style={{color:"var(--gold)",fontSize:12,fontWeight:700,textAlign:"center",marginBottom:6}}>💰 PARA PODER JUGAR</p>
            <p style={{color:"var(--txt)",fontSize:11,textAlign:"center"}}>Transferí <strong style={{color:"var(--gold)"}}>$25.000</strong> al alias:</p>
            <button onClick={()=>{navigator.clipboard.writeText("fran.quiros.mp").then(()=>{const el=document.getElementById("alias-copied-login");if(el){el.textContent="✓ Copiado!";el.style.color="var(--grn)";setTimeout(()=>{el.textContent="fran.quiros.mp";el.style.color="var(--wht)";},2000);}});}} style={{background:"rgba(0,0,0,.3)",borderRadius:6,padding:"6px 10px",margin:"6px 0",width:"100%",border:"1px solid rgba(255,215,0,.3)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <span id="alias-copied-login" style={{color:"var(--wht)",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2}}>fran.quiros.mp</span>
              <span style={{fontSize:12}}>📋</span>
            </button>
            <a href="https://wa.me/542235638732" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"#25D366",color:"#fff",padding:"6px 10px",borderRadius:6,fontSize:12,fontWeight:600,textDecoration:"none",margin:"4px 0"}}>📲 Enviar comprobante al 2235638732</a>
            <p style={{color:"var(--txt3)",fontSize:10,textAlign:"center",marginTop:4}}>Fecha límite: 8 de junio</p>
          </div>}
        </div>
      </div>
    </div>
  );
}

function HoyView({users,results,allPreds}){
  const now=new Date();
  const todayStr=`${String(now.getDate()).padStart(2,"0")}/${String(now.getMonth()+1).padStart(2,"0")}`;
  const todayM=M.filter(m=>m.d===todayStr);
  const paid=Object.entries(users).filter(([id,u])=>u.approved&&u.paid&&!AI_IDS.includes(id));
  const exactToday=[];
  todayM.forEach(m=>{const r=results[m.n]||{h:"",a:""};if(r.h===""||r.a==="")return;paid.forEach(([id,u])=>{const p=(allPreds[id]||{})[m.n]||{h:"",a:""};if(calcPts(p,r)===3)exactToday.push({name:u.name,match:`${FL[m.h]||""}${m.h} ${r.h}-${r.a} ${m.a}${FL[m.a]||""}`});});});
  const top3=paid.map(([id,u])=>({name:u.name,...calcTotal(allPreds[id]||{},results)})).sort(cmp).slice(0,3);
  return(
    <div style={{maxWidth:780,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:26,textAlign:"center",marginBottom:18}}>📅 HOY — {todayStr}</h2>
      <div className="card" style={{marginBottom:12}}>
        <h3 className="hdr" style={{fontSize:15,marginBottom:10}}>⚽ PARTIDOS DE HOY</h3>
        {todayM.length===0?<p style={{color:"var(--txt3)",fontSize:13}}>No hay partidos hoy.</p>:todayM.map(m=>{const r=results[m.n]||{h:"",a:""};const hr=r.h!==""&&r.a!=="";return(
          <div key={m.n} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:"1px solid var(--bd)22"}}>
            <span style={{color:"var(--txt3)",fontSize:10,minWidth:28}}>#{m.n}</span>
            <span className="tg" style={{background:"var(--bd)",color:"var(--gold)",fontSize:9}}>G{m.g}</span>
            <span style={{color:"var(--txt3)",fontSize:10,minWidth:40}}>{m.t}h</span>
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <span style={{fontSize:11,flex:1,textAlign:"right"}}>{FL[m.h]||""} {m.h}</span>
              {hr?<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--gold)",minWidth:44,textAlign:"center"}}>{r.h} - {r.a}</span>:<span style={{color:"var(--txt3)",fontSize:11,minWidth:44,textAlign:"center"}}>vs</span>}
              <span style={{fontSize:11,flex:1}}>{m.a} {FL[m.a]||""}</span>
            </div>
          </div>
        );})}
      </div>
      <div className="card" style={{marginBottom:12}}>
        <h3 className="hdr" style={{fontSize:15,marginBottom:10}}>🎯 EXACTOS DEL DÍA</h3>
        {exactToday.length===0?<p style={{color:"var(--txt3)",fontSize:12}}>Todavía no hay exactos hoy.</p>:exactToday.map((e,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:"1px solid var(--bd)22"}}>
            <span>🎯</span><span style={{fontWeight:700,color:"var(--wht)",fontSize:12}}>{e.name}</span><span style={{color:"var(--txt3)",fontSize:11}}>{e.match}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="hdr" style={{fontSize:15,marginBottom:10}}>🏆 TOP 3 GENERAL</h3>
        {top3.length===0?<p style={{color:"var(--txt3)",fontSize:12}}>La tabla se activa el 9/06.</p>:top3.map((r,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<2?"1px solid var(--bd)22":"none"}}>
            <span style={{fontSize:18}}>{i===0?"🥇":i===1?"🥈":"🥉"}</span>
            <span style={{fontWeight:700,color:i===0?"var(--gold)":"var(--wht)",fontSize:13,flex:1}}>{r.name}</span>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--wht)"}}>{r.tot}</span>
            <span style={{color:"var(--txt3)",fontSize:10}}>pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Preds({currentUser,results,showAnim}){
  const[preds,setPreds]=useState({});const[saving,setSaving]=useState(false);const[saved,setSaved]=useState(false);const[filter,setFilter]=useState("all");
  const locked=new Date()>=LOCK;const prevR=useRef({});
  useEffect(()=>{(async()=>{const d=await dbGet(`preds-${currentUser}`);if(d)setPreds(d);})()},[currentUser]);
  useEffect(()=>{
    M.forEach(m=>{const r=results[m.n]||{h:"",a:""};const pv=prevR.current[m.n]||{h:"",a:""};
      if((r.h!==pv.h||r.a!==pv.a)&&r.h!==""&&r.a!==""){const p=preds[m.n]||{h:"",a:""};const pt=calcPts(p,r);if(pt===3)showAnim("exact");else if(pt===1)showAnim("sign");else if(pt===0)showAnim("miss");}
    });prevR.current={...results};
  },[results,preds,showAnim]);
  const chg=(n,side,val)=>{if(locked)return;const v=val.replace(/[^0-9]/g,"").slice(0,2);setPreds(p=>({...p,[n]:{...(p[n]||{h:"",a:""}),[side]:v}}));setSaved(false);};
  const save=async()=>{setSaving(true);await dbSet(`preds-${currentUser}`,preds);setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2500);};
  const dlCSV=()=>{const csv=M.map(m=>{const p=preds[m.n]||{h:"",a:""};return`${m.n},${m.d},${m.h},${p.h||""},${p.a||""},${m.a}`;}).join("\n");const blob=new Blob(["#,Fecha,Local,Goles L,Goles V,Visitante\n"+csv],{type:"text/csv"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="mis_predicciones_readonly.csv";a.click();};
  const groups=[...new Set(M.map(m=>m.g))].sort();const filtered=filter==="all"?M:M.filter(m=>m.g===filter);
  const filled=M.filter(m=>preds[m.n]&&preds[m.n].h!==""&&preds[m.n].a!=="").length;
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <div><h2 className="hdr" style={{fontSize:22}}>MIS PREDICCIONES</h2><p style={{color:"var(--txt2)",fontSize:11,marginTop:2}}>{filled}/72{locked?" • 🔒 Bloqueado desde 9/06":""}</p></div>
        <div style={{display:"flex",gap:6}}>
          {!locked&&<button className="bg" onClick={save} disabled={saving} style={{background:saved?"var(--grn)":"",color:saved?"#fff":""}}>{saving?"...":saved?"✓ Guardado":"GUARDAR"}</button>}
          <button onClick={dlCSV} style={{padding:"8px 12px",background:"transparent",color:"var(--txt2)",border:"1px solid var(--bd)",borderRadius:7,fontSize:11,cursor:"pointer"}}>📥 Descargar</button>
        </div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
        <button className={`fb${filter==="all"?" act":""}`} onClick={()=>setFilter("all")}>Todos</button>
        {groups.map(g=><button key={g} className={`fb${filter===g?" act":""}`} onClick={()=>setFilter(g)}>{g}</button>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        {filtered.map(m=>{const p=preds[m.n]||{h:"",a:""};const r=results[m.n]||{h:"",a:""};const pt=calcPts(p,r);const hr=r.h!==""&&r.a!=="";return(
          <div key={m.n} className="mr">
            <div style={{width:32,textAlign:"center"}}><div style={{color:"var(--txt3)",fontSize:10,fontWeight:600}}>#{m.n}</div><div style={{color:"var(--txt3)",fontSize:9}}>{m.d}</div></div>
            <span className="tg" style={{background:"var(--bd)",color:"var(--gold)",fontSize:9}}>G{m.g}</span>
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,minWidth:240}}>
              <span style={{fontSize:11,color:"var(--txt)",textAlign:"right",flex:1,fontWeight:500}}>{FL[m.h]||""} {m.h}</span>
              <input className="si" value={p.h} onChange={e=>chg(m.n,"h",e.target.value)} disabled={locked} placeholder="-" maxLength={2}/>
              <span style={{color:"var(--txt3)",fontSize:11,fontWeight:700}}>–</span>
              <input className="si" value={p.a} onChange={e=>chg(m.n,"a",e.target.value)} disabled={locked} placeholder="-" maxLength={2}/>
              <span style={{fontSize:11,color:"var(--txt)",textAlign:"left",flex:1,fontWeight:500}}>{m.a} {FL[m.a]||""}</span>
            </div>
            {hr&&<div style={{display:"flex",alignItems:"center",gap:4,minWidth:110}}>
              <span style={{color:"var(--txt3)",fontSize:10}}>Real:{r.h}-{r.a}</span>
              {pt===3&&<span className="bex">🎯+3</span>}{pt===1&&<span className="bsi">🔥+1</span>}{pt===0&&<span className="bms">✗0</span>}
            </div>}
          </div>
        );})}
      </div>
      {!locked&&<div style={{textAlign:"center",marginTop:16}}><button className="bg" onClick={save} disabled={saving} style={{fontSize:15,padding:"11px 36px"}}>{saving?"...":saved?"✓ Guardado":"GUARDAR PREDICCIONES"}</button></div>}
    </div>
  );
}

function Table({users,results,currentUser,allPreds}){
  const locked=new Date()>=LOCK;
  const paid=Object.values(users).filter(u=>u.paid).length,pool=paid*FEE;
  const ranks=useMemo(()=>Object.entries(users).filter(([id,u])=>u.approved&&u.paid&&!AI_IDS.includes(id)).map(([id,u])=>({id,name:u.name,...calcTotal(allPreds[id]||{},results)})).sort(cmp),[users,allPreds,results]);
  const myS=calcTotal(allPreds[currentUser]||{},results);const myP=users[currentUser]?.paid;
  const dl=()=>{let c="Pos,Nombre,Pts,Bonus,Total,Exactos,Signos,R5,R3\n";ranks.forEach((r,i)=>{c+=`${i+1},${r.name},${r.mp},${r.bo},${r.tot},${r.ex},${r.si},${r.ms5},${r.ms3}\n`;});const b=new Blob([c],{type:"text/csv"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="tabla_general.csv";a.click();};
  if(!locked)return(
    <div style={{maxWidth:680,margin:"0 auto",padding:"50px 20px",textAlign:"center"}} className="fi">
      <div style={{fontSize:52,marginBottom:10}}>🔒</div>
      <h2 className="hdr" style={{fontSize:26}}>TABLA BLOQUEADA</h2>
      <p style={{color:"var(--txt2)",fontSize:13,marginTop:6}}>Se habilita el 9 de junio.</p>
      <div className="card" style={{maxWidth:360,margin:"24px auto 0"}}>
        <h3 className="hdr" style={{margin:"0 0 8px"}}>💰 POZO</h3>
        <div className="hdr" style={{fontSize:34,color:"var(--wht)"}}>{fmt$(pool)}</div>
        <div style={{color:"var(--txt3)",fontSize:10,marginTop:2}}>{paid} pagaron</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:12}}>
          {[{l:"🥇",p:70,c:"#FFD700"},{l:"🥈",p:20,c:"#C0C0C0"},{l:"🥉",p:10,c:"#CD7F32"}].map(x=>(<div key={x.l} style={{textAlign:"center"}}><div>{x.l}</div><div className="hdr" style={{fontSize:15,color:x.c}}>{fmt$(Math.floor(pool*x.p/100))}</div></div>))}
        </div>
      </div>
    </div>
  );
  return(
    <div style={{maxWidth:950,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,flexWrap:"wrap",gap:8}}>
        <h2 className="hdr" style={{fontSize:24}}>🏆 TABLA GENERAL</h2>
        <button onClick={dl} style={{padding:"6px 12px",background:"transparent",color:"var(--txt2)",border:"1px solid var(--bd)",borderRadius:6,fontSize:11,cursor:"pointer"}}>📥 Descargar</button>
      </div>
      <p style={{color:"var(--txt2)",fontSize:10,margin:"0 0 16px"}}>Pozo: {fmt$(pool)} • 1°: {fmt$(Math.floor(pool*.7))} • 2°: {fmt$(Math.floor(pool*.2))} • 3°: {fmt$(Math.floor(pool*.1))}</p>
      {!myP&&users[currentUser]?.approved&&<div className="card" style={{borderColor:"var(--red)",marginBottom:16,textAlign:"center"}}><p style={{color:"var(--red)",fontSize:12,fontWeight:600}}>No aparecés en la tabla porque no pagaste.</p><div style={{display:"flex",justifyContent:"center",gap:18,marginTop:8}}>{[{v:myS.tot,l:"total"},{v:myS.ex,l:"exactos"},{v:myS.bo,l:"bonus"}].map(x=>(<div key={x.l}><span className="hdr" style={{fontSize:20,color:"var(--wht)"}}>{x.v}</span> <span style={{color:"var(--txt3)",fontSize:10}}>{x.l}</span></div>))}</div></div>}
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"var(--bg2)"}}>{["#","Participante","Pts","Bonus","Total","Ex","Si","R5","R3","⚡"].map(h=><th key={h} style={{padding:"8px 5px",color:"var(--txt3)",fontSize:10,letterSpacing:1,borderBottom:"2px solid var(--bd)",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif"}}>{h}</th>)}</tr></thead>
          <tbody>{ranks.map((r,i)=>{const me=r.id===currentUser;const bg=i===0?"rgba(212,168,67,.1)":i===1?"rgba(192,192,192,.06)":i===2?"rgba(205,127,50,.06)":me?"rgba(46,117,182,.08)":"transparent";
            return(<tr key={r.id} style={{background:bg,borderBottom:"1px solid var(--bd)33"}}>
              <td style={{padding:"8px 5px",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontWeight:700,color:"var(--gold)"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</td>
              <td style={{padding:"8px 5px",color:me?"var(--gold)":"var(--txt)",fontWeight:me?700:400}}>{r.name}{me?" (Vos)":""}</td>
              <td style={{padding:"8px 5px",textAlign:"center",color:"var(--txt2)"}}>{r.mp}</td>
              <td style={{padding:"8px 5px",textAlign:"center",color:r.bo>0?"var(--grn)":"var(--txt3)"}}>{r.bo>0?`+${r.bo}`:0}</td>
              <td style={{padding:"8px 5px",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,fontWeight:700,color:"var(--wht)"}}>{r.tot}</td>
              <td style={{padding:"8px 5px",textAlign:"center",color:"var(--grn)"}}>{r.ex}</td>
              <td style={{padding:"8px 5px",textAlign:"center",color:"var(--org)"}}>{r.si}</td>
              <td style={{padding:"8px 5px",textAlign:"center",color:"var(--txt3)",fontSize:10}}>{r.ms5}</td>
              <td style={{padding:"8px 5px",textAlign:"center",color:"var(--txt3)",fontSize:10}}>{r.ms3}</td>
            </tr>);
          })}</tbody>
        </table>
        {ranks.length===0&&<p style={{textAlign:"center",color:"var(--txt3)",padding:24}}>Nadie pagó todavía.</p>}
      </div>
      <div style={{marginTop:8,color:"var(--txt3)",fontSize:9,textAlign:"center"}}>Desempate: Pts → Exactos → Rachas×5 → Rachas×3 → Racha más larga → Goles pronosticados</div>
    </div>
  );
}

function Compare({users,results,allPreds}){
  const locked=new Date()>=LOCK;const[sel,setSel]=useState("");
  if(!locked)return(<div style={{maxWidth:680,margin:"0 auto",padding:"50px 20px",textAlign:"center"}} className="fi"><div style={{fontSize:44,marginBottom:10}}>🔒</div><h2 className="hdr" style={{fontSize:22}}>SE HABILITA EL 9/06</h2></div>);
  const approved=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id));
  return(
    <div style={{maxWidth:950,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:14}}>👀 COMPARAR PREDICCIONES</h2>
      <div style={{textAlign:"center",marginBottom:16}}>
        <select value={sel} onChange={e=>setSel(e.target.value)} style={{padding:"7px 14px",background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:7,color:"var(--wht)",fontSize:13,outline:"none",minWidth:200}}>
          <option value="">— Elegí un participante —</option><option value="__ALL__">📊 Ver todos</option>
          {approved.map(([id,u])=><option key={id} value={id}>{u.name}</option>)}
        </select>
      </div>
      {sel&&sel!=="__ALL__"&&(()=>{const up=allPreds[sel]||{};const u=users[sel];const s=calcTotal(up,results);return(
        <div><div className="card" style={{marginBottom:12,textAlign:"center"}}><h3 className="hdr" style={{fontSize:16}}>{u?.name}</h3><div style={{display:"flex",justifyContent:"center",gap:18,marginTop:8}}>{[{v:s.tot,l:"total"},{v:s.ex,l:"exactos"},{v:s.si,l:"signos"},{v:s.bo,l:"bonus"}].map(x=>(<div key={x.l}><span className="hdr" style={{fontSize:20,color:"var(--wht)"}}>{x.v}</span><br/><span style={{color:"var(--txt3)",fontSize:10}}>{x.l}</span></div>))}</div></div>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>{M.map(m=>{const p=up[m.n]||{h:"",a:""};const r=results[m.n]||{h:"",a:""};const pt=calcPts(p,r);const hr=r.h!==""&&r.a!=="";const hp=p.h!==""&&p.a!=="";return(
          <div key={m.n} className="mr" style={{padding:"7px 10px"}}>
            <span style={{color:"var(--txt3)",fontSize:10,width:26}}>#{m.n}</span><span className="tg" style={{background:"var(--bd)",color:"var(--gold)",fontSize:9}}>G{m.g}</span>
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,minWidth:190}}><span style={{fontSize:11,flex:1,textAlign:"right"}}>{FL[m.h]||""} {m.h}</span><span style={{fontWeight:700,color:hp?"var(--wht)":"var(--txt3)",fontSize:13,minWidth:36,textAlign:"center"}}>{hp?`${p.h}-${p.a}`:"—"}</span><span style={{fontSize:11,flex:1}}>{m.a} {FL[m.a]||""}</span></div>
            {hr&&<div style={{display:"flex",gap:4}}><span style={{color:"var(--txt3)",fontSize:10}}>Real {r.h}-{r.a}</span>{pt===3&&<span className="bex">+3</span>}{pt===1&&<span className="bsi">+1</span>}{pt===0&&<span className="bms">✗</span>}</div>}
          </div>);})}
        </div></div>);})()}
      {sel==="__ALL__"&&<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{background:"var(--bg2)"}}><th style={{padding:5,color:"var(--txt3)",position:"sticky",left:0,background:"var(--bg2)",textAlign:"left",minWidth:45}}>Partido</th><th style={{padding:5,color:"var(--txt3)",textAlign:"center",minWidth:55}}>Real</th>{approved.map(([id,u])=><th key={id} style={{padding:5,color:"var(--gold)",textAlign:"center",minWidth:50,fontSize:10}}>{u.name}</th>)}</tr></thead>
        <tbody>{M.map(m=>{const r=results[m.n]||{h:"",a:""};const hr=r.h!==""&&r.a!=="";return(<tr key={m.n} style={{borderBottom:"1px solid var(--bd)22"}}><td style={{padding:"4px 5px",position:"sticky",left:0,background:"var(--bg)",fontSize:10,whiteSpace:"nowrap"}}>{FL[m.h]||""}{m.h} vs {m.a}{FL[m.a]||""}</td><td style={{padding:"4px 5px",textAlign:"center",fontWeight:700,color:hr?"var(--wht)":"var(--txt3)"}}>{hr?`${r.h}-${r.a}`:"—"}</td>{approved.map(([id])=>{const p=(allPreds[id]||{})[m.n]||{h:"",a:""};const pt=calcPts(p,r);const hp=p.h!==""&&p.a!=="";const bg=pt===3?"rgba(34,197,94,.15)":pt===1?"rgba(245,158,11,.1)":pt===0?"rgba(220,53,69,.08)":"transparent";return<td key={id} style={{padding:"4px 5px",textAlign:"center",background:bg,color:hp?"var(--txt)":"var(--txt3)"}}>{hp?`${p.h}-${p.a}`:"—"}</td>;})}
        </tr>);})}
        </tbody></table></div>}
    </div>
  );
}

function IAView({results,allPreds,users,currentUser}){
  const locked=new Date()>=LOCK;
  const[tab,setTab]=useState("tabla");
  const[selAI,setSelAI]=useState("chatgpt_ai");
  const[selUser,setSelUser]=useState(currentUser||"");

  // Merge stored preds with hardcoded preds for IAs
  const getAIPreds=(id)=>{
    const stored=allPreds[id]||{};
    const hard=AI_PREDS[id]||{};
    const merged={};
    for(let n=1;n<=72;n++){
      merged[n]=stored[n]&&stored[n].h!==""?stored[n]:hard[n]||{h:"",a:""};
    }
    return merged;
  };

  // Similarity: how many matches a user predicted the same as an AI
  function similarity(userPreds,aiId){
    const aiP=getAIPreds(aiId);
    let exactMatch=0,signMatch=0,total=0;
    for(let n=1;n<=72;n++){
      const up=userPreds[n]||{h:"",a:""};
      const ap=aiP[n]||{h:"",a:""};
      if(up.h===""||up.a===""||ap.h===""||ap.a==="")continue;
      total++;
      if(up.h===ap.h&&up.a===ap.a){exactMatch++;signMatch++;}
      else{
        const uSign=+up.h>+up.a?1:+up.h<+up.a?-1:0;
        const aSign=+ap.h>+ap.a?1:+ap.h<+ap.a?-1:0;
        if(uSign===aSign)signMatch++;
      }
    }
    return{exactMatch,signMatch,total};
  }

  const approvedUsers=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id));

  // Top 5 most similar users per AI
  const top5=(aiId)=>approvedUsers
    .map(([id,u])=>{const s=similarity(allPreds[id]||{},aiId);return{id,name:u.name,...s};})
    .sort((a,b)=>b.exactMatch-a.exactMatch||b.signMatch-a.signMatch)
    .slice(0,5);

  // Match by match comparison: user vs AI
  const matchComparison=(userId,aiId)=>{
    const up=allPreds[userId]||{};
    const ap=getAIPreds(aiId);
    return M.map(m=>{
      const u=up[m.n]||{h:"",a:""};
      const a=ap[m.n]||{h:"",a:""};
      const r=results[m.n]||{h:"",a:""};
      const hasU=u.h!==""&&u.a!=="";
      const hasA=a.h!==""&&a.a!=="";
      const agree=hasU&&hasA&&u.h===a.h&&u.a===a.a?"exact":
        hasU&&hasA&&(+u.h>+u.a&&+a.h>+a.a||+u.h<+u.a&&+a.h<+a.a||+u.h===+u.a&&+a.h===+a.a)?"sign":"diff";
      return{...m,u,a,r,agree,hasU,hasA};
    });
  };

  return(
    <div style={{maxWidth:920,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:24,textAlign:"center",marginBottom:4}}>🤖 IAs vs MUNDIAL</h2>
      <p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",marginBottom:16}}>Tabla separada — no compiten por premios</p>

      {/* AI Score Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:10,marginBottom:18}}>
        {AI_IDS.map(id=>{const inf=AI_INFO[id];const s=calcTotal(getAIPreds(id),results);return(
          <div key={id} className="card" style={{textAlign:"center",borderColor:inf.color+"44"}}>
            <div style={{fontSize:28,marginBottom:3}}>{inf.flag}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:inf.color}}>{inf.name}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3,marginTop:8}}>
              {[{v:s.tot,l:"pts"},{v:s.ex,l:"exactos"},{v:s.bo,l:"bonus"}].map(x=>(<div key={x.l} style={{background:"rgba(0,0,0,.3)",borderRadius:5,padding:"5px 3px"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,color:"var(--wht)"}}>{x.v}</div><div style={{color:"var(--txt3)",fontSize:8}}>{x.l}</div></div>))}
            </div>
          </div>
        );})}
      </div>

      {!locked&&<div className="card" style={{textAlign:"center"}}><p style={{color:"var(--txt3)",fontSize:13}}>🔒 Las comparaciones y predicciones se muestran después del 9/06.</p></div>}

      {locked&&<>
        {/* Tabs */}
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {[{id:"tabla",l:"📊 Predicciones"},{id:"top5",l:"🏅 Quién pensó como cada IA"},{id:"vsIA",l:"🔍 Vos vs IA"}].map(t=>(
            <button key={t.id} className={`nb${tab===t.id?" act":""}`} onClick={()=>setTab(t.id)}>{t.l}</button>
          ))}
        </div>

        {/* Tab: Predictions table */}
        {tab==="tabla"&&<div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr style={{background:"var(--bg2)"}}>
              <th style={{padding:"7px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"left"}}>Partido</th>
              <th style={{padding:"7px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>Real</th>
              {AI_IDS.map(id=><th key={id} style={{padding:"7px 5px",color:AI_INFO[id].color,fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>{AI_INFO[id].flag} {AI_INFO[id].name}</th>)}
            </tr></thead>
            <tbody>{M.map(m=>{
              const r=results[m.n]||{h:"",a:""};const hr=r.h!==""&&r.a!=="";
              return(<tr key={m.n} style={{borderBottom:"1px solid var(--bd)22"}}>
                <td style={{padding:"4px 5px",fontSize:10,whiteSpace:"nowrap"}}>{FL[m.h]||""}{m.h} vs {m.a}{FL[m.a]||""}</td>
                <td style={{padding:"4px 5px",textAlign:"center",color:hr?"var(--wht)":"var(--txt3)",fontWeight:700}}>{hr?`${r.h}-${r.a}`:"—"}</td>
                {AI_IDS.map(id=>{const p=getAIPreds(id)[m.n]||{h:"",a:""};const pt=calcPts(p,r);const hp=p.h!==""&&p.a!=="";const bg=pt===3?"rgba(34,197,94,.15)":pt===1?"rgba(245,158,11,.1)":pt===0?"rgba(220,53,69,.08)":"transparent";return<td key={id} style={{padding:"4px 5px",textAlign:"center",background:bg,color:hp?"var(--txt)":"var(--txt3)"}}>{hp?`${p.h}-${p.a}`:"—"}</td>;})}
              </tr>);
            })}</tbody>
          </table>
        </div>}

        {/* Tab: Top 5 most similar users per AI */}
        {tab==="top5"&&<div>
          <p style={{color:"var(--txt3)",fontSize:11,marginBottom:14}}>Los participantes que pusieron predicciones más parecidas a cada IA.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12}}>
            {AI_IDS.map(aiId=>{
              const inf=AI_INFO[aiId];
              const top=top5(aiId);
              return(
                <div key={aiId} className="card" style={{borderColor:inf.color+"44"}}>
                  <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:inf.color,marginBottom:10}}>{inf.flag} Más parecidos a {inf.name}</h3>
                  {top.length===0?<p style={{color:"var(--txt3)",fontSize:12}}>Sin datos</p>:
                    top.map((u,i)=>(
                      <div key={u.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<top.length-1?"1px solid var(--bd)22":"none"}}>
                        <span style={{fontFamily:"'Bebas Neue',sans-serif",color:inf.color,fontSize:16,width:20}}>{i+1}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:12,color:"var(--wht)",fontWeight:600}}>{u.name}</div>
                          <div style={{fontSize:10,color:"var(--txt3)"}}>de {u.total} partidos comparables</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:11,color:"var(--grn)"}}>{u.exactMatch} exactos iguales</div>
                          <div style={{fontSize:10,color:"var(--org)"}}>{u.signMatch} signos iguales</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              );
            })}
          </div>
        </div>}

        {/* Tab: User vs IA match by match */}
        {tab==="vsIA"&&<div>
          <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
            <div>
              <label style={{color:"var(--txt3)",fontSize:10,display:"block",marginBottom:4}}>PARTICIPANTE</label>
              <select value={selUser} onChange={e=>setSelUser(e.target.value)} style={{padding:"6px 12px",background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:7,color:"var(--wht)",fontSize:12,outline:"none"}}>
                <option value="">— Elegí uno —</option>
                {approvedUsers.map(([id,u])=><option key={id} value={id}>{u.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{color:"var(--txt3)",fontSize:10,display:"block",marginBottom:4}}>IA</label>
              <select value={selAI} onChange={e=>setSelAI(e.target.value)} style={{padding:"6px 12px",background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:7,color:"var(--wht)",fontSize:12,outline:"none"}}>
                {AI_IDS.map(id=><option key={id} value={id}>{AI_INFO[id].flag} {AI_INFO[id].name}</option>)}
              </select>
            </div>
          </div>
          {selUser&&(()=>{
            const cmp=matchComparison(selUser,selAI);
            const exactAg=cmp.filter(m=>m.agree==="exact").length;
            const signAg=cmp.filter(m=>m.agree==="sign"||m.agree==="exact").length;
            const total=cmp.filter(m=>m.hasU&&m.hasA).length;
            const inf=AI_INFO[selAI];
            const uName=users[selUser]?.name||selUser;
            return(<div>
              <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                {[{v:total,l:"comparables"},{v:exactAg,l:"exactos iguales",c:"var(--grn)"},{v:signAg,l:"signos iguales",c:"var(--org)"},{v:total-signAg,l:"distintos",c:"var(--red)"}].map(x=>(
                  <div key={x.l} className="card" style={{textAlign:"center",padding:"12px 16px",flex:1,minWidth:100}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:x.c||"var(--wht)"}}>{x.v}</div>
                    <div style={{color:"var(--txt3)",fontSize:9}}>{x.l}</div>
                  </div>
                ))}
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                  <thead><tr style={{background:"var(--bg2)"}}>
                    <th style={{padding:"6px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"left"}}>Partido</th>
                    <th style={{padding:"6px 5px",color:"var(--gold)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>{uName}</th>
                    <th style={{padding:"6px 5px",color:inf.color,fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>{inf.flag} {inf.name}</th>
                    <th style={{padding:"6px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>Real</th>
                    <th style={{padding:"6px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>Acuerdo</th>
                  </tr></thead>
                  <tbody>{cmp.map(m=>{
                    const rowBg=m.agree==="exact"?"rgba(34,197,94,.08)":m.agree==="sign"?"rgba(245,158,11,.06)":"transparent";
                    return(<tr key={m.n} style={{borderBottom:"1px solid var(--bd)11",background:rowBg}}>
                      <td style={{padding:"4px 5px",fontSize:10,whiteSpace:"nowrap"}}>{FL[m.h]||""}{m.h} vs {m.a}{FL[m.a]||""}</td>
                      <td style={{padding:"4px 5px",textAlign:"center",color:m.hasU?"var(--wht)":"var(--txt3)"}}>{m.hasU?`${m.u.h}-${m.u.a}`:"—"}</td>
                      <td style={{padding:"4px 5px",textAlign:"center",color:m.hasA?inf.color:"var(--txt3)"}}>{m.hasA?`${m.a.h}-${m.a.a}`:"—"}</td>
                      <td style={{padding:"4px 5px",textAlign:"center",color:m.r.h!==""?"var(--wht)":"var(--txt3)",fontWeight:700}}>{m.r.h!==""?`${m.r.h}-${m.r.a}`:"—"}</td>
                      <td style={{padding:"4px 5px",textAlign:"center"}}>{m.agree==="exact"?<span className="bex">= Exacto</span>:m.agree==="sign"?<span className="bsi">≈ Signo</span>:m.hasU&&m.hasA?<span className="bms">✗</span>:"—"}</td>
                    </tr>);
                  })}</tbody>
                </table>
              </div>
            </div>);
          })()}
          {!selUser&&<p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",padding:20}}>Elegí un participante para comparar.</p>}
        </div>}
      </>}
    </div>
  );
}


// ═══════════════════════════════════════════════════════
// BADGES / LOGROS
// ═══════════════════════════════════════════════════════
function calcBadges(pts){
  // pts = array of calcPts results (3,1,0,null)
  const badges=[];
  let streak=0,maxStreak=0;
  let streak3count=0,streak5count=0,streak10count=0;
  let boostActive=false,boostStart=0;

  for(let i=0;i<pts.length;i++){
    const p=pts[i];
    if(p===3){
      streak++;
      if(streak>maxStreak)maxStreak=streak;
      if(streak===3){streak3count++;badges.push({type:"silver",label:"Racha x3",icon:"🥈",desc:"3 exactos seguidos",idx:i});}
      if(streak===5){streak5count++;badges.push({type:"gold",label:"Racha x5",icon:"🥇",desc:"5 exactos seguidos",idx:i});}
      if(streak===8&&!boostActive){boostActive=true;boostStart=i;badges.push({type:"boost",label:"BOOST",icon:"⚡",desc:"8 exactos seguidos - modo boost!",idx:i});}
      if(streak===10){streak10count++;badges.push({type:"gold",label:"Racha x10",icon:"🏆",desc:"10 exactos seguidos",idx:i});boostActive=false;}
    }else if(p!==null){
      if(boostActive){badges.push({type:"boost_end",label:"Boost terminado",icon:"💨",desc:`Boost activo por ${i-boostStart} partidos`,idx:i});boostActive=false;}
      streak=0;
    }
  }
  return{badges,maxStreak,streak3count,streak5count,streak10count,boostActive};
}

function BadgesView({preds,results,userName}){
  const pts=M.map(m=>calcPts(preds[m.n]||{h:"",a:""},results[m.n]||{h:"",a:""}));
  const{badges,maxStreak,streak3count,streak5count,streak10count,boostActive}=calcBadges(pts);
  const gold=badges.filter(b=>b.type==="gold");
  const silver=badges.filter(b=>b.type==="silver");
  const boosts=badges.filter(b=>b.type==="boost");

  if(badges.length===0&&!boostActive)return(
    <div style={{textAlign:"center",padding:"20px 0",color:"var(--txt3)",fontSize:12}}>
      Todavía no ganaste ninguna medalla. ¡Pegá 3 exactos seguidos para la primera!
    </div>
  );

  return(
    <div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
        {boostActive&&<div style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",gap:8,animation:"fp 1s infinite"}}>
          <span style={{fontSize:20}}>⚡</span><div><div style={{color:"#fff",fontWeight:700,fontSize:12}}>BOOST ACTIVO</div><div style={{color:"rgba(255,255,255,.8)",fontSize:10}}>¡8+ exactos seguidos!</div></div>
        </div>}
        {[{v:gold.length,l:"Medallas de Oro",c:"#FFD700",i:"🥇"},{v:silver.length,l:"Medallas de Plata",c:"#C0C0C0",i:"🥈"},{v:boosts.length,l:"Boosts",c:"#f59e0b",i:"⚡"},{v:maxStreak,l:"Mejor racha",c:"var(--grn)",i:"🔥"}].map(x=>(
          <div key={x.l} style={{background:"var(--bg3)",border:`1px solid ${x.c}44`,borderRadius:8,padding:"8px 14px",textAlign:"center",flex:1,minWidth:80}}>
            <div style={{fontSize:18}}>{x.i}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:x.c}}>{x.v}</div>
            <div style={{color:"var(--txt3)",fontSize:9}}>{x.l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        {[...badges].reverse().map((b,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 12px",background:"var(--bg3)",border:`1px solid ${b.type==="gold"?"#FFD70044":b.type==="silver"?"#C0C0C044":b.type==="boost"||b.type==="boost_end"?"#f59e0b44":"var(--bd)"}`,borderRadius:8}}>
            <span style={{fontSize:20}}>{b.icon}</span>
            <div style={{flex:1}}>
              <div style={{color:"var(--wht)",fontSize:12,fontWeight:600}}>{b.label}</div>
              <div style={{color:"var(--txt3)",fontSize:10}}>{b.desc} • Partido #{M[b.idx]?.n} — {M[b.idx]?.h} vs {M[b.idx]?.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// EVOLUTION CHART (SVG)
// ═══════════════════════════════════════════════════════
function EvolutionChart({allPreds,results,users,currentUser}){
  const paid=Object.entries(users).filter(([id,u])=>u.approved&&u.paid&&!AI_IDS.includes(id));
  const W=600,H=200,PAD=40;

  const series=useMemo(()=>paid.map(([id,u])=>{
    let cum=0;
    const points=M.map(m=>{
      const p=(allPreds[id]||{})[m.n]||{h:"",a:""};
      const r=results[m.n]||{h:"",a:""};
      const pt=calcPts(p,r);
      cum+=(pt??0);
      return cum;
    });
    return{id,name:u.name,points,isMe:id===currentUser};
  }),[allPreds,results,users]);

  const maxVal=Math.max(...series.flatMap(s=>s.points),1);
  const played=M.filter(m=>results[m.n]&&results[m.n].h!=="").length;
  if(played===0)return<p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",padding:20}}>El gráfico aparece cuando se carguen resultados.</p>;

  const colors=["#d4a843","#22c55e","#3b82f6","#ef4444","#a855f7","#06b6d4","#f97316","#ec4899"];
  const xScale=i=>(i/(Math.max(played,1)-1||1))*(W-PAD*2)+PAD;
  const yScale=v=>H-PAD-(v/maxVal)*(H-PAD*2);

  return(
    <div style={{overflowX:"auto"}}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxWidth:W,background:"var(--bg3)",borderRadius:10,border:"1px solid var(--bd)"}}>
        {/* Grid lines */}
        {[0,.25,.5,.75,1].map(v=>(
          <g key={v}>
            <line x1={PAD} y1={yScale(maxVal*v)} x2={W-PAD} y2={yScale(maxVal*v)} stroke="var(--bd)" strokeWidth="1"/>
            <text x={PAD-4} y={yScale(maxVal*v)+4} fill="var(--txt3)" fontSize="8" textAnchor="end">{Math.round(maxVal*v)}</text>
          </g>
        ))}
        {/* Lines */}
        {series.map((s,si)=>{
          const playedPts=s.points.slice(0,played);
          const path=playedPts.map((v,i)=>`${i===0?"M":"L"}${xScale(i)},${yScale(v)}`).join(" ");
          return(
            <g key={s.id}>
              <path d={path} fill="none" stroke={s.isMe?colors[0]:colors[(si+1)%colors.length]} strokeWidth={s.isMe?3:1.5} strokeOpacity={s.isMe?1:0.5}/>
              {s.isMe&&playedPts.length>0&&<circle cx={xScale(playedPts.length-1)} cy={yScale(playedPts[playedPts.length-1])} r="4" fill={colors[0]}/>}
            </g>
          );
        })}
        {/* Legend - top 3 + me */}
        {series.slice(0,4).map((s,si)=>(
          <g key={s.id}>
            <rect x={PAD+si*100} y={H-16} width={10} height={3} fill={s.isMe?colors[0]:colors[(si+1)%colors.length]} opacity={s.isMe?1:0.7}/>
            <text x={PAD+si*100+13} y={H-10} fill="var(--txt2)" fontSize="8">{s.name.slice(0,10)}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TOURNAMENT STATS
// ═══════════════════════════════════════════════════════
function TournamentStats({allPreds,results,users}){
  const paid=Object.entries(users).filter(([id,u])=>u.approved&&u.paid&&!AI_IDS.includes(id));
  const playedMatches=M.filter(m=>results[m.n]&&results[m.n].h!=="");

  // Most guessed exact result per match
  const topExact=useMemo(()=>{
    return playedMatches.map(m=>{
      const r=results[m.n]||{h:"",a:""};
      const who=paid.filter(([id])=>calcPts((allPreds[id]||{})[m.n]||{h:"",a:""},r)===3).map(([,u])=>u.name);
      return{match:m,result:r,count:who.length,who};
    }).sort((a,b)=>b.count-a.count).slice(0,5);
  },[allPreds,results]);

  // Hardest match (least exact guesses)
  const hardest=useMemo(()=>[...topExact].reverse().slice(0,3),[topExact]);

  // Most wrong result (0 pts)
  const mostWrong=useMemo(()=>{
    return playedMatches.map(m=>{
      const r=results[m.n]||{h:"",a:""};
      const count=paid.filter(([id])=>calcPts((allPreds[id]||{})[m.n]||{h:"",a:""},r)===0).length;
      return{match:m,result:r,count};
    }).sort((a,b)=>b.count-a.count).slice(0,3);
  },[allPreds,results]);

  // Team most predicted as winner
  const teamVotes=useMemo(()=>{
    const votes={};
    M.forEach(m=>{
      paid.forEach(([id])=>{
        const p=(allPreds[id]||{})[m.n]||{h:"",a:""};
        if(!p.h||!p.a)return;
        const winner=+p.h>+p.a?m.h:+p.a>+p.h?m.a:"empate";
        votes[winner]=(votes[winner]||0)+1;
      });
    });
    return Object.entries(votes).sort((a,b)=>b[1]-a[1]).slice(0,8);
  },[allPreds]);

  if(playedMatches.length===0)return<p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",padding:20}}>Las estadísticas aparecen cuando se carguen resultados.</p>;

  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div className="card">
        <h3 className="hdr" style={{fontSize:15,marginBottom:10}}>🎯 Partidos con más exactos</h3>
        {topExact.map((e,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:"1px solid var(--bd)22"}}>
            <span style={{color:"var(--gold)",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,width:20}}>{i+1}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,color:"var(--wht)"}}>{e.match.h} {e.result.h}-{e.result.a} {e.match.a}</div>
              <div style={{fontSize:10,color:"var(--txt3)"}}>{e.who.slice(0,4).join(", ")}{e.who.length>4?` +${e.who.length-4} más`:""}</div>
            </div>
            <div style={{background:"rgba(34,197,94,.2)",borderRadius:6,padding:"3px 10px",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--grn)"}}>{e.count}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="hdr" style={{fontSize:15,marginBottom:10}}>😬 Partidos más difíciles (menos exactos)</h3>
        {hardest.map((e,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:"1px solid var(--bd)22"}}>
            <div style={{flex:1}}><div style={{fontSize:12,color:"var(--wht)"}}>{e.match.h} {e.result.h}-{e.result.a} {e.match.a}</div></div>
            <div style={{background:"rgba(220,53,69,.2)",borderRadius:6,padding:"3px 10px",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--red)"}}>{e.count} exactos</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="hdr" style={{fontSize:15,marginBottom:10}}>🏳️ Selecciones más apostadas como ganadoras</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:6}}>
          {teamVotes.map(([team,votes])=>(
            <div key={team} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",background:"rgba(0,0,0,.2)",borderRadius:6}}>
              <span style={{fontSize:14}}>{FL[team]||"🏳️"}</span>
              <span style={{fontSize:11,color:"var(--txt)",flex:1}}>{team}</span>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:"var(--gold)"}}>{votes}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PERSONAL PROFILE
// ═══════════════════════════════════════════════════════
function Profile({userId,users,allPreds,results}){
  const u=users[userId];
  if(!u)return null;
  const preds=allPreds[userId]||{};
  const stats=calcTotal(preds,results);
  const pts=stats.pts;
  const {badges,maxStreak,boostActive}=calcBadges(pts.map(v=>v??-1));
  const filled=M.filter(m=>preds[m.n]&&preds[m.n].h!==""&&preds[m.n].a!=="").length;
  const pct=filled>0?Math.round((stats.ex/Math.max(filled,1))*100):0;

  // Current streak
  let curStreak=0;
  for(let i=pts.length-1;i>=0;i--){if(pts[i]===3)curStreak++;else if(pts[i]!==null)break;}

  // Fav team (most predicted wins)
  const teamWins={};
  M.forEach(m=>{const p=preds[m.n];if(!p||!p.h||!p.a)return;const w=+p.h>+p.a?m.h:+p.a>+p.h?m.a:null;if(w)teamWins[w]=(teamWins[w]||0)+1;});
  const favTeam=Object.entries(teamWins).sort((a,b)=>b[1]-a[1])[0];

  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div className="card" style={{textAlign:"center"}}>
        <div style={{fontSize:40,marginBottom:6}}>👤</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"var(--gold)"}}>{u.name}</div>
        {!u.paid&&<span style={{background:"rgba(220,53,69,.2)",color:"var(--red)",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:600}}>No pagó</span>}
        {boostActive&&<div style={{marginTop:8,background:"linear-gradient(135deg,#f59e0b,#ef4444)",borderRadius:8,padding:"5px 14px",display:"inline-block"}}><span style={{color:"#fff",fontWeight:700,fontSize:12}}>⚡ BOOST ACTIVO</span></div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8}}>
        {[{v:stats.tot,l:"Puntos totales",c:"var(--gold)",i:"🏆"},{v:stats.ex,l:"Exactos",c:"var(--grn)",i:"🎯"},{v:stats.si,l:"Signos",c:"var(--org)",i:"🔥"},{v:stats.bo,l:"Bonus",c:"#a855f7",i:"⭐"},{v:maxStreak,l:"Mejor racha",c:"var(--grn)",i:"📈"},{v:curStreak,l:"Racha actual",c:curStreak>0?"var(--grn)":"var(--txt3)",i:"⚡"},{v:`${pct}%`,l:"% de aciertos",c:"var(--gold)",i:"📊"},{v:filled,l:"Completados",c:"var(--txt2)",i:"✅"}].map(x=>(
          <div key={x.l} className="card" style={{textAlign:"center",padding:"10px 8px"}}>
            <div style={{fontSize:16}}>{x.i}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:x.c}}>{x.v}</div>
            <div style={{color:"var(--txt3)",fontSize:9,marginTop:2}}>{x.l}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginBottom:8}}><ShareButton userId={userId} users={users} allPreds={allPreds} results={results}/></div>
    {favTeam&&<div className="card" style={{display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:28}}>{FL[favTeam[0]]||"🏳️"}</span>
        <div><div style={{color:"var(--txt3)",fontSize:10}}>SELECCIÓN MÁS APOSTADA COMO GANADORA</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--wht)"}}>{favTeam[0]}</div><div style={{color:"var(--txt3)",fontSize:10}}>{favTeam[1]} veces</div></div>
      </div>}
      <div className="card">
        <h3 className="hdr" style={{fontSize:14,marginBottom:10}}>🏅 MIS MEDALLAS ({badges.length})</h3>
        <BadgesView preds={preds} results={results} userName={u.name}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// THERMOMETER (confidence per match)
// ═══════════════════════════════════════════════════════
function Thermometer({allPreds,users,currentUser,results}){
  const paid=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id));
  const locked=new Date()>=LOCK;
  const[filter,setFilter]=useState("all");
  const groups=[...new Set(M.map(m=>m.g))].sort();
  const filtered=filter==="all"?M:M.filter(m=>m.g===filter);
  const myPreds=allPreds[currentUser]||{};

  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:4}}>🌡️ TERMÓMETRO DE CONFIANZA</h2>
      <p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",marginBottom:16}}>Cuántos participantes apostaron igual que vos en cada partido</p>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
        <button className={`fb${filter==="all"?" act":""}`} onClick={()=>setFilter("all")}>Todos</button>
        {groups.map(g=><button key={g} className={`fb${filter===g?" act":""}`} onClick={()=>setFilter(g)}>{g}</button>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        {filtered.map(m=>{
          const myP=myPreds[m.n]||{h:"",a:""};
          const hasMy=myP.h!==""&&myP.a!=="";
          const r=results[m.n]||{h:"",a:""};
          const hasR=r.h!==""&&r.a!=="";

          // Count who predicted same exact result
          const sameExact=paid.filter(([id])=>{
            if(id===currentUser)return false;
            const p=(allPreds[id]||{})[m.n]||{h:"",a:""};
            return p.h===myP.h&&p.a===myP.a&&p.h!=="";
          });
          // Count who predicted same sign
          const sameSign=paid.filter(([id])=>{
            if(id===currentUser)return false;
            const p=(allPreds[id]||{})[m.n]||{h:"",a:""};
            if(!p.h||!p.a||!myP.h||!myP.a)return false;
            const mySign=+myP.h>+myP.a?1:+myP.h<+myP.a?-1:0;
            const thSign=+p.h>+p.a?1:+p.h<+p.a?-1:0;
            return mySign===thSign;
          });

          const total=paid.length-1;
          const pct=total>0?Math.round((sameSign.length/total)*100):0;
          const barColor=pct>=70?"var(--grn)":pct>=40?"var(--org)":"var(--red)";

          return(
            <div key={m.n} className="mr" style={{flexWrap:"wrap",gap:6}}>
              <div style={{width:28,textAlign:"center"}}><div style={{color:"var(--txt3)",fontSize:10,fontWeight:600}}>#{m.n}</div><div style={{color:"var(--txt3)",fontSize:9}}>{m.d}</div></div>
              <span className="tg" style={{background:"var(--bd)",color:"var(--gold)",fontSize:9}}>G{m.g}</span>
              <div style={{flex:1,display:"flex",alignItems:"center",gap:5,minWidth:200}}>
                <span style={{fontSize:11,flex:1,textAlign:"right"}}>{FL[m.h]||""} {m.h}</span>
                <span style={{color:hasMy?"var(--gold)":"var(--txt3)",fontSize:14,fontWeight:700,minWidth:44,textAlign:"center"}}>{hasMy?`${myP.h}-${myP.a}`:"—"}</span>
                <span style={{fontSize:11,flex:1}}>{m.a} {FL[m.a]||""}</span>
              </div>
              {hasMy&&<div style={{minWidth:160}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:10,color:"var(--txt3)"}}>
                    {sameExact.length>0?`${sameExact.length} exacto igual`:"Nadie igual"}
                    {locked&&sameExact.length>0&&` (${sameExact.slice(0,2).map(([,u])=>u.name).join(", ")})`}
                  </span>
                  <span style={{fontSize:10,color:barColor,fontWeight:600}}>{pct}%</span>
                </div>
                <div style={{background:"var(--bd)",borderRadius:4,height:5,overflow:"hidden"}}>
                  <div style={{width:`${pct}%`,height:"100%",background:barColor,borderRadius:4,transition:"width .5s"}}/>
                </div>
                <div style={{fontSize:9,color:"var(--txt3)",marginTop:2}}>{sameSign.length} de {total} apostaron igual ganador</div>
              </div>}
              {!hasMy&&<div style={{color:"var(--txt3)",fontSize:10,minWidth:100}}>Sin predicción</div>}
              {hasR&&<span className="tg" style={{background:"var(--bd)",color:"var(--txt2)",fontSize:9}}>Real: {r.h}-{r.a}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MINI LEAGUES
// ═══════════════════════════════════════════════════════
function Leagues({users,allPreds,results,currentUser}){
  const[leagues,setLeagues]=useState({});
  const[newName,setNewName]=useState("");
  const[sel,setSel]=useState(null);
  const[inviteCode,setInviteCode]=useState("");
  const[msg,setMsg]=useState("");

  useEffect(()=>{(async()=>{const d=await dbGet("leagues");if(d)setLeagues(d);})();},[]);

  const createLeague=async()=>{
    if(!newName.trim())return;
    const code=Math.random().toString(36).slice(2,8).toUpperCase();
    const updated={...leagues,[code]:{name:newName.trim(),creator:currentUser,members:[currentUser],created:Date.now()}};
    setLeagues(updated);await dbSet("leagues",updated);setNewName("");setMsg(`Liga creada! Código: ${code}`);setSel(code);
    setTimeout(()=>setMsg(""),4000);
  };

  const joinLeague=async()=>{
    const code=inviteCode.trim().toUpperCase();
    if(!leagues[code]){setMsg("Código inválido");setTimeout(()=>setMsg(""),2000);return;}
    if(leagues[code].members.includes(currentUser)){setMsg("Ya estás en esa liga");setTimeout(()=>setMsg(""),2000);return;}
    const updated={...leagues,[code]:{...leagues[code],members:[...leagues[code].members,currentUser]}};
    setLeagues(updated);await dbSet("leagues",updated);setInviteCode("");setMsg("¡Te uniste a la liga!");setSel(code);
    setTimeout(()=>setMsg(""),3000);
  };

  const myLeagues=Object.entries(leagues).filter(([,l])=>l.members?.includes(currentUser));

  const LeagueTable=({leagueCode})=>{
    const league=leagues[leagueCode];
    if(!league)return null;
    const members=league.members||[];
    const rows=members
      .filter(id=>users[id])
      .map(id=>({id,name:users[id]?.name||id,...calcTotal(allPreds[id]||{},results)}))
      .sort(cmp);
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--gold)"}}>{league.name}</div><div style={{color:"var(--txt3)",fontSize:10}}>Código: <strong style={{color:"var(--wht)",letterSpacing:2}}>{leagueCode}</strong> • {members.length} miembro{members.length!==1?"s":""}</div></div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"var(--bg2)"}}>{["#","Nombre","Total","Ex","Si"].map(h=><th key={h} style={{padding:"7px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif"}}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r,i)=>{const me=r.id===currentUser;return(
            <tr key={r.id} style={{background:me?"rgba(212,168,67,.08)":"transparent",borderBottom:"1px solid var(--bd)22"}}>
              <td style={{padding:"7px 5px",textAlign:"center",color:"var(--gold)",fontFamily:"'Bebas Neue',sans-serif"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</td>
              <td style={{padding:"7px 5px",color:me?"var(--gold)":"var(--txt)",fontWeight:me?700:400}}>{r.name}{me?" ✓":""}</td>
              <td style={{padding:"7px 5px",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,fontWeight:700,color:"var(--wht)"}}>{r.tot}</td>
              <td style={{padding:"7px 5px",textAlign:"center",color:"var(--grn)"}}>{r.ex}</td>
              <td style={{padding:"7px 5px",textAlign:"center",color:"var(--org)"}}>{r.si}</td>
            </tr>
          );})}
          </tbody>
        </table>
      </div>
    );
  };

  return(
    <div style={{maxWidth:750,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:4}}>⚔️ MINI-LIGAS</h2>
      <p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",marginBottom:16}}>Creá tu grupo y competí entre amigos</p>
      {msg&&<div style={{background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.4)",borderRadius:8,padding:"8px 14px",marginBottom:12,color:"var(--grn)",fontSize:13,textAlign:"center"}}>{msg}</div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
        <div className="card">
          <h3 className="hdr" style={{fontSize:14,marginBottom:8}}>+ CREAR LIGA</h3>
          <input className="inp" value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&createLeague()} placeholder="Nombre de tu liga..." style={{marginBottom:8,fontSize:12,padding:"7px 10px"}}/>
          <button className="bg" onClick={createLeague} style={{width:"100%",padding:"7px 0",fontSize:12}}>CREAR</button>
        </div>
        <div className="card">
          <h3 className="hdr" style={{fontSize:14,marginBottom:8}}>🔗 UNIRME</h3>
          <input className="inp" value={inviteCode} onChange={e=>setInviteCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&joinLeague()} placeholder="Código de liga..." style={{marginBottom:8,fontSize:12,padding:"7px 10px",textTransform:"uppercase"}}/>
          <button className="bg" onClick={joinLeague} style={{width:"100%",padding:"7px 0",fontSize:12}}>UNIRME</button>
        </div>
      </div>
      {myLeagues.length===0?<p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",padding:20}}>No estás en ninguna liga todavía. ¡Creá una o pedile el código a alguien!</p>:(
        <div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            {myLeagues.map(([code,l])=><button key={code} className={`nb${sel===code?" act":""}`} onClick={()=>setSel(code)}>{l.name}</button>)}
          </div>
          {sel&&<div className="card"><LeagueTable leagueCode={sel}/></div>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// CHAT
// ═══════════════════════════════════════════════════════
function Chat({currentUser,users}){
  const[msgs,setMsgs]=useState([]);
  const[text,setText]=useState("");
  const[sending,setSending]=useState(false);
  const[replyTo,setReplyTo]=useState(null);
  const[mentionQ,setMentionQ]=useState("");
  const[showMentions,setShowMentions]=useState(false);
  const bottomRef=useRef(null);
  const inputRef=useRef(null);

  useEffect(()=>{
    (async()=>{const d=await dbGet("chat");if(d)setMsgs(d);})();
    const iv=setInterval(async()=>{const d=await dbGet("chat");if(d)setMsgs(d);},5000);
    return()=>clearInterval(iv);
  },[]);

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const onTextChange=(e)=>{
    const val=e.target.value;
    setText(val);
    // Detect @ mention
    const atIdx=val.lastIndexOf("@");
    if(atIdx>=0 && atIdx===val.length-1-val.slice(atIdx+1).replace(/\S+/,"")){
      setMentionQ(val.slice(atIdx+1));
      setShowMentions(true);
    } else if(atIdx>=0 && !val.slice(atIdx).includes(" ")){
      setMentionQ(val.slice(atIdx+1));
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  const insertMention=(name)=>{
    const atIdx=text.lastIndexOf("@");
    const newText=text.slice(0,atIdx)+"@"+name+" ";
    setText(newText);
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const send=async()=>{
    if(!text.trim()||sending)return;
    setSending(true);
    const name=users[currentUser]?.name||currentUser;
    const newMsg={
      user:currentUser,name,text:text.trim(),ts:Date.now(),
      ...(replyTo?{replyTo:{user:replyTo.user,name:replyTo.name,text:replyTo.text.slice(0,60)}}:{})
    };
    const updated=[...msgs.slice(-199),newMsg];
    setMsgs(updated);await dbSet("chat",updated);
    setText("");setReplyTo(null);setSending(false);
  };

  const formatTime=(ts)=>{const d=new Date(ts);return`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;};

  const renderText=(txt)=>{
    const parts=txt.split(/(@\S+)/g);
    return parts.map((p,i)=>{
      if(p.startsWith("@")){
        const mentioned=Object.values(users).find(u=>u.name===p.slice(1));
        return<span key={i} style={{color:"var(--gold)",fontWeight:700,background:"rgba(212,168,67,.15)",borderRadius:3,padding:"0 3px"}}>{p}</span>;
      }
      return<span key={i}>{p}</span>;
    });
  };

  const approvedUsers=Object.values(users).filter(u=>u.approved&&u.name);
  const mentionList=approvedUsers.filter(u=>u.name.toLowerCase().includes(mentionQ.toLowerCase())&&u.name!==users[currentUser]?.name);

  return(
    <div style={{maxWidth:700,margin:"0 auto",padding:"16px 12px",height:"calc(100vh - 120px)",display:"flex",flexDirection:"column"}} className="fi">
      <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:12}}>💬 CHAT</h2>
      {/* Messages */}
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:6,padding:"0 2px",marginBottom:8}}>
        {msgs.length===0&&<p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",padding:20}}>Nadie escribió todavía. ¡Sé el primero!</p>}
        {msgs.map((m,i)=>{
          const isMe=m.user===currentUser;
          const isMentioned=m.text.includes("@"+(users[currentUser]?.name||""));
          return(
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start",gap:2}}>
              {/* Reply preview */}
              {m.replyTo&&(
                <div style={{fontSize:10,color:"var(--txt3)",background:"var(--bg2)",borderLeft:"2px solid var(--gold)",padding:"2px 8px",borderRadius:4,maxWidth:"80%",opacity:.8}}>
                  <span style={{color:"var(--gold)",fontWeight:600}}>{m.replyTo.name}: </span>{m.replyTo.text}
                </div>
              )}
              <div style={{
                maxWidth:"80%",padding:"7px 11px",borderRadius:isMe?"12px 12px 3px 12px":"12px 12px 12px 3px",
                background:isMe?"linear-gradient(135deg,rgba(212,168,67,.25),rgba(212,168,67,.15))":isMentioned?"rgba(212,168,67,.1)":"var(--bg3)",
                border:isMentioned?"1px solid rgba(212,168,67,.4)":isMe?"1px solid rgba(212,168,67,.2)":"1px solid var(--bd)",
                position:"relative",cursor:"pointer"
              }}
                onClick={()=>setReplyTo(m)}
                title="Toca para responder"
              >
                {!isMe&&<div style={{fontSize:10,fontWeight:700,color:"var(--gold)",marginBottom:3}}>{m.name}</div>}
                <div style={{fontSize:13,color:"var(--wht)",lineHeight:1.4}}>{renderText(m.text)}</div>
                <div style={{fontSize:9,color:"var(--txt3)",textAlign:"right",marginTop:3}}>{formatTime(m.ts)}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}/>
      </div>

      {/* Reply banner */}
      {replyTo&&(
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:"var(--bg2)",borderLeft:"3px solid var(--gold)",borderRadius:6,marginBottom:6,fontSize:11}}>
          <div style={{flex:1,minWidth:0}}>
            <span style={{color:"var(--gold)",fontWeight:700}}>↩ {replyTo.name}: </span>
            <span style={{color:"var(--txt2)"}}>{replyTo.text.slice(0,50)}{replyTo.text.length>50?"...":""}</span>
          </div>
          <button onClick={()=>setReplyTo(null)} style={{background:"transparent",border:"none",color:"var(--txt3)",cursor:"pointer",fontSize:14}}>✕</button>
        </div>
      )}

      {/* Mention suggestions */}
      {showMentions&&mentionList.length>0&&(
        <div style={{background:"var(--bg2)",border:"1px solid var(--bd)",borderRadius:8,marginBottom:6,overflow:"hidden",maxHeight:160,overflowY:"auto"}}>
          {mentionList.map(u=>(
            <button key={u.name} onClick={()=>insertMention(u.name)}
              style={{display:"block",width:"100%",padding:"8px 12px",background:"transparent",border:"none",borderBottom:"1px solid var(--bd)",color:"var(--wht)",fontSize:12,cursor:"pointer",textAlign:"left"}}>
              <span style={{color:"var(--gold)",fontWeight:700}}>@{u.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
        <input ref={inputRef} className="inp" value={text} onChange={onTextChange}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}if(e.key==="Escape"){setShowMentions(false);setReplyTo(null);}}}
          placeholder="Escribí un mensaje... (@nombre para mencionar)"
          style={{flex:1,fontSize:14}}
        />
        <button onClick={send} disabled={sending||!text.trim()}
          style={{padding:"8px 16px",background:text.trim()?"var(--gold)":"var(--bg3)",color:text.trim()?"var(--bg)":"var(--txt3)",border:"none",borderRadius:8,fontFamily:"'Bebas Neue',sans-serif",fontSize:13,cursor:text.trim()?"pointer":"default",flexShrink:0,transition:"all .2s"}}>
          {sending?"...":"ENVIAR"}
        </button>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════
// HOST MAP - Sedes Mundial 2026 (pure React, no D3)
// ═══════════════════════════════════════════════════════
const SEDES_DATA=[
  {city:"Atlanta",stadium:"Mercedes-Benz Stadium",lon:-84.40,lat:33.755,country:"USA",games:8,type:"semi"},
  {city:"Boston",stadium:"Gillette Stadium",lon:-71.26,lat:42.090,country:"USA",games:7,type:"cuartos"},
  {city:"Dallas",stadium:"AT&T Stadium",lon:-97.09,lat:32.747,country:"USA",games:9,type:"semi"},
  {city:"Houston",stadium:"NRG Stadium",lon:-95.41,lat:29.685,country:"USA",games:7,type:"octavos"},
  {city:"Kansas City",stadium:"Arrowhead Stadium",lon:-94.48,lat:39.049,country:"USA",games:6,type:"cuartos"},
  {city:"Los Angeles",stadium:"SoFi Stadium",lon:-118.34,lat:33.953,country:"USA",games:8,type:"cuartos"},
  {city:"Miami",stadium:"Hard Rock Stadium",lon:-80.24,lat:25.957,country:"USA",games:7,type:"cuartos"},
  {city:"Nueva York/NJ",stadium:"MetLife Stadium",lon:-74.07,lat:40.813,country:"USA",games:8,type:"final"},
  {city:"Philadelphia",stadium:"Lincoln Financial Field",lon:-75.17,lat:39.901,country:"USA",games:6,type:"octavos"},
  {city:"San Francisco",stadium:"Levi\'s Stadium",lon:-121.97,lat:37.403,country:"USA",games:6,type:"octavos"},
  {city:"Seattle",stadium:"Lumen Field",lon:-122.33,lat:47.595,country:"USA",games:6,type:"octavos"},
  {city:"Ciudad de México",stadium:"Estadio Azteca",lon:-99.15,lat:19.302,country:"MEX",games:5,type:"inaugural"},
  {city:"Guadalajara",stadium:"Estadio Akron",lon:-103.46,lat:20.681,country:"MEX",games:4,type:"grupos"},
  {city:"Monterrey",stadium:"Estadio BBVA",lon:-100.24,lat:25.668,country:"MEX",games:4,type:"grupos"},
  {city:"Toronto",stadium:"BMO Field",lon:-79.42,lat:43.633,country:"CAN",games:6,type:"grupos"},
  {city:"Vancouver",stadium:"BC Place",lon:-123.11,lat:49.276,country:"CAN",games:7,type:"octavos"},
];
const SEDE_COLORS={inaugural:"#f0d060",final:"#f0d060",semi:"#d4a843",cuartos:"#3b82f6",octavos:"#22c55e",grupos:"#6b8299"};
const SEDE_LABELS={inaugural:"INAUGURAL",final:"FINAL",semi:"SEMIFINAL",cuartos:"CUARTOS",octavos:"OCTAVOS",grupos:"GRUPOS"};


function projectNA(lon,lat){
  const W=1000,H=520,scale=640;
  const x=(lon-(-97))*(Math.PI/180)*scale+W/2;
  const latRad=lat*Math.PI/180;
  const y=-Math.log(Math.tan(Math.PI/4+latRad/2))*scale+H/2+Math.log(Math.tan(Math.PI/4+38*Math.PI/360))*scale;
  return[x,y];
}

const COUNTRY_OUTLINES={
  USA:[[-67,44.8],[-69.7,43.7],[-70.8,42],[-71,41.3],[-73.9,40.5],[-74.5,39.4],[-75.5,38.8],[-77,38],[-76,37],[-75.9,36.5],[-76.8,34.8],[-78.5,33.9],[-79.6,32.7],[-80.9,32],[-81.5,30.7],[-80,26.7],[-80.1,25.2],[-81.7,24.5],[-82.8,27.6],[-83.5,29.7],[-85,29.7],[-87.5,30.3],[-89.2,30],[-90,29.1],[-91.5,29.5],[-93.8,29.7],[-95.6,28.8],[-97,27.9],[-97.4,26],[-99.1,26.4],[-100.7,29.1],[-102.4,29.8],[-103.3,28.9],[-104.5,29.6],[-106.5,31.8],[-108.2,31.8],[-111.1,31.3],[-114.8,32.5],[-117.1,32.5],[-118.4,33.7],[-120.6,34.5],[-121.9,36.6],[-122.5,37.8],[-123.7,38.9],[-124.5,40.4],[-124,42],[-124.7,46],[-124,48.4],[-123,48.2],[-95.2,49],[-92,48.5],[-89.5,48],[-88.5,47.4],[-85.5,46.7],[-84.5,46.5],[-83.5,46],[-82.5,45.5],[-82,43.2],[-83,42],[-82.5,41.7],[-81,42.3],[-79,42.9],[-78.9,43.3],[-77,43.6],[-75.5,44.7],[-74.5,45],[-71.5,45],[-69.5,46.5],[-67.8,47.1],[-67,44.8]],
  MEX:[[-117.1,32.5],[-114.8,32.5],[-111.1,31.3],[-108.2,31.8],[-106.5,31.8],[-104.5,29.6],[-103.3,28.9],[-102.4,29.8],[-100.7,29.1],[-99.1,26.4],[-97.4,26],[-97,25.7],[-97.3,21.5],[-95,18.8],[-94.5,18.2],[-93.5,18.5],[-91.5,18.5],[-90.5,21],[-87,21.5],[-86.7,21],[-87.5,20.2],[-87.5,18.8],[-89,18],[-91,17],[-92.5,16.2],[-93.5,16],[-95.5,16],[-97,15.7],[-99,16.6],[-101.5,17.7],[-103.5,18.5],[-105.5,19.5],[-105.5,20.5],[-105.3,21.5],[-106.5,23],[-108.5,25.5],[-109.5,26.5],[-110.5,28],[-112,29.5],[-113,31],[-114.5,31.5],[-117.1,32.5]],
  CAN:[[-123,49],[-114,49],[-95.2,49],[-95.2,49.4],[-94.6,48.9],[-94,48.7],[-92,48.5],[-89.5,48],[-88.5,47.4],[-85.5,46.7],[-84.5,46.5],[-83.5,46],[-82.5,45.5],[-78.9,43.3],[-77,43.6],[-75.5,44.7],[-74.5,45],[-71.5,45],[-69.5,46.5],[-67.8,47.1],[-67,47],[-64.5,46.5],[-61,45.6],[-60,46.5],[-59,47.5],[-55,47.5],[-53,48],[-52.5,49],[-53,50.5],[-55,52],[-57,53.5],[-61,55],[-64,57],[-66,58.5],[-68,60],[-70,60.5],[-74,62],[-78,62],[-82,63],[-84,63.5],[-87,63.5],[-92,63.5],[-95,63],[-100,63],[-105,63],[-110,63],[-115,63],[-120,63],[-125,63],[-130,62],[-133,61.5],[-138,62],[-139,60],[-138,59],[-135,58.5],[-132,57.5],[-130,56],[-128,54.5],[-127,53.5],[-126,52],[-125.5,50.5],[-124.5,50],[-123,49]]
};

function outlineToPath(coords){return coords.map((c,i)=>{const[x,y]=projectNA(c[0],c[1]);return(i===0?"M":"L")+x.toFixed(1)+" "+y.toFixed(1);}).join(" ")+" Z";}

function HostMapView({results, isAdmin}){
  const[hovered,setHovered]=useState(null);
  const[selected,setSelected]=useState(null);
  const[knockouts,setKnockouts]=useState({});
  const[editKO,setEditKO]=useState(false);
  const[localKO,setLocalKO]=useState({});
  const W=1000,H=520;
  const focus=selected||hovered;
  const focusSede=focus?SEDES_DATA.find(s=>s.city===focus):null;
  const usaPath=useMemo(()=>outlineToPath(COUNTRY_OUTLINES.USA),[]);
  const mexPath=useMemo(()=>outlineToPath(COUNTRY_OUTLINES.MEX),[]);
  const canPath=useMemo(()=>outlineToPath(COUNTRY_OUTLINES.CAN),[]);
  const labelUSA=projectNA(-98,39),labelMEX=projectNA(-102,23),labelCAN=projectNA(-100,55);

  useEffect(()=>{(async()=>{const d=await dbGet("knockouts");if(d){setKnockouts(d);setLocalKO(d);}})();},[]);

  // Get group matches for a sede
  const getSedeMatches=(city)=>{
    return M.filter(m=>{
      const sede=MATCH_SEDE[m.n];
      return sede===city||(city==="Nueva York/NJ"&&sede==="New York/NJ");
    });
  };

  // Get knockout matches for a sede
  const getKOMatches=(city)=>{
    if(!knockouts[city])return[];
    return knockouts[city];
  };

  const saveKO=async()=>{
    await dbSet("knockouts",localKO);
    setKnockouts(localKO);
    setEditKO(false);
  };

  const addKOMatch=(city)=>{
    setLocalKO(p=>({...p,[city]:[...(p[city]||[]),{home:"",away:"",phase:"octavos",date:""}]}));
  };

  const updateKOMatch=(city,idx,field,val)=>{
    setLocalKO(p=>{
      const arr=[...(p[city]||[])];
      arr[idx]={...arr[idx],[field]:val};
      return{...p,[city]:arr};
    });
  };

  const removeKOMatch=(city,idx)=>{
    setLocalKO(p=>{
      const arr=[...(p[city]||[])];
      arr.splice(idx,1);
      return{...p,[city]:arr};
    });
  };

  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"16px 10px"}} className="fi">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,flexWrap:"wrap",gap:8}}>
        <div>
          <h2 className="hdr" style={{fontSize:26}}>🏟️ SEDES MUNDIAL 2026</h2>
          <p style={{color:"var(--txt3)",fontSize:12,marginTop:2}}>11 USA · 3 México · 2 Canadá · Click en una sede para ver sus partidos</p>
        </div>
        {isAdmin&&<button onClick={()=>setEditKO(!editKO)} style={{padding:"7px 16px",background:editKO?"var(--red)":"#7c3aed",color:"#fff",border:"none",borderRadius:7,fontSize:12,cursor:"pointer",fontWeight:600}}>{editKO?"✕ Cancelar":"⚙️ Editar Eliminatorias"}</button>}
      </div>

      {/* Admin KO Editor */}
      {editKO&&isAdmin&&(
        <div className="card" style={{marginBottom:16,borderColor:"#7c3aed44"}}>
          <h3 className="hdr" style={{fontSize:15,color:"#a78bfa",marginBottom:12}}>⚙️ CARGAR CRUCES DE ELIMINATORIAS</h3>
          <p style={{color:"var(--txt3)",fontSize:11,marginBottom:12}}>Agregá los cruces por sede. Ejemplo: "1A vs 2B", "Ganador partido 49", etc.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
            {SEDES_DATA.filter(s=>s.type!=="grupos").map(s=>(
              <div key={s.city} style={{background:"var(--bg2)",borderRadius:8,padding:10}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:SEDE_COLORS[s.type],marginBottom:6}}>{s.city} — {SEDE_LABELS[s.type]}</div>
                {(localKO[s.city]||[]).map((m,idx)=>(
                  <div key={idx} style={{display:"flex",gap:6,marginBottom:5,alignItems:"center"}}>
                    <input className="inp" value={m.home} onChange={e=>updateKOMatch(s.city,idx,"home",e.target.value)} placeholder="Equipo/Clasificado 1" style={{fontSize:11,padding:"5px 8px",flex:1}}/>
                    <span style={{color:"var(--txt3)",fontSize:11}}>vs</span>
                    <input className="inp" value={m.away} onChange={e=>updateKOMatch(s.city,idx,"away",e.target.value)} placeholder="Equipo/Clasificado 2" style={{fontSize:11,padding:"5px 8px",flex:1}}/>
                    <input className="inp" value={m.date||""} onChange={e=>updateKOMatch(s.city,idx,"date",e.target.value)} placeholder="Fecha" style={{fontSize:11,padding:"5px 8px",width:70}}/>
                    <select value={m.phase} onChange={e=>updateKOMatch(s.city,idx,"phase",e.target.value)} style={{background:"var(--bg)",border:"1px solid var(--bd)",color:"var(--wht)",borderRadius:6,padding:"5px 6px",fontSize:10}}>
                      {["octavos","cuartos","semi","final"].map(p=><option key={p} value={p}>{SEDE_LABELS[p]}</option>)}
                    </select>
                    <button onClick={()=>removeKOMatch(s.city,idx)} style={{background:"transparent",color:"var(--red)",border:"1px solid var(--red)",borderRadius:5,padding:"4px 8px",cursor:"pointer",fontSize:11}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>addKOMatch(s.city)} style={{background:"transparent",color:"#7c3aed",border:"1px solid #7c3aed44",borderRadius:6,padding:"5px 12px",cursor:"pointer",fontSize:11,width:"100%",marginTop:2}}>+ Agregar cruce</button>
              </div>
            ))}
          </div>
          <div style={{textAlign:"right",marginTop:12}}>
            <button className="bg" onClick={saveKO} style={{padding:"8px 24px",fontSize:13}}>GUARDAR CRUCES</button>
          </div>
        </div>
      )}

      <div className="map-grid">
        {/* MAP */}
        <div className="card" style={{padding:0,overflow:"hidden",width:"100%"}}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block",background:"radial-gradient(ellipse at 50% 50%,#0a1d3a 0%,#050c18 75%)"}}>
            <defs>
              <radialGradient id="hm-glow"><stop offset="0%" stopColor="#f0d060" stopOpacity="0.5"/><stop offset="100%" stopColor="#f0d060" stopOpacity="0"/></radialGradient>
              <pattern id="hm-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0L0 0 0 32" fill="none" stroke="#0f1f3a" strokeWidth="0.4"/></pattern>
            </defs>
            <rect width={W} height={H} fill="url(#hm-grid)" opacity="0.5"/>
            <path d={canPath} fill="#152744" stroke="#2a4878" strokeWidth={0.8}/>
            <path d={usaPath} fill="#1d3658" stroke="#2a4878" strokeWidth={0.8}/>
            <path d={mexPath} fill="#152744" stroke="#2a4878" strokeWidth={0.8}/>
            <text x={labelCAN[0]} y={labelCAN[1]} textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="22" fill="#1e3a6a" letterSpacing="6">CANADÁ</text>
            <text x={labelUSA[0]} y={labelUSA[1]} textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="22" fill="#2a4d80" letterSpacing="6">ESTADOS UNIDOS</text>
            <text x={labelMEX[0]} y={labelMEX[1]} textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="22" fill="#1e3a6a" letterSpacing="6">MÉXICO</text>
            {SEDES_DATA.map(s=>{
              const[x,y]=projectNA(s.lon,s.lat);
              const color=SEDE_COLORS[s.type];
              const active=hovered===s.city||selected===s.city;
              const r=5+s.games*0.6;
              return(
                <g key={s.city} style={{cursor:"pointer"}} onMouseEnter={()=>setHovered(s.city)} onMouseLeave={()=>setHovered(null)} onClick={()=>setSelected(selected===s.city?null:s.city)}>
                  {active&&<circle cx={x} cy={y} r={r+10} fill="url(#hm-glow)"/>}
                  <circle cx={x} cy={y} r={r+3} fill={color} opacity={0.25}/>
                  <circle cx={x} cy={y} r={r} fill={color} stroke={active?"#fff":"rgba(0,0,0,0.4)"} strokeWidth={active?2:1}/>
                  <text x={x} y={y-r-5} textAnchor="middle" fontSize={active?11:9} fontFamily="'Bebas Neue',sans-serif" fill="#fff" stroke="#050c18" strokeWidth="2.5" paintOrder="stroke" letterSpacing="0.8">{s.city.toUpperCase()}</text>
                  {active&&<text x={x} y={y+r+12} textAnchor="middle" fontSize="8" fontFamily="DM Sans,sans-serif" fill={color} stroke="#050c18" strokeWidth="2" paintOrder="stroke">{s.stadium}</text>}
                </g>
              );
            })}
            <g transform={`translate(20,${H-110})`}>
              <rect width={170} height={96} rx={8} fill="rgba(10,22,40,0.85)" stroke="#162845"/>
              <text x={10} y={16} fontFamily="'Bebas Neue',sans-serif" fontSize="10" fill="#6b8299" letterSpacing="1.5">TIPO DE PARTIDO</text>
              {Object.entries(SEDE_LABELS).map(([k,v],i)=>(
                <g key={k} transform={`translate(10,${28+i*11})`}>
                  <circle cx={4} cy={4} r={4} fill={SEDE_COLORS[k]}/>
                  <text x={14} y={7} fontSize="9" fill="#c8d6e5" fontFamily="DM Sans,sans-serif">{v}</text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* SIDE PANEL */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {/* Sede detail */}
          {focusSede?(
            <div className="card" style={{borderColor:`${SEDE_COLORS[focusSede.type]}44`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:10}}>
                <div>
                  <div className="hdr" style={{fontSize:18,letterSpacing:1.5}}>{focusSede.city.toUpperCase()}</div>
                  <div style={{color:"var(--gold)",fontSize:11,fontWeight:600}}>{focusSede.stadium}</div>
                </div>
                <button onClick={()=>setSelected(null)} style={{background:"transparent",border:"1px solid var(--bd)",color:"var(--txt3)",borderRadius:5,padding:"3px 8px",fontSize:10,cursor:"pointer"}}>✕</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
                <div style={{background:"rgba(0,0,0,0.3)",borderRadius:6,padding:"8px 4px",textAlign:"center"}}>
                  <div className="hdr" style={{fontSize:22,color:"var(--gold)",lineHeight:1}}>{focusSede.games}</div>
                  <div style={{color:"var(--txt3)",fontSize:9,letterSpacing:1.2}}>PARTIDOS</div>
                </div>
                <div style={{background:"rgba(0,0,0,0.3)",borderRadius:6,padding:"8px 4px",textAlign:"center"}}>
                  <div className="hdr" style={{fontSize:14,color:SEDE_COLORS[focusSede.type],lineHeight:1.3,marginTop:4}}>{SEDE_LABELS[focusSede.type]}</div>
                  <div style={{color:"var(--txt3)",fontSize:9,letterSpacing:1.2}}>FASE MÁX.</div>
                </div>
              </div>
              {/* Group matches */}
              {(()=>{
                try{
                  const ms=getSedeMatches(focusSede.city);
                  if(ms.length===0)return null;
                  return(
                    <div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,color:"var(--txt3)",letterSpacing:2,marginBottom:6}}>PARTIDOS DE GRUPOS</div>
                      <div style={{display:"flex",flexDirection:"column",gap:3}}>
                        {ms.map(m=>{
                          const r=(results||{})[m.n]||{h:"",a:""};
                          const hasR=r.h!==""&&r.a!=="";
                          return(
                            <div key={m.n} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",background:"var(--bg2)",borderRadius:6,fontSize:11}}>
                              <span style={{color:"var(--txt3)",minWidth:22,fontSize:10}}>#{m.n}</span>
                              <span style={{flex:1,color:"var(--txt)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{(FL||{})[m.h]||""} {m.h}</span>
                              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:hasR?"var(--gold)":"var(--txt3)",minWidth:36,textAlign:"center"}}>{hasR?`${r.h}-${r.a}`:"vs"}</span>
                              <span style={{flex:1,color:"var(--txt)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"right"}}>{m.a} {(FL||{})[m.a]||""}</span>
                              <span style={{color:"var(--txt3)",fontSize:9,minWidth:28,textAlign:"right"}}>{m.d}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }catch(e){return null;}
              })()}
              {/* KO matches */}
              {(()=>{
                const kos=getKOMatches(focusSede.city);
                if(kos.length===0)return null;
                return(
                  <div style={{marginTop:10}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,color:"var(--txt3)",letterSpacing:2,marginBottom:6}}>ELIMINATORIAS</div>
                    <div style={{display:"flex",flexDirection:"column",gap:3}}>
                      {kos.map((m,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",background:"var(--bg2)",border:`1px solid ${SEDE_COLORS[m.phase]||"var(--bd)"}33`,borderRadius:6,fontSize:11}}>
                          <span className="tg" style={{background:`${SEDE_COLORS[m.phase]||"var(--bd)"}22`,color:SEDE_COLORS[m.phase]||"var(--txt3)",fontSize:8}}>{SEDE_LABELS[m.phase]||m.phase}</span>
                          <span style={{flex:1,color:"var(--txt)"}}>{m.home}</span>
                          <span style={{color:"var(--txt3)",fontSize:10}}>vs</span>
                          <span style={{flex:1,color:"var(--txt)",textAlign:"right"}}>{m.away}</span>
                          {m.date&&<span style={{color:"var(--txt3)",fontSize:9}}>{m.date}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          ):(
            /* Sede list */
            <div className="card" style={{padding:14}}>
              <div className="hdr" style={{fontSize:14,letterSpacing:2,marginBottom:10}}>16 SEDES</div>
              <div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:500,overflowY:"auto"}}>
                {["USA","MEX","CAN"].map(c=>{
                  const list=SEDES_DATA.filter(s=>s.country===c);
                  const flag={USA:"🇺🇸",MEX:"🇲🇽",CAN:"🇨🇦"}[c];
                  const name={USA:"Estados Unidos · 11",MEX:"México · 3",CAN:"Canadá · 2"}[c];
                  return(
                    <div key={c}>
                      <div style={{display:"flex",alignItems:"center",gap:7,padding:"4px 0",borderBottom:"1px solid var(--bd)",marginBottom:5}}>
                        <span style={{fontSize:14}}>{flag}</span>
                        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,color:"var(--gold)",letterSpacing:1.5}}>{name}</span>
                      </div>
                      {list.map(s=>{
                        const color=SEDE_COLORS[s.type];
                        const isFocus=focus===s.city;
                        const koCount=(knockouts[s.city]||[]).length;
                        return(
                          <button key={s.city} onClick={()=>setSelected(isFocus?null:s.city)} onMouseEnter={()=>setHovered(s.city)} onMouseLeave={()=>setHovered(null)}
                            style={{display:"flex",alignItems:"center",gap:8,padding:"6px 9px",borderRadius:7,background:isFocus?"rgba(212,168,67,0.12)":"var(--bg)",border:`1px solid ${isFocus?"var(--gold)":"var(--bd)"}`,cursor:"pointer",textAlign:"left",color:"var(--wht)",width:"100%",marginBottom:3}}>
                            <span style={{width:8,height:8,borderRadius:"50%",background:color,flex:"0 0 8px"}}/>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:12,fontWeight:600}}>{s.city}</div>
                              <div style={{color:"var(--txt3)",fontSize:9,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.stadium}</div>
                            </div>
                            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color}}>{s.games}</span>
                            {koCount>0&&<span style={{fontSize:8,color:"#a78bfa",background:"#7c3aed22",padding:"1px 5px",borderRadius:3}}>{koCount} KO</span>}
                            <span style={{color:"var(--txt3)",fontSize:8,width:24,textAlign:"right"}}>PJ</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
const TEAM_COORDS={
  "Argentina":[-65,-34],"Brasil":[-51,-10],"Uruguay":[-56,-33],"Colombia":[-74,4],"Ecuador":[-78,-2],"Paraguay":[-58,-23],
  "México":[-102,24],"Estados Unidos":[-98,38],"Canadá":[-96,60],"Panamá":[-80,9],"Haití":[-72,19],
  "España":[-4,40],"Francia":[2,46],"Alemania":[10,51],"Portugal":[-8,39],"Inglaterra":[-2,52],"Países Bajos":[5,52],
  "Bélgica":[4,50],"Suecia":[18,59],"Suiza":[8,47],"Croacia":[16,45],"Austria":[15,47],"Bosnia":[17,44],"Chequia":[16,50],"Escocia":[-4,57],"Noruega":[10,62],
  "Marruecos":[-6,32],"Senegal":[-14,14],"Ghana":[-1,7],"Costa de Marfil":[-5,6],"Egipto":[30,26],"Argelia":[3,28],"Sudáfrica":[25,-29],"Cabo Verde":[-24,16],"RD Congo":[24,-2],
  "Turquía":[35,39],"Arabia Saudita":[45,24],"Irán":[53,32],"Irak":[44,33],"Jordania":[37,31],"Uzbekistán":[64,41],
  "Japón":[138,35],"Corea del Sur":[128,37],"Australia":[134,-25],"Nueva Zelanda":[174,-41],"Qatar":[51,25],
  "Túnez":[9,34],"Curazao":[-69,12],"RD Congo":[24,-2]
};

function MapView({allPreds,users,currentUser}){
  const locked=new Date()>=LOCK;
  const[hover,setHover]=useState(null);
  const[selMatch,setSelMatch]=useState(null);

  const paid=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id));

  // For each team in each match, count how many predicted them as winner
  const teamStats=useMemo(()=>{
    const stats={};
    M.forEach(m=>{
      [m.h,m.a].forEach(team=>{
        if(!stats[team])stats[team]={wins:0,draws:0,losses:0,voters:[],total:0};
      });
      paid.forEach(([id,u])=>{
        const p=(allPreds[id]||{})[m.n]||{h:"",a:""};
        if(!p.h||!p.a)return;
        const ph=+p.h,pa=+p.a;
        if(ph>pa){stats[m.h].wins++;stats[m.h].voters.push({name:u.name,match:`${m.h} vs ${m.a}`,pred:`${ph}-${pa}`});stats[m.h].total++;stats[m.a].losses++;stats[m.a].total++;}
        else if(ph<pa){stats[m.a].wins++;stats[m.a].voters.push({name:u.name,match:`${m.h} vs ${m.a}`,pred:`${ph}-${pa}`});stats[m.a].total++;stats[m.h].losses++;stats[m.h].total++;}
        else{stats[m.h].draws++;stats[m.h].total++;stats[m.a].draws++;stats[m.a].total++;}
      });
    });
    return stats;
  },[allPreds,users]);

  // Project coords to SVG
  const proj=(lon,lat)=>[(lon+180)/360*800,(90-lat)/180*400];

  const maxWins=Math.max(...Object.values(teamStats).map(s=>s.wins),1);

  return(
    <div style={{maxWidth:920,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:4}}>🌍 MAPA DE PRONÓSTICOS</h2>
      <p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",marginBottom:16}}>
        {locked?"Hacé click en un país para ver quién apostó por él":"Cuántos participantes apostaron por cada selección como ganadora"}
      </p>
      <div style={{position:"relative",background:"#0a1628",borderRadius:12,border:"1px solid var(--bd)",overflow:"hidden"}}>
        <svg viewBox="0 0 800 400" style={{width:"100%"}}>
          {/* Simple world background */}
          <rect width="800" height="400" fill="#0a1628"/>
          {/* Ocean lines */}
          {[...Array(8)].map((_,i)=><line key={i} x1={0} y1={i*50+25} x2={800} y2={i*50+25} stroke="#162845" strokeWidth="0.5"/>)}
          {[...Array(16)].map((_,i)=><line key={i} x1={i*50+25} y1={0} x2={i*50+25} y2={400} stroke="#162845" strokeWidth="0.5"/>)}
          {/* Team dots */}
          {Object.entries(TEAM_COORDS).map(([team,[lon,lat]])=>{
            const s=teamStats[team];
            if(!s)return null;
            const[x,y]=proj(lon,lat);
            const r=4+Math.sqrt(s.wins/maxWins)*18;
            const opacity=s.wins>0?0.85:0.3;
            const color=s.wins>8?"#FFD700":s.wins>4?"#22c55e":s.wins>0?"#3b82f6":"#3d556b";
            const isHovered=hover===team;
            return(
              <g key={team} style={{cursor:"pointer"}} onMouseEnter={()=>setHover(team)} onMouseLeave={()=>setHover(null)} onClick={()=>setHover(hover===team?null:team)}>
                <circle cx={x} cy={y} r={r} fill={color} opacity={opacity} stroke={isHovered?"#fff":"transparent"} strokeWidth={2}/>
                {s.wins>0&&<text x={x} y={y+r+8} textAnchor="middle" fill="rgba(255,255,255,.6)" fontSize="7">{FL[team]||""}</text>}
                {isHovered&&<>
                  <circle cx={x} cy={y} r={r+3} fill="none" stroke="#fff" strokeWidth={1.5} opacity={0.6}/>
                </>}
              </g>
            );
          })}
        </svg>
        {/* Hover tooltip */}
        {hover&&teamStats[hover]&&(()=>{
          const s=teamStats[hover];
          return(
            <div style={{position:"absolute",top:10,right:10,background:"rgba(11,24,41,.95)",border:"1px solid var(--bd)",borderRadius:10,padding:14,minWidth:200,maxWidth:260}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:22}}>{FL[hover]||"🏳️"}</span>
                <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--gold)"}}>{hover}</div></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4,marginBottom:8}}>
                {[{v:s.wins,l:"Victorias",c:"var(--grn)"},{v:s.draws,l:"Empates",c:"var(--org)"},{v:s.losses,l:"Derrotas",c:"var(--red)"}].map(x=>(
                  <div key={x.l} style={{textAlign:"center",background:"rgba(0,0,0,.3)",borderRadius:5,padding:"4px"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:x.c}}>{x.v}</div>
                    <div style={{color:"var(--txt3)",fontSize:8}}>{x.l}</div>
                  </div>
                ))}
              </div>
              {locked&&s.voters.length>0&&(
                <div>
                  <div style={{color:"var(--txt3)",fontSize:9,marginBottom:4}}>APOSTARON VICTORIA:</div>
                  {[...new Set(s.voters.map(v=>v.name))].slice(0,5).map((n,i)=>(
                    <div key={i} style={{fontSize:10,color:"var(--txt)",padding:"2px 0",borderBottom:"1px solid var(--bd)11"}}>{n}</div>
                  ))}
                  {[...new Set(s.voters.map(v=>v.name))].length>5&&<div style={{fontSize:9,color:"var(--txt3)"}}>+{[...new Set(s.voters.map(v=>v.name))].length-5} más</div>}
                </div>
              )}
              {!locked&&<div style={{color:"var(--txt3)",fontSize:10}}>{[...new Set(s.voters.map(v=>v.name))].length} participantes apostaron victorias</div>}
            </div>
          );
        })()}
      </div>
      {/* Legend */}
      <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:10,flexWrap:"wrap"}}>
        {[{c:"#FFD700",l:"9+ victorias apostadas"},{c:"#22c55e",l:"5-8 victorias"},{c:"#3b82f6",l:"1-4 victorias"},{c:"#3d556b",l:"Sin victorias apostadas"}].map(x=>(
          <div key={x.l} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:10,borderRadius:"50%",background:x.c}}/><span style={{color:"var(--txt3)",fontSize:10}}>{x.l}</span></div>
        ))}
      </div>
    </div>
  );
}

function Rules(){
  const sec=[
    {t:"Puntuación",i:["✅ 3 puntos — Resultado exacto","🟡 1 punto — Acertás el signo","❌ 0 puntos — No acertás nada"]},
    {t:"Bonus por Rachas de Exactos",i:["🔥 +1 punto por 3 exactos seguidos","🔥🔥 +3 puntos por 5 exactos seguidos","Solo cuentan los exactos para las rachas"]},
    {t:"Desempate (en orden)",i:["1️⃣ Más puntos totales","2️⃣ Más resultados exactos","3️⃣ Más rachas de 5 exactos","4️⃣ Más rachas de 3 exactos","5️⃣ Racha activa más larga","6️⃣ Más goles pronosticados"]},
    {t:"Plazos",i:["📅 Predicciones editables hasta el 9/06","🔒 Después se bloquean y se habilita la tabla","👀 Después del 9/06 ves las predicciones de todos"]},
    {t:"Premios",i:["💰 Inscripción $25.000 • Alias: fran.quiros.mp","🗓️ Fecha límite de pago: 8 de junio","📱 Comprobante al 2235638732","🥇 1° → 70% • 🥈 2° → 20% • 🥉 3° → 10%","Sin pagar podés jugar pero no competís por premios"]},
  ];
  return(<div style={{maxWidth:680,margin:"0 auto",padding:"24px 16px"}} className="fi"><h2 className="hdr" style={{fontSize:26,textAlign:"center",marginBottom:18}}>📋 REGLAS</h2>{sec.map(s=>(<div key={s.t} className="card" style={{marginBottom:10}}><h3 className="hdr" style={{fontSize:15,marginBottom:8}}>{s.t}</h3>{s.i.map((x,i)=><p key={i} style={{color:"var(--txt)",fontSize:12,margin:"4px 0",lineHeight:1.5}}>{x}</p>)}</div>))}</div>);
}

// ═══════════════════════════════════════════════════════
// INVITE SECTION
// ═══════════════════════════════════════════════════════
function InviteSection(){
  const[open,setOpen]=useState(false);
  const[copied,setCopied]=useState(false);
  const url="https://project-239kr.vercel.app";
  const wppText=`⚽ *PRODE MUNDIAL 2026* ⚽

🏆 Sumate al prode del Mundial!

📋 *Cómo anotarse:*
1️⃣ Entrá a ${url}
2️⃣ Registrate con tu nombre
3️⃣ Pagá la inscripción de $25.000
4️⃣ Alias MP: fran.quiros.mp
5️⃣ Mandá el comprobante al 2235638732

💰 *El pozo:* 70% al 1°, 20% al 2°, 10% al 3°
📅 Último día para pagar: 8 de junio
✏️ Cierre de predicciones: 9 de junio

📱 *Instalalo como app:*
🍎 iPhone: Abrí Safari → 3 puntos (…) → Compartir → Ver más → Agregar a inicio
🤖 Android: Abrí Chrome → 3 puntos (⋮) → Agregar a pantalla de inicio

¡No te lo pierdas!`;

  return(
    <div className="card" style={{marginBottom:16,borderColor:"rgba(212,168,67,.3)",padding:0,overflow:"hidden"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"14px 20px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left"}}>
        <span style={{fontSize:28}}>📣</span>
        <div style={{flex:1}}><div className="hdr" style={{fontSize:18}}>INVITÁ A TUS AMIGOS</div><div style={{color:"var(--txt3)",fontSize:11}}>Compartí el prode y armá el grupo</div></div>
        <span style={{color:"var(--gold)",fontSize:18,transition:"transform .3s",display:"inline-block",transform:open?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
      </button>
      {open&&<div style={{padding:"0 20px 20px"}}>

      {/* Info rápida */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8,marginBottom:14}}>
        {[
          {i:"💰",t:"Inscripción",v:"$25.000"},
          {i:"📅",t:"Último pago",v:"8 de junio"},
          {i:"✏️",t:"Cierre preds",v:"9 de junio"},
          {i:"🏆",t:"Premio mayor",v:"70% del pozo"},
        ].map(x=>(
          <div key={x.t} style={{background:"var(--bg2)",borderRadius:8,padding:"8px 12px",textAlign:"center"}}>
            <div style={{fontSize:18,marginBottom:2}}>{x.i}</div>
            <div style={{color:"var(--txt3)",fontSize:9,letterSpacing:1}}>{x.t.toUpperCase()}</div>
            <div style={{color:"var(--wht)",fontSize:13,fontWeight:700,marginTop:2}}>{x.v}</div>
          </div>
        ))}
      </div>

      {/* Pasos para anotarse */}
      <div style={{marginBottom:14}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"var(--gold)",letterSpacing:2,marginBottom:8}}>📋 CÓMO ANOTARSE</div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {[
            "Entrá a la web desde Safari (iPhone) o Chrome (Android)",
            "Registrate con tu nombre de usuario y contraseña",
            "Pagá $25.000 al alias MP: fran.quiros.mp",
            "Mandá el comprobante por WhatsApp al 2235638732",
            "Una vez aprobado, completá tus 72 predicciones antes del 9/06",
          ].map((paso,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--gold)",minWidth:20,lineHeight:1.4}}>{i+1}</span>
              <span style={{color:"var(--txt)",fontSize:12,lineHeight:1.5}}>{paso}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instalar como app */}
      <div style={{background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.2)",borderRadius:8,padding:"10px 14px",marginBottom:14}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:"#3b82f6",letterSpacing:2,marginBottom:6}}>📱 INSTALALO COMO APP</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div>
            <div style={{color:"var(--gold)",fontSize:11,fontWeight:700,marginBottom:4}}>🍎 iPhone (Safari)</div>
            {["Abrí Safari (no Chrome)","Tocá los 3 puntos (…) arriba","Tocá Compartir","Tocá la flechita → Ver más","Seleccioná Agregar a inicio"].map((p,i)=>(
              <div key={i} style={{fontSize:10,color:"var(--txt2)",marginBottom:2}}>{i+1}. {p}</div>
            ))}
          </div>
          <div>
            <div style={{color:"var(--gold)",fontSize:11,fontWeight:700,marginBottom:4}}>🤖 Android (Chrome)</div>
            {["Abrí Chrome","Tocá los 3 puntos (⋮) arriba","Tocá Agregar a pantalla de inicio","Confirmá el nombre","Tocá Agregar"].map((p,i)=>(
              <div key={i} style={{fontSize:10,color:"var(--txt2)",marginBottom:2}}>{i+1}. {p}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Alias */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        <span style={{color:"var(--txt3)",fontSize:12}}>💳 Alias MP:</span>
        <button onClick={()=>{navigator.clipboard.writeText("fran.quiros.mp");setCopied(true);setTimeout(()=>setCopied(false),2000);}}
          style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--wht)",background:"rgba(0,0,0,.3)",border:"1px solid rgba(212,168,67,.3)",borderRadius:6,padding:"4px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          fran.quiros.mp 📋
        </button>
        {copied&&<span style={{color:"var(--grn)",fontSize:11,fontWeight:700}}>✓ Copiado!</span>}
        <span style={{color:"var(--txt3)",fontSize:11}}>Comprobante al 2235638732</span>
      </div>

      {/* Share buttons */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <a href={`https://wa.me/?text=${encodeURIComponent(wppText)}`} target="_blank" rel="noreferrer"
          style={{flex:1,minWidth:140,display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#25D366",color:"#fff",padding:"10px 16px",borderRadius:8,fontSize:13,fontWeight:700,textDecoration:"none",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1}}>
          📲 COMPARTIR POR WHATSAPP
        </a>
        <button onClick={()=>{navigator.clipboard.writeText(url);setCopied(true);setTimeout(()=>setCopied(false),2000);}}
          style={{display:"flex",alignItems:"center",gap:6,background:"var(--bg2)",color:"var(--txt)",border:"1px solid var(--bd)",padding:"10px 16px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1}}>
          🔗 COPIAR LINK
        </button>
      </div>
      </div>}
    </div>
  );
}


function Home({users,results}){
  const paid=Object.values(users).filter(u=>u.paid).length,pool=paid*FEE;
  const approved=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id)).length;
  const played=M.filter(m=>results[m.n]&&results[m.n].h!==""&&results[m.n].a!=="").length;
  const locked=new Date()>=LOCK;
  return(
    <div style={{maxWidth:800,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <div style={{textAlign:"center",marginBottom:18}}><h2 className="hdr" style={{fontSize:26}}>BIENVENIDO AL PRODE</h2><p style={{color:"var(--txt2)",fontSize:12,marginTop:3}}>Fase de Grupos • 72 partidos • 12 grupos</p></div>
      <InviteSection/>
      <Countdown/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:20}}>
        {[{i:"🏆",l:"POZO",v:fmt$(pool),s:`${paid} pagaron`},{i:"👥",l:"JUGADORES",v:approved,s:"habilitados"},{i:"⚽",l:"PARTIDOS",v:`${played}/72`,s:"jugados"},{i:locked?"🔒":"✏️",l:"PREDICCIONES",v:locked?"LOCKED":"ABIERTAS",s:locked?"Desde 9/06":"Hasta 9/06"}].map((c,i)=>(
          <div key={i} className="card" style={{textAlign:"center",padding:16}}><div style={{fontSize:24,marginBottom:4}}>{c.i}</div><div style={{color:"var(--txt3)",fontSize:8,letterSpacing:2}}>{c.l}</div><div className="hdr" style={{fontSize:22,color:"var(--wht)"}}>{c.v}</div><div style={{color:"var(--txt3)",fontSize:9}}>{c.s}</div></div>
        ))}
      </div>
      <div className="card">
        <h3 className="hdr" style={{fontSize:16,marginBottom:12}}>💰 PREMIOS</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[{p:"🥇 1°",pct:70,c:"#FFD700"},{p:"🥈 2°",pct:20,c:"#C0C0C0"},{p:"🥉 3°",pct:10,c:"#CD7F32"}].map(x=>(
            <div key={x.p} style={{textAlign:"center",padding:12,background:"rgba(0,0,0,.25)",borderRadius:7,border:`1px solid ${x.c}22`}}><div style={{fontSize:16}}>{x.p}</div><div className="hdr" style={{fontSize:20,color:x.c}}>{fmt$(Math.floor(pool*x.pct/100))}</div><div style={{color:"var(--txt3)",fontSize:10}}>{x.pct}%</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IAPredsEditor({aiId,preds:initP}){
  // Always start with hardcoded preds merged with any saved overrides
  const defaultP=useMemo(()=>{
    const hard=AI_PREDS[aiId]||{};
    const stored=initP||{};
    const merged={};
    for(let n=1;n<=72;n++){
      const s=stored[n];
      const h=hard[n]||{h:"",a:""};
      merged[n]=(s&&s.h!==""&&s.a!=="")?s:h;
    }
    return merged;
  },[aiId,initP]);
  const[preds,setPreds]=useState(defaultP);
  // Auto-save to Firebase on first load if not saved yet
  useEffect(()=>{
    const hasSaved=Object.values(initP||{}).some(p=>p&&p.h!=="");
    if(!hasSaved&&Object.keys(AI_PREDS[aiId]||{}).length>0){
      dbSet(`preds-${aiId}`,defaultP);
    }
  },[aiId]);const[saving,setSaving]=useState(false);const[saved,setSaved]=useState(false);const[filter,setFilter]=useState("all");
  const chg=(n,side,val)=>{const v=val.replace(/[^0-9]/g,"").slice(0,2);setPreds(p=>({...p,[n]:{...(p[n]||{h:"",a:""}),[side]:v}}));setSaved(false);};
  const save=async()=>{setSaving(true);await dbSet(`preds-${aiId}`,preds);setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const groups=[...new Set(M.map(m=>m.g))].sort();const filtered=filter==="all"?M:M.filter(m=>m.g===filter);
  return(<div><div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}><button className={`fb${filter==="all"?" act":""}`} onClick={()=>setFilter("all")}>Todos</button>{groups.map(g=><button key={g} className={`fb${filter===g?" act":""}`} onClick={()=>setFilter(g)}>{g}</button>)}</div><div style={{display:"flex",flexDirection:"column",gap:2,maxHeight:280,overflowY:"auto"}}>{filtered.map(m=>{const p=preds[m.n]||{h:"",a:""};return(<div key={m.n} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 6px"}}><span style={{color:"var(--txt3)",fontSize:10,width:22}}>#{m.n}</span><span style={{fontSize:10,color:"var(--txt)",flex:1,textAlign:"right"}}>{m.h}</span><input className="si" value={p.h} onChange={e=>chg(m.n,"h",e.target.value)} style={{width:28,height:28,fontSize:12}} maxLength={2}/><span style={{color:"var(--txt3)",fontSize:9}}>-</span><input className="si" value={p.a} onChange={e=>chg(m.n,"a",e.target.value)} style={{width:28,height:28,fontSize:12}} maxLength={2}/><span style={{fontSize:10,color:"var(--txt)",flex:1}}>{m.a}</span></div>);})}</div><div style={{marginTop:8,textAlign:"right"}}><button className="bg" onClick={save} disabled={saving} style={{padding:"5px 14px",fontSize:11,background:saved?"var(--grn)":"",color:saved?"#fff":""}}>{saving?"...":saved?"✓":"Guardar"}</button></div></div>);
}

// ═══════════════════════════════════════════════════════
// AVANCE ADMIN - Manage bracket advancement
// ═══════════════════════════════════════════════════════
const ROUNDS = [
  {id:"r32",   label:"Ronda de 32",  teams:32},
  {id:"r16",   label:"Octavos",      teams:16},
  {id:"qf",    label:"Cuartos",      teams:8},
  {id:"sf",    label:"Semifinales",  teams:4},
  {id:"final", label:"Final",        teams:2},
  {id:"winner",label:"Campeón",      teams:1},
];

function AvanceAdmin(){
  const[avance,setAvance]=useState({});
  const[saving,setSaving]=useState(false);
  const[saved,setSaved]=useState(false);
  const[selRound,setSelRound]=useState("r32");

  useEffect(()=>{(async()=>{
    const d=await dbGet("avance");
    if(d)setAvance(d);
  })();},[]);

  const toggleTeam=(round,team)=>{
    setAvance(prev=>{
      const curr=prev[round]||[];
      const exists=curr.includes(team);
      return{...prev,[round]:exists?curr.filter(t=>t!==team):[...curr,team]};
    });
    setSaved(false);
  };

  const save=async()=>{
    setSaving(true);
    await dbSet("avance",avance);
    setSaving(false);setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  };

  const round=ROUNDS.find(r=>r.id===selRound);
  const selected=avance[selRound]||[];

  return(
    <div>
      <p style={{color:"var(--txt3)",fontSize:12,marginBottom:14}}>
        Marcá los equipos que clasificaron a cada fase. Se refleja en el tab AVANCE del mapa.
      </p>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        {ROUNDS.map(r=>(
          <button key={r.id} className={`nb${selRound===r.id?" act":""}`}
            onClick={()=>setSelRound(r.id)}
            style={selRound===r.id?{background:"var(--red)",borderColor:"var(--red)"}:{}}>
            {r.label} {avance[r.id]?.length>0&&<span style={{color:"var(--gold)",fontSize:9}}>({avance[r.id].length})</span>}
          </button>
        ))}
      </div>
      <div style={{marginBottom:10,color:"var(--txt2)",fontSize:12}}>
        Seleccionados: <strong style={{color:"var(--gold)"}}>{selected.length}</strong> de {round?.teams} esperados
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:6,marginBottom:14}}>
        {TEAMS.sort((a,b)=>a.name.localeCompare(b.name)).map(t=>{
          const isSelected=selected.includes(t.name);
          return(
            <button key={t.id} onClick={()=>toggleTeam(selRound,t.name)}
              style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,
                background:isSelected?"rgba(34,197,94,0.15)":"var(--bg3)",
                border:`1px solid ${isSelected?"var(--grn)":"var(--bd)"}`,
                cursor:"pointer",color:"var(--wht)",textAlign:"left",transition:"all .15s"}}>
              <span style={{fontSize:16}}>{FL[t.name]||"🏳️"}</span>
              <span style={{fontSize:11,flex:1}}>{t.name}</span>
              {isSelected&&<span style={{color:"var(--grn)",fontSize:14}}>✓</span>}
            </button>
          );
        })}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{color:"var(--txt3)",fontSize:11}}>
          Los cambios se ven en 🌍 Mapa → AVANCE
        </div>
        <button className="bg" onClick={save} disabled={saving}
          style={{background:saved?"var(--grn)":"",color:saved?"#fff":""}}>
          {saving?"Guardando...":saved?"✓ Guardado":"GUARDAR AVANCE"}
        </button>
      </div>
    </div>
  );
}

// Teams list for avance admin
const TEAMS_LIST = [
  "México","Sudáfrica","Corea del Sur","Chequia","Canadá","Bosnia","Qatar","Suiza",
  "Brasil","Marruecos","Haití","Escocia","Estados Unidos","Paraguay","Australia","Turquía",
  "Alemania","Curazao","Costa de Marfil","Ecuador","Países Bajos","Japón","Suecia","Túnez",
  "España","Cabo Verde","Arabia Saudita","Uruguay","Bélgica","Egipto","Irán","Nueva Zelanda",
  "Francia","Senegal","Irak","Noruega","Argentina","Argelia","Austria","Jordania",
  "Inglaterra","Croacia","Ghana","Panamá","Portugal","RD Congo","Uzbekistán","Colombia"
];


function Admin({users,setUsers,results,setResults,allPreds}){
  const[tab,setTab]=useState("users");const[saving,setSaving]=useState(false);const[localR,setLocalR]=useState({...results});const[filter,setFilter]=useState("all");const[showPass,setShowPass]=useState({});const[liveMsg,setLiveMsg]=useState("");const[liveLoading,setLiveLoading]=useState(false);
  const approve=async(id)=>{const u={...users,[id]:{...users[id],approved:true}};setUsers(u);await dbSet("users",u)};
  const reject=async(id)=>{const u={...users,[id]:{...users[id],approved:false}};setUsers(u);await dbSet("users",u)};
  const pay=async(id,p)=>{const u={...users,[id]:{...users[id],paid:p}};setUsers(u);await dbSet("users",u)};
  const chgR=(n,side,val)=>{const v=val.replace(/[^0-9]/g,"").slice(0,2);setLocalR(p=>({...p,[n]:{...(p[n]||{h:"",a:""}),[side]:v}}))};
  const saveR=async()=>{setSaving(true);setResults(localR);await dbSet("results",localR);setSaving(false)};
  const fetchLive=async()=>{setLiveLoading(true);setLiveMsg("Consultando API...");try{const res=await fetch("https://api.football-data.org/v4/competitions/2000/matches?season=2026",{headers:{"X-Auth-Token":"b865d776d42047e7a862a37bb4b84868"}});if(!res.ok)throw new Error();const data=await res.json();const updated={...localR};data.matches?.forEach(m=>{if(m.status==="FINISHED"&&m.score?.fullTime){const match=M.find(mm=>mm.h===m.homeTeam?.name||mm.a===m.awayTeam?.name);if(match)updated[match.n]={h:String(m.score.fullTime.home??0),a:String(m.score.fullTime.away??0)};}});setLocalR(updated);setResults(updated);await dbSet("results",updated);setLiveMsg("✓ Actualizado desde API");}catch{setLiveMsg("Error con API. Cargá manual.");} setLiveLoading(false);};
  const dlAll=()=>{const approved=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id));let c="=== TABLA GENERAL ===\nPos,Nombre,Email,Pago,Pts,Bonus,Total,Ex,Si\n";approved.map(([id,u])=>({id,name:u.name,email:u.email,paid:u.paid,...calcTotal(allPreds[id]||{},results)})).sort(cmp).forEach((r,i)=>{c+=`${i+1},${r.name},${r.email||""},${r.paid?"Si":"No"},${r.mp},${r.bo},${r.tot},${r.ex},${r.si}\n`;});c+="\n=== PREDICCIONES ===\nPartido,Local,Visitante,Real L,Real V";approved.forEach(([,u])=>{c+=`,${u.name}`;});c+="\n";M.forEach(m=>{const r=results[m.n]||{h:"",a:""};c+=`#${m.n},${m.h},${m.a},${r.h},${r.a}`;approved.forEach(([id])=>{const p=(allPreds[id]||{})[m.n]||{h:"",a:""};c+=`,${p.h&&p.a?p.h+"-"+p.a:"—"}`;});c+="\n";});const b=new Blob([c],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(b);const a=document.createElement("a");a.href=url;a.download="prode2026_backup_admin.csv";a.click();};
  const paid=Object.values(users).filter(u=>u.paid).length,pool=paid*FEE;
  const pending=Object.values(users).filter(u=>!u.approved&&!AI_IDS.includes(Object.keys(users).find(k=>users[k]===u))).length;
  const groups=[...new Set(M.map(m=>m.g))].sort();const filtM=filter==="all"?M:M.filter(m=>m.g===filter);
  return(
    <div style={{maxWidth:950,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
        <h2 className="hdr" style={{fontSize:22,color:"var(--red)"}}>⚙️ PANEL ADMIN</h2>
        <button onClick={dlAll} style={{padding:"7px 14px",background:"var(--grn)",color:"#fff",border:"none",borderRadius:7,fontSize:12,cursor:"pointer",fontWeight:600}}>📥 Descargar TODO en Excel</button>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:16,flexWrap:"wrap"}}>
        {[{id:"users",l:`Usuarios${pending>0?` (${pending})`:""}`},{id:"results",l:"Resultados"},{id:"avance_admin",l:"📈 Avance"},{id:"ia_admin",l:"🤖 IA"},{id:"stats_s",l:"Resumen"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className="nb" style={{background:tab===t.id?"var(--red)":"transparent",color:tab===t.id?"#fff":"var(--red)",borderColor:"var(--red)"}}>{t.l}</button>
        ))}
      </div>
      {tab==="users"&&<div>
        {Object.entries(users).filter(([id])=>!AI_IDS.includes(id)).sort(([,a],[,b])=>a.approved===b.approved?0:a.approved?1:-1).map(([id,u])=>(
          <div key={id} className="card" style={{display:"flex",alignItems:"center",gap:7,marginBottom:5,padding:"9px 12px",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:130}}><span style={{color:"var(--wht)",fontWeight:600,fontSize:12}}>{u.name}</span><span style={{color:"var(--txt3)",fontSize:10,marginLeft:5}}>{u.email}</span>{showPass[id]&&<span style={{color:"#f59e0b",fontSize:10,marginLeft:7,background:"rgba(0,0,0,.4)",padding:"1px 5px",borderRadius:3}}>🔑 {u.pass}</span>}</div>
            <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
              {u.approved?<span className="tg" style={{background:"rgba(34,197,94,.15)",color:"var(--grn)"}}>✓</span>:<span className="tg" style={{background:"rgba(220,53,69,.15)",color:"var(--red)"}}>Pendiente</span>}
              {u.paid?<span className="tg" style={{background:"rgba(212,168,67,.15)",color:"var(--gold)"}}>💰 Pagó</span>:<span style={{color:"var(--txt3)",fontSize:10}}>No pagó</span>}
              <button className="bsm" style={{background:"rgba(99,102,241,.2)",color:"#818cf8",border:"1px solid #818cf833"}} onClick={()=>setShowPass(p=>({...p,[id]:!p[id]}))}>🔑</button>
              {!u.approved&&<button className="bsm" style={{background:"var(--grn)",color:"#fff"}} onClick={()=>approve(id)}>Habilitar</button>}
              {u.approved&&<button className="bsm" style={{background:"transparent",color:"var(--red)",border:"1px solid var(--red)"}} onClick={()=>reject(id)}>Deshab.</button>}
              {!u.paid&&u.approved&&<button className="bsm" style={{background:"var(--gold)",color:"var(--bg)"}} onClick={()=>pay(id,true)}>Pagó ✓</button>}
              {u.paid&&<button className="bsm" style={{background:"transparent",color:"var(--gold)",border:"1px solid var(--gold)"}} onClick={()=>pay(id,false)}>Quitar</button>}
            </div>
          </div>
        ))}
      </div>}
      {tab==="results"&&<div>
        <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
          <button onClick={fetchLive} disabled={liveLoading} style={{padding:"6px 14px",background:"#1d4ed8",color:"#fff",border:"none",borderRadius:7,fontSize:12,cursor:"pointer",fontWeight:600}}>{liveLoading?"...":"🌐 Actualizar desde API"}</button>
          {liveMsg&&<span style={{fontSize:11,color:"var(--gold)"}}>{liveMsg}</span>}
        </div>
        <p style={{color:"var(--txt3)",fontSize:10,marginBottom:10}}>API configurada ✓ — Usá el botón para actualizar resultados automáticamente</p>
        <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:10}}>
          <button className={`fb${filter==="all"?" act":""}`} onClick={()=>setFilter("all")} style={filter==="all"?{background:"var(--red)",borderColor:"var(--red)"}:{}}>Todos</button>
          {groups.map(g=><button key={g} className={`fb${filter===g?" act":""}`} onClick={()=>setFilter(g)} style={filter===g?{background:"var(--red)",borderColor:"var(--red)"}:{}}>G{g}</button>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          {filtM.map(m=>{const r=localR[m.n]||{h:"",a:""};return(
            <div key={m.n} className="mr" style={{padding:"7px 10px"}}>
              <span style={{color:"var(--txt3)",fontSize:10,width:26}}>#{m.n}</span><span className="tg" style={{background:"var(--bd)",color:"var(--red)",fontSize:9}}>G{m.g}</span>
              <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,minWidth:200}}><span style={{fontSize:11,color:"var(--txt)",textAlign:"right",flex:1}}>{FL[m.h]||""} {m.h}</span><input className="si" value={r.h} onChange={e=>chgR(m.n,"h",e.target.value)} placeholder="-" maxLength={2} style={{borderColor:"rgba(220,53,69,.3)"}}/><span style={{color:"var(--txt3)",fontSize:10}}>–</span><input className="si" value={r.a} onChange={e=>chgR(m.n,"a",e.target.value)} placeholder="-" maxLength={2} style={{borderColor:"rgba(220,53,69,.3)"}}/><span style={{fontSize:11,color:"var(--txt)",textAlign:"left",flex:1}}>{m.a} {FL[m.a]||""}</span></div>
            </div>
          );})}
        </div>
        <div style={{textAlign:"center",marginTop:12}}><button className="br" onClick={saveR} disabled={saving}>{saving?"...":"GUARDAR RESULTADOS"}</button></div>
      </div>}
      {tab==="avance_admin"&&<AvanceAdmin/>}
      {tab==="ia_admin"&&<div>{AI_IDS.map(aiId=>{const inf=AI_INFO[aiId];return(<div key={aiId} className="card" style={{marginBottom:14,borderColor:inf.color+"44"}}><h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:inf.color,marginBottom:10}}>{inf.flag} {inf.name}</h3><IAPredsEditor aiId={aiId} preds={allPreds[aiId]||{}}/></div>);})}</div>}
      {tab==="stats_s"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
        {[{l:"Registrados",v:Object.keys(users).filter(id=>!AI_IDS.includes(id)).length},{l:"Habilitados",v:Object.values(users).filter(u=>u.approved).length},{l:"Pagaron",v:paid},{l:"Pendientes",v:pending},{l:"Pozo",v:fmt$(pool)},{l:"1°",v:fmt$(Math.floor(pool*.7))},{l:"2°",v:fmt$(Math.floor(pool*.2))},{l:"3°",v:fmt$(Math.floor(pool*.1))}].map(s=>(<div key={s.l} className="card" style={{textAlign:"center",padding:12}}><div style={{color:"var(--txt3)",fontSize:9,letterSpacing:2}}>{s.l}</div><div className="hdr" style={{fontSize:22,color:"var(--wht)"}}>{s.v}</div></div>))}
      </div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// ADMIN PREVIEW
// ═══════════════════════════════════════════════════════
function AdminPreview({allPreds,results,onClose}){
  const[tab,setTab]=useState("anims");
  const[animType,setAnimType]=useState(null);
  const pattern=[3,3,3,1,0,3,3,3,3,3,1,0,0,3,3,3,3,3,3,3];
  const mockPreds={};const mockResults={};
  M.forEach((m,i)=>{const pt=pattern[i%pattern.length];if(pt===3){mockPreds[m.n]={h:"2",a:"1"};mockResults[m.n]={h:"2",a:"1"};}else if(pt===1){mockPreds[m.n]={h:"1",a:"0"};mockResults[m.n]={h:"3",a:"2"};}else{mockPreds[m.n]={h:"1",a:"2"};mockResults[m.n]={h:"3",a:"0"};}});
  const mockUsers={"pu":{name:"Preview User",approved:true,paid:true},"u2":{name:"Jugador 2",approved:true,paid:true},"u3":{name:"Jugador 3",approved:true,paid:true}};
  const mockAP={"pu":mockPreds,"u2":Object.fromEntries(M.map(m=>[m.n,{h:"1",a:"0"}])),"u3":Object.fromEntries(M.map(m=>[m.n,{h:"0",a:"1"}]))};
  const tabs=[{id:"anims",l:"🎭 Animaciones"},{id:"badges",l:"🏅 Medallas"},{id:"chart",l:"📈 Gráfico"},{id:"thermo",l:"🌡️ Confianza"},{id:"profile",l:"👤 Perfil"},{id:"map",l:"🌍 Mapa"}];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.96)",zIndex:200,overflowY:"auto"}}>
      <style>{CSS}</style>
      {animType&&<Anim type={animType} onDone={()=>setAnimType(null)}/>}
      <div style={{position:"sticky",top:0,background:"#111827",borderBottom:"2px solid #7c3aed",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:10,flexWrap:"wrap",gap:8}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"#a78bfa",letterSpacing:2}}>👁 MODO PREVIEW ADMIN</div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {tabs.map(t=><button key={t.id} className={`nb${tab===t.id?" act":""}`} onClick={()=>setTab(t.id)} style={{fontSize:10,padding:"5px 10px"}}>{t.l}</button>)}
          <button onClick={onClose} style={{background:"var(--red)",color:"#fff",border:"none",borderRadius:6,padding:"5px 14px",cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",fontSize:13}}>✕ CERRAR</button>
        </div>
      </div>
      <div style={{padding:"0 0 40px"}}>
        {tab==="anims"&&<div style={{maxWidth:600,margin:"0 auto",padding:"30px 16px"}}>
          <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:20}}>🎭 ANIMACIONES</h2>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[{type:"exact",title:"🎯 Resultado Exacto",desc:"Confetti dorado, aparece cuando el usuario acertó 3 puntos",color:"#22c55e"},{type:"sign",title:"🔥 Acertó el Signo",desc:"Lluvia de fuego, aparece cuando acertó el ganador",color:"#f59e0b"},{type:"miss",title:"😬 Erró el Pronóstico",desc:"Lluvia de agua, aparece cuando no acertó nada",color:"#dc3545"}].map(a=>(
              <div key={a.type} className="card" style={{borderColor:a.color+"44",display:"flex",alignItems:"center",gap:16}}>
                <div style={{flex:1}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:a.color}}>{a.title}</div><div style={{color:"var(--txt3)",fontSize:12,marginTop:4}}>{a.desc}</div></div>
                <button onClick={()=>setAnimType(a.type)} style={{background:a.color,color:"#fff",border:"none",borderRadius:7,padding:"8px 18px",cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",fontSize:13}}>▶ VER</button>
              </div>
            ))}
          </div>
          <div className="card" style={{marginTop:16,borderColor:"#f59e0b44"}}>
            <h3 className="hdr" style={{fontSize:14,marginBottom:8}}>⚡ BOOST ACTIVO (aparece en perfil)</h3>
            <div style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",borderRadius:10,padding:"10px 18px",display:"inline-flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:22}}>⚡</span><div><div style={{color:"#fff",fontWeight:700,fontSize:14}}>BOOST ACTIVO</div><div style={{color:"rgba(255,255,255,.8)",fontSize:11}}>8+ exactos seguidos</div></div>
            </div>
          </div>
        </div>}
        {tab==="badges"&&<div style={{maxWidth:700,margin:"0 auto",padding:"30px 16px"}}>
          <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:16}}>🏅 MEDALLAS (Preview con datos de prueba)</h2>
          <BadgesView preds={mockPreds} results={mockResults} userName="Preview User"/>
        </div>}
        {tab==="chart"&&<div style={{maxWidth:850,margin:"0 auto",padding:"30px 16px"}}>
          <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:16}}>📈 GRÁFICO DE EVOLUCIÓN (Preview)</h2>
          <EvolutionChart allPreds={mockAP} results={mockResults} users={mockUsers} currentUser="pu"/>
        </div>}
        {tab==="thermo"&&<Thermometer allPreds={mockAP} users={mockUsers} currentUser="pu" results={mockResults}/>}
        {tab==="profile"&&<div style={{maxWidth:700,margin:"0 auto",padding:"30px 16px"}}>
          <h2 className="hdr" style={{fontSize:22,textAlign:"center",marginBottom:16}}>👤 PERFIL (Preview)</h2>
          <Profile userId="pu" users={mockUsers} allPreds={mockAP} results={mockResults}/>
        </div>}
        {tab==="map"&&<MapView allPreds={mockAP} users={mockUsers} currentUser="pu"/>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// APP - MAIN COMPONENT
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// PODIUM VIEW - Animated end-of-tournament podium
// ═══════════════════════════════════════════════════════
function PodiumView({users,allPreds,results}){
  const ranks=useMemo(()=>Object.entries(users)
    .filter(([id,u])=>u.approved&&u.paid&&!AI_IDS.includes(id))
    .map(([id,u])=>({id,name:u.name,...calcTotal(allPreds[id]||{},results)}))
    .sort(cmp),[users,allPreds,results]);
  const[show,setShow]=useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),100);},[]);
  if(ranks.length<3)return null;
  const[first,second,third]=ranks;
  const medals=[
    {rank:second,pos:2,h:120,c:"#C0C0C0",i:"🥈",delay:"0.3s"},
    {rank:first, pos:1,h:180,c:"#FFD700",i:"🥇",delay:"0s"},
    {rank:third, pos:3,h:80, c:"#CD7F32",i:"🥉",delay:"0.6s"},
  ];
  return(
    <div style={{maxWidth:700,margin:"0 auto",padding:"40px 16px",textAlign:"center"}}>
      <h2 className="hdr" style={{fontSize:32,marginBottom:4}}>🏆 PODIO FINAL</h2>
      <p style={{color:"var(--txt3)",fontSize:12,marginBottom:40}}>Prode Mundial 2026</p>
      {/* Confetti */}
      {show&&[...Array(30)].map((_,i)=>(
        <div key={i} style={{position:"fixed",left:`${Math.random()*100}%`,top:"-20px",fontSize:`${10+Math.random()*14}px`,
          animation:`cf ${2+Math.random()*2}s linear ${Math.random()*1}s forwards`,opacity:0,pointerEvents:"none",zIndex:50}}>
          {["🌟","⭐","✨","🎉","🏆","⚽","🎊"][Math.floor(Math.random()*7)]}
        </div>
      ))}
      {/* Podium */}
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:8,marginBottom:32}}>
        {medals.map(({rank,pos,h,c,i,delay})=>(
          <div key={pos} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,
            animation:show?`bi 0.5s ease ${delay} both`:"none",opacity:show?1:0}}>
            <div style={{fontSize:24}}>{i}</div>
            <div style={{fontSize:12,fontWeight:700,color:"var(--wht)",maxWidth:100,textAlign:"center"}}>{rank.name}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:c}}>{rank.tot} pts</div>
            <div style={{width:100,height:h,background:`linear-gradient(180deg,${c}44,${c}22)`,
              border:`2px solid ${c}`,borderRadius:"8px 8px 0 0",display:"flex",alignItems:"center",
              justifyContent:"center"}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:c,opacity:0.5}}>{pos}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Full ranking */}
      <div className="card">
        <h3 className="hdr" style={{fontSize:15,marginBottom:12}}>CLASIFICACIÓN COMPLETA</h3>
        {ranks.map((r,i)=>(
          <div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",
            borderBottom:i<ranks.length-1?"1px solid var(--bd)22":"none"}}>
            <span style={{fontSize:18,minWidth:28}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}`}</span>
            <span style={{flex:1,fontWeight:i<3?700:400,color:i===0?"var(--gold)":"var(--wht)"}}>{r.name}</span>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--wht)"}}>{r.tot}</span>
            <span style={{color:"var(--txt3)",fontSize:10}}>pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// HEAD TO HEAD - Direct comparison between two players
// ═══════════════════════════════════════════════════════
function HeadToHead({users,allPreds,results,currentUser}){
  const locked=new Date()>=LOCK;
  const[p1,setP1]=useState(currentUser);
  const[p2,setP2]=useState("");
  const approved=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id));

  const stats=useMemo(()=>{
    if(!p1||!p2)return null;
    const preds1=allPreds[p1]||{};
    const preds2=allPreds[p2]||{};
    let p1wins=0,p2wins=0,draws=0,played=0;
    const matches=M.map(m=>{
      const r=results[m.n]||{h:"",a:""};
      if(r.h===""||r.a==="")return null;
      const pt1=calcPts(preds1[m.n]||{h:"",a:""},r);
      const pt2=calcPts(preds2[m.n]||{h:"",a:""},r);
      if(pt1===null&&pt2===null)return null;
      played++;
      const pts1=pt1??0,pts2=pt2??0;
      if(pts1>pts2)p1wins++;
      else if(pts2>pts1)p2wins++;
      else draws++;
      return{m,pt1:pt1??0,pt2:pt2??0,r,pred1:preds1[m.n]||{h:"",a:""},pred2:preds2[m.n]||{h:"",a:""}};
    }).filter(Boolean);
    return{p1wins,p2wins,draws,played,matches};
  },[p1,p2,allPreds,results]);

  const u1=users[p1],u2=p2?users[p2]:null;
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:24,textAlign:"center",marginBottom:16}}>⚔️ HEAD TO HEAD</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:12,alignItems:"center",marginBottom:20}}>
        <div>
          <label style={{color:"var(--txt3)",fontSize:10,letterSpacing:2,display:"block",marginBottom:4}}>JUGADOR 1</label>
          <select value={p1} onChange={e=>setP1(e.target.value)}
            style={{width:"100%",padding:"8px 12px",background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:7,color:"var(--wht)",fontSize:13,outline:"none"}}>
            {approved.map(([id,u])=><option key={id} value={id}>{u.name}</option>)}
          </select>
        </div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--gold)"}}>VS</div>
        <div>
          <label style={{color:"var(--txt3)",fontSize:10,letterSpacing:2,display:"block",marginBottom:4}}>JUGADOR 2</label>
          <select value={p2} onChange={e=>setP2(e.target.value)}
            style={{width:"100%",padding:"8px 12px",background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:7,color:"var(--wht)",fontSize:13,outline:"none"}}>
            <option value="">— Elegí —</option>
            {approved.filter(([id])=>id!==p1).map(([id,u])=><option key={id} value={id}>{u.name}</option>)}
          </select>
        </div>
      </div>
      {stats&&p2&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
            {[{v:stats.p1wins,l:`Victorias ${u1?.name||""}`,c:"var(--gold)"},{v:stats.draws,l:"Empates",c:"var(--txt2)"},{v:stats.p2wins,l:`Victorias ${u2?.name||""}`,c:"#3b82f6"}].map(x=>(
              <div key={x.l} className="card" style={{textAlign:"center",padding:14}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:x.c}}>{x.v}</div>
                <div style={{color:"var(--txt3)",fontSize:10}}>{x.l}</div>
              </div>
            ))}
          </div>
          {locked&&<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr style={{background:"var(--bg2)"}}>
              <th style={{padding:"6px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"left"}}>Partido</th>
              <th style={{padding:"6px 5px",color:"var(--gold)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>{u1?.name}</th>
              <th style={{padding:"6px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>Real</th>
              <th style={{padding:"6px 5px",color:"#3b82f6",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>{u2?.name}</th>
              <th style={{padding:"6px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center"}}>Ganó</th>
            </tr></thead>
            <tbody>{stats.matches.map(({m,pt1,pt2,r,pred1,pred2})=>{
              const winner=pt1>pt2?"p1":pt2>pt1?"p2":"draw";
              return(<tr key={m.n} style={{borderBottom:"1px solid var(--bd)11",background:winner==="p1"?"rgba(212,168,67,.05)":winner==="p2"?"rgba(59,130,246,.05)":"transparent"}}>
                <td style={{padding:"4px 5px",fontSize:10}}>{FL[m.h]||""}{m.h} vs {m.a}{FL[m.a]||""}</td>
                <td style={{padding:"4px 5px",textAlign:"center",color:pt1===3?"var(--grn)":pt1===1?"var(--org)":"var(--red)"}}>{pred1.h!=""?`${pred1.h}-${pred1.a}`:"—"} <span style={{fontSize:9}}>+{pt1}</span></td>
                <td style={{padding:"4px 5px",textAlign:"center",fontWeight:700,color:"var(--wht)"}}>{r.h}-{r.a}</td>
                <td style={{padding:"4px 5px",textAlign:"center",color:pt2===3?"var(--grn)":pt2===1?"var(--org)":"var(--red)"}}>{pred2.h!=""?`${pred2.h}-${pred2.a}`:"—"} <span style={{fontSize:9}}>+{pt2}</span></td>
                <td style={{padding:"4px 5px",textAlign:"center"}}>{winner==="p1"?"🟡":winner==="p2"?"🔵":"➖"}</td>
              </tr>);
            })}</tbody>
          </table></div>}
          {!locked&&<p style={{color:"var(--txt3)",fontSize:12,textAlign:"center",padding:20}}>El detalle partido a partido se habilita el 9/06.</p>}
        </div>
      )}
      {!p2&&<p style={{color:"var(--txt3)",fontSize:13,textAlign:"center",padding:30}}>Elegí dos jugadores para comparar.</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// RANKING HISTORY - Daily evolution stored in Firebase  
// ═══════════════════════════════════════════════════════
function RankingHistory({users,allPreds,results}){
  const ranks=useMemo(()=>Object.entries(users)
    .filter(([id,u])=>u.approved&&u.paid&&!AI_IDS.includes(id))
    .map(([id,u])=>({id,name:u.name,...calcTotal(allPreds[id]||{},results)}))
    .sort(cmp),[users,allPreds,results]);

  if(ranks.length===0)return<p style={{color:"var(--txt3)",fontSize:13,textAlign:"center",padding:30}}>Sin datos todavía.</p>;

  // Simple SVG line chart of current standings
  const W=560,H=180,PAD=40;
  const maxVal=Math.max(...ranks.map(r=>r.tot),1);
  const colors=["#FFD700","#22c55e","#3b82f6","#ef4444","#a855f7","#06b6d4","#f97316","#ec4899","#84cc16","#f59e0b"];

  return(
    <div style={{maxWidth:800,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:24,textAlign:"center",marginBottom:16}}>📊 RANKING HISTÓRICO</h2>
      <div className="card" style={{marginBottom:14}}>
        <h3 className="hdr" style={{fontSize:15,marginBottom:12}}>PUNTOS ACUMULADOS</h3>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",background:"var(--bg2)",borderRadius:8}}>
          {[0,.25,.5,.75,1].map(v=>(
            <g key={v}>
              <line x1={PAD} y1={H-PAD-(v*(H-PAD*2))} x2={W-PAD/2} y2={H-PAD-(v*(H-PAD*2))} stroke="var(--bd)" strokeWidth="1"/>
              <text x={PAD-4} y={H-PAD-(v*(H-PAD*2))+4} fill="var(--txt3)" fontSize="9" textAnchor="end">{Math.round(maxVal*v)}</text>
            </g>
          ))}
          {ranks.slice(0,8).map((r,i)=>{
            const x=PAD+(i/(Math.max(ranks.length-1,1)))*(W-PAD*1.5);
            const y=H-PAD-(r.tot/maxVal)*(H-PAD*2);
            return(
              <g key={r.id}>
                <circle cx={x} cy={y} r={5} fill={colors[i%colors.length]}/>
                <text x={x} y={y-8} textAnchor="middle" fontSize="8" fill={colors[i%colors.length]}>{r.name.slice(0,8)}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="card">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"var(--bg2)"}}>
            {["#","Nombre","Pts","Ex","Bo","⚡"].map(h=><th key={h} style={{padding:"7px 5px",color:"var(--txt3)",fontSize:10,borderBottom:"2px solid var(--bd)",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif"}}>{h}</th>)}
          </tr></thead>
          <tbody>{ranks.map((r,i)=>{
            const sk=calcStreak(r.pts?.map(v=>v??-1)||[]);
            return(<tr key={r.id} style={{borderBottom:"1px solid var(--bd)22"}}>
              <td style={{padding:"7px 5px",textAlign:"center",color:"var(--gold)",fontFamily:"'Bebas Neue',sans-serif"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</td>
              <td style={{padding:"7px 5px",color:"var(--wht)",fontWeight:i<3?700:400}}>{r.name}</td>
              <td style={{padding:"7px 5px",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--wht)"}}>{r.tot}</td>
              <td style={{padding:"7px 5px",textAlign:"center",color:"var(--grn)"}}>{r.ex}</td>
              <td style={{padding:"7px 5px",textAlign:"center",color:"var(--org)"}}>{r.bo}</td>
              <td style={{padding:"7px 5px",textAlign:"center"}}>{sk.boostActive?<span style={{animation:"fp 1s infinite",display:"inline-block"}}>⚡</span>:<span style={{color:"var(--txt3)",fontSize:10}}>—</span>}</td>
            </tr>);
          })}</tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PLAYER SEARCH - Search players and view their profile
// ═══════════════════════════════════════════════════════
function PlayerSearch({users,allPreds,results,currentUser}){
  const[query,setQuery]=useState("");
  const[sel,setSel]=useState(null);
  const approved=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id));
  const filtered=query.trim()===""?approved:approved.filter(([,u])=>u.name.toLowerCase().includes(query.toLowerCase()));

  return(
    <div style={{maxWidth:800,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:24,textAlign:"center",marginBottom:16}}>🔍 BUSCAR PARTICIPANTES</h2>
      {!sel?(
        <div>
          <input className="inp" value={query} onChange={e=>{setQuery(e.target.value);setSel(null);}}
            placeholder="Buscá por nombre..." style={{marginBottom:14,fontSize:14}}/>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {filtered.map(([id,u])=>{
              const s=calcTotal(allPreds[id]||{},results);
              const sk=calcStreak(s.pts?.map(v=>v??-1)||[]);
              const allRanks=Object.entries(users).filter(([i,us])=>us.approved&&us.paid&&!AI_IDS.includes(i))
                .map(([i,us])=>({id:i,...calcTotal(allPreds[i]||{},results)})).sort(cmp);
              const pos=allRanks.findIndex(r=>r.id===id)+1;
              return(
                <button key={id} onClick={()=>setSel(id)}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"var(--bg3)",
                    border:"1px solid var(--bd)",borderRadius:10,cursor:"pointer",color:"var(--wht)",textAlign:"left",
                    transition:"border .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="var(--bd)"}>
                  <div style={{fontSize:28}}>👤</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:id===currentUser?"var(--gold)":"var(--wht)"}}>{u.name}{id===currentUser?" (Vos)":""}</div>
                    <div style={{color:"var(--txt3)",fontSize:10,marginTop:2}}>{u.paid?"💰 Pagó":"No pagó"} · {u.email||""}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    {u.paid&&pos>0&&<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--gold)"}}>{pos===1?"🥇":pos===2?"🥈":pos===3?"🥉":`#${pos}`}</div>}
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--wht)"}}>{s.tot} pts</div>
                    {sk.boostActive&&<div style={{fontSize:14,animation:"fp 1s infinite"}}>⚡</div>}
                  </div>
                </button>
              );
            })}
            {filtered.length===0&&<p style={{color:"var(--txt3)",fontSize:13,textAlign:"center",padding:20}}>No se encontró "{query}"</p>}
          </div>
        </div>
      ):(
        <div>
          <button onClick={()=>setSel(null)} style={{background:"transparent",color:"var(--gold)",border:"1px solid var(--gold)",borderRadius:7,padding:"6px 14px",fontSize:12,cursor:"pointer",marginBottom:16}}>← Volver</button>
          <Profile userId={sel} users={users} allPreds={allPreds} results={results}/>
        </div>
      )}
    </div>
  );
}

export default function App(){
  const[user,setUser]=useState(null);
  const[isAdmin,setIsAdmin]=useState(false);
  const[users,setUsers]=useState({});
  const[results,setResults]=useState({});
  const[allPreds,setAllPreds]=useState({});
  const[view,setView]=useState("home");
  const[loading,setLoading]=useState(true);
  const[adminMode,setAdminMode]=useState(true);
  const[animType,setAnimType]=useState(null);
  const[showPreview,setShowPreview]=useState(false);

  const showAnim=useCallback((type)=>{setAnimType(type);setTimeout(()=>setAnimType(null),4000);},[]);

  useEffect(()=>{(async()=>{
    const u=await dbGet("users");if(u)setUsers(u);
    const r=await dbGet("results");if(r)setResults(r);
    const sess=JSON.parse(localStorage.getItem("prode-session")||"null");
    if(sess){setUser(sess.user);setIsAdmin(sess.isAdmin);}
    setLoading(false);
  })()},[]);

  useEffect(()=>{
    if(!user)return;
    (async()=>{
      const ap={};
      const all=[...Object.keys(users),...AI_IDS];
      for(const id of all){const d=await dbGet(`preds-${id}`);ap[id]=d||{};}
      setAllPreds(ap);
    })();
  },[users,user]);

  useEffect(()=>{
    if(!user)return;
    const prevR=JSON.parse(localStorage.getItem("prode-lastresults")||"{}");
    let prevRanks=[];
    const iv=setInterval(async()=>{
      const u=await dbGet("users");if(u)setUsers(u);
      const r=await dbGet("results");if(r){
        setResults(r);
        // Check if someone passed current user in rankings
        if(u&&r&&user&&!isAdmin){
          const ranks=Object.entries(u).filter(([id,us])=>us.approved&&us.paid&&!AI_IDS.includes(id))
            .map(([id])=>id);
          const myPrevPos=prevRanks.indexOf(user);
          const myNewPos=ranks.indexOf(user);
          if(myPrevPos>=0&&myNewPos>myPrevPos){
            const passerIdx=myNewPos-1;
            if(passerIdx>=0&&passerIdx<ranks.length){
              const passerName=u[ranks[passerIdx]]?.name||"Alguien";
              sendNotif("📊 Te superaron en la tabla",`${passerName} te pasó y ahora estás en el puesto #${myNewPos+1}`);
            }
          }
          prevRanks=ranks;
        }
        // Check for new results and notify
        M.forEach(m=>{
          const prev=prevR[m.n]||{h:"",a:""};
          const curr=r[m.n]||{h:"",a:""};
          if(curr.h!==""&&curr.a!==""&&(prev.h!==curr.h||prev.a!==curr.a)){
            sendNotif(`⚽ Resultado: ${m.h} vs ${m.a}`,`${curr.h} - ${curr.a}`);
          }
        });
        localStorage.setItem("prode-lastresults",JSON.stringify(r));
      }
    },15000);
    return()=>clearInterval(iv);
  },[user]);

  const login=async(id,admin)=>{
    setUser(id);setIsAdmin(admin);
    localStorage.setItem("prode-session",JSON.stringify({user:id,isAdmin:admin}));
    const u=await dbGet("users");if(u)setUsers(u);
    const r=await dbGet("results");if(r)setResults(r);
  };
  const logout=()=>{setUser(null);setIsAdmin(false);setView("home");localStorage.removeItem("prode-session");};
  // Request notification permission after login
  useEffect(()=>{if(user)requestNotifPermission();},[user]);

  if(loading)return(
    <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <style>{CSS}</style>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:44}}>⚽</div>
        <div className="hdr" style={{fontSize:18,marginTop:8,animation:"pls 1.5s infinite"}}>CARGANDO...</div>
      </div>
    </div>
  );

  if(!user)return<><style>{CSS}</style><Login onLogin={login}/></>;

  const approved=isAdmin||users[user]?.approved;

  return(
    <div style={{minHeight:"100vh",background:"var(--bg)",paddingBottom:60}}>
      <style>{CSS}</style>
      {showPreview&&isAdmin&&<AdminPreview allPreds={allPreds} results={results} onClose={()=>setShowPreview(false)}/>}
      {animType&&<Anim type={animType} onDone={()=>setAnimType(null)}/>}
      <Hdr
        user={isAdmin?"ADMIN":users[user]?.name||user}
        isAdmin={isAdmin}
        onLogout={logout}
        view={view}
        setView={setView}
        adminMode={adminMode}
        setAdminMode={setAdminMode}
        onPreview={()=>setShowPreview(true)}
      />
      {!approved&&!isAdmin?(
        <div style={{textAlign:"center",padding:50}} className="fi">
          <div style={{fontSize:44,marginBottom:10}}>⏳</div>
          <h2 className="hdr" style={{fontSize:22}}>ESPERANDO APROBACIÓN</h2>
          <p style={{color:"var(--txt2)",fontSize:13,marginTop:5}}>El organizador tiene que habilitarte.</p>
        </div>
      ):(
        <>
          {!isAdmin&&!users[user]?.paid&&<div style={{maxWidth:700,margin:"16px auto 0",padding:"0 16px"}}><PayBanner/></div>}
          {view==="home"&&<Home users={users} results={results}/>}
          {view==="hoy"&&<HoyView users={users} results={results} allPreds={allPreds}/>}
          {view==="preds"&&(!isAdmin||!adminMode)&&<Preds currentUser={user} results={results} showAnim={showAnim}/>}
          {view==="preds"&&isAdmin&&adminMode&&<Admin users={users} setUsers={setUsers} results={results} setResults={setResults} allPreds={allPreds}/>}
          {view==="table"&&<Table users={users} results={results} currentUser={user} allPreds={allPreds}/>}
          {view==="compare"&&<Compare users={users} results={results} allPreds={allPreds}/>}
          {view==="ia"&&<IAView results={results} allPreds={allPreds} users={users} currentUser={user}/>}
          {view==="chat"&&<Chat currentUser={user} users={users}/>}
          {view==="leagues"&&<Leagues users={users} allPreds={allPreds} results={results} currentUser={user}/>}
          {view==="map"&&<HostMapView results={results} isAdmin={isAdmin}/>}
          {view==="thermo"&&<Thermometer allPreds={allPreds} users={users} currentUser={user} results={results}/>}
          {view==="perfil"&&<Profile userId={user} users={users} allPreds={allPreds} results={results}/>}
          {view==="stats"&&<div style={{maxWidth:850,margin:"0 auto",padding:"24px 16px"}} className="fi">
            <h2 className="hdr" style={{fontSize:24,textAlign:"center",marginBottom:20}}>📊 ESTADÍSTICAS DEL TORNEO</h2>
            <div style={{marginBottom:20}}><h3 className="hdr" style={{fontSize:16,marginBottom:12}}>📈 Evolución de Puntos</h3><EvolutionChart allPreds={allPreds} results={results} users={users} currentUser={user}/></div>
            <TournamentStats allPreds={allPreds} results={results} users={users}/>
          </div>}
          {view==="rules"&&<Rules/>}
          {view==="podio"&&<PodiumView users={users} allPreds={allPreds} results={results}/>}
          {view==="h2h"&&<HeadToHead users={users} allPreds={allPreds} results={results} currentUser={user}/>}
          {view==="buscar"&&<PlayerSearch users={users} allPreds={allPreds} results={results} currentUser={user}/>}
          {view==="ranking"&&<RankingHistory users={users} allPreds={allPreds} results={results}/>}
          {view==="bracket"&&<BracketView results={results} allPreds={allPreds} users={users} currentUser={user}/>}
          {view==="admin"&&isAdmin&&<Admin users={users} setUsers={setUsers} results={results} setResults={setResults} allPreds={allPreds}/>}
          <MobileNav view={view} setView={setView} isAdmin={isAdmin}/>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// COUNTDOWN
// ═══════════════════════════════════════════════════════
function Countdown(){
  const[now,setNow]=useState(new Date());
  useEffect(()=>{const iv=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(iv);},[]);
  const FIRST=new Date("2026-06-11T16:00:00-05:00"); // Mexico vs Sudafrica, 16hs Ciudad de Mexico
  const target=now<FIRST?FIRST:null;
  // Find next today's match
  const todayStr=`${String(now.getDate()).padStart(2,"0")}/${String(now.getMonth()+1).padStart(2,"0")}`;
  const todayMatches=M.filter(m=>m.d===todayStr);
  const nextMatch=todayMatches.find(m=>{
    const[h,min]=m.t.split(":").map(Number);
    const mDate=new Date(now);mDate.setHours(h,min,0,0);
    return mDate>now;
  });
  const calcDiff=(t)=>{
    const diff=t-now;
    if(diff<=0)return null;
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff%86400000)/3600000);
    const m=Math.floor((diff%3600000)/60000);
    const s=Math.floor((diff%60000)/1000);
    return{d,h,m,s,diff};
  };
  const mainTarget=nextMatch?(()=>{
    const[h,min]=nextMatch.t.split(":").map(Number);
    const t=new Date(now);t.setHours(h,min,0,0);return t;
  })():target;
  const diff=mainTarget?calcDiff(mainTarget):null;
  if(!diff)return null;
  const label=nextMatch?`${nextMatch.h} vs ${nextMatch.a}`:now<FIRST?"⚽ Primer partido del Mundial":"";
  if(!label)return null;
  const units=nextMatch?[{v:diff.h,l:"HS"},{v:diff.m,l:"MIN"},{v:diff.s,l:"SEG"}]:[{v:diff.d,l:"DÍAS"},{v:diff.h,l:"HS"},{v:diff.m,l:"MIN"},{v:diff.s,l:"SEG"}];
  return(
    <div style={{background:"linear-gradient(135deg,rgba(212,168,67,.12),rgba(212,168,67,.04))",border:"1px solid rgba(212,168,67,.3)",borderRadius:12,padding:"14px 20px",marginBottom:16,textAlign:"center"}}>
      <div style={{color:"var(--txt3)",fontSize:10,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>{nextMatch?"próximo partido hoy":"cuenta regresiva"}</div>
      <div style={{color:"var(--gold)",fontSize:13,fontWeight:700,marginBottom:8}}>{label}</div>
      <div style={{display:"flex",justifyContent:"center",gap:12}}>
        {units.map(u=>(
          <div key={u.l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"var(--wht)",lineHeight:1,minWidth:44}}>{String(u.v).padStart(2,"0")}</div>
            <div style={{color:"var(--txt3)",fontSize:9,letterSpacing:2}}>{u.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MOBILE NAV BAR
// ═══════════════════════════════════════════════════════
function MobileNav({view,setView,isAdmin}){
  const items=[
    {id:"hoy",l:"Hoy",i:"📅"},
    {id:"preds",l:"Preds",i:"✏️"},
    {id:"table",l:"Tabla",i:"🏆"},
    {id:"chat",l:"Chat",i:"💬"},
    {id:"perfil",l:"Perfil",i:"👤"},
  ];
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(7,14,28,.97)",borderTop:"1px solid var(--bd)",display:"flex",zIndex:90,paddingBottom:"calc(env(safe-area-inset-bottom,0px) + 14px)",paddingTop:6}}>
      {items.map(it=>(
        <button key={it.id} onClick={()=>setView(it.id)} style={{flex:1,padding:"8px 4px 6px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"all .15s"}}>
          <span style={{fontSize:18,lineHeight:1}}>{it.i}</span>
          <span style={{fontSize:9,color:view===it.id?"var(--gold)":"var(--txt3)",fontWeight:view===it.id?700:400,letterSpacing:.5}}>{it.l}</span>
          {view===it.id&&<div style={{width:20,height:2,background:"var(--gold)",borderRadius:1,marginTop:1}}/>}
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SHARE RESULT (WhatsApp image via canvas)
// ═══════════════════════════════════════════════════════
function ShareButton({userId,users,allPreds,results}){
  const[sharing,setSharing]=useState(false);
  const share=()=>{
    setSharing(true);
    const u=users[userId];
    const s=calcTotal(allPreds[userId]||{},results);
    const text=`⚽ *Prode Mundial 2026*\n👤 ${u?.name||userId}\n\n🏆 *${s.tot} puntos totales*\n🎯 ${s.ex} exactos\n🔥 ${s.si} signos\n⭐ ${s.bo} bonus\n\n¡Jugá en el prode!`;
    const url=`https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url,"_blank");
    setSharing(false);
  };
  return(
    <button onClick={share} disabled={sharing} style={{padding:"8px 16px",background:"#25D366",color:"#fff",border:"none",borderRadius:7,fontSize:12,cursor:"pointer",fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
      <span>📲</span>{sharing?"Compartiendo...":"Compartir por WhatsApp"}
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// PUSH NOTIFICATIONS
// ═══════════════════════════════════════════════════════
async function requestNotifPermission(){
  if(!("Notification" in window))return false;
  if(Notification.permission==="granted")return true;
  const perm=await Notification.requestPermission();
  return perm==="granted";
}
function sendNotif(title,body){
  if(Notification.permission==="granted"){
    new Notification(title,{body,icon:"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚽</text></svg>"});
  }
}

// ═══════════════════════════════════════════════════════
// BRACKET VIEW
// ═══════════════════════════════════════════════════════
const GROUPS_DEF={
  A:["México","Sudáfrica","Corea del Sur","Chequia"],B:["Canadá","Bosnia","Qatar","Suiza"],
  C:["Brasil","Marruecos","Haití","Escocia"],D:["Estados Unidos","Paraguay","Australia","Turquía"],
  E:["Alemania","Curazao","Costa de Marfil","Ecuador"],F:["Países Bajos","Japón","Suecia","Túnez"],
  G:["Bélgica","Egipto","Irán","Nueva Zelanda"],H:["España","Cabo Verde","Arabia Saudita","Uruguay"],
  I:["Francia","Senegal","Irak","Noruega"],J:["Argentina","Argelia","Austria","Jordania"],
  K:["Portugal","RD Congo","Uzbekistán","Colombia"],L:["Inglaterra","Croacia","Ghana","Panamá"]
};

function calcGroupStandings(results){
  const standings={};
  Object.entries(GROUPS_DEF).forEach(([g,teams])=>{
    teams.forEach(t=>{standings[t]={team:t,group:g,pts:0,gf:0,ga:0,gd:0,played:0};});
  });
  M.forEach(m=>{
    const r=results[m.n]||{h:"",a:""};
    if(r.h===""||r.a==="")return;
    const rh=+r.h,ra=+r.a;
    if(!standings[m.h]||!standings[m.a])return;
    standings[m.h].gf+=rh;standings[m.h].ga+=ra;standings[m.h].gd+=rh-ra;standings[m.h].played++;
    standings[m.a].gf+=ra;standings[m.a].ga+=rh;standings[m.a].gd+=ra-rh;standings[m.a].played++;
    if(rh>ra){standings[m.h].pts+=3;}
    else if(rh<ra){standings[m.a].pts+=3;}
    else{standings[m.h].pts+=1;standings[m.a].pts+=1;}
  });
  const groupTables={};
  Object.keys(GROUPS_DEF).forEach(g=>{
    groupTables[g]=GROUPS_DEF[g].map(t=>standings[t]).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
  });
  return groupTables;
}

function BracketView({results,allPreds,users,currentUser}){
  const[tab,setTab]=useState("groups");
  const groupTables=useMemo(()=>calcGroupStandings(results),[results]);
  const myPreds=allPreds[currentUser]||{};

  // User's group standings based on their predictions
  const myGroupTables=useMemo(()=>calcGroupStandings(
    Object.fromEntries(M.map(m=>[m.n,myPreds[m.n]||{h:"",a:""}]))
  ),[myPreds]);

  const groupsDone=Object.values(groupTables).every(g=>g.every(t=>t.played>=3));

  return(
    <div style={{maxWidth:950,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <h2 className="hdr" style={{fontSize:24,textAlign:"center",marginBottom:4}}>🏟️ BRACKET & GRUPOS</h2>
      <p style={{color:"var(--txt3)",fontSize:11,textAlign:"center",marginBottom:14}}>Clasificación en tiempo real según resultados reales</p>
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        <button className={`nb${tab==="groups"?" act":""}`} onClick={()=>setTab("groups")}>📊 Grupos</button>
        <button className={`nb${tab==="mypreds"?" act":""}`} onClick={()=>setTab("mypreds")}>🎯 Mis predicciones</button>
        {groupsDone&&<button className={`nb${tab==="bracket"?" act":""}`} onClick={()=>setTab("bracket")}>🏆 Eliminatorias</button>}
      </div>

      {(tab==="groups"||tab==="mypreds")&&(()=>{
        const tables=tab==="groups"?groupTables:myGroupTables;
        const label=tab==="groups"?"Resultados reales":"Según tus predicciones";
        return(
          <div>
            {tab==="mypreds"&&<div style={{background:"rgba(212,168,67,.08)",border:"1px solid rgba(212,168,67,.2)",borderRadius:8,padding:"8px 14px",marginBottom:12,fontSize:12,color:"var(--gold)"}}>📌 Así quedarían los grupos si todos tus pronósticos se cumplen</div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
              {Object.entries(tables).sort().map(([g,teams])=>(
                <div key={g} className="card" style={{padding:12}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"var(--gold)",marginBottom:8,borderBottom:"1px solid var(--bd)",paddingBottom:6}}>GRUPO {g}</div>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                    <thead><tr>{["","Equipo","J","G","E","P","GF","GA","GD","Pts"].map(h=><th key={h} style={{padding:"2px 3px",color:"var(--txt3)",fontSize:9,textAlign:h==="Equipo"?"left":"center"}}>{h}</th>)}</tr></thead>
                    <tbody>{teams.map((t,i)=>{
                      const qual=i<2;
                      return(
                        <tr key={t.team} style={{background:qual?"rgba(34,197,94,.08)":"transparent",borderBottom:"1px solid var(--bd)11"}}>
                          <td style={{padding:"3px 2px",textAlign:"center",fontSize:10}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":"4"}</td>
                          <td style={{padding:"3px 2px",color:qual?"var(--grn)":"var(--txt)",fontWeight:qual?600:400,whiteSpace:"nowrap"}}>{FL[t.team]||""} {t.team.slice(0,8)}</td>
                          {[t.played,Math.round((t.pts-t.played+(t.played-Math.round((t.pts)/3)))/1)||0,0,0,t.gf,t.ga,t.gd>=0?"+"+t.gd:t.gd,t.pts].map((v,vi)=>(
                            <td key={vi} style={{padding:"3px 2px",textAlign:"center",color:vi===7?"var(--gold)":"var(--txt2)",fontWeight:vi===7?700:400,fontSize:vi===7?12:10}}>{v}</td>
                          ))}
                        </tr>
                      );
                    })}</tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {tab==="bracket"&&groupsDone&&(()=>{
        // Get top 2 from each group + 8 best 3rd places
        const top2=[];const thirds=[];
        Object.entries(groupTables).sort().forEach(([g,teams])=>{
          top2.push({...teams[0],pos:1,group:g});
          top2.push({...teams[1],pos:2,group:g});
          thirds.push({...teams[2],group:g});
        });
        thirds.sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
        const r32=[...top2,...thirds.slice(0,8)];
        return(
          <div>
            <h3 className="hdr" style={{fontSize:16,marginBottom:12}}>🏆 RONDA DE 32 — Clasificados</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
              {r32.map((t,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:8}}>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",color:"var(--gold)",fontSize:14,minWidth:20}}>{i+1}</span>
                  <span style={{fontSize:16}}>{FL[t.team]||"🏳️"}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,color:"var(--wht)",fontWeight:600}}>{t.team}</div>
                    <div style={{fontSize:10,color:"var(--txt3)"}}>Grupo {t.group} • {t.pts} pts • GD: {t.gd>=0?"+":""}{t.gd}</div>
                  </div>
                </div>
              ))}
            </div>
            {r32.length<32&&<p style={{color:"var(--txt3)",fontSize:11,textAlign:"center",marginTop:12}}>Faltan terminar algunos grupos para completar el bracket.</p>}
          </div>
        );
      })()}

      {tab==="bracket"&&!groupsDone&&<div style={{textAlign:"center",padding:40}}><div style={{fontSize:40,marginBottom:10}}>⏳</div><h3 className="hdr" style={{fontSize:18}}>FASE DE GRUPOS EN CURSO</h3><p style={{color:"var(--txt3)",fontSize:13,marginTop:6}}>El bracket de eliminatorias aparece cuando terminen todos los grupos.</p></div>}
    </div>
  );
}
