import React, { forwardRef, useEffect, useState } from 'react';
import * as QRCode from 'qrcode';
import { Award, ShieldCheck } from 'lucide-react';

interface CertificatePreviewProps {
  certificateNumber: string;
  studentName: string;
  course: string;
  institution: string;
  issueDate: string;
  certificateHash: string;
  issuerName?: string;
  issuerTitle?: string;
}

export const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  (
    {
      certificateNumber,
      studentName,
      course,
      institution,
      issueDate,
      certificateHash,
      issuerName = 'Vishal Barai',
      issuerTitle = 'Dean of Academic Affairs / Registrar'
    },
    ref
  ) => {
    const [qrDataUrl, setQrDataUrl] = useState('');

    const formattedDate = new Date(issueDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    useEffect(() => {
      let active = true;

      const generateQr = async () => {
        try {
          const verifyUrl = `${window.location.origin}/verify?hash=${
            certificateHash || 'preview-hash'
          }`;

          const url = await QRCode.toDataURL(verifyUrl, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 220,
            color: {
              dark: '#0f172a',
              light: '#ffffff'
            }
          });

          if (active) {
            setQrDataUrl(url);
          }
        } catch (error) {
          console.error('QR generation failed:', error);
          if (active) {
            setQrDataUrl('');
          }
        }
      };

      generateQr();

      return () => {
        active = false;
      };
    }, [certificateHash]);

    return (
      <div className="flex justify-center bg-muted/40 p-4 rounded-2xl overflow-auto">
        <div
          ref={ref}
          className="bg-[#fdfcf7] text-[#1e293b] shadow-2xl relative"
          style={{
            width: '794px',
            minWidth: '794px',
            height: '1123px',
            padding: '24px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          {/* Outer Ornamental Frame */}
          <div
            className="h-full border-[6px] border-[#b8934a] p-2 relative"
            style={{ boxSizing: 'border-box' }}
          >
            {/* Inner Border */}
            <div
              className="flex h-full flex-col justify-between border-2 border-[#caa455] px-10 py-8 relative bg-gradient-to-b from-[#fefefc] via-[#fbfaf3] to-[#fbf9f0]"
              style={{ boxSizing: 'border-box' }}
            >
              {/* Corner Emblems */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#b8934a]" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#b8934a]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#b8934a]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#b8934a]" />

              {/* Watermark in background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <Award className="w-[450px] h-[450px] text-[#b8934a]" />
              </div>

              {/* Top Seal & Institution Header */}
              <div className="relative text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#b8934a] bg-gradient-to-tr from-[#997328] via-[#cca95e] to-[#efd89d] shadow-md">
                  <div className="flex flex-col items-center justify-center text-white">
                    <ShieldCheck className="h-7 w-7 text-white stroke-[2.5]" />
                  </div>
                </div>

                <div className="inline-block px-4 py-1 rounded-full border border-[#cca95e]/60 bg-[#cca95e]/10 text-[11px] font-semibold tracking-widest text-[#8a6820] uppercase mb-2">
                  Decentralized Blockchain Credential
                </div>

                <h1 className="text-[32px] font-extrabold tracking-tight text-[#0f172a] uppercase">
                  {institution || 'Department of Technical Education'}
                </h1>

                <h2
                  className="mt-2 text-[42px] tracking-[0.2em] font-bold text-[#1e3a8a]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  CERTIFICATE
                </h2>
                <div className="mx-auto mt-1 h-1 w-24 bg-gradient-to-r from-transparent via-[#b8934a] to-transparent" />

                <p className="mt-3 text-[14px] font-mono font-medium tracking-wide text-[#475569]">
                  Certificate Number: <span className="font-bold text-[#0f172a]">{certificateNumber}</span>
                </p>
              </div>

              {/* Certificate Core Statement */}
              <div className="relative text-center my-auto py-2">
                <h3
                  className="text-[18px] font-bold uppercase tracking-wider text-[#64748b]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  This is to certify that
                </h3>

                <h4 className="mt-4 text-[42px] font-black uppercase tracking-wide text-[#0f172a] font-heading underline decoration-[#b8934a]/50 decoration-2 underline-offset-8">
                  {studentName || 'Student Name'}
                </h4>

                <p className="mt-5 text-[18px] text-[#334155]">
                  has satisfactorily completed all prescribed degree and course requirements in
                </p>

                <h5 className="mt-3 text-[32px] font-extrabold uppercase text-[#1e3a8a] tracking-wide">
                  {course || 'Computer Science & Engineering'}
                </h5>

                <p className="mt-4 text-[16px] text-[#475569] max-w-xl mx-auto">
                  conferred with all honors, rights, and privileges pertaining thereto, 
                  awarded on this <span className="font-bold text-[#0f172a]">{formattedDate}</span>.
                </p>

                <div className="mx-auto mt-6 max-w-md rounded-xl border border-[#cbd5e1] bg-white/70 p-3 shadow-sm">
                  <p className="text-[12px] leading-5 text-[#64748b]">
                    🔒 Verified & Recorded on Ethereum Blockchain. Cryptographically secured and tamper-proof.
                  </p>
                </div>
              </div>

              {/* Signatures & QR Section */}
              <div className="relative mt-4 grid grid-cols-2 items-end gap-6 pt-4 border-t border-[#e2e8f0]">
                {/* Official Signature */}
                <div className="text-left pb-2">
                  <div className="w-48 border-b-2 border-[#1e293b] pb-1">
                    <span className="font-serif italic text-xl text-[#0f172a]">{issuerName}</span>
                  </div>
                  <p className="mt-2 text-[15px] font-bold text-[#0f172a]">{issuerName}</p>
                  <p className="text-[12px] text-[#64748b]">{issuerTitle}</p>
                  <p className="text-[11px] text-[#94a3b8]">{institution}</p>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#cbd5e1] shadow-sm">
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="Verification QR Code"
                        width={110}
                        height={110}
                        className="block rounded-lg"
                      />
                    ) : (
                      <div className="h-[110px] w-[110px] bg-slate-100 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                        Generating QR...
                      </div>
                    )}
                    <div className="text-left text-[11px] text-[#475569] max-w-[130px] leading-4">
                      <span className="font-bold text-[#0f172a] block text-xs mb-0.5">Scan to Verify</span>
                      Scan with any smartphone or webcam to inspect on-chain authenticity.
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Cryptographic Ledger Hash */}
              <div className="relative mt-4 border-t border-[#e2e8f0] pt-3 text-[11px] text-[#64748b]">
                <div className="flex items-center justify-between font-mono">
                  <span>Certificate Verifier Platform</span>
                  <span className="truncate max-w-[480px]">
                    Hash: <strong className="text-[#0f172a]">{certificateHash || 'Pending Blockchain Issuance'}</strong>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificatePreview.displayName = 'CertificatePreview';