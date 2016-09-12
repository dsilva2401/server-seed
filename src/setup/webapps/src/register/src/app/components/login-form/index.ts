import {Component} from '@angular/core';
import {IPersonWithCredentials} from '../../../../../../../../core/interfaces/IPersonWithCredentials';
import {config} from '../../../../../../../../config';
import {Response, Http} from '@angular/http';

@Component({
	styles: [require('./style.styl').toString()],
	template: require('./template.jade')(),
})
export class LoginComponent {

	// Attributes
		person: IPersonWithCredentials;
		$http: Http;

	// Methods
		constructor ($http: Http) {
			this.$http = $http;
			this.person = {
				name: '',
				lastname: '',
				sex: '',
				birthday: new Date(),
				email: '',
				password: ''
			};
		}
		submit () {
			let url = config.servers.proxy.url + config.httpRoutes.auth.services.register.url;
			this.$http.post(url, this.person).subscribe(
				(resp: Response) => {
					window.location.href = config.httpRoutes.views.services.login.path;
				},
				(resp: Response) => {
					console.warn('Error:', resp);
					alert('Please check personal data');
				}
			);
			console.log(this.person, url);
		}

}