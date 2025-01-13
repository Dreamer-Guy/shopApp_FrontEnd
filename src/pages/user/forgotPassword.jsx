import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { forgotPassword, verifyResetToken, resetPassword } from '@/store/user/userSlice.js'

const isValidPassword = (password) => {
    if (password.length < 6) return false;
    
    if (!/[a-zA-Z]/.test(password)) return false;
    
    if (!/[0-9]/.test(password)) return false;
    
    return true;
};

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: enter email, 2: enter code, 3: enter new password

    const [isLoading, setIsLoading] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        try {
            await dispatch(forgotPassword(email)).unwrap();
            toast({
                title: "Success",
                description: "Verification code has been sent to your email",
                className: "bg-green-500 text-white",
                duration: 3000
            });
            setStep(2);
        } catch (error) {
            let errorMessage = "An error occurred";
            
            if (error.includes("Email does not exist")) {
                errorMessage = "Email does not exist in the system";
            } else if (error.includes("Unable to send email")) {
                errorMessage = "Unable to send verification email";
            }
            
            toast({
                title: "Error",
                description: errorMessage,
                className: "bg-red-500 text-white",
                duration: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await dispatch(verifyResetToken({ 
                email, 
                token: verificationCode 
            })).unwrap();

            if (response.expired) {
                toast({
                    title: "Code Expired",
                    description: "Your verification code has expired. Please request a new one.",
                    className: "bg-red-500 text-white",
                    duration: 5000,
                    action: (
                        <button
                            onClick={handleResendCode}
                            className="bg-white text-red-500 px-3 py-1 rounded-md ml-2 hover:bg-red-50"
                            disabled={isLoading}
                        >
                            Resend Code
                        </button>
                    ),
                });
                return;
            }

            setStep(3);
        } catch (error) {
            let errorMessage = "Invalid verification code";
            
            if (error.includes("expired")) {
                errorMessage = "Your verification code has expired. Please request a new one.";
                toast({
                    title: "Code Expired",
                    description: errorMessage,
                    className: "bg-red-500 text-white",
                    duration: 5000,
                    action: (
                        <button
                            onClick={handleResendCode}
                            className="bg-white text-red-500 px-3 py-1 rounded-md ml-2 hover:bg-red-50"
                            disabled={isLoading}
                        >
                            Resend Code
                        </button>
                    ),
                });
            } else {
                toast({
                    title: "Error",
                    description: errorMessage,
                    className: "bg-red-500 text-white",
                    duration: 3000
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        try {
            await dispatch(forgotPassword(email)).unwrap();
            setVerificationCode(''); // Reset verification code input
            toast({
                title: "Success",
                description: "New verification code has been sent to your email",
                className: "bg-green-500 text-white",
                duration: 3000
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send new verification code",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (!isValidPassword(newPassword)) {
            toast({
                title: "Error",
                description: "Password must be at least 6 characters long and contain both letters and numbers!",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
            return;
        }
        
        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                className: "bg-red-500 text-white",
                duration: 3000
            });
            return;
        }
        
        try {
            await dispatch(resetPassword({ 
                email: email,
                token: verificationCode.toString(),
                newPassword: newPassword 
            })).unwrap();
            
            toast({
                title: "Success",
                description: "Password reset successful",
                className: "bg-green-500 text-white",
                duration: 3000
            });
            navigate('/user/login');
        } catch (error) {
            toast({
                title: "Error", 
                description: error?.message || "Unable to reset password",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
            
            {step === 1 && (
                <form onSubmit={handleSubmitEmail}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 flex items-center justify-center
                            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Send Verification Code'
                        )}
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyCode}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Verification Code</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                            maxLength={6}
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 flex items-center justify-center
                            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            'Verify Code'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleResendCode}
                        className="mt-2 w-full text-primary hover:underline text-sm"
                        disabled={isLoading}
                    >
                        Resend verification code
                    </button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
                    >
                        Reset Password
                    </button>
                </form>
            )}
            
            {step > 1 && (
                <button
                    onClick={() => setStep(step - 1)}
                    className="mt-4 text-primary hover:underline"
                >
                    Back
                </button>
            )}
        </div>
    );
}

export default ForgotPasswordPage;
