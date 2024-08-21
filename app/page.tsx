import EmailSubscriptionBanner from "@/components/home/EmailSubscriptionBanner";
import Hero from "@/components/home/Hero";
import MediaCard from "@/components/home/MediaCard";
import MoviePromotionBanner from "@/components/movieComponents/MoviePromotionBanner";

const Home = async () => {
  return (
    <>
      <Hero />
      <MoviePromotionBanner />
      <MediaCard />
      <EmailSubscriptionBanner />
    </>
  );
};

export default Home;
