
(function() {
  var spinner = document.querySelector('custom-spinner');
  var i = 1;
  var completedAt = 10;
  
  var progressInterval = setInterval(() => {
    var initialOffset = spinner.getAttribute('initialOffset');
    var percent = initialOffset-(i*(initialOffset/completedAt));
    spinner.setAttribute('offsit', percent);
    spinner.setStatus(i);
    if (i == completedAt) {
      clearInterval(progressInterval);
    }
    i++;
}, 1000);


}());
