## Jira Ticket for Dynamic Banners Lambdas

Assignees, Chris & Tit

#### Description

To finalise the Lamba endpoints for the Banner feature.

As a frontend developer I want a robust set of endpoints which work exactly as specified and return meaningful errors if they don't work so that I don't have to use postman (using postman is backend, but fullstack people can do both)

#### Setup

_HUB-317-dynamic-banners_ was branched from staging, so does not have the banner endpoints. The task is to copy the working endpoints from whichever branch they are on into this one and test them thouroughly with postman. 

has 3 important changes: 

1. There is a new lambda called `/api/dynamic-banners`
2. There are updates to `template.yaml` which route requests to that lambda
3. There are changes to the dependencies in the `package.json` which will require an npm install

```bash
cd dt9-tentacle
git checkout HUB-317-dynamic-banners 
rm -rf node_modules
rm package-lock.json
npm i --registry https://registry.npmjs.org
```

Now start tentacle in the normal way. Try seeding. the database. Can't can ya? If you can't, open a Jira ticket about it

developing the lambdas is easier if you use num-watch. This keeps an eye on the src and if it changes the project is rebuilt and this new build is redy to go in local stack. This means you can make a code change, save it and then refresh the browser to see it in seconds without running build



### Lambda API Endpoints

There is a folder in postman labelled with this Jira ticket number which has all the tests setup. Requirements are;

##### /dynamic-banners

​	[*GET*] Gets a pagination list of all banners in the **campaign_banners** collection 

​	[*POST*] Takes the request body, validates against the schema it and creates a new document on the table

##### /dynamic-banners/{pk}

​	[*GET*] Gets a single doc by **pk** (unique ID)

​	[*PUT*] Updates a single doc by id with the request body

​	[*DELETE*] Deletes a doc by id

##### /dynamic-banners/create-table

​	[GET] Seeds the dynamo DB with a table (collection) called dynamicBanners

##### /dynamic-banners/create-random

​	[*GET*] Adds a mock data document to the collection

##### /dynamic-banners/schema

​	[GET] Returns the schema of a dynamic banner object, including validation rules