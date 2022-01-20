Wanda's design system monorepo is built on top of a modern toolchain composed by [Turborepo](https://turborepo.org/), [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces), [Changeset](https://github.com/changesets/changesets), and [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

To work on this project you have to know how a monorepo works and how to use the above mentioned tools to being able to introduce features, fixes and changes.

## How to contribute

### Installation

After you cloned the repository, run `npm i` from the project root. You'will install all the required dependencies.

### Running the project

```sh
npm run start
```

Running this command from the project root will execute all the start scripts inside the workspaces.
