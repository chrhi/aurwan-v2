"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
} from "lucide-react"

interface SalesData {
  date: string
  amount: number
}

interface StoreStats {
  totalRevenue: number
  revenueChange: number
  orders: number
  ordersChange: number
  customers: number
  customersChange: number
  products: number
  productsChange: number
  salesHistory: SalesData[]
}

interface DashboardProps {
  data: StoreStats
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
  }: {
    title: string
    value: string | number
    change: number
    icon: React.ComponentType
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1">
          {change > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <span
            className={`text-sm ${change > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {Math.abs(change)}%
          </span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          change={data.revenueChange}
          icon={DollarSign}
        />
        <StatCard
          title="Orders"
          value={data.orders}
          change={data.ordersChange}
          icon={ShoppingCart}
        />
        <StatCard
          title="Customers"
          value={data.customers}
          change={data.customersChange}
          icon={Users}
        />
        <StatCard
          title="Products"
          value={data.products}
          change={data.productsChange}
          icon={Package}
        />
      </div>

      <Card className="p-4">
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString()
                  }
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
