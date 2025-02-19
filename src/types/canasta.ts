// src/types/canasta.ts

export interface FoodItem {
  id: string;
  name: string;
  price: number;
}

export interface Canasta {
  _id: string;
  name: string;
  budget: number;
  items: FoodItem[]; // An array of food items
}

export type BudgetCalculatorProps = {
  initialBudget: number;
  canastaId: string; // Pass canastaId for API calls
  items: FoodItem[];
  setShowEditCanasta: (value: boolean) => void;
  setGlobalItems: (id: string, list: FoodItem[]) => void;
};

export interface State {
  loading: boolean;
  error: string;
  canastas: Canasta[];
}

export type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Canasta[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "CREATE_START" }
  | { type: "CREATE_SUCCESS"; payload: Canasta }
  | { type: "CREATE_ERROR"; payload: string };

export const initialState: State = {
  loading: false,
  error: "",
  canastas: [],
};

