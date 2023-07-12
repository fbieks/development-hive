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
    if (isMenuOpen) {
      enableMenuFocus();
      // menuItems[0].focus();
    } else {
      disableMenuFocus();
      hamburgerMenu.focus();
    }
  });

// Close the mobile navigation when clicking outside the menu
document.addEventListener('click', (event) => {
  const target = event.target;
  isMenuOpen = !mobileNav.classList.contains('hide');

  if (
    isMenuOpen &&
    !mobileNav.contains(target) &&
    !hamburgerMenu.contains(target)
  ) {
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
    isMenuOpen = false;

    hamburgerMenu.classList.remove('change');
    mobileNav.classList.add('hide');
    hamburgerMenu.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    disableMenuFocus();
  });
});




  // Watch for resize
  window.addEventListener('resize', function () {
    const isMenuHidden = mobileNav.classList.contains('hide');

    if (window.innerWidth >= 720 && isMenuHidden) {
      mobileNav.classList.remove('hide');
      hamburgerMenu.classList.remove('change');
      enableMenuFocus();
    }

    if (window.innerWidth < 720 && !isMenuHidden) {
      hamburgerMenu.classList.remove('change');
      mobileNav.classList.add('hide');
      disableMenuFocus();
    }

    if (isMenuHidden !== isHamburgerMenuChanged) {
      hamburgerMenu.setAttribute('aria-expanded', !isMenuHidden);
      mobileNav.setAttribute('aria-hidden', isMenuHidden);
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
// --------------------------------------------------------------------

links.forEach((link) => {
  // link.addEventListener('click', () => {
  //   highlightCurrent();
  // });

  // Toggle focus for keyboard accessibility
  link.addEventListener('focus', toggleFocus);
  link.addEventListener('blur', toggleFocus);
});
});

/**
* Enables focus on the menu items.
*/
function enableMenuFocus() {
menuItems.forEach((item) => {
  item.tabIndex = 0;
});
}

/**
* Disables focus on the menu items.
*/
function disableMenuFocus() {
menuItems.forEach((item) => {
  item.tabIndex = -1;
});
}

// Disable focus on menu items initially
disableMenuFocus();




})();
