export type ResourceType = "employee" | "contractor";

export type ResourceSkill =
  | "carpentry"
  | "electrical"
  | "plumbing"
  | "painting"
  | "drywall"
  | "hvac"
  | "roofing"
  | "flooring"
  | "framing"
  | "finish work"
  | "wiring"
  | "troubleshooting"
  | "pipefitting"
  | "finishing"
  | "project management"
  | "supervision"
  | "taping"
  | "texturing"
  | "hardwood"
  | "tile"
  | "carpet"
  | "ventilation"
  | "refrigeration";

export type Certification =
  | "OSHA 10"
  | "OSHA 30"
  | "CPR"
  | "First Aid"
  | "Forklift"
  | "Scaffolding"
  | "Fall Protection"
  | "Master Electrician"
  | "Journeyman Plumber"
  | "Lead Safe"
  | "Licensed"
  | "Insured"
  | "Bonded"
  | "EPA Certified";

export type ProjectManager = {
  id: string;
  name: string;
  color: string;
};

export type Resource = {
  id: string;
  name: string;
  type: ResourceType;
  jobTitle?: string;
  skills: ResourceSkill[];
  certifications: Certification[];
  hourlyRate: number;
  address?: string;
  city: string;
  contractorHeadcount?: number;
  imageUrl?: string;
};

export type Project = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  managerId: string;
  supervisorId: string;
  startDate: Date;
  endDate: Date;
  color: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
};

export type Assignment = {
  id: string;
  resourceId: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  hoursPerDay: number;
  tasks: string[];
  driveTime?: number;
};

export type TimeOff = {
  id: string;
  resourceId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
};

export type ViewMode =
  | "day"
  | "week"
  | "twoWeek"
  | "month"
  | "quarter"
  | "year";
