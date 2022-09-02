# Iteration 2

There's a list of Frontend React type stuff I'd be keen to talk about. Adam's definately got the same for the backend. If there's anything which crosses over those two lists, they'd be my candidates for being top of the to do list

So we have.... a node API designed to run on AWS Cloud infrastructure being emulated locally with localstack. The API consists of a lot of separate Lambda functions which are managed in a `template.yaml` file which defines the run time environment and does things like routing.

Individual Lambdas can do anything are can be as complex as anti-fraud algorithms or as simple as adding a document to a Table in DynamoDB

Listening a bit to what's going on, you guys have been talking about being able to deploy whole sites and frontends to AWS architecture, which sounds like a great idea to me if I've understood it at all. Which I haven't, really so I'd like to get a bit more background on that at some point

## Workspace 

The [dt9-workspace](https://github.com/DT9Media/dt9-workspace/tree/epic/back2front) repository is a good starting point. It's a really small, cut down version of tentacle (backend) and a React app frontend similarly bootstrapped to the current HUB project

If you can set it up and run it then you have a playground for parts of the next ieration of the HUB to be made. It's doesn't replace the hub software, but features can be developed here independantly of the parent software and then moved in when they're ready

Everything in Iteration 2 should build directly on the excellent groundwork done in the last year +. It won't require anything to be re-made from scratch. If time has been spent building something, we shouldn't re-spend time re-making it. Having said that...

## Sass

There could be a case for some seemingly radical shifts. For instance the use of SCSS. I reckon we could safely and easily get rid of it completely from the front end. It is already currently possible to do any styling needed using MUI and @emotion without adding or changing anything. There isn't very much Sass, which is old weak and causes loads of problems. It should be easy to remove the technology from the frontend stack over the next iteration without anybody needed to notice.

## Jest

Jest is now set up and ready to go. This is the passing test added to many of the projects. I don't really know what I'm doing when it comes to writing useful tests, but it doesn't feel like spending a lot of time writing them would be a good use of time, so we could just leave it as is for this version

```javascript
import React from 'react';

test('Will the sun will rise?', () => {
  const sunWillRise = true
  expect(sunWillRise).toBe(true)
});

```

## TypeScript 

All our React apps (SPA's, Hub frontend, Banners) etc are compiled using the TS compiler. This is far stricter than the plain ES6 way of doing things. The idea is to write new code in standards compliant TypeScript, but there's no need to refactor the older code in TS. It can just naturally fall out of the project as it goes forward.

The issue is the TypeScript pattern to use. I am definately not using it correctly and for it to be of benefit I reckon everyone needs to be using it in the same way. Should we pick a udemy course and ask everyone to do the same one?

## Schema 

Somebody (ephremAddiss) introduced a validation library called [joi](https://joi.dev/api/?v=17.6.0) to the campaign_banners feature on the [dt9-workspace](https://github.com/DT9Media/dt9-workspace/tree/epic/back2front) repository. It IS really just a validation tool, but it also describes shemas pretty well and makes those data shapes very easy to share isomorphically between frontend and back. Isomorphic means if it's not easy, we're not doing it right. The propsal is that we use something like joi as our single point of truth for schemas and describing the shape of all data. 

Developing a new feature could start with creating a joi object like this1

```javascript
import { ListFunctionEventInvokeConfigsCommand } from "@aws-sdk/client-lambda"
import Joi, { ObjectSchema } from "joi"

const validDoc = {
  displayName: "John Smith",
  language: "en",
}

const schemaJoi: ObjectSchema<any> = Joi.object({
  pk: Joi.string().required(),
  displayName: Joi.string().required(),
  language: Joi.string().required(),
})

const schema = schemaJoi.describe()
export { schema, schemaJoi, validDoc }
```

From this document we can create a table in Dynamo DB. We can validate incoming data using it and then use it to create a schema which the React front end can make use of.

Because the React app now knows the exact shape and required fields expected by the API it can use the <Forms /> feature to auto-render a form which is correct for that data. This feature also validates the data and it's job is to make it

a) as easy an intuitive to enter data as possible
b) impossible to submit any data to the API which will fail validation 



That would be a quite a big chunk of work and there might not seem to be much progress made by the end of it to the untrained eye, but iteration 3 will send socks flying