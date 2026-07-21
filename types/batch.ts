export interface Batch {

    id:string;

    batchNo:string;

    expiryDate:string;

    purchasePrice:number;

    sellingPrice:number;

    quantityReceived:number;

    quantityAvailable:number;

}
export interface CreateBatchRequest {
  batchNo: string;
  expiryDate: string;
  purchasePrice: number;
  sellingPrice: number;
  quantityReceived: number;
  quantityAvailable: number;
}