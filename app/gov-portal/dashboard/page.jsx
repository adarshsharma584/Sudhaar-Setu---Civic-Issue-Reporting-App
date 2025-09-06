"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, CheckCircle, Clock, AlertTriangle, Upload, Eye, MessageSquare, Edit, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function GovDashboardPage() {
  const [officer, setOfficer] = useState(null)
  const [issues, setIssues] = useState([])
  const [filteredIssues, setFilteredIssues] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [resolvedImage, setResolvedImage] = useState("")
  const [resolvedComment, setResolvedComment] = useState("")
  const [replyText, setReplyText] = useState("")
  const [showReplyDialog, setShowReplyDialog] = useState(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [showResolutionDialog, setShowResolutionDialog] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const router = useRouter()
  const { language, translations } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const officerData = localStorage.getItem("currentGovOfficer")
    if (!officerData) {
      router.push("/gov-portal")
      return
    }

    const officer = JSON.parse(officerData)
    setOfficer(officer)

    // Get issues from localStorage
    const allIssues = JSON.parse(localStorage.getItem("issues") || "[]")

    // Filter issues by officer's department and prioritize by city
    const departmentIssues = allIssues.filter((issue) => issue.category === officer.department)

    // Sort by city (officer's city first) and then by creation date
    const sortedIssues = departmentIssues.sort((a, b) => {
      if (a.city === officer.city && b.city !== officer.city) return -1
      if (a.city !== officer.city && b.city === officer.city) return 1
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    setIssues(sortedIssues)
    setFilteredIssues(sortedIssues)
  }, [router])

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

    setFilteredIssues(filtered)
  }, [issues, searchQuery, selectedStatus, selectedCategory])

  const handleStatusChange = () => {
    if (!selectedIssue || !newStatus) return

    const allIssues = JSON.parse(localStorage.getItem("issues") || "[]")
    const updatedIssues = allIssues.map((issue) => {
      if (issue.id === selectedIssue.id) {
        return {
          ...issue,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          updatedBy: officer.id,
          resolvedImage: newStatus === "resolved" ? resolvedImage : issue.resolvedImage,
          resolvedComment: newStatus === "resolved" ? resolvedComment : issue.resolvedComment,
        }
      }
      return issue
    })

    localStorage.setItem("issues", JSON.stringify(updatedIssues))

    // Update local state
    const departmentIssues = updatedIssues.filter((issue) => issue.category === officer.department)
    const sortedIssues = departmentIssues.sort((a, b) => {
      if (a.city === officer.city && b.city !== officer.city) return -1
      if (a.city !== officer.city && b.city === officer.city) return 1
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    setIssues(sortedIssues)
    setSelectedIssue(null)
    setResolvedImage("")
    setResolvedComment("")
    setShowStatusDialog(false)
    setNewStatus("")
  }

  const handleAddReply = () => {
    if (!replyText.trim() || !selectedIssue) return

    const allIssues = JSON.parse(localStorage.getItem("issues") || "[]")
    const updatedIssues = allIssues.map((issue) => {
      if (issue.id === selectedIssue.id) {
        const newReply = {
          id: Date.now(),
          text: replyText,
          officerId: officer.id,
          officerName: officer.name,
          createdAt: new Date().toISOString(),
        }
        return {
          ...issue,
          replies: [...(issue.replies || []), newReply],
          updatedAt: new Date().toISOString(),
        }
      }
      return issue
    })

    localStorage.setItem("issues", JSON.stringify(updatedIssues))

    // Update local state
    const departmentIssues = updatedIssues.filter((issue) => issue.category === officer.department)
    const sortedIssues = departmentIssues.sort((a, b) => {
      if (a.city === officer.city && b.city !== officer.city) return -1
      if (a.city !== officer.city && b.city === officer.city) return 1
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    setIssues(sortedIssues)
    setReplyText("")
    setShowReplyDialog(false)
    setSelectedIssue(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setResolvedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const openStatusDialog = (issue) => {
    setSelectedIssue(issue)
    setNewStatus(issue.status)
    setResolvedImage("")
    setResolvedComment("")
    setShowStatusDialog(true)
  }

  const openReplyDialog = (issue) => {
    setSelectedIssue(issue)
    setReplyText("")
    setShowReplyDialog(true)
  }

  const openResolutionDialog = (issue) => {
    setSelectedIssue(issue)
    setShowResolutionDialog(true)
  }

  if (!officer) {
    return <div>Loading...</div>
  }

  const stats = [
    {
      title: "Total Issues",
      value: issues.length,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Pending",
      value: issues.filter((issue) => issue.status === "pending").length,
      icon: Clock,
      color: "text-red-600",
    },
    {
      title: "In Progress",
      value: issues.filter((issue) => issue.status === "in-progress").length,
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Resolved",
      value: issues.filter((issue) => issue.status === "resolved").length,
      icon: CheckCircle,
      color: "text-green-600",
    },
  ]

  const categories = [
    { value: "roads", label: "Roads & Infrastructure" },
    { value: "water", label: "Water Supply" },
    { value: "electricity", label: "Electricity" },
    { value: "cleanliness", label: "Sanitation & Cleanliness" },
  ]

  const statuses = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Officer Profile Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={officer.profilePhoto || "/placeholder.svg"} alt={officer.name} />
                  <AvatarFallback className="text-2xl">{officer.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{officer.name}</CardTitle>
                  <CardDescription className="text-lg">{officer.post}</CardDescription>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline">{officer.department}</Badge>
                    <Badge variant="outline">ID: {officer.officialId}</Badge>
                    <Badge variant="outline">City: {officer.city}</Badge>
                  </div>
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

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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

        {/* Issues List */}
        <div className="grid gap-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{issue.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {issue.address}, {issue.city}
                      {issue.city === officer.city && (
                        <Badge variant="secondary" className="ml-2">
                          Your City
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{issue.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>Reported by: {issue.reporterName}</span>
                      <span>Votes: {issue.votes}</span>
                      <span>Date: {new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Replies Section */}
                    {issue.replies && issue.replies.length > 0 && (
                      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium mb-2">Officer Replies:</h4>
                        <div className="space-y-2">
                          {issue.replies.map((reply) => (
                            <div key={reply.id} className="text-sm">
                              <p className="font-medium">{reply.officerName}:</p>
                              <p className="text-gray-600 dark:text-gray-400">{reply.text}</p>
                              <p className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {issue.images && issue.images[0] && (
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                        <img
                          src={issue.images[0] || "/placeholder.svg"}
                          alt={issue.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {/* Status Change Button */}
                      <Button size="sm" variant="outline" onClick={() => openStatusDialog(issue)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Change Status
                      </Button>

                      {/* Reply Button */}
                      <Button size="sm" variant="outline" onClick={() => openReplyDialog(issue)}>
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply
                      </Button>

                      {/* View Resolution Button */}
                      {issue.status === "resolved" && (issue.resolvedImage || issue.resolvedComment) && (
                        <Button size="sm" variant="outline" onClick={() => openResolutionDialog(issue)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Resolution
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No issues found</h3>
            <p className="text-gray-600 dark:text-gray-400">No issues match your current filters or search criteria.</p>
          </div>
        )}

        {/* Status Change Dialog */}
        <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Status</DialogTitle>
              <DialogDescription>{selectedIssue?.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              {newStatus === "resolved" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Resolution Photo</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="resolved-image"
                      />
                      <label htmlFor="resolved-image" className="cursor-pointer">
                        {resolvedImage ? (
                          <img
                            src={resolvedImage || "/placeholder.svg"}
                            alt="Resolution"
                            className="w-full h-32 object-cover rounded"
                          />
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload photo</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Resolution Comment</label>
                    <Textarea
                      placeholder="Describe how the issue was resolved..."
                      value={resolvedComment}
                      onChange={(e) => setResolvedComment(e.target.value)}
                      rows={3}
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-2">
                <Button
                  onClick={handleStatusChange}
                  className="flex-1"
                  disabled={newStatus === "resolved" && (!resolvedImage || !resolvedComment)}
                >
                  Update Status
                </Button>
                <Button variant="outline" onClick={() => setShowStatusDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reply Dialog */}
        <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reply to Issue</DialogTitle>
              <DialogDescription>{selectedIssue?.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your reply to the citizen..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
              />
              <div className="flex space-x-2">
                <Button onClick={handleAddReply} className="flex-1" disabled={!replyText.trim()}>
                  Add Reply
                </Button>
                <Button variant="outline" onClick={() => setShowReplyDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedIssue.address}, {selectedIssue.city}
                      {selectedIssue.city === officer?.city && (
                        <Badge variant="secondary" className="ml-2">
                          Your City
                        </Badge>
                      )}
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
                        {selectedIssue.updatedBy && (
                          <span className="ml-2">by Officer ID: {selectedIssue.updatedBy}</span>
                        )}
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
