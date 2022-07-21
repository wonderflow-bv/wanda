# Contributing to the project

Wanda's design system monorepo is built on top of a modern toolchain composed by [Turborepo][turborepo], [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces), [Changeset][changeset], and [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

To work on this project you have to know how a monorepo works and how to use the above mentioned tools to being able to introduce features, fixes and changes.

## Table of Content

- [Contributing to the project](#contributing-to-the-project)
  - [Table of Content](#table-of-content)
  - [Workspaces](#workspaces)
  - [How to contribute](#how-to-contribute)
    - [Installation](#installation)
      - [Dependencies](#dependencies)
      - [Environment variables](#environment-variables)
    - [Running the project](#running-the-project)
    - [Building the project](#building-the-project)
    - [Running tests](#running-tests)
    - [Adding a change](#adding-a-change)
      - [Add a change](#add-a-change)
      - [Start prerelease](#start-prerelease)
      - [Close prerelease](#close-prerelease)
  - [Releasing](#releasing)
    - [Documentation website](#documentation-website)

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

To being able to start the project you have to follow the following steps and install all the required tools.

#### Dependencies

After you cloned the repository, run `npm i` from the project root. You'will install all the required dependencies.

#### Environment variables

Environment variables are handled by [Doppler](https://docs.doppler.com/docs). Proceed as follow to configure and get env variables:

1. Install Doppler CLI and `gnupg` by following [the doc](https://docs.doppler.com/docs/install-cli#installation)
2. Login to Doppler website by using the shared `design` credential.
3. Login to doppler cli from terminal, by running `doppler login`. [More info](https://docs.doppler.com/docs/install-cli#local-development)
4. From the project root, go inside `/apps/docs` and run `doppler setup`, on requested, select the `dev` environment of `wanda` project.
5. Go back to the project root and follow the next section.

### Running the project

```sh
npm run start
```

Running this command from the project root will execute all the `start` scripts inside workspaces. Currently only **react-components** and **docs** packages have a `start` script.

Once you run the command both `react-components` and `docs` should start in development mode.

If you're working with `graphql` queries you may need to run `codegen:watch` in a separated terminal to watch and rebuild queries on file changes.

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

#### Start prerelease

```sh
npx changeset pre enter next
```

Start a new prerelease channel called `next`. All `npm run change` commands run after this will be released as `package-name@version-next`.

#### Close prerelease

```sh
npx changeset pre exit
```

Exit from the current prerelease channel and make all future changes released inside the main channel.

[changeset]: https://github.com/changesets/changesets
[turborepo]: https://turborepo.org/

## Releasing

To release the packages the only thing to do is to merge the PR opened by changeset workflow, generated after pushing `changes` to the `main` branch.

To release the documentation website you can either use the Github CLI or [trigger the workflow from GithHub](https://github.com/wonderflow-bv/wanda/actions/workflows/production.yml)

### Documentation website

The production release of the website can be done by manually triggering the `production` workflow from the Actions page on Github.

If you have the [`github-cli`](https://cli.github.com/) installed you can just run this command `gh workflow run "production"`
