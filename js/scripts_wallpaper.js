const planets = ["earth", "jupiter", "neptune", "mercury", "mars", "black-hole", "alien", "uranus", "exoplanet_1", "exoplanet_2", "moon", "sun", "venus", "saturn", "cookie"];
const planetsCzech = ["Země", "Jupiter", "Neptun", "Merkur", "Mars", "Černá díra", "Mimozemšťané", "Uran", "Exoplaneta 1", "Exoplanet 2", "Moon", "Slunce", "Venuše", "Saturn", "Cookie"];
const planetsEnglish = ["Earth", "Jupiter", "Neptune", "Mercury", "Mars", "Black Hole", "Aliens", "Uranus", "Exoplanet 1", "Exoplanet 2", "Moon", "Solar system", "Venus", "Saturn", "Cookie"];
const planetColors = ["rgba(0,54,181,1)", "rgba(184, 106, 70, 1)", "rgba(9, 127, 181, 1)", "rgba(84, 104, 133, 1)", "rgba(181, 92, 60, 1)", "rgba(83, 71, 173, 1)", "rgba(40, 168, 74, 1)", "rgba(62, 102, 171, 1)", "rgba(129, 69, 168, 1)", "rgba(194, 146, 114, 1)", "rgba(135, 135, 135, 1)", "rgba(153, 112, 49, 1)", "rgba(153, 41, 34, 1)", "rgba(166, 141, 88, 1)", "rgba(125, 75, 44, 1)"];
const PlanetLocation = {
    Centered: 'center',
    RightBottom: 'right bottom'
};
const BrightnessOptions = {
    0: {'value': 0, 'text': 'Animated Bright', 'animationName': 'background-opacity-animated-bright'},
    1: {'value': 1, 'text': 'Bright', 'animationName': 'background-opacity-bright'},
    2: {'value': 2, 'text': 'Animated Dark', 'animationName': 'background-opacity-animated-dark'},
    3: {'value': 3, 'text': 'Dark', 'animationName': 'background-opacity-dark'},
    4: {'value': 4, 'text': 'Shining', 'animationName': 'background-opacity-extra-dark'},
    5: {'value': 5, 'text': 'Black', 'animationName': 'background-opacity-black'}

};
const BrightnessOptionsLength = 6;

var firstLaunch = false;
var pendingIndexChange = false;
var currentPlanetNumber = 0;
var randomNumber = 0;
var settings = false;
var fallingStars = true;
var rotatingObjects = true;
var showMoon1 = true;
var showMoon2 = true;
var currentPlanetLocation = PlanetLocation.Centered;
var currentPlanetLocationRotating = false;
var currentBrightness = BrightnessOptions[0];
var currentShininess = "100%";

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
    localStorage.setItem('wallpaperTheme', index);
    document.getElementById("hidden_text").style.display = "none";
    document.getElementById("solar_system_planet_1").style.display = "none";
    document.getElementById("solar_system_planet_2").style.display = "none";
    document.getElementById("solar_system_planet_3").style.display = "none";
    document.getElementById("solar_system_planet_4").style.display = "none";
    document.getElementById("solar_system_planet_5").style.display = "none";
    document.getElementById("solar_system_planet_6").style.display = "none";
    document.getElementById("solar_system_planet_7").style.display = "none";
    document.getElementById("solar_system_planet_8").style.display = "none";
    showMoon1 = true;
    showMoon2 = true;
    if (rotatingObjects) document.getElementById("moon_planet").style.display = "block";
    if (rotatingObjects) document.getElementById("moon_planet_2").style.display = "block";
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
    if (planets[index] != "mercury" && planets[index] != "moon" && planets[index] != "black-hole" && planets[index] != "venus")
    {
        showMoon1 = true;
        if (rotatingObjects) document.getElementById("moon_planet").style.display = "block";
    }
    else 
    {
        showMoon1 = false;
        document.getElementById("moon_planet").style.display = "none";
    }

    // Alien scenario
    if (planets[index] == "alien") 
    {
        currentPlanetLocationRotating = false;
        document.getElementById("moon_planet").style.display = "none";
        showMoon1 = false;
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

    // Cookie (oreo) scenario
    if (planets[index] == "cookie") 
    {
        currentPlanetLocationRotating = false;
        document.getElementById("moon_planet").style.display = "none";
        showMoon1 = false;
        document.getElementById("moon_planet_2").style.backgroundImage = "url(assets/img/milk.png)";
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
        document.getElementById("hidden_text").style.display = "block";
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

    // Solar system scenario
    else if (planets[index] == "sun")
    {
        showMoon1 = false;
        showMoon2 = false;
        document.getElementById("solar_system_planet_1").style.display = "block";
        document.getElementById("solar_system_planet_2").style.display = "block";
        document.getElementById("solar_system_planet_3").style.display = "block";
        document.getElementById("solar_system_planet_4").style.display = "block";
        document.getElementById("solar_system_planet_5").style.display = "block";
        document.getElementById("solar_system_planet_6").style.display = "block";
        document.getElementById("solar_system_planet_7").style.display = "block";
        document.getElementById("solar_system_planet_8").style.display = "block";
        document.getElementById("moon_planet").style.display = "none";
        document.getElementById("moon_planet_2").style.display = "none";
    }

    // Other scenarios
    else document.getElementById("moon_planet").style.backgroundImage = "url(assets/img/moon.png)";

    document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[index] + " 10%, rgba(0,0,0,1) 100%)";
    document.getElementById("main_planet").style.backgroundImage = "url(assets/img/planets/" + planets[index] + ".png)";
    document.getElementById("randomize_button").innerHTML = "theme: " + planetsEnglish[index];
    if (currentBrightness.text == "Shining") document.getElementById("main_planet").style.webkitFilter = "drop-shadow(0 0 130px " + planetColors[randomNumber] + ")";
    if (rotatingObjects == false)
    {
        document.getElementById("moon_planet").style.display = "none";
        document.getElementById("moon_planet_2").style.display = "none";
    }
}

function randomizeIndex(planet)
{
    if (pendingIndexChange) return;

    // Initial stuff
    var fadeSpeed = 1000;
    var transitionLength = 1200;
    if (planet == null)
    {
        randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
        while (randomNumber == currentPlanetNumber)
        {
            randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
        }
        currentPlanetNumber = randomNumber;
    }
    else 
    {
        currentPlanetNumber = planet;
        randomNumber = planet;
    }
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
    setBackground(randomNumber);
    clearInterval(starFlareInterval);
    starFlareInterval = setInterval(setStarFlarePosition, 8000);
}

function setLocation(startup)
{
    if (pendingIndexChange) return;

    // Initial stuff
    if (startup == null) var fadeSpeed = 1000;
    else var fadeSpeed = 0;
    var transitionLength = 1200;
    if (startup == null)
        setTimeout(function() {
            $("#background_elements").fadeIn(fadeSpeed);
            $("#page_transition_div").fadeOut(fadeSpeed);
            pendingIndexChange = false;
            clearInterval(starFlareInterval);
            starFlareInterval = setInterval(setStarFlarePosition, 8000);
        }, transitionLength);

    // Fade out everything
    if (startup == null) $("#background_elements").fadeOut(fadeSpeed);
    if (startup == null) $("#page_transition_div").fadeIn(fadeSpeed);
    if (currentPlanetLocation == PlanetLocation.RightBottom)
    {
        setTimeout(function() {
            document.getElementById("change_location").innerHTML = "position: corner";
            document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
            document.getElementById("main_planet").classList.remove("bg-planet-1");
            document.getElementById("moon_planet").classList.remove("bg-planet-2");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-non-rotate");
            document.getElementById("main_planet").classList.add("bg-planet-1-right-bottom");
            document.getElementById("moon_planet").classList.add("bg-planet-2-right-bottom");

            // Solar system scenario
            document.getElementById("solar_system_planet_1").classList.remove("solar-system-planet-1");
            document.getElementById("solar_system_planet_2").classList.remove("solar-system-planet-2");
            document.getElementById("solar_system_planet_3").classList.remove("solar-system-planet-3");
            document.getElementById("solar_system_planet_4").classList.remove("solar-system-planet-4");
            document.getElementById("solar_system_planet_5").classList.remove("solar-system-planet-5");
            document.getElementById("solar_system_planet_6").classList.remove("solar-system-planet-6");
            document.getElementById("solar_system_planet_7").classList.remove("solar-system-planet-7");
            document.getElementById("solar_system_planet_8").classList.remove("solar-system-planet-8");
            document.getElementById("solar_system_planet_1").classList.add("solar-system-planet-1-right-bottom");
            document.getElementById("solar_system_planet_2").classList.add("solar-system-planet-2-right-bottom");
            document.getElementById("solar_system_planet_3").classList.add("solar-system-planet-3-right-bottom");
            document.getElementById("solar_system_planet_4").classList.add("solar-system-planet-4-right-bottom");
            document.getElementById("solar_system_planet_5").classList.add("solar-system-planet-5-right-bottom");
            document.getElementById("solar_system_planet_6").classList.add("solar-system-planet-6-right-bottom");
            document.getElementById("solar_system_planet_7").classList.add("solar-system-planet-7-right-bottom");
            document.getElementById("solar_system_planet_8").classList.add("solar-system-planet-8-right-bottom");

            if (!currentPlanetLocationRotating) document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate-right-bottom");
            else document.getElementById("moon_planet_2").classList.add("bg-planet-3-right-bottom");
        }, fadeSpeed);
    }
    else if (currentPlanetLocation == PlanetLocation.Centered)
    {
        setTimeout(function() {
            document.getElementById("change_location").innerHTML = "position: center";
            document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
            document.getElementById("main_planet").classList.remove("bg-planet-1-right-bottom");
            document.getElementById("moon_planet").classList.remove("bg-planet-2-right-bottom");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-right-bottom");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-non-rotate-right-bottom");
            document.getElementById("main_planet").classList.add("bg-planet-1");
            document.getElementById("moon_planet").classList.add("bg-planet-2");

            // Solar system scenario
            document.getElementById("solar_system_planet_1").classList.remove("solar-system-planet-1-right-bottom");
            document.getElementById("solar_system_planet_2").classList.remove("solar-system-planet-2-right-bottom");
            document.getElementById("solar_system_planet_3").classList.remove("solar-system-planet-3-right-bottom");
            document.getElementById("solar_system_planet_4").classList.remove("solar-system-planet-4-right-bottom");
            document.getElementById("solar_system_planet_5").classList.remove("solar-system-planet-5-right-bottom");
            document.getElementById("solar_system_planet_6").classList.remove("solar-system-planet-6-right-bottom");
            document.getElementById("solar_system_planet_7").classList.remove("solar-system-planet-7-right-bottom");
            document.getElementById("solar_system_planet_8").classList.remove("solar-system-planet-8-right-bottom");
            document.getElementById("solar_system_planet_1").classList.add("solar-system-planet-1");
            document.getElementById("solar_system_planet_2").classList.add("solar-system-planet-2");
            document.getElementById("solar_system_planet_3").classList.add("solar-system-planet-3");
            document.getElementById("solar_system_planet_4").classList.add("solar-system-planet-4");
            document.getElementById("solar_system_planet_5").classList.add("solar-system-planet-5");
            document.getElementById("solar_system_planet_6").classList.add("solar-system-planet-6");
            document.getElementById("solar_system_planet_7").classList.add("solar-system-planet-7");
            document.getElementById("solar_system_planet_8").classList.add("solar-system-planet-8");

            if (!currentPlanetLocationRotating) document.getElementById("moon_planet_2").classList.add("bg-planet-3-non-rotate");
            else document.getElementById("moon_planet_2").classList.add("bg-planet-3");
        }, fadeSpeed);
    }
}

function changeLocationSwitch()
{
    if (currentPlanetLocation == PlanetLocation.Centered)
    {
        currentPlanetLocation = PlanetLocation.RightBottom;
        localStorage.setItem('wallpaperPosition', 'right bottom');
        setLocation();
    }
    else if (currentPlanetLocation == PlanetLocation.RightBottom)
    {
        currentPlanetLocation = PlanetLocation.Centered;
        localStorage.setItem('wallpaperPosition', 'centered');
        setLocation();
    }
}

function toggleSettings()
{
    if (!settings)
    {
        // $('#staticBackdrop').modal('show');
        $("#randomize_button").fadeIn("slow");
        $("#change_location").fadeIn("slow");
        $("#change_brightness").fadeIn("slow");
        $("#change_falling_stars").fadeIn("slow");
        $("#change_rotating_objects").fadeIn("slow");
        settings = true;
    }
    else
    {
        // $('#staticBackdrop').modal('hide');
        $("#randomize_button").fadeOut("slow");
        $("#change_location").fadeOut("slow");
        $("#change_brightness").fadeOut("slow");
        $("#change_falling_stars").fadeOut("slow");
        $("#change_rotating_objects").fadeOut("slow");
        settings = false;
    }
}

function setBrightness()
{
    document.getElementById("main_planet").style.removeProperty("filter");
    document.getElementById("solar_system_planet_1").style.removeProperty("filter");
    document.getElementById("solar_system_planet_2").style.removeProperty("filter");
    document.getElementById("solar_system_planet_3").style.removeProperty("filter");
    document.getElementById("solar_system_planet_4").style.removeProperty("filter");
    document.getElementById("solar_system_planet_5").style.removeProperty("filter");
    document.getElementById("solar_system_planet_6").style.removeProperty("filter");
    document.getElementById("solar_system_planet_7").style.removeProperty("filter");
    document.getElementById("solar_system_planet_8").style.removeProperty("filter");
    if (currentBrightness.text == "Shining")
    {
        document.getElementById("main_planet").style.setProperty("filter", "drop-shadow(0 0 130px " + planetColors[randomNumber] + ")");
        document.getElementById("solar_system_planet_1").style.setProperty("filter", "drop-shadow(0 0 10px rgba(130, 130, 130, 1))");
        document.getElementById("solar_system_planet_2").style.setProperty("filter", "drop-shadow(0 0 10px rgba(255, 220, 110, 1))");
        document.getElementById("solar_system_planet_3").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0,54,181,1))");
        document.getElementById("solar_system_planet_4").style.setProperty("filter", "drop-shadow(0 0 10px rgba(171, 54, 48, 1))");
        document.getElementById("solar_system_planet_5").style.setProperty("filter", "drop-shadow(0 0 10px rgba(184, 106, 70, 1))");
        document.getElementById("solar_system_planet_6").style.setProperty("filter", "drop-shadow(0 0 10px rgba(184, 106, 70, 1))");
        document.getElementById("solar_system_planet_7").style.setProperty("filter", "drop-shadow(0 0 10px rgba(62, 102, 171, 1))");
        document.getElementById("solar_system_planet_8").style.setProperty("filter", "drop-shadow(0 0 10px rgba(9, 127, 181, 1))");
    }
    else 
    {
        document.getElementById("main_planet").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
        document.getElementById("solar_system_planet_1").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
        document.getElementById("solar_system_planet_2").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
        document.getElementById("solar_system_planet_3").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
        document.getElementById("solar_system_planet_4").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
        document.getElementById("solar_system_planet_5").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
        document.getElementById("solar_system_planet_6").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
        document.getElementById("solar_system_planet_7").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
        document.getElementById("solar_system_planet_8").style.setProperty("filter", "drop-shadow(0 0 10px rgba(0, 0, 0, 0.295))");
    }
    document.getElementById("header").style.animation = currentBrightness.animationName + " 25s infinite normal";
    document.getElementById("change_brightness").innerHTML = "brightness: " + currentBrightness.text;
    localStorage.setItem('wallpaperBrightness', currentBrightness.value);
}

function changeBrightnessSwitch()
{
    if (currentBrightness.value == BrightnessOptionsLength - 1) currentBrightness = BrightnessOptions[0];
    else currentBrightness = BrightnessOptions[currentBrightness.value + 1];
    setBrightness()
}

function setFallingStars()
{
    if (fallingStars == true)
    {
        document.getElementById("background_falling_stars").style.display = "block";
        document.getElementById("change_falling_stars").innerHTML = "falling stars: on";
    }
    else
    {
        document.getElementById("background_falling_stars").style.display = "none";
        document.getElementById("change_falling_stars").innerHTML = "falling stars: off";
    }
}

function changeFallingStarsSwitch()
{
    if (fallingStars == true)
    {
        fallingStars = false;
        setFallingStars();
        localStorage.setItem('wallpaperFallingStars', false);
    }
    else
    {
        fallingStars = true;
        setFallingStars();
        localStorage.setItem('wallpaperFallingStars', true);
    }
}

function setRotatingObjects()
{
    if (rotatingObjects == true)
    {
        if (showMoon1) document.getElementById("moon_planet").style.display = "block";
        if (showMoon2) document.getElementById("moon_planet_2").style.display = "block";
        document.getElementById("change_rotating_objects").innerHTML = "rotating objects: on";
    }
    else
    {
        document.getElementById("moon_planet").style.display = "none";
        document.getElementById("moon_planet_2").style.display = "none";
        document.getElementById("change_rotating_objects").innerHTML = "rotating objects: off";
    }
}

function changeRotatingObjectsSwitch()
{
    if (rotatingObjects == true)
    {
        rotatingObjects = false;
        localStorage.setItem('wallpaperRotatingObjects', false);
        setRotatingObjects();
    }
    else
    {
        rotatingObjects = true;
        localStorage.setItem('wallpaperRotatingObjects', true);
        setRotatingObjects();
    }
}

function loadStartup()
{
    if ("wallpaperInitialized" in localStorage) 
    {
        currentPlanetNumber = localStorage.getItem('wallpaperTheme');
        randomNumber = localStorage.getItem('wallpaperTheme');
        fallingStars = (localStorage.getItem('wallpaperFallingStars') === 'true');
        rotatingObjects = (localStorage.getItem('wallpaperRotatingObjects') === 'true');
        if (localStorage.getItem('wallpaperPosition') == 'centered') currentPlanetLocation = PlanetLocation.Centered;
        else currentPlanetLocation = PlanetLocation.RightBottom;
        currentBrightness = BrightnessOptions[localStorage.getItem('wallpaperBrightness')];
    } 
    else 
    {
        localStorage.setItem('wallpaperInitialized', true);
        localStorage.setItem('wallpaperTheme', 0);
        localStorage.setItem('wallpaperPosition', 'centered');
        localStorage.setItem('wallpaperBrightness', 0);
        localStorage.setItem('wallpaperFallingStars', true);
        localStorage.setItem('wallpaperRotatingObjects', true);

        firstLaunch = true;
        currentPlanetNumber = 11;
        randomNumber = 11;
        fallingStars = true;
        rotatingObjects = true;
        currentPlanetLocation = PlanetLocation.Centered;
        currentBrightness = BrightnessOptions[0];
    }
    setLocation(true);
    setBrightness();
    setRotatingObjects();
    setFallingStars();
    randomizeIndexStartup();
}

function showToast()
{
    if (firstLaunch == true)
    {
        $("#test").toast("show");
    }
}