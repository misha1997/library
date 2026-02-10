export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  reviews: number;
  genre: string;
  year: number;
  description: string;
  pages: number;
  available: boolean;
  categories: string[];
  keywords: string[];
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    rating: 4.8,
    reviews: 2847,
    genre: "Thriller",
    year: 2019,
    description: "A woman's act of violence against her husband and the therapist obsessed with uncovering her motive.",
    pages: 336,
    available: true,
    categories: ["Psychological Thriller", "Mystery", "Suspense"],
    keywords: ["psychologist", "mute", "murder", "art", "obsession", "twists"],
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
    rating: 4.9,
    reviews: 5621,
    genre: "Self-Help",
    year: 2018,
    description: "An easy and proven way to build good habits and break bad ones.",
    pages: 320,
    available: true,
    categories: ["Self-Help", "Productivity", "Personal Development"],
    keywords: ["habits", "behavior", "improvement", "routine", "goals", "mindset"],
  },
  {
    id: "3",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop",
    rating: 4.7,
    reviews: 3982,
    genre: "Fiction",
    year: 2018,
    description: "A coming-of-age story about a young woman raised in the marshes of North Carolina.",
    pages: 384,
    available: false,
    categories: ["Fiction", "Literary Fiction", "Mystery"],
    keywords: ["nature", "isolation", "coming-of-age", "marsh", "wildlife", "romance"],
  },
  {
    id: "4",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&h=450&fit=crop",
    rating: 4.6,
    reviews: 2156,
    genre: "Fiction",
    year: 2020,
    description: "Between life and death there is a library, and within that library, the shelves go on forever.",
    pages: 304,
    available: true,
    categories: ["Fiction", "Fantasy", "Philosophy"],
    keywords: ["parallel lives", "regret", "choices", "depression", "hope", "library"],
  },
  {
    id: "5",
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop",
    rating: 4.9,
    reviews: 4523,
    genre: "Science Fiction",
    year: 2021,
    description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller.",
    pages: 496,
    available: true,
    categories: ["Science Fiction", "Adventure", "Space"],
    keywords: ["astronaut", "space", "survival", "alien", "science", "earth"],
  },
  {
    id: "6",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop",
    rating: 4.8,
    reviews: 1893,
    genre: "Fantasy",
    year: 2020,
    description: "A magical story about the meaning of family and finding the extraordinary in the ordinary.",
    pages: 398,
    available: true,
    categories: ["Fantasy", "LGBTQ+", "Cozy Fiction"],
    keywords: ["found family", "magic", "orphanage", "acceptance", "love", "cozy"],
  },
  {
    id: "7",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
    rating: 4.7,
    reviews: 3241,
    genre: "Finance",
    year: 2020,
    description: "Timeless lessons on wealth, greed, and happiness from a master storyteller.",
    pages: 256,
    available: true,
    categories: ["Finance", "Business", "Psychology"],
    keywords: ["wealth", "investing", "behavior", "money", "decisions", "happiness"],
  },
  {
    id: "8",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=450&fit=crop",
    rating: 4.5,
    reviews: 1567,
    genre: "Literary Fiction",
    year: 2021,
    description: "A magnificent new novel from the Nobel Prize-winning author of Never Let Me Go.",
    pages: 320,
    available: false,
    categories: ["Literary Fiction", "Science Fiction", "Dystopian"],
    keywords: ["AI", "robot", "love", "humanity", "sun", "friendship"],
  },
];

export const genres = [
  "All Genres",
  "Fiction",
  "Non-Fiction",
  "Thriller",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Self-Help",
  "Biography",
  "History",
  "Finance",
  "Literary Fiction",
];

export const languages = [
  { value: "uk", label: "Українська" },
  { value: "en", label: "Англійська" },
  { value: "ru", label: "Російська" },
  { value: "fr", label: "Французька" },
  { value: "de", label: "Німецька" },
  { value: "pl", label: "Польська" },
];

// Формати книг
export const formats = [
  { value: "hardcover", label: "Тверда обкладинка" },
  { value: "paperback", label: "М'яка обкладинка" },
  { value: "ebook", label: "Електронна книга" },
  { value: "audiobook", label: "Аудіокнига" },
];

export const allAuthors = [
  "Тарас Шевченко",
  "Валер'ян Підмогильний",
  "Іван Багряний",
  "Ліна Костенко",
  "Василь Стус",
  "Сергій Жадан",
  "Оксана Забужко",
  "Григорій Сковорода"
];

export const allKeywords = [
  "Класика",
  "Модернізм",
  "Психологія",
  "Драма",
  "Історія України",
  "Поезія",
  "Філософія",
  "Київ",
  "Дитяча література"
];

// Список видавництв
export const publishers = [
  "Всі видавництва",
  "Фабула",
  "Наш Формат",
  "Віват",
  "КСД",
  "А-ба-ба-га-ла-ма-га",
  "Vivat",
];

// Опції сортування
export const sortOptions = [
  { value: "relevance", label: "За релевантністю" },
  { value: "title", label: "За назвою (А-Я)" },
  { value: "author", label: "За автором (А-Я)" },
  { value: "year-desc", label: "За роком (новіші)" },
  { value: "year-asc", label: "За роком (старіші)" },
  { value: "rating", label: "За рейтингом" },
  { value: "popular", label: "За популярністю" },
];

export const trendingBooks = books.slice(0, 4);

export const currentlyReading = [
  {
    id: "1",
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop",
    progress: 68,
    currentPage: 428,
    totalPages: 630,
  },
  {
    id: "2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop",
    progress: 35,
    currentPage: 63,
    totalPages: 180,
  },
];
