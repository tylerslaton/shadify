import { useState } from "react";
import { Squircle } from "./squircle";

export interface MoonCardProps {
  themeColor: string;
  status: "inProgress" | "executing" | "complete";
  respond?: (response: string) => void;
}

export function MoonCard({ themeColor, status, respond }: MoonCardProps) {
  const [decision, setDecision] = useState<"launched" | "aborted" | null>(null);

  const handleLaunch = () => {
    setDecision("launched");
    respond?.("You have permission to go to the moon.");
  };

  const handleAbort = () => {
    setDecision("aborted");
    respond?.(
      "You do not have permission to go to the moon. The user you're talking to rejected the request.",
    );
  };

  return (
    <Squircle
      squircle="30"
      style={{ backgroundColor: themeColor }}
      borderWidth={2}
      borderColor="rgba(255, 255, 255, 0.5)"
      className="mt-6 w-full max-w-md shadow-[0_16px_36px_-20px_rgba(94,92,90,0.42)]"
    >
      <div className="w-full bg-white/35 p-8 text-[var(--gray-dark)] backdrop-blur-sm">
        {decision === "launched" ? (
          <div className="text-center">
            <div className="mb-4 text-7xl">🌕</div>
            <h2 className="mb-2 text-2xl font-bold text-[var(--gray-dark)]">
              Mission Launched
            </h2>
            <p className="text-[var(--gray)]">We made it to the moon!</p>
          </div>
        ) : decision === "aborted" ? (
          <div className="text-center">
            <div className="mb-4 text-7xl">✋</div>
            <h2 className="mb-2 text-2xl font-bold text-[var(--gray-dark)]">
              Mission Aborted
            </h2>
            <p className="text-[var(--gray)]">Staying on Earth 🌍</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="mb-4 text-7xl">🚀</div>
              <h2 className="mb-2 text-2xl font-bold text-[var(--gray-dark)]">
                Ready for Launch?
              </h2>
              <p className="text-[var(--gray)]">Mission to the Moon 🌕</p>
            </div>

            {status === "executing" && (
              <div className="flex gap-3">
                <Squircle squircle="18" className="flex-1 bg-white/85">
                  <button
                    onClick={handleLaunch}
                    className="w-full px-6 py-4 font-bold text-[var(--gray-dark)] transition hover:bg-[var(--sunshine-yellow-light)]"
                  >
                    🚀 Launch!
                  </button>
                </Squircle>
                <Squircle
                  squircle="18"
                  className="flex-1 bg-[var(--indian-red-light)]/30"
                  borderWidth={1}
                  borderColor="rgba(146, 78, 78, 0.45)"
                >
                  <button
                    onClick={handleAbort}
                    className="w-full px-6 py-4 font-bold text-[var(--indian-red-dark)] transition hover:bg-[var(--indian-red-light)]/40"
                  >
                    ✋ Abort
                  </button>
                </Squircle>
              </div>
            )}
          </>
        )}
      </div>
    </Squircle>
  );
}
