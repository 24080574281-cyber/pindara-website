import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ProductVariant, UserVoucher } from '../types';

export interface CartItemEntry {
  variant: ProductVariant;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemEntry[];
  onUpdateQty: (variantId: string, delta: number) => void;
  onRemoveItem: (variantId: string) => void;
  appliedVoucher: UserVoucher | null;
  onApplyVoucherCode: (code: string) => boolean;
  onRemoveVoucher: () => void;
  adminWhatsApp: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  appliedVoucher,
  onApplyVoucherCode,
  onRemoveVoucher,
  adminWhatsApp,
}) => {
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.variant.price * curr.quantity, 0);

  let discount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'nominal') {
      discount = appliedVoucher.discountAmount;
    } else if (appliedVoucher.discountType === 'percent') {
      discount = Math.round((subtotal * appliedVoucher.discountAmount) / 100);
    } else if (appliedVoucher.discountType === 'free_product') {
      discount = 8500;
    }
  }

  const grandTotal = Math.max(0, subtotal - discount);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    if (!voucherInput.trim()) return;

    const ok = onApplyVoucherCode(voucherInput.trim());
    if (!ok) {
      setVoucherError('Kode voucher tidak ditemukan atau belum aktif.');
    } else {
      setVoucherInput('');
    }
  };

  const handleCheckoutWhatsApp = () => {
    const itemList = items
      .map(
        (it) => `• ${it.variant.name} (${it.quantity}x) = Rp ${(it.variant.price * it.quantity).toLocaleString('id-ID')}`
      )
      .join('%0A');

    const vocNote = appliedVoucher ? `%0AVoucher: ${appliedVoucher.code} (-Rp ${discount.toLocaleString('id-ID')})` : '';

    const msg = `Halo PINDARA Jepara Official!%0ASaya ingin memesan mi instan PINDARA Pindang Serani:%0A%0A${itemList}${vocNote}%0A%0ATotal Pembayaran: Rp ${grandTotal.toLocaleString('id-ID')}%0A%0AMohon informasi ongkir dan nomor rekening ya. Terima kasih!`;

    const cleanWa = adminWhatsApp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanWa}?text=${msg}`, '_blank');
  };

  const handleDirectCheckout = () => {
    const orderId = `PND-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSuccess(orderId);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#123E46]/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#FFF8F1] h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Cart Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#123E46]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006A66] text-[24px]">shopping_bag</span>
            <h3 className="font-['Chewy',sans-serif] text-2xl text-[#123E46] tracking-wide">
              Keranjang Belanja
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] text-xs font-bold">
              {items.reduce((a, b) => a + b.quantity, 0)} item
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#123E46]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Success Modal Overlay */}
        {orderSuccess ? (
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#86F5EE] text-[#006A66] flex items-center justify-center text-3xl">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-[#123E46]">Pesanan Berhasil Dicatat!</h4>
              <p className="text-xs text-gray-500 mt-1">
                Nomor Pesanan: <span className="font-mono font-bold text-[#006A66]">{orderSuccess}</span>
              </p>
            </div>
            <p className="text-xs text-[#1F1B12]/80 max-w-xs">
              Terima kasih telah memesan PINDARA Mi Instan Pindang Serani! Tim kami akan segera memproses
              dan memverifikasi batch pesanan Anda.
            </p>
            <button
              onClick={() => {
                setOrderSuccess(null);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#123E46] text-white text-xs font-bold shadow-md"
            >
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center text-[#1F1B12]/50 space-y-2">
                  <span className="material-symbols-outlined text-4xl text-gray-300">
                    remove_shopping_cart
                  </span>
                  <p className="text-xs">Keranjang belanjamu masih kosong.</p>
                </div>
              ) : (
                items.map((it) => (
                  <div
                    key={it.variant.id}
                    className="p-3 bg-white rounded-2xl border border-[#123E46]/10 flex items-center gap-3 shadow-sm"
                  >
                    <img
                      src={ASSETS.daraHero}
                      alt={it.variant.name}
                      className="w-14 h-14 object-contain rounded-xl bg-[#FFF8F1] p-1 border border-[#123E46]/10 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="font-bold text-xs text-[#123E46] truncate">{it.variant.name}</h5>
                      <span className="text-[11px] text-[#006A66] font-semibold block">
                        Rp {it.variant.price.toLocaleString('id-ID')}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => onUpdateQty(it.variant.id, -1)}
                          className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs font-bold w-4 text-center">
                          {it.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(it.variant.id, 1)}
                          className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xs text-[#123E46] block font-mono">
                        Rp {(it.variant.price * it.quantity).toLocaleString('id-ID')}
                      </span>
                      <button
                        onClick={() => onRemoveItem(it.variant.id)}
                        className="text-[11px] text-red-500 hover:text-red-700 mt-1"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Coupon / Voucher Code Input */}
              {items.length > 0 && (
                <div className="p-3 bg-white rounded-2xl border border-[#123E46]/10 space-y-2">
                  <span className="text-[11px] font-bold text-[#123E46] block">
                    Punya Voucher Diskon?
                  </span>
                  {appliedVoucher ? (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#86F5EE]/30 text-[#006A66] text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span className="font-bold">{appliedVoucher.code}</span>
                        <span>(-Rp {discount.toLocaleString('id-ID')})</span>
                      </div>
                      <button
                        onClick={onRemoveVoucher}
                        className="text-[11px] text-red-600 font-bold hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyVoucher} className="flex gap-2">
                      <input
                        type="text"
                        value={voucherInput}
                        onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                        placeholder="KODE VOUCHER"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-mono uppercase tracking-wider outline-none focus:ring-1 focus:ring-[#55C6C0]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-[#123E46] text-white text-xs font-bold"
                      >
                        Terapkan
                      </button>
                    </form>
                  )}
                  {voucherError && <p className="text-[10px] text-red-600">{voucherError}</p>}
                </div>
              )}
            </div>

            {/* Summary & Checkout Actions */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 bg-white border-t border-[#123E46]/10 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-mono">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#006A66] font-semibold">
                      <span>Diskon Voucher:</span>
                      <span className="font-mono">- Rp {discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-[#123E46] pt-1 border-t border-gray-100">
                    <span>Total Pembayaran:</span>
                    <span className="font-mono text-[#006A66]">
                      Rp {grandTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Order via WA</span>
                  </button>
                  <button
                    onClick={handleDirectCheckout}
                    className="w-full py-3 rounded-full bg-[#123E46] hover:bg-[#1B535D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>Checkout Langsung</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
