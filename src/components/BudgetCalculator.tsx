"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/shadcn-ui-components/input";
import { Button } from "@/components/shadcn-ui-components/button";
import { Card, CardContent } from "@/components/shadcn-ui-components/card";
import { addItemToCanastaApi } from "@/lib/api/canastas";
import { FoodItem, BudgetCalculatorProps } from "@/types/canasta";
import { v4 as uuidv4 } from "uuid";

export default function BudgetCalculator({ initialBudget, canastaId, items: initialItems }: BudgetCalculatorProps) {
  const [items, setItems] = useState<FoodItem[]>(initialItems);
  const [remainingBudget, setRemainingBudget] = useState(initialBudget);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [error, setError] = useState("");

  // Calculate remaining budget when items change
  useEffect(() => {
    const totalSpent = items.reduce((sum, item) => sum + item.price, 0);
    setRemainingBudget(initialBudget - totalSpent);
  }, [items, initialBudget]);
  
  const addItem = async () => {
    const price = parseFloat(itemPrice);

    if (!itemName || isNaN(price) || price <= 0) {
      setError("Please provide a valid item name and price.");
      return;
    }

    if (remainingBudget - price < 0) {
      setError("Adding this item exceeds your budget!");
      return;
    }

    const newItem = {
      name: itemName,
      price: price,
      id: uuidv4(),
    };

    try {
      await addItemToCanastaApi(canastaId, newItem);
      setItems([...items, newItem]);
      setRemainingBudget(remainingBudget - price);
      setItemName("");
      setItemPrice("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Card className="p-4">
      <CardContent>
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg mb-0 sm:mb-3">
        <p className="mb-4 sm:mb-0 bg-gray-100 p-2 rounded">
          Total Budget: <span className="font-semibold"><span className="text-green-500">$</span>{initialBudget.toFixed(2)}</span>
        </p>
        <p className="mb-4 sm:mb-0 bg-gray-100 p-2 rounded">
          Remaining Budget: <span className="font-semibold"><span className="text-green-500">$</span>{remainingBudget.toFixed(2)}</span>
        </p>
      </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="relative w-full sm:w-80">
            <Input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-40">
            <Input
              type="number"
              placeholder="$ Item Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto" onClick={addItem}>Add Item</Button>
        </div>

        {error && (
          <p
            className="text-center animate-fadeIn"
            style={{ animation: "fadeIn 0.8s ease-in-out", color: 'red' }}
          >
            {error}
          </p>
        )}

        <ul>
          {items.map((item) => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
