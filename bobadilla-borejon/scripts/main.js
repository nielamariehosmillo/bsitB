// for slider
$(function () {
    let controls = $(".slider .control")

    controls.on("click", function (e) {
        const slider = $($(this).data("slider"))
        let command = $(this).data("control").toLowerCase()
        let index = slider.data("slide-index")
        let slides = slider.find(".slide")
        console.log("slides: ", slides.length)
        slides.removeClass("active").removeClass("left").removeClass("right")
        if (command === "prev") {
            // 
            index = index - 1 < 0 ? slides.length - 1 : index - 1;
            $(slides[index]).addClass("active")
        } else {
            index = index + 1 > slides.length - 1 ? 0 : index + 1;
            console.log("index: ", index)
            $(slides[index]).addClass("active")
        }