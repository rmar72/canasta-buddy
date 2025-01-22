"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FoodItem = {
  id: number;
  name: string;
  price: number;
};

type BudgetCalculatorProps = {
  initialBudget: number;
};

export default function BudgetCalculator({ initialBudget }: BudgetCalculatorProps) {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [remainingBudget, setRemainingBudget] = useState(initialBudget);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const addItem = () => {
    const price = parseFloat(itemPrice);

    if (!itemName || isNaN(price) || price <= 0) {
      alert("Please provide a valid item name and price.");
      return;
    }

    if (remainingBudget - price < 0) {
      alert("Adding this item exceeds your budget!");
      return;
    }

    const newItem = {
      id: items.length + 1,
      name: itemName,
      price: price,
    };

    setItems([...items, newItem]);
    setRemainingBudget(remainingBudget - price);
    setItemName("");
    setItemPrice("");
  };

  return (
    <Card className="p-4">
      <CardContent>
        <p className="mb-4">
          Total Budget: <span className="font-semibold">${initialBudget.toFixed(2)}</span>
        </p>
        <p className="mb-4">
          Remaining Budget: <span className="font-semibold">${remainingBudget.toFixed(2)}</span>
        </p>
        <div className="flex items-center gap-4 mb-4">
          <Input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Item Price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <Button onClick={addItem}>Add Item</Button>
        </div>
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
