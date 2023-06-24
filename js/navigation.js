
// Get the necessary elements
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const bar = hamburgerMenu.querySelector('.bar');
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