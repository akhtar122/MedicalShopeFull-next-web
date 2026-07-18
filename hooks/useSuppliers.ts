"use client";

import { useEffect, useState } from "react";
import { getSuppliers } from "@/services/supplier.service";

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers().then(setSuppliers);
  }, []);

  return suppliers;
}