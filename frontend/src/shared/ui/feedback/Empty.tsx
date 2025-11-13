export function Empty({ text = "No hay datos" }: { text?: string }) {
  return <p style={{ opacity: 0.7, padding: "8px 0" }}>{text}</p>;
}
