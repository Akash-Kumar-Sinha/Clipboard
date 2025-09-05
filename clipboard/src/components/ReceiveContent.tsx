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
    <Card className="w-full flex flex-col gap-6 h-fit p-6 md:p-10 mx-auto">
      <CardHeader>
        <CardTitle>
          <Label className="text-2xl font-bold mb-2">Receive Content</Label>
        </CardTitle>
      </CardHeader>
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Enter code"
          className="w-56 text-center font-mono text-xl"
          value={code || ""}
          onChange={(e) =>
            setCode(e.target.value ? parseInt(e.target.value) : null)
          }
        />
        <Button onClick={handleReceive}>Receive</Button>
      </div>
      {type === "text" && (
        <div className="relative w-full">
          <Textarea
            placeholder="Received text will appear here"
            className="w-full min-h-40 text-lg pr-10"
            readOnly
            value={content}
          />
          
            <Copy className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            onClick={copyText} />
        </div>
      )}
      {type === "image" && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={`${SERVER_URL}${content}`}
            alt="Received"
            className="max-w-full max-h-[420px] rounded-lg shadow-md"
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
