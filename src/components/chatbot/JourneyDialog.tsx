import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  useJourneyIndex,
  useJourneyList,
  useJourneyOpened,
} from "@/hooks/states";

export default function JourneyDialog() {
  const { data: journeyOpened, setData: setJourneyOpened } = useJourneyOpened();
  const { data: journeyList, setData: setJourneyList } = useJourneyList();
  const { data: journeyIndex, setData: setJourneyIndex } = useJourneyIndex();

  const [arriveCountry, setArriveCountry] = useState("🇰🇷 한국");

  const cancelButtonRef = useRef(null);

  const addJourney = () => {
    const newJourney = {
      arriveDate: "",
      departureDate: "",
      departureCountry: "",
      arriveCountry: arriveCountry,
      // .slice(4)
    };
    setJourneyList([newJourney, ...journeyList]);
    setJourneyOpened(false);
    setJourneyIndex(0);
  };

  return (
    <Transition.Root show={journeyOpened} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setJourneyOpened}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F77F2F]">
                    <CheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      도착지를 선택해주세요
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="mt-[30px] text-[13px] text-white">
                        Country
                      </p>
                      <div className="-mt-[12px] mr-[28px] w-full border-0  border-b-[0.7px] border-[#93949A] msb:w-[321px]">
                        <select
                          value={arriveCountry}
                          onChange={(e) => setArriveCountry(e.target.value)}
                          id="location"
                          name="location"
                          className="border-0 mt-2 block w-full appearance-none focus:ring-0 bg-transparent bg-right bg-no-repeat py-1.5 text-black"
                          defaultValue="🇰🇷 한국"
                        >
                          <option className="text-black">🇰🇷 한국</option>
                          <option className="text-black">🇺🇸 미국</option>
                          <option className="text-black">🇨🇦 캐나다</option>
                        </select>
                      </div>
                      {/* <div className="grid grid-cols-2">
                        <div>
                          <p className="mt-[30px] text-[13px] text-white">
                            Country
                          </p>
                          <div className="-mt-[12px] mr-[28px] w-full border-0  border-b-[0.7px] border-[#93949A] msb:w-[321px]">
                            <select
                              id="location"
                              name="location"
                              className="mt-2 block w-full appearance-none border-0 bg-transparent bg-right bg-no-repeat py-1.5 text-white"
                              defaultValue="🇰🇷 South Korea"
                            >
                              <option className="text-black">
                                🇰🇷 South Korea
                              </option>
                              <option className="text-black">
                                🇺🇸 United States
                              </option>
                              <option className="text-black">🇨🇦 Canada</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <p className="mt-[30px] text-[13px] text-white">
                            Country
                          </p>
                          <div className="-mt-[12px] mr-[28px] w-full border-0  border-b-[0.7px] border-[#93949A] msb:w-[321px]">
                            <select
                              id="location"
                              name="location"
                              className="mt-2 block w-full appearance-none border-0 bg-transparent bg-right bg-no-repeat py-1.5 text-white"
                              defaultValue="🇰🇷 South Korea"
                            >
                              <option className="text-black">
                                🇰🇷 South Korea
                              </option>
                              <option className="text-black">
                                🇺🇸 United States
                              </option>
                              <option className="text-black">🇨🇦 Canada</option>
                            </select>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="bg-[#F77F2F] inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => {
                      addJourney();
                      setJourneyOpened(false);
                    }}
                  >
                    행선지 추가
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setJourneyOpened(false)}
                    ref={cancelButtonRef}
                  >
                    취소
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
