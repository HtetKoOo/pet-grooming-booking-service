"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Booking() {
  // Wizard & Form States
  const [currentWizStep, setCurrentWizStep] = useState(1);
  const [petType, setPetType] = useState("dog");
  const [breedSize, setBreedSize] = useState("small");
  const [addons, setAddons] = useState({
    teeth: false,
    deshed: false,
    nails: false,
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [ownerName, setOwnerName] = useState("ကိုမျိုးမင်းဦး");
  const [ownerPhone, setOwnerPhone] = useState("09456789123");
  const [ownerEmail, setOwnerEmail] = useState("customer@example.com");

  // Booking Simulation States
  const [checkoutSimulating, setCheckoutSimulating] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [processingTitle, setProcessingTitle] = useState("ဘွတ်ကင်တင်နေပါသည်...");
  const [processingDesc, setProcessingDesc] = useState("အချက်အလက်များကို စနစ်ထဲသို့ စာရင်းသွင်းနေပါသည်။");



  // Calendar dates generation
  const [availableDates, setAvailableDates] = useState([]);
  useEffect(() => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = daysOfWeek[d.getDay()];
      const dayDate = d.getDate();
      const monthName = months[d.getMonth()];
      dates.push({
        dayName,
        dayDate,
        formattedDate: `${dayDate} ${monthName}`,
        disabled: i === 2, // Hardcode day 3 as fully booked
      });
    }
    setAvailableDates(dates);
  }, []);

  const timeSlots = [
    { slot: "09:00 AM", disabled: false },
    { slot: "10:30 AM", disabled: false },
    { slot: "12:00 PM", disabled: true }, // Hardcoded index 2 disabled
    { slot: "01:30 PM", disabled: false },
    { slot: "03:00 PM", disabled: true }, // Hardcoded index 4 disabled
    { slot: "04:30 PM", disabled: false },
    { slot: "06:00 PM", disabled: false },
  ];

  // Bill Calculations
  const baseDuration = petType === "dog" ? 60 : 45;
  const basePrice = petType === "dog" ? 15000 : 12000;

  let multiplier = 1.0;
  if (breedSize === "medium") multiplier = 1.3;
  else if (breedSize === "large") multiplier = 1.6;

  let duration = Math.round(baseDuration * multiplier);
  let price = Math.round(basePrice * multiplier);

  const selectedAddonsTextList = [];
  if (addons.teeth) {
    duration += 15;
    price += 5000;
    selectedAddonsTextList.push("Teeth Cleaning");
  }
  if (addons.deshed) {
    duration += 20;
    price += 7000;
    selectedAddonsTextList.push("De-shedding");
  }
  if (addons.nails) {
    duration += 10;
    price += 3000;
    selectedAddonsTextList.push("Nail Clip");
  }

  const petNameMyanmar = petType === "dog" ? "ခွေး (Dog)" : "ကြောင် (Cat)";
  const sizeTextMyanmar = breedSize === "small" ? "အသေးစား (Small)" : breedSize === "medium" ? "အလယ်အလတ် (Medium)" : "အကြီးစား (Large)";

  const toggleAddon = (addonKey) => {
    if (checkoutSimulating || bookingCompleted) return;
    setAddons((prev) => ({
      ...prev,
      [addonKey]: !prev[addonKey],
    }));
  };

  const handleNextStep2 = () => {
    setCurrentWizStep(2);
  };

  const handleNextStep3 = () => {
    if (!selectedDate || !selectedTime) {
      alert("ကျေးဇူးပြု၍ ရက်စွဲနှင့် အချိန်ဇယားကို ရွေးချယ်ပေးပါရန်။");
      return;
    }
    setCurrentWizStep(3);
  };

  const handleStartSimulation = async () => {
    if (!ownerName.trim() || !ownerPhone.trim()) {
      alert("ကျေးဇူးပြု၍ ပိုင်ရှင်အမည်နှင့် ဖုန်းနံပါတ်ကို ဖြည့်သွင်းပေးပါရန်။");
      return;
    }
    if (!ownerEmail.trim()) {
      alert("ကျေးဇူးပြု၍ အီးမေးလ်လိပ်စာကို ဖြည့်သွင်းပေးပါရန်။");
      return;
    }

    setCheckoutSimulating(true);
    setProcessingTitle("ဘွတ်ကင်တင်နေပါသည်...");
    setProcessingDesc("အချက်အလက်များကို စနစ်ထဲသို့ စာရင်းသွင်းနေပါသည်။");

    // 1.2s
    setTimeout(() => {
      setProcessingTitle("အီးမေးလ် ပေးပို့နေပါသည်...");
      setProcessingDesc("လူကြီးမင်း၏ အီးမေးလ်ထံသို့ ဘွတ်ကင်အချက်အလက်များ ပေးပို့နေပါသည်။");
    }, 1200);

    // 2.4s
    setTimeout(() => {
      setProcessingTitle("ဘွတ်ကင်အောင်မြင်ပါသည်!");
      setProcessingDesc("ဘွတ်ကင်ပြုလုပ်ခြင်း အောင်မြင်ပြီးဆုံးပါပြီ။");
    }, 2400);

    // 3.6s
    setTimeout(async () => {
      // Trigger the booking confirmation email
      try {
        await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: ownerEmail,
            subject: "Pet Planet - Booking Confirmed! 🐶🐱",
            name: ownerName,
            useReactEmail: true,
            preventThreading: true,
            emailType: "confirmation",
            bookingDetails: {
              petType,
              breedSize: sizeTextMyanmar,
              price: `${price.toLocaleString("en-US")} MMK`,
              duration: `${duration} မိနစ် (mins)`,
              date: selectedDate,
              time: selectedTime,
              addons: selectedAddonsTextList.join(", ") || "None",
            },
          }),
        });
      } catch (err) {
        console.error("Resend confirmation email failed:", err);
      }

      setCheckoutSimulating(false);
      setBookingCompleted(true);
    }, 3600);
  };

  const handleResetForm = () => {
    setCurrentWizStep(1);
    setPetType("dog");
    setBreedSize("small");
    setAddons({ teeth: false, deshed: false, nails: false });
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingCompleted(false);
  };

  return (
    <>
      <section id="booking" className="section booking-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Booking Simulator</span>
            <h2 className="section-title text-white">အခုပဲ ကြိုတင်ဘွတ်ကင်လုပ်ပြီး စမ်းသပ်ကြည့်ပါ</h2>
            <p className="section-description text-white-muted">အောက်ပါ Form တွင် သင့်အချက်အလက်များနှင့် အချစ်တော်လေး၏ အချက်အလက်များကို ရွေးချယ်ပြီး ဘွတ်ကင်စနစ်ကို တိုက်ရိုက်စမ်းသပ်ကြည့်နိုင်ပါသည်။</p>
          </div>

          <div className="simulator-wrapper">
            {/* Simulation Form Card */}
            <div className="simulator-card">
              {/* Mock Payment Processing Overlay */}
              <div className={`checkout-processing-overlay ${checkoutSimulating ? "active" : ""}`} id="checkoutProcessing">
                <div className="checkout-spinner-box">
                  <div className="spinner"></div>
                  <h4 className="processing-title" id="processingTitle">{processingTitle}</h4>
                  <p className="processing-desc" id="processingDesc">{processingDesc}</p>
                </div>
              </div>

              {!bookingCompleted ? (
                <>
                  <div className="wizard-steps-header">
                    <div className={`wizard-step-indicator ${currentWizStep === 1 ? "active" : currentWizStep > 1 ? "completed" : ""}`} id="wiz-step-1">
                      <span className="wiz-step-number">1</span>
                      <span className="wiz-step-name">Pet & Services</span>
                    </div>
                    <div className={`wizard-step-line ${currentWizStep > 1 ? "completed" : ""}`} id="wiz-line-1"></div>
                    <div className={`wizard-step-indicator ${currentWizStep === 2 ? "active" : currentWizStep > 2 ? "completed" : ""}`} id="wiz-step-2">
                      <span className="wiz-step-number">2</span>
                      <span className="wiz-step-name">Date & Time</span>
                    </div>
                    <div className={`wizard-step-line ${currentWizStep > 2 ? "completed" : ""}`} id="wiz-line-2"></div>
                    <div className={`wizard-step-indicator ${currentWizStep === 3 ? "active" : ""}`} id="wiz-step-3">
                      <span className="wiz-step-number">3</span>
                      <span className="wiz-step-name">Confirmation</span>
                    </div>
                  </div>

                  <form id="bookingSimForm" onSubmit={(e) => e.preventDefault()}>
                    {/* Step 1: Pet & Services Panel */}
                    {currentWizStep === 1 && (
                      <div className="wizard-step-content active" id="wiz-content-1">
                        <h3 className="simulator-card-title">အိမ်မွေးတိရစ္ဆာန်နှင့် ဝန်ဆောင်မှု ရွေးချယ်ခြင်း</h3>
                        
                        {/* Pet Type Selection */}
                        <div className="form-group">
                          <label className="form-label">အိမ်မွေးတိရစ္ဆာန် အမျိုးအစား (Pet Type)</label>
                          <div className="pet-type-selector">
                            <label className="pet-type-option">
                              <input 
                                type="radio" 
                                name="petType" 
                                value="dog" 
                                checked={petType === "dog"}
                                onChange={() => setPetType("dog")}
                              />
                              <span className="type-box">
                                <span className="type-emoji">🐶</span>
                                <span className="type-text">Dog (ခွေး)</span>
                              </span>
                            </label>
                            <label className="pet-type-option">
                              <input 
                                type="radio" 
                                name="petType" 
                                value="cat" 
                                checked={petType === "cat"}
                                onChange={() => setPetType("cat")}
                              />
                              <span className="type-box">
                                <span className="type-emoji">🐱</span>
                                <span className="type-text">Cat (ကြောင်)</span>
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Breed Size Selection */}
                        <div className="form-group">
                          <label className="form-label">အချစ်တော်လေး၏ အရွယ်အစား (Breed Size)</label>
                          <select 
                            className="form-select" 
                            name="breedSize" 
                            id="breedSize"
                            value={breedSize}
                            onChange={(e) => setBreedSize(e.target.value)}
                          >
                            <option value="small">Small (အသေးစား) - Weight &lt; 10kg</option>
                            <option value="medium">Medium (အလယ်အလတ်) - Weight 10kg - 25kg</option>
                            <option value="large">Large (အကြီးစား) - Weight &gt; 25kg</option>
                          </select>
                        </div>

                        {/* Add-ons Checkboxes */}
                        <div className="form-group">
                          <label className="form-label">အပိုဆောင်း ဝန်ဆောင်မှုများ (Add-ons)</label>
                          <div className="addons-checkbox-group">
                            <label className="addon-checkbox-label">
                              <input 
                                type="checkbox" 
                                name="addons" 
                                value="teeth" 
                                checked={addons.teeth}
                                onChange={() => toggleAddon("teeth")}
                              />
                              <span className="custom-checkbox"></span>
                              <span className="addon-name">Teeth Cleaning (+15m, +5,000 K)</span>
                            </label>
                            <label className="addon-checkbox-label">
                              <input 
                                type="checkbox" 
                                name="addons" 
                                value="deshed"
                                checked={addons.deshed}
                                onChange={() => toggleAddon("deshed")}
                              />
                              <span className="custom-checkbox"></span>
                              <span className="addon-name">De-shedding Treatment (+20m, +7,000 K)</span>
                            </label>
                            <label className="addon-checkbox-label">
                              <input 
                                type="checkbox" 
                                name="addons" 
                                value="nails"
                                checked={addons.nails}
                                onChange={() => toggleAddon("nails")}
                              />
                              <span className="custom-checkbox"></span>
                              <span className="addon-name">Nail Clip (+10m, +3,000 K)</span>
                            </label>
                          </div>
                        </div>

                        <div className="wizard-buttons">
                          <button type="button" className="btn btn-primary btn-block" onClick={handleNextStep2}>
                            <span>ရက်စွဲနှင့် အချိန်ရွေးချယ်ရန်</span>
                            <svg className="btn-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Date & Time Panel */}
                    {currentWizStep === 2 && (
                      <div className="wizard-step-content active" id="wiz-content-2">
                        <h3 className="simulator-card-title">ရက်စွဲနှင့် အချိန်ဇယား ရွေးချယ်ခြင်း</h3>
                        
                        {/* Mock Calendar Grid */}
                        <div className="form-group">
                          <label className="form-label">ရက်စွဲ ရွေးချယ်ရန် (Select Date)</label>
                          <div className="calendar-days-container" id="calendarDays">
                            {availableDates.map((dateObj, idx) => (
                              <div 
                                key={idx}
                                className={`calendar-day-node ${dateObj.disabled ? "disabled" : ""} ${selectedDate === dateObj.formattedDate ? "active" : ""}`}
                                title={dateObj.disabled ? "Fully Booked (လူပြည့်ပါပြီ)" : ""}
                                onClick={() => !dateObj.disabled && setSelectedDate(dateObj.formattedDate)}
                              >
                                <span className="day-name">{dateObj.dayName}</span>
                                <span className="day-date">{dateObj.dayDate}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Time Slot Selector Grid */}
                        <div className="form-group">
                          <label className="form-label">အချိန် ရွေးချယ်ရန် (Select Time Slot)</label>
                          <div className="time-slots-container" id="timeSlots">
                            {timeSlots.map((slotObj, idx) => (
                              <div
                                key={idx}
                                className={`time-slot-node ${slotObj.disabled ? "disabled" : ""} ${selectedTime === slotObj.slot ? "active" : ""}`}
                                onClick={() => !slotObj.disabled && setSelectedTime(slotObj.slot)}
                              >
                                {slotObj.slot}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="wizard-buttons split-buttons">
                          <button type="button" className="btn btn-secondary" onClick={() => setCurrentWizStep(1)}>ရှေ့သို့</button>
                          <button type="button" className="btn btn-primary" onClick={handleNextStep3}>
                            <span>အဆက်အသွယ်အချက်အလက် ဖြည့်သွင်းရန်</span>
                            <svg className="btn-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Contact & Submit */}
                    {currentWizStep === 3 && (
                      <div className="wizard-step-content active" id="wiz-content-3">
                        <h3 className="simulator-card-title">အဆက်အသွယ်အချက်အလက်</h3>
                        
                        {/* Owner Details */}
                        <div className="form-group">
                          <label className="form-label" htmlFor="ownerName">ပိုင်ရှင်အမည် (Owner Name)</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            id="ownerName" 
                            placeholder="လူကြီးမင်းအမည်" 
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            disabled={checkoutSimulating}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="ownerPhone">ဖုန်းနံပါတ် (Phone Number)</label>
                          <input 
                            type="tel" 
                            className="form-input" 
                            id="ownerPhone" 
                            placeholder="09xxxxxxxxx" 
                            value={ownerPhone}
                            onChange={(e) => setOwnerPhone(e.target.value)}
                            disabled={checkoutSimulating}
                          />
                          <span className="input-helper">SMS အသိပေးချက် ရရှိနိုင်ရန် ဖုန်းနံပါတ် ဖြည့်ပေးပါ။</span>
                        </div>

                        {/* Email Input Field */}
                        <div className="form-group">
                          <label className="form-label" htmlFor="ownerEmail">အီးမေးလ်လိပ်စာ (Email Address)</label>
                          <input 
                            type="email" 
                            className="form-input" 
                            id="ownerEmail" 
                            placeholder="customer@example.com" 
                            value={ownerEmail}
                            onChange={(e) => setOwnerEmail(e.target.value)}
                            disabled={checkoutSimulating}
                          />
                          <span className="input-helper">ဘွတ်ကင်အတည်ပြုချက်နှင့် အကြောင်းကြားစာများကို အီးမေးလ်မှတစ်ဆင့် ပေးပို့ပါမည်။</span>
                        </div>

                        <div className="wizard-buttons split-buttons">
                          <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => setCurrentWizStep(2)}
                            disabled={checkoutSimulating}
                          >
                            ရှေ့သို့
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleStartSimulation}
                            disabled={checkoutSimulating}
                          >
                            <span>{checkoutSimulating ? "ဘွတ်ကင်တင်နေပါသည်..." : "ဘွတ်ကင်အတည်ပြုမည်"}</span>
                            <svg className="btn-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </>
              ) : (
                /* Success Screen state */
                <div className="wizard-step-content active" style={{ textAlign: "center", padding: "30px 10px" }}>
                  <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>
                  <h3 className="simulator-card-title" style={{ color: "var(--color-gold)", fontSize: "1.75rem", marginBottom: "16px" }}>
                    ဘွတ်ကင်တင်ခြင်း အောင်မြင်ပါသည်!
                  </h3>
                  <p style={{ color: "var(--color-gray-400)", marginBottom: "30px", fontSize: "1.02rem", lineHeight: "1.6" }}>
                    လူကြီးမင်း၏ အချစ်တော်လေးအတွက် Spa & Grooming ဝန်ဆောင်မှုအား အဆင်ပြေစွာ ဘွတ်ကင်ပြုလုပ်ပြီးပါပြီ။ ဘွတ်ကင်အတည်ပြုချက် အီးမေးလ်ကို <strong>{ownerEmail}</strong> သို့ ပေးပို့ထားပါသည်။
                  </p>

                  <div style={{ 
                    backgroundColor: "var(--color-navy-light)", 
                    border: "1px solid rgba(255,255,255,0.1)", 
                    borderRadius: "var(--border-radius-md)", 
                    padding: "20px", 
                    textAlign: "left", 
                    marginBottom: "30px" 
                  }}>
                    <h4 style={{ color: "#ffffff", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", fontWeight: "700" }}>
                      ဘွတ်ကင်အကျဉ်းချုပ်
                    </h4>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--color-gray-400)" }}>ပိုင်ရှင်အမည်:</span>
                      <span style={{ color: "#ffffff", fontWeight: "600" }}>{ownerName}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--color-gray-400)" }}>အမျိုးအစား:</span>
                      <span style={{ color: "#ffffff", fontWeight: "600" }}>{petNameMyanmar}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--color-gray-400)" }}>အရွယ်အစား:</span>
                      <span style={{ color: "#ffffff", fontWeight: "600" }}>{sizeTextMyanmar}</span>
                    </div>
                    {selectedAddonsTextList.length > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.95rem" }}>
                        <span style={{ color: "var(--color-gray-400)" }}>အပိုဆောင်း:</span>
                        <span style={{ color: "#ffffff", fontWeight: "600" }}>{selectedAddonsTextList.join(", ")}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--color-gray-400)" }}>ရက်စွဲနှင့် အချိန်:</span>
                      <span style={{ color: "var(--color-gold-light)", fontWeight: "600" }}>{selectedDate} ({selectedTime})</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--color-gray-400)" }}>ကြာမြင့်ချိန်:</span>
                      <span style={{ color: "#ffffff", fontWeight: "600" }}>{duration} မိနစ် (mins)</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--color-gray-400)" }}>ကျသင့်ငွေ:</span>
                      <span style={{ color: "#10b981", fontWeight: "700" }}>{price.toLocaleString("en-US")} MMK</span>
                    </div>
                  </div>

                  <button type="button" className="btn btn-primary btn-block" onClick={handleResetForm}>
                    နောက်ထပ် ဘွတ်ကင်လုပ်ရန်
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
