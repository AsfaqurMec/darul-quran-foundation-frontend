// "use server";

// //import { BlogPostForm } from "@/components/module/users/CreateBlog/CreateBlog";
// import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";
// import { api, app } from "../../config";

// // --------------------------
// // Public read fallbacks
// // --------------------------
// // Public endpoint: GET /api/blogs (no auth required)
// const HARDCODED_BEARER = ""; // not needed for public endpoint


// export const GetAllBlog = async () => {
//   try {
//     const lang = (await cookies()).get('lang')?.value;
    
//     // Server-side requests need Origin/Referer headers
//     const origin = process.env.NEXT_PUBLIC_APP_URL || app.url || 'https://darulquranfoundation.org' || 'http://localhost:3000';
//     const apiUrl = `${api.baseUrl}/blogs`;
    
//     console.log('🔍 GetAllBlog - Fetching from:', apiUrl);
//     console.log('🔍 GetAllBlog - Origin:', origin);
    
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         ...(lang ? { "Accept-Language": lang } : {}),
//         "Origin": origin,
//         "Referer": `${origin}/`,
//       },
//       next: {
//         tags: ["blogs"],
//       },
//     });

//     console.log('🔍 GetAllBlog - Response status:', response.status, response.statusText);

//     if (!response.ok) {
//       // Handle 403 Forbidden (likely origin validation issue)
//       if (response.status === 403) {
//         let errorText = '';
//         let errorMessage = 'Access denied: Origin not allowed';
        
//         try {
//           const clonedRes = response.clone();
//           errorText = await clonedRes.text();
          
//           if (errorText) {
//             try {
//               const errorJson = JSON.parse(errorText);
//               errorMessage = errorJson.message || errorJson.error || errorMessage;
//             } catch {
//               errorMessage = errorText || errorMessage;
//             }
//           }
//         } catch (parseError) {
//           console.warn('Could not parse error response:', parseError);
//         }
        
//         console.error('❌ Origin validation failed (GetAllBlog)');
//         console.error('Status:', response.status);
//         console.error('Error Message:', errorMessage);
//         console.error('Origin:', origin);
//         console.error('API URL:', apiUrl);
        
//         return { success: false, data: [], message: errorMessage };
//       }
      
//       // If endpoint unavailable, serve fallback static data
//       if (response.status === 404) {
//         console.warn('⚠️ GetAllBlog - Endpoint not found (404), returning empty data');
//         return { success: true, data: [] };
//       }
      
//       let errorMessage = `Request failed with status: ${response.status}`;
//       try {
//         const clonedRes = response.clone();
//         const errorText = await clonedRes.text();
//         if (errorText) {
//           try {
//             const errorJson = JSON.parse(errorText);
//             errorMessage = errorJson.message || errorJson.error || errorMessage;
//           } catch {
//             errorMessage = errorText || errorMessage;
//           }
//         }
//       } catch {
//         // Ignore parsing errors
//       }
      
//       console.error('❌ GetAllBlog - Request failed:', errorMessage);
//       throw new Error(errorMessage);
//     }

//     const jsonData = await response.json();
//     console.log('✅ GetAllBlog - Response received:', {
//       hasData: !!jsonData?.data,
//       dataType: Array.isArray(jsonData?.data) ? 'array' : typeof jsonData?.data,
//       dataLength: Array.isArray(jsonData?.data) ? jsonData.data.length : 'N/A',
//       responseKeys: Object.keys(jsonData || {}),
//     });

//     // Validate and normalize response structure
//     // Handle different possible response formats:
//     // 1. { success: true, data: [...] }
//     // 2. { data: [...] }
//     // 3. [...] (direct array)
//     if (Array.isArray(jsonData)) {
//       return { success: true, data: jsonData };
//     }
    
//     if (jsonData && typeof jsonData === 'object') {
//       if (Array.isArray(jsonData.data)) {
//         return { success: jsonData.success !== false, data: jsonData.data, ...jsonData };
//       }
//       // If data exists but is not an array, wrap it
//       if ('data' in jsonData) {
//         return { success: jsonData.success !== false, data: Array.isArray(jsonData.data) ? jsonData.data : [], ...jsonData };
//       }
//     }

//     // If response structure is unexpected, log it and return empty
//     console.warn('⚠️ GetAllBlog - Unexpected response structure:', jsonData);
//     return { success: true, data: [] };
//   } catch (error) {
//     console.error("❌ GetAllBlog - Error:", error);
//     if (error instanceof Error) {
//       console.error("❌ GetAllBlog - Error message:", error.message);
//       console.error("❌ GetAllBlog - Error stack:", error.stack);
//     }
//     return { success: false, data: [], message: error instanceof Error ? error.message : 'Unknown error' };
//   }
// };
// export const GetAllPersonalBlog = async () => {
//   try {
//     const lang = (await cookies()).get('lang')?.value;
    
//     // Server-side requests need Origin/Referer headers
//     const origin = process.env.NEXT_PUBLIC_APP_URL || app.url || 'http://localhost:3000';
    
//     const response = await fetch(`${api.baseUrl}/blog/author`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         ...(lang ? { "Accept-Language": lang } : {}),
//         "Origin": origin,
//         "Referer": `${origin}/`,
//         // Authorization: token || "",
//       },
//       next: {
//         tags: ["blogs"],
//       },
//     });

//     if (!response.ok) {
//       // Handle 403 Forbidden (likely origin validation issue)
//       if (response.status === 403) {
//         let errorText = '';
//         let errorMessage = 'Access denied: Origin not allowed';
        
//         try {
//           const clonedRes = response.clone();
//           errorText = await clonedRes.text();
          
//           if (errorText) {
//             try {
//               const errorJson = JSON.parse(errorText);
//               errorMessage = errorJson.message || errorJson.error || errorMessage;
//             } catch {
//               errorMessage = errorText || errorMessage;
//             }
//           }
//         } catch (parseError) {
//           console.warn('Could not parse error response:', parseError);
//         }
        
//         console.error('❌ Origin validation failed (GetAllPersonalBlog)');
//         console.error('Status:', response.status);
//         console.error('Error Message:', errorMessage);
//         console.error('Origin:', origin);
//         console.error('API URL:', `${api.baseUrl}/blog/author`);
        
//         return { success: false, data: null, message: errorMessage };
//       }
      
//       let errorMessage = `Request failed with status: ${response.status}`;
//       try {
//         const clonedRes = response.clone();
//         const errorText = await clonedRes.text();
//         if (errorText) {
//           try {
//             const errorJson = JSON.parse(errorText);
//             errorMessage = errorJson.message || errorJson.error || errorMessage;
//           } catch {
//             errorMessage = errorText || errorMessage;
//           }
//         }
//       } catch {
//         // Ignore parsing errors
//       }
      
//       throw new Error(errorMessage);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fblog get:", error);
//     return null;
//   }
// };

// export const SingleBlog = async (id: string) => {
//   try {
//     const lang = (await cookies()).get('lang')?.value;
    
//     // Server-side requests need Origin/Referer headers
//     const origin = process.env.NEXT_PUBLIC_APP_URL || app.url || 'http://localhost:3000';
//     const commonHeaders = {
//       "Content-Type": "application/json",
//       ...(lang ? { "Accept-Language": lang } : {}),
//       "Origin": origin,
//       "Referer": `${origin}/`,
//     };
    
//     // Try detail endpoint first (if implemented)
//     let response = await fetch(`${api.baseUrl}/blogs/${id}`, {
//       method: "GET",
//       headers: commonHeaders,
//     });

//     if (!response.ok && response.status !== 404) {
//       // Handle 403 Forbidden (likely origin validation issue)
//       if (response.status === 403) {
//         let errorText = '';
//         let errorMessage = 'Access denied: Origin not allowed';
        
//         try {
//           const clonedRes = response.clone();
//           errorText = await clonedRes.text();
          
//           if (errorText) {
//             try {
//               const errorJson = JSON.parse(errorText);
//               errorMessage = errorJson.message || errorJson.error || errorMessage;
//             } catch {
//               errorMessage = errorText || errorMessage;
//             }
//           }
//         } catch (parseError) {
//           console.warn('Could not parse error response:', parseError);
//         }
        
//         console.error('❌ Origin validation failed (SingleBlog)');
//         console.error('Status:', response.status);
//         console.error('Error Message:', errorMessage);
//         console.error('Origin:', origin);
//         console.error('API URL:', `${api.baseUrl}/blogs/${id}`);
        
//         return { success: false, message: errorMessage };
//       }
      
//       let errorMessage = `Request failed with status: ${response.status}`;
//       try {
//         const clonedRes = response.clone();
//         const errorText = await clonedRes.text();
//         if (errorText) {
//           try {
//             const errorJson = JSON.parse(errorText);
//             errorMessage = errorJson.message || errorJson.error || errorMessage;
//           } catch {
//             errorMessage = errorText || errorMessage;
//           }
//         }
//       } catch {
//         // Ignore parsing errors
//       }
      
//       throw new Error(errorMessage);
//     }

//     if (response.ok) {
//       return await response.json();
//     }

//     // If /api/blogs/:id not available, fetch list and find
//     const listRes = await fetch(`${api.baseUrl}/blogs`, {
//       method: "GET",
//       headers: commonHeaders,
//     });
//     if (listRes.ok) {
//       const json = await listRes.json();
//       const item = Array.isArray(json?.data) ? json.data.find((b: any) => String(b.id) === String(id)) : null;
//       if (item) return { success: true, data: item };
//     }

//     // const fallback = [].find((b) => String(b.id) === String(id));
//     // if (fallback) return { success: true, data: fallback };
//     return { success: false, message: "Blog not found" };
//   } catch (error) {
//     console.error("Error single blog get:", error);
//     // const item = [].find((b) => String(b.id) === String(id));
//     // if (item) return { success: true, data: item };
//     return { success: false, message: "Blog not found in fallback data" };
//   }
// };

// type IPost = {
//   title: string;
//   excerpt: string;
//   date?: string;
//   readTime?: string;
//   fullContent?: string;
//   category?: string;
//   thumbnail?: string | File | null;
//   images?: Array<string | File> | null;
//   [key: string]: unknown;
// };

// export const BlogPost = async (data: IPost) => {
//  // console.log(data);
//   try {
//     const token = (await cookies()).get("accessToken")?.value;

//     if (!token) {
//       throw new Error("Access token not found");
//     }
//     const response = await fetch(`${api.baseUrl}/blog`, {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     // if (!response.ok) {
//     //   throw new Error(`Request failed with status: ${response.status}`);
//     // }

//     return await response.json();
//   } catch (error) {
//     console.error("Error blog post:", error);
//     return null;
//   }
// };

// export const DeleteBlog = async (id: string) => {
//  // console.log(id);
//   try {
//     const cookieStore = await cookies();
//     let token = cookieStore.get("accessToken")!.value;
//     const response = await fetch(`${api.baseUrl}/blog/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });
//     // @ts-expect-error - revalidateTag signature may vary by Next.js version
//     revalidateTag("blogs");
//     return await response.json();
//   } catch (error) {
//     console.error("Error delete memeber:", error);
//     return null;
//   }
// };

// type UpdatableBlog = {
//   title?: string;
//   excerpt?: string;
//   date?: string;
//   readTime?: string;
//   fullContent?: string;
//   category?: string;
//   // Media fields
//   thumbnail?: string | File | null;
//   images?: Array<string | File> | null;
//   // Allow any additional fields the backend might accept
//   [key: string]: unknown;
// };

// export const UpdateBlog = async (id: string, data: UpdatableBlog) => {
//   try {
//     const token = (await cookies()).get("accessToken")?.value;
//     if (!token) {
//       throw new Error("Access token not found");
//     }

//     const { thumbnail, images, ...rest } = data ?? {};

//     const isFile = (v: unknown): v is File => typeof File !== "undefined" && v instanceof File;

//     const thumbnailIsFile = isFile(thumbnail);
//     const thumbnailIsString = typeof thumbnail === "string";
//     const thumbnailIsEmpty = thumbnail === "" || thumbnail === null || typeof thumbnail === "undefined";

//     const imagesArray = Array.isArray(images) ? images : [];
//     const existingImages: string[] = imagesArray.filter((i): i is string => typeof i === "string" && i !== "");
//     const newImageFiles: File[] = imagesArray.filter((i): i is File => isFile(i));

//     const mustUseFormData = thumbnailIsFile || newImageFiles.length > 0;

//     if (!mustUseFormData) {
//       // JSON branch: omit unchanged/empty thumbnail; send images as existing strings
//       const jsonPayload: Record<string, unknown> = {
//         ...rest,
//       };

//       if (!thumbnailIsEmpty && !thumbnailIsString) {
//         // not possible here because mustUseFormData would be true, but keep guard
//       }

//       if (!thumbnailIsEmpty && thumbnailIsString) {
//         // If you want to keep existing thumbnail as-is, don't send it.
//         // So do nothing (omit thumbnail).
//       }

//       if (existingImages.length >= 0) {
//         // Send the full list of images that should remain after edit
//         jsonPayload.images = existingImages;
//         // Also mirror to existingImages for backends expecting this key in both modes
//         jsonPayload.existingImages = existingImages;
//       }

//       // Debug: show JSON payload being sent
//       try {
//         // eslint-disable-next-line no-console
//     //    console.log("UpdateBlog JSON payload:", jsonPayload);
//       } catch {}

//       const response = await fetch(`${api.baseUrl}/blog/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify(jsonPayload),
//         next: { tags: ["blogs"] },
//       });

//       return await response.json();
//     }

//     // FormData branch: send new files and pass existing images separately
//     const formData = new FormData();

//     // Append scalar/text fields
//     Object.entries(rest).forEach(([key, value]) => {
//       if (value === undefined || value === null) return;
//       formData.append(key, String(value));
//     });

//     // Thumbnail: only append if a new File is provided
//     if (thumbnailIsFile) {
//       formData.append("thumbnail", thumbnail);
//     }

//     // Existing images that should be kept after update
//     formData.append("existingImages", JSON.stringify(existingImages));

//     // New image files
//     newImageFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     // Debug: show FormData payload keys/values (without dumping raw buffers)
//     try {
//       const debugEntries: Array<{ key: string; value: unknown }> = [];
//       const anyForm = formData as unknown as {
//         forEach?: (cb: (value: unknown, key: string) => void) => void;
//         entries?: () => IterableIterator<[string, unknown]>;
//       };
//       if (typeof anyForm.forEach === "function") {
//         anyForm.forEach((v, k) => {
//           if (v && typeof File !== "undefined" && v instanceof File) {
//             debugEntries.push({ key: k, value: { name: v.name, size: v.size, type: v.type } });
//           } else {
//             debugEntries.push({ key: k, value: v });
//           }
//         });
//       } else if (typeof anyForm.entries === "function") {
//         for (const [k, v] of anyForm.entries()!) {
//           if (v && typeof File !== "undefined" && v instanceof File) {
//             debugEntries.push({ key: k, value: { name: v.name, size: v.size, type: v.type } });
//           } else {
//             debugEntries.push({ key: k, value: v });
//           }
//         }
//       }
//       // eslint-disable-next-line no-console
//    //   console.log("UpdateBlog FormData payload:", debugEntries);
//     } catch {}

//     const response = await fetch(`${api.baseUrl}/blog/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: token,
//         // Do NOT set Content-Type; let the runtime set multipart boundary
//       },
//       body: formData,
//       next: { tags: ["blogs"] },
//     });

//     return await response.json();
//   } catch (error) {
//     console.error("Error blog update:", error);
//     return null;
//   }
// };

"use server";

//import { BlogPostForm } from "@/components/module/users/CreateBlog/CreateBlog";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "../../config";

// --------------------------
// Public read fallbacks
// --------------------------
// Public endpoint: GET /api/blogs (no auth required)
const HARDCODED_BEARER = ""; // not needed for public endpoint


export const GetAllBlog = async () => {
  try {
    const lang = (await cookies()).get('lang')?.value;
    const response = await fetch(`${api.baseUrl}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(lang ? { "Accept-Language": lang } : {}),
      },
      next: {
        tags: ["blogs"],
      },
    });

    if (!response.ok) {
      // If endpoint unavailable, serve fallback static data
      if (response.status === 404) {
        return { success: true, data: [] };
      }
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fblog get:", error);
    return { success: true, data: [] };
  }
};
export const GetAllPersonalBlog = async () => {
  try {
    const lang = (await cookies()).get('lang')?.value;
    const response = await fetch(`${api.baseUrl}/blog/author`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(lang ? { "Accept-Language": lang } : {}),
        // Authorization: token || "",
      },
      next: {
        tags: ["blogs"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fblog get:", error);
    return null;
  }
};

export const SingleBlog = async (id: string) => {
  try {
    const lang = (await cookies()).get('lang')?.value;
    // Try detail endpoint first (if implemented)
    let response = await fetch(`${api.baseUrl}/blogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(lang ? { "Accept-Language": lang } : {}),
      },
    });

    if (!response.ok && response.status !== 404) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    if (response.ok) {
      return await response.json();
    }

    // If /api/blogs/:id not available, fetch list and find
    const listRes = await fetch(`${api.baseUrl}/blogs`, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...(lang ? { "Accept-Language": lang } : {}) },
    });
    if (listRes.ok) {
      const json = await listRes.json();
      const item = Array.isArray(json?.data) ? json.data.find((b: any) => String(b.id) === String(id)) : null;
      if (item) return { success: true, data: item };
    }

    // const fallback = [].find((b) => String(b.id) === String(id));
    // if (fallback) return { success: true, data: fallback };
    return { success: false, message: "Blog not found" };
  } catch (error) {
    console.error("Error single blog get:", error);
    // const item = [].find((b) => String(b.id) === String(id));
    // if (item) return { success: true, data: item };
    return { success: false, message: "Blog not found in fallback data" };
  }
};

type IPost = {
  title: string;
  excerpt: string;
  date?: string;
  readTime?: string;
  fullContent?: string;
  category?: string;
  thumbnail?: string | File | null;
  images?: Array<string | File> | null;
  [key: string]: unknown;
};

export const BlogPost = async (data: IPost) => {
 // console.log(data);
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await fetch(`${api.baseUrl}/blog`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // if (!response.ok) {
    //   throw new Error(`Request failed with status: ${response.status}`);
    // }

    return await response.json();
  } catch (error) {
    console.error("Error blog post:", error);
    return null;
  }
};

export const DeleteBlog = async (id: string) => {
 // console.log(id);
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    revalidateTag("blogs", "tags");
    return await response.json();
  } catch (error) {
    console.error("Error delete memeber:", error);
    return null;
  }
};

type UpdatableBlog = {
  title?: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  fullContent?: string;
  category?: string;
  // Media fields
  thumbnail?: string | File | null;
  images?: Array<string | File> | null;
  // Allow any additional fields the backend might accept
  [key: string]: unknown;
};

export const UpdateBlog = async (id: string, data: UpdatableBlog) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Access token not found");
    }

    const { thumbnail, images, ...rest } = data ?? {};

    const isFile = (v: unknown): v is File => typeof File !== "undefined" && v instanceof File;

    const thumbnailIsFile = isFile(thumbnail);
    const thumbnailIsString = typeof thumbnail === "string";
    const thumbnailIsEmpty = thumbnail === "" || thumbnail === null || typeof thumbnail === "undefined";

    const imagesArray = Array.isArray(images) ? images : [];
    const existingImages: string[] = imagesArray.filter((i): i is string => typeof i === "string" && i !== "");
    const newImageFiles: File[] = imagesArray.filter((i): i is File => isFile(i));

    const mustUseFormData = thumbnailIsFile || newImageFiles.length > 0;

    if (!mustUseFormData) {
      // JSON branch: omit unchanged/empty thumbnail; send images as existing strings
      const jsonPayload: Record<string, unknown> = {
        ...rest,
      };

      if (!thumbnailIsEmpty && !thumbnailIsString) {
        // not possible here because mustUseFormData would be true, but keep guard
      }

      if (!thumbnailIsEmpty && thumbnailIsString) {
        // If you want to keep existing thumbnail as-is, don't send it.
        // So do nothing (omit thumbnail).
      }

      if (existingImages.length >= 0) {
        // Send the full list of images that should remain after edit
        jsonPayload.images = existingImages;
        // Also mirror to existingImages for backends expecting this key in both modes
        jsonPayload.existingImages = existingImages;
      }

      // Debug: show JSON payload being sent
      try {
        // eslint-disable-next-line no-console
    //    console.log("UpdateBlog JSON payload:", jsonPayload);
      } catch {}

      const response = await fetch(`${api.baseUrl}/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(jsonPayload),
        next: { tags: ["blogs"] },
      });

      return await response.json();
    }

    // FormData branch: send new files and pass existing images separately
    const formData = new FormData();

    // Append scalar/text fields
    Object.entries(rest).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      formData.append(key, String(value));
    });

    // Thumbnail: only append if a new File is provided
    if (thumbnailIsFile) {
      formData.append("thumbnail", thumbnail);
    }

    // Existing images that should be kept after update
    formData.append("existingImages", JSON.stringify(existingImages));

    // New image files
    newImageFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Debug: show FormData payload keys/values (without dumping raw buffers)
    try {
      const debugEntries: Array<{ key: string; value: unknown }> = [];
      const anyForm = formData as unknown as {
        forEach?: (cb: (value: unknown, key: string) => void) => void;
        entries?: () => IterableIterator<[string, unknown]>;
      };
      if (typeof anyForm.forEach === "function") {
        anyForm.forEach((v, k) => {
          if (v && typeof File !== "undefined" && v instanceof File) {
            debugEntries.push({ key: k, value: { name: v.name, size: v.size, type: v.type } });
          } else {
            debugEntries.push({ key: k, value: v });
          }
        });
      } else if (typeof anyForm.entries === "function") {
        for (const [k, v] of anyForm.entries()!) {
          if (v && typeof File !== "undefined" && v instanceof File) {
            debugEntries.push({ key: k, value: { name: v.name, size: v.size, type: v.type } });
          } else {
            debugEntries.push({ key: k, value: v });
          }
        }
      }
      // eslint-disable-next-line no-console
   //   console.log("UpdateBlog FormData payload:", debugEntries);
    } catch {}

    const response = await fetch(`${api.baseUrl}/blog/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        // Do NOT set Content-Type; let the runtime set multipart boundary
      },
      body: formData,
      next: { tags: ["blogs"] },
    });

    return await response.json();
  } catch (error) {
    console.error("Error blog update:", error);
    return null;
  }
};