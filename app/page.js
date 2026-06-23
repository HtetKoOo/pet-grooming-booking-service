import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="badge">Smart Pet Grooming Booking System</span>
            <h1 className="hero-title">ကြိုက်နှစ်သက်ရာ Package ဖြင့် Spa & Grooming Service ကို ရယူနိုင်ပါပြီ</h1>
            <p className="hero-subtitle">ခေတ်မီဆန်းသစ်ပြီး လူကြီးမင်းတို့ရဲ့ အချစ်တော်လေးတွေအတွက် အကောင်းဆုံး ဂရုစိုက်မှုစနစ် (Smart Pet Grooming Booking System)</p>
            <div className="hero-actions">
              <Link href="/booking" className="btn btn-primary">အခုပဲ စာရင်းသွင်း ကြိုတင်ဘွတ်ကင်လုပ်ရန်</Link>
              <Link href="/services" className="btn btn-secondary">ပိုမိုလေ့လာရန်</Link>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="hero-card">
              <div className="hero-card-header">
                <span className="status-indicator-dot online"></span>
                <span className="panel-title">System Status: Active</span>
              </div>
              <div className="hero-card-body">
                <div className="customer-avatar-row">
                  <div className="avatar-circle dog">🐶</div>
                  <div className="avatar-circle cat">🐱</div>
                  <div className="avatar-circle info">+24/7</div>
                </div>
                <div className="mock-notification">
                  <div className="mock-icon">✨</div>
                  <div>
                    <p className="mock-title">Smart Scheduling</p>
                    <p className="mock-desc">Automated reservation and notifications active.</p>
                  </div>
                </div>
                <div className="mock-chart">
                  <div className="bar-col" style={{ height: "60%" }}></div>
                  <div className="bar-col" style={{ height: "80%" }}></div>
                  <div className="bar-col" style={{ height: "45%" }}></div>
                  <div className="bar-col" style={{ height: "95%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Users Section */}
      <section id="target-market" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Target Market</span>
            <h2 className="section-title">မည်သူမဆို လွယ်ကူစွာ အသုံးပြုနိုင်သော စနစ်</h2>
            <p className="section-description">ကျွန်ုပ်တို့၏စနစ်ကို မတူညီသော သုံးစွဲသူအုပ်စုများ၏ လိုအပ်ချက်များအားလုံးကို ဖြည့်ဆည်းပေးနိုင်ရန် သေသေချာချာ ပုံဖော်ဖန်တီးထားပါသည်။</p>
          </div>
          
          <div className="cards-grid">
            {/* Tech-Savvy Owners Card */}
            <div className="user-card">
              <div className="card-icon-box">
                <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="card-title">နည်းပညာသုံး အိမ်မွေးတိရစ္ဆာန်ပိုင်ရှင်များ</h3>
              <p className="card-text">နေ့စဉ် အလုပ်ကိစ္စများကို ဒစ်ဂျစ်တယ်စနစ်ဖြင့် လွယ်ကူစွာ စီမံခန့်ခွဲလိုသူများအတွက် ဖန်တီးထားပါသည်။</p>
              <ul className="card-features">
                <li>
                  <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ပြောင်မြောက်သေသပ်သော အင်တာဖေ့စ် (Sleek interface)
                </li>
                <li>
                  <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ဒစ်ဂျစ်တယ် အိမ်မွေးတိရစ္ဆာန် ကိုယ်ရေးအချက်အလက်များ (Digital pet profiles)
                </li>
                <li>
                  <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 ကိုယ်တိုင်ဘွတ်ကင်လုပ်နိုင်မှု (24/7 self-service reservation)
                </li>
              </ul>
            </div>

            {/* Busy Professionals Card */}
            <div className="user-card">
              <div className="card-icon-box">
                <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="card-title">အချိန်မအားလပ်သော လုပ်ငန်းရှင်များ</h3>
              <p className="card-text">ဖုန်းခေါ်ဆိုမှုများဖြင့် အချိန်မကုန်စေဘဲ တိကျသေချာသော အချိန်ဇယားကို လိုချင်သူများအတွက် ဖြစ်သည်။</p>
              <ul className="card-features">
                <li>
                  <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  တိကျသော အချိန်ဇယားများ (Precise grooming slots)
                </li>
                <li>
                  <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  အလိုအလျောက် စာရင်းသွင်းဝင်ရောက်မှု (Automated check-in)
                </li>
                <li>
                  <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ချက်ချင်းအသိပေးချက်များ (Instant push reminders)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
