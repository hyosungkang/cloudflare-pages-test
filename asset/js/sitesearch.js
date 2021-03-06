
	window.ss360Config = {
	siteId: "voyager.nz_2",
	searchBox: {
		selector: "input[name='q']",
		searchButton: '#sitesearch'
	},
	suggestions: {
		showImages: false,
		forceBelow: true
	},
	layout: {
		mobile: {
			showImages: false
		},
		desktop: {
			showImages: false
		},
		
	},
	callbacks: {
		preRender: function (results) {
			for (var i = 0; i < results['_'].length; i++) {
				results['_'][i]['link'] = results['_'][i]['link'].replace("https://voyager.nz", "{{ .Site.Params.site_url }}");
			}
			
			return results;
		}
	},
	results: {
		searchQueryParamName: 'q'
	}
}

var e = document.createElement("script");
e.type = "text/javascript";
e.async = !0;
e.src = "https://cdn.sitesearch360.com/v13/sitesearch360-v13.min.js";
document.getElementsByTagName("body")[0].appendChild(e);
