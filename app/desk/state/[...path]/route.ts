import { STATE } from "@/lib/desk";
import { proxy } from "@/lib/desk-proxy";

// State-Intel's built site, from state-intel @ dashboard. That branch holds only
// the Action's build output (state.html, opportunities.json, status.json, the
// tailored docs under docs/), so any page or data file in it is served.
export const dynamic = "force-dynamic";
export const GET = proxy(STATE, () => true);
