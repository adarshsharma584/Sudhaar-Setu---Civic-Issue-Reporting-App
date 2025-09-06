"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock, Camera } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [userIssues, setUserIssues] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const router = useRouter()
  const { language, translations } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (!userData) {
      router.push("/login")
      return
    }

    const user = JSON.parse(userData)
    setUser(user)

    // Get user's issues
    const issues = JSON.parse(localStorage.getItem("issues") || "[]")
    const userReportedIssues = issues.filter((issue) => issue.reportedBy === user.id)
    setUserIssues(userReportedIssues)

    // Get recent activity (all issues for demo)
    const recentIssues = issues.slice(-5).reverse()
    setRecentActivity(recentIssues)
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  const stats = [
    {
      title: "Issues Reported",
      value: userIssues.length,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Resolved Issues",
      value: userIssues.filter((issue) => issue.status === "resolved").length,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "In Progress",
      value: userIssues.filter((issue) => issue.status === "in-progress").length,
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Total Votes Received",
      value: userIssues.reduce((sum, issue) => sum + issue.votes, 0),
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* User Profile Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profilePhoto || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-lg">{user.email}</CardDescription>
                  <Badge variant="outline" className="mt-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Issues */}
          <Card>
            <CardHeader>
              <CardTitle>My Reported Issues</CardTitle>
              <CardDescription>Issues you have reported</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userIssues.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No issues reported yet</p>
                    <Link href="/report">
                      <Button className="mt-4 bg-gradient-to-r from-orange-500 to-green-600 text-white">
                        <Camera className="h-4 w-4 mr-2" />
                        Report Your First Issue
                      </Button>
                    </Link>
                  </div>
                ) : (
                  userIssues.slice(0, 5).map((issue) => (
                    <div key={issue.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {issue.images && issue.images[0] && (
                          <img
                            src={issue.images[0] || "/placeholder.svg"}
                            alt={issue.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{issue.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {issue.address}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={
                              issue.status === "resolved"
                                ? "default"
                                : issue.status === "in-progress"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {issue.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{issue.votes} votes</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest issues from your community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                ) : (
                  recentActivity.map((issue) => (
                    <div key={issue.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {issue.images && issue.images[0] && (
                          <img
                            src={issue.images[0] || "/placeholder.svg"}
                            alt={issue.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{issue.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {issue.address}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{issue.category}</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(issue.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/report">
                  <Button className="w-full h-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
                    <div className="text-center">
                      <Camera className="h-6 w-6 mx-auto mb-2" />
                      <span>Report New Issue</span>
                    </div>
                  </Button>
                </Link>
                <Link href="/map">
                  <Button variant="outline" className="w-full h-20">
                    <div className="text-center">
                      <MapPin className="h-6 w-6 mx-auto mb-2" />
                      <span>View Issue Map</span>
                    </div>
                  </Button>
                </Link>
                <Link href="/issues">
                  <Button variant="outline" className="w-full h-20">
                    <div className="text-center">
                      <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
                      <span>Browse All Issues</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
