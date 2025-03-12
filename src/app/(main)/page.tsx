import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getAccountAction } from "@/actions/auth.actions";
// import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getAccountAction();

  // if (!user) {
  //   redirect("/sign-in");
  // }

  return (
    <>
      <Header title="Dashboard" />
      <MaxWidthWrapper className="mt-4 pb-16">
        <div className="w-full h-fit my-4 flex items-center justify-start ">
          <p className="font-bold text-2xl">
            hello {user?.firstName} , this is your dashboard{" "}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-gray-500">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-gray-500">+12.4% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,834</div>
              <p className="text-xs text-gray-500">+18.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+24.5%</div>
              <p className="text-xs text-gray-500">+4.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Chart placeholder - Import your preferred charting library
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Order ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Customer
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Status
                      </th>
                      <th className="h-12 px-4 text-right align-middle font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 align-middle">#12345</td>
                      <td className="p-4 align-middle">John Doe</td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="p-4 align-middle text-right">$123.45</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">#12346</td>
                      <td className="p-4 align-middle">Jane Smith</td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                          Processing
                        </span>
                      </td>
                      <td className="p-4 align-middle text-right">$234.56</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
