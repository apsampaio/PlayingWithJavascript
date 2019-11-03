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
var cubeFormed = JSON.parse(JSON.stringify(cube));
/*  ----------  */



// Draw canvas function
function draw() {

    drawMiniMap();
    drawLines();
    drawRects();
    // Deep copy to set its own key-value pairs
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

// Rotate command : R, L
function rotateLineUp(line) {

    let backLine;
    if (line != 1) {

        if(!line) {

            backLine = 0;
            rotateFaceCCW(LEFT);

        } else {

            backLine = 2;
            rotateFaceCW(RIGHT);

        }

    } else { backLine = 1; }
     
    for (let i = 0; i <= 2; i++) {
    
        cube[TOP][i][line] = cubeBackup[FRONT][i][line];
        cube[BACK][i][backLine] = cubeBackup[TOP][i][line];
        cube[BOTTOM][i][line] = cubeBackup[BACK][i][backLine];
        cube[FRONT][i][line] = cubeBackup[BOTTOM][i][line];

    }

        
    draw();
    
}

// Rotate a cube face Clockwise
function rotateFaceCW(face) {

    for (let i = 0, j = 2; i <= 2; i++) {

        cube[face][0][i] = cubeBackup[face][j][0];
        cube[face][2][i] = cubeBackup[face][j][2];
        j--;
    }
    cube[face][1][0] = cubeBackup[face][2][1];
    cube[face][1][2] = cubeBackup[face][0][1];

    // if we rotating the front or back we need to change some more

    if (face == FRONT) {
 
        for (let i = 0, j = 2; i <= 2; i++) {

            cube[RIGHT][i][0]  = cubeBackup[TOP][2][i];
            cube[BOTTOM][0][i] = cubeBackup[RIGHT][j][0]; 
            cube[LEFT][i][2]   = cubeBackup[BOTTOM][0][i];
            cube[TOP][2][i]    = cubeBackup[LEFT][j][2];
            j--;
        }

    } else if (face == BACK) {

        for (let i = 0, j = 2; i <= 2; i++) {

            cube[LEFT][i][0]   = cubeBackup[TOP][0][j];
            cube[BOTTOM][2][i] = cubeBackup[LEFT][i][0];
            cube[RIGHT][i][2]  = cubeBackup[BOTTOM][2][j];
            cube[TOP][0][i]    = cubeBackup[RIGHT][i][2];
            j--;

        }
    }

    draw();

}

// Rotate a cube face CounterClockwise
function rotateFaceCCW(face) {

    for (let i = 0; i <= 2; i++) {

        cube[face][0][i] = cubeBackup[face][i][2];
        cube[face][2][i] = cubeBackup[face][i][0];

    }

    cube[face][1][0] = cubeBackup[face][0][1];
    cube[face][1][2] = cubeBackup[face][2][1];

    draw();


    /*      FRONT

            cube[RIGHT][0][0] = cubeBackup[TOP][2][0];
            cube[RIGHT][1][0] = cubeBackup[TOP][2][1];
            cube[RIGHT][2][0] = cubeBackup[TOP][2][2];

            cube[BOTTOM][0][0] = cubeBackup[RIGHT][2][0];
            cube[BOTTOM][0][1] = cubeBackup[RIGHT][1][0];
            cube[BOTTOM][0][2] = cubeBackup[RIGHT][0][0];
        
            cube[LEFT][0][2] = cubeBackup[BOTTOM][0][0];
            cube[LEFT][1][2] = cubeBackup[BOTTOM][0][1];
            cube[LEFT][2][2] = cubeBackup[BOTTOM][0][2];

            cube[TOP][2][0] = cubeBackup[LEFT][2][2];
            cube[TOP][2][1] = cubeBackup[LEFT][1][2];
            cube[TOP][2][2] = cubeBackup[LEFT][0][2]; 
            
            BACK


            cube[LEFT][0][0] = cubeBackup[TOP][0][2];
            cube[LEFT][1][0] = cubeBackup[TOP][0][1];
            cube[LEFT][2][0] = cubeBackup[TOP][0][0];

            cube[BOTTOM][2][0] = cubeBackup[LEFT][0][0];
            cube[BOTTOM][2][1] = cubeBackup[LEFT][1][0];
            cube[BOTTOM][2][2] = cubeBackup[LEFT][2][0];
        
            cube[RIGHT][0][2] = cubeBackup[BOTTOM][2][2];
            cube[RIGHT][1][2] = cubeBackup[BOTTOM][2][1];
            cube[RIGHT][2][2] = cubeBackup[BOTTOM][2][0];

            cube[TOP][0][0] = cubeBackup[RIGHT][0][2];
            cube[TOP][0][1] = cubeBackup[RIGHT][1][2];
            cube[TOP][0][2] = cubeBackup[RIGHT][2][2];
            
            
            */

}


