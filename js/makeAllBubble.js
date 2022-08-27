bubblePan=op(".bubbPan");

class bubbleList{
	allList="Yoga,Crossfit,Aerobics,Nutirition Support,Group Training,Personal Training,Strength Training,Cardio Area,Zumba,Boxing,Modern Equipments,Sports Condioning";
	pan=bubblePan;
	static toScroll=5;

	constructor(){
		this.allList=this.allList.split(",");

		var html="";
		for(let val of this.allList){
			var sO=val.split(' '),
			eachWord='';
			var font;
			sO.forEach(e=>{
				font=140/e.length*2;
				eachWord+=(`<div style="font-size: ${font}px;">${e}</div>`);
			});


			html+=`<div class="bubble flex c" style="filter: hue-rotate(${Math.ceil(Math.random()*180)}deg);">
			<div class="bbg flex c">
				${eachWord}
			</div>
			</div>`
		}

		this.pan.insertAdjacentHTML("afterbegin",html);
		setInterval(this.autoScroll,50)
	}

	autoScroll(){
		var top=bubblePan.getClientRects()[0].top;
		if(top>0 && top<window.innerHeight){
			if(bubblePan.scrollWidth-bubblePan.offsetWidth==bubblePan.scrollLeft || bubblePan.scrollLeft==0){
				bubbleList.toScroll*=-1;
			}
			log(bubblePan.scrollBy(bubbleList.toScroll,0))
		}
	}


}


new bubbleList();