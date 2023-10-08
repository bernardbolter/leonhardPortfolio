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
jQuery(document).ready(function($) {
    console.log('script loaded yeah')
  })