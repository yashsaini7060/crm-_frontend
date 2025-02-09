import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

export default function AddChargesDialog({ open, onOpenChange, onAddProduct }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {},
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
          <DialogDescription>
            Add freight and cutting charges for the product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-1">
          <div className="grid gap-2">
            <Label htmlFor="freight">Freight Charges</Label>
            <Input
              id="freight"
              type="number"
              placeholder="Enter Freight Charge"
              {...register("freight", { required: true, min: 0 })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cutting">Cutting Charges</Label>
            <Input
              id="cutting"
              type="number"
              placeholder="Enter Cutting Charges"
              {...register("cutting", { required: true, min: 0 })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select
              onValueChange={(value) => {
                setValue("paymentStatus", value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Advance">Advance</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="On Site">On Site</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Charges</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddChargesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onAddProduct: PropTypes.func.isRequired,
};
