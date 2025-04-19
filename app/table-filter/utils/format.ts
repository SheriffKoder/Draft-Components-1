// import { Currency } from "@prisma/client";

/**
 * Formats a decimal hour value to HH:mm format
 * @param value - The decimal hour value (0-24)
 * @returns A string representation of the time in HH:mm format
 */
export function formatHour(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "00:00";
  }

  // Convert decimal hours to hours and minutes
  const normalizedValue = value * 24;
  var hours = Math.floor(normalizedValue);
  var minutes = Math.round((normalizedValue - hours) * 60);

  // handle case where minutes is rounded to 60
  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }

  // Pad with zeros for consistent format
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
}

/**
 * Formats a number as currency
 * @param amount - The number to format
 * @param currency - Optional currency to format with. If not provided, formats number without currency symbol
 * @returns A formatted string representation of the number
 */
export function formatCurrency(amount: number, currency?: any): string {
  return new Intl.NumberFormat("en-US", {
    style: currency ? "currency" : "decimal",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a date to a localized string
 * @param date - The date to format
 * @returns A string representation of the date in the format dd.MM.yyyy
 */
export function formatDate(date: Date | null): string {
  if (!date) return "";
  
  // Create a new date from the input
  const inputDate = new Date(date);
  
  // If the hour is after 12:00 UTC, show the next day
  // This handles cases where the date is saved as previous day 21:00/22:00 depending on the timezone
  const hours = inputDate.getUTCHours();
  if (hours >= 12) {
    inputDate.setUTCDate(inputDate.getUTCDate() + 1);
  }

  return new Intl.DateTimeFormat("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(inputDate);
}

/**
 * Formats a number to show exact decimal places without rounding
 * 
 * Unlike toFixed(), this function truncates the decimal places without rounding,
 * ensuring that what users see is exactly what they can search for.
 * 
 * @param value The number to format
 * @param decimalPlaces The number of decimal places to show (default: 3)
 * @returns Formatted string with exact decimal places
 */
export function formatExactDecimals(value: number | null | undefined, decimalPlaces: number = 3): string {
  // Handle null, undefined, or NaN values
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "-";
  }
  
  // Convert to string for manipulation
  const stringValue = String(value);
  
  // If no decimal point, return the whole number as is
  if (!stringValue.includes('.')) {
    return stringValue;
  }
  
  // Split at decimal point and take exactly the specified number of decimal places without rounding
  const [wholePart, decimalPart] = stringValue.split('.');
  return `${wholePart}.${decimalPart.substring(0, decimalPlaces)}`;
}
