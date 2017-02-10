'use strict'; // Keeps our code clean

const app = angular.module('tweetalyze', ['ui.router', 'highcharts-ng']);

app.config(function($stateProvider, $urlRouterProvider) {

	// If the user goes astray, redirect to /home
	$urlRouterProvider.otherwise('/index');

	$stateProvider

	// Landing page, primarily filled with login component
	.state('index', {
		url: '/index',
		template: `<search></search>`
	})

	.state('show', {
		url: '/show',
		template: `<show></show>`
	})

	.state('stream', {
		url: '/stream',
		template: `<stream></stream>`
	})
	.state('about', {
		url: '/about',
		template: `
		<div class="about">
	    <p>
	      Tweetalyze is a data visualization tool which displays real-time sentiment
	      analysis of tweets on any given topic. It is built on a Node.js backend paired
	      with an AngularJS 1.6 frontend. The Twitter Streaming API provides the real-time
	      Twitter stream, and the Node.js Sentimental package performs the
	      sentiment analysis. HighCharts.js coupled with the highcharts-ng
	      Angular wrapper is used for charting.
	    </p>
	  </div>
		`
	})

});
