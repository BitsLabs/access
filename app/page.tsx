"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", hint: "Staff dashboard" },
  { label: "Check-ins", hint: "Live validation" },
  { label: "Members", hint: "Active roster" },
  { label: "Plans", hint: "Access rules" },
  { label: "Analytics", hint: "Attendance trends" },
];

const stats = [
  {
    label: "Active members",
    value: "1,284",
    change: "+6.2%",
    note: "vs last 30 days",
    trend: "up",
  },
  {
    label: "Check-ins today",
    value: "214",
    change: "+12",
    note: "compared to yesterday",
    trend: "up",
  },
  {
    label: "Access validations",
    value: "98.6%",
    change: "-0.4%",
    note: "success rate",
    trend: "down",
  },
  {
    label: "Plans at limit",
    value: "38",
    change: "+4",
    note: "need staff review",
    trend: "up",
  },
];

const checkInQueue = [
  {
    name: "Amara Patel",
    memberId: "FLT-2041",
    plan: "Unlimited Monthly",
    status: "approved",
    time: "09:12 AM",
    lastVisit: "Power Flow · 07:00 AM",
  },
  {
    name: "Jonas Reed",
    memberId: "FLT-1187",
    plan: "6-Class Weekly",
    status: "limit-reached",
    time: "09:14 AM",
    lastVisit: "Strength Lab · Yesterday",
  },
  {
    name: "Linh Nguyen",
    memberId: "FLT-3093",
    plan: "Weekday Access",
    status: "approved",
    time: "09:18 AM",
    lastVisit: "Gentle Flow · 08:10 AM",
  },
  {
    name: "Noah Bennett",
    memberId: "FLT-5419",
    plan: "Off-Peak 10-Pack",
    status: "review",
    time: "09:22 AM",
    lastVisit: "Mobility Reset · Oct 31",
  },
];

const accessRules = [
  {
    plan: "Unlimited Monthly",
    rules: "Unlimited check-ins · All classes",
    utilization: "74% avg attendance",
    utilizationPercent: 74,
    renewal: "Renews Nov 20",
  },
  {
    plan: "6-Class Weekly",
    rules: "Up to 6 check-ins/week",
    utilization: "92% utilization",
    utilizationPercent: 92,
    renewal: "Renews Nov 18",
  },
  {
    plan: "Weekday Access",
    rules: "Mon–Fri only · No weekends",
    utilization: "68% utilization",
    utilizationPercent: 68,
    renewal: "Renews Nov 25",
  },
];

const memberActivity = [
  {
    name: "Sofia Morales",
    memberId: "FLT-8820",
    plan: "Unlimited Monthly",
    lastVisit: "Today · 08:41 AM",
    status: "Active",
  },
  {
    name: "Kai Thompson",
    memberId: "FLT-4512",
    plan: "6-Class Weekly",
    lastVisit: "Yesterday · 06:12 PM",
    status: "Limit nearing",
  },
  {
    name: "Elena Rossi",
    memberId: "FLT-1077",
    plan: "Weekday Access",
    lastVisit: "Nov 02 · 07:30 AM",
    status: "Active",
  },
  {
    name: "Andre Silva",
    memberId: "FLT-3290",
    plan: "Off-Peak 10-Pack",
    lastVisit: "Nov 01 · 05:10 PM",
    status: "Expired",
  },
];

const analytics = [
  {
    label: "Avg attendance per member",
    value: "4.3 visits/week",
    detail: "+0.6 from last month",
  },
  {
    label: "Most popular class",
    value: "Power Flow · 6:00 PM",
    detail: "82% seat utilization",
  },
  {
    label: "Drop-off signal",
    value: "11 members",
    detail: "No visits in 14+ days",
  },
  {
    label: "Peak check-in window",
    value: "5:30 PM – 7:00 PM",
    detail: "42% of daily traffic",
  },
];

const badgeStyles: Record<string, string> = {
  approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
  review: "bg-amber-50 text-amber-700 border-amber-100",
  "limit-reached": "bg-rose-50 text-rose-600 border-rose-100",
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Limit nearing": "bg-amber-50 text-amber-700 border-amber-100",
  Expired: "bg-zinc-100 text-zinc-500 border-zinc-200",
};

export default function Home() {
  const [activeNav, setActiveNav] = useState(navItems[0]?.label ?? "Overview");
  const [activeRange, setActiveRange] = useState("Today");
  const [queueFilter, setQueueFilter] = useState("All");
  const [activityFilter, setActivityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightAlerts, setHighlightAlerts] = useState(false);
  const [activeStat, setActiveStat] = useState(stats[0]?.label ?? "Active members");
  const [selectedMemberId, setSelectedMemberId] = useState(checkInQueue[0]?.memberId);

  const filteredQueue = useMemo(() => {
    return checkInQueue.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.memberId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        queueFilter === "All" ||
        (queueFilter === "Needs review" && member.status !== "approved") ||
        (queueFilter === "Approved" && member.status === "approved");
      const matchesAlert = !highlightAlerts || member.status !== "approved";

      return matchesSearch && matchesFilter && matchesAlert;
    });
  }, [queueFilter, searchTerm, highlightAlerts]);

  const filteredActivity = useMemo(() => {
    return memberActivity.filter((member) => {
      if (activityFilter === "All") {
        return true;
      }
      if (activityFilter === "Attention") {
        return member.status !== "Active";
      }
      return member.status === activityFilter;
    });
  }, [activityFilter]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-72 flex-col gap-6 border-r border-zinc-200 bg-white px-6 py-8 lg:flex">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Flits Access
            </p>
            <h2 className="text-xl font-semibold">Operations Hub</h2>
            <p className="text-xs text-zinc-500">
              Manage every entry point with fast validation workflows.
            </p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant={activeNav === item.label ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveNav(item.label)}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="ml-auto text-xs text-zinc-400">{item.hint}</span>
              </Button>
            ))}
          </nav>
          <Card className="border-zinc-200 bg-zinc-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick actions</CardTitle>
              <CardDescription>Jump to the most used flows.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button size="sm" className="w-full">
                New check-in
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Add member
              </Button>
              <Button size="sm" variant="ghost" className="w-full">
                Review limits
              </Button>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
            <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">
                  {activeNav}
                </Badge>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Entry Operations Overview
                </h1>
                <p className="max-w-2xl text-sm text-zinc-500">
                  Real-time visibility into member access, attendance, and rule compliance. Payment
                  processing is handled externally—Flits Access focuses on frictionless entry.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Today", "Week", "Month"].map((range) => (
                  <Button
                    key={range}
                    variant={activeRange === range ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveRange(range)}
                  >
                    {range}
                  </Button>
                ))}
                <Button variant="outline">Export attendance</Button>
                <Button>New check-in</Button>
              </div>
            </header>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveStat(item.label)}
                  className={cn(
                    "text-left",
                    activeStat === item.label && "ring-2 ring-zinc-900 ring-offset-2"
                  )}
                >
                  <Card className="border-zinc-200">
                    <CardHeader className="pb-3">
                      <CardDescription>{item.label}</CardDescription>
                      <CardTitle className="text-2xl text-zinc-900">{item.value}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between text-xs text-zinc-500">
                      <span
                        className={cn(
                          "font-medium",
                          item.trend === "up" ? "text-emerald-600" : "text-rose-500"
                        )}
                      >
                        {item.change}
                      </span>
                      <span>{item.note}</span>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>Live check-in validation</CardTitle>
                      <CardDescription>
                        Validate membership access in real time without tying results to payment
                        status.
                      </CardDescription>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                      <Input
                        placeholder="Search member ID or name"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                      />
                      <Button className="h-10">Validate</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {["All", "Needs review", "Approved"].map((filter) => (
                      <Button
                        key={filter}
                        size="sm"
                        variant={queueFilter === filter ? "secondary" : "outline"}
                        onClick={() => setQueueFilter(filter)}
                      >
                        {filter}
                      </Button>
                    ))}
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Switch
                        checked={highlightAlerts}
                        onCheckedChange={setHighlightAlerts}
                      />
                      Highlight exceptions
                    </div>
                  </div>
                  <div className="space-y-4">
                    {filteredQueue.map((member) => (
                      <button
                        key={member.memberId}
                        type="button"
                        onClick={() => setSelectedMemberId(member.memberId)}
                        className={cn(
                          "w-full rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 text-left transition hover:border-zinc-200",
                          selectedMemberId === member.memberId &&
                            "border-zinc-300 bg-white shadow-sm"
                        )}
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-zinc-900">
                              {member.name}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {member.memberId} · {member.plan}
                            </p>
                            <p className="text-xs text-zinc-400">{member.lastVisit}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                                badgeStyles[member.status]
                              }`}
                            >
                              {member.status === "approved"
                                ? "Access granted"
                                : member.status === "review"
                                  ? "Needs review"
                                  : "Limit reached"}
                            </span>
                            <span className="text-xs text-zinc-400">{member.time}</span>
                            <Button size="sm" variant="outline">
                              Open profile
                            </Button>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Access rules snapshot</CardTitle>
                  <CardDescription>
                    Plans and eligibility windows currently enforced across the studio.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {accessRules.map((rule) => (
                    <div key={rule.plan} className="space-y-3 rounded-xl border border-zinc-100 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-zinc-900">{rule.plan}</p>
                        <Badge variant="secondary">{rule.renewal}</Badge>
                      </div>
                      <p className="text-xs text-zinc-500">{rule.rules}</p>
                      <Progress value={rule.utilizationPercent} />
                      <p className="text-xs text-zinc-400">{rule.utilization}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Member activity</CardTitle>
                      <CardDescription>Recent check-ins and access status.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {["All", "Attention", "Active"].map((filter) => (
                        <Button
                          key={filter}
                          size="sm"
                          variant={activityFilter === filter ? "secondary" : "outline"}
                          onClick={() => setActivityFilter(filter)}
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredActivity.map((member) => (
                    <div key={member.memberId} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">{member.name}</p>
                        <p className="text-xs text-zinc-500">
                          {member.plan} · {member.lastVisit}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                          badgeStyles[member.status]
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance analytics</CardTitle>
                  <CardDescription>
                    Metrics derived from access events and attendance logs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {analytics.map((item) => (
                    <div key={item.label} className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4">
                      <p className="text-xs text-zinc-500">{item.label}</p>
                      <p className="mt-2 text-base font-semibold text-zinc-900">{item.value}</p>
                      <p className="mt-1 text-xs text-zinc-400">{item.detail}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Open analytics workspace
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
