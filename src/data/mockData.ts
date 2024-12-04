import { NavigationItem } from "@/types/navigation";

export const initialNavigationItems: NavigationItem[] = [
  {
    id: "1",
    title: "Homepage",
    url: "https://rc32141.redcart.pl",
    children: [
      {
        id: "1-1",
        title: "Featured",
        url: "https://rc32141.redcart.pl/featured",
      },
      {
        id: "1-2",
        title: "New Arrivals",
        url: "https://rc32141.redcart.pl/new",
      },
    ],
  },
  {
    id: "2",
    title: "Products",
    url: "https://rc32141.redcart.pl/products",
    children: [
      {
        id: "2-1",
        title: "Categories",
        url: "https://rc32141.redcart.pl/products/categories",
        children: [
          {
            id: "2-1-1",
            title: "Electronics",
            url: "https://rc32141.redcart.pl/products/categories/electronics",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Blog",
    url: "https://www.forbes.pl/blog",
  },
];
