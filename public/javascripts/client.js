'use strict'; // Keeps our code clean

const app = angular.module('tweetalyze', ['ui.router']);

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


});
