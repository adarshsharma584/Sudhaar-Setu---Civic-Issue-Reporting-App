"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, ThumbsUp, Calendar } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import dynamic from "next/dynamic"

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import("@/components/map-component"), { ssr: false })

export default function MapPage() {
  const [issues, setIssues] = useState([])
  const [filteredIssues, setFilteredIssues] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { language, translations } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    // Load issues from localStorage with sample data
    const storedIssues = JSON.parse(localStorage.getItem("issues") || "[]")

    // Add sample issues if none exist
    if (storedIssues.length === 0) {
      const sampleIssues = [
        {
          id: 1,
          title: "Large pothole on MG Road causing traffic issues",
          description:
            "There is a large pothole on MG Road that is causing severe traffic problems and vehicle damage.",
          category: "roads",
          address: "MG Road, Near Metro Station",
          city: "Delhi",
          status: "pending",
          votes: 45,
          votedBy: [],
          images: ["/placeholder.svg?height=200&width=300"],
          reportedBy: 1,
          reporterName: "Citizen User",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          title: "Water pipe leakage flooding the street",
          description: "Major water pipe burst causing flooding and water wastage on the main road.",
          category: "water",
          address: "Sector 15, Main Road",
          city: "Gurgaon",
          status: "in-progress",
          votes: 32,
          votedBy: [],
          images: ["/placeholder.svg?height=200&width=300"],
          reportedBy: 2,
          reporterName: "Another User",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          title: "Street light not working for weeks",
          description: "The street light has been non-functional for several weeks, creating safety concerns.",
          category: "electricity",
          address: "Park Street, Near Hospital",
          city: "Kolkata",
          status: "resolved",
          votes: 28,
          votedBy: [],
          images: ["/placeholder.svg?height=200&width=300"],
          reportedBy: 3,
          reporterName: "Community Member",
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          resolvedImage: "/placeholder.svg?height=200&width=300",
        },
        {
          id: 4,
          title: "Garbage not collected for days",
          description: "Garbage has been piling up for several days, creating hygiene issues.",
          category: "cleanliness",
          address: "Residential Area, Block A",
          city: "Mumbai",
          status: "pending",
          votes: 67,
          votedBy: [],
          images: ["/placeholder.svg?height=200&width=300"],
          reportedBy: 4,
          reporterName: "Local Resident",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 5,
          title: "Broken footpath causing accidents",
          description: "The footpath is severely damaged and causing pedestrian accidents.",
          category: "roads",
          address: "Commercial Street",
          city: "Bangalore",
          status: "in-progress",
          votes: 23,
          votedBy: [],
          images: ["/placeholder.svg?height=200&width=300"],
          reportedBy: 5,
          reporterName: "Safety Advocate",
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]
      localStorage.setItem("issues", JSON.stringify(sampleIssues))
      setIssues(sampleIssues)
      setFilteredIssues(sampleIssues)
    } else {
      setIssues(storedIssues)
      setFilteredIssues(storedIssues)
    }
  }, [])

  useEffect(() => {
    // Filter issues based on search and filters
    let filtered = issues

    if (searchQuery) {
      filtered = filtered.filter(
        (issue) =>
          issue.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCity && selectedCity !== "all") {
      filtered = filtered.filter((issue) => issue.city.toLowerCase() === selectedCity.toLowerCase())
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((issue) => issue.category === selectedCategory)
    }

    // Sort by city (officer's city first), then by creation date (newest first)
    filtered.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1
      if (a.status !== "pending" && b.status === "pending") return 1
      return b.votes - a.votes
    })

    setFilteredIssues(filtered)
  }, [issues, searchQuery, selectedCity, selectedCategory])

  const handleVote = (issueId) => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!user.id) return

    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        if (issue.votedBy?.includes(user.id)) {
          return {
            ...issue,
            votes: issue.votes - 1,
            votedBy: issue.votedBy.filter((id) => id !== user.id),
          }
        } else {
          return {
            ...issue,
            votes: issue.votes + 1,
            votedBy: [...(issue.votedBy || []), user.id],
          }
        }
      }
      return issue
    })

    setIssues(updatedIssues)
    localStorage.setItem("issues", JSON.stringify(updatedIssues))
  }

  const cities = [...new Set(issues.map((issue) => issue.city))].filter(Boolean)
  const categories = [
    { value: "roads", label: t.roads },
    { value: "water", label: t.water },
    { value: "electricity", label: t.electricity },
    { value: "cleanliness", label: t.cleanliness },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            {t.issueMap}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore civic issues in your area and support community initiatives
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by address, city, or issue title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <MapComponent issues={filteredIssues} />
            </CardContent>
          </Card>

          {/* Issues List */}
          <Card>
            <CardHeader>
              <CardTitle>Issues ({filteredIssues.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredIssues.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No issues found</p>
                  </div>
                ) : (
                  filteredIssues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                          {issue.images && issue.images[0] && (
                            <img
                              src={issue.images[0] || "/placeholder.svg"}
                              alt={issue.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{issue.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {issue.address}, {issue.city}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
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
                              <Badge variant="outline">{issue.category}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVote(issue.id)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {issue.votes}
                              </Button>
                              <span className="text-xs text-gray-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(issue.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
