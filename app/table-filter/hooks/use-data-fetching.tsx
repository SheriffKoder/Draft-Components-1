import { useState, useEffect } from 'react';

// Define a generic type for our data items
export interface DummyDataItem {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  hours: number;
}

/**
 * Custom hook to simulate data fetching and filtering
 * Returns loading state, error state, and data after a simulated delay
 */
export function useDummyData() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<DummyDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DummyDataItem[]>([]);
  const [filters, setFilters] = useState<Record<string, any[]>>({});

  // Generate dummy data
  useEffect(() => {
    
    const generateDummyData = (): DummyDataItem[] => {
      const statuses: ('active' | 'pending' | 'completed' | 'cancelled')[] = [
        'active', 'pending', 'completed', 'cancelled'
      ];
      const categories = ['Marketing', 'Development', 'Design', 'Research', 'Support'];
      
      return Array.from({ length: 100 }, (_, i) => {
        // Generate a random date within the last year
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365));
        
        // Generate a random decimal hour value between 0 and 1 (where 1 = 24 hours)
        const hours = Math.round((Math.random() * 1) * 1000) / 1000;
        
        return {
          id: `ITEM-${(i + 1).toString().padStart(3, '0')}`,
          name: `Sample Item ${i + 1}`,
          category: categories[Math.floor(Math.random() * categories.length)],
          date: date.toISOString().split('T')[0],
          amount: Math.round(Math.random() * 10000) / 100,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          hours: hours
        };
      });
    };

    // Simulate API call with a delay
    const timer = setTimeout(() => {
      try {
        const dummyData = generateDummyData();
        setData(dummyData);
        setFilteredData(dummyData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }, 2000); // 2 second delay to simulate loading

    return () => clearTimeout(timer);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (data.length === 0) return;

    const filtered = data.filter(item => {
      // Check if item passes all active filters
      return Object.entries(filters).every(([key, values]) => {
        // If no filter values for this key, pass the filter
        if (!values || values.length === 0) return true;
        
        // Get the item's value for this key
        const itemValue = String(item[key as keyof DummyDataItem] || '');
        
        // Check if the item's value is in the filter values
        return values.includes(itemValue);
      });
    });

    setFilteredData(filtered);
  }, [data, filters]);

  // Update filters
  const updateFilter = (key: string, values: any[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: values
    }));
  };

  return {
    isLoading,
    isError,
    data,
    filteredData,
    updateFilter
  };
}