import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = ({ setRegister, setRegisterDetails }) => {
	const navigate = useNavigate();
	const [emailExists, setEmailExists] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	// Get the current year
	const currentYear = new Date().getFullYear();

	// Validation schema for Formik
	const validationSchema = Yup.object({
		emailRegister: Yup.string().email('Invalid email format').required('Email is required'),
		passwordRegister: Yup.string()
			.min(7, 'Password must be at least 7 character')
			.max(30, 'Password must be 30 characters long')
			.matches(/[A-Z]/, 'Password must have at least one uppercase letter')
			.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must have at least one symbol')
			.matches(
				/^(?!.*(.)\1\1).*$/,
				'Password must not have three consecutive identical characters'
			)
			.required('Password is required'),
		passwordConfirmRegister: Yup.string()
			.oneOf([Yup.ref('passwordRegister'), null], 'Passwords must match')
			.required('Confirm password is required'),
		schoolIDRegister: Yup.string()
			.length(10, 'School ID must be exactly 10 digits')
			.matches(/^\d{10}$/, 'School ID must be a 10-digit number')
			.required('School ID is required'),
		fNameRegister: Yup.string().required('Full Name is required'),
		ageRegister: Yup.number()
			.min(2, 'Age must be at least 2')
			.max(70, 'Age must be at most 70')
			.required('Age is required'),
		courseRegister: Yup.string().required('Course is required'),
		acadYearRegister: Yup.string()
			.required('Academic Year is required')
			// .test('isValidYear', 'Academic Year is not valid', (value) => {
			// 	return value >= 1970 && value <= currentYear;
			// }),
	});

	// Handle form submission
	const onSubmit = async (values) => {
		setIsLoading(true);
		setErrorMessage('');

		try {
			const mappedValues = {
				schoolID: values.schoolIDRegister,
				fName: values.fNameRegister,
				email: values.emailRegister,
				pword: values.passwordRegister,
				age: values.ageRegister,
				course: values.courseRegister,
				acadYear: values.acadYearRegister,
				userType: 'student',
			};

			console.log('Mapped Request Data:', mappedValues);

			const response = await axios.post('http://localhost:5000/api/Users', mappedValues);

			if (response.status === 201) {
				alert('Registration successful! Please check your email to activate your account.');
				setSuccessMessage('Registration successful!');
				navigate('/login');
			} else {
				setErrorMessage(response.data.message || 'Registration failed. Please try again.');
			}
		} catch (error) {
			console.error('Error during registration:', error);
			setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
		} finally {
			setIsLoading(false);
		}
	};

	// Generate a list of years from the current year down to 1970
	const years = [];
	for (let year = currentYear; year >= 1970; year--) {
		years.push(year);
	}

	// Show or hide password
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const courseList = [
		'Bachelor in Technology and Livelihood Education',
		'Bachelor in Technical-Vocational Teacher Education',
		'Bachelor of Technology, Operations, and Management',
		'Bachelor of Science in Architecture',
		'Bachelor of Science in Civil Engineering',
		'Bachelor of Science in Electronics Engineering',
		'Bachelor of Science in Electrical Engineering',
		'Bachelor of Science in Mechanical Engineering',
		'Bachelor of Science in Computer Engineering',
		'Bachelor of Science in Geodetic Engineering',
		'Bachelor of Science in Data Science',
		'Bachelor of Science in Computer Science',
		'Bachelor of Science in Information Technology',
		'Bachelor of Science in Technology Communication Management',
		'Bachelor of Science in Applied Physics',
		'Bachelor of Science in Applied Mathematics',
		'Bachelor of Science in Chemistry',
		'Bachelor of Science in Environmental Science',
		'Bachelor of Science in Food Technology',
		'Bachelor of Science in Autotronics',
		'Bachelor of Science in Electronics Technology',
		'Bachelor of Science in Energy Systems and Management',
		'Bachelor of Science in Electro-Mechanical Technology',
		'Bachelor of Science in Manufacturing Engineering Technology',
		'Bachelor of Secondary Education',
		'Post-Baccalaureate Program',
		'Certificate of Teaching',
	  ];

	return (
		<div className="w-screen h-screen flex">
			<div className="flex w-full">
				{/* Left Side Panel */}
				<div className="bg-blue-950 w-[45%] flex-col md:flex justify-center items-center hidden">
					<div className="flex justify-center items-center">
						<div className="absolute -translate-y-36 z-10">
							<div className="w-56 h-56 xl:w-80 xl:h-80 opacity-50">
								<img src="/images/lesgologo.png" alt="LesGo Logo" />
							</div>
						</div>
						<div className="z-10 -translate-y-28 text-center">
							<div className="text-white font-inter font-semibold text-2xl flex justify-center gap-2">
								<p>Already have an</p>
								<p className="text-amber-400 animate-pulse">Account?</p>
							</div>
							<p className="text-white/70 text-sm mt-2">
								Sign in and dive into your new adventure!
							</p>
						</div>
					</div>
					<div className="z-10 mt-4">
						<button
							onClick={setRegister}
							className="bg-white text-blue-950 py-3 px-20 rounded-lg text-sm font-inter 
              hover:bg-gray-100 hover:-translate-y-2 transition-all duration-700 shadow-md">
							Sign In
						</button>
					</div>
				</div>

				{/* Right Side - Registration Form */}
				<div className="w-full flex justify-center items-center">
					<div className="w-full max-w-xl px-6 py-4 overflow-y-auto max-h-screen">
						{/* Header Section */}
						<div className="text-center mb-6">
							<div className="h-16 w-16 mx-auto mb-4">
								<img
									src="/images/lesgologo.png"
									alt="LesGo Logo"
									className="w-full h-full object-contain"
								/>
							</div>
							<h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
							<p className="text-gray-500 text-sm mt-2">Enter your details to get started</p>
						</div>

						{/* Formik Integration */}
						<Formik
							initialValues={{
								schoolIDRegister: '',
								fNameRegister: '',
								emailRegister: '',
								passwordRegister: '',
								passwordConfirmRegister: '',
								ageRegister: '',
								courseRegister: '',
								acadYearRegister: '',
							}}
							validationSchema={validationSchema}
							onSubmit={onSubmit}>
							{({ handleSubmit, handleChange, values, errors, touched }) => (
								<Form className="space-y-4">
									{/* Responsive Grid Layout */}
									<div className="grid md:grid-cols-2 gap-4">
										{/* Email Field */}
										<div className="w-full">
											<label
												htmlFor="emailRegister"
												className="block text-xs font-medium text-gray-700 mb-1">
												Email Address
											</label>
											<Field
												type="email"
												id="emailRegister"
												name="emailRegister"
												placeholder="Enter your email"
												className={`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
													touched.emailRegister && errors.emailRegister
														? 'border-red-500'
														: 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												}`}
											/>
											<ErrorMessage
												name="emailRegister"
												component="p"
												className="text-red-500 text-xs mt-1"
											/>
										</div>

										{/* /* Password Field */}
										<div className="w-full relative">
											<label
												htmlFor="passwordRegister"
												className="block text-xs font-medium text-gray-700 mb-1">
												Password
											</label>
											<Field
												type={showPassword ? 'text' : 'password'}
												id="passwordRegister"
												name="passwordRegister"
												placeholder="Create password"
												className={`w-full px-3 mb-1 py-2 text-sm border rounded-lg transition-all duration-300 ${
													touched.passwordRegister && errors.passwordRegister
														? 'border-red-500'
														: 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												}`}
											/>
											<button
												type="button"
												onClick={togglePasswordVisibility}
												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
												<FontAwesomeIcon
													icon={showPassword ? faEyeSlash : faEye}
													size="lg"
												/>
											</button>
											<ErrorMessage
												name="passwordRegister"
												component="p"
												className="text-red-500 text-xs"
											/>
										</div>

										{/* Confirm Password Field */}
										<div className="w-full">
											<label
												htmlFor="passwordConfirmRegister"
												className="block text-xs font-medium text-gray-700 mb-1">
												Confirm Password
											</label>
											<Field
												type={showPassword ? 'text' : 'password'}
												id="passwordConfirmRegister"
												name="passwordConfirmRegister"
												placeholder="Confirm your password"
												className={`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
													touched.passwordConfirmRegister &&
													errors.passwordConfirmRegister
														? 'border-red-500'
														: 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												}`}
											/>
											<ErrorMessage
												name="passwordConfirmRegister"
												component="p"
												className="text-red-500 text-xs mt-1"
											/>
										</div>

										{/* School ID Field */}
										<div className="w-full">
											<label
												htmlFor="schoolIDRegister"
												className="block text-xs font-medium text-gray-700 mb-1">
												Student ID
											</label>
											<Field
												type="text"
												id="schoolIDRegister"
												name="schoolIDRegister"
												placeholder="Enter Student ID"
												className={`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
													touched.schoolIDRegister && errors.schoolIDRegister
														? 'border-red-500'
														: 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												}`}
											/>
											<ErrorMessage
												name="schoolIDRegister"
												component="p"
												className="text-red-500 text-xs mt-1"
											/>
										</div>

										{/* Full Name Field */}
										<div className="w-full">
											<label
												htmlFor="fNameRegister"
												className="block text-xs font-medium text-gray-700 mb-1">
												Full Name
											</label>
											<Field
												type="text"
												id="fNameRegister"
												name="fNameRegister"
												placeholder="Enter Full Name"
												className={`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
													touched.fNameRegister && errors.fNameRegister
														? 'border-red-500'
														: 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												}`}
											/>
											<ErrorMessage
												name="fNameRegister"
												component="p"
												className="text-red-500 text-xs mt-1"
											/>
										</div>

										{/* Age Field */}
										<div className="w-full">
											<label
												htmlFor="ageRegister"
												className="block text-xs font-medium text-gray-700 mb-1">
												Age
											</label>
											<Field
												type="number"
												id="ageRegister"
												name="ageRegister"
												placeholder="Enter your age"
												className={`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
													touched.ageRegister && errors.ageRegister
														? 'border-red-500'
														: 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												}`}
											/>
											<ErrorMessage
												name="ageRegister"
												component="p"
												className=" text-red-500 text-xs mt-1"
											/>
										</div>

										{/* Course Dropdown */}
										<div className="w-full">
											<label
												htmlFor="courseRegister"
												className="block text-xs font-medium text-gray-700 mb-1">
												Course
											</label>
											<Field
												as="select"
												id="courseRegister"
												name="courseRegister"
												className={`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
													touched.courseRegister && errors.courseRegister
														? 'border-red-500'
														: 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												}`}>
												<option value="" label="Select course" />
												{courseList.map((course) => (
													<option key={course} value={course} label={course} />
												))}
											</Field>
											<ErrorMessage
												name="courseRegister"
												component="p"
												className="text-red-500 text-xs mt-1"
											/>
										</div>

										{/* Academic Year Dropdown */}
										<div className="w-full">
											<label
												htmlFor="acadYearRegister"
												className="block text-xs font-medium text-gray-700 mb-1">
												Academic Year
											</label>
											<Field
												as="select"
												id="acadYearRegister"
												name="acadYearRegister"
												className={`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
													touched.acadYearRegister && errors.acadYearRegister
														? 'border-red-500'
														: 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												}`}>
												<option value="" label="Select academic year" />
												{years.map((startYear) => {
													const nextYear = startYear + 1; // Compute the next year
													const academicYear = `${startYear}-${nextYear}`;
													return (
														<option
															key={academicYear}
															value={academicYear}
															label={academicYear}
														/>
													);
												})}
											</Field>
											<ErrorMessage
												name="acadYearRegister"
												component="p"
												className="text-red-500 text-xs mt-1"
											/>
										</div>
									</div>

									{/* Submit Button */}
									<div className="mt-6">
										<button
											type="submit"
											className="w-full bg-blue-950 text-white py-2 rounded-lg 
                      hover:bg-blue-900 
                      transition-colors duration-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
											disabled={isLoading}>
											<div className="flex items-center justify-center">
												{isLoading ? (
													<svg
														className="animate-spin h-5 w-5 mr-2"
														viewBox="0 0 24 24">
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
													</svg>
												) : null}
												{isLoading ? 'Processing...' : 'Register'}
											</div>
										</button>
									</div>

									{/* Error and Success Messages */}
									{errorMessage && (
										<div className="w-full flex justify-center mt-2">
											<p className="text-red-700 text-sm">{errorMessage}</p>
										</div>
									)}
									{successMessage && (
										<div className="w-full flex justify-center mt-2">
											<p className="text-green-600 text-sm">{successMessage}</p>
										</div>
									)}
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
