import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "$99",
    description: "Perfect for small conferences",
    features: ["Up to 100 attendees", "Basic analytics", "Email support", "1 admin user"],
  },
  {
    name: "Pro",
    price: "$299",
    description: "Ideal for medium-sized events",
    features: [
      "Up to 500 attendees",
      "Advanced analytics",
      "Priority email support",
      "5 admin users",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale conferences",
    features: [
      "Unlimited attendees",
      "Real-time analytics",
      "24/7 phone support",
      "Unlimited admin users",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
]

export default function Pricing() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Pricing Plans</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your conference management needs
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="flex flex-col justify-between border-2 border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">{plan.name}</CardTitle>
                <CardDescription className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.name !== "Enterprise" && (
                    <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
                  )}
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {plan.name === "Enterprise" ? "Contact us" : "Get started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

