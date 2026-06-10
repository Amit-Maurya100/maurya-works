import { prisma } from "@/lib/prisma";
import {
  SITE_SETTING_DEFAULTS,
  type SiteSettingKey,
} from "@/lib/site-settings-keys";

export type SiteSettings = Record<string, string>;

export type ContactSettings = {
  companyName: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  mapLatitude: string;
  mapLongitude: string;
  mapZoom: string;
  mapEmbedUrl: string;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await prisma.siteSetting.findMany();
  const result: SiteSettings = { ...SITE_SETTING_DEFAULTS };

  for (const s of settings) {
    result[s.key] = s.value;
  }

  return result;
}

export async function getSiteSetting(
  key: SiteSettingKey,
  fallback?: string
): Promise<string> {
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  return setting?.value ?? fallback ?? SITE_SETTING_DEFAULTS[key];
}

export function resolveSetting(
  settings: SiteSettings,
  key: SiteSettingKey
): string {
  return settings[key] ?? SITE_SETTING_DEFAULTS[key];
}

export function getContactSettings(settings: SiteSettings): ContactSettings {
  return {
    companyName: resolveSetting(settings, "company_name"),
    phone: resolveSetting(settings, "phone"),
    email: resolveSetting(settings, "email"),
    whatsapp: resolveSetting(settings, "whatsapp"),
    address: resolveSetting(settings, "address"),
    mapLatitude: resolveSetting(settings, "map_latitude"),
    mapLongitude: resolveSetting(settings, "map_longitude"),
    mapZoom: resolveSetting(settings, "map_zoom"),
    mapEmbedUrl: resolveSetting(settings, "map_embed_url"),
  };
}

export function buildMapEmbedUrl(contact: ContactSettings): string | null {
  if (contact.mapEmbedUrl.trim()) {
    return contact.mapEmbedUrl.trim();
  }

  const lat = parseFloat(contact.mapLatitude);
  const lng = parseFloat(contact.mapLongitude);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return null;
  }

  const zoom = Math.min(20, Math.max(1, parseInt(contact.mapZoom, 10) || 15));

  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function buildMapDirectionsUrl(contact: ContactSettings): string | null {
  const lat = parseFloat(contact.mapLatitude);
  const lng = parseFloat(contact.mapLongitude);

  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  if (contact.address.trim()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;
  }

  return null;
}
