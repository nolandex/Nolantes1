/* eslint-disable react/no-unescaped-entities */
import { TestimonialsData } from "@/config/testimonials";
import Image from "next/image";

const Testimonials = ({ id, locale }: { id: string; locale: any }) => {
  return (
    <section
      id={id}
      className="flex flex-col justify-center items-center pt-16 gap-12 max-w-[88%] mx-auto"
    >
      <div className="flex flex-col text-center max-w-xl gap-4">
        <h2 className="text-center text-white">{locale.title}</h2>
        <p className="text-large text-default-500">{locale.description1}</p>
      </div>
      <div className="w-full overflow-x-auto snap-x snap-mandatory flex flex-row gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        {TestimonialsData.map((testimonial, index) => (
          <div
            className="snap-start flex-shrink-0 w-[300px] mb-4 transition-all hover:scale-105 hover:shadow-lg"
            key={index}
          >
            <div className="border border-slate-200/10 rounded-lg p-4 flex flex-col items-start gap-3 h-fit bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="flex items-start justify-between w-full">
                <div className="flex items-start gap-2">
                  <Image
                    src={testimonial.user.image}
                    alt="user"
                    height={40}
                    width={40}
                    className="w-12 h-12 rounded-full object-cover object-top"
                  />
                  <div className="flex flex-col items-start">
                    <p className="font-bold text-white">{testimonial.user.name}</p>
                    <p className="text-zinc-400">@{testimonial.user.username}</p>
                  </div>
                </div>
              </div>
              <p className="text-zinc-200 text-[14px]">{testimonial.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
