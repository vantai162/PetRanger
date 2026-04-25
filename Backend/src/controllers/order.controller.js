import Order from '../models/order.model.js';
import Pet from '../models/pet.model.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res) => {
  try {
    const { customer_id, items, payment_method, shipping_address, notes } = req.body;

    // 1. Validate input cơ bản
    if (!customer_id) {
      return res.status(400).json({ message: 'Thiếu customer_id' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order phải có ít nhất 1 item' });
    }

    const processedItems = [];
    let totalAmount = 0;

    // 2. Duyệt từng item, lấy dữ liệu từ DB để snapshot name/price
    for (const item of items) {
      const { product_id, pet_id, qty = 1 } = item;

      if (!product_id && !pet_id) {
        return res.status(400).json({
          message: 'Mỗi item phải có product_id hoặc pet_id',
        });
      }
      if (product_id && pet_id) {
        return res.status(400).json({
          message: 'Mỗi item chỉ được chọn product hoặc pet, không phải cả hai',
        });
      }
      if (qty <= 0) {
        return res.status(400).json({ message: 'Số lượng phải lớn hơn 0' });
      }

      // 2a. Item là PET
      if (pet_id) {
        const pet = await Pet.findById(pet_id);
        if (!pet) {
          return res.status(404).json({ message: `Không tìm thấy pet với id ${pet_id}` });
        }
        if (pet.status !== 'available') {
          return res.status(400).json({
            message: `Pet ${pet.name} hiện không còn available (status: ${pet.status})`,
          });
        }

        const unitPrice = pet.price;
        processedItems.push({
          pet_id: pet._id,
          name: pet.name,
          qty,
          unit_price: unitPrice,
        });
        totalAmount += unitPrice * qty;
      }

      // 2b. Item là PRODUCT
      if (product_id) {
        const product = await Product.findById(product_id);
        if (!product) {
          return res.status(404).json({ message: `Không tìm thấy product với id ${product_id}` });
        }
        if (product.stock < qty) {
          return res.status(400).json({
            message: `Sản phẩm ${product.name} không đủ tồn kho. Còn: ${product.stock}`,
          });
        }

        const unitPrice = product.price;
        processedItems.push({
          product_id: product._id,
          name: product.name,
          qty,
          unit_price: unitPrice,
        });
        totalAmount += unitPrice * qty;
      }
    }

    // 3. Tạo order với items đã chuẩn hóa & total_amount tính từ server
    const newOrder = await Order.create({
      customer_id,
      items: processedItems,
      total_amount: totalAmount,
      payment_method,
      shipping_address,
      notes,
    });

    // 4. Cập nhật tồn kho product & trạng thái pet sau khi tạo đơn
    const updateOps = [];

    for (const item of processedItems) {
      if (item.pet_id) {
        // Pet được mua -> cập nhật status = 'sold'
        updateOps.push(
          Pet.findByIdAndUpdate(item.pet_id, { status: 'sold' }, { new: true })
        );
      }
      if (item.product_id) {
        // Trừ stock product
        updateOps.push(
          Product.findByIdAndUpdate(
            item.product_id,
            { $inc: { stock: -item.qty } },
            { new: true }
          )
        );
      }
    }

    await Promise.all(updateOps);

    return res.status(201).json({
      message: 'Tạo đơn hàng thành công',
      order: newOrder,
    });
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Lấy danh sách order theo customer (ví dụ cho trang lịch sử đơn hàng)
export const getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const orders = await Order.find({ customer_id: customerId })
      .sort({ created_at: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng theo customer:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Lấy chi tiết 1 order
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ created_at: -1 });
    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Lỗi khi lấy tất cả đơn hàng:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};
