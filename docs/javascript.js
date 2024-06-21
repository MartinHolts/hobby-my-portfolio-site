let currentPage = 1;
const totalPages = 6;

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
