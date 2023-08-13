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
            $("#nav").stop().animate({backgroundColor: 'rgba(0,0,0,0.7)'}, 300);
        }
    }
}