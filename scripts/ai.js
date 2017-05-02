// node class
        var NodeClass = function(parent=null,state=[[],[],[],[],[],[],[],[],[]],action="")
        {
            // root defination
            if(parent==null){
            this.State = state;
            this.Parent = null;
            this.Cost = 0;
            this.Depth = 0;
            this.Action="";
            }
            //childs
            else{
            this.Parent=parent;
            this.Depth=this.Parent.Depth+1;
            this.State=state;
            this.Cost=this.Parent.Cost+1;
            this.Action=action;
            }
            // to determine the blanck cell
            this.getBlankCell = function(){
              for(var i=0;i<9;i++){
            for (var j=0; j < 9; j++){
                // the value of the cell will be null or not a number
                if(isNaN(state[i][j])||state[i][j]==null){
                    return [i,j];
                }
        }
            }
        }
        }

       // method for getting the child
        NodeClass.prototype.getSuccessor=function(stateNow){
            var blankCell =this.getBlankCell();

            if(blankCell == null){
                return null;
            }
             /*

             firstly check the numbers that's available to choice and aren't exist
             so we can put the propabilites by make interset
             between the numbers for squres and rows and cols
             */
           var posSquareArr = checkSquare(stateNow,blankCell[0]+1,blankCell[1]+1);
           var posRowArr = checkRow(stateNow,blankCell[0]);
           var posColArr = checkCol(stateNow,blankCell[1]);
            // to make interset between numbers
            var propArr = compare(posSquareArr,posRowArr,posColArr);

            // adding childs
            var child=[];
            for(var i=0;i<propArr.length;i++){
                var CopyState =JSON.parse(JSON.stringify(stateNow));// deep copy
                CopyState[blankCell[0]][blankCell[1]]=propArr[i];
                child.push(new NodeClass(this,CopyState,"Adding at Row:"+blankCell[0]+"Col:"+blankCell[1]+">>"+propArr[i]));
            }
            return child;

        }

       //Uninformed class

        var UninformedSearch = function(){
            var fring = [];//  queue or stack depend on the algorithm

            /* breadth first algorithm
            the fring is:queue
            */
            this.BFS=function(startState){

                var root =new NodeClass(null,startState);
                fring.push(root);

                 while(fring.length!=0){
                     // dequeue
                     var currentNode = fring.shift();

              // adding childs to queue
                      var childAll = [];
                     childAll = currentNode.getSuccessor(currentNode.State);
                     if(childAll == null){
                       if(this.checkGoal(currentNode.State)){
                        var c=0,
                            arrIndex=[];
                            /* check cells that are need to solve
                            and return array of indexes for them*/
                           for(var i=0;i<9;i++){
                               for(var j=0;j<9;j++){
                                       cells[c].value=currentNode.State[i][j];
                                   if((cells[c].classList.contains("hidden"))){
                                    cells[c].style.color="white";/* for animation only */
                                      arrIndex.push(c);
                                   }
                                   c++;

                               }
                           }
                           // to make an animation for display
                           displaySol(arrIndex,currentNode);
                       }
                     }
              else{
                for(var i=0;i<childAll.length;i++){

                    fring.push(childAll[i]);
                }

                }
                 }

            }
            // this method to check solution
            this.checkGoal=function(goalState){
        return true;

        }
            /*
            Uninformed Cost Search
            */
            this.UCS=function(startState){
                var fring = new priorityQueue();
                var root =new NodeClass(null,startState);
                fring.Enqueue(root,0);

                 while(fring.count!=0){
                     // dequeue
                     var currentNode = fring.ExtractMin();


              // adding childs to queue
                      var childAll = [];
                     childAll = currentNode.getSuccessor(currentNode.State);
                     if(childAll==null){
                       if(this.checkGoal(currentNode.State)){
                        var c=0,
                            arrIndex=[];
                            /* check cells that are need to solve
                            and return array of indexes for them*/
                           for(var i=0;i<9;i++){
                               for(var j=0;j<9;j++){
                                       cells[c].value=currentNode.State[i][j];
                                   if((cells[c].classList.contains("hidden"))){
                                    cells[c].style.color="white";
                                      arrIndex.push(c);
                                   }
                                   c++;

                               }
                           }
                           // to make an animation for display
                           displaySol(arrIndex,currentNode);
                       }
                     }
                else{
                for(var i=0;i<childAll.length;i++){

                    fring.Enqueue(childAll[i],childAll[i].Cost)
                }

                }
                 }

            }

         /* depth first alg1orithm
         the fring is: stack
         */
         this.DFS=function(startState){
                var root =new NodeClass(null,startState);
                fring.push(root);
                while(fring.length!=0){
                    var currentNode = fring.pop();

                      var childAll = [];

                     childAll = currentNode.getSuccessor(currentNode.State);
                     if(childAll==null){

                           if(this.checkGoal(currentNode.State)){
                            var c=0,
                                arrIndex=[];
                               for(var i=0;i<9;i++){
                                   for(var j=0;j<9;j++){

                                           cells[c].value=currentNode.State[i][j];
                                       if((cells[c].classList.contains("hidden"))){
                                        cells[c].style.color="white";
                                          arrIndex.push(c);
                                       }
                                       c++;


                                   }
                               }
                               displaySol(arrIndex,currentNode);
                           }
                     }

                 else{
                     // adding childs to stack
                for(var i=childAll.length-1;i>=0;i--){

                    fring.push(childAll[i]);
                }

                }
                 }

         }
         /* depth least search algorithm
         fring : stack
         */
         this.DLS=function(startState,limit){
                      var root =new NodeClass(null,startState);
                      fring.push(root);
                       while(fring.length!=0){
                         var currentNode = fring.pop();
                           var childAll = [];

                          childAll = currentNode.getSuccessor(currentNode.State);
                           // if we reach to the limit try another path
                           if(currentNode.Depth==limit||childAll==null){
                             if(this.checkGoal(currentNode.State)){
                              var c=0,
                                  arrIndex=[];

                                 for(var i=0;i<9;i++){
                                     for(var j=0;j<9;j++){

                                             cells[c].value=currentNode.State[i][j];
                                         if((cells[c].classList.contains("hidden"))){
                                          cells[c].style.color="white";
                                            arrIndex.push(c);
                                         }
                                         c++;


                                     }
                                 }
                                 displaySol(arrIndex,currentNode);

                                  return true;
                             }
                             else {
                               continue;

                             }

                           }

                       else{
                      for(var i=childAll.length-1;i>=0;i--){

                          fring.push(childAll[i]);
                      }

                      }
                       }
                       return false;


               }
               /*
                to use iterativ search
                */
              this.DLSIterative=function(startState,limit){
                var root =new NodeClass(null,startState);
                fring.push(root);
                 while(fring.length!=0){
                   var currentNode = fring.pop();
                     var childAll = [];

                    childAll = currentNode.getSuccessor(currentNode.State);
                     // if we reach to the limit try another path
                     if(childAll==null){
                       if(this.checkGoal(currentNode.State)){
                        var c=0,
                            arrIndex=[];

                           for(var i=0;i<9;i++){
                               for(var j=0;j<9;j++){

                                       cells[c].value=currentNode.State[i][j];
                                   if((cells[c].classList.contains("hidden"))){
                                    cells[c].style.color="white";
                                      arrIndex.push(c);
                                   }
                                   c++;


                               }
                           }
                           displaySol(arrIndex,currentNode);
                            return true;

                       }
                       else {
                         continue;

                       }

                     }

                 else{
                for(var i=childAll.length-1;i>=0;i--){

                    fring.push(childAll[i]);
                }

                }
                 }
                 return false;


                     }

          /*
          iterative depth algorithm
          fring:stack
          */
          this.IDS=function(startState){
          var limit=0;
              while(!this.DLSIterative(startState,limit)){
                console.log(limit)

                  limit++;
              }
        }
        }


        /*
        display solution method
        making the color for them red
        giving the cells class show and make some animation
        */
        var c=0; // index for traversing
       function displaySol(arrIndex,currentNode){
              cells[arrIndex[c]].style.color="red";
            cells[arrIndex[c]].classList.add("show");
           c++;
            setTimeout(function(){
               if(c<arrIndex.length){
               displaySol(arrIndex,currentNode);
               }
           },2000);

           var Actions=document.getElementById("bfs").childNodes[3],
             ActionHeader=document.getElementById("bfs").childNodes[1],
               actionsArr=[];
                ActionHeader.innerHTML="ACTIONS:";
           while(true){
               if(currentNode==null){
                   Actions.style.display="block";
                   break;
               }
               else{
                  actionsArr.push(currentNode.Action);
                   currentNode=currentNode.Parent;
               }
           }

          displayAction(actionsArr,Actions);

       }
            /*
            making reversing to display action sequentially
            */
    function displayAction(actions,Action){
    for(var i=actions.length-1;i>-1;i--){
               Action.innerHTML+=actions[i]+"<br>";
           }
        }

            /*
            when click to make the computer slove sudoku
            using the algorithms
            */
       var algorithm = new UninformedSearch();

         bfsBtn.onclick = function(){

            algorithm.BFS(intialState);

         }

        dfsBtn.onclick=function(){
            algorithm.DFS(intialState);
        }

        dlsBtn.onclick=function(){
          limit = parseInt(prompt("enter limit"));
           var dlsValue= algorithm.DLS(intialState,limit);
            if(!dlsValue){
                var ActionHeader=document.getElementById("bfs").childNodes[1];
              //  ActionHeader.style.color="red";
              // ActionHeader.innerHTML="Sorry i can't reach the goal! :("
            }
        }

        idsBtn.onclick=function(){
          algorithm.IDS(intialState);
        }
        ucsBtn.onclick = function(){
            algorithm.UCS(intialState);
        }
