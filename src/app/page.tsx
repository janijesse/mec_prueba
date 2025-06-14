import Image from "next/image";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#19203a] p-8 text-white">
      <main className="text-center space-y-8">
        <h1 className="text-3xl font-bold">Mujeres en Crypto</h1>
        <ol className="text-sm text-gray-300">
          <li>
            <span className="font-mono bg-[#2a344b] px-2 py-1 rounded">
              {`Mujeres en Crypto`}
            </span>
          </li>
        </ol>

        <div className="flex gap-4 justify-center">
          {/*
          <a
            className="bg-[#FF9BDB] text-[#19203a] py-2 px-6 rounded-full transition-colors hover:bg-[#FF79C3]"
            href="https://mujeresencrypto.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar sitio
          </a>
          */}
          
          <LoginButton />
          
          {/*
          <a
            className="bg-transparent border-2 border-[#FF9BDB] text-[#FF9BDB] py-2 px-6 rounded-full transition-colors hover:bg-[#FF9BDB] hover:text-[#19203a]"
            href="https://mujeresencrypto.org/agenda-mec/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver agenda
          </a>
          */}
        </div>
      </main>

      <footer className="flex gap-6 justify-center text-sm text-gray-400 mt-12">
        <a
          href="https://mujeresencrypto.org/introduccion-a-blockchain/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Introducción a Blockchain
        </a>
        <a
          href="https://mujeresencrypto.org/mav/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Mujeres a la Vanguardia
        </a>
        <a
          href="https://mujeresencrypto.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
        </a>
      </footer>
    </div>
  );
}
