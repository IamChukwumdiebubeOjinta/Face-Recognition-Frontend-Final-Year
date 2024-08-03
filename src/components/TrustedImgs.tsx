import React from "react";

const TrustedImgs = () => {
  return (
    <div className="py-24 bg-white sm:py-14">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold leading-8 text-center text-gray-900">
          Getting Ready to be Trusted by Enugu’s most innovative school
        </h2>
        <div className="grid items-center justify-center max-w-lg mx-auto mt-10 _grid-cols-4 gap-x-8 gap-y-10 sm:max-w-xl sm:_grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:_grid-cols-5">
          <img
            alt="CCU-school"
            src="/schoolLogo.png"
            width={158}
            height={48}
            className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TrustedImgs;
