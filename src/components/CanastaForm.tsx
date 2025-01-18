"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CanastaFormProps = {
  initialData?: {
    name: string;
    budget: number;
    description?: string;
  };
  onSubmit: (data: { name: string; budget: number; description?: string }) => void;
};

export default function CanastaForm({ initialData, onSubmit }: CanastaFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [budget, setBudget] = useState(initialData?.budget?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = () => {
    const parsedBudget = parseFloat(budget);

    if (!name || isNaN(parsedBudget) || parsedBudget <= 0) {
      alert("Please provide a valid name and budget.");
      return;
    }

    onSubmit({ name, budget: parsedBudget, description });
    setName("");
    setBudget("");
    setDescription("");
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Basket" : "Add Basket"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Basket Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Budget Amount"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleSubmit}>
            {initialData ? "Update Basket" : "Create Basket"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
