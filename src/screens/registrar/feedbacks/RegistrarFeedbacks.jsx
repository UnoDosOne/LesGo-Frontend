import React, { useEffect, useState } from 'react';

const RegistrarFeedbacks = () => {
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsOpen(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
			<div className="bg-white  rounded-md p-6 w-full max-w-2xl">
				<h2 className="text-center font-bold text-3xl text-blue-950 mb-6">
					Registrar Feedback
				</h2>
				<div className="flex flex-col items-center gap-6">
					{/* QR Code Section */}
					<div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
						<div className="w-56 h-56">
							<img
								className="w-full h-full object-cover rounded"
								src="/images/qrtemplate.png"
								alt="Registrar Survey QR Code"
							/>
						</div>
						<p className="mt-4 text-lg font-semibold text-gray-800">
							Scan QR for Registrar Survey
						</p>
						<p className="text-gray-600">or</p>
						<a
							href="https://forms.gle/dqysXz8YHyFqwFhA8"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 font-medium hover:underline">
							https://forms.gle/dqysXz8YHyFqwFhA8
						</a>
					</div>

					{/* Optional Message or Additional Details */}
					{isOpen && (
						<div className="text-center p-4 bg-amber-100 rounded-md shadow">
							<p className="text-lg text-amber-800">
								Thank you for taking the time to provide feedback!
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RegistrarFeedbacks;
