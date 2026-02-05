import Image from "next/image";
import React from "react";

const CaseStudts = () => {
  return (
    <div className="bg-[#2A3234] py-20">
      <div className="container mx-auto px-10">
        <div className="flex justify-end pt-6">
          <Image
            src="/images/Vector.png"
            alt="vector case"
            height={50}
            width={80}
          />
        </div>
        <div className="flex justify-between">
          <div className="pt-30">
            <Image
              src="/images/case icon.png"
              alt="case icon"
              height={50}
              width={80}
            />
            <h3 className="font-bold text-5xl text-white pt-3">
              Project Title
            </h3>
            <p className="text-white pt-2 text-2xl">Project description</p>

            <div className="flex">
              <div className="">
                <h3 className="font-semibold text-blue-600 text-4xl pt-3">
                UX Case Study
              </h3>
              <Image
                src="/images/uiux.png"
                alt="ui ux"
                height={50}
                width={80}
                className="h-16 w-70"
              />
              </div>
              <div className="pt-8 -translate-x-3">
                <Image
                src="/images/rony.png"
                alt="rony"
                height={50}
                width={80}
                className="h-[107px] w-[178px]"
              />
              </div>
            </div>
          </div>
          <div className="">
            <Image
              src="/images/phone 2.png"
              alt="case stydy riht"
              height={50}
              width={80}
              className="h-[548px] w-[742px] object-contain"
            />
          </div>
        </div>

        <div className="">
            <h3 className="font-bold text-white text-[24px]">Duration:</h3>
            <p className="font-normal text-base text-[#9AC0FF] w-48"> 12th June - 30th August</p>
            <p className="font-normal text-base text-[#9AC0FF] w-48"> (6 weeks)</p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudts;
