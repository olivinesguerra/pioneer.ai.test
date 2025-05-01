import Anthropic from "@anthropic-ai/sdk";
import dotenv from 'dotenv';
dotenv.config()

const anthropic = new Anthropic({ apiKey: process.env.ANTROPIC_API_KEY });

export const formParameters = async (query: string) => {
    const prompt = `
        Form a json to create a Foursquare API search parameters. https://docs.foursquare.com/developer/reference/place-search.

        For the json using the following format 

        {
            params: <json parameter formed>
        }
        
        Response with json only.
    `;

    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-latest",
        max_tokens: 1000,
        temperature: 1,
        system: prompt,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: query
                    }
                ]
            }
        ]
    });
    

    const { content } = msg;

    if (content?.length > 0) {
        const response = content[0];
        const { text } : any = response;
        const jsonParams = JSON.parse(text);
        return jsonParams;
    }


    throw Error("Search failed");
};