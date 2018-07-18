'use strict'
function loadNavi() {
	console.info("Loading Page....");
	for (var i = 0; i < parent.naviData.length; i++) {
		console.log('[Row Object] ');
		var row = $("<div class='row'></div>").text("");
		for (var ii = 0; ii < parent.naviData[i].length; ii++) {
			if (parent.naviData[i][ii].type == "html") {
				console.log("[HTML Box Object] " + parent.naviData[i][ii].name);
				var t = base64.decode(parent.naviData[i][ii].html);
				console.log(t);
				var box = $("<div class='box'></box>").html(t);
				box.attr("class", "box");
				row.append(box);
			} else if (parent.naviData[i][ii].type == "iconbox") {
				console.log("[Icon Box Object] " + parent.naviData[i][ii].name);
				var box = $("<div class='box'></box>").text("");
				var a = $("<a></a>").text("");
				a.attr("href", parent.naviData[i][ii].href);
				a.attr("target", parent.naviData[i][ii].target);
				var img = $("<img class='icon'></img>").text("");
				img.attr("src", parent.naviData[i][ii].icon);
				a.append(img);
				var name = $("<p class='name'></p>").text(parent.naviData[i][ii].name);
				box.append(a);
				box.append(name);
				row.append(box);
			}
		}
		$("#bookmarks").append(row);
	}
}
$(document).ready(function () {
	try {
		loadNavi();
	} catch (err) {
		console.error("[Error]  " + err);
	}
});
