
let draggables = document.getElementsByClassName('draggable')
for (let i = 0; i < draggables.length; i++) {
  let el = draggables[i]
  dragElement(el);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;


  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let yy = elmnt.offsetTop - pos2
    let xx = elmnt.offsetLeft - pos1

    let totalHeight = window.innerHeight
    let totalWidth = window.innerWidth

    mostTop = totalHeight * .1
    mostBottom = totalHeight * .72

    mostLeft = totalWidth * .01
    mostRight = totalWidth * .72

    // be 200 or bigger
    // if (yy < 200) {
    //   yy = 200
    // }
    yy = Math.max(mostTop, yy)
    yy = Math.min(mostBottom, yy)

    xx = Math.max(mostLeft, xx)
    xx = Math.min(mostRight, xx)

    // set the element's new position:
    elmnt.style.top = yy + "px";
    elmnt.style.left = xx + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
