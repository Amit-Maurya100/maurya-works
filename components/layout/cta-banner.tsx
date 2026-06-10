import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Ready to Upgrade Your Production Line?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Get expert advice on machinery, repairs, and maintenance. Our team responds
          within 24 hours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild variant="accent" size="lg">
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-slate-600 bg-transparent text-white hover:bg-slate-800">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
