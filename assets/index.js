// Parse a JSON file for data on CommuMod release versions
$(document)
	.ready(function () {
		var bindElements = function () {
			$('.ui.menu .dropdown')
				.dropdown();
			$('.dropdown')
				.dropdown({
					on: 'hover',
					allowCategorySelection: true,
					transition: 'drop'
				});
			$('.ui.popup')
				.popup();
			$('#downloads .item')
				.popup({
					on: 'hover',
					transition: 'fade up',
					title: 'Minecraft Version',
					inline: true,
					variation: 'inverted'
				});
			/*$('.ui.dropdown.button') .dropdown({ on: 'hover', transition: 'fly up' });*/
		};


		//			$("button").click(function () {
		jQuery.getJSON("http://widget.mcf.li/mc-mods/minecraft/220860-commumod.json", function (data) {
			var versions1 = [];
			$.each(data.versions["1.7.10"], function (key, val) {
				if (data.versions["1.7.10"][key].type == "beta" | data.versions["1.7.10"][key].type == "alpha") {
					versions1.push("<div class='item' data-content='1.7.10'><a href='" + data.versions["1.7.10"][key].url + "' class='link'>" + data.versions["1.7.10"][key].name + "&nbsp;</a><div class='ui right floated red label'>" + data.versions["1.7.10"][key].type + "</div></div>");
				} else {
					versions1.push("<div class='item' data-content='1.7.10'><a href='" + data.versions["1.7.10"][key].url + "' class='link'>" + data.versions["1.7.10"][key].name + "&nbsp;</a><div class='ui right floated blue label'>" + data.versions["1.7.10"][key].type + "</div></div>");
				}

			});
			var versions = [];
			$.each(data.versions["1.7.2"], function (key, val) {
				if (data.versions["1.7.2"][key].type == "beta" | data.versions["1.7.2"][key].type == "alpha") {
					versions1.push("<div class='item' data-content='1.7.2'><a href='" + data.versions["1.7.2"][key].url + "' class='link'>" + data.versions["1.7.2"][key].name + "&nbsp;</a><div class='ui right floated red label'>" + data.versions["1.7.2"][key].type + "</div></div>");
				} else {
					versions1.push("<div class='item' data-content='1.7.2'><a href='" + data.versions["1.7.2"][key].url + "' class='link'>" + data.versions["1.7.2"][key].name + "&nbsp;</a><div class='ui right floated blue label'>" + data.versions["1.7.2"][key].type + "</div></div>");
				}
			});


			$("<div/>", {
				class: "ui selection list",
				html: $.merge(versions1, versions)
			}).appendTo("#downloads");
			bindElements();
		});
		// Try getting build artifacts from CircleCi
		var getBuildArtifacts = function() {
		jQuery.ajax("https://circleci.com/api/v1/project/KaminoCoding/CommuMod?circle-token=5d299a175cb039ff37049302a857d708b1d17d05&limit=2", "application/json").success(function (data) {
			var artifacts = [];
			var buildInfo = $.parseJSON(data);
			$.each(buildInfo, function (key, value) {
				if (buildInfo[key] == "build_num") {
					jQuery.ajax("https://circleci.com/api/v1/project/KaminoCoding/CommuMod/" + buildInfo[key].value + "/artifacts?circle-token=5d299a175cb039ff37049302a857d708b1d17d05", "application/json").success(function (rData) {
						var builds = $.parseJSON(rData);
						$.each(builds, function (key1, val1) {
							if (builds[key] == "url") {
								console.warn(rData[key1].val1)
							}
						});
					});
				}
			});
		});
		};
		getBuildArtifacts();

	});

//		});


$(document).ready(function () {

});
