/**
 * this object is intended to check the current URL and "redirect" to the correct object
 */
var router = {

	/**
	 * datamembers
	 */

	// routes to test, with an url pattern (the regex to test) and the object it points to
	_routesToTest: [
			{
				urlPattern: /\w{2}\/example_url\/?.*?/, //this will redirect all requests of type /en/example_url/something to "mysite.example" and call its init method.
				targetObj: mysite.example
			},
			// "default" route
			{
				urlPattern: /\w{2}\/?.*?/,
				targetObj: mysite.dashboard
			}
		],

	/**
	 * functionality
	 */

	init: function() {
		mysite._page = router._getRouteToObject();
		if(mysite._page && mysite._page.init) mysite._page.init();
	},


	_getRouteToObject 					: function() {

		//very simple: run tests on which object to use.
		for(var i in router._routesToTest) {
			var current = router._routesToTest[i];
			//does it match?
			if(current.urlPattern.test(document.location.href) && current.targetObj) {
				//yes it does; return the object and get out of here!
				return current.targetObj;
			}
		}
		console.error('No route found!');

	}
};