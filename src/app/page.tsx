"use client";

import { useState } from "react";
import IconArrow from "./IconArrow";
import clsx from "clsx";

export default function Home() {
  const [day, setDay] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const [dayError, setDayError] = useState<string | null>(null);
  const [monthError, setMonthError] = useState<string | null>(null);
  const [yearError, setYearError] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const [dayText, setDayText] = useState<string>("--");
  const [monthText, setMonthText] = useState<string>("--");
  const [yearText, setYearText] = useState<string>("--");

  const validate = (): boolean => {
    let isValid = true;

    if (!day) {
      setDayError("This field is required");
      isValid = false;
    } else if (isNaN(Number(day)) || Number(day) < 1 || Number(day) > 31) {
      setDayError("Must be a valid date");
      isValid = false;
    } else {
      setDayError(null);
    }

    if (!month) {
      setMonthError("This field is required");
      isValid = false;
    } else if (
      isNaN(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12
    ) {
      setMonthError("Must be a valid month");
      isValid = false;
    } else {
      setMonthError(null);
    }

    if (!year) {
      setYearError("This field is required");
      isValid = false;
    } else if (
      isNaN(Number(year)) ||
      year.length !== 4 ||
      Number(year) < 1900
    ) {
      setYearError("Must be a valid year");
      isValid = false;
    } else if (Number(year) > new Date().getFullYear()) {
      setYearError("Must be in the past");
      isValid = false;
    } else {
      setYearError(null);
    }

    return isValid;
  };

  const calculateAge = () => {
    const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
    const currentDate = new Date();

    let years = currentDate.getFullYear() - inputDate.getFullYear();
    let months = currentDate.getMonth() - inputDate.getMonth();
    let days = currentDate.getDate() - inputDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months -= 1;
      // Calculate the number of days in the previous month
      let previousMonth = currentDate.getMonth() - 1;
      let previousYear = currentDate.getFullYear();
      if (previousMonth < 0) {
        previousMonth = 11; // December
        previousYear -= 1;
      }
      days += new Date(previousYear, previousMonth + 1, 0).getDate(); 
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (years < 0) {
      setIsInvalid(true);
      setYearText("--");
      setMonthText("--");
      setDayText("--");
      setDayError("Must be in the past");
      setMonthError("Must be in the past");
      setYearError("Must be in the past");
      return;
    }

    setYearText(years.toString());
    setMonthText(months.toString());
    setDayText(days.toString());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      setIsInvalid(true);
      return;
    } else {
      setIsInvalid(false);
    }
    calculateAge();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-off-white p-8">
      <div className="max-w-3xl space-y-12 rounded-xl rounded-br-[6rem] bg-white p-4 px-6 sm:p-8 sm:px-14">
        <form className="space-y-12 text-smokey-grey" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-x-4 sm:gap-x-8 sm:pr-36">
            <div>
              <div>
                <label
                  className={clsx(
                    "text-xs font-bold tracking-widest",
                    isInvalid ? "text-red-600" : "text-smokey-grey",
                  )}
                  htmlFor="day"
                >
                  DAY
                </label>
              </div>
              <input
                className={clsx(
                  "block w-full rounded-md border-0 px-2 sm:px-4 py-3 text-lg font-bold text-off-black placeholder:text-smokey-grey sm:text-xl sm:leading-6",
                  isInvalid
                    ? "ring-1 ring-inset ring-red-600 focus:ring-2 focus:ring-inset focus:ring-red-700"
                    : "ring-1 ring-inset ring-light-grey focus:ring-2 focus:ring-inset focus:ring-primary-purple",
                )}
                type="text"
                placeholder="DD"
                id="day"
                value={day || ""}
                onChange={(e) => setDay(e.target.value)}
                maxLength={2}
              />
              {dayError && (
                <p className="mt-1 text-[0.65rem] italic text-red-600">
                  {dayError}
                </p>
              )}
            </div>
            <div>
              <div>
                <label
                  className={clsx(
                    "text-xs font-bold tracking-widest",
                    isInvalid ? "text-red-600" : "text-smokey-grey",
                  )}
                  htmlFor="month"
                >
                  MONTH
                </label>
              </div>
              <input
                className={clsx(
                  "block w-full rounded-md border-0 px-2 sm:px-4 py-3 text-lg font-bold text-off-black placeholder:text-smokey-grey sm:text-xl sm:leading-6",
                  isInvalid
                    ? "ring-1 ring-inset ring-red-600 focus:ring-2 focus:ring-inset focus:ring-red-700"
                    : "ring-1 ring-inset ring-light-grey focus:ring-2 focus:ring-inset focus:ring-primary-purple",
                )}
                type="text"
                placeholder="MM"
                maxLength={2}
                value={month || ""}
                onChange={(e) => setMonth(e.target.value)}
                id="month"
              />
              {monthError && (
                <p className="mt-1 text-[0.65rem] italic text-red-600">
                  {monthError}
                </p>
              )}
            </div>
            <div>
              <div>
                <label
                  className={clsx(
                    "text-xs font-bold tracking-widest",
                    isInvalid ? "text-red-600" : "text-smokey-grey",
                  )}
                  htmlFor="year"
                >
                  YEAR
                </label>
              </div>
              <input
                className={clsx(
                  "block w-full rounded-md border-0 px-2 sm:px-4 py-3 text-lg font-bold text-off-black placeholder:text-smokey-grey sm:text-2xl sm:leading-6",
                  isInvalid
                    ? "ring-1 ring-inset ring-red-600 focus:ring-2 focus:ring-inset focus:ring-red-700"
                    : "ring-1 ring-inset ring-light-grey focus:ring-2 focus:ring-inset focus:ring-primary-purple",
                )}
                type="text"
                placeholder="YYYY"
                maxLength={4}
                value={year || ""}
                onChange={(e) => setYear(e.target.value)}
                id="year"
              />
              {yearError && (
                <p className="mt-1 text-[0.65rem] italic text-red-600">
                  {yearError}
                </p>
              )}
            </div>
          </div>
          <div className="relative border-b border-light-grey">
            <button
              type="submit"
              className="absolute inset-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-purple sm:inset-x-full sm:size-20"
            >
              <IconArrow className="mx-auto p-2 sm:p-1.5" />
            </button>
          </div>
        </form>
        <div>
          <p className="text-6xl font-bold italic sm:text-8xl">
            <span className="font-extrabold text-primary-purple">
              {yearText}
            </span>
            years
          </p>
          <p className="text-6xl font-bold italic sm:text-8xl">
            <span className="font-extrabold text-primary-purple">
              {monthText}
            </span>
            months
          </p>
          <p className="text-6xl font-bold italic sm:text-8xl">
            <span className="font-extrabold text-primary-purple">
              {dayText}
            </span>
            days
          </p>
        </div>
      </div>
    </main>
  );
}
