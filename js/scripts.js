var pendingIndexChange = false;
var currentPlanetNumber = 0;
var scrolledUp = true;
const planets = ["earth", "jupiter", "neptune", "mercury", "mars", "black-hole"];
const planetsCzech = ["Země", "Jupiter", "Neptun", "Merkur", "Mars", "Černá díra"];
const planetColors = ["rgba(0,54,181,1)", "rgba(181, 116, 38, 1)", "rgba(9, 127, 181, 1)", "rgba(130, 130, 130, 1)", "rgba(171, 54, 48, 1)", "rgba(106, 43, 173, 1)"];

function scrollHandle()
{
    if (window.scrollY < 200)
    {
        scrolledUp = true;
        $("#nav").stop().animate({backgroundColor: 'rgba(0,0,0,0)'}, 300);
    }
    else
    {
        if (scrolledUp == false)
        {

        }
        else
        {
            scrolledUp = false;
            $("#nav").stop().animate({backgroundColor: 'rgba(0,0,0,0.7)'}, 500);
        }
    }
}

scrollHandle();

function pageTransition(el)
{
    if (el.classList.contains("active"))
    {
        return false;
    }
    else
    {
        $("#page_transition_div").fadeIn();
        $("#page_transition_div").promise().done(function(){
            window.location.replace(el.href);
        });
        try {
            $("#header_text").fadeOut();
        }
        catch {

        }
        finally {
            return false;
        }
    }
}

function setModal(type)
{
    var childrenCount = 0;
    Array.from(document.getElementById("carousel_inner_1").children).forEach((element) => 
    {
        if (childrenCount++ == 0) element.classList.add("active");
        else element.classList.remove("active");
    });

    childrenCount = 0;
    Array.from(document.getElementById("carousel_indicators_1").children).forEach((element) => 
    {
        if (childrenCount++ == 0) element.classList.add("active");
        else element.classList.remove("active");
    });

    var pic_1 = document.getElementById("modal_pic_1");
    var pic_2 = document.getElementById("modal_pic_2");
    var pic_3 = document.getElementById("modal_pic_3");
    var pic_4 = document.getElementById("modal_pic_4");
    var short_pic_1 = document.getElementById("short_modal_pic_1");
    var short_pic_2 = document.getElementById("short_modal_pic_2");
    if (type == "covid")
    {
        pic_1.src = "assets/img/covid_showcase/1.jpg";
        pic_2.src = "assets/img/covid_showcase/2.jpg";
        pic_3.src = "assets/img/covid_showcase/3.jpg";
        pic_4.src = "assets/img/covid_showcase/4.jpg";
    }
    else if (type == "rtsp")
    {
        pic_1.src = "assets/img/rtsp_showcase/1.jpg";
        pic_2.src = "assets/img/rtsp_showcase/2.jpg";
        pic_3.src = "assets/img/rtsp_showcase/3.jpg";
        pic_4.src = "assets/img/rtsp_showcase/4.jpg";
    }
    else if (type == "game_engine")
    {
        short_pic_1.src = "assets/img/engine_showcase/1.jpg";
        short_pic_2.src = "assets/img/engine_showcase/2.jpg";
    }
    else if (type == "games")
    {
        pic_1.src = "assets/img/game_showcase/1.jpg";
        pic_2.src = "assets/img/game_showcase/2.jpg";
        pic_3.src = "assets/img/game_showcase/3.jpg";
        pic_4.src = "assets/img/game_showcase/4.jpg";
    }
}

function randomizeIndex()
{
    if (pendingIndexChange) return;

    // Initial stuff
    var fadeSpeed = 1000;
    var transitionLength = 1200;
    var randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
    while (randomNumber == currentPlanetNumber)
    {
        randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
    }
    currentPlanetNumber = randomNumber;
    pendingIndexChange = true;
    setTimeout(function() {
        $("#background_elements").fadeIn(fadeSpeed);
        $("#page_transition_div").fadeOut(fadeSpeed);
        pendingIndexChange = false;
    }, transitionLength);

    // Fade out everything
    $("#background_elements").fadeOut(fadeSpeed);
    $("#page_transition_div").fadeIn(fadeSpeed);
    $("#easteregg_text").fadeOut(fadeSpeed);
    setTimeout(function() {
        if (planets[randomNumber] != "mercury" && planets[randomNumber] != "black-hole") document.getElementById("moon_planet").style.display = "block";
        else document.getElementById("moon_planet").style.display = "none";
        document.getElementById("moon_planet_2").style.display = "none";
        document.getElementById("moon_planet").style.backgroundImage = "url(assets/img/planets/moon.png";
        document.getElementById("page-top").style.background = "radial-gradient(at right bottom, " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
        document.getElementById("main_planet").style.backgroundImage = "url(assets/img/planets/" + planets[randomNumber] + ".png)";
        document.getElementById("randomize_button").innerHTML = "změnit pozadí (právě " + planetsCzech[randomNumber] + ")";
    }, fadeSpeed);
}

function easterEgg()
{
    if (pendingIndexChange) return;

    // Initial stuff
    var fadeSpeed = 1000;
    var transitionLength = 1200;
    currentPlanetNumber = 6;
    pendingIndexChange = true;
    setTimeout(function() {
        $("#background_elements").fadeIn(fadeSpeed);
        $("#easteregg_text").fadeIn(fadeSpeed);
        $("#page_transition_div").fadeOut(fadeSpeed);
        pendingIndexChange = false;
    }, transitionLength);

    // Fade out everything
    $("#background_elements").fadeOut(fadeSpeed);
    $("#page_transition_div").fadeIn(fadeSpeed);
    $("#easteregg_text").fadeOut(fadeSpeed);
    setTimeout(function() {
        document.getElementById("moon_planet").style.display = "block";
        document.getElementById("moon_planet_2").style.display = "block";
        document.getElementById("moon_planet").style.backgroundImage = "url(assets/img/milk.png";
        document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/astronaut.png";
        document.getElementById("page-top").style.background = "radial-gradient(at right bottom, rgba(125, 76, 39, 1) 10%, rgba(0,0,0,1) 100%)";
        document.getElementById("main_planet").style.backgroundImage = "url(assets/img/cookie.png)";
        document.getElementById("randomize_button").innerHTML = "změnit pozadí (právě secret)";
    }, fadeSpeed);
}