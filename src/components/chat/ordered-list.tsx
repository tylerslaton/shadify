export function OrderedList({ children }: { children: React.ReactNode }) {
  return (
    <ol className="list-decimal list-inside text-gray-500 text-sm mt-2">
      {children}
    </ol>
  );
}
