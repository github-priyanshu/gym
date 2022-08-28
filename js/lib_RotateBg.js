"use-strict";

class rotateBannerSlider{
	cen=document.createElement("div");
	curId="rotateBannerSlider_"+Date.now()+"_"+Math.ceil(Math.random()*1000);

	rotated=0;

	makeStyle(){
		this.parent.insertAdjacentHTML("beforeend",`
<style>
.cen{
  transform-style: preserve-3d;
  transform: perspective(${this.perspective}) rotateX(-90deg);
  //top: 100px;
  transition: ${this.transition};
  display: flex;
	align-items: center;
	justify-content: center;
}
.cen .view{
  position: absolute;
  --d: ${this.width};
  width: var(--d);
  height: var(--d);
  transform-style: preserve-3d;
  transform-origin: bottom;  
  transform: translateY(calc(var(--d)/-2)) rotate(calc(var(--i)*${360/this.elements.length}deg));
}
.cen .view .plate{
  width: 100%;
  height: ${this.width};
  transform-origin: top;
  transform: rotateX(90deg) scale(${this.passiveScale});
  border-radius: 10px;
  backface-visibility: hidden;
  transition: ${this.transition};
}
.cen .view .plate.active{
  transform: rotateX(90deg) scale(${this.activeScale}) translateY(${this.activerRaise});
  backface-visibility: visible;
}
</style>
`)
	}

	constructor(data){
		for(let val in data){
			this[val]=data[val];
		}

		this.cen.setAttribute("class","cen rotateBannerSlider")
		this.cen.setAttribute("id",this.curId);

		var html="";
		/*
		var imgData="Boxing,Cardio Area,Cycling,Personal Trainer,Roping,Tredmill";
		imgData=imgData.split(",");
*/
		for(let i=1; i<=this.elements.length; i++){
			html+=`
			<div class="view" style="--i: ${i}">
				<div class="plate flex c">
				${this.elements[i-1]}
				</div>
      </div>`
		}

		this.active=0;
		this.cen.innerHTML=html;

		this.makeStyle();
		this.parent.insertAdjacentElement("beforeend",this.cen);
		this.plates=document.querySelectorAll(`#${this.curId} .view .plate`);
		this.scroll(0);

		this.listenToRotate();
		this.autoInt=setInterval(()=>{
			this.scroll(this.active+1);
		},3000)
	}

	listenToRotate(){
		this.onSwipe(this.parent);
	}


	scroll(num){
		if(num<=-6){num=0}
		var actualElem= num>=0?num%6:(num%6)+6;
		try{document.querySelector(".view .plate.active").classList.remove("active");}catch{}

		this.plates[actualElem].classList.add('active');

		this.active=num;

		var plNum=this.plates[actualElem].parentElement.style.getPropertyValue("--i")
		this.cen.style.transform=`perspective(${this.perspective}) rotateX(-90deg) rotate(${(6-num-1)*60}deg)`;

	}

	onSwipe(elem,direction=false){
		// elem.addEventListener("touchmove",e=>{e.preventDefault()})
		elem.addEventListener('touchmove',check,{passive: false});
		var cordAry=[],final=[],
		obj={
			'-1':["right","down"],
			'1':["left","up"],
		};
		var mainObj=this;

		function check(e){
			//e.cancelable=true;
			e.preventDefault();
			elem.removeEventListener('touchmove',check);
			var cord=e.touches[0];


			cordAry.push([cord.clientX,cord.clientY]);
			if(cordAry.length>=2){
				var sub=[cordAry[0][0]-cordAry[1][0],cordAry[0][1]-cordAry[1][1]];
				sub.map((val,n)=>{
					sub[n]=(val>=0)?1:-1;
				});
				final=[ obj[sub[0]][0],obj[sub[1]][1] ];

				if(final.join(",").startsWith("right")){
					mainObj.scroll(mainObj.active-1);
				}else{
					mainObj.scroll(mainObj.active+1);
				}
				clearInterval(mainObj.autoInt);

			}else{
				setTimeout(()=>{
					elem.addEventListener('touchmove',check,{passive: false});
				},10);
			}

			elem.ontouchend=()=>{
				mainObj.onSwipe(elem);
			}
		}
	}


/*CLAS ENDS*/
}
/*
var data={
	parent:document.querySelector('body'),
	elements:['elem1','elem2','elem3','elem4','elem5','elem6'],
	transition:"all 1s ease",
	perspective:"400px",
	width:"100px",
	height:"100px",
	passiveScale:".8",
	activeScale:"1",
	activerRaise:"-10px",
}

new rotateBannerSlider(data);
*/