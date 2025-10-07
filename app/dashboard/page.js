// app/dashboard/page.js
"use client";
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { TrendingUp, TrendingDown, Activity, Key, Zap, Clock } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Please sign in to view the dashboard.</p>
        </div>
      </MainLayout>
    );
  }

  const stats = [
    {
      title: "Active Keys",
      value: "2",
      change: "+1",
      trend: "up",
      description: "from last month",
      icon: Key,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "API Calls",
      value: "1,234",
      change: "+201",
      trend: "up",
      description: "from last hour",
      icon: Activity,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Total Tokens",
      value: "57.3K",
      change: "+19%",
      trend: "up",
      description: "from last month",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Avg Response",
      value: "87ms",
      change: "-12ms",
      trend: "down",
      description: "faster than average",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.firstName || user.username || "User"}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's what's happening with your API today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <Card key={idx} className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendIcon className={`h-3 w-3 ${stat.trend === 'up' ? 'text-green-500' : 'text-orange-500'}`} />
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-orange-500'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-2">
            <CardHeader>
              <CardTitle>API Usage Overview</CardTitle>
              <CardDescription>
                Your API request patterns over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <Activity className="h-12 w-12 mx-auto opacity-50" />
                  <p>Chart visualization coming soon</p>
                  <p className="text-sm">Connect your analytics to see detailed insights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 border-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href="/dashboard/keys" className="block p-4 rounded-lg border-2 hover:border-primary transition-colors hover:bg-accent/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Generate API Key</div>
                    <div className="text-sm text-muted-foreground">Create a new key</div>
                  </div>
                </div>
              </a>
              <a href="/dashboard/playground" className="block p-4 rounded-lg border-2 hover:border-primary transition-colors hover:bg-accent/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Zap className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium">Test API</div>
                    <div className="text-sm text-muted-foreground">Try in playground</div>
                  </div>
                </div>
              </a>
              <a href="/dashboard/settings" className="block p-4 rounded-lg border-2 hover:border-primary transition-colors hover:bg-accent/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Activity className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-medium">View Analytics</div>
                    <div className="text-sm text-muted-foreground">Check usage stats</div>
                  </div>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="border-2 border-green-500/20 bg-green-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <CardTitle className="text-green-500">All Systems Operational</CardTitle>
            </div>
            <CardDescription>
              API is running smoothly with 99.9% uptime
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </MainLayout>
  );
}
