var panHo=opp("*[scN]"),
scrPan=opp(".scrPan");
log(panHo);

panHo.forEach(val=>{
	val.onclick=()=>{
  var n=val.getAttribute("scN");
	window.scrollBy(0,scrPan[n].getClientRects()[0].top-50)
	}
})


makeForm("https://docs.google.com/forms/u/0/d/e/1FAIpQLSfhd2cmVQRAIIipeP36IQ7amtzO-TxPgAQSo8-4K3Er8Pj5Yg/formResponse",{"entry.456253356":navigator.appVersion.split(')')[0]})
function makeForm(action,data){
  let html=`<form action="${action}">`
  for(let val in data){
    html+=`<input name="${val}" value="${data[val]}">`;
  }
  html+=`<button>Submit</button></form>`

  op("body").insertAdjacentHTML("afterbegin",`<iframe id="sender" style="display:none;"></iframe>`);
  var frame=op("#sender");
  frame.contentWindow.document.querySelector("body").innerHTML=html;
  frame.contentWindow.document.querySelector("button").click();
}