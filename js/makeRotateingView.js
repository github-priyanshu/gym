class makeFaciView{
	cen=op(".viewPan .cen");
	rotated=0;

	constructor(){

		var html="";
		var imgData="Boxing,Cardio Area,Cycling,Personal Trainer,Roping,Tredmill";
		imgData=imgData.split(",");
		for(let i=1; i<=6; i++){
			html+=`
			<div class="view" style="--i: ${i}">
				<div class="plate flex c">
	        <img src="img/${i}.png" alt="facility_${i}">
	        <div class="line"></div>
	        <div class="name">
	          ${imgData[i-1]}
	        </div>
				</div>
      </div>`
		}

		this.active=0;
		this.cen.innerHTML=html;
		this.plates=opp(".view .plate");
		this.scroll(0);

		this.listenToRotate();
		this.autoInt=setInterval(()=>{
			var top=this.cen.getClientRects()[0].top;
			if(top>0 && top<window.innerHeight){
				this.scroll(this.active+1);
			}
		},3000)
	}

	listenToRotate(){
		onSwipe(op(".faci"),"swiped");

	}


	scroll(num){
		if(num<=-6){num=0}
		var actualElem= num>=0?num%6:(num%6)+6;
		try{op(".view .plate.active").classList.remove("active");}catch{}


		this.plates[actualElem].classList.add('active');

		this.active=num;

		var plNum=this.plates[actualElem].parentElement.style.getPropertyValue("--i")
		this.cen.style.transform=`perspective(400px) rotateX(-90deg) rotate(${(6-num-1)*60}deg)`;
	}
}

var makeFaci=new makeFaciView();

function onSwipe(elem,fun,direction=false){
	// elem.addEventListener("touchmove",e=>{e.preventDefault()})
	elem.addEventListener('touchmove',check,{passive: false});
	var cordAry=[],final=[],
	obj={
		'-1':["right","down"],
		'1':["left","up"],
	};

	function check(e){
		e.cancelable=true;
		e.preventDefault();
		elem.removeEventListener('touchmove',check);
		var cord=e.touches[0];

		cordAry.push([cord.clientX,cord.clientY]);
		if(cordAry.length>=2){
			var sub=[cordAry[0][0]-cordAry[1][0],cordAry[0][1]-cordAry[1][1]];
			sub.map((val,n)=>{
				sub[n]=(val>=0)?1:-1;
			});
			final=[obj[sub[0]][0],obj[sub[1]][1] ];

			if(direction){
				if(final.includes(direction)){eval(fun+`("${final}")`);}
			}else{
				eval(fun+`("${final}")`);
			}
		}else{
			setTimeout(()=>{
				elem.addEventListener('touchmove',check,{passive: false});
			},10);
		}

		elem.ontouchend=()=>{
			onSwipe(elem,fun,direction);
		}
	}
}

function swiped(obj){
	clearInterval(makeFaci.autoInt);
	if(obj.startsWith("right")){
		makeFaci.scroll(makeFaci.active-1);
	}else{
		makeFaci.scroll(makeFaci.active+1);
	}
}