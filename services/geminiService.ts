
import { GoogleGenAI, Type } from "@google/genai";
import { AnimalInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANIMAL_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Common name of the animal" },
    scientificName: { type: Type.STRING, description: "Latin scientific name" },
    location: { type: Type.STRING, description: "Primary geographic locations" },
    status: { 
      type: Type.STRING, 
      description: "Conservation status (e.g., Endangered, Vulnerable, etc.)",
      enum: ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild']
    },
    caption: { type: Type.STRING, description: "A brief, charming description (2-3 sentences)" },
    funFact: { type: Type.STRING, description: "One super interesting surprising fact about this animal" }
  },
  required: ["name", "scientificName", "location", "status", "caption", "funFact"],
};

export async function fetchRandomAnimal(excludeNames: string[] = []): Promise<AnimalInfo> {
  const exclusionPrompt = excludeNames.length > 0 
    ? ` DO NOT choose any of the following animals: ${excludeNames.join(', ')}.` 
    : '';

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Choose a random, interesting animal from anywhere in the world and provide its details. Try to pick varied species, from deep-sea creatures to rare mountain birds.${exclusionPrompt} Aim for diversity in phylum and habitat.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: ANIMAL_SCHEMA,
    },
  });

  return JSON.parse(response.text);
}

export async function generateAnimalImage(animalName: string, caption: string): Promise<string> {
  const prompt = `A vibrant, high-quality, professional nature photograph of a ${animalName} in its natural habitat. ${caption}. Beautiful lighting, clear focus, 4k resolution.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data found in response");
}
