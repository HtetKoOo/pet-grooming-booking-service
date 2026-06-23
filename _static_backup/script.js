document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // --- Mobile Menu Functionality ---
    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', toggleMobileMenu);

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // --- Dynamic Active Navbar Link Highlight ---
    const path = window.location.pathname;
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Match home or specific pages
        if (href === 'index.html' && (path.endsWith('/') || path.endsWith('index.html') || path === '')) {
            link.classList.add('active');
        } else if (path.includes(href) && href !== 'index.html') {
            link.classList.add('active');
        }
    });

    // --- Page Specific Logic ---
    const isBookingPage = path.includes('booking.html');
    const isSystemPage = path.includes('system.html');
    const isServicesPage = path.includes('services.html');

    // ----------------------------------------------------
    // SERVICES PAGE OR BOOKING PAGE: Add-on Card Click Toggles
    // ----------------------------------------------------
    if (isServicesPage || isBookingPage) {
        const addonPreviewCards = document.querySelectorAll('.addon-preview-card');
        const addonCheckboxes = document.querySelectorAll('input[name="addons"]');

        addonPreviewCards.forEach(card => {
            card.addEventListener('click', () => {
                // If on booking page, only allow edit if not currently simulating checkout
                if (isBookingPage && document.getElementById('startSimBtn').disabled) return;

                const addonValue = card.getAttribute('data-addon');
                const correspondingCheckbox = document.querySelector(`input[name="addons"][value="${addonValue}"]`);
                
                if (correspondingCheckbox) {
                    correspondingCheckbox.checked = !correspondingCheckbox.checked;
                    card.classList.toggle('active', correspondingCheckbox.checked);
                    
                    // Trigger calculation if on booking page
                    if (isBookingPage) {
                        calculateEstimatedBill();
                    }
                }
            });
        });

        // Mirror checkbox changes to services preview cards (booking page)
        if (isBookingPage) {
            addonCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const previewCard = document.querySelector(`.addon-preview-card[data-addon="${checkbox.value}"]`);
                    if (previewCard) {
                        previewCard.classList.toggle('active', checkbox.checked);
                    }
                    calculateEstimatedBill();
                });
            });
        }
    }

    // ----------------------------------------------------
    // BOOKING PAGE SPECIFIC CODE
    // ----------------------------------------------------
    if (isBookingPage) {
        // Wizard State
        let currentWizStep = 1;
        let selectedDate = null;
        let selectedTime = null;

        const petTypeRadios = document.querySelectorAll('input[name="petType"]');
        const breedSizeSelect = document.getElementById('breedSize');
        const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
        const selectedPetText = document.getElementById('selectedPetText');
        const selectedDateTimeText = document.getElementById('selectedDateTimeText');
        const selectedContactText = document.getElementById('selectedContactText');
        const calcDuration = document.getElementById('calcDuration');
        const calcPrice = document.getElementById('calcPrice');

        // Dynamic Calendar & Time slots generation
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        function generateCalendar() {
            const calendarContainer = document.getElementById('calendarDays');
            if (!calendarContainer) return;
            calendarContainer.innerHTML = '';
            
            for (let i = 0; i < 5; i++) {
                const d = new Date();
                d.setDate(d.getDate() + i);
                const dayName = daysOfWeek[d.getDay()];
                const dayDate = d.getDate();
                const monthName = months[d.getMonth()];
                const formattedDate = `${dayDate} ${monthName}`;
                
                const dayNode = document.createElement('div');
                dayNode.className = 'calendar-day-node';
                dayNode.dataset.dateString = formattedDate;
                dayNode.innerHTML = `
                    <span class="day-name">${dayName}</span>
                    <span class="day-date">${dayDate}</span>
                `;
                
                // Hardcode day 3 as booked for realism
                if (i === 2) {
                    dayNode.classList.add('disabled');
                    dayNode.title = 'Fully Booked (လူပြည့်ပါပြီ)';
                } else {
                    dayNode.addEventListener('click', () => {
                        document.querySelectorAll('.calendar-day-node').forEach(n => n.classList.remove('active'));
                        dayNode.classList.add('active');
                        selectedDate = formattedDate;
                        updateSelectedSummary();
                    });
                }
                calendarContainer.appendChild(dayNode);
            }
        }

        function generateTimeSlots() {
            const slots = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'];
            const timeContainer = document.getElementById('timeSlots');
            if (!timeContainer) return;
            timeContainer.innerHTML = '';
            
            slots.forEach((slot, index) => {
                const slotNode = document.createElement('div');
                slotNode.className = 'time-slot-node';
                slotNode.textContent = slot;
                
                // Hardcode indices 2 and 4 as booked/disabled for realism
                if (index === 2 || index === 4) {
                    slotNode.classList.add('disabled');
                } else {
                    slotNode.addEventListener('click', () => {
                        document.querySelectorAll('.time-slot-node').forEach(n => n.classList.remove('active'));
                        slotNode.classList.add('active');
                        selectedTime = slot;
                        updateSelectedSummary();
                    });
                }
                timeContainer.appendChild(slotNode);
            });
        }

        // Bill & Time Calculation
        function calculateEstimatedBill() {
            const petType = document.querySelector('input[name="petType"]:checked').value;
            const breedSize = breedSizeSelect.value;
            
            let baseDuration = 0;
            let basePrice = 0;
            let petNameMyanmar = '';

            if (petType === 'dog') {
                baseDuration = 60;
                basePrice = 15000;
                petNameMyanmar = 'ခွေး (Dog)';
            } else {
                baseDuration = 45;
                basePrice = 12000;
                petNameMyanmar = 'ကြောင် (Cat)';
            }

            let multiplier = 1.0;
            let sizeTextMyanmar = '';
            if (breedSize === 'small') {
                multiplier = 1.0;
                sizeTextMyanmar = 'အသေးစား (Small)';
            } else if (breedSize === 'medium') {
                multiplier = 1.3;
                sizeTextMyanmar = 'အလယ်အလတ် (Medium)';
            } else if (breedSize === 'large') {
                multiplier = 1.6;
                sizeTextMyanmar = 'အကြီးစား (Large)';
            }

            let duration = Math.round(baseDuration * multiplier);
            let price = Math.round(basePrice * multiplier);

            let selectedAddons = [];
            addonCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    if (checkbox.value === 'teeth') {
                        duration += 15;
                        price += 5000;
                        selectedAddons.push('Teeth Cleaning');
                    } else if (checkbox.value === 'deshed') {
                        duration += 20;
                        price += 7000;
                        selectedAddons.push('De-shedding');
                    } else if (checkbox.value === 'nails') {
                        duration += 10;
                        price += 3000;
                        selectedAddons.push('Nail Clip');
                    }
                }
            });

            const formattedPrice = price.toLocaleString('en-US');
            let addonString = selectedAddons.length > 0 ? ` + Add-ons (${selectedAddons.join(', ')})` : '';
            selectedPetText.textContent = `${petNameMyanmar} - ${sizeTextMyanmar} Spa Package${addonString}`;
            calcDuration.textContent = `${duration} မိနစ် (mins)`;
            calcPrice.textContent = `${formattedPrice} MMK`;
        }

        function updateSelectedSummary() {
            if (selectedDate && selectedTime) {
                selectedDateTimeText.textContent = `${selectedDate} (${selectedTime})`;
                selectedDateTimeText.classList.remove('highlight-gold');
            } else if (selectedDate) {
                selectedDateTimeText.textContent = `${selectedDate} - (အချိန်ရွေးရန်)`;
                selectedDateTimeText.classList.add('highlight-gold');
            } else {
                selectedDateTimeText.textContent = '- ရွေးချယ်မထားပါ -';
                selectedDateTimeText.classList.add('highlight-gold');
            }

            const name = document.getElementById('ownerName').value.trim();
            const phone = document.getElementById('ownerPhone').value.trim();
            if (name && phone) {
                selectedContactText.textContent = `${name} (${phone})`;
            } else if (name) {
                selectedContactText.textContent = `${name} (ဖုန်းဖြည့်ရန်)`;
            } else {
                selectedContactText.textContent = '- ဖြည့်သွင်းမထားပါ -';
            }
        }

        // Bind events
        petTypeRadios.forEach(radio => radio.addEventListener('change', calculateEstimatedBill));
        breedSizeSelect.addEventListener('change', calculateEstimatedBill);
        document.getElementById('ownerName').addEventListener('input', updateSelectedSummary);
        document.getElementById('ownerPhone').addEventListener('input', updateSelectedSummary);

        // Wizard navigation
        const wizStepIndicators = [
            document.getElementById('wiz-step-1'),
            document.getElementById('wiz-step-2'),
            document.getElementById('wiz-step-3')
        ];
        const wizLines = [
            document.getElementById('wiz-line-1'),
            document.getElementById('wiz-line-2')
        ];
        const wizContents = [
            document.getElementById('wiz-content-1'),
            document.getElementById('wiz-content-2'),
            document.getElementById('wiz-content-3')
        ];

        function goToWizStep(step) {
            wizContents.forEach(content => content.classList.remove('active'));
            wizStepIndicators.forEach(ind => ind.classList.remove('active', 'completed'));
            wizLines.forEach(line => line.classList.remove('completed'));

            wizContents[step - 1].classList.add('active');
            updateSelectedSummary();

            for (let i = 1; i <= 3; i++) {
                const indicator = wizStepIndicators[i - 1];
                if (i < step) {
                    indicator.classList.add('completed');
                    if (wizLines[i - 1]) wizLines[i - 1].classList.add('completed');
                } else if (i === step) {
                    indicator.classList.add('active');
                }
            }
            currentWizStep = step;
        }

        document.getElementById('nextToStep2Btn').addEventListener('click', () => goToWizStep(2));
        document.getElementById('backToStep1Btn').addEventListener('click', () => goToWizStep(1));
        document.getElementById('nextToStep3Btn').addEventListener('click', () => {
            if (!selectedDate || !selectedTime) {
                alert('ကျေးဇူးပြု၍ ရက်စွဲနှင့် အချိန်ဇယားကို ရွေးချယ်ပေးပါရန်။');
                return;
            }
            goToWizStep(3);
        });
        document.getElementById('backToStep2Btn').addEventListener('click', () => goToWizStep(2));

        // Submit Simulator (Checkout verification, then redirect)
        document.getElementById('startSimBtn').addEventListener('click', () => {
            const name = document.getElementById('ownerName').value.trim();
            const phone = document.getElementById('ownerPhone').value.trim();
            
            if (!name || !phone) {
                alert('ကျေးဇူးပြု၍ ပိုင်ရှင်အမည်နှင့် ဖုန်းနံပါတ်ကို ဖြည့်သွင်းပေးပါရန်။');
                return;
            }

            const petType = document.querySelector('input[name="petType"]:checked').value;
            const breedSize = breedSizeSelect.value;
            const walletType = document.querySelector('input[name="paymentMethod"]:checked').value;
            
            let walletName = 'KBZPay';
            if (walletType === 'wavemoney') walletName = 'WaveMoney';
            else if (walletType === 'cash') walletName = 'Cash on Service';

            // Disable checkout buttons
            const simBtn = document.getElementById('startSimBtn');
            simBtn.disabled = true;
            simBtn.querySelector('span').textContent = 'ငွေချေမှုကို စိစစ်နေပါသည်...';

            const resultsCardContent = document.getElementById('resultsCardContent');
            const checkoutProcessing = document.getElementById('checkoutProcessing');
            const processingTitle = document.getElementById('processingTitle');
            const processingDesc = document.getElementById('processingDesc');

            resultsCardContent.classList.add('blur');
            checkoutProcessing.classList.add('active');

            processingTitle.textContent = 'ချိတ်ဆက်နေပါသည်...';
            processingDesc.textContent = `${walletName} App သို့ လုံခြုံစွာ ချိတ်ဆက်နေပါသည်။`;

            // 1.2s
            setTimeout(() => {
                processingTitle.textContent = 'ငွေပေးချေမှုကို စိစစ်နေပါသည်...';
                processingDesc.textContent = `${walletName} ဖြင့် ငွေပေးချေမှုကို အတည်ပြုနေပါသည်။ ခေတ္တစောင့်ဆိုင်းပါ။`;
            }, 1200);

            // 2.4s
            setTimeout(() => {
                processingTitle.textContent = 'ငွေချေမှု အောင်မြင်ပါသည်!';
                processingDesc.textContent = 'ဘွတ်ကင်လုပ်ခြင်း အောင်မြင်ပါသည်။ Live Tracker စနစ်သို့ စက္ကန့်ပိုင်းအတွင်း လွှဲပြောင်းပေးပါမည်။';
            }, 2400);

            // 3.6s - Redirect to system.html page with client details
            setTimeout(() => {
                window.location.href = `system.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&petType=${petType}&breedSize=${breedSize}`;
            }, 3600);
        });

        // Initialize Booking
        generateCalendar();
        generateTimeSlots();
        calculateEstimatedBill();
        updateSelectedSummary();
    }

    // ----------------------------------------------------
    // SYSTEM / TRACKER PAGE SPECIFIC CODE
    // ----------------------------------------------------
    if (isSystemPage) {
        const stepNodes = [
            document.getElementById('step-1'),
            document.getElementById('step-2'),
            document.getElementById('step-3'),
            document.getElementById('step-4')
        ];
        const stepConnectors = [
            document.getElementById('connector-1'),
            document.getElementById('connector-2'),
            document.getElementById('connector-3')
        ];
        
        const simProgressBar = document.getElementById('simProgressBar');
        const simStatusText = document.getElementById('simStatusText');
        const smsToast = document.getElementById('smsToast');
        const smsToastText = document.getElementById('smsToastText');
        const smsCloseBtn = document.getElementById('smsCloseBtn');

        let isTrackingActive = false;
        let trackingTimeoutId = null;

        function resetTracker() {
            simProgressBar.style.width = '0%';
            simStatusText.textContent = 'စတင်ရန် စောင့်ဆိုင်းနေပါသည်...';
            stepNodes.forEach(node => node.classList.remove('active', 'completed'));
            stepConnectors.forEach(conn => conn.classList.remove('active', 'completed'));
        }

        function runSimulationStep(step, petType, sizeText, name, phone) {
            if (!isTrackingActive) return;

            // Reset active states
            stepNodes.forEach(node => node.classList.remove('active'));

            if (step === 1) {
                simProgressBar.style.width = '25%';
                simStatusText.textContent = 'အဆင့် ၁ - စနစ်ထဲ စတင်စာရင်းသွင်းခြင်း (Check-In) အောင်မြင်ပါပြီ။';
                stepNodes[0].classList.add('active');

                trackingTimeoutId = setTimeout(() => {
                    runSimulationStep(2, petType, sizeText, name, phone);
                }, 2500);

            } else if (step === 2) {
                simProgressBar.style.width = '50%';
                simStatusText.textContent = 'အဆင့် ၂ - အချစ်တော်လေးကို ရေချိုးသန့်စင်ပေးနေပါပြီ (Bathing)...';
                stepNodes[0].classList.add('completed');
                stepConnectors[0].classList.add('completed');
                stepNodes[1].classList.add('active');

                trackingTimeoutId = setTimeout(() => {
                    runSimulationStep(3, petType, sizeText, name, phone);
                }, 3000);

            } else if (step === 3) {
                simProgressBar.style.width = '75%';
                simStatusText.textContent = 'အဆင့် ၃ - အမွှေးအမျှင် ပုံဖော်ညှပ်ပေးခြင်း ပြုလုပ်နေပါပြီ (Styling)...';
                stepNodes[0].classList.add('completed');
                stepConnectors[0].classList.add('completed');
                stepNodes[1].classList.add('completed');
                stepConnectors[1].classList.add('completed');
                stepNodes[2].classList.add('active');

                trackingTimeoutId = setTimeout(() => {
                    runSimulationStep(4, petType, sizeText, name, phone);
                }, 3000);

            } else if (step === 4) {
                simProgressBar.style.width = '100%';
                simStatusText.textContent = 'အဆင့် ၄ - Spa & Grooming ပြီးဆုံး၍ အိမ်ပြန်ရန် အဆင်သင့်ဖြစ်ပါပြီ (Ready)။';
                stepNodes[0].classList.add('completed');
                stepConnectors[0].classList.add('completed');
                stepNodes[1].classList.add('completed');
                stepConnectors[1].classList.add('completed');
                stepNodes[2].classList.add('completed');
                stepConnectors[2].classList.add('completed');
                stepNodes[3].classList.add('completed');

                isTrackingActive = false;
                showSmsNotification(petType, sizeText, name, phone);
            }
        }

        function showSmsNotification(petType, sizeText, name, phone) {
            const petTypeName = petType === 'dog' ? 'ခွေးလေး' : 'ကြောင်လေး';
            smsToastText.textContent = `[Pet Planet] မင်္ဂလာပါ ${name}၊ လူကြီးမင်း၏ အချစ်တော် ${sizeText} ${petTypeName} အတွက် Spa & Grooming Package ပြီးဆုံးပါသဖြင့် ဆိုင်တွင် လာရောက်ပြန်လည်ခေါ်ယူနိုင်ပါပြီ။`;
            document.querySelector('.sms-sender').textContent = `To: ${phone} (From: Pet Planet)`;
            
            smsToast.classList.add('show');
            setTimeout(() => {
                smsToast.classList.remove('show');
            }, 8000);
        }

        smsCloseBtn.addEventListener('click', () => {
            smsToast.classList.remove('show');
        });

        // Parse search query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const phone = urlParams.get('phone');
        const petType = urlParams.get('petType');
        const breedSize = urlParams.get('breedSize');

        if (name && phone && petType && breedSize) {
            isTrackingActive = true;
            
            let sizeText = '';
            if (breedSize === 'small') sizeText = 'အသေးစား';
            else if (breedSize === 'medium') sizeText = 'အလယ်အလတ်';
            else if (breedSize === 'large') sizeText = 'အကြီးစား';

            const petTypeName = petType === 'dog' ? 'ခွေးလေး' : 'ကြောင်လေး';

            // Customize tracker headers
            document.getElementById('trackerPageTitle').textContent = `${name} ၏ အချစ်တော် ${sizeText} ${petTypeName} အား ခြေရာခံခြင်း`;
            document.getElementById('trackerPageDesc').textContent = `ဘွတ်ကင်လုပ်ခြင်း အောင်မြင်ပြီးပါပြီ။ အချစ်တော်လေး၏ ဝန်ဆောင်မှုအဆင့်ဆင့်ကို ခြေရာခံ စောင့်ကြည့်နိုင်ပါသည်။`;
            
            // Show system tracker progress box
            document.getElementById('trackerSystemProgressBox').style.display = 'block';

            resetTracker();
            
            // Kick off live tracker sequence
            setTimeout(() => {
                runSimulationStep(1, petType, sizeText, name, phone);
            }, 1200);
        }
    }
});
