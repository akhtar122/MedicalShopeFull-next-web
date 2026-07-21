import { InvoiceDetails } from "@/types/invoice";

interface Props {
    invoice: InvoiceDetails;
}

export default function InvoiceHeaderCard({
    invoice,
}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6">

            <div className="grid gap-6 md:grid-cols-2">

                <div>

                    <h2 className="text-2xl font-bold">

                        {invoice.invoiceNumber}

                    </h2>

                    <p className="mt-2 text-gray-500">

                        Customer

                    </p>

                    <p className="font-semibold">

                        {invoice.customerName}

                    </p>

                </div>

                <div className="space-y-2 text-right">

                    <p>

                        <span className="font-medium">

                            Date :

                        </span>

                        {" "}

                        {new Date(
                            invoice.invoiceDate
                        ).toLocaleDateString()}

                    </p>

                    <p>

                        <span className="font-medium">

                            Status :

                        </span>

                        {" "}

                        <span className="rounded bg-yellow-100 px-3 py-1 text-yellow-700">

                            {invoice.paymentStatus}

                        </span>

                    </p>

                </div>

            </div>

        </div>

    );

}