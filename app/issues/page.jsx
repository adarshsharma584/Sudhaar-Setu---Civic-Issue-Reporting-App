"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Search, ThumbsUp, Calendar, Eye, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function IssuesPage() {
  const [issues, setIssues] = useState([])
  const [filteredIssues, setFilteredIssues] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [showResolutionDialog, setShowResolutionDialog] = useState(false)
  const { language, translations } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    // Load issues from localStorage with some sample data
    const storedIssues = JSON.parse(localStorage.getItem("issues") || "[]")
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

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
          replies: [],
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
          replies: [],
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
          resolvedComment:
            "The street light has been fixed and is now working properly. Thank you for reporting this issue.",
          replies: [
            {
              id: 1,
              text: "The street light has been fixed and is now working properly. Thank you for reporting this issue.",
              officerId: 1,
              officerName: "Municipal Officer",
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
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
          replies: [],
        },
        {
          id: 5,
          title: "Broken footpath causing accidents",
          description: "The footpath is severely damaged and causing pedestrian accidents.",
          category: "roads",
          address: "Commercial Street",
          city: "Bangalore",
          status: "resolved",
          votes: 23,
          votedBy: [],
          images: ["/placeholder.svg?height=200&width=300"],
          reportedBy: 5,
          reporterName: "Safety Advocate",
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          resolvedImage: "/placeholder.svg?height=200&width=300",
          resolvedComment:
            "The footpath has been completely repaired with new concrete. Safety barriers have also been installed.",
          replies: [
            {
              id: 2,
              text: "Work has been completed. The footpath is now safe for pedestrians.",
              officerId: 2,
              officerName: "Roads Department Officer",
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
        },
      ]
      localStorage.setItem("issues", JSON.stringify(sampleIssues))

      // Sort by user's city first, then by votes
      const sortedIssues = sampleIssues.sort((a, b) => {
        if (currentUser.city && a.city === currentUser.city && b.city !== currentUser.city) return -1
        if (currentUser.city && a.city !== currentUser.city && b.city === currentUser.city) return 1
        return b.votes - a.votes
      })

      setIssues(sortedIssues)
      setFilteredIssues(sortedIssues)
    } else {
      // Sort existing issues by user's city first, then by votes
      const sortedIssues = storedIssues.sort((a, b) => {
        if (currentUser.city && a.city === currentUser.city && b.city !== currentUser.city) return -1
        if (currentUser.city && a.city !== currentUser.city && b.city === currentUser.city) return 1
        return b.votes - a.votes
      })

      setIssues(sortedIssues)
      setFilteredIssues(sortedIssues)
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

    if (selectedStatus && selectedStatus !== "all") {
      filtered = filtered.filter((issue) => issue.status === selectedStatus)
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((issue) => issue.category === selectedCategory)
    }

    // Sort by votes (highest first)
    filtered.sort((a, b) => b.votes - a.votes)

    setFilteredIssues(filtered)
  }, [issues, searchQuery, selectedStatus, selectedCategory])

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

  const openResolutionDialog = (issue) => {
    setSelectedIssue(issue)
    setShowResolutionDialog(true)
  }

  const categories = [
    { value: "roads", label: t.roads },
    { value: "water", label: t.water },
    { value: "electricity", label: t.electricity },
    { value: "cleanliness", label: t.cleanliness },
  ]

  const statuses = [
    { value: "pending", label: t.pending },
    { value: "in-progress", label: t.inProgress },
    { value: "resolved", label: t.resolved },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            {t.allIssues}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Browse and support civic issues reported by your community</p>
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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
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

        {/* Issues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
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
                  <Badge variant="outline">{issue.category}</Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{issue.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  {issue.images && issue.images[0] && (
                    <img
                      src={issue.images[0] || "/placeholder.svg"}
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {issue.address}, {issue.city}
                  {JSON.parse(localStorage.getItem("currentUser") || "{}")?.city === issue.city && (
                    <Badge variant="secondary" className="ml-2">
                      Your City
                    </Badge>
                  )}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{issue.description}</p>

                {/* Officer Replies */}
                {issue.replies && issue.replies.length > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Officer Updates:</h4>
                    <div className="space-y-2">
                      {issue.replies.slice(-1).map((reply) => (
                        <div key={reply.id} className="text-sm">
                          <p className="font-medium text-blue-700 dark:text-blue-300">{reply.officerName}:</p>
                          <p className="text-blue-600 dark:text-blue-400">{reply.text}</p>
                          <p className="text-xs text-blue-500">{new Date(reply.createdAt).toLocaleString()}</p>
                        </div>
                      ))}
                      {issue.replies.length > 1 && (
                        <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                          View all {issue.replies.length} replies
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
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

                  {issue.status === "resolved" && issue.resolvedImage && (
                    <Button variant="outline" size="sm" onClick={() => openResolutionDialog(issue)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Resolution
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No issues found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
            <Link href="/report">
              <Button className="bg-gradient-to-r from-orange-500 to-green-600 text-white">Report New Issue</Button>
            </Link>
          </div>
        )}

        {/* Resolution Details Dialog */}
        <Dialog open={showResolutionDialog} onOpenChange={setShowResolutionDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Issue Resolution Details
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResolutionDialog(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription>{selectedIssue?.title}</DialogDescription>
            </DialogHeader>

            {selectedIssue && (
              <div className="space-y-6">
                {/* Issue Details */}
                <div>
                  <h3 className="font-semibold mb-2">Original Issue</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {selectedIssue.address}, {selectedIssue.city}
                    </p>
                    <p className="text-sm mb-3">{selectedIssue.description}</p>
                    {selectedIssue.images && selectedIssue.images[0] && (
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={selectedIssue.images[0] || "/placeholder.svg"}
                          alt="Original issue"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Resolution Details */}
                {selectedIssue.status === "resolved" && (
                  <div>
                    <h3 className="font-semibold mb-2">Resolution</h3>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      {selectedIssue.resolvedComment && (
                        <p className="text-sm mb-3 text-green-800 dark:text-green-200">
                          {selectedIssue.resolvedComment}
                        </p>
                      )}
                      {selectedIssue.resolvedImage && (
                        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={selectedIssue.resolvedImage || "/placeholder.svg"}
                            alt="Resolution"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="mt-3 text-xs text-green-600 dark:text-green-400">
                        Resolved on: {new Date(selectedIssue.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Officer Replies */}
                {selectedIssue.replies && selectedIssue.replies.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Officer Communications</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedIssue.replies.map((reply) => (
                        <div key={reply.id} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-blue-800 dark:text-blue-200">{reply.officerName}</span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {new Date(reply.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-blue-700 dark:text-blue-300">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Issue Stats */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Reported by: {selectedIssue.reporterName}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Votes: {selectedIssue.votes}</span>
                  </div>
                  <Badge
                    variant={
                      selectedIssue.status === "resolved"
                        ? "default"
                        : selectedIssue.status === "in-progress"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {selectedIssue.status}
                  </Badge>
                </div>

                {/* Close Button */}
                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={() => setShowResolutionDialog(false)} variant="outline">
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
