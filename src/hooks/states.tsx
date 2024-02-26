import useSWRImmutable from "swr/immutable";

export const useCameraOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("cameraOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};

export const useSearchKeyword = () => {
  const { data, mutate } = useSWRImmutable<string>("searchKeyword", {
    fallbackData: "",
    revalidateOnReconnect: false,
  });

  return {
    data: data || "",
    setData: mutate,
  };
};

/* sidebar Opened */
export const useCheckSidebarOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("checkSidebarOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};

export const useItemSidebarOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("itemSidebarOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};

export const useCurrentItem = () => {
  const { data, mutate } = useSWRImmutable<Object>("currentItem", {
    fallbackData: {},
    revalidateOnReconnect: false,
  });

  return {
    data: data || {},
    setData: mutate,
  };
};

/* camera */
export const useMediaStream = () => {
  const { data, mutate } = useSWRImmutable<MediaStream | null>("mediaStream", {
    fallbackData: null,
    revalidateOnReconnect: false,
  });

  return {
    data: data || null,
    setData: mutate,
  };
};

export const useCapturedImage = () => {
  const { data, mutate } = useSWRImmutable<string | null>("capturedImage", {
    fallbackData: null,
    revalidateOnReconnect: false,
  });

  return {
    data: data || null,
    setData: mutate,
  };
};

export const useCameraStarted = () => {
  const { data, mutate } = useSWRImmutable<boolean>("cameraStarted", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};

/* etc */

export const useRankingFlag = () => {
  const { data, mutate } = useSWRImmutable<boolean>("rankingFlag", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};

/* common */
export const useSidebarIndex = () => {
  const { data, mutate } = useSWRImmutable<number>("sidebarIndex", {
    fallbackData: 0,
    revalidateOnReconnect: false,
  });

  return {
    data: data || 0,
    setData: mutate,
  };
};

/* chat */
export const useChatbotOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("chatbotOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};

export const useChatbotIndex = () => {
  const { data, mutate } = useSWRImmutable<number>("chatbotIndex", {
    fallbackData: 1,
    revalidateOnReconnect: false,
  });

  return {
    data: data || 0,
    setData: mutate,
  };
};

export const useChatContent = () => {
  const { data, mutate } = useSWRImmutable<string>("chatContent", {
    fallbackData: "",
    revalidateOnReconnect: false,
  });

  return {
    data: data || "",
    setData: mutate,
  };
};

export const useJourneyOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("journeyOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};

interface JourneyPair {
  arriveDate: string;
  departureDate: string;
  departureCountry: string;
  arriveCountry: string;
}

export const useJourneyList = () => {
  const { data, mutate } = useSWRImmutable<JourneyPair[]>("journeyList", {
    fallbackData: [],
    revalidateOnReconnect: false,
  });

  return {
    data: data || [],
    setData: mutate,
  };
};

export const useJourneyIndex = () => {
  const { data, mutate } = useSWRImmutable<number>("journeyIndex", {
    fallbackData: 0,
    revalidateOnReconnect: false,
  });

  return {
    data: data || 0,
    setData: mutate,
  };
};
