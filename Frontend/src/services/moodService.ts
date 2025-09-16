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
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessage = data.errors.map((err: any) => err.msg).join(', ');
          throw new Error(errorMessage);
        }
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('Mood API request failed:', error);
      throw error;
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