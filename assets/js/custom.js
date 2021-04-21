var THEMEMASCOT = {};

(function($) {
    "use strict";

    /* ---------------------------------------------------------------------- */
    /* -------------------------- Declare Variables ------------------------- */
    /* ---------------------------------------------------------------------- */
    var $document = $(document);
    var $document_body = $(document.body);
    var $window = $(window);
    var $html = $('html');
    var $body = $('body');
    var $wrapper = $('#wrapper');
    var $header = $('#header');
    var $footer = $('#footer');
    var $sections = $('section');
    var $portfolio_gallery = $(".gallery-isotope");
    var portfolio_filter = ".portfolio-filter a";
    var $portfolio_filter_first_child = $(".portfolio-filter a:eq(0)");
    var $portfolio_flex_slider = $(".portfolio-slider");

    /*-----areas added----*/
	$(window).width( function(){
          var win = $(this);
          if (win.width() > 514) { 

          $(".navbar-default").affix({
                offset: {
                    top: 51
                }
            });
			
			$(".slider").affix({
                offset: {
                    top: 51
                }
            });
			$(".container-fluid").affix({
                offset: {
                    top: 51
                }
            });
			$(".inner-header").affix({
                offset: {
                    top: 51
                }
            });
			$(".searchTest").affix({
                offset: {
                    top: 51
                }
            });

          }
		  
		  
        else
        {
            
        }
    });
    
    
    /*hero area js*/
        $('.single_tab_desc').hide();
        $('.single_tab_desc.active').fadeIn(1000);
        function heroContent(currentItem){
            $('.single_tab_desc').stop().hide();
            $('.'+currentItem).stop().fadeIn(1000);
        }
        $('.single_service_tab').on('click',function(){
            var activatingContent = $(this).data('target');
            var packagePrice = $(this).data('hk-price');
			var packageTerm = $(this).data('hk-term');
    
            heroContent(activatingContent);
            $(this).addClass('active');
            $('.single_service_tab').not(this).removeClass('active');
            $('.hk_pack_price').text(packagePrice);
			$('.hk_pack_term').text(packageTerm);
        });
        
        
        
     $('.home_slider').owlCarousel({
         loop:true,
         margin:0,
         nav:true,
         thumbs:false,
         thumbsPrerendered: true,
     	 autoplay:true,
         autoplayTimeout:8000, 
     	 dots: false,
         navText: [
           "<span class='fa fa-chevron-left'></span>",
           "<span class='fa fa-chevron-right'></span>"
           ],
         items: 1
     });   
        
        
        
	
    /*-----areas to here added----*/

    THEMEMASCOT.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (THEMEMASCOT.isMobile.Android() || THEMEMASCOT.isMobile.BlackBerry() || THEMEMASCOT.isMobile.iOS() || THEMEMASCOT.isMobile.Opera() || THEMEMASCOT.isMobile.Windows());
        }
    };

    THEMEMASCOT.isRTL = {
        check: function() {
            if( $( "html" ).attr("dir") == "rtl" ) {
                return true;
            } else {
                return false;
            }
        }
    };

    THEMEMASCOT.urlParameter = {
        get: function(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        }
    };


    

    THEMEMASCOT.initialize = {

        init: function() {
            THEMEMASCOT.initialize.TM_sliderRange();
            THEMEMASCOT.initialize.TM_loadBSParentModal();
            THEMEMASCOT.initialize.TM_platformDetect();
            THEMEMASCOT.initialize.TM_onLoadPopupPromoBox();
            THEMEMASCOT.initialize.TM_customDataAttributes();
            THEMEMASCOT.initialize.TM_parallaxBgInit();
            THEMEMASCOT.initialize.TM_resizeFullscreen();
            
            
            THEMEMASCOT.initialize.TM_fitVids();
            
            THEMEMASCOT.initialize.TM_equalHeightDivs();
        },
      
        /* ---------------------------------------------------------------------- */
        /* ----------------------------- slider range  -------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_sliderRange: function() {
            var $slider_range = $(".slider-range");
            if( $slider_range.length > 0 ) {
                $slider_range.each(function(){
                    var id = $(this).attr('id');
                    var target_id = $(this).data('target');
                    $( "#" + target_id ).slider({
                      range: "max",
                      min: 2001,
                      max: 2016,
                      value: 2010,
                      slide: function( event, ui ) {
                        $( "#" + id ).val( ui.value );
                      }
                    });
                    $( "#" + id ).val( $( "#" + target_id ).slider( "value" ) );
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------ Bootstrap Parent Modal  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_loadBSParentModal: function() {
            var ajaxLoadContent = false;
            if( ajaxLoadContent ) {
                $.ajax({
                    url: "ajax-load/bootstrap-parent-modal.html",
                    success: function (data) { $body.append(data); },
                    dataType: 'html'
                });
            }
        },
        

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Preloader  ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_preLoaderClickDisable: function() {
            var $preloader = $('#preloader');
            $preloader.children('#disable-preloader').on('click', function(e) {
                $preloader.fadeOut();
                return false;
            });
        },

        TM_preLoaderOnLoad: function() {
            var $preloader = $('#preloader');
            if( $preloader.length > 0 ) {
                $preloader.delay(200).fadeOut('slow');
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------------- Platform detect  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_platformDetect: function() {
            if (THEMEMASCOT.isMobile.any()) {
                $html.addClass("mobile");
            } else {
                $html.addClass("no-mobile");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Popup Promo Box  ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_onLoadPopupPromoBox: function() {
            var $modal = $('.on-pageload-popup-promobox');
            if( $modal.length > 0 ) {
                $modal.each( function(){
                    var $current_item       = $(this);
                    var target              = $current_item.data('target');
                    var timeout             = $current_item.data('timeout');

                    var delay               = $current_item.data('delay');
                    delay = ( !delay ) ? 2500 : Number(delay) + 2500;

                    if( $current_item.hasClass('cookie-enabled') ) {
                        var elementCookie = $.cookie( target );
                        if ( !!elementCookie && elementCookie == 'enabled' ){
                            return true;
                        }
                    } else {
                        $.removeCookie( target );
                    }

                    var t_enablepopup = setTimeout(function() {
                        $.magnificPopup.open({
                            items: { src: target },
                            type: 'inline',
                            mainClass: 'mfp-no-margins mfp-fade',
                            closeBtnInside: false,
                            fixedContentPos: true,
                            removalDelay: 500,
                            callbacks: {
                                afterClose: function() {
                                    if( $current_item.hasClass('cookie-enabled') ) {
                                        $.cookie( target, 'enabled' );
                                    }
                                }
                            }
                        }, 0);
                    }, Number(delay) );

                    if( timeout !== '' ) {
                        var t_closepopup = setTimeout(function() {
                            $.magnificPopup.close();
                        }, Number(delay) + Number(timeout) );
                    }
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Hash Forwarding  ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_hashForwarding: function() {
            if (window.location.hash) {
                var hash_offset = $(window.location.hash).offset().top;
                $("html, body").animate({
                    scrollTop: hash_offset
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------- Background image, color ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_customDataAttributes: function() {
            $('[data-bg-color]').each(function() {
                $(this).css("cssText", "background: " + $(this).data("bg-color") + " !important;");
            });
            $('[data-bg-img]').each(function() {
                $(this).css('background-image', 'url(' + $(this).data("bg-img") + ')');
            });
            $('[data-text-color]').each(function() {
                $(this).css('color', $(this).data("text-color"));
            });
            $('[data-font-size]').each(function() {
                $(this).css('font-size', $(this).data("font-size"));
            });
            $('[data-height]').each(function() {
                $(this).css('height', $(this).data("height"));
            });
            $('[data-border]').each(function() {
                $(this).css('border', $(this).data("border"));
            });
            $('[data-margin-top]').each(function() {
                $(this).css('margin-top', $(this).data("margin-top"));
            });
            $('[data-margin-right]').each(function() {
                $(this).css('margin-right', $(this).data("margin-right"));
            });
            $('[data-margin-bottom]').each(function() {
                $(this).css('margin-bottom', $(this).data("margin-bottom"));
            });
            $('[data-margin-left]').each(function() {
                $(this).css('margin-left', $(this).data("margin-left"));
            });
        },



        /* ---------------------------------------------------------------------- */
        /* -------------------------- Background Parallax ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_parallaxBgInit: function() {
            if (!THEMEMASCOT.isMobile.any() && $window.width() >= 800 ) {
                $('.parallax').each(function() {
                    var data_parallax_ratio = ( $(this).data("parallax-ratio") === undefined ) ? '0.5': $(this).data("parallax-ratio");
                    $(this).parallax("50%", data_parallax_ratio);
                });
            } else {
                $('.parallax').addClass("mobile-parallax");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Home Resize Fullscreen ------------------- */
        /* ---------------------------------------------------------------------- */
        TM_resizeFullscreen: function() {
            var windowHeight = $window.height();
            $('.fullscreen, .revslider-fullscreen').height(windowHeight);
        },


        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Wow initialize  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_wow: function() {
            var wow = new WOW({
                mobile: false // trigger animations on mobile devices (default is true)
            });
            wow.init();
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Fit Vids ------------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_fitVids: function() {
            $body.fitVids();
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- equalHeights ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_equalHeightDivs: function() {
            /* equal heigh */
            var $equal_height = $('.equal-height');
            if( $equal_height.length > 0 ) {
                $equal_height.children('div').css('min-height', 'auto');
                $equal_height.equalHeights();
            }

            /* equal heigh inner div */
            var $equal_height_inner = $('.equal-height-inner');
            if( $equal_height_inner.length > 0 ) {
                $equal_height_inner.children('div').css('min-height', 'auto');
                $equal_height_inner.children('div').children('div').css('min-height', 'auto');
                $equal_height_inner.equalHeights();
                $equal_height_inner.children('div').each(function() {
                    $(this).children('div').css('min-height', $(this).css('min-height'));
                });
            }

            /* pricing-table equal heigh*/
            var $equal_height_pricing_table = $('.equal-height-pricing-table');
            if( $equal_height_pricing_table.length > 0 ) {
                $equal_height_pricing_table.children('div').css('min-height', 'auto');
                $equal_height_pricing_table.children('div').children('div').css('min-height', 'auto');
                $equal_height_pricing_table.equalHeights();
                $equal_height_pricing_table.children('div').each(function() {
                    $(this).children('div').css('min-height', $(this).css('min-height'));
                });
            }
        }

    };


    THEMEMASCOT.header = {

        init: function() {

            var t = setTimeout(function() {
                THEMEMASCOT.header.TM_fullscreenMenu();
                THEMEMASCOT.header.TM_sidePanelReveal();
                THEMEMASCOT.header.TM_scroolToTopOnClick();
                THEMEMASCOT.header.TM_scrollToFixed();
                THEMEMASCOT.header.TM_topnavAnimate();
                THEMEMASCOT.header.TM_scrolltoTarget();
                THEMEMASCOT.header.TM_menuzord();
                THEMEMASCOT.header.TM_navLocalScorll();
                THEMEMASCOT.header.TM_menuCollapseOnClick();
                THEMEMASCOT.header.TM_homeParallaxFadeEffect();
                THEMEMASCOT.header.TM_topsearch_toggle();
            }, 0);

        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------- menufullpage ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_fullscreenMenu: function() {
            var $menufullpage = $('.menu-full-page .fullpage-nav-toggle');
            if( $menufullpage.length > 0 ) {
                $menufullpage.menufullpage();
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------- Side Push Panel ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_sidePanelReveal: function() {
            $('.side-panel-trigger').on('click', function(e) {
                $body.toggleClass("side-panel-open");
                if ( THEMEMASCOT.isMobile.any() ) {
                    $body.toggleClass("overflow-hidden");
                }
                return false;
            });

            $('.has-side-panel .body-overlay').on('click', function(e) {
                $body.toggleClass("side-panel-open");
                return false;
            });

            //sitebar tree
            $('.side-panel-nav .nav .tree-toggler').on('click', function(e) {
                $(this).parent().children('ul.tree').toggle(300);
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- scrollToTop  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_scroolToTop: function() {
            if ($window.scrollTop() > 600) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        },

        TM_scroolToTopOnClick: function() {
            $document_body.on('click', '.scrollToTop', function(e) {
                $('html, body').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        },


        /* ---------------------------------------------------------------------------- */
        /* --------------------------- One Page Nav close on click -------------------- */
        /* ---------------------------------------------------------------------------- */
        TM_menuCollapseOnClick: function() {
            $document.on('click', '.onepage-nav a', function(e) {
                $('.showhide').trigger('click');
                return false;
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ----------- Active Menu Item on Reaching Different Sections ---------- */
        /* ---------------------------------------------------------------------- */
        TM_activateMenuItemOnReach: function() {
            var $onepage_nav = $('.onepage-nav');
            var cur_pos = $window.scrollTop() + 2;
            var nav_height = $onepage_nav.outerHeight();
            $sections.each(function() {
                var top = $(this).offset().top - nav_height - 80,
                    bottom = top + $(this).outerHeight();

                if (cur_pos >= top && cur_pos <= bottom) {
                    $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
                    $sections.removeClass('current').removeClass('active');

                    //$(this).addClass('current').addClass('active');
                    $onepage_nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('current').addClass('active');
                }
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------- on click scrool to target with smoothness -------- */
        /* ---------------------------------------------------------------------- */
        TM_scrolltoTarget: function() {
            //jQuery for page scrolling feature - requires jQuery Easing plugin
            $('.smooth-scroll-to-target, .fullscreen-onepage-nav a').on('click', function(e) {
                e.preventDefault();

                var $anchor = $(this);

                var $hearder_top = $('.header .header-nav');
                var hearder_top_offset = 0;
                if ($hearder_top[0]){
                    hearder_top_offset = $hearder_top.outerHeight(true);
                } else {
                    hearder_top_offset = 0;
                }

                //for vertical nav, offset 0
                if ($body.hasClass("vertical-nav")){
                    hearder_top_offset = 0;
                }

                var top = $($anchor.attr('href')).offset().top - hearder_top_offset;
                $('html, body').stop().animate({
                    scrollTop: top
                }, 1500, 'easeInOutExpo');

            });
        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------- Scroll navigation ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_navLocalScorll: function() {
            var data_offset = -60;
            var $local_scroll = $("#menuzord .menuzord-menu, #menuzord-right .menuzord-menu");
            if( $local_scroll.length > 0 ) {
                $local_scroll.localScroll({
                    target: "body",
                    duration: 800,
                    offset: data_offset,
                    easing: "easeInOutExpo"
                });
            }

            var $local_scroll_other = $("#menuzord-side-panel .menuzord-menu, #menuzord-verticalnav .menuzord-menu, #fullpage-nav");
            if( $local_scroll_other.length > 0 ) {
                $local_scroll_other.localScroll({
                    target: "body",
                    duration: 800,
                    offset: 0,
                    easing: "easeInOutExpo"
                });
            }
        },

        /* ---------------------------------------------------------------------------- */
        /* --------------------------- collapsed menu close on click ------------------ */
        /* ---------------------------------------------------------------------------- */
        TM_scrollToFixed: function() {
            $('.navbar-scrolltofixed').scrollToFixed();
            $('.scrolltofixed').scrollToFixed({
                marginTop: $('.header .header-nav').outerHeight(true) + 10,
                limit: function() {
                    var limit = $('#footer').offset().top - $(this).outerHeight(true);
                    return limit;
                }
            });
            $('#sidebar').scrollToFixed({
                marginTop: $('.header .header-nav').outerHeight() + 20,
                limit: function() {
                    var limit = $('#footer').offset().top - $('#sidebar').outerHeight() - 20;
                    return limit;
                }
            });
        },

        /* ----------------------------------------------------------------------------- */
        /* --------------------------- Menuzord - Responsive Megamenu ------------------ */
        /* ----------------------------------------------------------------------------- */
        TM_menuzord: function() {

            var $menuzord = $("#menuzord");
            if( $menuzord.length > 0 ) {
                $menuzord.menuzord({
                    align: "left",
                    effect: "slide",
                    animation: "none",
                    indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            var $menuzord_right = $("#menuzord-right");
            if( $menuzord_right.length > 0 ) {
                $menuzord_right.menuzord({
                    align: "right",
                    effect: "slide",
                    animation: "none",
                    indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            var $menuzord_side_panel = $("#menuzord-side-panel");
            if( $menuzord_side_panel.length > 0 ) {
                $menuzord_side_panel.menuzord({
                    align: "right",
                    effect: "slide",
                    animation: "none",
                    indicatorFirstLevel: "",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            var $menuzord_vertical_nav = $("#menuzord-verticalnav");
            if( $menuzord_vertical_nav.length > 0 ) {
                $menuzord_vertical_nav.menuzord({
                    align: "right",
                    effect: "slide",
                    animation: "none",
                    indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Waypoint Top Nav Sticky ------------------ */
        /* ---------------------------------------------------------------------- */
        TM_topnavAnimate: function() {
            if ($window.scrollTop() > (50)) {
                $(".navbar-sticky-animated").removeClass("animated-active");
            } else {
                $(".navbar-sticky-animated").addClass("animated-active");
            }

            if ($window.scrollTop() > (50)) {
                $(".navbar-sticky-animated .header-nav-wrapper .container, .navbar-sticky-animated .header-nav-wrapper .container-fluid").removeClass("add-padding");
            } else {
                $(".navbar-sticky-animated .header-nav-wrapper .container, .navbar-sticky-animated .header-nav-wrapper .container-fluid").addClass("add-padding");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------- home section on scroll parallax & fade -------------- */
        /* ---------------------------------------------------------------------- */
        TM_homeParallaxFadeEffect: function() {
            if ($window.width() >= 1200) {
                var scrolled = $window.scrollTop();
                $('.content-fade-effect .home-content .home-text').css('padding-top', (scrolled * 0.0610) + '%').css('opacity', 1 - (scrolled * 0.00120));
            }
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Top search toggle  ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_topsearch_toggle: function() {
            $document_body.on('click', '#top-search-toggle', function(e) {
                e.preventDefault();
                $('.search-form-wrapper.toggle').toggleClass('active');
                return false;
            });
        }

    };

    THEMEMASCOT.widget = {

        init: function() {

            var t = setTimeout(function() {
                THEMEMASCOT.widget.TM_shopClickEvents();
                THEMEMASCOT.widget.TM_masonryIsotop();
                THEMEMASCOT.widget.TM_progressBar();
                THEMEMASCOT.widget.TM_funfact();
                THEMEMASCOT.widget.TM_instagramFeed();
                THEMEMASCOT.widget.TM_accordion_toggles();
                THEMEMASCOT.widget.TM_tooltip();
                //THEMEMASCOT.widget.TM_countDownTimer();
            }, 0);

        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Shop Plus Minus ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_shopClickEvents: function() {
            $document_body.on('click', '.quantity .plus', function(e) {
                var currentVal = parseInt($(this).parent().children(".qty").val(), 10);
                if (!isNaN(currentVal)) {
                    $(this).parent().children(".qty").val(currentVal + 1);
                }
                return false;
            });

            $document_body.on('click', '.quantity .minus', function(e) {
                var currentVal = parseInt($(this).parent().children(".qty").val(), 10);
                if (!isNaN(currentVal) && currentVal > 0) {
                    $(this).parent().children(".qty").val(currentVal - 1);
                }
                return false;
            });

            $document_body.on('click', '#checkbox-ship-to-different-address', function(e) {
                $("#checkout-shipping-address").toggle(this.checked);
            });
        },


        
       
        

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Masonry Isotope ------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_masonryIsotop: function() {
            var isotope_mode;
            if ($portfolio_gallery.hasClass("masonry")){
                isotope_mode = "masonry";
            } else{
                isotope_mode = "fitRows";
            }

            //isotope firsttime loading
            if( $portfolio_gallery.length > 0 ) {
                $portfolio_gallery.imagesLoaded(function(){
                    $portfolio_gallery.isotope({
                        itemSelector: '.gallery-item',
                        layoutMode: isotope_mode,
                        filter: "*"
                    });
                });
            }

            //isotope filter
            $document_body.on('click', portfolio_filter, function(e) {
                $(portfolio_filter).removeClass("active");
                $(this).addClass("active");
                var fselector = $(this).data('filter');

                $portfolio_gallery.isotope({
                    itemSelector: '.gallery-item',
                    layoutMode: isotope_mode,
                    filter: fselector
                });
                return false;
            });


        },

        TM_portfolioFlexSliderGalleryPopUpInit: function() {
            var $flexSliders = $portfolio_gallery.find('.slides');
            if( $flexSliders.length > 0 ) {
                $flexSliders.each(function () {
                    var _items = $(this).find("li > a");
                    var items = [];
                    for (var i = 0; i < _items.length; i++) {
                        items.push({src: $(_items[i]).attr("href"), title: $(_items[i]).attr("title")});
                    }
                    $(this).parent().parent().parent().find(".icons-holder").magnificPopup({
                        items: items,
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    });
                });
            }
        },

        TM_isotopeGridRearrange: function() {
            var isotope_mode;
            if ($portfolio_gallery.hasClass("masonry")){
                isotope_mode = "masonry";
            } else{
                isotope_mode = "fitRows";
            }
            $portfolio_gallery.isotope({
                itemSelector: '.gallery-item',
                layoutMode: isotope_mode
            });
        },

        TM_isotopeGridShuffle: function() {
            $portfolio_gallery.isotope('shuffle');
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- CountDown ------------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_countDownTimer: function() {
            var $clock = $('#clock-count-down');
            var endingdate = $clock.data("endingdate");
            if( $clock.length > 0 ) {
                $clock.countdown(endingdate, function(event) {
                    var countdown_text = '' +
                        '<ul class="countdown-timer">' +
                        '<li>%D <span>Days</span></li>' +
                        '<li>%H <span>Hours</span></li>' +
                        '<li>%M <span>Minutes</span></li>' +
                        '<li>%S <span>Seconds</span></li>' +
                        '</ul>';
                    $(this).html(event.strftime(countdown_text));
                });
            }
        },


       

        /* ---------------------------------------------------------------------- */
        /* ------------------- progress bar / horizontal skill bar -------------- */
        /* ---------------------------------------------------------------------- */
        TM_progressBar: function() {
            var $progress_bar = $('.progress-bar');
            if( $progress_bar.length > 0 ) {
                $progress_bar.appear();
                $document_body.on('appear', '.progress-bar', function() {
                    var current_item = $(this);
                    if (!current_item.hasClass('appeared')) {
                        var percent = current_item.data('percent');
                        var barcolor = current_item.data('barcolor');
                        current_item.append('<span class="percent">' + percent + '%' + '</span>').css('background-color', barcolor).css('width', percent + '%').addClass('appeared');
                    }

                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------ Funfact Number Counter ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_funfact: function() {
            var $animate_number = $('.animate-number');
            if( $animate_number.length > 0 ) {
                $animate_number.appear();
                $document_body.on('appear', '.animate-number', function() {
                    $animate_number.each(function() {
                        var current_item = $(this);
                        if (!current_item.hasClass('appeared')) {
                            current_item.animateNumbers(current_item.attr("data-value"), true, parseInt(current_item.attr("data-animation-duration"), 10)).addClass('appeared');
                        }
                    });
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Instagram Feed ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_instagramFeed: function() {
            var $instagram_feed = $('.instagram-feed');
            if( $instagram_feed.length > 0 ) {
                $instagram_feed.each(function() {
                    var current_div = $(this);
                    var instagramFeed = new Instafeed({
                        target: current_div.attr('id'),
                        get: 'user',
                        userId: current_div.data('userid'),
                        accessToken: current_div.data('accesstoken'),
                        resolution: current_div.data('resolution'),
                        limit: current_div.data('limit'),
                        template: '<div class="item"><figure><img src="{{image}}" /><a href="{{link}}" class="link-out" target="_blank"><i class="fa fa-link"></i></a></figure></div>',
                        after: function() {
                        }
                    });
                    instagramFeed.run();
                });
            }

            var $instagram_feed_carousel = $('.instagram-feed-carousel');
            if( $instagram_feed_carousel.length > 0 ) {
                $instagram_feed_carousel.each(function() {
                    var current_div = $(this);
                    var instagramFeed = new Instafeed({
                        target: current_div.attr('id'),
                        get: 'user',
                        userId: current_div.data('userid'),
                        accessToken: current_div.data('accesstoken'),
                        resolution: current_div.data('resolution'),
                        limit: current_div.data('limit'),
                        template: '<div class="item"><figure><img src="{{image}}" /><a href="{{link}}" class="link-out" target="_blank"><i class="fa fa-link"></i></a></figure></div>',
                        after: function() {
                            current_div.owlCarousel({
                                rtl: THEMEMASCOT.isRTL.check(),
                                autoplay: true,
                                autoplayTimeout: 4000,
                                loop: true,
                                margin: 15,
                                dots: true,
                                nav: false,
                                responsive: {
                                    0: {
                                        items: 2
                                    },
                                    768: {
                                        items: 4
                                    },
                                    1000: {
                                        items: 5
                                    }
                                }
                            });
                        }
                    });
                    instagramFeed.run();
                });
            }
        },

       
        /* ---------------------------------------------------------------------- */
        /* ------------------------- accordion & toggles ------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_accordion_toggles: function() {
            var $panel_group_collapse = $('.panel-group .collapse');
            $panel_group_collapse.on("show.bs.collapse", function(e) {
                $(this).closest(".panel-group").find("[href='#" + $(this).attr("id") + "']").addClass("active");
            });
            $panel_group_collapse.on("hide.bs.collapse", function(e) {
                $(this).closest(".panel-group").find("[href='#" + $(this).attr("id") + "']").removeClass("active");
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- tooltip  ----------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_tooltip: function() {
            var $tooltip = $('[data-toggle="tooltip"]');
            if( $tooltip.length > 0 ) {
                $tooltip.tooltip();
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Twitter Feed  --------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_twittie: function() {
            var $twitter_feed = $('.twitter-feed');
            var $twitter_feed_carousel = $('.twitter-feed-carousel');

            if( $twitter_feed.length > 0 ) {
                $twitter_feed.twittie({
                    username: $twitter_feed.data('username'),
                    dateFormat: '%b. %d, %Y',
                    template: '{{tweet}} <div class="date">{{date}}</div>',
                    count: ( $twitter_feed.data("count") === undefined ) ? 4: $twitter_feed.data("count"),
                    loadingText: 'Loading!'
                });
            }

            if( $twitter_feed_carousel.length > 0 ) {
                $twitter_feed_carousel.twittie({
                    username: $twitter_feed_carousel.data('username'),
                    dateFormat: '%b. %d, %Y',
                    template: '{{tweet}} <div class="date">{{date}}</div>',
                    count: ( $twitter_feed_carousel.data("count") === undefined ) ? 4: $twitter_feed_carousel.data("count"),
                    loadingText: 'Loading!'
                }, function() {
                    $twitter_feed_carousel.find('ul').owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: true,
                        autoplayTimeout: 2000,
                        loop: true,
                        items: 1,
                        dots: true,
                        nav: false
                    });
                });
            }
        }
    };

    THEMEMASCOT.slider = {

        init: function() {

            var t = setTimeout(function() {
                THEMEMASCOT.slider.TM_typedAnimation();
                THEMEMASCOT.slider.TM_owlCarousel();
                THEMEMASCOT.slider.TM_maximageSlider();
                THEMEMASCOT.slider.TM_bxslider();
            }, 0);

        },


        /* ---------------------------------------------------------------------- */
        /* -------------------------- Typed Text Carousel  ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_typedAnimation: function() {
            var $typed_text_carousel = $('.typed-text-carousel');
            if ( $typed_text_carousel.length > 0 ) {
                $typed_text_carousel.each(function() {
                    var string_1 = $(this).find('span:first-child').text();
                    var string_2 = $(this).find('span:nth-child(2)').text();
                    var string_3 = $(this).find('span:nth-child(3)').text();
                    var str = '';
                    var $this = $(this);
                    if (!string_2.trim() || !string_3.trim()) {
                        str = [string_1];
                    }
                    if (!string_3.trim() && string_2.length) {
                        str = [string_1, string_2];
                    }
                    if (string_1.length && string_2.length && string_3.length) {
                        str = [string_1, string_2, string_3];
                    }
                    var speed = $(this).data('speed');
                    var back_delay = $(this).data('back_delay');
                    var loop = $(this).data('loop');
                    $(this).typed({
                        strings: str,
                        typeSpeed: speed,
                        backSpeed: 0,
                        backDelay: back_delay,
                        cursorChar: "|",
                        loop: loop,
                        contentType: 'text',
                        loopCount: false
                    });
                });
            }
        },


        
        /* ---------------------------------------------------------------------- */
        /* -------------------------------- Owl Carousel  ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_owlCarousel: function() {
            var $owl_carousel_1col = $('.owl-carousel-1col, .text-carousel, .image-carousel, .fullwidth-carousel');
            if ( $owl_carousel_1col.length > 0 ) {
                $owl_carousel_1col.each(function() {
                    var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                    var data_nav = ( $(this).data("nav") === undefined ) ? false: $(this).data("nav");
                    var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                    $(this).owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: true,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 1,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="pe-7s-angle-left"></i>',
                            '<i class="pe-7s-angle-right"></i>'
                        ]
                    });
                });
            }

            var $owl_carousel_2col = $('.owl-carousel-2col');
            if ( $owl_carousel_2col.length > 0 ) {
                $owl_carousel_2col.each(function() {
                    var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                    var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                    var data_duration = ( $(this).data("duration") === undefined ) ? 10000: $(this).data("duration");
                    $(this).owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: true,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 2,
                        margin: 15,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="pe-7s-angle-left"></i>',
                            '<i class="pe-7s-angle-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                center: false
                            },
                            480: {
                                items: 1,
                                center: false
                            },
                            600: {
                                items: 1,
                                center: false
                            },
                            750: {
                                items: 2,
                                center: false
                            },
                            960: {
                                items: 2
                            },
                            1170: {
                                items: 2
                            },
                            1300: {
                                items: 2
                            }
                        }
                    });
                });
            }

            var $owl_carousel_3col = $('.owl-carousel-3col');
            if ( $owl_carousel_3col.length > 0 ) {
                $owl_carousel_3col.each(function() {
                    var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                    var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                    var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                    $(this).owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: true,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 3,
                        margin: 15,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="pe-7s-angle-left"></i>',
                            '<i class="pe-7s-angle-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                center: false
                            },
                            480: {
                                items: 1,
                                center: false
                            },
                            600: {
                                items: 1,
                                center: false
                            },
                            750: {
                                items: 2,
                                center: false
                            },
                            960: {
                                items: 2
                            },
                            1170: {
                                items: 3
                            },
                            1300: {
                                items: 3
                            }
                        }
                    });
                });
            }

            var $owl_carousel_4col = $('.owl-carousel-4col');
            if ( $owl_carousel_4col.length > 0 ) {
                $owl_carousel_4col.each(function() {
                    var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                    var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                    var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                    $(this).owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: true,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 4,
                        margin: 15,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="pe-7s-angle-left"></i>',
                            '<i class="pe-7s-angle-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                center: true
                            },
                            480: {
                                items: 1,
                                center: false
                            },
                            600: {
                                items: 3,
                                center: false
                            },
                            750: {
                                items: 3,
                                center: false
                            },
                            960: {
                                items: 3
                            },
                            1170: {
                                items: 4
                            },
                            1300: {
                                items: 4
                            }
                        }
                    });
                });
            }

            var $owl_carousel_5col = $('.owl-carousel-5col');
            if ( $owl_carousel_5col.length > 0 ) {
                $owl_carousel_5col.each(function() {
                    var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                    var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                    var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                    $(this).owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: true,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 5,
                        margin: 15,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="pe-7s-angle-left"></i>',
                            '<i class="pe-7s-angle-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                center: false
                            },
                            480: {
                                items: 1,
                                center: false
                            },
                            600: {
                                items: 2,
                                center: false
                            },
                            750: {
                                items: 3,
                                center: false
                            },
                            960: {
                                items: 4
                            },
                            1170: {
                                items: 5
                            },
                            1300: {
                                items: 5
                            }
                        }
                    });
                });
            }

            var $owl_carousel_6col = $('.owl-carousel-6col');
            if ( $owl_carousel_6col.length > 0 ) {
                $owl_carousel_6col.each(function() {
                    var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                    var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                    var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                    var data_autoplay = ( $(this).data("autoplay") === undefined ) ? true: $(this).data("autoplay");
                    $(this).owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 6,
                        margin: 15,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="pe-7s-angle-left"></i>',
                            '<i class="pe-7s-angle-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                center: false
                            },
                            480: {
                                items: 1,
                                center: false
                            },
                            600: {
                                items: 2,
                                center: false
                            },
                            750: {
                                items: 3,
                                center: false
                            },
                            960: {
                                items: 4
                            },
                            1170: {
                                items: 6
                            },
                            1300: {
                                items: 6
                            }
                        }
                    });
                });
            }

            var $owl_carousel_7col = $('.owl-carousel-7col');
            if ( $owl_carousel_7col.length > 0 ) {
                $owl_carousel_7col.each(function() {
                    var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                    var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                    var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                    $(this).owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: true,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 7,
                        margin: 15,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="pe-7s-angle-left"></i>',
                            '<i class="pe-7s-angle-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                center: false
                            },
                            600: {
                                items: 2,
                                center: false
                            },
                            750: {
                                items: 3,
                                center: false
                            },
                            960: {
                                items: 4
                            },
                            1170: {
                                items: 7
                            },
                            1300: {
                                items: 7
                            }
                        }
                    });
                });
            }

            var $owl_carousel_8col = $('.owl-carousel-8col');
            if ( $owl_carousel_8col.length > 0 ) {
                $owl_carousel_8col.each(function() {
                    var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                    var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                    var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                    $(this).owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: true,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 8,
                        margin: 15,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="pe-7s-angle-left"></i>',
                            '<i class="pe-7s-angle-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                center: false
                            },
                            600: {
                                items: 2,
                                center: false
                            },
                            750: {
                                items: 3,
                                center: false
                            },
                            960: {
                                items: 5
                            },
                            1170: {
                                items: 8
                            },
                            1300: {
                                items: 8
                            }
                        }
                    });
                });
            }

        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------------- BxSlider  ------------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_bxslider: function() {
            var $bxslider = $('.bxslider');
            if( $bxslider.length > 0 ) {
                $bxslider.bxSlider({
                    mode: 'vertical',
                    minSlides: ( $bxslider.data("count") === undefined ) ? 2: $bxslider.data("count"),
                    slideMargin: 20,
                    pager: false,
                    prevText: '<i class="fa fa-angle-left"></i>',
                    nextText: '<i class="fa fa-angle-right"></i>'
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ---------- maximage Fullscreen Parallax Background Slider  ----------- */
        /* ---------------------------------------------------------------------- */
        TM_maximageSlider: function() {
            var $maximage_slider = $('#maximage');
            if( $maximage_slider.length > 0 ) {
                $maximage_slider.maximage({
                    cycleOptions: {
                        fx: 'fade',
                        speed: 1500,
                        prev: '.img-prev',
                        next: '.img-next'
                    }
                });
            }
        }
    };


    /* ---------------------------------------------------------------------- */
    /* ---------- document ready, window load, scroll and resize ------------ */
    /* ---------------------------------------------------------------------- */
    //document ready
    THEMEMASCOT.documentOnReady = {
        init: function() {
            THEMEMASCOT.initialize.init();
            THEMEMASCOT.header.init();
            THEMEMASCOT.slider.init();
            THEMEMASCOT.widget.init();
            THEMEMASCOT.windowOnscroll.init();
        }
    };

    //window on load
    THEMEMASCOT.windowOnLoad = {
        init: function() {
            var t = setTimeout(function() {
                THEMEMASCOT.initialize.TM_wow();
                THEMEMASCOT.widget.TM_twittie();
                THEMEMASCOT.initialize.TM_preLoaderOnLoad();
                THEMEMASCOT.initialize.TM_hashForwarding();
                THEMEMASCOT.initialize.TM_parallaxBgInit();
            }, 0);
            $window.trigger("scroll");
            $window.trigger("resize");
        }
    };

    //window on scroll
    THEMEMASCOT.windowOnscroll = {
        init: function() {
            $window.on( 'scroll', function(){
                THEMEMASCOT.header.TM_scroolToTop();
                THEMEMASCOT.header.TM_activateMenuItemOnReach();
                THEMEMASCOT.header.TM_topnavAnimate();
            });
        }
    };

    //window on resize
    THEMEMASCOT.windowOnResize = {
        init: function() {
            var t = setTimeout(function() {
                THEMEMASCOT.initialize.TM_equalHeightDivs();
                THEMEMASCOT.initialize.TM_resizeFullscreen();
            }, 400);
        }
    };


    /* ---------------------------------------------------------------------- */
    /* ---------------------------- Call Functions -------------------------- */
    /* ---------------------------------------------------------------------- */
    $document.ready(
        THEMEMASCOT.documentOnReady.init
    );
    $window.on('load',
        THEMEMASCOT.windowOnLoad.init
    );
    $window.on('resize',
        THEMEMASCOT.windowOnResize.init
    );

    //call function before document ready
    THEMEMASCOT.initialize.TM_preLoaderClickDisable();

})(jQuery);
