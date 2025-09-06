"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut, User, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [govOfficer, setGovOfficer] = useState(null)
  const pathname = usePathname()
  const { language, translations } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    // Check for authentication on initial load and on any changes
    const checkAuth = () => {
      const userData = localStorage.getItem("currentUser")
      const govOfficerData = localStorage.getItem("currentGovOfficer")

      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }

      if (govOfficerData) {
        setGovOfficer(JSON.parse(govOfficerData))
      } else {
        setGovOfficer(null)
      }
    }

    // Check auth on initial load
    checkAuth()

    // Set up storage event listener to detect changes in other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === "currentUser" || e.key === "currentGovOfficer") {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Clean up
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentGovOfficer")
    setUser(null)
    setGovOfficer(null)
    window.location.href = "/"
  }

  const navItems = [
    { href: "/", label: t.home },
    { href: "/map", label: t.issueMap },
    { href: "/report", label: t.reportIssue },
    { href: "/issues", label: t.allIssues },
    { href: "/gov-portal", label: t.govPortal },
  ]

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const currentUser = govOfficer || user
  const isAuthenticated = !!currentUser

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            Sudhaar Setu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.profilePhoto || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {govOfficer ? currentUser.govEmail : currentUser.email}
                    </p>
                    {govOfficer && <p className="text-xs text-blue-600">Government Officer</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={govOfficer ? "/gov-portal/dashboard" : "/dashboard"}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{t.dashboard}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t.settings}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t.login}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-green-600 text-white">
                  {t.signup}
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {!isAuthenticated ? (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t.login}
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white">
                        {t.signup}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button variant="destructive" onClick={handleLogout} className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t.logout}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
