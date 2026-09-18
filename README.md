# MindSync interactive prototype

A presentation-ready, mobile-first Next.js prototype of the MindSync pet grooming booking flow. It reuses the original Next.js repository on the `mindsync-prototype` branch. The original Pet Planet implementation remains in Git history for comparison; its old routes now lead to the MindSync home screen.

## Run locally

```bash
pnpm install
pnpm dev
```

If this computer reports `EMFILE` file-watcher errors, run `WATCHPACK_POLLING=true pnpm dev` instead.

Open http://localhost:3000. On a desktop, click through the phone preview. On a phone, the prototype fills the screen.

## Demo flow

1. Home: choose a salon or the **Book Appointment** button.
2. Grooming Detail: choose a service and notice the price change.
3. Booking: select a pet, date and time; optionally add a note. The 2:00 PM slot is unavailable to demonstrate a disabled state.
4. Confirmation: view the selected details and open **My Appointments**.
5. My Appointments: reschedule or cancel the sample booking.

The data is intentionally local and illustrative. There is no database, real salon calendar, payment, email or persistent booking. A page refresh clears the sample appointment. Do not describe demo actions as customer validation or live transactions in the project report.

## How to learn from this code

- `app/page.js` contains the flow and React state. Follow `screen` to see how each view changes.
- `salons` and `services` at the top of `app/page.js` are demo data. Change a service price and watch the detail, summary and confirmation update together.
- `app/globals.css` contains the responsive layout. At widths under 900px, the desktop presentation panel disappears and the app fills the screen.
- `app/api/send/route.js` disables the old email endpoint so the prototype cannot send a real message.

The next engineering step after the presentation is to separate screen components, persist bookings in a database and connect real salon availability, with tests for booking conflicts. This prototype deliberately stops before those claims.
