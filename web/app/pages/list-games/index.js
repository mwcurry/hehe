import ATV from 'atvjs';

import template from './template.hbs';
let Page = ATV.Page.create({
	name: 'list-games',
    template: template,
    data(response) {
        console.log(response);
        return response;
    },
    ready(options, resolve, reject) {
        let heheGames = 'http://hehestreams.xyz/api/v1/nba/games';
        ATV
        .Ajax
        .get(heheGames, {headers : ATV.Settings.get("header")})
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
        let title = element.getAttribute('data-title');
		if (uuid) {
			ATV.Navigation.navigate('select-stream', {uuid : uuid});
		}
	}
});

export default Page;