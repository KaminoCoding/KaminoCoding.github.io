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
			$('#builds .item')
				.popup({
					on: 'hover',
					title: 'Build',
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
					versions1.push("<div class='item' data-content='1.7.10'><a href='" + data.versions["1.7.10"][key].url + "' class='light-link'>" + data.versions["1.7.10"][key].name + "&nbsp;</a><div class='ui right floated red label'>" + data.versions["1.7.10"][key].type + "</div></div>");
				} else {
					versions1.push("<div class='item' data-content='1.7.10'><a href='" + data.versions["1.7.10"][key].url + "' class='light-link'>" + data.versions["1.7.10"][key].name + "&nbsp;</a><div class='ui right floated blue label'>" + data.versions["1.7.10"][key].type + "</div></div>");
				}

			});
			var versions = [];
			$.each(data.versions["1.7.2"], function (key, val) {
				if (data.versions["1.7.2"][key].type == "beta" | data.versions["1.7.2"][key].type == "alpha") {
					versions1.push("<div class='item' data-content='1.7.2'><a href='" + data.versions["1.7.2"][key].url + "' class='light-link'>" + data.versions["1.7.2"][key].name + "&nbsp;</a><div class='ui right floated red label'>" + data.versions["1.7.2"][key].type + "</div></div>");
				} else {
					versions1.push("<div class='item' data-content='1.7.2'><a href='" + data.versions["1.7.2"][key].url + "' class='light-link'>" + data.versions["1.7.2"][key].name + "&nbsp;</a><div class='ui right floated blue label'>" + data.versions["1.7.2"][key].type + "</div></div>");
				}
			});


			$("<div/>", {
				class: "ui selection list",
				html: $.merge(versions1, versions)
			}).appendTo("#downloads");

		});
		// Try getting build artifacts from CircleCi



			var artifacts = [];
			// This works to get the JSON and loop through items
			jQuery.getJSON("https://circleci.com/api/v1/project/KaminoCoding/CommuMod?circle-token=bc8edde1a6cefb853e1e5236445e427c4983e970&limit=6", function (data2) {
				$.each(data2, function (index, value) {
					artifacts.push("<div class='item' data-content='"+data2[index].status+"'><a href='"+data2[index].build_url+"#artifacts' class='light-link'>Build Number: "+data2[index].build_num+"</a></div>")
				});
				$('<div/>', {
					class: 'ui selection list',
					html: artifacts
				}).appendTo("#builds");
				bindElements();
			});



	});
