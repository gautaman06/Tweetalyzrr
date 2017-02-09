app.component('stream', {
    templateUrl: '/javascripts/components/stream/stream.html',
    controller: function(twitterService) {


        this.streamResults = twitterService.streamResults;
        console.log('these are the stream results:', this.streamResults);


this.searchResults = twitterService.searchResults;
      this.tweetText = twitterService.tweetText;
      console.log('this is the tweetText:',this.tweetText);

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
                    //i have an array of sentiment scores [1, 2, 3, 4, -1, -2, -3]
                    //i need to push all of the positive sentiments into an array [1, 2, 3, 4]
                    //and take the length of that array (4) and divide by length of original array
                    //
                    y: this.percentagePositive
                }, {
                    name: 'Negative',
                    //i have an array of sentiment scores [1, 2, 3, 4, -1, -2, -3]
                    //i need to push all of the negative sentiments into an array [-1, -2, -3]
                    //add together the value of the negative sentiment array [-6]
                    //-6
                    y: this.percentageNegative,
                    sliced: true,
                    selected: true
                // }, {
                //     name: 'Zero',
                //     y: this.percentageZero

                }]
            }]
        });
    
        
    }
});
