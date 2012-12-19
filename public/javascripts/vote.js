$(document).ready(function() {
  var voteid=0;
  // get # of votes for contestant
  function updateVotes(contestant){
      $.ajax({
           type: "GET",
           cache: false,
           url: "votes/" + contestant,
           success: function(data) {
              $("#votes"+contestant).html(data.votes + " Votes");
           },
           error: function(data) {

           }
      });
  }
  // Submit a vote
  function submitVote(id) {
    $.ajax({
           type: "POST",
           url: "vote/"+id,
           success: function(data) {
              $("#question"+id).html(data.question);
              voteid = data.id;
              $("#confirm"+id).show();
           },
           error: function(data) {
             $("#confirm"+id).hide();
              var obj = jQuery.parseJSON(data.responseText);
              $("#message"+id).html(obj.message);
              $("#message"+id).show('fast');
           }
     });
  }

  // Submit the answer to the math problem.
  function confirmVote(id) {
    event.preventDefault();
    $("#confirm"+id).hide();

    $.ajax({
       type: "POST",
       url: "vote/confirm/"+voteid+"/" + $("#math"+id).val(),
       success: function(data) {
          $("#confirm"+id).html(data.message);
          $("#confirm"+id).show('fast');
          updateVotes(id);
       },
       error: function(data) {
          $("#confirm"+id).hide();
          var obj = jQuery.parseJSON(data.responseText);
          $("#message"+id).html(obj.message);
          $("#message"+id).show('fast');
          setTimeout(function() {$('#message'+id).hide();$('#confirm'+id).show();} , 2100);
       }
     });
  }

  function updateAll() {
    updateVotes(1);
    updateVotes(2);
    updateVotes(3);
  }

  // load vote counts
  updateAll();

  $("#confirm1").hide();
  $("#message1").hide();

  $("#confirm2").hide();
  $("#message2").hide();

  $("#confirm3").hide();
  $("#message3").hide();

  // Submit vote
  $('#contestant1').click(function(event) {
    event.preventDefault();
    if(!$('#contestant1').hasClass('disabled')){
        $("#contestant1").hide();
        $("#contestant2").addClass('disabled');
        $("#contestant3").addClass('disabled');
        submitVote(1);
      }
  });

  $('#contestant2').click(function(event) {
    event.preventDefault();
    if(!$('#contestant2').hasClass('disabled')){
        $("#contestant2").hide();
        $("#contestant1").addClass('disabled');
        $("#contestant3").addClass('disabled');
        submitVote(2);
      }
  });

  $('#contestant3').click(function(event) {
    event.preventDefault();
    if(!$('#contestant3').hasClass('disabled')){
        $("#contestant3").hide();
        $("#contestant1").addClass('disabled');
        $("#contestant2").addClass('disabled');
        submitVote(3);
    }
  });

  $('#submitMath1').click(function(event) {
    confirmVote(1);
  });
  $('#submitMath2').click(function(event) {
    confirmVote(2);
  });
  $('#submitMath3').click(function(event) {
    confirmVote(3);
  });
});