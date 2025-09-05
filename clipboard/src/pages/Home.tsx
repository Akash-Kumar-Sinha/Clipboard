import ReceiveContent from "@/components/ReceiveContent";
import SendText from "@/components/SendText";

const Home = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-between py-8"
      style={{
        background: "var(--color-background)",
        color: "var(--color-foreground)",
      }}
    >
      <div className="w-full max-w-6xl flex flex-col gap-10 items-center flex-grow px-2 md:px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-2 text-primary">
          Clipboard
        </h1>
        <p className="text-lg md:text-2xl text-center max-w-5xl mb-2 text-muted-foreground">
          Clipboard is a free online tool that helps you copy and paste between
          devices. Easily transfer text or images - just copy on one device and
          paste on another. Your data is never stored, always secure, and
          instantly available across devices.
        </p>
        <div className="w-full flex flex-col gap-8 md:gap-12 justify-center items-stretch">
          <div className="flex-1 min-w-[320px] max-w-6xl flex flex-col">
            <SendText />
          </div>
          <div className="flex-1 min-w-[320px] max-w-6xl flex flex-col">
            <ReceiveContent />
          </div>
        </div>
      </div>
      <footer
        className="w-full py-6 mt-10 text-center text-base md:text-lg
        text-muted-foreground border-border border-t"
      >
        &copy; {new Date().getFullYear()} Clipboard. Free online copy-paste
        between devices. Secure, fast, and private. Made for productivity.
      </footer>
    </div>
  );
};

export default Home;
