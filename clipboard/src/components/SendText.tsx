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
    <Card
      className="w-full flex flex-col gap-6 min-h-[420px] p-6 md:p-10 mx-auto"
      style={{
        background: "var(--color-card)",
        color: "var(--color-card-foreground)",
        borderColor: "var(--color-border)",
      }}
    >
      <CardHeader>
        <CardTitle>
          <Label className="text-2xl font-bold mb-2">Send Text</Label>
        </CardTitle>
      </CardHeader>
      <Textarea
        placeholder="Type here to send text to other devices"
        className="w-full min-h-40 max-h-80 text-lg overflow-auto resize-y rounded-md border scrollbar-thin scrollbar-thumb-[var(--color-muted)] scrollbar-track-[var(--color-input)]"
        style={{
          background: "var(--color-input)",
          color: "var(--color-foreground)",
          borderColor: "var(--color-border)",
        }}
        value={messages}
        onChange={selectText}
      />
      <div className="flex flex-row-reverse justify-between text-base text-muted-foreground">
        <Button
          onClick={image ? handleSendImage : handleSend}
          className="self-end mt-2 px-8 py-3 text-lg"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-primary-foreground)",
          }}
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
        <div className="mt-6 flex items-center gap-2">
          <Label className="text-lg font-semibold">Your Code:</Label>
          <div className="relative">
            <Input
              className="w-56 pr-8 text-center font-mono text-xl"
              readOnly
              value={token.toString()}
            />
            <Copy
              className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              onClick={copyCode}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default SendText;
