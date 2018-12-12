var currentElement = null;

function createBlock() {
    
        var fragment = document.createDocumentFragment();
        var divfordrag = document.createElement('div');
        var div = document.createElement('div');
        var searchInput = document.createElement('input');
        var btnSearch = document.createElement('button');
        var btnPrev = document.createElement('button');
        var btnNext = document.createElement('button');
        var btnParent = document.createElement('button');
        var btnChildren = document.createElement('button');
        var heading = document.createElement('h4');
        var btnClose = document.createElement('button');

        searchInput.id = "searchInput";
        btnSearch.id = "searchBtn";
        div.id = "searchForm";
        btnClose.id = "btnClose";
        btnPrev.id = "btnPrev";
        btnNext.id = "btnNext";
        btnParent.id = "btnParent";
        btnChildren.id = "btnChild";
        heading.id = "head";
        divfordrag.id = "dddd"

        
        fragment.appendChild(div);
        div.appendChild(divfordrag);
        document.body.appendChild(fragment);

        // style for div
        div.style.padding = "20px";
        div.style.height = "150px";
        div.style.width = "232px";
        div.style.backgroundColor = "#eaeaead1";
        div.style.position = "absolute";
        div.style.top = "0px";
        div.style.userSelect = "none";

        // style for heading 
        heading.style.marginTop = "0px";
        heading.style.display = "inline-block";

        // style for input 
        searchInput.style.marginBottom = "20px";

        // style for btnSearch
        btnSearch.style.marginLeft = "4px";

        // style for btnClose
        btnClose.style.background = "transparent";
        btnClose.style.marginLeft = "51px";
        btnClose.style.border = "none";
        btnClose.style.fontWeight = "bold";
        btnClose.style.padding = "0px";

        divfordrag.appendChild(heading);
        heading.innerText = "Search node element";
        divfordrag.appendChild(btnClose);
        btnClose.innerText = "X";
        div.appendChild(searchInput);
        div.appendChild(btnSearch);
        btnSearch.innerText = "Search";
        div.appendChild(btnPrev);
        btnPrev.innerText = "Prev";
        div.appendChild(btnNext);
        btnNext.innerText = "Next";
        div.appendChild(btnParent);
        btnParent.innerText = "Parent";
        div.appendChild(btnChildren);
        btnChildren.innerText = "Children";
        
         // btn disabled
         btnPrev.disabled = true;
         btnNext.disabled = true;
         btnParent.disabled = true;
         btnChildren.disabled = true;
         
         dragElement(searchForm);

         function dragElement(elementMoveing) {
            var pos1 = 0,
              pos2 = 0,
              pos3 = 0,
              pos4 = 0;
            if (divfordrag) {
              // if present, the header is where you move the DIV from:
              divfordrag.onmousedown = dragMouseDown;
            } else {
              // otherwise, move the DIV from anywhere inside the DIV:
              elementMoveing.onmousedown = dragMouseDown;
            }
          
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
              // set the element's new position:
              elementMoveing.style.top = elementMoveing.offsetTop - pos2 + "px";
              elementMoveing.style.left = elementMoveing.offsetLeft - pos1 + "px";
            }
          
            function closeDragElement() {
              // stop moving when mouse button is released:
              document.onmouseup = null;
              document.onmousemove = null;
            }
          }
         
}

createBlock();

function closeSearch() {
    document.body.removeChild(searchForm);
}

function searchElement() {
    var searchedElem = document.querySelectorAll(searchInput.value)[0];
    currentElement = searchedElem;
    searchedElem.style.border = "5px solid red";
    searchInput.value = "";
    checkDisabled();
}

function prevEl() {
    var prev = currentElement.previousElementSibling;

    if(!prev || prev.nodeName === 'SCRIPT') {
        return;
    } else {
        currentElement.style.border = "none";
        prev.style.border = "5px solid red";
        currentElement = prev;
    }
    checkDisabled();
}

function nextEl() {
    var next = currentElement.nextElementSibling;

    if(!next || next.nodeName === 'SCRIPT') {
        return;
    } else {
        currentElement.style.border = "none";
        next.style.border = "5px solid red";
        currentElement = next;
    }
    checkDisabled();
}

function parentEl() {
    var parent = currentElement.parentElement;

    if(!parent || parent.nodeName === 'SCRIPT') {
        return;
    } else {
        currentElement.style.border = "none";
        parent.style.border = "5px solid red";
        currentElement = parent;
    }
    checkDisabled();
}

function childrenEl() {
    var child = currentElement.firstElementChild;

    if(!child || child.nodeName === 'SCRIPT') {
        return;
    } else {
        currentElement.style.border = "none";
        child.style.border = "5px solid red";
        currentElement = child;
    }
    checkDisabled();
}

function checkDisabled() {
    var prevCheck = currentElement.previousElementSibling;
    var nextCheck = currentElement.nextElementSibling;
    var parentCheck = currentElement.parentElement;
    var childCheck = currentElement.firstElementChild;

    if(!prevCheck || prevCheck.nodeName === 'SCRIPT'){
        btnPrev.disabled = true;
    } else {
        btnPrev.disabled = false;
    }

    if(!nextCheck || nextCheck.nodeName === 'SCRIPT') {
        btnNext.disabled = true;
    } else {
        btnNext.disabled = false;
    }

    if(!parentCheck || parentCheck.nodeName === 'SCRIPT') {
        btnParent.disabled = true;
    } else {
        btnParent.disabled = false;
    }

    if(!childCheck || childCheck.nodeName === 'SCRIPT') {
        btnChild.disabled = true;
    } else {
        btnChild.disabled = false;
    }

}

btnClose.addEventListener("click", closeSearch);
searchBtn.addEventListener("click", searchElement);
btnPrev.addEventListener("click", prevEl);
btnNext.addEventListener("click", nextEl);
btnParent.addEventListener("click", parentEl);
btnChild.addEventListener("click", childrenEl);