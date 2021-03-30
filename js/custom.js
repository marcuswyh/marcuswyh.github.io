
// HEADER TITLE
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
 };

 TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
       this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
       this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;
    var windowSize = window.matchMedia("(max-width: 767px)")

    if (!this.isDeleting && this.txt === fullTxt && windowSize.matches == false) {
       delta = this.period;
       var css = document.createElement("style");
       css.type = "text/css";
       css.innerHTML = "#shownHeader { display: None }";
       document.body.appendChild(css);

       var css = document.createElement("style");
       css.type = "text/css";
       css.innerHTML = "#hiddenHeader { display: flex !important; }";
       document.body.appendChild(css);
    }

    setTimeout(function() {
       that.tick();
    }, delta);
 };

 window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
       var toRotate = elements[i].getAttribute('data-rotate');
       var period = elements[i].getAttribute('data-period');
       if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
       }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);

    // ==============
    // 3D WORD CLOUD
    // ==============
    try {
          var i, et = document.getElementById('tags').childNodes;
          for (i in et) {
             et[i].nodeName == 'A' && et[i].addEventListener('click', function (e) {
                e.preventDefault();
             });
          }
    
          TagCanvas.Start('myCanvas', 'tags', {
             textColour: '#11ABB0',
             outlineColour: '#2B2B2B',
             reverse: true,
             depth: 0.8,
             dragControl: false,
             decel:0.95,
             maxSpeed: 0.05,
             initial: [-0.2, 0],
             wheelZoom: false
          });
       } catch (e) {
          // something went wrong, hide the canvas container
          //document.getElementById('myCanvasContainer').style.display = 'none';
       }
 };

//  Circle cursor
 jQuery(document).ready(function() {

    var mouseX = 0, mouseY = 0;
    var xp = 0, yp = 0;
    
    $(document).mousemove(function(e){
    mouseX = e.pageX - 30;
    mouseY = e.pageY - 30; 
    });
    
    setInterval(function(){
    xp += ((mouseX - xp)/6);
    yp += ((mouseY - yp)/6);
    $("#circle").css({left: xp +'px', top: yp +'px'});
    }, 1);

});


// Pre-Loader timer for webpage
$(document).ready(function() {
	
	setTimeout(function(){
		$('body').addClass('loaded');
	}, 1500);
	
});

// validate email form

const constraints = {
    name: {
        presence: { allowEmpty: false }
    },
    email: {
        presence: { allowEmpty: false },
        email: true
    },
    message: {
        presence: { allowEmpty: false }
    }
};

const form = document.getElementById('contactForm');

form.addEventListener('submit', function (event) {
  const formValues = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      message: form.elements.message.value
  };

  const errors = validate(formValues, constraints);

  if (errors) {
    event.preventDefault();
    const errorMessage = Object
        .values(errors)
        .map(function (fieldValues) { return fieldValues.join(', ')})
        .join("\n");

    alert(errorMessage);
  }
}, false);


// Animation for header when hover
$(".headerSpan").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
    $(this).removeClass("animated")  
  })
  
$(".headerSpan").hover(function(){
    $(this).addClass("animated");        
})


// contact form submit

var form = document.getElementById("contactForm");
    
async function handleSubmit(event) {
event.preventDefault();
var data = new FormData(event.target);
fetch(event.target.action, {
   method: form.method,
   body: data,
   headers: {
      'Accept': 'application/json'
   }
}).then(response => {
   alert('Thanks for the email, we\'ll be in touch promptly!');
   form.reset()
}).catch(error => {
   alert("Oops! There was a problem submitting your form");
});
}
form.addEventListener("submit", handleSubmit)