var pendingIndexChange = false;
var currentPlanetNumber = 0;
var scrolledUp = true;
const planets = ["earth", "jupiter", "neptune", "mercury", "mars", "black-hole", "alien", "uranus", "exoplanet_1", "exoplanet_2", "moon"];
const planetsCzech = ["Země", "Jupiter", "Neptun", "Merkur", "Mars", "Černá díra", "Mimozemšťané", "Uran", "Exoplaneta 1", "Exoplaneta 2", "Měsíc"];
const planetsEnglish = ["Earth", "Jupiter", "Neptune", "Mercury", "Mars", "Black Hole", "Aliens", "Uranus", "Exoplanet 1", "Exoplanet 2", "Moon"];
const planetColors = ["rgba(0,54,181,1)", "rgba(184, 106, 70, 1)", "rgba(9, 127, 181, 1)", "rgba(130, 130, 130, 1)", "rgba(171, 54, 48, 1)", "rgba(83, 71, 173, 1)", "rgba(40, 168, 74, 1)", "rgba(62, 102, 171, 1)", "rgba(129, 69, 168, 1)", "rgba(181, 130, 40, 1)", "rgba(135, 135, 135, 1)"];

function scrollHandle()
{
    if (window.scrollY < 150)
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
            window.location.href = el.href;
            setTimeout(function() {
                $("#page_transition_div").fadeOut();
                try {
                    $("#header_text").fadeIn();
                }
                catch {}
            }, 2000);
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
    else if (type == "wallpaper")
    {
        pic_1.src = "assets/img/wallpaper_showcase/1.png";
        pic_2.src = "assets/img/wallpaper_showcase/2.png";
        pic_3.src = "assets/img/wallpaper_showcase/3.png";
        pic_4.src = "assets/img/wallpaper_showcase/4.png";
    }
}

function setBackground(index)
{
    document.getElementById("moon_planet_2").style.display = "block";
    document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/astronaut.png";
    if (planets[index] != "mercury" && planets[index] != "black-hole" && planets[index] != "moon") document.getElementById("moon_planet").style.display = "block";
    else document.getElementById("moon_planet").style.display = "none";
    if (planets[index] == "alien") {
        document.getElementById("moon_planet_2").style.display = "none";
        document.getElementById("moon_planet").style.backgroundImage = "url(assets/img/ufo.png";
    }
    else if (planets[index] == "earth") {
        document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/satellite.png";
    }
    else if (planets[index] == "moon") {
        document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/rocket.png";
    }
    else document.getElementById("moon_planet").style.backgroundImage = "url(assets/img/planets/moon.png";
    document.getElementById("page-top").style.background = "radial-gradient(at right bottom, " + planetColors[index] + " 10%, rgba(0,0,0,1) 100%)";
    document.getElementById("main_planet").style.backgroundImage = "url(assets/img/planets/" + planets[index] + ".png)";
    document.getElementById("randomize_button").innerHTML = "změnit pozadí (právě " + planetsCzech[index] + ")";
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
        setBackground(randomNumber);
    }, fadeSpeed);
}

function randomizeIndexStartup()
{
    var randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
    currentPlanetNumber = randomNumber;
    setBackground(randomNumber);
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