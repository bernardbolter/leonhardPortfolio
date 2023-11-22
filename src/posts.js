var allPosts = [];
var arrangedPosts = [];
var breakpoint = 850;
var postsHTML = document.getElementById('posts')

jQuery(document).ready(function($) {
    async function newPosts() {
        console.log("getting posts")
        allPosts = await wp.apiRequest({ path: 'wp/v2/posts?acf_format=standard&per_page=100' })
        console.log(allPosts)
        arrangedPosts = await arrangePosts(allPosts)
        console.log(arrangedPosts)
        displayAllPosts(arrangedPosts)
    }
    if(document.getElementById("posts") !== null) {
        newPosts()
    }

    $('.splash-container').on("click", function() {
        console.log('clicked splash')
        $('.splash-container').addClass('splash-container-hide');
    })
})


jQuery(window).bind('resizeEnd', function() {
    //do something, window hasn't changed size in 500ms
    console.log("resized")
    arrangedPosts = arrangePosts(allPosts)
    displayAllPosts(arrangedPosts);
});

jQuery(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        jQuery(this).trigger('resizeEnd');
    }, 500);
});

const arrangePosts = posts => {
    var noOrderPosts = []
    var orderedPosts = []
    var windowWidth = window.innerWidth
    posts.map(post => {
        if (windowWidth > breakpoint) {
            if (post.acf.mobile_order.length === 0) {
                noOrderPosts.push(post)
            } else {
                orderedPosts.push(post)
            }
        } else {
            if (post.acf.desktop_order.length === 0) {
                noOrderPosts.push(post)
            } else {
                orderedPosts.push(post)
            }
        }
        
    })
    console.log(noOrderPosts)
    console.log(orderedPosts)
    orderedPosts.map(post => {
        if (windowWidth > breakpoint) {
            noOrderPosts.splice(post.acf.desktop_order - 1, 0, post)
        } else {
            noOrderPosts.splice(post.acf.mobile_order - 1, 0, post)
        }
    })
    console.log(noOrderPosts)

    return noOrderPosts
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
    if (window.innerWidth > breakpoint) {
        // Desktop Order
        if (i === 2 || 4 || 9 || 23 || 24 ) {
            if (post.acf.landscape !== false) {
                return post.acf.landscape.sizes.large
            } else if (post.acf.square !== false) {
                return post.acf.square.sizes.large
            } else if (post.acf.portrait !== false) {
                return post.acf.portrait.sizes.large
            } else return 'https://www.tlbx.app/200-300.svg'
        } else if (i === 1 || 11 || 17 || 31 || 32) {
            if (post.acf.portrait !== false) {
                return post.acf.portrait.sizes.large
            } else if (post.acf.square !== false) {
                return post.acf.square.sizes.large
            } else if (post.acf.landscape !== false) {
                return post.acf.landscape.sizes.large
            } else return 'https://www.tlbx.app/200-300.svg'
            // LARGE SQUARE
        } else if (i === 7 || 13 || 24 || 33) {
            if (post.acf.square !== false) {
                return post.acf.square.sizes.large
            } else if (post.acf.landscape !== false) {
                return post.acf.landscape.sizes.large
            } else if (post.acf.portrait !== false) {
                return post.acf.portrait.sizes.large
            } else return 'https://www.tlbx.app/200-300.svg'
            // SMALL SQUARE
        } else {
            if (post.acf.square !== false) {
                return post.acf.square.sizes.medium
            } else if (post.acf.landscape !== false) {
                return post.acf.landscape.sizes.medium
            } else if (post.acf.portrait !== false) {
                return post.acf.portrait.sizes.medium
            } else return 'https://www.tlbx.app/200-300.svg'
        }
    } else {
        // Mobile Order
        if (i === 1 || 12 || 21 || 31 ) {
            // LANDSCAPE
            if (post.acf.landscape !== false) {
                return post.acf.landscape.sizes.medium_large
            } else if (post.acf.square !== false) {
                return post.acf.square.sizes.medium_large
            } else if (post.acf.portrait !== false) {
                return post.acf.portrait.sizes.medium_large
            } else return 'https://www.tlbx.app/200-300.svg'
        }
        else if (i === 8 || 11 || 13 || 33) {
            // PORTRAIT
            if (post.acf.portrait !== false) {
                return post.acf.portrait.sizes.medium_large
            } else if (post.acf.square !== false) {
                return post.acf.square.sizes.medium_large
            } else if (post.acf.landscape !== false) {
                return post.acf.landscape.sizes.medium_large
            } else return 'https://www.tlbx.app/200-300.svg'
        } else if (i === 9 || 16 || 32 ) {
            // LARGE SQUARE
            if (post.acf.square !== false) {
                return post.acf.square.sizes.large
            } else if (post.acf.landscape !== false) {
                return post.acf.landscape.sizes.large
            } else if (post.acf.portrait !== false) {
                return post.acf.portrait.sizes.large
            } else return 'https://www.tlbx.app/200-300.svg'
        } else {
            if (post.acf.square !== false) {
                return post.acf.square.sizes.medium
            } else if (post.acf.landscape !== false) {
                return post.acf.landscape.sizes.medium
            } else if (post.acf.portrait !== false) {
                return post.acf.portrait.sizes.medium
            }  return 'https://www.tlbx.app/200-300.svg'
        }
    }
}