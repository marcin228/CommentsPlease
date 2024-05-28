const largeBreakpoint = 1024;
const repositionRetryLimit = 10;
const repositionRetryIntervalLimit = 250;

let repositionRetryCount = 0;
let timer = null;

const elementsAreDefined = function(arr){

	const l = arr.length;
	for(let i = 0; i < l; i++)
		if(arr[i] === undefined)
			return false;
	
	return true;
}

const checkResolution = function(){

	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;

	return [screenWidth, screenHeight];
}

const saveInitialValues = function(){

	
}

const reposition = function(){
	
	const urlParams = new URLSearchParams(window.location.search);
	const videoParam = urlParams.get('v');

	if(checkResolution()[0] > largeBreakpoint){
		if(videoParam && videoParam.length > 0){

			const player = document.querySelectorAll('#player-full-bleed-container')[0];
			const wrapper = document.querySelectorAll('#columns')[0];
			const wrapperInnerPlacement = document.querySelectorAll('#columns.ytd-watch-grid')[0];
			const left = document.querySelectorAll('#primary')[0];
			const right = document.querySelectorAll('#secondary')[0];
			const leftChildElement1 = document.querySelectorAll('#secondary.ytd-watch-grid')[0];
			const leftChildElement2 = document.querySelectorAll('#secondary-inner')[0];
			const fixSubscribe = document.querySelectorAll('ytd-watch-grid[is-two-columns_]:not([swatcheroo-binary-layout]) #secondary-inner.ytd-watch-grid')[0];

			const elements = [player, wrapper, left, right, wrapperInnerPlacement, leftChildElement1, leftChildElement2, fixSubscribe];

			if(elementsAreDefined(elements)){
	
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
			
			leftChildElement2.style.position = 'relative';

			player.style.height = 'calc(100vh - 56px)';
			player.style.maxHeight = 'none';
			
			wrapper.style.display = 'block';
			wrapper.style.position = 'relative';
			
			left.style.display = 'block !important';
			left.style.overflow = 'hidden';	
			left.style.width = '100%';	
			left.style.maxHeight = '280px';	

			leftChildElement1.style.width = '100%';
			leftChildElement1.style.minWidth = 'auto';
			leftChildElement1.style.boxSizing = 'border-box';
			leftChildElement1.style.flex = '1';
			leftChildElement1.style.padding = '2vw 4vw';

			fixSubscribe.style.position = 'relative';
			wrapperInnerPlacement.style.display = 'revert';
		}
	}
};

const onLoadHandler = function(e){
	
	clearTimeout(timer);
	timer = setTimeout(reposition, 2500);
};

window.addEventListener('load', onLoadHandler);
window.addEventListener('popstate', onLoadHandler);
window.addEventListener('resize', onLoadHandler);
