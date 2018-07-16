var clientID

function loadJson() {
	$.getJSON("http://tk233.space:5566/api/all", function (result) {
		for (var i = 0; i < result.length; i++) {
			console.log(result[i].name);
			
			content = $("<a></a>").text("");
			$(content).attr("href", "#info_page");
			$(content).attr("id", result[i].id);
			$(content).attr("onclick", "return selectId("+ result[i].id+")");
			
			var temp = $("<h3></h3>").text(result[i].name);
			$(content).append(temp);
			
			console.log(result[i].status)
			if (result[i].status == "0") {
				temp = $("<p></p>").text("Status: Online");
			} else if (result[i].online == "1") {
				temp = $("<p></p>").text("Status: Offline");
			}
			$(content).append(temp);
			
			var unixTimestamp = new Date(result[i].time * 1000) 
			commonTime = unixTimestamp.toString()
			temp = $("<p></p>").text("Last Activity: " + commonTime);
			$(content).append(temp);
			
			var li = $("<li></li>").text("");
			$(li).append(content);
			$("#client_list").append(li);
		}
		$("#client_list").listview("refresh");
	});
}

function loadDetail() {
	$.getJSON("http://tk233.space:5566/api/all", function (result) {
		for (var i = 0; i < result.length; i++) {
			console.log(result[i].id);
			if (result[i].id != clientID) {
				continue;
			}
			console.log("reagy yo pront")
			content = $("<a></a>").text("");
			$(content).attr("href", "#info_page");
			$(content).attr("id", result[i].id);
			$(content).attr("onclick", "return selectId("+ result[i].id+")");
			
			var temp = $("<h3></h3>").text(result[i].name);
			$(content).append(temp);
			
			console.log(result[i].status)
			if (result[i].status == "0") {
				temp = $("<p></p>").text("Status: Online");
			} else if (result[i].online == "1") {
				temp = $("<p></p>").text("Status: Offline");
			}
			$(content).append(temp);
			
			var unixTimestamp = new Date(result[i].time * 1000) 
			commonTime = unixTimestamp.toString()
			temp = $("<p></p>").text("Last Activity: " + commonTime);
			$(content).append(temp);
			
			var li = $("<li></li>").text("");
			$(li).append(content);
			$("#client_list").append(li);
		}
		$("#client_info").listview("refresh");
	});
}

function selectId(id) {
	clientID = id;
}

$(document).on("pageinit", "#list_page", function () {
	console.log("init");
	loadJson();
});

$(document).on("pageinit", "#info_page", function () {
	console.log("init page");
	loadDetail();
});