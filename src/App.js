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
  let bonus=0,s=0,ms3=0,ms5=0,ls=0,cur=0;
  for(const p of pts){if(p===3){s++;cur++;if(s===3){bonus+=1;ms3++;}if(s===5){bonus+=3;ms5++;}}else{if(cur>ls)ls=cur;s=0;cur=0;}}
  if(cur>ls)ls=cur;
  return{bonus,ms3,ms5,ls};
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
@media(max-width:640px){.mr{flex-wrap:wrap;justify-content:center;}}
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
            <span style={{background:"rgba(0,0,0,.3)",padding:"5px 14px",borderRadius:6,fontFamily:"'Bebas Neue',sans-serif",fontSize:17,color:"var(--wht)",letterSpacing:2}}>fran.quiros.mp</span>
            <span style={{color:"var(--txt2)",fontSize:12}}>Comprobante al <strong style={{color:"var(--wht)"}}>2235638732</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hdr({user,isAdmin,onLogout,view,setView,adminMode,setAdminMode}){
  const locked=new Date()>=LOCK;
  const nav=[{id:"home",l:"Inicio"},{id:"hoy",l:"📅 Hoy"},{id:"preds",l:"Predicciones"},{id:"table",l:"Tabla"},{id:"compare",l:"Comparar"},{id:"ia",l:"🤖 IA"},{id:"rules",l:"Reglas"},{id:"game",l:"🎮 Jugar"}];
  return(
    <header style={{background:"linear-gradient(135deg,#070e1c,#0f2240,#091630)",borderBottom:"2px solid var(--gold)",position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setView("home")}>
          <span style={{fontSize:24}}>⚽</span>
          <div><div className="hdr" style={{fontSize:17}}>PRODE MUNDIAL 2026</div><div style={{fontSize:8,color:"var(--txt3)",letterSpacing:3}}>USA • MÉXICO • CANADÁ</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap"}}>
          {nav.map(v=><button key={v.id} className={`nb${view===v.id?" act":""}`} onClick={()=>setView(v.id)}>{v.l}</button>)}
          {isAdmin&&<button className={`nb${view==="admin"?" act":""}`} onClick={()=>setView("admin")} style={{color:view==="admin"?"#fff":"var(--red)",borderColor:"var(--red)",background:view==="admin"?"var(--red)":"transparent"}}>Admin</button>}
          {isAdmin&&<button onClick={()=>setAdminMode(!adminMode)} style={{padding:"4px 8px",background:adminMode?"#7c3aed":"transparent",color:adminMode?"#fff":"#a78bfa",border:"1px solid #7c3aed44",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:600}}>{adminMode?"👑 Admin":"👤 User"}</button>}
          <div style={{display:"flex",alignItems:"center",gap:5,marginLeft:4}}>
            <span style={{color:"var(--gold)",fontSize:11,fontWeight:700}}>{user}</span>
            {locked&&<span className="tg" style={{background:"var(--red)",color:"#fff",fontSize:7,animation:"pls 2s infinite"}}>LOCKED</span>}
            <button onClick={onLogout} style={{background:"transparent",color:"var(--txt3)",border:"1px solid var(--bd)",borderRadius:4,padding:"3px 7px",fontSize:10,cursor:"pointer"}}>Salir</button>
          </div>
        </div>
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
            <div style={{background:"rgba(0,0,0,.3)",borderRadius:6,padding:"6px 10px",margin:"6px 0",textAlign:"center"}}><span style={{color:"var(--wht)",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2}}>fran.quiros.mp</span></div>
            <p style={{color:"var(--txt)",fontSize:11,textAlign:"center"}}>Comprobante al <strong style={{color:"var(--wht)"}}>2235638732</strong></p>
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
          <thead><tr style={{background:"var(--bg2)"}}>{["#","Participante","Pts","Bonus","Total","Ex","Si","R5","R3"].map(h=><th key={h} style={{padding:"8px 5px",color:"var(--txt3)",fontSize:10,letterSpacing:1,borderBottom:"2px solid var(--bd)",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif"}}>{h}</th>)}</tr></thead>
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

function Home({users,results}){
  const paid=Object.values(users).filter(u=>u.paid).length,pool=paid*FEE;
  const approved=Object.entries(users).filter(([id,u])=>u.approved&&!AI_IDS.includes(id)).length;
  const played=M.filter(m=>results[m.n]&&results[m.n].h!==""&&results[m.n].a!=="").length;
  const locked=new Date()>=LOCK;
  return(
    <div style={{maxWidth:800,margin:"0 auto",padding:"24px 16px"}} className="fi">
      <div style={{textAlign:"center",marginBottom:22}}><h2 className="hdr" style={{fontSize:26}}>BIENVENIDO AL PRODE</h2><p style={{color:"var(--txt2)",fontSize:12,marginTop:3}}>Fase de Grupos • 72 partidos • 12 grupos</p></div>
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
  // Pre-populate from hardcoded AI_PREDS if stored preds are empty
  const defaultP=useMemo(()=>{
    const hard=AI_PREDS[aiId]||{};
    const stored=initP||{};
    const hasSome=Object.values(stored).some(p=>p&&p.h!=="");
    if(hasSome)return stored;
    return hard;
  },[aiId,initP]);
  const[preds,setPreds]=useState(defaultP);const[saving,setSaving]=useState(false);const[saved,setSaved]=useState(false);const[filter,setFilter]=useState("all");
  const chg=(n,side,val)=>{const v=val.replace(/[^0-9]/g,"").slice(0,2);setPreds(p=>({...p,[n]:{...(p[n]||{h:"",a:""}),[side]:v}}));setSaved(false);};
  const save=async()=>{setSaving(true);await dbSet(`preds-${aiId}`,preds);setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const groups=[...new Set(M.map(m=>m.g))].sort();const filtered=filter==="all"?M:M.filter(m=>m.g===filter);
  return(<div><div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}><button className={`fb${filter==="all"?" act":""}`} onClick={()=>setFilter("all")}>Todos</button>{groups.map(g=><button key={g} className={`fb${filter===g?" act":""}`} onClick={()=>setFilter(g)}>{g}</button>)}</div><div style={{display:"flex",flexDirection:"column",gap:2,maxHeight:280,overflowY:"auto"}}>{filtered.map(m=>{const p=preds[m.n]||{h:"",a:""};return(<div key={m.n} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 6px"}}><span style={{color:"var(--txt3)",fontSize:10,width:22}}>#{m.n}</span><span style={{fontSize:10,color:"var(--txt)",flex:1,textAlign:"right"}}>{m.h}</span><input className="si" value={p.h} onChange={e=>chg(m.n,"h",e.target.value)} style={{width:28,height:28,fontSize:12}} maxLength={2}/><span style={{color:"var(--txt3)",fontSize:9}}>-</span><input className="si" value={p.a} onChange={e=>chg(m.n,"a",e.target.value)} style={{width:28,height:28,fontSize:12}} maxLength={2}/><span style={{fontSize:10,color:"var(--txt)",flex:1}}>{m.a}</span></div>);})}</div><div style={{marginTop:8,textAlign:"right"}}><button className="bg" onClick={save} disabled={saving} style={{padding:"5px 14px",fontSize:11,background:saved?"var(--grn)":"",color:saved?"#fff":""}}>{saving?"...":saved?"✓":"Guardar"}</button></div></div>);
}

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
        {[{id:"users",l:`Usuarios${pending>0?` (${pending})`:""}`},{id:"results",l:"Resultados"},{id:"ia_admin",l:"🤖 IA"},{id:"stats_s",l:"Resumen"}].map(t=>(
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
      {tab==="ia_admin"&&<div>{AI_IDS.map(aiId=>{const inf=AI_INFO[aiId];return(<div key={aiId} className="card" style={{marginBottom:14,borderColor:inf.color+"44"}}><h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:inf.color,marginBottom:10}}>{inf.flag} {inf.name}</h3><IAPredsEditor aiId={aiId} preds={allPreds[aiId]||{}}/></div>);})}</div>}
      {tab==="stats_s"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
        {[{l:"Registrados",v:Object.keys(users).filter(id=>!AI_IDS.includes(id)).length},{l:"Habilitados",v:Object.values(users).filter(u=>u.approved).length},{l:"Pagaron",v:paid},{l:"Pendientes",v:pending},{l:"Pozo",v:fmt$(pool)},{l:"1°",v:fmt$(Math.floor(pool*.7))},{l:"2°",v:fmt$(Math.floor(pool*.2))},{l:"3°",v:fmt$(Math.floor(pool*.1))}].map(s=>(<div key={s.l} className="card" style={{textAlign:"center",padding:12}}><div style={{color:"var(--txt3)",fontSize:9,letterSpacing:2}}>{s.l}</div><div className="hdr" style={{fontSize:22,color:"var(--wht)"}}>{s.v}</div></div>))}
      </div>}
    </div>
  );
}

function FootballGame(){return(<div style={{width:"100%",height:"calc(100vh - 60px)",position:"relative",overflow:"hidden"}}><iframe src="/football.html" style={{width:"100%",height:"100%",border:"none",display:"block"}} title="Football Heads Mundial 2026" allow="autoplay"/></div>);}

export default function App(){
  const[user,setUser]=useState(null);const[isAdmin,setIsAdmin]=useState(false);const[users,setUsers]=useState({});const[results,setResults]=useState({});const[allPreds,setAllPreds]=useState({});const[view,setView]=useState("home");const[loading,setLoading]=useState(true);const[adminMode,setAdminMode]=useState(true);const[animType,setAnimType]=useState(null);
  const showAnim=useCallback((type)=>{setAnimType(type);setTimeout(()=>setAnimType(null),4000);},[]);
  useEffect(()=>{(async()=>{const u=await dbGet("users");if(u)setUsers(u);const r=await dbGet("results");if(r)setResults(r);const sess=JSON.parse(localStorage.getItem("prode-session")||"null");if(sess){setUser(sess.user);setIsAdmin(sess.isAdmin);}setLoading(false);})()},[]);
  useEffect(()=>{if(!user)return;(async()=>{const ap={};const all=[...Object.keys(users),...AI_IDS];for(const id of all){const d=await dbGet(`preds-${id}`);ap[id]=d||{};}setAllPreds(ap);})();},[users,user]);
  useEffect(()=>{if(!user)return;const iv=setInterval(async()=>{const u=await dbGet("users");if(u)setUsers(u);const r=await dbGet("results");if(r)setResults(r);},15000);return()=>clearInterval(iv);},[user]);
  const login=async(id,admin)=>{setUser(id);setIsAdmin(admin);localStorage.setItem("prode-session",JSON.stringify({user:id,isAdmin:admin}));const u=await dbGet("users");if(u)setUsers(u);const r=await dbGet("results");if(r)setResults(r);};
  const logout=()=>{setUser(null);setIsAdmin(false);setView("home");localStorage.removeItem("prode-session");};
  if(loading)return(<div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center"}}><style>{CSS}</style><div style={{textAlign:"center"}}><div style={{fontSize:44}}>⚽</div><div className="hdr" style={{fontSize:18,marginTop:8,animation:"pls 1.5s infinite"}}>CARGANDO...</div></div></div>);
  if(!user)return<><style>{CSS}</style><Login onLogin={login}/></>;
  const approved=isAdmin||users[user]?.approved;
  return(
    <div style={{minHeight:"100vh",background:"var(--bg)"}}><style>{CSS}</style>
      {animType&&<Anim type={animType} onDone={()=>setAnimType(null)}/>}
      <Hdr user={isAdmin?"ADMIN":users[user]?.name||user} isAdmin={isAdmin} onLogout={logout} view={view} setView={setView} adminMode={adminMode} setAdminMode={setAdminMode}/>
      {!approved&&!isAdmin?(<div style={{textAlign:"center",padding:50}} className="fi"><div style={{fontSize:44,marginBottom:10}}>⏳</div><h2 className="hdr" style={{fontSize:22}}>ESPERANDO APROBACIÓN</h2><p style={{color:"var(--txt2)",fontSize:13,marginTop:5}}>El organizador tiene que habilitarte.</p></div>):(
        <>{!isAdmin&&!users[user]?.paid&&<div style={{maxWidth:700,margin:"16px auto 0",padding:"0 16px"}}><PayBanner/></div>}
          {view==="home"&&<Home users={users} results={results}/>}
          {view==="hoy"&&<HoyView users={users} results={results} allPreds={allPreds}/>}
          {view==="preds"&&(!isAdmin||!adminMode)&&<Preds currentUser={user} results={results} showAnim={showAnim}/>}
          {view==="preds"&&isAdmin&&adminMode&&<Admin users={users} setUsers={setUsers} results={results} setResults={setResults} allPreds={allPreds}/>}
          {view==="table"&&<Table users={users} results={results} currentUser={user} allPreds={allPreds}/>}
          {view==="compare"&&<Compare users={users} results={results} allPreds={allPreds}/>}
          {view==="ia"&&<IAView results={results} allPreds={allPreds} users={users} currentUser={user}/>}
          {view==="rules"&&<Rules/>}
          {view==="admin"&&isAdmin&&<Admin users={users} setUsers={setUsers} results={results} setResults={setResults} allPreds={allPreds}/>}
          {view==="game"&&<FootballGame/>}
        </>
      )}
    </div>
  );
}
