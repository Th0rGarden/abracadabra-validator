export default async function handler(request, response) {

    const BETA_PROGRAM_ACTIVE = true;

    const BETA_KEYS = new Set([
        'BETA-WELCOME-TO-THE-GARDEN',
        'BETA-HOCUS-POCUS-FOCUS',
        'BETA-THE-WIZARDS-APPRENTICE',
        'BETA-THE_CHARM',
        'BETA-ENCHANTED-VAULT-KEY',
        'BETA-HERE-BE-DRAGONS',
        'BETA-THE-HAT-IS-SORTING',
        'BETA-EXPECTO-PRODUCTIVUM',
        'BETA-LINK-ALL-THE-THINGS',
        'BETA-DIGITAL-GARDENER',
        'BETA-MIND-LIKE-WATER',
        'BETA-SLAY-THE-KNOWLEDGE-DRAGON',
        'BETA-ONE-PLUGIN-TO-RULE-THEM',
        'BETA-MY-VAULT-HAS-TOO-MANY-PLUGINS',
        'BETA-I-SHOULD-BE-WRITING',
        'BETA-IT-WORKS-ON-MY-MACHINE',
        'BETA-NOT-A-BUG-ITS-A-FEATURE',
        'BETA-POWERED-BY-COFFEE-AND-REGRET',
        'BETA-INFINITE-TABS-INCOMING',
        'BETA-PROCRASTINATION-STATION',
        'BETA-I-READ-THE-DOCS-I-SWEAR',
        'BETA-42',
        'BETA-MISSION-CONTROL-ONLINE',
        'BETA-WARP-DRIVE-ACTIVE',
        'BETA-I-AM-YOUR-FATHERBOARD',
        'BETA-UNLOCK-THE-MATRIX',
        'BETA-THE-SPICE-MUST-FLOW',
        'BETA-GIDEON-PRIME-ACCESS',
        'BETA-HAL-9000-APPROVED',
        'BETA-SCRIBE-OF-THE-ANCIENTS',
        'BETA-EUREKA',
        'BETA-GOLDEN-TICKET',
        'BETA-FOUNDERS-KEY',
        'BETA-VANGUARD-TESTER',
        'BETA-PROJECT-ABRACADABRA',
        'BETA-THOR-GARDEN-SUPPORTER'
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
