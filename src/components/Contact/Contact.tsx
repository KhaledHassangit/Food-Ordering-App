import { Routes } from "@/app/constants/enumbs";
import MainHeading from "../Mian-Heading/Main-Heading";

const Contact = async () => {
  return (
    <section className='section-gap' id={Routes.CONTACT}>
      <div className='container text-center'>
        <MainHeading
          subTitle={"Don'tHesitate"}
          title={"Contact Us"}
        />
        <div className='mt-8'>
          <a className='text-4xl underline text-accent' href='tel:+201211559176'>
            +201211559176
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;