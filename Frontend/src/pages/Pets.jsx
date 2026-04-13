import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, MapPin, Heart, Info } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { createPet, getPets, getPetById } from '../services/petService';



export default function Pets() {
  const [pets, setPets] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newPet, setNewPet] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    color: '',
    status: 'available',
    arrivedDate: new Date().toISOString().split('T')[0],
    description: '',
    images: ['https://images.unsplash.com/photo-1692145520080-3e72e0f3c4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBldCUyMHN0b3JlfGVufDF8fHx8MTc3NTQ1Njg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    price: 0,
  });

  const formatCurrencyVND = (value) => {
    if (typeof value !== 'number') return value;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Nếu backend có filter thì truyền object filter vào đây
        const petsFromApi = await getPets({});
        setPets(petsFromApi);
      } catch (err) {
        console.error("Get pets error:", err);
        alert(err.message || "Lấy danh sách thú cưng thất bại");
      }
    };

    fetchPets();
  }, []);

  const handleAddPet = async (e ) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập trước khi thêm thú cưng");
        return;
      }
      let processedPet = { ...newPet };
      if (processedPet.gender === 'Đực') {
        processedPet.gender = 'male';
      }
      else if (processedPet.gender === 'Cái') {
        processedPet.gender = 'female';
      }
      else{
        processedPet.gender = 'binary';
      }
      // Parse age to number
      processedPet.age = parseInt(processedPet.age) || 0;
      const res = await createPet(processedPet, token);
      const createdPet = res.pet;
      setPets((prev) => [...prev, createdPet]);
      setShowAddModal(false);
      setNewPet({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        color: '',
        status: 'available',
        arrivedDate: new Date().toISOString().split('T')[0],
        description: '',
        image: 'https://images.unsplash.com/photo-1692145520080-3e72e0f3c4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBldCUyMHN0b3JlfGVufDF8fHx8MTc3NTQ1Njg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        price: 0,
      });
    } catch (error) {
      console.error("Add pet error:", error);
      alert(error.message);
    }

  };

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || pet.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getGenderText = (gender) => {
    switch (gender) {
      case 'male': return 'Đực';
      case 'female': return 'Cái';
      case 'binary': return 'Song tính';
      default: return gender;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-[#e7f5b3] text-[#98ce00]';
      case 'adopted': return 'bg-gray-100 text-gray-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Có sẵn';
      case 'sold': return 'Đã nhận nuôi';
      case 'reserved': return 'Đã đặt trước';
      default: return status;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#98ce00] to-[#98ce00] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl mb-4">Quản Lý Thú Cưng</h1>
              <p className="text-xl opacity-90">
                Danh sách các thú cưng đang có mặt tại cửa hàng
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white text-[#98ce00] hover:bg-gray-100 px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Thêm Thú Cưng
            </button>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, loài, giống..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="available">Có sẵn</option>
                <option value="reserved">Đã đặt trước</option>
                <option value="sold">Đã nhận nuôi</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl text-orange-500 mb-1">{pets.length}</div>
              <div className="text-sm text-gray-600">Tổng số thú cưng</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl text-[#98ce00] mb-1">
                {pets.filter(p => p.status === 'available').length}
              </div>
              <div className="text-sm text-gray-600">Có sẵn</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl text-yellow-600 mb-1">
                {pets.filter(p => p.status === 'reserved').length}
              </div>
              <div className="text-sm text-gray-600">Đã đặt trước</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl text-gray-600 mb-1">
                {pets.filter(p => p.status === 'sold').length}
              </div>
              <div className="text-sm text-gray-600">Đã nhận nuôi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pets Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không tìm thấy thú cưng nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedPet(pet)}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={pet.images?.[0] || newPet.image}
                      alt={pet.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm ${getStatusColor(pet.status)}`}>
                      {getStatusText(pet.status)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl mb-2">{pet.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p><span className="font-medium">Loài:</span> {pet.species}</p>
                      <p><span className="font-medium">Giống:</span> {pet.breed}</p>
                      <p><span className="font-medium">Tuổi:</span> {pet.age} tháng</p>
                      <p><span className="font-medium">Giới tính:</span> {getGenderText(pet.gender)}</p>
                    </div>
                    {pet.price && pet.price > 0 && (
                      <div className="text-xl text-[#98ce00] mb-3">
                        {formatCurrencyVND(pet.price)}
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPet(pet);
                      }}
                      className="w-full bg-[#98ce00] hover:opacity-90 text-white py-2 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Info className="w-4 h-4" />
                      Chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Pet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">Thêm Thú Cưng Mới</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleAddPet} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên thú cưng *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPet.name}
                      onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                      placeholder="VD: Max"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loài *
                    </label>
                    <select
                      required
                      value={newPet.species}
                      onChange={(e) => setNewPet({...newPet, species: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                    >
                      <option value="">Chọn loài</option>
                      <option value="Chó">Chó</option>
                      <option value="Mèo">Mèo</option>
                      <option value="Thỏ">Thỏ</option>
                      <option value="Chim">Chim</option>
                      <option value="Hamster">Hamster</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giống *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPet.breed}
                      onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                      placeholder="VD: Golden Retriever"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tuổi (tháng) *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPet.age}
                      onChange={(e) => setNewPet({...newPet, age: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                      placeholder="VD: 6 tháng"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giới tính *
                    </label>
                    <select
                      required
                      value={newPet.gender}
                      onChange={(e) => setNewPet({...newPet, gender: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Đực">Đực</option>
                      <option value="Cái">Cái</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Màu sắc *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPet.color}
                      onChange={(e) => setNewPet({...newPet, color: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                      placeholder="VD: Vàng"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày đến *
                    </label>
                    <input
                      type="date"
                      required
                      value={newPet.arrivedDate}
                      onChange={(e) => setNewPet({...newPet, arrivedDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá (VNĐ)
                    </label>
                    <input
                      type="number"
                      value={newPet.price}
                      onChange={(e) => setNewPet({...newPet, price: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trạng thái *
                    </label>
                    <select
                      required
                      value={newPet.status}
                      onChange={(e) => setNewPet({...newPet, status: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                    >
                      <option value="available">Có sẵn</option>
                      <option value="reserved">Đã đặt trước</option>
                      <option value="sold">Đã nhận nuôi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Hình ảnh
                    </label>
                    <input
                      type="url"
                      value={newPet.image}
                      onChange={(e) => setNewPet({...newPet, image: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả *
                  </label>
                  <textarea
                    required
                    value={newPet.description}
                    onChange={(e) => setNewPet({...newPet, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6ccff6] focus:border-transparent outline-none resize-none"
                    placeholder="Mô tả về thú cưng..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#6ccff6] hover:bg-[#6ccff6]/90 text-white py-3 rounded-lg transition-colors"
                  >
                    Thêm Thú Cưng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Pet Detail Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <ImageWithFallback
                src={selectedPet.images?.[0] || selectedPet.image}
                alt={selectedPet.name}
                className="w-full h-80 object-cover"
              />
              <button
                onClick={() => setSelectedPet(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
              <div className={`absolute top-4 left-4 px-4 py-2 rounded-full ${getStatusColor(selectedPet.status)}`}>
                {getStatusText(selectedPet.status)}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl mb-2">{selectedPet.name}</h2>
                  <p className="text-gray-600">{selectedPet.species} • {selectedPet.breed}</p>
                </div>
                {selectedPet.price && selectedPet.price > 0 && (
                  <div className="text-3xl text-[#98ce00]">
                    {formatCurrencyVND(selectedPet.price)}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tuổi</p>
                  <p className="font-medium">{selectedPet.age} tháng</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Giới tính</p>
                  <p className="font-medium">{getGenderText(selectedPet.gender)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Màu sắc</p>
                  <p className="font-medium">{selectedPet.color}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Ngày đến</p>
                  <p className="font-medium">
                    {new Date(selectedPet.arrived_date).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Mô tả</h3>
                <p className="text-gray-600">{selectedPet.description}</p>
              </div>

              {selectedPet.status === 'available' && (
                <div className="flex gap-4">
                  <button className="flex-1 bg-[#98ce00] hover:opacity-90 text-white py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Nhận nuôi
                  </button>
                  <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-colors">
                    Đặt trước
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}