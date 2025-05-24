"use client";

import { useState } from "react";
import {
  projects,
  projectManagers,
  assignments,
  resources,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  CheckCircle2,
  Circle,
  FolderOpen,
  User,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    const pm = projectManagers.find((pm) => pm.id === project.managerId);
    return (
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pm && pm.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const selectedProjectData = selectedProject
    ? projects.find((p) => p.id === selectedProject)
    : null;

  const getProjectMetrics = (projectId: string) => {
    const projectAssignments = assignments.filter(
      (a) => a.projectId === projectId,
    );
    const uniqueResources = new Set(
      projectAssignments.map((a) => a.resourceId),
    );
    const totalHours = projectAssignments.reduce((acc, a) => {
      const days = differenceInDays(a.endDate, a.startDate) + 1;
      return acc + days * a.hoursPerDay;
    }, 0);

    const totalCost = projectAssignments.reduce((acc, a) => {
      const resource = resources.find((r) => r.id === a.resourceId);
      if (!resource) return acc;
      const days = differenceInDays(a.endDate, a.startDate) + 1;
      return acc + days * a.hoursPerDay * resource.hourlyRate;
    }, 0);

    return {
      headcount: uniqueResources.size,
      totalHours,
      estimatedCost: totalCost,
    };
  };

  const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
    const pm = projectManagers.find((pm) => pm.id === project.managerId);
    const supervisor = resources.find((r) => r.id === project.supervisorId);
    const metrics = getProjectMetrics(project.id);
    const completedTasks = project.tasks.filter((t) => t.completed).length;
    const progress =
      project.tasks.length > 0
        ? (completedTasks / project.tasks.length) * 100
        : 0;

    return (
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setSelectedProject(project.id)}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {project.city}, {project.state}
                </span>
              </div>
            </div>
            <Badge className={cn(project.color, "text-white")}>
              {pm?.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Duration</p>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">
                  {format(project.startDate, "MMM d")} -{" "}
                  {format(project.endDate, "MMM d")}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Team Size</p>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{metrics.headcount} members</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {completedTasks}/{project.tasks.length} tasks
              </span>
            </div>
            <div className="w-full bg-secondary/20 rounded-full h-2">
              <div
                className={cn("h-2 rounded-full transition-all", project.color)}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={supervisor?.imageUrl} />
                <AvatarFallback>
                  {supervisor?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                Supervisor: {supervisor?.name}
              </span>
            </div>
            <Badge variant="secondary">
              ${(metrics.estimatedCost / 1000).toFixed(1)}k
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage active projects
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {projects
                .reduce(
                  (acc, p) => acc + getProjectMetrics(p.id).estimatedCost,
                  0,
                )
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated project costs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects
                .reduce((acc, p) => acc + getProjectMetrics(p.id).totalHours, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Scheduled work hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                projects.reduce(
                  (acc, p) => acc + getProjectMetrics(p.id).headcount,
                  0,
                ) / projects.length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Members per project</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, cities, or project managers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Project Detail Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedProjectData && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedProjectData.name}
                </DialogTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedProjectData.address}</span>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Project Manager
                        </span>
                      </div>
                      <p className="font-medium">
                        {
                          projectManagers.find(
                            (pm) => pm.id === selectedProjectData.managerId,
                          )?.name
                        }
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Supervisor
                        </span>
                      </div>
                      <p className="font-medium">
                        {
                          resources.find(
                            (r) => r.id === selectedProjectData.supervisorId,
                          )?.name
                        }
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tasks" className="space-y-2">
                    {selectedProjectData.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg border"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            task.completed &&
                              "line-through text-muted-foreground",
                          )}
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="team" className="space-y-2">
                    {assignments
                      .filter((a) => a.projectId === selectedProjectData.id)
                      .map((assignment) => {
                        const resource = resources.find(
                          (r) => r.id === assignment.resourceId,
                        );
                        if (!resource) return null;

                        return (
                          <div
                            key={assignment.id}
                            className="flex items-center gap-3 p-3 rounded-lg border"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={resource.imageUrl} />
                              <AvatarFallback>
                                {resource.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {format(assignment.startDate, "MMM d")} -{" "}
                                {format(assignment.endDate, "MMM d")}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              {assignment.hoursPerDay}h/day
                            </Badge>
                          </div>
                        );
                      })}
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
