"use client";

import { useState } from "react";
import Link from "next/link";

export default function Services() {
  const [activeAddons, setActiveAddons] = useState({
    teeth: false,
    deshed: false,
    nails: false,
  });

  const toggleAddon = (addon) => {
    setActiveAddons((prev) => ({
      ...prev,
      [addon]: !prev[addon],
    }));
  };

  return (
    <>
      {/* Core Product Pillars & Features Section */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Key Features</span>
            <h2 className="section-title">ကျွန်ုပ်တို့၏ ခေတ်မီဆန်းသစ်သော ဝန်ဆောင်မှုစနစ်</h2>
            <p className="section-description">ခွေးလေးများနှင့် ကြောင်လေးများ၏ မျိုးရိုးဗီဇ အရွယ်အစား (Breed Size) နှင့် အမွှေးအမျိုးအစား (Fur Coat Types) ပေါ်မူတည်၍ ဝန်ဆောင်မှုပေးရမည့် အချိန်နှင့် ဈေးနှုန်းကို စနစ်တကျ အလိုအလျောက် တွက်ချက်ပေးပါသည်။</p>
          </div>

          <div className="features-layout">
            <div className="features-info">
              <h3 className="features-subheading">စိတ်ကြိုက်ရွေးချယ်နိုင်သော အပိုဆောင်းဝန်ဆောင်မှုများ</h3>
              <p className="features-text">အခြေခံ Spa Package များအပြင် သင့်အချစ်တော်လေးများအတွက် အထူးလိုအပ်သော အောက်ပါ အပိုဆောင်းဝန်ဆောင်မှု (Add-ons) များကို တစ်ချက်နှိပ်ရုံဖြင့် လွယ်ကူစွာ ရွေးချယ်ပေါင်းစပ်နိုင်ပါသည် -</p>
              
              {/* Interactive Add-ons Preview List */}
              <div className="interactive-addons-list">
                <div 
                  className={`addon-preview-card ${activeAddons.teeth ? "active" : ""}`} 
                  onClick={() => toggleAddon("teeth")}
                >
                  <div className="addon-preview-header">
                    <span className="addon-preview-icon">🪥</span>
                    <span className="addon-preview-title">Teeth Cleaning</span>
                  </div>
                  <span className="addon-preview-price">+5,000 MMK</span>
                </div>
                <div 
                  className={`addon-preview-card ${activeAddons.deshed ? "active" : ""}`} 
                  onClick={() => toggleAddon("deshed")}
                >
                  <div className="addon-preview-header">
                    <span className="addon-preview-icon">🧴</span>
                    <span className="addon-preview-title">De-shedding Treatment</span>
                  </div>
                  <span className="addon-preview-price">+7,000 MMK</span>
                </div>
                <div 
                  className={`addon-preview-card ${activeAddons.nails ? "active" : ""}`} 
                  onClick={() => toggleAddon("nails")}
                >
                  <div className="addon-preview-header">
                    <span className="addon-preview-icon">✂️</span>
                    <span className="addon-preview-title">Nail Clip</span>
                  </div>
                  <span className="addon-preview-price">+3,000 MMK</span>
                </div>
              </div>
            </div>

            {/* Payment Support Display */}
            <div className="checkout-feature-card">
              <div className="checkout-header">
                <div className="checkout-icon">💳</div>
                <h4>Frictionless Checkout</h4>
              </div>
              <p className="checkout-desc">မြန်မာနိုင်ငံရှိ လူသုံးအများဆုံး Mobile Wallets များဖြစ်သော KBZPay, WaveMoney တို့ဖြင့် ငွေပေးချေမှုများကို မြန်ဆန်ချောမွေ့စွာ ပြုလုပ်နိုင်ပါသည်။</p>
              <div className="wallet-logos">
                <div className="wallet-badge kbz">KBZPay</div>
                <div className="wallet-badge wave">WaveMoney</div>
                <div className="wallet-badge card">Mobile Banking</div>
              </div>
            </div>
          </div>

          <div className="section-actions" style={{ textAlign: "center", marginTop: "60px" }}>
            <Link href="/booking" className="btn btn-primary">အခုပဲ စာရင်းသွင်း ကြိုတင်ဘွတ်ကင်လုပ်ရန်</Link>
          </div>
        </div>
      </section>
    </>
  );
}
