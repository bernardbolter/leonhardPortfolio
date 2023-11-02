jQuery(document).ready(function($) {
  var catEl = document.getElementById('categories');
  catEl.addEventListener('click', function() {
    $('#categories').addClass('nav-icons-close');
    $('#categories-close').removeClass('nav-icons-close');
    $('#cat-section').removeClass('cat-no-show');
  })

  var catCloseEl = document.getElementById('categories-close');
  catCloseEl.addEventListener('click', function() {
    $('#categories').removeClass('nav-icons-close');
    $('#categories-close').addClass('nav-icons-close');
    $('#cat-section').addClass('cat-no-show');
  })
  
  var aboutEl = document.getElementById('about');
  aboutEl.addEventListener('click', function() {
    $('#about').addClass('nav-icons-close');
    $('#about-close').removeClass('nav-icons-close');
    $('#about-section').removeClass('about-no-show');
  })

  var aboutCloseEl = document.getElementById('about-close');
  aboutCloseEl.addEventListener('click', function() {
    $('#about').removeClass('nav-icons-close');
    $('#about-close').addClass('nav-icons-close');
    $('#about-section').addClass('about-no-show');
  })
})
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


var projectThumbs = ''
var projectItems = ''

jQuery(document).ready(function($) {
    post_id = jQuery("#post_id").val();
    // console.log(post_id)
    
    async function getProjectData(post_id) {
      projectData = await wp.apiRequest({ path: `wp/v2/posts?acf_format=standard&include=${post_id}` })
      console.log(projectData[0].acf)
      buildThumbNav(projectData)

    }
    if (post_id !== undefined) {
      getProjectData(post_id)
    }

    var buildProjectsAssets = projects => {
      
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
    projectCloseEl.addEventListener('click', function() {
      $('#project-info-container').addClass('project-info-container-hide');
      $('#project-title').removeClass('project-title-hide');
      $('#project-info-close').addClass('project-info-close-hide');
    })

    var projectTitleEl = document.getElementById('project-title');
    projectTitleEl.addEventListener('click', function() {
      console.log("click title")
      $('#project-info-container').removeClass('project-info-container-hide');
      $('#project-title').addClass('project-title-hide');
      $('#project-info-close').removeClass('project-info-close-hide');
    })
})

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