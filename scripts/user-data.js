'use strict'

var configData = {};
var configDef = {
	syncDelay: 3,
	syncServer: "data.copas.cpace:8088/start",
	backgroundEngine: "tan",
	// tan = trianglify ,pic = picture in the background folder , custom
	backgroundConfig: {
		"cell_size": 94,
		"width": 1200,
		"height": 1200,
		//"variance": "0.00001",
		//"x_colors": "Greys",remove this line to make wallpaper colorful
		"seed": 8507265
	},
	// for custom
	searchEngine: "bing",
	searchURL: "https://bing.com/search?q={searchTerms}"
}

var naviData = [];
var naviDef = [[{
			"type": "iconbox",
			"name": "Coolapk",
			"href": "http://www.coolapk.com",
			"target": "_self",
			"icon": "./images/icons/coolapk.png"
		}, {
			"type": "iconbox",
			"name": "Baidu",
			"href": "http://www.baidu.com",
			"target": "_blank",
			"icon": "./images/icons/Hosts.png"
		}, {
			"type": "iconbox",
			"name": "Google",
			"href": "http://www.google.com",
			"target": "_blank",
			"icon": "./images/icons/Google.png"
		}
	], [{
			"type": "html",
			"name": "Test",
			"html": "PHA+5L2g5aW977yM5LiW55WMPC9wPg=="
		}
	], [{
			"type": "iconbox",
			"name": "About",
			"href": "misc.html#about",
			"target": "_self",
			"icon": "./images/icons/haha.png"
		}
	]]

/* var tanConfigDef = {
cell_size: 80,
seed: seed,
width: 1200,
height: 1200,
variance: "0.04",
x_colors: "Greys"
}; */

localforage.config({
	driver: [localforage.INDEXEDDB,
		localforage.LOCALSTORAGE],
	name: 'CopasStart'
});

localforage.getItem('configData').then(function (value) {
	if (value == null) {
		console.warn("No user configuration found, creating...");
		localforage.setItem('configData', configDef);
		configData = configDef;
		updateBackground();
	}
	if (value != null) {
		console.warn("User data founded.");
		localforage.getItem('configData').then(function (data) {
			configData = data;
			updateBackground();
		})
	}
}).catch(function (err) {
	console.error(err);
});

localforage.getItem('naviData').then(function (value) {
	if (value == null) {
		console.warn("No user navi found, creating...");
		localforage.setItem('naviData', naviDef);
		naviData = naviDef;
	}
	if (value != null) {
		console.warn("User navi founded.");
		localforage.getItem('naviData').then(function (data) {
			naviData = data;
		})
	}
}).catch(function (err) {
	console.error(err);
});

function getSeed() {
	var myDate = new Date();
	var seed = Math.floor(myDate.getTime() / 180000);
	return seed;
}

function rnd(seed) {
	return (seed * 9301 + 49297) % 233280 / 233280.0;
}

function saveConfigData(){
	localforage.setItem('configData', configData);
}
function saveNaviData(){
		localforage.setItem('naviData', naviData);
}
function updateBackground() {
	if (configData.backgroundEngine == 'tan') {
		let seed = getSeed();
		let co = configData.backgroundConfig
			co.seed = seed
			let t = Trianglify(co).png();
		$("#wrapper").css("background-image", "url(" + t + ")");
	} else if (configData.backgroundEngine == 'pic') {
		let n = 13;
		let i = Math.floor(rnd(getSeed()) * n) + 1;
		let fn = "" + i;
		while (fn.length < 3) {
			fn = "0" + fn;
		}
		fn = "./images/wallpapers/" + fn + ".jpg";
		$("#wrapper").css("background-image", "url(" + fn + ")");
	}
}
