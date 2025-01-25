import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import MainHeading from '../Mian-Heading/Main-Heading';
import { Routes } from '@/app/constants/enumbs';

async function About() {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { about } = home;
  return (
    <section className='section-gap' id={Routes.ABOUT}>
      <div className='container text-center'>
        <MainHeading subTitle={about.ourStory} title={about.aboutUs} />
        <div className='text-accent max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>{about.descriptions.one}</p>
          <p>{about.descriptions.two}</p>
          <p>{about.descriptions.three}</p>
        </div>
      </div>
    </section>
  );
}

export default About;