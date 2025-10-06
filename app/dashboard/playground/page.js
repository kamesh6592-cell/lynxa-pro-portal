// app/dashboard/playground/page.js
"use client";
import { MainLayout } from "@/components/MainLayout";
import { Playground } from "@/components/Playground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Code, AlertCircle } from "lucide-react";
import { backendUrl } from "@/lib/config";

export default function PlaygroundPage() {
  const { userId, isSignedIn } = useAuth();
  const [activeKey, setActiveKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch(`${backendUrl}/api/user/keys`)
      .then((res) => res.json())
      .then((data) => {
        const keys = data.keys || [];
        const key = keys.find((k) => !k.revoked);
        setActiveKey(key);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch keys:", error);
        setLoading(false);
      });
  }, [isSignedIn]);

  if (!isSignedIn) {
    return <MainLayout><div>Please sign in.</div></MainLayout>;
  }

  if (loading) {
    return <MainLayout><div>Loading Playground...</div></MainLayout>;
  }

  if (!activeKey) {
    return (
      <MainLayout>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Playground</h2>
            <p className="text-muted-foreground">
              Test your API key and see the Lynxa Pro AI in action.
            </p>
          </div>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              No Active API Key
            </CardTitle>
            <CardDescription>
              You need to generate an API key before you can use the playground.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a href="/dashboard/keys">
              <Button>
                <Code className="mr-2 h-4 w-4" /> Go to API Keys
              </Button>
            </a>
          </CardContent>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Playground</h2>
          <p className="text-muted-foreground">
            Test your API key and see the Lynxa Pro AI in action.
          </p>
        </div>
      </div>
      <Playground apiKey={activeKey.api_key} />
    </MainLayout>
  );
}
