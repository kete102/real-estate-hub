import { Link } from "@tanstack/react-router";
import type { Property } from "../../types/realty_api";
import { BathIcon, BedDouble } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      to={property.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <article className="flex gap-4 p-3 border border-black/10 hover:border-black/20 hover:shadow-md transition-all rounded-xl w-full max-w-[450px]">
        <img
          src={property.thumbnail}
          alt={property.address}
          className="w-32 h-32 rounded-lg object-cover shrink-0"
        />

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg text-zinc-900 line-clamp-2">
              {property.address}
            </h3>

            {property.priceDropValue && (
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                -€{property.priceDropValue.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-sm text-zinc-500">
            {property.district}, {property.municipality}
          </p>

          <p className="mt-2 text-2xl font-bold text-zinc-900">
            €{property.price.toLocaleString()}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600">
            <span>{property.propertyType}</span>
            <span>{property.size} m²</span>
            <span>
              {property.rooms} <BedDouble />{" "}
            </span>
            <span>
              {property.bathrooms} <BathIcon />
            </span>

            {property.hasLift && <span>Lift</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
