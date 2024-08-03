import React from "react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-16 pb-80 sm:pb-40 sm:pt-24 lg:pb-24 lg:pt-40">
        <div className="relative px-4 mx-auto max-w-7xl sm:static sm:px-6 lg:px-8">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative px-3 py-1 text-sm leading-6 text-gray-600 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Coal City University Security System App -{" "}
              <a href="#" className="font-semibold text-[#3488ac]">
                <span aria-hidden="true" className="absolute inset-0" />
                view <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-3">
            <div className="sm:max-w-lg">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Secure Campus, Peace of{" "}
                <span className="text-[#3488ac]">Mind</span>
              </h1>
              <p className="mt-4 text-lg text-justify text-gray-500">
                The app is designed to enhance campus safety and provide peace
                of mind to students, faculty, and staff. With features such as
                real-time alerts, 24/7 monitoring, and facial recognition, our
                app ensures that you are always informed and protected.
              </p>
              <a
                href="#"
                className="inline-block rounded-md border border-transparent bg-[#3c9dc8] px-8 py-3 text-center font-medium text-white hover:bg-[#3488ac] mt-4"
              >
                Try Now
              </a>
            </div>
            <div className="size-1/3">
              <img src="/hero.jpeg" alt="hero" className="rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
