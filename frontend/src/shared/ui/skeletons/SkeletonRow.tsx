export function SkeletonRow({ columns = 3 }: { columns?: number }) {
  return (
    <tr className="skeleton-row">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i}>
          <div className="skeleton-box" />
        </td>
      ))}
    </tr>
  );
}
