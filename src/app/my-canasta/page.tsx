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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn-ui-components/popover";
import BudgetCalculator from "@/components/BudgetCalculator";
import EditCanasta from "@/components/EditCanasta";
import { fetchCanastasApi, createCanastaApi } from "../../lib/api/canastas";
import { State, Action, initialState, Canasta, FoodItem } from "@/types/canasta";
import { ChevronDown, ChevronUp } from "lucide-react"; 

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

  const handleSaveComplete = (updatedCanasta: Canasta): void => {
    const updatedCanastas = state.canastas.map((canasta) =>
      canasta._id === updatedCanasta._id ? updatedCanasta : canasta
    );
    dispatch({ type: "FETCH_SUCCESS", payload: updatedCanastas }); 
    if (selectedTab === updatedCanasta.name) {
      setSelectedTab(updatedCanasta.name);
    } else {
      // If the updated name changed, find the updated canasta and set it as selected
      const exists = updatedCanastas.find(c => c.name === selectedTab);
      setSelectedTab(exists ? selectedTab : updatedCanasta.name);
    }
    setShowEditCanasta(false);
  }

  const setGlobalItems = (canastaId: string, updatedItems: FoodItem[]) => {
    const updatedCanastas = state.canastas.map((canasta) =>
      canasta._id === canastaId ? { ...canasta, items: updatedItems } : canasta
    );
  
    dispatch({ type: "FETCH_SUCCESS", payload: updatedCanastas });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="grid gap-4 justify-items-center max-w-5xl w-full px-4 mx-auto">
        <div className="w-full max-w-2xl mt-1 p-4 space-y-4 bg-white rounded-lg shadow-md">

          {/* Mobile Toggle Button */}
          <div className="sm:hidden flex flex-col items-center w-full py-3 border-b border-gray-300">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center px-4 py-2 text-gray-700 font-medium"
            >
              <span className="text-gray-600 font-semibold text-md">
                {isExpanded ? "Hide Form" : "Add New Canasta"}
              </span>

              {isExpanded ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
            </Button>
          </div>

          {/* Input Section (Collapsible on Mobile) */}
          <div className={`${isExpanded ? "block space-y-4" : "hidden"} sm:grid grid-cols-1 sm:grid-cols-[2fr_1fr_auto] gap-6 items-center w-full`}>
          {/* Canasta Name Input */}
            <div>
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

            {/* Budget Amount Input */}
            <div>
              <label
                htmlFor="budgetAmount"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Budget Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 pointer-events-none">
                  $
                </span>
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

            {/* New Button */}
            <div className="sm:mt-5 flex justify-end sm:justify-start">
              <Button
                variant="default"
                onClick={handleCreateCanasta}
                disabled={state.loading}
                className="w-full sm:w-auto"
              >
                + New
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {state.error && (
            <p className="text-center animate-pulse" style={{ color: 'red' }}>{state.error}</p>
          )}
        </div>

        <div className="sm:hidden w-full mb-0">
          <Popover open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <span className="text-gray-700">Canasta:</span>
                {selectedTab !== "empty" ? selectedTab : "Select Canasta"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] min-w-full p-1 bg-white border rounded-lg shadow-md">
              <div className="flex flex-col">
                {state.canastas.map((canasta) => (
                  <Button
                    key={canasta._id}
                    variant={selectedTab === canasta.name ? "secondary" : "ghost"}
                    onClick={() => {
                      setSelectedTab(canasta.name);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start px-4 py-2 text-left"
                  >
                    {canasta.name}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
          className="w-full max-w-2xl sm:mt-1 mt-[-25px]"
        >
          <div className="hidden sm:block">
            {/* Tabs List */}
            <TabsList className="flex flex-wrap overflow-auto justify-center gap-2 bg-gray-100 rounded-lg shadow-md w-full max-w-full">
              {state.canastas.map((canasta) => (
                <TabsTrigger
                  key={`tab-${canasta._id}`}
                  value={canasta.name}
                  className={`px-4 text-sm font-semibold rounded-lg focus:outline-none
                    data-[state=active]:bg-green-200 data-[state=active]:text-green-800
                    bg-white text-gray-700 hover:bg-green-200 hover:text-green-800
                    transition-all ease-in-out duration-150`}
                >
                  {canasta.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tabs Content */}
          {state.canastas.map((canasta) => (
            <TabsContent key={`tab-content-${canasta._id}`} value={canasta.name}>
              {!showEditCanasta ? (
                <BudgetCalculator
                  initialBudget={canasta.budget}
                  canastaId={canasta._id}
                  items={canasta.items || []}
                  setShowEditCanasta={setShowEditCanasta}
                  setGlobalItems={setGlobalItems}
                />
              ) : (
                <EditCanasta
                  canastaId={canasta._id}
                  canastaName={canasta.name}
                  budgetAmount={canasta.budget}
                  canastaItems={canasta.items || []}
                  onSaveComplete={(updatedCanasta) => handleSaveComplete(updatedCanasta)}
                  onCancel={() => setShowEditCanasta(false)}
                />
              )}
            </TabsContent>
          ))}

          {/* No Canastas Found */}
          {state.canastas.length === 0 && (
            <TabsContent value="empty">
              <div className="text-center py-4 text-gray-500">No Canastas Found</div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}

