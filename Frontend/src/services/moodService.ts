const API_BASE_URL = 'http://localhost:5000/api';

interface MoodEntry {
  _id?: string;
  userId: string;
  userModel: string;
  mood: 'Awful' | 'Bad' | 'Okay' | 'Good' | 'Great';
  intensity: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface MoodTrendData {
  day: string;
  mood: number;
  intensity: number;
  date: string;
  moodLabel?: string;
  hasEntry?: boolean;
  emoji?: string;
  notes?: string;
}

interface MoodResponse {
  success: boolean;
  message: string;
  data: MoodEntry[];
}

interface MoodTrendResponse {
  success: boolean;
  message: string;
  data: MoodTrendData[];
}

class MoodService {
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    const token = this.getToken();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
      signal: controller.signal,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);
      
      // Handle non-OK responses
      if (!response.ok) {
        // Try to parse error response, but don't fail if it's not JSON
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        if (errorData?.errors && Array.isArray(errorData.errors)) {
          const errorMessage = errorData.errors.map((err: any) => err.msg).join(', ');
          throw new Error(errorMessage);
        }
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      // Parse successful response
      const data = await response.json().catch(e => {
        console.error('Failed to parse JSON response:', e);
        throw new Error('Invalid response from server');
      });

      return data;
    } catch (error) {
      // Clear timeout in case of error
      clearTimeout(timeoutId);
      
      // Handle abort specifically
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Request timed out');
        throw new Error('Request timed out. Please check your connection and try again.');
      }
      
      console.error('Mood API request failed:', error);
      throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
  }

  async createMoodEntry(moodData: {
    mood: string;
    intensity: number;
    notes?: string;
  }): Promise<MoodEntry> {
    try {
      const response = await this.makeRequest('/mood', {
        method: 'POST',
        body: JSON.stringify(moodData),
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Create mood entry failed:', error);
      throw error;
    }
  }

  async getMoodEntries(limit?: number): Promise<MoodEntry[]> {
    try {
      const queryParams = limit ? `?limit=${limit}` : '';
      const response: MoodResponse = await this.makeRequest(`/mood${queryParams}`);

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Get mood entries failed:', error);
      throw error;
    }
  }

  async getMoodTrend(days: number = 7): Promise<MoodTrendData[]> {
    try {
      const response = await this.makeRequest(`/mood/trend?days=${days}`);

      if (response.success) {
        // Return the trend data which contains chart-ready format
        return response.data.trend || [];
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Get mood trend failed:', error);
      throw error;
    }
  }

  async updateMoodEntry(id: string, updateData: {
    mood?: string;
    intensity?: number;
    notes?: string;
  }): Promise<MoodEntry> {
    try {
      const response = await this.makeRequest(`/mood/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Update mood entry failed:', error);
      throw error;
    }
  }

  async deleteMoodEntry(id: string): Promise<void> {
    try {
      const response = await this.makeRequest(`/mood/${id}`, {
        method: 'DELETE',
      });

      if (!response.success) {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Delete mood entry failed:', error);
      throw error;
    }
  }

  // Helper method to convert mood label to number for chart
  moodToNumber(mood: string): number {
    const moodMap: { [key: string]: number } = {
      'Awful': 1,
      'Bad': 2,
      'Okay': 3,
      'Good': 4,
      'Great': 5
    };
    return moodMap[mood] || 3;
  }

  // Helper method to get mood emoji
  getMoodEmoji(mood: string): string {
    const emojiMap: { [key: string]: string } = {
      'Awful': '😞',
      'Bad': '😔',
      'Okay': '🙂',
      'Good': '😀',
      'Great': '😁'
    };
    return emojiMap[mood] || '🙂';
  }
}

export const moodService = new MoodService();
export default moodService;
export type { MoodEntry, MoodTrendData };