import AnnouncementBar from "../../components/announcement-bar";
import ProductInfo from "../../components/product-info";
import StoreHeader from "../../components/store-header";

export default function Page() {
  return (
    <>
      <div className="" dir="rtl">
        <AnnouncementBar />
        <StoreHeader />
        <ProductInfo />
      </div>
    </>
  );
}
