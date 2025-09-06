"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, CheckCircle, Clock, AlertTriangle, Camera } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export default function HomePage() {
  const { language, translations } = useLanguage()
  const t = translations[language]

  const stats = [
    { icon: AlertTriangle, label: t.totalIssues, value: "2,847", color: "text-orange-600" },
    { icon: Clock, label: t.inProgress, value: "156", color: "text-blue-600" },
    { icon: CheckCircle, label: t.resolved, value: "2,691", color: "text-green-600" },
    { icon: Users, label: t.activeUsers, value: "12,543", color: "text-purple-600" },
  ]

  const recentIssues = [
    {
      id: 1,
      title: t.potholeIssue,
      category: t.roads,
      location: "MG Road, Delhi",
      votes: 45,
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: t.waterLeakage,
      category: t.water,
      location: "Sector 15, Gurgaon",
      votes: 32,
      status: "in-progress",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: t.streetLight,
      category: t.electricity,
      location: "Park Street, Kolkata",
      votes: 28,
      status: "resolved",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Right Content - Hero Image */}
            <div className="order-2 lg:order-2 flex items-center justify-center">
              <div className="relative max-w-md w-full">
                <Image
                  src="/images/sudhaar-setu-hero.png"
                  alt="Sudhaar Setu - विचार से सुधार तक"
                  width={400}
                  height={500}
                  className="w-full h-auto max-h-[500px] object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Left Content - Text and Actions */}
            <div className="space-y-8 order-1 lg:order-1">
              <div>
                <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-green-600 text-white">
                  🏛️ {t.govInitiative}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  Sudhaar Setu
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">{t.heroSlogan}</p>
                <p className="text-lg text-gray-500 dark:text-gray-400">{t.heroDescription}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/report">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    {t.reportIssue}
                  </Button>
                </Link>
                <Link href="/map">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 px-8 py-3"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    {t.viewMap}
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-4 text-center">
                      <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.recentIssues}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t.recentIssuesDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentIssues.map((issue) => (
              <Card key={issue.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        issue.status === "resolved"
                          ? "default"
                          : issue.status === "in-progress"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {issue.status === "resolved"
                        ? t.resolved
                        : issue.status === "in-progress"
                          ? t.inProgress
                          : t.pending}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {issue.votes}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{issue.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {issue.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                    <Image
                      src={issue.image || "/placeholder.svg"}
                      alt={issue.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge variant="outline">{issue.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/issues">
              <Button variant="outline" size="lg">
                {t.viewAllIssues}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.howItWorks}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t.howItWorksDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.step1}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t.step1Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.step2}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t.step2Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.step3}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
