import { useState, useEffect } from 'react';

/**
 * Hook for handling formatted number inputs with thousand separators
 * 
 * @param initialValue - The initial raw value
 * @returns An object containing the raw value, formatted value, and change handler
 */
export function useFormattedNumberInput(initialValue: string = '') {
  // Raw value for calculations and filtering
  const [rawValue, setRawValue] = useState(initialValue);
  
  // Formatted value for display
  const [formattedValue, setFormattedValue] = useState('');
  
  // Format the value whenever the raw value changes
  useEffect(() => {
    if (!isNaN(parseFloat(rawValue))) {
      const numValue = parseFloat(rawValue);
      if (numValue >= 1000) {
        setFormattedValue(numValue.toLocaleString());
      } else {
        setFormattedValue(rawValue);
      }
    } else {
      setFormattedValue(rawValue);
    }
  }, [rawValue]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const displayValue = e.target.value;
    // Remove commas for the actual value used in calculations
    const newRawValue = displayValue.replace(/,/g, '');
    setRawValue(newRawValue);
  };
  
  return {
    rawValue,
    formattedValue,
    handleChange,
    setRawValue
  };
} 