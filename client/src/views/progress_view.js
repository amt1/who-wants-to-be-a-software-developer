window.onload = function(){
  var elm = document.querySelector('#progress');
  setInterval(function(){
    if(!elm.innerHTML.match(/100%/gi)){
      elm.innerHTML = (parseInt(elm.innerHTML) + 1) + '%';
    } else {
      clearInterval();
    }
  }, 18)
}
