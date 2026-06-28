export interface SearchByLocationApiResponse {
  message: string;
  source: string;
  total: number;
  nextPage: boolean;
  resultCount: number;
  searchResults: Property[];
  page: number;
  totalPages: number;
  summary: string[];
}

export interface Property {
  propertyCode: string;
  url: string;
  thumbnail: string;
  numPhotos: number;
  price: number;
  currency: string;
  operation: Operation;
  propertyType: PropertyType;
  extendedPropertyType: string | null;
  size: number;
  rooms: number;
  bathrooms: number;
  floor: string | null;
  exterior: boolean;
  address: string;
  country: string;
  province: string;
  municipality: string;
  district: string;
  neighborhood: string;
  locationId: string;
  latitude: number;
  longitude: number;
  showAddress: boolean;
  description: string;
  newDevelopment: boolean;
  hasVideo: boolean;
  has3DTour: boolean;
  hasPlan: boolean;
  hasLift: boolean;
  status: string;
  topPlus: boolean;
  topNewDevelopment: boolean;
  tags: string[] | null;
  labels: Label[];
  energyCertification: EnergyCertification | null;
  contactInfo: ContactInfo;
  parkingSpace: ParkingSpace | null;
  features: Features;
  highlight: Highlight;
  priceDropValue: number | null;
  priceDropPercent: number | null;
  ribbon: Ribbon | null;
  favouriteInfo: FavouriteInfo | null;
}

export interface Label {
  name: string;
  text: string;
}

export interface ContactInfo {
  contactName: string;
  agencyName: string;
  userType: "professional" | "private";
  phone1: string;
  logoUrl: string | null;
  micrositeShortName: string | null;
}

export interface Features {
  hasSwimmingPool: boolean;
  hasTerrace: boolean;
  hasAirConditioning: boolean;
  hasBoxRoom: boolean;
  hasGarden: boolean;
}

export interface Highlight {
  groupDescription: string;
}

export type Operation = "For_sale" | "For_rent" | "For_Share";

export type PropertyType =
  | HomePropertyType
  | "office"
  | "garage"
  | "land"
  | "storage"
  | "premise"
  | "building"
  | "newDevelopment";

export type HomePropertyType =
  | "flat"
  | "chalet"
  | "duplex"
  | "penthouse"
  | "studio"
  | "country_house";

export type Status = "newdevelopment" | "renew" | "good" | "toRestore";

export type PropertyFilter = PropertyType | HomePropertyType;

/**
 * Unknown/nullable objects
 * Expand these if you encounter non-null values.
 */
export interface EnergyCertification {
  [key: string]: unknown;
}

export interface ParkingSpace {
  [key: string]: unknown;
}

export interface Ribbon {
  [key: string]: unknown;
}

export interface FavouriteInfo {
  [key: string]: unknown;
}
