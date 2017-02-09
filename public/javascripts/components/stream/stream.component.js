app.component('stream', {
    templateUrl: '/javascripts/components/stream/stream.html',
    controller: function(twitterService, $interval, $state) {

        this.tweetText = twitterService.tweetText
        this.tweetScores = twitterService.tweetScores
        this.tweetTimes = twitterService.tweetTimes

        Highcharts.chart('container', {
          series: [{
            name: 'Sentiment Score',
            data: this.tweetScores
          }],
          chart: {
            events: {
                load: () => {
                    if (this.series) {
                      let series = this.series[0];
                      $interval(() => {
                          console.log('updating the chart?');
                          console.log(this.tweetText);
                          let x = this.tweetText;
                          let y = this.tweetScores;
                          series.addPoint([x,y], true, true);
                      }, 1000);
                    }
                  }
            }
          },
          title: {
            text: 'Sentiment Analysis'
          },
          xAxis: {
            title: {
              text: 'Time'
            },
            categories: this.tweetText,
            labels: {
              enabled: false
            },
          },
          yAxis: {
            min: -12,
            max: 12,
            title: {
              text: 'Sentiment Score'
            },
          },
          legend: {
            enabled: false
          },
        });

        // this.positiveResults = this.searchResults.filter(tweet => {
        //   return tweet.sentiment.score > 0;
        // });

        // this.percentagePositive = this.positiveResults.length / this.searchResults.length;

        // this.negativeResults = this.searchResults.filter(tweet => {
        //   return tweet.sentiment.score < 0;
        // });

        // this.percentageNegative = this.negativeResults.length / this.searchResults.length;

        // this.zeroResults = this.searchResults.filter(tweet => {
        //   return tweet.sentiment.score === 0;
        // });

        // this.percentageZero = this.zeroResults.length / this.searchResults.length;


    //     Highcharts.chart('piecontainer', {
    //         chart: {
    //             plotBackgroundColor: null,
    //             plotBorderWidth: null,
    //             plotShadow: false,
    //             type: 'pie'
    //         },
    //         title: {
    //             text: 'Sentiment Share'
    //         },
    //         tooltip: {
    //             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //         },
    //         plotOptions: {
    //             pie: {
    //                 allowPointSelect: true,
    //                 cursor: 'pointer',
    //                 dataLabels: {
    //                     enabled: true,
    //                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    //                     style: {
    //                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    //                     }
    //                 }
    //             }
    //         },
    //         series: [{
    //             name: 'Sentiment',
    //             colorByPoint: true,
    //             data: [{
    //                 name: 'Positive',
    //                 //i have an array of sentiment scores [1, 2, 3, 4, -1, -2, -3]
    //                 //i need to push all of the positive sentiments into an array [1, 2, 3, 4]
    //                 //and take the length of that array (4) and divide by length of original array
    //                 //
    //                 y: this.percentagePositive
    //             }, {
    //                 name: 'Negative',
    //                 //i have an array of sentiment scores [1, 2, 3, 4, -1, -2, -3]
    //                 //i need to push all of the negative sentiments into an array [-1, -2, -3]
    //                 //add together the value of the negative sentiment array [-6]
    //                 //-6
    //                 y: this.percentageNegative,
    //                 sliced: true,
    //                 selected: true
    //             // }, {
    //             //     name: 'Zero',
    //             //     y: this.percentageZero

    //             }]
    //         }]
    //     });
    
        
    }
});
