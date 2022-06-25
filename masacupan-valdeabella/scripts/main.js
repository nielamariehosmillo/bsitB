$(".category-title").parent().attr("data-aos","fade-up").attr("data-aos-once",true).attr("data-aos-duration","1000")
$(".products-row").attr("data-aos","fade-up").attr("data-aos-once",true).attr("data-aos-duration","1000").attr("data-aos-delay","100")

$(".menu-btn").click(function (e) {
    let sideMenu = $(".side-menu");
    let menu = $(".side-menu .menu")
    if (menu.hasClass("covered")) {
        menu.removeClass("covered");
        $(".side-menu .wrapper").removeClass("covered")
        $(".side-menu .sub-menu").removeClass("open")
    } else {
        if (sideMenu.hasClass("open")) {
            sideMenu.removeClass("open")
        } else {
            sideMenu.addClass("open")
        }
    }
})
$(".main-about-link").click(function (e) {
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
    $(".language-dropdown").focusout(function () {
        menu.removeClass("open")
    })

    var lastScrollTop = 0;
    // side-menu
    const sideMenu = $(".side-menu .menu");
    const sideMenuLinks = $(".side-menu .menu-link");

    sideMenuLinks.on("click", function (e) {
        e.preventDefault();
        sideMenu.toggleClass("covered")
        $(".side-menu .wrapper").toggleClass("covered")
        let menu = $(this).attr("href");
        $(menu).addClass("open");
    })

})

// slider
$(function () {
    const slides = $(".about-slider .slide")
    const controls = $(".about-slider .control");
    var slideIndex = 0;
    // prev/next slide
    controls.on("click", function (e) {
        if (String($(this).attr("id")) === String("prev")) {
            slideIndex--;
        } else {
            slideIndex++;
        }
        if (slideIndex > slides.length - 1) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }

        slides.removeClass("active");

        $(slides[slideIndex]).addClass("active");

    })
})

$(function () {
    $(".scroll-link").on("click", function (e) {
        e.preventDefault();
        let section = $(this).attr("href");
        const element = $(section)[0];
        const bodyRect = document.body.getBoundingClientRect().top;
        let totalNavHeight = $(".navbar.main-nav").height()
        const offset = totalNavHeight - 100;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        $("html, body").animate({
            scrollTop: offsetPosition
        });
    })

    $("#login-here-link").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#login-dropdown-toggler").click()
    })

})

$(function () {
    const slider = $("#hero-product-slider .slider");
    const products = $("#hero-product-slider .products a");
    const slides = $("#hero-product-slider .slides");
    var slideIndex = 0;
    products.on("click", function (e) {
        e.preventDefault();
        slideTo($(this).data("slide"));

    })

    function slideTo(index) {
        console.log(index)
        let width = $(".slides").width();
        $(".slides .slide").removeClass("active");
        $($(".slides .slide")[index]).addClass("active")
        slides[0].style.left = index * -(width / 3) + "px";
    }
    function slideRightTo(index) {
        console.log(index)

        $(slides[index]).css("left", "500px")
    }

    function indexOf(slides, slide) {
        for (let x = 0; x < slides.length; x++) {
            if (slides[x] === slide) {
                return x;
            }
        }
        return -1;
    }

    $(document).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > 100) {
            $(".main-nav").addClass("scrolling")

        } else {
            $(".main-nav").removeClass("scrolling")
        }
    })
})

$(function () {
    $(".product-collapse .collapse").on("show.bs.collapse", function (e) {
        let id = $(this).attr("id");
        let toggler = $(".product-collapse .collapse-toggler").filter(function () {
            return $(this).attr("href") == `#${id}`;
        })

        toggler.find("i").removeClass("bx-plus").addClass("bx-minus")
    })
    $(".product-collapse .collapse").on("hidden.bs.collapse", function (e) {
        let id = $(this).attr("id");
        let toggler = $(".product-collapse .collapse-toggler").filter(function () {
            return $(this).attr("href") == `#${id}`;
        })

        toggler.find("i").removeClass("bx-minus").addClass("bx-plus")
    })

    // mobile filter menu
    $(".filter-btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).data("open")) {
            $("#mobile-filter-menu").removeClass("open");
            $(".mobile-menu-overlay").hide();
            $(".filter-btn").attr("data-open", false)
        } else {
            $("#mobile-filter-menu").addClass("open");
            $(".mobile-menu-overlay").show();
            $(".filter-btn").attr("data-open", true)
        }
    })
    $("#mobile-filter-menu").click(function (e) {
        if (e.target == $("#mobile-filter-menu")[0]) {
            $("#mobile-filter-menu").removeClass("open");
            $(".mobile-menu-overlay").hide();
            $(".filter-btn").attr("data-open", false)
        }
    })


    // mobile side menu
    $(".mobile-menu-btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).data("open")) {
            $("#mobile-side-menu").removeClass("open");
            $(".mobile-menu-overlay").hide();
            $(".mobile-menu-btn").attr("data-open", false)
        } else {
            $("#mobile-side-menu").addClass("open");
            $(".mobile-menu-overlay").show();
            $(".mobile-menu-btn").attr("data-open", true)
        }
    })
    $("#mobile-side-menu").click(function (e) {
        if (e.target == $("#mobile-side-menu")[0]) {
            $("#mobile-side-menu").removeClass("open");
            $(".mobile-menu-overlay").hide();
            $(".mobile-menu-btn").attr("data-open", false)
        }
    })

})

$(function () {
    let productsRow = $("#products .products-row");

    let products = productsRow.html();

    productsRow.html(products + products + products + products);

    $(".categories-nav .top-link").on("mouseover", function (e) {
        let width = $(this).width();
        let arrow = $(this).siblings(".menu-wrapper").find(".arrow");
        $(this).siblings(".menu-wrapper").css('width', (width * 2 + 60) + "px")
        arrow.css("left", width + "px");
        console.log("width: ", width)
    })
})

$(function () {
    $(".category-btn").on("click", function (e) {
        let width = $("#mobile-category-menu").width();
        $("#mobile-category-menu").find(".top-arrow").css("left", (width / 2 - 10) + "px")
        console.log("open: ", $(this).data("open"))
        if ($("#mobile-category-menu").hasClass("open")) {
            $("#mobile-category-menu").removeClass("open");
            $(this).find("i").addClass("bx-chevron-up").removeClass("bx-chevron-down")

        } else {
            $("#mobile-category-menu").addClass("open");
            $(".category-btn").find("i").removeClass("bx-chevron-up").addClass("bx-chevron-down");
        
        }

    })
    $(".mobile-categories-nav .top-link").on("click", function (e) {

        let width = $(this).width();
        let arrow = $(this).siblings(".menu-wrapper").find(".arrow");
        $(this).siblings(".menu-wrapper").css('width', (width * 2 + 60) + "px")
        arrow.css("left", width + "px");
        
        $(this).parent().parent().toggleClass("open")
    })
    $(".product img").addClass("w-100")

    $(".product-info-pills").on("click",function(e){
        $(".product-info-pills").parent().removeClass("active");
        $(this).parent().addClass("active")
    })

})

$(function(){
    let loginModal = $("#login-modal");
    let resetBtn = loginModal.find(".reset-pass");
    let createAccountBtn = loginModal.find(".create-account");
    let loginBtn = loginModal.find(".login-account");
    createAccountBtn.on("click",function(){
        loginModal.modal("hide");
    })

    //resetbtn
    resetBtn.on("click",function(e){
        e.preventDefault();
        $(".login-form").addClass("d-none")
        $(".reset-form").removeClass("d-none")
    }) 

    // login btn
    loginBtn.on("click",function(e){
        e.preventDefault();
        $(".login-form").removeClass("d-none")
        $(".reset-form").addClass("d-none")
    }) 
})