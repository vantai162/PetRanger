import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, PawPrint, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {resetPassword} from "../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ email });
      // Sau khi gửi OTP thành công, chuyển sang màn hình nhập OTP
      navigate(`/verify-otp?type=reset&email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Error occurred while resetting password:", error);
      alert("Có lỗi xảy ra: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 justify-center mb-8">
            <PawPrint className="w-10 h-10 text-[#98CE00]" />
            <span className="text-2xl font-semibold text-gray-900">PawfectCare</span>
          </Link>

          {!isSubmitted ? (
            <>
              {/* Back to Login */}
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại đăng nhập
              </Link>

              {/* Title */}
              <div className="mb-8">
                <h1 className="text-3xl mb-2">Quên mật khẩu?</h1>
                <p className="text-gray-600">
                  Đừng lo lắng! Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn để đặt lại mật khẩu.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98CE00] focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#98CE00] hover:bg-[#98CE00] text-white py-3 rounded-lg transition-colors font-medium"
                >
                  Gửi hướng dẫn đặt lại
                </button>
              </form>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-[#98CE00]/10 border border-[#98CE00]/40 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">💡 Mẹo:</span> Kiểm tra cả thư mục spam nếu bạn không thấy email trong vài phút.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98CE00]/10 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-[#98CE00]" />
                </div>
                
                <h1 className="text-3xl mb-4">Kiểm tra email của bạn</h1>
                <p className="text-gray-600 mb-8">
                  Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến <br />
                  <span className="font-medium text-gray-900">{email}</span>
                </p>

                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full bg-[#98CE00] hover:bg-[#98CE00] text-white py-3 rounded-lg transition-colors font-medium text-center"
                  >
                    Quay lại đăng nhập
                  </Link>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-colors font-medium text-center"
                  >
                    Gửi lại email
                  </button>
                </div>

                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Không nhận được email?</span><br />
                    Kiểm tra thư mục spam hoặc liên hệ hỗ trợ của chúng tôi.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative bg-gradient-to-br from-[#98CE00] to-[#98CE00]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1684174914911-841eaca26151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcHVwcHklMjBzbWlsaW5nfGVufDF8fHx8MTc3NTU2Nzk3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cute puppy"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl mb-4">
            Đừng lo lắng!<br />
            Chúng tôi sẽ giúp bạn
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Đặt lại mật khẩu chỉ mất vài phút. Bạn sẽ sớm quay lại chăm sóc thú cưng yêu quý của mình.
          </p>
        </div>
      </div>
    </div>
  );
}
