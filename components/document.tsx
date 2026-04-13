'use client';
import React, { useState } from 'react';
import { Download, X, FileText, CheckCircle } from 'lucide-react';

const documents = [
  {
    name: 'BROCHURE',
    desc: 'Comprehensive project brochure with floor plans, amenities & pricing details.',
    url: 'https://mahalaxmiinfra.in/documents/property_documents/1769078680_doc_M-45 FINAL LEAFLET NEW_compressed (2) (1)_compressed-compressed.pdf',
  },
];

export default function DocumentsSection() {
  const [showModal, setShowModal]   = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(null);
  const [formData, setFormData]     = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone]             = useState(false);

  const handleDownloadClick = (doc: typeof documents[0]) => { setSelectedDoc(doc); setShowModal(true); setDone(false); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email) { alert('Please fill all required fields'); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setDone(true);
        window.open(selectedDoc!.url, '_blank');
        setTimeout(() => { setFormData({ name: '', phone: '', email: '' }); setShowModal(false); setDone(false); }, 1800);
      }
    } catch { /* silent */ } finally { setIsSubmitting(false); }
  };

  return (
    <>
      <section
        className="py-16 md:py-20"
        style={{ background: 'rgba(48,83,74,0.05)', borderTop: '1px solid rgba(48,83,74,0.1)' }}
        id="documents"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-fade text-center mb-10">
            <span className="section-chip mb-3 block w-fit mx-auto">Downloads</span>
            <h2
              className="mb-2"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--primary)' }}
            >
              Project Documents
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
              Access detailed insights and specifications — download our project brochure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center scroll-fade-delay-1">
            {documents.map((doc, i) => (
              <div
                key={i}
                className="group relative flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer max-w-md w-full"
                style={{ background: '#fff', border: '1px solid rgba(48,83,74,0.12)' }}
                onClick={() => handleDownloadClick(doc)}
              >
                {/* File icon */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--primary)' }}
                >
                  <FileText size={26} color="var(--secondary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold mb-1"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)', fontSize: '0.95rem' }}
                  >
                    {doc.name}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
                    {doc.desc}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ background: 'var(--secondary)' }}
                  aria-label="Download"
                >
                  <Download size={18} color="#fff" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
          <div
            className="relative rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            style={{ background: '#fff' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="px-8 py-6 border-b" style={{ borderColor: 'rgba(48,83,74,0.1)' }}>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X size={18} color="#888" />
              </button>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Download
              </p>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--primary)' }}>
                {selectedDoc?.name}
              </h3>
            </div>

            <div className="px-8 py-6 space-y-4">
              {done ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <CheckCircle size={48} color="var(--primary)" />
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--primary)', fontWeight: 600 }}>
                    Opening your document…
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
                    Enter your details to download the document.
                  </p>
                  {(['name', 'phone', 'email'] as const).map((field) => (
                    <div key={field}>
                      <label
                        className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                        style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}
                      >
                        {field === 'phone' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)} *
                      </label>
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field === 'phone' ? '+91 XXXXXXXXXX' : field === 'email' ? 'your@email.com' : 'Your full name'}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                        style={{
                          background: 'rgba(48,83,74,0.05)',
                          border: '1px solid rgba(48,83,74,0.15)',
                          color: 'var(--tcolor)',
                          fontFamily: 'var(--font-sans)',
                        }}
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-gold w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit & Download'}
                    <Download size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}