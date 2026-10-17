import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ProductDetails, ProductVariant } from '../types';

interface ShopPageProps {
  product: ProductDetails;
  onAddToCart: (variant: ProductVariant, qty: number) => void;
  onBuyNow: (variant: ProductVariant, qty: number) => void;
  adminWhatsApp: string;
  onUpdateAdminConfig: (price: number, stock: 'Tersedia' | 'Stok Menipis' | 'Habis', wa: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  adminWhatsApp,
  onUpdateAdminConfig,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[1] || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'ingredients' | 'cooking'>('desc');
  const [showAdminDrawer, setShowAdminDrawer] = useState(false);

  // Admin form state
  const [adminPrice, setAdminPrice] = useState(product.basePrice);
  const [adminStock, setAdminStock] = useState(product.stockStatus);
  const [adminWaInput, setAdminWaInput] = useState(adminWhatsApp);
  const [adminSaveSuccess, setAdminSaveSuccess] = useState(false);

  const handleAdminSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAdminConfig(adminPrice, adminStock, adminWaInput);
    setAdminSaveSuccess(true);
    setTimeout(() => {
      setAdminSaveSuccess(false);
      setShowAdminDrawer(false);
    }, 1200);
  };

  const handleOrderWhatsAppDirect = () => {
    const total = selectedVariant.price * quantity;
    const msg = `Halo PINDARA Official!%0ASaya ingin memesan ${quantity}x ${selectedVariant.name} (Total: Rp ${total.toLocaleString('id-ID')}).%0AMohon info ketersediaan stok & pengiriman ke alamat saya. Terima kasih!`;
    const cleanWa = adminWhatsApp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanWa}?text=${msg}`, '_blank');
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-6 px-4 pb-12">
      {/* Header Title & Subtitle */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#006A66] uppercase tracking-wider block">
            Official Storefront
          </span>
          <h1 className="font-['Chewy',sans-serif] text-3xl sm:text-4xl text-[#123E46] tracking-wide">
            DARA-SHOP
          </h1>
        </div>
        <button
          onClick={() => setShowAdminDrawer(true)}
          className="px-3 py-1.5 rounded-full bg-white border border-[#123E46]/10 text-xs text-[#123E46] font-bold hover:bg-[#86F5EE]/30 transition-colors flex items-center gap-1 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span className="hidden sm:inline">Konfigurasi Toko</span>
        </button>
      </div>

      {/* Main Product Showcase Card */}
      <div className="bg-white rounded-3xl border border-[#123E46]/10 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-6">
        {/* Left Column: Product Imagery with Dara Mascot */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square max-w-[320px] rounded-3xl bg-gradient-to-tr from-[#FFF5E5] via-[#FFF8F1] to-[#86F5EE]/30 p-6 flex items-center justify-center border border-[#123E46]/5 shadow-inner">
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold">
              100% Sari Ikan Jepara
            </div>
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FFF5E5] border border-[#DE9050]/30 text-[#DE9050] text-[10px] font-bold">
              Tanpa Pengawet
            </div>

            <img
              src={ASSETS.daraHero}
              alt="PINDARA Mi Instan Pindang Serani"
              className="w-full h-full object-contain filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute bottom-3 inset-x-4 text-center">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#123E46]/10 text-[11px] font-bold text-[#123E46] shadow-sm">
                Kemasan Eksklusif 85g
              </span>
            </div>
          </div>

          {/* Trust Badges Bar */}
          <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center text-[10px] text-[#123E46]">
            <div className="bg-[#FFF8F1] p-2 rounded-xl border border-[#123E46]/5">
              <span className="material-symbols-outlined text-[#006A66] text-[16px] block mb-0.5">verified</span>
              <span className="font-bold">Halal BPJPH</span>
            </div>
            <div className="bg-[#FFF8F1] p-2 rounded-xl border border-[#123E46]/5">
              <span className="material-symbols-outlined text-[#006A66] text-[16px] block mb-0.5">health_and_safety</span>
              <span className="font-bold">Izin Dinkes P-IRT</span>
            </div>
            <div className="bg-[#FFF8F1] p-2 rounded-xl border border-[#123E46]/5">
              <span className="material-symbols-outlined text-[#006A66] text-[16px] block mb-0.5">local_shipping</span>
              <span className="font-bold">Kirim Seluruh RI</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Purchase Contiguous Module */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-[#86F5EE]/40 text-[#006A66] text-[10px] font-bold uppercase">
                {product.stockStatus}
              </span>
              <span className="text-[11px] text-gray-500">Netto: {product.netWeight}</span>
            </div>

            <h2 className="font-['Chewy',sans-serif] text-2xl sm:text-3xl text-[#123E46] tracking-wide leading-tight">
              {product.name}
            </h2>

            <p className="text-xs text-[#1F1B12]/80 mt-1 leading-relaxed">
              {product.tagline}
            </p>

            {/* Price Showcase */}
            <div className="mt-3 p-3.5 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-500 block">Harga Paket Pilihan:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#006A66] font-mono">
                    Rp {selectedVariant.price.toLocaleString('id-ID')}
                  </span>
                  {selectedVariant.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-mono">
                      Rp {selectedVariant.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>
              {selectedVariant.badge && (
                <span className="px-2.5 py-1 rounded-full bg-[#DE9050] text-white text-[10px] font-bold shadow-sm">
                  {selectedVariant.badge}
                </span>
              )}
            </div>

            {/* Select Packaging Variant */}
            <div className="mt-4 space-y-2">
              <label className="text-xs font-bold text-[#123E46] block">
                Pilih Paket Pembelian:
              </label>
              <div className="space-y-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#006A66] bg-[#86F5EE]/10 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#123E46]">{v.name}</span>
                          {v.badge && (
                            <span className="px-1.5 py-0.2 rounded bg-[#FFF5E5] text-[#DE9050] text-[9px] font-bold">
                              {v.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500 block mt-0.5 leading-snug">
                          {v.description}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-xs font-bold text-[#006A66]">
                          Rp {v.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-[#123E46]">Jumlah Pembelian:</span>
              <div className="flex items-center gap-3 bg-[#FFF8F1] border border-[#123E46]/10 rounded-2xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-6 text-center font-mono font-bold text-xs">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Purchase Action Buttons */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onAddToCart(selectedVariant, quantity)}
                className="py-3 rounded-full bg-[#86F5EE] hover:bg-[#55C6C0] text-[#00201E] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                <span>Tambah Keranjang</span>
              </button>
              <button
                type="button"
                onClick={() => onBuyNow(selectedVariant, quantity)}
                className="py-3 rounded-full bg-[#123E46] hover:bg-[#1B535D] text-[#FFF8F1] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Beli Sekarang</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleOrderWhatsAppDirect}
              className="w-full py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Konsultasi & Pesan via WhatsApp CS Resmi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Nutrition Facts, Composition, Cooking Steps */}
      <div className="bg-white rounded-3xl border border-[#123E46]/10 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 bg-[#FFF8F1] px-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('desc')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'desc'
                ? 'border-[#006A66] text-[#006A66]'
                : 'border-transparent text-gray-500 hover:text-[#123E46]'
            }`}
          >
            Cita Rasa Serani
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'nutrition'
                ? 'border-[#006A66] text-[#006A66]'
                : 'border-transparent text-gray-500 hover:text-[#123E46]'
            }`}
          >
            Informasi Nilai Gizi
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'ingredients'
                ? 'border-[#006A66] text-[#006A66]'
                : 'border-transparent text-gray-500 hover:text-[#123E46]'
            }`}
          >
            Komposisi Resmi
          </button>
          <button
            onClick={() => setActiveTab('cooking')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'cooking'
                ? 'border-[#006A66] text-[#006A66]'
                : 'border-transparent text-gray-500 hover:text-[#123E46]'
            }`}
          >
            Cara Penyajian (3 Menit)
          </button>
        </div>

        <div className="p-5 text-xs text-[#1F1B12]/80 leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-3">
              <p>{product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/5">
                  <span className="font-bold text-[#006A66] block mb-1">Kuah Bening Tanpa Santan</span>
                  <p className="text-[11px] text-gray-600">
                    Khas Pindang Serani Jepara yang ringan, tidak eneg, dan kaya antioksidan dari kunyit bakar.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/5">
                  <span className="font-bold text-[#DE9050] block mb-1">Belimbing Wuluh Alami</span>
                  <p className="text-[11px] text-gray-600">
                    Menyajikan keasaman segar alami yang memacu selera makan tanpa rasa tajam cuka buatan.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/5">
                  <span className="font-bold text-[#79513A] block mb-1">Mi Pipih Kenyal Spesial</span>
                  <p className="text-[11px] text-gray-600">
                    Didesain khusus untuk menyerap sempurna kuah kaldu rempah ikan laut hingga suapan terakhir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-3 max-w-md">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-bold text-xs text-[#123E46]">Takaran Saji:</span>
                <span className="font-mono">{product.nutrition.servingSize}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-bold text-xs text-[#123E46]">Energi Total:</span>
                <span className="font-mono font-bold text-[#006A66]">
                  {product.nutrition.calories} kkal
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-[#FFF8F1] rounded-xl">
                  <span className="text-gray-500 block">Lemak Total</span>
                  <span className="font-semibold text-[#123E46]">{product.nutrition.totalFat}</span>
                </div>
                <div className="p-2 bg-[#FFF8F1] rounded-xl">
                  <span className="text-gray-500 block">Protein</span>
                  <span className="font-semibold text-[#123E46]">{product.nutrition.protein}</span>
                </div>
                <div className="p-2 bg-[#FFF8F1] rounded-xl">
                  <span className="text-gray-500 block">Karbohidrat Total</span>
                  <span className="font-semibold text-[#123E46]">{product.nutrition.carbs}</span>
                </div>
                <div className="p-2 bg-[#FFF8F1] rounded-xl">
                  <span className="text-gray-500 block">Serat Pangan</span>
                  <span className="font-semibold text-[#123E46]">{product.nutrition.fiber}</span>
                </div>
                <div className="p-2 bg-[#FFF8F1] rounded-xl">
                  <span className="text-gray-500 block">Natrium (Garam)</span>
                  <span className="font-semibold text-[#123E46]">{product.nutrition.sodium}</span>
                </div>
                <div className="p-2 bg-[#FFF8F1] rounded-xl">
                  <span className="text-gray-500 block">Kandungan Omega-3</span>
                  <span className="font-semibold text-[#006A66] font-bold">
                    {product.nutrition.omega3}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#123E46] block">
                Komposisi Berdasarkan Data Resmi:
              </span>
              <ul className="space-y-2">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#FFF8F1] p-2.5 rounded-xl">
                    <span className="material-symbols-outlined text-[#006A66] text-[16px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'cooking' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.cookingSteps.map((st) => (
                  <div
                    key={st.step}
                    className="p-3.5 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-[#123E46] text-white flex items-center justify-center font-bold text-xs">
                        {st.step}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] font-bold">
                        {st.time}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-[#123E46]">{st.title}</h5>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{st.instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Admin Store Configurator Drawer/Modal */}
      {showAdminDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123E46]/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#FFF8F1] rounded-3xl p-5 shadow-2xl border border-[#123E46]/10 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006A66] text-[24px]">tune</span>
                <h3 className="font-['Chewy',sans-serif] text-xl text-[#123E46]">
                  Pengaturan Toko (Admin Panel)
                </h3>
              </div>
              <button
                onClick={() => setShowAdminDrawer(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#123E46]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Admin dapat mengelola harga eceran satuan, status ketersediaan stok, dan nomor WhatsApp
              resmi pemesanan langsung konsumen.
            </p>

            <form onSubmit={handleAdminSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#123E46] block mb-1">
                  Harga Satuan Mi (Rp)
                </label>
                <input
                  type="number"
                  value={adminPrice}
                  onChange={(e) => setAdminPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-[#123E46] block mb-1">Status Ketersediaan</label>
                <select
                  value={adminStock}
                  onChange={(e) =>
                    setAdminStock(e.target.value as 'Tersedia' | 'Stok Menipis' | 'Habis')
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300"
                >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Stok Menipis">Stok Menipis</option>
                  <option value="Habis">Habis</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#123E46] block mb-1">
                  Nomor WhatsApp CS Resmi (Format: 628...)
                </label>
                <input
                  type="text"
                  value={adminWaInput}
                  onChange={(e) => setAdminWaInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 font-mono"
                />
              </div>

              {adminSaveSuccess && (
                <div className="p-2 bg-[#86F5EE]/40 text-[#006A66] rounded-xl font-semibold text-center">
                  Pengaturan toko berhasil diperbarui!
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminDrawer(false)}
                  className="flex-1 py-2.5 rounded-full bg-gray-200 text-[#123E46] font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-[#123E46] text-white font-bold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
