// "use client";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function MyCanasta() {

//   const [name, setName] = useState("");
//   const [budgetAmount, setBudgetAmount] = useState(0)
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleCreateCanasta = async () => {
//     if (!name.trim()) {
//       setError("Canasta name cannot be empty.");
//       return;
//     }

//     if(!budgetAmount) {
//       setError("Enter a budget amount.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch("/api/canastas/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, budget: budgetAmount }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Failed to create Canasta.");
//         return;
//       }

//       setName("");
//       alert("Canasta created successfully!");
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
//       <main className="flex flex-col gap-4 row-start-2 sm:items-center max-w-5xl w-full sm:px-0">
//         <div className="w-full max-w-2xl mx-auto mt-1 p-4 space-y-4 bg-white rounded-lg shadow-md">
//           <div className="flex items-center space-x-4">
//             <Input
//               placeholder="New Canasta"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="flex-grow"
//             />
//             <Input
//               placeholder="Budget Amount"
//               value={budgetAmount}
//               onChange={(e) => setBudgetAmount(Number(e.target.value))}
//               className="w-24"
//               type="number"
//             />
//             <Button
//               variant="default"
//               onClick={handleCreateCanasta}
//               disabled={loading}
//             >
//               + New
//             </Button>
//           </div>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//         </div>
//         <div>
          
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useReducer, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchCanastasApi, createCanastaApi } from "../../lib/api/canastas";

interface Canasta {
  _id: string;
  name: string;
  budget: number;
}

interface State {
  loading: boolean;
  error: string;
  canastas: Canasta[];
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Canasta[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "CREATE_START" }
  | { type: "CREATE_SUCCESS"; payload: Canasta }
  | { type: "CREATE_ERROR"; payload: string };

const initialState: State = {
  loading: false,
  error: "",
  canastas: [],
};

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
  console.log("Canastas:", state.canastas);
  const [name, setName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0);

  // Fetch existing Canastas on mount
  useEffect(() => {
    async function fetchCanastas() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchCanastasApi();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
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
      setName("");
      setBudgetAmount(0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      dispatch({ type: "FETCH_ERROR", payload: errorMessage });
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
              disabled={state.loading}
            >
              + New
            </Button>
          </div>
          {state.error && <p className="text-red-500 text-center">{state.error}</p>}
        </div>
        <div>
          <h2 className="text-xl font-bold">Existing Canastas</h2>
          <ul className="space-y-2">
            {state.canastas.map((canasta: Canasta) => (
              <li key={canasta._id} className="p-2 border rounded-md">
                {canasta.name} - ${canasta.budget}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
