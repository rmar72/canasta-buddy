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
  const [items, setItems] = useState<FoodItem[]>(canastaItems || []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate total price of items
  const totalItemCost = items.reduce((sum, item) => sum + item.price, 0);

  // Ensure the budget cannot be below item total cost, with a minimum of $0.01
  const [budget, setBudget] = useState(Math.max(budgetAmount, totalItemCost || 0.01));
  const [rawBudgetInput, setRawBudgetInput] = useState(String(budget)); // Handles smooth typing

  const validateBudget = (value: number) => {
    if (value < totalItemCost) {
      setError(`Budget cannot be lower than the total item cost: $${totalItemCost.toFixed(2)}`);
      return totalItemCost;
    }
    if (items.length === 0 && value < 0.01) {
      setError("Budget must be at least $0.01.");
      return 0.01;
    }
    setError("");
    return value;
  };

  const handleBudgetChange = (input: string) => {
    setRawBudgetInput(input);
  };

  const handleBudgetBlur = () => {
    const numericValue = Number(rawBudgetInput);
    if (!isNaN(numericValue)) {
      const validBudget = validateBudget(numericValue);
      setBudget(validBudget);
      setRawBudgetInput(validBudget.toFixed(2)); // Format the budget properly
    }
  };

  // Handle food item changes
  const handleItemChange = (index: number, field: keyof FoodItem, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  
    // Calculate new total item cost
    const newTotal = updatedItems.reduce((sum, item) => sum + item.price, 0) || 0.01;
  
    // Update budget if necessary
    setBudget((prevBudget) => {
      const updatedBudget = Math.max(prevBudget, newTotal);
      setRawBudgetInput(updatedBudget.toFixed(2)); // Ensure input stays in sync
      return updatedBudget;
    });
  };
  

  // Delete an item from the list
  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    // Recalculate minimum budget
    const newTotal = updatedItems.reduce((sum, item) => sum + item.price, 0) || 0.01;
    setBudget(Math.max(newTotal, 0.01));
    setRawBudgetInput(Math.max(newTotal, 0.01).toFixed(2));
  };

  // Handle Save
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
      console.error(err);
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
            value={rawBudgetInput}
            onChange={(e) => handleBudgetChange(e.target.value)}
            onBlur={handleBudgetBlur}
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
              <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(index)}>
                Delete
              </Button>
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
