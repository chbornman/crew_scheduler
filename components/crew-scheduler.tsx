"use client";

import { useState, useEffect } from "react";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { resources, projects, assignments } from "@/lib/mock-data";
import "@bitnoi.se/react-scheduler/dist/style.css";
import "../app/dashboard/scheduler-custom.css";

export default function CrewScheduler() {
  const [isLoading, setIsLoading] = useState(false);
  const [schedulerData, setSchedulerData] = useState<any[]>([]);
  const [filterButtonState, setFilterButtonState] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    // Transform our data to match the scheduler format
    const transformedData = resources.map((resource) => {
      // Get all assignments for this resource
      const resourceAssignments = assignments.filter(
        (a) => a.resourceId === resource.id,
      );

      // Transform assignments to scheduler items
      const items = resourceAssignments.map((assignment) => {
        const project = projects.find((p) => p.id === assignment.projectId);

        // Calculate occupancy in seconds (hours per day * 3600)
        const occupancy = assignment.hoursPerDay * 3600;

        return {
          id: assignment.id,
          startDate: assignment.startDate,
          endDate: assignment.endDate,
          occupancy: occupancy,
          title: project?.name || "Unknown Project",
          subtitle: assignment.tasks.join(", "),
          description: `${assignment.hoursPerDay} hours/day • ${assignment.driveTime || 0} min drive`,
          bgColor:
            project?.color.replace("bg-", "").replace("-500", "") === "blue"
              ? "rgb(59, 130, 246)"
              : project?.color.replace("bg-", "").replace("-500", "") ===
                  "purple"
                ? "rgb(147, 51, 234)"
                : project?.color.replace("bg-", "").replace("-500", "") ===
                    "green"
                  ? "rgb(34, 197, 94)"
                  : project?.color.replace("bg-", "").replace("-500", "") ===
                      "orange"
                    ? "rgb(251, 146, 60)"
                    : "rgb(107, 114, 128)",
        };
      });

      return {
        id: resource.id,
        label: {
          icon:
            resource.imageUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(resource.name)}&background=random`,
          title: resource.name,
          subtitle:
            resource.type === "employee"
              ? resource.jobTitle || ""
              : `Contractor (${resource.contractorHeadcount} people)`,
        },
        data: items,
      };
    });

    setSchedulerData(transformedData);
    setIsLoading(false);
  }, []);

  const handleItemClick = (clickedItem: any) => {
    console.log("Clicked item:", clickedItem);
    // You can add logic here to edit the assignment
  };

  const handleFilterData = () => {
    // Add filter logic here
    setFilterButtonState(1);
  };

  const handleClearFilterData = () => {
    // Clear filters logic here
    setFilterButtonState(0);
  };

  return (
    <div className="scheduler-container relative w-full h-[600px] max-h-[600px] overflow-hidden border border-gray-200 rounded-lg">
      <div className="absolute inset-0 overflow-hidden">
        <Scheduler
          isLoading={isLoading}
          data={schedulerData}
          onItemClick={handleItemClick}
          onFilterData={handleFilterData}
          onClearFilterData={handleClearFilterData}
          config={{
            filterButtonState: filterButtonState,
            zoom: 1, // Start with day view
            lang: "en",
            maxRecordsPerPage: 5, // Reduce to fit better in 600px
            includeTakenHoursOnWeekendsInDayView: false,
          }}
        />
      </div>
    </div>
  );
}
