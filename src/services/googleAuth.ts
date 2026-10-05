import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Allowlisted Admin Email key
const ADMIN_ALLOWLIST_KEY = 'nexus_approved_admin_email';
export const DEFAULT_ADMIN_EMAIL = 'Research@aiphysicallayer.net';

export const getApprovedAdminEmail = (): string => {
  return localStorage.getItem(ADMIN_ALLOWLIST_KEY) || DEFAULT_ADMIN_EMAIL;
};

export const setApprovedAdminEmail = (newEmail: string): void => {
  localStorage.setItem(ADMIN_ALLOWLIST_KEY, newEmail.trim());
};

export const isEmailApprovedAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const approved = getApprovedAdminEmail().trim().toLowerCase();
  return email.trim().toLowerCase() === approved;
};

// Configure Google Auth Provider with all requested Drive & Sheets scopes
const provider = new GoogleAuthProvider();

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/spreadsheets.readonly'
];

WORKSPACE_SCOPES.forEach(scope => {
  provider.addScope(scope);
});

provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline'
});

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

// Simulated admin session fallback for email/password if offline or non-Firebase user
export interface SimpleAdminSession {
  email: string;
  displayName: string;
  authenticatedAt: string;
}

let simulatedAdminSession: SimpleAdminSession | null = (() => {
  try {
    const raw = sessionStorage.getItem('nexus_admin_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

type AuthListener = (user: User | null, token: string | null, adminSession: SimpleAdminSession | null) => void;
const listeners = new Set<AuthListener>();

const notifyListeners = () => {
  listeners.forEach(fn => {
    try {
      fn(cachedUser, cachedAccessToken, simulatedAdminSession);
    } catch (e) {
      console.error('Error in auth listener:', e);
    }
  });
};

export const subscribeToAuth = (listener: AuthListener): (() => void) => {
  listeners.add(listener);
  listener(cachedUser, cachedAccessToken, simulatedAdminSession);
  return () => {
    listeners.delete(listener);
  };
};

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    cachedUser = user;
    if (user) {
      if (cachedAccessToken) {
        notifyListeners();
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        notifyListeners();
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      notifyListeners();
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google OAuth access token');
    }

    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    simulatedAdminSession = null;
    sessionStorage.removeItem('nexus_admin_session');
    notifyListeners();
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const emailPasswordSignIn = async (email: string, pass: string): Promise<SimpleAdminSession> => {
  const approved = getApprovedAdminEmail().trim().toLowerCase();
  const inputEmail = email.trim().toLowerCase();

  // Try Firebase Auth email/pass first
  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    cachedUser = cred.user;
  } catch (fbErr: any) {
    // If Firebase Auth email/password is not enabled in Firebase Console,
    // verify against the approved admin email for single-user authentication
    if (inputEmail !== approved) {
      throw new Error(`Access denied. '${email}' is not the approved single-operator admin account.`);
    }
    if (!pass || pass.length < 6) {
      throw new Error('Admin password must be at least 6 characters.');
    }
  }

  const session: SimpleAdminSession = {
    email: inputEmail,
    displayName: 'Nexus Founder',
    authenticatedAt: new Date().toISOString()
  };

  simulatedAdminSession = session;
  sessionStorage.setItem('nexus_admin_session', JSON.stringify(session));
  notifyListeners();
  return session;
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const getCurrentUser = (): User | null => {
  return cachedUser;
};

export const getAdminSession = (): SimpleAdminSession | null => {
  return simulatedAdminSession;
};

export const isCurrentAdminAuthenticated = (): boolean => {
  if (simulatedAdminSession && isEmailApprovedAdmin(simulatedAdminSession.email)) {
    return true;
  }
  if (cachedUser && isEmailApprovedAdmin(cachedUser.email)) {
    return true;
  }
  return false;
};

export const getCurrentOperatorEmail = (): string | null => {
  if (simulatedAdminSession) return simulatedAdminSession.email;
  if (cachedUser) return cachedUser.email;
  return null;
};

export const googleLogout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error('Signout error:', e);
  }
  cachedAccessToken = null;
  cachedUser = null;
  simulatedAdminSession = null;
  sessionStorage.removeItem('nexus_admin_session');
  notifyListeners();
};
