import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section - Login Form (2/3 width) */}
        <div className="w-full lg:w-2/3 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <LoginForm />
        </div>

        {/* Right Section - Illustration (1/3 width) */}
        <div className="w-full lg:w-1/3 bg-amber-50 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>

          {/* Illustration Content */}
          <div className="relative h-full flex items-center justify-center p-8">
            <svg
              viewBox="0 0 400 500"
              className="w-full h-full max-w-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ground */}
              <rect x="0" y="380" width="400" height="120" fill="#D4A574" />
              <rect x="0" y="380" width="400" height="80" fill="#C8966A" />

              {/* Small plants on ground */}
              <circle cx="80" cy="400" r="8" fill="#4CAF50" />
              <circle cx="120" cy="395" r="6" fill="#66BB6A" />
              <circle cx="280" cy="405" r="7" fill="#4CAF50" />
              <circle cx="320" cy="400" r="6" fill="#66BB6A" />

              {/* Fence */}
              <rect x="50" y="360" width="300" height="25" fill="#81C7D4" opacity="0.7" />
              <rect x="50" y="365" width="300" height="2" fill="#5BA3B5" />

              {/* Palm Tree */}
              <rect x="120" y="320" width="15" height="60" fill="#8B4513" />
              <circle cx="127" cy="310" r="25" fill="#2E7D32" />
              <circle cx="135" cy="305" r="20" fill="#2E7D32" />
              <circle cx="118" cy="305" r="18" fill="#2E7D32" />
              <circle cx="130" cy="295" r="15" fill="#388E3C" />

              {/* Mosque */}
              <rect x="240" y="280" width="100" height="80" fill="#81C7D4" />
              <rect x="265" y="300" width="50" height="60" fill="#5BA3B5" />
              <path
                d="M 290 240 Q 290 200 310 200 Q 330 200 330 240 L 330 280 L 290 280 Z"
                fill="#81C7D4"
              />
              <rect x="280" y="200" width="20" height="40" fill="#FFD700" />
              <rect x="305" y="200" width="3" height="50" fill="#5BA3B5" />
              <circle cx="350" cy="260" r="5" fill="#FFD700" />

              {/* Person 1 (Left - Yellow shirt) */}
              <circle cx="160" cy="340" r="12" fill="#FFD700" />
              <rect x="148" y="352" width="24" height="30" fill="#FFD700" />
              <rect x="148" y="382" width="24" height="20" fill="#2196F3" />

              {/* Person 2 (Right - Red robe, white cap) */}
              <circle cx="220" cy="340" r="12" fill="#FFD700" />
              <circle cx="220" cy="330" r="10" fill="#FFFFFF" />
              <rect x="208" y="352" width="24" height="30" fill="#E53935" />

              {/* Box being handed */}
              <rect x="190" y="365" width="15" height="12" fill="#8B4513" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}


