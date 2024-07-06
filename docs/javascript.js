let currentPage = 1;
const totalPages = 2;

document.addEventListener('DOMContentLoaded', init);

function init() {
	document.getElementById("prevBtn").addEventListener("click", function (event) {
		event.preventDefault();
		prevPage();
		addClickAnimation("prevBtn");
	});

	document.getElementById("nextBtn").addEventListener("click", function (event) {
		event.preventDefault();
		nextPage();
		addClickAnimation("nextBtn");
	});

	document.querySelectorAll('.pagination a[data-page]').forEach(function (pageLink) {
		pageLink.addEventListener("click", function (event) {
			event.preventDefault();
			showPage(parseInt(this.getAttribute('data-page').replace('page', '')));
			addClickAnimation(this.id);
		});
	});

	// Initialize the first page view
	showPage(currentPage);
}

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
	var button = document.getElementById(buttonId);
	button.classList.add('clicked');
	setTimeout(function () {
		button.classList.remove('clicked');
	}, 200);
}


document.addEventListener("DOMContentLoaded", function () {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.header-right a');

	function scrollSpy() {
		let scrollY = window.scrollY;

		sections.forEach(current => {
			const sectionHeight = current.offsetHeight;
			const sectionTop = current.offsetTop - 50; // Adjust offset as needed

			sectionId = current.getAttribute('id');

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				navLinks.forEach(link => {
					link.classList.remove('active');
					if (link.getAttribute('href') === `#${sectionId}`) {
						link.classList.add('active');
					}
				});
			}
		});

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

	window.addEventListener('scroll', scrollSpy);
});

