import { SearchIntent } from "../intent/intent.types";

export function buildIdealistaQuery({
  intent,
  locationId,
}: {
  intent: SearchIntent;
  locationId: string;
}) {
  const query: any = {
    country: "es",
    page: 1,
    resultCount: 30,
    sortOrder: "Default",
    operation: intent.operation ?? "For_Rent",
    location: locationId,
  };

  // LOCATION (for now only text, we’ll upgrade later with autocomplete)
  if (intent.location) {
    query.location = intent.location;
  }

  // PRICE
  if (intent.price?.min || intent.price?.max) {
    query.price = [
      intent.price.min ? `min:${intent.price.min}` : null,
      intent.price.max ? `max:${intent.price.max}` : null,
    ]
      .filter(Boolean)
      .join(",");
  }

  // BEDROOMS
  if (intent.bedrooms) {
    query.bedrooms = intent.bedrooms.toString();
  }

  // BOOLEANS (direct mapping)
  if (intent.terrace) query.terrace = true;
  if (intent.pool) query.pool = true;
  if (intent.garage) query.garage = true;
  if (intent.elevator) query.elevator = true;
  if (intent.petsAllowed) query.petsAllowed = true;

  if (intent.furnished) query.furnished = true;
  if (intent.airConditioning) query.airConditioning = true;

  return query;
}
