$(".menu-btn").click(function (e) {
    let sideMenu = $(".side-menu");
    let menu = $(".side-menu .menu")
    if(menu.hasClass("covered")){
        menu.removeClass("covered");
        $(".side-menu .wrapper").removeClass("covered")
        $(".side-menu .sub-menu").removeClass("open")
    }else{
        if(sideMenu.hasClass("open")){
            sideMenu.removeClass("open")
        }else{
            sideMenu.addClass("open")
        }
    }
})
$(".main-about-link").click(function(e){
    e.preventDefault();
    $(".side-menu").addClass("open")
    $("#menu-about-link").click();
})
$(function () {
    const langBtn = $(".language-dropdown .toggler");
    const menu = $(".language-dropdown ul");
    langBtn.on("click", function (e) {
        e.preventDefault();
        menu.toggleClass("open")
    })
    $(".language-dropdown").on("mouseleave", function () {
        menu.removeClass("open")
    })

    var lastScrollTop = 0;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {

            // downscroll code
            // $(".main-nav").css("height","0").css("overflow","hidden");
        } else {
            // upscroll code
            // $(".main-nav").addClass("position-fixed");
            // $(".main-nav").css("height","unset");
        }
        lastScrollTop = st;
    });
    // side-menu
    const sideMenu = $(".side-menu .menu");
    const sideMenuLinks = $(".side-menu .menu-link");

    sideMenuLinks.on("click", function(e){
        e.preventDefault();
        sideMenu.toggleClass("covered")
        $(".side-menu .wrapper").toggleClass("covered")
        let menu = $(this).attr("href");
        $(menu).addClass("open");
    })

})

// slider
$(function(){
    const slides = $(".slider .slide")
    const controls = $(".slider .control");
    var slideIndex = 0;
    // prev/next slide
    controls.on("click",function(e){
        console.log("control: ",$(this).attr("id"))
        if(String($(this).attr("id")) === String("prev")){
            slideIndex--;
        }else{
            slideIndex++;
        }
        if(slideIndex > slides.length-1 ){
            slideIndex = 0;
        }else if(slideIndex < 0){
            slideIndex = slides.length - 1;
        }
        console.log("index: ",slideIndex)

        slides.removeClass("active");

        $(slides[slideIndex]).addClass("active");
     
    })
})

$(function(){
    $(".scroll-link").on("click",function(e){
        e.preventDefault();
        let section = $(this).attr("href");

        e.preventDefault();
        const element = $(section)[0];
        const bodyRect = document.body.getBoundingClientRect().top;
        let totalNavHeight = $(".navbar.top").height() + $(".navbar.main-nav").height()
        const offset = totalNavHeight - 220;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        $("html, body").animate({
            scrollTop: offsetPosition
        });
    })

    $(".login-here-link").on("click",function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("#login-dropdown-toggler").click()
        // $("#login-dropdown").dropdown("toggle")
    })
    
})
