import { updateSettings } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSiteSettings, resolveSetting } from "@/lib/site-settings";
import {
  CONTACT_SETTING_KEYS,
  CONTENT_SETTING_KEYS,
  LOCATION_SETTING_KEYS,
  SETTING_LABELS,
  type SiteSettingKey,
} from "@/lib/site-settings-keys";

type Props = { searchParams: Promise<{ saved?: string }> };

function SettingField({
  settingKey,
  settings,
  type = "input",
}: {
  settingKey: SiteSettingKey;
  settings: Record<string, string>;
  type?: "input" | "textarea";
}) {
  const isTextarea = type === "textarea" || settingKey === "address";

  return (
    <div className="space-y-2">
      <Label htmlFor={settingKey}>{SETTING_LABELS[settingKey]}</Label>
      {isTextarea ? (
        <Textarea
          id={settingKey}
          name={settingKey}
          rows={settingKey === "address" ? 3 : 2}
          defaultValue={resolveSetting(settings, settingKey)}
        />
      ) : (
        <Input
          id={settingKey}
          name={settingKey}
          type={
            settingKey === "email"
              ? "email"
              : settingKey.includes("latitude") ||
                  settingKey.includes("longitude") ||
                  settingKey === "map_zoom"
                ? "text"
                : "text"
          }
          placeholder={
            settingKey === "map_latitude"
              ? "e.g. 21.1702"
              : settingKey === "map_longitude"
                ? "e.g. 72.8311"
                : settingKey === "map_embed_url"
                  ? "Paste Google Maps embed URL (optional)"
                  : undefined
          }
          defaultValue={resolveSetting(settings, settingKey)}
        />
      )}
      {settingKey === "map_embed_url" && (
        <p className="text-xs text-slate-500">
          Leave blank to auto-generate the map from latitude and longitude.
        </p>
      )}
    </div>
  );
}

export default async function AdminSettingsPage({ searchParams }: Props) {
  const { saved } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
      <p className="mt-1 text-slate-500">
        Update company contact details, location, and site content. Changes appear on the public
        website immediately.
      </p>

      {saved && (
        <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          Settings saved successfully.
        </div>
      )}

      <form action={updateSettings} className="mt-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Business & Contact</CardTitle>
            <CardDescription>
              Company name, phone, email, and address shown in the header, footer, and contact
              page.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {CONTACT_SETTING_KEYS.map((key) => (
              <div
                key={key}
                className={key === "address" ? "sm:col-span-2" : undefined}
              >
                <SettingField settingKey={key} settings={settings} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Factory Location (Geolocation)</CardTitle>
            <CardDescription>
              Set coordinates for the map on the contact page. Find them in Google Maps by
              right-clicking your location → coordinates.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {LOCATION_SETTING_KEYS.map((key) => (
              <div
                key={key}
                className={key === "map_embed_url" ? "sm:col-span-2" : undefined}
              >
                <SettingField settingKey={key} settings={settings} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Content</CardTitle>
            <CardDescription>Hero text, about page content, and quality descriptions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {CONTENT_SETTING_KEYS.map((key) => (
              <SettingField
                key={key}
                settingKey={key}
                settings={settings}
                type="textarea"
              />
            ))}
          </CardContent>
        </Card>

        <Button type="submit" size="lg">
          Save All Settings
        </Button>
      </form>
    </div>
  );
}
