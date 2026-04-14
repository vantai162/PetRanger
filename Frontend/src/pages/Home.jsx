import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Clock, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Home() {
  const services = [
    {
      title: 'Chăm sóc lông',
      description: 'Dịch vụ làm đẹp chuyên nghiệp để giữ cho thú cưng của bạn luôn trông tốt nhất.',
      image:
        'https://images.unsplash.com/photo-1719464454959-9cf304ef4774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBncm9vbWluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzc1NDYwMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Chăm sóc thú y',
      description: 'Dịch vụ chăm sóc sức khỏe toàn diện do các bác sĩ thú y có kinh nghiệm cung cấp.',
      image:
        'https://images.unsplash.com/photo-1654895716780-b4664497420d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3NTM5NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Chỗ ở cho thú cưng',
      description: 'Nơi lưu trú an toàn và thoải mái khi bạn cần đi vắng.',
      image:
        'https://images.unsplash.com/photo-1743763959056-41bbb557272d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBib2FyZGluZyUyMGtlbm5lbHxlbnwxfHx8fDE3NzU0NjAyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const testimonials = [
    {
      name: 'Ted Hoang',
      text: 'PetRanger thật tuyệt! Mấy con chó của tôi luôn được chăm sóc tốt nhất. Đội ngũ rất thân thiện và chuyên nghiệp.',
      rating: 5,
    },
    {
      name: 'Hiruguma Uchiha',
      text: '獣医療サービスは最高レベルです。スタッフは動物たちを心から大切に思っていて、すべてを丁寧に説明してくれます。',
      rating: 5,
    },
    {
      name: 'Thomas Muller',
      text: 'I board my cat here whenever I travel. The facilities are clean and I can see she is well taken care of.',
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
        <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/pet-hero.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl mb-6 max-w-3xl">
            Chăm sóc thú cưng hoàn hảo
          </h1>
          <p className="text-xl mb-8 max-w-xl">
            Tại PetRanger, chúng tôi cung cấp dịch vụ chăm sóc thú cưng toàn diện với tình yêu và sự tận tâm.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="bg-[#98CE00] hover:bg-[#7BA800] text-white px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              Dịch vụ
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-colors border border-white/30"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Tại sao chọn PetRanger?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98CE00]/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-[#98CE00]" />
              </div>
              <h3 className="text-xl mb-2">Chăm sóc tận tình</h3>
              <p className="text-gray-600">
                Đội ngũ yêu thương và chăm sóc từng thú cưng như chính của mình.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98CE00]/10 rounded-full mb-4">
                <Shield className="w-8 h-8 text-[#98CE00]" />
              </div>
              <h3 className="text-xl mb-2">An toàn & Bảo mật</h3>
              <p className="text-gray-600">
                Các cơ sở hiện đại với tiêu chuẩn an toàn cao nhất.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98CE00]/10 rounded-full mb-4">
                <Clock className="w-8 h-8 text-[#98CE00]" />
              </div>
              <h3 className="text-xl mb-2">Giờ làm việc linh hoạt</h3>
              <p className="text-gray-600">
                Giờ mở cửa rộng để phù hợp với lịch trình bận rộn của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Dịch vụ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    to="/services"
                    className="text-[#98CE00] hover:text-[#7BA800] inline-flex items-center gap-1 transition-colors"
                  >
                    Tìm hiểu thêm
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-[#98CE00] hover:bg-[#7BA800] text-white px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              Xem tất cả dịch vụ
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Ý kiến của khách hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#98CE00] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Bạn đã sẵn sàng chưa?</h2>
          <p className="text-xl mb-8 opacity-90">
            Đặt lịch hẹn hoặc mua sắm sản phẩm cho thú cưng của bạn ngay hôm nay để trải nghiệm dịch vụ tuyệt vời tại PetRanger!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#98CE00] hover:bg-gray-100 px-8 py-3 rounded-lg transition-colors"
            >
              Đặt lịch hẹn
            </Link>
            <Link
              to="/products"
              className="bg-[#7BA800] hover:bg-[#587506] text-white px-8 py-3 rounded-lg transition-colors"
            >
              Mua sắm sản phẩm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
