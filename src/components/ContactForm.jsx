import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../portfolioData';

export default function ContactForm({ onSubmitSuccess }) {
  const [contactStep, setContactStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Web App",
    users: "<1k",
    budget: "5k-15k",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const getCalcStats = (users) => {
    if (users <= 1000) {
      return {
        setup: "React SPA + Java Spring Boot (packaged monolith) + Managed MySQL (1GB RAM)"
      };
    } else if (users <= 10000) {
      return {
        setup: "S3 hosted React + Application Load Balancer + Spring Boot on EC2 with Auto-Scaling + Multi-AZ RDS"
      };
    } else {
      return {
        setup: "Next.js Static hosting + AWS EKS Cluster running Spring Boot pods + Redis cache + RDS replicas"
      };
    }
  };

  const validateContactForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) errors.message = "Message cannot be empty";
    return errors;
  };

  const handleContactNext = () => {
    let errors = {};
    if (contactStep === 1) {
      if (!formData.name.trim()) errors.name = "Full name is required";
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Invalid email format";
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    }
    setFormErrors({});
    setContactStep(prev => prev + 1);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = validateContactForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Send actual email if Web3Forms key is configured
    const personal = PORTFOLIO_DATA.personal;
    if (personal.web3formsKey) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: personal.web3formsKey,
            subject: `New Lead from Portfolio: ${formData.name}`,
            from_name: "Portfolio Contact Form",
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "Not provided",
            message: `Project Type: ${formData.projectType}\nEstimated Active Users: ${formData.users}\nBudget: ${formData.budget}\nMessage details: ${formData.message}`
          })
        });
      } catch (err) {
        console.error("Failed to send email via Web3Forms:", err);
      }
    }

    onSubmitSuccess(formData);
  };

  return (
    <form onSubmit={handleContactSubmit} className="p-8 rounded-3xl glass-panel border-white/5 space-y-6 shadow-2xl relative">
      
      {/* Form Progress Indicator */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6 flex justify-between">
        <div className="bg-gradient-to-r from-cyanNeon to-blueElectric h-full transition-all duration-500" style={{ width: `${(contactStep / 3) * 100}%` }}></div>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 font-bold mb-4">
        <span className={contactStep >= 1 ? "text-cyanNeon" : ""}>1. About You</span>
        <span className={contactStep >= 2 ? "text-cyanNeon" : ""}>2. Scope</span>
        <span className={contactStep >= 3 ? "text-cyanNeon" : ""}>3. Scale & Budget</span>
      </div>

      {/* Step 1: Info */}
      {contactStep === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name *</label>
            <input 
              type="text" 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyanNeon transition-colors"
            />
            {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address *</label>
            <input 
              type="email" 
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyanNeon transition-colors"
            />
            {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone Number (Optional)</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 019-2834"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyanNeon transition-colors"
            />
          </div>
        </div>
      )}

      {/* Step 2: Scope */}
      {contactStep === 2 && (
        <div className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">What are you building? *</label>
          <div className="grid grid-cols-2 gap-3">
            {["Web App", "Mobile App", "Both", "Cloud Consulting"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFormData({...formData, projectType: t})}
                className={`p-4 rounded-xl border text-sm font-bold transition-all duration-300 text-left flex flex-col justify-between h-24 ${
                  formData.projectType === t
                    ? 'border-cyanNeon bg-cyanNeon/5 text-white'
                    : 'border-white/10 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>{t}</span>
                <span className="text-[10px] font-normal text-slate-400">Click to Select</span>
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mt-4 mb-2">Explain the project briefly *</label>
            <textarea 
              rows="3" 
              placeholder="Need a payment platform optimized for high scale..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-cyanNeon transition-colors"
            ></textarea>
            {formErrors.message && <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
          </div>
        </div>
      )}

      {/* Step 3: Scale & Budget */}
      {contactStep === 3 && (
        <div className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Estimated Active Users</label>
            <div className="flex gap-2">
              {["<1k", "1k-10k", "10k+"].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setFormData({...formData, users: u})}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all duration-300 ${
                    formData.users === u
                      ? 'border-cyanNeon bg-cyanNeon/5 text-white'
                      : 'border-white/10 bg-slate-900/50 text-slate-400'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mt-4 mb-2">Estimated Budget Range</label>
            <div className="flex gap-2">
              {["<5k", "5k-15k", "15k+"].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setFormData({...formData, budget: b})}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all duration-300 ${
                    formData.budget === b
                      ? 'border-cyanNeon bg-cyanNeon/5 text-white'
                      : 'border-white/10 bg-slate-900/50 text-slate-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-white/5">
        {contactStep > 1 ? (
          <button
            type="button"
            onClick={() => setContactStep(prev => prev - 1)}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-bold hover:text-white transition-colors"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {contactStep < 3 ? (
          <button
            type="button"
            onClick={handleContactNext}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyanNeon to-blueElectric text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Next Step
          </button>
        ) : (
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyanNeon to-blueElectric text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            Get Custom Cloud Quote
          </button>
        )}
      </div>
    </form>
  );
}
