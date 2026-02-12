import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import { Squircle } from "./squircle";

export interface ProverbsCardProps {
  state: unknown;
  setState: (state: unknown) => void;
}

export function ProverbsCard({ state, setState: _setState }: ProverbsCardProps) {
  void _setState;
  return (
    <Squircle
      squircle="30"
      className="w-full max-w-2xl bg-white/75 p-8 shadow-[0_16px_36px_-20px_rgba(119,70,37,0.5)]"
      borderWidth={2}
      borderColor="rgba(100, 175, 181, 0.4)"
    >
      <h1
        className="mb-2 text-center text-4xl font-bold text-[var(--chocolate-brown)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Proverbs
      </h1>
      <p className="mb-6 text-center italic text-[var(--gray)]">
        This is a demonstrative page, but it could be anything you want!
      </p>
      <hr className="my-6 border-[var(--sky-blue)]/30" />
      <Squircle squircle="20" className="h-[500px] overflow-y-scroll bg-white p-4">
        <JsonView src={state} className="w-full" collapseObjectsAfterLength={1} />
      </Squircle>
    </Squircle>
  );
}
