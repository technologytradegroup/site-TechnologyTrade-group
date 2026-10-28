import { OpportunityAndContentPage } from "../../components/OpportunityAndContentPages";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ressources et publications — TechnologyTrade Group",
  description: "Actualités, études, études de cas, guides pratiques et événements.",
};
export default function Page() { return <OpportunityAndContentPage page="catalogue" />; }


