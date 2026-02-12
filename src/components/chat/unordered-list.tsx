export function UnorderedList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-2 list-disc list-inside text-sm text-[var(--gray)]">
      {children}
    </ul>
  );
}
