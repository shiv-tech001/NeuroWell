import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// Icon Components
const HeartIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const ImageIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const EmojiIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Post type definition
interface CommunityPost {
    id: string;
    author: string;
    authorAvatar: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
    hashtags?: string[];
    isAnonymous?: boolean;
}

const CommunityPage: React.FC = () => {
    const [postContent, setPostContent] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    const posts: CommunityPost[] = [
        {
            id: '1',
            author: 'Sarah J.',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3fd?w=40&h=40&fit=crop&crop=face',
            timestamp: '2 hours ago',
            content: "Feeling really overwhelmed with final exams coming up. Any tips on how to manage stress and stay focused? It's been tough to find a balance. #studentlife #examstress",
            likes: 12,
            comments: 5,
            hashtags: ['studentlife', 'examstress']
        },
        {
            id: '2',
            author: 'Anonymous',
            authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            timestamp: '5 hours ago',
            content: "It's hard to talk about this, but I've been feeling really down lately. It feels like no one understands. Just wanted to put this out there and see if anyone else feels the same.",
            likes: 38,
            comments: 15,
            isAnonymous: true
        }
    ];

    const handlePostSubmit = () => {
        if (postContent.trim()) {
            // Handle post submission logic here
            console.log('Posting:', postContent);
            setPostContent('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            

            {/* Main Content */}
            <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
                {/* Page Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Community Feed</h1>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Posting as:</span>
                        <button
                            onClick={() => setIsPublic(true)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                                isPublic ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Public
                        </button>
                        <button
                            onClick={() => setIsPublic(false)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                                !isPublic ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Anonymous
                        </button>
                    </div>
                </div>

                {/* Create Post */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex space-x-4">
                        <img 
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b3fd?w=40&h=40&fit=crop&crop=face" 
                            alt="Your avatar" 
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                            <textarea
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                placeholder="Share your thoughts or ask for support..."
                                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                rows={4}
                            />
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex space-x-4">
                                    <button className="text-gray-400 hover:text-gray-600 transition">
                                        <ImageIcon className="w-5 h-5" />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600 transition">
                                        <EmojiIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    onClick={handlePostSubmit}
                                    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex space-x-3">
                                    <img 
                                        src={post.authorAvatar} 
                                        alt={post.author} 
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-semibold text-gray-900">{post.author}</h3>
                                            {post.isAnonymous && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                    Anonymous
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">{post.timestamp}</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                    </svg>
                                </button>
                            </div>
                            
                            <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-6">
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition">
                                        <HeartIcon className="w-5 h-5" />
                                        <span className="text-sm">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition">
                                        <MessageIcon className="w-5 h-5" />
                                        <span className="text-sm">{post.comments}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition">
                                        <ShareIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            
        </div>
    );
};

export default CommunityPage;
