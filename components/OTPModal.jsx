import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export function OTPModal({ isOpen, onClose, onVerify, email }) {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleVerify = () => {
        const otpString = otp.join('');
        if (otpString.length === 4) {
            onVerify(otpString);
        } else {
            setError('Please enter complete OTP');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-lg p-6 w-96">
                    <Dialog.Title className="text-lg font-bold">
                        Enter Verification Code
                    </Dialog.Title>
                    <p className="text-sm text-gray-600 mt-2">
                        We sent a code to {email}
                    </p>
                    <div className="flex gap-2 mt-4">
                        {[0, 1, 2, 3].map((index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center border rounded-lg"
                                value={otp[index]}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <button
                        onClick={handleVerify}
                        className="w-full bg-blue-600 text-white rounded-lg py-2 mt-4"
                    >
                        Verify
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}