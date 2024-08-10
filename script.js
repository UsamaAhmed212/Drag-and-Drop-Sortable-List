"use strict";
document.addEventListener('DOMContentLoaded', function () {

    /**
     * Initializes drag-and-drop functionality for a sortable list.
     * - '.sortable-list': Selector for the container element of the sortable list.
     * - 'li': Selector for individual items in the list.
     */
    initDraggableList('.sortable-list', 'li');

    
    /**
     * Initializes drag-and-drop functionality for a sortable list.
     * @param {string} containerSelector - The selector for the container element of the sortable list.
     * @param {string} itemSelector - The selector for individual items in the list.
     */
    function initDraggableList(containerSelector, itemSelector) {

        // Select the container and items
        var sortableList = document.querySelector(containerSelector);
        var items = sortableList.querySelectorAll(itemSelector);

        // Variables for drag-and-drop logic
        var isDragging, draggingDirection, startY, currentY, previousY, draggedItem, draggedItemIndex, crossedItem, crossedItemIndex;

        // Attach event listeners to each item
        items.forEach(function(item, index) {

            // Function to handle the mousedown event
            item.addEventListener('mousedown', function(event) {
                // Initialize variables for dragging
                isDragging = true;
                draggingDirection = null;
                startY = event.clientY;
                currentY = null;
                previousY = null;
                draggedItem = item;
                draggedItemIndex = index;
                crossedItem = null;
                crossedItemIndex = null;

                // Apply styles to the dragged item and others
                items.forEach(function (item) {
                    if (item !== draggedItem) item.style.transition = 'transform 0.2s ease-in-out 0s';
                });

                // Get the width and height of the element
                // var width = item.offsetWidth;
                // var height = item.offsetHeight;

                // Update the element's css property
                // item.style.position = 'absolute';
                // item.style.width = width + 'px';
                // item.style.height = height + 'px';
                // item.style.zIndex = '1000';
                item.style.userSelect = 'none';
                item.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.45)';
                item.style.willChange = 'transform';
                
                var createElement = document.createElement('div'); // Create a new <div> element
                createElement.classList.add('sortable-placeholder'); // Add the 'sortable-placeholder' class to the created element
                
                // Insert the created element after the 'item' element in the DOM
                // item.insertAdjacentHTML('afterend', '<div class="sortable-placeholder"></div>');

                // Attach event listeners for mousemove and mouseup
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp, { once: true });
            });
            
        });

        /**
         * Handles the mousemove event during dragging.
         * @param {MouseEvent} event - The mousemove event object.
         */
        function handleMouseMove(event) {
            // If not currently dragging, exit early to skip the dragging logic
            if (!isDragging) return;

            // Calculate the distance moved
            currentY = event.clientY - startY;

            // Move the dragged item
            draggedItem.style.transform = 'translateY(' + currentY + 'px)';

            // Check if the mouse is moving upward and the dragging direction is 'down'
            if ( currentY < previousY && draggingDirection === 'down' ) {
                console.log('I am Reversing Top');
                
                // Check if the mouse is moving upward from its starting position
                if (startY >= event.clientY) {
                    draggingDirection = 'up';
                    crossedItem = null;
                }

                var previousItem = crossedItem;

                // Use a loop to find the previous li element
                while (previousItem && previousItem.tagName !== 'LI') {
                    previousItem = previousItem.previousElementSibling;
                }

                if (previousItem) {
                    // Check if the current Y position is above the previous item's top
                    if ( currentY <= previousItem.offsetTop - draggedItem.offsetTop ) {
                        crossedItemIndex = Array.from(items).indexOf(previousItem);
                        crossedItem = previousItem.previousElementSibling;

                        if (draggedItemIndex !== crossedItemIndex) {
                            previousItem.style.transform = '';
                        }
                    }
                }

            } 
            // Check if the mouse is moving downward and the dragging direction is 'up'
            else if ( currentY > previousY && draggingDirection === 'up' ) {
                console.log('I am Reversing Bottom');
                
                // Check if the mouse is moving downward from its starting position
                if (startY <= event.clientY) {
                    draggingDirection = 'down';
                    crossedItem = null;
                }

                var nextItem = crossedItem;

                // Use a loop to find the next li element
                while (nextItem && nextItem.tagName !== 'LI') {
                    nextItem = nextItem.nextElementSibling;
                }

                if (nextItem) {
                    // Check if the current Y position is below the next item's top
                    if ( currentY >= nextItem.offsetTop - draggedItem.offsetTop ) {
                        crossedItemIndex = Array.from(items).indexOf(nextItem);
                        crossedItem = nextItem.nextElementSibling;

                        if (draggedItemIndex !== crossedItemIndex) {
                            nextItem.style.transform = '';
                        }
                    }
                }

            }
            // Handle dragging downward 
            else if ( currentY > previousY ) {
                
                draggingDirection = 'down';
                console.log('Mouse moving towards the bottom');

                // Determine the next item in the list
                var nextItem = crossedItem ? crossedItem.nextElementSibling : draggedItem.nextElementSibling;

                // Use a loop to find the next li element
                while (nextItem && nextItem.tagName !== 'LI') {
                    nextItem = nextItem.nextElementSibling;
                }

                if (nextItem) {
                    // Check if the current Y position is below the next item's top
                    if ( currentY >= nextItem.offsetTop - draggedItem.offsetTop ) {
                        crossedItemIndex = Array.from(items).indexOf(nextItem);
                        crossedItem = nextItem;

                        if (draggedItemIndex !== crossedItemIndex) {
                            // Get the computed styles
                            var styles = getComputedStyle(draggedItem);

                            // Extract the height including top margin
                            var heightWithTopMargin = parseFloat(styles.height) +
                                                parseFloat(styles.marginTop);

                            // Translate the next item upward by the height of the dragged item
                            nextItem.style.transform = 'translateY(' + -(heightWithTopMargin) + 'px)';
                        }
                    }
                }

            }
            // Handle dragging upward 
            else if ( currentY < previousY ) {
                
                draggingDirection = 'up';
                console.log('Mouse moving towards the top');

                // Determine the previous item in the list
                var previousItem = crossedItem ? crossedItem.previousElementSibling : draggedItem.previousElementSibling;
                
                // Use a loop to find the previous li element
                while (previousItem && previousItem.tagName !== 'LI') {
                    previousItem = previousItem.previousElementSibling;
                }

                if (previousItem) {
                    // Check if the current Y position is above the previous item's top
                    if ( currentY <= previousItem.offsetTop - draggedItem.offsetTop ) {
                        crossedItemIndex = Array.from(items).indexOf(previousItem);
                        crossedItem = previousItem;

                        if (draggedItemIndex !== crossedItemIndex) {
                            // Get the computed styles
                            var styles = getComputedStyle(draggedItem);

                            // Extract the height including bottom margin
                            var heightWithMarginBottom = parseFloat(styles.height) +
                                                parseFloat(styles.marginBottom);

                            // Translate the previous item downward by the height of the dragged item
                            previousItem.style.transform = 'translateY(' + (heightWithMarginBottom) + 'px)';
                        }
                    }
                }

            }

            // Update the previous coordinates for the next iteration
            previousY = currentY;

        }


        /**
         * Handles the mouseup event, finalizing the drag-and-drop operation.
         * @param {MouseEvent} event - The mouseup event object.
         */
        function handleMouseUp(event) {
            console.log('Mouse Up');
                
            isDragging = false; // Reset dragging state

            // Remove the 'style' attribute from all items
            items.forEach(function (item) {
                item.removeAttribute('style');
            });

            // Remove the .sortable-placeholder element if it exists
            // var placeholderElement = item.nextElementSibling; // Assuming it's a direct sibling
            // if ( placeholderElement && placeholderElement.classList.contains('sortable-placeholder') ) placeholderElement.remove();

            // Remove the temporary event listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        
    }

});
