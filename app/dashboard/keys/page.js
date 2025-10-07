// app/dashboard/keys/page.js
"use client";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { backendUrl } from "@/lib/config";

export default function KeysPage() {
  const { userId, isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch(`${backendUrl}/api/user/keys`)
      .then((res) => res.json())
      .then((data) => {
        setKeys(data.keys || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch keys:", error);
        setLoading(false);
      });
  }, [isSignedIn]);

  const handleGenerateKey = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      alert("Error: Could not retrieve email address");
      return;
    }

    const res = await fetch(`${backendUrl}/api/keys/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: user.primaryEmailAddress.emailAddress, 
        userId 
      }),
    });
    const data = await res.json();
    if (data.success) {
      alert(`New Key Generated!\n\n${data.apiKey}\n\nKeep it safe!`);
      window.location.reload();
    } else {
      alert("Error: " + data.error);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            {!isLoaded ? "Loading..." : "Please sign in."}
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">API Keys</h2>
          <p className="text-muted-foreground">
            Manage your API keys for accessing the Lynxa Pro API.
          </p>
        </div>
        <Button onClick={handleGenerateKey}>
          <Plus className="mr-2 h-4 w-4" /> Generate Key
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No API keys found. Generate your first key to get started.
                  </TableCell>
                </TableRow>
              ) : (
                keys.map((key) => (
                  <TableRow key={key.api_key}>
                    <TableCell className="font-mono">
                      {key.api_key.substring(0, 20)}...
                    </TableCell>
                    <TableCell>
                      <Badge variant={key.revoked ? "destructive" : "default"}>
                        {key.revoked ? "Revoked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(key.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(key.expires).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </MainLayout>
  );
}
