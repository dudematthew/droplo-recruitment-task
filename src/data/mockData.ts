import { NavigationItem } from "@/types/navigation";

export const initialNavigationItems: NavigationItem[] = [
  {
    id: "1",
    title: "Strona główna",
    url: "https://rc32141.redcart.pl",
    children: [
      {
        id: "1-1",
        title: "Polecane",
        url: "https://rc32141.redcart.pl/featured",
        children: [
          {
            id: "1-1-1",
            title: "Bestsellery",
            url: "https://rc32141.redcart.pl/featured/best-sellers",
            children: [
              {
                id: "1-1-1-1",
                title: "Top 10",
                url: "https://rc32141.redcart.pl/featured/best-sellers/top-10",
                children: [
                  {
                    id: "1-1-1-1-1",
                    title: "Ten miesiąc",
                    url: "https://rc32141.redcart.pl/featured/best-sellers/top-10/this-month",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Produkty",
    url: "https://rc32141.redcart.pl/products",
    children: [
      {
        id: "2-1",
        title: "Kategorie",
        url: "https://rc32141.redcart.pl/products/categories",
      },
      {
        id: "2-2",
        title: "Marki",
        url: "https://rc32141.redcart.pl/products/brands",
      },
    ],
  },
  {
    id: "3",
    title: "Blog",
    url: "https://www.forbes.pl/blog",
  },
];
