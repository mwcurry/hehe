import ATV from 'atvjs';

// template helpers
import 'lib/template-helpers';
// raw css string
import css from 'assets/css/app.css';
// shared templates
import loaderTpl from 'shared/templates/loader.hbs';
import errorTpl from 'shared/templates/error.hbs';
// all pages
import 'pages';


var config = require('./config.json');


ATV.start({
	style: css,
	templates: {
		loader: loaderTpl,
		error: errorTpl,
		// status level error handlers
		status: {
			'404': () => errorTpl({
				title: '404',
				message: 'Page cannot be found!'
			}),
			'500': () => errorTpl({
				title: '500',
				message: 'An unknown error occurred in the application. Please try again later.'
			}),
			'503': () => errorTpl({
				title: '503',
				message: 'An unknown error occurred in the application. Please try again later.'
			})
		}
	},
	// global handlers
	handlers: {
		select: {
			showMore(e) {
				let element = e.target;
				let showDescription = element.getAttribute('allowsZooming');

				if (showDescription) {
						(`<document><alertTemplate><description class="text-justified">${element.textContent}</description></alertTemplate></document>`);
				}
			}
		}
	},
	onLaunch() {
		var key = JSON.parse(config).key;
        ATV.Settings.set("header", {ApiKey: key});
		ATV.Navigation.navigate('list-games');
	},
	onResume() {
		ATV.Navigation.navigate('list-games');
	}
});