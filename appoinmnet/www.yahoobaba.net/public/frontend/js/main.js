$(document).ready(function(){
    //site url
    var base_url = 'https://www.yahoobaba.net/';

    var loader = '<div class="loading">' +
                '<div class="preloader">' +
                '<div class="spinner"></div>' +
                '<div class="spinner-2"></div>' +
                '</div>' +
                '</div>';

    //script for side menu
    $('.toggle-side-menu').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('#course-menu').removeClass('show-menu');
        }else{
            $(this).addClass('active');
            $('#course-menu').addClass('show-menu');
        }
    });

    //script for add table class in single chapter page
    $('.description table').addClass('table');
    //script for add tryit_code class on tryit button in single chapter page
    $('.description a').each(function(){
        if(this.hasAttribute('data-class')){
            $(this).addClass('tryit_code');
        }
    })

    
    // $('.checkAdblocker').click(function(){
    //     var id = $(this).attr('data-id');
    //     var type = $(this).attr('data-type');
    //     var divElement = document.querySelector(".ad-widget");
    //     var elemHeight = divElement.offsetHeight;
    //     if(elemHeight  > 0){
    //         if(type == 'project'){
    //             window.location.href =  base_url+'download-project/'+id;
    //         }else{
    //             window.location.href =  base_url+'download-templates/'+id;
    //         }
            
    //     }else{
    //         $('#adblocker_modal').modal('show');
    //     }
    // });



    
    

    

    $(".submit_test").on("click", function (q) {
    q.preventDefault();
    var test_submit = "submit";
    var answer = $('.answer_input[type=radio]:checked').val();
    var question = $('input[name=question]').val();
    $.ajax({
      type: "POST",
      url: BASE_URL + "test-submit-request",
      data: {
        test_submit: test_submit,question:question,answer:answer
      },

      success: function (data) {
        console.log(data);
        if (data) {
          data = JSON.parse(data);
          if (data.status == "success") {
            swal({
                title: "Are you Sure",
                text: "Your Total Attempt is " + data.attemp,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: 'Ok, Submit',
                cancelButtonText: 'Cancel',
              },
              function(isConfirm){
                if (isConfirm == true) {
                  var input = $("<input>")
                    .attr("type", "hidden")
                    .attr("name", "submit_test")
                    .val("submit_test");

                  $("#quizFrom").append($(input));
                  $("#quizFrom").submit();
                }
              }
            );
          } else {
            alert(data.msg);
          }
        } else {
          alert("Server Error");
        }
      },
      error: function (e) {
        console.log(e);
      },
    });
  });

    // $(".answer_given").on("click", function (q) {
    //     var checked_or_not = $(".answer_input:checked").val();
    //     if (checked_or_not) {
    //       console.log(checked_or_not);
    //     } else {
    //       q.preventDefault(false);

    //       swal({
    //         title: "No answer given yet",
    //       });
    //     }
    // });

    
    // $('input[name=rating]').click(function(){
    //     $('#ratingModal').modal('hide');
    //     var rating = $(this).val();
    //     var id = $('input[name=question]').val();
    //     $.ajax({
    //         url : base_url + "askquestion/rate-this-question",
    //         type : "POST",
    //         data : {name:id,rating:rating},
    //         cache: false,
    //         success : function(response){
    //             if(response == '1'){
    //                 window.location.href=base_url + "askquestion";
    //             }else{
    //                 alert(response);
    //             }
    //         }
    //     })
    // })



    
    
});

/*
GreedyNav.js - http://lukejacksonn.com/actuate
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2015 Luke Jackson
*/

$(function() {

  var $btn = $('nav.greedy button');
  var $vlinks = $('nav.greedy .links');
  var $hlinks = $('nav.greedy .hidden-links');

  var numOfItems = 0;
  var totalSpace = 0;
  var closingTime = 1000;
  var breakWidths = [];

  // Get initial state
  $vlinks.children().outerWidth(function(i, w) {
    totalSpace += w;
    numOfItems += 1;
    breakWidths.push(totalSpace);
  });

  var availableSpace, numOfVisibleItems, requiredSpace, timer;

  function check() {

    // Get instant state
    availableSpace = $vlinks.width() - 10;
    numOfVisibleItems = $vlinks.children().length;
    requiredSpace = breakWidths[numOfVisibleItems - 1];

    // There is not enought space
    if (requiredSpace > availableSpace) {
      $vlinks.children().last().prependTo($hlinks);
      numOfVisibleItems -= 1;
      check();
      // There is more than enough space
    } else if (availableSpace > breakWidths[numOfVisibleItems]) {
      $hlinks.children().first().appendTo($vlinks);
      numOfVisibleItems += 1;
      check();
    }
    // Update the button accordingly
    $btn.attr("count", numOfItems - numOfVisibleItems);
    if (numOfVisibleItems === numOfItems) {
      $btn.addClass('hidden');
    } else $btn.removeClass('hidden');
  }

  // Window listeners
  $(window).resize(function() {
    check();
  });

  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
    clearTimeout(timer);
  });

  $hlinks.on('mouseleave', function() {
    // Mouse has left, start the timer
    timer = setTimeout(function() {
      $hlinks.addClass('hidden');
    }, closingTime);
  }).on('mouseenter', function() {
    // Mouse is back, cancel the timer
    clearTimeout(timer);
  })

  check();

});



