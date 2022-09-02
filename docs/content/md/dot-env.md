# Dot Env

!important 

```bash
npm i --registry https://registry.npmjs.org
```

## Story

As a developer I want to be able to start the hub with a single command so that I can do it quickly in the mornings. Change directory to the `dt9-env` folder and run 

This repo is a simple framework of useful node and bash scripts to enhance the DX for DT9 devs. It is not a monorepo although it acts like one in some ways. You can use bash scripts, .sh, npm scripts or even javascript .mjs. Basically it allows you to make shortcusts to everyday repetetive tasks

## Install & Use

1. #### Prerequisites

- GitKraken or similar
- VS Code
- Xcode
- Node (vs 14)
- Node Version Manager
- Python 3 + pip
- AWS ClI
- SAM CLI

> To set your default node version you can use `nvm alias default 14`

2. #### Clone, Install & Run

```bash
cd <working-dir>
git clone https://github.com/DT9Media/dt9-env.git
cd dt9-env
npm i --registry https://registry.npmjs.org/
npm start
```

`npm run` in project root always displays a list of shortcut npm scripts

3. #### Add repos

Open `/.gitignore` and note the first chunk hides the repo  folders for anything we want to work on. We don't want to get involved with sub-repositories or anything like that.

Copy/move or reclone any repos you want to work with into 
project root and edit `.gitignore` accordingly

5. #### Add scripts

- Add new shortcut scripts in the `package.json` like this

```javascript
"scripts": {
    "start:hub": "clear && cd dt9-hub-frontend && npm start",
    "dist": "$PWD/.scripts/dist 0.0.8"
}
```

- Add new bash scripts in the `.scripts` directory
- Add node scripts (.mjs) like `.files.index.mjs`

5. #### Verify Hub is running

Run `npm start` navigate to http://localhost:8080/dashboard

it _should just work_ (works on my machine)
