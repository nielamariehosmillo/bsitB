// supabase
const PROJECT_URL = "https://vaaibypexutspvgbqawd.supabase.co"
const PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhYWlieXBleHV0c3B2Z2JxYXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTcyMDA4NzksImV4cCI6MTk3Mjc3Njg3OX0.LWhrhdDUQiSiGHja3k4La4Ab6ZTOWzo2JPWppz_rh-I"

const connection = supabase.createClient(PROJECT_URL, PUBLIC_ANON_KEY);
const user = connection.auth.user()
//subscribe to auth changes
connection.auth.onAuthStateChange((event, session) => {
    if(!user){
        location.reload()
    }
    else if(event == "SIGNED_OUT"){
        location.reload()

    }
    console.log('auth changed: ', event)

    
    
})

// page preloader opener and closer functions
const ShowPreloader = () => {
    $(".page-preloader").addClass("open")
}
const HidePreloader = () => {
    setTimeout(() => $(".page-preloader").removeClass("open"), 500)
}

// function for getting url parameters
const getUrlParams = () => {
    return new URLSearchParams(window.location.search);
}

function scrollViewTo(section) {
    const element = $(section)[0];
    const bodyRect = document.body.getBoundingClientRect().top;
    let totalNavHeight = $(".navbar.main-nav").height()
    const offset = totalNavHeight - 20;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    $("html, body").animate({
        scrollTop: offsetPosition
    });
}

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
        slider.data("slide-index", index)
    })


    $(".scroll-link").on("click", function (e) {
        e.preventDefault();
        let section = $(this).attr("href");
        scrollViewTo(section)
    })


    $("#login-modal .create-account").on("click", function (e) {
        e.preventDefault()
        $(".login-form").addClass("d-none")
        $(".signup-form").removeClass("d-none")
    })
    $("#login-modal .login").on("click", function (e) {
        e.preventDefault()
        $(".login-form").removeClass("d-none")
        $(".signup-form").addClass("d-none")
    })

})

$(".signup-form").on("submit", async function (e) {
    e.preventDefault();

    let url = window.location.href;

    const form = $(this)
    let email = form.find(".email").val()
    let password = form.find(".password").val()
    let firstname = form.find(".fname").val()
    let lastname = form.find(".lname").val()

    const { user, session, error } = await connection.auth.signUp({
        email,
        password,
    },
        {
            data: {
                firstname,
                lastname
            }
        }
    )
    if (user) {
        Swal.fire("Success", "You successfully signed up!", "success")
            .then(() => {
                location.href = `email-sent.html?email=${email}`
            })
    }


})

const UpdateCartCount = async () => {
    const user = connection.auth.user()
    if (user) {
        const cart = await connection
            .from('cart')
            .select('quantity')
            .eq("userId", user.id)

        let count = 0

        for (let item of cart.data) {
            count += item.quantity
        }

        if (count > 0) {
            $(".cart-count").show()
            $(".cart-count").html(count)
        } else {
            $(".cart-count").hide()
        }
    } else {
        $(".cart-count").hide()

    }

}

$(".login-form").on("submit", async function (e) {
    e.preventDefault();


    const form = $(this)
    let email = form.find(".email").val()
    let password = form.find(".password").val()
    let firstname = form.find(".fname").val()
    let lastname = form.find(".lname").val()

    const { user, session, error } = await connection.auth.signIn({
        email,
        password,
    })
    if (user) {
        Swal.fire("Success", "You successfully signed In!", "success")
            .then(() => {
                location.reload()
            })
    } else if (error) {
        Swal.fire("Failed", error.message, "error")
        console.log("error: ", error)
    } else {
        Swal.fire("Failed", "Cannot proccess request, please try again!", "error")
    }


})

$(function () {
    const menu = $("#account-dropdown")
    const user = connection.auth.user()

    if (user) {
        const { firstname, lastname } = user.user_metadata
        menu.find(".sign-in").addClass("d-none")
        menu.find(".logout").removeClass("d-none")
        menu.find(".orders-link").removeClass("d-none")
        menu.find(".dropdown-header").html(`<i class="bx bx-user me-1"></i> ${firstname} ${lastname}`).removeClass("d-none")
    } else {
        menu.find(".sign-in").removeClass("d-none")
        menu.find(".logout").addClass("d-none")
        menu.find(".dropdown-header").addClass('d-none')
        menu.find(".orders.link").addClass("d-none")

    }
})

$(".logout").on("click", async function (e) {
    e.preventDefault()
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be log out from this device!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { error } = await connection.auth.signOut()

            Swal.fire(
                'Success!',
                'You have been log out!',
                'success'
            )


        }
    })

})

$(".cart-link").on('click', function (e) {
    e.preventDefault()

    const user = connection.auth.user()

    if (user) {
        location.href = $(this).attr('href')
    } else {
        $("#login-modal").modal('show')
    }
})
$(".orders-link").on('click', function (e) {
    e.preventDefault()


    const user = connection.auth.user()

    if (user) {
        location.href = $(this).attr('href')
    } else {
        $("#login-modal").modal('show')
    }
})

$(".back-btn").on('click', function (e) {
    e.preventDefault();
    history.back();
})

$(function () {
    let url = window.location.pathname;
    $(".cart-link").attr('href', 'cart.html?prev=' + url)
})

$(function () {
    const navbar = $(".main-nav")

    const user = connection.auth.user()

    if (user) {
        navbar.find(".login-item").addClass("d-none")
        navbar.find(".cart-item").removeClass("d-none")
        navbar.find(".account-item").removeClass("d-none")
    } else {
        navbar.find(".login-item").removeClass("d-none")
        navbar.find(".cart-item").addClass("d-none")
        navbar.find(".account-item").addClass("d-none")
    }
})

// supabase subscriptions
const cartItemsSubscription = connection
    .from('cart')
    .on('*', payload => {
        UpdateCartCount()
    })
    .subscribe()


$(function () {
    const loadData = async () => {
        UpdateCartCount()
    }

    loadData()
})