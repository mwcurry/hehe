import ATV from 'atvjs';

import template from './template.hbs';

let Page = ATV.Page.create({
	name: 'select-stream',
	type: 'modal',
	template: template,
    ready(options, resolve, reject) {
        console.log(options.title);
        let streamList = 'http://hehestreams.xyz/api/v1/nba/games/' + options.uuid + '/streams'
         ATV
        .Ajax
        .get(streamList, {headers : ATV.Settings.get("header")})
        .then((xhr) => {
            let response = {
                title: options.title,
                stream: xhr.response
            }
            resolve({
                data: response
            });
        }, (xhr) => {
            let response = xhr.response;
            console.log(response);
            reject({
                status: xhr.status,
                message: response.error
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