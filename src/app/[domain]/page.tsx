import Link from "next/link";
import AnnouncementBar from "./components/announcement-bar";
import StoreHeader from "./components/store-header";

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <StoreHeader />
      <div className="w-full h-fit flex items-center">
        <Link href={"/product/cm86f53ti0001wmkkernjxr7s"}>go to produt</Link>
      </div>
    </>
  );
}
