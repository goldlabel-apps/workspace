## `feature/features`

Organising React Apps into features is something seen recently by developers using [redux-toolkit](https://redux-toolkit.js.org/). The idea is that all the indiviual parts pertaining to that particular features are collected together into a single directory which is made as easy as possible to integrate with any JS app. Features can be implemented as packages, standalone or even as part of a framework like  [SingleSPA](https://single-spa.js.org/). Whatever the implemetation, the idea is to make it as easy as possible to add and move features between projects

#### Pull Request 

This PR adds the features directory and makes small changes to the following non-features directory files to enable the use of features. This PR does not add the features themselves, it only prepares the codebase for that

Add the following dependency to `/package.json` 

```javascript
  "dependencies": {
    ...
    "@reduxjs/toolkit": "^1.8.3",
    ...
```
Add the dependency with `npm i`. The legacy peer dependencies problem may come up here. There has been a recent change to npm which means for various reasons, we sometimes have to use `--legacy-peer-deps` flag to get things to install

```bash
npm i --registry https://registry.npmjs.org
# or 
npm i --registry https://registry.npmjs.org --legacy-peer-deps
```

#### TypeScript Definitions

`./index.d.ts`

```javascript
export interface SysError {
    severity: string,
    code: number | string
    message: string
}
```

#### Also in Development

- [Shared](https://github.com/DT9Media/dt9-workspace/tree/feature/sites/frontend/src/features/Shared)
- [Banners](https://github.com/DT9Media/dt9-workspace/tree/feature/sites/frontend/src/features/Banners)
- [Sites](https://github.com/DT9Media/dt9-workspace/tree/feature/sites/frontend/src/features/Sites) 

HUB feature which allows CRUD management of sites. It is written as a React/TypeScript plugin for HUB, but it could and does run on it's own

- [Forms](https://github.com/DT9Media/dt9-workspace/tree/feature/sites/frontend/src/features/Forms)

#### More info

- TypeScript & redux-toolkit
- Features introduces a new redux store, wrapped by and not affecting the original store

```javascript
const app = (
    <Provider store={store}>
        <Provider store={featuresStore}>
```