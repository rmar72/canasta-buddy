import CanastaForm from "@/components/CanastaForm";

export default function CanastaManager() {
  const handleSubmit = (data: { name: string; budget: number; description?: string }) => {
    console.log("Basket Data:", data);
    // Save to database or state
  };

  return (
    <div className="p-8">
      <CanastaForm onSubmit={handleSubmit} />
    </div>
  );
}
