import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// Icon Components
const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const HeartIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const StarIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

// Resource type definition
interface Resource {
    id: string;
    title: string;
    category: string;
    description: string;
    rating: number;
    reviews: number;
    imageUrl: string;
    isFavorited?: boolean;
}

// Sample data matching the design exactly
const resourcesData: Resource[] = [
    {
        id: '1',
        title: 'Mindfulness Meditation',
        category: 'Stress Management',
        description: 'A guided meditation to help you relax and reduce stress.',
        rating: 4.8,
        reviews: 245,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        isFavorited: false
    },
    {
        id: '2',
        title: 'Breathing Exercises',
        category: 'Anxiety Relief',
        description: 'Simple breathing techniques to calm your nerves and ease anxiety.',
        rating: 4.6,
        reviews: 312,
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop',
        isFavorited: true
    },
    {
        id: '3',
        title: 'Sleep Meditation',
        category: 'Sleep Improvement',
        description: 'A calming meditation to help you fall asleep and improve sleep quality.',
        rating: 4.9,
        reviews: 189,
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop',
        isFavorited: false
    },
    {
        id: '4',
        title: 'Focus Music for Studying',
        category: 'Focus & Productivity',
        description: 'Ambient music to help you concentrate while studying.',
        rating: 4.3,
        reviews: 98,
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
        isFavorited: false
    },
    {
        id: '5',
        title: 'Journaling Prompts',
        category: 'Emotional Well-being',
        description: 'Prompts to help you explore your emotions and gain self-awareness.',
        rating: 4.7,
        reviews: 407,
        imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
        isFavorited: false
    },
    {
        id: '6',
        title: 'Yoga for Stress Reduction',
        category: 'Stress Management',
        description: 'A gentle yoga routine to help you relax your body and mind.',
        rating: 4.5,
        reviews: 153,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        isFavorited: true
    }
];

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
    const [isFavorited, setIsFavorited] = useState(resource.isFavorited || false);

    const handleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="relative">
                <img 
                    src={resource.imageUrl} 
                    alt={resource.title} 
                    className="w-full h-48 object-cover"
                />
                <button 
                    onClick={handleFavorite}
                    className="absolute top-3 right-3 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                >
                    <HeartIcon 
                        className={`w-5 h-5 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`} 
                        filled={isFavorited}
                    />
                </button>
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        {resource.category}
                    </span>
                </div>
            </div>
            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                filled={i < Math.floor(resource.rating)}
                            />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({resource.reviews})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResourcesPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filters = ['Tags', 'Difficulty', 'Duration'];
    const categories = ['All', 'Stress Management', 'Anxiety Relief', 'Sleep Improvement', 'Focus & Productivity', 'Emotional Well-being'];

    const filteredResources = resourcesData.filter(resource => {
        const matchesCategory = activeFilter === 'All' || resource.category === activeFilter;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            

            {/* Main Content */}
            <main className="flex-1 px-6 py-8">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for resources like 'anxiety' or 'meditation'"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                            >
                                <span className="text-gray-700">{filter}</span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Tabs - No border, just text with underline */}
                <div className="flex items-center space-x-6 mb-8 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`whitespace-nowrap pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeFilter === category
                                    ? 'border-purple-600 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No resources found matching your search.</p>
                    </div>
                )}
            </main>

            
        </div>
    );
};

export default ResourcesPage;
