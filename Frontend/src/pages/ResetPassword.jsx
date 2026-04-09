import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { PawPrint, ArrowLeft, Lock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { changePassword } from "../services/authService";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function ResetPassword() {
  const query = useQuery();
  const navigate = useNavigate();

  const email = query.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Thiếu email trong đường dẫn");
      return;
    }

    if (newPassword.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setIsSubmitting(true);
    try {
      await changePassword({ email, newPassword });
      alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
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

          {/* Back link */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại đăng nhập
          </Link>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Đặt lại mật khẩu</h1>
            <p className="text-gray-600">
              Nhập mật khẩu mới cho tài khoản
              {email && (
                <>
                  {" "}
                  <span className="font-medium text-gray-900">{email}</span>
                </>
              )}
              .
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu mới
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98CE00] focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Tối thiểu 8 ký tự</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98CE00] focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#98CE00] hover:bg-[#98CE00] disabled:opacity-60 text-white py-3 rounded-lg transition-colors font-medium"
            >
              {isSubmitting ? "Đang xử lý..." : "Đổi mật khẩu"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative bg-gradient-to-br from-[#98CE00] to-[#98CE00]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1509205477838-a534e43a849f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
          alt="Happy pets"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl mb-4">
            Mật khẩu mới, an toàn hơn
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Cập nhật mật khẩu giúp tài khoản của bạn luôn được bảo vệ tốt nhất.
          </p>
        </div>
      </div>
    </div>
  );
}
