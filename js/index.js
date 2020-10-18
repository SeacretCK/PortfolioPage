$(document).ready(function () {
  // CLOSE DROPDOWN-NAV WHEN A LINK IS CLICKED
  $(".nav-link").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  //SCROLL 60px ABOVE SECTION BECAUSE OF FIXED NAVBAR
  function goToByScroll(id) {
    id = id + "-section";
    $(window).scrollTop($("#" + id).offset().top - 60);
  }

  $(".nav-link").click(function (e) {
    e.preventDefault(); // preventing the default scrolling behavior
    goToByScroll(this.id);
  });

  // MARK THE CURRENT SECTION AS ACTIVE
  $.fn.checkViewport = function () {
    let elementTop = $(this).offset().top; //offset gives an object with a value for top
    let elementBottom = elementTop + $(this).outerHeight(true); //includes padding, border (and margin if set to true)
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height(); //for window and document there is no outerHeight()

    return (
      elementBottom > viewportTop + (viewportBottom - viewportTop) / 4 &&
      elementTop < viewportBottom - ((viewportBottom - viewportTop) / 4) * 3
    );
  }; //only checks if in the upper quarter of the screen, so now only one topic at a time is highlighted

  $(window).on("resize scroll", function () {
    $(".section").each(function () {
      let activeSection = $(this).attr("id"); //the id of the section has "-section" in the end, the id of the nav element is the same word without that ending, therefore .slice(0, -8)
      if ($(this).checkViewport()) {
        $("." + activeSection.slice(0, -8)).addClass("active-element");
      } else {
        $("." + activeSection.slice(0, -8)).removeClass("active-element");
      }
    });
  });

  // FADE IN THE NAVBAR-BRAND
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();

    $(".navbar-brand").css({
      opacity: function () {
        return 1 - (400 - scrollTop) / 400;
      }
    });
  });
});
