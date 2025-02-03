// src/lib/api/canastas.ts
import { FoodItem } from "@/types/canasta";

export async function fetchCanastasApi() {
  const response = await fetch("/api/canastas");
  if (!response.ok) {
    throw new Error("Failed to fetch Canastas");
  }
  const data = await response.json();
  return data.canastas;
}

interface CreateCanastaArgs {
  name: string;
  budgetAmount: number;
}

export async function createCanastaApi({ name, budgetAmount }: CreateCanastaArgs) {
  const response = await fetch("/api/canastas/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, budget: budgetAmount }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create Canasta");
  }
  const data = await response.json();
  return data.newCanasta
}

export async function addItemToCanastaApi(canastaId: string, item: { name: string; price: number, id: string }) {
  const response = await fetch("/api/canastas/add-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ canastaId, item }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add item");
  }

  return await response.json();
}

export async function updateCanasta(canastaId: string, updatedData: Partial<{ name: string; budget: number; items: FoodItem[] }>) {
  const response = await fetch("/api/canastas/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ canastaId, ...updatedData }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update canasta");
  }

  return await response.json();
}