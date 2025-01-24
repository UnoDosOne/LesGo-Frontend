import React, { useEffect, useState } from "react";
import RequestForm from "./RequestForm";
import Loading from "../../pages/Loading";

const RelativeForm = ({ isOpen, setIsOpen, data, onBack }) => {
  const [formData, setFormData] = useState(data, {});
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validFileTypes.includes(file.type)) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      const maxSize = 1048576; // 1MB in bytes
      if (file.size > maxSize) {
        alert("File size exceeds 1 MB. Please choose a smaller file.");
        return;
      }

      // Update formData state with the file
      setFormData((prevFormData) => ({
        ...prevFormData,
        form: {
          ...prevFormData.form,
          [name]: file,
        },
      }));
    }
  };

  const handleSubmit = () => {
    // Check if all required files are present
    if (
      formData &&
      formData.form.authorizationLetter &&
      formData.form.authorizingPersonID &&
      formData.form.authorizedPersonID
    ) {
      handleLoading();
      setModalOpen(true); // Proceed to the next form step
    } else {
      alert("Please upload all required files.");
    }
  };

  const handleBack = () => {
    setModalOpen(false);
    setFormData((prevClientData) => ({
      ...prevClientData,
      form: {},
      client: "",
    }));
  };

  return (
    <div className={` ${modalOpen ? "" : "overflow-hidden"} w-full`}>
      {modalOpen ? (
        <div className=" ">
          <RequestForm
            data={{ ...formData, form: { ...formData.form } }} // Pass file data as props
            isOpen={modalOpen}
            onBack={handleBack}
          />
        </div>
      ) : (
        <div
          className={`w-full ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } bg-white px-4   ${isOpen ? "scale-100" : "scale-95"}`}
        >
          <Loading loading={isLoading} />
          <div className="w-full">
            <p className="text-center font-semibold font-inter text-lg mb-6">
              Submit Required Documents
            </p>
          </div>
          <div className="w-full">
            <div className="mb-6">
              <label className="flex font-inter font-medium mb-2 text-gray-700">
                <p
                  className={`${
                    formData && formData.authorizationLetter
                      ? "hidden"
                      : "block"
                  } text-red-600`}
                >
                  *
                </p>
                Authorization letter (duly notarized):
              </label>
              <input
                type="file"
                name="authorizationLetter"
                onChange={handleChange}
                accept=".jpg,.jpeg,.png"
                className="file:mr-4 file:py-2 file:px-4
    file:border-0
    file:text-sm file:font-semibold
    file:bg-black file:text-white
    hover:file:bg-violet-100
    hover:file:text-black
    file:duration-300
    border-2
    border-black
    cursor-pointer
    w-full"
              />
            </div>
            <div className="mb-6">
              <label className="flex font-inter font-medium mb-2 text-gray-700">
                <p
                  className={`${
                    formData && formData.authorizingPersonID
                      ? "hidden"
                      : "block"
                  } text-red-600`}
                >
                  *
                </p>
                Photocopy of valid ID of the authorizing person (owner):
              </label>
              <input
                type="file"
                name="authorizingPersonID"
                onChange={handleChange}
                className="file:mr-4 file:py-2 file:px-4
       file:border-0
      file:text-sm file:font-semibold
      file:bg-black file:text-white
      hover:file:bg-violet-100
      hover:file:text-black
      file:duration-300
      border-2
      border-black
      cursor-pointer
      w-full
"
              />
            </div>
            <div className="mb-6" id="authorizedPersonID">
              <label className="flex font-inter font-medium mb-2 text-gray-700">
                <p
                  className={`${
                    formData && formData.authorizedPersonID ? "hidden" : "block"
                  } text-red-600`}
                >
                  *
                </p>{" "}
                Photocopy of valid ID of the authorized person:
              </label>
              <input
                type="file"
                name="authorizedPersonID"
                onChange={handleChange}
                className="file:mr-4 file:py-2 file:px-4
       file:border-0
      file:text-sm file:font-semibold
      file:bg-black file:text-white
      hover:file:bg-violet-100
      hover:file:text-black
      file:duration-300
      border-2
      border-black
      cursor-pointer
      w-full
"
              />
            </div>
          </div>
          <div className="w-full py-4 flex justify-center gap-6">
            <button
              onClick={onBack}
              className="p-2 w-32 h-10 font-inter font-semibold text-sm rounded-md hover:border-2 border-black"
            >
              Back
            </button>
            <button
              onClick={handleSubmit} // Only proceed to the next step, don't submit to server yet
              className="p-2 w-32 h-10 bg-amber-500 font-inter font-semibold text-sm rounded-md "
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelativeForm;
