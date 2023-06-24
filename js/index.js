// Define constants
const mainEl  = document.querySelector('main#main');
const loading = document.getElementById('loading');
const apiURL  = 'https://developmenthive.com/portfolio/wp-json/wp/v2/';
let pageContent = '';
//we will be changing above to OUR mindset site

// Run REST query if back/forward buttons used
window.addEventListener('popstate', function(e) {
	if ( e.state != null) {
		wp_rest_api_call(e);
	}
});

// General WP REST API function
function wp_rest_api_call( e ) {

	// Show loading icon
	loading.style.display = 'block';

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

	// Fetch REST API data
	fetch( apiURL+endpoint )
		.then( response => response.json() )
		.then( data => {


	 console.log(data);


			// Run the proper JS function based on the endpoint
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
			loading.style.display = 'none';

			// Move to top of page after content loads
			scroll(0,0);

		})
		.catch( error => {

			// Output error message to console
			console.error(error);

			// Output error message to main element
			mainEl.innerHTML = 'There was an error. Check the console to resolve the issue.';

			// Hide loading icon
			loading.style.display = 'none';

		});

};

// Output Pages or single Posts
function wp_output_single( data ) {

	// Use to see all available data
	console.log(data);

	// Home Page Content
	if ( data.id == 38 ) {

		mainEl.innerHTML = `

		<div class='landing-wrapper'>
		<div class='landing-content'>
		<h2 >${data.acf.website_intro}
		</h2>
		<p >${data.acf.created_by}
		</p>
		</div>
		</div>
		`;


	}

	// Contact Page Content
	if ( data.id == 35 ) {

		console.log( data );

		mainEl.innerHTML = `
		<p>${data.acf.contact_intro}</p>
		<p>${data.acf.contact_info}</p>
		
		<a hred="mailto:${data.acf.github} ">${data.acf.github}
		</a>
		<a hred="mailto:${data.acf.email} ">${data.acf.email}
		</a>
		`;


	}
	
	// About Page Link
	if ( data.id == 27 ) {

		console.log(data);

		pageContent = `
		<div class="about-wrapper">
		<div class="about-text">
		<h2>${data.acf.about_intro}</h2>
		<p>${data.acf.description}</p>
		</div>
	`;


		
	output_featured_image( data );

	pageContent += `
	</div>
`;

		mainEl.innerHTML = pageContent;

	}
		// let concerts = data.acf.concert_list;



		// Convert the string into an array
		// let concert_array = concerts.split(",");

		// console.log(concert_array);

		
		// if ( concerts){
			
		// 	mainEl.innerHTML += `
		// 	<button onclick="generateRandomElement(concert_array)">Generate Random Element</button>

		// <p id="random-element"></p>


		// `;

		// 	}


	// Add next/prev navigation for Posts only
	if ( data.previous_post || data.next_post ) {

		// Output the Featured Image
		// contentElement.innerHTML += `<figure class="featured-image"></figure>`;
		output_featured_image( data );

		console.log(data);

		// Create variables
		let prevLink = '',
			nextLink = '';

		// Check if a Previous Post exists
		if ( data.previous_post ) {
			prevLink = `<a class="prev-post" href="#${data.previous_post['slug']}" data-endpoint="posts/${data.previous_post['id']}?_embed" data-postid="${data.previous_post['id']}">Previous: ${data.previous_post['title']}</a>`;
		}

		// Check if a Next Post exists
		// *** ADD YOUR CODE HERE ***
		if ( data.next_post ) {
		console.log('hello');

			nextLink = `<a class="next-post" href="#${data.next_post['slug']}" data-endpoint="posts/${data.next_post['id']}?_embed" data-postid="${data.next_post['id']}">Next: ${data.next_post['title']}</a>`;
		}


		// Output Navigation
		mainEl.innerHTML += `
		<nav class="posts-navigation">
			${prevLink}
			${nextLink}
		</nav>
		`;

	}


	// Run event listener function
	update_event_listener();

};



// Output Work posts
// *** ADD YOUR CODE HERE ***
 function wp_output_work(data) {
		// Use to see all available data
	 console.log(data);


		// Add Page Title
		pageContent = '<div class="work-wrapper" ><h1>Work</h1>';
	
		// Output Posts
		for ( let post of data ) {
	
			// Output Blog posts
			pageContent += `
				<article id="post-${post.id}">
				<figure class="featured-image"></figure>
                <h2><a href="#${post.slug}" data-endpoint="feb-work/${post.id}?_embed" data-postid="${post.id}">${post.title.rendered}</a></h2>
				<p>${post.content.rendered}</p>
				<p>${post.acf.general_description}</p>
			`;
	
			// Output the Featured Image
			 output_featured_image( post );
			 pageContent += '</article>';
	
		}

		pageContent += '<div />';


		mainEl.innerHTML = pageContent;
	
		// Run event listener function
		update_event_listener();
	
 }


// Output all service posts
function wp_output_single_work( data ) {

	// Use to see all available data
	 console.log(data);

	// Output Posts


		// Output Blog posts
		mainEl.innerHTML = `
			<article id="post-${data.id}">
			<figure class="featured-image"></figure>
			<h2><a href="#${data.slug}" data-endpoint="posts/${data.id}?_embed" data-postid="${data.id}">${data.title.rendered}</a></h2>
				${data.acf.general_description}
			</article>
		`;


		output_featured_image( data );



	// Run event listener function
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
		imgElement = `<div class= "hexagon">
		<img src="${featuredImage.media_details.sizes.full.source_url}" 
			 width="${imgWidth}"
			 height="${imgHeight}"
			 alt="${featuredImage.alt_text}"
			 srcset="${featuredImage.media_details.sizes.full.source_url} ${imgWidth}w, 
			 ${featuredImage.media_details.sizes.large.source_url} 1024w,
			 ${featuredImage.media_details.sizes.medium_large.source_url} 768w,
			 ${featuredImage.media_details.sizes.medium.source_url} 300w"
			 sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px"></div>
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
	for (var i = 0; i < links.length; i++) {
	    links[i].addEventListener('click', wp_rest_api_call, false);
	}
};


// Generate a random element (About Page)
function generateRandomElement() {
	var randomIndex = Math.floor(Math.random() * concert_array.length);
	console.log(randomIndex);
	var randomElement = concert_array[randomIndex];
	document.getElementById("random-element").textContent = randomElement;
  }


// Run event listener function
update_event_listener();

// Load Blog Posts on initial page load
let homePage = document.querySelector('a[href="#landing"]');
homePage.click();