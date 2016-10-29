import ATV from 'atvjs';

import template from './template.hbs';


let Page = ATV.Page.create({
	name: 'list-games',
    template: template,
    data: function(response) {
        return response;
    },
    ready(options, resolve, reject) {
        let heheGames = 'http://hehestreams.xyz/api/v1/nba/games';
        let key = {
            ApiKey: 'igLnX4x2'
        };
         ATV
        .Ajax
        .get(heheGames, {headers:key})
        .then((xhr) => {
            let response = xhr.response;
            resolve({
                data: response
            });
        }, (xhr) => {
            let response = xhr.response;
            reject({
                status: xhr.status,
                message: response.message
            });
        });
    },
	events: {
		select: 'onSelect'
	},
	onSelect(e) {
		let element = e.target;
		let uuid = element.getAttribute('data-uuid');
		if (uuid) {
			ATV.Navigation.navigate('select-stream', {uuid : uuid});
		}
	}
});

export default Page;