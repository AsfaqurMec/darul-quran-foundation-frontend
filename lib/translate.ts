// import { Lang } from '@/components/i18n/LanguageProvider';

// // Cache to avoid translating the same text multiple times
// const translationCache = new Map<string, string>();

// // Map our language codes to Google Translate language codes
// const langMap: Record<Lang, string> = {
//   en: 'en',
//   bn: 'bn',
//   ar: 'ar',
// };

// type ProxyConfig = {
//   name: string;
//   buildUrl: (targetUrl: string) => string;
// };

// // Try multiple CORS proxies in case one fails (each proxy has different URL requirements)
// const PROXIES: ProxyConfig[] = [
//   {
//     name: 'allorigins',
//     buildUrl: (target) => `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`,
//   },
//   {
//     name: 'corsproxy',
//     buildUrl: (target) => `https://corsproxy.io/?${target}`,
//   },
//   {
//     name: 'codetabs',
//     buildUrl: (target) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(target)}`,
//   },
// ];

// let currentProxyIndex = 0;

// /**
//  * Translates text to the target language using Google Translate (client-side only)
//  * Uses a CORS proxy to bypass browser restrictions
//  * @param text - The text to translate
//  * @param targetLang - Target language code
//  * @param sourceLang - Source language code (auto-detect if not provided)
//  * @returns Translated text
//  */
// export async function translateText(
//   text: string,
//   targetLang: Lang,
//   sourceLang?: Lang
// ): Promise<string> {
//   // If target language is the same as source, return original text
//   if (sourceLang && sourceLang === targetLang) {
//     return text;
//   }

//   // Check cache first
//   const cacheKey = `${text}|${sourceLang || 'auto'}|${targetLang}`;
//   if (translationCache.has(cacheKey)) {
//     return translationCache.get(cacheKey)!;
//   }

//   try {
//     // If text is empty, return as is
//     if (!text || text.trim().length === 0) {
//       return text;
//     }

//     // Encode text for URL
//     const encodedText = encodeURIComponent(text);
//     const targetLangCode = langMap[targetLang];
//     const sourceLangCode = sourceLang ? langMap[sourceLang] : 'auto';

//     // Use Google Translate web interface
//     const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLangCode}&tl=${targetLangCode}&dt=t&q=${encodedText}`;
    
//     // Try each proxy until one works
//     let lastError: Error | null = null;
//     for (let i = 0; i < PROXIES.length; i++) {
//       try {
//         const proxyIndex = (currentProxyIndex + i) % PROXIES.length;
//         const proxy = PROXIES[proxyIndex];
//         const proxiedUrl = proxy.buildUrl(translateUrl);

//         const response = await fetch(proxiedUrl, {
//           method: 'GET',
//           headers: {
//             'Accept': 'application/json',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`Translation failed: ${response.status}`);
//         }

//         let data;
//         try {
//           const text = await response.text();
//           data = JSON.parse(text);
//         } catch (parseError) {
//           // If JSON parsing fails, try to extract from text response
//           console.warn('Failed to parse JSON, trying text extraction');
//           throw new Error('Invalid response format');
//         }
        
//         // Extract translated text from Google Translate response
//         // Response format: [[["translated text", "original text", null, null, 0]], ...]
//         let translatedText = text;
//         if (Array.isArray(data)) {
//           if (data[0] && Array.isArray(data[0])) {
//             const translations = data[0]
//               .filter((item: any) => Array.isArray(item) && item[0] && typeof item[0] === 'string')
//               .map((item: any) => item[0]);
//             if (translations.length > 0) {
//               translatedText = translations.join(' ') || text;
//             }
//           } else if (data[0] && typeof data[0] === 'string') {
//             // Sometimes the response is simpler
//             translatedText = data[0];
//           }
//         }
        
//         // Verify we got a translation (not just the original)
//         if (translatedText === text && text.length > 10) {
//           console.warn('Translation returned same text, might be an error');
//         }
        
//         // Cache the result
//         translationCache.set(cacheKey, translatedText);
        
//         // Update proxy index for next time (round-robin)
//         currentProxyIndex = (proxyIndex + 1) % CORS_PROXIES.length;
        
//         return translatedText;
//       } catch (error: any) {
//         lastError = error;
//         console.warn(`Proxy "${PROXIES[(currentProxyIndex + i) % PROXIES.length].name}" failed, trying next...`, error?.message || error);
//         // Continue to next proxy
//       }
//     }
    
//     // Final attempt without proxy (may fail due to CORS but worth trying for native apps)
//     try {
//       console.warn('All proxies failed, attempting direct fetch...');
//       const response = await fetch(translateUrl, { method: 'GET' });
//       if (response.ok) {
//         const data = await response.json();
//         let translatedText = text;
//         if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
//           const translations = data[0]
//             .filter((item: any) => Array.isArray(item) && item[0])
//             .map((item: any) => item[0]);
//           if (translations.length > 0) {
//             translatedText = translations.join(' ') || text;
//           }
//         }
//         translationCache.set(cacheKey, translatedText);
//         return translatedText;
//       }
//     } catch (directError) {
//       lastError = directError as Error;
//     }

//     // If all proxies and direct fetch failed, throw the last error
//     throw lastError || new Error('All translation routes failed');
//   } catch (error) {
//     console.error('Translation error:', error);
//     // Return original text on error
//     return text;
//   }
// }

// /**
//  * Detects the language of the given text
//  * @param text - The text to detect language for
//  * @returns Detected language code
//  */
// export async function detectLanguage(text: string): Promise<Lang | null> {
//   try {
//     if (!text || text.trim().length === 0) {
//       return null;
//     }

//     const encodedText = encodeURIComponent(text);
//     const detectUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodedText}`;

//     for (const proxy of PROXIES) {
//       try {
//         const response = await fetch(proxy.buildUrl(detectUrl));
//         if (!response.ok) {
//           continue;
//         }
//         const data = await response.json();

//         if (Array.isArray(data) && data[2]) {
//           const detectedLang = data[2].toLowerCase();
//           if (detectedLang === 'bn' || detectedLang === 'ben') return 'bn';
//           if (detectedLang === 'ar' || detectedLang === 'ara') return 'ar';
//           if (detectedLang === 'en' || detectedLang === 'eng') return 'en';
//         }
//       } catch (proxyError) {
//         console.warn(`Language detection proxy "${proxy.name}" failed`, proxyError);
//       }
//     }

//     // Extract detected language from response
//     // Response includes language detection info
//     return null;
//   } catch (error) {
//     console.error('Language detection error:', error);
//     return null;
//   }
// }

// /**
//  * Clears the translation cache
//  */
// export function clearTranslationCache(): void {
//   translationCache.clear();
// }

// /**
//  * Clears cache for a specific language
//  */
// export function clearCacheForLanguage(targetLang: Lang): void {
//   const keysToDelete: string[] = [];
//   translationCache.forEach((value, key) => {
//     if (key.endsWith(`|${targetLang}`) || key.endsWith(`|auto|${targetLang}`)) {
//       keysToDelete.push(key);
//     }
//   });
//   keysToDelete.forEach(key => translationCache.delete(key));
// }

import { Lang } from '@/components/i18n/LanguageProvider';

// Cache to avoid translating the same text multiple times
const translationCache = new Map<string, string>();

// Map our language codes to Google Translate language codes
const langMap: Record<Lang, string> = {
  en: 'en',
  bn: 'bn',
  ar: 'ar',
};

type ProxyConfig = {
  name: string;
  buildUrl: (targetUrl: string) => string;
};

// Try multiple CORS proxies in case one fails (each proxy has different URL requirements)
const PROXIES: ProxyConfig[] = [
  {
    name: 'allorigins',
    buildUrl: (target) => `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`,
  },
  {
    name: 'corsproxy',
    buildUrl: (target) => `https://corsproxy.io/?${target}`,
  },
  {
    name: 'codetabs',
    buildUrl: (target) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(target)}`,
  },
];

let currentProxyIndex = 0;

/**
 * Translates text to the target language using Google Translate (client-side only)
 * Uses a CORS proxy to bypass browser restrictions
 * @param text - The text to translate
 * @param targetLang - Target language code
 * @param sourceLang - Source language code (auto-detect if not provided)
 * @returns Translated text
 */
export async function translateText(
  text: string,
  targetLang: Lang,
  sourceLang?: Lang
): Promise<string> {
  // If target language is the same as source, return original text
  if (sourceLang && sourceLang === targetLang) {
    return text;
  }

  // Check cache first
  const cacheKey = `${text}|${sourceLang || 'auto'}|${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    // If text is empty, return as is
    if (!text || text.trim().length === 0) {
      return text;
    }

    // Encode text for URL
    const encodedText = encodeURIComponent(text);
    const targetLangCode = langMap[targetLang];
    const sourceLangCode = sourceLang ? langMap[sourceLang] : 'auto';

    // Use Google Translate web interface
    const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLangCode}&tl=${targetLangCode}&dt=t&q=${encodedText}`;
    
    // Try each proxy until one works
    let lastError: Error | null = null;
    for (let i = 0; i < PROXIES.length; i++) {
      try {
        const proxyIndex = (currentProxyIndex + i) % PROXIES.length;
        const proxy = PROXIES[proxyIndex];
        const proxiedUrl = proxy.buildUrl(translateUrl);

        const response = await fetch(proxiedUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Translation failed: ${response.status}`);
        }

        let data;
        try {
          const responseBody = await response.text();
          data = JSON.parse(responseBody);
        } catch (parseError) {
          // If JSON parsing fails, try to extract from text response
          console.warn('Failed to parse JSON, trying text extraction');
          throw new Error('Invalid response format');
        }
        
        // Extract translated text from Google Translate response
        // Response format: [[["translated text", "original text", null, null, 0]], ...]
        let translatedText = text;
        if (Array.isArray(data)) {
          if (data[0] && Array.isArray(data[0])) {
            const translations = data[0]
              .filter((item: any) => Array.isArray(item) && item[0] && typeof item[0] === 'string')
              .map((item: any) => item[0]);
            if (translations.length > 0) {
              translatedText = translations.join(' ') || text;
            }
          } else if (data[0] && typeof data[0] === 'string') {
            // Sometimes the response is simpler
            translatedText = data[0];
          }
        }
        
        // Verify we got a translation (not just the original)
        if (translatedText === text && text.length > 10) {
          console.warn('Translation returned same text, might be an error');
        }
        
        // Cache the result
        translationCache.set(cacheKey, translatedText);
        
        // Update proxy index for next time (round-robin)
        currentProxyIndex = (proxyIndex + 1) % PROXIES.length;
        
        return translatedText;
      } catch (error: any) {
        lastError = error;
        console.warn(`Proxy "${PROXIES[(currentProxyIndex + i) % PROXIES.length].name}" failed, trying next...`, error?.message || error);
        // Continue to next proxy
      }
    }
    
    // Final attempt without proxy (may fail due to CORS but worth trying for native apps)
    try {
      console.warn('All proxies failed, attempting direct fetch...');
      const response = await fetch(translateUrl, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        let translatedText = text;
        if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
          const translations = data[0]
            .filter((item: any) => Array.isArray(item) && item[0])
            .map((item: any) => item[0]);
          if (translations.length > 0) {
            translatedText = translations.join(' ') || text;
          }
        }
        translationCache.set(cacheKey, translatedText);
        return translatedText;
      }
    } catch (directError) {
      lastError = directError as Error;
    }

    // If all proxies and direct fetch failed, throw the last error
    throw lastError || new Error('All translation routes failed');
  } catch (error) {
    console.error('Translation error:', error);
    // Return original text on error
    return text;
  }
}

/**
 * Detects the language of the given text
 * @param text - The text to detect language for
 * @returns Detected language code
 */
export async function detectLanguage(text: string): Promise<Lang | null> {
  try {
    if (!text || text.trim().length === 0) {
      return null;
    }

    const encodedText = encodeURIComponent(text);
    const detectUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodedText}`;

    for (const proxy of PROXIES) {
      try {
        const response = await fetch(proxy.buildUrl(detectUrl));
        if (!response.ok) {
          continue;
        }
        const data = await response.json();

        if (Array.isArray(data) && data[2]) {
          const detectedLang = data[2].toLowerCase();
          if (detectedLang === 'bn' || detectedLang === 'ben') return 'bn';
          if (detectedLang === 'ar' || detectedLang === 'ara') return 'ar';
          if (detectedLang === 'en' || detectedLang === 'eng') return 'en';
        }
      } catch (proxyError) {
        console.warn(`Language detection proxy "${proxy.name}" failed`, proxyError);
      }
    }

    // Extract detected language from response
    // Response includes language detection info
    return null;
  } catch (error) {
    console.error('Language detection error:', error);
    return null;
  }
}

/**
 * Clears the translation cache
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}

/**
 * Clears cache for a specific language
 */
export function clearCacheForLanguage(targetLang: Lang): void {
  const keysToDelete: string[] = [];
  translationCache.forEach((value, key) => {
    if (key.endsWith(`|${targetLang}`) || key.endsWith(`|auto|${targetLang}`)) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => translationCache.delete(key));
}

