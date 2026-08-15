const DEFAULT_MODEL="gemini-3.1-flash-lite";
const SYSTEM_PROMPT=`You are Jayant Singh's professional digital twin.

Answer questions about Jayant using only approved public portfolio context.

Rules:
- Never invent achievements, employers, publications, metrics or skills.
- Never reveal confidential or proprietary information.
- If information is missing, say it is not currently in the public knowledge base.
- Be technically precise and concise.

PUBLIC CONTEXT:
Jayant Singh works at the intersection of AI, algorithms and computer systems.
His portfolio includes routing/EDA engineering, DRC fixing infrastructure,
temporal knowledge graph research, and LLM + knowledge graph QA experimentation.
`;

export default {async fetch(request,env){
const cors={"Access-Control-Allow-Origin":env.ALLOWED_ORIGIN||"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"POST, OPTIONS"};
if(request.method==="OPTIONS")return new Response(null,{headers:cors});
if(request.method!=="POST")return new Response("Method Not Allowed",{status:405,headers:cors});
try{
const body=await request.json();const messages=Array.isArray(body.messages)?body.messages:[];
const r=await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",{
method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${env.GEMINI_API_KEY}`},
body:JSON.stringify({model:env.GEMINI_MODEL||DEFAULT_MODEL,messages:[{role:"system",content:SYSTEM_PROMPT},...messages.slice(-12)]})
});
const data=await r.json();
if(!r.ok)return new Response(JSON.stringify({error:"Gemini API error",details:data}),{status:502,headers:{...cors,"Content-Type":"application/json"}});
return new Response(JSON.stringify({answer:data?.choices?.[0]?.message?.content||"No answer returned."}),{headers:{...cors,"Content-Type":"application/json"}});
}catch(e){return new Response(JSON.stringify({error:String(e)}),{status:500,headers:{...cors,"Content-Type":"application/json"}})}
}}