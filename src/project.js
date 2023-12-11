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