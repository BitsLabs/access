const stats = [
  {
    label: "Active members",
    value: "1,284",
    change: "+6.2%",
    note: "vs last 30 days",
  },
  {
    label: "Check-ins today",
    value: "214",
    change: "+12",
    note: "compared to yesterday",
  },
  {
    label: "Access validations",
    value: "98.6%",
    change: "-0.4%",
    note: "success rate",
  },
  {
    label: "Plans at limit",
    value: "38",
    change: "+4",
    note: "need staff review",
  },
];

const checkInQueue = [
  {
    name: "Amara Patel",
    memberId: "FLT-2041",
    plan: "Unlimited Monthly",
    status: "approved",
    time: "09:12 AM",
  },
  {
    name: "Jonas Reed",
    memberId: "FLT-1187",
    plan: "6-Class Weekly",
    status: "limit-reached",
    time: "09:14 AM",
  },
  {
    name: "Linh Nguyen",
    memberId: "FLT-3093",
    plan: "Weekday Access",
    status: "approved",
    time: "09:18 AM",
  },
];

const accessRules = [
  {
    plan: "Unlimited Monthly",
    rules: "Unlimited check-ins · All classes",
    utilization: "74% avg attendance",
    renewal: "Renews Nov 20",
  },
  {
    plan: "6-Class Weekly",
    rules: "Up to 6 check-ins/week",
    utilization: "92% utilization",
    renewal: "Renews Nov 18",
  },
  {
    plan: "Weekday Access",
    rules: "Mon–Fri only · No weekends",
    utilization: "68% utilization",
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
  "limit-reached": "bg-rose-50 text-rose-600 border-rose-100",
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Limit nearing": "bg-amber-50 text-amber-700 border-amber-100",
  Expired: "bg-zinc-100 text-zinc-500 border-zinc-200",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-500">Flits Access · Staff Dashboard</p>
            <h1 className="text-3xl font-semibold tracking-tight">Entry Operations Overview</h1>
            <p className="max-w-2xl text-sm text-zinc-500">
              Real-time visibility into member access, attendance, and rule compliance. Payment
              processing is handled externally—Flits Access focuses on frictionless entry.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900">
              Export attendance
            </button>
            <button className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800">
              New check-in
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-zinc-500">{item.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl font-semibold text-zinc-900">{item.value}</p>
                <span className="text-sm font-medium text-emerald-600">{item.change}</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">{item.note}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Live check-in validation</h2>
                <p className="text-sm text-zinc-500">
                  Validate membership access in real time without tying results to payment status.
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <input
                  className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none"
                  placeholder="Search member ID or name"
                />
                <button className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white">
                  Validate
                </button>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {checkInQueue.map((member) => (
                <div
                  key={member.memberId}
                  className="flex flex-col gap-3 rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{member.name}</p>
                    <p className="text-xs text-zinc-500">
                      {member.memberId} · {member.plan}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                        badgeStyles[member.status]
                      }`}
                    >
                      {member.status === "approved" ? "Access granted" : "Limit reached"}
                    </span>
                    <span className="text-xs text-zinc-400">{member.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Access rules snapshot</h2>
            <p className="text-sm text-zinc-500">
              Plans and eligibility windows currently enforced across the studio.
            </p>
            <div className="mt-6 space-y-4">
              {accessRules.map((rule) => (
                <div key={rule.plan} className="space-y-2 rounded-xl border border-zinc-100 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-zinc-900">{rule.plan}</p>
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                      {rule.renewal}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{rule.rules}</p>
                  <p className="text-xs text-zinc-400">{rule.utilization}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Member activity</h2>
                <p className="text-sm text-zinc-500">Recent check-ins and access status.</p>
              </div>
              <button className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
                View all
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {memberActivity.map((member) => (
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
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Attendance analytics</h2>
            <p className="text-sm text-zinc-500">
              Metrics derived from access events and attendance logs.
            </p>
            <div className="mt-6 grid gap-4">
              {analytics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4"
                >
                  <p className="text-xs text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-base font-semibold text-zinc-900">{item.value}</p>
                  <p className="mt-1 text-xs text-zinc-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
