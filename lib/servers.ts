import { TAG_1PP, TAG_ADVENTURE, type Tag } from "@/lib/tags";

export type Server = {
  id: string;
  map: string;
  address: {
    ip: string;
    ports: {
      query: number;
      game: number;
    };
  };
  description: string[];
  tags: Tag[];
};

export const SERVERS: Server[] = [
  {
    id: "chernarus-1",
    map: "Chernarus",
    address: {
    //   ip: "5.252.101.139",
      ip: "localhost",
      ports: {
        query: 2303,
        game: 2302,
      },
    },
    description: [
      "Chernarus is overrun and the remaining survivors are left to fend for themselves. Explore the forests and abandoned towns, decide who to trust, and make your own way through the ruins.",
    ],
    tags: [TAG_ADVENTURE, TAG_1PP],
  },
];