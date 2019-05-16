var gameBoard;
var yellowPiece;

 class Block {
   constructor (id, x_offset, y_offset, piece) {
     this.id = id;
     this.piece = piece;
     this.x_offset = x_offset;
     this.y_offset = y_offset;
   }

   display() {
     let board = document.getElementById("board");
     let block = document.createElement("div");
     block.setAttribute("class", "block");
     block.setAttribute("style", "left: "+(50*(this.x_offset+this.piece.x_offset-2))+"px");
     block.setAttribute("style", block.getAttribute("style")+"; top: "+(50*(this.y_offset+this.piece.y_offset-2))+"px");
     block.setAttribute("style", block.getAttribute("style")+"; background-color: "+this.piece.color);
     board.appendChild(block);
   }
 }

 class Piece {
   constructor (id, x_offset, y_offset, height, width, color, alive) {
     this.id = id;
     this.x_offset = x_offset;
     this.y_offset = y_offset;
     this.height = height;
     this.width = width;
     this.color = color;
     this.alive = alive;
     this.blocks = [];
   }

   display() {
     //Display Blocks
     for (let i=0;i<this.blocks.length;i++)
     {
       this.blocks[i].display();
     }
   }


   flip(direction) {
     if (direction == "up") {
       //Make new blocks positioned relative to location
       //Add them to the piece, redisplay piece
       let newBlocks = [];
       for (let i=0;i<this.blocks.length;i++){
         //height - offset + 1 is new offset
        let block = new Block(null, this.blocks[i].x_offset, (this.height - this.blocks[i].y_offset + 1), this);
        this.blocks[i].y_offset += this.height;
        newBlocks.push(block);
       }
       for (let i=0;i<newBlocks.length;i++){
         this.blocks.push(newBlocks[i])
       }
       this.y_offset -= this.height;
       this.height *= 2;
     //} else if (direction.equals("right")) {

     } else if (direction == "down") {
       let newBlocks = [];
       for (let i=0;i<this.blocks.length;i++){
         //height - offset + 1 is new offset
        let block = new Block(null, this.blocks[i].x_offset, (this.height - this.blocks[i].y_offset + 1), this);
        block.y_offset += this.height;
        newBlocks.push(block);
       }
       for (let i=0;i<newBlocks.length;i++){
         this.blocks.push(newBlocks[i])
       }
       this.height *= 2;
     //} else if (direction.equals("right")) {

     }
     this.display();
   }
 }

 class Board {
    constructor (height, width) {
      this.height = height;
      this.width = width;
      this.x_offset = 1;
      this.y_offset = 1;
      this.pieces = [];
      this.color = "lightgray";
   }

   display() {
     let board = document.getElementById("board");
     board.style.height = ""+(this.height*50)+"px";
     board.style.width = ""+(this.width*50)+"px";
     this.populate();
     //Display Pieces
     for (let i=0;i<this.pieces.length;i++)
     {
       this.pieces[i].display();
     }

   }

   populate() {
     console.log("Populating");
     for (let i=1; i<=this.height;i++){
       for(let j=1; j<=this.width;j++){
         let block = new Block(null, j, i, gameBoard);
         block.display();
       }
     }
   }
 }

 function main() {
   // Level one
   gameBoard = new Board(8, 3);
   let bluePiece = new Piece(1, 2, 1, 1, 1, "blue", true);
   let greenPiece = new Piece(2, 2, 5, 1, 1, "green", true);
   yellowPiece = new Piece(3, 1, 5, 2, 3, "yellow", true);
   let redPiece = new Piece(4, 2, 8, 1, 1, "red", true);
   const block1 = new Block(1, 1, 1, bluePiece);
   const block2 = new Block(2, 1, 1, greenPiece);
   // Yellow
   const block3 = new Block(3, 1, 1, yellowPiece);
   const block4 = new Block(4, 3, 1, yellowPiece);
   const block5 = new Block(5, 1, 2, yellowPiece);
   const block6 = new Block(6, 2, 2, yellowPiece);
   const block7 = new Block(7, 3, 2, yellowPiece);
   //red
   const block8 = new Block(8, 1, 1, redPiece);

   bluePiece.blocks = [block1];
   greenPiece.blocks = [block2];
   yellowPiece.blocks = [block3,block4,block5,block6,block7];
   redPiece.blocks = [block8];
   gameBoard.pieces = [bluePiece,greenPiece,yellowPiece,redPiece];

   gameBoard.display();
 }
