/* TABS */

// usage
/*
    <div class="Tabs outer">
        <div class="nav horizontal fa">
            <div class="tab"><h3></h3></div>
            <div class="tab active"><h3></h3></div>
        </div>
        <div class="content">
            <div class="tab">
                <section>
                    <div class="wrapper float slim">
                        <div class="Tabs inner">...</div>
                    </div>
                </section>
            </div>
        </div>
    </div>
*/

var doc = $('html');

function goDesktop() {
  doc.attr('id', 'isDesktop');
}

function goLandscape() {
  doc.attr('id', 'isLandscape');
}

function goTablet() {
  doc.attr('id', 'isTablet');
}

function goPortrait() {
  doc.attr('id', 'isPortrait');
}

if ($(window).width() < $(window).height() && $(window).width() > 420) {
  goTablet();
} else if ($(window).width() < $(window).height() && $(window).width() < 420) {
  goPortrait();
} else if ($(window).width() > $(window).height() && $(window).width() < 1203 && $(window).height() < 440) {
  goLandscape();
} else if ($(window).width() > 1023 && $(window).width() > $(window).height()) {
  goDesktop();
}

$(window).resize(function () {
  if ($(window).width() < $(window).height() && $(window).width() > 420) {
    goTablet();
  } else if ($(window).width() < $(window).height() && $(window).width() < 420) {
    goPortrait();
  } else if ($(window).width() > $(window).height() && $(window).width() < 1203 && $(window).height() < 440) {
    goLandscape();
  } else if ($(window).width() > 1023 && $(window).width() > $(window).height()) {
    goDesktop();
  }
});

// sets up Tabs
var Tabs = $('.Tabs');
var T = 0;
var s = 0;
var n = 0;
var c = 0;
var nc = 0;
var cc = 0;

// adds index to corresponding sections for each Tab
Tabs.each(function () {
  var section = $(this).closest('section');
  var nav = $(this).find('.nav');
  var content = $(this).find('.content');

  $(this).attr('tab-index', T++);
  section.attr('section-index', s++);
  nav.attr('nav-index', n++);
  content.attr('content-index', c++);

  // adds matching data-index to each Tab section for navigation
  nav.children().each(function () {
    $(this).attr("data-index", nc++);
  });
  content.children().each(function () {
    $(this).attr("data-index", cc++);
  });
});

// Tabs navigation
$('.Tabs .nav .tab').click(function () {
  $('.event-listing').removeAttr('style');
  $('.filter option').val();
  var active = $(this).data('index');
  var aN = $(this).closest('.nav').attr('nav-index');

  $('.Tabs .nav[nav-index="' + aN + '"]').children().removeClass('active');
  $('.Tabs .nav[nav-index="' + aN + '"] .tab[data-index="' + active + '"]').addClass('active');

  $('.Tabs .content[content-index="' + aN + '"]').children().removeClass('active');
  $('.Tabs .content[content-index="' + aN + '"] .tab[data-index="' + active + '"]').addClass('active');
});

$('#isTablet .Tabs .nav, #isPortrait .Tabs .nav, #isLandscape .Tabs .nav').click(function () {
  $(this).toggleClass('expanded');
});