import { InvoiceDetails } from "@/types/invoice";

export default function InvoiceTotalsCard({

    invoice,

}:{

    invoice:InvoiceDetails;

}){

return(

<div className="ml-auto max-w-sm rounded-xl border bg-white p-6">

<div className="space-y-4">

<div className="flex justify-between">

<span>Subtotal</span>

<span>

₹ {invoice.subtotal.toFixed(2)}

</span>

</div>

<div className="flex justify-between">

<span>GST</span>

<span>

₹ {invoice.gstTotal.toFixed(2)}

</span>

</div>

<div className="flex justify-between">

<span>Discount</span>

<span>

₹ {invoice.discount.toFixed(2)}

</span>

</div>

<hr/>

<div className="flex justify-between text-xl font-bold">

<span>Total</span>

<span>

₹ {invoice.grandTotal.toFixed(2)}

</span>

</div>

</div>

</div>

);

}