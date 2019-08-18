var map = [];
var liveThings = [];
const cols = 50;
const rows = 15;
const emptySpace = "..";
var maxLivingThings;
var firstSpawn;
const wall = "#";
const adult = ['o', 'x'];
const child = ['c'];
const predator = ['@'];



initialize();
setInterval(refreshMap,100);
setInterval(spawnPredator,60000);


function initialize(){

    maxLivingThings = prompt('How many creatures can live? Hint: max. 30');
    firstSpawn = prompt('How many will begin? Hint: min. 5');
    liveThings = [], map = [];
    createMap(cols,rows);
    spawnLife(firstSpawn,adult);

}


function refreshMap() {

    liveThings.forEach(move);
    document.getElementById('map').innerHTML = "";
    for (let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(map[i][j] === ' ')
            document.getElementById('map').innerHTML += emptySpace;
            else
            document.getElementById('map').innerHTML += map[i][j];
        }
        document.getElementById('map').innerHTML += "<br>";
    }
}


function createMap(cols, rows) {

    for (let i = 0; i < rows; i++) {
        map[i] = [''];

        for(let j = 0; j < cols; j++) {
           if(i == 0 || i == (rows - 1) || j == 0 || j == (cols -1))
           map[i][j] = [wall];
           else
            map[i][j] = [emptySpace];
           
        }
    }
}

function spawnLife(howMany,type) {
    
    if(liveThings.length > maxLivingThings)
    return;

    var x,y,z;
    for(let i = 0; i < howMany; i++) {
    x = Math.floor(Math.random() * cols);
    y = Math.floor(Math.random() * rows);
    z = type[Math.floor(Math.random() * type.length)]
    if(map[y][x] != emptySpace)
        i--;
    else
    liveThings.push(new life(x,y,z));
    }
}


function life(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    map[this.y][this.x] = this.z;

}

function move(element,index,array){
    let currentX = liveThings[index].x;
    let currentY = liveThings[index].y;
    let type = liveThings[index].z;
    let up = currentY - 1;
    let down = currentY + 1;
    let left = currentX - 1;
    let right = currentX + 1; 


    switch(Math.floor(Math.random() * 4)){
    case 0:
        if(checkEmpty(currentY, right))
            act(currentY,right,currentY,currentX,index,'x',right,type);
        else if(checkLife(currentY, right))
            interactive(currentY,right,type,index,currentY,currentX);
        break;
    case 1:
        if(checkEmpty(down, currentX))
            act(down,currentX,currentY,currentX,index,'y',down,type);
        else if(checkLife(down, currentX))
            interactive(down,currentX,type,index,currentY,currentX);
        break;
    case 2:
        if(checkEmpty(currentY, left))
            act(currentY,left,currentY,currentX,index,'x',left,type);
        else if(checkLife(currentY, left))
            interactive(currentY,left,type,index,currentY,currentX);
        break;
    case 3:
        if(checkEmpty(up, currentX))
            act(up,currentX,currentY,currentX,index,'y',up,type);
        else if(checkLife(up, currentX))
            interactive(up,currentX,type,index,currentY,currentX);
        break;  
    }
}

function checkEmpty(y,x){

    return map[y][x] == emptySpace ? true : false;

}

function checkLife(y,x){
        
    return map[y][x] != emptySpace && map[y][x] != wall ? true : false;
}

function interactive(y,x,type,index,currentY,currentX){

    if(map[y][x] == adult[0] && type == child)
        liveThings[index].z = adult[Math.floor(Math.random() * adult.length)];

    else if(map[y][x] == adult[1] && type == child) {
        delete liveThings[index];
        liveThings.sort();
        liveThings.pop();
        map[currentY][currentX] = emptySpace;
    }
    
    else if(map[y][x] == adult[1] && type == adult[0] || map[y][x] == adult[0] && type == adult[1])
        spawnLife(1,child);

    else if(map[y][x] == adult[1] && type == predator) {
        delete liveThings[index];
        liveThings.sort();
        liveThings.pop();
        map[currentY][currentX] = emptySpace;
    } 
    
    else if(map[y][x] == predator && type == child || map[y][x] == predator && type == adult[0]){
        delete liveThings[index];
        liveThings.sort();
        liveThings.pop();
        map[currentY][currentX] = emptySpace;
        checkGameOver();
    }
    
    else
        return;
}


function act(toMoveY,toMoveX,currentY,currentX,index,vector,move,type){

    map[toMoveY][toMoveX] = type;
    map[currentY][currentX] = emptySpace;

    if(vector == 'x') liveThings[index].x = move;   
    else liveThings[index].y = move;

}

function spawnPredator() {

    spawnLife(1,predator);

}

function checkGameOver() {
    
    for (let i = 0; i < liveThings.length; i++) {

        if (liveThings[i].z == adult[0]) return;    

    }
    alert('Game Over!');
    initialize();

}