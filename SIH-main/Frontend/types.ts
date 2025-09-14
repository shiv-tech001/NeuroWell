
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Student' | 'Counselor' | 'Admin';
}

export interface Patient {
    id: string;
    name: string;
    patientId: string;
    avatarUrl: string;
    lastSession: string;
    moodTrend: 'Improving' | 'Stable' | 'Declining';
    status: 'Active' | 'Inactive';
}

export interface Resource {
    id: string;
    title: string;
    type: 'Article' | 'Video' | 'Audio';
    category: string;
    imageUrl: string;
}

export interface Counselor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  quote: string;
  avatarUrl: string;
}

export interface CommunityPost {
    id: string;
    author: string;
    authorAvatar: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
}
