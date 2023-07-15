// Load Blog Posts on initial page load
let homePage = document.querySelector('a[href="#landing"]');
homePage.click();

// landing / home page--------------------------------------------------

// Make scroll btn disappear
window.addEventListener('scroll', function() {
    let scrollDownBtn = document.querySelector('.explore');
    let exploreTitle = document.querySelector('.explore-title');

    if(scrollDownBtn){

      if (window.scrollY > 150) {
        exploreTitle.classList.add('fade-out-scroll');
        scrollDownBtn.classList.add('fade-out-scroll');
        scrollDownBtn.classList.add('disable');
      } else {

        if(scrollDownBtn.classList.contains('disable')){
          exploreTitle.classList.remove('fade-out-scroll');
          scrollDownBtn.classList.remove('fade-out-scroll');
          scrollDownBtn.classList.remove('disable');
        }
      }
    }
  });
  
  // ABOUT PAGE----------------------------------------------------------------

  // output about image
function output_about_image(data) {


  if (data.acf.image_myself) {

      // Output the Featured Image if one exists

      let featuredImage = data.acf.image_myself;
      let imgWidth = featuredImage.width;
      let imgHeight = featuredImage.height;
      imgElement = `
  <img class="self-image"
  
  src="${featuredImage.url}" 
     width="${imgWidth}"
     height="${imgHeight}"
     alt="${featuredImage.alt}"
     srcset="${featuredImage.url} ${imgWidth}w, 
     ${featuredImage.sizes.large} 1024w,
     ${featuredImage.sizes.medium_large} 768w,
     ${featuredImage.sizes.medium} 300w"
     sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">
  `;

      pageContent += imgElement;


  }

}
  
  //hexigon collage btn---------------------------------------
  //reference: https://codepen.io/yyurtyeri/pen/YzwQddb
  
  let j = 0;

  function expand(event) {
    let items = document.querySelectorAll('.collage-item');
    let instaText = document.querySelector('.insta-text');
    let collageContainer = document.querySelector('.collage-content');
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

      collageContainer.classList.remove("shake");
  
      document.getElementById("add").style.transform = 'rotate(45deg)';
      document.getElementById("collage-menu").style.transform = 'scale(1)';
      itemArray[0].style.transform = 'scale(1.2) translateY(-180px)';
      itemArray[1].style.transform = 'scale(1.2) translate(160px,-90px)';
      itemArray[2].style.transform = 'scale(1.2) translate(160px,90px)';
      itemArray[3].style.transform = 'scale(1.2) translateY(180px)';
      itemArray[4].style.transform = 'scale(1.2) translate(-160px,90px)';
      itemArray[5].style.transform = 'scale(1.2) translate(-160px,-90px)';

      itemArray.forEach(setIndex);
  
      // handle text
      instaText.classList.add("fade-out");
  
      j = 1;
    } 
    else {
      instaText.classList.remove("fade-out");
      collageContainer.classList.add("shake");
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


// displaying hexigon images
function output_collage( data ) {

	if ( data.acf.insta_posts ) {

    pageContent += `
    <div class="insta-wrapper">
    <p class="insta-text">${data.acf.insta_call}</p>
    <div class="collage-container">
      <div class="collage-content shake">
      <div class="collage-toggle " id="collage-toggle" tabindex="0" onkeydown="expand(event)" onclick="expand(event)">
        <span class="fa fa-plus" id="add"></span>
      </div>
      <div class="collage-menu" id="collage-menu">
  `;

		let instaArray = data.acf.insta_posts;


    for (let i = 0; i < instaArray.length; i++) {

      let singleImage = instaArray[i].insta_image;       

      pageContent += `
			<div class="collage-item">
			  <a tabindex="-1" target="_blank" href="${instaArray[i].post_url}">`;

    
		let imgWidth = singleImage.width;
		let imgHeight = singleImage.height;
		let imgElement = `
		      <img
		      src="${singleImage.url}" 
		      	 width="${imgWidth}"
		      	 height="${imgHeight}"
		      	 alt="${singleImage.alt}"
		      	 srcset="${singleImage.url} ${imgWidth}w, 
		      	 ${singleImage.sizes.large} 1024w,
		      	 ${singleImage.sizes.medium_large} 768w,
		      	 ${singleImage.sizes.medium} 300w"
		      	 sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">
		      `;

          pageContent += imgElement;
          pageContent += `</a></div>`;

    }

    pageContent += `
    </div>
    </div>
  </div>
  </div>
`;

	} 

}

// work animation when element comes into view
function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScrollAnimation() {
  let elements = document.getElementsByClassName('animate-element');

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (isElementInViewport(element)) {
      element.classList.add('animate');
    }
  }
}

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('focus', handleScrollAnimation);
