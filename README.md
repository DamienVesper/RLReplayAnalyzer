<div align="center">
    <img src="https://img.shields.io/badge/node.js%20-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/typescript-%233178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</div>

## Prerequisites
 * [Node.js](https://nodejs.org)
 * [pnpm](https://pnpm.io)
 * [Stack](https://haskellstack.org)
 * [Rattletrap](https://hackage.haskell.org/package/rattletrap)

## Installation
This project utilizes [pnpm](https://pnpm.io). No other package manager is supported for this project.

To install dependencies for this project, open a command line interface at the directory of the cloned repository, and run:
```sh
pnpm install
```

This will create a `node_modules` directory in that of your project and link the packages there.

## Setup
1. Copy the contents of `.env.example` to `.env` in the root directory of the repository.
2. Replace the contents of each key with personalized values.
```
# Rocket League
REPLAY_DIR="<path/to/directory>"
```

## Execution
To run the script, execute
```
pnpm run dev
```
