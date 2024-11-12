import { put } from "@/fetch/fetch";
import { UrlType } from "@/types/type";
import { endPoints } from "@/utils/endpoint";
import { BACKEND_URL } from "@/utils/urls";

export const handleSingleUpload = async (value: File) => {
  try {
    const formData = new FormData();
    formData.append("files", value);
    const data = await fetch(`${BACKEND_URL}${endPoints.upload}`, {
      method: "POST",
      body: formData,
    });
    const uploadedUrls = await data.json();
    return { url: uploadedUrls.urls[0] };
  } catch (err) {
    console.log("err", err);
  }
};

export const handleUpdateUrls = async (type: string, urlData: UrlType) => {
  try {
    const { path, url, caseId } = urlData;
    const data = await put("urls", { type: type, path, url, caseId });
    return data ? data : false;
  } catch (err) {
    return false;
  }
};

export async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  return new File([await response.blob()], filename);
}
