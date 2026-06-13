import EmailSubscriptionBanner from "@/components/home/NewsletterBanner";
import Hero from "@/components/home/Hero";
import MediaCard from "@/components/home/MediaCard";
import MoviePromotionBanner from "@/components/home/PromoBanner";

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
