"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, resources } from "@/lib/mock-data";
import { MapPin, Users, Building2, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MapPage() {
  const employees = resources.filter((r) => r.type === "employee");
  const contractors = resources.filter((r) => r.type === "contractor");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Map View</h1>
        <p className="text-muted-foreground mt-1">
          View project and crew member locations
        </p>
      </div>

      {/* Map Placeholder */}
      <Card className="h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <Navigation className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Interactive Map</h3>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                  In the full version, this would display an interactive map
                  showing all project locations and employee addresses with
                  real-time drive time calculations.
                </p>
              </div>
            </div>
          </div>

          {/* Sample pins for visual effect */}
          <div className="absolute top-20 left-32">
            <div className="relative">
              <MapPin className="h-8 w-8 text-sky-500 drop-shadow-lg" />
              <div className="absolute -top-8 left-10 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                Lancaster Office
              </div>
            </div>
          </div>

          <div className="absolute top-40 right-40">
            <div className="relative">
              <MapPin className="h-8 w-8 text-emerald-500 drop-shadow-lg" />
              <div className="absolute -top-8 left-10 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                Reading Retail
              </div>
            </div>
          </div>

          <div className="absolute bottom-32 left-64">
            <div className="relative">
              <MapPin className="h-8 w-8 text-violet-500 drop-shadow-lg" />
              <div className="absolute -top-8 left-10 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                York Medical
              </div>
            </div>
          </div>

          <div className="absolute bottom-40 right-32">
            <div className="relative">
              <MapPin className="h-8 w-8 text-amber-500 drop-shadow-lg" />
              <div className="absolute -top-8 left-10 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                Harrisburg Hotel
              </div>
            </div>
          </div>

          {/* Employee location samples */}
          <div className="absolute top-60 left-40">
            <Users className="h-6 w-6 text-gray-600 drop-shadow" />
          </div>

          <div className="absolute bottom-60 right-60">
            <Users className="h-6 w-6 text-gray-600 drop-shadow" />
          </div>
        </div>
      </Card>

      {/* Location Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <div className="mt-2 space-y-1">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-2 text-xs"
                >
                  <MapPin
                    className={cn(
                      "h-3 w-3",
                      project.color.replace("bg-", "text-"),
                    )}
                  />
                  <span className="truncate">{project.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Employee Locations
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Lancaster</span>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Reading</span>
                <Badge variant="secondary">1</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>York</span>
                <Badge variant="secondary">1</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Harrisburg</span>
                <Badge variant="secondary">1</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contractor Locations
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractors.length}</div>
            <div className="mt-2 space-y-1">
              {contractors.map((contractor) => (
                <div
                  key={contractor.id}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="truncate">{contractor.name}</span>
                  <span className="text-muted-foreground">
                    {contractor.city}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
