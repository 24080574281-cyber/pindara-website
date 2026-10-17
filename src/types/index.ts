export type PageTab = 'beranda' | 'trace' | 'shop' | 'explore' | 'streak';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'member' | 'admin';
  points: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  levelName: string;
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: string;
  }[];
  claimedCodes: string[];
  vouchers: UserVoucher[];
}

export interface UserVoucher {
  id: string;
  rewardId: string;
  title: string;
  code: string;
  discountAmount: number;
  discountType: 'nominal' | 'percent' | 'free_product';
  minPurchase: number;
  expiresAt: string;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
}

export interface LedgerEntry {
  id: string;
  timestamp: string; // ISO or formatted
  title: string;
  description: string;
  pointsDelta: number;
  type: 'EARNED' | 'REDEEMED';
  balanceAfter: number;
}

export type TraceStatus = 'VERIFIED' | 'REVIEW' | 'NOT_FOUND';

export interface TimelineStep {
  step: number;
  time: string;
  location: string;
  title: string;
  description: string;
  icon: string;
}

export interface BatchTraceData {
  batchCode: string;
  status: TraceStatus;
  productName: string;
  netWeight: string;
  productionDate: string;
  expiryDate: string;
  rawOrigin: string;
  halalCert: string;
  pirtCert: string;
  cryptographicHash: string;
  blockNumber: string;
  consensusScore: string;
  ipfsHash: string;
  timelineSteps: TimelineStep[];
  coordinates: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface RewardItem {
  id: string;
  title: string;
  category: 'Voucher Belanja' | 'Produk Gratis' | 'Merchandise Khusus';
  type: 'nominal' | 'percent' | 'free_product' | 'merch';
  pointsRequired: number;
  discountValue?: number;
  description: string;
  minPurchase?: number;
  stock: number;
  icon: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  packSize: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  isPopular?: boolean;
}

export interface ProductDetails {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  netWeight: string;
  halalCert: string;
  pirtCert: string;
  stockStatus: 'Tersedia' | 'Stok Menipis' | 'Habis';
  nutrition: {
    servingSize: string;
    calories: number;
    totalFat: string;
    protein: string;
    carbs: string;
    fiber: string;
    sodium: string;
    omega3: string;
  };
  ingredients: string[];
  cookingSteps: {
    step: number;
    time: string;
    title: string;
    instruction: string;
  }[];
  variants: ProductVariant[];
}

export interface RecipeIdea {
  id: string;
  title: string;
  cookTime: string;
  spiciness: number; // 1 to 3
  tag: string;
  description: string;
  chefTip: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  explanation: string;
}
