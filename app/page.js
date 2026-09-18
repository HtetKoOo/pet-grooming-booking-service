"use client";

import { useMemo, useState } from "react";

const salons = [
  { id: "paws", name: "Paws & Claws Deluxe", rating: "4.9", reviews: 212, distance: "1.2 mi", from: 45, tone: "peach" },
  { id: "hub", name: "MindSync Grooming Hub", rating: "4.8", reviews: 146, distance: "2.4 mi", from: 60, tone: "mint" },
];
const services = [
  { id: "bath", name: "Full Bath", detail: "Wash, dry, brush", price: 45, duration: "60 min", group: "Grooming" },
  { id: "haircut", name: "Haircut", detail: "Breed-specific style", price: 55, duration: "75 min", group: "Grooming" },
  { id: "nails", name: "Nail Trim", detail: "Quick and gentle", price: 20, duration: "20 min", group: "Add-ons" },
  { id: "teeth", name: "Teeth Clean", detail: "Fresh breath care", price: 30, duration: "25 min", group: "Add-ons" },
];
const times = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function nextDates() {
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + i + 1);
    return { key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`, day: weekdays[date.getDay()], number: date.getDate(), label: `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}` };
  });
}

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3-7 8-7s8 3 8 7" /></>,
    back: <><path d="m15 18-6-6 6-6" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    paw: <><circle cx="7" cy="7" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="17" cy="7" r="1" /><path d="M12 11c-2 0-2.6 3-5 4.5C4.5 17 6 21 9 20c1.2-.4 2-1 3-1s1.8.6 3 1c3 1 4.5-3 2-4.5C14.6 14 14 11 12 11z" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function HomePage() {
  const [screen, setScreen] = useState("home");
  const [salonId, setSalonId] = useState("paws");
  const [serviceId, setServiceId] = useState("bath");
  const [dateKey, setDateKey] = useState("");
  const [time, setTime] = useState("");
  const [pet, setPet] = useState("Buddy (Golden Retriever)");
  const [notes, setNotes] = useState("");
  const [booking, setBooking] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [notice, setNotice] = useState("");
  const dates = useMemo(() => nextDates(), []);
  const salon = salons.find((item) => item.id === salonId) || salons[0];
  const service = services.find((item) => item.id === serviceId) || services[0];
  const price = service.price + (salonId === "hub" ? 15 : 0);
  const selectedDate = dates.find((item) => item.key === dateKey);
  const currentStep = { home: 1, detail: 2, booking: 3, confirmation: 4, appointments: 5 }[screen];

  function openSalon(id) {
    setSalonId(id);
    setServiceId("bath");
    setScreen("detail");
    setNotice("");
  }
  function confirmBooking() {
    if (!selectedDate || !time) {
      setNotice("Please choose an available date and time first.");
      return;
    }
    setBooking({ id: "MS-DEMO-001", salon: salon.name, service: service.name, price, pet, date: selectedDate.label, time, notes, status: "Confirmed" });
    setNotice("");
    setScreen("confirmation");
  }
  function back() {
    setNotice("");
    setScreen(screen === "booking" ? "detail" : screen === "detail" ? "home" : screen === "confirmation" ? "booking" : "home");
  }
  function renderHome() {
    return <>
      <header className="mobile-header"><div className="brand"><span className="brand-mark"><Icon name="paw" size={19} /></span> MindSync</div><span className="avatar" aria-label="Alex's profile">A</span></header>
      <main className="screen-body home-screen">
        <p className="eyebrow">GOOD TO SEE YOU</p><h1>Hi Alex <span aria-hidden="true">👋</span></h1><p className="muted lead">Find trusted grooming for Buddy, fast.</p>
        <button type="button" className="search-field" onClick={() => document.getElementById("salons")?.scrollIntoView({ behavior: "smooth" })}><Icon name="search" size={18} /> Search groomers near you</button>
        <h2 className="section-title">Services</h2><div className="categories">{[["Full Bath", "◉"], ["Haircut", "✂"], ["Nail Trim", "◇"], ["Teeth Clean", "✦"]].map(([label, symbol]) => <button key={label} type="button" onClick={() => { setServiceId(services.find((item) => item.name === label).id); setSalonId("paws"); setScreen("detail"); }} className="category"><span>{symbol}</span><small>{label}</small></button>)}</div>
        <div id="salons" className="section-heading"><h2 className="section-title">Nearby Salons</h2><span>2 salons</span></div>
        <div className="salon-list">{salons.map((item) => <button key={item.id} type="button" className="salon-card" onClick={() => openSalon(item.id)}><span className={`salon-thumb ${item.tone}`} aria-hidden="true"><Icon name="paw" size={24} /></span><span className="salon-copy"><strong>{item.name}</strong><small><span className="star">★</span> {item.rating} · {item.distance}</small><small>From ${item.from}</small></span><span className="chevron">›</span></button>)}</div>
        <button type="button" className="primary-button home-cta" onClick={() => openSalon("paws")}>Book Appointment <span>›</span></button>
      </main><BottomNav screen={screen} setScreen={setScreen} />
    </>;
  }
  function renderDetail() {
    const visible = showAll ? services : services.slice(0, 3);
    return <><header className="mobile-header inner"><button type="button" className="icon-button" onClick={back} aria-label="Back to home"><Icon name="back" /></button><span>Salon details</span><span className="header-spacer" /></header>
      <main className="screen-body detail-screen"><div className={`salon-hero ${salon.tone}`}><Icon name="paw" size={58} /><span>Care for every kind of companion</span></div><h1>{salon.name}</h1><p className="salon-meta"><span className="star">★</span> {salon.rating} ({salon.reviews} reviews) <span>·</span> {salon.distance} away</p><div className="rule" /><h2 className="section-title">Choose a service</h2><p className="muted helper">Select one service to continue.</p>
      <div className="service-list">{visible.map((item, index) => <div key={item.id}>{(index === 0 || (index === 2 && showAll)) && <p className="group-label">{item.group}</p>}<button type="button" className={`service-card ${serviceId === item.id ? "selected" : ""}`} onClick={() => setServiceId(item.id)} aria-pressed={serviceId === item.id}><span className="radio-dot" /><span className="service-copy"><strong>{item.name}</strong><small>{item.detail} · {item.duration}</small></span><strong>${item.price + (salonId === "hub" ? 15 : 0)}</strong></button></div>)}</div>
      {!showAll && <button type="button" className="text-button" onClick={() => setShowAll(true)}>Show all services</button>}</main><div className="sticky-action"><div className="price-line"><span>Selected service</span><strong>${price}</strong></div><button type="button" className="primary-button" onClick={() => { setNotice(""); setScreen("booking"); }}>Continue · ${price} <span>›</span></button></div></>;
  }
  function renderBooking() {
    return <><header className="mobile-header inner"><button type="button" className="icon-button" onClick={back} aria-label="Back to service details"><Icon name="back" /></button><span>Confirm Booking</span><span className="header-spacer" /></header>
      <main className="screen-body booking-screen"><div className="progress-title"><span>STEP 2 OF 3</span><span>Almost there</span></div><div className="progress-track"><span /></div><h1>Pick a time for Buddy</h1><p className="muted helper">These slots are sample availability for the prototype.</p>
      <label className="field-label" htmlFor="pet">PET</label><select id="pet" className="select-field" value={pet} onChange={(e) => setPet(e.target.value)}><option>Buddy (Golden Retriever)</option><option>Luna (Cat)</option></select>
      <div className="field-heading"><span className="field-label">DATE</span><Icon name="calendar" size={17} /></div><div className="date-list">{dates.map((item) => <button type="button" key={item.key} className={`date-chip ${dateKey === item.key ? "selected" : ""}`} onClick={() => { setDateKey(item.key); setTime(""); setNotice(""); }} aria-pressed={dateKey === item.key}><small>{item.day}</small><strong>{item.number}</strong></button>)}</div>
      <span className="field-label">TIME</span><div className="time-list">{times.map((item) => <button type="button" key={item} disabled={item === "2:00 PM"} className={`time-chip ${time === item ? "selected" : ""}`} onClick={() => { setTime(item); setNotice(""); }} aria-pressed={time === item}>{item}{item === "2:00 PM" && <small>Unavailable</small>}</button>)}</div>
      <label className="field-label" htmlFor="notes">NOTES FOR GROOMER (OPTIONAL)</label><textarea id="notes" className="notes-field" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. sensitive ears, please be gentle" rows={2} />
      <div className="summary-card"><div><strong>{service.name} · {pet.split(" ")[0]}</strong><span>{selectedDate ? `${selectedDate.label} · ${time || "Choose a time"}` : "Choose a date and time"}</span></div><strong>${price}.00</strong></div>
      {notice && <p role="alert" className="validation-note">{notice}</p>}</main><div className="sticky-action"><button type="button" className="primary-button" onClick={confirmBooking}>Confirm demo booking · ${price} <span>›</span></button><p className="demo-caption">Prototype only. No payment or salon reservation is made.</p></div></>;
  }
  function renderConfirmation() {
    if (!booking) return renderAppointments();
    return <><header className="mobile-header inner"><span className="brand">MindSync</span><span className="header-spacer" /></header><main className="screen-body confirmation-screen"><div className="success-mark"><Icon name="check" size={42} /></div><h1>Booking Confirmed!</h1><p className="muted">Your demo appointment is ready to view.</p><div className="appointment-card"><div className="appointment-heading"><strong>Appointment details</strong><span>Demo</span></div>{[["Pet", booking.pet], ["Service", booking.service], ["Salon", booking.salon], ["Date", booking.date], ["Time", booking.time], ["Total", `$${booking.price}.00`]].map(([key, value]) => <div className="appointment-row" key={key}><span>{key}</span><strong>{value}</strong></div>)}</div><button type="button" className="primary-button" onClick={() => setScreen("appointments")}>View Appointment</button><button type="button" className="secondary-button" onClick={() => setScreen("home")}>Back to Home</button><div className="status-line"><span className="status-dot" /> Confirmed · Demo booking #{booking.id}</div><p className="demo-caption">This confirmation stays in this browser session. No email is sent.</p></main><BottomNav screen={screen} setScreen={setScreen} /></>;
  }
  function renderAppointments() {
    return <><header className="mobile-header"><span className="brand"><span className="brand-mark"><Icon name="paw" size={19} /></span> MindSync</span><span className="avatar">A</span></header><main className="screen-body appointments-screen"><p className="eyebrow">YOUR BOOKINGS</p><h1>My Appointments</h1>{booking ? <div className="appointment-card"><div className="appointment-heading"><strong>{booking.salon}</strong><span>Confirmed</span></div><div className="appointment-row"><span>Service</span><strong>{booking.service}</strong></div><div className="appointment-row"><span>Pet</span><strong>{booking.pet}</strong></div><div className="appointment-row"><span>When</span><strong>{booking.date} · {booking.time}</strong></div><div className="appointment-row"><span>Total</span><strong>${booking.price}.00</strong></div>{booking.notes && <p className="appointment-notes">Note: {booking.notes}</p>}<div className="appointment-actions"><button type="button" onClick={() => { setScreen("booking"); setNotice(""); }}>Reschedule</button><button type="button" onClick={() => { setBooking(null); setScreen("appointments"); }}>Cancel demo</button></div></div> : <div className="empty-state"><div className="empty-icon"><Icon name="calendar" size={34} /></div><h2>No upcoming appointments</h2><p>Book a sample grooming appointment to see it here.</p><button type="button" className="primary-button" onClick={() => setScreen("home")}>Find a groomer</button></div>}<p className="demo-caption">Bookings shown here are local demo state and reset when you refresh.</p></main><BottomNav screen={screen} setScreen={setScreen} /></>;
  }
  return <div className="prototype-shell"><aside className="presentation-panel"><div className="panel-brand"><span className="brand-mark"><Icon name="paw" size={21} /></span> MindSync <span className="panel-tag">Interactive prototype</span></div><div className="panel-content"><p className="eyebrow">PET GROOMING BOOKING</p><h2>A simpler way to book care for your pet.</h2><p>Follow Alex&apos;s journey from finding a nearby salon to viewing a confirmed demo appointment.</p><ol className="journey-list">{["Discover", "Choose service", "Select a slot", "Confirm", "View booking"].map((label, i) => <li className={i + 1 === currentStep ? "current" : i + 1 < currentStep ? "done" : ""} key={label}><span>{i + 1 < currentStep ? "✓" : i + 1}</span>{label}</li>)}</ol></div><p className="panel-footnote">Presentation demo · Sample salons and availability · No real payment</p></aside><div className="phone-stage"><div className="phone-frame">{screen === "home" ? renderHome() : screen === "detail" ? renderDetail() : screen === "booking" ? renderBooking() : screen === "confirmation" && booking ? renderConfirmation() : renderAppointments()}</div></div></div>;
}

function BottomNav({ screen, setScreen }) {
  return <nav className="bottom-nav" aria-label="Main navigation"><button type="button" className={screen === "home" ? "active" : ""} onClick={() => setScreen("home")}><Icon name="home" size={20} /><small>Home</small></button><button type="button" onClick={() => { setScreen("home"); setTimeout(() => document.getElementById("salons")?.scrollIntoView({ behavior: "smooth" }), 0); }}><Icon name="search" size={20} /><small>Search</small></button><button type="button" className={screen === "appointments" ? "active" : ""} onClick={() => setScreen("appointments")}><Icon name="calendar" size={20} /><small>Bookings</small></button><button type="button" disabled title="Profile is outside this prototype"><Icon name="user" size={20} /><small>Profile</small></button></nav>;
}
