var canvasW=400*2.5;
var canvasH=400*2.5;

//grid set up
//number of rows and columns
const rows = 3;
const cols = 3;

//cell width and height
var cellW= canvasW/cols;
var cellH= canvasH/rows

const gridX = [0,cellW, cellW*2, cellW*3];
const gridY = [0, cellH, cellH*2, cellH*3];

let pad = 5;

let gameArray = [['','',''],['','',''],['','','']];
let turn = 0;
let endOfGame = false;

function checkVictory(){
  let pattern = '';
  //handle blanks
  //handle draw
  //check 3 in a row in a row
  for(let i=0; i<rows; i++){
    pattern = gameArray[i].toString();
    if (pattern=='X,X,X' || pattern=='O,O,O'){
      return [true,gameArray[i][0]];
    }

  }
  //check 3 in a row in a column
  for(let i=0; i<cols; i++){
    pattern = [gameArray[0][i],gameArray[1][i],gameArray[2][i]].toString();
    if (pattern=='X,X,X' || pattern=='O,O,O'){
      return [true,gameArray[0][i]];
    }
  }
  let diag1 = [gameArray[0][0],gameArray[1][1],gameArray[2][2]];
  let diag2 = [gameArray[2][0],gameArray[1][1],gameArray[0][2]];
  //check 3 in a row on the two diagonals
  if(diag1 == 'X,X,X' || diag1 =='O,O,O' || diag2 == 'X,X,X' || diag2 =='O,O,O'){
      return[true,gameArray[1][1]];
  }
  return [false,''];
}
function getMouseGridPos(x,y){
  //x and y are the coordinates of the mouseClick on canvas
	function getRowPos(y){
    if(y<gridY[1]){
      return 0;
    }
    else{
      if(y<gridY[2]){
        return 1;
      }
      else{
        return 2;
      }
    }
  }
  function getColPos(x){
    if(x<gridX[1]){
      return 0;
    }
    else{
      if(x<gridX[2]){
        return 1;
      }
      else{
        return 2;
      }
    }
  }
  return {'rowIndex': getRowPos(y), 'colIndex': getColPos(x), 'cellCx': (getColPos(x)+0.5)*cellW, 'cellCy': (getRowPos(y)+0.5)*cellH};
}
function drawSymb(XorO, cellCX, cellCY){
  if(XorO=='X'){
    line(cellCX-cellW/2+pad,cellCY-cellH/2+pad,cellCX+cellW/2-pad,cellCY+cellH/2-pad);
    line(cellCX-cellW/2+pad,cellCY+cellH/2-pad,cellCX+cellW/2-pad,cellCY-cellH/2+pad);
  }
  else if(XorO='O'){
    ellipse(cellCX, cellCY, cellW-pad*2, cellH-pad*2);
  }
}
function mouseClicked() {
  if(endOfGame==false){

    let gridPos=getMouseGridPos(mouseX, mouseY);

    if(gameArray[gridPos.rowIndex][gridPos.colIndex]==''){
      let symb='';
      if(turn%2==0){
        symb='X';
      }
      else{
        symb='O';
      }
      //add appropriate entry to 2D array
      gameArray[gridPos.rowIndex][gridPos.colIndex]=symb;
      //draw X or O in the appropriate grid cell
      drawSymb(symb,gridPos.cellCx, gridPos.cellCy);
      turn+= 1;
    }
    if(turn>4){
      if(checkVictory()[0]==true){
        //if there is a victory disable mouseClick
        endOfGame = true;
        let fontsize = height*0.25;
        push();
        noStroke();
        fill(255,0.8*255);
        rect(0,0,width, height);
        pop();
        fill(0);
        textAlign(CENTER);
    		textSize(fontsize)
        text(`${checkVictory()[1]} wins!`,0,height/2,width,fontsize);
      }
      else{
       if(turn>8){
         endOfGame = true;
         let fontsize = height*0.25;
         push();
         noStroke();
         fill(255,0.8*255);
         rect(0,0,width, height);
         pop();
         fill(0);
         textAlign(CENTER);
     		textSize(fontsize)
         text("Draw!",0,height/2,width,fontsize);
       }
      }


      //otherwise go forward with rest of this code
    }
  }
}


function setup() {
  createCanvas(canvasW, canvasH);
  background(220);
  strokeWeight(2);
  noFill();
  for(let i=1; i<rows; i++){
    line(0,gridY[i],canvasW,gridY[i]);
	}
  for(let i=1; i<cols; i++){
    line(gridX[i],0,gridX[i],canvasH);
	}
}

function draw() {

}
