/* * RPZ - Efficient 404 Pages
 *
 * This is a premium product available exclusively at this address http://themeforest.net/user/madeon08/portfolio
 *
 * The demo files are minified/crypted for copyright reasons, you will find them, expanded, commented and coded accurately in your download pack.
 *
 * Thanks for your support!
 *
 * */
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function($) {
    function t(t, i) {
        return t.toFixed(i.decimals)
    }
    var i = function(t, s) {
        this.$element = $(t), this.options = $.extend({}, i.DEFAULTS, this.dataOptions(), s), this.init()
    };
    i.DEFAULTS = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: t,
        onUpdate: null,
        onComplete: null
    }, i.prototype.init = function() {
        this.value = this.options.from, this.loops = Math.ceil(this.options.speed / this.options.refreshInterval), this.loopCount = 0, this.increment = (this.options.to - this.options.from) / this.loops
    }, i.prototype.dataOptions = function() {
        var t = {
                from: this.$element.data("from"),
                to: this.$element.data("to"),
                speed: this.$element.data("speed"),
                refreshInterval: this.$element.data("refresh-interval"),
                decimals: this.$element.data("decimals")
            },
            i = Object.keys(t);
        for (var s in i) {
            var e = i[s];
            "undefined" == typeof t[e] && delete t[e]
        }
        return t
    }, i.prototype.update = function() {
        this.value += this.increment, this.loopCount++, this.render(), "function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value), this.loopCount >= this.loops && (clearInterval(this.interval), this.value = this.options.to, "function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value))
    }, i.prototype.render = function() {
        var t = this.options.formatter.call(this.$element, this.value, this.options);
        this.$element.text(t)
    }, i.prototype.restart = function() {
        this.stop(), this.init(), this.start()
    }, i.prototype.start = function() {
        this.stop(), this.render(), this.interval = setInterval(this.update.bind(this), this.options.refreshInterval)
    }, i.prototype.stop = function() {
        this.interval && clearInterval(this.interval)
    }, i.prototype.toggle = function() {
        this.interval ? this.stop() : this.start()
    }, $.fn.countTo = function(t) {
        return this.each(function() {
            var s = $(this),
                e = s.data("countTo"),
                n = !e || "object" == typeof t,
                o = "object" == typeof t ? t : {},
                a = "string" == typeof t ? t : "start";
            n && (e && e.stop(), s.data("countTo", e = new i(this, o))), e[a].call(e)
        })
    }
}), $(document).ready(function() {
        $("#contact-form [type='submit']").click(function(t) {
            t.preventDefault();
            var i = $("input[name=email-address]").val(),
                s = $("textarea[name=message]").val();
            post_data = {
                userEmail: i,
                userMessage: s
            }, $.post("php/contact-me.php", post_data, function(t) {
                "error" == t.type ? output = '<div class="error-message"><p>' + t.text + "</p></div>" : (output = '<div class="success-message"><p>' + t.text + "</p></div>", $("#contact-form input").val(""), $("#contact-form textarea").val("")), $("#answer").hide().html(output).fadeIn()
            }, "json")
        }), $("#contact-form input, #contact-form textarea").keyup(function() {
            $("#answer").fadeOut()
        })
    }), $(window).load(function() {
        $(".right-part").vegas({
            slides: [{
                src: $('.left-part').attr('data-slide1')
            }, {
                src: $('.left-part').attr('data-slide2')
            }],
            delay: 5e3,
            transition: "fade",
            animation: "kenburns"
        })
    }),
    function($) {
        "use strict";
        var t = {
                slide: 0,
                delay: 5e3,
                preload: !0,
                preloadImage: !0,
                preloadVideo: !1,
                timer: !1,
                overlay: !1,
                autoplay: !0,
                shuffle: !1,
                cover: !0,
                color: null,
                align: "center",
                valign: "center",
                transition: "fade",
                transitionDuration: 1e3,
                transitionRegister: [],
                animation: null,
                animationDuration: "auto",
                animationRegister: [],
                init: function() {},
                play: function() {},
                pause: function() {},
                walk: function() {},
                slides: []
            },
            i = {},
            s = function(i, s) {
                this.elmt = i, this.settings = $.extend({}, t, $.vegas.defaults, s), this.slide = this.settings.slide, this.total = this.settings.slides.length, this.noshow = this.total < 2, this.paused = !this.settings.autoplay || this.noshow, this.$elmt = $(i), this.$timer = null, this.$overlay = null, this.$slide = null, this.timeout = null, this.transitions = ["fade", "fade2", "blur", "blur2", "flash", "flash2", "negative", "negative2", "burn", "burn2", "slideLeft", "slideLeft2", "slideRight", "slideRight2", "slideUp", "slideUp2", "slideDown", "slideDown2", "zoomIn", "zoomIn2", "zoomOut", "zoomOut2", "swirlLeft", "swirlLeft2", "swirlRight", "swirlRight2"], this.animations = ["kenburns", "kenburnsLeft", "kenburnsRight", "kenburnsUp", "kenburnsUpLeft", "kenburnsUpRight", "kenburnsDown", "kenburnsDownLeft", "kenburnsDownRight"], this.settings.transitionRegister instanceof Array == !1 && (this.settings.transitionRegister = [this.settings.transitionRegister]), this.settings.animationRegister instanceof Array == !1 && (this.settings.animationRegister = [this.settings.animationRegister]), this.transitions = this.transitions.concat(this.settings.transitionRegister), this.animations = this.animations.concat(this.settings.animationRegister), this.support = {
                    objectFit: "objectFit" in document.body.style,
                    transition: "transition" in document.body.style || "WebkitTransition" in document.body.style,
                    video: $.vegas.isVideoCompatible()
                }, this.settings.shuffle === !0 && this.shuffle(), this._init()
            };
        s.prototype = {
            _init: function() {
                var t, i, s, e = "BODY" === this.elmt.tagName,
                    n = this.settings.timer,
                    o = this.settings.overlay,
                    a = this;
                this._preload(), e || (this.$elmt.css("height", this.$elmt.css("height")), t = $('<div class="vegas-wrapper">').css("overflow", this.$elmt.css("overflow")).css("padding", this.$elmt.css("padding")), this.$elmt.css("padding") || t.css("padding-top", this.$elmt.css("padding-top")).css("padding-bottom", this.$elmt.css("padding-bottom")).css("padding-left", this.$elmt.css("padding-left")).css("padding-right", this.$elmt.css("padding-right")), this.$elmt.clone(!0).children().appendTo(t), this.elmt.innerHTML = ""), n && this.support.transition && (s = $('<div class="vegas-timer"><div class="vegas-timer-progress">'), this.$timer = s, this.$elmt.prepend(s)), o && (i = $('<div class="vegas-overlay">'), "string" == typeof o && i.css("background-image", "url(" + o + ")"), this.$overlay = i, this.$elmt.prepend(i)), this.$elmt.addClass("vegas-container"), e || this.$elmt.append(t), setTimeout(function() {
                    a.trigger("init"), a._goto(a.slide), a.settings.autoplay && a.trigger("play")
                }, 1)
            },
            _preload: function() {
                var t, i, s;
                for (s = 0; s < this.settings.slides.length; s++)(this.settings.preload || this.settings.preloadImages) && this.settings.slides[s].src && (i = new Image, i.src = this.settings.slides[s].src), (this.settings.preload || this.settings.preloadVideos) && this.support.video && this.settings.slides[s].video && (t = this.settings.slides[s].video instanceof Array ? this._video(this.settings.slides[s].video) : this._video(this.settings.slides[s].video.src))
            },
            _random: function(t) {
                return t[Math.floor(Math.random() * (t.length - 1))]
            },
            _slideShow: function() {
                var t = this;
                this.total > 1 && !this.paused && !this.noshow && (this.timeout = setTimeout(function() {
                    t.next()
                }, this._options("delay")))
            },
            _timer: function(t) {
                var i = this;
                clearTimeout(this.timeout), this.$timer && (this.$timer.removeClass("vegas-timer-running").find("div").css("transition-duration", "0ms"), this.paused || this.noshow || t && setTimeout(function() {
                    i.$timer.addClass("vegas-timer-running").find("div").css("transition-duration", i._options("delay") - 100 + "ms")
                }, 100))
            },
            _video: function(t) {
                var s, e, n = t.toString();
                return i[n] ? i[n] : (t instanceof Array == !1 && (t = [t]), s = document.createElement("video"), s.preload = !0, t.forEach(function(t) {
                    e = document.createElement("source"), e.src = t, s.appendChild(e)
                }), i[n] = s, s)
            },
            _fadeOutSound: function(t, i) {
                var s = this,
                    e = i / 10,
                    n = t.volume - .09;
                n > 0 ? (t.volume = n, setTimeout(function() {
                    s._fadeOutSound(t, i)
                }, e)) : t.pause()
            },
            _fadeInSound: function(t, i) {
                var s = this,
                    e = i / 10,
                    n = t.volume + .09;
                1 > n && (t.volume = n, setTimeout(function() {
                    s._fadeInSound(t, i)
                }, e))
            },
            _options: function(t, i) {
                return void 0 === i && (i = this.slide), void 0 !== this.settings.slides[i][t] ? this.settings.slides[i][t] : this.settings[t]
            },
            _goto: function(t) {
                function i() {
                    p._timer(!0), setTimeout(function() {
                        v && (p.support.transition ? (o.css("transition", "all " + y + "ms").addClass("vegas-transition-" + v + "-out"), o.each(function() {
                            var t = o.find("video").get(0);
                            t && (t.volume = 1, p._fadeOutSound(t, y))
                        }), s.css("transition", "all " + y + "ms").addClass("vegas-transition-" + v + "-in")) : s.fadeIn(y));
                        for (var t = 0; t < o.length - 4; t++) o.eq(t).remove();
                        p.trigger("walk"), p._slideShow()
                    }, 100)
                }
                "undefined" == typeof this.settings.slides[t] && (t = 0), this.slide = t;
                var s, e, n, o = this.$elmt.children(".vegas-slide"),
                    a = this.settings.slides[t].src,
                    r = this.settings.slides[t].video,
                    l = this._options("delay"),
                    d = this._options("align"),
                    h = this._options("valign"),
                    c = this._options("color") || this.$elmt.css("background-color"),
                    u = this._options("cover") ? "cover" : "contain",
                    p = this,
                    m = o.length,
                    g, f, v = this._options("transition"),
                    y = this._options("transitionDuration"),
                    _ = this._options("animation"),
                    w = this._options("animationDuration");
                ("random" === v || v instanceof Array) && (v = v instanceof Array ? this._random(v) : this._random(this.transitions)), ("random" === _ || _ instanceof Array) && (_ = _ instanceof Array ? this._random(_) : this._random(this.animations)), ("auto" === y || y > l) && (y = l), "auto" === w && (w = l), s = $('<div class="vegas-slide"></div>'), this.support.transition && v && s.addClass("vegas-transition-" + v), this.support.video && r ? (g = r instanceof Array ? this._video(r) : this._video(r.src), g.loop = void 0 !== r.loop ? r.loop : !0, g.muted = void 0 !== r.mute ? r.mute : !0, g.muted === !1 ? (g.volume = 0, this._fadeInSound(g, y)) : g.pause(), n = $(g).addClass("vegas-video").css("background-color", c), this.support.objectFit ? n.css("object-position", d + " " + h).css("object-fit", u).css("width", "100%").css("height", "100%") : "contain" === u && n.css("width", "100%").css("height", "100%"), s.append(n)) : (f = new Image, e = $('<div class="vegas-slide-inner"></div>').css("background-image", "url(" + a + ")").css("background-color", c).css("background-position", d + " " + h).css("background-size", u), this.support.transition && _ && e.addClass("vegas-animation-" + _).css("animation-duration", w + "ms"), s.append(e)), this.support.transition || s.css("display", "none"), m ? o.eq(m - 1).after(s) : this.$elmt.prepend(s), p._timer(!1), g ? (4 === g.readyState && (g.currentTime = 0), g.play(), i()) : (f.src = a, f.onload = i)
            },
            shuffle: function() {
                for (var t, i, s = this.total - 1; s > 0; s--) i = Math.floor(Math.random() * (s + 1)), t = this.settings.slides[s], this.settings.slides[s] = this.settings.slides[i], this.settings.slides[i] = t
            },
            play: function() {
                this.paused && (this.paused = !1, this.next(), this.trigger("play"))
            },
            pause: function() {
                this._timer(!1), this.paused = !0, this.trigger("pause")
            },
            toggle: function() {
                this.paused ? this.play() : this.pause()
            },
            playing: function() {
                return !this.paused && !this.noshow
            },
            current: function(t) {
                return t ? {
                    slide: this.slide,
                    data: this.settings.slides[this.slide]
                } : this.slide
            },
            jump: function(t) {
                0 > t || t > this.total - 1 || t === this.slide || (this.slide = t, this._goto(this.slide))
            },
            next: function() {
                this.slide++, this.slide >= this.total && (this.slide = 0), this._goto(this.slide)
            },
            previous: function() {
                this.slide--, this.slide < 0 && (this.slide = this.total - 1), this._goto(this.slide)
            },
            trigger: function(t) {
                var i = [];
                i = "init" === t ? [this.settings] : [this.slide, this.settings.slides[this.slide]], this.$elmt.trigger("vegas" + t, i), "function" == typeof this.settings[t] && this.settings[t].apply(this.$elmt, i)
            },
            options: function(i, s) {
                var e = this.settings.slides.slice();
                if ("object" == typeof i) this.settings = $.extend({}, t, $.vegas.defaults, i);
                else {
                    if ("string" != typeof i) return this.settings;
                    if (void 0 === s) return this.settings[i];
                    this.settings[i] = s
                }
                this.settings.slides !== e && (this.total = this.settings.slides.length, this.noshow = this.total < 2, this._preload())
            },
            destroy: function() {
                clearTimeout(this.timeout), this.$elmt.removeClass("vegas-container"), this.$elmt.find("> .vegas-slide").remove(), this.$elmt.find("> .vegas-wrapper").clone(!0).children().appendTo(this.$elmt), this.$elmt.find("> .vegas-wrapper").remove(), this.settings.timer && this.$timer.remove(), this.settings.overlay && this.$overlay.remove(), this.elmt._vegas = null
            }
        }, $.fn.vegas = function(t) {
            var i = arguments,
                e = !1,
                n;
            if (void 0 === t || "object" == typeof t) return this.each(function() {
                this._vegas || (this._vegas = new s(this, t))
            });
            if ("string" == typeof t) {
                if (this.each(function() {
                        var s = this._vegas;
                        if (!s) throw new Error("No Vegas applied to this element.");
                        "function" == typeof s[t] && "_" !== t[0] ? n = s[t].apply(s, [].slice.call(i, 1)) : e = !0
                    }), e) throw new Error('No method "' + t + '" in Vegas.');
                return void 0 !== n ? n : this
            }
        }, $.vegas = {}, $.vegas.defaults = t, $.vegas.isVideoCompatible = function() {
            return !/(Android|webOS|Phone|iPad|iPod|BlackBerry|Windows Phone)/i.test(navigator.userAgent)
        }
    }(window.jQuery || window.Zepto),
    function(t) {
        "use strict";

        function i(t) {
            return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
        }

        function s(t, i) {
            var s = e(t, i) ? o : n;
            s(t, i)
        }
        var e, n, o;
        "classList" in document.documentElement ? (e = function(t, i) {
            return t.classList.contains(i)
        }, n = function(t, i) {
            t.classList.add(i)
        }, o = function(t, i) {
            t.classList.remove(i)
        }) : (e = function(t, s) {
            return i(s).test(t.className)
        }, n = function(t, i) {
            e(t, i) || (t.className = t.className + " " + i)
        }, o = function(t, s) {
            t.className = t.className.replace(i(s), " ")
        });
        var a = {
            hasClass: e,
            addClass: n,
            removeClass: o,
            toggleClass: s,
            has: e,
            add: n,
            remove: o,
            toggle: s
        };
        "function" == typeof define && define.amd ? define(a) : t.classie = a
    }(window),
    function(t) {
        "use strict";

        function i(t, i) {
            for (var s in i) i.hasOwnProperty(s) && (t[s] = i[s]);
            return t
        }

        function s(t, s) {
            this.el = t, this.options = i({}, this.options), i(this.options, s), this.ctrlClose = this.el.querySelector("[data-dialog-close]"), this.isOpen = !1, this._initEvents()
        }
        var e = {
                animations: Modernizr.cssanimations
            },
            n = {
                WebkitAnimation: "webkitAnimationEnd",
                OAnimation: "oAnimationEnd",
                msAnimation: "MSAnimationEnd",
                animation: "animationend"
            },
            o = n[Modernizr.prefixed("animation")],
            a = function(t, i) {
                var s = function(t) {
                    if (e.animations) {
                        if (t.target != this) return;
                        this.removeEventListener(o, s)
                    }
                    i && "function" == typeof i && i.call()
                };
                e.animations ? t.addEventListener(o, s) : s()
            };
        s.prototype.options = {
            onOpenDialog: function() {
                return !1
            },
            onCloseDialog: function() {
                return !1
            }
        }, s.prototype._initEvents = function() {
            var t = this;
            this.ctrlClose.addEventListener("click", this.toggle.bind(this)), document.addEventListener("keydown", function(i) {
                var s = i.keyCode || i.which;
                27 === s && t.isOpen && t.toggle()
            }), this.el.querySelector(".dialog__overlay").addEventListener("click", this.toggle.bind(this))
        }, s.prototype.toggle = function() {
            var t = this;
            this.isOpen ? (classie.remove(this.el, "dialog--open"), classie.add(t.el, "dialog--close"), a(this.el.querySelector(".dialog__content"), function() {
                classie.remove(t.el, "dialog--close")
            }), this.options.onCloseDialog(this)) : (classie.add(this.el, "dialog--open"), this.options.onOpenDialog(this)), this.isOpen = !this.isOpen
        }, t.DialogFx = s
    }(window), $(document).ready(function() {
        "use strict";
        $(window).load(function() {
                $(".right-part").addClass("animated-middle fadeIn").removeClass("opacity-0"), $(".timer").countTo({
                    from: 999,
                    to: $('.timer').attr('data-val'),
                    speed: 2e3,
                    onComplete: function() {
                        $(".timer").addClass("alert-text animated-quick tada")
                    }
                })
            }),
            function() {
                var t = document.querySelector("[data-dialog]"),
                    i = document.getElementById(t.getAttribute("data-dialog")),
                    s = new DialogFx(i);
                t.addEventListener("click", s.toggle.bind(s))
            }()
    });