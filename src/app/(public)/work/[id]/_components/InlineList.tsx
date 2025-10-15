
export function InlineList({ items }: { items: ReadonlyArray<{ key: string; value: string }> }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
      {items.map((kv) => (
        <div key={kv.key} className="flex items-center gap-2">
          <span className="font-semibold tracking-wide text-gray-900">{kv.key}:</span>
          <span className="text-gray-600">{kv.value}</span>
        </div>
      ))}
    </div>
  );
}
