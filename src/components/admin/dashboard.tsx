"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, BedDouble, CalendarCheck, Percent } from "lucide-react";

const dashboardMetrics = [
  {
    icon: DollarSign,
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
  },
  {
    icon: CalendarCheck,
    title: "Total Bookings",
    value: "+2350",
    change: "+180.1% from last month",
  },
  {
    icon: BedDouble,
    title: "New Check-ins",
    value: "+573",
    change: "+19% from last month",
  },
  {
    icon: Percent,
    title: "Occupancy Rate",
    value: "82.5%",
    change: "+2.1% from last month",
  },
];

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {dashboardMetrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
