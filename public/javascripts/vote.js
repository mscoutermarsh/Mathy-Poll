            function updateVotes(id){
                $.ajax({
                     type: "GET",
                     cache: false,
                     url: "votes/" + id,
                     success: function(data) {
                        $("#votes"+id).html(data.votes + " Votes");
                     },
                     error: function(data) {

                     }
                });
            }

            function confirmVote(id,voteid) {
              event.preventDefault();
              $("#confirm"+id).hide();

              $.ajax({
                 type: "POST",
                 url: "vote/confirm/"+voteid+"/" + $("#math"+id).val(),
                 success: function(data) {
                    $("#confirm"+id).html(data.message);
                    $("#confirm"+id).show('fast');
                    updateVotes();
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

            $(document).ready(function() {

                var voteid=0;

                // load vote counts
                updateVotes(1);
                updateVotes(2);
                updateVotes(3);

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

                $('#submitMath1').click(function(event) {
                  confirmVote(1,voteid);
                });
                $('#submitMath2').click(function(event) {
                  confirmVote(2,voteid);
                });
                $('#submitMath3').click(function(event) {
                  confirmVote(3,voteid);
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

            }); 