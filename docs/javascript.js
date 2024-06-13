
function openImg(imgName) {
	var i, x;
	x = document.getElementsByClassName("picture");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	document.getElementById(imgName).style.display = "block";
}


var currentPage = 1;
var totalPages = 6;

function showPage(pageId) {
	// Hide all content
	var contents = document.getElementsByClassName('content');
	for (var i = 0; i < contents.length; i++) {
		contents[i].classList.remove('active');
	}

	// Remove active class from all pagination links
	var links = document.querySelectorAll('.pagination a');
	for (var i = 0; i < links.length; i++) {
		links[i].classList.remove('active');
	}

	// Show the selected page
	document.getElementById(pageId).classList.add('active');

	// Add active class to the clicked link
	var activeLink = document.querySelector('.pagination a[onclick="showPage(\'' + pageId + '\')"]');
	if (activeLink) {
		activeLink.classList.add('active');
	}

	// Update current page number
	currentPage = parseInt(pageId.replace('page', ''));
}

function prevPage() {
	if (currentPage > 1) {
		currentPage--;
		showPage('page' + currentPage);
		addClickAnimation('prevBtn');
	}
}

function nextPage() {
	if (currentPage < totalPages) {
		currentPage++;
		showPage('page' + currentPage);
		addClickAnimation('nextBtn');
	}
}

function addClickAnimation(buttonId) {
	var button = document.getElementById(buttonId);
	button.classList.add('clicked');
	setTimeout(function () {
		button.classList.remove('clicked');
	}, 200);
}

// Initial call to showPage to set the active page
showPage('page1');