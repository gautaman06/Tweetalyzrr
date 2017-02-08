app.component('show', {
    templateUrl: '/javascripts/components/show/show.html',
    controller: function(twitterService) {
      this.searchResults = twitterService.searchResults;
      // this.tweetText = twitterService.tweetText;
      console.log('this is the tweetText:',this.tweetText);

      //remove tweets with sentiment score of zero
      this.searchData = this.searchResults
                        .filter(tweet => {
                          return tweet.sentiment.score !== 0;
                        });
      this.tweetText = this.searchData
                        .map(tweet => {
                          return tweet.text;
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
          series: [{
            zones: [{
              value: 0,
              color: '#ED4337'
            }],
            name: 'Sentiment Score',
            data: this.y
          }]
        });

        this.positiveResults = this.searchResults.filter(tweet => {
          return tweet.sentiment.score > 0;
        });

        this.percentagePositive = this.positiveResults.length / this.searchResults.length;

        this.negativeResults = this.searchResults.filter(tweet => {
          return tweet.sentiment.score < 0;
        });

        this.percentageNegative = this.negativeResults.length / this.searchResults.length;

        this.zeroResults = this.searchResults.filter(tweet => {
          return tweet.sentiment.score === 0;
        });

        this.percentageZero = this.zeroResults.length / this.searchResults.length;

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
                    y: this.percentagePositive
                }, {
                    name: 'Negative',
                    y: this.percentageNegative,
                    color: '#ED4337',
                    sliced: true,
                    selected: true
                }]
            }]
        });
    }
});
