// DOM Elements

const darkButton = document.getElementById('dark'),
	lightButton = document.getElementById('light'),
	solarButton = document.getElementById('solar'),
	body = document.body;

//   Apply the cached theme on reload
const theme = localStorage.getItem('theme');
const isSolar = localStorage.getItem('isSolar');

if (theme) {
	body.classList.add(theme);
	isSolar && body.classList.add('solar');
}

solarButton.innerText = isSolar ? 'normalize' : 'solarize';

// Button Event Handlers

darkButton.onclick = () => {
	body.classList.replace('light', 'dark');
	localStorage.setItem('theme', 'dark');
};
lightButton.onclick = () => {
	body.classList.replace('dark', 'light');
	localStorage.setItem('theme', 'light');
};

solarButton.onclick = () => {
	if (body.classList.contains('solar')) {
		body.classList.remove('solar');
		solarButton.innerText = 'solarize';
		localStorage.removeItem('isSolar');
		solarButton.style.cssText = `--bg-solar: var(--yellow)`;
	} else {
		body.classList.add('solar');
		solarButton.innerText = 'normalize';
		localStorage.setItem('isSolar', true);
		solarButton.style.cssText = `--bg-solar: white`;
	}
};

const router = new Router({
	default: 'about',
	routes: {
		404: {
			view: './views/404.html',
			style: './styles/404.css',
		},
		about: {
			view: './views/about.html',
			style: './style/about.css',
		},
		resume: {
			view: './views/resume.html',
			style: './styles/resume.css',
		},
		projects: {
			view: './views/projects.html',
			style: './styles/projects.css',
			script: './scripts/projects.js',
		},
	},
});

console.log(router);
