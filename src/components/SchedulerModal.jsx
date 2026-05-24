import React, { useState, useEffect } from 'react';

export default function SchedulerModal({ personal, onClose }) {
  const [schedulerStep, setSchedulerStep] = useState(1); // 1: Date/Time, 2: Details, 3: Success
  const [selectedDate, setSelectedDate] = useState("2026-06-08"); // Mocking dates in June
  const [selectedTime, setSelectedTime] = useState("");
  const [schedulerForm, setSchedulerForm] = useState({ name: "", email: "", notes: "", additionalMessage: "" });
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

  const generateMeetLink = () => {
    return "https://meet.google.com/pin-sbjf-wfj";
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

    const formattedDate = `June ${selectedDate.split('-')[2]}, 2026`;
    const clientAutoReply = `Dear ${schedulerForm.name}, Thank you for reaching out. Your consultation is scheduled for ${formattedDate} at ${selectedTime}. Join Google Meet: https://meet.google.com/pin-sbjf-wfj. Need to reschedule? WhatsApp +91 7079369859. - Rajeev`;

    // Construct standard FormSubmit FormData payload (simple request, bypasses CORS preflight OPTIONS)
    const payload = new FormData();
    payload.append("name", schedulerForm.name);
    payload.append("email", schedulerForm.email);
    payload.append("consultation_date", formattedDate);
    payload.append("consultation_time", selectedTime);
    payload.append("prd_requirements", schedulerForm.notes);
    payload.append("additional_message", schedulerForm.additionalMessage || "None");
    payload.append("_subject", "Meeting Confirmed - Rajeev Ranjan Prasad");
    payload.append("_captcha", "false");
    payload.append("_template", "table");
    payload.append("_autoresponse", clientAutoReply);

    try {
      // POST to FormSubmit.co ajax endpoint as FormData simple request
      const response = await fetch("https://formsubmit.co/ajax/rajeevranjan.freelance@gmail.com", {
        method: "POST",
        body: payload
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Form submission failed");
      }

      // Start 30 seconds cooldown timer to prevent spam
      setCooldown(30);
      setSchedulerStep(3);
    } catch (err) {
      console.error("Failed to submit form to FormSubmit:", err);
      let userMsg = err.message || "Please check your network connection or try again.";
      if (err instanceof TypeError || err.message?.includes("Load failed") || err.message?.includes("failed to fetch")) {
        userMsg = "Blocked by browser security or an AdBlocker (like Brave Shields or Safari Content Blockers). Please temporarily disable it for this website or contact me on WhatsApp: +91 7079369859.";
      }
      setSubmitError(`⚠️ Failed to submit form: ${userMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl glass-panel overflow-hidden border-white/10 shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          ✕
        </button>

        {/* Left Host Column */}
        <div className="md:w-5/12 p-6 md:p-8 bg-slate-900/50 border-r border-white/5 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyanNeon to-blueElectric flex items-center justify-center font-bold text-white shadow-lg mb-6">
              RP
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Strategy Host</span>
            <h3 className="text-xl font-bold text-white mt-1">{personal.name}</h3>
            <h4 className="text-sm font-semibold text-cyanNeon mt-4 flex items-center gap-2">
              <span>30 Min Cloud & Development Strategy</span>
            </h4>
            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              Discuss your software goals, scope requirements, database architectures, and receive a free Cloud Infrastructure estimate directly.
            </p>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/5 text-xs text-slate-500 space-y-2">
            <p>🕒 30 minutes video meeting</p>
            <p>🌍 Scheduled in {personal.timezone}</p>
          </div>
        </div>

        {/* Right Interactive Booking Calendar/Details Column */}
        <div className="md:w-7/12 p-6 md:p-8 bg-slate-950/40 max-h-[90vh] overflow-y-auto">
          
          {/* Step 1: Pick Date & Time */}
          {schedulerStep === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-white">Select Date & Time</h3>
                <button
                  type="button"
                  onClick={handleCopyMeetLink}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto"
                >
                  {copied ? "✓ Link Copied!" : "📋 Copy Meet Link"}
                </button>
              </div>
              
              {/* Simulated Mini Calendar for June 2026 */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex justify-between">
                  <span>June 2026</span>
                  <span>Mon - Fri Slots Open</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-slate-400 border border-white/5 p-3 rounded-2xl bg-slate-900/30">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={i} className="font-bold text-[10px] text-slate-500 py-1">{d}</span>
                  ))}
                  
                  {/* Blank days for start of month (June 1st, 2026 is Monday, so 1 blank Sunday offset) */}
                  <span key="blank-0" />
                  
                  {/* Days grid */}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateStr = `2026-06-${dayNum.toString().padStart(2, '0')}`;
                    // Exclude weekends (Day 6, 7, 13, 14, 20, 21, 27, 28 are weekends)
                    const isWeekend = [6, 7, 13, 14, 20, 21, 27, 28].includes(dayNum);
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={isWeekend}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`py-2 rounded-lg font-bold transition-all duration-300 ${
                          isWeekend 
                            ? 'text-slate-700 cursor-not-allowed'
                            : isSelected
                              ? 'bg-cyanNeon text-slate-950 shadow-md shadow-cyanNeon/20'
                              : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots grid */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Available Time Slots (Your Timezone)</span>
                <div className="grid grid-cols-3 gap-2">
                  {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                        selectedTime === t
                          ? 'border-cyanNeon bg-cyanNeon/10 text-white'
                          : 'border-white/5 bg-slate-900/30 text-slate-300 hover:border-white/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!selectedTime}
                onClick={() => setSchedulerStep(2)}
                className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-all ${
                  selectedTime 
                    ? 'bg-gradient-to-r from-cyanNeon to-blueElectric text-white hover:opacity-90 shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Next Step
              </button>
            </div>
          )}

          {/* Step 2: Confirmation Fields */}
          {schedulerStep === 2 && (
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-white">Confirm Strategy Call Details</h3>
              
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 space-y-1">
                <p><strong>Date:</strong> June {selectedDate.split('-')[2]}, 2026</p>
                <p><strong>Time Slot:</strong> {selectedTime}</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  value={schedulerForm.name}
                  onChange={(e) => setSchedulerForm({...schedulerForm, name: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyanNeon transition-colors"
                />
                {schedulerErrors.name && <p className="text-red-400 text-xs mt-1">{schedulerErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address *</label>
                <input 
                  type="email" 
                  placeholder="you@company.com"
                  value={schedulerForm.email}
                  onChange={(e) => setSchedulerForm({...schedulerForm, email: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyanNeon transition-colors"
                />
                {schedulerErrors.email && <p className="text-red-400 text-xs mt-1">{schedulerErrors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">PRD / Requirements *</label>
                <textarea 
                  rows="3" 
                  placeholder="Describe your project, technology requirements, or scope details..."
                  value={schedulerForm.notes}
                  onChange={(e) => setSchedulerForm({...schedulerForm, notes: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-cyanNeon transition-colors"
                ></textarea>
                {schedulerErrors.notes && <p className="text-red-400 text-xs mt-1">{schedulerErrors.notes}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Additional Message (Optional)</label>
                <textarea 
                  rows="2" 
                  placeholder="Any other details, notes, or specific requests..."
                  value={schedulerForm.additionalMessage}
                  onChange={(e) => setSchedulerForm({...schedulerForm, additionalMessage: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-cyanNeon transition-colors"
                ></textarea>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                  {submitError}
                </div>
              )}

              <div className="flex gap-3 pt-4 font-sans">
                <button
                  type="button"
                  onClick={() => setSchedulerStep(1)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-bold hover:text-white transition-colors"
                  disabled={isSubmitting}
                >
                  Change Date
                </button>
                <button
                  type="submit"
                  disabled={cooldown > 0 || isSubmitting}
                  className={`flex-1 py-3 rounded-xl bg-gradient-to-r from-cyanNeon to-blueElectric text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center justify-center gap-2 ${
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
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl font-extrabold">
                ✓
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white">✅ Request sent!</h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium">
                  Check your email for Google Meet link: <a href="https://meet.google.com/pin-sbjf-wfj" target="_blank" rel="noreferrer" className="text-cyanNeon hover:text-cyanNeon/80 font-bold underline break-all">https://meet.google.com/pin-sbjf-wfj</a>
                </p>
              </div>

              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 max-w-md mx-auto text-left text-xs text-slate-400 space-y-2.5">
                <p><strong>Host:</strong> {personal.name}</p>
                <p><strong>Scheduled Slot:</strong> June {selectedDate.split('-')[2]}, 2026 at {selectedTime}</p>
                <p><strong>Google Meet Link:</strong> <a href={meetLink} target="_blank" rel="noreferrer" className="text-cyanNeon hover:text-cyanNeon/80 font-bold underline break-all">{meetLink}</a></p>
                <p className="text-[10px] text-slate-500 italic">Please join using the Google Meet link at the scheduled time.</p>
              </div>

              <div className="max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setSchedulerForm({ name: "", email: "", notes: "", additionalMessage: "" });
                    setSelectedTime("");
                    setSchedulerStep(1);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyanNeon to-blueElectric text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
