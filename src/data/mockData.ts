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
        children: [
          {
            id: "1-1-1",
            title: "Best Sellers",
            url: "https://rc32141.redcart.pl/featured/best-sellers",
          },
          {
            id: "1-1-2",
            title: "Trending",
            url: "https://rc32141.redcart.pl/featured/trending",
          },
        ],
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
            children: [
              {
                id: "2-1-1-1",
                title: "Smartphones",
                url: "https://rc32141.redcart.pl/products/categories/electronics/smartphones",
              },
              {
                id: "2-1-1-2",
                title: "Laptops",
                url: "https://rc32141.redcart.pl/products/categories/electronics/laptops",
              },
            ],
          },
        ],
      },
      {
        id: "2-2",
        title: "Brands",
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
