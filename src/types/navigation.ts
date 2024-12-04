export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  parent?: string;
  children?: NavigationItem[];
}

export interface NavigationFormData {
  title: string;
  url: string;
}
