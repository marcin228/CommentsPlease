const largeBreakpoint = 1024;
const repositionRetryLimit = 10;
const repositionRetryIntervalLimit = 250;

let repositionRetryCount = 0;
let timer = null;

const elementsAreDefined = function(arr){

	const l = arr.length;
	for(let i = 0; i < l; i++)
		if(arr[i].ref === undefined)
			return false;
	
	return true;
}

const checkResolution = function(){

	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;

	return [screenWidth, screenHeight];
}

const reposition = function(){
	
	const urlParams = new URLSearchParams(window.location.search);
	const videoParam = urlParams.get('v');

	const elements = [];

	// player
	elements[elements.length] = new YTElement('#player-full-bleed-container', {'height': 'calc(100vh - 56px)', 'maxHeight': 'none'});

	// wrapper
	elements[elements.length] = new YTElement('#columns', {'display': 'block', 'position': 'relative'});

	// wrapperInnerPlacement
	elements[elements.length] = new YTElement('#columns.ytd-watch-grid', {'display': 'revert'});

	// left
	elements[elements.length] = new YTElement('#primary', {'display': 'block !important', 'overflow': 'hidden', 'width': '100%', 'maxHeight': '280px'});

	// right
	elements[elements.length] = new YTElement('#secondary');
	
	// leftChildElement1
	elements[elements.length] = new YTElement('#secondary.ytd-watch-grid', {'width': '100%', 'minWidth': 'auto', 'boxSizing': 'border-box', 'flex': '1', 'padding': '2vw 4vw'});
	
	// leftChildElement2
	elements[elements.length] = new YTElement('#secondary-inner', {});
	
	// fixSubscribe
	elements[elements.length] = new YTElement('ytd-watch-grid[is-two-columns_]:not([swatcheroo-binary-layout]) #secondary-inner.ytd-watch-grid', { 'position': 'relative' });

	if(checkResolution()[0] > largeBreakpoint){
		if(videoParam && videoParam.length > 0){

			if(elementsAreDefined(elements)){

				elements.forEach(el => el.saveInitialValues());
				elements.forEach(el => el.applyChanges());
				clearTimeout(timer);
			}
			else{

				if(repositionRetryCount >= repositionRetryLimit){
				
					clearTimeout(timer);
					return;
				}
				
				clearTimeout(timer);
				timer = setTimeout(reposition, repositionRetryIntervalLimit);
				repositionRetryCount++;
			}
		}
	}
	else{

		if(elementsAreDefined(elements))
			elements.forEach(el => el.restoreInitialValues());
	}
};

const onLoadHandler = function(e){
	
	clearTimeout(timer);
	timer = setTimeout(reposition, 2500);
};

window.addEventListener('load', onLoadHandler);
window.addEventListener('popstate', onLoadHandler);
window.addEventListener('resize', onLoadHandler);

class YTElement{

    constructor(selectionQuery, changedProperties){

        this.ref = document.querySelectorAll(selectionQuery)[0];
        this.state = {};
        this.changedProperties = changedProperties;
    }

    applyChanges(){

        for(let key in this.changedProperties)
            this.ref.style[key] = this.changedProperties[key];
    }

	restoreInitialValues(){

		for(let key in this.changedProperties)
            this.ref.style[key] = this.state[key];
	}

    saveInitialValues(){
    
		for(let key in this.changedProperties)
            this.state[key] = this.ref.style[key];
    }
}