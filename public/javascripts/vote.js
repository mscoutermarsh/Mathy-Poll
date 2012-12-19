            function updateVotes(){
                $.ajax({
                     type: "GET",
                     cache: false,
                     url: "votes/1",
                     success: function(data) {
                        $("#votes1").html(data.votes + " Votes");
                     },
                     error: function(data) {

                     }
                });
                $.ajax({
                     type: "GET",
                     cache: false,
                     url: "votes/2",
                     success: function(data) {
                        $("#votes2").html(data.votes + " Votes");
                     },
                     error: function(data) {

                     }
                });
                $.ajax({
                     type: "GET",
                     cache: false,
                     url: "votes/3",
                     success: function(data) {
                        $("#votes3").html(data.votes + " Votes");
                     },
                     error: function(data) {

                     }
                });
            }

            $(document).ready(function() {

                var voteid=0;

                // load vote counts
                updateVotes();

                $("#confirm1").hide();
                $("#message1").hide();

                $("#confirm2").hide();
                $("#message2").hide();

                $("#confirm3").hide();
                $("#message3").hide();
                     
                $('#contestant1').click(function(event) {
                  event.preventDefault();
                  if(!$('#contestant1').hasClass('disabled')){
                      $("#contestant1").hide();
                      $("#contestant2").addClass('disabled');
                      $("#contestant3").addClass('disabled');

                      $.ajax({
                         type: "POST",
                         url: "vote/1/",
                         success: function(data) {
                            $("#question1").html(data.question);
                            voteid = data.id;
                            $("#confirm1").show();
                         },
                         error: function(data) {
                           alert("error");
                         }
                   });
                    }
                });

                 $('#submitMath1').click(function(event) {
                  event.preventDefault();
                  $("#confirm1").hide();


                  $.ajax({
                     type: "POST",
                     url: "confirm/"+voteid+"/" + $("#math1").val(),
                     success: function(data) {
                        $("#confirm1").html(data.message);
                        $("#confirm1").show('fast');
                        updateVotes();
                     },
                     error: function(data) {
                        $("#confirm1").hide();
                        var obj = jQuery.parseJSON(data.responseText);
                        $("#message1").html(obj.message);
                        $("#message1").show('fast');
                        setTimeout(function() {$('#message1').hide();$('#confirm1').show();} , 2100);
                     }
                   });
                });

                $('#contestant2').click(function(event) {
                  event.preventDefault();
                  if(!$('#contestant2').hasClass('disabled')){
                      $("#contestant2").hide();
                      $("#contestant1").addClass('disabled');
                      $("#contestant3").addClass('disabled');

                      $.ajax({
                         type: "POST",
                         url: "vote/2/",
                         success: function(data) {
                            $("#question2").html(data.question);
                            voteid = data.id;
                            $("#confirm2").show();
                         },
                         error: function(data) {
                           alert("error");
                         }
                   });
                    }
                });

                 $('#submitMath2').click(function(event) {
                  event.preventDefault();
                  $("#confirm2").hide();

                  $.ajax({
                     type: "POST",
                     url: "confirm/"+voteid+"/" + $("#math2").val(),
                     success: function(data) {
                        $("#confirm2").html(data.message);
                        $("#confirm2").show('fast');
                        updateVotes();
                     },
                     error: function(data) {
                        $("#confirm2").hide();
                        var obj = jQuery.parseJSON(data.responseText);
                        $("#message2").html(obj.message);
                        $("#message2").show('fast');
                        setTimeout(function() {$('#message2').hide();$('#confirm2').show();} , 2100);
                     }
                   });
                });

                $('#contestant3').click(function(event) {
                  event.preventDefault();
                  if(!$('#contestant3').hasClass('disabled')){
                      $("#contestant3").hide();
                      $("#contestant1").addClass('disabled');
                      $("#contestant2").addClass('disabled');

                      $.ajax({
                         type: "POST",
                         url: "vote/3/",
                         success: function(data) {
                            $("#question3").html(data.question);
                            voteid = data.id;
                            $("#confirm3").show();
                         },
                         error: function(data) {
                           alert("error");
                         }
                   });
                   }
                });

                 $('#submitMath3').click(function(event) {
                  event.preventDefault();
                  $("#confirm1").hide();

                  $.ajax({
                     type: "POST",
                     url: "confirm/"+voteid+"/" + $("#math3").val(),
                     success: function(data) {
                        $("#confirm3").html(data.message);
                        $("#confirm3").show('fast');
                        updateVotes();
                     },
                     error: function(data) {
                        $("#confirm3").hide();
                        var obj = jQuery.parseJSON(data.responseText);
                        $("#message3").html(obj.message);
                        $("#message3").show('fast');
                        setTimeout(function() {$('#message3').hide();$('#confirm3').show();} , 2100);
                     }
                   });
                });

            }); 