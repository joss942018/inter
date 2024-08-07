import MyLink from "@/app/components/MyLink";

interface Props {
  className?: string;
}

const SocialLinks = ({ className }: Props) => {
  return (
    <div className={`flex flex-row gap-5 ${className}`}>
      {/* <Link
        className="animar-hover invert-[0.3] dark:invert-[0.7] hover:invert-[0] dark:hover:invert-[1] ico-logo-facebook w-7"
        href="#"
      />
      <Link
        className="animar-hover invert-[0.3] dark:invert-[0.7] hover:invert-[0] dark:hover:invert-[1] ico-logo-twitter w-7"
        href="#"
      />
      <Link
        className="animar-hover invert-[0.3] dark:invert-[0.7] hover:invert-[0] dark:hover:invert-[1] ico-logo-instagram w-7"
        href="#"
      /> */}
    </div>
  );
};

export default SocialLinks;
