// components/Playground.js
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Playground({ apiKey }) {
  const [prompt, setPrompt] = useState("Explain the importance of fast API responses like I'm five.");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lynxa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();
      if (data.success) {
        setResponse(data.response);
      } else {
        setResponse("Error: " + data.error);
      }
    } catch (error) {
      setResponse("An unexpected error occurred.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>API Playground</CardTitle>
        <CardDescription>
          Test your API key and see the Lynxa Pro AI in action.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows={4}
          />
        </div>
        <Button onClick={handleRun} disabled={loading || !prompt.trim()}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Run
        </Button>
        {response && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="response">Response</Label>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
            <SyntaxHighlighter
              language="json"
              style={vscDarkPlus}
              customStyle={{
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              {JSON.stringify({ response: response }, null, 2)}
            </SyntaxHighlighter>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
