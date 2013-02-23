[Mathy-Poll](https://github.com/mscoutermarsh/Mathy-Poll)
-----
A Grape/Goliath API for tracking votes. With simple math captcha! 

1. Vote is created.
2. API asks a simple math question (What's 2+2?).
3. If user answers correctly. Vote is counted in poll.

Very simple rate limiting by IP address.

Demo:
-----
See a live demo: [Mathy-Poll on Heroku](http://mathy-poll.herokuapp.com/)

Screenshot:

[![Mathy-poll](https://dl.dropbox.com/u/18216283/blog/mathy-poll.jpg)](http://mathy-poll.herokuapp.com/)

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

Deploy to [Heroku](http://heroku.com):
------
Create a new app.

    heroku apps:create APPNAMEHERE

Run migrations

    heroku run rake db:migrate RACK_ENV=production

Check out your new poll on heroku!

    yourappname.herokuapp.com

API Documentation:
------

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
To see how many votes there are for contestant #1.

    http GET 0.0.0.0:9000/votes/1

And it will return:

    {
        "votes": 4
    }

### Performance Specs on Heroku
Goliath/Grape handles high loads **really** well. This has been tested at 200-300 requests per second on a single Heroku dyno.

    1 Dyno:
 
    Transactions:              12715 hits
    Availability:              99.99 %
    Elapsed time:              59.85 secs
    Data transferred:          0.13 MB
    Response time:            0.44 secs
    Transaction rate:          212.45 trans/sec
    Throughput:              0.00 MB/sec
    Concurrency:                94.16
    Successful transactions:    12715
    Failed transactions:        1
    Longest transaction:        11.56
    Shortest transaction:      0.08


Need help?
---------
+ Twitter [@msccc](http://twitter.com/mscccc "@mscccc") 
+ [mikecoutermarsh.com](http://mikecoutermarsh.com/ "mikecoutermarsh") 

Credits
-------
+ Based off of: [Grape-Goliath-Example](https://github.com/djones/grape-goliath-example)