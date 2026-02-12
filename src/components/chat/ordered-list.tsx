export function OrderedList({ children }: { children: React.ReactNode }) {
  return (
    <ol className="mt-2 list-decimal list-inside text-sm text-[var(--gray)]">
      {children}
    </ol>
  );
}
