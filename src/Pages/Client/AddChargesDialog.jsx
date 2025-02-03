import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";

export default function AddChargesDialog({ open, onOpenChange, onAddProduct }) {
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
            <Label htmlFor="cutting">Payment Status</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="advance">Advance</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="on site">On Site</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* <Input
              id="cutting"
              type="number"

              {...register("payemnt status", { required: true, min: 0 })}
            /> */}
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
