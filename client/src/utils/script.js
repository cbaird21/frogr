var grid = document.querySelector(".grid");
var msnry = new Masonry(".grid", {
  itemSelector: ".grid-item",
  columnWidth: ".grid-sizer",
  isFitWidth: true,
  initLayout: false,
});
msnry.layout();
// add event listener for initial layout
msnry.on("layoutComplete", function (items) {
  console.log(items.length);
});
// trigger initial layout
grid.addEventListener("click", function (event) {
  // don't proceed if item was not clicked on
  if (!matchesSelector(event.target, ".grid-item")) {
    return;
  }
  // change size of item via class
  event.target.classList.toggle("grid-item--gigante");
  // trigger layout
  msnry.layout();
});


