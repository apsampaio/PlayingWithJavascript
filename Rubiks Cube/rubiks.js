var rubiks = document.getElementById('rubiks');
var ctx = rubiks.getContext('2d');

rubiks.width = 300;
rubiks.height = 300;

var minimap = document.getElementById('minimap');
var ctxM = minimap.getContext('2d');

minimap.width = 300;
minimap.height = 225;

// Cube Colors
var colorSet = ['orange', 'white', 'red', 'yellow', 'blue', 'green']; 

// Cube Faces
var cube = {

    // TOP
    top: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    // FRONT
    front: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    // BOTTOM
    bottom: [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2]
    ],
    // BACK
    back: [
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3]
    ],
    // RIGHT
    right: [
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 4]
    ],
    // LEFT
    left: [
        [5, 5, 5],
        [5, 5, 5],
        [5, 5, 5]
    ]

};
/* Initializer */

draw();
// Cube backup before move
var cubeBackup = cube;

/*  ----------  */



// Draw canvas function
function draw() {
    drawMiniMap();
    drawLines();
    drawRects();
    
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
        
            ctx.fillStyle = colorSet[cube.front[j][i]];
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
            ctxM.fillStyle = colorSet[cube.left[j][i]];
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
            ctxM.fillStyle = colorSet[cube.top[j][i]];
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
            ctxM.fillStyle = colorSet[cube.bottom[j][i]];
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
            ctxM.fillStyle = colorSet[cube.front[j][i]];
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
            ctxM.fillStyle = colorSet[cube.right[j][i]];
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
            ctxM.fillStyle = colorSet[cube.back[j][i]];
            ctxM.fillRect(x, y, 25, 25);
            ctxM.strokeRect(x, y, 25, 25);
            ctxM.stroke();

            x += 25;
        
        }
        x = 225;
        y += 25;
    }

}

// Rotate command
function rotateLineRight(line) {
    //BUG
    cube.right[line] = cubeBackup.front[line];  
    cube.front[line] = cubeBackup.left[line];
    cube.left[line] = cubeBackup.back[line];   
    cube.back[line]  = cubeBackup.right[line];

    draw();

}
