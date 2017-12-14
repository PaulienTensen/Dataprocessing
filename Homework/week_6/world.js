/*

Naam: Paulien Tensen
Vak: Dataprocessing
Studentnummer: 10511559

bron: http://jsbin.com/nutawiboci/1/edit?html,output
*/

//basic map config with custom fills, mercator projection
var map = new Datamap({
        scope: 'world',
        element: document.getElementById('container1'),
        projection: 'mercator',
        height: 500,
        fills: {
          defaultFill: 'lightgreen',
          lt50: '#a50f15',
          gt50: '#de2d26', 
          lk50: '#fb6a4a',
          sk50: '#fc9272',
          lk50: '#fcbba1', 
          ss50: '#fee5d9'
        },
        
        data: {
          MEX: {fillKey: 'lt50' },
          BRA: {fillKey: 'sk50' },
          AUS: {fillKey: 'lt50' },
          FRA: {fillKey: 'lk50' },
          TUR: {fillKey: 'gt50'},
          SVK: {fillKey: 'ss50' }      
        }
})
          
     //bubbles, custom popup on hover template
     map.bubbles([
       {name: 'Total of drugs-related deaths: 378', latitude: 19.432608, longitude: -99.133209, radius: 8, country: "Mexico" , fillKey: 'lt50'},
       {name: 'Total of drugs-related deaths: 200', latitude: 	-15.790669, longitude: -47.892967, radius: 6, country: "Brazil", fillKey: 'sk50'},
       {name: 'Total of drugs-related deaths: 1808', latitude: -37.663712, longitude: 144.844788, radius: 12, country: "Australia", fillKey: 'lt50'},
       {name: 'Total of drugs-related deaths: 147', latitude: 	48.864716, longitude: 2.349014, radius: 6, country: "France", fillKey: 'lk50'},
       {name: 'Total of drugs-related deaths: 497', latitude: 41.015137	, longitude: 28.979530, radius: 6, country: "Turkey", fillKey: 'gt50'},
       {name: 'Total of drugs-related deaths: 48', latitude: 48.142109, longitude: 17.100235, radius: 6, country: "Slovakia", fillkey: 'ss50'}

     ], {
       
       popupTemplate: function(geo, data) {
       return "<div class='hoverinfo'>" + data.country + ":  " + data.name + "</div>";
       }
     });
      
      