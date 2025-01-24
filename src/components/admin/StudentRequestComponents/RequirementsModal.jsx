// import React, { useState } from "react";
// import { FaXmark } from "react-icons/fa6";
// import YesOrNoModal from "../../rootComponents/Modals/YesOrNoModal";
// import NotificationModal from "../../rootComponents/Modals/NotificationModal"; 

// const tempData = { client: "Me", name: "CAV", form: {} };

// const RequirementsModal = ({ isOpen, setIsOpen, data }) => {
//   const [resubmitModal, setResubmitModal] = useState(false);
//   const [showReschedModal, setShowReschedModal] = useState(false);
//   const [showNotificationModal, setShowNotificationModal] = useState(false);
//   const [showRejectionModal, setShowRejectionModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false); // State for image modal
//   const [notificationMessage, setNotificationMessage] = useState("");
//   const [editData, setEditData] = useState(tempData);
//   const [selectedImage, setSelectedImage] = useState(""); // State for selected image URL

//   const handleSubmit = () => {
//     setResubmitModal(true);
//   };

//   const handleBack = () => {
//     setResubmitModal(false);
//   };

//   const handleClearClick = () => {
//     setShowReschedModal(true);
//   };

//   const handleRejectionClick = () => {
//     setShowRejectionModal(true);
//   };

//   const handleReschedule = (selectedData) => {
//     setShowReschedModal(false);

//     // Automatically assign the window without user selection
//     setNotificationMessage(
//       <>
//         The user has been forwarded to the appropriate <strong>Window </strong> for further processing.
//       </>
//     );

//     setShowNotificationModal(true);
//   };

//   const handleConfirm = () => {
//     setShowRejectionModal(false);
//     setNotificationMessage("The user's form has been forwarded to the appropriate personnel.");
//     setShowNotificationModal(true);
//   };

//   const handleRejectConfirm = () => {
//     setShowRejectionModal(false);
//     setNotificationMessage("This user has been informed that the request is rejected.");
//     setShowNotificationModal(true);
//   };

//   const handleViewRequirement = (requirement) => {
//     setSelectedImage(requirement); // Set the selected image URL
//     setShowImageModal(true); // Open the image modal
//   };

//   const closeImageModal = () => {
//     setShowImageModal(false);
//     setSelectedImage(""); // Clear the selected image
//   };

//   if (!resubmitModal && data) {
//     return (
//       <div
//         className={`${
//           isOpen
//             ? "opacity-100 inset-0 z-50"
//             : " inset-0 -z-50 opacity-0 pointer-events-none"
//         } bg-black/70 backdrop-blur-sm absolute w-screen h-screen overflow-hidden duration-300`}
//       >
//         <div className="flex justify-center items-center w-screen h-screen">
//           <div className="w-full md:w-[90%] lg:w-[50%] pb-16 bg-white rounded-xl mx-2">
//             <div className="border-b w-full justify-between sm:justify-end flex items-center p-2">
//               <div className="px-6 w-full block">
//                 <label className="flex gap-1 items-baseline font-inter text-xl font-semibold">
//                   Submitted Form
//                   <p className="text-xs font-normal text-gray-500">
//                     ID: {data.submissionFormIDFK}
//                   </p>
//                 </label>
//               </div>
//               <button onClick={() => setIsOpen(false)} className="p-2">
//                 <FaXmark />
//               </button>
//             </div>

//             <div className="p-2">
//               <p className="text-center w-full font-inter">Submitted Requirements</p>
//               <div className="flex justify-center w-full items-center mt-4">
//                 <div className="w-full px-8">
//                   {data.submittedRequirements && Array.isArray(data.submittedRequirements) && data.submittedRequirements.length > 0 ? (
//                     <table className="w-full text-left border-collapse border border-gray-200">
//                       <thead>
//                         <tr>
//                           <th className="border border-gray-300 p-2">Type Submitted</th>
//                           <th className="border border-gray-300 p-2">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.submittedRequirements.map((requirement, id) => (
//                           <tr key={id}>
//                             <td className="border border-gray-300 p-2">{requirement}</td>
//                             <td className="border border-gray-300 p-2">
//                               <button 
//                                 className="text-blue-500 hover:underline"
//                                 onClick={() => handleViewRequirement(requirement)} // Open image modal with requirement
//                               >
//                                 View Requirement
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p>No submitted requirements available.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="w-full flex justify-center items-center gap-x-6 translate-y-8">
//                 <button
//                   onClick={handleRejectionClick}
//                   className="p-2 w-32 h-10 font-inter font-semibold text-sm rounded-md hover:border-2 border-black"
//                 >
//                   Reject
//                 </button>
//                 <button
//                   onClick={handleClearClick}
//                   className="p-2 w-32 h-10 bg-amber-500 hover:bg-yellow-600 font-inter font-semibold text-sm rounded-md"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <YesOrNoModal
//           isOpen={showReschedModal}
//           setIsOpen={setShowReschedModal}
//           onConfirm={() => {
//             handleReschedule(data);
//           }}
//           titleName={"Are you sure you want to clear the submitted requirements?"}
//         />

//         <NotificationModal
//           isOpen={showNotificationModal}
//           setIsOpen={setShowNotificationModal}
//           message={notificationMessage}
//         />

//         {/* Rejection Modal */}
//         {showRejectionModal && (
//           <div className="absolute inset-0 z-60 flex justify-center items-center bg-black/70 backdrop-blur-sm">
//             <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
//               <h2 className="text-lg font-semibold">Rejection Confirmation</h2>
//               <p className="mt-2">Are you sure you want to reject this request?</p>
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={() => setShowRejectionModal(false)} // Close rejection modal
//                   className="px-4 py-2 text-gray-600 hover:underline"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleRejectConfirm}
//                   className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
//                 >
//                   Confirm Reject
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Image Modal */}
//         {showImageModal && (
//           <div className="absolute inset-0 z-60 flex justify-center items-center bg-black/70 backdrop-blur-sm">
//             <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
//               <h2 className="text-lg font-semibold">Submitted Requirement</h2>
//               {selectedImage ? (
//                 <img src={selectedImage} alt="Submitted Requirement" className="w-full h-auto" />
//               ) : (
//                 <p>No image available.</p>
//               )}
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={closeImageModal}
//                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// };

// export default RequirementsModal;
