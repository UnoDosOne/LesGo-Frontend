import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import RequestClientForm from "../RequestClientForm";
import RequestForm from "../RequestForm";
const tempData = { client: "Me", name: "CAV", form: {} }; //kagets naman ata kas akong pasabot kyle

const RequirementsModal = ({ isOpen, setIsOpen, data }) => {
  console.log(data);
  const [resubmitModal, setResubmitModal] = useState(false);
  const [editData, setEditData] = useState(tempData);
  const handleSumbit = () => {
    setResubmitModal(true);
  };
  const handleBack = () => {
    setResubmitModal(false);
  };
  if (!resubmitModal && data) {
    return (
      <div
        className={`${
          isOpen
            ? "opacity-100 inset-0 z-50"
            : " inset-0 -z-50 opacity-0 pointer-events-none"
        } bg-black/70 backdrop-blur-sm absolute w-screen h-screen overflow-hidden  duration-300 `}
      >
        <div className="flex justify-center items-center w-screen h-screen  ">
          <div className="w-full md:w-[90%] lg:w-[50%] pb-16 bg-white rounded-xl mx-2">
            <div className="border-b w-full justify-between sm:justify-end flex items-center p-2">
              <div className="px-6 w-full block">
                <label className="flex gap-1 items-baseline font-inter text-xl font-semibold">
                  Resubmission Form
                  <p className="text-xs font-normal text-gray-500">
                    ID:{data.submissionFormIDFK}
                  </p>
                </label>
              </div>
              <button onClick={setIsOpen} className="p-2">
                <FaXmark />
              </button>
            </div>

            <div className=" p-2">
              <p className="text-center w-full font-inter">
                Reason of Resubmission
              </p>
              <div className="flex justify-center w-full  items-center mt-4">
                <div className="grid-cols-none grid xl:grid-cols-2  gap-1 px-32 font-inter text-sm text-gray-900">
                  {data.reasonsForResubmission &&
                  Array.isArray(data.reasonsForResubmission) &&
                  data.reasonsForResubmission.length > 0 ? (
                    data.reasonsForResubmission.map((reason, id) => (
                      <p key={id}>
                        {id + 1}. {reason}
                      </p>
                    ))
                  ) : (
                    <p>No reasons available for resubmission.</p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-center items-center  gap-x-6 translate-y-8">
                <button
                  onClick={setIsOpen}
                  className="p-2 w-32 h-10 font-inter font-semibold text-sm rounded-md hover:border-2 border-black"
                >
                  Back
                </button>
                <button
                  onClick={handleSumbit}
                  className="p-2 w-32 h-10 bg-amber-500 font-inter font-semibold text-sm rounded-md"
                >
                  Resubmit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${
          isOpen
            ? "opacity-100 inset-0 z-50"
            : " inset-0 -z-50 opacity-0 pointer-events-none"
        } bg-black/70 backdrop-blur-sm absolute w-screen h-screen overflow-hidden  duration-300 `}
      >
        <div className="flex justify-center items-center w-screen h-screen  ">
          <div className="w-full md:w-[90%] lg:w-[66%] pb-16 bg-white rounded-xl mx-2">
            <div className="border-b w-full justify-between sm:justify-end flex items-center p-2">
              <div className="px-6 w-full block">
                <p className="font-inter text-xl font-semibold">
                  Resubmission Form
                </p>
              </div>
              <button onClick={setIsOpen} className="p-2">
                <FaXmark />
              </button>
            </div>
            <RequestForm
              isOpen={resubmitModal}
              onBack={handleBack}
              data={editData}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default RequirementsModal;
