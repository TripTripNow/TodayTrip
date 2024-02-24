import Head from 'next/head';

interface HeadMetaProps {
  title: string;
  description?: string;
}

function HeadMeta({ title, description }: HeadMetaProps) {
  return (
    <Head>
      <title>{`${title} - TodayTrip` || 'TodayTrip'}</title>
      <meta name="description" content={description || '새로운 모험을 떠나고 싶다면, TodayTrip과 함께 하세요.'} />
      <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      <meta property="og:title" content={title || 'TodayTrip'} />
      <meta property="og:type" content={'website'} />
      <meta property="g:url" content={'https://today-trip.vercel.app/'} />
      <meta property="og:image" content="#/images/TodayTripLogo2.png" />
      <meta property="og:article:author" content="TripTripNow" />
    </Head>
  );
}

export default HeadMeta;
