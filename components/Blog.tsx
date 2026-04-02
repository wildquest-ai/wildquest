import React from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
}

// You can easily add new blog posts to this array
const BLOG_POSTS: BlogPost[] = [
  {
    id: 'importance-of-biodiversity',
    title: 'The Importance of Biodiversity',
    date: 'March 4, 2026',
    excerpt: 'Why protecting our planet\'s species matters more than ever.',
    content: `Biodiversity is the foundation of life on Earth. It encompasses the variety of all living organisms, from the smallest bacteria to the largest whales, and the ecosystems they form. This intricate web of life provides us with essential services that we often take for granted.

Healthy ecosystems regulate our climate, purify our water, and pollinate our crops. They provide us with food, medicine, and raw materials. When we lose species, we weaken the resilience of these systems, making them more vulnerable to environmental changes and disasters.

The current rate of species extinction is estimated to be 100 to 1,000 times higher than the natural background rate. Habitat destruction, climate change, pollution, and overexploitation are the primary drivers of this loss. Protecting biodiversity is not just about saving charismatic animals; it's about ensuring the long-term survival of humanity.

By supporting conservation efforts, reducing our ecological footprint, and advocating for sustainable policies, we can help preserve the rich tapestry of life for future generations. Every species plays a role, and every action counts.`,
    image: 'https://picsum.photos/seed/nature/800/400'
  },
  {
    id: 'ocean-conservation',
    title: 'Protecting Our Oceans',
    date: 'March 15, 2026',
    excerpt: 'The vital role of marine ecosystems in global health.',
    content: `Our oceans cover more than 70% of the Earth's surface and are home to a vast array of life. They play a crucial role in regulating the global climate, absorbing carbon dioxide, and providing food for billions of people.

However, marine ecosystems are under threat from pollution, overfishing, and climate change. Plastic waste is clogging our oceans, harming marine life and entering the food chain. Rising sea temperatures are causing coral bleaching and disrupting the delicate balance of marine habitats.

Conservation efforts are essential to protect our oceans. This includes creating marine protected areas, reducing plastic pollution, and promoting sustainable fishing practices. By taking action now, we can ensure that our oceans remain healthy and vibrant for generations to come.`,
    image: 'https://picsum.photos/seed/ocean/800/400'
  }
];

const BlogList: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">WildQuest Blog</h2>
        <p className="text-gray-600">Insights into the natural world and conservation efforts.</p>
      </div>

      {BLOG_POSTS.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-green-50 border-dashed text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-feather-alt text-green-500 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Our explorers are currently in the field gathering stories. 
            Check back soon for fascinating articles about wildlife and nature!
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              {post.image && (
                <Link to={post.id}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-64 object-cover cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              )}
              <div className="p-8">
                <div className="flex items-center gap-2 text-green-600 text-sm font-bold mb-3 uppercase tracking-wider">
                  <i className="far fa-calendar-alt"></i>
                  {post.date}
                </div>
                <Link to={post.id}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-green-600 cursor-pointer transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link 
                  to={post.id}
                  className="text-green-600 font-bold flex items-center gap-2 group"
                >
                  Read More 
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
        <button 
          onClick={() => navigate('/blog')}
          className="text-green-600 font-bold hover:underline"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-out]">
      <button 
        onClick={() => navigate('/blog')}
        className="mb-8 flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors group"
      >
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        Back to Blog
      </button>

      <article className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-[400px] object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="p-8 sm:p-12">
          <div className="flex items-center gap-2 text-green-600 text-sm font-bold mb-4 uppercase tracking-wider">
            <i className="far fa-calendar-alt"></i>
            {post.date}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export const Blog: React.FC = () => {
  return (
    <Routes>
      <Route index element={<BlogList />} />
      <Route path=":id" element={<BlogPostDetail />} />
    </Routes>
  );
};
