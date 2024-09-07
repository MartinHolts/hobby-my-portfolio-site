"use strict";
document.addEventListener('DOMContentLoaded', init);
function init() {
    const pagination = createPaginationHandler(1, 2);
    pagination.showPage(1);
    // Attach event listeners
    const paginationElement = document.querySelector('.pagination');
    if (paginationElement) {
        paginationElement.addEventListener("click", pagination.handlePaginationClick);
    }
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
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
        document.querySelectorAll('.content').forEach((content) => {
            content.classList.remove('active');
        });
        const pageElement = document.getElementById(`page${currentPage}`);
        if (pageElement) {
            pageElement.classList.add('active');
        }
        document.querySelectorAll('.pagination a').forEach((link) => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`.pagination a[data-page="page${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    function addClickAnimation(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 200);
        }
    }
    function handlePaginationClick(event) {
        event.preventDefault();
        const target = event.target;
        if (target.id === "prevBtn") {
            prevPage();
            addClickAnimation("prevBtn");
        }
        else if (target.id === "nextBtn") {
            nextPage();
            addClickAnimation("nextBtn");
        }
        else if (target.matches('.pagination a[data-page]')) {
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
    const form = event.target;
    // Collect form data
    const formData = {
        Name: form.elements.namedItem('Name').value,
        Email: form.elements.namedItem('Email').value,
        Subject: form.elements.namedItem('Subject').value,
        Message: form.elements.namedItem('Message').value
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
            const headingHero = document.getElementById('heading-hero');
            const aboutSection = document.getElementById('about');
            const aboutSectionTop = headingHero.offsetTop - 50;
            const aboutSectionHeight = aboutSection.offsetTop + aboutSection.offsetHeight - aboutSectionTop;
            if (scrollY > aboutSectionTop && scrollY <= aboutSectionTop + aboutSectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#about') {
                        link.classList.add('active');
                    }
                });
            }
        }
        else {
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
