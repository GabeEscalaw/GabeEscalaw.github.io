// Global Variables
// Get the header


// Get the offset position of the navbar


var active = document.getElementById("list-section1");


window.addEventListener('scroll', checkScrollPosition);

// When the user scrolls the page, execute myFunction



function changeTime() {
    var hour = moment().format("HH");
    var minute = moment().format("mm");
    var second = moment().format("ss");

    var h1 = document.getElementById("hour-1");
    var h2 = document.getElementById("hour-2");
    var m1 = document.getElementById("minute-1");
    var m2 = document.getElementById("minute-2");
    var s1 = document.getElementById("second-1");
    var s2 = document.getElementById("second-2");

    changeText(h1, hour.substr(0, 1));
    changeText(h2, hour.substr(1, 1));
    changeText(m1, minute.substr(0, 1));
    changeText(m2, minute.substr(1, 1));
    changeText(s1, second.substr(0, 1));
    changeText(s2, second.substr(1, 1));
    setTimeout(changeTime, 1000);
}

function changeText(obj, text) {
    if (obj.innerText != text) {
        obj.innerText = text;
    }
}

changeTime();

function findDifferenceInDate() {
    var start = moment("2019-12-31", "YYYY-MM-DD");
    var end = moment().startOf('day');

    //Difference in number of days
    var noOfDays = moment.duration(end.diff(start)).asDays();
    var days = document.getElementById("day-1");
    changeText(days, noOfDays);
    setTimeout(findDifferenceInDate, 1000);

    // console.log(start);
    // console.log(end);
    // console.log(noOfDays);

}

findDifferenceInDate();

$('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 800);
            return false;
        }
    }
});


function defineActive() {
    var active = document.getElementById("list-section1");
    console.log(active);
    return active;
}

var navbar = document.getElementById("navbar-example");
//navbar.style.opacity = "0";
var section1 = document.getElementById("section1").offsetTop - 105;
var section10 = document.getElementById("section10").offsetTop +100;
$(document).ready(function () {
    $(window).scroll(function () {
        // fade in
        if ($(this).scrollTop() < section1 || $(this).scrollTop() > section10) {
            $(".nav__wrapper").css({ "opacity": "0" })
            // fade out
        } else {
            $(".nav__wrapper").css({ "opacity": "1" })
        }

        if ($(this).scrollTop() > section10) {
            $(".changingText").css({ "opacity": "1" })
        } else {
            $(".changingText").css({ "opacity": "0" })
        }
    })
})
function checkScrollPosition(clicked_id) {
    var arrowDown = document.getElementById("arrow-down");
    var sticky = 0;
    if (window.pageYOffset > sticky) {
        arrowDown.classList.add("hide");
    } else {
        arrowDown.classList.remove("hide");
    }


    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    var section0 = document.getElementById("section-intro-2").offsetTop + 600;
    var section1 = document.getElementById("section1").offsetTop - 100;
    var section2 = document.getElementById("section2").offsetTop - 100;
    var section3 = document.getElementById("section3").offsetTop - 100;
    var section4 = document.getElementById("section4").offsetTop - 100;
    var section5 = document.getElementById("section5").offsetTop - 100;
    var section6 = document.getElementById("section6").offsetTop - 100;
    var section7 = document.getElementById("section7").offsetTop - 100;
    var section8 = document.getElementById("section8").offsetTop - 100;
    var section9 = document.getElementById("section9").offsetTop - 100;
    var section10 = document.getElementById("section10").offsetTop - 100;
    var changingText = document.getElementById("cText").offsetTop - 200;
    var changeTextContainer = document.getElementById("cText");
    var newChangeTextContainer = document.getElementById("newCText");
    var nav = document.getElementById("navbar");
    if (scrollPosition < section0) {
        nav.classList.forEach(item => {
            if (item.endsWith('hide')) {
                nav.classList.remove(item);
            }
        });
        nav.classList.add("hide");
    } else if (scrollPosition >= section0 && scrollPosition < section1) {
        var none = "none";
        setListItemActive(none);
    } else if (scrollPosition >= section1 && scrollPosition < section2) {
        setListItemActive("list-section1");
        nav.classList.remove("hide");
    } else if (scrollPosition >= section2 && scrollPosition < section3) {
        setListItemActive("list-section2");
    } else if (scrollPosition >= section3 && scrollPosition < section4) {
        setListItemActive("list-section3");
    } else if (scrollPosition >= section4 && scrollPosition < section5) {
        setListItemActive("list-section4");
    } else if (scrollPosition >= section5 && scrollPosition < section6) {
        setListItemActive("list-section5");
    } else if (scrollPosition >= section6 && scrollPosition < section7) {
        setListItemActive("list-section6");
    } else if (scrollPosition >= section7 && scrollPosition < section8) {
        setListItemActive("list-section7");
    } else if (scrollPosition >= section8 && scrollPosition < section9) {
        setListItemActive("list-section8");
    } else if (scrollPosition >= section9 && scrollPosition < section10) {
        setListItemActive("list-section9");
        changeTextContainer.classList.remove("color-change");
        newChangeTextContainer.classList.remove("color-change2");
    } else if (scrollPosition >= section10 && scrollPosition < changingText) {
        setListItemActive("list-section10");
        nav.classList.remove("hide");
    } else if (scrollPosition >= changingText) {
        nav.classList.add("hide");
        changeTextContainer.classList.add("color-change");
        newChangeTextContainer.classList.add("color-change2");
    }

}
function setListItemActive(clicked_id) {
    // console.log("help");
    // create a variable that hold the previous active

    //console.log(section);
    //console.log(active);
    active.classList.forEach(item => {
        if (item.startsWith('active')) {
            active.classList.remove(item);
        }
    });

    if (clicked_id == "none") {
        active = document.getElementById("list-section1");
    } else {
        var section = document.getElementById(clicked_id);
        section.classList.add("active");

        active = document.getElementById(clicked_id);
    }
}

