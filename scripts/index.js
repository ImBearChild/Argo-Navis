'use strict'
// JavaScript Document


var appShowed = 0; // 2=first 1=showed 0=hide
var LrDivToggled = 0;

function checkSubmit() {
	var word = document.getElementById("word").value.trim();
	if (word == "") {
		return false;
	} else {
		window.open(configData.searchURL.replace("{searchTerms}", word), "_self");
	}
	return false;
}

function toggleApps() {
	if (appShowed == 0) {
		console.info("Iframe showed");
		if (window.innerWidth < 600) {
			$("div#search_form").animate({
				top: '5%'
			});
			let t = window.innerHeight * 0.05 + 52 + "px";
			$("div#apps_div").animate({
				top: t
			});
		} else {
			$("div#search_form").animate({
				top: '10%'
			});
			let t = window.innerHeight * 0.1 + 54 + "px";
			$("div#apps_div").animate({
				top: t
			});
		}
		appShowed = 1;
	} else {
		$("div#search_form").animate({
			top: '35%'
		});
		$("div#apps_div").animate({
			top: '-80%'
		});
		console.info("Iframe hidden");
		appShowed = 0;
	}
}

function toggleLrDiv() {
	if (LrDivToggled == 0) {
		if (window.innerWidth < 600) {
			$("div#lr_div").animate({
				left: '60px'
			});
		} else {
			$("div#lr_div").animate({
				left: '100px'
			});
		}
		LrDivToggled = 1;
		console.info("Toolbar visible");
	} else {
		$("div#lr_div").animate({
			left: '-200px'
		});
		LrDivToggled = 0;
		console.info("Toolbar invisible");
	}
}

function lr_button_onclick() {
	if (appShowed == 0) {
		toggleApps();
	}
}

$(window).resize(function () {
	console.warn("Windows resized. Layout may be changed");
	if (appShowed == 1) {
		if (window.innerHeight < 600) {
			$("div#search_form").css({
				top: '5%'
			});
			let t = window.innerHeight * 0.05 + 52 + "px";
			$("div#apps_div").animate({
				top: t
			});
		} else {
			$("div#search_form").css({
				top: '10%'
			});
			let t = window.innerHeight * 0.1 + 54 + "px";
			$("div#apps_div").animate({
				top: t
			});
		}
	};
	if (LrDivToggled == 1) {
		if (window.innerWidth < 600) {
			$("div#lr_div").css({
				left: '60px'
			});
		} else {
			$("div#lr_div").css({
				left: '100px'
			});
		}
	}
});

$(document).ready(function () {
	//$("div#serverInfo").hide();
	console.info("Inner hight of Window: " + window.innerHeight);
	//$("div#apps_div").css("margin-top", window.innerHeight * -1.5)
	//updateBackground();
	//$("div.button_wrapper").hide();
});
