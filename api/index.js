// Vercel Serverless Function: api/index.js

export default async function handler(request, response) {
    // --- CONFIGURATION ---
    // This is your master switch for the beta program!
    // To end the beta, change this to 'false' and redeploy.
    const BETA_PROGRAM_ACTIVE = true;

    // This is your list of valid beta keys.
    // Add or remove keys from this list as needed.
    const BETA_KEYS = new Set([
        'BETA-WELCOME-TO-THE-GARDEN',
        'BETA-ANOTHER-TESTER-KEY',
        'BETA-OBSIDIAN-ROCKS'
    ]);

    // --- CORS Headers ---
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    // --- Main Logic ---
    if (request.method !== 'POST') {
        return response.status(405).json({ valid: false, error: 'Method Not Allowed' });
    }

    const { license_key } = request.body;

    if (!license_key) {
        return response.status(400).json({ valid: false, error: 'License key is required.' });
    }

    // Check if the provided key is in our list of beta keys
    const isKeyValid = BETA_KEYS.has(license_key);

    if (isKeyValid && BETA_PROGRAM_ACTIVE) {
        // The key is in the list and the beta program is active
        console.log(`Beta key validated: ${license_key}`);
        return response.status(200).json({ valid: true, message: 'Beta access granted.' });
    } else if (isKeyValid && !BETA_PROGRAM_ACTIVE) {
        // The key is valid, but the beta program has ended
        console.log(`Expired beta key attempted: ${license_key}`);
        return response.status(200).json({ valid: false, error: 'The beta program has ended. Thank you for testing!' });
    } else {
        // The key was not found in the list
        console.log(`Invalid key attempted: ${license_key}`);
        return response.status(200).json({ valid: false, error: 'Invalid license key.' });
    }
}
