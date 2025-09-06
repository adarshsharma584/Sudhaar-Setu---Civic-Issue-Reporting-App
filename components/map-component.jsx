"use client"

import { useEffect, useRef } from "react"

export default function MapComponent({ issues = [] }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Initialize map (using a simple div for now since we can't use actual Leaflet in this environment)
      const mapContainer = mapRef.current
      mapContainer.innerHTML = `
        <div style="
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #666;
          ">
            <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Interactive Map</div>
            <div style="font-size: 14px;">Showing ${issues.length} issues</div>
          </div>
          ${issues
            .slice(0, 10)
            .map(
              (issue, index) => `
            <div style="
              position: absolute;
              top: ${20 + (index % 5) * 60}px;
              left: ${50 + (index % 7) * 80}px;
              width: 24px;
              height: 24px;
              background: ${issue.status === "resolved" ? "#4caf50" : issue.status === "in-progress" ? "#ff9800" : "#f44336"};
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 12px;
              font-weight: bold;
            " title="${issue.title} - ${issue.address}">
              📍
            </div>
          `,
            )
            .join("")}
        </div>
      `
      mapInstanceRef.current = true
    }
  }, [issues])

  return <div ref={mapRef} className="w-full h-96 rounded-lg border" />
}
