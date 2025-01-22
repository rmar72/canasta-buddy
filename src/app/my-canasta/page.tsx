"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MyCanasta() {

  const [name, setName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCanasta = async () => {
    if (!name.trim()) {
      setError("Canasta name cannot be empty.");
      return;
    }

    if(!budgetAmount) {
      setError("Enter a budget amount.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/canastas/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, budget: budgetAmount }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create Canasta.");
        return;
      }

      setName("");
      alert("Canasta created successfully!");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col gap-4 row-start-2 sm:items-center max-w-5xl w-full sm:px-0">
        <div className="w-full max-w-2xl mx-auto mt-1 p-4 space-y-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <Input
              placeholder="New Canasta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow"
            />
            <Input
              placeholder="Budget Amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(Number(e.target.value))}
              className="w-24"
              type="number"
            />
            <Button
              variant="default"
              onClick={handleCreateCanasta}
              disabled={loading}
            >
              + New
            </Button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </main>
    </div>
  );
}
