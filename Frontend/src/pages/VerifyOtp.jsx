import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { PawPrint, ArrowLeft } from "lucide-react";
import { verifyEmailOTP, verifyResetOTP } from "../services/authService";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function VerifyOTP() {
  const query = useQuery();
  const navigate = useNavigate();

  const type = query.get("type") || "signup"; // "signup" | "reset"
  const email = query.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isSignup = type === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!email) {
        setError("Thiếu email trong đường dẫn");
        return;
      }
      if (isSignup) {
        // Xác thực email khi đăng ký
        await verifyEmailOTP({ email, otp });
        alert("Xác thực email thành công, vui lòng đăng nhập!");
        navigate("/login");
      } else {
        // Xác thực OTP cho quên mật khẩu
        await verifyResetOTP({ email, otp });
        // Sau khi verify OTP quên mật khẩu, bạn có thể điều hướng đến trang đặt lại mật khẩu
        // Ví dụ:
        navigate('/reset-password?email=' + encodeURIComponent(email));
        alert("OTP hợp lệ, bạn có thể đặt lại mật khẩu.");
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = isSignup ? "Xác thực email" : "Nhập mã OTP";
  const description = isSignup
    ? `Chúng tôi đã gửi mã OTP đến ${email}. Vui lòng nhập mã để hoàn tất đăng ký.`
    : `Chúng tôi đã gửi mã OTP đặt lại mật khẩu đến ${email}. Vui lòng nhập mã để tiếp tục.`;

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

          {/* Back link */}
          <Link
            to={isSignup ? "/signup" : "/forgot-password"}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>

          {/* Title + description */}
          <div className="mb-8">
            <h1 className="text-3xl mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã OTP
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98CE00] focus:border-transparent outline-none tracking-[0.5em] text-center text-lg"
                placeholder="••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#98CE00] hover:bg-[#98CE00] disabled:opacity-60 text-white py-3 rounded-lg transition-colors font-medium"
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
            </button>

            {/* Gợi ý resend, bạn có thể nối với API resend sau */}
            <p className="text-sm text-gray-600 text-center">
              Không nhận được mã?{" "}
              <button
                type="button"
                onClick={() => alert("Gọi API resend OTP ở đây")}
                className="text-[#98CE00] hover:underline"
              >
                Gửi lại mã
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative bg-gradient-to-br from-[#98CE00] to-[#98CE00]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1684174914911-841eaca26151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
          alt="Cute puppy"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl mb-4">
            Bảo vệ tài khoản của bạn
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Chỉ cần một bước xác thực nhỏ để giữ an toàn cho tài khoản và thú cưng của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}