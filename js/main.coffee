# mpdeimos.com main script

class SlideBox
	constructor: ->
		Ext.select(".slideBox").each ((e) ->
			this.init e
			return
		), this
	init: (e) ->
		slideOff = e.child('.slideOff');
		slideOn = e.child('.slideOn');
		if (slideOff.getLeft() < slideOn.getLeft())
			slideFirst = slideOff
			slideSecond = slideOn
		else
			slideFirst = slideOn
			slideSecond = slideOff
			
		slider = e.child('label');
		if slideFirst.getWidth() > slideSecond.getWidth()
			w = slideFirst.getWidth()
			m = slideSecond.getBorderWidth("l") + slideSecond.getPadding("l");
			slideSecond.setWidth w
		else
			w = slideSecond.getWidth()
			m = slideFirst.getBorderWidth("r") + slideFirst.getPadding("r");
			slideFirst.setWidth w
			
		slider.setStyle {width: 2*w, left: 0}
		e.setStyle width: w+m
		
		dragging = false
		downX = false
		sliderX = 0
		delta = 0
		firstActive = true
		toggle = ->
			firstActive = !firstActive
			
			if firstActive
				slider.animate left: {to: 0}, .2
			else
				slider.animate left: {to: -w+m}, .2
				
		slider.on "mousedown", (evt) ->
			[downX, ] = evt.getXY()
			sliderX = slider.getX()
			evt.stopEvent()
			
		slider.on "mousemove", (evt) ->
			if downX == false
				return
				
			[x, ] = evt.getXY()
			delta = x - downX
			delta = Math.max((-w+m)*firstActive, Math.min((w-m)*!firstActive, delta))
			dragging = true
			slider.setLeft (-w+m)*!firstActive + delta
				
			evt.stopEvent()
			
		end = (evt) ->
			if downX == false
				return
				
			if dragging && Math.abs(delta) < w/3
				firstActive = !firstActive
			dragging = false
			downX = false
			delta = 0
			toggle()
			evt.stopEvent()
			
		slider.on "mouseup", end
		slider.on "mouseleave", end
			
this.Z = new SlideBox
