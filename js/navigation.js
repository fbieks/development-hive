/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

(function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuItems = mobileNav.querySelectorAll('a');
  let isMenuOpen = false;

  // Toggle the mobile navigation when hamburger menu is clicked
  hamburgerMenu.addEventListener('click', () => {
    
    isMenuOpen = !isMenuOpen;

    hamburgerMenu.classList.toggle('change');
    mobileNav.classList.toggle('hide');
    hamburgerMenu.setAttribute('aria-expanded', !isMenuOpen);
    mobileNav.setAttribute('aria-hidden', isMenuOpen);

    // Set focus on the first menu item when the menu opens
    if (isMenuOpen  || window.innerWidth >= 960 ) {
      enableMenuFocus();

    } else {
      disableMenuFocus();
      hamburgerMenu.focus();
    }
  });


// Close the mobile navigation when clicking outside the menu
document.addEventListener('click', (event) => {
  let target = event.target;
  isMenuOpen = !mobileNav.classList.contains('hide');

  if (
    isMenuOpen &&
    !mobileNav.contains(target) &&
    !hamburgerMenu.contains(target) &&
    window.innerWidth < 960
  ) 
  {
    isMenuOpen = false;
    hamburgerMenu.classList.remove('change');
    mobileNav.classList.add('hide');
    hamburgerMenu.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    disableMenuFocus();
  }
});



// Close the mobile navigation when a menu item is clicked
menuItems.forEach((item) => {
  item.addEventListener('click', () => {

    if (window.innerWidth < 960){

    isMenuOpen = false;
    hamburgerMenu.classList.remove('change');
    mobileNav.classList.add('hide');
    hamburgerMenu.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    disableMenuFocus();

  }
  });
});


  // Watch for resize
  window.addEventListener('resize', function () {
    let isMenuHidden = mobileNav.classList.contains('hide');

    if (window.innerWidth >= 960 && isMenuHidden) {

      mobileNav.classList.remove('hide');
      hamburgerMenu.classList.remove('change');
      hamburgerMenu.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      enableMenuFocus();

    }

    if (window.innerWidth < 960 && !isMenuHidden) {
      hamburgerMenu.classList.remove('change');
      mobileNav.classList.add('hide');
      disableMenuFocus();
    }
  });

  
  // Highlight current nav title---------------------------------
  window.addEventListener('popstate', () => {
    
    let links = document.querySelectorAll('.mobile-nav li a');

    function highlightCurrent() {
      
      let currentLink = document.querySelector('.mobile-nav li a#current');
      if (currentLink) {
        currentLink.removeAttribute('id');
      }

      for (let i = 0; i < links.length; i++) {
        if (links[i].href === document.URL) {
          links[i].id = 'current';
          break;
        }
      }
    }

    // Initial highlighting on page load
    highlightCurrent();

});



// Enables focus on the menu items.
function enableMenuFocus() {
menuItems.forEach((item) => {
  item.tabIndex = 0;
});
}

// Disables focus on the menu items.
function disableMenuFocus() {
menuItems.forEach((item) => {
  item.tabIndex = -1;
});
}


})();
