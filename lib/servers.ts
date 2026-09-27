import { TAG_1PP, TAG_ADVENTURE, type Tag } from "@/lib/tags";

export type Server = {
  id: string;
  ip: string;
  port: number;
  queryPort: number;
  description: string;
  tags: Tag[];
};

export const SERVERS: Server[] = [
  {
    id: "chernarus-1",
    ip: "5.252.101.139",
    port: 2302,
    queryPort: 2303,
    description:
      "Chernarus is overrun and the remaining survivors are left to fend for themselves. Explore the forests and abandoned towns, decide who to trust, and make your own way through the ruins.",
    tags: [TAG_ADVENTURE, TAG_1PP],
  },
  {
    id: "namalsk-1",
    ip: "5.252.101.139",
    port: 2302,
    queryPort: 2303,
    description:
      "The island of Namalsk is abandoned and crawling with the infected. Scavenge what you can, keep warm and watch your back. Out here, the cold may be just as dangerous as the people you meet.",
    tags: [TAG_ADVENTURE, TAG_1PP],
  },
];