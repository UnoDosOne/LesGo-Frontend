import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const colors = {
	darkBlue: '#0b1933',
	yellow: '#fcb414',
	white: '#ffffff',
};

const MessagesModal = ({ isOpen, onClose, message }) => {
	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ${
				isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
			}`}>
			<div
				className="w-full max-w-md rounded-lg shadow-lg p-6 text-center"
				style={{
					backgroundColor: colors.white,
					border: `2px solid ${colors.darkBlue}`,
				}}>
				<div className="flex flex-col items-center">
					<FaCheckCircle
						className="text-6xl mb-4 text-green-500"
					/>

					<p className="text-lg font-semibold mb-4" style={{ color: colors.darkBlue }}>
						{message}
					</p>

					{/* <button
						onClick={onClose}
						className="px-5 py-2 rounded-md shadow font-medium text-sm transition duration-300"
						style={{
							backgroundColor: colors.yellow,
							color: colors.darkBlue,
						}}>
						Close
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default MessagesModal;
