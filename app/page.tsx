import Hero from "@/components/Hero";
import MediaCard from "@/components/MediaCard";
import MoviePromotionBanner from "@/components/MoviePromotionBanner";

const Home = async () => {
  return (
    <>
      <Hero />
      <MoviePromotionBanner />
      <MediaCard />
    </>
  );
};

export default Home;
