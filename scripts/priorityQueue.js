var priorityQueue = function(){
    this.values = [],
        this.keys=[],
        this.count=0;
    
}
priorityQueue.prototype.Enqueue=function(value,key){
    for(var i=0;i<this.values.length;i++){
        if(key<this.keys[i]){
            this.values[i]=value;
            this.keys[i]=key;
            this.count=this.values.length;
            return;
            
        }
    }
    this.values.push(value);
        this.keys.push(key);
        this.count=this.values.length;
}
priorityQueue.prototype.ExtractMin=function(){
    if(this.values.length<=0){return;}
    var min = this.values[0];
    this.values.splice(0,1);
        this.keys.splice(0,1);
    this.count=this.values.length;
    return min;
}