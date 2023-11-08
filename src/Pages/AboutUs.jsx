import aboutMainImage from "../assets/images/aboutMainImage.png";
import apj from "../assets/images/apj.png";
import billGates from "../assets/images/billGates.png";
import einstein from "../assets/images/einstein.png";
import nelsonMandela from "../assets/images/nelsonMandela.png";
import steveJobs from "../assets/images/steveJobs.png";
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
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center px-[15%] gap-4">
              <img src={apj} className="w-full rounded-full" />
              <p className="text-xl text-gray-200">
                Teaching is a very noble profession that shapes the character,
                caliber, and future of an individual.
              </p>
              <h3 className="text-2xl font-semibold">APJ Abdul Kalam</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2   top-[50%] left-5 right-5">
                <a href="#slide5" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center px-[15%] gap-4">
              <img src={billGates} className="w-full rounded-full" />
              <p className="text-xl text-gray-200">
                Success is a lousy teacher. It seduces smart people into
                thinking they can’t lose.
              </p>
              <h3 className="text-2xl font-semibold">Bill Gates</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle ">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center px-[15%] gap-4">
              <img src={steveJobs} className="w-full rounded-full" />
              <p className="text-xl text-gray-200">
                We dont get a chance to do that many things, and every one
                should be really excellent.
              </p>
              <h3 className="text-2xl font-semibold">Steve Jobs</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center px-[15%] gap-4">
              <img src={nelsonMandela} className="w-full rounded-full" />
              <p className="text-xl text-gray-200">
                Education is the most powerful tool you can use to change the
                world.
              </p>
              <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center px-[15%] gap-4">
              <img src={einstein} className="w-full rounded-full" />
              <p className="text-xl text-gray-200">
                Education is what remains after one has forgotten what one has
                learned in school
              </p>
              <h3 className="text-2xl font-semibold">Albert Einstein</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
