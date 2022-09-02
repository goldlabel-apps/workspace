### pontus

**question 1**

sk .... whay are they? they are special fields on the table, just like pk. Clearly it's required for any doc in that table to have an sk but how does it work when you say... try to delete something. Do you for instance have to identify the document by the correct pk AND sk in order to find & delete it?

**question 2**

Some testing and maybe tweaking will be needed on Titoun's endpoints. Is it ok to ask him to work on this with me? I want to do it as a Jiira ticket and then sit and work through the ticket together so I can see what I'm not being clear enough about

Basically what I'm going to ask him to do is follow a set of instructions to get tentacle set up and running with the right code & then there will be a folder in postman with tests for all the endpoints.

Once the responses from his endpoints are how they should be, I will be able to remove the lambda I was mlearning on and   he can raise the PR to merge them onto staging

Then ownership of the banner lambda will be with Tit and I can take ownership of using them in the frontend

#### Answer

Is thee a branch you can checkout and play around on. Yes, but with caveats. Right now you would need to checkout and run a particular branch of tentacle. That will need a npm install as there some dependency changes 

Same with the frontend. If you checkout a particular branch and do npm run clean you 

