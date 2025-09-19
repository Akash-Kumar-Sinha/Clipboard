import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { SERVER_URL } from "@/utils/constant";
import axios from "axios";
import { Copy, Download } from "lucide-react";

const ReceiveContent = () => {
  const [code, setCode] = useState<number | null>(null);
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState<"text" | "image" | null>(null);

  const handleReceive = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/receive/messages`, {
        params: { token: code },
      });

      setContent(data.content);
      setType(data.type);
      console.log("Received:", data);
    } catch (error) {
      console.error("Error receiving content:", error);
    }
  };
  const handleDownload = async () => {
    if (type === "image" && content) {
      try {
        // Fetch the image as a blob
        const response = await fetch(`${SERVER_URL}${content}`);
        const blob = await response.blob();

        // Create a temporary link to download
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = content.split("/").pop() || "downloaded_image";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // cleanup
      } catch (err) {
        console.error("Failed to download image:", err);
      }
    }
  };

  const copyText = () => {
    if (content && type === "text") {
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <Card className="w-full flex flex-col gap-4 h-fit p-4 sm:p-6 md:p-8 mx-auto bg-[var(--color-card)] text-[var(--color-card-foreground)] border border-[var(--color-border)] rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>
          <Label className="text-xl sm:text-2xl font-bold mb-2">
            Receive Content
          </Label>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <Input
          type="text"
          placeholder="Enter code"
          className="w-full sm:w-56 text-center font-mono text-lg sm:text-xl"
          value={code || ""}
          onChange={(e) =>
            setCode(e.target.value ? parseInt(e.target.value) : null)
          }
        />
        <Button
          className="w-full sm:w-auto mt-2 sm:mt-0"
          onClick={handleReceive}
        >
          Receive
        </Button>
      </div>
      {type === "text" && (
        <div className="relative w-full">
          <Textarea
            placeholder="Received text will appear here"
            className="w-full min-h-32 max-h-72 text-base sm:text-lg pr-10 bg-[var(--color-input)] text-[var(--color-foreground)] border border-[var(--color-border)] rounded-md"
            readOnly
            value={content}
          />
          <Copy
            className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)] cursor-pointer hover:text-[var(--color-foreground)] transition-colors"
            onClick={copyText}
          />
        </div>
      )}
      {type === "image" && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={`${SERVER_URL}${content}`}
            alt="Received"
            className="max-w-full max-h-64 sm:max-h-80 rounded-lg shadow-md border border-[var(--color-border)] bg-[var(--color-muted)]"
          />
          <Button
            size="sm"
            onClick={handleDownload}
            className="mt-2 flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ReceiveContent;
