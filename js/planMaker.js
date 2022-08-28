class plans{
	plan=[
		['50','20-30 min',["faciliti1","faciliti2","faciliti3","faciliti4"]],
		['100','30-60 min',["faciliti1","faciliti2","faciliti3","faciliti4"]],
		['500','1-3 Hours',["faciliti1","faciliti2","faciliti3","faciliti4"]],
		['1000','All time access',["faciliti1","faciliti2","faciliti3","faciliti4"]],
	]
	static pan=op(".planPan");

	constructor(){
		var html="";
		for(let val of this.plan){
			log(val)
			html+=`<div class="planBox texCen">
        <div class="price" fs="2em"><sup>₹</sup>${val[0]}</div>
        <h3 class="time" col="#0009">${val[1]}</h3>
        <div class="faciBox flex c">`;

        for(let v of val[2]){
        	html+=`
          <div class="flex">
            <span col="#0f0" class="material-symbols-rounded">check_circle</span>
            <p fs="1.2em">${v}</p>
          </div>`;
        }

			html+=`</div></div>`;
		}

		plans.pan.innerHTML=html;
	}

	

}

new plans();

