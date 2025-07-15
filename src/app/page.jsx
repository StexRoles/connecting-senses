import Image from "next/image";
import Button from "@/components/button";
import { Bungee } from "next/font/google";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Home() {
  return (
    <div className="bg-[url('/images/bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center gap-8 text-center">
      <article className="w-1/5 h-auto aspect-square">
        <Image src="/images/animate.webp" alt="Image de animación" width={500} height={500} unoptimized objectFit="cover" />
      </article>

      <article>
        <h1 className={`${bungee.className} text-2xl`}>Conectando sentidos: escucha, juega y aprende</h1>
      </article>

      <Button href="/train">Comenzar</Button>
    </div>
  );
}
