export default function Impact() {
  return (
    <>
      {/* Performance & Impact Metrics Section */}
      <section id="impact" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Performance & Impact Metrics</span>
            <h2 className="section-title">ဒေတာအခြေပြု သက်သေပြချက်များ</h2>
            <p className="section-description">ကျွန်ုပ်တို့စနစ်ကို အသုံးပြုခြင်းဖြင့် လုပ်ငန်းလည်ပတ်မှုနှင့် ဝန်ဆောင်မှုအပိုင်းတွင် အောက်ပါအတိုင်း သိသာထင်ရှားစွာ တိုးတက်ပြောင်းလဲလာပါသည်။</p>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-number text-red">-45%</div>
              <div className="metric-title">Phone Bookings</div>
              <div className="metric-desc">ဖုန်းဖြင့် ဘွတ်ကင်လုပ်ရမှု လျော့ကျခြင်း</div>
            </div>
            <div className="metric-card">
              <div className="metric-number text-gold">0%</div>
              <div className="metric-title">Booking Conflicts</div>
              <div className="metric-desc">အချိန်ထပ်ခြင်း၊ အမှားအယွင်းများ လုံးဝမရှိခြင်း</div>
            </div>
            <div className="metric-card">
              <div className="metric-number text-red">-30%</div>
              <div className="metric-title">Waiting Time</div>
              <div className="metric-desc">ဆိုင်တွင်း စောင့်ဆိုင်းရချိန် လျော့ချနိုင်ခြင်း</div>
            </div>
            <div className="metric-card">
              <div className="metric-number text-green">+25%</div>
              <div className="metric-title">Add-on Sales</div>
              <div className="metric-desc">အပိုဆောင်း ဝန်ဆောင်မှုများကြောင့် ဝင်ငွေတိုးတက်လာခြင်း</div>
            </div>
          </div>

          <div className="metrics-caption-box">
            <p className="metrics-caption">အရှေ့ကောင်တာတွင် အလုပ်ရှုပ်မှု သက်သာစေပြီး Pets လေးများအပေါ် ပိုမိုအာရုံစိုက်နိုင်ကာ လုပ်ငန်းဝင်ငွေကို တိုးတက်စေပါသည်။</p>
          </div>
        </div>
      </section>
    </>
  );
}
