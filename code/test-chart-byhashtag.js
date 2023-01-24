/* builds a chart:
 * - with default color for country regions
 * - with highlight color for specific region
 * - using the ISO_3166-2:IT codes as keys?
 * - exporting the result to PNG image format
**/

google.charts.load('current', {
  'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {

  var snip = window.location.hash.substr(1);
  var f = snip || 'IT-62'; // default is lazio

  var g = getCodeByName(f);

  var arr = [
    ['State', 'Region'],

    /* regions */

    // abruzzo
    [ 'IT-65' , null ],

    // basilicata
    [ 'IT-77' , null ],

    // calabria
    [ 'IT-78' , null ],

    // campania
    [ 'IT-72' , null ],

    // emiliaromagna
    [ 'IT-45' , null ],

    // lazio
    [ 'IT-62' , null ],

    // liguria
    [ 'IT-42' , null ],

    // lombardia
    [ 'IT-25' , null ],

    // marche
    [ 'IT-57' , null ],

    // molise
    [ 'IT-67' , null ],

    // piemonte
    [ 'IT-21' , null ],

    // puglia
    [ 'IT-75' , null ],

    // toscana
    [ 'IT-52' , null ],

    // umbria
    [ 'IT-55' , null ],

    // veneto
    [ 'IT-34' , null ],


    /* autonomous regions */

    // friuliveneziagiulia
    [ 'IT-36' , null ],

    // sardegna
    [ 'IT-88' , null ],

    // sicilia
    [ 'IT-82' , null ],

    // trentinoaltoadige
    [ 'IT-32' , null ],

    // valledaosta
    [ 'IT-23' , null ],
  ];

  arr.forEach(function(a,i){
    console.log(a[0].replace(/\s/, ''))
    if(!!a[0].replace(/\s/, '').match(new RegExp(g, 'ig'))) {
      arr[i][1] = 1;
    }
  });

  var data = google.visualization.arrayToDataTable(arr);

  // reference:
  // https://en.wikipedia.org/wiki/ISO_3166-2:IT

  var options = {

    colorAxis: {
      colors: [ 'maroon' ],
    },

    tooltip:
    {
      trigger: 'none'
    },

    // when data value is 'null'
    defaultColor: '#ff88aa',

    legend: 'none',

    // country code works
    region: 'IT',

    // state-level
    resolution: 'provinces'
  };

  var imgmap = document.getElementById('ngimg');
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  google.visualization.events.addListener(chart, 'ready', function () {
    imgmap.src = chart.getImageURI();
  });
  
  chart.draw(data, options);
}


window.onhashchange = function() {
  window.location.reload();
}



function getCodeByName(str) {

  str = str || 'lazio';
  found = false;

  const arr = [
    [ 'IT-65' , 'Abruzzo' ],
    [ 'IT-77' , 'Basilicata' ],
    [ 'IT-78' , 'Calabria' ],
    [ 'IT-72' , 'Campania' ],
    [ 'IT-45' , 'Emilia-Romagna' ],
    [ 'IT-62' , 'Lazio' ],
    [ 'IT-42' , 'Liguria' ],
    [ 'IT-25' , 'Lombardia' ],
    [ 'IT-57' , 'Marche' ],
    [ 'IT-67' , 'Molise' ],
    [ 'IT-21' , 'Piemonte' ],
    [ 'IT-75' , 'Puglia' ],
    [ 'IT-52' , 'Toscana' ],
    [ 'IT-55' , 'Umbria' ],
    [ 'IT-34' , 'Veneto' ],

    // autonomous regions
    [ 'IT-36' , 'Friuli Venezia Giulia' ],
    [ 'IT-88' , 'Sardegna' ],
    [ 'IT-82' , 'Sicilia' ],
    [ 'IT-32' , 'Trentino-Alto Adige' ],
    [ 'IT-23' , 'Valle d\'Aosta' ],
  ];

  arr.forEach(function(a,i){

    if(!!a[1].replace(/['-\s]/ig, '')
      .match(new RegExp(str, 'ig'))) {

      found = a[0];
    }
  });

  return found;
}
