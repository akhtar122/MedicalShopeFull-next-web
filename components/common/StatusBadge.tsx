interface Props {
  color: "green" | "orange" | "red";
  text: string;
}

export default function StatusBadge({
  color,
  text,
}: Props) {
  const styles = {
    green:
      "bg-green-100 text-green-700",

    orange:
      "bg-orange-100 text-orange-700",

    red:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[color]}`}
    >
      {text}
    </span>
  );
}