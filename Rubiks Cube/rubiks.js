var rubiks = document.getElementById('rubiks');
var ctx = rubiks.getContext('2d');

rubiks.width = 300;
rubiks.height = 300;

const TOP = 0, FRONT = 1, BOTTOM = 2, BACK = 3, RIGHT = 4, LEFT = 5; 

var minimap = document.getElementById('minimap');
var ctxM = minimap.getContext('2d');

minimap.width = 300;
minimap.height = 225;

// Cube Colors
var colorSet = ['orange', 'white', 'red', 'yellow', 'blue', 'green']; 

// Cube Faces
cube = [

    // TOP
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    // FRONT
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    // BOTTOM
    [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2]
    ],
    // BACK
    [
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3]
    ],
    // RIGHT
    [
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 4]
    ],
    // LEFT
    [
        [5, 5, 5],
        [5, 5, 5],
        [5, 5, 5]
    ]

];

/* Initializer */

draw();
// Cube backup before move
var cubeBackup;
/*  ----------  */



// Draw canvas function
function draw() {

    drawMiniMap();
    drawLines();
    drawRects();
    cubeBackup = JSON.parse(JSON.stringify(cube));

}

// Draw main lines for de cube
function drawLines() {

    ctx.beginPath();
    ctx.strokeStyle = 'black';

    ctx.moveTo(100,0);
    ctx.lineTo(100, 300);
    
    ctx.moveTo(200,0);
    ctx.lineTo(200, 300);

    ctx.moveTo(0,100);
    ctx.lineTo(300, 100);

    ctx.moveTo(0,200);
    ctx.lineTo(300, 200);


    ctx.stroke();
}

// Draw cube face
function drawRects() {

    let x = 0, y = 0;

    for (let j = 0; j <= 2; j++) {

        for (let i = 0; i <= 2; i++) {
        
            ctx.fillStyle = colorSet[cube[FRONT][j][i]];
            ctx.fillRect(x, y, 100, 100);
            ctx.stroke();

            x += 100;

        }

        y += 100;
        x = 0;

    }

}

// Draw minimap
function drawMiniMap() {

    let x = 0, y = 75;
    
    // LEFT
    for (let j = 0; j < 3; j++) {

        for (let i = 0; i < 3; i++) {
  
            ctxM.beginPath();
            ctxM.fillStyle = colorSet[cube[LEFT][j][i]];
            ctxM.fillRect(x, y, 25, 25);
            ctxM.strokeRect(x, y, 25, 25);
            ctxM.stroke();

            x += 25;
        
        }
        x = 0;
        y += 25;
    }

    //TOP
    x = 75;
    y = 0;
    for (let j = 0; j < 3; j++) {

        for (let i = 0; i < 3; i++) {
  
            ctxM.beginPath();
            ctxM.fillStyle = colorSet[cube[TOP][j][i]];
            ctxM.fillRect(x, y, 25, 25);
            ctxM.strokeRect(x, y, 25, 25);
            ctxM.stroke();

            x += 25;
        
        }
        x = 75;
        y += 25;
    }

    //BOTTOM
    x = 75;
    y = 150;
    for (let j = 0; j < 3; j++) {

        for (let i = 0; i < 3; i++) {
  
            ctxM.beginPath();
            ctxM.fillStyle = colorSet[cube[BOTTOM][j][i]];
            ctxM.fillRect(x, y, 25, 25);
            ctxM.strokeRect(x, y, 25, 25);
            ctxM.stroke();

            x += 25;
        
        }
        x = 75;
        y += 25;
    }

    //FRONT
    x = 75;
    y = 75;
    for (let j = 0; j < 3; j++) {

        for (let i = 0; i < 3; i++) {
  
            ctxM.beginPath();
            ctxM.fillStyle = colorSet[cube[FRONT][j][i]];
            ctxM.fillRect(x, y, 25, 25);
            ctxM.strokeRect(x, y, 25, 25);
            ctxM.stroke();

            x += 25;
        
        }
        x = 75;
        y += 25;
    }

    //RIGHT
    x = 150;
    y = 75;
    for (let j = 0; j < 3; j++) {

        for (let i = 0; i < 3; i++) {
  
            ctxM.beginPath();
            ctxM.fillStyle = colorSet[cube[RIGHT][j][i]];
            ctxM.fillRect(x, y, 25, 25);
            ctxM.strokeRect(x, y, 25, 25);
            ctxM.stroke();

            x += 25;
        
        }
        x = 150;
        y += 25;
    }

    //BACK
    x = 225;
    y = 75;
    for (let j = 0; j < 3; j++) {

        for (let i = 0; i < 3; i++) {
  
            ctxM.beginPath();
            ctxM.fillStyle = colorSet[cube[BACK][j][i]];
            ctxM.fillRect(x, y, 25, 25);
            ctxM.strokeRect(x, y, 25, 25);
            ctxM.stroke();

            x += 25;
        
        }
        x = 225;
        y += 25;
    }

}

// Rotate command : U', D
function rotateLineRight(line) {
         
    cube[RIGHT][line] = cubeBackup[FRONT][line];  
    cube[FRONT][line] = cubeBackup[LEFT][line];
    cube[LEFT][line] = cubeBackup[BACK][line];
    cube[BACK][line] = cubeBackup[RIGHT][line];

    draw();

}

// Rotate command : U, D'
function rotateLineLeft(line) {
         
    cube[RIGHT][line] = cubeBackup[BACK][line];  
    cube[FRONT][line] = cubeBackup[RIGHT][line];
    cube[LEFT][line] = cubeBackup[FRONT][line];
    cube[BACK][line] = cubeBackup[LEFT][line];

    draw();

}

function rotateLineUp(line) {



}
