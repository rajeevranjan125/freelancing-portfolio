import React, { useState, useEffect } from 'react';

export default function SchedulerModal({ personal, onClose }) {
  const [schedulerStep, setSchedulerStep] = useState(1); // 1: Date/Time, 2: Details, 3: Success
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [schedulerForm, setSchedulerForm] = useState({ name: "", email: "", phone: "", notes: "", additionalMessage: "" });
  const [schedulerErrors, setSchedulerErrors] = useState({});
  const [meetLink] = useState("https://meet.google.com/pin-sbjf-wfj");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const validateScheduler = () => {
    let errors = {};
    if (!schedulerForm.name.trim()) errors.name = "Full Name is required";
    if (!schedulerForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(schedulerForm.email)) {
      errors.email = "Invalid email format";
    }
    if (!schedulerForm.notes.trim()) errors.notes = "PRD / Requirements are required";
    return errors;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let h = 19; h <= 23; h++) {
      const hour = (h - 12).toString().padStart(2, '0');
      slots.push(`${hour}:00 PM`);
      slots.push(`${hour}:30 PM`);
    }
    slots.push(`12:00 AM`);
    slots.push(`12:30 AM`);
    for (let h = 1; h <= 7; h++) {
      slots.push(`0${h}:00 AM`);
      if (h < 7) slots.push(`0${h}:30 AM`);
    }
    return slots;
  };

  const handleCopyMeetLink = () => {
    navigator.clipboard.writeText("https://meet.google.com/pin-sbjf-wfj");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0 || isSubmitting) return;

    const errors = validateScheduler();
    if (Object.keys(errors).length > 0) {
      setSchedulerErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");

    let formattedDate = selectedDate;
    try {
      formattedDate = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch(e) {}
    const submittedAt = new Date().toLocaleString('en-US');

    // Construct Web3Forms payload with specific ordered fields
    const data = {
      access_key: personal.web3formsKey || "0a7369aa-badc-4166-81ce-46792f864ecf",
      replyto: schedulerForm.email,
      "Name": schedulerForm.name,
      "Email": schedulerForm.email,
      "Phone Number": schedulerForm.phone || "Not provided",
      "PRD Requirements": schedulerForm.notes,
      "Consultation Date": formattedDate,
      "Time": selectedTime,
      "Submitted At": submittedAt,
      "Additional Message": schedulerForm.additionalMessage || "None",
      "Google Meet Link": "https://meet.google.com/pin-sbjf-wfj"
    };

    try {
      // POST to Web3Forms endpoint
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      const resData = await response.json().catch(() => ({}));
      
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "Form submission failed");
      }

      // Start 30 seconds cooldown timer to prevent spam
      setCooldown(30);
      setSchedulerStep(3);
    } catch (err) {
      console.error("Failed to submit form to Web3Forms:", err);
      let userMsg = err.message || "Please check your network connection or try again.";
      if (err instanceof TypeError || err.message?.includes("Load failed") || err.message?.includes("failed to fetch")) {
        userMsg = "Blocked by browser security or an AdBlocker (like Brave Shields). Please temporarily disable it for this website or contact me on WhatsApp: +91 7079369859.";
      }
      setSubmitError(`⚠️ Failed to submit form: ${userMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl glass-panel overflow-hidden border-neutral-200 shadow-xl flex flex-col md:flex-row relative max-h-[90vh] bg-white">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors z-10 font-bold"
        >
          ✕
        </button>

        {/* Left Host Column */}
        <div className="w-full md:w-5/12 p-6 md:p-8 bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-200 flex flex-col justify-between flex-shrink-0 text-black">
          <div>
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center font-bold text-white shadow-sm mb-6">
              RP
            </div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Strategy Host</span>
            <h3 className="text-xl font-bold text-black mt-1">{personal.name}</h3>
            <h4 className="text-sm font-semibold text-black mt-4 flex items-center gap-2">
              <span>30 Min Cloud & Development Strategy</span>
            </h4>
            <p className="text-neutral-600 text-xs mt-3 leading-relaxed">
              Discuss your software goals, scope requirements, database architectures, and receive a free Cloud Infrastructure estimate directly.
            </p>
          </div>
          
          <div className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-500 space-y-2">
            <p>🕒 30 minutes video meeting</p>
            <p>🌍 Scheduled in {personal.timezone}</p>
          </div>
        </div>

        {/* Right Interactive Booking Calendar/Details Column */}
        <div className="w-full md:w-7/12 p-6 md:p-8 bg-white overflow-y-auto flex-grow text-black">
          
          {/* Step 1: Pick Date & Time */}
          {schedulerStep === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-black">Select Date & Time</h3>
                <button
                  type="button"
                  onClick={handleCopyMeetLink}
                  className="px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-700 hover:text-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto"
                >
                  {copied ? "✓ Link Copied!" : "📋 Copy Meet Link"}
                </button>
              </div>
              
              {/* Date Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">Select Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black text-black transition-colors"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">Select Time (7 PM - 7 AM)</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black text-black transition-colors"
                >
                  <option value="" disabled>Choose a time slot...</option>
                  {generateTimeSlots().map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                disabled={!selectedTime}
                onClick={() => setSchedulerStep(2)}
                className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-all ${
                  selectedTime 
                    ? 'bg-black text-white hover:bg-neutral-800 shadow-sm'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                Next Step
              </button>
            </div>
          )}

          {/* Step 2: Confirmation Fields */}
          {schedulerStep === 2 && (
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-black">Confirm Strategy Call Details</h3>
              
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-1">
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time Slot:</strong> {selectedTime}</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  value={schedulerForm.name}
                  onChange={(e) => setSchedulerForm({...schedulerForm, name: e.target.value})}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black text-black transition-colors"
                />
                {schedulerErrors.name && <p className="text-neutral-500 text-xs mt-1 font-bold">{schedulerErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Email Address *</label>
                <input 
                  type="email" 
                  placeholder="you@company.com"
                  value={schedulerForm.email}
                  onChange={(e) => setSchedulerForm({...schedulerForm, email: e.target.value})}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black text-black transition-colors"
                />
                {schedulerErrors.email && <p className="text-neutral-500 text-xs mt-1 font-bold">{schedulerErrors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  value={schedulerForm.phone}
                  onChange={(e) => setSchedulerForm({...schedulerForm, phone: e.target.value})}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black text-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">PRD / Requirements *</label>
                <textarea 
                  rows="3" 
                  placeholder="Describe your project, technology requirements, or scope details..."
                  value={schedulerForm.notes}
                  onChange={(e) => setSchedulerForm({...schedulerForm, notes: e.target.value})}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-4 text-sm focus:outline-none focus:border-black text-black transition-colors"
                ></textarea>
                {schedulerErrors.notes && <p className="text-neutral-500 text-xs mt-1 font-bold">{schedulerErrors.notes}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Additional Message (Optional)</label>
                <textarea 
                  rows="2" 
                  placeholder="Any other details, notes, or specific requests..."
                  value={schedulerForm.additionalMessage}
                  onChange={(e) => setSchedulerForm({...schedulerForm, additionalMessage: e.target.value})}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-4 text-sm focus:outline-none focus:border-black text-black transition-colors"
                ></textarea>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-neutral-100 border border-neutral-300 text-xs text-neutral-800 font-bold">
                  {submitError}
                </div>
              )}

              <div className="flex gap-3 pt-4 font-sans">
                <button
                  type="button"
                  onClick={() => setSchedulerStep(1)}
                  className="flex-1 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-sm font-bold hover:bg-neutral-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Change Date
                </button>
                <button
                  type="submit"
                  disabled={cooldown > 0 || isSubmitting}
                  className={`flex-1 py-3 rounded-xl bg-black text-white text-sm font-bold hover:bg-neutral-800 transition-opacity shadow-sm flex items-center justify-center gap-2 ${
                    (cooldown > 0 || isSubmitting) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : cooldown > 0 ? (
                    `Please wait (${cooldown}s)`
                  ) : (
                    "Book Meeting"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success Screen */}
          {schedulerStep === 3 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto text-3xl font-extrabold shadow-sm">
                ✓
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-black">Booking Confirmed!</h3>
                <p className="text-neutral-600 text-sm mt-2 leading-relaxed font-medium">
                  Your strategy call has been successfully scheduled.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 max-w-md mx-auto text-left text-sm text-neutral-800 space-y-3">
                <p className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Host</span> 
                  <span className="font-bold text-right">{personal.name} <br/><span className="text-xs font-normal text-neutral-500">(Software Developer)</span></span>
                </p>
                <p className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Client</span> 
                  <span className="font-bold text-right">{schedulerForm.name} <br/><span className="text-xs font-normal text-neutral-500">(Client)</span></span>
                </p>
                <p className="flex justify-between border-b border-neutral-200 pb-2 items-center">
                  <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Date</span> 
                  <span className="font-bold">{selectedDate}</span>
                </p>
                <p className="flex justify-between pb-2 items-center">
                  <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Time</span> 
                  <span className="font-bold">{selectedTime}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-left">
                  <p className="text-red-700 text-xs font-bold">
                    Copy this link. Join at your scheduled time.
                  </p>
                  
                  <div className="mt-2 flex items-center gap-2 p-2 bg-white rounded-lg border border-red-200">
                    <input 
                      type="text" 
                      readOnly 
                      value={meetLink}
                      className="bg-transparent border-none outline-none text-[11px] text-neutral-600 font-mono flex-1 min-w-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href={meetLink}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Join Google Meet
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyMeetLink}
                    className="flex-1 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-700 font-bold text-sm hover:bg-neutral-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {copied ? "✓ Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>

              <div className="max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setSchedulerForm({ name: "", email: "", phone: "", notes: "", additionalMessage: "" });
                    setSelectedTime("");
                    setSchedulerStep(1);
                  }}
                  className="w-full py-3 rounded-xl bg-neutral-100 text-neutral-700 font-bold text-sm hover:bg-neutral-200 transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
