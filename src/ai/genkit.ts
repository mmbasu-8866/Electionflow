import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY || "AIzaSyCm2o0JY6WXL-0QugSmhbWWtYBckWgr3Tw";

if (!apiKey) {
  // Silent in production, fallback key is provided
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-1.5-flash',
});
