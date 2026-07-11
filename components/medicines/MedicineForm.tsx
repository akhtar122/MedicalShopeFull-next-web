"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import {
  getMedicineById,
  updateMedicine,
  
} from "@/services/medicine.service";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCategories } from "@/hooks/useCategories";
import { createMedicine } from "@/services/medicine.service";
import { UpdateMedicineRequest } from "@/types/medicine";
interface MedicineFormProps {
  medicineId?: string;
}
const schema = z.object({
  categoryId: z.string().min(1, "Category is required"),

  name: z.string().min(2),

  genericName: z.string().min(2),

  manufacturer: z.string().min(2),

  barcode: z.string().min(3),

  hsnCode: z.string().min(3),

  gstRate: z.coerce.number().min(0).max(100),

  purchasePrice: z.coerce.number().positive(),

  sellingPrice: z.coerce.number().positive(),

  reorderLevel: z.coerce.number().min(0),
});

type FormValues = z.input<typeof schema>;
type FormData = z.output<typeof schema>;

export default function MedicineForm({
  medicineId,
}: MedicineFormProps) {

  const router = useRouter();

  const { categories, loading } = useCategories();

  const [saving, setSaving] = useState(false);
  const [medicineLoading, setMedicineLoading] = useState(!!medicineId);
  const [success, setSuccess] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues, any, FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoryId: "",
      name: "",
      genericName: "",
      manufacturer: "",
      barcode: "",
      hsnCode: "",
      gstRate: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      reorderLevel: 0,
    },
  });

  useEffect(() => {
    if (!medicineId) {
      setMedicineLoading(false);
      return;
    }

    async function loadMedicine() {
      const medicine = await getMedicineById(medicineId!);

      reset({
        categoryId: medicine.categoryId,
        name: medicine.name,
        genericName: medicine.genericName,
        manufacturer: medicine.manufacturer,
        barcode: medicine.barcode,
        hsnCode: medicine.hsnCode,
        gstRate: medicine.gstRate,
        purchasePrice: medicine.purchasePrice,
        sellingPrice: medicine.sellingPrice,
        reorderLevel: medicine.reorderLevel,
      });

      setMedicineLoading(false);
    }

    loadMedicine();
  }, [medicineId, reset]);

  useEffect(() => {
  if (!medicineId) return;

  async function load() {
    const medicine = await getMedicineById(
      medicineId!
    );

    reset({
      categoryId: medicine.categoryId,
      name: medicine.name,
      genericName: medicine.genericName,
      manufacturer: medicine.manufacturer,
      barcode: medicine.barcode,
      hsnCode: medicine.hsnCode,
      gstRate: medicine.gstRate,
      purchasePrice: medicine.purchasePrice,
      sellingPrice: medicine.sellingPrice,
      reorderLevel: medicine.reorderLevel,
    });
  }

  load();
}, [medicineId, reset]);

const onSubmit = async (
  values: UpdateMedicineRequest
) => {
  try {
    if (medicineId) {
      await updateMedicine(
        medicineId,
        values
      );
    } else {
      await createMedicine(values);
    }

    toast.success(
      medicineId
        ? "Medicine Updated"
        : "Medicine Created"
    );

    router.push("/dashboard/medicines");
  } catch {
    toast.error("Operation Failed");
  }
};

  if (loading || medicineLoading) {
    return (
      <Box className="flex justify-center py-20">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Card>

        <CardContent>

          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 700 }}
          >
            {medicineId ? "Edit Medicine" : "Add Medicine"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >

            <Grid container spacing={3}>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="categoryId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      {...field}
                      error={!!errors.categoryId}
                      helperText={errors.categoryId?.message}
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Medicine Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Generic Name"
                  {...register("genericName")}
                  error={!!errors.genericName}
                  helperText={errors.genericName?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Manufacturer"
                  {...register("manufacturer")}
                  error={!!errors.manufacturer}
                  helperText={errors.manufacturer?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Barcode"
                  {...register("barcode")}
                  error={!!errors.barcode}
                  helperText={errors.barcode?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="HSN Code"
                  {...register("hsnCode")}
                  error={!!errors.hsnCode}
                  helperText={errors.hsnCode?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="GST %"
                  type="number"
                  {...register("gstRate")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Purchase Price"
                  type="number"
                  {...register("purchasePrice")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Selling Price"
                  type="number"
                  {...register("sellingPrice")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Reorder Level"
                  type="number"
                  {...register("reorderLevel")}
                />
              </Grid>

            </Grid>

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() =>
                  router.push("/dashboard/medicines")
                }
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <CircularProgress
                    size={22}
                    color="inherit"
                  />
                ) : (
                  "Save Medicine"
                )}
              </Button>
            </Box>

          </Box>

        </CardContent>

      </Card>

      <Snackbar
        open={success}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          {medicineId
            ? "Medicine updated successfully."
            : "Medicine created successfully."}
        </Alert>
      </Snackbar>
    </>
  );
}