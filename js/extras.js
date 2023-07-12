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
  
  // ABOUT PAGE, hexigon collage btn
  //reference: https://codepen.io/yyurtyeri/pen/YzwQddb
  
  let j = 0;

  function expand(event) {
    let items = document.querySelectorAll('.collage-item');
    let instaText = document.querySelector('.insta-text');
    let itemArray = Array.from(items);


    function setIndex(item){
      if (j===0){
        
        item.querySelector('a').tabIndex = 0;
      }
      else if(j===1){
        item.querySelector('a').tabIndex = -1;
      }
    }

    if (event.keyCode === 13 || event.type === 'click') {
    event.preventDefault();

    if (j === 0) {
      
      console.log(document.querySelectorAll('collage-item'));
  
      document.getElementById("add").style.transform = 'rotate(45deg)';
      document.getElementById("collage-menu").style.transform = 'scale(1)';
      itemArray[0].style.transform = 'translateY(-180px)';
      itemArray[1].style.transform = 'translate(160px,-90px)';
      itemArray[2].style.transform = 'translate(160px,90px)';
      itemArray[3].style.transform = 'translateY(180px)';
      itemArray[4].style.transform = 'translate(-160px,90px)';
      itemArray[5].style.transform = 'translate(-160px,-90px)';

      itemArray.forEach(setIndex);
  
      // handle text
      instaText.classList.add("fade-out");
  
      j = 1;
    } else {
      instaText.classList.remove("fade-out");
      itemArray.forEach(setIndex);
  
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
}
