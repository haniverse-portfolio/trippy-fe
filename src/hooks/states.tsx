import useSWRImmutable from "swr/immutable";

export const useCameraOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("cameraOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data,
    setData: mutate,
  };
};

export const useSearchKeyword = () => {
  const { data, mutate } = useSWRImmutable<string>("searchKeyword", {
    fallbackData: "",
    revalidateOnReconnect: false,
  });

  return {
    data: data,
    setData: mutate,
  };
};

export const useCheckSidebarOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("checkSidebarOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data,
    setData: mutate,
  };
};
export const useMediaStream = () => {
  const { data, mutate } = useSWRImmutable<MediaStream | null>("mediaStream", {
    fallbackData: null,
    revalidateOnReconnect: false,
  });

  return {
    data: data,
    setData: mutate,
  };
};

export const useCapturedImage = () => {
  const { data, mutate } = useSWRImmutable<string | null>("capturedImage", {
    fallbackData: null,
    revalidateOnReconnect: false,
  });

  return {
    data: data,
    setData: mutate,
  };
};
