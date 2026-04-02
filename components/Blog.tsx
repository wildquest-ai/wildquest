import React from 'react';

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
  /* 
  {
    id: '1',
    title: 'The Importance of Biodiversity',
    date: 'March 4, 2026',
    excerpt: 'Why protecting our planet\'s species matters more than ever.',
    content: 'Full content goes here...',
    image: 'https://picsum.photos/seed/nature/800/400'
  }
  */
];

export const Blog: React.FC = () => {
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
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="p-8">
                <div className="flex items-center gap-2 text-green-600 text-sm font-bold mb-3 uppercase tracking-wider">
                  <i className="far fa-calendar-alt"></i>
                  {post.date}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-green-600 cursor-pointer transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <button className="text-green-600 font-bold flex items-center gap-2 group">
                  Read More 
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
