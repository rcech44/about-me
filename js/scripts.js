/*!
* Start Bootstrap - One Page Wonder v6.0.6 (https://startbootstrap.com/theme/one-page-wonder)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-one-page-wonder/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

var scrolledUp = true;

function scrollHandle()
{
    if (window.scrollY == 0)
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
        return false;
    }
}

function setModal(type)
{
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