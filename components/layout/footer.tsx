import Link from "next/link";
import { Factory, Mail, MapPin, Phone } from "lucide-react";

type FooterProps = {
  companyName: string;
  phone: string;
  email: string;
  address: string;
};

export function Footer({ companyName, phone, email, address }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <Factory className="h-6 w-6 text-amber-500" />
            {companyName}
          </div>
          <p className="text-sm leading-relaxed">
            Manufacturing and repairing textile machinery for mills, garment
            manufacturers, and industrial producers across India.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/about", label: "About Us" },
              { href: "/products", label: "Products" },
              { href: "/projects", label: "Projects" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-amber-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Industries</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Textile Mills",
              "Garment Manufacturers",
              "Yarn Manufacturers",
              "Fabric Processing",
              "Industrial Textile",
            ].map((item) => (
              <li key={item}>
                <Link href="/industries" className="hover:text-amber-400">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-amber-400">
                {phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <a href={`mailto:${email}`} className="hover:text-amber-400">
                {email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>{address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
      </div>
    </footer>
  );
}
