import { SearchExperience } from "#/stories/SearchExperience";
import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Minimal top bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-sm font-bold tracking-tight text-gray-900">
          trust<span className="text-indigo-600">renting</span>
        </span>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Database className="h-3 w-3" />
          Mas de{" "}
          <span className="underline">
            {Number(10000).toLocaleString("es-ES")}
          </span>{" "}
          anuncios indexados
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-20">
        <SearchExperience />
      </main>

      <footer className="py-6 text-center text-xs text-gray-400">
        La manera ideal de buscar tu proximo alquiler{" "}
      </footer>
    </div>
  );
}
