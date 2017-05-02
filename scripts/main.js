
//all cells and the two buttons
var cells = document.getElementsByTagName("input"),
    displayBtn = document.getElementById("displaybtn"),
    checkBtn = document.getElementById("checkbtn"),
    bfsBtn=document.getElementById("bfsbtn"),
    dfsBtn=document.getElementById("dfsbtn"),
    dlsBtn = document.getElementById("dlsbtn"),
    idsBtn=document.getElementById("idsbtn"),
    ucsBtn=document.getElementById("ucsbtn"),
    // arr to fill each cell (2d and 1d)
 arr=[[],[],[],[],[],[],[],[],[]],
    intialState=[[],[],[],[],[],[],[],[],[]],
 randOrderArr=[],//arr to generate random values
 completeArr=[]; // all cells of the original arr

displayBtn.onclick=displayCells;
checkBtn.onclick=checkSolution;

//to make the default cell shown grey and can't edit
for (var i = 0; i < cells.length; i++) {
        cells[i].setAttribute("readonly","readonly");
         cells[i].style.backgroundColor="grey";
    }

//if the user enter negative or number more than 9
function checkValidation(ele){
    if(ele.value<=0 || ele.value>9){
        ele.value="";
    }
    }

// generate random two values to make swap between them
for(var i=0;i<8;i++){
    var randNum=generateRandomNum();
    while(randOrderArr.includes(randNum)){
            var randNum=generateRandomNum();
    }
    randOrderArr.push(randNum);
}

window.onload=generateNumbers(arr);

/* function to generate numbers to fill cells
then swap between cells
to make a random board
*/

function generateNumbers(arr){
for (var i=0; i < 9; i++)
            {
                for (var j=0; j < 9; j++)
                {
                    arr[i][j]=parseInt((i * 3 + i / 3 + j) % 9 + 1);
                    switch(arr[i][j]){
                        case randOrderArr[0]:
                            arr[i][j]=randOrderArr[1];
                            break;
                        case randOrderArr[1]:
                            arr[i][j]=randOrderArr[0];
                            break;
                        case randOrderArr[2]:
                            arr[i][j]=randOrderArr[3];
                            break;
                        case randOrderArr[3]:
                            arr[i][j]=randOrderArr[2];
                            break;
                        case randOrderArr[4]:
                            arr[i][j]=randOrderArr[5];
                            break;
                        case randOrderArr[5]:
                            arr[i][j]=randOrderArr[4];
                            break;
                        case randOrderArr[6]:
                            arr[i][j]=randOrderArr[7];
                            break;
                        case randOrderArr[7]:
                            arr[i][j]=randOrderArr[6];
                            break;
                    }
                }

            }
}

// to generate Random number between 1 and 9

function generateRandomNum(){
    var Num=Math.ceil(Math.random()*9);
    return Num;
}
/* to make the complete array contains all cells of the original array

in only 1d arr instead of 2d arr

*/
var currentIndex=0;
for(var i=0;i<9;i++){
     for (var j=0; j < 9; j++){
    completeArr[currentIndex]=arr[i][j];
         currentIndex++;
}
     }

// when user click on displayBtn

function displayCells(){
    var index=0;
   for (var i=0; i < 9; i++)
            {
                for (var j=0; j < 9; j++)
             {
                    cells[index].value=arr[i][j];
                    index++;

                }

            }
}
// to hide some of cells
window.onload=encryptCells;
function encryptCells(){
    displayCells();
    for(var i=0;i<35;i++){
                var index=Math.floor(Math.random()*81);
        while(cells[index].value==""){
           var index=Math.floor(Math.random()*81);
        }
        cells[index].value="";
        cells[index].classList.add("hidden");
        cells[index].removeAttribute("readonly");
        cells[index].style.backgroundColor="white";
    }

    intiState();
}
// to check current solution
function checkSolution(){
  var correctCell=0,
 userSolution=[[],[],[],[],[],[],[],[],[]],
  index=0;
  for(var i=0;i<9;i++){
    for(var j=0;j<9;j++){

    userSolution[i][j] = cells[index].value;
    index++;

  }
}
currentIndex=0;

for(var i=0;i<9;i++){
  for(var j=0;j<9;j++){
    var sq=  checkDupSquare(userSolution,i+1,j+1);
    var row =  checkRowDup(userSolution,i);
    var col =   checkColDup(userSolution,j);


    if(sq&&row&&col){
    correctCell++;
cells[currentIndex].style.backgroundColor="green";
    }
    else {
      cells[currentIndex].style.backgroundColor="red";

    }
    currentIndex++;

  }
}

    if(correctCell==cells.length){
        document.getElementById("status").innerHTML="You Win";
         document.getElementById("status").style.color="green";
    }
    else{
        status.innerHTML="You Lose";
      document.getElementById("status").innerHTML="You Lose";
         document.getElementById("status").style.color="red";
    }

}
/* cehck squres when user plays & cols & row*/
function checkDupSquare(state,rowIndex,colIndex){
        var numMajorCols = 3,
             width = 3,
             majorRow = parseInt((rowIndex - 1) / width),
             majorCol = parseInt((colIndex - 1) / width),
             squareNum = majorCol + (majorRow * numMajorCols)+1;
    switch(squareNum){
        case 1:
            var val = CheckSquareCellsDuq(state,0,3);
            break;
        case 2:
             var val =CheckSquareCellsDuq(state,0,6);
             break;
        case 3:
             var val =CheckSquareCellsDuq(state,0,9);
             break;
        case 4:
           var val =  CheckSquareCellsDuq(state,3,3)
            break;
        case 5:
           var val =  CheckSquareCellsDuq(state,3,6)
            break;
        case 6:
           var val =  CheckSquareCellsDuq(state,3,9)
            break;
        case 7:
            var val = CheckSquareCellsDuq(state,6,3)
            break;
        case 8:
            var val = CheckSquareCellsDuq(state,6,6)
            break;
        case 9:
            var val = CheckSquareCellsDuq(state,6,9)
            break;
        }
        return val;
    }
/*
num is array contain all numbers
that's maybe fill the cells
remain is another array to return numbers that's aren't used until now
*/
function CheckSquareCellsDuq(state,startIndex,endIndex){
     var num=[1,2,3,4,5,6,7,8,9],
         numIndex=0,
         truePos=0;
    while(numIndex!=9){
        var count=0;
    for(var i=startIndex;i<(startIndex+3);i++){
        for(var j=(endIndex-3);j<endIndex;j++){
         if(num[numIndex]==state[i][j]){
           count++;
         }
        }

    }
    if(count==1){
       truePos++;
    }

       numIndex++;


}
  if(truePos==9){return true;}
  else {
    return false;
  }
            }
function checkRowDup(state,rowIndex){
    var num=[1,2,3,4,5,6,7,8,9],
     truePos=0;
    for(var i=0;i<num.length;i++){
        var count=0;
        for(var j=0;j<num.length;j++){
       if(num[i]==state[rowIndex][j]){
           count++;
       }

        }
         if(count==1){
          truePos++;
        }

    }

    if(truePos==9){return true;}
    else {
      return false;
    }
    }
    function checkColDup(state,colIndex){
        var num=[1,2,3,4,5,6,7,8,9],
         truePos=0;
        for(var i=0;i<num.length;i++){
            var count=0;
            for(var j=0;j<num.length;j++){
           if(num[i]==state[j][colIndex]){
               count++;
           }

            }
             if(count==1){
              truePos++;
            }

        }


        if(truePos==9){return true;}
        else {
          return false;
        }
        }

/*
start state for artifical intelligence
*/
function intiState(){
var index=0;
for(var i=0;i<9;i++){
     for (var j=0; j < 9; j++){

             intialState[i][j]=parseInt(cells[index].value);

         index++;

     }
}
}
/*
determining the square position for cell
*/
function checkSquare(state,rowIndex,colIndex){
        var numMajorCols = 3,
             width = 3,
             majorRow = parseInt((rowIndex - 1) / width),
             majorCol = parseInt((colIndex - 1) / width),
             squareNum = majorCol + (majorRow * numMajorCols)+1;
    switch(squareNum){
        case 1:
            var val = CheckSquareCells(state,0,3);
            break;
        case 2:
             var val =CheckSquareCells(state,0,6);
             break;
        case 3:
             var val =CheckSquareCells(state,0,9);
             break;
        case 4:
           var val =  CheckSquareCells(state,3,3)
            break;
        case 5:
           var val =  CheckSquareCells(state,3,6)
            break;
        case 6:
           var val =  CheckSquareCells(state,3,9)
            break;
        case 7:
            var val = CheckSquareCells(state,6,3)
            break;
        case 8:
            var val = CheckSquareCells(state,6,6)
            break;
        case 9:
            var val = CheckSquareCells(state,6,9)
            break;
        }
    return val;
    }
/*
num is array contain all numbers
that's maybe fill the cells
remain is another array to return numbers that's aren't used until now
*/
function CheckSquareCells(state,startIndex,endIndex){
     var num=[1,2,3,4,5,6,7,8,9],
     remain=[],
         numIndex=0;
    while(numIndex!=9){
        var count=0;
    for(var i=startIndex;i<(startIndex+3);i++){
        for(var j=(endIndex-3);j<endIndex;j++){
         if(num[numIndex]!=state[i][j]){
           count++;
         }
        }
        if(count==9){
           remain.push(num[numIndex]);
        }
    }

       numIndex++;


}
    return remain;
            }
function checkRow(state,rowIndex){
    var num=[1,2,3,4,5,6,7,8,9],
     remain=[];
    for(var i=0;i<num.length;i++){
        var count=0;
        for(var j=0;j<num.length;j++){
       if(num[i]!=state[rowIndex][j]){
           count++;
       }

        }
         if(count==9){
           remain.push(num[i]);
        }

    }
    return remain;
    }
function checkCol(state,colIndex){
    var num=[1,2,3,4,5,6,7,8,9],
     remain=[];
    for(var i=0;i<num.length;i++){
        var count=0;
        for(var j=0;j<num.length;j++){
       if(num[i]!=state[j][colIndex]){
           count++;
       }

        }
         if(count==9){
           remain.push(num[i]);
        }

    }

    return remain;
    }

function compare(Square,Row,Col){
    var finalArr=[];
    var allArr = Square.concat(Row,Col);
    var len=3;
    // if one of the argumetns return null
    for(var i=0;i<3;i++){
       if(arguments[i].length==0){
           len--;
       }
    }
   var repeatedTimes=0,
       currentIndex=0;
    while(currentIndex<allArr.length){
   for(var i=0;i<allArr.length;i++){
      if(allArr[currentIndex]==allArr[i]){
          repeatedTimes++;
      }
       // to check if there's interset and not repeat values
       if(repeatedTimes==len&&!(finalArr.includes(allArr[currentIndex]))){

           finalArr.push(allArr[currentIndex]);
       }
   }
        repeatedTimes=0;
    currentIndex++;
       }
    return finalArr;
}
