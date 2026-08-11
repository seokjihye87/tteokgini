export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'signature' | 'organic' | 'mealkit' | 'tteokguk' | 'gift';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  badges: string[];
  weight: string;
  storageInfo: string;
  ingredients: string[];
  originRice: string;
  recommendedFor?: string;
  rating: number;
  reviewsCount: number;
  isBest?: boolean;
  isNew?: boolean;
}

export interface RecipeItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  prepTime: string;
  difficulty: string;
  image: string;
  ingredients: string[];
  steps: string[];
  tip?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  category: string;
  productName: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  coverImage: string;
  likes?: number;
  commentsCount?: number;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      quote?: string;
    }[];
    conclusion: string;
  };
  tags: string[];
}

export interface BrandMilestone {
  year: string;
  title: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  productName: string;
  content: string;
  verified: boolean;
}

export interface StoreInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  features: string[];
  image: string;
}

export interface TeaPairing {
  id: string;
  tteokName: string;
  teaName: string;
  tteokImage: string;
  teaImage: string;
  description: string;
  flavorProfile: string[];
  recommendationNote: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AiRecommendationRequest {
  purpose: string;
  recipient: string;
  budget: string;
  flavorPreference: string;
  notes?: string;
}

export interface AiRecommendationResponse {
  recommendations: {
    productName: string;
    reason: string;
    cookingTip: string;
  }[];
  overallAdvice: string;
}
