interface Config {
    apiUrl: any;
    api: {
      baseUrl: string;
      timeout: number;
    };
    app: {
      name: string;
      version: string;
      environment: string;
      url: string;
    };
    auth: {
      tokenKey: string;
      refreshTokenKey: string;
      tokenExpiry: number;
    };
    database: {
      url: string;
    };
    email: {
      service: string;
      from: string;
    };
    upload: {
      maxSize: number;
      allowedTypes: string[];
    };
  }
  
  // Validate required environment variables
  const requiredEnvVars = {
    NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API,
  };
  
  // Check for missing environment variables
  const missingEnvVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
  
  // Instead of throwing an error, provide default values
  if (missingEnvVars.length > 0) {
    console.warn(
      `Missing environment variables: ${missingEnvVars.join(
        ", "
      )}. Using default values.`
    );
  }
  
  export const config: Config = {
    apiUrl: process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5000/api",
    api: {
      baseUrl: process.env.NEXT_PUBLIC_BASE_API || "https://api.darulquranfoundation.org/api/v1",
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
    },
    app: {
      name: process.env.NEXT_PUBLIC_APP_NAME || "ResearchUstad",
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      url: process.env.NEXT_PUBLIC_APP_URL || "https://api.darulquranfoundation.org",
    },
    auth: {
      tokenKey: "accessToken",
      refreshTokenKey: "refreshToken",
      tokenExpiry: parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRY || "3600"),
      // Optional public token for server-protected read-only GET endpoints
      // Set NEXT_PUBLIC_PUBLIC_TOKEN in env for production
      // Example: 'Bearer eyJhbGciOi...'
      //publicToken: process.env.NEXT_PUBLIC_PUBLIC_TOKEN || "",
    },
    database: {
      url: process.env.DATABASE_URL || "",
    },
    email: {
      service: process.env.EMAIL_SERVICE || "gmail",
      from: process.env.EMAIL_FROM || "noreply@researchustad.com",
    },
    upload: {
      maxSize: parseInt(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE || "5242880"), // 5MB
      allowedTypes: (
        process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || "jpg,jpeg,png,pdf,doc,docx"
      ).split(","),
    },
  };
  
  // Export individual config sections for convenience
  export const { api, app, auth, database, email, upload } = config;
  
  // Helper functions
  export const isDevelopment = () => config.app.environment === "development";
  export const isProduction = () => config.app.environment === "production";
  export const isTest = () => config.app.environment === "test";
  
  // API helper functions
  export const getApiUrl = (endpoint: string) =>
    `${config.api.baseUrl}${endpoint}`;
  export const getAuthHeaders = (token: string) => ({
    Authorization: token,
    "Content-Type": "application/json",
  });
  
  // Default export
  export default config;
  