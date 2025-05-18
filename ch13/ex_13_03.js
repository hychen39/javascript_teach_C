function clearText(){
    document.getElementById("text").value = "";
    moveCountDisplay.innerHTML = 0;
}

// Register the event listener to parent element

const parent = document.getElementById("parent");
const child = document.getElementById("child");
const moveCountDisplay = document.getElementById("moveCount");
const textArea = document.getElementById("text");

let moveCount = 0;
parent.onmousemove = function(event){
    console.log("Mouse move event");
    moveCount++;
    moveCountDisplay.innerHTML = moveCount;
}

// Mouse enter and leave events
parent.onmouseenter = function(event){
    console.log("Mouse enter event");
    textArea.value += `${event.target.id}.mouseenter \n\n`;
}

parent.onmouseleave = function(event){
    console.log("Mouse leave event");
    textArea.value += `${event.target.id}.mouseleave \n\n`;
}

// Mouse over and out events

function logMouseOver(event){
    console.log("Mouse over event");
    textArea.value += `${event.target.id}.mouseover \n\n`;
}
function logMouseOut(event){
    console.log("Mouse out event");
    textArea.value += `${event.target.id}.mouseout \n\n`;
}

parent.onmouseover = logMouseOver;
parent.onmouseout = logMouseOut;


