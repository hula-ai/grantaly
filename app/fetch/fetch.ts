
import { BACKEND_URL } from "@/utils/urls";
import { getToken } from "next-auth/jwt";

export async function post(endpoint: string, body: any) {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(BACKEND_URL + endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function put(endpoint: string, body: any) {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(BACKEND_URL + endpoint, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function get(endpoint: string) {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(BACKEND_URL + endpoint, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function Delete(endpoint: string) {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(BACKEND_URL + endpoint, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
