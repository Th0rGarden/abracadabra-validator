// Vercel Serverless Function: api/index.js

export default async function handler(request, response) {
    // This is your secret key, which you will set in the Vercel dashboard.
    const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;

    // Allow requests from Obsidian
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    if (request.method !== 'POST') {
        return response.status(405).json({ valid: false, error: 'Method Not Allowed' });
    }

    const { license_key } = request.body;

    if (!license_key) {
        return response.status(400).json({ valid: false, error: 'License key is required.' });
    }

    // Securely call Lemon Squeezy from your server
    try {
        const lemonResponse = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}` // The secret key is used here
            },
            body: JSON.stringify({ license_key })
        });

        const data = await lemonResponse.json();

        // Forward Lemon Squeezy's response back to the plugin
        return response.status(lemonResponse.status).json(data);

    } catch (error) {
        console.error('Error validating with Lemon Squeezy:', error);
        return response.status(500).json({ valid: false, error: 'An error occurred during validation.' });
    }
}