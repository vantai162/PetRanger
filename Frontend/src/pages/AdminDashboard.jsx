import {
  BarChart3,
  Users,
  PawPrint,
  ShoppingBag,
  CircleDollarSign,
  Clock3,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {getAllUsers} from '../services/userService';
import {getPets} from '../services/petService';
import {getAllOrders} from '../services/orderService';

const summaryByMonth = [
  { month: 'T1', orders: 14, revenue: 9200000 },
  { month: 'T2', orders: 18, revenue: 12400000 },
  { month: 'T3', orders: 16, revenue: 11100000 },
  { month: 'T4', orders: 22, revenue: 15900000 },
  { month: 'T5', orders: 28, revenue: 20100000 },
  { month: 'T6', orders: 24, revenue: 18300000 },
];


const statusMap = {
  paid: { label: 'Đã thanh toán', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Chờ xử lý', color: 'bg-amber-100 text-amber-700' },
  delivered: { label: 'Đã giao', color: 'bg-sky-100 text-sky-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-rose-100 text-rose-700' },
};

const userStatusMap = {
  verified: { label: 'Đã xác thực', color: 'bg-emerald-100 text-emerald-700' },
  unverified: { label: 'Chưa xác thực', color: 'bg-amber-100 text-amber-700' },
};

const petStatusMap = {
  available: { label: 'Có sẵn', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Chờ xử lý', color: 'bg-amber-100 text-amber-700' },
  reserved: { label: 'Đã giữ chỗ', color: 'bg-sky-100 text-sky-700' },
  sold: { label: 'Đã bán', color: 'bg-rose-100 text-rose-700' },
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);

const formatDateTime = (value) => {
  if (!value) return '-';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleString('vi-VN');
};

function KpiCard({ icon: Icon, title, value, subtitle, tone }) {
  return (
    <article className={`rounded-2xl p-5 shadow-sm border border-white/40 ${tone}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">{title}</p>
        <Icon className="w-5 h-5 text-slate-700" />
      </div>
      <p className="text-3xl font-semibold mt-3 text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
    </article>
  );
}

function StatusPill({ map, value }) {
  const badge = map[value] || { label: value, color: 'bg-slate-100 text-slate-700' };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
      {badge.label}
    </span>
  );
}

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsersLoading(true);
        setUsersError('');

        const userData = await getAllUsers();
        setUsers(Array.isArray(userData) ? userData : []);
      } catch (error) {
        setUsersError(error.message || 'Không thể tải danh sách users');
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petData = await getPets();
        setPets(Array.isArray(petData) ? petData : []);
      } catch (error) {
        console.error('Error fetching pets:', error);
        }
    };

    fetchPets();
  }, []);

  useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderData = await getAllOrders();
                setOrders(Array.isArray(orderData) ? orderData : []);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);



  const normalizedUsers = users.map((user) => ({
    id: user._id || user.id || user.email,
    name: user.name || '-',
    email: user.email || '-',
    role: user.role || 'customer',
    joinedAt: formatDateTime(user.created_at || user.createdAt),
    status: user.isVerified ? 'verified' : 'unverified',
  }));

  const normalizedPets = pets.map((pet) => ({
    id: pet._id || pet.id,
    name: pet.name || '-',
    species: pet.species || '-',
    breed: pet.breed || '-',
    owner: pet.owner || '-',
    age: pet.age ?? '-',
    status: pet.status || 'pending',
  }));

  const normalizedOrders = orders.map((order) => {
    const itemCount = Array.isArray(order.items)
      ? order.items.reduce((sum, item) => sum + (item.qty || 0), 0)
      : 0;

    return {
      id: order._id || order.id,
      user: order.customer_id || order.user || '-',
      itemCount,
      total: order.total_amount ?? order.total ?? 0,
      status: order.status || 'pending',
      createdAt: formatDateTime(order.created_at || order.createdAt),
    };
  });

  const countByStatus = normalizedOrders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    { paid: 0, pending: 0, delivered: 0, cancelled: 0 }
  );

  const totalOrders = normalizedOrders.length;
  const totalRevenue = normalizedOrders.reduce((sum, order) => sum + order.total, 0);
  const maxRevenue = Math.max(...summaryByMonth.map((month) => month.revenue));

  const paidPct = totalOrders ? Math.round((countByStatus.paid / totalOrders) * 100) : 0;
  const pendingPct = totalOrders ? Math.round((countByStatus.pending / totalOrders) * 100) : 0;
  const deliveredPct = totalOrders ? Math.round((countByStatus.delivered / totalOrders) * 100) : 0;

  const donutStyle = {
    background: `conic-gradient(#10b981 0% ${paidPct}%, #f59e0b ${paidPct}% ${paidPct + pendingPct}%, #0ea5e9 ${
      paidPct + pendingPct
    }% ${paidPct + pendingPct + deliveredPct}%, #f43f5e ${paidPct + pendingPct + deliveredPct}% 100%)`,
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[radial-gradient(circle_at_10%_20%,#cffafe_0%,#f8fafc_40%,#f1f5f9_100%)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-md p-6 md:p-8 shadow-xl shadow-cyan-100/40">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-cyan-700 font-semibold">
                <BarChart3 className="w-4 h-4" />
                Admin Dashboard
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mt-2">
                Tổng quan hệ thống PetRanger
              </h1>
              <p className="text-slate-600 mt-2">
                Bản thiết kế UI với dữ liệu demo, sẵn sàng để nối API sau.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-slate-200 text-sm text-slate-600 shadow-sm">
              <Clock3 className="w-4 h-4" />
              Cập nhật: 25/04/2026 11:30
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            <KpiCard
              icon={Users}
              title="Tổng users"
              value={normalizedUsers.length}
              subtitle="Toàn bộ tài khoản trong hệ thống"
              tone="bg-gradient-to-br from-cyan-100/80 to-cyan-50"
            />
            <KpiCard
              icon={PawPrint}
              title="Tổng pets"
              value={pets.length}
              subtitle="Đang quản lý trên nền tảng"
              tone="bg-gradient-to-br from-lime-100/80 to-lime-50"
            />
            <KpiCard
              icon={ShoppingBag}
              title="Tổng orders"
              value={totalOrders}
              subtitle="Gồm mọi trạng thái đơn"
              tone="bg-gradient-to-br from-amber-100/80 to-amber-50"
            />
            <KpiCard
              icon={CircleDollarSign}
              title="Doanh thu demo"
              value={formatCurrency(totalRevenue)}
              subtitle="Tổng giá trị các orders mẫu"
              tone="bg-gradient-to-br from-sky-100/80 to-sky-50"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Biểu đồ tóm tắt doanh thu</h2>
            <p className="text-sm text-slate-500 mt-1">Doanh thu theo tháng (mock data)</p>

            <div className="mt-5 h-64 flex items-end gap-3">
              {summaryByMonth.map((item) => {
                const height = Math.max(18, Math.round((item.revenue / maxRevenue) * 100));
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[11px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatCurrency(item.revenue)}
                    </div>
                    <div className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-cyan-300 shadow-[0_8px_18px_rgba(6,182,212,0.22)] transition-all duration-300 group-hover:brightness-105" style={{ height: `${height}%` }} />
                    <span className="text-xs font-medium text-slate-600">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Tỷ lệ trạng thái orders</h2>
            <p className="text-sm text-slate-500 mt-1">Phân bố đơn theo trạng thái</p>

            <div className="mt-6 flex items-center justify-center">
              <div className="relative w-44 h-44 rounded-full" style={donutStyle}>
                <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-slate-800">{totalOrders}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {Object.entries(countByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{statusMap[status].label}</span>
                  <span className="font-semibold text-slate-800">{count}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
          <h2 className="text-xl font-semibold text-slate-900">Tất cả users</h2>
          <p className="text-sm text-slate-500 mt-1">Danh sách tài khoản trong hệ thống</p>
          <table className="w-full min-w-[760px] mt-5 text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="py-3 pr-4 font-medium">User ID</th>
                <th className="py-3 pr-4 font-medium">Họ tên</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Role</th>
                <th className="py-3 pr-4 font-medium">Ngày tham gia</th>
                <th className="py-3 pr-4 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {usersLoading && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Đang tải danh sách users...
                  </td>
                </tr>
              )}

              {!usersLoading && usersError && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-rose-600">
                    {usersError}
                  </td>
                </tr>
              )}

              {!usersLoading && !usersError && !normalizedUsers.length && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Chưa có users nào trong hệ thống.
                  </td>
                </tr>
              )}

              {!usersLoading && !usersError && normalizedUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 pr-4 font-medium text-slate-700">{user.id}</td>
                  <td className="py-3 pr-4 text-slate-700">{user.name}</td>
                  <td className="py-3 pr-4 text-slate-600">{user.email}</td>
                  <td className="py-3 pr-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-cyan-100 text-cyan-700">{user.role}</span>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{user.joinedAt}</td>
                  <td className="py-3 pr-4">
                    <StatusPill map={userStatusMap} value={user.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
            <h2 className="text-xl font-semibold text-slate-900">Tất cả pets</h2>
            <p className="text-sm text-slate-500 mt-1">Danh sách thú cưng đã đăng ký</p>
            <table className="w-full min-w-[640px] mt-5 text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="py-3 pr-4 font-medium">Pet ID</th>
                  <th className="py-3 pr-4 font-medium">Tên</th>
                  <th className="py-3 pr-4 font-medium">Loài</th>
                  <th className="py-3 pr-4 font-medium">Giống</th>
                  <th className="py-3 pr-4 font-medium">Chủ sở hữu</th>
                  <th className="py-3 pr-4 font-medium">Tuổi</th>
                  <th className="py-3 pr-4 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {normalizedPets.map((pet) => (
                  <tr key={pet.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-4 font-medium text-slate-700">{pet.id}</td>
                    <td className="py-3 pr-4 text-slate-700">{pet.name}</td>
                    <td className="py-3 pr-4 text-slate-600">{pet.species}</td>
                    <td className="py-3 pr-4 text-slate-600">{pet.breed}</td>
                    <td className="py-3 pr-4 text-slate-600">{pet.owner}</td>
                    <td className="py-3 pr-4 text-slate-600">{pet.age}</td>
                    <td className="py-3 pr-4">
                      <StatusPill map={petStatusMap} value={pet.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
            <h2 className="text-xl font-semibold text-slate-900">Tất cả orders</h2>
            <p className="text-sm text-slate-500 mt-1">Danh sách đơn hàng toàn hệ thống</p>
            <table className="w-full min-w-[640px] mt-5 text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="py-3 pr-4 font-medium">Order ID</th>
                  <th className="py-3 pr-4 font-medium">User</th>
                  <th className="py-3 pr-4 font-medium">Items</th>
                  <th className="py-3 pr-4 font-medium">Tổng tiền</th>
                  <th className="py-3 pr-4 font-medium">Trạng thái</th>
                  <th className="py-3 pr-4 font-medium">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {normalizedOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-4 font-medium text-slate-700">{order.id}</td>
                    <td className="py-3 pr-4 text-slate-700">{order.user}</td>
                    <td className="py-3 pr-4 text-slate-600">{order.itemCount}</td>
                    <td className="py-3 pr-4 text-slate-700 font-medium">{formatCurrency(order.total)}</td>
                    <td className="py-3 pr-4">
                      <StatusPill map={statusMap} value={order.status} />
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{order.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </section>
      </div>
    </div>
  );
}