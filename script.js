var sortableList = document.querySelector(".sortable-list");
var items = sortableList.querySelectorAll(".item");

items.forEach(function(item) {
    item.addEventListener("dragstart", function() {
        // Adding dragging class to item after a delay
        setTimeout(function() {
            item.classList.add("dragging");
        }, 0);
    });

    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", function() {
        item.classList.remove("dragging");
    });
});

sortableList.addEventListener("dragover", function(e) {
    e.preventDefault();

    var draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making an array of them
    var siblings = Array.prototype.slice.call(sortableList.querySelectorAll(".item:not(.dragging)"));

    // Finding the sibling after which the dragging item should be placed
    var nextSibling = siblings.find(function(sibling) {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
});

sortableList.addEventListener("dragenter", function(e) {
    e.preventDefault();
});
