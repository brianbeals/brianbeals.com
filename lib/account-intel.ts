// Shared config + GitHub API helper for the account-intel tool.
// The research runs in GitHub Actions (repo below); the site only dispatches and
// collects the result. Token is read from env, never shipped to the browser.

export const GH = {
  owner: process.env.GH_OWNER || "brianbeals",
  repo: process.env.GH_REPO || "account-intel",
  workflow: process.env.GH_WORKFLOW || "account-intel.yml",
  ref: process.env.GH_REF || "main",
  artifactName: "account-intel-report",
};

export function ghHeaders(): HeadersInit {
  const token = process.env.GH_TOKEN || "";
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export function ghConfigured(): boolean {
  return Boolean(process.env.GH_TOKEN);
}

export const GH_API = "https://api.github.com";
