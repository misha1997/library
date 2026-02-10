export type NotificationType = "due_date" | "order_ready" | "new_arrival" | "system" | "promotion";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link?: string;
  bookCover?: string;
}

export const notifications: Notification[] = [
  {
    id: "notif-001",
    type: "due_date",
    title: "Термін повернення наближається",
    message: "Книгу 'The Silent Patient' потрібно повернути через 2 дні",
    createdAt: "2024-02-13T10:30:00Z",
    read: false,
    link: "/profile?tab=orders",
    bookCover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop",
  },
  {
    id: "notif-002",
    type: "order_ready",
    title: "Замовлення готове",
    message: "Книгу 'Project Hail Mary' можна забрати у бібліотеці",
    createdAt: "2024-02-12T14:15:00Z",
    read: false,
    link: "/profile?tab=orders",
    bookCover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=100&h=150&fit=crop",
  },
  {
    id: "notif-003",
    type: "new_arrival",
    title: "Нове надходження",
    message: "У бібліотеці нова книга від вашого улюбленого автора Andy Weir",
    createdAt: "2024-02-10T09:00:00Z",
    read: true,
    link: "/",
  },
  {
    id: "notif-004",
    type: "system",
    title: "Профіль оновлено",
    message: "Ваші особисті дані успішно оновлено",
    createdAt: "2024-02-08T16:45:00Z",
    read: true,
    link: "/profile",
  },
  {
    id: "notif-005",
    type: "promotion",
    title: "Спеціальна пропозиція",
    message: "Цього тижня знижка 20% на всі наукові книги",
    createdAt: "2024-02-07T11:20:00Z",
    read: false,
    link: "/",
  },
];

export function getNotificationIcon(type: NotificationType): string {
  const iconMap: Record<NotificationType, string> = {
    due_date: "Clock",
    order_ready: "CheckCircle",
    new_arrival: "BookOpen",
    system: "Info",
    promotion: "Gift",
  };
  return iconMap[type];
}

export function getNotificationColor(type: NotificationType): string {
  const colorMap: Record<NotificationType, string> = {
    due_date: "text-amber-600 bg-amber-50",
    order_ready: "text-green-600 bg-green-50",
    new_arrival: "text-secondary bg-secondary/10",
    system: "text-blue-600 bg-blue-50",
    promotion: "text-purple-600 bg-purple-50",
  };
  return colorMap[type];
}

export function formatNotificationTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "щойно";
  if (diffMins < 60) return `${diffMins} хв тому`;
  if (diffHours < 24) return `${diffHours} год тому`;
  if (diffDays < 7) return `${diffDays} дн тому`;
  return date.toLocaleDateString("uk-UA");
}
