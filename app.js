const products=[
{id:1,name:"Thailand Home 2026",cat:"ทีมชาติไทย",price:2690,img:"https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=85",tag:"NEW"},
{id:2,name:"Thailand Away 2026",cat:"ทีมชาติไทย",price:2690,img:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85",tag:"AWAY"},
{id:3,name:"Bangkok United Home",cat:"สโมสรไทย",price:2290,img:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85",tag:"POPULAR"},
{id:4,name:"Buriram United Home",cat:"สโมสรไทย",price:2390,img:"https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=900&q=85",tag:"THAI LEAGUE"},
{id:5,name:"Classic Football Shirt",cat:"คลาสสิก",price:1990,img:"https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85",tag:"ARCHIVE"},
{id:6,name:"Training Jersey Black",cat:"ซ้อม",price:1590,img:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85",tag:"TRAINING"}];

let cart=JSON.parse(localStorage.getItem("urbanstep-cart")||"[]");
function money(n){return "฿"+n.toLocaleString("th-TH")}
function saveCart(){localStorage.setItem("urbanstep-cart",JSON.stringify(cart));document.querySelectorAll("#cartCount").forEach(x=>x.textContent=cart.length)}
function addToCart(id){let p=products.find(x=>x.id===id);cart.push(p);saveCart();let b=document.querySelector(`[data-add="${id}"]`);if(b){b.textContent="เพิ่มแล้ว";setTimeout(()=>b.textContent="เพิ่มลงตะกร้า",900)}}
function showCart(){if(!cart.length){alert("ตะกร้ายังว่าง");return} alert("ตะกร้าสินค้า\n\n"+cart.map(x=>x.name+" — "+money(x.price)).join("\n")+"\n\nระบบชำระเงินเป็น Demo");}
function renderProducts(filter="all"){
 const grid=document.getElementById("productGrid"); if(!grid)return;
 grid.innerHTML=products.filter(p=>filter==="all"||p.cat===filter).map(p=>`<article class="product"><div class="product-image"><img src="${p.img}" alt="${p.name}"><span class="tag">${p.tag}</span></div><div class="product-info"><span class="category">${p.cat}</span><h3>${p.name}</h3><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}" onclick="addToCart(${p.id})">เพิ่มลงตะกร้า</button></div></div></article>`).join("");
}
document.addEventListener("click",e=>{if(e.target.classList.contains("filter")){document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");renderProducts(e.target.dataset.cat)}})
saveCart();

// Weighted Graph: Bangkok transit stations. Times/fares are simulated for the assignment.
const graph={
Siam:[{to:"Asok",time:6,fare:17},{to:"National Stadium",time:3,fare:15}],
Asok:[{to:"Siam",time:6,fare:17},{to:"Mo Chit",time:12,fare:28},{to:"Sukhumvit",time:3,fare:17}],
Mo Chit:[{to:"Asok",time:12,fare:28},{to:"Chatuchak Park",time:2,fare:15},{to:"Phahon Yothin",time:6,fare:17}],
Chatuchak Park:[{to:"Mo Chit",time:2,fare:15},{to:"Phahon Yothin",time:4,fare:17},{to:"Sukhumvit",time:16,fare:30}],
Phahon Yothin:[{to:"Mo Chit",time:6,fare:17},{to:"Chatuchak Park",time:4,fare:17},{to:"Sukhumvit",time:13,fare:30}],
Sukhumvit:[{to:"Asok",time:3,fare:17},{to:"Phahon Yothin",time:13,fare:30},{to:"Phra Ram 9",time:4,fare:18}],
Phra Ram 9:[{to:"Sukhumvit",time:4,fare:18},{to:"Chatuchak Park",time:18,fare:32}]
};
function dijkstra(start,target,costFn){
 const dist={},prev={},open=new Set(Object.keys(graph)); Object.keys(graph).forEach(v=>dist[v]=Infinity);dist[start]=0;
 while(open.size){let u=[...open].reduce((a,b)=>dist[a]<dist[b]?a:b);open.delete(u);if(u===target)break;
   graph[u].forEach(e=>{if(!open.has(e.to))return;let alt=dist[u]+costFn(e);if(alt<dist[e.to]){dist[e.to]=alt;prev[e.to]=u}});
 }
 let path=[],cur=target;if(dist[target]===Infinity)return null;while(cur){path.unshift(cur);if(cur===start)break;cur=prev[cur]}return {cost:dist[target],path};
}
function pathEdges(path){let out=[];for(let i=0;i<path.length-1;i++){let e=graph[path[i]].find(x=>x.to===path[i+1]);out.push(e)}return out}
function calculateRoutes(){
 let from=document.getElementById("from")?.value||"Siam",to=document.getElementById("to")?.value||"Phra Ram 9",box=document.getElementById("routeResults");if(!box)return;
 let fastest=dijkstra(from,to,e=>e.time), cheapest=dijkstra(from,to,e=>e.fare), balanced=dijkstra(from,to,e=>e.time+e.fare*.25);
 const cards=[["เร็วที่สุด",fastest,"time"],["ค่าโดยสารต่ำสุด",cheapest,"fare"],["สมดุลเวลา/ค่าโดยสาร",balanced,"balanced"]];
 box.innerHTML=cards.map(([title,r,type],i)=>{let es=pathEdges(r.path),time=es.reduce((s,e)=>s+e.time,0),fare=es.reduce((s,e)=>s+e.fare,0);return `<div class="route-card ${i===2?"best":""}"><div class="route-top"><div class="route-title">${title}<small>${i===0?"Minimum simulated time":i===1?"Minimum simulated fare":"Balanced weight"}</small></div><b>${money(fare)}</b></div><div class="route-metrics"><div><b>${time} นาที</b><small>เวลาโดยประมาณ</small></div><div><b>${Math.max(0,es.length-1)}</b><small>จุดเปลี่ยน</small></div><div><b>${r.path.length}</b><small>Vertices</small></div></div><div class="mini-path">${r.path.join("  →  ")}</div></div>`}).join("");
}
function confirmTicket(){localStorage.setItem("urbanstep-ticket","TH-260927-1048");location.href="ticket.html"}
