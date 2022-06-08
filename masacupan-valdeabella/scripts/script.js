$(function () {
    let scrollTop = $(document).scrollTop();
    if (scrollTop > 20) {
        $("#navbar").addClass("colored")
    } else {
        $("#navbar").removeClass("colored")
    }
    $(document).scroll(function () {
        let scrollTop = $(document).scrollTop();
        if (scrollTop > 20) {
            $("#navbar").addClass("colored")
        } else {
            $("#navbar").removeClass("colored")
        }
    })
    var myCollapse = document.getElementById('navbarNav')
    var bsCollapse = bootstrap.Collapse.getOrCreateInstance(myCollapse, { toggle: false })
    console.log("collapse:", bsCollapse)

    $('.navigator').click(function (e) {
        e.preventDefault();
        const element = $($(this).attr('href'))[0];
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        bsCollapse.hide();

        $("html, body").animate({
            scrollTop: offsetPosition
        });
    })
    var navbarMenu = $('#navbarNav')[0];
    navbarMenu.addEventListener('show.bs.collapse', function () {
        $("#navbar").addClass("colored-orange h-100 align-items-start");
        $("#navbar-toggler-icon").html("");
        $("#navbar-toggler-icon").addClass("bi bi-x-lg fw-bolder fs-5");
        $("#navbarNav .nav-link").addClass("fs-1 fw-bolder text-dark")
    })
    navbarMenu.addEventListener('hide.bs.collapse', function () {
        $("#navbar").removeClass("colored-orange h-100 align-items-start");
        $("#navbar-toggler-icon").html(`<img src="./images//Icon.png" alt="" class="img-fluid">`);
        $("#navbar-toggler-icon").removeClass("bi bi-x-lg fw-bolder fs-5");
        $("#navbarNav .nav-link").removeClass("fs-1 fw-bolder text-dark")
    })
})