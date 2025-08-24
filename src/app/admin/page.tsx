"use client";

import * as React from "react";
import Header from "@/components/header";
import { BookingsTable } from "@/components/admin/bookings-table";
import { Dashboard } from "@/components/admin/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Dashboard.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Incorrect password. Please try again.",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Please enter the password to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto py-12">
          <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              An overview of your hotel's performance and bookings.
            </p>
          </div>
          <Dashboard />
          <div className="mt-8">
            <h2 className="font-headline text-3xl font-bold mb-4">Manage Bookings</h2>
            <BookingsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
