// app/dashboard/settings/page.js
"use client";
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { UserCircle } from "lucide-react";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Please sign in.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Your account details from Clerk authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <div className="text-sm">
                {user.firstName} {user.lastName}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="text-sm">
                {user.primaryEmailAddress?.emailAddress}
              </div>
            </div>
            <div className="space-y-2">
              <Label>User ID</Label>
              <div className="text-sm font-mono text-muted-foreground">
                {user.id}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>
              Manage your Clerk account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <a href="https://accounts.clerk.dev/user" target="_blank" rel="noopener noreferrer">
                <UserCircle className="mr-2 h-4 w-4" />
                Manage Account in Clerk
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
