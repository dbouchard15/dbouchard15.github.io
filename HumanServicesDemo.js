require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/widgets/Legend",
    "esri/widgets/Zoom"

],

    function(WebMap, MapView, FeatureLayer, Graphic, Locate, Search, Legend, Zoom) {


        // BASEMAP------------------------------------------

        
        var map = new WebMap({
            basemap: "streets-vector",
        });

        // VIEW-----------------------------------------

        var view = new MapView({
            container: "DemoMap",
            map: map,
            center: [-74.531507,40.763888],
            zoom: 9
        });

        // FEATURES AND CUSTOMIZATION--------------------

        var renderer = {
            type: "unique-value",
            field: "Type",
            uniqueValueInfos: [{
                value: "Counseling/Outpatient",
                symbol: {
                    type: "simple-marker",
                    color: [ 27, 153, 139 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "Crisis/Psychiatric Services",
                symbol: {
                    type: "simple-marker",
                    color: [ 227, 101, 91 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "Day Treatment",
                symbol: {
                    type: "simple-marker",
                    color: [ 255, 191, 0 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "Detoxification Services",
                symbol: {
                    type: "simple-marker",
                    color: [ 237, 164, 189 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "Long Term Treatment Services",
                symbol: {
                    type: "simple-marker",
                    color: [ 91, 140, 90 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "Medical",
                symbol: {
                    type: "simple-marker",
                    color: [ 227, 38, 54 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "National Self-Help Organizations",
                symbol: {
                    type: "simple-marker",
                    color: [ 178, 190, 181 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "Residential and Supportive Housing",
                symbol: {
                    type: "simple-marker",
                    color: [ 145, 92, 131 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "Short Term Inpatient Services",
                symbol: {
                    type: "simple-marker",
                    color: [ 255, 153, 102 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            },{
                value: "Support Services, Helplines and Outreach",
                symbol: {
                    type: "simple-marker",
                    color: [ 119, 201, 241 ],
                    outline: {
                        width: 1.5,
                        color: "black"
                    }
                }
            }],
        };

        var resources = new FeatureLayer({
            url: "https://services1.arcgis.com/FRfVDjwlv8hP2VRN/arcgis/rest/services/HumanServiceResources/FeatureServer",
            outFields: ["*"],
            renderer: renderer,
        });

        map.add(resources);

        // LOCATE WIDGET---------------------------------------------------------


        var navGraphic = new Graphic({
            symbol: {
                type: "picture-marker",
                url: "nav.png",
                height: 50,
                width: 50
            }
        });
        
        var locate = new Locate({
            view: view,
            graphic: navGraphic
        });

        // SEARCH WIDGET----------------------------------------------------------

        var searchWidget = new Search({
            view: view,
            allPlaceholder: "Facility (e.g. 'Morristown Memorial Hospital'",
            locationEnabled: false,
            includeDefaultSources: false,
            sources: [{
                layer: resources,
                searchFields: ["Name"],
                displayField: "Name",
                exactMatch: false,
                outFields: ["Name"],
                name: "Facilities",
                placeholder: "Facility (e.g. 'Morristown Memorial Hospital'"
            }],
        });

        // LEGEND-----------------------------------------------------------------

        var legend = new Legend({
            container: legendDiv,
            view: view,
            layerInfos: [{
                layer: resources,
                title: false,
                label: false
            }],
        });

        // FEATURE POPUP----------------------------------------------------------

        resources.popupTemplate = {
            title: "{Name}",
            content: 
            "<b>Type of Service:</b> {Type}" + "<br>" + "<br>" +
            "<b>Address:</b> {Address}"  + "<br>" +
            "<b><a target='_blank' href='https://www.google.com/maps/dir//{GoogleAddress}'> Click here for directions </a></b>" + "<br>" + "<br>" +
            "<b>Phone:</b> {Phone_numb}" + "<br>" + "<br>" +
            "<b>Website:</b> <a target='_blank' href='https://{Website}'> {Website} </a>" + "<br>" + "<br>" +
            "<b>Hours of Operation:</b> {Hours_of_O}" + "<br>" + "<br>" +
            "<b>Additional Information:</b> {Notes}"
        };

        // DROPDOWN FILTER------------------------------------------------
        
        var sqlExpressions = [
            "Lat >= 0",
            "Type = 'Counseling/Outpatient'",
            "Type = 'Crisis/Psychiatric Services'",
            "Type = 'Day Treatment'",
            "Type = 'Detoxification Services'",
            "Type = 'Long Term Treatment Services'",
            "Type = 'Medical'",
            "Type = 'National Self-Help Organizations'",
            "Type = 'Residential and Supportive Housing'",
            "Type = 'Short Term Inpatient Services'",
            "Type = 'Support Services, Helplines and Outreach'"
        ];

        var selectFilter = document.createElement("select");
        selectFilter.setAttribute("class", "esri-widget esri-select");
        selectFilter.setAttribute("style", "width: 275px; font-family: Avenir Next W00; font-size: 1em;");

        sqlExpressions.forEach(function(sql){
            var option = document.createElement("option");
            option.value = sql;
            option.innerHTML = sql;
            selectFilter.appendChild(option);
        });

        function setFeatureLayerFilter(expression) {
            resources.definitionExpression = expression;
        }

        selectFilter.addEventListener('change', function (event) {
            setFeatureLayerFilter(event.target.value);
        });

        // ZOOM ------------------------------------------------------

        var zoom = new Zoom({
            view: view,
        });

        // ADDING WIDGETS----------------------------------------------
        
        view.ui.empty("top-left");
        view.ui.add(zoom, "top-right");
        view.ui.add(searchWidget, "top-left");
        view.ui.add(selectFilter, "top-left");
        view.ui.add(legend, "bottom-right");
        view.ui.add(locate, "top-right");

    });