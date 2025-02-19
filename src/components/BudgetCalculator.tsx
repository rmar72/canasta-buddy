"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/shadcn-ui-components/input";
import { Button } from "@/components/shadcn-ui-components/button";
import { Card, CardContent } from "@/components/shadcn-ui-components/card";
import { addItemToCanastaApi } from "@/lib/api/canastas";
import { FoodItem, BudgetCalculatorProps } from "@/types/canasta";
import { v4 as uuidv4 } from "uuid";
import SettingsMenu from "@/components/SettingsMenu";

export default function BudgetCalculator({ initialBudget, canastaId, items: initialItems, setShowEditCanasta, setGlobalItems }: BudgetCalculatorProps) {
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

      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setRemainingBudget(remainingBudget - price);
      setItemName("");
      setItemPrice("");
  
      setGlobalItems(canastaId, updatedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };
  

  return (
<Card className="p-4 mt-4 max-w-full w-full">
  <CardContent>
    {/* Budget Display Section */}
    <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto] gap-4 items-center py-4 pt-0 rounded-lg mb-3">
      {/* Total Budget */}
      <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-800 p-2 rounded-lg shadow-inner">
        <span className="font-medium">Total Budget:</span>
        <span className="font-semibold">
          <span className="text-green-500">$</span>
          {initialBudget.toFixed(2)}
        </span>
      </div>

      {/* Remaining Budget */}
      <div className="flex flex-col items-center justify-center bg-yellow-50 font-medium text-yellow-800 p-2 rounded-lg shadow-inner text-center">
        <span className="font-medium">Remaining Budget:</span>
        <span className="font-semibold">
          <span className="text-green-500">$</span>
          {remainingBudget.toFixed(2)}
        </span>
      </div>

      {/* Settings Menu */}
      <div className="col-span-2 sm:col-span-1 sm:mt-0 flex justify-center sm:justify-end w-full">
        <SettingsMenu onEdit={() => setShowEditCanasta(true)} />
      </div>
    </div>

    {/* Input Section */}
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-4 w-full">
      <div className="relative w-full sm:w-80">
        <Input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="relative w-full sm:w-40">
        <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 pointer-events-none">$</span>
        <Input
          type="number"
          placeholder="Item Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="pl-5"
        />
      </div>
      <Button className="w-full sm:w-auto" onClick={addItem}>Add Item</Button>
    </div>

    {/* Error Message */}
    {error && (
      <p className="text-center animate-pulse" style={{ color: 'red' }}>{error}</p>
    )}

    {/* Items List */}
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="flex justify-between border-b py-2 overflow-hidden text-ellipsis">
          <span className="truncate">{item.name}</span>
          <span>${item.price.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  </CardContent>
</Card>

  );
}
