import ATV from 'atvjs';

import template from './template.hbs';

let Page = ATV.Page.create({
	name: 'select-stream',
	type: 'modal',
	template: template,
    data: function(response) {
        return response;
    },
    ready(options, resolve, reject) {
    	//http://hehestreams.xyz/api/v1/nba/games/b4d071386ba15a5b/streams
        let streamList = 'http://hehestreams.xyz/api/v1/nba/games/' + options.uuid + '/streams'
        let key = {
            ApiKey: 'igLnX4x2'
        };
         ATV
        .Ajax
        .get(streamList, {headers:key})
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
		let url = element.getAttribute('data-url');
		if (url) {
			var player = new Player();
			player.playlist = new Playlist();
			var video = new MediaItem('video', url)
			video.title = 'Title';
			player.playlist.push(video);
			player.play();
		}
	}
});

export default Page;