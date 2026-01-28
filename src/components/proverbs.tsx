import JsonView from "react18-json-view";
import 'react18-json-view/src/style.css'

export interface ProverbsCardProps {
  state: any;
  setState: (state: any) => void;
}

export function ProverbsCard({ state, setState }: ProverbsCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl w-full">
      <h1 className="text-4xl font-bold text-white mb-2 text-center">Proverbs</h1>
      <p className="text-gray-200 text-center italic mb-6">This is a demonstrative page, but it could be anything you want! 🪁</p>
      <hr className="border-white/20 my-6" />
      <JsonView src={state} className="w-full bg-white p-4 rounded-2xl h-[500px] overflow-y-scroll" collapseObjectsAfterLength={1}/>
    </div>
  );
}