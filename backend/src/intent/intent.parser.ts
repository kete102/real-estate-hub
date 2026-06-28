import OpenAI from "openai";
import { buildIntentPrompt } from "./intent.prompt";
import { SearchIntentSchema } from "./intent.schema";

export class IntentParser {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async parse(query: string) {
    console.log("Parser query: ", query);
    const prompt = buildIntentPrompt(query);

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You convert natural language into structured JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    });

    console.log("LLM response: ", response.choices[0].message);

    const text = response.choices[0].message.content ?? "{}";

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid JSON from LLM");
    }

    const validated = SearchIntentSchema.safeParse(parsed);

    if (!validated.success) {
      throw new Error("Invalid intent schema");
    }

    const intent = validated.data;

    return {
      ...intent,
      bedrooms: intent.bedrooms ?? undefined,
      bathrooms: intent.bathrooms ?? undefined,
      size: intent.size ?? undefined,
    };
  }
}
