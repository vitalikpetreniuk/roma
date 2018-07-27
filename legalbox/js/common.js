$(function() {

    $('.slider-partners').owlCarousel({
        items:7,
        margin: 60,
        loop:true,
        autoplay:true,
        autoplayTimeout:0,
        autoplaySpeed:3000,
        responsive:{
            0:{
                items:2,
                margin: 0
            },
            480:{
                items:3,
                margin: 10
            },
            640:{
                items:4
            },
            767:{
                items:5
            },
            991:{
                items:6
            },
            1179:{
                items:7
            }
        }
    });

    $('.video-slider').owlCarousel({
        margin: 32,
        responsive:{
            0:{
                items:1,
                nav: true
            },
            620:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    AOS.init();

    $('.parallax').scrolly();

    $('.menu-toggle').on('click', function () {
        $('.menu-block').addClass('active');
    });

    $('.menu-block-close').on('click', function () {
        $('.menu-block').removeClass('active');
    });

});