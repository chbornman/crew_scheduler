"use client";

import React from "react";
import dynamic from "next/dynamic";
import { resources, projects, assignments } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Send, Users, FolderOpen, Eye } from "lucide-react";

// Dynamic import to avoid SSR issues with the scheduler
const CrewScheduler = dynamic(() => import("@/components/crew-scheduler"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center">
      Loading scheduler...
    </div>
  ),
});

export default function DashboardPage() {
  const handlePublishSchedule = () => {
    // In a real app, this would publish the schedule and send notifications
    alert("Schedule published! Notifications sent to all crew members.");
  };

  // Calculate metrics
  const activeAssignments = assignments.length;
  const scheduledResources = new Set(assignments.map((a) => a.resourceId)).size;
  const totalResources = resources.length;
  const utilizationRate = Math.round(
    (scheduledResources / totalResources) * 100,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Crew Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Manage and assign your crew to projects
          </p>
        </div>

        <Button onClick={handlePublishSchedule} className="gap-2" size="lg">
          <Send className="h-4 w-4" />
          Publish Week Schedule
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assignments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAssignments}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Crew
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scheduledResources}/{totalResources}
            </div>
            <p className="text-xs text-muted-foreground">Employees assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilization Rate
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationRate}%</div>
            <p className="text-xs text-muted-foreground">Crew utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Scheduler */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Crew Schedule Timeline</h2>
        <CrewScheduler />
      </div>
    </div>
  );
}
