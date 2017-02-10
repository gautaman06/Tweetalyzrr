// 
// app.component('show', {
//     templateUrl: '/javascripts/components/show/show.html',
//     controller: function(twitterService) {
//       this.searchResults = twitterService.searchResults;
//       // this.tweetText = twitterService.tweetText;
//       console.log('this is the tweetText:',this.tweetText);
//
//       //remove tweets with sentiment score of zero
//       this.searchData = this.searchResults
//                         .filter(tweet => {
//                           return tweet.sentiment.score !== 0;
//                         });
//       this.tweetText = this.searchData
//                         .map(tweet => {
//                           return tweet.text;
//                         });
//
//       console.log('data in the show component', this.searchData);
//
//       // this.data.average = this.data.map(tweet => tweet.sentiment.score)
//       //                              .reduce( (a, b) => a + b) / results.length;
//       // console.log(this.data)
//       this.x = this.searchData.map(tweet => {
//         return tweet.time
//       });
//       this.y = this.searchData.map(tweet => {
//         return tweet.sentiment.score
//       });
//       console.log('this should be data with no zero sentiment scores', this.y);
//
//         Highcharts.chart('container', {
//           title: {
//             text: 'Sentiment Analysis'
//           },
//           xAxis: {
//             title: {
//               text: 'Time'
//             },
//             categories: this.tweetText,
//             labels: {
//               enabled: false
//             },
//           },
//           yAxis: {
//             min: -12,
//             max: 12,
//             title: {
//               text: 'Sentiment Score'
//             },
//           },
//           legend: {
//             enabled: false
//           },
//           series: [{
//             zones: [{
//               value: 0,
//               color: '#ED4337'
//             }],
//             name: 'Sentiment Score',
//             data: this.y
//           }]
//         });
//
//         this.positiveResults = this.searchResults.filter(tweet => {
//           return tweet.sentiment.score > 0;
//         });
//
//         this.percentagePositive = this.positiveResults.length / this.searchResults.length;
//
//         this.negativeResults = this.searchResults.filter(tweet => {
//           return tweet.sentiment.score < 0;
//         });
//
//         this.percentageNegative = this.negativeResults.length / this.searchResults.length;
//
//         this.zeroResults = this.searchResults.filter(tweet => {
//           return tweet.sentiment.score === 0;
//         });
//
//         this.percentageZero = this.zeroResults.length / this.searchResults.length;
//
//         Highcharts.chart('piecontainer', {
//             chart: {
//                 plotBackgroundColor: null,
//                 plotBorderWidth: null,
//                 plotShadow: false,
//                 type: 'pie'
//             },
//             title: {
//                 text: 'Sentiment Share'
//             },
//             tooltip: {
//                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//             },
//             plotOptions: {
//                 pie: {
//                     allowPointSelect: true,
//                     cursor: 'pointer',
//                     dataLabels: {
//                         enabled: true,
//                         format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                         style: {
//                             color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//                         }
//                     }
//                 }
//             },
//             series: [{
//                 name: 'Sentiment',
//                 colorByPoint: true,
//                 data: [{
//                     name: 'Positive',
//                     y: this.percentagePositive
//                 }, {
//                     name: 'Negative',
//                     y: this.percentageNegative,
//                     color: '#ED4337',
//                     sliced: true,
//                     selected: true
//                 }]
//             }]
//         });
//     }
// });

// app.component('show', {
//     templateUrl: '/javascripts/components/show/show.html',
//     // bindings: {
//     //     chartConfig: '<'
//     // },
//     controller: function(twitterService, $log, $timeout, $scope) {
//       this.searchResults = twitterService.searchResults;
//
//           this.chartConfig = {
//               options: {
//                   chart: {
//                       type: 'area'
//                   }
//               },
//
//               title: {
//                   text: 'Network Usage - Last 60 Minutes'
//               },
//               yAxis: {
//                   title: {
//                       text: 'Throughput MBit/s'
//                   }
//               },
//               xAxis: {
//                   title: {
//                       text: 'Minutes'
//                   },
//                   categories: ['-55', '-50', '-45', '-40', '-35', '-30',
//                       '-25', '-20', '-15', '-10', '-05', '0']
//               },
//               plotOptions: {
//                   line: {
//                       dataLabels: {
//                           enabled: true
//                       },
//                       enableMouseTracking: true
//                   }
//               },
//               series: [
//                   {
//                       name: 'Inbound',
//                       data: [29.9, 71.5, 25.4, 43.2, 37.0, 33.0, 35.6, 48.5, 21.4, 19.1, 16.6, 54.4]
//                   },
//                   {
//                       name: 'Outbound',
//                       data: [19.3, 56.3, 23.1, 38.5, 32.9, 27.0, 30.6, 42.3, 17.4, 12.0, 9.1, 34.0]
//                   }
//               ]
//           };
//
//           this.poll = () => {
//               $timeout(() => {
//                   // Here is where you could poll a REST API or the websockets service for live data
//                   this.chartConfig.series[0].data.shift();
//                   this.chartConfig.series[0].data.push(Math.floor(Math.random() * 20) + 1);
//                   this.chartConfig.series[1].data.shift();
//                   this.chartConfig.series[1].data.push(Math.floor(Math.random() * 20) + 1);
//                   this.poll();
//               }, 500);
//           };
//
//           this.$onInit = () => {
//               $log.log("hello");
//               this.poll();
//           };
//
//       }
//
//       // this.tweetText = twitterService.tweetText;
//       // console.log('this is the tweetText:',this.tweetText);
//
//       remove tweets with sentiment score of zero
//       this.searchData = this.searchResults
//                         .filter(tweet => {
//                           return tweet.sentiment.score !== 0;
//                         });
//       console.log('data in the show component', this.searchData);
//
//       this.data.average = this.data.map(tweet => tweet.sentiment.score)
//                                    .reduce( (a, b) => a + b) / results.length;
//       console.log(this.data)
//       this.x = this.searchData.map(tweet => {
//         return tweet.time
//       });
//       this.y = this.searchData.map(tweet => {
//         return tweet.sentiment.score
//       });
//       console.log('this should be data with no zero sentiment scores', this.y);
//
//
//
//
//
//         // Highcharts.chart('container', {
//         //   title: {
//         //     text: 'Sentiment Analysis'
//         //   },
//         //   xAxis: {
//         //     title: {
//         //       text: 'Time'
//         //     },
//         //     categories: this.tweetText,
//         //     labels: {
//         //       enabled: false
//         //     },
//         //   },
//         //   yAxis: {
//         //     min: -12,
//         //     max: 12,
//         //     title: {
//         //       text: 'Sentiment Score'
//         //     },
//         //   },
//         //   legend: {
//         //     enabled: false
//         //   },
//         //   series: [{
//         //     name: 'Sentiment Score',
//         //     data: this.y
//         //   }]
//         // });
//
//         this.positiveResults = this.searchResults.filter(tweet => {
//           return tweet.sentiment.score > 0;
//         });
//
//         this.percentagePositive = this.positiveResults.length / this.searchResults.length;
//
//         this.negativeResults = this.searchResults.filter(tweet => {
//           return tweet.sentiment.score < 0;
//         });
//
//         this.percentageNegative = this.negativeResults.length / this.searchResults.length;
//
//         this.zeroResults = this.searchResults.filter(tweet => {
//           return tweet.sentiment.score === 0;
//         });
//
//         this.percentageZero = this.zeroResults.length / this.searchResults.length;
//
//
//         Highcharts.chart('piecontainer', {
//             chart: {
//                 plotBackgroundColor: null,
//                 plotBorderWidth: null,
//                 plotShadow: false,
//                 type: 'pie'
//             },
//             title: {
//                 text: 'Sentiment Share'
//             },
//             tooltip: {
//                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//             },
//             plotOptions: {
//                 pie: {
//                     allowPointSelect: true,
//                     cursor: 'pointer',
//                     dataLabels: {
//                         enabled: true,
//                         format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                         style: {
//                             color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//                         }
//                     }
//                 }
//             },
//             series: [{
//                 name: 'Sentiment',
//                 colorByPoint: true,
//                 data: [{
//                     name: 'Positive',
//                     //i have an array of sentiment scores [1, 2, 3, 4, -1, -2, -3]
//                     //i need to push all of the positive sentiments into an array [1, 2, 3, 4]
//                     //and take the length of that array (4) and divide by length of original array
//                     //
//                     y: this.percentagePositive
//                 }, {
//                     name: 'Negative',
//                     //i have an array of sentiment scores [1, 2, 3, 4, -1, -2, -3]
//                     //i need to push all of the negative sentiments into an array [-1, -2, -3]
//                     //add together the value of the negative sentiment array [-6]
//                     //-6
//                     y: this.percentageNegative,
//                     sliced: true,
//                     selected: true
//                 // }, {
//                 //     name: 'Zero',
//                 //     y: this.percentageZero
//
//                 }]
//             }]
//         });
//     // },
//
// });
