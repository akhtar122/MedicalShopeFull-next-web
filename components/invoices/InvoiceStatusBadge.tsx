interface Props {
  text: string;
}

export default function InvoiceStatusBadge({
  text,
}: Props) {
  return (
    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
      {text}
    </span>
  );
}