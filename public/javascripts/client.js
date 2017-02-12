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

	.state('stream', {
		url: '/stream',
		template: `<stream></stream>`
	})

	.state('about', {
		url: '/about',
		template: `
		<h1>About</h1>
		<div class="about">
	    <p>
	      Tweetalyze is a data visualization tool which displays real-time sentiment
	      analysis of tweets on any given topic.
			</p>
			<p>
				Users of this app range from social media managers and brand specialists who wish to see
				how their audience is responding to their brand launch or social media campaign, to Twitter
				users who are watching a live event and want to see the real-time sentiment of the viewing
				audience.
			</p>
			<p>This project was built with:</p>
				<ul>
					<li><a href="https://nodejs.org/en/" target="_blank">Node.js</a></li>
					<li><a href="http://expressjs.com/" target="_blank">Express.js</a></li>
					<li><a href="https://github.com/thinkroth/Sentimental" target="_blank">Sentimental npm</a></li>
					<li><a href="https://dev.twitter.com/streaming/overviewTwitter" target="_blank"> Streaming API</a></li>
					<li><a href="https://angularjs.org/" target="_blank">Angular.js 1.6</a></li>
					<li><a href="http://www.highcharts.com/" target="_blank">Highcharts.js</a> and the <a href="https://github.com/pablojim/highcharts-ng" target="_blank">highcharts-ng Angular wrapper</a></li>
				</ul>
			<p>Plans for future development include: </p>
				<ul>
					<li>Build out additional charts such as pie charts and word clouds</li>
					<li>Ability to filter tweets by location to drill down the sentiment of regions of interest </li>
					<li>A creative workaround of the Twitter API limitations on running two search queries at once so we can compare multiple search queries</li>
					<li>Scalability</ul>
				</ul>

			<p>
				Tweetalyze was developed in a 1-week sprint by <a href="https://github.com/ccparkhurst" target="_blank">Christina
	    	Parkhurst</a> (@ccparkhurst) and <a href="https://github.com/wallerGoble" target="_blank">Waller Goble</a> (@wallergoble).
			</p>
	  </div>
		<div class="footer">
	    <span><a ui-sref="index">Back to Home Page</a></span></br>

	  </div>


		`
	})
});
