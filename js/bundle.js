jQuery(document).ready(function($) {
  var catEl = document.getElementById('categories');
  catEl.addEventListener('click', function() {
    console.log("clicked categories")
  })
  
  var aboutEl = document.getElementById('about');
  aboutEl.addEventListener('click', function() {
    console.log('clicked about')
  })
})
jQuery(document).ready(function($) {
    console.log('script loaded yeah')
  })