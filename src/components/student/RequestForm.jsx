import React, { useState, useEffect } from "react";
import axios from "axios";
import MessagesModal from "../rootComponents/Modals/MessagesModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const puposeTypes = [
  { value: "evaluation", name: "For Evaluation" },
  { value: "scholarship", name: "For Scholarship" },
  { value: "passport", name: "For Passport" },
  { value: "board_exam", name: "For Board Exam" },
  { value: "employment", name: "For Employment" },
  { value: "personal_file", name: "For Personal File" },
  { value: "advanced_studies", name: "For Advanced Studies" },
  { value: "ranking", name: "For Ranking" },
  { value: "others", name: "Others" },
];

const fileTypes = [
  { value: "authentication", name: "Authentication" },
  { value: "cav", name: "Certification Authentication & Verification" },
  { value: "correction of Name", name: "Correction of Name" },
  { value: "diploma Replacement", name: "Diploma Replacement" },
  { value: "evaluation", name: "Evaluation" },
  { value: "permit to study", name: "Permit to study" },
  { value: "rush Fee", name: "Rush Fee" },
  { value: "SF 10", name: "SF 10 ( Form 137 )" },
  { value: "tor", name: "Transcript of Records" },
  { value: "honorable_dismissal", name: "Honorable Dismissal" },
  { value: "others", name: "Others" },
];

const documentPrices = {
  "Authentication": 100,
  "CAV (Certification Authentication & Verification)": 150,
  "Correction of Name": 200,
  "Diploma Replacement": 250,
  "Evaluation": 180,
  "Permit to study": 90,
  "Rush Fee": 300,
  "SF 10 ( Form 137 )": 120,
  "Transcript of Records": 220,
  "Honorable Dismissal": 130,
  "Others": 50,
  "Unknown": 0, // Default price
};

const RequestForm = ({ isOpen, setIsOpen, data, onBack }) => {
  console.log(data);

  const [formData, setFormData] = useState(data, {
    purpose: "",
    date: null,
    semester: "",
    requestedCredentials: "",
    phoneNumber: "+639",
    clearanceStatus: "",
    clearanceFile: null,
    requestedDate: null,
    receiptImage: null, // New field for receipt image
  });

  const selectedDocument = formData.name || "Unknown"; // Ensure fallback to "Unknown"
  const documentPrice = documentPrices[selectedDocument] || 0; // Fallback to 0 if no match
  const [schoolYears, setSchoolYears] = useState([]);
  const [reqDate, setReqDate] = useState({ day: "", month: "", year: "" });
  const [tempNum, setTempNum] = useState();

  console.log(formData);

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateSchoolYears = (startYear = 1927) => {
    const currentYear = new Date().getFullYear();
    const schoolYears = [];

    // Create school years in reverse order
    for (let year = currentYear; year >= startYear; year--) {
      schoolYears.push(`SY ${year}-${year + 1}`);
    }

    return schoolYears;
  };

  useEffect(() => {
    setSchoolYears(generateSchoolYears());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => {
      if (type === "file") {
        const file = files[0];

        // Check if a file is selected
        if (file) {
          // Validate file type
          const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];
          if (!validFileTypes.includes(file.type)) {
            setModalMessage(
              "Please select a valid image file (png, jpg, jpeg)."
            );
            setIsModalOpen(true);
            return prevFormData; // Return the previous state if validation fails
          }

          // Validate file size (1MB = 1048576 bytes)
          const maxSize = 1048576; // 1MB in bytes
          if (file.size > maxSize) {
            setModalMessage(
              "File size exceeds 1 MB. Please choose a smaller file."
            );
            setIsModalOpen(true);
            return prevFormData; // Return the previous state if validation fails
          }

          // If validation passes, update the state with the file
          return {
            ...prevFormData,
            form: {
              ...prevFormData.form,
              [name]: file,
            },
          };
        }

        return prevFormData; // Return the previous state if no file is selected
      } else {
        // Handle other input types
        return {
          ...prevFormData,
          form: {
            ...prevFormData.form,
            [name]: value,
          },
        };
      }
    });
  };

  useEffect(() => {
    const convertDateToTimestamp = () => {
      const requestDate = new Date(formData.form.requestedDate || 0);

      if (reqDate) {
        if (reqDate && reqDate.day) {
          requestDate.setDate(reqDate.day + 0);
        }
        if (reqDate && reqDate.month) {
          requestDate.setMonth(reqDate.month);
        }
        if (reqDate && reqDate.year) {
          requestDate.setFullYear(reqDate.year);
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
          form: {
            ...prevFormData.form,
            requestedDate: requestDate.getTime(),
          },
        }));
      }
    };
    convertDateToTimestamp();
  }, [reqDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{0,11}$/;

    // Construct the phone number (only 11 digits)
    const phone = tempNum;

    // Check if phone number matches the valid format (11 digits only, no special characters)
    if (!phoneRegex.test(phone)) {
      setModalMessage(
        "Please enter a valid Philippine phone number (11 digits)."
      );
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false); // Close the modal
      }, 2000);
      return; // Stop the submission process if the phone number is invalid
    }
    // Prepare form data for the POST request
    const requestData = new FormData();

    // Include `client` and `documentType` in the request data
    requestData.append("client", formData.client || "Me");
    requestData.append("documentType", formData.name || "Unknown");

    // Add all form fields to requestData
    Object.entries(formData.form).forEach(([key, value]) => {
      const adjustedKey = key === "graduatedDate" ? "graduationDate" : key;
      requestData.append(adjustedKey, value);
    });

    console.log(formData.form.receiptImage);

    // Add phoneNumber field separately if it was updated outside of formData.form
    requestData.set("phoneNumber", phone);

    // Check if the form is complete with updated validation logic
    // const isFormComplete =
    //   formData.form &&
    //   formData.form.purpose &&
    //   formData.form.graduatedDate &&
    //   phone &&
    //   formData.form.semester &&
    //   formData.form.clearanceStatus === "Yes" &&
    //   formData.form.clearanceFile &&
    //   formData.form.receiptImage &&
    //   (formData.form.requestedCredentials === "No" ||
    //     (formData.form.requestedCredentials === "Yes" &&
    //       formData.form.documentRequested &&
    //       formData.form.requestedDate));

    const isFormComplete = () => {
      const { form } = formData;

      const isFormValid =
        form &&
        form.purpose &&
        form.graduatedDate &&
        form.semester &&
        form.clearanceStatus === "Yes" &&
        form.clearanceFile &&
        form.receiptImage &&
        phone;

      const isRequestedCredentialsValid =
        form.requestedCredentials === "No" ||
        (form.requestedCredentials === "Yes" &&
          form.documentRequested &&
          form.requestedDate);

      return isFormValid && isRequestedCredentialsValid && phone;
    };

    console.log(isFormComplete);

    if (isFormComplete) {
      try {
        // Send data to the backend server
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}api/request`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace token with the actual user token
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          setModalMessage("Form submitted successfully!");
          setIsModalOpen(true);
          setTimeout(() => window.location.reload(), 2000);
        }
      } catch (error) {
        console.error(
          "Error submitting form:",
          error.response?.data || error.message
        );
        alert("Failed to submit the form. Please try again.");
      }
    } else {
      setTimeout(() => window.location.prev(), 2000);
      setModalMessage("Failed to submit the form. Please try again.");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false); // Close the modal
      }, 2000);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className={`w-full h-[70vh] overflow-auto p-2 ${
          isOpen ? "" : "hidden"
        } md:w-[90%]  bg-white rounded-xl mx-2 duration-700`}
      >
        <div className="w-full">
          <div className="hidden sm:block text-center font-inter font-semibold text-xl">
            Request Form
          </div>
          {/* Display Document Price */}
          <div className="w-full my-4 text-center">
            <p className="text-lg font-inter font-bold">
              Document Price:{" "}
              <span className="text-green-600">{documentPrice} PHP</span>
            </p>
          </div>
          <div className="flex flex-col w-full">
            {/* Part 1 */}
            <div className="flex flex-col w-full pt-0 sm:pt-8">
              <p className="my-2 text-md font-bold font-inter flex">
                <p
                  className={`${
                    formData && formData.form.purpose ? "hidden" : "block"
                  } text-red-600`}
                >
                  *
                </p>
                Part 1: Please Check the Purpose of Your Request
              </p>
              <div className="flex flex-col w-full gap-2">
                <div className="flex gap-x-2">
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="appearance-none rounded-md w-full p-2 border-[2px] border-black custom-select font-inter hover:ring-2 hover:ring-black"
                  >
                    <option value="" className="text-gray-500">
                      Select
                    </option>
                    {puposeTypes.map((type) => (
                      <option
                        className="text-gray-900 p-2"
                        key={type.value}
                        value={type.value}
                      >
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Part 2 */}
            <div className="flex flex-col w-full my-2 mb-4">
              <p className="text-md font-bold font-inter flex">
                Part 2: Please Complete Enter Below
              </p>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-y-2">
              <div className="w-full gap-2 flex">
                <div className="flex w-full gap-x-2 items-center">
                  <p className="text-sm font-inter flex">
                    <p
                      className={`${
                        formData && formData.form.graduatedDate
                          ? "hidden"
                          : "block"
                      } text-red-600`}
                    >
                      *
                    </p>
                    Date Graduated:
                  </p>

                  <div className="flex gap-x-2 items-center">
                    <DatePicker
                      selected={formData.form.graduationDate}
                      onChange={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          form: {
                            ...prev.form,
                            graduationDate: date,
                          },
                        }))
                      }
                      className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      dateFormat="MMMM dd, yyyy" // You can customize the date format here
                      minDate={new Date(1970, 0, 1)}
                      maxDate={new Date()}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full gap-2 flex">
                <div className="flex flex-col w-full gap-2">
                  <p className="text-sm font-inter flex">
                    <p
                      className={`${
                        formData && formData.form.semester ? "hidden" : "block"
                      } text-red-600`}
                    >
                      *
                    </p>
                    Last Semester & SY of Attendance:
                  </p>
                  <div className="flex gap-x-2">
                    <select
                      name="semester"
                      value={formData.form.semester}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border-[2px] border-black custom-select font-inter hover:ring-2 hover:ring-black"
                    >
                      <option value={""} className="text-gray-500">
                        Select
                      </option>
                      {schoolYears.map((year, index) => (
                        <option
                          className="text-gray-900"
                          key={index}
                          value={year}
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-full gap-2 flex flex-col xl:flex-row">
                <div className="flex flex-col w-full gap-2">
                  <p className="text-sm font-inter flex">
                    <p
                      className={`${
                        formData && formData.form.requestedCredentials
                          ? "hidden"
                          : "block"
                      } text-red-600`}
                    >
                      *
                    </p>
                    Already requested credentials as stated below:
                  </p>
                  <div className="flex gap-x-2">
                    <select
                      name="requestedCredentials"
                      value={formData.form.requestedCredentials}
                      onChange={handleChange}
                      className="appearance-none rounded-md w-full p-2 border-[2px] border-black custom-select font-inter hover:ring-2 hover:ring-black"
                    >
                      <option value="" className="text-gray-500">
                        Select
                      </option>
                      <option value="Yes" className="text-gray-900">
                        Yes
                      </option>
                      <option value="No" className="text-gray-900">
                        No
                      </option>
                    </select>
                  </div>

                  <div
                    className={` ${
                      formData && formData.form.requestedCredentials === "Yes"
                        ? "flex"
                        : "hidden "
                    }  w-full flex-col-reverse sm:flex-row gap-x-2  items-center `}
                  >
                    <div className="py-2 sm:w-[75%] w-full">
                      <div className="flex ">
                        <p
                          className={`${
                            formData && formData.form.documentRequested
                              ? "hidden"
                              : "block"
                          } text-red-600`}
                        >
                          *
                        </p>
                        Please specify the document requested:
                      </div>
                      <select
                        name="documentRequested"
                        value={formData.documentRequested}
                        onChange={handleChange}
                        className="appearance-none rounded-md w-full p-2 border-[2px] border-black custom-select font-inter hover:ring-2 hover:ring-black"
                      >
                        <option value="" className="text-gray-500">
                          Select
                        </option>
                        {fileTypes.map((type) => (
                          <option
                            className="text-gray-900"
                            key={type.value}
                            value={type.value}
                          >
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full sm:w-[30%] md:w-1/2">
                      <div className="flex w-full items-center">
                        <p
                          className={`${
                            formData && formData.form.requestedDate
                              ? "hidden"
                              : "block"
                          } text-red-600`}
                        >
                          *
                        </p>
                        <p className="text-sm font-inter">Date Requested:</p>
                      </div>

                      <div className="flex gap-x-2 items-center">
                        <input
                          placeholder="dd"
                          name="requestedDay"
                          type="number"
                          min="1"
                          max="31"
                          value={reqDate.day}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,2}$/.test(value) && value <= 31) {
                              setReqDate((reqDate) => ({
                                ...reqDate,
                                day: value === "" ? "" : parseInt(value),
                              }));
                            }
                            console.log(value === "" ? "" : parseInt(value));
                          }}
                          className="font-inter rounded-md border-2 border-black p-1 py-2 w-full sm:w-10 text-sm text-center"
                        />
                        <p>/</p>
                        <input
                          placeholder="mm"
                          name="requestedMonth"
                          type="number"
                          min="1"
                          max="12"
                          value={reqDate.month}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,2}$/.test(value) && value <= 12) {
                              setReqDate((reqDate) => ({
                                ...reqDate,
                                month: value === "" ? "" : parseInt(value),
                              }));
                            }
                            console.log(value === "" ? "" : parseInt(value));
                          }}
                          className="font-inter rounded-md border-2 border-black p-1 py-2 w-full sm:w-10 text-sm text-center"
                        />
                        <p>/</p>
                        <input
                          placeholder="yyyy"
                          name="requestedYear"
                          type="number"
                          min="1900"
                          max={"9999"}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,4}$/.test(value)) {
                              setReqDate((reqDate) => ({
                                ...reqDate,
                                year: value === "" ? "" : parseInt(value),
                              }));
                            }
                            console.log(value === "" ? "" : parseInt(value));
                          }}
                          value={reqDate.year}
                          className="  font-inter rounded-md border-2 border-black p-1 py-2 w-full  text-sm text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="text-sm font-inter flex">
                  <p
                    className={`${
                      formData.form.phoneNumber && formData.form.phoneNumber
                        ? "hidden"
                        : "block"
                    } text-red-600`}
                  >
                    *
                  </p>
                  Contact Number:
                </p>
                <div className="flex">
                  <div className=" border-t-2 rounded-l-md border-b-2 border-l-2 border-black font-inter h-11 items-center flex px-2">
                    +63
                  </div>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={tempNum}
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow valid Philippine phone numbers without special characters:
                      // 09295798093 (with 0 prefix) or 929579803 (without 0 prefix, international format)
                      // Ensure only numbers are entered, no spaces or special characters
                      if (/^[0-9]{0,11}$/.test(value)) {
                        setTempNum(value);
                      }
                    }}
                    className="w-full rounded-r-md p-2 border-2 border-black font-inter hover:ring-2 hover:ring-black"
                  />
                </div>
              </div>
            </div>

            <div className="w-full gap-2 flex">
              <div className="flex flex-col w-full gap-2">
                <p className="text-sm font-inter flex">
                  <p
                    className={`${
                      formData && formData.form.clearanceStatus === "Yes"
                        ? "hidden"
                        : "block"
                    } text-red-600`}
                  >
                    *
                  </p>
                  Student Clearance:
                </p>
                <div className="flex gap-x-2">
                  <select
                    name="clearanceStatus"
                    value={formData.clearanceStatus}
                    onChange={handleChange}
                    className="appearance-none rounded-md w-full p-2 border-[2px] border-black custom-select font-inter hover:ring-2 hover:ring-black"
                  >
                    <option value="" className="text-gray-500">
                      Select
                    </option>
                    <option value="Yes" className="text-gray-900">
                      Yes
                    </option>
                    <option value="No" className="text-gray-900">
                      No
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-y-2">
                  {formData.form.clearanceStatus === "Yes" && (
                    <div className="">
                      <label className=" font-inter text-sm mb-2 flex">
                        <p
                          className={`${
                            formData && formData.form.clearanceFile
                              ? "hidden"
                              : "block"
                          } text-red-600`}
                        >
                          *
                        </p>
                        Upload your Clearance:
                      </label>
                      <input
                        type="file"
                        name="clearanceFile"
                        onChange={handleChange}
                        className="file:mr-4 file:py-2 file:px-4 rounded-md
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
                  )}
                  {formData.form.clearanceStatus === "No" && (
                    <p
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = "/path/to/empty.pdf"; // Replace with the actual path to your placeholder PDF
                        link.download = "StudentClearance.pdf"; // Optional: specify the file name
                        link.click();
                      }}
                      className="text-center rounded-md p-2 font-inter text-gray-900 text-sm border-2 w-full border-black cursor-pointer hover:underline"
                    >
                      For student clearance, click here!
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Receipt Image Upload */}
            <div className="w-full gap-2 flex flex-col my-4">
              <p className="text-sm font-inter flex">
                <p
                  className={`${
                    formData && formData.form.receiptImage ? "hidden" : "block"
                  } text-red-600`}
                >
                  *
                </p>
                Upload Proof of Payment:
              </p>
              <input
                type="file"
                name="receiptImage"
                onChange={handleChange}
                className="file:mr-4 file:py-2 file:px-4 rounded-md
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
                accept=".jpg,.jpeg,.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center py-4 gap-4">
        <button
          onClick={onBack}
          className="p-2 w-32 h-10 font-inter font-semibold text-sm rounded-md hover:border-2 border-black"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="p-2 w-32 h-10 bg-amber-500 font-inter font-semibold text-sm rounded-md"
        >
          Submit
        </button>
      </div>
      <MessagesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default RequestForm;
