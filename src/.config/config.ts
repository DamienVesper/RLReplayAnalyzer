import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as dotenv from 'dotenv';
dotenv.config();

interface Args {
    mode: string
}

interface Config extends Args {
    replayDir?: string
}

const argv = yargs(hideBin(process.argv)).options({
    mode: { type: `string`, default: `dev` },
}).argv as Args;

const config = {
    mode: argv.mode,

    replayDir: process.env.REPLAY_DIR
} satisfies Config;

export default config;
