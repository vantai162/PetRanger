import { useState, useEffect } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getAllProducts, getProductById } from '../services/productService';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  
  const formatCurrencyVND = (value) => {
    if (typeof value !== 'number') return value;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };
  
  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'food', name: 'Thực phẩm & Món ăn vặt' },
    { id: 'toys', name: 'Đồ chơi' },
    { id: 'accessories', name: 'Phụ kiện' },
    { id: 'health', name: 'Sức khỏe & Làm đẹp' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log('Fetched products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleProductClick = async (productId) => {
    try {
      setIsLoadingProduct(true);
      const product = await getProductById(productId);
      setSelectedProduct(product);
      setIsProductModalOpen(true);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    } finally {
      setIsLoadingProduct(false);
    }
  };

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
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">Hãng: {product.brand}</p>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <p className="text-gray-500 text-sm mb-4">Số lượng: {product.stock}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-[#98CE00]">{formatCurrencyVND(product.price)}</span>
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

      {isProductModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <ImageWithFallback
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-80 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setIsProductModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-500 text-sm">{selectedProduct.category}</p>
                  <p className="text-gray-500 text-sm">Hãng: {selectedProduct.brand}</p>
                  <p className="text-gray-500 text-sm">Số lượng: {selectedProduct.stock}</p>
                </div>
                <span className="text-2xl text-[#98CE00]">{formatCurrencyVND(selectedProduct.price)}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm">{selectedProduct.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  ({selectedProduct.reviews} reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
              <button className="w-full bg-[#98CE00] hover:bg-[#8AB800] text-white py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      )}

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