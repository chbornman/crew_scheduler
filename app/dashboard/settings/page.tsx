"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Shield,
  Tag,
  Award,
  Clock,
  Users,
  X,
  Plus,
  Save,
  ChevronRight,
} from "lucide-react";

export default function SettingsPage() {
  const [driveTimeThreshold, setDriveTimeThreshold] = useState("45");
  const [tags, setTags] = useState([
    "OSHA 10",
    "OSHA 30",
    "CPR",
    "First Aid",
    "Forklift",
  ]);
  const [certifications, setCertifications] = useState([
    "Scaffolding",
    "Fall Protection",
    "Confined Space",
  ]);
  const [newTag, setNewTag] = useState("");
  const [newCert, setNewCert] = useState("");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleAddCert = () => {
    if (newCert && !certifications.includes(newCert)) {
      setCertifications([...certifications, newCert]);
      setNewCert("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleRemoveCert = (cert: string) => {
    setCertifications(certifications.filter((c) => c !== cert));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your crew scheduler preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="tags">Tags & Certifications</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Configuration</CardTitle>
              <CardDescription>
                Configure general settings for the crew scheduler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="drive-time">
                  Drive Time Warning Threshold (minutes)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="drive-time"
                    type="number"
                    value={driveTimeThreshold}
                    onChange={(e) => setDriveTimeThreshold(e.target.value)}
                    className="w-32"
                  />
                  <span className="text-sm text-muted-foreground">
                    Assignments exceeding this drive time will show a warning
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Work Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-sm">
                      Start Time
                    </Label>
                    <Input id="start-time" type="time" defaultValue="07:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-sm">
                      End Time
                    </Label>
                    <Input id="end-time" type="time" defaultValue="16:00" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tags & Certifications */}
        <TabsContent value="tags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Tags</CardTitle>
              <CardDescription>
                Manage tags that can be assigned to resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add new tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button onClick={handleAddTag} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 px-3 py-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Manage certifications that can be assigned to resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add new certification..."
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCert()}
                />
                <Button onClick={handleAddCert} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="secondary"
                    className="gap-1 px-3 py-1"
                  >
                    <Award className="h-3 w-3" />
                    {cert}
                    <button
                      onClick={() => handleRemoveCert(cert)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Roles & Permissions</CardTitle>
              <CardDescription>
                Configure what each role can access in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-sm text-muted-foreground">
                        Full system access
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Project Manager</p>
                      <p className="text-sm text-muted-foreground">
                        Manage projects and assignments
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Supervisor</p>
                      <p className="text-sm text-muted-foreground">
                        View assigned projects and crew
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>External Integrations</CardTitle>
              <CardDescription>
                Connect with external services and APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Microsoft SSO</h4>
                    <Badge variant="success">Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Single sign-on authentication for your organization
                  </p>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Twilio SMS</h4>
                    <Badge variant="secondary">Not Configured</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send SMS notifications to crew members
                  </p>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">SendGrid Email</h4>
                    <Badge variant="secondary">Not Configured</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send email notifications and reports
                  </p>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Google Maps</h4>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Calculate drive times and show locations on map
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
