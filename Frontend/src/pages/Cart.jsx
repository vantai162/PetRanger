import { useEffect, useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';

export default function Cart() {
	const [items, setItems] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const formatCurrencyVND = (value) => {
		if (typeof value !== 'number') return value;
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(value);
	};

	useEffect(() => {
		try {
			const raw = localStorage.getItem('cartItems');
			const parsed = raw ? JSON.parse(raw) : [];
			if (Array.isArray(parsed)) {
				setItems(parsed);
			} else {
				setItems([]);
			}
		} catch {
			setItems([]);
		}
	}, []);

	const syncItems = (nextItems) => {
		setItems(nextItems);
		try {
			localStorage.setItem('cartItems', JSON.stringify(nextItems));
			window.dispatchEvent(new Event('cartUpdated'));
		} catch {
			// ignore
		}
	};

	const handleQuantityChange = (productId, delta) => {
		const next = items
			.map((item) => {
				if (item.productId !== productId) return item;
				const nextQuantity = (item.quantity || 1) + delta;
				return { ...item, quantity: nextQuantity };
			})
			.filter((item) => (item.quantity || 1) > 0);

		syncItems(next);
	};

	const handleRemoveItem = (productId) => {
		const next = items.filter((item) => item.productId !== productId);
		syncItems(next);
	};

	const total = items.reduce(
		(sum, item) => sum + (item.price || 0) * (item.quantity || 1),
		0
	);

	const handleCheckout = async () => {
		if (!items.length || submitting) return;

		const token = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (!token || !storedUser) {
			alert('Vui lòng đăng nhập trước khi thanh toán.');
			return;
		}

		let user;
		try {
			user = JSON.parse(storedUser);
		} catch {
			alert('Vui lòng đăng nhập lại.');
			return;
		}

		if (!user.customerId) {
			alert('Không tìm thấy thông tin khách hàng, vui lòng đăng nhập lại.');
			return;
		}

		const orderData = {
			customer_id: user.customerId,
			items: items.map((item) => ({
				product_id: item.productId,
				qty: item.quantity || 1,
			})),
			payment_method: 'COD',
		};

		setSubmitting(true);
		setError(null);
		try {
			await createOrder(orderData, token);
			// Clear cart after successful order
			syncItems([]);
			alert('Tạo đơn hàng thành công!');
			navigate('/orders');
		} catch (err) {
			setError(err.message || 'Tạo đơn hàng thất bại');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen py-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-3 mb-8">
					<div className="w-10 h-10 rounded-full bg-[#6ccff6] flex items-center justify-center text-white">
						<ShoppingCart className="w-5 h-5" />
					</div>
					<div>
						<h1 className="text-2xl font-semibold text-gray-900">Giỏ hàng</h1>
						<p className="text-gray-500 text-sm">
							Danh sách sản phẩm bạn đã thêm vào giỏ hàng.
						</p>
					</div>
				</div>

				{items.length === 0 ? (
					<div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
						<p>Giỏ hàng của bạn hiện đang trống.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-4">
							{items.map((item) => (
								<div
									key={item.productId}
									className="bg-white rounded-lg shadow flex gap-4 p-4 items-center"
								>
									{item.image && (
										<img
											src={item.image}
											alt={item.name}
											className="w-24 h-24 object-cover rounded-md"
										/>
									)}
									<div className="flex-1 min-w-0">
										<h3 className="text-base font-medium text-gray-900 truncate">
											{item.name}
										</h3>
										<p className="text-sm text-[#98CE00] mt-1">
											{formatCurrencyVND(item.price)}
										</p>
										<div className="flex items-center gap-4 mt-3">
											<div className="flex items-center border rounded-lg overflow-hidden">
												<button
													type="button"
													onClick={() => handleQuantityChange(item.productId, -1)}
													className="px-2 py-1 text-gray-600 hover:bg-gray-100"
												>
													<Minus className="w-4 h-4" />
												</button>
												<span className="px-3 text-sm text-gray-800 min-w-[32px] text-center">
													{item.quantity || 1}
												</span>
												<button
													type="button"
													onClick={() => handleQuantityChange(item.productId, 1)}
													className="px-2 py-1 text-gray-600 hover:bg-gray-100"
												>
													<Plus className="w-4 h-4" />
												</button>
											</div>
											<button
												type="button"
												onClick={() => handleRemoveItem(item.productId)}
												className="text-sm text-red-500 inline-flex items-center gap-1 hover:text-red-600"
											>
												<Trash2 className="w-4 h-4" />
												Xóa
											</button>
										</div>
									</div>
									<div className="text-right">
										<p className="text-sm text-gray-500">Tạm tính</p>
										<p className="text-base font-semibold text-gray-900 mt-1">
											{formatCurrencyVND(
												(item.price || 0) * (item.quantity || 1)
											)}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="bg-white rounded-lg shadow p-6 h-fit">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Thông tin đơn hàng
							</h2>
							<div className="flex justify-between text-sm text-gray-600 mb-2">
								<span>Tạm tính</span>
								<span>{formatCurrencyVND(total)}</span>
							</div>
							<div className="flex justify-between text-sm text-gray-600 mb-4">
								<span>Phí vận chuyển</span>
								<span>Miễn phí</span>
							</div>
							<div className="border-t pt-4 mt-2">
								<div className="flex justify-between text-base font-semibold text-gray-900 mb-4">
									<span>Tổng cộng</span>
									<span>{formatCurrencyVND(total)}</span>
								</div>
								<button
									type="button"
									onClick={handleCheckout}
									disabled={submitting || !items.length}
									className="w-full bg-[#98CE00] hover:bg-[#8AB800] disabled:opacity-60 text-white py-3 rounded-lg text-sm font-medium transition-colors"
								>
									{submitting ? 'Đang xử lý...' : 'Thanh toán'}
								</button>
								{error && (
									<p className="text-sm text-red-600 mt-2 text-center">{error}</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
