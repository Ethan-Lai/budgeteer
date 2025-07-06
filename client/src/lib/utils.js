import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  if (!date) {
    return ""
  }

  // If it's a string (like "2025-07-01"), convert to Date object
  if (typeof date === 'string') {
    date = new Date(date)
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function isValidDate(date) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export function getTripStatus(startDate, endDate) {
  if (!startDate || !endDate) {
    return "unknown"
  }

  // Convert strings to Date objects if needed
  if (typeof startDate === 'string') {
    startDate = new Date(startDate)
  }
  if (typeof endDate === 'string') {
    endDate = new Date(endDate)
  }

  const today = new Date()
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0)
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)

  if (today < startDate) {
    return "Upcoming"
  } else if (today >= startDate && today <= endDate) {
    return "Ongoing"
  } else {
    return "Completed"
  }
}

export function getTripDuration(startDate, endDate) {
  if (!startDate || !endDate) {
    return "unknown duration"
  }

  // Convert strings to Date objects if needed
  if (typeof startDate === 'string') {
    startDate = new Date(startDate)
  }
  if (typeof endDate === 'string') {
    endDate = new Date(endDate)
  }

  // Calculate difference in milliseconds
  const timeDiff = endDate.getTime() - startDate.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1 // +1 to include both start and end days

  if (daysDiff === 1) {
    return "1 day"
  } else {
    return `${daysDiff} days`
  }
}