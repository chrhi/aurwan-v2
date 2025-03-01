interface ProductCardProps {
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ image, price, title }: ProductCardProps) {
  return <div>product-card</div>;
}
