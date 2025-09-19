import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { SERVER_URL } from "@/utils/constant";
import axios from "axios";
import { Copy } from "lucide-react";
import SendImage from "./SendImage";

const SendText = () => {
  const [token, setToken] = useState<number | null>(null);
  const [messages, setMessages] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSendImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      console.log("Sending image...");
      const { data } = await axios.post(`${SERVER_URL}/send/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setToken(data.token);
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };
  const handleSend = async () => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/send/messages`, {
        content: messages,
      });
      setToken(data.token);
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };
  const copyCode = () => {
    if (token) {
      navigator.clipboard.writeText(token.toString());
    }
  };
  const selectText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImage(null);
    setMessages(e.target.value);
  };
  return (
    <Card className="w-full flex flex-col gap-4 min-h-[320px] p-4 sm:p-6 md:p-8 mx-auto bg-[var(--color-card)] text-[var(--color-card-foreground)] border border-[var(--color-border)] rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>
          <Label className="text-xl sm:text-2xl font-bold mb-2">
            Send Text
          </Label>
        </CardTitle>
      </CardHeader>
      <Textarea
        placeholder="Type here to send text to other devices"
        className="w-full min-h-32 max-h-72 text-base sm:text-lg overflow-auto resize-y rounded-md border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-foreground)] scrollbar-thin scrollbar-thumb-[var(--color-muted)] scrollbar-track-[var(--color-input)]"
        value={messages}
        onChange={selectText}
      />
      <div className="flex flex-col sm:flex-row-reverse sm:justify-between gap-2 text-sm sm:text-base text-[var(--color-muted-foreground)]">
        <Button
          onClick={image ? handleSendImage : handleSend}
          className="self-end mt-2 px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
        >
          Send
        </Button>
        <SendImage
          image={image}
          setImage={setImage}
          setMessages={setMessages}
        />
      </div>
      {token !== null && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Label className="text-base sm:text-lg font-semibold">
            Your Code:
          </Label>
          <div className="relative w-full max-w-xs">
            <Input
              className="w-full pr-8 text-center font-mono text-lg sm:text-xl"
              readOnly
              value={token.toString()}
            />
            <Copy
              className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)] cursor-pointer hover:text-[var(--color-foreground)] transition-colors"
              onClick={copyCode}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default SendText;
