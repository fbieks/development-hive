// Define constants
const mainEl  = document.querySelector('main#main');
const loading = document.getElementById('loading');
const apiURL  = 'https://developmenthive.com/portfolio/wp-json/wp/v2/';
let pageContent = '';

// Function to show loading icon
function showLoadingIcon() {

	loading.classList.add('fade-in');

	setTimeout(() => {
		loading.style.display = 'block';
	}, 100);

  }
  
  // Function to hide loading icon
  function hideLoadingIcon() {
	loading.classList.add('fade-out');
	
	setTimeout(() => {
		loading.classList.remove('fade-out');
		loading.style.display = 'none';
	}, 500);
  }

// Run REST query if back/forward buttons used
window.addEventListener('popstate', function(e) {
	if ( e.state != null) {
		wp_rest_api_call(e);
	}
});

// General WP REST API function
function wp_rest_api_call( e ) {

	// Create endpoint variable
	let endpoint = '',
		link     = '',
		href     = '';

	// Run if link clicked
	if ( e.type == 'click' ) {

		// Set some variables
		link = this;
		href = this.getAttribute('href');
		endpoint = link.dataset.endpoint;

		// Push URL to browser history
		history.pushState(endpoint, null, href);

	// Run if back/forward buttons used
	} else if ( e.type == 'popstate' ) {

		// Set endpoint value
		endpoint = e.state;

	}

	showLoadingIcon();

	// Fetch REST API data
	if (endpoint){


	fetch( apiURL+endpoint )
		.then( response => response.json() )
		.then( data => {


	 console.log(data);

	 // Hide the existing content
	 mainEl.innerHTML = '';
	 scroll(0, 0);


	 setTimeout(() => {


			// Run the proper JS functkion based on the endpoint
			if ( endpoint.includes('pages/') || endpoint.includes('posts/') ) {
				wp_output_single(data);
			}
			else if ( endpoint.includes('posts') ) {
				wp_output_blog(data);
			}
			else if ( endpoint.includes('feb-work') && (Array.isArray( data ) == true ) ){
				wp_output_work(data);
			}
			else if ( endpoint.includes('feb-work') ){
				wp_output_single_work(data);
			}

        // Hide loading icon
        hideLoadingIcon();

      }, 1000); 
    })
		.catch( error => {

			// Output error message to console
			console.error(error);

			// Output error message to main element
			mainEl.innerHTML = 'There was an error. Check the console to resolve the issue.';

			// Hide loading icon
			hideLoadingIcon();

		});
	}

};

// Output Pages or single Posts
function wp_output_single( data ) {

	// Use to see all available data
	console.log(data);

	// Home Page Content
	if ( data.id == 38 ) {

		// scroll icon: https://codepen.io/Web_Cifar/pen/WNwvOaE

		pageContent = `

		<div class='landing-wrapper page-wrapper'>
		<section id="sec-1">
			<div class='landing-content container'>
			<div class='landing-title'>
				<h1 >${data.acf.website_intro}
				</h1>
				<p >${data.acf.created_by}
				</p>
				</div>
				<div class="explore-wrapper fade-in">
					<h3 class="explore-title" >Explore</h3>
					<a href="#sec-2" class="explore">
					<div class="scroll-down"></div>
	  				</a>
				</div>
			</div>
  		</section>
		<section id="sec-2">
		  <div class="container">`;

			if (data.acf.main_projects) {

				const relationshipField = data.acf.main_projects;

				pageContent += '<div class="all-work-wrapper">';
		  
				const fetchRequests = relationshipField.map((post) => {
					return fetch(apiURL + 'feb-work/' + post + '?_embed')
					  .then((response) => response.json())
					  .then((post) => {

					
							// Output WORK posts
							pageContent += `
								<article id="post-${post.id}">
								<a href="#${post.slug}" data-endpoint="feb-work/${post.id}?_embed" data-postid="${post.id}">
								<h2>
								${post.title.rendered}
								</h2>
							`;
				
							let displayTools= [];
							let designTech= post.acf.design_tech_used;
							let teamTech= post.acf.team_tech_used;
							let techUsed = post.acf.tech_used;
							
				
							if ((post.acf.display_tools).length !== 0){

								displayTools = post.acf.display_tools;
				
								pageContent += `<ul class='tools-used sum-tools' > `;
								
								for (let i = 0; i < (displayTools.length) ; i++) {


									if(techUsed.includes(displayTools[i])){

										pageContent += `<li class="tech-tools-item" > ${displayTools[i]}</li>`;
									}

									else if(designTech.includes(displayTools[i])){
										pageContent += `<li class="design-tools-item" > ${displayTools[i]}</li>`;
									}
									else if(teamTech.includes(displayTools[i])){
										pageContent += `<li class="team-tools-item" > ${displayTools[i]}</li>`;
									}
				
								}
				
								pageContent += `</ul> `;
							}
				
							// Output the Featured Image
							 output_featured_image( post );
				
							 pageContent += '</a></article>';
							 
					
				})
				.catch((error) => {
					console.error(error);
				});
				
					
				});
			

			console.log(pageContent);

     // Wait for all fetch requests to complete
	 Promise.all(fetchRequests)
	 .then(() => {
	   pageContent += `  </div>
	   </div>
	   </section>
	   </div>`;
	   mainEl.innerHTML = pageContent;

	   update_event_listener();
	 })

	}
	else {
		pageContent += `</div>`;
		mainEl.innerHTML = pageContent;
	  }

	}
	
	// About Page 
	if ( data.id == 27 ) {

		pageContent = `
		<div class="about-wrapper page-wrapper">
		  <h1>${data.acf.about_intro}</h1>
		  <div class="about-text">${data.acf.description}</div>
	  `;
	
	  pageContent += `
		<div class="hexagon">
		  <img class="self-image" src="${data.acf.image_myself}" alt="girl standing with nature background">
		</div>
	  `;
	
	  let tech = [];
	  let teamTech = [];
	  let designTech = [];
	
	  pageContent += '<div class="all-tools-wrapper"><h2>Skills</h2><ul class="tools-used">';
	
	  if (data.acf.all_tech.length !== 0) {
		tech = data.acf.all_tech;
		for (let i = 0; i < tech.length; i++) {
		  pageContent += `<li class="tech-tools-item" id="#${tech[i]}">${tech[i]}</li>`;
		}
	  }
	
	  if (data.acf.all_design_tech.length !== 0) {
		designTech = data.acf.all_design_tech;
		for (let i = 0; i < designTech.length; i++) {
		  pageContent += `<li class="design-tools-item" id="#${tech[i]}">${designTech[i]}</li>`;
		}
	  }
	
	  if (data.acf.all_team_tech.length !== 0) {
		teamTech = data.acf.all_team_tech;
		for (let i = 0; i < teamTech.length; i++) {
		  pageContent += `<li class="team-tools-item" id="#${tech[i]}">${teamTech[i]}</li>`;
		}
	  }
	
	  pageContent += '</ul></div>';
	
	  let imageArray = data.acf.insta_posts;
	
	  console.log(imageArray);
	  if (imageArray) {
		pageContent += `
		  <div class="insta-wrapper">
			<p class="insta-text">${data.acf.insta_call}</p>
			<div class="collage-container">
			  <div class="collage-content">
				<div class="collage-toggle" id="collage-toggle" tabindex="0" onkeydown="expand(event)" onclick="expand(event)">
				  <span class="fa fa-plus" id="add"></span>
				</div>
				<div class="collage-menu" id="collage-menu">
		`;
	
		for (let singleImage of imageArray) {
		  pageContent += `
			<div class="collage-item">
			  <a tabindex="-1" target="_blank" href="${singleImage.post_url}">
				<img id="${singleImage.post_url}" src="${singleImage.insta_image}" alt="${singleImage.image_alt}">
			  </a>
			</div>
		  `;
		}
	
		pageContent += `
				</div>
			  </div>
			</div>
		  </div>
		`;
	  }
	
	  pageContent += `
		</div>
		</div>
		</div>
	  `;
	
	  pageContent += `
		</div>
	  `;
	




		mainEl.innerHTML = pageContent;

		update_event_listener();

	}


	// Run event listener function
	update_event_listener();

};



// Output ALL Work posts
 function wp_output_work(data) {

	 console.log(data);

		pageContent = '<div class="work-wrapper page-wrapper" ><div class="top-page-title"><h1>Work</h1></div><div class="all-work-wrapper">';
	
		// Output Posts
		for ( let post of data ) {
	
			// Output Blog posts
			pageContent += `
				<article id="post-${post.id}">
                <a href="#${post.slug}" data-endpoint="feb-work/${post.id}?_embed" data-postid="${post.id}">
                <h2>
                ${post.title.rendered}
                </h2>
			`;

			let displayTools= [];
			let designTech= post.acf.design_tech_used;
			let teamTech= post.acf.team_tech_used;
			let techUsed = post.acf.tech_used;
			

			if ((post.acf.display_tools).length !== 0){

				displayTools = post.acf.display_tools;

				pageContent += `<ul class='tools-used sum-tools' > `;
				
				for (let i = 0; i < (displayTools.length) ; i++) {


					if(techUsed.includes(displayTools[i])){

						pageContent += `<li class="tech-tools-item" > ${displayTools[i]}</li>`;
					}

					else if(designTech.includes(displayTools[i])){
						pageContent += `<li class="design-tools-item" > ${displayTools[i]}</li>`;
					}
					else if(teamTech.includes(displayTools[i])){
						pageContent += `<li class="team-tools-item" > ${displayTools[i]}</li>`;
					}

				}

				pageContent += `</ul> `;
			}

			// Output the Featured Image
			 output_featured_image( post );

             pageContent += '</a></article>';
             
	
		}

		pageContent += '</div></div>';


		mainEl.innerHTML = pageContent;
	
		// Run event listener function
		update_event_listener();
	
 }


// Output SINGLE work
function wp_output_single_work( data ) {

	// Use to see all available data
	 console.log(data);

	pageContent = `
		<article  class="single-work-wrapper" id="post-${data.id}">
		<div class="single-work-title">
		<h1>${data.title.rendered}</h1>
		</div>
		<div class="single-work-content">
		<div class="work-content-wrapper">
		<div class="image-and-tech-wrapper">
	`;

	// Output the Featured Image
	output_featured_image( data );

	let tech= [];
	let teamTech= [];
	let designTech= [];
	
	pageContent += '<div class="all-tools-wrapper" ><ul class="tools-used"> ';

	if ((data.acf.tech_used).length !== 0){

		tech = data.acf.tech_used;

		for (let i = 0; i < (tech.length) ; i++) {
			pageContent += `<li class="tech-tools-item" id="#${tech[i]}" > ${tech[i]}</li>`;
		}
	}

	if ((data.acf.design_tech_used).length !== 0){

		designTech = data.acf.design_tech_used;

		for (let i = 0; i < (designTech.length) ; i++) {
		pageContent += `<li class="design-tools-item" id="#${tech[i]}" > ${designTech[i]}</li>`;
		}
	}

	if ((data.acf.team_tech_used).length !== 0){
		teamTech = data.acf.team_tech_used;

		for (let i = 0; i < (teamTech.length) ; i++) {
		pageContent += `<li class="team-tools-item" id="#${tech[i]}"  > ${teamTech[i]}</li>`;
		}
	}

	pageContent+= '</ul></div></div>';

	pageContent += `</a><p>${data.acf.general_description}</p>`;

	//reference: https://codepen.io/alexander-albul/pen/NBBaxw
	pageContent += `<a target="_blank" rel="noopener" href="${data.acf.link_to_project}" class="btn btn_live">Live<span class="live-icon"></span></a>`;

	pageContent += `</div></div></article>`;

	mainEl.innerHTML = pageContent;


	update_event_listener();

};


//dont really need to modify the below code
// Output Featured Images
function output_featured_image( data ) {


	console.log(data);

	// Select the Featured Image <figure> for this Post
	let figureElement = document.querySelector('article#post-'+ data.id +' .featured-image');

	if ( data.featured_media ) {

		// Output the Featured Image if one exists

		let featuredImage = data._embedded['wp:featuredmedia'][0];
		let imgWidth = featuredImage.media_details.sizes.full.width;
		let imgHeight = featuredImage.media_details.sizes.full.height;
		imgElement = `
		<img src="${featuredImage.media_details.sizes.full.source_url}" 
			 width="${imgWidth}"
			 height="${imgHeight}"
			 alt="${featuredImage.alt_text}"
			 srcset="${featuredImage.media_details.sizes.full.source_url} ${imgWidth}w, 
			 ${featuredImage.media_details.sizes.large.source_url} 1024w,
			 ${featuredImage.media_details.sizes.medium_large.source_url} 768w,
			 ${featuredImage.media_details.sizes.medium.source_url} 300w"
			 sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">
		`;

		console.log(figureElement);
		
		pageContent += imgElement;


	} else {

		// Delete the <figure> element if no Featured Image
		figureElement.remove(); 

	}

}

// Add click event listeners
function update_event_listener() {
	let links = document.querySelectorAll('a[href^="#"]');
	for (let i = 0; i < links.length; i++) {
	    links[i].addEventListener('click', wp_rest_api_call, false);
	}
};



// Run event listener function
update_event_listener();


