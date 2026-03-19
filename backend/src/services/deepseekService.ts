import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.API_KEY_DEEPSEEK,
});

export const sendMessageToDeepseek = async (message: string) => {
    const response = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
            {
                role: 'user',
                content: message,
            },
        ],
    });
    return response.choices[0].message.content;
}   



export const getSummaryFromDeepseek = async (content: string) => {
    const prompt = `Summarize the following content in a concise manner (make it less than 100 words despite file size):\n\n${content}`;
    const summary = await sendMessageToDeepseek(prompt);
    return summary;
}