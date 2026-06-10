import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ number }: { number: string }) {
  const cleanNumber = number.replace(/[^\d]/g, "");
  const href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello, I would like to inquire about your textile machinery services."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
