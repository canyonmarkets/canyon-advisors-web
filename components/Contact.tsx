'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const SERVICES = [
  'Fix & Flip',
  'Lease-Option / Rent-to-Own',
  'Cleaning Services',
  'General Inquiry',
] as const;

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const EMPTY: FormState = {
  name: '',
  phone: '',
  email: '',
  service: SERVICES[0],
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSendError(false);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setSendError(true);
    }
  };

  return (
    <section id="contact" className="bg-iron-900 px-6 py-24">
      <div className="max-w-3xl mx-auto">

        <div data-reveal className="text-center mb-12">
          <p className="text-brand-500 font-mono text-base tracking-[0.3em] uppercase mb-4">
            Reach Out
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-white">
            Get In Touch
          </h2>
          <p className="mt-5 text-white text-base leading-relaxed max-w-lg mx-auto">
            Tell us a little about your situation and the right person will follow up with you directly.
            No automated systems — a family member will respond.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-brand-500/30 bg-brand-600/10 px-8 py-12 text-center">
            <CheckCircle size={48} strokeWidth={1.5} className="text-brand-500 mx-auto mb-4" />
            <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-white mb-2">
              Message Received
            </h3>
            <p className="text-white text-base">We will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-[0.15em] uppercase text-iron-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-iron-500 focus:border-brand-500 focus:outline-none transition-colors"
                  placeholder="John Smith"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-[0.15em] uppercase text-iron-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-iron-500 focus:border-brand-500 focus:outline-none transition-colors"
                  placeholder="(602) 555-0100"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono tracking-[0.15em] uppercase text-iron-300">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-iron-500 focus:border-brand-500 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono tracking-[0.15em] uppercase text-iron-300">
                I am interested in
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="rounded-lg border border-white/10 bg-iron-800 px-4 py-3 text-sm text-white focus:border-brand-500 focus:outline-none transition-colors appearance-none"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono tracking-[0.15em] uppercase text-iron-300">
                Tell Us About Your Situation *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-iron-500 focus:border-brand-500 focus:outline-none transition-colors resize-none"
                placeholder="Give us a brief overview of what you are looking to accomplish..."
              />
            </div>

            {sendError && (
              <p className="text-sm text-red-400 text-center">
                Something went wrong. Please email us at{' '}
                <a href="mailto:info@canyon-advisors.com" className="underline">
                  info@canyon-advisors.com
                </a>.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-8 py-4 text-base font-semibold text-white uppercase tracking-wide hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/30 active:scale-[0.97] transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? 'Sending…' : 'Send Message'}
              <Send size={16} strokeWidth={2} />
            </button>

          </form>
        )}

      </div>
    </section>
  );
}
