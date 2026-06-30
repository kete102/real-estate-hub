import { useState, useRef } from "react";
import {
  Search,
  Loader2,
  ArrowRight,
  Sparkles,
  Map,
  LayoutGrid,
} from "lucide-react";
// import type { ListingWithInsight } from "@/app/api/search/route";
// import { ResultCard } from "./ResultCard";
// import { ResultsMap } from "./ResultsMap";
import { cn } from "#/lib/utils";
import type { SearchByLocationApiResponse } from "../../types/realty_api";
import { PropertyCard } from "./PropertyCard";

const BASE_URL =
  "https://idealista.realtyapi.io/search/bylocation?location=Madrid&country=es&page=1&resultCount=30&sortOrder=Default&searchType=For_Sale&propertyType=homes&ownerType=private&locale=en";

const SUGGESTIONS = [
  "Piso luminoso en Malasaña por menos de 1200€",
  "Estudio amueblado cerca del Retiro",
  "Piso de 3 habitaciones en Chamberí, máximo 2000€",
  "Alquiler barato en el sur de Madrid",
  "Ático con terraza en Salamanca",
  "Piso con parking y ascensor",
];

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "results" | "error">(
    "idle",
  );
  const [response, setResponse] = useState<SearchByLocationApiResponse | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [view, setView] = useState<"grid" | "map">("grid");
  const inputRef = useRef<HTMLInputElement>(null);

  async function chatSearch(query: string) {
    setState("loading");
    const res = await fetch("/api/v1/chat-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error("Search failed");
    }

    const { response } = await res.json();

    setResponse(response as SearchByLocationApiResponse);
    setState("results");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    chatSearch(query);
  }

  const showHero = state === "idle";

  return (
    <div
      className={cn(
        "flex flex-col transition-all duration-500",
        showHero ? "pt-28" : "pt-10",
      )}
    >
      {/* ── Hero ── */}
      {showHero && (
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold mb-5 border border-indigo-100">
            <Sparkles className="h-3 w-3" />
            Búsqueda semántica con IA
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-950 mb-4 leading-[1.1]">
            Encuentra tu piso
            <br />
            <span className="text-indigo-600">ideal</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Describe lo que buscas con tus propias palabras.
          </p>
        </div>
      )}

      {/* ── Search bar ── */}
      <div
        className={cn(
          "w-full mx-auto transition-all duration-300",
          showHero ? "max-w-2xl" : "max-w-4xl",
        )}
      >
        <form onSubmit={handleSubmit}>
          <div
            className={cn(
              "flex items-center gap-3 px-5 py-4 bg-white rounded-2xl transition-shadow duration-200",
              state === "loading"
                ? "shadow-lg ring-2 ring-indigo-200"
                : "shadow-md ring-1 ring-gray-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-300",
            )}
          >
            {state === "loading" ? (
              <Loader2 className="h-5 w-5 text-indigo-500 shrink-0 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-gray-400 shrink-0" />
            )}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: piso de 2 habitaciones amueblado en Chamberí por menos de 1400€…"
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base"
              disabled={state === "loading"}
              autoFocus
            />
            <button
              type="submit"
              disabled={!query.trim() || state === "loading"}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Buscar
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Suggestion chips */}
        {showHero && (
          <div
            className="flex flex-wrap gap-2 justify-center mt-4 animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => chatSearch(s)}
                className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs text-gray-600 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Error ── */}
      {state === "error" && (
        <div className="mt-8 max-w-4xl mx-auto w-full px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
          {errorMsg}
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {state === "loading" && (
        <div className="mt-10 max-w-4xl mx-auto w-full">
          <div className="h-10 skeleton rounded-xl mb-6" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-gray-100"
              >
                <div className="aspect-[16/10] skeleton" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-3/4 skeleton rounded" />
                  <div className="h-3 w-1/2 skeleton rounded" />
                  <div className="h-4 w-1/3 skeleton rounded mt-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {state === "results" && response && (
        <div className="mt-8 max-w-4xl mx-auto w-full animate-fade-up">
          {/* Summary bar */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-start gap-2.5 px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-100 flex-1 min-w-0">
              <Sparkles className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <p className="text-sm text-indigo-800 truncate">
                <span className="font-semibold">Entendido: </span>
                {response.summary[0]}
                <span className="ml-2 text-indigo-400 font-normal">
                  · {response.total} resultados
                </span>
              </p>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg shrink-0">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  view === "grid"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-400 hover:text-gray-600",
                )}
                title="Vista cuadrícula"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("map")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  view === "map"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-400 hover:text-gray-600",
                )}
                title="Vista mapa"
              >
                <Map className="h-4 w-4" />
              </button>
            </div>
          </div>

          {response.total === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-medium text-gray-600 mb-1">
                Sin resultados
              </p>
              <p className="text-sm">
                Intenta ampliar los criterios o ejecuta el scraper para importar
                más datos.
              </p>
            </div>
          ) : view === "map" ? (
            <div className="space-y-4">
              {/* <ResultsMap listings={response.listings} /> */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up-stagger">
                {response.searchResults.map((result) => (
                  <PropertyCard key={result.propertyCode} property={result} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up-stagger">
              {response.searchResults.map((result) => (
                <PropertyCard key={result.propertyCode} property={result} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
