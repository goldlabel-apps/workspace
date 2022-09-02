## Symlinks

*As a developer I want to be able to see instant changes rendered to the browser so that I can do more iterations more quickly*

To achieve this I'm using a symlink to connect the Workapse and HUB's feature folder. In this way I can work on <DynamicBanners /> and have the single folder running in both the HUB and workspace dev environmants. Changes are rendered automatically on both with webpack etc, but in the workspace it is rendered MUCH quicker

#### What is symlink?

A symlink is a symbolic Linux/ UNIX link that points to another file or folder on your computer, or a connected file system. This is similar to a Windows shortcut.

```bash
ln -s /<path to file/folder to be linked> <path of the link to be created>
```

To symlink the workspace copy of <DynamicBanners /> to the hub-frontend I did this; 

#### Paths

- ~/Node/DT9/dt9-env/dt9-workspace/frontend/src/features/DynamicBanners
- ~/Node/DT9/dt9-env/dt9-hub-frontend/src/features/DynamicBanners

> Open terminal and drag a folder into the window to find out a path quickly

#### The money shot

Create the terminal command and cut & paste, bro. It _should just work_ :)

```bash
ln -s ~/Node/DT9/dt9-env/dt9-hub-frontend/src/features/DynamicBanners ~/Node/DT9/dt9-env/dt9-workspace/frontend/src/features
```
