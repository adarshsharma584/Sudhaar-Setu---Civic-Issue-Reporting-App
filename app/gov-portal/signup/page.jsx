"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Upload, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function GovSignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signupData, setSignupData] = useState({
    name: "",
    adhaar: "",
    govEmail: "",
    phone: "",
    post: "",
    department: "",
    address: "",
    city: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
    officialId: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [generatedOfficialId, setGeneratedOfficialId] = useState("")
  const router = useRouter()
  const { language, translations } = useLanguage()
  const t = translations[language]

  const departments = [
    { value: "roads", label: "Roads & Infrastructure" },
    { value: "water", label: "Water Supply" },
    { value: "electricity", label: "Electricity" },
    { value: "cleanliness", label: "Sanitation & Cleanliness" },
  ]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setSignupData({ ...signupData, profilePhoto: e.target.result })
      }
      reader.onerror = () => {
        setError("Error reading file. Please try again.")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Get existing officers
      const officers = JSON.parse(localStorage.getItem("govOfficers") || "[]")

      // Check if officer already exists
      const existingOfficer = officers.find((o) => o.govEmail === signupData.govEmail || o.adhaar === signupData.adhaar)
      if (existingOfficer) {
        setError("Officer already exists with this email or Adhaar")
        setLoading(false)
        return
      }

      // Generate official ID
      const officialId = `GOV${Date.now().toString().slice(-6)}`
      setGeneratedOfficialId(officialId)

      // Create new officer
      const newOfficer = {
        id: Date.now(),
        ...signupData,
        officialId,
        createdAt: new Date().toISOString(),
      }
      delete newOfficer.confirmPassword

      // Save officer
      officers.push(newOfficer)
      localStorage.setItem("govOfficers", JSON.stringify(officers))

      setSuccess(true)

      // Auto-login after 3 seconds
      setTimeout(() => {
        localStorage.setItem("currentGovOfficer", JSON.stringify(newOfficer))
        router.push("/gov-portal/dashboard")
      }, 3000)
    } catch (err) {
      setError("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>

            {/* Important ID Notice */}
            <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 mb-4">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <div className="space-y-2">
                  <p className="font-semibold">🆔 IMPORTANT - Save Your Government ID:</p>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded border-2 border-amber-300">
                    <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                      {generatedOfficialId}
                    </p>
                  </div>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Write this ID down and keep it secure</li>
                    <li>• You'll need this ID to login to the portal</li>
                    <li>• Never share this ID with anyone</li>
                    <li>• Contact admin if you lose this ID</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your government officer account has been created successfully.
            </p>
            <p className="text-sm text-gray-500">Redirecting to dashboard in 3 seconds...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Security Warning */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <div className="space-y-2">
              <p className="font-semibold">🔐 Registration Security Notice:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• You'll receive a unique Government ID after registration</li>
                <li>
                  • <strong>SAVE YOUR GOVERNMENT ID SECURELY</strong> - you'll need it to login
                </li>
                <li>• Never share your Government ID or password with anyone</li>
                <li>• Use a strong password for your account security</li>
                <li>• Keep your credentials confidential at all times</li>
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
              Government Officer Registration
            </CardTitle>
            <CardDescription>Register as a government officer to manage civic issues</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="profilePhoto">{t.profilePhoto}</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                    {signupData.profilePhoto ? (
                      <img
                        src={signupData.profilePhoto || "/placeholder.svg"}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    {signupData.profilePhoto && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSignupData({ ...signupData, profilePhoto: "" })}
                        className="mt-2"
                      >
                        Remove Photo
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.name}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adhaar">{t.adhaar}</Label>
                  <Input
                    id="adhaar"
                    type="text"
                    placeholder="Enter your Adhaar number"
                    value={signupData.adhaar}
                    onChange={(e) => setSignupData({ ...signupData, adhaar: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="govEmail">{t.govEmail}</Label>
                  <Input
                    id="govEmail"
                    type="email"
                    placeholder="Enter your government email"
                    value={signupData.govEmail}
                    onChange={(e) => setSignupData({ ...signupData, govEmail: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post">{t.post}</Label>
                  <Input
                    id="post"
                    type="text"
                    placeholder="Enter your government post"
                    value={signupData.post}
                    onChange={(e) => setSignupData({ ...signupData, post: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">{t.department}</Label>
                  <Select
                    value={signupData.department}
                    onValueChange={(value) => setSignupData({ ...signupData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t.address}</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={signupData.address}
                  onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{t.city}</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    value={signupData.city}
                    onChange={(e) => setSignupData({ ...signupData, city: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">{t.pincode}</Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="Enter your pincode"
                    value={signupData.pincode}
                    onChange={(e) => setSignupData({ ...signupData, pincode: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">{t.password}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register as Officer"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already registered?{" "}
                <Link href="/gov-portal/login" className="text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
