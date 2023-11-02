var allPosts = [];
var filteredPosts = [];
var breakpoint = 850;
var postsHTML = document.getElementById('posts')
var currentWidth = 0;

jQuery(document).ready(function($) {
    async function newPosts() {
        console.log("getting posts")
        allPosts = await wp.apiRequest({ path: 'wp/v2/posts?acf_format=standard&per_page=100' })
        console.log(allPosts)
        filteredPosts = allPosts
        displayAllPosts(filteredPosts)
    }
    newPosts()
})


jQuery(window).bind('resizeEnd', function() {
    //do something, window hasn't changed size in 500ms
    console.log("resized")
    displayAllPosts(filteredPosts);
});

jQuery(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        jQuery(this).trigger('resizeEnd');
    }, 500);
});

const selectedPostToFront = posts => {

}

const displayAllPosts = (posts) => {
    // shuffledPosts = shuffle(posts)
    var newPosts = "<div class='posts-container'>"
    posts.map((post, i) => {
        // console.log(decideImageFormat(post, i + 1))
        newPosts = newPosts + `<a class="post-container" href="${post.link}"><img src="${decideImageFormat(post, i + 1)}" alt="thumbnail from ${post.title.rendered} project" /></a>`
    })
    newPosts = newPosts + "</div>"
    jQuery("#posts").html(newPosts)
}

const decideImageFormat = (post, i) => {
    if (window.innerWidth <= breakpoint) {
        if (i === 1 || 12 || 21 | 32) {
            if (post.acf.landscape === false) {
                return 'https://www.tlbx.app/200-300.svg'
            } else {
                return post.acf.landscape.sizes.medium_large
            }
        } else if (i === 8 || 13 || 25) {
            if (post.acf.portrait === false) {
                return 'https://www.tlbx.app/200-300.svg'
            } else {
                return post.acf.portrait.sizes.medium_large
            }
        } else if (i === 9 || 16 || 26 || 33) {
            if (post.acf.square === false) {
                return 'https://www.tlbx.app/200-300.svg'
            } else {
                return post.acf.square.sizes.medium_large
            }
        } else {
            if (post.acf.square === false) {
                return 'https://www.tlbx.app/200-300.svg'
            } else {
                return post.acf.square.sizes.medium
            }
        }
    } else {
        if (i === 2 || 4 || 9 || 23 || 25 || 36) {
            if (post.acf.landscape === false) {
                return 'https://www.tlbx.app/200-300.svg'
            } else {
                return post.acf.landscape.sizes.large
            }
        } else if (i === 1 || 11 || 17 || 32 || 33) {
            if (post.acf.portrait === false) {
                return 'https://www.tlbx.app/200-300.svg'
            } else {
                return post.acf.portrait.sizes.large
            }
        } else if (i === 7 || 13 || 26 ) {
            if (post.acf.square === false) {
                return 'https://www.tlbx.app/200-300.svg'
            } else {
                return post.acf.square.sizes.large
            }
        } else {
            if (post.acf.square === false) {
                return 'https://www.tlbx.app/200-300.svg'
            } else {
                return post.acf.square.sizes.medium_large
            }
        }
    }
}

// HELPERS

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

