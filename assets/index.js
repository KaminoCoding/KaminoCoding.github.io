// Parse a JSON file for data on CommuMod release versions
$ ( document )
    .ready ( function () {
        var bindElements = function () {
            $ ( '.ui.menu .dropdown' )
                .dropdown ();
            $ ( '.dropdown' )
                .dropdown ( {
                    on : 'hover',
                    allowCategorySelection : true,
                    transition : 'drop'
                } );
            $ ( '.ui.popup' )
                .popup ();
            $ ( '#downloads .item' )
                .popup ( {
                    on : 'hover',
                    transition : 'fade up',
                    title : 'Minecraft Version',
                    inline : true
                } );
            $ ( '#builds .item' )
                .popup ( {
                    on : 'hover',
                    transition : 'slide up',
                    title : 'Build',
                    inline : true,
                    variation : 'inverted'
                } );
            $ ( '.ui.accordion' )
                .accordion ();
            $ ( '.ui.accordion' )
                .accordion ( {
                    selectors : {
                        trigger : '.title'
                    }
                } );
            $('.ui.modal')
                .modal();
            $('.ui.modal')
                .modal('attach events', '#reportBugButton', 'toggle');
            /*$('.ui.dropdown.button') .dropdown({ on: 'hover', transition: 'fly up' });*/
        };


        //			$("button").click(function () {
        jQuery.getJSON ( "http://widget.mcf.li/mc-mods/minecraft/220860-commumod.json", function ( data ) {
            var versions = [];
            $.each ( data.versions[ "1.8" ], function ( key, val ) {
                if ( data.versions[ "1.8" ][ key ].type == "beta" || data.versions[ "1.8" ][ key ].type == "alpha" ) {
                    versions.push ( "<div class='item' data-content='1.8'><a href='" + data.versions[ "1.8" ][ key ].url + "' class='light-link'>" + data.versions[ "1.8" ][ key ].name + "&nbsp;</a><div class='ui right floated red label'>" + data.versions[ "1.8" ][ key ].type + "</div></div>" );
                } else {
                    versions.push ( "<div class='item' data-content='1.8'><a href='" + data.versions[ "1.8" ][ key ].url + "' class='light-link'>" + data.versions[ "1.8" ][ key ].name + "&nbsp;</a><div class='ui right floated blue label'>" + data.versions[ "1.8" ][ key ].type + "</div></div>" );
                }

            } );
            var versions1 = [];
            $.each ( data.versions[ "1.7.10" ], function ( key, val ) {
                if ( data.versions[ "1.7.10" ][ key ].type == "beta" || data.versions[ "1.7.10" ][ key ].type == "alpha" ) {
                    versions1.push ( "<div class='item' data-content='1.7.10'><a href='" + data.versions[ "1.7.10" ][ key ].url + "' class='light-link'>" + data.versions[ "1.7.10" ][ key ].name + "&nbsp;</a><div class='ui right floated red label'>" + data.versions[ "1.7.10" ][ key ].type + "</div></div>" );
                } else {
                    versions1.push ( "<div class='item' data-content='1.7.10'><a href='" + data.versions[ "1.7.10" ][ key ].url + "' class='light-link'>" + data.versions[ "1.7.10" ][ key ].name + "&nbsp;</a><div class='ui right floated blue label'>" + data.versions[ "1.7.10" ][ key ].type + "</div></div>" );
                }

            } );
            var versions2 = [];
            $.each ( data.versions[ "1.7.2" ], function ( key, val ) {
                if ( data.versions[ "1.7.2" ][ key ].type == "beta" || data.versions[ "1.7.2" ][ key ].type == "alpha" ) {
                    versions2.push ( "<div class='item' data-content='1.7.2'><a href='" + data.versions[ "1.7.2" ][ key ].url + "' class='light-link'>" + data.versions[ "1.7.2" ][ key ].name + "&nbsp;</a><div class='ui right floated red label'>" + data.versions[ "1.7.2" ][ key ].type + "</div></div>" );
                } else {
                    versions2.push ( "<div class='item' data-content='1.7.2'><a href='" + data.versions[ "1.7.2" ][ key ].url + "' class='light-link'>" + data.versions[ "1.7.2" ][ key ].name + "&nbsp;</a><div class='ui right floated blue label'>" + data.versions[ "1.7.2" ][ key ].type + "</div></div>" );
                }
            } );


            $ ( "<div/>", {
                class : "ui selection list",
                html : $.merge ( versions, versions1, versions2 )
            } ).appendTo ( "#downloads" );
            bindElements ();
        } );
        // Try getting build artifacts from CircleCi
//console.log(data3[i].path.split('/').pop());<-- This finds the paths based on the forwards slash being a delimiter

        var testArtifacts = [];
        var artifacts = [];
        // This works to get the JSON and loop through items
        /*jQuery.getJSON ( "https://circleci.com/api/v1/project/KaminoCoding/CommuMod/tree/release/V.-2.0?circle-token=bc8edde1a6cefb853e1e5236445e427c4983e970&limit=40" ).done ( function ( data2 ) {
            var data = [];
            var index;
            for ( index = 1; index < data2.length; index++ ) {
                $.getJSON ( "https://circleci.com/api/v1/project/KaminoCoding/CommuMod/" + data2[ index ].build_num + "/artifacts?circle-token=bc8edde1a6cefb853e1e5236445e427c4983e970" ).done ( function ( data3 ) {
                    data.push ( data3.data );
                } );
            }

            $.each ( data, function ( i, v ) {
                if ( data2[ index ].status === "failed" ) {
                    artifacts.push ( "<div class='item' data-content='" + data2[ index ].status + "' id='failed'><a href='" + data[ i ].url + "' class='light-link'>Build Number: " + data2[ index ].build_num + "</a></div>" );
                }
                else if ( data2[ index ].status === "fixed" ) {
                    artifacts.push ( "<div class='item' data-content='" + data2[ index ].status + "' id='fixed'><a href='" + data[ i ].url + "' class='light-link'>Build Number: " + data2[ index ].build_num + "</a></div>" );
                }
                else {
                    artifacts.push ( "<div class='item' data-content='" + data2[ index ].status + "'><a href='" + data[ i ].url + "' class='link'>Build Number: " + data2[ index ].build_num + "</a></div>" );
                }
            } );
            console.log ( artifacts );
            console.log ( data );
            $ ( '<div/>', {
                class : 'ui selection list',
                html : artifacts
            } ).appendTo ( "#buildsEight" );
            bindElements ();
        } );*/

        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:bdbef4df-716e-4717-919f-076a3ad57fed'
        });

        // Initialize the Cognito Sync client

        /*AWS.config.credentials.get(function(){

            var syncClient = new AWS.CognitoSyncManager();

            syncClient.openOrCreateDataset('myDataset', function(err, dataset) {

                dataset.put('myKey', 'myValue', function(err, record){

                    dataset.synchronize({

                        onSuccess: function(data, newRecords) {
                            // Your handler code here
                        }

                    });

                });

            });

        });*/
        var chance = new Chance();
        var s3Artifacts = [];
        var s3artifact = [];
        var grpName = "io.cyb3rwarri0r8.commumod";
        var modName = "CommuMod";
        var baseURL = "http://commumod-artifacts.s3.amazonaws.com/";
        var url;
        var s3URLs = [];
        var s3ArtifactURLs = [];
        var s3Path = [];

        var pathPattern = new RegExp(/\b(\w+\-\w+)\/(\w+\.\w+\.\w+)\/(\w+)\/(\d\.\d|\d\.\d\.\d)\-(\d\.\d\.\d|\d\.\d\.\d\.\d)\/(\w+)\-(\d\.\d|\d\.\d\.\d)\-(\d\.\d\.\d|\d\.\d\.\d\.\d)\.jar\b/g);
        var s3 = new AWS.S3();
        s3.listObjects({Bucket: 'commumod-artifacts', Prefix: 'CommuMod-Builds'}, function (e, resp) {
            console.log(resp);
            $.each(resp["Contents"], function ( key3, value ) {
                s3Artifacts.push(value);
            });
            console.log(s3Artifacts);
            $.each(s3Artifacts, function ( key, value6 ) {
                console.log(s3Artifacts[key]);
                if ( s3Artifacts[key].Key ) {
                    var path = s3Artifacts[key].Key;
                    s3Path.push(path);
                    console.log(s3Path);
                }
            });
            console.log(s3Path);
            var url = filterArtifacts(s3Path, baseURL);

            $('<div/>', {
                class: "ui selection list",
                html: url
            } ).appendTo('#buildsEight');
            bindElements();
        } );
        function filterArtifacts(path, bURL) {
            for (var i = 1; i < path.length; i++) {
                if (path[i] == path[i].match(pathPattern)) {
                    console.log(path[i]);
                    var matchGroups = pathPattern.exec(path[i]);
                    console.log(pathPattern.exec(path[i]));
                    s3ArtifactURLs.push("<div class='item' data-content='" + matchGroups[4]+"-"+matchGroups[5] + "' id=''><a href='" + bURL+path[i] + "' class='link'>" + matchGroups[4]+"-"+matchGroups[5] + "</a></div>")
                }else {
                    console.log("The URL "+path[i]+" does not link to a jar")
                }
            }
            console.log(s3ArtifactURLs);
            return s3ArtifactURLs;
        }

        var token = "15bfd9bffc7a214e40bc98a8eaf9231f6f20dc15";

    });
$(document).ready(function() {
    $('#submitM').click(function () {
        $('#bugSubmit').form('submit');
    });

    $('#bugSubmit').submit(function (e) {
        e.preventDefault();
        var sum = [];
        $('#bugSubmit').each(function () {

        });
    })
});