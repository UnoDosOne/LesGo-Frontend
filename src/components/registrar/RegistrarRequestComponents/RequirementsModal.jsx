import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faTimesCircle,
	faQuestionCircle,
	faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';

import MessagesModal from '../../rootComponents/Modals/MessagesModal';

const RequirementsModal = ({ isOpen, setIsOpen, data }) => {
  const [viewDetail, setViewDetail] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validityStates, setValidityStates] = useState({
    'Request Form': 'pending',
    'Student Clearance': 'pending',
    'Payment Receipt': 'pending',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isOpen || !data) return null;

  // Check if any document is marked as invalid
  const hasInvalidDocuments = Object.values(validityStates).some((state) => state === 'invalid');

  // Check if all required documents have been validated (not pending)
  const allDocumentsValidated = Object.entries(validityStates)
  .filter(([type]) => type !== 'Request Form') 
  .every(([, state]) => state === 'valid');

  const handleValidityChange = (type, value) => {
    setValidityStates((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const renderValidityDropdown = (type, index) => {
    const currentValidity = validityStates[type] || 'pending';
  
    const colors = {
      pending: 'text-slate-500',
      valid: 'text-green-500',
      invalid: 'text-red-500',
    };
  
    if (index === 0) {
      return null;
    }
  
    return (
      <div className="relative inline-block w-full">
        <select
          className={`appearance-none w-2/3 bg-transparent cursor-pointer rounded-md border p-2 text-sm font-inter ${colors[currentValidity]}`}
          value={currentValidity}
          onChange={(e) => handleValidityChange(type, e.target.value)}>
          <option value="pending" className="font-inter text-sm">
            Select Validity
          </option>
          <option value="valid" className="font-inter text-sm">
            Valid
          </option>
          <option value="invalid" className="font-inter text-sm">
            Invalid
          </option>
        </select>
        <div className="pointer-events-none absolute mr-2 inset-y-0 right-0 flex items-center">
          <FontAwesomeIcon icon={faChevronCircleDown} className="text-slate-500" />
        </div>
      </div>
    );
  };
  


	const handleClearClick = async (documentType) => {
		setIsLoading(true);
		try {
			await axios.put(`${API_BASE_URL}/api/request/${data._id}`, {
				requestStatus: 'Cleared',
				dType: documentType,
				rejectItems: validityStates,
			});

			await axios.post('${API_BASE_URL}/api/addToQueue', {
				studentID: data?.userId?._id,
				course: data?.userId?.course,
				firstname: data?.userId?.fName,
				documentType: data?.documentType,
			});

			setModalMessage('Request Cleared Successfully');
			setIsModalOpen(true);
      setValidityStates('');
			window.location.reload();
		} catch (error) {
			alert('Failed to clear request');
      setValidityStates('');
			console.error(error);
		} finally {
			setIsLoading(false);
      setValidityStates('');
		}
	};

	const handleRejectConfirm = async () => {
		setIsLoading(true);
		try {
			await axios.put(`${API_BASE_URL}/api/request/${data._id}`, {
				requestStatus: 'Rejected',
				dType: data.documentType,
				userid: data.userId._id,
				rejectItems: validityStates,
			});
			setModalMessage('Request Rejected Successfully');
			setIsModalOpen(true);
      setValidityStates('');
			window.location.reload();
		} catch (error) {
			alert('Failed to reject request');
			console.error(error);
		} finally {
			setIsLoading(false);
      setValidityStates('');
		}
	};

	const handleImageClick = (e) => {
		const img = e.target;
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			img.requestFullscreen();
		}
	};

	const renderDetailModal = () => {
		if (!viewDetail) return null;

		return (
			<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
				<div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
					<div className="flex justify-between items-center p-6 border-b border-gray-100">
						<div>
							<h2 className="text-xl font-semibold text-gray-800">{viewDetail.title}</h2>
							{viewDetail.type === 'file' && (
								<p className="text-sm text-gray-600 mt-1">
									Click the image to view in full screen
								</p>
							)}
						</div>
						<button
							onClick={() => setViewDetail(null)}
							className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<div className="p-6">
						{viewDetail.type === 'file' ? (
							<img
								src={`${API_BASE_URL}/api/uploads/${encodeURIComponent(
									viewDetail.content.split('\\').pop()
								)}`}
								alt={viewDetail.title}
								className="w-full h-auto max-h-[500px] object-contain rounded-lg cursor-pointer"
								onError={(e) => {
									e.target.src = '/fallback-image.jpg';
								}}
								onClick={handleImageClick} // Ensure the image is clickable
							/>
						) : (
							<div className="space-y-4">
								{viewDetail.content.map((detail, index) => (
									<div
										key={index}
										className="flex justify-between items-center pb-3 border-b last:border-b-0">
										<span className="text-sm font-medium text-gray-600 w-1/3">
											{detail.label}
										</span>
										<span className="text-sm text-gray-900 w-2/3 text-right">
											{detail.value}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	const renderRejectionModal = () => {
		if (!showRejectionModal) return null;

		return (
			<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
				<div className="bg-white rounded -2xl shadow-2xl w-full max-w-md">
					<div className="p-6 text-center">
						<div className="mx-auto mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-16 w-16 text-red-500 mx-auto"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>
						<h2 className="text-xl font-semibold text-gray-900 mb-2">Confirm Rejection</h2>
						<p className="text-sm text-gray-600 mb-6">
							Are you sure you want to reject this request? This action cannot be undone.
						</p>
						<div className="flex justify-center space-x-4">
							<button
								onClick={() => setShowRejectionModal(false)}
								className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
								Cancel
							</button>
							<button
								onClick={handleRejectConfirm}
								className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
								Confirm Rejection
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
				<div className="p-6 border-b border-gray-100">
					<h2 className="text-2xl font-bold text-gray-900">Submitted Requirements</h2>
					<p className="text-sm text-gray-600 mt-2">
						Review and process the submitted documents
					</p>
				</div>

				<div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type Submitted
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Validity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              {
                type: 'Request Form',
                details: [
                  { label: 'Client', value: data.client },
                  { label: 'Student Name', value: data.userId.fName || 'N/A' },
                  { label: 'Student ID', value: data.userId.schoolID || 'N/A' },
                  { label: 'Course', value: data.userId.course || 'N/A' },
                  { label: 'Document Type', value: data.documentType },
                  { label: 'Purpose', value: data.purpose || 'N/A' },
                ],
              },
              {
                type: 'Student Clearance',
                file: data.clearanceFile,
              },
              {
                type: 'Payment Receipt',
                file: data.proofOfPayment,
              },
              ...(data.authorizationLetter
                ? [
                    {
                      type: 'Authorization Letter',
                      file: data.authorizationLetter,
                    },
                  ]
                : []),
              ...(data.authorizingPersonID
                ? [
                    {
                      type: 'Authorizing Person ID',
                      file: data.authorizingPersonID,
                    },
                  ]
                : []),
              ...(data.authorizedPersonID
                ? [
                    {
                      type: 'Authorized Person ID',
                      file: data.authorizedPersonID,
                    },
                  ]
                : []),
            ].map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.type}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  {row.file ? (
                    <button
                      onClick={() =>
                        setViewDetail({
                          title: row.type,
                          content: row.file,
                          type: 'file',
                        })
                      }
                      className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                      View
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setViewDetail({
                          title: row.type,
                          content: row.details,
                          type: 'details',
                        })
                      }
                      className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                      View
                    </button>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  {renderValidityDropdown(row.type, index)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>

				<div className="flex justify-center space-x-4 p-6 border-t border-gray-100">
					<button
						onClick={() => setShowRejectionModal(true)}
						className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg 
              px-5 py-2.5 text-sm font-medium text-white transition-all duration-300
              bg-red-600 hover:bg-red-700 
              focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transform hover:-translate-y-0.5 active:translate-y-0">
						<span className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-10 transition-opacity"></span>
						<span className="relative flex items-center space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
							<span>Reject</span>
						</span>
					</button>

					<button
						 onClick={() => handleClearClick(data.documentType)}
             disabled={hasInvalidDocuments || !allDocumentsValidated}
						className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg 
              px-5 py-2.5 text-sm font-medium text-white transition-all duration-300
              bg-emerald-600 hover:bg-emerald-700 
              focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 disabled:transform-none
              transform hover:-translate-y-0.5 active:translate-y-0"
						title={
							hasInvalidDocuments
								? 'Cannot clear request with invalid documents'
								: !allDocumentsValidated
								? 'Please validate all documents first'
								: 'Clear request'
						}>
						<span className="absolute inset-0 bg-emerald-700 opacity-0 group-hover:opacity-10 transition-opacity"></span>
						<span className="relative flex items-center space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<span>Clear</span>
						</span>
					</button>

					<button
						onClick={() => {
							setIsOpen(false);
						}}
						className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg 
    px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-300
    bg-gray-200 hover:bg-gray-300 
    focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:-translate-y-0.5 active:translate-y-0">
						<span className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-10 transition-opacity"></span>
						<span className="relative flex items-center space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
							<span>Close</span>
						</span>
					</button>
				</div>
			</div>

			{renderDetailModal()}
			{renderRejectionModal()}
			<MessagesModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				message={modalMessage}
			/>
		</div>
	);
};

export default RequirementsModal;
