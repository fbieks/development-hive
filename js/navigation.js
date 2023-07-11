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

  // Toggle the mobile navigation when hamburger menu is clicked
  hamburgerMenu.addEventListener('click', () => {
    const isMenuOpen = mobileNav.classList.contains('hide');

    hamburgerMenu.classList.toggle('change');
    mobileNav.classList.toggle('hide');
    hamburgerMenu.setAttribute('aria-expanded', !isMenuOpen);
    mobileNav.setAttribute('aria-hidden', isMenuOpen);

    // Set focus on the first menu item when the menu opens
    if (!isMenuOpen) {
      menuItems[0].focus();
    }
  });

  // Close the mobile navigation when a menu item is clicked
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      hamburgerMenu.classList.remove('change');
      mobileNav.classList.add('hide');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      hamburgerMenu.focus();
    });
  });

  // Watch for resize
  window.addEventListener('resize', function () {
    const isMenuHidden = mobileNav.classList.contains('hide');

    if (window.innerWidth >= 720 && isMenuHidden) {
      mobileNav.classList.remove('hide');
      hamburgerMenu.classList.remove('change');
    }

    if (window.innerWidth < 720 && !isMenuHidden) {
      hamburgerMenu.classList.remove('change');
      mobileNav.classList.add('hide');
    }

    if (isMenuHidden !== isHamburgerMenuChanged) {
      hamburgerMenu.setAttribute('aria-expanded', !isMenuHidden);
      mobileNav.setAttribute('aria-hidden', isMenuHidden);
    }
  });

  // Close the mobile navigation when clicking outside the menu
  document.addEventListener('click', (event) => {
    const target = event.target;
    const isMenuOpen = !mobileNav.classList.contains('hide');

    if (
      isMenuOpen &&
      !mobileNav.contains(target) &&
      !hamburgerMenu.contains(target)
    ) {
      hamburgerMenu.classList.remove('change');
      mobileNav.classList.add('hide');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  });

  // Highlight current nav title---------------------------------
  window.addEventListener('DOMContentLoaded', () => {
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
      link.addEventListener('click', () => {
        highlightCurrent();
      });

      // Toggle focus for keyboard accessibility
      link.addEventListener('focus', toggleFocus);
      link.addEventListener('blur', toggleFocus);
    });
  });

  /**
   * Sets or removes .focus class on an element.
   */
  function toggleFocus(event) {
    if (event.type === 'focus' || event.type === 'blur') {
      let self = this;

      while (!self.classList.contains('nav-menu')) {

        if ('li' === self.tagName.toLowerCase()) {
          self.classList.toggle('focus');
        }
        self = self.parentNode;
      }
    }

    if (event.type === 'touchstart') {
      const menuItem = this.parentNode;
      event.preventDefault();
      for (const link of menuItem.parentNode.children) {
        if (menuItem !== link) {
          link.classList.remove('focus');
        }
      }
      menuItem.classList.toggle('focus');
    }
  }
})();
