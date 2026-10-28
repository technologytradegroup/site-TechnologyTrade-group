import type { Metadata } from "next";
import "./globals.css";
import "./institutional.css";
import "./marketplace.css";

export const metadata: Metadata = {
  title: "TechnologyTrade Group — Le marché numérique africain",
  description: "Entreprises, institutions et fournisseurs de solutions technologiques se retrouvent sur une seule plateforme.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}

