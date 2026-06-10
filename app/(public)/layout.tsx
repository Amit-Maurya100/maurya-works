import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { getContactSettings, getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const contact = getContactSettings(settings);

  return {
    title: {
      default: contact.companyName,
      template: `%s | ${contact.companyName}`,
    },
    description:
      "Textile machinery manufacturing and repair services for mills, garment manufacturers, and industrial producers.",
  };
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const contact = getContactSettings(settings);

  return (
    <>
      <Header companyName={contact.companyName} />
      <main className="flex-1">{children}</main>
      <Footer
        companyName={contact.companyName}
        phone={contact.phone}
        email={contact.email}
        address={contact.address}
      />
      {contact.whatsapp && <WhatsAppButton number={contact.whatsapp} />}
    </>
  );
}
