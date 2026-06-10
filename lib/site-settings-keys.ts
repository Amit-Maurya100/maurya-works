export const SITE_SETTING_KEYS = {
  company_name: "company_name",
  tagline: "tagline",
  phone: "phone",
  email: "email",
  whatsapp: "whatsapp",
  address: "address",
  map_latitude: "map_latitude",
  map_longitude: "map_longitude",
  map_zoom: "map_zoom",
  map_embed_url: "map_embed_url",
  hero_title: "hero_title",
  hero_subtitle: "hero_subtitle",
  about_history: "about_history",
  about_mission: "about_mission",
  about_values: "about_values",
  quality_process: "quality_process",
} as const;

export type SiteSettingKey = keyof typeof SITE_SETTING_KEYS;

export const SITE_SETTING_DEFAULTS: Record<SiteSettingKey, string> = {
  company_name: "Maurya Textile Machinery",
  tagline: "Manufacturing & Repairing Textile Machinery Since 1995",
  phone: "+91 98765 43210",
  email: "info@mauryatextile.com",
  whatsapp: "+919876543210",
  address: "Industrial Area, Phase II, Surat, Gujarat 394210, India",
  map_latitude: "21.1702",
  map_longitude: "72.8311",
  map_zoom: "15",
  map_embed_url: "",
  hero_title: "Precision Textile Machinery Manufacturing & Expert Repair Services",
  hero_subtitle:
    "Trusted partner for textile mills, garment manufacturers, and industrial producers across India.",
  about_history:
    "Founded in 1995, Maurya Textile Machinery has grown from a small repair workshop into a full-scale manufacturing and servicing company.",
  about_mission:
    "To deliver reliable textile machinery solutions that maximize uptime, efficiency, and production quality for our clients.",
  about_values:
    "Quality craftsmanship, transparent service, on-time delivery, and long-term client partnerships.",
  quality_process:
    "Every machine undergoes multi-stage inspection before dispatch.",
};

export const CONTACT_SETTING_KEYS: SiteSettingKey[] = [
  "company_name",
  "phone",
  "email",
  "whatsapp",
  "address",
];

export const LOCATION_SETTING_KEYS: SiteSettingKey[] = [
  "map_latitude",
  "map_longitude",
  "map_zoom",
  "map_embed_url",
];

export const CONTENT_SETTING_KEYS: SiteSettingKey[] = [
  "tagline",
  "hero_title",
  "hero_subtitle",
  "about_history",
  "about_mission",
  "about_values",
  "quality_process",
];

export const ALL_SETTING_KEYS: SiteSettingKey[] = [
  ...CONTACT_SETTING_KEYS,
  ...LOCATION_SETTING_KEYS,
  ...CONTENT_SETTING_KEYS,
];

export const SETTING_LABELS: Record<SiteSettingKey, string> = {
  company_name: "Company Name",
  tagline: "Tagline",
  phone: "Phone Number",
  email: "Email Address",
  whatsapp: "WhatsApp Number",
  address: "Factory Address",
  map_latitude: "Latitude",
  map_longitude: "Longitude",
  map_zoom: "Map Zoom Level (1–20)",
  map_embed_url: "Custom Map Embed URL (optional override)",
  hero_title: "Hero Title",
  hero_subtitle: "Hero Subtitle",
  about_history: "About History",
  about_mission: "About Mission",
  about_values: "About Values",
  quality_process: "Quality Process",
};
