import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Icon Components
const HeartIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
    <motion.svg
        className={className}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        animate={{
            scale: filled ? [1, 1.2, 1] : 1,
            color: filled ? '#ef4444' : '#6b7280',
        }}
        transition={{ duration: 0.3 }}
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </motion.svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.013 21H7.987a2 2 0 01-1.92-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const PinIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2l3-3m0 0h2l-3-3m-3 3l-3 3M4 14v6m3-3h6" />
    </svg>
);

3

// Add the missing ImageIcon component
const ImageIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

// User data for a logged-in user
const loggedInUser = {
    username: 'You',
    avatar: 'https://picsum.photos/seed/sophia/200/200'
};

// Default avatars for anonymous and random users
const anonymousAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
const randomAvatars = [
    "https://picsum.photos/seed/pic1/200/200",
    "https://picsum.photos/seed/pic2/200/200",
    "https://picsum.photos/seed/pic3/200/200",
    "https://picsum.photos/seed/pic4/200/200",
    "https://picsum.photos/seed/pic5/200/200",
    "https://picsum.photos/seed/pic6/200/200",
    "https://picsum.photos/seed/pic7/200/200",
    "https://picsum.photos/seed/pic8/200/200"
];

const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * randomAvatars.length);
    return randomAvatars[randomIndex];
};

const emojis = [
    '😊', '👍', '😂', '❤️', '🤔', '🙌', '🔥', '🎉',
    '🥳', '👏', '💯', '🙏', '🤯', '🤩', '🚀', '🌈'
];

// Comment type definition
interface Comment {
    id: string;
    author: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
    isAnonymous?: boolean;
    isPinned?: boolean;
}

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
    isLiked?: boolean;
    allComments: Comment[];
    isCommentsVisible: boolean;
}

const CommunityPage: React.FC = () => {
    const [postContent, setPostContent] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [posts, setPosts] = useState<CommunityPost[]>([
        {
            id: '1',
            author: 'Steve Smith',
            authorAvatar: getRandomAvatar(),
            timestamp: '2 hours ago',
            content: "Feeling really overwhelmed with final exams coming up. Any tips on how to manage stress and stay focused? It's been tough to find a balance. #studentlife #examstress",
            likes: 12,
            comments: 5,
            hashtags: ['studentlife', 'examstress'],
            isLiked: false,
            allComments: [
                { id: '1c1', author: 'Mark T.', authorAvatar: getRandomAvatar(), content: "I find that breaking down study sessions into smaller chunks helps a lot. Try the Pomodoro Technique!", timestamp: '1 hour ago', isPinned: true },
                { id: '1c2', author: 'Jane D.', authorAvatar: getRandomAvatar(), content: "Listening to lo-fi music helps me focus without getting distracted.", timestamp: '30 minutes ago' },
                { id: '1c3', author: 'You', authorAvatar: loggedInUser.avatar, content: "Remember to take short breaks! It's as important as studying.", timestamp: '25 minutes ago' },
                { id: '1c4', author: 'Emily C.', authorAvatar: getRandomAvatar(), content: "Studying with a friend can sometimes help to keep you on track.", timestamp: '20 minutes ago' },
                { id: '1c5', author: 'Chris W.', authorAvatar: getRandomAvatar(), content: "I use flashcards for quick revision. They're great for memorizing key points.", timestamp: '15 minutes ago' },
                { id: '1c6', author: 'Zoe P.', authorAvatar: getRandomAvatar(), content: "Don't forget to get enough sleep! It's crucial for information retention.", timestamp: '10 minutes ago' },
                { id: '1c7', author: 'Liam B.', authorAvatar: getRandomAvatar(), content: "Good luck with your exams! You've got this.", timestamp: '5 minutes ago' },
            ],
            isCommentsVisible: false,
        },
        {
            id: '2',
            author: 'Anonymous',
            authorAvatar: anonymousAvatar,
            timestamp: '5 hours ago',
            content: "It's hard to talk about this, but I've been feeling really down lately. It feels like no one understands. Just wanted to put this out there and see if anyone else feels the same. #mentalhealth",
            likes: 38,
            comments: 10,
            isAnonymous: true,
            isLiked: false,
            hashtags: ['mentalhealth'],
            allComments: [
                 { id: '2c1', author: 'Alex M.', authorAvatar: getRandomAvatar(), content: "Hey, you’re not alone. It’s okay to feel this way, and talking about it is strong.", timestamp: '1 hour ago', isPinned: true },
                { id: '2c2', author: 'Sophie L.', authorAvatar: getRandomAvatar(), content: "Thanks for opening up. Sharing how you feel is a brave step.", timestamp: '55 minutes ago' },
                { id: '2c3', author: 'You', authorAvatar: loggedInUser.avatar, content: "Sending you a virtual hug ❤️. I’m here if you want to talk.", timestamp: '50 minutes ago' },
                { id: '2c4', author: 'Ryan K.', authorAvatar: getRandomAvatar(), content: "I can relate to feeling this way. It helps to reach out and share your thoughts.", timestamp: '45 minutes ago' },
                { id: '2c5', author: 'Maya P.', authorAvatar: getRandomAvatar(), content: "Remember, it’s okay to not be okay. Small steps in self-care make a difference.", timestamp: '40 minutes ago' },
                { id: '2c6', author: 'Leo S.', authorAvatar: getRandomAvatar(), content: "You’re heard and valued. It takes courage to talk about this.", timestamp: '35 minutes ago' },
                { id: '2c7', author: 'Emma R.', authorAvatar: getRandomAvatar(), content: "Sometimes just writing it out helps. Thank you for sharing your feelings.", timestamp: '30 minutes ago' },
                { id: '2c8', author: 'Noah T.', authorAvatar: getRandomAvatar(), content: "You’re not alone in this. There are people who care and want to listen.", timestamp: '25 minutes ago' },
                { id: '2c9', author: 'Lily W.', authorAvatar: getRandomAvatar(), content: "It’s brave to speak up. Take it one day at a time, and be gentle with yourself.", timestamp: '20 minutes ago' },
                { id: '2c10', author: 'Jack D.', authorAvatar: getRandomAvatar(), content: "You’re stronger than you think. Keep reaching out and don’t bottle it up.", timestamp: '15 minutes ago' },
            ],
            isCommentsVisible: false,
        },
        {
            id: '3',
            author: 'John Doe',
            authorAvatar: getRandomAvatar(),
            timestamp: '1 day ago',
            content: "Does anyone have experience with meditation for anxiety? I'm new to it and would love to hear some personal stories or tips on getting started.",
            likes: 45,
            comments: 6,
            hashtags: ['meditation', 'anxiety'],
            isLiked: true,
            allComments: [
                { id: '3c1', author: 'Sophia L.', authorAvatar: getRandomAvatar(), content: "I started meditating for 10 minutes a day and it really helps calm my thoughts. Consistency is key!", timestamp: '1 hour ago', isPinned: true },
                { id: '3c2', author: 'You', authorAvatar: loggedInUser.avatar, content: "Try guided meditation apps—they make it easier to stay focused when starting out.", timestamp: '50 minutes ago' },
                { id: '3c3', author: 'Alex M.', authorAvatar: getRandomAvatar(), content: "Breathing exercises before meditating really help me settle into it.", timestamp: '45 minutes ago' },
                { id: '3c4', author: 'Maya P.', authorAvatar: getRandomAvatar(), content: "Even 5 minutes a day can make a difference. Don’t worry about doing it perfectly!", timestamp: '40 minutes ago' },
                { id: '3c5', author: 'Liam B.', authorAvatar: getRandomAvatar(), content: "I use meditation to manage anxiety before exams—it’s amazing how much it helps clear your mind.", timestamp: '30 minutes ago' },
                { id: '3c6', author: 'Emma R.', authorAvatar: getRandomAvatar(), content: "Start with short sessions and focus on your breath. It’s normal for your mind to wander at first.", timestamp: '25 minutes ago' },
            ],
            isCommentsVisible: false,
        },
        {
            id: '4',
            author: 'Alice B.',
            authorAvatar: getRandomAvatar(),
            timestamp: '1 day ago',
            content: "Starting a new job soon and feeling a mix of excitement and nerves. Any advice on how to make a good first impression and settle in quickly? #newjob #career",
            likes: 22,
            comments: 8,
            hashtags: ['newjob', 'career'],
            isLiked: false,
            allComments: [
                { id: '4c1', author: 'You', authorAvatar: loggedInUser.avatar, content: "Be yourself and stay confident. Ask questions and show curiosity—it really helps to connect with your team.", timestamp: '1 hour ago', isPinned: true },
                { id: '4c2', author: 'Olivia S.', authorAvatar: getRandomAvatar(), content: "Listen carefully in the first few days and take notes. It shows initiative and helps you remember details.", timestamp: '50 minutes ago' },
                { id: '4c3', author: 'Mark T.', authorAvatar: getRandomAvatar(), content: "Don’t be afraid to introduce yourself to colleagues. Small conversations go a long way.", timestamp: '45 minutes ago' },
                { id: '4c4', author: 'Emma R.', authorAvatar: getRandomAvatar(), content: "Try to learn a bit about the company culture—it helps you blend in and feel more comfortable.", timestamp: '40 minutes ago' },
                { id: '4c5', author: 'Liam B.', authorAvatar: getRandomAvatar(), content: "Arrive on time, stay positive, and don’t stress about making mistakes—they’re normal in the beginning.", timestamp: '35 minutes ago' },
                { id: '4c6', author: 'Sophia L.', authorAvatar: getRandomAvatar(), content: "Smile and be approachable. A friendly attitude makes a strong first impression.", timestamp: '30 minutes ago' },
                { id: '4c7', author: 'Ryan K.', authorAvatar: getRandomAvatar(), content: "Set small goals for your first week to get into the flow and feel accomplished.", timestamp: '25 minutes ago' },
                { id: '4c8', author: 'Maya P.', authorAvatar: getRandomAvatar(), content: "Don’t hesitate to ask for feedback—it shows you’re eager to learn and improve.", timestamp: '20 minutes ago' },
            ],
            isCommentsVisible: false,
        },
        {
            id: '5',
            author: 'Anonymous',
            authorAvatar: anonymousAvatar,
            timestamp: '2 days ago',
            content: "Just wanted to say thank you to this community. Reading your stories has made me feel less alone and more understood. You're all amazing. ❤️",
            likes: 150,
            comments: 10,
            isAnonymous: true,
            isLiked: true,
            hashtags: ['community', 'gratitude'],
            allComments: [
                { id: '5c1', author: 'You', authorAvatar: loggedInUser.avatar, content: "We’re so glad you’re here! Your words made my day. ❤️", timestamp: '1 hour ago', isPinned: true },
                { id: '5c2', author: 'Sophie L.', authorAvatar: getRandomAvatar(), content: "It’s wonderful to hear this! This community is here to support each other.", timestamp: '55 minutes ago' },
                { id: '5c3', author: 'Alex M.', authorAvatar: getRandomAvatar(), content: "Reading posts like yours makes me feel connected too. Thank you for sharing!", timestamp: '50 minutes ago' },
                { id: '5c4', author: 'Maya P.', authorAvatar: getRandomAvatar(), content: "Love seeing messages like this! We all need reminders that we’re not alone.", timestamp: '45 minutes ago' },
                { id: '5c5', author: 'Emma R.', authorAvatar: getRandomAvatar(), content: "Your gratitude is contagious! So happy you found this community.", timestamp: '40 minutes ago' },
                { id: '5c6', author: 'Ryan K.', authorAvatar: getRandomAvatar(), content: "This made me smile 😊. It’s amazing how sharing stories can bring people together.", timestamp: '35 minutes ago' },
                { id: '5c7', author: 'Liam B.', authorAvatar: getRandomAvatar(), content: "We’re all in this together! Glad you feel supported here.", timestamp: '30 minutes ago' },
                { id: '5c8', author: 'Olivia S.', authorAvatar: getRandomAvatar(), content: "Such a sweet message! It’s uplifting to read posts like yours.", timestamp: '25 minutes ago' },
                { id: '5c9', author: 'Chris W.', authorAvatar: getRandomAvatar(), content: "This is why communities like this exist. So happy you feel understood.", timestamp: '20 minutes ago' },
                { id: '5c10', author: 'Zoe P.', authorAvatar: getRandomAvatar(), content: "Thank you for sharing your feelings! We all appreciate your positivity.", timestamp: '15 minutes ago' },
            ],
            isCommentsVisible: false,
        },
        {
            id: '6',
            author: 'Michael C.',
            authorAvatar: getRandomAvatar(),
            timestamp: '3 days ago',
            content: "Anyone else struggling to stick to a sleep schedule? I'm a night owl and it's taking a toll on my energy levels. Looking for tips!",
            likes: 18,
            comments: 7,
            hashtags: ['sleep', 'health'],
            isLiked: false,
            allComments: [
                { id: '6c1', author: 'You', authorAvatar: loggedInUser.avatar, content: "Try setting a consistent bedtime and using an alarm to remind you to start winding down.", timestamp: '1 hour ago', isPinned: true },
                { id: '6c2', author: 'Sophia L.', authorAvatar: getRandomAvatar(), content: "Limiting screen time before bed really helped me reset my sleep schedule.", timestamp: '50 minutes ago' },
                { id: '6c3', author: 'Alex M.', authorAvatar: getRandomAvatar(), content: "I use a sleep tracker app—it motivates me to go to bed earlier and see progress.", timestamp: '45 minutes ago' },
                { id: '6c4', author: 'Maya P.', authorAvatar: getRandomAvatar(), content: "Try a relaxing routine before bed, like reading or meditation. It helps signal your body it's time to sleep.", timestamp: '40 minutes ago' },
                { id: '6c5', author: 'Liam B.', authorAvatar: getRandomAvatar(), content: "Avoid caffeine in the evening and keep your room dark and cool. Small changes make a big difference.", timestamp: '35 minutes ago' },
                { id: '6c6', author: 'Emma R.', authorAvatar: getRandomAvatar(), content: "Sometimes you have to gradually shift your bedtime by 15–30 mins each night until you reach your goal.", timestamp: '30 minutes ago' },
                { id: '6c7', author: 'Ryan K.', authorAvatar: getRandomAvatar(), content: "I feel you! Being a night owl is tough, but a consistent morning routine helps reset your internal clock.", timestamp: '25 minutes ago' },
            ],
            isCommentsVisible: false,
        },
        {
            id: '7',
            author: 'Olivia M.',
            authorAvatar: getRandomAvatar(),
            timestamp: '3 days ago',
            content: "I've been using a gratitude journal and it's made a noticeable difference in my mindset. Highly recommend it! #gratitude #mindfulness",
            likes: 31,
            comments: 12,
            hashtags: ['gratitude', 'mindfulness'],
            isLiked: false,
            allComments: [
                { id: '7c1', author: 'You', authorAvatar: loggedInUser.avatar, content: "Gratitude journals really do work! It’s amazing how writing small things down can shift your perspective.", timestamp: '1 hour ago', isPinned: true },
                { id: '7c2', author: 'Sophia L.', authorAvatar: getRandomAvatar(), content: "I started one recently too and it’s been so calming at the end of the day.", timestamp: '55 minutes ago' },
                { id: '7c3', author: 'Alex M.', authorAvatar: getRandomAvatar(), content: "Love this! Do you write daily or just when you feel like it?", timestamp: '50 minutes ago' },
                { id: '7c4', author: 'Maya P.', authorAvatar: getRandomAvatar(), content: "This motivates me to start my own. Thanks for sharing!", timestamp: '45 minutes ago' },
                { id: '7c5', author: 'Emma R.', authorAvatar: getRandomAvatar(), content: "I notice the little joys more when I do this. So effective!", timestamp: '40 minutes ago' },
                { id: '7c6', author: 'Liam B.', authorAvatar: getRandomAvatar(), content: "Even jotting down one thing a day makes a difference. Consistency is key!", timestamp: '35 minutes ago' },
                { id: '7c7', author: 'Ryan K.', authorAvatar: getRandomAvatar(), content: "I tried it for a month and felt less stressed. Highly recommend it too!", timestamp: '30 minutes ago' },
                { id: '7c8', author: 'Olivia S.', authorAvatar: getRandomAvatar(), content: "This is such a simple yet powerful practice. Love seeing posts like this.", timestamp: '25 minutes ago' },
                { id: '7c9', author: 'Chris W.', authorAvatar: getRandomAvatar(), content: "It’s amazing how much a little gratitude can improve your mood.", timestamp: '20 minutes ago' },
                { id: '7c10', author: 'Zoe P.', authorAvatar: getRandomAvatar(), content: "I’ve been thinking of starting one. You’ve convinced me to try it!", timestamp: '15 minutes ago' },
                { id: '7c11', author: 'Mark T.', authorAvatar: getRandomAvatar(), content: "Journaling gratitude is a game-changer. Thanks for sharing your experience.", timestamp: '10 minutes ago' },
                { id: '7c12', author: 'Jane D.', authorAvatar: getRandomAvatar(), content: "Love seeing mindfulness tips like this. Small habits = big impact!", timestamp: '5 minutes ago' },
            ],
            isCommentsVisible: false,
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handlePostSubmit = () => {
        if (postContent.trim()) {
            const newPost: CommunityPost = {
                id: Date.now().toString(),
                author: isPublic ? loggedInUser.username : 'Anonymous',
                authorAvatar: isPublic ? loggedInUser.avatar : anonymousAvatar,
                timestamp: 'Just now',
                content: postContent,
                likes: 0,
                comments: 0,
                isAnonymous: !isPublic,
                isLiked: false,
                hashtags: postContent.match(/#(\w+)/g)?.map(tag => tag.substring(1)) || [],
                allComments: [],
                isCommentsVisible: false,
            };
            setPosts([newPost, ...posts]);
            setPostContent('');
        }
    };

    const handleLike = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    isLiked: !post.isLiked
                }
                : post
        ));
    };

    const handleDelete = (postId: string) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    const handleHashtagClick = (hashtag: string) => {
        console.log(`Filtering by: #${hashtag}`);
    };

    const toggleComments = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isCommentsVisible: !post.isCommentsVisible }
                : post
        ));
    };

    const handleAddComment = (postId: string, commentText: string) => {
        if (commentText.trim()) {
            const newComment: Comment = {
                id: Date.now().toString(),
                author: loggedInUser.username,
                authorAvatar: loggedInUser.avatar,
                content: commentText,
                timestamp: 'Just now',
            };
            setPosts(posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments + 1,
                        allComments: [...post.allComments, newComment],
                    }
                    : post
            ));
        }
    };

    const handlePinComment = (postId: string, commentId: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const newComments = post.allComments.map(comment => ({
                    ...comment,
                    isPinned: comment.id === commentId,
                }));

                const pinnedComment = newComments.find(c => c.isPinned);
                const unpinnedComments = newComments.filter(c => !c.isPinned);
                const sortedComments = pinnedComment ? [pinnedComment, ...unpinnedComments] : [...newComments];

                return {
                    ...post,
                    allComments: sortedComments,
                };
            }
            return post;
        }));
    };

    // Helper functions to get the correct avatar
    const getPostAvatar = (post: CommunityPost) => {
        if (post.isAnonymous) {
            return anonymousAvatar;
        }
        return post.author === loggedInUser.username ? loggedInUser.avatar : post.authorAvatar;
    };

    const getCommentAvatar = (comment: Comment) => {
        if (comment.isAnonymous) {
            return anonymousAvatar;
        }
        return comment.author === loggedInUser.username ? loggedInUser.avatar : comment.authorAvatar;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full">
                {/* Page Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Community Feed</h1>
                    <div className="flex items-center space-x-2 p-1 bg-gray-200 rounded-full">
                        <motion.button
                            onClick={() => setIsPublic(true)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                isPublic ? 'bg-white text-purple-600 shadow-md' : 'text-gray-600'
                            }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            Public
                        </motion.button>
                        <motion.button
                            onClick={() => setIsPublic(false)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                !isPublic ? 'bg-white text-gray-600 shadow-md' : 'text-gray-600'
                            }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            Anonymous
                        </motion.button>
                    </div>
                </div>

                {/* Create Post */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 mb-8 transform hover:scale-[1.005] transition-transform duration-300">
                    <div className="flex space-x-4 items-start">
                        <img
                            src={loggedInUser.avatar}
                            alt="Your avatar"
                            className="w-12 h-12 rounded-full object-cover shadow-sm"
                        />
                        <div className="flex-1">
                            <textarea
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                placeholder="Share your thoughts or ask for support..."
                                className="w-full p-4 bg-gray-50 text-gray-800 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 resize-none transition-all"
                                rows={4}
                            />
                            <div className="flex justify-between items-center mt-4">
                                <motion.button
                                    onClick={handlePostSubmit}
                                    className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors duration-300 shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={!postContent.trim()}
                                    style={{
                                        opacity: postContent.trim() ? 1 : 0.6,
                                        cursor: postContent.trim() ? 'pointer' : 'not-allowed',
                                    }}
                                >
                                    Post
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {currentPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ scale: 1.01, boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex space-x-4 items-center">
                                        <div className="relative">
                                            <img
                                                src={getPostAvatar(post)}
                                                alt={post.author}
                                                className="w-12 h-12 rounded-full object-cover shadow-sm"
                                            />
                                            {post.isAnonymous ? (
                                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-400 ring-2 ring-white" />
                                            ) : (
                                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-bold text-gray-900 text-lg">
                                                    {post.isAnonymous ? <span className="text-gray-500 italic">Anonymous</span> : post.author}
                                                </h3>
                                                {post.isAnonymous && (
                                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                                                        Anonymous
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">{post.timestamp}</p>
                                        </div>
                                    </div>
                                    {post.author === loggedInUser.username && (
                                        <motion.button
                                            onClick={() => handleDelete(post.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                </div>
                                <p className="text-gray-800 mb-4 leading-relaxed whitespace-pre-wrap">
                                    {post.content.split(' ').map((word, index) => {
                                        if (word.startsWith('#')) {
                                            const hashtag = word.substring(1);
                                            return (
                                                <Link
                                                    key={index}
                                                    to={`/community/hashtags/${hashtag}`}
                                                    onClick={() => handleHashtagClick(hashtag)}
                                                    className="text-purple-600 hover:underline font-semibold ml-1"
                                                >
                                                    {word}
                                                </Link>
                                            );
                                        }
                                        return ` ${word}`;
                                    })}
                                </p>
                                <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                                    <motion.button
                                        className={`flex items-center space-x-2 transition ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                                        onClick={() => handleLike(post.id)}
                                        whileTap={{ scale: 1.2 }}
                                    >
                                        <HeartIcon className="w-6 h-6" filled={post.isLiked} />
                                        <span className="text-sm font-medium">{post.likes}</span>
                                    </motion.button>
                                    <button
                                        className={`flex items-center space-x-2 transition ${post.isCommentsVisible ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                                        onClick={() => toggleComments(post.id)}
                                    >
                                        <MessageIcon className="w-6 h-6" />
                                        <span className="text-sm font-medium">{post.comments}</span>
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {post.isCommentsVisible && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="mt-6 border-t border-gray-100 pt-6"
                                        >
                                            <div className="space-y-4 min-h-[100px] max-h-60 overflow-y-auto pr-2">
                                                {post.allComments.map((comment) => (
                                                    <div
                                                        key={comment.id}
                                                        className={`flex items-start space-x-3 p-4 rounded-xl transition-all relative ${comment.isPinned ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}
                                                    >
                                                        {comment.isPinned && (
                                                            <div className="absolute top-0 right-0 mt-2 mr-2 flex items-center space-x-1 text-xs text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded-full">
                                                                <PinIcon className="w-3 h-3 text-purple-600" />
                                                                <span>Pinned</span>
                                                            </div>
                                                        )}
                                                        <img
                                                            src={getCommentAvatar(comment)}
                                                            alt={comment.author}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-center">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="font-semibold text-gray-900">{comment.author}</span>
                                                                    <span className="text-xs text-gray-500">• {comment.timestamp}</span>
                                                                </div>
                                                                {post.author === loggedInUser.username && (
                                                                    <motion.button
                                                                        onClick={() => handlePinComment(post.id, comment.id)}
                                                                        className={`text-gray-400 hover:text-purple-600 transition ${comment.isPinned ? 'text-purple-600' : ''}`}
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        title="Pin this comment"
                                                                    >
                                                                        <PinIcon className="w-5 h-5" />
                                                                    </motion.button>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <CommentInput postId={post.id} onAddComment={handleAddComment} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <motion.button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-2 rounded-full font-medium text-purple-600 bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Previous
                    </motion.button>
                    <span className="text-gray-600 font-medium">{currentPage} of {totalPages}</span>
                    <motion.button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 rounded-full font-medium text-white bg-purple-600 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Next
                    </motion.button>
                </div>
            </main>
        </div>
    );
};

const CommentInput: React.FC<{ postId: string; onAddComment: (postId: string, content: string) => void }> = ({ postId, onAddComment }) => {
    const [commentText, setCommentText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = () => {
        if (commentText.trim()) {
            onAddComment(postId, commentText);
            setCommentText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleEmojiClick = (emoji: string) => {
        if (textareaRef.current) {
            const { selectionStart, selectionEnd } = textareaRef.current;
            setCommentText(prevText =>
                prevText.substring(0, selectionStart) + emoji + prevText.substring(selectionEnd)
            );
            // Focus on textarea and set cursor position after the inserted emoji
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(selectionStart + emoji.length, selectionStart + emoji.length);
                }
            }, 0);
        }
    };

    return (
        <div className="mt-6 flex items-center space-x-3">
            <img
                src={loggedInUser.avatar}
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 relative">
                <textarea
                    ref={textareaRef}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Write a comment..."
                    rows={1}
                    className="w-full pl-4 pr-12 py-2 text-sm bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                    style={{ minHeight: '40px' }}
                />
                <motion.button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-purple-600 transition-colors z-10"
                    whileTap={{ scale: 0.9 }}
                >
                </motion.button>
                <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!commentText.trim()}
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
            <AnimatePresence>
                {showEmojiPicker && (
                    <motion.div
                        ref={emojiPickerRef}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 right-0 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-20"
                    >
                        <div className="grid grid-cols-8 gap-1 overflow-y-auto max-h-48">
                            {emojis.map((emoji, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleEmojiClick(emoji)}
                                    className="p-1 hover:bg-gray-100 rounded-md transition-colors text-xl"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommunityPage;
