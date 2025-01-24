import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../pages/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ setRegister }) => {
	const [form, setForm] = useState({});
	const [validPass, setValidPass] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [user, setUser] = useState(null);
	const [btnSubmit, setBtnSubmit] = useState(false);
	const [touched, setTouched] = useState({ email: false, password: false });
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Regular expression for validating email
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	// Validate email and password in real-time
	const validateEmail = (email) => {
		return emailRegex.test(email);
	};

	const validatePassword = (password) => {
		// Example password validation: minimum 6 characters and at least one number
		return password.length >= 3 && /\d/.test(password);
	};

	// Handle input changes for email and password
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
		setTouched((prevTouched) => ({
			...prevTouched,
			[name]: true,
		}));

		// Validate email and password as the user types
		if (name === 'email') {
			setValidEmail(validateEmail(value));
		} else if (name === 'password') {
			setValidPass(validatePassword(value));
		}
	};

	// Form validation and submission logic
	const handleSubmit = async () => {
		setLoading(true);

		if (!validEmail || !validPass) {
			alert('Please enter a valid email and password.');
			setLoading(false);
			return;
		}
		
		try {
			console.log(import.meta.env.VITE_API_BASE_URL)
			console.log(import.meta.env);
			const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}api/auth/login`, {
				email: form.email,
				password: form.password,
			});

			console.log('Login successful:', response.data);

			const { token, user } = response.data;

			// Normalize userType for case-insensitive comparison
			const normalizedUserType = user.userType?.toLowerCase();
			console.log('Normalized userType:', normalizedUserType);

			if (normalizedUserType === 'student') {
				console.log('Navigating to /student');
				navigate('/student');
			} else if (normalizedUserType === 'registrar') {
				console.log('Navigating to /registrar');
				navigate('/registrar');
			} else if (normalizedUserType === 'admin') {
				console.log('Navigating to /admin');
				navigate('/admin');
			} else {
				console.error('Unknown userType:', user.userType); // Log the exact value
				alert('Login failed. Invalid user type.');
			}
			console.log(user)
			localStorage.setItem('token', token);
			localStorage.setItem('user', user.fName);
			localStorage.setItem('userType', user.userType);

			setUser(user);
		} catch (error) {
			console.error('Login error:', error);
			alert(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	// Handle navigation after successful login
	useEffect(() => {
		if (btnSubmit) {
			if (form.userType) {
				navigate('/' + form.userType + '/queue/'); 
			}
		}
	}, [btnSubmit, navigate]);

	// Show or hide password
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	// Handle "Forgot Password" click
	const handleForgotPasswordClick = () => {
		navigate('/forgot-password'); 
	};

	// Trigger form submission
	const onSubmitClick = () => {
		handleSubmit(); 
	};

	return (
		<div className="w-screen h-screen flex">
			<Loading loading={loading} />
			<div className="flex w-full">
				<div className="w-full flex justify-center items-start mt-12 md:mt-0 md:items-center">
					<div className="w-full flex flex-col gap-y-6 justify-center items-center max-w-md px-6">
						{/* Logo Section */}
						<div className="h-20 w-20 md:h-24 md:w-24 flex justify-center items-center">
							<img
								src="/images/lesgologo.png"
								alt="LesGo Logo"
								className="w-full h-full object-contain"
							/>
						</div>

						{/* Title */}
						<div className="text-center">
							<h1 className="text-3xl font-bold text-gray-800 mb-2">
								Welcome to <span className="text-[#0b1933]">Queue</span>
								<span className="text-[#fcb414]">Ease</span>
							</h1>
							<p className="text-gray-500 text-sm">Sign in to continue to your account</p>
						</div>

						{/* Form Section */}
						<div className="w-full space-y-4">
							{/* Email Input */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-2">
									Email Address
								</label>
								<div className="relative">
									<input
										type="email"
										id="email"
										name="email"
										value={form.email || ''}
										onChange={handleInputChange}
										placeholder="Enter your email"
										className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 ${
											validEmail || !touched.email
												? 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												: 'border-red-500 text-red-600'
										}`}
									/>
									{!validEmail && touched.email && (
										<p className="text-red-500 text-xs mt-1">
											Please enter a valid email address
										</p>
									)}
								</div>
							</div>

							{/* Password Input */}
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<div className="relative flex items-center">
									<input
										type={showPassword ? 'text' : 'password'}
										id="password"
										name="password"
										value={form.password || ''}
										onChange={handleInputChange}
										placeholder="Enter your password"
										className={`w-full px-4 py-3 border rounded-lg pr-10 transition-all duration-300 ${
											validPass || !touched.password
												? 'border-gray-300 focus:ring-2 focus:ring-blue-500'
												: 'border-red-500 text-red-600'
										}`}
									/>
									<button
										type="button"
										onClick={togglePasswordVisibility}
										className="absolute right-3 text-gray-500 hover:text-gray-700">
										<FontAwesomeIcon
											icon={showPassword ? faEyeSlash : faEye}
											className="h-5 w-5"
										/>
									</button>
								</div>
								{!validPass && touched.password && (
									<p className="text-red-500 text-xs mt-1">Invalid password</p>
								)}
							</div>
							{/* Actions */}
							<div className="flex justify-between items-center">
								<button
									onClick={handleForgotPasswordClick}
									className="text-sm text-blue-950 hover:text-blue-800 hover:underline">
									Forgot Password?
								</button>
							</div>

							{/* Submit Button */}
							<button
								onClick={onSubmitClick}
								className="w-full bg-blue-950 text-white py-3 rounded-lg hover:bg-blue-900 transition-colors duration-300 font-semibold">
								Sign In
							</button>

							{/* Mobile Create Account */}
							<div className="md:hidden text-center">
								<div className="flex items-center justify-center my-4">
									<div className="flex-grow border-t border-gray-300"></div>
									<span className="px-4 text-gray-500 text-sm">or</span>
									<div className="flex-grow border-t border-gray-300"></div>
								</div>
								<button
									onClick={setRegister}
									className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300">
									Create New Account
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side Panel */}
				<div className="bg-[#0b1933] w-[45%] flex-col md:flex justify-center items-center hidden">
					<div className="flex justify-center items-center">
						<div className="absolute -translate-y-36">
							<div className="w-56 h-56 xl:w-80 xl:h-80 opacity-50">
								<img src="/images/lesgologo.png" alt="LesGo Logo" />
							</div>
						</div>
						<div className="z-10 -translate-y-28 text-center">
							<div className="text-white font-inter font-semibold text-2xl flex justify-center gap-1">
								<p>New to</p> <p className="text-amber-400 animate-pulse">Queue Ease?</p>
							</div>
							<p className="text-white/70 text-sm translate-y-3">
								Sign up and new opportunities await you!
							</p>
						</div>
					</div>
					<div>
						<button
							onClick={setRegister}
							className="hover:bg-gray-100 hover:-translate-y-2 hover:pt-3 bg-white py-3 px-12 rounded-lg text-sm font-inter duration-700">
							Create new Account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
