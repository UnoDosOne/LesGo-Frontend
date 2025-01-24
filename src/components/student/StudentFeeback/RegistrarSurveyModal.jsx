import React from 'react';

const QRModal = ({ isOpen, setIsOpen }) => {
	return (
		<div
			className={`${
				isOpen ? 'opacity-100 inset-0 z-50' : ' inset-0 -z-50 opacity-0 pointer-events-none'
			} bg-black/70 backdrop-blur-sm absolute w-screen h-screen overflow-hidden  duration-300 `}>
			<div className="h-full w-full flex justify-center items-center">
				<div className="bg-white rounded-lg w-[90%]   flex-col  px-12 sm:w-auto flex justify-center items-center">
					<p className="text-center font-bold font-inter  text-lg p-2"></p>
					<div className="w-full h-full sm:w-56 sm:h-56 ">
						<img className="  w-full h-full object-cover" src="/images/qrtemplate.png" />
					</div>
					<div>
						<p className="text-center font-bold font-inter  text-lg p-2">
							Scan QR for Registrar Survey
						</p>
						<p className="text-center  font-inter  text-lg ">or</p>
						<h1 className="text-center  font-inter  text-lg  flex gap-1 ">
							<p>Click the Link:</p>
							<a
								href="https://iamhervey.vercel.app"
								target="_blank"
								className="  text-blue-600 italic   cursor-pointer hover:underline">
								https://forms.gle/dqysXz8YHyFqwFhA8
							</a>
						</h1>
					</div>
					<div className="flex justify-center py-3">
						<button
							onClick={setIsOpen}
							className="bg-red-500 rounded-md hover:bg-red-700 text-white font-inter font-bold p-2">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QRModal;
