var allPosts = [];
var arrangedPosts = [];
var breakpoint = 850;
var postsHTML = document.getElementById('posts')
var notTouched = true

// Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
//     get: function () {
//         return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
//     }
// });

jQuery(document).ready(function($) {
    $(window).load(function() {
        console.log("window loaded")
    });
    async function newPosts() {
        allPosts = await wp.apiRequest({ path: 'wp/v2/posts?acf_format=standard&per_page=100' })
        console.log("all posts: ", allPosts)
        arrangedPosts = arrangePosts(allPosts)
        displayAllPosts(arrangedPosts)
        console.log(postsHTML.innerHTML)
        $('#posts').on('load', function() {
            console.log('posts loaded')
        })
        const videoElement = document.getElementById('overview_hidden_video')
        if (!videoElement.paused) {
            console.log("hidden video playing")
        } else {
            console.log("hidden video paused")
        }
        // var videos = document.querySelectorAll('.overview-video')
        // var overview_images = document.querySelectorAll('.suspended-video-image')
        // console.log(videos)
        // console.log(overview_images)
        // console.log(videoElement.paused)
        // $('#test-text-one').text('before if')

        // if (!videoElement.paused) {
        //     console.log("video playing")
        //     $('#test-text-one').text('start video playing')
        //     // $('.suspended-video-image').each(function() {
        //     //     $(this).addClass('suspended-video-image-hide')
        //     // })
        //     // videoElement.pause()
        //     // $('.overview-video').each(function() {
        //     //     $(this).get(0).pause()
        //     // })
        //     // Array.from(overview_images).forEach(image => {
        //     //     console.log("sus image: ", image)
        //     //     image.addClass('suspended-video-image-hide') 
        //     // })
        //     // $('.suspended-video-image').each((i,image) => {
        //     //     console.log("sus image: ", image)
        //     //     image.addClass('suspended-video-image-hide') 
        //     // })
        // } else {
        //     $('#test-text-one').text('start video paused')
        // }

        // $('body').on('click touchstart', function () {
        //     if (notTouched) {
        //         $('#test-text').text(notTouched)
        //         notTouched = false
        //         if (!videoElement.paused) {
        //             // video is already playing so do nothing
        //             $('#test-text').text('playing')
        //             // $('.overview-video').each(function(video) {
        //             //     console.log(video)
        //             //     $(this).get(0).play()
        //             // })
        //         }
        //         else {
        //             // video is not playing
        //             // so play video now
        //             $('#test-text').text('not playing')
        //             console.log("playing from touch")
        //             // videos.forEach(video => {
        //             //     video.trigger('play')
        //             // })
        //             // $('.overview-video').each(function() {
        //             //     $('#test-text').text('play video')
        //             //     $(this).get(0).play()
        //             // })
        //             // var videos = document.querySelectorAll('.overview-video')
        //             // videos.forEach(function () {
        //             //     this.play()
        //             // })
        //             // $('.suspended-video-image').each(function() {
        //             //     // $('#test-text').text(this)
        //             //     $(this).addClass('suspended-video-image-hide')
        //             // })
        //             $('.overview-video').each(function() {
        //                 $(this).get(0).play()
        //             })
                    
        //         }

        //     }
        // });
    }

    if(document.getElementById("posts") !== null) {
        newPosts()
    }
})

jQuery(window).bind('resizeEnd', function() {
    //do something, window hasn't changed size in 500ms
    // console.log("resized")
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
        // console.log(post.acf.overview_size)
        newPosts = newPosts + `<a class="post-container ${post.acf.overview_size}" title="${post.title.rendered}" href="${post.link}">${decideImageFormat(post, i + 1)}</a>`
    })
    newPosts = newPosts + "</div>"
    setTimeout(() => {
        jQuery("#posts").html(newPosts)
    }, 500)
    setTimeout(() => {
        jQuery('#nav-container').removeClass('nav-container-hide')
    }, 800)
}


const decideImageFormat = (post, i) => {
    var poster
    if (post.acf.overview_video_placeholder) {
        poster = post.acf.overview_video_placeholder.sizes.medium
    } 
    if (window.innerWidth > breakpoint) {
        // Desktop Order
        if (post.acf.overview_size === 'landscape') {
            // LANDSCAPE
            var src
            if (post.acf.landscape_video !== false) {
                return `<video class="overview-video" src="${post.acf.landscape_video.url}" autoplay="true" loop="true" playsinline="true" muted="true"></video>`
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
                return `<video class="overview-video" src="${post.acf.portrait_video.url}" autoplay loop playsinline muted poster="${poster}"></video>`
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
                return `<video class="overview-video" src="${post.acf.overview_square_video}" autoplay loop playsinline muted></video>`
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
                return `<video class="overview-video" src="${post.acf.square_video.url}" autoplay loop playsinline muted poster="${poster}"></video>`
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
            var placeholder
            if (post.acf.landscape_video !== false) {

                return `<video class="overview-video" src="${post.acf.landscape_video.url}" autoplay loop playsinline muted></video>`
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
                return `<video class="overview-video" src="${post.acf.portrait_video.url}" autoplay loop playsinline muted background="1"></video>`
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
                // return post.acf.overview_square_video
                var suspend_src
                if (post.acf.overview_video_placeholder !== false) {
                    suspend_src = post.acf.overview_video_placeholder.url
                } else {
                    suspend_src = 'https://www.tlbx.app/200-300.svg'
                }
                return `<img src="${suspend_src}" alt="video-overlay" class="suspended-video-image" /><video class="overview-video inlinevideo" src="${post.acf.overview_square_video}" autoplay loop muted playsinline autobuffer></video>`
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
                return `<video class="overview-video" src="${post.acf.square_video.url}" autoplay loop playsinline muted></video>`
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