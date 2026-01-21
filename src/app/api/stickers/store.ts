// In-memory storage for stickers (in production use Redis or database)
interface StickerData {
  id: string;
  url: string;
  createdAt: number;
  paid: boolean;
}

const stickersStore = new Map<string, StickerData>();

// Clean up old stickers (older than 24 hours)
setInterval(() => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  
  for (const [id, data] of stickersStore.entries()) {
    if (now - data.createdAt > oneDayMs) {
      stickersStore.delete(id);
    }
  }
}, 60 * 60 * 1000); // Clean every hour

export function storeSticker(url: string): string {
  const id = generateId();
  stickersStore.set(id, {
    id,
    url,
    createdAt: Date.now(),
    paid: false,
  });
  return id;
}

export function getStickerUrl(id: string, requirePaid: boolean = false): string | null {
  const sticker = stickersStore.get(id);
  if (!sticker) return null;
  if (requirePaid && !sticker.paid) return null;
  return sticker.url;
}

export function markAsPaid(id: string): boolean {
  const sticker = stickersStore.get(id);
  if (!sticker) return false;
  sticker.paid = true;
  return true;
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
