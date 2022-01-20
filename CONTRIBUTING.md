# Contributing to the project

Wanda's design system monorepo is built on top of a modern toolchain composed by [Turborepo][turborepo], [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces), [Changeset][changeset], and [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

To work on this project you have to know how a monorepo works and how to use the above mentioned tools to being able to introduce features, fixes and changes.


## Table of Content

- [Workspaces](#workspaces)
- [How to contribute](#how-to-contribute)
  * [Installation](#installation)
  * [Running the project](#running-the-project)
  * [Building the project](#building-the-project)
  * [Running tests](#running-tests)
  * [Adding a change](#adding-a-change)
    + [Add a change](#add-a-change)
    + [Start prerelease](#start-prerelease)
    + [Close prerelease](#close-prerelease)

---

## Workspaces

Worspaces are areas defined within the repository which are considered as isolated scopes where to put your packages and apps.

In this project there are 2 defined workspaces:

<details>
  <summary>packages</summary>
  Where live all the NPM packages like, tokens, themes, components...
</details>

<details>
  <summary>apps</summary>
  Where live all the web applications/websites related to Wanda. Like the documentation website.
</details>

## How to contribute

### Installation

After you cloned the repository, run `npm i` from the project root. You'will install all the required dependencies.

### Running the project

```sh
npm run start
```

Running this command from the project root will execute all the `start` scripts inside workspaces. Currently only **react-components** and **docs** packages have a `start` script.

Once you run the command both `react-components` and `docs` should start in development mode.

### Building the project

```sh
npm run build
```

Running this command from the project root will execute all the `build` scripts inside workspaces. It will build all the `packages` and `apps` at the same time, using the power of [Turborepo][turborepo] to build only the changed elements.

### Running tests

```sh
npm run test
```

This command will run all the `test` scripts inside workspaces.

### Adding a change

We rely on [Changeset][changeset] to generate changelogs and release notes across all workspaces. You can check the whole documentation to learn how to create and ship changes. Here you can find some basic commands:

#### Add a change

```sh
npx changeset
```

Register a change which will be included inside changelog and release notes.

#### Start prerelease

```
npx changeset pre enter next
```

Start a new prerelease channel called `next`. All `changeset version` commands run after this will be released as `package-name@next`.

#### Close prerelease

```
npx changeset pre exit
```

Exit from the current prerelease channel and make all future changes released inside the main channel.

[changeset]: https://github.com/changesets/changesets
[turborepo]: https://turborepo.org/
