import AnnouncementBar from "./components/announcement-bar";
import Banner from "./components/banner";
import ProductsRow from "./components/products-row";
import StoreHeader from "./components/store-header";

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <StoreHeader />
      <Banner />
      <ProductsRow title="Latest Product" />
    </>
  );
}
