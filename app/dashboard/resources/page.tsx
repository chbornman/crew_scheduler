"use client";

import { useState } from "react";
import { resources } from "@/lib/mock-data";
import { Resource, ResourceType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  MapPin,
  DollarSign,
  Users,
  HardHat,
  Award,
  Wrench,
  Building,
} from "lucide-react";

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<ResourceType | "all">("all");
  const [filterSkill, setFilterSkill] = useState<string>("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.jobTitle &&
        resource.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === "all" || resource.type === filterType;

    const matchesSkill =
      filterSkill === "all" || resource.skills.includes(filterSkill as any);

    return matchesSearch && matchesType && matchesSkill;
  });

  const employees = filteredResources.filter((r) => r.type === "employee");
  const contractors = filteredResources.filter((r) => r.type === "contractor");

  const renderResourceTable = (resourceList: Resource[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Skills</TableHead>
          <TableHead>Certifications</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resourceList.map((resource) => (
          <TableRow key={resource.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                {resource.type === "employee" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={resource.imageUrl} />
                    <AvatarFallback>
                      {resource.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                {resource.type === "contractor" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Building className="h-4 w-4" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{resource.name}</p>
                  {resource.jobTitle && (
                    <p className="text-sm text-muted-foreground">
                      {resource.jobTitle}
                    </p>
                  )}
                  {resource.contractorHeadcount && (
                    <p className="text-sm text-muted-foreground">
                      {resource.contractorHeadcount} workers
                    </p>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={resource.type === "employee" ? "default" : "secondary"}
              >
                {resource.type}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {resource.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    <Wrench className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {resource.certifications.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {resource.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{resource.city}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">${resource.hourlyRate}/hr</span>
              </div>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-1">
            Manage your employees and contractors
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Active crew members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractors</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractors.length}</div>
            <p className="text-xs text-muted-foreground">Partner companies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Workforce
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.length +
                contractors.reduce(
                  (acc, c) => acc + (c.contractorHeadcount || 1),
                  0,
                )}
            </div>
            <p className="text-xs text-muted-foreground">
              Including contractor workers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, job title, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              value={filterType}
              onValueChange={(value) => setFilterType(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="employee">Employees Only</SelectItem>
                <SelectItem value="contractor">Contractors Only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSkill} onValueChange={setFilterSkill}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="carpentry">Carpentry</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="drywall">Drywall</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="roofing">Roofing</SelectItem>
                <SelectItem value="flooring">Flooring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resource List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Resources ({filteredResources.length})
          </TabsTrigger>
          <TabsTrigger value="employees">
            Employees ({employees.length})
          </TabsTrigger>
          <TabsTrigger value="contractors">
            Contractors ({contractors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {renderResourceTable(filteredResources)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {renderResourceTable(employees)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contractors" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {renderResourceTable(contractors)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
