import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SendImage = ({
  setImage,
  image,
  setMessages,
}: {
  setImage: (image: File | null) => void;
  image: File | null;
  setMessages: (messages: string) => void;
}) => {
  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessages("");
    setImage(e.target.files?.[0] || null);
  };
  return (
    <div className="rounded-lg p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 border mt-2 bg-[var(--color-muted)] text-[var(--color-muted-foreground)] border-[var(--color-border)]">
      <Label className="text-sm sm:text-base font-medium mb-1">
        Send Image
      </Label>
      <Input
        type="file"
        accept="image/*"
        className="file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:text-[var(--color-primary-foreground)] file:font-semibold file:text-xs sm:file:text-sm bg-[var(--color-input)] text-[var(--color-foreground)] border-[var(--color-border)]"
        onChange={selectImage}
      />
      {image && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="max-h-32 sm:max-h-40 rounded-lg shadow-md border border-[var(--color-border)] bg-[var(--color-muted)]"
          />
        </div>
      )}
    </div>
  );
};

export default SendImage;
