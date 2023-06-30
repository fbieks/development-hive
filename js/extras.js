// Load Blog Posts on initial page load
let homePage = document.querySelector('a[href="#landing"]');
homePage.click();

// landing / home page
// Make scroll btn disappear
window.addEventListener('scroll', function() {
    let myDiv = document.querySelector('.scroll-down');

    if(myDiv){
      if (window.scrollY > 150) {
        myDiv.classList.add('fade-out');
      } else {
        myDiv.classList.remove('fade-out');
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