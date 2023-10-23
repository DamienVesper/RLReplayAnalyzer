import { config as dotenv } from 'dotenv';

import * as logExtra from './utils/logExtra';
import log from './utils/log';

dotenv();

/**
 * Prevents crash on error.
 */
process.on(`uncaughtException`, err => log(`red`, err.stack ?? err.message));

/**
 * Start the program.
 */
const main = async (): Promise<void> => {
    // Clear console and log program headers.
    console.clear();

    logExtra.logSplash();
    logExtra.logHeader();
};

// Start the program.
void main();
