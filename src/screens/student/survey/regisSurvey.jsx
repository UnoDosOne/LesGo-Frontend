import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faQrcode,
	faLink,
	faCheckCircle,
	faExternalLinkAlt,
	faClipboardList,
} from '@fortawesome/free-solid-svg-icons';

const RegisSurvey = () => {
	const [isNotificationVisible, setIsNotificationVisible] = useState(true);
	const [isCopied, setIsCopied] = useState(false);
	const surveyLink = 'https://forms.gle/dqysXz8YHyFqwFhA8';

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsNotificationVisible(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(surveyLink);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
			<div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 text-center">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-blue-950 mb-4">
						Registrar Feedback
					</h1>
					<p className="text-gray-600 text-lg">
						Your opinion matters! Help us improve our services.
					</p>
				</div>

				{/* QR Code Section */}
				<div className="mb-6">
					<div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center">
						<div className="mb-4 w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
							<FontAwesomeIcon 
								icon={faQrcode} 
								className="text-6xl text-gray-400"
							/>
						</div>
						<h2 className="text-xl font-semibold text-blue-950 mb-4">
							Scan QR for Survey
						</h2>
						
						<div className="flex items-center space-x-4">
							<button 
								onClick={handleCopyLink}
								className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition flex items-center"
							>
								<FontAwesomeIcon icon={faLink} className="mr-2" />
								{isCopied ? 'Copied!' : 'Copy Link'}
							</button>
						</div>
					</div>
				</div>

				{/* Notification */}
				{isNotificationVisible && (
					<div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
						<FontAwesomeIcon icon={faCheckCircle} className="mr-3" />
						Thank you for taking the time to provide feedback!
					</div>
				)}
			</div>
		</div>
	);
};

export default RegisSurvey;