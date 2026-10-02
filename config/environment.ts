import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const environment = process.env.TEST_ENV ?? 'qa';
const environmentFiles: Record<string, string> = {
    dev: 'config/.env.dev',
    qa: 'config/.env.qa',
    prod: 'config/.env.prod',
};
const environmentFile = environmentFiles[environment];

if (!environmentFile) {
    throw new Error(`Unsupported TEST_ENV "${environment}". Expected dev, qa, or prod.`);
}

dotenv.config({ path: path.resolve(__dirname, '..', environmentFile) });

export const config = {
    baseUrl: process.env.BASE_URL || 'https://www.kapruka.com',
    loginPath: '/shops/customerAccounts/accountLogin.jsp',
};
