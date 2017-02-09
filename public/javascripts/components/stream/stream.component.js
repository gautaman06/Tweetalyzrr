app.component('stream', {
    templateUrl: '/javascripts/components/stream/stream.html',
    controller: function(twitterService, $log, $timeout, $scope, $interval, $state) {

      this.tweetText = twitterService.tweetText;
      this.tweetScores = twitterService.tweetScores;
      this.tweetTimes = twitterService.tweetTimes;
      this.filteredResponse = twitterService.filteredResponse;
      this.positiveResults = twitterService.positiveResults;
      $timeout(() => {console.log('positive results:', this.positiveResults)}, 2000);

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
              min: -12,
              max: 12,
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
          $timeout(() => {
              console.log('polling twitter service')
              twitterService.getUpdate();
              // Here is where you could poll a REST API or the websockets service for live data
              // this.chartConfig.series[0].data.shift();
              // this.chartConfig.series[0].data.push(Math.floor(Math.random() * 20) + 1);
              this.poll();
          }, 2000);
      };

      this.$onInit = () => {
          $log.log("hello");
          this.poll();
      }; // End of chartConfig

  } // End of controller
}); // End of component
