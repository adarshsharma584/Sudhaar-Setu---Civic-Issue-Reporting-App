"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function GovLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    officialId: "",
    govEmail: "",
    password: "",
    department: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { language, translations } = useLanguage()
  const t = translations[language]

  const departments = [
    { value: "roads", label: "Roads & Infrastructure" },
    { value: "water", label: "Water Supply" },
    { value: "electricity", label: "Electricity" },
    { value: "cleanliness", label: "Sanitation & Cleanliness" },
  ]

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Get government officers from localStorage
      const officers = JSON.parse(localStorage.getItem("govOfficers") || "[]")

      // Find officer by credentials
      const officer = officers.find(
        (o) =>
          o.officialId === loginData.officialId &&
          o.govEmail === loginData.govEmail &&
          o.password === loginData.password &&
          o.department === loginData.department,
      )

      if (!officer) {
        setError("Invalid credentials or department mismatch")
        setLoading(false)
        return
      }

      // Set current government officer
      localStorage.setItem("currentGovOfficer", JSON.stringify(officer))
      router.push("/gov-portal/dashboard")
    } catch (err) {
      setError("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Government Officer Login
          </CardTitle>
          <CardDescription>Enter your official credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="officialId">{t.officialId}</Label>
              <Input
                id="officialId"
                type="text"
                placeholder="Enter your official ID"
                value={loginData.officialId}
                onChange={(e) => setLoginData({ ...loginData, officialId: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="govEmail">{t.govEmail}</Label>
              <Input
                id="govEmail"
                type="email"
                placeholder="Enter your government email"
                value={loginData.govEmail}
                onChange={(e) => setLoginData({ ...loginData, govEmail: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">{t.department}</Label>
              <Select
                value={loginData.department}
                onValueChange={(value) => setLoginData({ ...loginData, department: value })}
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

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Not registered as an officer?{" "}
              <Link href="/gov-portal/signup" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
