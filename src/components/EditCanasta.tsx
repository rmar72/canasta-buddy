"use client";

import { useState } from "react";
import { Input } from "@/components/shadcn-ui-components/input";
import { Button } from "@/components/shadcn-ui-components/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui-components/card";
import { updateCanasta } from "@/lib/api/canastas";
import { Canasta, FoodItem } from "@/types/canasta";

interface EditCanastaProps {
  canastaId: string;
  canastaName: string;
  budgetAmount: number;
  canastaItems: FoodItem[];
  onSaveComplete?: (updatedCanasta: Canasta) => void;
  onCancel?: () => void;
}

export default function EditCanasta({
  canastaId,
  canastaName,
  budgetAmount,
  canastaItems,
  onSaveComplete,
  onCancel,
}: EditCanastaProps) {
  const [name, setName] = useState(canastaName);
  const [budget, setBudget] = useState(budgetAmount);
  const [items, setItems] = useState<FoodItem[]>(canastaItems || []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleItemChange = (index: number, field: keyof FoodItem, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const handleSave = async () => {
    if (!name.trim() || budget <= 0) {
      setError("Canasta name and budget must be valid.");
      return;
    }

    setLoading(true);
    try {
      const { canasta: updatedCanasta } = await updateCanasta(canastaId, { name, budget, items });
      onSaveComplete?.(updatedCanasta); // Notify parent of the save
    } catch (err) {
      console.error(err)
      setError("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Canasta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="canastaName" className="block text-sm font-medium text-gray-700 mb-1">
            Canasta Name
          </label>
          <Input
            id="canastaName"
            placeholder="Enter Canasta Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="canastaBudget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget Amount
          </label>
          <Input
            id="canastaBudget"
            placeholder="Enter Budget Amount"
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 mb-2">
              <Input
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Item Price"
                type="number"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", Number(e.target.value))}
                className="w-32"
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          Save
        </Button>
      </CardFooter>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </Card>
  );
}
