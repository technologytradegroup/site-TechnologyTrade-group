import type { Metadata } from "next";
import GroupPresentation from "../../components/GroupPresentation";
import "./presentation.css";

export const metadata: Metadata = {
  title: "Présentation du groupe — TechnologyTrade Group",
  description: "Un groupe dédié à la construction du marché numérique africain et à son ouverture sur le marché international.",
};

export default function GroupPresentationPage() {
  return <GroupPresentation />;
}
