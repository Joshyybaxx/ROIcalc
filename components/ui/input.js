export function Input({ type = "text", name, value, onChange }) {
  return <input type={type} name={name} value={value} onChange={onChange} className="border rounded px-2 py-1 w-full" />;
}
