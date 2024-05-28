export default class YTElement{

    constructor(ref, changedProperties){

        this.ref = ref;
        this.state = {};
        this.changedProperties = changedProperties;
    }

    saveInitialProperties(){
    
        const l = this.changedProperties.length;
        for(let i = 0; i < l; i++){
            this.state[this.changedProperties] = this.ref[this.changedProperties];
        }
    }
}