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


var sortedProjects = []
var filteredProjects = []

var theHTML = ''

jQuery(window).bind('resizeEnd', function() {
  //do something, window hasn't changed size in 500ms
  console.log("resized")
  buildProjectsAssets(filteredProjects);
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
      filteredProjects = projectData.filter(project => project.id !== parseInt(post_id))
      filteredProjects.unshift(currentProject[0])
      console.log(filteredProjects)
      buildProjectsAssets(filteredProjects)

    }
    if (post_id !== undefined) {
      getProjectData(post_id)
    }



    var buildThumbNav = (data) => {
      console.log(data)
      projectItems = projectItems + '<div class="project-items">'
      for (var i = 1; i < 4; i++) {
        var newThumb
        var newImage
        if (data[0].acf[`portfolio_image_${i}`] === false) {
          console.log("false")
          newThumb = data[0].acf[`portfolio_thumbnail_${i}`].sizes.thumbnail
          newImage = data[0].acf[`portfolio_video_${i}`].url
          projectItems = projectItems + `<div class="project-item"><video autoplay muted loop><source src="${newImage}"></div>`
        } else {
          console.log("true")
          newThumb = data[0].acf[`portfolio_image_${i}`].sizes.thumbnail
          newImage = data[0].acf[`portfolio_image_${i}`].sizes.large
          projectItems = projectItems + `<div class="project-item"><img src="${newImage}"></div>`
        }
        projectThumbs = projectThumbs + `<div id="project-thumb-${i}" class="project-thumb"><img src="${newThumb}" alt="project thumbail" /></div>`
      }
      console.log(projectItems)
      projectItems = projectItems + '</div>'
      $('#project-thumbnails').html(projectThumbs)
      $('#project-container').html(projectItems)
    }

    // show/hide project info
    var projectCloseEl = document.getElementById('project-info-close');
    if (projectCloseEl) {
      projectCloseEl.addEventListener('click', function() {
        $('#project-info-container').addClass('project-info-container-hide');
        $('#project-title').removeClass('project-title-hide');
        $('#project-info-close').addClass('project-info-close-hide');
      })
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
    })

    // hide project info
    $(document).on('click', '.project-info-close', function(e) {
      var id = e.target.id.slice(-3)
      var title = `#project-title-${id}`
      $(title).removeClass('project-title-hide')
      var info = `#project-info-${id}`
      $(info).addClass('project-info-container-hide')
      var close = `#project-info-close-${id}`
      $(close).addClass('project-info-close-hide')
    })

    var projectTitleEl = document.getElementById('project-title');
    if (projectTitleEl && projectCloseEl) {
      projectTitleEl.addEventListener('click', function() {
        $('#project-info-container').removeClass('project-info-container-hide');
        $('#project-title').addClass('project-title-hide');
        $('#project-info-close').removeClass('project-info-close-hide');
      })
    }
})

var buildProjectsAssets = projects => {
  var allProjects = ''
  console.log('build Ps: ', projects)
  var sortedNavs = createProjectNavs(projects)
  console.log(sortedNavs)
  allProjects = sortedNavs.join()
  console.log("all: ", allProjects)
  // for (i = 0; i < sortedNavs.length; i++) {
  //   console.log(sortedNavs[i])
  //   allProjects = allProjects + sortedNavs[i]
  // }
  // console.log("all: ", allProjects)
  var container = document.getElementById('projects-container')
  if (container) {
    console.log('passed container')
    jQuery('#projects-container').html(allProjects)
  }
}

var createProjectNavs = projects => {
  var newNavs = []
  projects.forEach(project => {

    var titleInfo = `<div class='project-container'><div class='project-title-container' id='project-${project.id}'>`
    // add back button
    titleInfo = titleInfo + `<a href='/' class="project-back"><svg viewBox="0 0 42 42"><circle class="back-circle" cx="21" cy="21" r="21" /><path d="M24 13L16 21L24 29" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`
    // add title button
    titleInfo = titleInfo + `<div id="project-title-${project.id}" class="project-title">${project.title.rendered}</div>`
    // add close button
    titleInfo = titleInfo + `<svg id="project-info-close-${project.id}" class="project-info-close project-info-close-hide" viewBox="0 0 24 24"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" /></svg></div>`
    // add about container
    titleInfo = titleInfo + `<div class='project-info-container project-info-container-hide' id="project-info-${project.id}"><h1>ABOUT</h1></div>`

    // add images container
    titleInfo = titleInfo + `<div class="project-images"><h1>${project.title.rendered}</h1></div>`
    // end
    titleInfo = titleInfo + `</div>`

    newNavs.push(titleInfo)
  })

  return newNavs
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