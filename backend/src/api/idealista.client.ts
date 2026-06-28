export async function fetchIdealistaListings(params: Record<string, any>) {
  const url = new URL("https://idealista.realtyapi.io/search/bylocation");

  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-realtyapi-key": "rt_7XmLE6XtCIIDJf9Bw1d8NKIH",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Idealista API error: ${text}`);
  }

  return res.json();
}
