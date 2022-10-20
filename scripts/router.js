class Router {
	constructor(options) {
		this.routes = options.routes;
		this.defaultRoute = options.default;
		this.currentRoute;
		// this.routing = Promise.resolve();

		// Create Containers
		const mainContainer = document.createElement('main');
		mainContainer.id = 'routerMainContainer';
		mainContainer.attachShadow({ mode: 'open' });
		document.body.appendChild(mainContainer);

		const transitionContainer = document.createElement('main');
		transitionContainer.id = 'routerTransitionContainer';
		document.body.appendChild(transitionContainer);

		window.onhashchange = this.hashChanged.bind(this);
		this.hashChanged();
	}

	hashChanged() {
		const newHash = window.location.hash.substr(1);

		// Default route if hash is empty
		if (!newHash) {
			this.to(this.defaultRoute);
		} else if (!newHash != window.currentRoute) {
			this.to(newHash);
		}
	}
	to(routeName, options) {
		const mainContainer = document.getElementById('routerMainContainer'),
			transitionContainer = document.getElementById(
				'routerTransitionContainer'
			);
		mainContainer.shadowRoot.innerHTML = ``;
		if (this.routes.hasOwnProperty(routeName)) {
			fetch(this.routes[routeName].view)
				.then((response) => response.text())
				.then((htmlString) => {
					const fragment = new Range().createContextualFragment(htmlString);
					mainContainer.shadowRoot.appendChild(fragment);
					// Sets the hash for the route for javascript routing
					window.location.hash = routeName;

					// Sets the hash for anchor tags that shouldn't load to a new route
					document
						.querySelectorAll('[data-normalize-hash]')
						.forEach((domEl) => {
							domEl.setAttribute('href', '#' + routeName);
						});
					if (this.routes[routeName].script) {
						const script = document.createElement('script');
						script.setAttribute('src', `/scripts/${routeName}.js`);
						script.setAttribute('defer', 'defer');
						mainContainer.shadowRoot.appendChild(script);
					}
					if (this.routes[routeName].style) {
						const styleSheet = document.createElement('link');
						styleSheet.setAttribute('rel', 'stylesheet');
						styleSheet.setAttribute('href', `/styles/${routeName}.css`);
						mainContainer.shadowRoot.appendChild(styleSheet);
					}
				});
		} else {
			this.to('404');
		}
	}
}
