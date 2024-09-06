document.addEventListener('DOMContentLoaded', init);

function init() {
	const pagination = createPaginationHandler(1, 2);
	pagination.showPage(1);

	// Attach event listeners
	document.querySelector('.pagination').addEventListener("click", pagination.handlePaginationClick);
	document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
	window.addEventListener('scroll', scrollSpy);
}

function createPaginationHandler(initialPage, totalPages) {
	let currentPage = initialPage;

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			showPage(currentPage);
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			showPage(currentPage);
		}
	}

	function showPage(page) {
		currentPage = page;
		console.log('Showing page:', currentPage);

		document.querySelectorAll('.content').forEach(function (content) {
			content.classList.remove('active');
		});

		document.getElementById(`page${currentPage}`).classList.add('active');

		// Update the pagination active link
		document.querySelectorAll('.pagination a').forEach(function (link) {
			link.classList.remove('active');
		});

		document.querySelector(`.pagination a[data-page="page${currentPage}"]`).classList.add('active');
	}

	function addClickAnimation(buttonId) {
		const button = document.getElementById(buttonId);
		button.classList.add('clicked');
		setTimeout(function () {
			button.classList.remove('clicked');
		}, 200);
	}

	function handlePaginationClick(event) {
		event.preventDefault();
		const target = event.target;

		if (target.id === "prevBtn") {
			prevPage();
			addClickAnimation("prevBtn");
		} else if (target.id === "nextBtn") {
			nextPage();
			addClickAnimation("nextBtn");
		} else if (target.matches('.pagination a[data-page]')) {
			const page = parseInt(target.getAttribute('data-page').replace('page', ''));
			showPage(page);
			addClickAnimation(target.id);
		}
	}

	return {
		handlePaginationClick,
		showPage,
	};
}

function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.target; // Explicitly use event.target to reference the form

	// Collect form data
	const formData = {
		Name: form.Name.value,
		Email: form.Email.value,
		Subject: form.Subject.value,
		Message: form.Message.value
	};

	// Send the email using EmailJS
	emailjs.send('service_vgucitn', 'template_aluilhb', formData)
		.then(function (response) {
			alert('Message sent successfully!');
		}, function (error) {
			alert('Failed to send message, please try again later.');
		});
}

function scrollSpy() {
	// Selecting Sections and Navigation Links
	const navLinks = document.querySelectorAll('.header-right a');
	const sections = document.querySelectorAll('section[id]');

	// Capturing Scroll Position
	let scrollY = window.scrollY;

	// Loop Through Sections
	sections.forEach(current => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50; // Adjust offset as needed
		const sectionId = current.getAttribute('id');

		// Handling "About" for both heading-hero and about sections
		if (sectionId === 'heading-hero' || sectionId === 'about') {
			const aboutSectionTop = document.getElementById('heading-hero').offsetTop - 50;
			const aboutSectionHeight = document.getElementById('about').offsetTop + document.getElementById('about').offsetHeight - aboutSectionTop;

			if (scrollY > aboutSectionTop && scrollY <= aboutSectionTop + aboutSectionHeight) {
				navLinks.forEach(link => {
					link.classList.remove('active');
					if (link.getAttribute('href') === '#about') {
						link.classList.add('active');
					}
				});
			}
		} else {
			// Checking If the Section is in View
			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				navLinks.forEach(link => {
					link.classList.remove('active');
					if (link.getAttribute('href') === `#${sectionId}`) {
						link.classList.add('active');
					}
				});
			}
		}
	});

	// Special Case for the Contact Section
	// Activate "Contact" link specifically when scrolling near the contact section
	const contactSection = document.getElementById('contact');
	const contactTop = contactSection.offsetTop - 350; // Adjust offset as needed

	if (scrollY > contactTop) {
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === '#contact') {
				link.classList.add('active');
			}
		});
	}
}
