var panHo=opp("*[scN]"),
scrPan=opp(".scrPan");
log(panHo);

panHo.forEach(val=>{
	val.onclick=()=>{
  var n=val.getAttribute("scN");
	window.scrollBy(0,scrPan[n].getClientRects()[0].top-50)
	}
})
