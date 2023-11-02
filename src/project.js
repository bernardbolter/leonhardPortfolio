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
