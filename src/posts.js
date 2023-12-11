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
    var newPosts = "<div class='posts-container'>"
    posts.map((post, i) => {
        // console.log(decideImageFormat(post, i + 1))
        console.log(post.acf.overview_size)
        newPosts = newPosts + `<a class="post-container ${post.acf.overview_size}" href="${post.link}">${decideImageFormat(post, i + 1)}</a>`
    })
    newPosts = newPosts + "</div>"
    jQuery("#posts").html(newPosts)
}

const decideImageFormat = (post, i) => {
    if (window.innerWidth > breakpoint) {
        // Desktop Order
        if (post.acf.overview_size === 'landscape') {
            // LANDSCAPE
            var src
            if (post.acf.landscape_video !== false) {
                return `<video class="overview-video" src="${post.acf.landscape_video.url}" autoplay loop playsinline muted>`
            } else if (post.acf.landscape !== false) {
                src = post.acf.landscape.sizes.large
            } else if (post.acf.square !== false) {
                src =post.acf.square.sizes.large
            } else if (post.acf.portrait !== false) {
                src = post.acf.portrait.sizes.large
            } else src ='https://www.tlbx.app/200-300.svg'
            return `<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`
        } else if (post.acf.overview_size === 'portrait') {
             // PORTRAIT
             var src
            if (post.acf.portrait_video !== false) {
                return `<video class="overview-video" src="${post.acf.portrait_video.url}" autoplay loop playsinline muted>`
            } else if (post.acf.portrait !== false) {
                src = post.acf.portrait.sizes.large
            } else if (post.acf.square !== false) {
                src = post.acf.square.sizes.large
            } else if (post.acf.landscape !== false) {
                src = post.acf.landscape.sizes.large
            } else src = 'https://www.tlbx.app/200-300.svg'
            return `<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`
        } else if (post.acf.overview_size === 'large-square') {
            // LARGE SQUARE
            var src
            if (post.acf.square_video !== false) {
                return `<video class="overview-video" src="${post.acf.square_video.url}" autoplay loop playsinline muted>`
            } else if (post.acf.square !== false) {
                src = post.acf.square.sizes.large
            } else if (post.acf.landscape !== false) {
                src = post.acf.landscape.sizes.large
            } else if (post.acf.portrait !== false) {
                src = post.acf.portrait.sizes.large
            } else src = 'https://www.tlbx.app/200-300.svg'
            return `<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`
        } else {
            // SMALL SQUARE
            var src
            if (post.acf.square_video !== false) {
                return `<video class="overview-video" src="${post.acf.square_video.url}" autoplay loop playsinline muted>`
            } else if (post.acf.square !== false) {
                src = post.acf.square.sizes.medium_large
            } else if (post.acf.landscape !== false) {
                src = post.acf.landscape.sizes.medium_large
            } else if (post.acf.portrait !== false) {
                src = post.acf.portrait.sizes.medium_large
            } else src = 'https://www.tlbx.app/200-300.svg'
            return `<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`
        }
    } else {
        // Mobile Order
        if (post.acf.overview_size === 'landscape') {
            // LANDSCAPE
            var src
            if (post.acf.landscape_video !== false) {
                return `<video class="overview-video" src="${post.acf.landscape_video.url}" autoplay loop playsinline muted>`
            } else if (post.acf.landscape !== false) {
                src = post.acf.landscape.sizes.medium_large
            } else if (post.acf.square !== false) {
                src =post.acf.square.sizes.medium_large
            } else if (post.acf.portrait !== false) {
                src = post.acf.portrait.sizes.medium_large
            } else src ='https://www.tlbx.app/200-300.svg'
            return `<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`
        } else if (post.acf.overview_size === 'portrait') {
            // PORTRAIT
            var src
            if (post.acf.portrait_video !== false) {
                return `<video class="overview-video" src="${post.acf.portrait_video.url}" autoplay loop playsinline muted>`
            } else if (post.acf.portrait !== false) {
                src = post.acf.portrait.sizes.medium_large
            } else if (post.acf.square !== false) {
                src = post.acf.square.sizes.medium_large
            } else if (post.acf.landscape !== false) {
                src = post.acf.landscape.sizes.medium_large
            } else src = 'https://www.tlbx.app/200-300.svg'
            return `<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`
        } else if (post.acf.overview_size === 'large-square') {
            // LARGE SQUARE
            var src
            if (post.acf.square_video !== false) {
                return `<video class="overview-video" src="${post.acf.square_video.url}" autoplay loop playsinline muted>`
            } else if (post.acf.square !== false) {
                src = post.acf.square.sizes.medium_large
            } else if (post.acf.landscape !== false) {
                src = post.acf.landscape.sizes.medium_large
            } else if (post.acf.portrait !== false) {
                src = post.acf.portrait.sizes.medium_large
            } else src = 'https://www.tlbx.app/200-300.svg'
            return `<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`
        } else {
            // SMALL SQUARE
            var src
            if (post.acf.square_video !== false) {
                return `<video class="overview-video" src="${post.acf.square_video.url}" autoplay loop playsinline muted>`
            } else if (post.acf.square !== false) {
                src = post.acf.square.sizes.medium
            } else if (post.acf.landscape !== false) {
                src = post.acf.landscape.sizes.medium
            } else if (post.acf.portrait !== false) {
                src = post.acf.portrait.sizes.medium
            } else src = 'https://www.tlbx.app/200-300.svg'
            return `<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`
        }
    }
}