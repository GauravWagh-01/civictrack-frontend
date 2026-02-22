import { useState } from 'react';
import {
    Phone,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
    Loader2,
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
} from '../app/components/ui/dialog.jsx';

/**
 * CivicTrack logo — reused from TopNavigation
 */
function AppLogo() {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </div>
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    CivicTrack
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                    Infrastructure Transparency
                </p>
            </div>
        </div>
    );
}

/**
 * Google logo SVG
 */
function GoogleIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
        </svg>
    );
}

/**
 * Login modal for civic feedback submission
 * @param {Object} props
 * @param {boolean} props.open
 * @param {(open: boolean) => void} props.onOpenChange
 * @param {() => void} props.onLoginSuccess — called after successful authentication
 */
export function LoginModal({ open, onOpenChange, onLoginSuccess }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOtp = async () => {
        if (phoneNumber.length < 10) return;
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setIsLoading(false);
        setOtpSent(true);
    };

    const handleVerifyOtp = async () => {
        if (otp.length < 4) return;
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        handleClose();
        onLoginSuccess?.();
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        handleClose();
        onLoginSuccess?.();
    };

    const handleClose = () => {
        setPhoneNumber('');
        setOtp('');
        setOtpSent(false);
        setIsLoading(false);
        onOpenChange(false);
    };

    const formatPhoneDisplay = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 10);
        setPhoneNumber(digits);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden">
                {/* ── Main content ── */}
                <div className="px-6 pt-8 pb-6">
                    {/* Logo + tagline */}
                    <AppLogo />

                    {/* Purpose message */}
                    <div className="mt-5 mb-6 text-center">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Sign in to submit verified feedback on
                            <br />
                            public infrastructure projects.
                        </p>
                    </div>

                    {/* ──────── Continue with Google ──────── */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <GoogleIcon />
                        <span className="text-sm font-semibold text-gray-700">
                            Continue with Google
                        </span>
                    </button>

                    {/* ──────── Divider ──────── */}
                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider font-medium">
                                or use phone
                            </span>
                        </div>
                    </div>

                    {/* ──────── Phone OTP Login ──────── */}
                    {!otpSent ? (
                        /* Phone number input */
                        <div className="space-y-3">
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-500 font-medium">+91</span>
                                    <div className="w-px h-4 bg-gray-200" />
                                </div>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => formatPhoneDisplay(e.target.value)}
                                    placeholder="Enter phone number"
                                    className="w-full pl-[5.5rem] pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                    maxLength={10}
                                    aria-label="Phone number"
                                />
                            </div>
                            <button
                                onClick={handleSendOtp}
                                disabled={phoneNumber.length < 10 || isLoading}
                                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${phoneNumber.length >= 10 && !isLoading
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send OTP
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        /* OTP verification */
                        <div className="space-y-3">
                            <p className="text-xs text-gray-500 text-center">
                                OTP sent to{' '}
                                <span className="font-semibold text-gray-700">
                                    +91 {phoneNumber.slice(0, 5)} {phoneNumber.slice(5)}
                                </span>
                            </p>
                            <div className="flex gap-2 justify-center">
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={otp[i] || ''}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/, '');
                                            const newOtp = otp.split('');
                                            newOtp[i] = val;
                                            setOtp(newOtp.join(''));
                                            // Auto-focus next input
                                            if (val && e.target.nextElementSibling) {
                                                e.target.nextElementSibling.focus();
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !otp[i] && e.target.previousElementSibling) {
                                                e.target.previousElementSibling.focus();
                                            }
                                        }}
                                        className="w-10 h-12 text-center bg-gray-50 border border-gray-200 rounded-lg text-lg font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                        aria-label={`OTP digit ${i + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={handleVerifyOtp}
                                disabled={otp.length < 6 || isLoading}
                                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${otp.length >= 6 && !isLoading
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Verify & Continue
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => { setOtpSent(false); setOtp(''); }}
                                className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium py-1 cursor-pointer"
                            >
                                Change phone number
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Trust footer ── */}
                <div className="bg-gray-50 border-t border-gray-100 px-6 py-4">
                    <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs font-semibold text-gray-600">
                                Verified Contributions Only
                            </p>
                            <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                                Authentication ensures accountability and prevents
                                misuse. Your identity is protected under our privacy policy.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
