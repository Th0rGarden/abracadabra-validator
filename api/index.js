export default async function handler(request, response) {

    const BETA_PROGRAM_ACTIVE = true;

    const BETA_KEYS = new Set([
        'WELCOME-TO-THE-GARDEN',
        'HOCUS-POCUS-FOCUS',
        'THE-WIZARDS-APPRENTICE',
        'THE-CHARM',
        'ENCHANTED-VAULT-KEY',
        'HERE-BE-DRAGONS',
        'THE-HAT-IS-SORTING',
        'EXPECTO-PRODUCTIVUM',
        'LINK-ALL-THE-THINGS',
        'DIGITAL-GARDENER',
        'MIND-LIKE-WATER',
        'SLAY-THE-KNOWLEDGE-DRAGON',
        'ONE-PLUGIN-TO-RULE-THEM',
        'MY-VAULT-HAS-TOO-MANY-PLUGINS',
        'I-SHOULD-BE-WRITING',
        'IT-WORKS-ON-MY-MACHINE',
        'NOT-A-BUG-ITS-A-FEATURE',
        'POWERED-BY-COFFEE-AND-REGRET',
        'INFINITE-TABS-INCOMING',
        'PROCRASTINATION-STATION',
        'I-READ-THE-DOCS-I-SWEAR',
        'MISSION-CONTROL-ONLINE',
        'WARP-DRIVE-ACTIVE',
        'I-AM-YOUR-FATHERBOARD',
        'UNLOCK-THE-MATRIX',
        'THE-SPICE-MUST-FLOW',
        'GIDEON-PRIME-ACCESS',
        'HAL-9000-APPROVED',
        'SCRIBE-OF-THE-ANCIENTS',
        'EUREKA',
        'GOLDEN-TICKET',
        'FOUNDERS-KEY',
        'VANGUARD-TESTER',
        'PROJECT-ABRACADABRA',
        'THOR-GARDEN-SUPPORTER'
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

    const { license_key } = request.body || {};

    if (!license_key) {
        return response.status(400).json({ valid: false, error: 'license_key not found.' });
    }

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
