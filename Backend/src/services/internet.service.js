import { tavily } from '@tavily/core';

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const internetService = async (query) => {
    const response = await tavilyClient.search(query, {
        maxResults: 5,
    });
    return JSON.stringify(response);
}