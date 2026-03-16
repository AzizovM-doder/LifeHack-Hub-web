import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle, logOut } from '../firebase';
import { LogIn, LogOut } from 'lucide-react';

export default function Auth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      {user ? (
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <img src={user.photoURL || ''} alt="Profile" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
          <span className="font-medium text-sm hidden sm:block">{user.displayName}</span>
          <button 
            onClick={logOut}
            className="p-2 text-gray-500 hover:text-coral transition-colors rounded-full hover:bg-coral/10"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button 
          onClick={signInWithGoogle}
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all font-bold text-gray-800 border border-gray-100"
        >
          <LogIn className="w-5 h-5 text-mint" /> Sign In
        </button>
      )}
    </div>
  );
}
