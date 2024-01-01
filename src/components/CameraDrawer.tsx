import { useCameraOpened } from "@/hooks/states";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import CameraComponent from "./CameraComponent";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CameraDrawer() {
  const { data: isCameraOpened, setData: setCameraOpened } = useCameraOpened();

  return (
    <Transition.Root show={isCameraOpened} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setCameraOpened}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="bg-gray-900 flex h-full flex-col overflow-y-scroll shadow-xl">
                    {/* Main */}
                    <div>
                      <CameraComponent />
                      {/* <img
                        className="absolute h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80"
                        alt=""
                      /> */}
                    </div>
                    {/* <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setCameraOpened(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
