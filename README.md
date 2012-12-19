Mathy-Poll
===========================
A Grape/Goliath API for tracking votes. To limit cheating, instead of using a captcha, use simple math!  
  

1. Vote is created.
2. API asks a simple math question (What's 2+2?).
3. If user answers correctly. Vote is counted in poll.



Setup:
------
Clone the repo:

     git clone https://github.com/mscoutermarsh/Mathy-Poll.git
     cd Mathy-Poll

Install gems:

     bundle install

Setup the database:

     rake db:setup

Start the server!

     ruby server.rb -vs


API Documentation
============================

### Create a new Vote

    http POST 0.0.0.0:9000/vote/1

This will return the vote id and the math question:

    {
        "id": 7, 
        "question": "What's 13+3?"
    }

Now to confirm your vote... answer the question by POSTing to /vote/confirm/:id/:answer.

    http POST 0.0.0.0:9000/vote/confirm/7/16

If your math is correct, the vote will be confirmed.

    {
        "message": "Thanks for voting!"
    }

### Get number of votes
To see how many votes their are for contestant #1.

    http GET 0.0.0.0:9000/votes/1

And it will return:

    {
        "votes": 4
    }


Need help?
============================
+ Twitter [@msccc](http://twitter.com/mscccc "@mscccc") 
+ [mikecoutermarsh.com](http://mikecoutermarsh.com/ "mikecoutermarsh") 