import { Makers } from "@/config/makers";
import Image from "next/image";

const SocialProof = ({ locale }: { locale: any }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-20 pt-16 w-full">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center justify-center flex-wrap">
          {Makers.map((user, index) => (
            <Image
              key={index}
              src={user.image}
              alt="User"
              height={40}
              width={40}
              className="rounded-full -m-[5px] border border-white"
            />
          ))}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-400 text-center">
          <span className="text-primary font-semibold text-base">1000+</span>{" "}
          {locale.maker}
        </p>
      </div>
    </section>
  );
};

export default SocialProof;
