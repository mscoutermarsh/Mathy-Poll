Contestant Poll API
===========================
A Grape/Goliath API for tracking votes. To limit cheating, instead of using a captcha, use simple math!  
  

1. Vote is created
2. API asks a simple math question (What's 2+2?)
3. If user answers correctly. Vote is counted in poll.



**Setup:**

Info here soon...



API Documentation
============================

POST
----

### Create a new Vote
`Post: http://localhost:4567/vote/:id`

Creates a new vote. Returns json containing the ID and the simple math problem.

Response:  
`{"question":"What is 4+3?","id":"96"}`

After recieving this response, you must confirm the vote by answering the question (What is 4+3?).

### Confirm Vote
`Post: http://localhost:4567/confirm/:id/:answer`

**Post:** ID and answer to question.

If correct: the vote will be valid and counted.  
`{"message":"Thanks for voting!"}`

If incorrect: error message will be returned.  
`{"message":"Oops, wrong answer."}`


GET
----

### Get count of votes

`Get: http://localhost:4567/votes/:id`

Returns number of validated votes for a contestant.

Response:  
`{"votes":"21"}`

Things to do
============================
+ something
+ something