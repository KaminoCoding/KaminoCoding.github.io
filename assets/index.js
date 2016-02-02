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
					inline: true
				});
			$('#builds .item')
				.popup({
					on: 'hover',
					transition: 'slide up',
					title: 'Build',
					inline: true,
					variation: 'inverted'
				});
			$('.ui.accordion')
					.accordion();
            $('.ui.accordion')
                .accordion({
                selectors: {
                    trigger: '.title'
                }
            });
			/*$('.ui.dropdown.button') .dropdown({ on: 'hover', transition: 'fly up' });*/
		};


		//			$("button").click(function () {
		jQuery.getJSON("http://widget.mcf.li/mc-mods/minecraft/220860-commumod.json", function (data) {
			var versions2 = [];
			$.each(data.versions["1.8"], function (key, val) {
				if (data.versions["1.8"][key].type == "beta" | data.versions["1.8"][key].type == "alpha") {
					versions1.push("<div class='item' data-content='1.8'><a href='" + data.versions["1.8"][key].url + "' class='light-link'>" + data.versions["1.8"][key].name + "&nbsp;</a><div class='ui right floated red label'>" + data.versions["1.8"][key].type + "</div></div>");
				} else {
					versions1.push("<div class='item' data-content='1.8'><a href='" + data.versions["1.8"][key].url + "' class='light-link'>" + data.versions["1.8"][key].name + "&nbsp;</a><div class='ui right floated blue label'>" + data.versions["1.8"][key].type + "</div></div>");
				}

			});
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
			bindElements();
		});
		// Try getting build artifacts from CircleCi


			var testArtifacts = [];
			var artifacts = [];
			// This works to get the JSON and loop through items
			jQuery.getJSON("https://circleci.com/api/v1/project/KaminoCoding/CommuMod?circle-token=bc8edde1a6cefb853e1e5236445e427c4983e970&limit=100", function (data2) {
				$.each(data2, function (index, value) {

					if (data2[index].status == "failed"){
						artifacts.push("<div class='item' data-content='"+data2[index].status+"' id='failed'><a href='"+data2[index].build_url+"#artifacts' class='light-link'>Build Number: "+data2[index].build_num+"</a></div>")

					}
					if (data2[index].status == "fixed"){
						artifacts.push("<div class='item' data-content='"+data2[index].status+"' id='fixed'><a href='"+data2[index].build_url+"#artifacts' class='light-link'>Build Number: "+data2[index].build_num+"</a></div>")

					}
					artifacts.push("<div class='item' data-content='"+data2[index].status+"'><a href='"+data2[index].build_url+"#artifacts' class='link'>Build Number: "+data2[index].build_num+"</a></div>")
				});
				$('<div/>', {
					class: 'ui selection list',
					html: artifacts
				}).appendTo("#builds");

				bindElements();
			});


	});
