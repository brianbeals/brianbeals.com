// The projects built in public. /projects carries the full description under
// "Building in Public" (moved off /about 2026-10-31, the buyer-first pass: a
// government buyer reads About, and the side projects sit one click further on).
// One list, so the order and links cannot drift.

export type ProjectLink = { label: string; href: string };

export const projects: {
  name: string;
  summary: string;
  description: string;
  links: ProjectLink[];
}[] = [
  {
    name: "Marine Forecast",
    summary:
      "A live marine forecast for Charlotte Harbor and Pine Island Sound that turns the NWS coastal waters product, tides, red tide, and live radar into a plain go or no-go.",
    description:
      "A live marine forecast for Brian's home water, Charlotte Harbor and Pine Island Sound. It parses the NWS coastal waters product into wind, chop, and storm-risk cards, adds Port Boca Grande tides and a red-tide line from the state's sampling, and ends on a verdict: a plain call on whether to go, and the best window to be out. The browser samples NEXRAD over the harbor and the pass every few minutes, which catches a cell on the water that the inland airport observation misses. GitHub Actions republishes after each NWS issuance. Runs entirely on public NOAA endpoints and GitHub Pages, so hosting is free, making it the only part of this project that respected a budget.",
    links: [
      { label: "Live", href: "https://weather.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/marine-forecast" },
    ],
  },
  {
    name: "Harbor Spots",
    summary:
      "Reefs, ramps, seagrass, and manatee zones in Charlotte Harbor from live state GIS, with distance and bearing from wherever you launch.",
    description:
      "A map of the artificial reefs, boat ramps, seagrass beds, and manatee zones in Charlotte Harbor and Pine Island Sound, assembled from live state GIS services. Pick where you're leaving from and it recomputes every reef's distance and magnetic bearing, redraws the 20 nm range ring, and refits the view. A strip in the corner reads today's conditions from the forecast above. Rebuilt weekly from FWC and DEP feature services. The one hand-entered piece is the marina list, because no GIS layer knows which docks people actually leave from.",
    links: [
      { label: "Live", href: "https://harbor.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/harbor-spots" },
    ],
  },
  {
    name: "Sector Rotation Screener",
    summary:
      "A Python pipeline that scores the eleven sector ETFs on seasonality, cycle fit and relative strength every Sunday and reports whether it is beating SPY, whichever way that points.",
    description:
      "A Python pipeline that scores the 11 SPDR sector ETFs against three signals: seasonality, economic-cycle fit, and relative strength. Backtests 15 years against SPY. Runs every Sunday via GitHub Actions, asks Claude for a plain-language read on the output, and commits the dashboard back to the repo. The banner up top reports whether the strategy is beating SPY net of trading costs, and it leads with that number whichever way it points. Fifteen years in, the two are close enough that the answer moves between runs, which is why the live page reports it and this one does not.",
    links: [
      { label: "Live", href: "https://sector.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/sector-rotation-screener" },
    ],
  },
  {
    name: "Lobo",
    summary:
      "An always-on agent on the Mac mini that watches the deploys above, retries what fails, and texts only when something stays broken.",
    description:
      "An always-on agent that lives on the Mac mini and texts like a member of the household. Every 30 minutes it checks the GitHub deploys for everything above, retries the transient failures, and texts him only when something stays broken. On Mondays it reads a legislative watch report and texts the highlights. It answers texts on its own iMessage identity, a dedicated Apple ID, because a bot on your own phone number can't tell your texts from its own echoes. Runs locally on OpenClaw with Claude doing the thinking. Getting iMessage working surfaced an upstream bug he reported and got fixed.",
    links: [
      { label: "Upstream fix", href: "https://github.com/openclaw/openclaw/issues/99638" },
    ],
  },
  {
    name: "This Site",
    summary:
      "Next.js on Vercel.",
    description: "Next.js on Vercel.",
    links: [
      { label: "Code", href: "https://github.com/brianbeals/brianbeals.com" },
    ],
  },
];
