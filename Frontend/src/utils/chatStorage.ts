// Utility functions for managing chat session persistence

export interface StoredSession {
  id: string;
  title: string;
  messages: any[];
  createdAt: string;
  updatedAt: string;
}

export interface StorageManager {
  saveSessions: (sessions: any[]) => void;
  loadSessions: () => any[];
  saveActiveSessionId: (sessionId: string) => void;
  loadActiveSessionId: () => string | null;
  clearSessions: () => void;
  saveMessages: (messages: any[], key?: string) => void;
  loadMessages: (key?: string) => any[];
}

class ChatStorageManager implements StorageManager {
  private readonly SESSIONS_KEY = 'chatSessions';
  private readonly ACTIVE_SESSION_KEY = 'activeSessionId';
  private readonly MESSAGES_KEY = 'chatPageMessages';

  saveSessions(sessions: any[]): void {
    try {
      const sessionsWithTimestamp = sessions.map(session => ({
        ...session,
        updatedAt: new Date().toISOString()
      }));
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessionsWithTimestamp));
    } catch (error) {
      console.error('Error saving sessions to localStorage:', error);
    }
  }

  loadSessions(): any[] {
    try {
      const savedSessions = localStorage.getItem(this.SESSIONS_KEY);
      if (savedSessions) {
        const parsedSessions = JSON.parse(savedSessions);
        if (Array.isArray(parsedSessions) && parsedSessions.length > 0) {
          return parsedSessions;
        }
      }
    } catch (error) {
      console.error('Error loading sessions from localStorage:', error);
    }
    return [];
  }

  saveActiveSessionId(sessionId: string): void {
    try {
      localStorage.setItem(this.ACTIVE_SESSION_KEY, sessionId);
    } catch (error) {
      console.error('Error saving active session ID to localStorage:', error);
    }
  }

  loadActiveSessionId(): string | null {
    try {
      return localStorage.getItem(this.ACTIVE_SESSION_KEY);
    } catch (error) {
      console.error('Error loading active session ID from localStorage:', error);
      return null;
    }
  }

  clearSessions(): void {
    try {
      localStorage.removeItem(this.SESSIONS_KEY);
      localStorage.removeItem(this.ACTIVE_SESSION_KEY);
    } catch (error) {
      console.error('Error clearing sessions from localStorage:', error);
    }
  }

  saveMessages(messages: any[], key: string = this.MESSAGES_KEY): void {
    try {
      localStorage.setItem(key, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages to localStorage:', error);
    }
  }

  loadMessages(key: string = this.MESSAGES_KEY): any[] {
    try {
      const savedMessages = localStorage.getItem(key);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          return parsedMessages;
        }
      }
    } catch (error) {
      console.error('Error loading messages from localStorage:', error);
    }
    return [];
  }

  // Additional utility methods
  getStorageSize(): number {
    try {
      let totalSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length;
        }
      }
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  }

  exportSessions(): string {
    try {
      const sessions = this.loadSessions();
      return JSON.stringify(sessions, null, 2);
    } catch (error) {
      console.error('Error exporting sessions:', error);
      return '';
    }
  }

  importSessions(jsonData: string): boolean {
    try {
      const sessions = JSON.parse(jsonData);
      if (Array.isArray(sessions)) {
        this.saveSessions(sessions);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing sessions:', error);
      return false;
    }
  }
}

// Create and export singleton instance
export const chatStorage = new ChatStorageManager();

// Export default instance
export default chatStorage;