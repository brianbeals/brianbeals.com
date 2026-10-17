"use client";

import { usePathname } from "next/navigation";
import DeskHeader from "./DeskHeader";
import SiteHeader from "./SiteHeader";

/* The root layout's header: the desk's on /desk, the public one everywhere else.
   Chosen from the path on the client side of the layout, so the public pages stay
   static. /desk/doc and the dashboards are served as built HTML and carry the bar
   from lib/desk-bar.ts instead. */
export default function HeaderSwitch() {
  const path = usePathname() || "/";
  return path === "/desk" || path.startsWith("/desk/") ? <DeskHeader /> : <SiteHeader />;
}
