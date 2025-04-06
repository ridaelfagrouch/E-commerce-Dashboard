import React, { useState } from "react";
import { X, Plus, Search, Trash2, ChevronRight, ArrowLeft } from "lucide-react";
import Button from "../../atoms/Button/Button";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface OrderProduct extends Product {
  quantity: number;
}

interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  products: OrderProduct[];
  total: number;
  notes?: string;
}

interface NewOrderProps {
  onClose: () => void;
  onSubmit: (orderData: OrderData) => void;
}

const NewOrder: React.FC<NewOrderProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Mock products data
  const products: Product[] = [
    { id: "1", name: "Product 1", price: 29.99, stock: 100 },
    { id: "2", name: "Product 2", price: 39.99, stock: 50 },
    { id: "3", name: "Product 3", price: 19.99, stock: 75 },
    { id: "4", name: "Product 4", price: 49.99, stock: 30 },
    { id: "5", name: "Product 5", price: 15.99, stock: 200 },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product: Product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map((p) =>
          p.id === product.id
            ? { ...p, quantity: Math.min(p.quantity + 1, product.stock) }
            : p
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const quantity = Math.max(1, Math.min(newQuantity, product.stock));
    setSelectedProducts(
      selectedProducts.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData: OrderData = {
      ...formData,
      products: selectedProducts,
      total: calculateTotal(),
    };
    onSubmit(orderData);
    onClose();
  };

  const canProceed = selectedProducts.length > 0;
  const canSubmit =
    formData.customerName.trim() !== "" &&
    formData.email.trim() !== "" &&
    selectedProducts.length > 0;

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-full sm:h-auto sm:rounded-xl shadow-xl sm:max-w-4xl sm:max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center gap-4 sm:gap-8">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="sm:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-lg sm:text-xl font-semibold">
              Create New Order
            </h2>
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <div
                className={`flex items-center ${
                  step === 1 ? "text-indigo-600 font-medium" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    step === 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </span>
                Select Products
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div
                className={`flex items-center ${
                  step === 2 ? "text-indigo-600 font-medium" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    step === 2
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </span>
                Customer Details
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Step Indicator */}
        <div className="sm:hidden flex justify-center p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-3">
            <div
              className={`flex flex-col items-center ${
                step === 1 ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step === 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </span>
              <span className="text-xs font-medium">Products</span>
            </div>
            <div className="w-12 h-[2px] bg-gray-300 mt-[-20px]" />
            <div
              className={`flex flex-col items-center ${
                step === 2 ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step === 2
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </span>
              <span className="text-xs font-medium">Details</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-144px)] sm:h-[calc(90vh-80px)]">
          {step === 1 ? (
            <div className="flex-1 overflow-hidden flex flex-col sm:flex-row">
              {/* Products List */}
              <div className="w-full sm:w-1/2 p-4 sm:p-6 sm:border-r overflow-y-auto">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 border rounded-lg hover:border-indigo-500 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-600">
                              Stock: {product.stock}
                            </p>
                          </div>
                          <span className="font-medium text-lg">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => handleAddProduct(product)}
                          leftIcon={<Plus size={16} />}
                          className="w-full"
                        >
                          Add to Order
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Products */}
              <div className="w-full sm:w-1/2 p-4 sm:p-6 bg-gray-50 overflow-y-auto border-t sm:border-t-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Order Summary</h3>
                  {selectedProducts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No products selected yet
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg border gap-4 sm:gap-0"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-600">
                              ${product.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center justify-between sm:gap-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    product.id,
                                    product.quantity - 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="w-12 text-center">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    product.id,
                                    product.quantity + 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveProduct(product.id)}
                              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between text-lg font-medium">
                          <span>Total:</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Customer Information</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        required
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Add any special instructions or notes"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border space-y-3">
                  <h4 className="font-medium">Order Summary</h4>
                  <div className="space-y-2">
                    {selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {product.name} × {product.quantity}
                        </span>
                        <span>
                          ${(product.price * product.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          <div className="p-4 bg-gray-50 border-t flex flex-col-reverse sm:flex-row sm:justify-between gap-2 sm:gap-0">
            {step === 2 ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="hidden sm:flex"
                >
                  Back to Products
                </Button>
                <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                    className="w-full sm:w-auto"
                  >
                    Create Order
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setStep(2)}
                  disabled={!canProceed}
                  className="w-full sm:w-auto"
                >
                  Continue to Details
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
