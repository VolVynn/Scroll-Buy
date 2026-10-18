export interface Product {
  id: string;
  title: string;
  author: string;
  authorHandle: string;
  authorAvatar: string;
  price: number;
  currency: string;
  description: string;
  category: string;
  tags: string[];
  inStock: boolean;
  type: 'product' | 'service';
  condition?: 'new' | 'used' | 'custom';
  publicationFormat?: 'video' | 'text';
  rating: number;
  reviewsCount: number;
  location: string;
  videoTitle: string;
  soundTitle: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  imageBgColor: string;
  badgeText?: string;
  accentColor?: string;
}

export interface TradeCard {
  id: string;
  productId: string;
  productTitle: string;
  price: number;
  currency: string;
  authorHandle: string;
  buyerName: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  confirmationCode?: string;
  cancelReason?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'seller' | 'buyer' | 'system';
  text?: string;
  tradeCard?: TradeCard;
  timestamp: string;
}

export type PublicationType = 'video' | 'text';

export interface SellerPublication {
  id: string;
  type: PublicationType;
  title: string;
  category: string;
  price?: number;
  currency?: string;
  description: string;
  views: number;
  likes: number;
  createdAt: string;
  soundTitle?: string;
  imageType: 'beatles' | 'ceramic' | 'jewelry' | 'cake' | 'manicure' | 'hoodie' | 'leather';
  status: 'active' | 'pending' | 'deactivated';
}

export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  serviceTitle: string;
  price: number;
  currency: string;
  masterName: string;
  isBooked: boolean;
  clientName?: string;
}

export type OrderStatus = 'Delivered' | 'In Transit' | 'Cancelled' | 'Pending' | 'Confirmed' | 'В обробці' | 'Підтверджено' | 'Доставлено' | 'Заброньовано' | 'В дорозі' | 'Скасовано';

export interface TrackingStep {
  title: string;
  location?: string;
  date: string;
  completed: boolean;
}

export interface BuyerOrder {
  id: string;
  title: string;
  author: string;
  authorHandle?: string;
  price: number;
  currency: string;
  status: OrderStatus;
  date: string;
  type: 'product' | 'service';
  imageType: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  deliveryAddress?: string;
  trackingSteps?: TrackingStep[];
  cancelReason?: string;
}

export interface BuyerProfile {
  name: string;
  handle: string;
  avatar: string;
  city: string;
  phone: string;
}

export interface SellerProfile {
  name: string;
  handle: string;
  avatar: string;
  city: string;
  address: string;
  bio: string;
  followers: string;
  following: string;
  likes: string;
  isVerified: boolean;
}

export type ActiveTab = 'feed' | 'search' | 'create' | 'messages' | 'profile';
export type DeviceType = 'android' | 'iphone' | 'fluid';
export type AppLanguage = 'uk' | 'en';
export type AppTheme = 'light' | 'dark';
