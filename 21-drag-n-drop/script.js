{
    const fill = document.querySelector(".fill");
    const boxes = document.querySelectorAll(".box");

    // Para dispositivos táctiles /////////////////////////////////////////////////
    fill.addEventListener("touchstart", touchStart);
    fill.addEventListener("touchmove", touchDrag);
    fill.addEventListener("touchend", touchDrop);

    let initialPosition = null;
    let draggableClone = null;
    let element,
        available,
        clonePosition,
       cloneTop,
        cloneLeft,
        cloneBottom,
        cloneRight,
        cloneHeight,
        cloneWidth;


    function touchStart(e) {
        element = e.target;

        if (element.getAttribute("draggable")) {
            available = true;

            const touch = e.touches[0];
            initialPosition = { x: touch.clientX, y: touch.pageY };
            draggableClone = element.cloneNode(true);
            document.body.appendChild(draggableClone);
            draggableClone.style.position = 'absolute';
            draggableClone.style.top = (initialPosition.y - draggableClone.clientHeight / 2) + 'px';
            draggableClone.style.left = (initialPosition.x - draggableClone.clientWidth / 2) + 'px';
            draggableClone.classList.add("hold");
        } else {
            available = false;
        }
    }

    function touchDrag(e) {
        if (available) { // Previene que la funcionalidad se active con otros elementos
            e.preventDefault(); // Detiene el scroll

            const touch = e.touches[0];
            const newPosition = { x: touch.clientX, y: touch.pageY };
            draggableClone.style.top = (newPosition.y - draggableClone.clientHeight / 2) + 'px';
            draggableClone.style.left = (newPosition.x - draggableClone.clientWidth / 2) + 'px';

            clonePosition = draggableClone.getBoundingClientRect();
            cloneTop = clonePosition.top;
            cloneLeft = clonePosition.left;
            cloneBottom = clonePosition.bottom;
            cloneRight = clonePosition.right;
            cloneHeight = clonePosition.height;
            cloneWidth = clonePosition.width;

            for (let i = 0; i < boxes.length; i++) {
                const boxPosition = boxes[i].getBoundingClientRect();
                if (
                cloneBottom > boxPosition.top + cloneHeight / 2 &&
                cloneRight > boxPosition.left + cloneWidth / 2 &&
                cloneLeft < boxPosition.right - cloneWidth / 2 &&
               cloneTop < boxPosition.bottom - cloneHeight / 2
                ) {
                boxes[i].classList.add("hovered");
                } else {
                boxes[i].classList.remove("hovered");
                }
            }
        }
    }

    function touchDrop() {
        if (available) {
            document.body.removeChild(draggableClone);
        }

        for (let i = 0; i < boxes.length; i++) {
            const boxPosition = boxes[i].getBoundingClientRect();
            if (
                cloneBottom > boxPosition.top + cloneHeight / 2 &&
                cloneRight > boxPosition.left + cloneWidth / 2 &&
                cloneLeft < boxPosition.right - cloneWidth / 2 &&
            cloneTop < boxPosition.bottom - cloneHeight / 2
            ) {
                boxes[i].classList.remove("hovered");
                boxes[i].append(element);
            }
        }
    }


    // Para dispositivos con mouse ///////////////////////////////////////////////////
    fill.addEventListener("dragstart", dragStart);
    fill.addEventListener("dragend", dragEnd);

    for (const box of boxes) {
        box.addEventListener("dragover", dragOver);
        box.addEventListener("dragenter", dragEnter);
        box.addEventListener("dragleave", dragLeave);
        box.addEventListener("drop", dragDrop);
    }

    function dragStart() {
        this.classList.add("hold");
    }

    function dragEnd() {
        this.classList.remove("hold");
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.classList.add("hovered");
    }

    function dragLeave() {
        this.classList.remove("hovered");
    }

    function dragDrop() {
        this.className = "box";
        this.append(fill);
    }
}
