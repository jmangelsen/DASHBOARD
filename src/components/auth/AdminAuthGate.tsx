import React, { useState, useEffect } from 'react';
import { 
  googleSignIn, 
  emailPasswordSignIn, 
  googleLogout, 
  subscribeToAuth, 
  getApprovedAdminEmail, 
  isEmailApprovedAdmin,
  SimpleAdminSession
} from '../../services/googleAuth';
import { User } from 'firebase/auth';
import { 
  Lock, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  LogOut, 
  KeyRound, 
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Terminal
} from 'lucide-react';

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminSession, setAdminSession] = useState<SimpleAdminSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [sessionTimedOut, setSessionTimedOut] = useState<boolean>(false);

  // Subscribe to auth state
  useEffect(() => {
    const unsub = subscribeToAuth((user, _token, session) => {
      setCurrentUser(user);
      setAdminSession(session);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Inactivity session timer (30 minutes)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Session timeout triggers lock
        if (currentUser || adminSession) {
          setSessionTimedOut(true);
          googleLogout();
        }
      }, 30 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [currentUser, adminSession]);

  const handleGoogleAuth = async () => {
    try {
      setIsSubmitting(true);
      setAuthError(null);
      setSessionTimedOut(false);
      await googleSignIn();
    } catch (err: any) {
      setAuthError(err.message || 'Google authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setAuthError('Please enter administrator email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setAuthError(null);
      setSessionTimedOut(false);
      await emailPasswordSignIn(emailInput, passwordInput);
    } catch (err: any) {
      setAuthError(err.message || 'Authentication rejected.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await googleLogout();
    setEmailInput('');
    setPasswordInput('');
    setAuthError(null);
    setSessionTimedOut(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center font-mono text-cyan-400">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-xs uppercase tracking-widest">NEXUS // Verifying Identity...</span>
        </div>
      </div>
    );
  }

  // 1. Check if ANY user is logged in
  const activeEmail = currentUser?.email || adminSession?.email;

  // 2. If a user IS logged in, verify they match the single approved admin email
  if (activeEmail) {
    const isApproved = isEmailApprovedAdmin(activeEmail);

    if (!isApproved) {
      // LOCK SCREEN FOR UNAUTHORIZED USERS
      return (
        <div className="min-h-screen bg-[#05070c] flex items-center justify-center p-4 font-mono select-none">
          <div className="max-w-md w-full bg-[#0a0e17] border border-rose-500/50 rounded-xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />
            
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/40">
                <ShieldAlert className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <h1 className="text-base font-black uppercase tracking-wider text-white font-display">
                  Access Denied
                </h1>
                <div className="text-[11px] text-rose-400 font-mono">
                  Unauthorized Identity Detected
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/60 text-xs text-rose-200/90 leading-relaxed font-sans">
              <strong>“Access denied. This is a private single-operator intelligence environment.”</strong>
              <p className="mt-2 text-[11px] text-rose-300 font-mono">
                Authenticated Account: <span className="text-white font-bold">{activeEmail}</span>
              </p>
              <p className="mt-1 text-[11px] text-slate-400 font-mono">
                This identity is not on the single-operator allowlist ({getApprovedAdminEmail()}). All internal forecasting models, venture research, and telemetry remain strictly sealed.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-mono font-bold transition-all border border-slate-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect & Return to Lock Screen</span>
              </button>
            </div>

            <div className="text-center text-[10px] text-slate-500 font-mono">
              NEXUS OS // ENFORCED SYSTEM SECURITY // ACCESS TERMINATED
            </div>
          </div>
        </div>
      );
    }

    // Authenticated as approved admin -> Render application!
    return <>{children}</>;
  }

  // 3. User is NOT authenticated -> Present Single Admin Login Console (NO public registration/signup)
  return (
    <div className="min-h-screen bg-[#05070c] flex flex-col items-center justify-center p-4 font-mono text-slate-200 relative overflow-hidden">
      {/* Background Subtle Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1322_1px,transparent_1px),linear-gradient(to_bottom,#0c1322_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-md w-full bg-[#080c16]/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-violet-600/30 border border-cyan-500/40 text-cyan-400 font-mono font-black text-sm shadow-inner mb-1">
            NX
          </div>
          <h1 className="text-lg font-black tracking-tight text-white font-display">
            NEXUS <span className="text-xs font-mono font-normal text-slate-400">// Personal Intelligence OS</span>
          </h1>
          <div className="text-[11px] text-cyan-400 font-mono tracking-wider font-semibold">
            Forecast with rigor. Build with speed. Compound with discipline.
          </div>
          <div className="inline-block mt-2 px-3 py-1 rounded bg-[#0d1322] border border-cyan-900/60 text-[10px] text-slate-300 font-mono uppercase tracking-widest">
            PRIVATE // SINGLE-OPERATOR ENVIRONMENT
          </div>
        </div>

        {sessionTimedOut && (
          <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Session expired due to inactivity. Re-authenticate to resume.</span>
          </div>
        )}

        {authError && (
          <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="leading-tight">{authError}</span>
          </div>
        )}

        {/* Primary Method 1: Google Single Admin Auth */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Primary Administrator Sign-In</span>
          </div>

          <button
            onClick={handleGoogleAuth}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold font-sans transition-all shadow-lg border border-slate-200 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            <span>{isSubmitting ? 'Verifying Token...' : 'Authenticate with Google'}</span>
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-800" />
          <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase tracking-widest">or email/password</span>
          <div className="flex-grow border-t border-slate-800" />
        </div>

        {/* Method 2: Admin Direct Credential Sign-In */}
        <form onSubmit={handleEmailPasswordAuth} className="space-y-3.5">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">
              Admin Allowlisted Email
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={getApprovedAdminEmail()}
              className="w-full bg-[#04060a] border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">
              Master Password
            </label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#04060a] border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Checking Credentials...' : 'Unlock Operator Terminal'}</span>
          </button>
        </form>

        {/* Footer Guardrail Notice */}
        <div className="pt-3 border-t border-slate-800/80 text-center space-y-1">
          <div className="text-[10px] text-slate-500 font-mono">
            Approved Administrator: <span className="text-slate-400">{getApprovedAdminEmail()}</span>
          </div>
          <p className="text-[10px] text-slate-600 font-sans">
            Public registration is permanently disabled. External access is strictly blocked.
          </p>
        </div>
      </div>
    </div>
  );
};
