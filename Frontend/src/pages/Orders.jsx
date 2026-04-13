import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersByCustomer } from '../services/orderService';
import { getProductById, reviewProduct } from '../services/productService';

export default function Orders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
	const [ratingProduct, setRatingProduct] = useState(null);
	const [ratingValue, setRatingValue] = useState(0);
	const [isSubmittingRating, setIsSubmittingRating] = useState(false);
	const [ratingError, setRatingError] = useState(null);
	const [ratingLoading, setRatingLoading] = useState(false);
	const [ratingTarget, setRatingTarget] = useState(null); // { productId }
	const [authToken, setAuthToken] = useState(null);
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

		setAuthToken(token);

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

	const handleOpenRating = async (item) => {
		if (!item.product_id) return;
		setIsRatingModalOpen(true);
		setRatingProduct(null);
		setRatingError(null);
		setRatingLoading(true);
		setRatingTarget({ productId: item.product_id });

		try {
			const product = await getProductById(item.product_id);
			setRatingProduct(product);
			const initial = product.rating && product.rating > 0 ? Math.round(product.rating) : 5;
			setRatingValue(initial);
		} catch (err) {
			setRatingError(err.message || 'Không thể tải thông tin sản phẩm');
		} finally {
			setRatingLoading(false);
		}
	};

	const handleSubmitRating = async (e) => {
		e.preventDefault();
		if (!ratingTarget?.productId) return;
		if (ratingValue < 1 || ratingValue > 5) {
			setRatingError('Vui lòng chọn số sao từ 1 đến 5');
			return;
		}
		try {
			setIsSubmittingRating(true);
			setRatingError(null);
			await reviewProduct(ratingTarget.productId, ratingValue, authToken);
			setIsRatingModalOpen(false);
			setRatingProduct(null);
		} catch (err) {
			setRatingError(err.message || 'Đánh giá thất bại');
		} finally {
			setIsSubmittingRating(false);
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
							<ul className="text-sm text-gray-700 space-y-2">
								{order.items?.map((item, index) => (
									<li key={index} className="flex flex-col gap-1">
										<div className="flex justify-between">
											<span>
												{index + 1}. {item.name}
											</span>
											<span>
												x{item.qty} &middot; {formatCurrency(item.unit_price)}
											</span>
										</div>
										{item.product_id && (
											<button
												type="button"
												onClick={() => handleOpenRating(item)}
												className="self-start text-xs text-[#98CE00] hover:text-[#7ab200]"
											>
												Đánh giá sản phẩm
											</button>
										)}
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

			{isRatingModalOpen && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg max-w-sm w-full p-6">
						<h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>
						{ratingLoading && (
							<p className="text-sm text-gray-500 mb-2">Đang tải thông tin sản phẩm...</p>
						)}
						{ratingProduct && (
							<>
								<p className="text-sm text-gray-700 mb-1">{ratingProduct.name}</p>
							
							</>
						)}

						<form onSubmit={handleSubmitRating} className="space-y-4">
							<div>
								<p className="text-sm text-gray-600 mb-2">Chọn số sao (1 - 5)</p>
								<div className="flex items-center gap-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<button
											key={star}
											type="button"
											onClick={() => setRatingValue(star)}
											className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
												ratingValue >= star
													? 'bg-yellow-400 text-white border-yellow-400'
													: 'bg-white text-gray-400 border-gray-300'
											}`}
										>
											★
										</button>
									))}
								</div>
							</div>

							{ratingError && (
								<p className="text-sm text-red-600">{ratingError}</p>
							)}

							<div className="flex gap-3 pt-2">
								<button
									type="button"
									onClick={() => setIsRatingModalOpen(false)}
									className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors"
								>
									Hủy
								</button>
								<button
									type="submit"
									disabled={isSubmittingRating}
									className="flex-1 bg-[#98CE00] hover:bg-[#8AB800] disabled:opacity-60 text-white py-2 rounded-lg transition-colors"
								>
									{isSubmittingRating ? 'Đang gửi...' : 'Gửi đánh giá'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

