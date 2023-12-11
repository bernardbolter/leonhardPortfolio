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
// variable for array of projects with project that was clicked on at the top
var sortedProjects = []
var sortedProjectsWithLength = []
var ticker
var timerPaused = false
var currentProjectId = 245
var currentProjectImage = 1
var aboutInfo = []

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
      console.log(projectData)
      var aboutData = await wp.apiRequest({ path: 'wp/v2/pages/104' })
      console.log(aboutData)
      aboutInfo = aboutData
      var currentProject = projectData.filter(project => project.id === parseInt(post_id))
      sortedProjects = projectData.filter(project => project.id !== parseInt(post_id))
      sortedProjects.unshift(currentProject[0])
      // add number of projects based on mobile and desktop
      sortedProjectsWithLength = makeImageArray(sortedProjects)
      console.log("sorted: ",sortedProjectsWithLength)
      buildProjectsAssets(sortedProjectsWithLength)
      theTimer(sortedProjectsWithLength[0].id, sortedProjectsWithLength[0].imagesArray[0])
      console.log(sortedProjectsWithLength)
    }

    if (post_id !== undefined) {
      getProjectData(post_id)
    }

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

      restartTimer()
    })

    // CLICK A PROJECT THUMBNAIL AND RESET OVERLAYS, CURRETN PROJECT, CURRENT IMAGE ID
    $(document).on('click', '.project-thumb', function(e) {
      // chack if the timer is Paused
      console.log(timerPaused)
      if (!timerPaused) {
        // get the div of wrapping id
        var parent_id = $(this).closest("div").attr("id").split('-')
        // get the current project ID
        var project_id = parseInt(parent_id[2])
        // get the current Project Image Number
        var image_number = parseInt(parent_id[3])
        resetThumbFadesAfterClick(project_id, image_number)
        clearTimeout(ticker)
        console.log("ticker: ", ticker)
        theTimer(project_id, image_number)
      }
    })
})

var restartTimer = () => {
  resetThumbFadesAfterClick(currentProjectId, currentProjectImage + 1)
  // get the id of the current project
  var thisProject = sortedProjectsWithLength.filter(project => project.id === currentProjectId)
  var nextProjectId
  var nextImage
  if (currentProjectImage < thisProject[0].imagesArray.length ) {
    nextProjectId = currentProjectId
    getNextImageIndex = thisProject[0].imagesArray.indexOf(currentProjectImage)
    nextImage = thisProject[0].imagesArray[getNextImageIndex + 1]
    var windowWidth = jQuery(window).width()
    jQuery(`#project-images-${currentProjectId}`).css('transform', `translateX(-${windowWidth * (parseInt(getNextImageIndex + 1))}px)`)
  } else {
    var nextProject = findNextOrder(currentProjectId)
    nextProjectId = nextProject.id
    document.getElementById(`project-${nextProject.id}`).scrollIntoView({ behavior: "smooth" });
    nextImage = nextProject.imagesArray[0]
  }
  theTimer(nextProjectId, nextImage)
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

  // map all projects
  sortedProjects.map(project => {
    if (project.id === parseInt(project_id)) {
      // if current project switch variable to true
      afterCurrentProject = true
      project.imagesArray.map(num => {
        if (num < parseInt(image_number)) {
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).addClass('thumb-overlay-on').css("transition", `0s !important`)
        } else {
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).removeClass('thumb-overlay-on').css("transition", `0s`)
        } 
      })
    } else {
      if (afterCurrentProject) {
        project.imagesArray.map(num => {
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).removeClass('thumb-overlay-on').css("transition", `0s !important`)
        })
      } else {
        project.imagesArray.map(num => {
          jQuery(`#project-thumb-overlay-${project.id}-${num}`).addClass('thumb-overlay-on').css("transition", `0s`)
        })
      }
    }
  })
}

// Reset the current image when clicking a thumb or after timer reset
var resetCurrentImage = (project_id, image_number) => {
  // get the windowWidth
  var windowWidth = jQuery(window).width()
  jQuery(`#project-images-${project_id}`).css('transform', `translateX(-${windowWidth * (parseInt(image_number - 1))}px)`)
}


var theTimer = (project_id, image_number) => {
  // console.log("started timer")
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
    transitionLength = currentProject.acf[`portfolio_video_mobile_length_${image_number}`]
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
      jQuery(`#project-images-${project_id}`).css('transform', `translateX(-${windowWidth * (parseInt(imageIndex + 1))}px)`)
      // restart the timer
      theTimer(project_id, currentProject.imagesArray[imageIndex + 1])
    } else {
      // find next project 
      var nextProject = findNextOrder(project_id)
      // scroll to next project, using polyfill smoothscroll
      document.getElementById(`project-${nextProject.id}`).scrollIntoView({ behavior: "smooth" });
      // start image timer in the next project
      theTimer(nextProject.id, nextProject.imagesArray[0])
    }


  }, [`${transitionLength}000`])
}

var findNextOrder = (current_id) => {
  let index = sortedProjects.findIndex(({ id }) => id === current_id)
  return index > -1 && index < sortedProjects.length - 1 ? sortedProjects[index + 1] : undefined
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

    // add project container
    var newAssets = `<div class='project-container' id='project-${project.id}'>`
    // add logo
    newAssets = newAssets + `<div class="project-logo"><img src="${LEOSITE.templateURI}/img/logo_still.png" alt="logo" /></div>`
    // add project buttons wrapper
    newAssets = newAssets + '<div class="project-buttons-container">'
    // add back button
    newAssets = newAssets + `<a href="/?link=true" class="project-back"><img src="${LEOSITE.templateURI}/img/back.png" alt="back button" /></a>`
    // add name
    newAssets = newAssets + `<h1 id="project-name-${project.id}"class="project-name">Leanhard Laupichler</h1>`
    // add name close button
    newAssets = newAssets + `<div id="name-close-${project.id}" class="name-close name-close-hide"><img src="${LEOSITE.templateURI}/img/close.png" alt="close button" /></div>`
    // add title button
    newAssets = newAssets + `<div id="project-title-${project.id}" class="project-title">${project.title.rendered}</div>`
    // add close button
    newAssets = newAssets + `<div id="project-info-close-${project.id}" class="project-info-close project-info-close-hide"><img src="${LEOSITE.templateURI}/img/close.png" alt="close button" /></div>`
    // close project buttons container
    newAssets = newAssets + '</div>'
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
  theAbout = theAbout + '<h2 class="clock-container">Current Time: <span id="clock"></span> CET</h2>'
  theAbout = theAbout + '<h2 class="office-times">Monday-Friday: 09:00-18:00</h2>'
  theAbout = theAbout + '<p>Office Hours</p>'
  theAbout = theAbout + '<h2>contact@leonhardlaupichler.com</h2>'
  theAbout = theAbout + '<p>Email</p>'
  theAbout = theAbout + `<div class="clients-container"><p>${acf.clients}</p></div>`
  theAbout = theAbout + '<a href="/imprint">Imprint</a>'
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
    theInfo = theInfo + `<h2>${acf.design_director}</h2><p>Design Director</p>`
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
        if (acf[`portfolio_thumbnail_${num}`] !== false) {
          newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="${acf[`portfolio_thumbnail_${num}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>`
        } else {
          newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="https://www.tlbx.app/200-300.svg" alt="thumbnail from ${project.title.rendered} project" /></div>`
        }
      }
    } else {
      if (acf[`portfolio_image_landscape_${num}`] !== false) {
        newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${num}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${num}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${num}" src="${acf[`portfolio_image_landscape_${num}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>` 
      } else {
        if (acf[`portfolio_thumbnail_${num}`] !== false) {
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
    var src = ''
    var mediumSrc = ''
    if (windowWidth <= 850) {
      if (acf[`portfolio_image_portrait_${num}`] !== false) {
        src = acf[`portfolio_image_portrait_${num}`].url
        mediumSrc = acf[`portfolio_image_portrait_${num}`].sizes.medium
        newImages = newImages + `<div class="project-image" id="project-image-${project.id}-${num}" style="background-image:url(${mediumSrc});" data-image-full="${src}"><img src="${src}" alt="Image from ${project.title.rendered} Project" /></div>`
      } else {
        src = acf[`portfolio_video_portrait_${num}`].url
        newImages = newImages + `<div class="project-image" id="project-image-${project.id}-${num}"><video id="video-${project.id}-${num}" src="${src}" autoplay loop playsinline muted></div>`
      }
    } else {
      if (acf[`portfolio_image_landscape_${num}`]) {
        src = acf[`portfolio_image_portrait_${num}`].url
        mediumSrc = acf[`portfolio_image_portrait_${num}`].sizes.medium
        newImages = newImages + `<div class="project-image" id="project-image-${project.id}-${num}" style="background-image:url(${mediumSrc});" data-image-full="${src}"><img src="${src}" alt="Image from ${project.title.rendered} Project" /></div>`
      } else {
        src = acf[`portfolio_video_landscape_${num}`].url
        newImages = newImages + `<div class="project-image" id="project-image-${project.id}-${num}"><video id="video-${project.id}-${num}" src="${src}" autoplay loop playsinline muted></div>`
      }
    }
  })

  // close project-images div
  newImages = newImages + '</div>'

  return newImages
}
'use strict';

// polyfill
function polyfill() {
  // aliases
  var w = window;
  var d = document;

  // return if scroll behavior is supported and polyfill is not forced
  if (
    'scrollBehavior' in d.documentElement.style &&
    w.__forceSmoothScrollPolyfill__ !== true
  ) {
    return;
  }

  // globals
  var Element = w.HTMLElement || w.Element;
  var SCROLL_TIME = 468;

  // object gathering original scroll methods
  var original = {
    scroll: w.scroll || w.scrollTo,
    scrollBy: w.scrollBy,
    elementScroll: Element.prototype.scroll || scrollElement,
    scrollIntoView: Element.prototype.scrollIntoView
  };

  // define timing method
  var now =
    w.performance && w.performance.now
      ? w.performance.now.bind(w.performance)
      : Date.now;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

  /*
   * IE has rounding bug rounding down clientHeight and clientWidth and
   * rounding up scrollHeight and scrollWidth causing false positives
   * on hasScrollableSpace
   */
  var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

  /**
   * changes scroll position inside an element
   * @method scrollElement
   * @param {Number} x
   * @param {Number} y
   * @returns {undefined}
   */
  function scrollElement(x, y) {
    this.scrollLeft = x;
    this.scrollTop = y;
  }

  /**
   * returns result of applying ease math function to a number
   * @method ease
   * @param {Number} k
   * @returns {Number}
   */
  function ease(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  /**
   * indicates if a smooth behavior should be applied
   * @method shouldBailOut
   * @param {Number|Object} firstArg
   * @returns {Boolean}
   */
  function shouldBailOut(firstArg) {
    if (
      firstArg === null ||
      typeof firstArg !== 'object' ||
      firstArg.behavior === undefined ||
      firstArg.behavior === 'auto' ||
      firstArg.behavior === 'instant'
    ) {
      // first argument is not an object/null
      // or behavior is auto, instant or undefined
      return true;
    }

    if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
      // first argument is an object and behavior is smooth
      return false;
    }

    // throw error when behavior is not supported
    throw new TypeError(
      'behavior member of ScrollOptions ' +
        firstArg.behavior +
        ' is not a valid value for enumeration ScrollBehavior.'
    );
  }

  /**
   * indicates if an element has scrollable space in the provided axis
   * @method hasScrollableSpace
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function hasScrollableSpace(el, axis) {
    if (axis === 'Y') {
      return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
    }

    if (axis === 'X') {
      return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
    }
  }

  /**
   * indicates if an element has a scrollable overflow property in the axis
   * @method canOverflow
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function canOverflow(el, axis) {
    var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

    return overflowValue === 'auto' || overflowValue === 'scroll';
  }

  /**
   * indicates if an element can be scrolled in either axis
   * @method isScrollable
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function isScrollable(el) {
    var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
    var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

    return isScrollableY || isScrollableX;
  }

  /**
   * finds scrollable parent of an element
   * @method findScrollableParent
   * @param {Node} el
   * @returns {Node} el
   */
  function findScrollableParent(el) {
    while (el !== d.body && isScrollable(el) === false) {
      el = el.parentNode || el.host;
    }

    return el;
  }

  /**
   * self invoked function that, given a context, steps through scrolling
   * @method step
   * @param {Object} context
   * @returns {undefined}
   */
  function step(context) {
    var time = now();
    var value;
    var currentX;
    var currentY;
    var elapsed = (time - context.startTime) / SCROLL_TIME;

    // avoid elapsed times higher than one
    elapsed = elapsed > 1 ? 1 : elapsed;

    // apply easing to elapsed time
    value = ease(elapsed);

    currentX = context.startX + (context.x - context.startX) * value;
    currentY = context.startY + (context.y - context.startY) * value;

    context.method.call(context.scrollable, currentX, currentY);

    // scroll more if we have not reached our destination
    if (currentX !== context.x || currentY !== context.y) {
      w.requestAnimationFrame(step.bind(w, context));
    }
  }

  /**
   * scrolls window or element with a smooth behavior
   * @method smoothScroll
   * @param {Object|Node} el
   * @param {Number} x
   * @param {Number} y
   * @returns {undefined}
   */
  function smoothScroll(el, x, y) {
    var scrollable;
    var startX;
    var startY;
    var method;
    var startTime = now();

    // define scroll context
    if (el === d.body) {
      scrollable = w;
      startX = w.scrollX || w.pageXOffset;
      startY = w.scrollY || w.pageYOffset;
      method = original.scroll;
    } else {
      scrollable = el;
      startX = el.scrollLeft;
      startY = el.scrollTop;
      method = scrollElement;
    }

    // scroll looping over a frame
    step({
      scrollable: scrollable,
      method: method,
      startTime: startTime,
      startX: startX,
      startY: startY,
      x: x,
      y: y
    });
  }

  // ORIGINAL METHODS OVERRIDES
  // w.scroll and w.scrollTo
  w.scroll = w.scrollTo = function() {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.scroll.call(
        w,
        arguments[0].left !== undefined
          ? arguments[0].left
          : typeof arguments[0] !== 'object'
            ? arguments[0]
            : w.scrollX || w.pageXOffset,
        // use top prop, second argument if present or fallback to scrollY
        arguments[0].top !== undefined
          ? arguments[0].top
          : arguments[1] !== undefined
            ? arguments[1]
            : w.scrollY || w.pageYOffset
      );

      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(
      w,
      d.body,
      arguments[0].left !== undefined
        ? ~~arguments[0].left
        : w.scrollX || w.pageXOffset,
      arguments[0].top !== undefined
        ? ~~arguments[0].top
        : w.scrollY || w.pageYOffset
    );
  };

  // w.scrollBy
  w.scrollBy = function() {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0])) {
      original.scrollBy.call(
        w,
        arguments[0].left !== undefined
          ? arguments[0].left
          : typeof arguments[0] !== 'object' ? arguments[0] : 0,
        arguments[0].top !== undefined
          ? arguments[0].top
          : arguments[1] !== undefined ? arguments[1] : 0
      );

      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(
      w,
      d.body,
      ~~arguments[0].left + (w.scrollX || w.pageXOffset),
      ~~arguments[0].top + (w.scrollY || w.pageYOffset)
    );
  };

  // Element.prototype.scroll and Element.prototype.scrollTo
  Element.prototype.scroll = Element.prototype.scrollTo = function() {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      // if one number is passed, throw error to match Firefox implementation
      if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
        throw new SyntaxError('Value could not be converted');
      }

      original.elementScroll.call(
        this,
        // use left prop, first number argument or fallback to scrollLeft
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
        // use top prop, second argument or fallback to scrollTop
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
      );

      return;
    }

    var left = arguments[0].left;
    var top = arguments[0].top;

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(
      this,
      this,
      typeof left === 'undefined' ? this.scrollLeft : ~~left,
      typeof top === 'undefined' ? this.scrollTop : ~~top
    );
  };

  // Element.prototype.scrollBy
  Element.prototype.scrollBy = function() {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.elementScroll.call(
        this,
        arguments[0].left !== undefined
          ? ~~arguments[0].left + this.scrollLeft
          : ~~arguments[0] + this.scrollLeft,
        arguments[0].top !== undefined
          ? ~~arguments[0].top + this.scrollTop
          : ~~arguments[1] + this.scrollTop
      );

      return;
    }

    this.scroll({
      left: ~~arguments[0].left + this.scrollLeft,
      top: ~~arguments[0].top + this.scrollTop,
      behavior: arguments[0].behavior
    });
  };

  // Element.prototype.scrollIntoView
  Element.prototype.scrollIntoView = function() {
    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.scrollIntoView.call(
        this,
        arguments[0] === undefined ? true : arguments[0]
      );

      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    var scrollableParent = findScrollableParent(this);
    var parentRects = scrollableParent.getBoundingClientRect();
    var clientRects = this.getBoundingClientRect();

    if (scrollableParent !== d.body) {
      // reveal element inside parent
      smoothScroll.call(
        this,
        scrollableParent,
        scrollableParent.scrollLeft + clientRects.left - parentRects.left,
        scrollableParent.scrollTop + clientRects.top - parentRects.top
      );

      // reveal parent in viewport unless is fixed
      if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
        w.scrollBy({
          left: parentRects.left,
          top: parentRects.top,
          behavior: 'smooth'
        });
      }
    } else {
      // reveal element in viewport
      w.scrollBy({
        left: clientRects.left,
        top: clientRects.top,
        behavior: 'smooth'
      });
    }
  };
}

if (typeof exports === 'object' && typeof module !== 'undefined') {
  // commonjs
  module.exports = { polyfill: polyfill };
} else {
  // global
  polyfill();
}

// smoothscroll.polyfill()
jQuery(document).ready(function($) {
    clockUpdate()
    setInterval(clockUpdate, 1000);
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
}