app.component('stream', {
    templateUrl: '/javascripts/components/stream/stream.html',
    controller: function(twitterService, $log, $scope, $interval, $state) {

      this.tweetText = twitterService.tweetText;
      this.tweetScores = twitterService.tweetScores;
      this.tweetTimes = twitterService.tweetTimes;
      this.filteredResponse = twitterService.filteredResponse;
      this.positiveResults = twitterService.positiveResults;
<<<<<<< HEAD
      this.positivePercentage = twitterService.positivePercentage;
      console.log('these are the positive results:', this.positiveResults);
      this.negativePercentage = twitterService.negativePercentage;
      console.log('these are the positive results:', this.positiveResults);

=======

      
      // Need this to restart stream
      this.query = twitterService.query;
      this.restartStream = () => {
        twitterService.restartStream(this.query);
        this.poll();
      }
>>>>>>> Buttons to start, stop, restart, and search a different term are all bueno
      // this.positiveResults = this.filteredResponse.filter(tweet => { tweet.tweetScores > 0 });
      // console.log('positive results:', this.positiveResults);
      //
      // this.percentagePositive = this.positiveResults.length / this.filteredResponse.length;
      // console.log('percentage positive:',this.percentagePositive);
      //
      // this.negativeResults = this.filteredResponse.filter(tweet => {
      //   return tweet.tweetScores < 0;
      // });
      //
      // this.percentageNegative = this.negativeResults.length / this.filteredResponse.length;
  
      this.chartConfig = {
          options: {
              chart: {
                  type: 'area'
              }
          },

          title: {
              text: 'Sentiment Analysis'
          },
          yAxis: {
              min: -15,
              max: 15,
              title: {
                  text: 'Sentiment Score'
              }
          },
          xAxis: {
              title: {
                  text: 'Time'
              },
              categories: this.tweetText,
              labels: {
                enabled: false
              },
              type: 'datetime',
              minTickInterval: 100,
              minRange: 0,
              maxRange: 100 * 5
          },
          legend: {
            enabled: false
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: false
                  },
                  enableMouseTracking: true
              }
          },
          series: [
              {
                  zones: [{
                    value: 0,
                    color: '#ED4337'
                  }],
                  name: 'Sentiment Score',
                  data: this.tweetScores
              }
          ]
      };
      this.poll = () => {
          this.interval = $interval(() => {
              twitterService.getUpdate();

              // Here is where you could poll a REST API or the websockets service for live data
              // this.chartConfig.series[0].data.shift();
              // this.chartConfig.series[0].data.push(Math.floor(Math.random() * 20) + 1);
              this.poll();

          }, 3000);

      };
      // Starts polling process
      this.$onInit = () => {
          twitterService.getUpdate();
          this.poll();

      }; // End of chartConfig

      // Function to stop polling
      this.stopPoll = () => {  
        twitterService.stopPolling();
        $interval.cancel(this.interval);
        console.log('stopPoll function hit');  
      };



      this.chartConfig2 = {
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
                    y: this.positivePercentage
                }, {
                    name: 'Negative',
                    color: '#ED4337',
                    y: this.negativePercentage,
                    sliced: true,
                    selected: true
                }]
            }]
      };

  } // End of controller
}); // End of component
