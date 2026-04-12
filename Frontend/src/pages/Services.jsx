import { Scissors, Stethoscope, Home, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getAllServices } from '../services/serviceService';
import { useEffect, useState } from 'react';

export default function Services() {
  const [services, setServices] = useState([]);
  const ICONS_BY_TYPE = {
    grooming: Scissors,
    training: GraduationCap,
    boarding: Home,
    vet: Stethoscope,
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchServices();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#98CE00] to-[#98CE00] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Dịch Vụ</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Tại PetRanger, chúng tôi cung cấp dịch vụ chăm sóc thú cưng toàn diện với tình yêu và sự tận tâm. Khám phá các dịch vụ của chúng tôi để mang lại trải nghiệm tốt nhất cho thú cưng của bạn.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = ICONS_BY_TYPE[service.type];
              return (
                <div
                  key={service.title}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 items-center`}
                >
                  <div className="flex-1">
                    <ImageWithFallback
                      src={service.images[0]}
                      alt={service.title}
                      className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#98CE00]/10 rounded-full mb-4">
                      <Icon className="w-6 h-6 text-[#98CE00]" />
                    </div>
                    <h2 className="text-3xl mb-4">{service.title}</h2>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">What's Included:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#98CE00] rounded-full" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl text-[#98CE00]">From ${service.price.toFixed(2)}</span>
                      <button className="bg-[#98CE00] hover:bg-[#7BA800] text-white px-6 py-2 rounded-lg transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Cần hỗ trợ?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Chúng tôi luôn sẵn sàng giúp đỡ bạn với bất kỳ câu hỏi nào về dịch vụ của chúng tôi hoặc để đặt lịch hẹn cho thú cưng của bạn. Hãy liên hệ với chúng tôi ngay hôm nay!
          </p>
          <button className="bg-[#98CE00] hover:bg-[#7BA800] text-white px-8 py-3 rounded-lg transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
