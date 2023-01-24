      google.charts.load('current', {
        'packages': ['geochart'],
      });

      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {

        var str = location.hash.substr(1);
        var f = str || 'IT-65';
        var firstRow = [ 'Code', 'Name' ];

        var arr = [

,         firstRow,

          // reference:
          // https://en.wikipedia.org/wiki/ISO_3166-2:IT

          // regions
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


        choice = [
          firstRow,
        ];

        arr.forEach(function(a,i){

          console.log(a[1].toLowerCase()
            .replace(/['-\s]/ig, ''));

          if(!!a[1].replace(/['-\s]/ig, '').match(new RegExp(f, 'ig'))) {
            console.log('*****');
            choice.push(a);
          }
        });

        var data = google.visualization.arrayToDataTable(choice);

        var options = {

          tooltip: {
//            trigger: 'none'
          },

          // when data value is 'null'
          defaultColor: '#cc0000',

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
        // console.log(chart.getImageURI());
        });


        chart.draw(data, options);

      }


        window.onhashchange = function() {
          window.location.reload();
        }
