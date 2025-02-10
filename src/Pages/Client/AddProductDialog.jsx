import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

export default function AddProductDialog({ open, onOpenChange, onAddProduct }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onAddProduct(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-1">
          <div className="grid gap-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              placeholder="Enter Product Name"
              {...register("productName", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              placeholder="Enter Size (e.g. 24x24)"
              {...register("size", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hsnNo">HSN No</Label>
            <Input
              id="hsnNo"
              placeholder="Enter Hsn No"
              {...register("hsnNo", { required: false })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gst">GST ( In % )</Label>
            <Input
              id="gst"
              type="number"
              placeholder="Enter GST"
              {...register("gst", { required: true, min: 1 })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="qty">Quantity (As Per Box)</Label>
            <Input
              id="qty"
              type="number"
              placeholder="Enter quantity"
              {...register("qty", { required: true, min: 1 })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter Price"
              {...register("price", { required: true, min: 1 })}
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onAddProduct: PropTypes.func.isRequired,
};
