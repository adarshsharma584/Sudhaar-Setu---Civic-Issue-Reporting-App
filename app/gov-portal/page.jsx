"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Users, BarChart3, CheckCircle, Eye, EyeOff, AlertTriangle, Lock, UserCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function GovPortalPage() {
  const [step, setStep] = useState("verify") // verify, login, signup, dashboard
  const [govId, setGovId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { language, translations } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    // Check if government officer is already logged in
    const govOfficerData = localStorage.getItem("currentGovOfficer")
    if (govOfficerData) {
      router.push("/gov-portal/dashboard")
      return
    }

    // Check if there are any registered government officers
    const officers = JSON.parse(localStorage.getItem("govOfficers") || "[]")
    if (officers.length === 0) {
      setStep("signup")
    }
  }, [router])

  const handleGovIdVerification = () => {
    setLoading(true)
    setError("")

    const officers = JSON.parse(localStorage.getItem("govOfficers") || "[]")
    const officer = officers.find((o) => o.officialId === govId)

    if (officer) {
      localStorage.setItem("currentGovOfficer", JSON.stringify(officer))
      router.push("/gov-portal/dashboard")
    } else {
      setError("Invalid Government ID. Please try again or use password verification.")
    }
    setLoading(false)
  }

  const handlePasswordVerification = () => {
    setLoading(true)
    setError("")

    const officers = JSON.parse(localStorage.getItem("govOfficers") || "[]")
    const officer = officers.find((o) => o.password === password)

    if (officer) {
      localStorage.setItem("currentGovOfficer", JSON.stringify(officer))
      router.push("/gov-portal/dashboard")
    } else {
      setError("Invalid password. Please try again.")
    }
    setLoading(false)
  }

  const features = [
    {
      icon: Shield,
      title: "Secure Access",
      description: "Government-grade security for official use",
    },
    {
      icon: Users,
      title: "Citizen Management",
      description: "Manage and respond to citizen reports efficiently",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track issue resolution metrics and trends",
    },
    {
      icon: CheckCircle,
      title: "Issue Resolution",
      description: "Update issue status and communicate with citizens",
    },
  ]

  if (step === "verify") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Security Warning */}
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <div className="space-y-2">
                <p className="font-semibold">🔐 Security Notice:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Remember your Government ID for future logins</li>
                  <li>• Never share your Government ID with anyone</li>
                  <li>• Keep your credentials confidential at all times</li>
                  <li>• Report any unauthorized access immediately</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Government Portal Access
              </CardTitle>
              <CardDescription>Enter your Government ID to access the portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="govId">Government ID</Label>
                <div className="relative">
                  <Input
                    id="govId"
                    type="text"
                    placeholder="Enter your Government ID"
                    value={govId}
                    onChange={(e) => setGovId(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <Button
                onClick={handleGovIdVerification}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white"
                disabled={loading || !govId.trim()}
              >
                {loading ? "Verifying..." : "Access Portal"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Forgot your Government ID?</p>
                <Button variant="outline" onClick={() => setStep("password")} className="w-full">
                  Use Password Instead
                </Button>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Not registered as an officer?{" "}
                  <Button variant="link" onClick={() => setStep("signup")} className="p-0 h-auto text-blue-600">
                    Register here
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "password") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Security Warning */}
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
            <Lock className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <div className="space-y-2">
                <p className="font-semibold">🔒 Password Security:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Use this only if you forgot your Government ID</li>
                  <li>• Your password is confidential - never share it</li>
                  <li>• Contact admin if you suspect unauthorized access</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Password Verification
              </CardTitle>
              <CardDescription>Enter your authentication password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Authentication Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handlePasswordVerification}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white"
                disabled={loading || !password.trim()}
              >
                {loading ? "Verifying..." : "Access Portal"}
              </Button>

              <div className="text-center">
                <Button variant="outline" onClick={() => setStep("verify")} className="w-full">
                  Back to Government ID
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "signup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Registration Security Notice */}
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <div className="space-y-2">
                <p className="font-semibold">📋 Registration Notice:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• You'll receive a unique Government ID after registration</li>
                  <li>• Save your Government ID securely for future logins</li>
                  <li>• Never share your credentials with unauthorized persons</li>
                  <li>• Use strong passwords for account security</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Officer Registration Required
              </CardTitle>
              <CardDescription>No government officers are registered yet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You need to register as a government officer to access the portal.
                </p>
                <Link href="/gov-portal/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    Register as Government Officer
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Default portal landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Security Notice Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
              🔐 Security Reminder: Keep your Government ID confidential and never share it with unauthorized persons
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Government Portal
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Secure platform for government officials to manage civic issues and serve citizens better
            </p>
          </div>

          {/* Security Guidelines Card */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2 text-blue-800 dark:text-blue-200">
                  <Lock className="h-5 w-5" />
                  <span>Security Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
                  <div className="space-y-2">
                    <h4 className="font-semibold">🆔 Government ID Security:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Remember your Government ID for login</li>
                      <li>• Store it securely and privately</li>
                      <li>• Never share with unauthorized persons</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">🔒 Account Protection:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Use strong, unique passwords</li>
                      <li>• Log out after each session</li>
                      <li>• Report suspicious activities immediately</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/gov-portal/login">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3">
                <Shield className="mr-2 h-5 w-5" />
                Officer Login
              </Button>
            </Link>
            <Link href="/gov-portal/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 px-8 py-3"
              >
                Register as Officer
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Impact</h2>
            <p className="text-gray-600 dark:text-gray-300">Making governance more efficient and transparent</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2,847</div>
              <div className="text-gray-600 dark:text-gray-300">Total Issues Managed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">94.5%</div>
              <div className="text-gray-600 dark:text-gray-300">Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-gray-600 dark:text-gray-300">Active Officers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
