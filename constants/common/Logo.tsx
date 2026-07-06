export default function Logo() {
  return (
    <div className="flex items-center gap-3 px-6 py-5">
      <div className="rounded-xl bg-blue-600 p-2 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 12a5 5 0 0 1 10 0v6a5 5 0 0 1-10 0z" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
        </svg>
      </div>

      <div>
        <h1 className="font-bold text-lg">
          Medical ERP
        </h1>

        <p className="text-xs text-muted-foreground">
          Pharmacy Management
        </p>
      </div>
    </div>
  );
}