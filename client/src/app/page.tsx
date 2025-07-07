"use client";

import React from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter_effect";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";

import { LoginDialog } from "@/components/login_dialog";
import { RegisterDialog } from "@/components/register_dialog";

export default function Home() {
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "CHINA RAILWAY",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        2023级软件工程7班 董凡清 202300300187
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Modal>
          <ModalTrigger className="w-43 h-10 rounded-xl bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
              Have an account?
            </span>
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
              SIGN IN
            </div>
          </ModalTrigger>
          <ModalBody>
            <ModalContent>
              <LoginDialog />
            </ModalContent>
          </ModalBody>
        </Modal>
        <Modal>
          <ModalTrigger className="w-43 h-10 rounded-xl bg-white dark:bg-black dark:text-white text-black text-black border border-black flex justify-center group/modal-btn">
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
              Have no account?
            </span>
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 dark:text-white text-black text-black z-20">
              SIGN UP
            </div>
          </ModalTrigger>
          <ModalBody>
            <ModalContent>
              <RegisterDialog />
            </ModalContent>
          </ModalBody>
        </Modal>
      </div>

    </div>
  );
}