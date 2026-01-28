export function UnorderedList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc list-inside text-gray-500 text-sm mt-2">
      {children}
    </ul>
  );
}
