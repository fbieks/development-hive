
// Get the necessary elements
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const beforeBar = hamburgerMenu.querySelector('.before-bar');
const afterBar = hamburgerMenu.querySelector('.after-bar');
const middleBar = hamburgerMenu.querySelector('.middle-bar');
let prevWidth = window.innerWidth;

// Toggle the mobile navigation when hamburger menu is clicked
hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('change');
  mobileNav.classList.toggle('hide');

});

// Close the mobile navigation when a menu item is clicked
const menuItems = mobileNav.querySelectorAll('a');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    hamburgerMenu.classList.remove('change');
    mobileNav.classList.add('hide');

  });
});

//watch for resize
window.addEventListener('resize', function() {

    if (window.innerWidth >= 720 ) {

      if ( mobileNav.classList.contains('hide') ){

        mobileNav.classList.remove('hide');
        hamburgerMenu.classList.remove('change');
      }
    }

    if (window.innerWidth < 720 ){

      if ( !mobileNav.classList.contains('hide') ){
      hamburgerMenu.classList.remove('change');
      mobileNav.classList.add('hide');
      }

    }

});



//highlight current nav title

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
  
    links.forEach((link) => {
      link.addEventListener('click', () => {
        highlightCurrent();
      });
    });
  });
  