jQuery(document).ready(function($) {
  // var catEl = document.getElementById('categories');
  // catEl.addEventListener('click', function() {
  //   $('#categories').addClass('nav-icons-close');
  //   $('#categories-close').removeClass('nav-icons-close');
  //   $('#cat-section').removeClass('cat-no-show');
  // })

  // var catCloseEl = document.getElementById('categories-close');
  // catCloseEl.addEventListener('click', function() {
  //   $('#categories').removeClass('nav-icons-close');
  //   $('#categories-close').addClass('nav-icons-close');
  //   $('#cat-section').addClass('cat-no-show');
  // })
  
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
var allPosts = [];
var filteredPosts = [];
var breakpoint = 850;
var postsHTML = document.getElementById('posts')

jQuery(document).ready(function($) {
    async function newPosts() {
        console.log("getting posts")
        allPosts = await wp.apiRequest({ path: 'wp/v2/posts?acf_format=standard&per_page=100' })
        console.log(allPosts)
        filteredPosts = allPosts
        displayAllPosts(filteredPosts)
    }
    if(document.getElementById("posts") !== null) {
        newPosts()
    }
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


// variable for array of projects with project that was clicked on at the top
var sortedProjects = []

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
      $(`#project-thumbnails-${id}`).css("left", "92px")
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
      var titleWidth = jQuery(`#project-title-${id}`).width()
      $(`#project-thumbnails-${id}`).css("left", `${titleWidth + 86}px`)
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
      var titleWidth = jQuery(`#project-title-${id}`).width()
      $(`#project-thumbnails-${id}`).css("left", `${titleWidth + 86}px`)
    })
})

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
    console.log("win width: ", jQuery(window).width())
    if (jQuery(window).width() > 850) {
      projects.map(project => {
        var id = project.id
        var titleWidth = jQuery(`#project-title-${id}`).width()
        jQuery(`#project-thumbnails-${id}`).css("left", `${titleWidth + 86}px`)
      })
    }
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
  if (acf.client.length !== 0) {
    theInfo = theInfo + `<h2>${acf.client}</h2><p>Client</p>`
  }
  if (acf.agency.length !== 0) {
    theInfo = theInfo + `<h2>${acf.agency}</h2><p>Agency</p>`
  }
  if (acf.creative_direction.length !== 0) {
    theInfo = theInfo + `<h2>${acf.creative_direction}</h2><p>Creative Direction</p>`
  }
  if (acf.art_direction.length !== 0) {
    theInfo = theInfo + `<h2>${acf.art_direction}</h2><p>Art Direction</p>`
  }
  if (acf.concept_and_strategy.length !== 0) {
    theInfo = theInfo + `<h2>${acf.concept_and_strategy}</h2><p>Concept and Strategy</p>`
  }
  if (acf.video_editing.length !== 0) {
    theInfo = theInfo + `<h2>${acf.video_editing}</h2><p>Video Editing</p>`
  }
  if (acf.video.length !== 0) {
    theInfo = theInfo + `<h2>${acf.video}</h2><p>Video</p>`
  }
  if (acf.photography.length !== 0) {
    theInfo = theInfo + `<h2>${acf.photography}</h2><p>Photography</p>`
  }
  if (acf.graphic_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.graphic_design}</h2><p>Graphic Design</p>`
  }
  if (acf.logo_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.logo_design}</h2><p>Logo Design</p>`
  }
  if (acf.type_design.length !== 0) {
    theInfo = theInfo + `<h2>${acf.type_design}</h2><p>Type Design</p>`
  }
  if (acf.model.length !== 0) {
    theInfo = theInfo + `<h2>${acf.model}</h2><p>Model</p>`
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
        newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${i}"><img src="${acf[`portfolio_image_landscape_${i}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>` 
      } else {
        // check if the video thumb has been uplaoded
        // console.log(i, " video exists")
        if (acf[`portfolio_thumbnail_${i}`]) {
          // console.log(i, " video thumb exists")
          newThumbs = newThumbs + `<div class="project-thumb" id="project-thumb-${project.id}-${i}"><img src="${acf[`portfolio_thumbnail_${i}`].sizes.thumbnail}" alt="thumbnail from ${project.title.rendered} project" /></div>`
        }
      }
    }
  }

  newThumbs = newThumbs + '</div>'
  return newThumbs
}

var createImages = project => {
  var { acf } = project
  // console.log(acf)
  var newImages = '<div class="project-images">'

  newImages = newImages + `<div class="project-image" id="project-image-${project.id}-1"><img src="${acf.portfolio_image_landscape_1.url}" /></div>`

  newImages = newImages + '</div>'

  return newImages
}
jQuery(document).ready(function($) {
    console.log('script loaded yeah')
  })
jQuery(document).ready(function() {
    clockUpdate()
    setInterval(clockUpdate, 1000);
});

function clockUpdate() {
    var date = new Date
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