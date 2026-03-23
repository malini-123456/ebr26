"use client";

import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useState } from "react";

interface QrDownloadButtonProps {
  ruanganId: number;
  namaRuangan?: string;
}

export function QrDownloadButton({ ruanganId, namaRuangan }: QrDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const url = `https://ipm.codecubin.com/ruangan/${ruanganId}`;
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&margin=10&data=${encodeURIComponent(url)}`;

      const res = await fetch(apiUrl);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `qr-ruangan-${namaRuangan ?? ruanganId}.png`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={handleDownload}
      disabled={loading}
    >
      <QrCode className={loading ? "animate-pulse" : ""} />
    </Button>
  );
}
