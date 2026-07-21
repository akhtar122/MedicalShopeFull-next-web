"use client";

interface Props {
    onClick: () => void;
}

export default function AdjustStockButton({
    onClick,
}: Props) {

    return (

        <button
            onClick={onClick}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
        >
            Adjust Stock
        </button>

    );

}