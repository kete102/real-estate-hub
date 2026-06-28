export async function resolveLocation(input: string) {
  const url = new URL("https://idealista.realtyapi.io/autocomplete");

  url.searchParams.append("input", input);
  url.searchParams.append("country", "es");

  console.log(url);
  const res = await fetch(url.toString(), {
    headers: {
      "x-realtyapi-key": "rt_7XmLE6XtCIIDJf9Bw1d8NKIH",
    },
  });

  if (!res.ok) {
    throw new Error("Autocomplete failed");
  }

  const result = await res.json();

  return result.searchResults[0].locationId;
}
