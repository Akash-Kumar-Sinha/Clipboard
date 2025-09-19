import ReceiveContent from "@/components/ReceiveContent";
import SendText from "@/components/SendText";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between py-4 md:py-8 bg-[var(--color-background)] text-[var(--color-foreground)]">
      <main className="w-full max-w-4xl flex flex-col gap-8 items-center flex-grow px-2 sm:px-4 md:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-2 text-[var(--color-primary)] leading-tight">
          Clipboard
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-center max-w-3xl mb-2 text-[var(--color-muted-foreground)]">
          Clipboard is a free online tool that helps you copy and paste between
          devices. Easily transfer text or images—just copy on one device and
          paste on another. Your data is never stored, always secure, and
          instantly available across devices.
        </p>
        <section className="w-full flex flex-col gap-6 md:gap-10 justify-center items-stretch">
          <div className="flex-1 min-w-[260px] max-w-full flex flex-col">
            <SendText />
          </div>
          <div className="flex-1 min-w-[260px] max-w-full flex flex-col">
            <ReceiveContent />
          </div>
        </section>
      </main>
      <footer className="w-full py-4 mt-8 text-center text-xs sm:text-sm md:text-base text-[var(--color-muted-foreground)] border-t border-[var(--color-border)]">
        &copy; {new Date().getFullYear()} Clipboard. Free online copy-paste
        between devices. Secure, fast, and private. Made for productivity.
      </footer>
    </div>
  );
};

export default Home;
