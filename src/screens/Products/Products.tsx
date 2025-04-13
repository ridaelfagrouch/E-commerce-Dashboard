import React, { useState } from "react";
import StatCard from "../../components/molecules/StatCard/StatCard";
import { ShoppingBag, TrendingUp, Percent, Tag, Plus } from "lucide-react";
import Pagination from "../../components/molecules/Pagination/Pagination";
import SearchInput from "../../components/atoms/SearchInput/SearchInput";
import Button from "../../components/atoms/Button/Button";
import ProductFilterGroup from "../../components/molecules/ProductFilterGroup/ProductFilterGroup";
import ProductsTable from "../../components/organisms/ProductsTable/ProductsTable";
import EditProduct from "../../components/organisms/ProductForms/EditProduct";
import ViewProduct from "../../components/organisms/ProductForms/ViewProduct";
import FilterButton from "../../components/molecules/FilterButton/FilterButton";
import { Product } from "../../types/Product";
import { useTranslation } from "react-i18next";

const filterOptions = [
  { id: "all", label: "products.filters.all_categories" },
  { id: "electronics", label: "products.filters.electronics" },
  { id: "fitness", label: "products.filters.fitness" },
  { id: "food_beverage", label: "products.filters.food_beverage" },
  { id: "accessories", label: "products.filters.accessories" },
  { id: "lifestyle", label: "products.filters.lifestyle" },
];

const statsCards = [
  {
    id: "1",
    title: "products.stats.total_products",
    value: "186",
    icon: <ShoppingBag size={24} />,
    trend: {
      value: 12.5,
      isPositive: true,
      text: "products.stats.since_last_month",
    },
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "2",
    title: "products.stats.total_sales",
    value: "1,432",
    icon: <TrendingUp size={24} />,
    trend: {
      value: 8.3,
      isPositive: true,
      text: "products.stats.since_last_month",
    },
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "3",
    title: "products.stats.average_price",
    value: "$68.99",
    icon: <Tag size={24} />,
    trend: {
      value: 5.2,
      isPositive: true,
      text: "products.stats.since_last_month",
    },
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "4",
    title: "products.stats.low_stock_items",
    value: "12",
    icon: <Percent size={24} />,
    trend: {
      value: 3.5,
      isPositive: false,
      text: "products.stats.since_last_month",
    },
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const initialProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 99.99,
    stock: 38,
    sales: 124,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    revenue: 12398.76,
    revenueValue: 12398.76,
    inventory: "in_stock",
  },
  {
    id: "PRD-002",
    name: "Ultra HD Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 15,
    sales: 98,
    status: "Low Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    revenue: 19599.02,
    revenueValue: 19599.02,
    inventory: "low_stock",
  },
  {
    id: "PRD-003",
    name: "Premium Yoga Mat",
    category: "Fitness",
    price: 49.99,
    stock: 52,
    sales: 87,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    revenue: 4349.13,
    revenueValue: 4349.13,
    inventory: "in_stock",
  },
  {
    id: "PRD-004",
    name: "Organic Coffee Beans",
    category: "Food & Beverage",
    price: 24.99,
    stock: 125,
    sales: 76,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    revenue: 1899.24,
    revenueValue: 1899.24,
    inventory: "in_stock",
  },
  {
    id: "PRD-005",
    name: "Leather Wallet",
    category: "Accessories",
    price: 59.99,
    stock: 28,
    sales: 65,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    revenue: 3899.35,
    revenueValue: 3899.35,
    inventory: "in_stock",
  },
  {
    id: "PRD-006",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 3,
    sales: 62,
    status: "Low Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    revenue: 4959.38,
    revenueValue: 4959.38,
    inventory: "low_stock",
  },
  {
    id: "PRD-007",
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    price: 34.99,
    stock: 0,
    sales: 58,
    status: "Out of Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    revenue: 2029.42,
    revenueValue: 2029.42,
    inventory: "out_of_stock",
  },
  {
    id: "PRD-008",
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 29.99,
    stock: 42,
    sales: 53,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    revenue: 1589.47,
    revenueValue: 1589.47,
    inventory: "in_stock",
  },
];

export const Products: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [category, setCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("sales");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  const totalProducts = 1286;
  const productsPerPage = 8;

  const filteredProducts = products
    .filter((product) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    })
    .filter((product) => {
      if (category === "all") return true;
      if (category === "low_stock") return product.stock < 10;
      if (category === "out_of_stock") return product.stock === 0;
      return product.category.toLowerCase() === category.toLowerCase();
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const fieldA = a[sortField as keyof Product];
    const fieldB = b[sortField as keyof Product];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    } else {
      return sortDirection === "asc"
        ? Number(fieldA) - Number(fieldB)
        : Number(fieldB) - Number(fieldA);
    }
  });

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
      )
    );
    setShowEditModal(false);
  };

  const handleCreateProduct = (newProduct: Product) => {
    const productWithDefaults: Product = {
      ...newProduct,
      revenue: 0,
      revenueValue: 0,
      inventory:
        newProduct.stock > 20
          ? "in_stock"
          : newProduct.stock > 0
          ? "low_stock"
          : "out_of_stock",
    };
    setProducts([productWithDefaults, ...products]);
    setShowNewProductModal(false);
  };

  const handleFilterSelect = (filter: string) => {
    switch (filter) {
      case "all":
        setCategory("all");
        setProducts(initialProducts);
        break;
      case "low_stock":
        setCategory("all");
        setProducts(initialProducts.filter((p) => p.stock < 10));
        break;
      case "out_of_stock":
        setCategory("all");
        setProducts(initialProducts.filter((p) => p.stock === 0));
        break;
      case "electronics":
        setCategory("electronics");
        setProducts(
          initialProducts.filter((p) => p.category === "Electronics")
        );
        break;
      case "fitness":
        setCategory("fitness");
        setProducts(initialProducts.filter((p) => p.category === "Fitness"));
        break;
      case "food_beverage":
        setCategory("food_beverage");
        setProducts(
          initialProducts.filter((p) => p.category === "Food & Beverage")
        );
        break;
      case "accessories":
        setCategory("accessories");
        setProducts(
          initialProducts.filter((p) => p.category === "Accessories")
        );
        break;
      case "lifestyle":
        setCategory("lifestyle");
        setProducts(initialProducts.filter((p) => p.category === "Lifestyle"));
        break;
      default:
        setCategory("all");
        setProducts(initialProducts);
    }
  };

  return (
    <div className="space-y-6 mb-6 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{t("products.title")}</h1>
          <p className="text-gray-500">{t("products.description")}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setShowNewProductModal(true)}
          >
            {t("products.actions.add_product")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-medium">{t("products.filters.title")}</h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <SearchInput
                placeholder={t("products.filters.search_placeholder")}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <FilterButton onFilterSelect={handleFilterSelect} />
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <ProductFilterGroup
            options={filterOptions}
            activeFilter={category}
            onFilterChange={setCategory}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ProductsTable
          products={sortedProducts}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          onEdit={handleEditProduct}
          onView={handleViewProduct}
        />
        <div className="border-t">
          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts}
            itemsPerPage={productsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modals */}
      {showEditModal && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateProduct}
        />
      )}
      {showViewModal && selectedProduct && (
        <ViewProduct
          product={selectedProduct}
          onClose={() => {
            setShowViewModal(false);
          }}
        />
      )}
      {showNewProductModal && (
        <EditProduct
          onClose={() => setShowNewProductModal(false)}
          onSave={handleCreateProduct}
          isNew
        />
      )}
    </div>
  );
};

export default Products;
