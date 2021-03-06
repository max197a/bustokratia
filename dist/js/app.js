$(document).ready(function() {
    //////////
    // Global variables
    //////////

    var _window = $(window);
    var _document = $(document);
    var easingSwing = [0.02, 0.01, 0.47, 1]; // default jQuery easing for anime.js
    var lastClickEl;

    ////////////
    // READY - triggered when PJAX DONE
    ////////////

    // single time initialization
    legacySupport();
    initaos();
    _window.on("resize", debounce(setBreakpoint, 200));

    // on transition change
    // getPaginationSections();
    // pagination();
    // _window.on("scroll", throttle(pagination, 50));
    // _window.on("resize", debounce(pagination, 250));

    function pageReady() {
        initMasks();
        initSelectric();
        initValidations();
        initSlider();
        initPopup();
        initQuantity();
        initZoom();
        initMasonry();
    }

    // this is a master function which should have all functionality
    pageReady();

    //////////
    // COMMON
    //////////

    function initaos() {
        AOS.init();
    }

    function legacySupport() {
        // svg support for laggy browsers
        svg4everybody();

        // Viewport units buggyfill
        window.viewportUnitsBuggyfill.init({
            force: false,
            refreshDebounceWait: 150,
            appendToBody: true
        });
    }

    // Prevent # behavior
    _document
        .on("click", '[href="#"]', function(e) {
            e.preventDefault();
        })
        .on("click", 'a[href^="#section"]', function(e) {
            // section scroll
            var el = $(this).attr("href");
            scrollToSection($(el));
            return false;
        })

    ///
    /// toggle class на странице карточки товара справа кнопка "Полное описание"

    .on("click", "[js-thumb-toggle]", function(e) {
        e.preventDefault();
        $("[js-thumb-toggle]").removeClass("is-active");
        $(this).toggleClass("is-active");
    })

    /// toggle class на странице карточки товара справа кнопка "Полное описание"
    ///

    ///
    /// toggle class на странице карточки товара справа кнопка "Полное описание"

    .on("click", "[js-show-full]", function(e) {
        e.preventDefault();
        $(this)
            .parent()
            .toggleClass("show-info");
    })

    /// toggle class на странице карточки товара справа кнопка "Полное описание"
    ///

    ///
    /// toggle class на странице карточки товара выбор цвета

    .on("click", "[js-choose-color]", function(e) {
        e.preventDefault();
        $("[js-choose-color]").removeClass("is-active");
        $(this).toggleClass("is-active");
    })

    /// toggle class на странице карточки товара выбор цвета
    ///

    ///
    /// toggle class на странице карточки товара выбор цвета

    .on("click", "[js-choose-shop]", function(e) {
        e.preventDefault();
        $("[js-choose-shop]").removeClass("is-active");
        $(this).toggleClass("is-active");
    })

    /// toggle class на странице карточки товара выбор цвета
    ///

    ///
    /// можно удалять, для того  что бы показать цифры у иконок

    .on("click", "[js-show-points]", function(e) {
        e.preventDefault();
        $(this).toggleClass("show-points");
    })

    /// можно удалять, для того  что бы показать цифры у иконок
    ///

    ///
    /// активная иконка в таблице на странице размеры

    .on("click", ".sizes__table td", function(e) {
        e.preventDefault();
        $(this).toggleClass("is-active");
    })

    /// активная иконка в таблице на странице размеры
    ///

    ///
    /// на странице Personal клик по чекбоксу что бы выбрать другой город

    .on("click", "[js-checkbox]", function(e) {
        e.preventDefault();
        $("[js-checkbox-label]").click();
    })

    /// на странице Personal клик по чекбоксу что бы выбрать другой город
    ///

    ///
    /// табы

    .on("click", "[js-top-button]", function(e) {
        e.preventDefault();
        var $self = $(this),
            tabIndex = $self.index();
        $self.siblings().removeClass("is-active");
        $self.addClass("is-active");
        // $(".top10__tab").removeClass("is-active");
        $(".top10__tab")
            .removeClass("is-active")
            .css("display", "none")
            .eq(tabIndex)
            .fadeIn();
    })

    /// табы
    ///

    ///
    /// табы на странице ORDERS + CARD

    .on("click", "[js-order-btn]", function(e) {
        e.preventDefault();
        var $self = $(this),
            tabIndex = $self.index();
        $self.siblings().removeClass("is-active");
        $self.addClass("is-active");
        // $(".top10__tab").removeClass("is-active");
        $(".orders__tab")
            .removeClass("is-active")
            .css("display", "none")
            .eq(tabIndex)
            .fadeIn();
    })

    /// табы на странице ORDERS + CARD
    ///

    ///
    /// табы на странице CARD внизу страницы

    .on("click", "[js-order-btn2]", function(e) {
        e.preventDefault();
        var $self = $(this),
            tabIndex = $self.index();
        $self.siblings().removeClass("is-active");
        $self.addClass("is-active");
        // $(".top10__tab").removeClass("is-active");
        $(".card-bottom__tab")
            .removeClass("is-active")
            .css("display", "none")
            .eq(tabIndex)
            .fadeIn();
    })

    /// табы на странице CARD внизу страницы
    ///

    ///
    /// табы в хедере (РАЗМЕРЫ)

    .on("click", "[js-head-tab]", function(e) {
        e.preventDefault();
        var $self = $(this),
            tabIndex = $self.index();
        $self.siblings().removeClass("is-active");
        $self.addClass("is-active");
        // $(".top10__tab").removeClass("is-active");
        $(".header__sizes-tab")
            .removeClass("is-active")
            .css("display", "none")
            .eq(tabIndex)
            .fadeIn();
    })

    .on("click", "[js-open-sizes]", function(e) {
        e.preventDefault();
        $(".header__busts").removeClass("is-open");
        $(".header__sizes").toggleClass("is-open");
    })

    .on("click", "[js-close-sizes]", function(e) {
        e.preventDefault();
        $(".header__sizes").removeClass("is-open");
    })

    /// табы в хедере (РАЗМЕРЫ)
    ///

    ///
    /// клики в хедере (БЮСТГАЛЬТЕРЫ)

    .on("click", "[js-open-sub-menu]", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(".header__sizes").removeClass("is-open");
        $(this).next().toggleClass("is-open");
    })

    .on("click", "[js-close-busts]", function(e) {
        e.preventDefault();
        $(".header__busts").removeClass("is-open");
    })

    .on("click", "[js-busts-types]", function(e) {
        e.preventDefault();
        var $self = $(this),
            tabIndex = $self.index();
        $self.siblings().removeClass("is-hidden");
        $self.addClass("is-hidden");
        // $(".top10__tab").removeClass("is-active");
        $(".header__busts-block")
            .removeClass("is-active")
            .eq(tabIndex)
            .addClass("is-active");
    })

    // .on("click", "[js-open-brands]", function(e) {
    //   e.preventDefault();
    //   $(".header-brands").removeClass("is-open");
    //   $(".header-brands").addClass("is-open");
    // })

    // .on("click", "[js-open-types]", function(e) {
    //   e.preventDefault();
    //   $(".header-brands").removeClass("is-open");
    //   $(".header-types").addClass("is-open");
    // })

    /// клики в хедере (БЮСТГАЛЬТЕРЫ)
    ///

    ///
    /// открытие элемента фильтра на странице CATALOG LIST

    .on("click", "[js-open-filter]", function(e) {
        e.preventDefault();
        $(this)
            .parent()
            .toggleClass("is-active");
        $(this).toggleClass("is-active");
    })

    /// открытие элемента фильтра на странице CATALOG LIST
    ///

    ///
    /// выбор элемента фильтра на странице CATALOG LIST

    .on("click", "[js-choose-filter]", function(e) {
        e.preventDefault();
        $(this).toggleClass("is-active");
    })

    /// выбор элемента фильтра на странице CATALOG LIST
    ///

    ///
    /// иконка like

    .on("click", "[js-like-item]", function(e) {
        e.preventDefault();
        $(this).toggleClass("is-active");
    })

    /// иконка like
    ///

    ///
    /// открытие поиска

    .on("click", "[js-open-search]", function(e) {
        e.preventDefault();
        $(this)
            .parent()
            .toggleClass("active");
        $(this).toggleClass("active");
    })

    /// открытие поиска
    ///

    ///
    /// открытие поиска

    .on("click", "[js-close-search]", function(e) {
        e.preventDefault();
        $(this)
            .parent()
            .removeClass("active");
        $(".search__btn").removeClass("active");
    });

    /// открытие поиска
    ///

    _document.on(
        "keyup",
        "[js-search-input]",
        debounce(function(e) {
            e.preventDefault();
            e.stopPropagation();

            // enter is reserved for selecting first child
            if (e.keyCode === 13) return;

            var postValue = $(this).val();
            var $sContainer = $(this).closest(".search__box");
            // var requestEndpoint = $sContainer.data("url");
            var $hintContainer = $sContainer.find(".search-site__hint");
            var $hintLoader = $sContainer.find(".search-site__loader");

            // 3 symbols are minimum
            // if (postValue.length >= 3) {
            //     $hintLoader.addClass("is-loading");
            // }

            if (postValue.length >= 3) {
                $hintLoader.addClass("is-loading");
            }

            setTimeout(function() {
                // 3 symbols are minimum
                if (postValue.length <= 2) {
                    $hintContainer.removeClass("is-active");
                    $hintLoader.removeClass("is-loading");
                    $hintLoader.removeClass("is-active");
                    return;
                } else {
                    $hintContainer.addClass("is-active");
                    $hintLoader.removeClass("is-loading");
                    $hintLoader.addClass("is-active");
                }
            }, 3000);
        })
    );

    _document
        .on("click", function(e) {
            if (!$(e.target).closest(".js-search").length > 0 ||
                !$(e.target).closest(".search-site__hint").length > 0
            ) {
                $(".search-site__hint").removeClass("is-active");
                $(".search-site__loader").removeClass("is-active");
            }
        })

    ///
    /// удаление элемента фильтра на странице CATALOG LIST

    .on("click", "[js-remove-filter]", function(e) {
        e.preventDefault();
        $(this)
            .parent()
            .remove();
    });

    /// удаление элемента фильтра на странице CATALOG LIST
    ///

    ///
    /// +/- на странице shop card

    function initQuantity() {
        _document.ready(function() {
            $(".minus").click(function() {
                var $input = $(this)
                    .parent()
                    .find("input");
                var count = parseInt($input.val()) - 1;
                count = count < 1 ? 1 : count;
                $input.val(count);
                $input.change();
                return false;
            });
            $(".plus").click(function() {
                var $input = $(this)
                    .parent()
                    .find("input");
                $input.val(parseInt($input.val()) + 1);
                $input.change();
                return false;
            });
        });
    }

    /// +/- на странице shop card
    ///

    function scrollToSection(el) {
        var headerHeight = $(".header").height();
        var targetScroll = el.offset().top - headerHeight;

        TweenLite.to(window, 1, {
            scrollTo: targetScroll,
            ease: easingSwing
        });
    }

    ////////////////////
    // MAGNIFIC POPUPS
    ////////////////////

    function initPopup() {

        $(document).magnificPopup({
            delegate: '[js-popup]',
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                change: function() {
                    // console.log("xzoom removed");
                    $(".xzoom-source").remove();
                },
                beforeOpen: function() {
                    // $(".xzoom-source").remove();
                    this.st.mainClass = this.st.el.attr("data-effect");
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        }); 

    }

    ////////////////////
    // SLIDERS
    ////////////////////

    function personalInfoSliderInit() {
        if ($(document).width() > 768) {
            if ($("[js-mobile-slider]").hasClass("slick-initialized"))
                $("[js-mobile-slider]").slick("unslick");
        } else {
            if (!$("[js-mobile-slider]").hasClass("slick-initialized")) {
                $("[js-mobile-slider]").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                });
            }
        }
    }

    personalInfoSliderInit();

    $(window).resize(function() {
        personalInfoSliderInit();
    });

    function initZoom() {
        $(document).ready(function() {
            $(".xzoom, .xzoom-gallery").xzoom({
                zoomWidth: 500,
                zoomHeight: 500,
                title: true,
                tint: "#333",
                Xoffset: 15
            });

            // $(".xzoom3, .xzoom-gallery").xzoom({
            //   position: "lens",
            //   lensShape: "circle",
            //   bg: true,
            //   sourceClass: "xzoom-hidden"
            // });

            //Integration with hammer.js
            var isTouchSupported = "ontouchstart" in window;

            if (isTouchSupported) {
                //If touch device
                $(".xzoom").each(function() {
                    var xzoom = $(this).data("xzoom");
                    xzoom.eventunbind();
                });
                // $(".xzoom, .xzoom3").each(function() {
                //   var xzoom = $(this).data("xzoom");
                //   xzoom.eventunbind();
                // });

                // $(".xzoom, .xzoom3").each(function() {
                $(".xzoom").each(function() {
                    var xzoom = $(this).data("xzoom");
                    $(this)
                        .hammer()
                        .on("tap", function(event) {
                            event.pageX = event.gesture.center.pageX;
                            event.pageY = event.gesture.center.pageY;
                            var s = 1,
                                ls;

                            xzoom.eventmove = function(element) {
                                element.hammer().on("drag", function(event) {
                                    event.pageX = event.gesture.center.pageX;
                                    event.pageY = event.gesture.center.pageY;
                                    xzoom.movezoom(event);
                                    event.gesture.preventDefault();
                                });
                            };

                            xzoom.eventleave = function(element) {
                                element.hammer().on("tap", function(event) {
                                    xzoom.closezoom();
                                });
                            };
                            xzoom.openzoom(event);
                        });
                });
            } else {}
        });
    }

    function initMasonry() {
        function resizeGridItem(item) {
            grid = document.getElementsByClassName("ar__grid")[0];
            rowHeight = parseInt(
                window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
            );
            rowGap = parseInt(
                window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
            );
            rowSpan = Math.ceil(
                (item.querySelector(".ar__content").getBoundingClientRect().height +
                    rowGap) /
                (rowHeight + rowGap)
            );
            item.style.gridRowEnd = "span " + rowSpan;
        }

        function resizeAllGridItems() {
            allItems = document.getElementsByClassName("ar__item");
            for (x = 0; x < allItems.length; x++) {
                resizeGridItem(allItems[x]);
            }
        }

        function resizeInstance(instance) {
            item = instance.elements[0];
            resizeGridItem(item);
        }

        window.onload = resizeAllGridItems();
        window.addEventListener("resize", resizeAllGridItems);
    }

    function initSlider() {
        $("[js-firstscreen-slider]").slick({
            dots: true,
            arrows: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 7000,
            pauseOnHover: false,
            pauseOnFocus: false,
            speed: 500
                // fade: true,
                // cssEase: "linear"
        });

        $("[js-card-slider]").slick({
            dots: false,
            arrows: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 788,
                settings: {
                    dots: true,
                    arrows: false
                }
            }]
        });

        $("[js-awards-slider]").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            loop: true,
            infinite: true,
            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 788,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });

        $("[js-articles-slider]").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            infinite: true,
            dots: false,
            responsive: [{
                    breakpoint: 1168,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }

    // HAMBURGER TOGGLER
    _document.on("click", "[js-hamburger]", function() {
        $(this).toggleClass("is-active");
        $("nav").toggleClass("is-open");
        $(".header__calc").toggleClass("is-open");
        $("body").toggleClass("is-fixed");
        $("html").toggleClass("is-fixed");
        $(".header__sizes").removeClass("is-open");
        $(".header__busts").removeClass("is-open");
    });

    // LOGIN BUTTON TOGGLER
    _document.on("click", "[js-enter-form]", function() {
        $(".header__enter").toggleClass("is-open");
    });

    ////////////////////
    // SHOW PASSWORD TOGGLE
    ////////////////////

    // Masked input
    function initMasks() {
        $("[js-dateMask]").mask("99.99.99", { placeholder: "ДД.ММ.ГГ" });
        $("input[type='tel']").mask("+7 (000) 000-00-00", {
            placeholder: "+7 (___) ___-__-__"
        });
    }

    // selectric
    function initSelectric() {
        $("select").selectric({
            maxHeight: 300,
            disableOnMobile: false,
            nativeOnMobile: false
        });
    }

    ////////////////
    // FORM VALIDATIONS
    ////////////////

    // jQuery validate plugin
    // https://jqueryvalidation.org
    function initValidations() {
        // GENERIC FUNCTIONS
        var validateErrorPlacement = function(error, element) {
            error.addClass("ui-input__validation");
            error.appendTo(element.parent("div"));
        };
        var validateHighlight = function(element) {
            $(element)
                .parent("div")
                .addClass("has-error");
        };
        var validateUnhighlight = function(element) {
            $(element)
                .parent("div")
                .removeClass("has-error");
        };
        var validateSubmitHandler = function(form) {
            $(form).addClass("loading");
            $.ajax({
                type: "POST",
                url: $(form).attr("action"),
                data: $(form).serialize(),
                success: function(response) {
                    $(form).removeClass("loading");
                    var data = $.parseJSON(response);
                    if (data.status == "success") {
                        $("[js-open-thank]").click();
                    } else {
                        $(form)
                            .find("[data-error]")
                            .html(data.message)
                            .show();
                    }
                }
            });
        };

        var validatePhone = {
            required: true,
            normalizer: function(value) {
                var PHONE_MASK = "(XXX) XXX-XXXX";
                if (!value || value === PHONE_MASK) {
                    return value;
                } else {
                    return value.replace(/[^\d]/g, "");
                }
            },
            minlength: 11,
            digits: true
        };

        ////////
        // FORMS

        /////////////////////
        // REGISTRATION FORM
        ////////////////////

        $(".js-validation").validate({
            errorPlacement: validateErrorPlacement,
            highlight: validateHighlight,
            unhighlight: validateUnhighlight,
            submitHandler: validateSubmitHandler,
            rules: {
                name: "required",
                phone: "required",
                mail: "required",
                mess: "required"
            },
            messages: {
                name: "Ошибка при заполнении",
                phone: "Ошибка при заполнении",
                mail: "Некорректный формат почты",
                mess: "Ошибка при заполнении"
            }
        });
    }

    // some plugins get bindings onNewPage only that way
    function triggerBody() {
        $(window).scroll();
        $(window).resize();
    }

    //////////
    // DEVELOPMENT HELPER
    //////////
    function setBreakpoint() {
        var wHost = window.location.host.toLowerCase();
        var displayCondition =
            wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0;
        if (displayCondition) {
            var wWidth = _window.width();

            var content = "<div class='dev-bp-debug'>" + wWidth + "</div>";

            $(".page").append(content);
            setTimeout(function() {
                $(".dev-bp-debug").fadeOut();
            }, 1000);
            setTimeout(function() {
                $(".dev-bp-debug").remove();
            }, 1500);
        }
    }
});