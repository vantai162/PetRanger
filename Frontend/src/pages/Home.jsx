import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Clock, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Home() {
  const services = [
    {
      title: 'Pet Grooming',
      description: 'Professional grooming services to keep your pet looking their best.',
      image:
        'https://images.unsplash.com/photo-1719464454959-9cf304ef4774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBncm9vbWluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzc1NDYwMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Veterinary Care',
      description: 'Comprehensive health care services by experienced veterinarians.',
      image:
        'https://images.unsplash.com/photo-1654895716780-b4664497420d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3NTM5NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Pet Boarding',
      description: 'Safe and comfortable accommodation when you need to be away.',
      image:
        'https://images.unsplash.com/photo-1743763959056-41bbb557272d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBib2FyZGluZyUyMGtlbm5lbHxlbnwxfHx8fDE3NzU0NjAyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'PawfectCare has been amazing! My dog loves going there for grooming and the staff is so caring.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      text: 'The veterinary services are top-notch. Dr. Smith really cares about the animals and takes time to explain everything.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      text: 'I board my cat here whenever I travel. The facilities are clean and I can see she is well taken care of.',
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1692145520080-3e72e0f3c4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBldCUyMHN0b3JlfGVufDF8fHx8MTc3NTQ1Njg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Happy pets"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl mb-6 max-w-2xl">
            Complete Care for Your Beloved Pets
          </h1>
          <p className="text-xl mb-8 max-w-xl">
            From grooming to veterinary services, we provide everything your pet needs to live their best life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="bg-[#98CE00] hover:bg-[#98CE00] text-white px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              Our Services
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-colors border border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Why Choose PawfectCare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98CE00]/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-[#98CE00]" />
              </div>
              <h3 className="text-xl mb-2">Chăm sóc tuyệt tình</h3>
              <p className="text-gray-600">
                Our team genuinely loves animals and treats every pet like family.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98CE00]/10 rounded-full mb-4">
                <Shield className="w-8 h-8 text-[#98CE00]" />
              </div>
              <h3 className="text-xl mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                State-of-the-art facilities with the highest safety standards.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98CE00]/10 rounded-full mb-4">
                <Clock className="w-8 h-8 text-[#98CE00]" />
              </div>
              <h3 className="text-xl mb-2">Flexible Hours</h3>
              <p className="text-gray-600">
                Extended hours to accommodate your busy schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Our Services</h2>
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
                    className="text-[#98CE00] hover:text-[#98CE00] inline-flex items-center gap-1 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-[#98CE00] hover:bg-[#98CE00] text-white px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">What Our Clients Say</h2>
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
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Give Your Pet the Best Care?</h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule an appointment or visit our store today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#98CE00] hover:bg-gray-100 px-8 py-3 rounded-lg transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              to="/products"
              className="bg-[#98CE00] hover:bg-[#98CE00] text-white px-8 py-3 rounded-lg transition-colors"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
