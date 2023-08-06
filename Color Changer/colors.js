const divs = document.querySelectorAll("div");
divs.forEach(function (div) {
    div.addEventListener("click", changeColor)
})

function changeColor() {
    document.body.className = this.className;
}
