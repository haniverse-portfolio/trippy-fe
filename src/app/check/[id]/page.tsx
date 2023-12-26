"use client";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

export default function Check() {
  const router = useRouter();
  const pathName = usePathname();
  const id = pathName.split("/")[2];

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      return response.text(); // HTML 마크업을 가져오도록 수정
    });

  const avecURL =
    "https://port-0-trippy-be-cn1vmr2clp9p0y3x.sel5.cloudtype.app/avsec/" + id;
  const { data, error } = useSWR(avecURL, fetcher);
  return <></>;
}
