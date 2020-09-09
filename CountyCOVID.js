require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/FeatureTable"
],

    function( Webmap, MapView, FeatureLayer, Legend, FeatureTable) {

        // BASEMAP--------------------------------------------------------------------------------
        
        var map = new Webmap({
            basemap: "gray-vector",
        });

        // VIEW-----------------------------------------------------------------------------------

        var view = new MapView({
            container: "COVIDMap",
            map: map,
            center: [-74.512986,40.878093],
            zoom: 10,
        });

        // RENDERERS-------------------------------------------------------------------------------

        var municipalitiesRenderer = {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: [ 0, 0, 0, 0 ],
                outline: {
                    color: "black",
                    width: "2px",
                    style: "solid"
                },
            }
        };

        var casesRenderer = {
            type: "simple",
            symbol: {
                type: "simple-fill",
            },
            visualVariables: [{
                type: "color",
                field: "GIS.MCGIS.TBL_HEALTH_COVID19_CASES.CONFIRMED",
                stops: [
                    { value: 0, color: [ 255, 248, 167 ] },
                    { value: 750, color: [ 193, 4, 37 ] }
                    // { value: , color: }
                    // { value: , color: }
                    // { value: , color: }
                ]
            }]
        };

        var schoolsRenderer = {
            type: "simple",
            symbol: {
                type: "simple-marker",
                style: "circle",
                color: [ 52, 229, 235 ],
                size: "6px",
                outline: {
                    color: [ 0, 0, 0 ],
                    width: "1px",
                }
            }
        };

        // var hospitalsRenderer = {
        //     type: "simple",
        //     symbol: {
        //         type: "simple-marker",
        //         style: "cross",
        //         size: "16px",
        //         outline: {
        //             color: [ 235, 52, 52 ],
        //             width: "3px"
        //         }
        //     }
        // };

        // LABELING--------------------------------------------------------------------------------

        var casesLabel = {
            symbol: {
                type: "text",
                color: "black",
                haloColor: "white",
                haloSize: "1px",
                font: {
                    size: 9,
                    weight: "bold",
                }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature['GIS.MCGIS.TBL_HEALTH_COVID19_CASES.CONFIRMED']"
        },
        maxScale: 0,
        minScale: 25000000
        };

         // POPUP TEMPLATES-----------------------------------------

         var casesTemplate = {
            content: "<b>{GIS.MCGIS.Municipalities.Label}</b> has <b>{GIS.MCGIS.TBL_HEALTH_COVID19_CASES.CONFIRMED}</b> confirmed cases."
        };
        
        // LAYERS----------------------------------------------------------------------------------

        var municipalities = new FeatureLayer({
            url: "https://morrisgisapps.co.morris.nj.us/arcgis105/rest/services/HealthServices/COVID_19/MapServer/2",
            title: "Municipalities",
            outfields: ["*"],
            popupEnabled: true,
            renderer: municipalitiesRenderer
        });

        var hospitals = new FeatureLayer({
            url: "https://morrisgisapps.co.morris.nj.us/arcgis105/rest/services/HealthServices/COVID_19/MapServer/0",
            title: "Long-term Care Facilities",
            outfields: ["*"],
            definitionExpression: "FacilityName LIKE '%hospital%'",
            // renderer: hospitalsRenderer
        });

        var schools = new FeatureLayer({
            url: "https://morrisgisapps.co.morris.nj.us/arcgis105/rest/services/HealthServices/COVID_19/MapServer/1",
            title: "Schools",
            outfields: ["*"],
            renderer: schoolsRenderer
        });

        var cases = new FeatureLayer({
            url: "https://morrisgisapps.co.morris.nj.us/arcgis105/rest/services/HealthServices/COVID_19/MapServer/2",
            title: "Cases",
            renderer: casesRenderer,
            labelingInfo: [ casesLabel ],
            popupTemplate: casesTemplate,
        });

        map.add(municipalities);
        map.add(cases);
        map.add(hospitals);
        map.add(schools);
        
        // WIDGETS--------------------------------------------------

        
        var legend = new Legend({
            view: view,
            layerInfos: [
                { layer: cases},
                { layer: hospitals},
                { layer: schools },
            ]
        });

        var featureTable = new FeatureTable({
            view: view,
            layer: cases,
            container: "tableDIV",
            fieldConfigs: [
                {
                    name: "GIS.MCGIS.Municipalities.Label",
                    label: "Municipality",
                    direction: "asc"
                },{
                    name: "GIS.MCGIS.TBL_HEALTH_COVID19_CASES.CONFIRMED",
                    label: "Confirmed Cases",
                }],
        });

        view.ui.add(legend, "bottom-right");
    
    }

    
);