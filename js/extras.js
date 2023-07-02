// Load Blog Posts on initial page load
let homePage = document.querySelector('a[href="#landing"]');
homePage.click();

// landing / home page
// Make scroll btn disappear
window.addEventListener('scroll', function() {
    let scrollDownBtn = document.querySelector('.explore');
    let exploreTitle = document.querySelector('.explore-title');

    if(scrollDownBtn){

      if (window.scrollY > 150) {
        exploreTitle.classList.add('fade-out');
        scrollDownBtn.classList.add('fade-out');
        scrollDownBtn.classList.add('disable');
      } else {

        if(scrollDownBtn.classList.contains('disable')){
          exploreTitle.classList.remove('fade-out');
          scrollDownBtn.classList.remove('fade-out');
          scrollDownBtn.classList.remove('disable');
        }
      }
    }
  });
  
  


// Generate a random element (About Page)
function generateRandomElement() {
	var randomIndex = Math.floor(Math.random() * concert_array.length);
	console.log(randomIndex);
	var randomElement = concert_array[randomIndex];
	document.getElementById("random-element").textContent = randomElement;
  }