"use client";

import { useReducer, useEffect, useState } from "react";
import { Input } from "@/components/shadcn-ui-components/input";
import { Button } from "@/components/shadcn-ui-components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui-components/tabs"
import BudgetCalculator from "@/components/BudgetCalculator";
import EditCanasta from "@/components/EditCanasta";
import { fetchCanastasApi, createCanastaApi } from "../../lib/api/canastas";
import { State, Action, initialState } from "@/types/canasta";


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, canastas: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_START":
      return { ...state, loading: true, error: "" };
    case "CREATE_SUCCESS":
      console.log('action.payload', action.payload)
      return {
        ...state,
        loading: false,
        canastas: [...state.canastas, action.payload],
      };
    case "CREATE_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function MyCanasta() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("empty"); // Manage selected tab state

  // Fetch existing Canastas on mount
  useEffect(() => {
    async function fetchCanastas() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchCanastasApi();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        if (data.length > 0) {
          setSelectedTab(data[0].name); // Automatically select the first tab
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
        dispatch({ type: "FETCH_ERROR", payload: errorMessage });      }
    }

    fetchCanastas();
  }, []);

  // Create a new Canasta
  const handleCreateCanasta = async () => {
    if (!name.trim() || !budgetAmount) {
      dispatch({
        type: "CREATE_ERROR",
        payload: "Canasta name and budget amount are required.",
      });
      return;
    }

    dispatch({ type: "CREATE_START" });

    try {
      const newCanasta = await createCanastaApi({ name, budgetAmount });
      dispatch({ type: "CREATE_SUCCESS", payload: newCanasta });
      resetInputs();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      dispatch({ type: "FETCH_ERROR", payload: errorMessage });
    }
  };

  const resetInputs = () => {
    setName("");
    setBudgetAmount(0);
  }

  const [showEditCanasta, setShowEditCanasta] = useState(false);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col gap-4 row-start-1 sm:items-center max-w-5xl w-full sm:px-0">
      <div className="w-full max-w-2xl mt-1 p-4 space-y-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex-grow">
            <label
              htmlFor="canastaName"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Canasta Name
            </label>
            <Input
              id="canastaName"
              placeholder="New Canasta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="relative w-32">
            <label
              htmlFor="budgetAmount"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Budget Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 pointer-events-none">$</span>
              <Input
                id="budgetAmount"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                className="pl-5 w-full"
                type="number"
              />
            </div>
          </div>

          <div className="flex-none">
            <Button
              variant="default"
              onClick={handleCreateCanasta}
              disabled={state.loading}
              className="mt-5 sm:mt-[20px]"
            >
              + New
            </Button>
          </div>
        </div>

        {state.error && (
          <p
            className="text-center animate-fadeIn"
            style={{ animation: "fadeIn 0.8s ease-in-out", color: 'red' }}
          >
            {state.error}
          </p>
        )}
      </div>

        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
          className="w-full max-w-2xl mt-1"
        >
          <TabsList className="flex justify-center gap-2 bg-gray-100 p-6 rounded-lg shadow-md">
            {state.canastas.map((canasta) => (
              <TabsTrigger 
                className={`px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none 
                  data-[state=active]:bg-green-200 data-[state=active]:text-green-800 
                  bg-white text-gray-700 hover:bg-green-200 hover:text-green-800`}
                key={`tab-${canasta._id}`} 
                value={canasta.name}
              >
                {canasta.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {state.canastas.map((canasta) => (
            <TabsContent key={`tab-content-${canasta._id}`} value={canasta.name}>
              {!showEditCanasta ? (
                <BudgetCalculator
                  initialBudget={canasta.budget}
                  canastaId={canasta._id}
                  items={canasta.items || []}
                  setShowEditCanasta={setShowEditCanasta} // Pass the state setter
                />
              ) : (
                <EditCanasta
                  canastaId={canasta._id}
                  canastaName={canasta.name}
                  budgetAmount={canasta.budget}
                  canastaItems={canasta.items || []}
                  onSaveComplete={(updatedCanasta) => {
                    const updatedCanastas = state.canastas.map((canasta) =>
                      canasta._id === updatedCanasta._id ? updatedCanasta : canasta
                    );
                  
                    dispatch({ type: "FETCH_SUCCESS", payload: updatedCanastas }); // Pass the updated array
                    setShowEditCanasta(false); // Close edit view
                  }}
                  onCancel={() => setShowEditCanasta(false)} // Close edit view on cancel
                />
              )}
            </TabsContent>
          ))}
          {state.canastas.length === 0 && (
            <TabsContent value={"empty"}> 
              <div>No Canastas Found</div> 
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}

