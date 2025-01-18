"use client";

import CanastaForm from "@/components/CanastaForm";

export default function ManageCanastaPage() {
  const handleSubmit = (data: { name: string; budget: number; description?: string }) => {
    console.log("Basket Data:", data);
    // Save to database or state
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Your Baskets</h1>
      <CanastaForm onSubmit={handleSubmit} />
    </div>
  );
}
