import aboutMainImage from "../assets/images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celeb } from "../Constants/CelebData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-3xl font-semibold text-yellow-500">
              Affordable and quality education
            </h1>
            <p className="pb-20 text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>
          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              alt="about main image"
              className=" drop-shadow-md"
              src={aboutMainImage}
            />
          </div>
        </div>

        <div className="carousel m-auto w-1/2 my-16">
          {celeb &&
            celeb.map((singleCeleb) => (
              <CarouselSlide
                {...singleCeleb}
                key={singleCeleb.slideNumber}
                totalSlides={celeb.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
