let timer = null;

const reposition = function(){
	
	const urlParams = new URLSearchParams(window.location.search);
	const videoParam = urlParams.get('v');
	
	if(videoParam && videoParam.length > 0){

		const player = document.querySelectorAll('#player-full-bleed-container')[0];
		const wrapper = document.querySelectorAll('#columns')[0];
		const wrapperInnerPlacement = document.querySelectorAll('#columns.ytd-watch-grid')[0];
		const left = document.querySelectorAll('#primary')[0];
		const right = document.querySelectorAll('#secondary')[0];
		const leftChildElement1 = document.querySelectorAll('#secondary.ytd-watch-grid')[0];
		const leftChildElement2 = document.querySelectorAll('#secondary-inner')[0];
		const fixSubscribe = document.querySelectorAll('ytd-watch-grid[is-two-columns_]:not([swatcheroo-binary-layout]) #secondary-inner.ytd-watch-grid')[0];

		if(!player && !wrapper && !left && !right && !wrapperInnerPlacement && !leftChildElement1 && !leftChildElement2 && !fixSubscribe){
			
			clearTimeout(timer);
			timer = setTimeout(reposition, 100);
		}
		else{
			clearTimeout(timer);
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
};

const onLoadHandler = function(e){
	
	timer = setTimeout(reposition, 2500);
};

window.addEventListener('load', onLoadHandler);
window.addEventListener('popstate', onLoadHandler);