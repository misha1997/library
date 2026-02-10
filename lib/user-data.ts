export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  libraryCardNumber: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  preferences: {
    language: string;
    notifications: boolean;
    newsletter: boolean;
  };
}

export interface Order {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  status: "active" | "returned" | "overdue" | "pending";
  orderDate: string;
  dueDate: string;
  returnDate?: string;
}

export interface SavedBook {
  id: string;
  bookId: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  rating: number;
  savedAt: string;
}

export interface ReadingHistory {
  id: string;
  bookId: string;
  title: string;
  author: string;
  cover: string;
  readDate: string;
  rating?: number;
  review?: string;
}

export const currentUser: User = {
  id: "1",
  firstName: "Олександр",
  lastName: "Шевченко",
  email: "o.shevchenko@example.com",
  phone: "+380 50 123 4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  memberSince: "2023-09-15",
  libraryCardNumber: "LIB-2023-001847",
  address: {
    street: "вул. Хрещатик, 25, кв. 12",
    city: "Київ",
    zipCode: "01001",
  },
  preferences: {
    language: "uk",
    notifications: true,
    newsletter: true,
  },
};

export const userOrders: Order[] = [
  {
    id: "ORD-001",
    bookId: "1",
    bookTitle: "The Silent Patient",
    bookAuthor: "Alex Michaelides",
    bookCover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop",
    status: "active",
    orderDate: "2024-01-15",
    dueDate: "2024-02-15",
  },
  {
    id: "ORD-002",
    bookId: "5",
    bookTitle: "Project Hail Mary",
    bookAuthor: "Andy Weir",
    bookCover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=100&h=150&fit=crop",
    status: "active",
    orderDate: "2024-01-20",
    dueDate: "2024-02-20",
  },
  {
    id: "ORD-003",
    bookId: "2",
    bookTitle: "Atomic Habits",
    bookAuthor: "James Clear",
    bookCover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop",
    status: "returned",
    orderDate: "2023-12-01",
    dueDate: "2024-01-01",
    returnDate: "2023-12-28",
  },
  {
    id: "ORD-004",
    bookId: "4",
    bookTitle: "The Midnight Library",
    bookAuthor: "Matt Haig",
    bookCover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=100&h=150&fit=crop",
    status: "returned",
    orderDate: "2023-11-10",
    dueDate: "2023-12-10",
    returnDate: "2023-12-05",
  },
];

export const savedBooks: SavedBook[] = [
  {
    id: "SAV-001",
    bookId: "6",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=100&h=150&fit=crop",
    genre: "Fantasy",
    rating: 4.8,
    savedAt: "2024-01-10",
  },
  {
    id: "SAV-002",
    bookId: "7",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop",
    genre: "Finance",
    rating: 4.7,
    savedAt: "2024-01-08",
  },
  {
    id: "SAV-003",
    bookId: "3",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop",
    genre: "Fiction",
    rating: 4.7,
    savedAt: "2024-01-05",
  },
];

export const readingHistory: ReadingHistory[] = [
  {
    id: "HIST-001",
    bookId: "2",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop",
    readDate: "2023-12-28",
    rating: 5,
    review: "Відмінна книга про формування звичок! Рекомендую всім.",
  },
  {
    id: "HIST-002",
    bookId: "4",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=100&h=150&fit=crop",
    readDate: "2023-12-05",
    rating: 4,
  },
  {
    id: "HIST-003",
    bookId: "6",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=100&h=150&fit=crop",
    readDate: "2023-10-20",
    rating: 5,
    review: "Неймовірно затишна і тепла історія.",
  },
];

export function getOrderStatusText(status: Order["status"]): string {
  const statusMap = {
    active: "Активне",
    returned: "Повернено",
    overdue: "Прострочено",
    pending: "Очікує",
  };
  return statusMap[status];
}

export function getOrderStatusColor(status: Order["status"]): string {
  const colorMap = {
    active: "bg-secondary text-secondary-foreground",
    returned: "bg-muted text-muted-foreground",
    overdue: "bg-destructive text-destructive-foreground",
    pending: "bg-amber-100 text-amber-700",
  };
  return colorMap[status];
}
