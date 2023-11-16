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