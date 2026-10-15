import { FED } from "@/lib/desk";
import { proxy } from "@/lib/desk-proxy";

// Fed-Intel's four modules and the data they publish, from fed-intel @ main.
// Allowlisted by name: the repo root also holds caches and scripts that are not
// part of the dashboard.
const FILES =
  /^(index|opps|rates|teaming)\.html$|^(partners|status|a11y-market)\.json$|^bb-dash\.(css|js)$/;

export const dynamic = "force-dynamic";
export const GET = proxy(FED, (p) => FILES.test(p));
