(function() {
  var SlideBox;
  SlideBox = (function() {
    function SlideBox() {
      Ext.select(".slideBox").each((function(e) {
        this.init(e);
      }), this);
    }
    SlideBox.prototype.init = function(e) {
      var checkbox, delta, down, downX, dragging, end, firstActive, m, move, mychange, otherBox, slideFirst, slideOff, slideOn, slideSecond, slider, sliderX, toggle, updateFromCheckbox, w;
      slideOff = e.child('.slideBoxOff');
      slideOn = e.child('.slideBoxOn');
      slider = e.child('label');
      checkbox = Ext.get(slider.getAttribute('for'));
      otherBox = null;
      if ((checkbox != null ? checkbox.getAttribute('type') : void 0) === "radio") {
        e.select('input[type=radio]').each(function(c) {
          if (c !== checkbox) {
            return otherBox = c;
          }
        });
      }
      if (slideOff.getLeft() < slideOn.getLeft()) {
        slideFirst = slideOff;
        slideSecond = slideOn;
      } else {
        slideFirst = slideOn;
        slideSecond = slideOff;
      }
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
      mychange = false;
      toggle = function(onoff) {
        var active;
        mychange = true;
        if (onoff != null) {
          firstActive = !onoff;
          if (slideFirst === slideOn) {
            firstActive = onoff;
          }
        } else {
          firstActive = !firstActive;
        }
        if (firstActive) {
          slider.animate({
            left: {
              to: 0
            }
          }, .2);
        } else {
          slider.animate({
            left: {
              to: -w + m
            }
          }, .2);
        }
        if (null !== checkbox) {
          active = firstActive;
          if (slideFirst === slideOn) {
            active = !active;
          }
          checkbox.dom.checked = !active;
          if (otherBox != null) {
            otherBox.dom.checked = active;
          }
        }
        return mychange = false;
      };
      down = function(evt) {
        var _ref, _ref2;
        downX = evt.getXY()[0];
        if (evt.browserEvent.touches != null) {
          downX = (_ref = evt.browserEvent.touches) != null ? (_ref2 = _ref.item(0)) != null ? _ref2.clientX : void 0 : void 0;
        }
        sliderX = slider.getX();
        return evt.stopEvent();
      };
      slider.on("mousedown", down);
      slider.on("touchstart", down);
      move = function(evt) {
        var x, _ref, _ref2;
        if (downX === false) {
          return;
        }
        x = evt.getXY()[0];
        if (evt.browserEvent.touches != null) {
          x = (_ref = evt.browserEvent.touches) != null ? (_ref2 = _ref.item(0)) != null ? _ref2.clientX : void 0 : void 0;
        }
        delta = x - downX;
        delta = Math.max((-w + m) * firstActive, Math.min((w - m) * !firstActive, delta));
        dragging = true;
        slider.setLeft((-w + m) * !firstActive + delta);
        return evt.stopEvent();
      };
      slider.on("mousemove", move);
      slider.on("touchmove", move);
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
      slider.on("mouseleave", end);
      slider.on("touchend", end);
      slider.on("touchcancel", end);
      slider.on("click", function(evt) {
        return evt.stopEvent();
      });
      if (checkbox) {
        updateFromCheckbox = function() {
          if (!mychange) {
            return toggle(checkbox.dom.checked);
          }
        };
        checkbox.on("change", updateFromCheckbox);
        if (otherBox != null) {
          otherBox.on("change", function() {
            if (!mychange) {
              return toggle(!otherBox.dom.checked);
            }
          });
        }
        return updateFromCheckbox();
      }
    };
    return SlideBox;
  })();
  this.Z = new SlideBox;
}).call(this);
