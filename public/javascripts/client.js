'use strict'; // Keeps our code clean

const app = angular.module('tweetalyze', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

	// If the user goes astray, redirect to /home
	// $urlRouterProvider.otherwise('/index');

	$stateProvider

	// Landing page, primarily filled with login component
	.state('index', {
		url: '/index',
		template: `<login></login>`
	})

  .state('sentimentSearch', {
    url: '/search',
    template: `<sentiment-search></sentiment-search>`
  })

  .state('sentimentShow', {
    url: '/show',
    template: `<sentiment-show></sentiment-show>`
  })
});
