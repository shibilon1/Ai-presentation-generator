
import { GoogleGenAI, Type } from "@google/genai";
import type { Slide } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const slideSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The title of the slide. Should be concise and engaging.",
    },
    content: {
      type: Type.ARRAY,
      description: "An array of strings, where each string is a bullet point for the slide body. Aim for 3-5 clear and informative points.",
      items: {
        type: Type.STRING
      }
    },
     speakerNotes: {
        type: Type.STRING,
        description: "Brief notes for the presenter for this specific slide. These notes will not be visible on the slide itself.",
     }
  },
  required: ["title", "content"]
};

export const generateSlides = async (topic: string): Promise<Slide[]> => {
  const prompt = `Generate a professional and informative presentation about "${topic}". 
  The presentation should be structured with a clear introduction, main body, and conclusion. 
  Create between 5 and 10 slides. For each slide, provide a title, content as bullet points, and brief speaker notes.
  Ensure the content is well-researched, accurate, and easy to understand for a general audience.
  The first slide should be a title slide and the last should be a conclusion or Q&A slide.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: slideSchema
        },
      },
    });

    const responseText = response.text.trim();
    const slidesData = JSON.parse(responseText);

    // Basic validation to ensure we have an array of slides
    if (Array.isArray(slidesData) && slidesData.every(s => s.title && Array.isArray(s.content))) {
      return slidesData as Slide[];
    } else {
      console.error("Parsed data is not in the expected format:", slidesData);
      throw new Error("Received malformed slide data from AI.");
    }
  } catch (error) {
    console.error("Error generating slides with Gemini:", error);
    throw new Error("Failed to communicate with the AI service.");
  }
};
