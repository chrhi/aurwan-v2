import Link from "next/link";

export default function SimpleProductCard() {
  const product = {
    id: "cm86f53ti0001wmkkernjxr7s",
    name: "منظم مستحضرات التجميل الأكريليكي الشفاف",
    price: "3900 DZ",
    image: "/image-03.jpg",
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className=" overflow-hidden  hover:shadow-md transition duration-300 border  bg-white">
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="font-bold text-xl text-right">{product.name}</h3>
          <p className="font-bold text-right text-red-600 mt-1">
            {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
