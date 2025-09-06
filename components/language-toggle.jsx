"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="h-8 w-8 px-0">
      <span className="text-sm font-medium">{language === "en" ? "हि" : "EN"}</span>
    </Button>
  )
}
