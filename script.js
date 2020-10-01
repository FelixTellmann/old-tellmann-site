$(function () {
    var $navIcon = $("#nav-icon");
    var $nav = $("#nav");
    var acv = "active";
    var $navLink = $(".nav__link");
    var $logo = $(".logo");
    var $body = $('body');


    $navIcon.on('click', function () {
        $navIcon.toggleClass(acv);
        $nav.toggleClass(acv);
    });
    $nav.on('click', function () {
        $nav.removeClass(acv);
        $navIcon.removeClass(acv);
    });

    setTimeout(function () {
        $body.removeClass('loading');
    }, 200);

    $navLink.on('click', function () {
        $body.addClass('loading');
    });


    $(".wrapper").click(function () {
        $(".scroll").removeClass("scroll animated").removeAttr("style");
    });

    $(window).width() <= 979 && $(".scroll").removeClass("scroll animated").removeAttr("style");
    if ($(window).width() <= 580) {

        var $list = $(".service-card__list");
        var $icon = $(".service-card__icon");
        $icon.addClass("active");
        $icon.first().css("transform", "rotate(90deg)");
        $list.not($list[0]).removeClass("active");

        $('.services-page__offer').find('.service-card__heading').click(function (e) {
            console.log($(this));
            //Expand or collapse this panel
            $(this).next().slideToggle('fast');
            $(this).children().css("transform", "rotate(90deg)");


            //Hide the other panels
            $list.not($(this).next()).slideUp('fast');
            $icon.not($(this).children()).css("transform", "rotate(0deg)");

        });
    }
    /*Contact form - change state to active after textinput*/
    $('#contact-form input').blur(function () {
        if ($(this).val()) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
    $('#contact-form textarea').blur(function () {
        if ($(this).val()) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
});

$(function () {
    var e = $(this);

    var t = $("#back-top"), n = $("#back-top a");
    t.hide();

    $(window).scroll(function () {
        e.scrollTop() > 100 ? t.fadeIn() : t.fadeOut();
    });
    n.click(function () {
        return $("body,html").animate({scrollTop: 0}, 550, "swing");
    });

});


/*Contact Form Validation - Error Message in data-content*/
$("#contact-form").validate({
    showErrors: function (errorMap, errorList) {
        if (errorMap.name || errorMap.email || errorMap.message) {
            var $type = errorList[0].element.name;
            var $label = $('label[for="' + errorList[0].element.id + '"] > span');
            if (!$label.attr("data-original")) {
                var $content = $label.attr("data-content");
            }
            $label.attr("data-original", $content);
            $label.attr("data-content", $label.attr("data-original") + ' - ' + errorMap[$type]);
        } else {
            var $span = $('label[for="' + $("#contact-form").validate({
                    success: function (label) {
                        return label;
                    }
                }).currentElements[0].id + '"] > span');
            if ($span.attr("data-original")) {
                $span.attr("data-content", $span.attr("data-original"));
            }
        }
    }
});


$(function () {
    // Get the form.
    var $form = $('#contact-form');

    $("#contact-page__form__btn").on('click', function (e) {
        e.preventDefault();
        return false;
    });

    // Get the messages div.
    var $formFeedback = $('#contact-form__feedback');

    $form.submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        var $name = $("#contact-form__input--name").val();
        var $email = $("#contact-form__input--email").val();
        var $message = $("#contact-form__input--msg").val();

        if ($name == '' || $email == '' || $message == '') {


        } else {
            var $formData = $form.serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $formData
            }).done(function (response) {

                // Set the message text.
                $formFeedback.text(response);

                // Clear the form.
                $('#contact-form__input--name').val('');
                $('#contact-form__input--email').val('');
                $('#contact-form__input--msg').val('');
            }).fail(function (data) {
                // Set the message text.
                if (data.responseText !== '') {
                    $formFeedback.text(data.responseText);
                } else {
                    $formFeedback.text('Oops! An error occured and your message could not be sent.');
                }
            });
        }

    });

});

var PageTransitions = (function () {

    String.prototype.bool = function () {
        return (/^true$/i).test(this);
    };

    var startElement = 0,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        };

    function getTransitionPrefix() {
        var b = document.body || document.documentElement;
        var s = b.style;
        var p = 'animation';
        if (typeof s[p] == 'string')
            return 'animation';

        // Tests for vendor specific prop
        var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
            p = p.charAt(0).toUpperCase() + p.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof s[v[i] + p] == 'string')
                return v[i] + p;
        }
        return false;
    }

    animEndEventName = animEndEventNames[getTransitionPrefix()];

    function init() {
        each(".transition__section", function (e) {
            e.setAttribute('originalClassList', e.className);
        });

        each(".transition__wrapper", function (e) {
            e.setAttribute('current', 0);
            e.setAttribute('isAnimating', false);
            e.querySelectorAll(".transition__section")[startElement].classList.add('active');
        });
        //TODO add LINK HERE
        each(".transition__trigger", function (e) {
            e.addEventListener('click', function () {
                animate(this);
            });
        });
    }

    var each = function (query, callback) {
        return Array.prototype.slice.call(document.querySelectorAll(query), 0).map(callback);
    };
    function animate(block, callback) {
        var outClass = formatClass(block.getAttribute('transition-out')),
            inClass = formatClass(block.getAttribute('transition-in')),
            step = block.getAttribute('et-step');

        if (typeof(step) != "number") {
            step = 1;
        }

        if (block.classList.contains('transition__trigger')) {
            while (!block.classList.contains('transition__wrapper')) {
                block = block.parentNode;
            }
        }


        var current = parseInt(block.getAttribute('current'), 10),
            $pages = block.querySelectorAll('.transition__section'),
            pagesCount = $pages.length,
            endCurrPage = false,
            endNextPage = false;

        if (block.getAttribute('isAnimating') && block.getAttribute('isAnimating').bool()) {
            return false;
        }

        block.setAttribute('isAnimating', true);

        var $currPage = $pages[current];
        current = current + step * 1;
        if (current >= pagesCount) {
            current = 0;
        }

        block.setAttribute('current', current);

        var $nextPage = $pages[current];

        outClass.forEach(function (c) {
            $currPage.classList.add(c);
        });

        $currPage.addEventListener(animEndEventName, function handlecurr() {
            this.removeEventListener(animEndEventName, handlecurr);
            endCurrPage = true;
            if (endNextPage) {
                if (typeof(callback) == "function") {
                    callback(block, $nextPage, this);
                }
                onEndAnimation(this, $nextPage, block);
            }
        });

        inClass.forEach(function (c) {
            $nextPage.classList.add(c);
        });

        $nextPage.classList.add("active");


        $nextPage.addEventListener(animEndEventName, function handlenext() {
            $nextPage.removeEventListener(animEndEventName, handlenext);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, this, block);
            }
        });
    }

    function onEndAnimation($outpage, $inpage, block) {
        block.setAttribute('isAnimating', false);
        $outpage.className = $outpage.getAttribute('originalClassList');
        $inpage.className = $inpage.getAttribute('originalClassList') + ' active';
    }

    function formatClass(str) {
        var classes = str.split(" ");
        var output = [];
        for (var i = 0; i < classes.length; i++) {
            output.push("transition--" + classes[i]);
        }
        return output;
    }

    return {
        init: init,
        animate: animate
    };

})();

document.addEventListener('DOMContentLoaded', function () {
    PageTransitions.init();
});

(function() {
    var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    Util = (function() {
        function Util() {}

        Util.prototype.extend = function(custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value;
                }
            }
            return custom;
        };

        Util.prototype.isMobile = function(agent) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
        };

        Util.prototype.createEvent = function(event, bubble, cancel, detail) {
            var customEvent;
            if (bubble == null) {
                bubble = false;
            }
            if (cancel == null) {
                cancel = false;
            }
            if (detail == null) {
                detail = null;
            }
            if (document.createEvent != null) {
                customEvent = document.createEvent('CustomEvent');
                customEvent.initCustomEvent(event, bubble, cancel, detail);
            } else if (document.createEventObject != null) {
                customEvent = document.createEventObject();
                customEvent.eventType = event;
            } else {
                customEvent.eventName = event;
            }
            return customEvent;
        };

        Util.prototype.emitEvent = function(elem, event) {
            if (elem.dispatchEvent != null) {
                return elem.dispatchEvent(event);
            } else if (event in (elem != null)) {
                return elem[event]();
            } else if (("on" + event) in (elem != null)) {
                return elem["on" + event]();
            }
        };

        Util.prototype.addEvent = function(elem, event, fn) {
            if (elem.addEventListener != null) {
                return elem.addEventListener(event, fn, false);
            } else if (elem.attachEvent != null) {
                return elem.attachEvent("on" + event, fn);
            } else {
                return elem[event] = fn;
            }
        };

        Util.prototype.removeEvent = function(elem, event, fn) {
            if (elem.removeEventListener != null) {
                return elem.removeEventListener(event, fn, false);
            } else if (elem.detachEvent != null) {
                return elem.detachEvent("on" + event, fn);
            } else {
                return delete elem[event];
            }
        };

        Util.prototype.innerHeight = function() {
            if ('innerHeight' in window) {
                return window.innerHeight;
            } else {
                return document.documentElement.clientHeight;
            }
        };

        return Util;

    })();

    WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
            function WeakMap() {
                this.keys = [];
                this.values = [];
            }

            WeakMap.prototype.get = function(key) {
                var i, item, j, len, ref;
                ref = this.keys;
                for (i = j = 0, len = ref.length; j < len; i = ++j) {
                    item = ref[i];
                    if (item === key) {
                        return this.values[i];
                    }
                }
            };

            WeakMap.prototype.set = function(key, value) {
                var i, item, j, len, ref;
                ref = this.keys;
                for (i = j = 0, len = ref.length; j < len; i = ++j) {
                    item = ref[i];
                    if (item === key) {
                        this.values[i] = value;
                        return;
                    }
                }
                this.keys.push(key);
                return this.values.push(value);
            };

            return WeakMap;

        })());

    MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
            function MutationObserver() {
                if (typeof console !== "undefined" && console !== null) {
                    console.warn('MutationObserver is not supported by your browser.');
                }
                if (typeof console !== "undefined" && console !== null) {
                    console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
                }
            }

            MutationObserver.notSupported = true;

            MutationObserver.prototype.observe = function() {};

            return MutationObserver;

        })());

    getComputedStyle = this.getComputedStyle || function(el, pseudo) {
            this.getPropertyValue = function(prop) {
                var ref;
                if (prop === 'float') {
                    prop = 'styleFloat';
                }
                if (getComputedStyleRX.test(prop)) {
                    prop.replace(getComputedStyleRX, function(_, _char) {
                        return _char.toUpperCase();
                    });
                }
                return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
            };
            return this;
        };

    getComputedStyleRX = /(\-([a-z]){1})/g;

    this.WOW = (function() {
        WOW.prototype.defaults = {
            boxClass: 'scroll',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: null,
            scrollContainer: null
        };

        function WOW(options) {
            if (options == null) {
                options = {};
            }
            this.scrollCallback = bind(this.scrollCallback, this);
            this.scrollHandler = bind(this.scrollHandler, this);
            this.resetAnimation = bind(this.resetAnimation, this);
            this.start = bind(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(options, this.defaults);
            if (options.scrollContainer != null) {
                this.config.scrollContainer = document.querySelector(options.scrollContainer);
            }
            this.animationNameCache = new WeakMap();
            this.wowEvent = this.util().createEvent(this.config.boxClass);
        }

        WOW.prototype.init = function() {
            var ref;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                this.util().addEvent(document, 'DOMContentLoaded', this.start);
            }
            return this.finished = [];
        };

        WOW.prototype.start = function() {
            var box, j, len, ref;
            this.stopped = false;
            this.boxes = (function() {
                var j, len, ref, results;
                ref = this.element.querySelectorAll("." + this.config.boxClass);
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }).call(this);
            this.all = (function() {
                var j, len, ref, results;
                ref = this.boxes;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }).call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle();
                } else {
                    ref = this.boxes;
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        this.applyStyle(box, true);
                    }
                }
            }
            if (!this.disabled()) {
                this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
                this.util().addEvent(window, 'resize', this.scrollHandler);
                this.interval = setInterval(this.scrollCallback, 50);
            }
            if (this.config.live) {
                return new MutationObserver((function(_this) {
                    return function(records) {
                        var k, len1, node, record, results;
                        results = [];
                        for (k = 0, len1 = records.length; k < len1; k++) {
                            record = records[k];
                            results.push((function() {
                                var l, len2, ref1, results1;
                                ref1 = record.addedNodes || [];
                                results1 = [];
                                for (l = 0, len2 = ref1.length; l < len2; l++) {
                                    node = ref1[l];
                                    results1.push(this.doSync(node));
                                }
                                return results1;
                            }).call(_this));
                        }
                        return results;
                    };
                })(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        };

        WOW.prototype.stop = function() {
            this.stopped = true;
            this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
            this.util().removeEvent(window, 'resize', this.scrollHandler);
            if (this.interval != null) {
                return clearInterval(this.interval);
            }
        };

        WOW.prototype.sync = function(element) {
            if (MutationObserver.notSupported) {
                return this.doSync(this.element);
            }
        };

        WOW.prototype.doSync = function(element) {
            var box, j, len, ref, results;
            if (element == null) {
                element = this.element;
            }
            if (element.nodeType !== 1) {
                return;
            }
            element = element.parentNode || element;
            ref = element.querySelectorAll("." + this.config.boxClass);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                if (indexOf.call(this.all, box) < 0) {
                    this.boxes.push(box);
                    this.all.push(box);
                    if (this.stopped || this.disabled()) {
                        this.resetStyle();
                    } else {
                        this.applyStyle(box, true);
                    }
                    results.push(this.scrolled = true);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };

        WOW.prototype.show = function(box) {
            this.applyStyle(box);
            box.className = box.className + " " + this.config.animateClass;
            if (this.config.callback != null) {
                this.config.callback(box);
            }
            this.util().emitEvent(box, this.wowEvent);
            this.util().addEvent(box, 'animationend', this.resetAnimation);
            this.util().addEvent(box, 'oanimationend', this.resetAnimation);
            this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
            this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
            return box;
        };

        WOW.prototype.applyStyle = function(box, hidden) {
            var delay, duration, iteration;
            duration = box.getAttribute('data-scroll-duration');
            delay = box.getAttribute('data-scroll-delay');
            iteration = box.getAttribute('data-scroll-iteration');
            return this.animate((function(_this) {
                return function() {
                    return _this.customStyle(box, hidden, duration, delay, iteration);
                };
            })(this));
        };

        WOW.prototype.animate = (function() {
            if ('requestAnimationFrame' in window) {
                return function(callback) {
                    return window.requestAnimationFrame(callback);
                };
            } else {
                return function(callback) {
                    return callback();
                };
            }
        })();

        WOW.prototype.resetStyle = function() {
            var box, j, len, ref, results;
            ref = this.boxes;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                results.push(box.style.visibility = 'visible');
            }
            return results;
        };

        WOW.prototype.resetAnimation = function(event) {
            var target;
            if (event.type.toLowerCase().indexOf('animationend') >= 0) {
                target = event.target || event.srcElement;
                return target.className = target.className.replace(this.config.animateClass, '').trim();
            }
        };

        WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
            if (hidden) {
                this.cacheAnimationName(box);
            }
            box.style.visibility = hidden ? 'hidden' : 'visible';
            if (duration) {
                this.vendorSet(box.style, {
                    animationDuration: duration
                });
            }
            if (delay) {
                this.vendorSet(box.style, {
                    animationDelay: delay
                });
            }
            if (iteration) {
                this.vendorSet(box.style, {
                    animationIterationCount: iteration
                });
            }
            this.vendorSet(box.style, {
                animationName: hidden ? 'none' : this.cachedAnimationName(box)
            });
            return box;
        };

        WOW.prototype.vendors = ["moz", "webkit"];

        WOW.prototype.vendorSet = function(elem, properties) {
            var name, results, value, vendor;
            results = [];
            for (name in properties) {
                value = properties[name];
                elem["" + name] = value;
                results.push((function() {
                    var j, len, ref, results1;
                    ref = this.vendors;
                    results1 = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        vendor = ref[j];
                        results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
                    }
                    return results1;
                }).call(this));
            }
            return results;
        };

        WOW.prototype.vendorCSS = function(elem, property) {
            var j, len, ref, result, style, vendor;
            style = getComputedStyle(elem);
            result = style.getPropertyCSSValue(property);
            ref = this.vendors;
            for (j = 0, len = ref.length; j < len; j++) {
                vendor = ref[j];
                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
            }
            return result;
        };

        WOW.prototype.animationName = function(box) {
            var animationName, error;
            try {
                animationName = this.vendorCSS(box, 'animation-name').cssText;
            } catch (error) {
                animationName = getComputedStyle(box).getPropertyValue('animation-name');
            }
            if (animationName === 'none') {
                return '';
            } else {
                return animationName;
            }
        };

        WOW.prototype.cacheAnimationName = function(box) {
            return this.animationNameCache.set(box, this.animationName(box));
        };

        WOW.prototype.cachedAnimationName = function(box) {
            return this.animationNameCache.get(box);
        };

        WOW.prototype.scrollHandler = function() {
            return this.scrolled = true;
        };

        WOW.prototype.scrollCallback = function() {
            var box;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = (function() {
                    var j, len, ref, results;
                    ref = this.boxes;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        if (!(box)) {
                            continue;
                        }
                        if (this.isVisible(box)) {
                            this.show(box);
                            continue;
                        }
                        results.push(box);
                    }
                    return results;
                }).call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop();
                }
            }
        };

        WOW.prototype.offsetTop = function(element) {
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode;
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop;
            }
            return top;
        };

        WOW.prototype.isVisible = function(box) {
            var bottom, offset, top, viewBottom, viewTop;
            offset = box.getAttribute('data-scroll-offset') || this.config.offset;
            viewTop = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset;
            viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
            top = this.offsetTop(box);
            bottom = top + box.clientHeight;
            return top <= viewBottom && bottom >= viewTop;
        };

        WOW.prototype.util = function() {
            return this._util != null ? this._util : this._util = new Util();
        };

        WOW.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        };

        return WOW;

    })();

}).call(undefined);

new WOW().init();

/*
import '/online/000-Library/js/_section-transition.js';
import '/online/000-Library/js/_scroll-animations.js';
*/
