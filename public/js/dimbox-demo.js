var lastScrollTop = 0;
var header = document.querySelector('header');
var hideHeaderBreakpoint = 100;
var menuBtn = document.getElementById('menuBtn');
var menuLinks = document.querySelectorAll('header nav a');
var closeMenuBreakpoint = 768;
var hugeImgLink = document.querySelector('a[data-dimbox="hugeImageSample"]');

/**
 * Sets header hidden when needed.
 */
function setHeader() {
    // Get current scrollTop
    var st = document.documentElement.scrollTop;

    if (st > lastScrollTop) {
        // We're going down below breakpoint, hide header
        header.classList.remove('show');
    } else if (st < lastScrollTop) {
        // We're going up, show header
        header.classList.add('show');
    }

    if (st > hideHeaderBreakpoint) {
        // We're below breakpoint
        document.body.classList.add('header-fixed');
    } else if (st == 0) {
        document.body.classList.remove('header-fixed');
    }
    // Update lastScrollTop
    lastScrollTop = st;
}

/**
 * Toggles main menu state open/closed.
 */
function toggleMainMenu() {
    var menuState = mainMenuOpen();
    document.body.classList.toggle('main-menu-open', !menuState);
    menuBtn.setAttribute('aria-expanded', !menuState);
}

/**
 * Checks if the main menu is open or not.
 * 
 * @returns {boolean}
 */
function mainMenuOpen() {
    return document.body.classList.contains('main-menu-open');
}

/**
 * Close menu if window is resized above breakpoint
 */
function setMenuOnResize() {
    if (window.innerWidth >= closeMenuBreakpoint) {
        document.body.classList.remove('main-menu-open');
    }
}

function menuLinkClick() {
    // Hide menu on mobile
    document.body.classList.remove('main-menu-open');

    // Hide header with a slight delay
    setTimeout(function() {
        header.classList.remove('show');
    }, 1000);
}

function hugeImgLinkClick(e) {
    var url = new URL(e.target.getAttribute('href'));
    url.searchParams.set('v', Date.now());
    e.target.href = url;
}

menuBtn.addEventListener('click', toggleMainMenu);
window.addEventListener('resize', setMenuOnResize);
window.addEventListener('resize', setHeader);
window.addEventListener('scroll', setHeader);
//hugeImgLink.addEventListener('click', hugeImgLinkClick);

// Loop through menu links
for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', menuLinkClick);
}

dimbox.setConfig({
    onBeforeOpen: function() {
        console.log('onBeforeOpen fired');
        header.classList.remove('show');
    },
    onXhrComplete: function(response) {
        var container = document.querySelector('.dimbox-ajax-content');
        var contentStr = '<img src="' + response.icon_url + '" class="ajax-example-img" alt="Chuck Norris" />';
        contentStr += '<h1>Random Chuck Norris joke</h1>';
        contentStr += '<p>' + response.value + '</p>';
        contentStr += '<p>This example is loaded from <a href="https://api.chucknorris.io/jokes/random" target="_blank">https://api.chucknorris.io/jokes/random</a></p>';
        container.innerHTML = contentStr;
    }
});
