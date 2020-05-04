if (
 /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
 )
) {
 $('.navHeader').html('Police ORI Lookup');
 $('#root').css('padding-bottom', '0px');
 $('#root').hide();
}

// Generate random image on document load

$(document).ready(function () {
 let $random = Math.floor(Math.random() * 2);
 switch ($random) {
  case 0:
   $('img').attr('src', 'img/charger.png');
   break;
  case 1:
   $('img').attr('src', 'img/interceptor.png');
   break;
 }
});

$(document).ready(function () {
 // On document ready, fade in elements
 $('#state').hide().fadeIn(1000);
 $('#stateLabel').hide().fadeIn(1000);
 $('#paragraph').hide().fadeIn(1000);
 $('#heading').hide().fadeIn(1000);
 $('#button').hide().fadeIn(1000);
 $('.results-container').hide();
 $('#loader').hide();
 $('#reset').hide();
 $('#arrow').hide().fadeIn(1000);
 $('img').hide().fadeIn(1000);

 // Confirm valid input for the select element

 $('#state').on('change', function () {
  $('#button').attr('disabled', false);
  $('#button').removeClass('btn-secondary');
  $('#button').addClass('btn-primary');
  $('#button').html('Fetch Data');
  $('#arrow').hide();
 });

 // Main button 'Fetch Data'
 $('#button').on('click', function () {
  if (
   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
   )
  ) {
   $('#root').css('padding-bottom', '50px');
  }

  // Reset results and status (if applicable)
  $('#root').html('');
  $('#status').html('');
  $('#results').html('');

  //Hide content
  $('#button').hide();
  $('#reset').hide();
  $('#state').hide();
  $('#stateLabel').hide();
  $('#paragraph').hide();
  $('img').hide();

  // AJAX Call to API

  $.ajax({
   url:
    'https://api.usa.gov/crime/fbi/sapi/api/agencies?api_key=<YOUR_API_KEY_HERE>',
   method: 'GET',
   beforeSend: function () {
    // Show loader & footer

    $('#loader').hide().fadeIn(1500);
    $('#loaderText').hide().fadeIn(1500);
    $('#heading').hide().fadeIn(1000);
    $('#heading').addClass('mt-5');
    $('.small-container').hide().fadeIn(1000);
   },
   success: function ($data) {
    let $state = $('#state').val();

    // For loop to return results to root id

    for (let $key in $data[$state]) {
     let $master = $data[$state][$key];
     $('#results').html(
      "<span class='font-weight-light'Law enforcement agencies within the state of " +
       $master.state_name +
       '<hr>'
     );
     let $node =
      "<li class='" +
      $master.county_name +
      "'><strong>Agency name:</strong> <span class='font-weight-light'>" +
      $master.agency_name +
      "</span><br><strong>Agency type:</strong> <span class='font-weight-light'>" +
      $master.agency_type_name +
      "</span><br><strong>County: </strong><span class='font-weight-light'>" +
      $master.county_name +
      "</span><br><strong>Originating Agency Identifier: </strong><span class='font-weight-light'>" +
      $master.ori +
      '</span></li>';
     $($node).appendTo('#root');

     // Hide loader and show reset button

     $('#loader').hide();
     $('#loaderText').hide();
     $('#status').show();
     $('#results').show();
     $('#root').show();
     $('#heading').removeClass('mt-5');
     $('.search-container').show();

     // On success

     let $status = $('#status');
     $status.addClass('text-success');
     $('#status').show();
     $('.results-container').show();
     $('.search-container').show();
     $('.small-container').show();
     $('#heading').show();
     $('#reset').show();

     $status.html(
      'Your search returned ' + $('#root li').length + ' total results.'
     );
     $('#paragraph').show();
     $('#paragraph').html(
      `Click the '<span class = "text-secondary">Search Again</span>' button to perform another search.`
     );
    }
   },

   // Server error

   error: function () {
    $('small').hide();
    $('#reset').hide().fadeIn(1000);
    $('#paragraph').hide().fadeIn(1000);
    if (
     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
     )
    ) {
     $('#heading').addClass('mt-5');
    }
    $('#paragraph').html(
     "<span class='text-danger'>The FBI server is temporarily down. Please try again in a moment.</span>"
    );
    $('#loader').hide();
    $('#loaderText').hide();
   },
  });
 });
});

// Reset button

$('#reset').on('click', function () {
 $('#button').fadeIn(1000);
 $('#reset').hide();
 $('#status').hide();
 $('#state').fadeIn(1000);
 $('#stateLabel').fadeIn(1000);
 $('#results').html('');
 $('#root').hide();
 $('.results-container').hide();
 $('#paragraph').hide().fadeIn(1000);
 $('#heading').hide().fadeIn(1000);
 $('#search').val('');
 $('#status').removeClass('text-danger');
 $('#heading').removeClass('mt-5');
 $('.search-container').hide();
 $('img').addClass('mt-3');
 $('img').hide().fadeIn(1000);
 $('.small-container').hide();
 $('#paragraph').html(
  `Select a state then click the '<span class="text-primary">Fetch Data</span>' button to access law enforcement agencies ORIs in each state.`
 );

 if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
   navigator.userAgent
  )
 ) {
  $('#root').css('padding-bottom', '0px');
 }
});

// Search input filter

$('#search').on('keyup', function () {
 var $inputValue = $(this).val().toLowerCase().trim();
 $('#root li').filter(function () {
  $(this).toggle($(this).text().toLowerCase().indexOf($inputValue) > -1);
  setInterval(function () {
   if ($('#search').val() == '') {
    $('#results').show();
    $('#status').removeClass('text-danger');
    $('#status').addClass('text-success');
    $('#status').html(
     'Your search returned ' + $('#root li').length + ' total results.'
    );
   } else if ($('#root li:visible').length == 0) {
    $('#results').hide();
    $('#status').html(
     'Your search returned ' + $('#root li:visible').length + ' results.'
    );
    $('#status').removeClass('text-success');
    $('#status').addClass('text-danger');
   } else {
    $('#results').show();
    $('#status').html(
     'Your search returned ' + $('#root li:visible').length + ' results.'
    );
    $('#status').removeClass('text-danger');
    $('#status').addClass('text-success');
   }
  }, 500);
 });
});

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
 if (
  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
  location.hostname == this.hostname
 ) {
  var target = $(this.hash);
  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  if (target.length) {
   $('html, body').animate(
    {
     scrollTop: target.offset().top,
    },
    1000,
    'easeInOutExpo'
   );
   return false;
  }
 }
});

// Closes responsive menu when a scroll trigger link is clicked
$('.js-scroll-trigger').click(function () {
 $('.navbar-collapse').collapse('hide');
});

$(document).on('scroll', function () {
 if ($('#root').is(':visible')) {
  var $y = document.documentElement.scrollTop;
  if ($y > 0) {
   $('footer').fadeIn(500);
  } else {
   $('footer').fadeOut(500);
  }
 }
});
