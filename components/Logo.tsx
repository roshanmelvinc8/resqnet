import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.jpeg"
        alt="ResQNet Logo"
        width={150}
        height={150}
        className="rounded-full border-2 border-brand-red shadow-[0_0_10px_rgba(255,0,0,0.5)]"
      />
      <span className="text-2xl font-bold text-brand-red tracking-wider uppercase">ResQNet</span>
    </div>
  );
};
