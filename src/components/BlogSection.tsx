import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types';
import { BlogDetailModal } from './BlogDetailModal';
import { BookOpen, Clock, ArrowRight, User, Heart, MessageCircle, Sparkles } from 'lucide-react';

interface BlogSectionProps {
  onExploreProducts: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onExploreProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: '전체 매거진' },
    { id: 'journal', label: '떡찌니 브랜드 소식' },
    { id: 'culture', label: '전통 떡 문화' },
    { id: 'recipe', label: '떡찌니 꿀팁 & 레시피' },
    { id: 'rice', label: '건강한 쌀 이야기' },
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5]" id="blog-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ebd9] text-[#2d3a28] text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>TTEOKJJINI JOURNAL & MAGAZINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            떡찌니 매거진 블로그
          </h2>
          <p className="text-sm sm:text-base text-[#525a4d] leading-relaxed">
            100% 국산 쌀의 이야기부터 정갈한 전통 떡 문화, 다도 페어링과 맛있게 먹는 레시피까지.
          </p>
        </div>

        {/* Featured Hero Article */}
        {featuredPost && (
          <div
            onClick={() => setSelectedPost(featuredPost)}
            className="group cursor-pointer rounded-2xl bg-[#f0ebd9]/60 border border-[#e3ded1] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xs hover:shadow-md transition-all duration-300"
          >
            <div className="lg:col-span-7 relative h-[300px] lg:h-[420px] overflow-hidden">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#2d3a28] text-[#fbf9f5] text-xs font-bold">
                FEATURED STORY
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-[#616a5b] font-mono">
                  <span>{featuredPost.categoryLabel}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c2319] group-hover:text-[#2d3a28] transition-colors leading-tight">
                  {featuredPost.title}
                </h3>

                <p className="text-sm text-[#525a4d] leading-relaxed line-clamp-3">
                  {featuredPost.content.intro}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e3ded1] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#616a5b]">
                  <User className="w-3.5 h-3.5 text-[#8fa980]" />
                  <span>{featuredPost.author}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d3a28] group-hover:translate-x-1 transition-transform">
                  <span>이야기 전체 읽기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2d3a28] text-[#fbf9f5] font-bold shadow-xs'
                  : 'bg-[#f0ebd9]/60 text-[#525a4d] hover:bg-[#e3ded1] hover:text-[#1c2319]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer rounded-2xl bg-[#fbf9f5] border border-[#e8e2d5] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#f0ebd9]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#2d3a28]/85 text-[#fbf9f5] text-[10px] font-medium backdrop-blur-xs">
                    {post.categoryLabel}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#616a5b] font-mono">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8fa980]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#1c2319] group-hover:text-[#2d3a28] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#525a4d] line-clamp-2 leading-relaxed">
                    {post.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-[#e8e2d5]/60 flex items-center justify-between text-xs text-[#616a5b]">
                <div className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-[#8fa980]" />
                  <span>{post.author}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-stone-500" />
                    {post.commentsCount}
                  </span>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Blog Detail Modal */}
      <BlogDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onExploreProducts={onExploreProducts}
      />
    </section>
  );
};
