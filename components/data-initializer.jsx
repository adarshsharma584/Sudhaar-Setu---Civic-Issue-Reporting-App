"use client"

import { useEffect } from "react"

// This component initializes sample data in localStorage if it doesn't exist
export default function DataInitializer() {
  useEffect(() => {
    initializeSampleData()
  }, [])

  return null // This component doesn't render anything
}

function initializeSampleData() {
  // Only initialize if data doesn't exist
  const hasInitialized = localStorage.getItem("dataInitialized")
  if (hasInitialized === "true") return

  // Initialize sample users if they don't exist
  if (!localStorage.getItem("users") || JSON.parse(localStorage.getItem("users") || "[]").length === 0) {
    const sampleUsers = [
      {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543210",
        username: "rahul",
        password: "password123",
        city: "Delhi",
        adhaar: "123456789012",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        name: "Priya Patel",
        email: "priya@example.com",
        phone: "8765432109",
        username: "priya",
        password: "password123",
        city: "Mumbai",
        adhaar: "234567890123",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        name: "Amit Kumar",
        email: "amit@example.com",
        phone: "7654321098",
        username: "amit",
        password: "password123",
        city: "Bangalore",
        adhaar: "345678901234",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 4,
        name: "Sneha Gupta",
        email: "sneha@example.com",
        phone: "6543210987",
        username: "sneha",
        password: "password123",
        city: "Kolkata",
        adhaar: "456789012345",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 5,
        name: "Vikram Singh",
        email: "vikram@example.com",
        phone: "5432109876",
        username: "vikram",
        password: "password123",
        city: "Chennai",
        adhaar: "567890123456",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
    localStorage.setItem("users", JSON.stringify(sampleUsers))
  }

  // Initialize sample government officers if they don't exist
  if (!localStorage.getItem("govOfficers") || JSON.parse(localStorage.getItem("govOfficers") || "[]").length === 0) {
    const sampleGovOfficers = [
      {
        id: 101,
        name: "Rajesh Kumar",
        govEmail: "rajesh@gov.in",
        phone: "9876543210",
        officialId: "GOV123456",
        password: "password123",
        department: "roads",
        post: "Senior Engineer",
        city: "Delhi",
        address: "Block A, Government Colony",
        pincode: "110001",
        adhaar: "123456789012",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 102,
        name: "Sunita Verma",
        govEmail: "sunita@gov.in",
        phone: "8765432109",
        officialId: "GOV234567",
        password: "password123",
        department: "water",
        post: "Water Resources Manager",
        city: "Mumbai",
        address: "Sector 7, Government Housing",
        pincode: "400001",
        adhaar: "234567890123",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 103,
        name: "Prakash Joshi",
        govEmail: "prakash@gov.in",
        phone: "7654321098",
        officialId: "GOV345678",
        password: "password123",
        department: "electricity",
        post: "Electrical Superintendent",
        city: "Bangalore",
        address: "Type 4, Government Quarters",
        pincode: "560001",
        adhaar: "345678901234",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 104,
        name: "Meena Kumari",
        govEmail: "meena@gov.in",
        phone: "6543210987",
        officialId: "GOV456789",
        password: "password123",
        department: "cleanliness",
        post: "Sanitation Officer",
        city: "Kolkata",
        address: "Staff Quarters, Municipal Building",
        pincode: "700001",
        adhaar: "456789012345",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 105,
        name: "Ramesh Patel",
        govEmail: "ramesh@gov.in",
        phone: "5432109876",
        officialId: "GOV567890",
        password: "password123",
        department: "roads",
        post: "Assistant Engineer",
        city: "Chennai",
        address: "Block C, PWD Colony",
        pincode: "600001",
        adhaar: "567890123456",
        profilePhoto: "/placeholder.svg?height=200&width=200",
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
    localStorage.setItem("govOfficers", JSON.stringify(sampleGovOfficers))
  }

  // Initialize sample issues if they don't exist
  if (!localStorage.getItem("issues") || JSON.parse(localStorage.getItem("issues") || "[]").length < 10) {
    const sampleIssues = [
      // Delhi - Roads (Updated with real images)
      {
        id: 1001,
        title: "Large pothole on MG Road causing traffic issues",
        description:
          "There is a large pothole on MG Road that is causing severe traffic problems and vehicle damage. Multiple accidents have been reported.",
        category: "roads",
        address: "MG Road, Near Metro Station",
        city: "Delhi",
        location: { lat: 28.6139, lng: 77.209 },
        status: "pending",
        votes: 45,
        votedBy: [1, 3, 5],
        images: ["/images/road-potholes-1.webp"],
        reportedBy: 1,
        reporterName: "Rahul Sharma",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
      },
      // Mumbai - Water (Updated with real images)
      {
        id: 1002,
        title: "Water pipe leakage flooding the street",
        description:
          "Major water pipe burst causing flooding and water wastage on the main road. Urgent attention needed.",
        category: "water",
        address: "Sector 15, Main Road",
        city: "Mumbai",
        location: { lat: 19.076, lng: 72.8777 },
        status: "in-progress",
        votes: 32,
        votedBy: [2, 4],
        images: ["/images/water-contamination.webp"],
        reportedBy: 2,
        reporterName: "Priya Patel",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 2001,
            text: "We have dispatched a team to assess the situation. Work will begin shortly.",
            officerId: 102,
            officerName: "Sunita Verma",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Bangalore - Electricity
      {
        id: 1003,
        title: "Street light not working for weeks",
        description:
          "The street light has been non-functional for several weeks, creating safety concerns for residents.",
        category: "electricity",
        address: "Park Street, Near Hospital",
        city: "Bangalore",
        location: { lat: 12.9716, lng: 77.5946 },
        status: "resolved",
        votes: 28,
        votedBy: [3],
        images: ["/placeholder.svg?height=200&width=300"],
        reportedBy: 3,
        reporterName: "Amit Kumar",
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        resolvedImage: "/placeholder.svg?height=200&width=300",
        resolvedComment:
          "The street light has been fixed and is now working properly. We replaced the faulty wiring and installed a new LED light for better illumination. Thank you for reporting this issue.",
        replies: [
          {
            id: 3001,
            text: "We have identified the issue with the street light. It requires rewiring.",
            officerId: 103,
            officerName: "Prakash Joshi",
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 3002,
            text: "The street light has been fixed and is now working properly. Thank you for reporting this issue.",
            officerId: 103,
            officerName: "Prakash Joshi",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Kolkata - Cleanliness
      {
        id: 1004,
        title: "Garbage not collected for days",
        description: "Garbage has been piling up for several days, creating hygiene issues and foul smell in the area.",
        category: "cleanliness",
        address: "Residential Area, Block A",
        city: "Kolkata",
        location: { lat: 22.5726, lng: 88.3639 },
        status: "pending",
        votes: 67,
        votedBy: [4, 1, 2, 3],
        images: ["/placeholder.svg?height=200&width=300"],
        reportedBy: 4,
        reporterName: "Sneha Gupta",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
      },
      // Chennai - Roads (Updated with real images)
      {
        id: 1005,
        title: "Broken footpath causing accidents",
        description:
          "The footpath is severely damaged and causing pedestrian accidents, especially dangerous for elderly.",
        category: "roads",
        address: "Commercial Street",
        city: "Chennai",
        location: { lat: 13.0827, lng: 80.2707 },
        status: "resolved",
        votes: 23,
        votedBy: [5],
        images: ["/images/road-potholes-2.webp"],
        reportedBy: 5,
        reporterName: "Vikram Singh",
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        resolvedImage: "/placeholder.svg?height=200&width=300",
        resolvedComment:
          "The footpath has been completely repaired with new concrete. Safety barriers have also been installed to prevent future damage.",
        replies: [
          {
            id: 5001,
            text: "Work has been completed. The footpath is now safe for pedestrians.",
            officerId: 105,
            officerName: "Ramesh Patel",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Delhi - Water (Updated with real images)
      {
        id: 1006,
        title: "Low water pressure in residential area",
        description:
          "Our entire residential block is experiencing very low water pressure for the past week. Daily activities are affected.",
        category: "water",
        address: "Vasant Kunj, Sector C",
        city: "Delhi",
        location: { lat: 28.5403, lng: 77.1586 },
        status: "in-progress",
        votes: 38,
        votedBy: [1, 2],
        images: ["/images/water-scarcity.webp"],
        reportedBy: 1,
        reporterName: "Rahul Sharma",
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 6001,
            text: "We have identified a blockage in the main supply line. Repair work has started.",
            officerId: 102,
            officerName: "Sunita Verma",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Mumbai - Electricity
      {
        id: 1007,
        title: "Frequent power cuts in business district",
        description:
          "Our business area is facing frequent power cuts throughout the day, affecting operations and causing losses.",
        category: "electricity",
        address: "Bandra Kurla Complex",
        city: "Mumbai",
        location: { lat: 19.0606, lng: 72.8362 },
        status: "pending",
        votes: 52,
        votedBy: [2, 3, 4],
        images: ["/placeholder.svg?height=200&width=300"],
        reportedBy: 2,
        reporterName: "Priya Patel",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
      },
      // Bangalore - Cleanliness
      {
        id: 1008,
        title: "Overflowing public dustbins",
        description:
          "Public dustbins in our tech park area are overflowing and not being cleared regularly, causing sanitation issues.",
        category: "cleanliness",
        address: "Electronic City, Phase 1",
        city: "Bangalore",
        location: { lat: 12.8399, lng: 77.6761 },
        status: "resolved",
        votes: 31,
        votedBy: [3, 5],
        images: ["/placeholder.svg?height=200&width=300"],
        reportedBy: 3,
        reporterName: "Amit Kumar",
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        resolvedImage: "/placeholder.svg?height=200&width=300",
        resolvedComment:
          "All dustbins have been cleared and a new daily cleaning schedule has been implemented. Additional bins have also been installed.",
        replies: [
          {
            id: 8001,
            text: "We have cleared all the dustbins and implemented a new daily cleaning schedule.",
            officerId: 104,
            officerName: "Meena Kumari",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Kolkata - Roads (Updated with real images)
      {
        id: 1009,
        title: "Dangerous road crossing without signals",
        description:
          "The intersection at Park Street and Camac Street has no traffic signals, causing dangerous situations for pedestrians.",
        category: "roads",
        address: "Park Street and Camac Street Junction",
        city: "Kolkata",
        location: { lat: 22.5551, lng: 88.3494 },
        status: "in-progress",
        votes: 47,
        votedBy: [4, 1],
        images: ["/images/road-potholes-3.webp"],
        reportedBy: 4,
        reporterName: "Sneha Gupta",
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 9001,
            text: "Traffic signal installation has been approved. Work will begin next week.",
            officerId: 101,
            officerName: "Rajesh Kumar",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Chennai - Water (Updated with real images)
      {
        id: 1010,
        title: "Contaminated water supply",
        description:
          "The water supply in our area has been contaminated for the past few days. It appears yellowish and has a strange odor.",
        category: "water",
        address: "Adyar, 3rd Main Road",
        city: "Chennai",
        location: { lat: 13.0012, lng: 80.2565 },
        status: "in-progress",
        votes: 78,
        votedBy: [5, 2, 3, 4],
        images: ["/images/water-pollution.webp"],
        reportedBy: 5,
        reporterName: "Vikram Singh",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 10001,
            text: "Water testing has been conducted. We've identified the source of contamination and are working on fixing it.",
            officerId: 102,
            officerName: "Sunita Verma",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Delhi - Electricity
      {
        id: 1011,
        title: "Exposed electrical wires in public park",
        description:
          "There are exposed electrical wires in the children's play area of the community park, posing a serious safety hazard.",
        category: "electricity",
        address: "Lodi Gardens, Children's Play Area",
        city: "Delhi",
        location: { lat: 28.5933, lng: 77.2207 },
        status: "pending",
        votes: 62,
        votedBy: [1, 3, 4, 5],
        images: ["/placeholder.svg?height=200&width=300"],
        reportedBy: 1,
        reporterName: "Rahul Sharma",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
      },
      // Mumbai - Cleanliness
      {
        id: 1012,
        title: "Sewage overflow on main street",
        description:
          "Sewage is overflowing onto the main street in Dadar, causing unbearable smell and health hazards for pedestrians and shops.",
        category: "cleanliness",
        address: "Dadar West, Main Market",
        city: "Mumbai",
        location: { lat: 19.0178, lng: 72.8478 },
        status: "resolved",
        votes: 83,
        votedBy: [2, 1, 3, 4, 5],
        images: ["/placeholder.svg?height=200&width=300"],
        reportedBy: 2,
        reporterName: "Priya Patel",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        resolvedImage: "/placeholder.svg?height=200&width=300",
        resolvedComment:
          "The sewage blockage has been cleared and the area has been sanitized. We've also conducted repairs to prevent future overflows.",
        replies: [
          {
            id: 12001,
            text: "Emergency team has been dispatched to address this critical issue.",
            officerId: 104,
            officerName: "Meena Kumari",
            createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 12002,
            text: "The sewage blockage has been cleared and the area has been sanitized.",
            officerId: 104,
            officerName: "Meena Kumari",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Bangalore - Roads (Updated with real images)
      {
        id: 1013,
        title: "Traffic signal malfunction at major intersection",
        description:
          "The traffic signal at the MG Road and Brigade Road intersection has been malfunctioning for three days, causing severe traffic jams.",
        category: "roads",
        address: "MG Road and Brigade Road Junction",
        city: "Bangalore",
        location: { lat: 12.9719, lng: 77.6412 },
        status: "in-progress",
        votes: 56,
        votedBy: [3, 1, 5],
        images: ["/images/road-potholes-1.webp"],
        reportedBy: 3,
        reporterName: "Amit Kumar",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 13001,
            text: "Traffic police have been deployed while our team works on fixing the signal. Repairs are underway.",
            officerId: 101,
            officerName: "Rajesh Kumar",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Kolkata - Electricity
      {
        id: 1014,
        title: "Entire neighborhood without power for 24 hours",
        description:
          "Our entire residential area in Salt Lake has been without electricity for over 24 hours. No response from local authorities.",
        category: "electricity",
        address: "Salt Lake, Sector 5",
        city: "Kolkata",
        location: { lat: 22.5689, lng: 88.4274 },
        status: "resolved",
        votes: 92,
        votedBy: [4, 1, 2, 3, 5],
        images: ["/placeholder.svg?height=200&width=300"],
        reportedBy: 4,
        reporterName: "Sneha Gupta",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        resolvedImage: "/placeholder.svg?height=200&width=300",
        resolvedComment:
          "The power outage was caused by a transformer failure. We've replaced the transformer and restored power to the area.",
        replies: [
          {
            id: 14001,
            text: "Emergency response team is working on replacing the damaged transformer.",
            officerId: 103,
            officerName: "Prakash Joshi",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 14002,
            text: "Power has been restored to all areas. We apologize for the inconvenience.",
            officerId: 103,
            officerName: "Prakash Joshi",
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      // Chennai - Cleanliness
      {
        id: 1015,
        title: "Blocked drainage causing waterlogging",
        description:
          "The main drainage system is blocked, causing severe waterlogging in the area even after light rain. Mosquito breeding is a concern.",
        category: "cleanliness",
        address: "T. Nagar, Pondy Bazaar",
        city: "Chennai",
        location: { lat: 13.0418, lng: 80.2341 },
        status: "pending",
        votes: 41,
        votedBy: [5, 2],
        images: ["/placeholder.svg?height=200&width=300"],
        reportedBy: 5,
        reporterName: "Vikram Singh",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
      },
      // Additional Roads Issues with repeated images
      {
        id: 1016,
        title: "Multiple potholes on Ring Road causing vehicle damage",
        description:
          "The Ring Road has developed multiple deep potholes that are causing significant damage to vehicles and creating traffic bottlenecks.",
        category: "roads",
        address: "Ring Road, Sector 12",
        city: "Delhi",
        location: { lat: 28.5355, lng: 77.391 },
        status: "pending",
        votes: 73,
        votedBy: [1, 2, 4],
        images: ["/images/road-potholes-2.webp"],
        reportedBy: 1,
        reporterName: "Rahul Sharma",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
      },
      {
        id: 1017,
        title: "Road surface completely deteriorated near bus stop",
        description:
          "The road surface near the main bus stop has completely deteriorated, making it extremely difficult for buses to stop safely.",
        category: "roads",
        address: "Main Bus Stand, Central Avenue",
        city: "Mumbai",
        location: { lat: 19.076, lng: 72.8777 },
        status: "in-progress",
        votes: 89,
        votedBy: [2, 3, 4, 5],
        images: ["/images/road-potholes-3.webp"],
        reportedBy: 2,
        reporterName: "Priya Patel",
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 17001,
            text: "Road repair work has been scheduled. We will begin resurfacing next week.",
            officerId: 101,
            officerName: "Rajesh Kumar",
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
      {
        id: 1018,
        title: "Massive pothole causing accidents on highway",
        description:
          "A massive pothole has formed on the highway entrance, causing multiple vehicle accidents and creating a major safety hazard.",
        category: "roads",
        address: "Highway Entrance, Electronic City",
        city: "Bangalore",
        location: { lat: 12.8456, lng: 77.6641 },
        status: "pending",
        votes: 156,
        votedBy: [1, 2, 3, 4, 5],
        images: ["/images/road-potholes-1.webp"],
        reportedBy: 3,
        reporterName: "Amit Kumar",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
      },
    ]
    localStorage.setItem("issues", JSON.stringify(sampleIssues))
  }

  // Mark data as initialized
  localStorage.setItem("dataInitialized", "true")
}
