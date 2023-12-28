import { avecURL } from "@/constants/const";
import useSWR from "swr";

export function GetForbidList(keyword: string) {
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error("error");
      }
      return response.text(); // HTML 마크업을 가져오도록 수정
    });

  const { data, error } = useSWR(avecURL + keyword, fetcher);
  return data;
}
