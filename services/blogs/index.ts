"use server";

import { BlogPostForm } from "@/components/module/users/CreateBlog/CreateBlog";
import { IPost } from "@/type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";

export const GetAllBlog = async () => {
  try {
    const response = await fetch(`${api.baseUrl}/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
export const GetAllPersonalBlog = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await fetch(`${api.baseUrl}/blog/author`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
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
    const response = await fetch(`${api.baseUrl}/blog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    console.log(response);

    return await response.json();
  } catch (error) {
    console.error("Error single blog get:", error);
    return null;
  }
};

export const BlogPost = async (data: IPost) => {
  console.log(data);
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
  console.log(id);
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
    revalidateTag("blogs");
    return await response.json();
  } catch (error) {
    console.error("Error delete memeber:", error);
    return null;
  }
};
