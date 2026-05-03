"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, PieChart as PieChartIcon, TrendingUp, Map } from "lucide-react";
import { useMemo } from "react";
import { PageContainer } from "@/components/layout/page-container";
import dynamic from "next/dynamic";

const DistrictParticipationChart = dynamic(() => import("@/components/dashboard/population-charts").then(mod => mod.PopulationCharts.DistrictParticipation), { ssr: false });
const DemographicBreakdownChart = dynamic(() => import("@/components/dashboard/population-charts").then(mod => mod.PopulationCharts.DemographicBreakdown), { ssr: false });

/**
 * PopulationPage - Detailed view of voter demographics and district participation.
 */
export default function PopulationPage() {
  const districtData = useMemo(() => [
    { name: "Bandung City", population: "2.4M", registered: 1.8 },
    { name: "Cimahi", population: "0.6M", registered: 0.4 },
    { name: "Bandung West", population: "1.7M", registered: 1.2 },
    { name: "Sumedang", population: "1.1M", registered: 0.8 },
  ], []);

  const genderData = useMemo(() => [
    { name: "Male", value: 52, fill: "hsl(var(--primary))" },
    { name: "Female", value: 48, fill: "hsl(var(--primary) / 0.3)" },
  ], []);

  const stats = useMemo(() => [
    { label: "Total Population", val: "5.8M", icon: Users, trend: "+1.2%" },
    { label: "Registered Voters", val: "4.2M", icon: PieChartIcon, trend: "+0.8%" },
    { label: "Turnout Expectation", val: "78%", icon: TrendingUp, trend: "+5.0%" },
    { label: "Sub-Districts", val: "24", icon: Map, trend: "Stable" },
  ], []);

  return (
    <PageContainer title="Population & Voter Data">
      <h2 className="sr-only">Population Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="rounded-[2rem] border shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</p>
                <p className="text-3xl font-black text-primary">{stat.val}</p>
                <span className="text-[10px] text-green-500 font-bold">{stat.trend} from 2019</span>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-[2.5rem] border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-black">District Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <DistrictParticipationChart data={districtData} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-black">Demographic Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="h-80 w-full">
              <DemographicBreakdownChart data={genderData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
