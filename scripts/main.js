(function() {
  "use strict";

  window.addEventListener('load', () => {
    on_page_load()
  });

  /**
   * Function gets called when page is loaded.
   */
  function on_page_load() {
    // Initialize On-scroll Animations
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      
    });
  }
   // Add your javascript here
  (function ($) {
    $(window).on('load', function() {
      $('#loading').slideUp(1000);
  });
    $(document).ready(function(){
     
    //Ajax Example
      if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 50,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
      }
      $(".anchor-readMore").click(function(){
        const anchorText = $(".anchor-readMore").text().trim();
        console.log("Anchor Text", anchorText)
        const setText = anchorText === 'Read more' ? 'Read less' : 'Read more';
          setTimeout(function(){
            $(".anchor-readMore").text(setText);
          }, 200)
        });
        $('#scrolltop').click(function(){
          $('html, body').animate({scrollTop : 0},800);
          return false;
        });
    })
      var scrollToFunc = function(element){
        $('html, body').animate({
          scrollTop: $("#"+element).offset().top
      }, 700);
      $('#experience-link').click(function(){scrollToFunc('experience')})
      $('#about-link').click(function(){scrollToFunc('about')})
      $('#services-link').click(function(){scrollToFunc('services')})
      $('#skills-link').click(function(){scrollToFunc('skills')})
      $('#contact-link').click(function(){scrollToFunc('contact')})
      }
  })(jQuery);

  /**
   * Navbar effects and scrolltop buttons upon scrolling
   */
  const navbar = document.getElementById('header-nav')
  var body = document.getElementsByTagName("body")[0]
  const scrollTop = document.getElementById('scrolltop')
  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm')
      body.style.paddingTop = navbar.offsetHeight + "px"
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm')
      body.style.paddingTop = "0px"
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };

  /**
   * Masonry Grid
   */
  var elem = document.querySelector('.grid');
  if(elem) {
    imagesLoaded(elem, function() {
      new Masonry(elem, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true
      });
    })
  }

  /**
   * Big Picture Popup for images and videos
   */
   document.querySelectorAll("[data-bigpicture]").forEach((function(e) {
     e.addEventListener("click", (function(t){
       t.preventDefault();
       const data =JSON.parse(e.dataset.bigpicture)
       BigPicture({
        el: t.target,
        ...data
      })
     })
    )
  }))

  /**
   * Big Picture Popup for Photo Gallary
   */
   document.querySelectorAll(".bp-gallery a").forEach((function(e) {
    var caption = e.querySelector('figcaption')
    var img = e.querySelector('img')
    // set the link present on the item to the caption in full view
    img.dataset.caption = '<a class="link-light" target="_blank" href="' + e.href + '">' + caption.innerHTML + '</a>';
    window.console.log(caption, img)
     e.addEventListener("click", (function(t){
       t.preventDefault();
       BigPicture({
        el: t.target,
        gallery: '.bp-gallery',
      })
     })
    )
  }))

  var form = document.getElementById("my-form");
    
  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var errorStatus = document.getElementById("my-form-error");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        status.classList.remove('d-none')
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            errorStatus.innerHTML = data["errors"].map(error => error["code"]==="TYPE_EMAIL"? 'Invalid Email': error["message"]).join(", ")
            errorStatus.classList.remove('d-none')
          } else {
            errorStatus.innerHTML = "Oops! There was a problem submitting your form"
          }
          errorStatus.classList.remove('d-none')
        })
      }
    }).catch(error => {
      errorStatus.innerHTML = "Oops! There was a problem submitting your form"
      errorStatus.classList.remove('d-none')
    });
  }
  form.addEventListener("submit", handleSubmit)

})();