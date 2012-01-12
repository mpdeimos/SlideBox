# mpdeimos.com main script

class SlideBox
	constructor: ->
		Ext.select(".slideBox").each ((e) ->
			this.init e
			return
		), this
	init: (e) ->
		slideOff = e.child '.slideBoxOff';
		slideOn = e.child '.slideBoxOn';
		slider = e.child('label');
		checkbox = Ext.get(slider.getAttribute('for'))
		otherBox = null;
		if checkbox?.getAttribute('type') == "radio"
			e.select('input[type=radio]').each (c) ->
				otherBox = c if c != checkbox
		
		if (slideOff.getLeft() < slideOn.getLeft())
			slideFirst = slideOff
			slideSecond = slideOn
		else
			slideFirst = slideOn
			slideSecond = slideOff
			
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
		mychange = false
		toggle = (onoff) ->
			mychange = true
			if onoff?
				firstActive = !onoff
				firstActive = onoff if slideFirst == slideOn
			else
				firstActive = !firstActive
			
			if firstActive
				slider.animate left: {to: 0}, .2
			else
				slider.animate left: {to: -w+m}, .2
				
			if null != checkbox
				active = firstActive
				active = !active if slideFirst == slideOn
				checkbox.dom.checked = !active
				otherBox?.dom.checked = active
			mychange = false
				
		down = (evt) ->
			[downX, ] = evt.getXY()
			downX = evt.browserEvent.touches?.item(0)?.clientX if evt.browserEvent.touches?
			sliderX = slider.getX()
			evt.stopEvent()
		slider.on "mousedown", down
		slider.on "touchstart", down
			
		move = (evt) ->
			if downX == false
				return
				
			[x, ] = evt.getXY()
			x = evt.browserEvent.touches?.item(0)?.clientX if evt.browserEvent.touches?
			delta = x - downX
			delta = Math.max((-w+m)*firstActive, Math.min((w-m)*!firstActive, delta))
			dragging = true
			slider.setLeft (-w+m)*!firstActive + delta
				
			evt.stopEvent()
		slider.on "mousemove", move
		slider.on "touchmove", move
			
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
		slider.on "touchend", end
		slider.on "touchcancel", end
		
		slider.on "click", (evt) -> evt.stopEvent()
		
		if checkbox
			updateFromCheckbox = -> toggle checkbox.dom.checked if not mychange
			checkbox.on "change", updateFromCheckbox
			otherBox?.on "change", -> toggle !otherBox.dom.checked if not mychange
			updateFromCheckbox()
			
this.Z = new SlideBox
