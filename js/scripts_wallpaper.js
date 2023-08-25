const planets = ["earth", "jupiter", "neptune", "mercury", "mars", "black-hole", "alien", "uranus", "exoplanet_1", "exoplanet_2", "moon"];
const planetsCzech = ["Země", "Jupiter", "Neptun", "Merkur", "Mars", "Černá díra", "Mimozemšťané", "Uran", "Exoplaneta 1", "Exoplanet 2", "Moon"];
const planetsEnglish = ["Earth", "Jupiter", "Neptune", "Mercury", "Mars", "Black Hole", "Aliens", "Uranus", "Exoplanet 1", "Exoplanet 2", "Moon"];
const planetColors = ["rgba(0,54,181,1)", "rgba(184, 106, 70, 1)", "rgba(9, 127, 181, 1)", "rgba(130, 130, 130, 1)", "rgba(171, 54, 48, 1)", "rgba(83, 71, 173, 1)", "rgba(40, 168, 74, 1)", "rgba(62, 102, 171, 1)", "rgba(129, 69, 168, 1)", "rgba(181, 130, 40, 1)", "rgba(135, 135, 135, 1)"];
const PlanetLocation = {
    Centered: 'center',
    RightBottom: 'right bottom'
};

var pendingIndexChange = false;
var currentPlanetNumber = 0;
var randomNumber = 0;
var settings = false;
var currentPlanetLocation = PlanetLocation.Centered;
var currentPlanetLocationRotating = false;

function generateStarFlarePositionCenter()
{
    const rangeSelector = Math.random() < 0.5; // true pro první rozsah, false pro druhý rozsah
    if (rangeSelector) {
      return Math.floor(Math.random() * 31); // Mezi 0 a 30
    } else {
      return Math.floor(Math.random() * 31) + 70; // Mezi 70 a 100
    }
}

function generateStarFlarePositionCorner()
{
    return Math.floor(Math.random() * 100);
}

function setStarFlarePosition()
{
    if (currentPlanetLocation == PlanetLocation.Centered)
    {
        var top = generateStarFlarePositionCenter() + "vh";
        var right = generateStarFlarePositionCenter() + "vw";
    }
    else
    {
        var top = generateStarFlarePositionCorner() + "vh";
        var right = generateStarFlarePositionCorner() + "vw";
    }

    document.getElementById("star_flare").style.removeProperty("top");
    document.getElementById("star_flare").style.removeProperty("right");
    document.getElementById("star_flare").style.setProperty("top", top);
    document.getElementById("star_flare").style.setProperty("right", right);
}

var starFlareInterval = setInterval(setStarFlarePosition, 8000);

function setBackground(index)
{
    document.getElementById("moon_planet").style.display = "block";
    document.getElementById("moon_planet_2").style.display = "block";
    document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/astronaut.png)";
    currentPlanetLocationRotating = true;

    if (currentPlanetLocation == PlanetLocation.Centered)
    {
        document.getElementById("moon_planet_2").classList.remove("bg-planet-3-non-rotate");
        document.getElementById("moon_planet_2").classList.add("bg-planet-3");
    }
    else
    {
        document.getElementById("moon_planet_2").classList.remove("bg-planet-3-non-rotate-right-bottom");
        document.getElementById("moon_planet_2").classList.add("bg-planet-3-right-bottom");
    }

    // Show small moon
    if (planets[index] != "mercury" && planets[index] != "moon" && planets[index] != "black-hole") document.getElementById("moon_planet").style.display = "block";
    else document.getElementById("moon_planet").style.display = "none";

    // Alien scenario
    if (planets[index] == "alien") 
    {
        currentPlanetLocationRotating = false;
        document.getElementById("moon_planet").style.display = "none";
        document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/ufo.png)";
        if (currentPlanetLocation == PlanetLocation.Centered)
        {
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3");
            document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate");
        }
        else
        {
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-right-bottom");
            document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate-right-bottom");
        }
    }

    // Moon scenario
    else if (planets[index] == "moon")
    {
        currentPlanetLocationRotating = false;
        document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/rocket.png)";
        if (currentPlanetLocation == PlanetLocation.Centered)
        {
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3");
            document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate");
        }
        else
        {
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-right-bottom");
            document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate-right-bottom");
        }
    }

    // Earth scenario
    else if (planets[index] == "earth")
    {
        currentPlanetLocationRotating = false;
        document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/satellite.png)";
        if (currentPlanetLocation == PlanetLocation.Centered)
        {
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3");
            document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate");
        }
        else
        {
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-right-bottom");
            document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate-right-bottom");
        }
    }

    // Other scenarios
    else document.getElementById("moon_planet").style.backgroundImage = "url(assets/img/planets/moon.png)";

    document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[index] + " 10%, rgba(0,0,0,1) 100%)";
    document.getElementById("main_planet").style.backgroundImage = "url(assets/img/planets/" + planets[index] + ".png)";
    document.getElementById("randomize_button").innerHTML = "change theme (currently " + planetsEnglish[index] + ")";
}

function randomizeIndex()
{
    if (pendingIndexChange) return;

    // Initial stuff
    var fadeSpeed = 1000;
    var transitionLength = 1200;
    randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
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
        clearInterval(starFlareInterval);
        starFlareInterval = setInterval(setStarFlarePosition, 8000);
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
    randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
    currentPlanetNumber = randomNumber;
    setBackground(randomNumber);
    clearInterval(starFlareInterval);
    starFlareInterval = setInterval(setStarFlarePosition, 8000);
}

function changeLocation()
{
    if (pendingIndexChange) return;

    // Initial stuff
    var fadeSpeed = 1000;
    var transitionLength = 1200;
    pendingIndexChange = true;
    setTimeout(function() {
        $("#background_elements").fadeIn(fadeSpeed);
        $("#page_transition_div").fadeOut(fadeSpeed);
        pendingIndexChange = false;
        clearInterval(starFlareInterval);
        starFlareInterval = setInterval(setStarFlarePosition, 8000);
    }, transitionLength);

    // Fade out everything
    $("#background_elements").fadeOut(fadeSpeed);
    $("#page_transition_div").fadeIn(fadeSpeed);
    if (currentPlanetLocation == PlanetLocation.Centered)
    {
        currentPlanetLocation = PlanetLocation.RightBottom;
        setTimeout(function() {
            document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
            document.getElementById("main_planet").classList.remove("bg-planet-1");
            document.getElementById("moon_planet").classList.remove("bg-planet-2");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-non-rotate");
            document.getElementById("main_planet").classList.add("bg-planet-1-right-bottom");
            document.getElementById("moon_planet").classList.add("bg-planet-2-right-bottom");
            if (!currentPlanetLocationRotating) document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate-right-bottom");
            else document.getElementById("moon_planet_2").classList.add("bg-planet-3-right-bottom");
        }, fadeSpeed);
    }
    else if (currentPlanetLocation == PlanetLocation.RightBottom)
    {
        currentPlanetLocation = PlanetLocation.Centered;
        setTimeout(function() {
            document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
            document.getElementById("main_planet").classList.remove("bg-planet-1-right-bottom");
            document.getElementById("moon_planet").classList.remove("bg-planet-2-right-bottom");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-right-bottom");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-non-rotate-right-bottom");
            document.getElementById("main_planet").classList.add("bg-planet-1");
            document.getElementById("moon_planet").classList.add("bg-planet-2");
            if (!currentPlanetLocationRotating) document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate");
            else document.getElementById("moon_planet_2").classList.add("bg-planet-3");
        }, fadeSpeed);
    }

}

function toggleSettings()
{
    if (!settings)
    {
        $("#randomize_button").fadeIn("slow");
        $("#change_location").fadeIn("slow");
        settings = true;
    }
    else
    {
        $("#randomize_button").fadeOut("slow");
        $("#change_location").fadeOut("slow");
        settings = false;
    }
}