## Workspace Demo

#### Install

We'll start with the [workspace repository](https://github.com/DT9Media/dt9-workspace/tree/epic/back2front). This just gives us a nice, greenfield playground to mess around. Once we have cloned the repo and  installed our dependencies `npm run install:all`. There are a few npm scripts I use to help speed deveelopment up. Relly they just run a series of other commands, but the `npm start` is the one used to run the workspace.

```bash
#!/bin/bash
# chmod ug+x start-workspace
clear
echo "Starting workspace frontend on localstack"

localstack start -d
ttab -t 'backend' -d ./backend npm start
ttab -t 'frontend' -d ./frontend npm start
export DYNAMO_ENDPOINT=http://localhost:4566
npx dynamodb-admin
```

<iframe src="https://player.vimeo.com/video/733903424?h=c5344a4474&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="320" height="180" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Start Workspace"></iframe> 

#### Git

To get started I'm going to start a new branch of workspace to mess around with for this demo

```bash
git checkout -b demo/examples
```

To Save time and messing about I use this command. This is not recommend as best practice :) It is why it's important to know what branch you're on and for repositories to have their important branches protected from people accidently pushing commits to staging which now might trigger github actions or worse

```bash
git add . && git commit -m "." && git push
```

> Important... When oping a PR to merge a new branch to it's parent, make sure to squash everything into a single commit

#### Lambda Endpoint

So with our backend running we can now access the example endpoint at [localhost:3000/examples](http://localhost:3000/examples). Simply hitting the endpoint with an non-authorised GET request should return a sensible, meaningful JSON response similar to this, whatever the weather

```javascript
{
	lambda: {
		vs: "0.2.4",
		time: 1658925958916,
		appname: "backend",
		description: "NodeJS Localstack Lambda env",
		request: {
			endpoint: "http://localhost:3000/examples",
			httpMethod: "GET"
		},
		response: {
			severity: "success",
			message: "Successfully connect to the endpoint and it's working fine, thanks"
		}
	}
}
```

#### Visual Studio

Open the project in Visual Studio and take a look at `backend/template.yaml` and the **examples** lambda, `backend/src/api/examples/index.ts`. Every time we make a change to the lambda we need webpack to recompile the code. Handily it sticks it straight into the localstack docker container, so the only thing we have to do is refresh the page to see our changes

`npm run build:backend` or `npm run watch` (watch uses npm-watch to auto-build the backend on file changes)

#### Backend

Let's take a quicklook at the backend. It is tentacle, but not quite. It looks and works just the same but it's completely separate and so therefore no amount of ham fisted developing can impact tentacle. On the other hand, at any point of development we can move our code into tentacle just to make sure it works or as the final iteration. Let's make a change and make sure it's working

Yes it does? Great... Let's leave the backend here for now and move over to React

#### Frontend

The frontend is a simple React app, bootstrapped with `npx create-react-app my-app --template redux-typescript` . It contains a series of **features** which can be used something like packages

#### React Features

#### Endpoint

In `frontend/src/features/Endpoint` we'll find the first feature we'll look at. It's job is to connect to and interact with our lambda endpoint from above. 

First of all we'll go to the top of the application and include the Endpoint feature `frontend/src/Features/Workspace/Workspace.tsx`

```javascript
import { Endpoint } from "../Endpoint"
export default function Workspace() {
    return (
            <React.Fragment>
                <CssBaseline />
                <Container>
                    <AppTop />
                    <Endpoint />
               ...
```

Now the endpoint Feature is being rendered on screen we can see that it expects a variable; table to be passed to it in the props. Without a table name, the component is useless and the warning helps with DX (Developer Experience)

