"use client";

import { useState } from "react";
import { Input } from "@/components/shadcn-ui-components/input";
import { Button } from "@/components/shadcn-ui-components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn-ui-components/card";

type AuthFormProps = {
  title: string;
  submitLabel: string;
  onSubmit: (data: { email: string; password: string }) => void;
};

export default function AuthForm({ title, submitLabel, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleSubmit}>
            {submitLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
