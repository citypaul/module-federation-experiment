# Module federation micro front ends experiment

This is an experiment in using [module federation](https://webpack.js.org/concepts/module-federation/) to enable micro front ends.

Module federation is enabled in Webpack 5, and allows for webpack to dynamically pull in remote modules at run time. This makes it possible to share code from one application to another. It also handles shared dependencies between applications for you.

Some of the goals here:

- Each app needs to be able to run independently during development

- Each app should be independently deployable through its own pipeline

- There should be little to no shared state between applications. Module federation makes this possible, but I wanted each app to be completely independent and to manage its own state

- Each application should be able to handle it's own routing requirements, and should have some channel to communicate route changes to the container app (and this should be the only app to app communication, and should be limited by a simple API that is agnostic to any specific client side routing technology)

- The container application should fetch child applications dynamically at run time, so a release to a child application should be instantly reflected by a page refresh in the container application

The code in this repo is a monorepo setup, where each sub folder represents a running application. They are:

- `/container`: The overall container application that pulls the other apps through at run time
- `/marketing`: A static site that contains marketing and product information. It has its own routes that need to work both during development and also when running throught the container
- `/auth`: A mini application that would handle the user signing in or registering. It also controls its own routes that need to sync with the container. Currently this isn't functional (in that you can't actually register or sign in), but it does run in isolation and syncs with the container as expected
- `/dashboard`: Just a place holder at the moment, currently doesn't do anything.

## Installation

Each sub folder is an app in it's own right, so you need to install and setup each:

### Marketing App

From inside the `/marketing` folder:

```sh
yarn install
yarn start
```

The app will be available locally on [http://localhost:8081/](http://localhost:8081/).

### Auth App

From inside the `/auth` folder:

```sh
yarn install
yarn start
```

The app will be available locally on [http://localhost:8082/](http://localhost:8082/).

### Container App

From inside the `/container` folder:

```sh
yarn install
yarn start
```

The container will be available locally on [http://localhost:8080](http://localhost:8080).

The container app pulls in the other apps dynamically, so in order for this application to run, the other applications also need to be running.

## A note on routing communication between parent/child application

In order to get this working, I've setup the child apps so that they expose a `mount` function via a `bootstrap.js` file.

The container application controls all the updates to the browser url via a `browserHistory`. The child applications all use their own `memoryHistory`, and then fire off a message to the parent so the parent can update the URL.

When ran in isolation, the memory object used will be `browserHistory`, which makes local development easier for developers, as the browser URL will update as expected locally then.
