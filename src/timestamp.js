jQuery(document).ready(function($) {
    clockUpdate()
    setInterval(clockUpdate, 1000);
    dots();
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
      jQuery(".clock").text(h + ':' + m + ':' + s)
}

var theDots = '...'
var i = 0;

function dots() {
  if (document.getElementById('loading-dots')) {
    if (i < theDots.length) {
      document.getElementById('loading-dots').innerHTML += theDots.charAt(i)
      i++;
      setTimeout(dots, 500)
    } else {
      i = 0
      document.getElementById('loading-dots').innerHTML = ''
      setTimeout(dots, 500)
    }
  }
}