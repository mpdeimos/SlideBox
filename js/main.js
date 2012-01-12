(function() {
  var SlideBox;
  SlideBox = (function() {
    function SlideBox() {
      Ext.select(".slideBox").each((function(e) {
        this.init(e);
      }), this);
    }
    SlideBox.prototype.init = function(e) {
      var delta, downX, dragging, end, firstActive, m, slideFirst, slideOff, slideOn, slideSecond, slider, sliderX, toggle, w;
      slideOff = e.child('.slideOff');
      slideOn = e.child('.slideOn');
      if (slideOff.getLeft() < slideOn.getLeft()) {
        slideFirst = slideOff;
        slideSecond = slideOn;
      } else {
        slideFirst = slideOn;
        slideSecond = slideOff;
      }
      slider = e.child('label');
      if (slideFirst.getWidth() > slideSecond.getWidth()) {
        w = slideFirst.getWidth();
        m = slideSecond.getBorderWidth("l") + slideSecond.getPadding("l");
        slideSecond.setWidth(w);
      } else {
        w = slideSecond.getWidth();
        m = slideFirst.getBorderWidth("r") + slideFirst.getPadding("r");
        slideFirst.setWidth(w);
      }
      slider.setStyle({
        width: 2 * w,
        left: 0
      });
      e.setStyle({
        width: w + m
      });
      dragging = false;
      downX = false;
      sliderX = 0;
      delta = 0;
      firstActive = true;
      toggle = function() {
        firstActive = !firstActive;
        if (firstActive) {
          return slider.animate({
            left: {
              to: 0
            }
          }, .2);
        } else {
          return slider.animate({
            left: {
              to: -w + m
            }
          }, .2);
        }
      };
      slider.on("mousedown", function(evt) {
        downX = evt.getXY()[0];
        sliderX = slider.getX();
        return evt.stopEvent();
      });
      slider.on("mousemove", function(evt) {
        var x;
        if (downX === false) {
          return;
        }
        x = evt.getXY()[0];
        delta = x - downX;
        delta = Math.max((-w + m) * firstActive, Math.min((w - m) * !firstActive, delta));
        dragging = true;
        slider.setLeft((-w + m) * !firstActive + delta);
        return evt.stopEvent();
      });
      end = function(evt) {
        if (downX === false) {
          return;
        }
        if (dragging && Math.abs(delta) < w / 3) {
          firstActive = !firstActive;
        }
        dragging = false;
        downX = false;
        delta = 0;
        toggle();
        return evt.stopEvent();
      };
      slider.on("mouseup", end);
      return slider.on("mouseleave", end);
    };
    return SlideBox;
  })();
  this.Z = new SlideBox;
}).call(this);
