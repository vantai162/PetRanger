import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, MapPin, Heart, Info } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { createPet, getPets, getPetById } from '../services/petService';



export default function Pets() {
  const [pets, setPets] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [adoptionStep, setAdoptionStep] = useState(1);
  const [showAdoptionSuccess, setShowAdoptionSuccess] = useState(false);
  const [adoptionForm, setAdoptionForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    livingType: '',
    allowPets: '',
    livingSpace: '',
    hasYard: '',
    hasExperience: '',
    hasOtherPets: '',
    dailyTime: '',
    oftenAway: '',
    willingFood: '',
    willingMedical: '',
    willingVaccine: '',
    reason: '',
    agreeNeuter: '',
    agreeVaccinate: '',
    longTermCommitment: '',
    cannotKeepPlan: '',
  });
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

  useEffect(() => {
    // Khi chọn thú cưng khác, reset slide ảnh về hình đầu tiên
    setCurrentImageIndex(0);
  }, [selectedPet]);

  const resetAdoptionForm = () => {
    setAdoptionForm({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      livingType: '',
      allowPets: '',
      livingSpace: '',
      hasYard: '',
      hasExperience: '',
      hasOtherPets: '',
      dailyTime: '',
      oftenAway: '',
      willingFood: '',
      willingMedical: '',
      willingVaccine: '',
      reason: '',
      agreeNeuter: '',
      agreeVaccinate: '',
      longTermCommitment: '',
      cannotKeepPlan: '',
    });
    setAdoptionStep(1);
  };

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

  const selectedPetImages = selectedPet
    ? (Array.isArray(selectedPet.images) && selectedPet.images.length > 0
        ? selectedPet.images
        : selectedPet.image
          ? [selectedPet.image]
          : [])
    : [];

  const handleSubmitAdoption = (e) => {
    e.preventDefault();
    setShowAdoptionModal(false);
    resetAdoptionForm();
    setShowAdoptionSuccess(true);
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
                src={selectedPetImages[currentImageIndex] || selectedPet.image}
                alt={selectedPet.name}
                className="w-full h-80 object-cover"
              />
              {selectedPetImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        (prev - 1 + selectedPetImages.length) % selectedPetImages.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                  >
                    &#8249;
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        (prev + 1) % selectedPetImages.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                  >
                    &#8250;
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedPetImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full border border-white ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
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
                  <button
                    type="button"
                    onClick={() => setShowAdoptionModal(true)}
                    className="flex-1 bg-[#98ce00] hover:opacity-90 text-white py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Nhận nuôi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Adoption Form Modal */}
      {showAdoptionModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl mb-1">Đơn đăng ký nhận nuôi</h2>
                  {selectedPet && (
                    <p className="text-sm text-gray-600">Cho thú cưng: <span className="font-medium">{selectedPet.name}</span></p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdoptionModal(false);
                    resetAdoptionForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className={adoptionStep === 1 ? 'font-semibold text-[#98ce00]' : 'text-gray-500'}>Bước 1</span>
                <span className="text-gray-400">/</span>
                <span className={adoptionStep === 2 ? 'font-semibold text-[#98ce00]' : 'text-gray-500'}>Bước 2</span>
                <span className="text-gray-400">/</span>
                <span className={adoptionStep === 3 ? 'font-semibold text-[#98ce00]' : 'text-gray-500'}>Bước 3</span>
              </div>

              <form onSubmit={handleSubmitAdoption} className="space-y-4">
                {adoptionStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">1. Thông tin cá nhân cơ bản</h3>
                    <p className="text-sm text-gray-600">Để định danh và liên hệ với người nhận nuôi.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                        <input
                          type="text"
                          required
                          value={adoptionForm.fullName}
                          onChange={(e) => setAdoptionForm({ ...adoptionForm, fullName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                        <input
                          type="tel"
                          required
                          value={adoptionForm.phone}
                          onChange={(e) => setAdoptionForm({ ...adoptionForm, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={adoptionForm.email}
                          onChange={(e) => setAdoptionForm({ ...adoptionForm, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ hiện tại *</label>
                        <input
                          type="text"
                          required
                          value={adoptionForm.address}
                          onChange={(e) => setAdoptionForm({ ...adoptionForm, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {adoptionStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">2. Điều kiện nuôi</h3>
                    <p className="text-sm text-gray-600">Giúp đánh giá môi trường sống và khả năng chăm sóc thú cưng.</p>

                    <div className="space-y-3 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Môi trường sống *</label>
                        <select
                          required
                          value={adoptionForm.livingType}
                          onChange={(e) => setAdoptionForm({ ...adoptionForm, livingType: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                        >
                          <option value="">Chọn loại nơi ở</option>
                          <option value="house">Nhà riêng</option>
                          <option value="apartment">Chung cư</option>
                          <option value="rented">Thuê trọ</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nơi ở có cho phép nuôi thú không? *</label>
                          <select
                            required
                            value={adoptionForm.allowPets}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, allowPets: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="yes">Có</option>
                            <option value="no">Không</option>
                            <option value="unknown">Chưa rõ</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích sống *</label>
                          <select
                            required
                            value={adoptionForm.livingSpace}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, livingSpace: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="small">Nhỏ</option>
                            <option value="medium">Vừa</option>
                            <option value="large">Lớn</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Có sân / không gian ngoài trời không? *</label>
                          <select
                            required
                            value={adoptionForm.hasYard}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, hasYard: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="yes">Có</option>
                            <option value="no">Không</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bạn đã từng nuôi thú chưa? *</label>
                          <select
                            required
                            value={adoptionForm.hasExperience}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, hasExperience: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="yes">Đã từng</option>
                            <option value="no">Chưa từng</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hiện đang có thú cưng khác không? *</label>
                          <select
                            required
                            value={adoptionForm.hasOtherPets}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, hasOtherPets: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="yes">Có</option>
                            <option value="no">Không</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bạn có thể dành bao nhiêu thời gian mỗi ngày?</label>
                          <input
                            type="text"
                            required
                            value={adoptionForm.dailyTime}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, dailyTime: e.target.value })}
                            placeholder="VD: 2-3 giờ mỗi ngày"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bạn có thường xuyên đi công tác / vắng nhà không? *</label>
                          <select
                            required
                            value={adoptionForm.oftenAway}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, oftenAway: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="rarely">Hiếm khi</option>
                            <option value="sometimes">Thỉnh thoảng</option>
                            <option value="often">Thường xuyên</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bạn có sẵn sàng chi trả cho thức ăn, khám bệnh, vaccine? *</label>
                          <select
                            required
                            value={adoptionForm.willingFood}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, willingFood: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="yes">Có</option>
                            <option value="no">Không</option>
                            <option value="consider">Cân nhắc</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {adoptionStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">3. Mức độ cam kết</h3>
                    <p className="text-sm text-gray-600">Giúp đảm bảo thú cưng được chăm sóc lâu dài và có trách nhiệm.</p>

                    <div className="space-y-3 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bạn nhận nuôi vì lý do gì? *</label>
                        <textarea
                          required
                          rows={3}
                          value={adoptionForm.reason}
                          onChange={(e) => setAdoptionForm({ ...adoptionForm, reason: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bạn có đồng ý triệt sản (nếu cần)? *</label>
                          <select
                            required
                            value={adoptionForm.agreeNeuter}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, agreeNeuter: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="yes">Đồng ý</option>
                            <option value="no">Không đồng ý</option>
                            <option value="consider">Cân nhắc</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bạn có đồng ý tiêm phòng đầy đủ? *</label>
                          <select
                            required
                            value={adoptionForm.agreeVaccinate}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, agreeVaccinate: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="yes">Đồng ý</option>
                            <option value="no">Không đồng ý</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bạn có sẵn sàng chăm sóc lâu dài (5–10 năm)? *</label>
                          <select
                            required
                            value={adoptionForm.longTermCommitment}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, longTermCommitment: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none"
                          >
                            <option value="">Chọn</option>
                            <option value="yes">Có</option>
                            <option value="no">Không</option>
                            <option value="unsure">Chưa chắc</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nếu không thể nuôi nữa, bạn sẽ làm gì? *</label>
                          <textarea
                            required
                            rows={3}
                            value={adoptionForm.cannotKeepPlan}
                            onChange={(e) => setAdoptionForm({ ...adoptionForm, cannotKeepPlan: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98ce00] focus:border-transparent outline-none resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 mt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdoptionModal(false);
                      resetAdoptionForm();
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
                  >
                    Hủy
                  </button>
                  <div className="flex gap-3">
                    {adoptionStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setAdoptionStep((prev) => Math.max(1, prev - 1))}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Quay lại
                      </button>
                    )}
                    {adoptionStep < 3 ? (
                      <button
                        type="button"
                        onClick={() => setAdoptionStep((prev) => Math.min(3, prev + 1))}
                        className="px-4 py-2 rounded-lg bg-[#98ce00] text-white text-sm hover:bg-[#7BA800]"
                      >
                        Tiếp tục
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-[#98ce00] text-white text-sm hover:bg-[#7BA800]"
                      >
                        Gửi thông tin
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Adoption Success Toast */}
      {showAdoptionSuccess && (
        <div className="fixed bottom-6 right-6 z-[70]">
          <div className="bg-white border border-green-100 shadow-xl rounded-lg px-5 py-4 max-w-sm flex items-start gap-3">
            <div className="mt-1 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
              ✓
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-1">Gửi thông tin thành công</p>
              <p className="text-sm text-gray-600">
                Cảm ơn bạn đã đăng ký nhận nuôi. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdoptionSuccess(false)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <Plus className="w-5 h-5 rotate-45" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}