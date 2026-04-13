
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersByCustomer } from '../services/orderService';

export default function Orders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (!token || !storedUser) {
			navigate('/login');
			return;
		}

		let user;
		try {
			user = JSON.parse(storedUser);
		} catch {
			navigate('/login');
			return;
		}

		// Cần customerId để gọi API orders theo customer
		if (!user.customerId) {
			// user cũ chưa có customerId trong localStorage -> yêu cầu đăng nhập lại
			navigate('/login');
			return;
		}

		const fetchOrders = async () => {
			try {
				const data = await getOrdersByCustomer(user.customerId, token);
				setOrders(data);
			} catch (err) {
				setError(err.message || 'Không thể tải danh sách đơn hàng');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [navigate]);

	const formatCurrency = (value) => {
		if (typeof value !== 'number') return value;
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
	};

	const formatDateTime = (value) => {
		if (!value) return '';
		return new Date(value).toLocaleString('vi-VN');
	};

	const getStatusBadgeClass = (status) => {
		switch (status) {
			case 'paid':
				return 'bg-green-100 text-green-700';
			case 'delivered':
				return 'bg-blue-100 text-blue-700';
			case 'cancelled':
				return 'bg-red-100 text-red-700';
			default:
				return 'bg-yellow-100 text-yellow-700';
		}
	};

	if (loading) {
		return (
			<div className="max-w-5xl mx-auto px-4 py-12">
				<p className="text-center text-gray-600">Đang tải danh sách đơn hàng...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-5xl mx-auto px-4 py-12">
				<p className="text-center text-red-600">{error}</p>
			</div>
		);
	}

	if (!orders.length) {
		return (
			<div className="max-w-5xl mx-auto px-4 py-12">
				<h1 className="text-2xl font-semibold mb-4">Đơn hàng của tôi</h1>
				<div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-600">
					Bạn chưa có đơn hàng nào.
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-12">
			<h1 className="text-2xl font-semibold mb-6">Đơn hàng của tôi</h1>
			<div className="space-y-4">
				{orders.map((order) => (
					<div
						key={order._id}
						className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow"
					>
						<div className="flex flex-wrap items-center justify-between gap-3 mb-3">
							<div>
								<p className="text-sm text-gray-500">Mã đơn</p>
								<p className="font-medium text-gray-800">{order._id}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Ngày đặt</p>
								<p className="text-gray-800">{formatDateTime(order.created_at || order.createdAt)}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Trạng thái</p>
								<span
									className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
										order.status
									)}`}
								>
									{order.status}
								</span>
							</div>
							<div className="text-right">
								<p className="text-sm text-gray-500">Tổng tiền</p>
								<p className="font-semibold text-[#98CE00]">{formatCurrency(order.total_amount)}</p>
							</div>
						</div>

						<div className="border-t border-gray-100 mt-3 pt-3">
							<p className="text-sm text-gray-500 mb-1">Sản phẩm / Thú cưng</p>
							<ul className="text-sm text-gray-700 space-y-1">
								{order.items?.map((item, index) => (
									<li key={index} className="flex justify-between">
										<span>
											{index + 1}. {item.name}
										</span>
										<span>
											x{item.qty} &middot; {formatCurrency(item.unit_price)}
										</span>
									</li>
								))}
							</ul>
						</div>

						{order.payment_method && (
							<div className="mt-3 text-sm text-gray-500">
								Phương thức thanh toán: <span className="text-gray-700">{order.payment_method}</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

