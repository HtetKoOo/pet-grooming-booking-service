"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

function TrackerContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const email = searchParams.get("email") || "";
  const petType = searchParams.get("petType") || "";
  const breedSize = searchParams.get("breedSize") || "";
  const selectedDate = searchParams.get("selectedDate") || "";
  const selectedTime = searchParams.get("selectedTime") || "";
  const price = searchParams.get("price") || "";
  const duration = searchParams.get("duration") || "";

  const isSimActive = !!(name && phone && petType && breedSize);

  const [currentStep, setCurrentStep] = useState(0);
  const [showSmsToast, setShowSmsToast] = useState(false);

  useEffect(() => {
    if (!isSimActive) return;

    let timeoutId;

    const runSimulationStep = (step) => {
      if (step === 1) {
        setCurrentStep(1);
        timeoutId = setTimeout(() => {
          runSimulationStep(2);
        }, 2500);
      } else if (step === 2) {
        setCurrentStep(2);
        timeoutId = setTimeout(() => {
          runSimulationStep(3);
        }, 3000);
      } else if (step === 3) {
        setCurrentStep(3);
        timeoutId = setTimeout(() => {
          runSimulationStep(4);
        }, 3000);
      } else if (step === 4) {
        setCurrentStep(4);
        setShowSmsToast(true);

        // Send ready for pickup email using Resend
        fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: email,
            subject: "Pet Planet - Your Pet is Ready for Pickup! 🏠✨",
            name: name,
            useReactEmail: true,
            preventThreading: true,
            emailType: "pickup",
            bookingDetails: {
              petType,
              breedSize: breedSize === "small" ? "အသေးစား" : breedSize === "medium" ? "အလယ်အလတ်" : "အကြီးစား",
              price: `${Number(price).toLocaleString("en-US")} MMK`,
              duration: `${duration} မိနစ် (mins)`,
              date: selectedDate,
              time: selectedTime,
            },
          }),
        }).catch((err) => console.error("Resend pickup email failed:", err));

        // Auto close SMS alert after 8s
        timeoutId = setTimeout(() => {
          setShowSmsToast(false);
        }, 8000);
      }
    };

    // Kick off simulation sequence after 1.2s
    timeoutId = setTimeout(() => {
      runSimulationStep(1);
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [isSimActive, name, phone, email, petType, breedSize, selectedDate, selectedTime, price, duration]);

  // UI labels formatting
  let sizeText = "";
  if (breedSize === "small") sizeText = "အသေးစား";
  else if (breedSize === "medium") sizeText = "အလယ်အလတ်";
  else if (breedSize === "large") sizeText = "အကြီးစား";

  const petTypeName = petType === "dog" ? "ခွေးလေး" : "ကြောင်လေး";

  const pageTitle = isSimActive
    ? `${name} ၏ အချစ်တော် ${sizeText} ${petTypeName} အား ခြေရာခံခြင်း`
    : "Live Tracker စနစ်ဖြင့် အချိန်နှင့်တပြေးညီ ခြေရာခံခြင်း";

  const pageDesc = isSimActive
    ? "ဘွတ်ကင်လုပ်ခြင်း အောင်မြင်ပြီးပါပြီ။ အချစ်တော်လေး၏ ဝန်ဆောင်မှုအဆင့်ဆင့်ကို ခြေရာခံ စောင့်ကြည့်နိုင်ပါသည်။"
    : "လူကြီးမင်းတို့၏ အချစ်တော်လေးများ Spa & Grooming ပြုလုပ်နေစဉ် မည်သည့်အဆင့်သို့ ရောက်ရှိနေသည်ကို စနစ်မှ တိုက်ရိုက်ခြေရာခံ စောင့်ကြည့်နိုင်ပါသည်။";

  let progressWidth = "0%";
  let statusText = "စတင်ရန် စောင့်ဆိုင်းနေပါသည်...";

  if (currentStep === 1) {
    progressWidth = "25%";
    statusText = "အဆင့် ၁ - စနစ်ထဲ စတင်စာရင်းသွင်းခြင်း (Check-In) အောင်မြင်ပါပြီ။";
  } else if (currentStep === 2) {
    progressWidth = "50%";
    statusText = "အဆင့် ၂ - အချစ်တော်လေးကို ရေချိုးသန့်စင်ပေးနေပါပြီ (Bathing)...";
  } else if (currentStep === 3) {
    progressWidth = "75%";
    statusText = "အဆင့် ၃ - အမွှေးအမျှင် ပုံဖော်ညှပ်ပေးခြင်း ပြုလုပ်နေပါပြီ (Styling)...";
  } else if (currentStep === 4) {
    progressWidth = "100%";
    statusText = "အဆင့် ၄ - Spa & Grooming ပြီးဆုံး၍ အိမ်ပြန်ရန် အဆင်သင့်ဖြစ်ပါပြီ (Ready)။";
  }

  return (
    <>
      <section id="system" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">System Architecture & Live Tracker</span>
            <h2 className="section-title" id="trackerPageTitle">{pageTitle}</h2>
            <p className="section-description" id="trackerPageDesc">{pageDesc}</p>
          </div>

          {/* Visual Stepper */}
          <div className="tracker-container">
            <div className="tracker-steps" id="trackerSteps">
              {/* Step 1 */}
              <div className={`step-node ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`} id="step-1">
                <div className="step-circle">1</div>
                <div className="step-label">စနစ်ထဲ စတင်စာရင်းသွင်းခြင်း</div>
                <div className="step-sublabel">Check-In</div>
              </div>
              <div className={`step-connector ${currentStep > 1 ? "completed" : currentStep === 1 ? "active" : ""}`} id="connector-1"></div>
              
              {/* Step 2 */}
              <div className={`step-node ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`} id="step-2">
                <div className="step-circle">2</div>
                <div className="step-label">ရေချိုးသန့်စင်ပေးခြင်း</div>
                <div className="step-sublabel">Bathing</div>
              </div>
              <div className={`step-connector ${currentStep > 2 ? "completed" : currentStep === 2 ? "active" : ""}`} id="connector-2"></div>
              
              {/* Step 3 */}
              <div className={`step-node ${currentStep === 3 ? "active" : currentStep > 3 ? "completed" : ""}`} id="step-3">
                <div className="step-circle">3</div>
                <div className="step-label">အမွှေးအမျှင် ပုံဖော်ညှပ်ပေးခြင်း</div>
                <div className="step-sublabel">Styling</div>
              </div>
              <div className={`step-connector ${currentStep > 3 ? "completed" : currentStep === 3 ? "active" : ""}`} id="connector-3"></div>
              
              {/* Step 4 */}
              <div className={`step-node ${currentStep === 4 ? "completed" : ""}`} id="step-4">
                <div className="step-circle">4</div>
                <div className="step-label">အိမ်ပြန်ရန် အဆင်သင့်ဖြစ်ခြင်း</div>
                <div className="step-sublabel">Ready</div>
              </div>
            </div>

            {/* Tracker Progress Bar */}
            {isSimActive && (
              <div className="tracker-system-progress" id="trackerSystemProgressBox" style={{ marginBottom: "30px", display: "block" }}>
                <span className="result-label">Tracking Progress</span>
                <div className="sim-progress-bg">
                  <div className="sim-progress-bar" id="simProgressBar" style={{ width: progressWidth }}></div>
                </div>
                <div className="sim-status-text" id="simStatusText" style={{ marginTop: "6px" }}>{statusText}</div>
              </div>
            )}

            <div className="tracker-info-box">
              <div className="info-icon">💬</div>
              <p className="tracker-info-text">Ready အဆင့်သို့ ရောက်ရှိပါက အလိုအလျောက် SMS နှင့် အီးမေးလ် စနစ်တို့ဖြင့် အကြောင်းကြားပေးမည် ဖြစ်သည်။</p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Milestones Section */}
      <section id="milestones" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The Road Ahead</span>
            <h2 className="section-title">ရှေ့ဆက်လှမ်းမည့် ခြေလှမ်းများနှင့် စနစ်မြှင့်တင်မှုများ</h2>
            <p className="section-description">ကျွန်ုပ်တို့၏ Pet Planet သည် ပိုမိုကောင်းမွန်သော ဝန်ဆောင်မှုများ ပေးအပ်နိုင်ရန်အတွက် နောက်ထပ် စနစ်သစ်များကို ဆက်လက်အကောင်အထည်ဖော်သွားမည် ဖြစ်ပါသည်။</p>
          </div>

          <div className="milestones-timeline">
            <div className="milestone-item">
              <div className="milestone-number">01</div>
              <div className="milestone-content">
                <h3 className="milestone-title">Paws Loyalty Reward System</h3>
                <p className="milestone-text">စနစ်တကျ အမှတ်စုဆောင်းပြီး Rewards ပြန်လည်ရယူနိုင်မည့်စနစ်။ အချစ်တော်လေးများအတွက် ဝန်ဆောင်မှုရယူတိုင်း အမှတ်များစုဆောင်းကာ အထူးလျှော့ဈေးများနှင့် အခမဲ့ဝန်ဆောင်မှုများ ပြန်လည်လဲလှယ်နိုင်မည် ဖြစ်သည်။</p>
              </div>
            </div>
            <div className="milestone-item">
              <div className="milestone-number">02</div>
              <div className="milestone-content">
                <h3 className="milestone-title">Predictive AI Analytics</h3>
                <p className="milestone-text">AI စနစ်သုံးပြီး ရာသီအလိုက် လိုချက်များကို ကြိုတင်ခန့်မှန်းပေးခြင်း။ အပူချိန်နှင့် ရာသီဥတုအပြောင်းအလဲပေါ်မူတည်၍ အိမ်မွေးတိရစ္ဆာန်များ၏ ကျန်းမာရေးနှင့် အမွှေးအမျှင် ပြုပြင်ထိန်းသိမ်းမှု လိုအပ်ချက်များကို ကြိုတင်အကြံပြုပေးမည် ဖြစ်သည်။</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMS Mock Toast */}
      <div className={`sms-toast ${showSmsToast ? "show" : ""}`} id="smsToast">
        <div className="sms-toast-header">
          <span className="sms-logo">💬 SMS Alert</span>
          <button className="sms-close-btn" id="smsCloseBtn" onClick={() => setShowSmsToast(false)}>&times;</button>
        </div>
        <div className="sms-toast-body">
          <p className="sms-sender">To: {phone} (From: Pet Planet)</p>
          <p className="sms-text" id="smsToastText">
            [Pet Planet] မင်္ဂလာပါ {name}၊ လူကြီးမင်း၏ အချစ်တော် {sizeText} {petTypeName} အတွက် Spa & Grooming Package ပြီးဆုံးပါသဖြင့် ဆိုင်တွင် လာရောက်ပြန်လည်ခေါ်ယူနိုင်ပါပြီ။
          </p>
        </div>
      </div>
    </>
  );
}

export default function System() {
  return (
    <Suspense fallback={
      <section className="section bg-light">
        <div className="container" style={{ textAlign: "center", padding: "100px 0" }}>
          <div className="spinner" style={{ margin: "0 auto 20px auto" }}></div>
          <p className="text-white-muted">စနစ်အား တင်ဆင်နေပါသည်...</p>
        </div>
      </section>
    }>
      <TrackerContent />
    </Suspense>
  );
}
