// variable for array of projects with project that was clicked on at the top
var sortedProjects = []
var ticker

// rebuild assets on resize
jQuery(window).bind('resizeEnd', function() {
  //do something, window hasn't changed size in 500ms
  console.log("resized")
  buildProjectsAssets(sortedProjects);
});

jQuery(window).resize(function() {
  if(this.resizeTO) clearTimeout(this.resizeTO);
  this.resizeTO = setTimeout(function() {
      jQuery(this).trigger('resizeEnd');
  }, 500);
});

jQuery(document).ready(function($) {
    post_id = jQuery("#post_id").val();
    console.log(post_id)
    
    async function getProjectData(post_id) {
      var projectData = await wp.apiRequest({ path: 'wp/v2/posts?acf_format=standard&per_page=100' })
      var currentProject = projectData.filter(project => project.id === parseInt(post_id))
      sortedProjects = projectData.filter(project => project.id !== parseInt(post_id))
      sortedProjects.unshift(currentProject[0])
      console.log(sortedProjects)
      buildProjectsAssets(sortedProjects)
      theTimer(sortedProjects[0].id, 1)

    }
    if (post_id !== undefined) {
      getProjectData(post_id)
    }

    // show project info
    $(document).on('click', '.project-title', function(e) {
      var id = e.target.id.slice(-3)
      var title = `#project-title-${id}`
      $(title).addClass('project-title-hide')
      var info = `#project-info-${id}`
      $(info).removeClass('project-info-container-hide')
      var close = `#project-info-close-${id}`
      $(close).removeClass('project-info-close-hide')
      if (jQuery(window).width() > 850) {
        $(`#project-thumbnails-${id}`).css("left", "92px")
      }
    })

    // hide project info - click on outer svg
    $(document).on('click', '.project-info-close', function(e) {
      var id = e.target.id.slice(-3)
      var title = `#project-title-${id}`
      $(title).removeClass('project-title-hide')
      var info = `#project-info-${id}`
      $(info).addClass('project-info-container-hide')
      var close = `#project-info-close-${id}`
      $(close).addClass('project-info-close-hide')
      if (jQuery(window).width() > 850) {
        var titleWidth = jQuery(`#project-title-${id}`).width()
        $(`#project-thumbnails-${id}`).css("left", `${titleWidth + 86}px`)
      }
    })

    // hide project info - click on path
    $(document).on('click', '.project-info-close-path', function(e) {
      var id = e.target.id.slice(-3)
      var title = `#project-title-${id}`
      $(title).removeClass('project-title-hide')
      var info = `#project-info-${id}`
      $(info).addClass('project-info-container-hide')
      var close = `#project-info-close-${id}`
      $(close).addClass('project-info-close-hide')
      if (jQuery(window).width() > 850) {
        var titleWidth = jQuery(`#project-title-${id}`).width()
        $(`#project-thumbnails-${id}`).css("left", `${titleWidth + 86}px`)
      }
    })

    // click on project thumbs to move images
    $(document).on('click', '.project-thumb', function(e) {
      clearTimeout(ticker)
      var windowWidth = $(window).width()
      var parent_id = $(this).closest("div").attr("id").split('-')
      var project_id = parent_id[2]
      var image_number = parent_id[3]
      console.log(project_id, image_number)
      $(`#project-images-${project_id}`).css('transform', `translateX(-${windowWidth * (parseInt(image_number)- 1)}px)`)
    })
})


var theTimer = (project_id, image_number) => {
  
  // get the current project
  var currentProject = sortedProjects.find(project => project.id === project_id)
  // get total number of projects
  var totalImages = getTotalImages(currentProject)
  // get the transition time length
  var transitionLength = currentProject.acf[`portfolio_video_length_${image_number}`]
  console.log(project_id, image_number, transitionLength)
  // add transition length to class
  jQuery(`#project-thumb-overlay-${project_id}-${image_number}`).addClass('thumb-overlay-on').css("transition", `${transitionLength}s`)
  // check if its a video and start video from the begining
  var videoCheck = jQuery(`#video-${project_id}-${image_number}`)
  console.log(videoCheck)
  if (videoCheck.length !== 0) {
    jQuery(`#video-${project_id}-${image_number}`).trigger('play')
  } 
  // start timer
  ticker = setTimeout(() => {
    if (image_number < totalImages ) {
      var windowWidth = jQuery(window).width()
      jQuery(`#project-images-${project_id}`).css('transform', `translateX(-${windowWidth * (parseInt(image_number))}px)`)
      
      theTimer(project_id, image_number + 1)
    } else {
      // find next project 
      var nextProject = findNextOrder(project_id)
      console.log(nextProject)
      // scroll to next project, using polyfill smoothscroll
      document.getElementById(`project-${nextProject.id}`).scrollIntoView({ behavior: "smooth" });
      // start image timer in the next project
      theTimer(nextProject.id, 1)
    }


  }, [`${transitionLength}000`])
}

var getTotalImages = (currentProject) => {
  let total = 0
  for (let i = 1; i < 21; i++) {
    if ((currentProject.acf[`portfolio_image_landscape_${i}`] !== false) || (currentProject.acf[`portfolio_video_landscape_${i}`] !== false)) {
      total = total + 1
    }
  }
  return total
}

var findNextOrder = (current_id) => {
  let index = sortedProjects.findIndex(({ id }) => id === current_id)
  return index > -1 && index < sortedProjects.length - 1 ? sortedProjects[index + 1] : undefined
}

var buildProjectsAssets = projects => {
  // get all project HTML back as an array of strings
  var projectAssets = createProjectAssets(projects)
  // join all HTM into one string
  var allProjects = projectAssets.join('')
  console.log("all assets: ", allProjects)
  var container = document.getElementById('projects-container')
  // inject into page
  if (container) {
    jQuery('#projects-container').html(allProjects)
    lazyLoad()
    if (jQuery(window).width() > 850) {
      projects.map(project => {
        var id = project.id
        var titleWidth = jQuery(`#project-title-${id}`).width()
        jQuery(`#project-thumbnails-${id}`).css("left", `${titleWidth + 86}px`)
      })
    }
    projects.map(project => {

      var projectsWidth = 0;
      var widthMinusScroll = jQuery("body").prop("clientWidth");
      console.log(widthMinusScroll)
      for (i = 1; i < 21; i++) {
        if (project.acf[`portfolio_image_landscape_${i}`] || project.acf[`portfolio_video_landscape_${i}`]) {
          projectsWidth = projectsWidth + widthMinusScroll
        }
      }
      jQuery(`#project-images-${project.id}`).css("width", `${projectsWidth}px`)
    })
  }
}

var createProjectAssets = projects => {
  var newAssetsString = []
  projects.forEach(project => {

    // add project container
    var newAssets = `<div class='project-container' id='project-${project.id}'>`

    // add back button
    newAssets = newAssets + `<a href='/' class="project-back"><svg viewBox="0 0 42 42"><circle class="back-circle" cx="21" cy="21" r="21" /><path d="M24 13L16 21L24 29" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`
    // add title button
    newAssets = newAssets + `<div id="project-title-${project.id}" class="project-title">${project.title.rendered}</div>`
    // add close button
    newAssets = newAssets + `<svg id="project-info-close-${project.id}" class="project-info-close project-info-close-hide" viewBox="0 0 24 24"> <path class="project-info-close-path" id="project-info-close-path-${project.id}" d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" /></svg>`
   
    // add about container
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
  // console.log(project)
  var newThumbs = `<div id="project-thumbnails-${project.id}" class="project-thumbnails">`
  // compile thumbnail images with id's
  for (i = 1; i < 21; i++) {
    if (acf[`portfolio_image_landscape_${i}`] || acf[`portfolio_video_landscape_${i}`]) {
      if (acf[`portfolio_image_landscape_${i}`]) {
        // add image thumbnail with id from index
        // console.log(i, "image exists")
        newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${i}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${i}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${i}" src="${acf[`portfolio_image_landscape_${i}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>` 
      } else {
        // check if the video thumb has been uplaoded
        // console.log(i, " video exists")
        if (acf[`portfolio_thumbnail_${i}`]) {
          // console.log(i, " video thumb exists")
          newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${i}"><div class="thumb-overlay" id="project-thumb-overlay-${project.id}-${i}"></div><img class="project-thumb-image" id="project-thumb-image-${project.id}-${i}" src="${acf[`portfolio_thumbnail_${i}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>`
        }
      }
    }
  }

  newThumbs = newThumbs + '</div>'
  return newThumbs
}

var createImages = project => {
  var { acf } = project
  console.log(project.id)
  var newImages = `<div class="project-images" id="project-images-${project.id}">`

  for ( i = 1; i < 21; i++) {
    var src = ''
    var mediumSrc = ''
    if (acf[`portfolio_image_landscape_${i}`] || acf[`portfolio_video_landscape_${i}`]) {
      if (acf[`portfolio_image_landscape_${i}`] && acf[`portfolio_image_portrait_${i}`]) {
        if (jQuery(window).width() > 850) {
            src = acf[`portfolio_image_landscape_${i}`].url
            mediumSrc = acf[`portfolio_image_landscape_${i}`].sizes.medium
          } else {
            src = acf[`portfolio_image_portrait_${i}`].url
            mediumSrc = acf[`portfolio_image_portrait_${i}`].sizes.medium
          }
          // add in image
          newImages = newImages + `<div class="project-image" id="project-image-${project.id}-${i}" style="background-image:url(${mediumSrc});" data-image-full="${src}"><img src="${src}" alt="Image from ${project.title.rendered} Project" /></div>`
        } else {
          if (acf[`portfolio_video_landscape_${i}`] && acf[`portfolio_video_portrait_${i}`]) {
            if (jQuery(window).width() > 850) {
              src = acf[`portfolio_video_landscape_${i}`].url
            } else {
              src = acf[`portfolio_video_portrait_${i}`].url
            }
            // add in video
            newImages = newImages + `<div class="project-image" id="project-image-${project.id}-${i}"><video id="video-${project.id}-${i}" src="${src}" autoplay loop playsinline muted></div>`
          }
        }
      } 
  }

  // close project-images div
  newImages = newImages + '</div>'

  return newImages
}