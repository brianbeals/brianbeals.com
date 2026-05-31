import type { ReactNode } from "react";

/**
 * EssayByline — the navy BB mark plus the author byline that closes every essay.
 * Shared so the brand mark lives in one place; existing and future essays inherit it.
 * Pass `children` to override the default byline text for an essay that needs a
 * different attribution.
 */
export default function EssayByline({ children }: { children?: ReactNode }) {
  return (
    <div className="mt-12 pt-6 border-t border-neutral-200 flex items-center gap-3">
      <svg
        viewBox="0 0 32 32"
        width="22"
        height="22"
        className="flex-none"
        aria-label="Brian Beals"
        role="img"
      >
        <rect width="32" height="32" rx="6" fill="#1E3A5F" />
        <text
          x="16"
          y="15"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontFamily="-apple-system, system-ui, sans-serif"
          fontSize="16"
          fontWeight="800"
          letterSpacing="-0.04em"
        >
          BB
        </text>
      </svg>
      <p className="text-sm text-neutral-600 italic">
        {children ?? (
          <>
            Brian Beals leads the AI, Analytics &amp; Automation practice at LRS
            IT Solutions. Reach him at brian@brianbeals.com.
          </>
        )}
      </p>
    </div>
  );
}
