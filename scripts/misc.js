'use strict'
var editObjNum = [0,0];
var operationTBC; // operation to be confirmed
var infoTBS;

function saveSearchSettings() {
	parent.configData.searchURL = $("#search_url").val();
	parent.configData.searchEngine = $("#search_engine").val();
	console.log(parent.configData);
	parent.saveConfigData();
}

function saveSyncSettings() {}

function saveDebugSettings() {
	parent.configData=JSON.parse($("#config_code").val());
	parent.naviData=JSON.parse($("#navi_code").val());
	parent.saveConfigData();
	parent.saveNaviData();
}

function saveIconBox() {
	let a = editObjNum[0] ;
	let b = editObjNum[1] ;
	parent.naviData[a][b].name=$("#iconbox_name").val();
	parent.naviData[a][b].href=$("#iconbox_href").val();
	parent.naviData[a][b].target=$("#iconbox_target").val();
	parent.naviData[a][b].icon=$("#iconbox_icourl").val();
	parent.saveNaviData();
}

function saveHtmlBox(){
	let a = editObjNum[0] ;
	let b = editObjNum[1] ;
	parent.naviData[a][b].name = $("#htmlbox_name").val();
	parent.naviData[a][b].html=base64.encode($("#htmlbox_code").val());
	console.log(base64.decode(parent.naviData[a][b].html));
	parent.saveNaviData();
}


function saveAppearanceSettings() {
	parent.configData.backgroundEngine = $("#background_engine").val();
	if ($("#background_engine").val() == "tan") {
		parent.configData.backgroundConfig = JSON.parse($("#background_config").val());
	}
	console.log(parent.configData);
	parent.saveConfigData();
}

function rmBox(){
	let a = editObjNum[0] ;
	let b = editObjNum[1] ;
	parent.naviData[a].splice(b,1);
	console.log(parent.naviData[a].length);
	if (parent.naviData[a].length==0) {
		parent.naviData.splice(a,1);
	}
	parent.saveNaviData();
	parent.$("#app_iframe").attr('src','./misc.html#navi_editor');
}


function addHtmlBox(){
	
}

function confirmOperation(operation,info){
	operationTBC = operation;
	infoTBS =info;
	parent.$("#app_iframe").attr('src','./misc.html#confirm_page');
}

function resetAppearanceSettings() {
	console.log("Reset Appearance Settings");
	parent.configData.backgroundEngine = parent.parent.configDataDef.backgroundEngine;
	parent.configData.backgroundparent.configData = parent.parent.configDataDef.backgroundparent.configData;
	background_engine_onchange();
}

function loadExtensions() {
	$.getJSON("./extensions/extensions.json", function (result) {
		for (var i = 0; i < result.length; i++) {
			console.log('[Extension Object] ' + result[i].name);
			content = $("<li></li>").text("");
			var temp = $("<a></a>").text(result[i].name);
			temp.attr("id", "gen_" + i);
			temp.attr("data-ajax", "false");
			temp.attr("href", "./extensions/" + result[i].href);
			content.append(temp);
			$("#ex_list").append(content);
		}
		$("#ex_list").listview("refresh");
	});
}

function loadNaviSetting() {
	console.info("Loading NaviSetting....");
	for (var i = 0; i < parent.naviData.length; i++) {
		let divider = $("<li data-role='list-divider'></li").text("Row " + (i + 1));
		console.log(divider.text());
		$("#navi_contain").append(divider);
		for (var ii = 0; ii < parent.naviData[i].length; ii++) {
			if (parent.naviData[i][ii].type == "html") {
				let item = $("<a href='#htmlbox_editor' ></a>").text("HTML Box : "+ parent.naviData[i][ii].name);
				item.attr("onclick","passEditObj("+ i+"," +ii +")");
				let li =$("<li></li>").html(item);
				$("#navi_contain").append(li);
			} else if (parent.naviData[i][ii].type == "iconbox") {
				let item = $("<a href='#iconbox_editor'></a>").text("Icon Box : "+ parent.naviData[i][ii].name);
				item.attr("onclick","passEditObj("+ i+"," +ii +")");
				let li =$("<li></li>").html(item);
				$("#navi_contain").append(li);
			}
		}
	}
	$("#navi_contain").listview("refresh");
}

function passEditObj(a,b) {
	editObjNum =[a,b];
	console.log("editObjNum" +editObjNum);
}

function background_engine_onchange() {
	if ($("#background_engine").val() == "tan") {
		$("#background_description").html("Trianglify : Use javascript to generate wallpaper.</br>Don't modifie"
			 + '"seed" section.' + '</br>Remove the "x_color" line to make wallpaper colorful' +
			'</br>See: <a href="https://github.com/qrohlf/trianglify">Trianglify - Github</a> for more infomation.');
		$("#background_config").val(JSON.stringify(parent.configData.backgroundConfig, null, 2));
	} else if ($("#background_engine").val() == "pic") {
		$("#background_description").text("Preset picture : Show preset wallpapers");
		$("#background_parent.configData").val("N/A");
	} else if ($("#background_engine").val() == "custom") {
		$("#background_description").text("Custom picture : Use URL in the input box under this");
	}
}
function search_engine_onchange() {
	console.log("search_engine set");
	if ($("#search_engine").val() == "baidu") {
		$("#search_url").val("https://www.baidu.com/s?word={searchTerms}");
	}
	if ($("#search_engine").val() == "google") {
		$("#search_url").val("https://www.google.com/search?q={searchTerms}");
	}
	if ($("#search_engine").val() == "bing") {
		$("#search_url").val("https://bing.com/search?q={searchTerms}");
	}
	if ($("#search_engine").val() == "custom") {
		console.log("search_engine set");
	}
}

$(document).on("pagebeforeshow", "#extensions", function () {
	loadExtensions();
});

$(document).on("pagebeforeshow", "#debug_settings", function () {
	$("#config_code").val(JSON.stringify(parent.configData, null, 2));
	$("#navi_code").val(JSON.stringify(parent.naviData, null, 2));
});

$(document).on("pagebeforeshow", "#box_adder", function () {
	$("#position_row").attr("max",parent.naviData.length);
});

$(document).on("pagebeforeshow", "#confirm_page", function () {
	$('#info_TBS').text(infoTBS);
});

$(document).on("pagebeforeshow", "#htmlbox_editor", function () {
	let a = editObjNum[0] ;
	let b = editObjNum[1] ;
	$("#htmlbox_name").val(parent.naviData[a][b].name);
	console.log(base64.decode(parent.naviData[a][b].html));
	$("#htmlbox_code").val(base64.decode(parent.naviData[a][b].html));
});

$(document).on("pagebeforeshow", "#iconbox_editor", function () {
	let a = editObjNum[0] ;
	let b = editObjNum[1] ;
	$("#iconbox_name").val(parent.naviData[a][b].name);
	$("#iconbox_href").val(parent.naviData[a][b].href);
	$("#iconbox_target").val(parent.naviData[a][b].target);
	$("#iconbox_icourl").val(parent.naviData[a][b].icon);
});

$(document).on("pagebeforeshow", "#appearance_settings", function () {
	console.info("Loading appearance setting....");
	$("#background_engine").val(parent.configData.backgroundEngine);
	background_engine_onchange();
});

$(document).on("pagebeforeshow", "#search_settings", function () {
	$("#search_url").attr("value", parent.configData.searchURL);
	$("#search_engine").enhanceWithin();
	$("#search_engine").val(parent.configData.searchEngine);
});

$(document).on("pagebeforeshow", "#navi_editor", function () {
	$("#navi_contain").empty();
	loadNaviSetting();
});
