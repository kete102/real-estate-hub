// intent.prompt.ts

export const buildIntentPrompt = (query: string) => `
You are a strict JSON extractor.

Convert the user query into a structured search intent.

RULES:
- Output ONLY valid JSON.
- Do NOT include explanations.
- Do NOT guess missing values.
- Use null or omit fields if not present.
- Prices must be numbers.
- Bedrooms must be numbers.
- location is free-text only.
- If a field is unknown, OMIT it. Do NOT use null.
- Location must be a real city, district, or neighborhood name
- Do NOT include words like "cerca de", "near", "around"
- Extract only the place name

SCHEMA:
{
  location?: string,
  price?: { min?: number, max?: number },
  size?: { min?: number, max?: number },
  bedrooms?: number,
  bathrooms?: number,
  operation?: "For_Sale" | "For_Rent" | "For_Share",
  terrace?: boolean,
  pool?: boolean,
  petsAllowed?: boolean,
  garage?: boolean,
  elevator?: boolean,
  furnished?: boolean,
  airConditioning?: boolean,
  keywords?: string[]
}

USER QUERY:
"""${query}"""
`;
