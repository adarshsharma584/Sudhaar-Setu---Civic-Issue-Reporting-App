"use client"

import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

const translations = {
  en: {
    // Navigation
    home: "Home",
    issueMap: "Issue Map",
    reportIssue: "Report Issue",
    allIssues: "All Issues",
    govPortal: "Gov Portal",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    dashboard: "Dashboard",
    settings: "Settings",

    // Home Page
    govInitiative: "Government Initiative",
    heroSlogan: "Speak Up. Fix It Now. Together we build better cities.",
    heroDescription:
      "Report civic issues in your area and track their resolution in real-time. Join thousands of citizens making their cities better.",
    viewMap: "View Map",
    totalIssues: "Total Issues",
    inProgress: "In Progress",
    resolved: "Resolved",
    activeUsers: "Active Users",
    recentIssues: "Recent Issues",
    recentIssuesDesc: "Latest issues reported by citizens",
    viewAllIssues: "View All Issues",
    howItWorks: "How It Works",
    howItWorksDesc: "Simple steps to report and resolve civic issues",
    step1: "Report Issue",
    step1Desc: "Take a photo and describe the civic issue in your area",
    step2: "Community Support",
    step2Desc: "Other citizens can vote and support your issue",
    step3: "Get Resolution",
    step3Desc: "Government officials review and resolve the issue",

    // Issue Categories
    roads: "Roads",
    water: "Water",
    electricity: "Electricity",
    cleanliness: "Cleanliness",

    // Issue Status
    pending: "Pending",

    // Sample Issues
    potholeIssue: "Large pothole causing traffic issues",
    waterLeakage: "Water pipe leakage on main road",
    streetLight: "Street light not working",

    // Footer
    footerDesc: "Making cities better through citizen participation and government collaboration.",
    quickLinks: "Quick Links",
    government: "Government",
    support: "Support",
    govLogin: "Gov Login",
    govSignup: "Gov Signup",
    help: "Help",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    allRightsReserved: "All rights reserved.",

    // Forms
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    adhaar: "Adhaar Number",
    profilePhoto: "Profile Photo",

    // Warnings
    fakeReportWarning:
      "⚠️ Warning: Filing fake reports is punishable by ₹5,000 fine and 6 months imprisonment for wasting government resources.",

    // Government
    officialId: "Official ID",
    govEmail: "Government Email",
    department: "Department",
    post: "Government Post",
    address: "Address",
    city: "City",
    pincode: "Pincode",

    // New translations for government features
    reply: "Reply",
    replyToIssue: "Reply to Issue",
    officerReply: "Officer Reply",
    resolutionPhoto: "Resolution Photo",
    resolutionComment: "Resolution Comment",
    markResolved: "Mark Resolved",
    changeStatus: "Change Status",
    updateStatus: "Update Status",
    addReply: "Add Reply",
    viewReplies: "View Replies",
    noReplies: "No replies yet",
    replyAdded: "Reply added successfully",
    statusUpdated: "Status updated successfully",
  },
  hi: {
    // Navigation
    home: "होम",
    issueMap: "समस्या मानचित्र",
    reportIssue: "समस्या रिपोर्ट करें",
    allIssues: "सभी समस्याएं",
    govPortal: "सरकारी पोर्टल",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    dashboard: "डैशबोर्ड",
    settings: "सेटिंग्स",

    // Home Page
    govInitiative: "सरकारी पहल",
    heroSlogan: "बोलिए। अभी ठीक करें। मिलकर बेहतर शहर बनाएं।",
    heroDescription:
      "अपने क्षेत्र की नागरिक समस्याओं की रिपोर्ट करें और उनके समाधान को रियल-टाइम में ट्रैक करें। हजारों नागरिकों के साथ जुड़ें जो अपने शहरों को बेहतर बना रहे हैं।",
    viewMap: "मानचित्र देखें",
    totalIssues: "कुल समस्याएं",
    inProgress: "प्रगति में",
    resolved: "हल हो गई",
    activeUsers: "सक्रिय उपयोगकर्ता",
    recentIssues: "हाल की समस्याएं",
    recentIssuesDesc: "नागरिकों द्वारा रिपोर्ट की गई नवीनतम समस्याएं",
    viewAllIssues: "सभी समस्याएं देखें",
    howItWorks: "यह कैसे काम करता है",
    howItWorksDesc: "नागरिक समस्याओं की रिपोर्ट और समाधान के लिए सरल चरण",
    step1: "समस्या रिपोर्ट करें",
    step1Desc: "अपने क्षेत्र की नागरिक समस्या की फोटो लें और वर्णन करें",
    step2: "सामुदायिक समर्थन",
    step2Desc: "अन्य नागरिक आपकी समस्या को वोट और समर्थन दे सकते हैं",
    step3: "समाधान प्राप्त करें",
    step3Desc: "सरकारी अधिकारी समस्या की समीक्षा करके समाधान करते हैं",

    // Issue Categories
    roads: "सड़कें",
    water: "पानी",
    electricity: "बिजली",
    cleanliness: "सफाई",

    // Issue Status
    pending: "लंबित",

    // Sample Issues
    potholeIssue: "बड़ा गड्ढा जो ट्रैफिक की समस्या पैदा कर रहा है",
    waterLeakage: "मुख्य सड़क पर पानी की पाइप लीकेज",
    streetLight: "स्ट्रीट लाइट काम नहीं कर रही",

    // Footer
    footerDesc: "नागरिक भागीदारी और सरकारी सहयोग के माध्यम से शहरों को बेहतर बनाना।",
    quickLinks: "त्वरित लिंक",
    government: "सरकार",
    support: "सहायता",
    govLogin: "सरकारी लॉगिन",
    govSignup: "सरकारी साइन अप",
    help: "सहायता",
    contact: "संपर्क",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    allRightsReserved: "सभी अधिकार सुरक्षित।",

    // Forms
    name: "पूरा नाम",
    email: "ईमेल",
    phone: "फोन नंबर",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    adhaar: "आधार नंबर",
    profilePhoto: "प्रोफाइल फोटो",

    // Warnings
    fakeReportWarning:
      "⚠️ चेतावनी: झूठी रिपोर्ट दर्ज करना ₹5,000 जुर्माना और सरकारी संसाधनों की बर्बादी के लिए 6 महीने की कैद से दंडनीय है।",

    // Government
    officialId: "अधिकारी आईडी",
    govEmail: "सरकारी ईमेल",
    department: "विभाग",
    post: "सरकारी पद",
    address: "पता",
    city: "शहर",
    pincode: "पिनकोड",

    // New translations for government features
    reply: "जवाब",
    replyToIssue: "समस्या का जवाब दें",
    officerReply: "अधिकारी का जवाब",
    resolutionPhoto: "समाधान फोटो",
    resolutionComment: "समाधान टिप्पणी",
    markResolved: "हल के रूप में चिह्नित करें",
    changeStatus: "स्थिति बदलें",
    updateStatus: "स्थिति अपडेट करें",
    addReply: "जवाब जोड़ें",
    viewReplies: "जवाब देखें",
    noReplies: "अभी तक कोई जवाब नहीं",
    replyAdded: "जवाब सफलतापूर्वक जोड़ा गया",
    statusUpdated: "स्थिति सफलतापूर्वक अपडेट की गई",
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hi" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
