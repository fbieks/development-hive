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


  // ABOUT PAGE, hexigon collage btn
  //reference: https://codepen.io/yyurtyeri/pen/YzwQddb

  let j = 0;
  
  function expand() {

    let items = document.querySelectorAll('.collage-item');
    let instaText = document.querySelector('.insta-text');
    let itemArray = Array.from(items);

    if (j === 0) {
      
      console.log(document.querySelectorAll('collage-item'));
      console.log(itemArray);
      document.getElementById("add").style.transform = 'rotate(45deg)';
      document.getElementById("collage-menu").style.transform = 'scale(1)';
      itemArray[0].style.transform = 'translateY(-160px)';
      itemArray[1].style.transform = 'translate(140px,-80px)';
      itemArray[2].style.transform = 'translate(140px,80px)';
      itemArray[3].style.transform = 'translateY(160px)';
      itemArray[4].style.transform = 'translate(-140px,80px)';
      itemArray[5].style.transform = 'translate(-140px,-80px)';

      // handle text
      instaText.classList.add("fade-out");

      j = 1;
    } else {

      instaText.classList.remove("fade-out");

      document.getElementById("add").style.transform = 'rotate(0deg)';
      document.getElementById("collage-menu").style.transform = 'scale(0.9)';
      itemArray[0].style.transform = 'translateY(0)';
      itemArray[1].style.transform = 'translate(0)';
      itemArray[2].style.transform = 'translate(0)';
      itemArray[3].style.transform = 'translateY(0)';
      itemArray[4].style.transform = 'translate(0)';
      itemArray[5].style.transform = 'translate(0)';
      j = 0;

      instaText.classList.add("fade-in");

    }
  }