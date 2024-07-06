import EmailSubscriptionBanner from "@/components/EmailSubscriptionBanner";
import Hero from "@/components/Hero";
import MediaCard from "@/components/MediaCard";
import MoviePromotionBanner from "@/components/MoviePromotionBanner";

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
