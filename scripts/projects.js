projects = shadowContainer.querySelectorAll('.projects');

fetch('/json/projects.json').then((response) => {
	response.json().then((data) => {
		data.personal.map((d) => {
			projects[0].append(buildProject(d));
		});
		data.professional.map((d) => {
			projects[1].append(buildProject(d));
		});
	});
});

buildProject = (d) => {
	const project = document.createElement('div'),
		title = document.createElement('div'),
		description = document.createElement('div'),
		link = document.createElement('a');
	project.classList.add('project');
	project.style.setProperty('--background-image', 'url(' + d.image + ')');
	project.style.setProperty('--text', 'var(--gray0');
	title.innerText = d.name;
	title.classList.add('project-title');
	description.innerText = d.description;
	description.classList.add('project-description');
	if (d.repoLink) {
		link.innerText = 'Repo Link';
		link.setAttribute('href', d.repoLink);
	}
	description.append(link);
	project.append(title, description);
	project.addEventListener('click', () => {
		window.location.href = d.siteLink;
	});
	return project;
};
