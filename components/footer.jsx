"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { language, translations } = useLanguage()
  const t = translations[language]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="font-bold text-xl">Sudhaar Setu</span>
            </div>
            <p className="text-gray-400 text-sm">{t.footerDesc}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-400 hover:text-white">
                  {t.issueMap}
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-gray-400 hover:text-white">
                  {t.reportIssue}
                </Link>
              </li>
              <li>
                <Link href="/issues" className="text-gray-400 hover:text-white">
                  {t.allIssues}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.government}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gov-portal" className="text-gray-400 hover:text-white">
                  {t.govPortal}
                </Link>
              </li>
              <li>
                <Link href="/gov-portal/login" className="text-gray-400 hover:text-white">
                  {t.govLogin}
                </Link>
              </li>
              <li>
                <Link href="/gov-portal/signup" className="text-gray-400 hover:text-white">
                  {t.govSignup}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.support}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">
                  {t.help}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  {t.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Sudhaar Setu. {t.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  )
}
