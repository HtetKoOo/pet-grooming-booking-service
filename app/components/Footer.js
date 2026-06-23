import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo">
            <svg className="logo-icon yellow-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.2.21 2.35.59 3.42l1.66-1.66a6.002 6.002 0 0 1 7.23-7.23l1.66-1.66A9.957 9.957 0 0 0 12 2zm8.59 6.58l-1.66 1.66a6.002 6.002 0 0 1-7.23 7.23l-1.66 1.66c1.07.38 2.22.59 3.42.59 5.523 0 10-4.477 10-10 0-1.2-.21-2.35-.59-3.42z"/>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-5.5 2.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM6.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
            </svg>
            <span className="logo-text">Pet Planet</span>
          </div>
          <p className="footer-tagline">ခေတ်မီဆန်းသစ်ပြီး အကောင်းဆုံး Spa & Grooming ဝန်ဆောင်မှုစနစ်</p>
        </div>
        <div className="footer-links">
          <Link href="/" className="footer-link">အဓိကစာမျက်နှာ</Link>
          <Link href="/services" className="footer-link">ဝန်ဆောင်မှုများ</Link>
          <Link href="/system" className="footer-link">စနစ်အကြောင်း</Link>
          <Link href="/booking" className="footer-link">ကြိုတင်ဘွတ်ကင်လုပ်ရန်</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pet Planet (ပက်ပလနက်). All rights reserved.</p>
      </div>
    </footer>
  );
}
