"use client";

import React, { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import { cn, validateIdCard } from "@/lib/utils";
import { User, UserFromErrors } from "@/lib/models";
import { DataRequest, DataResponse, sendRequest } from "@/lib/request";
import { useRouter } from "next/navigation";

const initialFormState: User = {
  id: "",
  name: "",
  gender: 0,
  password: "",
  idCard: ""
};

export const RegisterDialog = () => {

  const Router = useRouter();

  const [name, setName] = useState(initialFormState.name);
  const [gender, setGender] = useState(initialFormState.gender);
  const [IdCard, setIdCard] = useState(initialFormState.idCard);
  const [password0, setPassword0] = useState(initialFormState.password);
  const [password1, setPassword1] = useState(initialFormState.password);

  const [error, setError] = useState<UserFromErrors>({});

  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  // const [submitMessage, setSubmitMessage] = useState("");


  const registerUser = async (user: User) : Promise<{status: boolean, message: string}> => {
    const dataRequest: DataRequest = {
      url: "/api/auth/register",
      method: "POST",
      body: user,
    };
  
    const dataResponse: DataResponse = await sendRequest(dataRequest);
    return {
      status: dataResponse.status === 200,
      message: dataResponse.msg || "Registration successful!",
    }
  };
  
  const validateForm = (): boolean => {
    const userError: UserFromErrors = {};

    if (!name.trim()) userError.name = "Name is required!";
      
    if (gender === null) userError.gender = "Gender is required!";
      
    if (!IdCard.trim()) userError.idCard = "ID card is required!";
    else if (!validateIdCard(IdCard)) userError.idCard = "Invalid ID card format!";

    if (!password0) userError.password0 = "Password is required!";
    else if (password0.length < 6) userError.password0 = "Password must be at least 6 characters long!";

    if (!password1) userError.password1 = "Please confirm your password!";
    else if (password1 !== password1) userError.password1 = "Passwords do not match!";

    setError(userError);

    return Object.keys(userError).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log("Form validation failed", error);
      return;
    }

    // setIsSubmitting(true);
    // setSubmitStatus("idle");
    
    const newUser: User = {
      ...initialFormState,
      name: name.trim(),
      gender: Number(gender),
      idCard: IdCard.trim(),
      password: password0,
    };
    
    try {
      const response = await registerUser(newUser);

      if (response.status) {
        // setSubmitStatus("success");
        // setSubmitMessage(response.message || "Registration successful!");
        Router.push("main");
      } else {
        // setSubmitStatus("error");
        // setSubmitMessage(response.message || "Registration failed!");
        resetForm();
      }
    } catch (error) {
      // setSubmitStatus("error");
      // setSubmitMessage("An error occurred while submitting the form.");
      console.error("Error during registration:", error);
    } finally {
      console.log("Form submitted", newUser);
      // setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName(initialFormState.name);
    setGender(initialFormState.gender);
    setIdCard(initialFormState.idCard);
    setPassword0(initialFormState.password);
    setPassword1(initialFormState.password);
    setError({});
    // setSubmitStatus("idle");
    // setSubmitMessage("");
  };
  
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to use CHINA RAILWAY
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Please fill in the form below to register an account. We will not use
        your information for any other purposes.
      </p>
  
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Type your real name" type="text" onChange={(e) => setName(e.target.value)} />
            {error.name && (
              <p className="text-red-500 text-xs mt-1">{error.name}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" placeholder="Select your gender" onChange={(e) => setGender(Number(e.target.value))}>
              <option value="0">male</option>
              <option value="1">female</option>
            </Select>
            {error.gender && (
              <p className="text-red-500 text-xs mt-1">{error.gender}</p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="idCard">ID card</Label>
          <Input id="idCard" placeholder="Type your ID card" type="text" onChange={(e) => setIdCard(e.target.value)} />
          {error.idCard && (
            <p className="text-red-500 text-xs mt-1">{error.idCard}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password0">Password</Label>
          <Input id="password0" placeholder="Enter your password" type="password" onChange={(e) => setPassword0(e.target.value)} />
          {error.password0 && (
            <p className="text-red-500 text-xs mt-1">{error.password0}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password1">Password</Label>
          <Input id="password1" placeholder="Enter your password again" type="password" onChange={(e) => setPassword1(e.target.value)} />
          {error.password1 && (
            <p className="text-red-500 text-xs mt-1">{error.password1}</p>
          )}
        </LabelInputContainer>
  
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
 
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};