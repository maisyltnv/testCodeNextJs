"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Search, X } from "lucide-react"

// Mock data based on the dashboard image
const timestampData = [
  { timestamp: "August 29, 2025 6:01:28", countryCode: "US" },
  { timestamp: "August 29, 2025 5:59:40", countryCode: "NZ" },
  { timestamp: "August 29, 2025 5:59:27", countryCode: "US" },
  { timestamp: "August 29, 2025 5:54:13", countryCode: "US" },
  { timestamp: "August 29, 2025 5:51:26", countryCode: "US" },
  { timestamp: "August 29, 2025 5:50:11", countryCode: "IN" },
]

const citiesData = [
  { name: "Other", value: 201, percentage: 24.97, color: "#14b8a6" },
  { name: "Portland", value: 147, percentage: 18.26, color: "#a855f7" },
  { name: "Ashburn", value: 133, percentage: 16.52, color: "#f97316" },
  { name: "Tokyo", value: 109, percentage: 13.54, color: "#3b82f6" },
  { name: "London", value: 29, percentage: 3.6, color: "#7c3aed" },
  { name: "Bengaluru", value: 20, percentage: 2.48, color: "#22c55e" },
  { name: "Sydney", value: 20, percentage: 2.48, color: "#f97316" },
  { name: "Osaka", value: 17, percentage: 2.11, color: "#1e40af" },
  { name: "Hyderabad", value: 15, percentage: 1.86, color: "#c084fc" },
  { name: "Mumbai", value: 15, percentage: 1.86, color: "#3b82f6" },
  { name: "Singapore", value: 15, percentage: 1.86, color: "#f97316" },
  { name: "Dublin", value: 12, percentage: 1.49, color: "#16a34a" },
  { name: "San Francisco", value: 12, percentage: 1.49, color: "#3b82f6" },
  { name: "Melbourne", value: 10, percentage: 1.24, color: "#14b8a6" },
]

const trafficData = [
  { name: "US", value: 127000, percentage: 60.6, color: "#f97316" },
  { name: "JP", value: 23100, percentage: 11.05, color: "#14b8a6" },
  { name: "Other", value: 21800, percentage: 10.44, color: "#16a34a" },
  { name: "GB", value: 10300, percentage: 4.92, color: "#3b82f6" },
  { name: "IN", value: 10000, percentage: 4.8, color: "#7c3aed" },
  { name: "AU", value: 3920, percentage: 1.88, color: "#22c55e" },
  { name: "IE", value: 3400, percentage: 1.63, color: "#1e40af" },
  { name: "BR", value: 3030, percentage: 1.45, color: "#c084fc" },
]

const countryMetrics = [
  { country: "US", value: 126000 },
  { country: "JP", value: 23000 },
  { country: "GB", value: 10300 },
  { country: "IN", value: 9880 },
  { country: "AU", value: 3920 },
  { country: "IE", value: 3390 },
  { country: "BR", value: 3000 },
  { country: "SG", value: 2430 },
  { country: "CA", value: 2260 },
  { country: "DE", value: 2050 },
]

// Generate load time data for the past 24 hours
const generateLoadTimeData = () => {
  const countries = ["TT", "NI", "ET", "NG", "ZA", "AZ", "LB", "UZ", "MA", "JO"]
  const hours = Array.from({ length: 24 }, (_, i) => {
    const date = new Date()
    date.setHours(date.getHours() - (23 - i))
    return date
  })

  return hours.map((hour) => {
    const dataPoint: any = {
      time: hour.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
    }
    countries.forEach((country) => {
      dataPoint[country] = Math.floor(Math.random() * 160)
    })
    return dataPoint
  })
}

const loadTimeData = generateLoadTimeData()

const citiesChartConfig = {
  Other: { label: "Other", color: "#14b8a6" },
  Portland: { label: "Portland", color: "#a855f7" },
  Ashburn: { label: "Ashburn", color: "#f97316" },
  Tokyo: { label: "Tokyo", color: "#3b82f6" },
  London: { label: "London", color: "#7c3aed" },
  Bengaluru: { label: "Bengaluru", color: "#22c55e" },
}

const trafficChartConfig = {
  US: { label: "US", color: "#f97316" },
  JP: { label: "JP", color: "#14b8a6" },
  Other: { label: "Other", color: "#16a34a" },
  GB: { label: "GB", color: "#3b82f6" },
  IN: { label: "IN", color: "#7c3aed" },
  AU: { label: "AU", color: "#22c55e" },
  IE: { label: "IE", color: "#1e40af" },
  BR: { label: "BR", color: "#c084fc" },
}

const loadTimeChartConfig = {
  TT: { label: "TT", color: "#3b82f6" },
  NI: { label: "NI", color: "#8b5cf6" },
  ET: { label: "ET", color: "#ec4899" },
  NG: { label: "NG", color: "#f59e0b" },
  ZA: { label: "ZA", color: "#10b981" },
  AZ: { label: "AZ", color: "#ef4444" },
  LB: { label: "LB", color: "#06b6d4" },
  UZ: { label: "UZ", color: "#f97316" },
  MA: { label: "MA", color: "#a855f7" },
  JO: { label: "JO", color: "#14b8a6" },
}

export function MonitoringDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>(["countryCode", "listOfString"])

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)} k`
    }
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">test-template variables</h1>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            Tags
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            Teams
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            Default (UTC)
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            Edit
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            Share
          </Button>
          <Button size="sm" className="h-8">
            Add widget
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b">
        {activeFilters.map((filter) => (
          <Badge key={filter} variant="secondary" className="gap-1 px-2 py-1">
            {filter}
            <span className="text-xs">Not included</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-3 w-3 p-0 hover:bg-transparent"
              onClick={() => removeFilter(filter)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        <Input
          placeholder="Search for any attribute or value"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs h-8"
        />
      </div>

      {/* Dashboard Widgets Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timestamp and Country Code Table */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Since 1 hour ago</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Country Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timestampData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs">{row.timestamp}</TableCell>
                    <TableCell className="text-xs font-medium">{row.countryCode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Most Active Cities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Most Active Cities</CardTitle>
            <CardDescription>Since 1 hour ago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex-1">
                <ChartContainer config={citiesChartConfig} className="h-[200px]">
                  <PieChart>
                    <Pie
                      data={citiesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {citiesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs text-muted-foreground mb-2">Sessions (805)*</p>
                {citiesData.slice(0, 10).map((city, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: city.color }}
                    />
                    <span className="flex-1">{city.name}</span>
                    <span className="text-muted-foreground">{city.value}</span>
                    <span className="text-muted-foreground">({city.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              This pie chart uses uniqueCount, which may result in the facet sum exceeding 100%. Learn more in our
              documentation.
            </p>
          </CardContent>
        </Card>

        {/* Load Time by Country */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Load Time by Country</CardTitle>
            <CardDescription>Since 1 day ago</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={loadTimeChartConfig} className="h-[300px]">
              <LineChart data={loadTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                  interval={3}
                />
                <YAxis
                  domain={[0, 160]}
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                {Object.keys(loadTimeChartConfig).map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={loadTimeChartConfig[key as keyof typeof loadTimeChartConfig].color}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Traffic by Origin */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic by Origin</CardTitle>
            <CardDescription>Since 1 week ago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex-1">
                <ChartContainer config={trafficChartConfig} className="h-[250px]">
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-xs text-muted-foreground mb-2">Counts (209 k)</p>
                {trafficData.map((country, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: country.color }}
                    />
                    <span className="flex-1 font-medium">{country.name}</span>
                    <span className="text-muted-foreground">{formatNumber(country.value)}</span>
                    <span className="text-muted-foreground">({country.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Country Metrics */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Since 1 week ago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {countryMetrics.map((metric, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="text-2xl font-bold">{formatNumber(metric.value)}</div>
                  <div className="text-xs text-muted-foreground">{metric.country}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

