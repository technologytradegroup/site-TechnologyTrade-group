import { OpportunityAndContentPage } from "../../components/OpportunityAndContentPages";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Opportunités numériques — TechnologyTrade Group",
  description: "Appels d’offres, appels à projets, programmes startups et partenariats.",
};
export default function Page() { return <OpportunityAndContentPage page="opportunities" />; }


