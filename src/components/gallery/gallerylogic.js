'use strict'

var SlideGalleryFactory = function(gID) {
	this.galleryID = gID;
	//** get dimensions of the gallery

	this.swapGalleryUL = document.querySelector(this.galleryID + " ul");
	this.singleGallery = document.querySelector(this.galleryID + " ul li");
	this.singleGalleryWidth = window.getComputedStyle(this.singleGallery, null).getPropertyValue("width");
	this.numSingleGalleryWidth = parseInt(this.singleGalleryWidth);

	this.galleryList = document.querySelectorAll(this.galleryID + " ul li");
	this.galleryListLength = document.querySelectorAll(this.galleryID + " ul li").length;
	this.currentULPos = this.numSingleGalleryWidth/2;

	//initialize gallery
	this.init();
	this.setbutton();
	this.setTouch();

};

var proto = SlideGalleryFactory.prototype;


//** get total width of the gallery list.

proto.totalSingleWidth = function() {
	var singleGalleryMarginLeft = parseInt(window.getComputedStyle(this.singleGallery, null).getPropertyValue("margin-left"));
	var singleGalleryMarginRight = parseInt(window.getComputedStyle(this.singleGallery, null).getPropertyValue("margin-right"));
	return (this.numSingleGalleryWidth + singleGalleryMarginLeft + singleGalleryMarginRight);
}

	// set scale of element with all the vendor prefixes
proto.setVendorTransformScale = function(element, value) {
	element.style.webkitTransform = "scale(" + value + ")";
	element.style.mozTransform = "scale(" + value + ")";
	element.style.transform = "scale(" + value + ")";
}

proto.setNonActiveSlide = function(list,num,side) {
	var scaleValue = 1 - (num * 0.2);
	var opacityValue = 1 - (num * 0.5);

	this.galleryList[list].style.zIndex = this.galleryList.length - num;
	this.galleryList[list].style.opacity = opacityValue;

	if (side === "left") {
		this.galleryList[list].style.left = -((parseInt(this.singleGalleryWidth) / 2) * num) + "px";
	} else {
		this.galleryList[list].style.left = ((parseInt(this.singleGalleryWidth) / 2) * num) + "px";
	}
	this.setVendorTransformScale(this.galleryList[list], scaleValue);
}

proto.moveGallery = function(direction) {
	// direction (1 is moving forward) (-1 is moving backward)
	var slideDirection;

	if (direction === ("forward" || 1) ) {
		slideDirection = 1;
	} else if (direction === ("backward" || "back" || -1) ) {
		slideDirection = -1
	}

	for( var i = 0; i < this.galleryList.length; i++ ) {
		if (this.galleryList[i].classList.contains("active")) {
			if (this.galleryList[i + slideDirection]) {
				this.galleryList[i].style.zIndex = this.galleryList.length - 1;
				this.galleryList[i].classList.remove("active");

				this.galleryList[i + slideDirection].classList.add("active");
				this.galleryList[i + slideDirection].style.zIndex = this.galleryList.length;
				this.galleryList[i + slideDirection].style.opacity = 1;
				this.galleryList[i + slideDirection].style.left = 0 + "px";
				this.setVendorTransformScale(this.galleryList[i+slideDirection], 1)

				//**  create new arrays for right side
				for (var j = (i + slideDirection); j < this.galleryList.length; j++ ) {
					// ** set value from active img to all images after
					var numForward = j - (i + slideDirection);
					this.setNonActiveSlide(j, numForward);
				}

				//**  create new arrays for left side
				for (var k = (i + slideDirection); k >= 0; k-- ) {
					var numBackward = (k - (i+slideDirection)) * -1;
					this.setNonActiveSlide(k, numBackward, "left");
				}

				//** move the gallery
				this.currentULPos = (this.currentULPos - (( parseInt(this.singleGalleryWidth) * slideDirection) / 2));
				return;
			}
		}
	}
}

proto.init = function() {
	var totalUL = 0;
	var initScale = 0;
	for( var i=0; i<this.galleryListLength; i++) {
		initScale = 1 - (i * 0.2);

		this.galleryList[i].style.left = (parseInt(this.singleGalleryWidth) * i) / 2 + "px";
		this.galleryList[i].style.zIndex = this.galleryListLength - i;
		this.galleryList[i].style.opacity = 1 - (i * 0.5);
		this.setVendorTransformScale(this.galleryList[i], initScale);
	};

	var activeItem = this.swapGalleryUL.querySelector(".active");
	var initPos = parseInt(activeItem.style.left) + (activeItem.getBoundingClientRect().width / 2);

	//add transition to the gallery list
	setTimeout(function () {
		this.swapGalleryUL.style.transition = "300ms ease-in";

		for ( var i = 0; i < this.galleryListLength; i++ ) {
			this.galleryList[i].style.transition = 400 + "ms";
		}
	}.bind(this), 0.1);

}

proto.setbutton = function() {
	document.getElementById("nextBtn").addEventListener("click", function() {
		this.moveGallery('forward');
	}.bind(this));
	document.getElementById("prevBtn").addEventListener("click", function() {
		this.moveGallery('backward');
	}.bind(this));
}

proto.setTouch = function() {
	var startTouchPosX;
	var endTouchPosX;

	this.swapGalleryUL.addEventListener("touchstart", function(e) {
		startTouchPosX = e.changedTouches[0].clientX;

	});

	this.swapGalleryUL.addEventListener("touchend", function(e) {
		endTouchPosX = e.changedTouches[0].clientX;
		if (endTouchPosX < startTouchPosX) {
			this.moveGallery('forward');
		} else if (endTouchPosX > startTouchPosX) {
			this.moveGallery('backward');
		}

	}.bind(this));

}



module.exports = SlideGalleryFactory;



