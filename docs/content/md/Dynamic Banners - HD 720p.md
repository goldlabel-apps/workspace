# Dynamic Banner Feature

## Integrating code from [workspace](https://github.com/DT9Media/dt9-workspace) into [tentacle](https://github.com/DT9Media/dt9-tentacle) & [hub-frontend](https://github.com/DT9Media/dt9-hub-frontend)

> As a **Nico** I want to be able to create and manage various versions of a dynamic React banner using HUB so that I can one day pass that job onto a non-developer

### Pull and branch from staging

There is a special part of hell reserved for people who don't do this. I'm going to make sure both my tentacle and hub-frontend repos are up to date on staging and that the environment works ok

We create 2 branches with the same name on the two seperate repos. That clearly means 2 PRs at the end too aswell

```bash
cd ./dt9-env/dt9-hub-frontend
git checkout -b feature/dynamic-banners
cd ../dt9-tentacle 
git checkout -b feature/dynamic-banners
```

Yeh... so that's that done. Let's just fire up the environmant shall we? I created a script (which works on my machine.... no guarantees it will on yours) which when run opens up and starts the various parts of the app. Give it a sec to fire up and we'll look at it in the browse



#### Notes

Dynamic Banners, DynamicBanners, dynamic-banners, dynamic_banners,  dynamicBanners, feature/dynamic-banners