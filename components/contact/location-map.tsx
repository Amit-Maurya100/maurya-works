import { buildMapDirectionsUrl, buildMapEmbedUrl, type ContactSettings } from "@/lib/site-settings";
import { MapPin } from "lucide-react";

export function LocationMap({ contact }: { contact: ContactSettings }) {
  const embedUrl = buildMapEmbedUrl(contact);
  const directionsUrl = buildMapDirectionsUrl(contact);

  if (!embedUrl) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
        <div className="text-center">
          <MapPin className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-2">Map not configured.</p>
          <p className="text-xs">Set latitude and longitude in Admin → Settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <iframe
          title={`Map showing ${contact.companyName} location`}
          src={embedUrl}
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {directionsUrl && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline"
        >
          <MapPin className="h-4 w-4" />
          Get directions on Google Maps
        </a>
      )}
    </div>
  );
}
