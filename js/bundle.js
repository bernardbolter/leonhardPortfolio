jQuery(document).ready(function($) {
  var aboutEl = document.getElementById('about');
  if (aboutEl) {
    aboutEl.addEventListener('click', function() {
      $('#about').addClass('nav-icons-close');
      $('#about-close').removeClass('nav-icons-close');
      $('#about-section').removeClass('about-no-show');
    })
  }

  var aboutCloseEl = document.getElementById('about-close');
  if (aboutCloseEl) {
    aboutCloseEl.addEventListener('click', function() {
      $('#about').removeClass('nav-icons-close');
      $('#about-close').addClass('nav-icons-close');
      $('#about-section').addClass('about-no-show');
    })
  }
})
function lazyLoad() {
  console.log("lazy loading")
    var card_images = document.querySelectorAll('.project-image');
    
    // loop over each card image
    card_images.forEach(function(card_image) {
      var image_url = card_image.getAttribute('data-image-full');
      var content_image = card_image.querySelector('img');
            
      // change the src of the content image to load the new high res photo
      if (image_url !== null) {
        content_image.src = image_url;

        // listen for load event when the new photo is finished loading
        content_image.addEventListener('load', function() {
        // swap out the visible background image with the new fully downloaded photo
        card_image.style.backgroundImage = 'url(' + image_url + ')';
        // add a class to remove the blur filter to smoothly transition the image change
        card_image.className = card_image.className + ' is-loaded';
      });
      }  
    });  
  }
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
// variable for array of projects with project that was clicked on at the top
var sortedProjects = []
var sortedProjectsWithLength = []
var ticker
var timerPaused = false
var currentProjectId = 245
var currentProjectImage = 1
var aboutInfo = []
var currentProjectIndex = 0

// rebuild assets on resize
jQuery(window).bind('resizeEnd', function() {
  //do something, window hasn't changed size in 500ms
  // console.log("resized")
  sortedProjectsWithLength = makeImageArray(sortedProjects)
  buildProjectsAssets(sortedProjectsWithLength)
});

jQuery(window).resize(function() {
  if(this.resizeTO) clearTimeout(this.resizeTO);
  this.resizeTO = setTimeout(function() {
      jQuery(this).trigger('resizeEnd');
  }, 500);
});

jQuery(document).ready(function($) {
    post_id = jQuery("#post_id").val();
    // console.log(post_id)
    
    async function getProjectData(post_id) {
      var projectData = await wp.apiRequest({ path: 'wp/v2/posts?acf_format=standard&per_page=100' })
      // console.log(projectData)
      var aboutData = await wp.apiRequest({ path: 'wp/v2/pages/104' })
      // console.log(aboutData)
      aboutInfo = aboutData
      var currentProject = projectData.filter(project => project.id === parseInt(post_id))
      sortedProjects = projectData.filter(project => project.id !== parseInt(post_id))
      sortedProjects.unshift(currentProject[0])
      // add number of projects based on mobile and desktop
      sortedProjectsWithLength = makeImageArray(sortedProjects)
      // console.log("sorted: ",sortedProjectsWithLength)
      buildProjectsAssets(sortedProjectsWithLength)
      theTimer(sortedProjectsWithLength[0].id, sortedProjectsWithLength[0].imagesArray[0])
      // console.log(sortedProjectsWithLength)
      projectZindex(sortedProjectsWithLength[0].id)
      // setProjectArrows(sortedProjectsWithLength[0].id)
    }

    if (post_id !== undefined) {
      getProjectData(post_id)
    }

    // $(window).scroll(function (event) {
    //   var scroll = $(window).scrollTop();
    //   var winHeight = $(window).height();
    //   var newIndex = Math.round(scroll / winHeight)
    //   // Do something
    //   // console.log("Scrolling: ", scroll)
    //   // console.log("newIndex: ", Math.round(scroll / winHeight))
    //   if (newIndex !== currentProjectIndex) {
    //     var nextProjectId = sortedProjectsWithLength[newIndex].id
    //     // console.log("next P: ", nextProjectId)
    //     currentProjectIndex = newIndex
    //     projectZindex(nextProjectId)
    //     clearTimeout(ticker)
    //     theTimer(nextProjectId, sortedProjectsWithLength[newIndex].imagesArray[0])
    //   }
    // });

    // BUTTON SCRIPTS
    // #project-title-${id} = title of the project || projectTitle
    // #project-info-close-${id} || projectInfo
    // #project-name-${id} = Leonhard Laupichler || 
    // #name-close-${id} = projectNameClose
    

    // CLICK PROJECT TITLE
    $(document).on('click', '.project-title', function(e) {
      // pause timer
      timerPaused = true
      // get id
      var id = e.target.id.slice(-3)
      // the div holding the name of the project
      var projectTitle = `#project-title-${id}`
      $(projectTitle).addClass('project-title-hide')
      // the div holding the info for the project
      var projectInfoContainer = `#project-info-${id}`
      $(projectInfoContainer).removeClass('project-info-container-hide')
      // the div holding the iclose button for the project info
      var projectInfoClose = `#project-info-close-${id}`
      $(projectInfoClose).removeClass('project-info-close-hide')
      // the div holding leonhard name
      var projectName = `#project-name-${id}`
      $(projectName).removeClass('project-name-hide')
      // the div holding the close button for Leo name
      var projectNameClose = `#name-close-${id}`
      $(projectNameClose).addClass('name-close-hide')
      // div holding the about section
      var aboutSection = `#about-section-${id}`
      $(aboutSection).addClass('about-no-show')
      // div holding the prjectThumbnails
      var thumbs = `#project-thumbnails-${id}`
      $(thumbs).addClass('project-thumbnails-hide')
      // div holding arrows
      var arrows = `#invisible-click-${id}`
      $(arrows).addClass('invisible-click-container-hide')

      clearTimeout(ticker)
    })

    // CLICK THE PROJECT CLOSE BUTTON
    $(document).on('click', '.project-info-close', function(e) {
      var id = e.target.id.slice(-3)
      // the div holding the name of the project
      var projectTitle = `#project-title-${id}`
      $(projectTitle).removeClass('project-title-hide')
      // the div holding the info for the project
      var projectInfoContainer = `#project-info-${id}`
      $(projectInfoContainer).addClass('project-info-container-hide')
      // the div holding the iclose button for the project info
      var projectInfoClose = `#project-info-close-${id}`
      $(projectInfoClose).addClass('project-info-close-hide')
      // the div holding leonhard name
      var projectName = `#project-name-${id}`
      $(projectName).removeClass('project-name-hide')
      // the div holding the close button for Leo name
      var projectNameClose = `#name-close-${id}`
      $(projectNameClose).addClass('name-close-hide')
      // div holding the about section
      var aboutSection = `#about-section-${id}`
      $(aboutSection).addClass('about-no-show')
      // div holding the prjectThumbnails
      var thumbs = `#project-thumbnails-${id}`
      $(thumbs).removeClass('project-thumbnails-hide')
      // div holding arrows
      var arrows = `#invisible-click-${id}`
      $(arrows).removeClass('invisible-click-container-hide')

      restartTimer()
    })

    // CLICK PROJECT NAME TO SHOW ABOUT CONTAINER
    $(document).on('click', '.project-name', function(e) {
      // pause timer
      timerPaused = true
      // get id
      var id = e.target.id.slice(-3)
      // the div holding the name of the project
      var projectTitle = `#project-title-${id}`
      $(projectTitle).removeClass('project-title-hide')
      // the div holding the info for the project
      var projectInfoContainer = `#project-info-${id}`
      $(projectInfoContainer).addClass('project-info-container-hide')
      // the div holding the iclose button for the project info
      var projectInfoClose = `#project-info-close-${id}`
      $(projectInfoClose).addClass('project-info-close-hide')
      // the div holding leonhard name
      var projectName = `#project-name-${id}`
      $(projectName).addClass('project-name-hide')
      // the div holding the close button for Leo name
      var projectNameClose = `#name-close-${id}`
      $(projectNameClose).removeClass('name-close-hide')
      // div holding the about section
      var aboutSection = `#about-section-${id}`
      $(aboutSection).removeClass('about-no-show')
      // div holding the prjectThumbnails
      var thumbs = `#project-thumbnails-${id}`
      $(thumbs).addClass('project-thumbnails-hide')
      // div holding arrows
      var arrows = `#invisible-click-${id}`
      $(arrows).addClass('invisible-click-container-hide')

      clearTimeout(ticker)
    })

    // CLICK THE PROJECT NAME CLOSE TO CLOSE ABOUT CONTAINER
    $(document).on('click', '.name-close', function(e) {
      var id = e.target.id.slice(-3)
      // the div holding the name of the project
      var projectTitle = `#project-title-${id}`
      $(projectTitle).removeClass('project-title-hide')
      // the div holding the info for the project
      var projectInfoContainer = `#project-info-${id}`
      $(projectInfoContainer).addClass('project-info-container-hide')
      // the div holding the iclose button for the project info
      var projectInfoClose = `#project-info-close-${id}`
      $(projectInfoClose).addClass('project-info-close-hide')
      // the div holding leonhard name
      var projectName = `#project-name-${id}`
      $(projectName).removeClass('project-name-hide')
      // the div holding the close button for Leo name
      var projectNameClose = `#name-close-${id}`
      $(projectNameClose).addClass('name-close-hide')
      // div holding the about section
      var aboutSection = `#about-section-${id}`
      $(aboutSection).addClass('about-no-show')
      // div holding the prjectThumbnails
      var thumbs = `#project-thumbnails-${id}`
      $(thumbs).removeClass('project-thumbnails-hide')
      // div holding arrows
      var arrows = `#invisible-click-${id}`
      $(arrows).removeClass('invisible-click-container-hide')

      restartTimer()
    })

    // CLICK A PROJECT THUMBNAIL AND RESET OVERLAYS, CURRENT PROJECT, CURRENT IMAGE ID
    $(document).on('click', '.project-thumb', function(e) {
      // chack if the timer is Paused
      // get the div of wrapping id
      var parent_id = $(this).closest("div").attr("id").split('-')
      // get the current project ID
      var project_id = parseInt(parent_id[2])
      // console.log(project_id)
      // get the current Project Image Number
      var image_number = parseInt(parent_id[3])
      sortedProjectsWithLength.map(project => {
        var projectTitle = `#project-title-${project.id}`
        $(projectTitle).removeClass('project-title-hide')
        // the div holding the info for the project
        var projectInfoContainer = `#project-info-${project.id}`
        $(projectInfoContainer).addClass('project-info-container-hide')
        // the div holding the iclose button for the project info
        var projectInfoClose = `#project-info-close-${project.id}`
        $(projectInfoClose).addClass('project-info-close-hide')
        // the div holding leonhard name
        var projectName = `#project-name-${project.id}`
        $(projectName).removeClass('project-name-hide')
        // the div holding the close button for Leo name
        var projectNameClose = `#name-close-${project.id}`
        $(projectNameClose).addClass('name-close-hide')
        // div holding the about section
        var aboutSection = `#about-section-${project.id}`
        $(aboutSection).addClass('about-no-show')
        // div holding the prjectThumbnails
      var thumbs = `#project-thumbnails-${project.id}`
      $(thumbs).removeClass('project-thumbnails-hide')
      })
      clearTimeout(ticker)
      click(project_id, image_number)
    })

    // CLICK INVISIBLE LEFT TO GO BACK ONE PROJECT ITEM
    $(document).on('click', '.invisible-click-left', function(e) {
      var currentProject = sortedProjectsWithLength.find(project => project.id === currentProjectId)
      var imageIndex = currentProject.imagesArray.indexOf(currentProjectImage)
      if (imageIndex === 0) {
        const lastProject = findLastOrder(currentProject.id)
        if (lastProject !== undefined) {
          clearTimeout(ticker)
          click(lastProject.id, lastProject.imagesArray[0])
        }
      } else {
        click(currentProject.id, currentProject.imagesArray[imageIndex-1])
      }
    })

    // CLICK INVISIBLE RIGHT TO GO BACK ONE PROJECT ITEM
    $(document).on('click', '.invisible-click-right', function(e) {
      clearTimeout(ticker)
      var currentProject = sortedProjectsWithLength.find(project => project.id === currentProjectId)
      var imageIndex = currentProject.imagesArray.indexOf(currentProjectImage)
      if (imageIndex + 1 === currentProject.imagesArray.length) {
        const nextProject = findNextOrder(currentProject.id)
        if (nextProject === undefined) {
          const firstProject = sortedProjectsWithLength[0]
          resetThumbFadesAfterClick(firstProject.id, firstProject.imagesArray[0])
          projectZindex(firstProject.id)
          theTimer(firstProject.id, firstProject.imagesArray[0])
        } else {
          click(nextProject.id, nextProject.imagesArray[0])
        }
      } else {
        click(currentProject.id, currentProject.imagesArray[imageIndex+1])
      }
    })
})

var restartTimer = () => {
  resetThumbFadesAfterClick(currentProjectId, currentProjectImage)
  theTimer(currentProjectId, currentProjectImage)
}

var click = (project_id, image_number) => {
  resetThumbFadesAfterClick(project_id, image_number)
  projectZindex(project_id)
  // setProjectArrows(project_id)
  clearTimeout(ticker)
  theTimer(project_id, image_number)
}

// get array of the image numbers to loop through and create assets
var makeImageArray = sortedProjects => {
  var windowWidth = jQuery(window).width()
  var projectsWithLength = []
  sortedProjects.map(project => {
    var imagesArray = [];
    for (i=1; i<21; i++) {
      if (windowWidth <= 850) {
        if (project.acf[`portfolio_image_portrait_${i}`] !== false || project.acf[`portfolio_video_portrait_${i}`] !== false) {
          imagesArray.push(i)
        }
      } else {
        if (project.acf[`portfolio_image_landscape_${i}`] !== false || project.acf[`portfolio_video_landscape_${i}`] !== false) {
          imagesArray.push(i)
        }
      }
    }
    project['imagesArray'] = imagesArray
    projectsWithLength.push(project)
  })
  return projectsWithLength
}

var resetThumbFadesAfterClick = (project_id, image_number) => {
  resetCurrentImage(project_id, image_number)
  // make variable to check if array is before or after current project
  var afterCurrentProject = false
  // jQuery('body').addClass('notransition')

  // map all projects
  sortedProjects.map(project => {
    if (project.id === parseInt(project_id)) {
      // if current project switch variable to true
      afterCurrentProject = true
      project.imagesArray.map(num => {
        jQuery(`#project-thumb-overlay-${project.id}-${num}`).removeClass('thumb-overlay-done')
        if (num < parseInt(image_number)) {
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).addClass('thumb-overlay-on').css("transition", `none !important`)
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).addClass('thumb-overlay-done')
        } else {
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).removeClass('thumb-overlay-on').css("transition", `0s`)
        } 
      })
    } else {
      if (afterCurrentProject) {
        project.imagesArray.map(num => {
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).removeClass('thumb-overlay-on').css("transition", `none !important`)
        })
      } else {
        project.imagesArray.map(num => {
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).addClass('thumb-overlay-on').css("transition", `0s`)
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).addClass('thumb-overlay-done')
        })
      }
    }
  })
}

// Reset the current image when clicking a thumb or after timer reset
var resetCurrentImage = (project_id, image_number) => {
  // get the windowWidth
  var currentProject = sortedProjects.find(project => project.id === project_id)
  var windowWidth = jQuery(window).width()
  var imageIndex = currentProject.imagesArray.indexOf(image_number)
  jQuery(`#project-images-${project_id}`).css('left', `-${windowWidth * (parseInt(imageIndex))}px`)
}

// loop through projects to make relative and hide replacement div
// make the current div fixed and show the replacement div to keep the right height for scrolling
var projectZindex = currentProject => {
  sortedProjectsWithLength.map(project => {
    jQuery(`#project-${project.id}`).css('z-index', '201')
    jQuery(`#project-${project.id}`).css('position', 'relative')
    jQuery(`#project-${project.id}`).css('visibility', 'hidden')
    jQuery(`#project-placeholder-${project.id}`).addClass('project-container-placeholder-hide')
  })
  jQuery(`#project-${currentProject}`).css('z-index', '301')
  jQuery(`#project-${currentProject}`).css('position', 'fixed')
  jQuery(`#project-${currentProject}`).css('visibility', 'visible')
  jQuery(`#project-placeholder-${currentProject}`).removeClass('project-container-placeholder-hide')

}

// hide project arrows when not the focused project
var setProjectArrows = currentProject => {
  sortedProjectsWithLength.map(project => {
    jQuery(`#invisible-click-${project.id}`).addClass('invisible-click-container-hide')
  })
  jQuery(`#invisible-click-${currentProject}`).removeClass('invisible-click-container-hide')
}

var theTimer = (project_id, image_number) => {
  // console.log("started timer")
  // console.log(project_id, image_number)
  currentProjectId = project_id
  currentProjectImage = image_number
  var windowWidth = jQuery(window).width()
  timerPaused = false
  // get the current project
  var currentProject = sortedProjects.find(project => project.id === project_id)
  // get the transition time length
  var transitionLength
  if (windowWidth > 850) {
    transitionLength = currentProject.acf[`portfolio_video_length_${image_number}`]
  } else {
    // console.log(currentProject.acf)
    transitionLength = currentProject.acf[`portfolio_mobile_video_length_${image_number}`]
  }
  // add transition length to class
  jQuery(`#project-thumb-overlay-${project_id}-${image_number}`).addClass('thumb-overlay-on').css("transition", `${transitionLength}s`)
  // check if its a video and start video from the begining
  var videoCheck = jQuery(`#video-${project_id}-${image_number}`)
  if (videoCheck.length !== 0) {
    jQuery(`#video-${project_id}-${image_number}`).trigger('play')
  }
  var windowWidth = jQuery(window).width()
  var imageIndex = currentProject.imagesArray.indexOf(image_number)
  // start timer
  ticker = setTimeout(() => {
    if (imageIndex + 1 < currentProject.imagesArray.length ) {
      // move to current image
      jQuery(`#project-images-${project_id}`).css('left', `-${windowWidth * (parseInt(imageIndex + 1))}px`)
      // jQuery(`#project-images-${project_id}`).css('transform', `translateX(-${windowWidth * (parseInt(imageIndex + 1))}px)`)
      // restart the timer
      theTimer(project_id, currentProject.imagesArray[imageIndex + 1])
    } else {
      // find next project 
      var nextProject = findNextOrder(project_id)
      if (nextProject === undefined) {
        const firstProject = sortedProjectsWithLength[0]
        resetThumbFadesAfterClick(firstProject.id, firstProject.imagesArray[0])
        projectZindex(firstProject.id)
        theTimer(firstProject.id, firstProject.imagesArray[0])
      } else {
        projectZindex(nextProject.id)
        // setProjectArrows(nextProject.id)
        // scroll to next project, using polyfill smoothscroll
        // document.getElementById(`project-${nextProject.id}`).scrollIntoView({ behavior: "smooth" });
        // start image timer in the next project
        theTimer(nextProject.id, nextProject.imagesArray[0])
      }
    }

      // console.log(transitionLength)
  }, [`${parseInt(transitionLength)}000`])
}

var findNextOrder = (current_id) => {
  let index = sortedProjects.findIndex(({ id }) => id === current_id)
  return index > -1 && index < sortedProjects.length - 1 ? sortedProjects[index + 1] : undefined
}

var findLastOrder = (current_id) => {
  let index = sortedProjects.findIndex(({ id }) => id === current_id)
  return index > -1 && index < sortedProjects.length - 1 ? sortedProjects[index - 1] : undefined
}

var buildProjectsAssets = projects => {
  // get all project HTML back as an array of strings
  var projectAssets = createProjectAssets(projects)
  // join all HTML into one string
  var allProjects = projectAssets.join('')
  var container = document.getElementById('projects-container')
  // inject into page
  if (container) {
    jQuery('#projects-container').html(allProjects)
    lazyLoad()
    if (jQuery(window).width() > 850) {
      projects.map(project => {
        var id = project.id
        var titleWidth = jQuery(`#project-title-${id}`).width()
        jQuery(`#project-thumbnails-${id}`).css("left", `${titleWidth + 89}px`)
      })
    }
    var widthMinusScroll = jQuery("body").prop("clientWidth")
    projects.map(project => {
      jQuery(`#project-images-${project.id}`).css("width", `${widthMinusScroll * project.imagesArray.length}px`)
    })
  }
}

var createProjectAssets = projects => {
  var newAssetsString = []
  projects.forEach(project => {
    var newAssets = `<div class='project-container-placeholder project-container-placeholder-hide' id='project-placeholder-${project.id}'></div>`
    // add project container
    newAssets = newAssets + `<div class='project-container' id='project-${project.id}'>`
    // add logo
    newAssets = newAssets + `<a class="project-logo" href="/"><img src="${LEOSITE.templateURI}/img/logo_still.png" alt="logo" /></a>`
    // add project buttons wrapper
    newAssets = newAssets + '<div class="project-buttons-container">'
    // add back button
    // newAssets = newAssets + `<a href="/?link=true" class="project-back"><img src="${LEOSITE.templateURI}/img/back.png" alt="back button" /></a>`
    // add name
    newAssets = newAssets + `<h1 id="project-name-${project.id}" class="project-name play-leo-portfolio">Leonhard Laupichler</h1>`
    // add name close button
    newAssets = newAssets + `<div id="name-close-${project.id}" class="name-close name-close-hide"><img src="${LEOSITE.templateURI}/img/close.png" alt="close button" /></div>`
    // add title button
    newAssets = newAssets + `<div id="project-title-${project.id}" class="project-title">${project.title.rendered}</div>`
    // add close button
    newAssets = newAssets + `<div id="project-info-close-${project.id}" class="project-info-close project-info-close-hide"><img src="${LEOSITE.templateURI}/img/close.png" alt="close button" /></div>`
    // close project buttons container
    newAssets = newAssets + '</div>'
    // create invisible left and right clickable divs
    newAssets = newAssets + `<div class="invisible-click-container" id="invisible-click-${project.id}"><a id="invisible-click-left-${project.id}" class="invisible-click-left"><img src="${LEOSITE.templateURI}/img/back.png" alt="back button" /></a><a id="invisible-click-right-${project.id}" class="invisible-click-right"><img src="${LEOSITE.templateURI}/img/back.png" alt="back button" /></a></div>`
    // add about container
    var newAbout = createAboutSection(project)
    newAssets = newAssets + newAbout

    // add the info
    var newInfo = createInfoSection(project)
    newAssets = newAssets + newInfo
    
    // add thumbnails
    var newThumbs = createThumbnails(project)
    newAssets = newAssets + newThumbs

    // add images container
    var newImages = createImages(project)
    newAssets = newAssets + newImages
    // end - close project-container
    newAssets = newAssets + `</div>`

    newAssetsString.push(newAssets)
  })

  return newAssetsString
}

var createAboutSection = project => {
  var { acf } = aboutInfo
  var theAbout = `<div class="about-container about-no-show about-project" id="about-section-${project.id}">`
  theAbout = theAbout + `<h2>${acf.description}</h2>`
  theAbout = theAbout + '<p>About</p>'
  theAbout = theAbout + `<div class="services-container"><p>${acf.services}</p></div>`
  theAbout = theAbout + '<p>Services</p>'
  theAbout = theAbout + '<h2 class="clock-container"><span class="clock"></span> CET</h2>'
  theAbout = theAbout + '<p>Current Time</p>'
  theAbout = theAbout + '<a class="about-email" href="mailto:Contact[at]leonhardlaupichler.com">Contact@leonhardlaupichler.com</a>'
  theAbout = theAbout + '<p>Email</p>'
  theAbout = theAbout + `<div class="clients-container"><p>${acf.clients}</p></div>`
  theAbout = theAbout + `<p>Selected Clients</p>`
  theAbout = theAbout + '<a class="imprint" href="/imprint">Imprint</a>'
  theAbout = theAbout + '</div>'
  return theAbout

}

var createInfoSection = project => {
  var { acf } = project
  var theInfo = `<div class='project-info-container project-info-container-hide' id="project-info-${project.id}">`
  if (acf.project_summary.length !== 0) {
    theInfo = theInfo + `<h1>${acf.project_summary}</h1>`
  }
  if (acf.agency.length !== 0) {
    theInfo = theInfo + `<h2>${acf.agency}</h2><p>Agency</p>`
  }
  if (acf.art_direction.length !== 0) {
    theInfo = theInfo + `<h2>${acf.art_direction}</h2><p>Art Direction</p>`
  }
  if (acf.assistant_art_direction.length !== 0) {
    theInfo = theInfo + `<h2>${acf.assistant_art_direction}</h2><p>Assistant Art Direction</p>`
  }
  if (acf.cgi.length !== 0) {
    theInfo = theInfo + `<h2>${acf.cgi}</h2><p>CGI</p>`
  }
  if (acf.client.length !== 0) {
    theInfo = theInfo + `<h2>${acf.client}</h2><p>Client</p>`
  }
  if (acf.code.length !== 0) {
    theInfo = theInfo + `<h2>${acf.code}</h2><p>Code</p>`
  }
  if (acf.concept_research_and_strategy.length !== 0) {
    theInfo = theInfo + `<h2>${acf.concept_research_and_strategy}</h2><p>Concept, Research, and Strategy</p>`
  }
  if (acf.content_direction.length !== 0) {
    theInfo = theInfo + `<h2>${acf.content_direction}</h2><p>Creative Direction</p>`
  }
  if (acf.creative_direction.length !== 0) {
    theInfo = theInfo + `<h2>${acf.creative_direction}</h2><p>Creative Direction</p>`
  }
  if (acf.curation.length !== 0) {
    theInfo = theInfo + `<h2>${acf.curation}</h2><p>Curation</p>`
  }
  if (acf.design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.design}</h2><p>Design</p>`
  }
  if (acf.design_director.length !== 0) {
    theInfo = theInfo + `<h2>${acf.design_director}</h2><p>Design Direction</p>`
  }
  if (acf.director.length !== 0) {
    theInfo = theInfo + `<h2>${acf.director}</h2><p>Director</p>`
  }
  if (acf.editor.length !== 0) {
    theInfo = theInfo + `<h2>${acf.editor}</h2><p>Editor</p>`
  }
  if (acf.editorial_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.editorial_design}</h2><p>Editorial Design</p>`
  }
  if (acf.exhibition_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.exhibition_design}</h2><p>Exhibition Design</p>`
  }
  if (acf.fashion_editor.length !== 0) {
    theInfo = theInfo + `<h2>${acf.fashion_editor}</h2><p>Fashion Editor</p>`
  }
  if (acf.graphic_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.graphic_design}</h2><p>Graphic Design</p>`
  }
  if (acf.hair_stylist.length !== 0) {
    theInfo = theInfo + `<h2>${acf.hair_stylist}</h2><p>Hair Stylist</p>`
  }
  if (acf.illustration.length !== 0) {
    theInfo = theInfo + `<h2>${acf.illustration}</h2><p>Illustration</p>`
  }
  if (acf.jersey_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.jersey_design}</h2><p>Jersey Design</p>`
  }
  if (acf.logo_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.logo_design}</h2><p>Logo Design</p>`
  }
  if (acf.makeup_artist.length !== 0) {
    theInfo = theInfo + `<h2>${acf.makeup_artist}</h2><p>Makeup Artist</p>`
  }
  if (acf.model.length !== 0) {
    theInfo = theInfo + `<h2>${acf.model}</h2><p>Model</p>`
  }
  if (acf.motion_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.motion_design}</h2><p>Motion Design</p>`
  }
  if (acf.packaging.length !== 0) {
    theInfo = theInfo + `<h2>${acf.packaging}</h2><p>Packaging</p>`
  }
  if (acf.photography.length !== 0) {
    theInfo = theInfo + `<h2>${acf.photography}</h2><p>Photography</p>`
  }
  if (acf.production.length !== 0) {
    theInfo = theInfo + `<h2>${acf.production}</h2><p>Production</p>`
  }
  if (acf.project_engineering.length !== 0) {
    theInfo = theInfo + `<h2>${acf.project_engineering}</h2><p>Project Engineering</p>`
  }
  if (acf.publisher.length !== 0) {
    theInfo = theInfo + `<h2>${acf.publisher}</h2><p>Publisher</p>`
  }
  if (acf.set_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.set_design}</h2><p>Set Design</p>`
  }
  if (acf.shoe_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.shoe_design}</h2><p>Shoe Design</p>`
  }
  if (acf.stylist.length !== 0) {
    theInfo = theInfo + `<h2>${acf.stylist}</h2><p>Stylist</p>`
  }
  if (acf.talent.length !== 0) {
    theInfo = theInfo + `<h2>${acf.talent}</h2><p>Talent</p>`
  }
  if (acf.type_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.type_design}</h2><p>Type Design</p>`
  }
  if (acf.typography.length !== 0) {
    theInfo = theInfo + `<h2>${acf.typography}</h2><p>Typography</p>`
  }
  if (acf.visuals.length !== 0) {
    theInfo = theInfo + `<h2>${acf.visuals}</h2><p>Visuals</p>`
  }
  if (acf.video.length !== 0) {
    theInfo = theInfo + `<h2>${acf.video}</h2><p>Video</p>`
  }
  if (acf.video_editing.length !== 0) {
    theInfo = theInfo + `<h2>${acf.video_editing}</h2><p>Video Editing</p>`
  }
  if (acf.webdesign.length !== 0) {
    theInfo = theInfo + `<h2>${acf.webdesign}</h2><p>Web Design</p>`
  }
  if (acf.handle.length !== 0) {
    theInfo = theInfo + `<h2>${acf.handle}</h2>`
  }
  theInfo = theInfo + `</div>`
  return theInfo
}

var createThumbnails = project => {
  var { acf } = project
  // console.log(acf)
  var newThumbs = `<div id="project-thumbnails-${project.id}" class="project-thumbnails">`
  // compile thumbnail images with id's
  var windowWidth = jQuery(window).width()
  // loop through and create thumb HTML
  project.imagesArray.map(num => {
    if (windowWidth <= 850) {
      if (acf[`portfolio_image_portrait_${num}`] !== false) {
        newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="${acf[`portfolio_image_portrait_${num}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>` 
      } else {
        if (acf[`portfolio_mobile_video_thumbnail_${num}`] !== false) {
          newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="${acf[`portfolio_mobile_video_thumbnail_${num}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>`
        } else {
          newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="https://www.tlbx.app/200-300.svg" alt="thumbnail from ${project.title.rendered} project" /></div>`
        }
      }
    } else {
      if (acf[`portfolio_image_landscape_${num}`] !== false) {
        newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="${acf[`portfolio_image_landscape_${num}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>` 
      } else {
        if (acf[`portfolio_thumbnail_${num}`] !== false) {
          // console.log("the thumb: ", acf[`portfolio_thumbnail_${num}`])
          // console.log("testing thumb: ", project.id, num)
          newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="${acf[`portfolio_thumbnail_${num}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>`
        } else {
          newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="https://www.tlbx.app/200-300.svg" alt="thumbnail from ${project.title.rendered} project" /></div>`
        } 
      }
    }
  })

  newThumbs = newThumbs + '</div>'
  return newThumbs
}

var createImages = project => {
  var { acf } = project
  var newImages = `<div class="project-images" id="project-images-${project.id}">`
  var windowWidth = jQuery(window).width()
  project.imagesArray.map(num => {
    // console.log(project.slug, num)
    var src = ''
    var mediumSrc = ''
    var videoPoster = ''

    if (windowWidth <= 850) {
      if (acf[`portfolio_image_portrait_${num}`] !== false) {
        src = acf[`portfolio_image_portrait_${num}`].url
        // console.log(src)
        mediumSrc = acf[`portfolio_image_portrait_${num}`].sizes.medium
        newImages = newImages + `<div class="project-image" id="project-image-${project.id}-${num}" style="background-image:url(${mediumSrc});" data-image-full="${src}"><img src="${src}" alt="Image from ${project.title.rendered} Project" /></div>`
      } else {
        src = acf[`portfolio_video_portrait_${num}`].url
        if (acf[`portfolio_mobile_video_thumbnail_${num}`] !== false) {
          // console.log("video poster: ", num, project.id)
          videoPoster = acf[`portfolio_mobile_video_thumbnail_${num}`].url
        } else {
          videoPoster = 'https://www.tlbx.app/200-300.svg'
        }
        newImages = newImages + `<div class="project-image is-loaded" id="project-image-${project.id}-${num}"><video id="video-${project.id}-${num}" src="${src}" poster="${videoPoster}" autoplay loop playsinline muted></div>`
      }
    } else {
      if (acf[`portfolio_image_landscape_${num}`]) {
        src = acf[`portfolio_image_landscape_${num}`].url
        mediumSrc = acf[`portfolio_image_landscape_${num}`].sizes.medium
        newImages = newImages + `<div class="project-image" id="project-image-${project.id}-${num}" style="background-image:url(${mediumSrc});" data-image-full="${src}"><img src="${src}" alt="Image from ${project.title.rendered} Project" /></div>`
      } else {
        src = acf[`portfolio_video_landscape_${num}`].url
        if (acf[`portfolio_thumbnail_${num}`] !== false) {
          videoPoster = acf[`portfolio_thumbnail_${num}`].url
        } else {
          videoPoster = 'https://www.tlbx.app/200-300.svg'
        }
        newImages = newImages + `<div class="project-image is-loaded" id="project-image-${project.id}-${num}"><video id="video-${project.id}-${num}" src="${src}" poster="${videoPoster}" autoplay loop playsinline muted></div>`
      }
    }
  })

  // close project-images div
  newImages = newImages + '</div>'

  return newImages
}
var leoSounds = [
    'arabic_f.mp3',
    'arabic_m.mp3',
    'chin_m.mp3',
    'chin_m2.mp3',
    'danisch_f.mp3',
    'danisch_m.mp3',
    'dutch_f.mp3',
    'dutch_m.mp3',
    'elgisch_m2.mp3',
    'englisch_4.mp3',
    'englisch_5.mp3',
    'english.mp3',
    'enlgisch_3.mp3',
    'frensh_f.mp3',
    'frensh_m.mp3',
    'german_f.mp3',
    'german_f2.mp3',
    'german_m.mp3',
    'hebraisch_m.mp3',
    'italian_f.mp3',
    'italian_m.mp3',
    'italian_m2.mp3',
    'japanese_child.mp3',
    'japanese_f.mp3',
    'japanese_m.mp3',
    'korean_f.mp3',
    'korean_m.mp3',
    'norway_f.mp3',
    'norway_m.mp3',
    'polisch_f.mp3',
    'polish_m.mp3',
    'portugal_f.mp3',
    'portugal_m.mp3',
    'porturgal_f2.mp3',
    'romain_f.mp3',
    'romain_f2.mp3',
    'rusiisch_f.mp3',
    'russisch_m.mp3',
    'schwedisch_f.mp3',
    'schwedisch_f2.mp3',
    'schwedisch_m.mp3',
    'spanisch_f.mp3',
    'spanisch_m.mp3',
    'spansich_m2.mp3',
    'tarkisch_f.mp3',
    'tarkisch_m.mp3',
    'welsch_f.mp3',
    'welsch_m.mp3'
  ]

  jQuery(document).ready(function($) {
    // LOAD LEO SOUNDS
    // leoSounds.map(sound => {
    //     var audioHTML = '<div class="audio-container">'
    //     audioHTML = audioHTML + `<audio class="audio-${sound.slice(0,-4)}" src="${LEOSITE.templateURI}/sounds/${sound}"></audio>`
    //     audioHTML + audioHTML + '</div>'
    //     $(document.body).append(audioHTML)

    // })
    // PLAY LEO SOUNDS
    $('.play-leo').click(function() {
        // console.log('play leo')
        var sound = leoSounds[Math.floor(Math.random()*leoSounds.length)];
        // console.log("playing: ", sound)
        $(`.audio-${sound.slice(0,-4)}`).get(0).play()
      })

    //   $('.play-leo-portfolio').click(function() {
    //     console.log('play leo')
    //     var sound = leoSounds[Math.floor(Math.random()*leoSounds.length)];
    //     console.log("playing: ", sound)
    //     $(`.audio-${sound.slice(0,-4)}`).get(0).play()
    //   })

    $(document).on('click', '.play-leo-portfolio', function(e) {
        // console.log('play that leo')
        var sound = leoSounds[Math.floor(Math.random()*leoSounds.length)];
        // console.log("playing: ", sound)
        $(`.audio-${sound.slice(0,-4)}`).get(0).play()
    })
  })
jQuery(document).ready(function($) {
    clockUpdate()
    setInterval(clockUpdate, 1000);
    dots();
});

function clockUpdate() {
    var d = new Date();
    localTime = d.getTime();
    localOffset = d.getTimezoneOffset() * 60000;

    // obtain UTC time in msec
    utc = localTime + localOffset;
    // create new Date object for different city
    // using supplied offset
    var date = new Date(utc + (3600000*1));
    function addZero(x) {
        if ( x < 10) {
            return x = '0' + x
        } else {
            return x
        }
    }

    function twelveHour(x) {
        if (x > 12) {
          return x = x - 12;
        } else if (x == 0) {
          return x = 12;
        } else {
          return x;
        }
      }

      var h = addZero(twelveHour(date.getHours()))
      var m = addZero(date.getMinutes())
      var s = addZero(date.getSeconds())

      jQuery("#clock").text(h + ':' + m + ':' + s)
      jQuery(".clock").text(h + ':' + m + ':' + s)
}

var theDots = '...'
var i = 0;

function dots() {
  if (document.getElementById('loading-dots')) {
    if (i < theDots.length) {
      document.getElementById('loading-dots').innerHTML += theDots.charAt(i)
      i++;
      setTimeout(dots, 500)
    } else {
      i = 0
      document.getElementById('loading-dots').innerHTML = ''
      setTimeout(dots, 500)
    }
  }
}