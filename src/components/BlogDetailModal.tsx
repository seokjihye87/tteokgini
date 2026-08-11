import React, { useState } from 'react';
import { BlogPost } from '../types';
import { X, Heart, Share2, Clock, Calendar, User, MessageCircle, Send, Bookmark, Check } from 'lucide-react';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  post,
  onClose,
  onExploreProducts
}) => {
  const [likes, setLikes] = useState(post?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<string[]>([
    '100% 국산쌀이라 안심되네요! 해동 노하우글이 특히 큰 도움이 되었습니다.',
    '2010년부터 단골인데 변함없는 쑥 향에 감사드립니다.'
  ]);

  if (!post) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([...comments, commentInput.trim()]);
    setCommentInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 bg-[#fbf9f5]/90 backdrop-blur-md px-6 py-4 border-b border-[#e8e2d5] flex items-center justify-between">
          <span className="text-xs font-mono text-[#616a5b] uppercase tracking-wider">
            {post.categoryLabel} · TTEOKJJINI JOURNAL
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f0ebd9] text-[#1c2319] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Article Body Container */}
        <div className="p-6 sm:p-10 space-y-8 max-w-3xl mx-auto">
          
          {/* Article Header */}
          <div className="space-y-4 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#8fa980]/20 text-[#2d3a28] text-xs font-semibold">
              {post.categoryLabel}
            </span>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1c2319] leading-tight">
              {post.title}
            </h1>

            <p className="text-base text-[#525a4d] font-light leading-relaxed">
              {post.subtitle}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#616a5b] pt-2 border-t border-b border-[#e8e2d5] py-3">
              <div className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5" />
                <span>{post.author} ({post.authorRole})</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden aspect-16/9 shadow-sm border border-[#e8e2d5]">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Introduction */}
          <div className="p-6 rounded-xl bg-[#f0ebd9]/60 border-l-4 border-[#2d3a28] text-sm text-[#1c2319] font-medium leading-relaxed italic">
            "{post.content.intro}"
          </div>

          {/* Main Content Sections */}
          <div className="space-y-8 text-sm sm:text-base text-[#2c3327] leading-relaxed">
            {post.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1c2319] pt-2">
                  {sec.heading}
                </h3>
                <p className="whitespace-pre-line leading-loose text-[#4e5648]">
                  {sec.body}
                </p>

                {sec.quote && (
                  <blockquote className="my-4 p-5 rounded-lg bg-[#e3ded1]/40 border-l-2 border-[#8fa980] text-sm text-[#2d3a28] font-serif italic">
                    {sec.quote}
                  </blockquote>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div className="pt-4 border-t border-[#e8e2d5]">
              <p className="font-serif text-[#1c2319] font-bold text-base leading-relaxed">
                {post.content.conclusion}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#f0ebd9] text-[#616a5b] text-xs font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactive Actions (Likes, Share, Product CTA) */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-[#e8e2d5]">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                  hasLiked
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-[#f0ebd9]/60 border-[#e3ded1] text-[#4e5648] hover:bg-[#e3ded1]'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-600' : ''}`} />
                <span>좋아요 {likes}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[#f0ebd9]/60 border border-[#e3ded1] text-[#4e5648] hover:bg-[#e3ded1] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? '링크 복사됨' : '기사 공유'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onExploreProducts();
              }}
              className="px-5 py-2.5 rounded-lg bg-[#2d3a28] text-[#fbf9f5] text-xs font-bold hover:bg-[#1e271a] transition-colors cursor-pointer"
            >
              관련 떡 보러가기
            </button>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-2">
            <h4 className="font-serif font-bold text-lg text-[#1c2319] flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#8fa980]" />
              <span>소중한 독자 댓글 ({comments.length})</span>
            </h4>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="따뜻한 한 마디를 남겨주세요..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#e8e2d5] bg-white text-xs focus:outline-none focus:border-[#2d3a28]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[#2d3a28] text-white text-xs font-bold hover:bg-[#1e271a] cursor-pointer"
              >
                등록
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-2 pt-2">
              {comments.map((c, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#f0ebd9]/40 text-xs text-[#4e5648]">
                  {c}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
