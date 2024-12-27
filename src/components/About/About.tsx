import MainHeading from '../Mian-Heading/Main-Heading';
import { Routes } from '@/app/constants/enumbs';

async function About() {
  return (
    <section className='section-gap' id={Routes.ABOUT}>
      <div className='container text-center'>
        <MainHeading subTitle={"Our Story"} title={"About Us"} />
        <div className='text-accent max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, mollitia?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, mollitia?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, mollitia?</p>
        </div>
      </div>
    </section>
  );
}

export default About;