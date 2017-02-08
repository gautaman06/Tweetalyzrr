app.component('show', {
    templateUrl: '/javascripts/components/show/show.html',
    controller: function(twitterService) {
      this.searchResults = twitterService.searchResults;

      //remove tweets with sentiment score of zero
      this.searchData = this.searchResults
                        .filter(tweet => {
                          return tweet.sentiment.score !== 0;
                        });
      console.log('data in the show component', this.searchData);

      // this.data.average = this.data.map(tweet => tweet.sentiment.score)
      //                              .reduce( (a, b) => a + b) / results.length;
      // console.log(this.data)
      this.x = this.searchData.map(tweet => {
        return tweet.time
      });
      this.y = this.searchData.map(tweet => {
        return tweet.sentiment.score
      });
console.log('this should be data with no zero sentiment scores', this.y);
        Highcharts.chart('container', {
          title: {
            text: 'Sentiment Analysis'
          },
          xAxis: {
            categories: this.x
          },
          series: [{
            data: this.y
          }]
        });
        Highcharts.chart('piecontainer', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Sentiment Share'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Sentiment',
                colorByPoint: true,
                data: [{
                    name: 'Positive',
                    y: 56.33
                }, {
                    name: 'Negative',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }]
            }]
        });


        // Pull in stream http get req
        // this.stream = sentiment.stream;
        // socket.on('tweet', function (data) {
        //     console.log("here is a tweet");
        //     console.log(data);
        // });
    }
});
