// services/api.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; 
console.log('API_URL:', API_URL);

export async function generateQuery(nlq) {
  console.log('Fetching from:', `${API_URL}/generate`);
  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: nlq }),
    });
    console.log('Response status:', response.status);
    
    // Get response text first to handle both JSON and non-JSON responses
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      throw new Error(`Server returned non-JSON response: ${responseText}`);
    }
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new Error(data.error || data.details || `HTTP ${response.status}: ${responseText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}