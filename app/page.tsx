import HomeMain from '@/components/home';
import Cosmic from '@/utils/content/cosmic';

export default async function Home() {
  const [membersData] = await Cosmic.membersDataFetcher();
  return (
    <>
      <HomeMain />
    </>
  );
}
