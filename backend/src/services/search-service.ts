import { resolveLocation } from "../api/idealista.autocomplete";
import { fetchIdealistaListings } from "../api/idealista.client";
import { SearchIntent } from "../intent/intent.types";
import { buildIdealistaQuery } from "../search/idealista.builder";

export class SearchService {
  async search(intent: SearchIntent) {
    let locationId = undefined;

    // 1. resolve location
    if (intent.location) {
      console.log("intent", intent);
      locationId = await resolveLocation(intent.location);
    }

    if (!locationId) {
      throw new Error("No valid location found");
    }

    // 2. build query using ID (NOT text)
    const query = buildIdealistaQuery({
      intent,
      locationId,
    });

    console.log("Final Query", query);

    const response = await fetchIdealistaListings(query);

    return {
      query,
      response,
    };
  }
}
