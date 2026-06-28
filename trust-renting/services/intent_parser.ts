interface IntentParser {
  parse(query: string): Promise<SearchIntent>;
}
