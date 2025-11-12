// import { getClientToken } from "@/lib/tokenUtils";
// import { api } from "@/config";

// export const GetAllPersonalInfo = async () => {
//   try {
//     const token = getClientToken();
//     if (!token) {
//       return { success: false, message: "No access token found" };
//     }

//     const response = await fetch(`${api.baseUrl}/users/personalinfo`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Request failed with status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching personal info:", error);
//     return { success: false, message: "Failed to fetch personal info" };
//   }
// };

// export const GetAllInfoAdmin = async () => {
//   try {
//     const token = getClientToken();
//     if (!token) {
//       return { success: false, message: "No access token found" };
//     }

//     const response = await fetch(`${api.baseUrl}/users/userinfo`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Request failed with status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching admin info:", error);
//     return { success: false, message: "Failed to fetch admin info" };
//   }
// };
