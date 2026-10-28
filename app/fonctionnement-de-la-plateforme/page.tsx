import { InstitutionalPage } from "../../components/InstitutionalPages";
import { institutionalMetadata } from "../../lib/institutional-pages";
export const metadata = institutionalMetadata("fonctionnement");
export default function Page() { return <InstitutionalPage id="fonctionnement" />; }
