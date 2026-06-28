export type Operation = "For_Sale" | "For_Rent" | "For_Share";

export interface SearchIntent {
  location?: string;

  price?: {
    min?: number;
    max?: number;
  };

  size?: {
    min?: number;
    max?: number;
  };

  bedrooms?: number;

  bathrooms?: number;

  operation?: Operation;

  terrace?: boolean;
  pool?: boolean;
  petsAllowed?: boolean;
  garage?: boolean;
  elevator?: boolean;

  furnished?: boolean;
  airConditioning?: boolean;

  keywords?: string[];
}
