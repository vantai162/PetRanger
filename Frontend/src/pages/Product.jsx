import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'food', name: 'Thực phẩm & Món ăn vặt' },
    { id: 'toys', name: 'Đồ chơi' },
    { id: 'accessories', name: 'Phụ kiện' },
    { id: 'health', name: 'Sức khỏe & Làm đẹp' },
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Dog Food',
      category: 'food',
      price: 49.99,
      rating: 4.8,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1655210913315-e8147faf7600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmb29kJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc1NDAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'High-quality nutrition for adult dogs',
    },
    {
      id: 2,
      name: 'Interactive Cat Toy',
      category: 'toys',
      price: 19.99,
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1770751857462-4954bffba866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwbGF5aW5nJTIwdG95c3xlbnwxfHx8fDE3NzU0NTY4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Keep your cat entertained for hours',
    },
    {
      id: 3,
      name: 'Pet Collar & Leash Set',
      category: 'accessories',
      price: 29.99,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0b3lzJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzc1NDAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Durable and stylish walking set',
    },
    {
      id: 4,
      name: 'Organic Cat Food',
      category: 'food',
      price: 39.99,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1655210913315-e8147faf7600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmb29kJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc1NDAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Natural ingredients for feline health',
    },
    {
      id: 5,
      name: 'Dental Chew Treats',
      category: 'health',
      price: 24.99,
      rating: 4.8,
      reviews: 321,
      image: 'https://images.unsplash.com/photo-1655210913315-e8147faf7600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmb29kJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc1NDAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Promotes dental health and fresh breath',
    },
    {
      id: 6,
      name: 'Plush Dog Toy Bundle',
      category: 'toys',
      price: 34.99,
      rating: 4.9,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0b3lzJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzc1NDAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Set of 5 soft and squeaky toys',
    },
    {
      id: 7,
      name: 'Pet Grooming Kit',
      category: 'accessories',
      price: 44.99,
      rating: 4.7,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0b3lzJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzc1NDAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Complete grooming tools set',
    },
    {
      id: 8,
      name: 'Vitamin Supplements',
      category: 'health',
      price: 32.99,
      rating: 4.6,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1655210913315-e8147faf7600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmb29kJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc1NDAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Essential vitamins for overall health',
    },
    {
      id: 9,
      name: 'Training Treats',
      category: 'food',
      price: 16.99,
      rating: 4.8,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1655210913315-e8147faf7600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmb29kJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc1NDAzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Perfect for positive reinforcement',
    },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#98CE00] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Sản Phẩm</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Sản phẩm chất lượng cao cho thú cưng của bạn - từ thức ăn, đồ chơi đến phụ kiện và chăm sóc sức khỏe.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#6ccff6] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-[#98CE00]">${product.price}</span>
                    <button className="bg-[#98CE00] hover:bg-[#8AB800] text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="text-xl mb-2">Free Shipping</h3>
              <p className="text-gray-600">Cho đơn hàng trên 500k</p>
            </div>
            <div>
              <div className="text-3xl mb-2">↩️</div>
              <h3 className="text-xl mb-2">Easy Returns</h3>
              <p className="text-gray-600">Chính sách hoàn trả 30 ngày</p>
            </div>
            <div>
              <div className="text-3xl mb-2">✨</div>
              <h3 className="text-xl mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Sản phẩm cao cấp chỉ có tại PetRanger</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}