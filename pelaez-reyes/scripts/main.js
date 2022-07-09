// Carousel
const slider1 = document.querySelector("#glide_1");
if (slider1) {
    new Glide(slider1, {
        type: "carousel",
        startAt: 0,
        autoplay: 3000,
        gap: 0,
        hoverpause: true,
        perView: 1,
        animationDuration: 800,
        AnimationTimingFunc: "linear",
    }).mount()
}

// Shopping Cart
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons)

for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    })
}