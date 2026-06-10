import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { LocationMap } from "@/components/contact/location-map";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactSettings, getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const contact = getContactSettings(settings);
  return {
    title: "Contact Us",
    description: `Contact ${contact.companyName} for quotes, support, and machinery inquiries.`,
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contact = getContactSettings(settings);

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Contact {contact.companyName}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Request a quote or reach out for machinery support. We respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Phone className="h-5 w-5 text-amber-500" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-slate-700 hover:text-amber-600"
                  >
                    {contact.phone}
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Mail className="h-5 w-5 text-amber-500" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-slate-700 hover:text-amber-600"
                  >
                    {contact.email}
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MapPin className="h-5 w-5 text-amber-500" />
                    Factory Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{contact.address}</p>
                  {(contact.mapLatitude || contact.mapLongitude) && (
                    <p className="mt-2 text-xs text-slate-500">
                      Coordinates: {contact.mapLatitude}, {contact.mapLongitude}
                    </p>
                  )}
                </CardContent>
              </Card>

              <LocationMap contact={contact} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send an Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <InquiryForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
