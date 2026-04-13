import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, PawPrint,MailIcon } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { loginUser } from '../services/authService';

export default function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      const user = {
        id: res.userId,
        customerId: res.customerId,
        name: res.name ?? formData.email,
      };

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(user));
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      // Redirect sang trang dashboard hoặc trang chủ
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 justify-center mb-8">
            <PawPrint className="w-10 h-10 text-[#98CE00]" />
            <span className="text-2xl font-semibold text-gray-900">PetRanger</span>
          </Link>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Chào mừng trở lại!</h1>
            <p className="text-gray-600">Đăng nhập để tiếp tục quản lý thú cưng của bạn</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MailIcon className="w-5 h-5 text-red-500" />
              <span>Đăng nhập với Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MailIcon className="w-5 h-5 text-blue-600" />
              <span>Đăng nhập với Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">hoặc</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Login Form */}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98CE00] focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98CE00] focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#98CE00] border-gray-300 rounded focus:ring-[#98CE00]"
                />
                <span className="text-sm text-gray-700">Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#98CE00] hover:text-[#98CE00] transition-colors">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#98CE00] hover:bg-[#98CE00] text-white py-3 rounded-lg transition-colors font-medium"
            >
              Đăng nhập
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/signup" className="text-[#98CE00] hover:text-[#98CE00] font-medium transition-colors">
              Đăng ký ngay
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center mt-8 text-xs text-gray-500">
            Bằng cách đăng nhập, bạn đồng ý với{' '}
            <Link to="/terms" className="text-[#98CE00] hover:underline">
              Điều khoản sử dụng
            </Link>{' '}
            và{' '}
            <Link to="/privacy" className="text-[#98CE00] hover:underline">
              Chính sách bảo mật
            </Link>{' '}
            của chúng tôi.
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative bg-gradient-to-br from-green-400 to-green-600">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1509205477838-a534e43a849f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBldHMlMjB0b2dldGhlciUyMGRvZ3MlMjBjYXRzfGVufDF8fHx8MTc3NTU2NjYxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Happy pets"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl mb-4">
            Chăm sóc thú cưng<br />
            chưa bao giờ dễ dàng đến thế
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Quản lý lịch hẹn, theo dõi sức khỏe và kết nối với các dịch vụ chăm sóc thú cưng tốt nhất.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl mb-2">🐕</div>
              <p className="text-sm">500+ thú cưng</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-sm">Đánh giá 5 sao</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💚</div>
              <p className="text-sm">Chăm sóc tận tâm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
