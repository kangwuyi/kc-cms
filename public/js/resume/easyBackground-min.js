(function(e) {
    e.hexToRgb = function(e) {
        if (e.length == "4") {

            e = "#" + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2) + e.charAt(3) + e.charAt(3);
        }
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16)
        }: null
    };
    e.componentToHex = function(e) {
        var t = e.toString(16);
        return t.length == 1 ? "0" + t: t
    };
    e.rgbToHex = function(t, n, r) {
        return "#" + e.componentToHex(t) + e.componentToHex(n) + e.componentToHex(r)
    };
    e.fn.easyBackgroundParticles = function(t) {
        var n = t;
        var r = this[0].getContext("2d");
        var i = this.parent();
        var s = this[0];
        var o = [];

        var a = function(e, t) {
            return Math.random() * (t - e) + e
        };
        var f = function() {
            s.width = i.innerWidth();
            s.height = i.innerHeight()
        };
        var l = function() {
            for (var e = 0; e < n.numParticles; e++) {
                var t = n.colors[~~a(0, n.colors.length)];
                var r = n.borderColors[~~a(0, n.borderColors.length)];
                var i = a(n.minBorderOpacity, n.maxBorderOpacity);
                var u = a(n.minOpacity, n.maxOpacity);
                o[e] = {
                    scale: a(n.minScale, n.maxScale),
                    x: a(0, s.width),
                    y: a(0, s.height),
                    rotation: 0,
                    xpeed: a(n.minSpeedX, n.maxSpeedX),
                    yspeed: a(n.minSpeedY, n.maxSpeedY),
                    rotationSpeed: a(n.minRotateSpeed, n.maxRotateSpeed),
                    color: "rgba(" + t + "," + u + ")",
                    opacity: u,
                    borderColor: "rgb(" + r + ")"
                }
            }
            h()
        };
        var c = function(e) {
            r.fillStyle = e.color;
            if (n.border) {
                r.strokeStyle = e.borderColor;
                r.stroke()
            }
            r.beginPath();
            e.rotation += e.rotationSpeed;
            r.save();
            r.translate(e.x, e.y);
            r.rotate(e.rotation * Math.PI / 180);
            var t = n.baseSize * e.scale / 2;
            switch (n.shape) {
            case "circle":
                r.arc( - t, -t, n.baseSize * e.scale, 0, 2 * Math.PI, false);
                break;
            case "square":
                r.fillRect( - t, -t, n.baseSize * e.scale, n.baseSize * e.scale);
                break;
            case "image":
                r.globalAlpha = e.opacity;
                r.drawImage(n.image, -(n.image.width / 2), -(n.image.height / 2), n.image.width * e.scale, n.image.height * e.scale);
                r.globalAlpha = 1;
                break
            }
            r.restore();
            r.fill()
        };
        var h = function() {
            setInterval(function() {
                r.clearRect(0, 0, s.width, s.height);
                for (var e = 0; e < n.numParticles; e++) {
                    var t = o[e];
                    t.x += t.xpeed;
                    t.y += t.yspeed;
                    var i = n.baseSize * t.scale;
                    var u = i;

                    if (t.x > s.width + i || t.y > s.height + u || t.x < -(i * 1.5) || t.y < -(u * 1.5)) {
                        p(t)
                    } else {
                        c(t)
                    }
                }
            },
            17)
        };
        var p = function(e) {
            var t = a(0, 1);
            var r = n.baseSize * e.scale;
            var i = r;
            if (n.shape == "image") {
                r = n.image.width * e.scale;
                i = n.image.height * e.scale
            }
            if (t > .5) {
                e.x = e.xpeed > 0 ? -r: s.width + r;
                e.y = a(0, s.height)
            } else {
                e.x = a(0, s.width);
                e.y = e.yspeed > 0 ? -i: s.height + i
            }
            c(e)
        };
        f();
        e(window).on("resize.canvas", f);
        l()
    };
    e.fn.easyBackground = function(t) {
        function u() {
            var t = e('<canvas class="easy-background-canvas" />');
            t.css("display", "block");
            i.append(t);
            return t
        }
   
        function f(e, t) {
            switch (n.gradientType) {
            case "horizontal":
                i.css("background", "-moz-linear-gradient(left, " + e + ", " + t + " 100%)");
                i.css("background", "-webkit-gradient(linear, left top, right top, color-stop(0%," + e + "), color-stop(100%," + t + "))");
                i.css("background", "-webkit-linear-gradient(left, " + e + " 0%," + t + " 100%)");
                i.css("background", "-o-linear-gradient(left, " + e + " 0%," + t + " 100%)");
                i.css("background", "-ms-linear-gradient(left, " + e + " 0%," + t + " 100%)");
                i.css("background", "linear-gradient(to right, " + e + " 0%," + t + " 100%)");
                i.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + e + "', endColorstr='" + t + "',GradientType=1 )");
                break;
            case "vertical":
                i.css("background", "-moz-linear-gradient(top, " + e + ", " + t + " 100%)");
                i.css("background", "-webkit-gradient(linear, left top, left bottom, color-stop(0%," + e + "), color-stop(100%," + t + "))");
                i.css("background", "-webkit-linear-gradient(top, " + e + " 0%," + t + " 100%)");
                i.css("background", "-o-linear-gradient(top, " + e + " 0%," + t + " 100%)");
                i.css("background", "-ms-linear-gradient(top, " + e + " 0%," + t + " 100%)");
                i.css("background", "linear-gradient(to bottom, " + e + " 0%," + t + " 100%)");
                i.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + e + "', endColorstr='" + t + "',GradientType=0 )");
                break;
            case "diagonal":
                i.css("background", "-moz-linear-gradient(-45deg, " + e + ", " + t + " 100%)");
                i.css("background", "-webkit-gradient(linear, left top, right bottom, color-stop(0%," + e + "), color-stop(100%," + t + "))");
                i.css("background", "-webkit-linear-gradient(-45deg, " + e + " 0%," + t + " 100%)");
                i.css("background", "-o-linear-gradient(-45deg, " + e + " 0%," + t + " 100%)");
                i.css("background", "-ms-linear-gradient(-45deg, " + e + " 0%," + t + " 100%)");
                i.css("background", "linear-gradient(135deg, " + e + " 0%," + t + " 100%)");
                i.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + e + "', endColorstr='" + t + "',GradientType=1 )");
                break;
            case "radial":
                i.css("background", "-moz-radial-gradient(center, ellipse cover, " + e + " 0%, " + t + " 100%)");
                i.css("background", "-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%," + e + "), color-stop(100%," + t + "))");
                i.css("background", "-webkit-radial-gradient(center, ellipse cover, " + e + " 0%," + t + " 100%)");
                i.css("background", "-o-radial-gradient(center, ellipse cover, " + e + " 0%," + t + " 100%)");
                i.css("background", "-ms-radial-gradient(center, ellipse cover, " + e + " 0%," + t + " 100%)");
                i.css("background", "radial-gradient(ellipse at center, " + e + " 0%," + t + " 100%)");
                i.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + e + "', endColorstr='" + t + "',GradientType=1 )");
                break
            }
        }
        function l(t, r) {
            var i = {
                colorAR: t[0][0],
                colorAG: t[0][1],
                colorAB: t[0][2],
                colorBR: t[1][0],
                colorBG: t[1][1],
                colorBB: t[1][2]
            };
            var s = {
                colorAR: r[0][0],
                colorAG: r[0][1],
                colorAB: r[0][2],
                colorBR: r[1][0],
                colorBG: r[1][1],
                colorBB: r[1][2]
            };
            e(i).animate(s, {
                duration: n.duration,
                easing: n.gradientEase,
                step: function() {
                    var t = e.rgbToHex(Math.round(this.colorAR), Math.round(this.colorAG), Math.round(this.colorAB));
                    var n = e.rgbToHex(Math.round(this.colorBR), Math.round(this.colorBG), Math.round(this.colorBB));
                    f(t, n)
                },
                complete: function() {
                    if (n.gradientLoop) {
                        l(r, t)
                    }
                }
            })
        }

   

    

        var n = {
            effect: "particles",
            duration: 5e3,
            slides: [],
            slideshowEffect: "fade",
            slideshowSpeed: 2e3,
            patternImage: null,
            patternAnimationX: "left",
            patternAnimationY: "none",
            gradientType: "radial",
            gradientColors: ["#9CC4E2", "#004799"],
            gradientAnimateColors: ["#666666", "#333333"],
            gradientLoop: true,
            gradientEase: "linear",
            mute: true,
            ratio: 16 / 9,
            shape: "circle",
            colors: ["#FFFFFF", "255, 99, 71", "19, 19, 19"],
            border: false,
            borderColors: ["#FF0000", "#00FF00", "#0000FF"],
            minScale: .5,
            maxScale: 1,
            baseSize: 30,
            minOpacity: .1,
            maxOpacity: 1,
            minBorderOpacity: .1,
            maxBorderOpacity: 1,
            minSpeedX: -1,
            maxSpeedX: 1,
            minSpeedY: -1,
            maxSpeedY: 1,
            minRotateSpeed: .05,
            maxRotateSpeed: .1,
            numParticles: 75,
            overlay: "dots",
        
            disableMobile: false,
            wrapNeighbours: false,
            relativeNeighbours: false
        };
        e.extend(true, n, t);
        if (n && n.colors) {
            e(n.colors).each(function(t, r) {
                if (r.substr(0, 1) == "#") {
                    var i = e.hexToRgb(r);
                    n.colors[t] = i.r + ", " + i.g + ", " + i.b
                }
            })
        }
        if (n && n.borderColors) {
            e(n.borderColors).each(function(t, r) {
                if (r.substr(0, 1) == "#") {
                    var i = e.hexToRgb(r);
                    n.borderColors[t] = i.r + ", " + i.g + ", " + i.b
                }
            })
        }
        if (n && n.gradientColors) {
            e(n.gradientColors).each(function(t, r) {
                if (r.substr(0, 1) == "#") {
                    var i = e.hexToRgb(r);
                    n.gradientColors[t] = [i.r, i.g, i.b]
                }
            })
        }
        if (n && n.gradientAnimateColors) {
            e(n.gradientAnimateColors).each(function(t, r) {
                if (r.substr(0, 1) == "#") {
                    var i = e.hexToRgb(r);
                    n.gradientAnimateColors[t] = [i.r, i.g, i.b]
                }
            })
        }
        var r = false;

        var i = e('<div class="paopao" /> ');
        i.css("width", "100%");
        i.css("height", "100%");
        if (this.is("body")) {
            i.css("position", "fixed")
        } else {
            i.css("position", "none");
            this.css("overflow", "hidden")
        }
        i.css("top", "0");
        i.css("left", "0");
  
        i.css("z-index", "1");
        this.append(i);


        if (!r) {
            switch (n.effect) {
            case "particles":
                u().easyBackgroundParticles(n);
                break;
            case "gradient":
                if (n.gradientAnimateColors) {
                    l(n.gradientColors, n.gradientAnimateColors)
                } else {
                    var m = e.rgbToHex(n.gradientColors[0][0], n.gradientColors[0][1], n.gradientColors[0][2]);
                    var g = e.rgbToHex(n.gradientColors[1][0], n.gradientColors[1][1], n.gradientColors[1][2]);
                    f(m, g)
                }
                break;
            case "pattern":
                c(n.patternImage);
                break;
            case "slideshow":
                p(n.slides);
                break
            }
        }
    }
})(jQuery)