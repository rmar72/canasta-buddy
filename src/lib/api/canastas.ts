// src/lib/api/canastas.ts

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
