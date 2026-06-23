import * as React from 'react';

export function WelcomeEmail({ name, emailType, bookingDetails }) {
  const isConfirmation = emailType === 'confirmation';

  // Email styling constants (using inline style objects for maximum email client compatibility)
  const containerStyle = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '16px',
    border: '1px solid #1e293b',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '32px',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '24px',
  };

  const logoStyle = {
    fontSize: '28px',
    fontWeight: '800',
    color: '#fbbf24',
    textDecoration: 'none',
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    color: '#fbbf24',
    fontSize: '12px',
    fontWeight: '700',
    borderRadius: '50px',
    marginBottom: '16px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.3',
    margin: '0 0 16px 0',
  };

  const bodyStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#94a3b8',
    margin: '0 0 24px 0',
  };

  const cardStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid #334155',
  };

  const cardTitleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 16px 0',
  };

  const detailRowStyle = {
    padding: '8px 0',
    borderBottom: '1px dashed #334155',
  };

  const detailLabelStyle = {
    fontWeight: '500',
    color: '#94a3b8',
  };

  const detailValueStyle = {
    float: 'right',
    fontWeight: '700',
    color: '#f8fafc',
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '32px',
    borderTop: '1px solid #1e293b',
    paddingTop: '24px',
    fontSize: '12px',
    color: '#64748b',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={logoStyle}>🐾 Pet Planet</div>
        <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Smart Pet Grooming Booking System</div>
      </div>

      <div style={{ padding: '0 10px' }}>
        <span style={badgeStyle}>
          {isConfirmation ? 'Booking Confirmed' : 'Service Completed'}
        </span>
        <h1 style={titleStyle}>
          {isConfirmation 
            ? `မင်္ဂလာပါ ${name}၊ ကြိုတင်ဘွတ်ကင်လုပ်ခြင်း အောင်မြင်ပါသည်။` 
            : `မင်္ဂလာပါ ${name}၊ အချစ်တော်လေး Spa & Grooming ပြီးဆုံးပါပြီ။`}
        </h1>
        
        <p style={bodyStyle}>
          {isConfirmation
            ? 'သင့်အချစ်တော်လေးအတွက် စာရင်းသွင်းမှု အဆင်ပြေချောမွေ့စွာ ပြီးမြောက်သွားပါပြီ။ အသေးစိတ် အချက်အလက်များကို အောက်တွင် ဖော်ပြပေးထားပါသည် -'
            : 'လူကြီးမင်း၏ အချစ်တော်လေးအတွက် Spa & Grooming Package အဆင့်ဆင့် ပြီးမြောက်သွားပါသဖြင့် ဆိုင်တွင် ပြန်လည်လာရောက်ခေါ်ယူနိုင်ပါပြီ။'}
        </p>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Grooming Session Details</h3>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>အိမ်မွေးတိရစ္ဆာန်အမျိုးအစား (Pet)</span>
            <span style={detailValueStyle}>{bookingDetails.petType === 'dog' ? 'ခွေးလေး 🐶' : 'ကြောင်လေး 🐱'}</span>
          </div>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>အရွယ်အစား (Size)</span>
            <span style={detailValueStyle}>{bookingDetails.breedSize}</span>
          </div>
          {bookingDetails.addons && bookingDetails.addons !== 'None' && (
            <div style={detailRowStyle}>
              <span style={detailLabelStyle}>အပိုဆောင်းဝန်ဆောင်မှုများ (Add-ons)</span>
              <span style={detailValueStyle}>{bookingDetails.addons}</span>
            </div>
          )}
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>ရက်စွဲနှင့် အချိန် (Date & Time)</span>
            <span style={{ ...detailValueStyle, color: '#fbbf24' }}>
              {bookingDetails.date} ({bookingDetails.time})
            </span>
          </div>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>ကြာမြင့်ချိန် (Duration)</span>
            <span style={detailValueStyle}>{bookingDetails.duration}</span>
          </div>
          <div style={{ ...detailRowStyle, borderBottom: 'none' }}>
            <span style={detailLabelStyle}>ကျသင့်ငွေ (Total Cost)</span>
            <span style={{ ...detailValueStyle, color: '#10b981', fontSize: '18px' }}>{bookingDetails.price}</span>
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>

        {!isConfirmation && (
          <div style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid #10b981', 
            borderRadius: '8px', 
            padding: '16px', 
            marginBottom: '24px', 
            textAlign: 'center', 
            color: '#10b981', 
            fontWeight: '600' 
          }}>
            📍 ဆိုင်လိပ်စာ: Pet Planet Spa, ရန်ကုန်မြို့။
          </div>
        )}
      </div>

      <div style={footerStyle}>
        <p>© {new Date().getFullYear()} Pet Planet. All rights reserved.</p>
        <p style={{ marginTop: '4px' }}>ဒီအီးမေးလ်သည် စနစ်မှ အလိုအလျောက် ပေးပို့သောစာ ဖြစ်ပါသည်။</p>
      </div>
    </div>
  );
}
