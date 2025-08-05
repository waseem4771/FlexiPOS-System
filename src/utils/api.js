export async function fetchWithRetry(url, options = {}, retries = 3) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return fetchWithRetry(url, options, retries - 1);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Invalid data received');
      }
      
      return data;
    } catch (error) {
      console.error(`Fetch failed for ${url}:`, error);
      throw error;
    }
  }
  
  export async function fetchDashboardStats() {
    return fetchWithRetry('/api/dashboard/stats');
  }