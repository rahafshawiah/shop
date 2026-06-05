// ═══════════════════════════════════════
//  data.js — بيانات المتجر
// ═══════════════════════════════════════

const PRODUCTS = [
  // أزياء
  { id: 1, name: 'فستان صيفي أنيق', cat: 'fashion', price: 180, oldPrice: 260, rating: 4.8, reviews: 124, badge: 'sale', isNew: false, emoji: '👗', gradient: 'linear-gradient(135deg,#f6d365,#fda085)' },
  { id: 2, name: 'عباية مطرزة فاخرة', cat: 'fashion', price: 450, oldPrice: null, rating: 4.9, reviews: 89, badge: 'bestseller', isNew: false, emoji: '✨', gradient: 'linear-gradient(135deg,#2c3e50,#4a6fa5)' },
  { id: 3, name: 'حقيبة جلد إيطالي', cat: 'fashion', price: 850, oldPrice: 1100, rating: 4.7, reviews: 67, badge: 'sale', isNew: false, emoji: '👜', gradient: 'linear-gradient(135deg,#c0392b,#8e44ad)' },
  { id: 4, name: 'حذاء كعب مرتفع', cat: 'fashion', price: 320, oldPrice: null, rating: 4.5, reviews: 43, badge: null, isNew: true, emoji: '👠', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  { id: 5, name: 'بلوزة كاجوال مريحة', cat: 'fashion', price: 95, oldPrice: 140, rating: 4.3, reviews: 200, badge: 'sale', isNew: false, emoji: '👕', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { id: 6, name: 'شال كشمير فاخر', cat: 'fashion', price: 290, oldPrice: null, rating: 4.6, reviews: 55, badge: null, isNew: true, emoji: '🧣', gradient: 'linear-gradient(135deg,#f7971e,#ffd200)' },

  // إلكترونيات
  { id: 7, name: 'سماعات لاسلكية Pro', cat: 'electronics', price: 650, oldPrice: 900, rating: 4.9, reviews: 312, badge: 'sale', isNew: false, emoji: '🎧', gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)' },
  { id: 8, name: 'ساعة ذكية Ultra', cat: 'electronics', price: 1200, oldPrice: null, rating: 4.8, reviews: 178, badge: 'bestseller', isNew: true, emoji: '⌚', gradient: 'linear-gradient(135deg,#373b44,#4286f4)' },
  { id: 9, name: 'قلم رصاص ذكي', cat: 'electronics', price: 380, oldPrice: 500, rating: 4.6, reviews: 92, badge: 'sale', isNew: false, emoji: '✏️', gradient: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)' },
  { id: 10, name: 'مكبر صوت بلوتوث', cat: 'electronics', price: 280, oldPrice: null, rating: 4.4, reviews: 156, badge: null, isNew: false, emoji: '🔊', gradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
  { id: 11, name: 'كابل شحن مغناطيسي', cat: 'electronics', price: 75, oldPrice: 110, rating: 4.2, reviews: 445, badge: 'sale', isNew: false, emoji: '🔌', gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)' },
  { id: 12, name: 'حامل هاتف سيارة', cat: 'electronics', price: 55, oldPrice: null, rating: 4.5, reviews: 267, badge: null, isNew: true, emoji: '📱', gradient: 'linear-gradient(135deg,#fa709a,#fee140)' },

  // المنزل
  { id: 13, name: 'مجموعة أكواب قهوة', cat: 'home', price: 160, oldPrice: 220, rating: 4.7, reviews: 98, badge: 'sale', isNew: false, emoji: '☕', gradient: 'linear-gradient(135deg,#d4fc79,#96e6a1)' },
  { id: 14, name: 'سجادة تركية فاخرة', cat: 'home', price: 750, oldPrice: null, rating: 4.8, reviews: 34, badge: null, isNew: false, emoji: '🪄', gradient: 'linear-gradient(135deg,#f6416c,#ffcd3c)' },
  { id: 15, name: 'طقم شموع معطرة', cat: 'home', price: 120, oldPrice: 180, rating: 4.6, reviews: 188, badge: 'sale', isNew: false, emoji: '🕯️', gradient: 'linear-gradient(135deg,#ffecd2,#fcb69f)' },
  { id: 16, name: 'نباتة زينة مع إناء', cat: 'home', price: 85, oldPrice: null, rating: 4.4, reviews: 76, badge: null, isNew: true, emoji: '🪴', gradient: 'linear-gradient(135deg,#11998e,#38ef7d)' },

  // رياضة
  { id: 17, name: 'حذاء رياضي Nike', cat: 'sports', price: 520, oldPrice: 750, rating: 4.9, reviews: 423, badge: 'sale', isNew: false, emoji: '👟', gradient: 'linear-gradient(135deg,#f7971e,#ffd200)' },
  { id: 18, name: 'كرة قدم أصلية', cat: 'sports', price: 180, oldPrice: null, rating: 4.6, reviews: 145, badge: null, isNew: false, emoji: '⚽', gradient: 'linear-gradient(135deg,#1a1a1a,#4a4a4a)' },
  { id: 19, name: 'حقيبة رياضية', cat: 'sports', price: 240, oldPrice: 320, rating: 4.5, reviews: 88, badge: 'sale', isNew: false, emoji: '🎒', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { id: 20, name: 'ماء التمارين الذكي', cat: 'sports', price: 95, oldPrice: null, rating: 4.3, reviews: 210, badge: null, isNew: true, emoji: '🥤', gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)' },

  // جمال
  { id: 21, name: 'عطر Rose Oud', cat: 'beauty', price: 380, oldPrice: 520, rating: 4.8, reviews: 267, badge: 'sale', isNew: false, emoji: '🌹', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  { id: 22, name: 'كريم مرطب فاخر', cat: 'beauty', price: 145, oldPrice: null, rating: 4.7, reviews: 189, badge: 'bestseller', isNew: false, emoji: '🧴', gradient: 'linear-gradient(135deg,#ffecd2,#fcb69f)' },
  { id: 23, name: 'ماسكرا طويلة الأمد', cat: 'beauty', price: 85, oldPrice: 125, rating: 4.5, reviews: 334, badge: 'sale', isNew: false, emoji: '👁️', gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)' },
  { id: 24, name: 'أحمر شفاه مات', cat: 'beauty', price: 65, oldPrice: null, rating: 4.4, reviews: 512, badge: null, isNew: true, emoji: '💄', gradient: 'linear-gradient(135deg,#c0392b,#f39c12)' },

  // كتب
  { id: 25, name: 'كتاب العادات الذرية', cat: 'books', price: 55, oldPrice: 75, rating: 4.9, reviews: 892, badge: 'bestseller', isNew: false, emoji: '📗', gradient: 'linear-gradient(135deg,#2ecc71,#27ae60)' },
  { id: 26, name: 'فن التسويق الرقمي', cat: 'books', price: 70, oldPrice: null, rating: 4.7, reviews: 234, badge: null, isNew: true, emoji: '📘', gradient: 'linear-gradient(135deg,#3498db,#2980b9)' },
  { id: 27, name: 'ريادة الأعمال ٢٠٢٥', cat: 'books', price: 90, oldPrice: 120, rating: 4.8, reviews: 156, badge: 'sale', isNew: false, emoji: '📙', gradient: 'linear-gradient(135deg,#e67e22,#d35400)' },
  { id: 28, name: 'قصص الليل العربية', cat: 'books', price: 45, oldPrice: null, rating: 4.6, reviews: 78, badge: null, isNew: false, emoji: '📕', gradient: 'linear-gradient(135deg,#e74c3c,#c0392b)' },
];

const PROMO_CODES = {
  'SAVE30': { type: 'percent', value: 30, label: 'خصم ٣٠٪' },
  'WELCOME10': { type: 'percent', value: 10, label: 'خصم ترحيبي ١٠٪' },
  'FREE50': { type: 'fixed', value: 50, label: 'خصم ٥٠ ر.س' },
  'STUDENT20': { type: 'percent', value: 20, label: 'خصم طلابي ٢٠٪' },
};
