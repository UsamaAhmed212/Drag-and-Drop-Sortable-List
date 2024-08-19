"use strict";
document.addEventListener('DOMContentLoaded', function () {
    
    const dragArea = document.getElementById('dragArea');
    let startY, isDragging = false;

    document.addEventListener('mousedown', (event) => {
        startY = event.clientY;
        isDragging = true;
    });

    var previousY;

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            // Calculate vertical direction
            const currentY = event.clientY - startY;
            // console.log(currentY);

            if (currentY < 0) {
                // console.log("If", previousY, currentY);
                // console.log("previousY,currentY", previousY,currentY);
                if( previousY <= currentY ) {
                    console.log('I am Reversing bottom');
                } else {
                    console.log('Dragging direction: top');
                }
                previousY = currentY;
            }
            else if (currentY >= 0) {
                // console.log("Else If", previousY, currentY);
                // console.log("previousY,currentY", previousY,currentY);
                if( previousY >= currentY ) {
                    console.log('I am Reversing Top');
                } else {
                    console.log('Dragging direction: bottom');
                }
                previousY = currentY;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

});
