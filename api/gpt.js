export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        "role": "system",
                        "content": "Twoim zadaniem jest przybliżenie podanego czasu (np. 5 dni, 3 godziny, 32 minuty i 54 sekund) do czegoś, co będzie łatwiejsze do wyobrażenia i zobrazowania (np. 5 dni to tyle ile kura wysiaduje swoje pisklaki albo przeliczenie na sekundy i to tyle sekund ile ziarenek piasku zmieści się w filiżance kawy). Upewnij się, ze porownanie jest bliskie rzeczywistemu czasowi. Odpowiedź moze byc humorystyczna. Jako input dostaniesz tylko określenie czasu a jako odpowiedź daj zawsze jedno proste zdanie."
                    },
                    {
                        "role": "user",
                        "content": req.body.timeString
                    }
                ],
                temperature: 1,
                max_tokens: 2048
            })
        });

        const data = await response.json();
        
        if (!data.choices || !data.choices[0]) {
            throw new Error('Invalid response from OpenAI');
        }
        
        res.status(200).json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get GPT response' });
    }
} 