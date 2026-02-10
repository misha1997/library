"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  BookOpen,
  Heart,
  History,
  Settings,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  LogOut,
  Edit,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Trash2,
  Bell,
  Check,
  Gift,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  currentUser,
  userOrders,
  savedBooks,
  readingHistory,
  getOrderStatusText,
  getOrderStatusColor,
  type Order,
  type SavedBook,
} from "@/lib/user-data";
import {
  notifications as initialNotifications,
  getNotificationColor,
  formatNotificationTime,
  type Notification,
  type NotificationType,
} from "@/lib/notifications-data";

const notificationIcons: Record<NotificationType, React.ElementType> = {
  due_date: Clock,
  order_ready: CheckCircle,
  new_arrival: BookOpen,
  system: Info,
  promotion: Gift,
};

function SidebarTabButton({
  value,
  icon: Icon,
  label,
  activeTab,
  onClick,
  badge,
}: {
  value: string;
  icon: React.ElementType;
  label: string;
  activeTab: string;
  onClick: () => void;
  badge?: number;
}) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full text-left whitespace-nowrap ${
        isActive
          ? "bg-secondary text-secondary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <Badge
          variant={isActive ? "outline" : "secondary"}
          className={`ml-auto h-5 min-w-5 justify-center rounded-full px-1.5 text-xs ${
            isActive ? "border-secondary-foreground/30" : ""
          }`}
        >
          {badge}
        </Badge>
      )}
    </button>
  );
}

function ProfileHeader() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Назад до бібліотеки</span>
        </Link>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <LogOut className="h-4 w-4" />
          Вихід
        </Button>
      </div>
    </nav>
  );
}

function UserInfoCard() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Large Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-secondary/20">
              <AvatarImage src={currentUser.avatar} alt={currentUser.firstName} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-3xl">
                {currentUser.firstName[0]}{currentUser.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-semibold text-foreground">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Читач з {new Date(currentUser.memberSince).toLocaleDateString("uk-UA")}
                </p>
                <Badge variant="secondary" className="mt-3">
                  <CreditCard className="mr-1 h-3 w-3" />
                  {currentUser.libraryCardNumber}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 self-start"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4" />
                {isEditing ? "Зберегти" : "Редагувати"}
              </Button>
            </div>

            {/* Compact Contact Info Block */}
            <div className="mt-6 flex flex-wrap gap-2">
              <ContactBadge icon={Mail} label={currentUser.email} />
              <ContactBadge icon={Phone} label={currentUser.phone} />
              <ContactBadge icon={MapPin} label={`${currentUser.address.city}`} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-sm text-foreground">
      <Icon className="h-4 w-4 text-secondary flex-shrink-0" />
      <span className="truncate max-w-[200px]">{label}</span>
    </div>
  );
}

function OrdersList() {
  const activeOrders = userOrders.filter((o) => o.status === "active" || o.status === "overdue" || o.status === "pending");
  const pastOrders = userOrders.filter((o) => o.status === "returned");

  return (
    <div className="space-y-6">
      {activeOrders.length > 0 && (
        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold">Активні замовлення</h3>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}

      {pastOrders.length > 0 && (
        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold">Історія замовлень</h3>
          <div className="space-y-3">
            {pastOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const isOverdue = order.status === "overdue" || (order.status === "active" && new Date(order.dueDate) < new Date());

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={order.bookCover}
              alt={order.bookTitle}
              fill
              className="object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{order.bookTitle}</h4>
                  <p className="text-sm text-muted-foreground">{order.bookAuthor}</p>
                </div>
                <Badge className={getOrderStatusColor(order.status)}>
                  {getOrderStatusText(order.status)}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Замовлено: {new Date(order.orderDate).toLocaleDateString("uk-UA")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {order.status === "returned" && order.returnDate
                    ? `Повернено: ${new Date(order.returnDate).toLocaleDateString("uk-UA")}`
                    : `Термін до: ${new Date(order.dueDate).toLocaleDateString("uk-UA")}`}
                </span>
              </div>
            </div>
            {order.status === "active" && (
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Повернути
                </Button>
                <Button size="sm" variant="ghost" className="gap-2 text-secondary">
                  <Clock className="h-4 w-4" />
                  Продовжити
                </Button>
              </div>
            )}
            {isOverdue && (
              <div className="mt-2 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>Прострочено! Будь ласка, поверніть книгу.</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SavedBooksList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {savedBooks.map((savedBook) => (
        <SavedBookCard key={savedBook.id} savedBook={savedBook} />
      ))}
    </div>
  );
}

function SavedBookCard({ savedBook }: { savedBook: SavedBook }) {
  return (
    <Card className="group border-border/50 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Link href={`/book/${savedBook.bookId}`} className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={savedBook.cover}
              alt={savedBook.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              crossOrigin="anonymous"
            />
          </Link>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <Link href={`/book/${savedBook.bookId}`}>
                <h4 className="font-medium text-foreground line-clamp-1 group-hover:text-secondary transition-colors">
                  {savedBook.title}
                </h4>
              </Link>
              <p className="text-sm text-muted-foreground">{savedBook.author}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{savedBook.genre}</Badge>
                <span className="flex items-center gap-1 text-xs text-amber-600">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {savedBook.rating}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Збережено: {new Date(savedBook.savedAt).toLocaleDateString("uk-UA")}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReadingHistoryList() {
  return (
    <div className="space-y-4">
      {readingHistory.map((item) => (
        <Card key={item.id} className="border-border/50">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Link href={`/book/${item.bookId}`} className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/book/${item.bookId}`}>
                        <h4 className="font-medium text-foreground hover:text-secondary transition-colors">
                          {item.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.author}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.readDate).toLocaleDateString("uk-UA")}
                    </span>
                  </div>
                  {item.rating && (
                    <div className="mt-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < item.rating! ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {item.review && (
                    <p className="mt-2 text-sm text-muted-foreground italic">&ldquo;{item.review}&rdquo;</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function NotificationsTab() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = filter === "unread"
    ? notifications.filter((n) => !n.read)
    : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Усі
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          </Button>
          <Button
            variant={filter === "unread" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Непрочитані
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4" />
              Позначити всі як прочитані
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-destructive"
              onClick={clearAll}
            >
              <Trash2 className="h-4 w-4" />
              Очистити все
            </Button>
          )}
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title={filter === "unread" ? "Немає непрочитаних сповіщень" : "Немає сповіщень"}
          description={
            filter === "unread"
              ? "Всі сповіщення прочитано"
              : "Тут з’являтимуться ваші сповіщення"
          }
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = notificationIcons[notification.type];
            const colorClass = getNotificationColor(notification.type);

            return (
              <Card
                key={notification.id}
                className={`border-border/50 overflow-hidden transition-colors ${
                  !notification.read ? "bg-secondary/5" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {notification.bookCover ? (
                      <div className="relative h-16 w-11 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={notification.bookCover}
                          alt=""
                          fill
                          className="object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                    ) : (
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${colorClass}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">
                                Нове
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatNotificationTime(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        {notification.link && (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={notification.link}>Перейти</Link>
                          </Button>
                        )}
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-2"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            Прочитано
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-2 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Видалити
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Сповіщення</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Push-сповіщення</Label>
              <p className="text-sm text-muted-foreground">Отримувати сповіщення про терміни повернення книг</p>
            </div>
            <Switch id="notifications" defaultChecked={currentUser.preferences.notifications} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="newsletter">Розсилка новин</Label>
              <p className="text-sm text-muted-foreground">Отримувати новини про нові надходження та події</p>
            </div>
            <Switch id="newsletter" defaultChecked={currentUser.preferences.newsletter} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms">SMS-сповіщення</Label>
              <p className="text-sm text-muted-foreground">Отримувати SMS про прострочені терміни</p>
            </div>
            <Switch id="sms" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Мова інтерфейсу</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button variant="outline" className={currentUser.preferences.language === "uk" ? "border-secondary bg-secondary/10" : ""}>
              🇺🇦 Українська
            </Button>
            <Button variant="outline" className={currentUser.preferences.language === "en" ? "border-secondary bg-secondary/10" : ""}>
              🇬🇧 English
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-lg text-destructive">Небезпечна зона</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Видалити акаунт</Label>
              <p className="text-sm text-muted-foreground">Назавжди видалити ваш акаунт та всі дані</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">Видалити</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ви впевнені?</DialogTitle>
                  <DialogDescription>
                    Ця дія назавжди видалить ваш акаунт та всю історію замовлень. Це не можна відмінити.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Скасувати</Button>
                  <Button variant="destructive">Так, видалити</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["orders", "saved", "history", "settings", "notifications"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <UserInfoCard />

        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
              {/* Left Sidebar */}
              <div className="space-y-6">

                {/* Navigation */}
                <Card className="border-border/50">
                  <CardContent className="p-2">
                    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                      <SidebarTabButton
                        value="orders"
                        icon={BookOpen}
                        label="Замовлення"
                        activeTab={activeTab}
                        onClick={() => setActiveTab("orders")}
                      />
                      <SidebarTabButton
                        value="saved"
                        icon={Heart}
                        label="Збережені"
                        activeTab={activeTab}
                        onClick={() => setActiveTab("saved")}
                        badge={savedBooks.length}
                      />
                      <SidebarTabButton
                        value="history"
                        icon={History}
                        label="Історія читання"
                        activeTab={activeTab}
                        onClick={() => setActiveTab("history")}
                      />
                      <SidebarTabButton
                        value="notifications"
                        icon={Bell}
                        label="Сповіщення"
                        activeTab={activeTab}
                        onClick={() => setActiveTab("notifications")}
                        badge={initialNotifications.filter(n => !n.read).length}
                      />
                      <SidebarTabButton
                        value="settings"
                        icon={Settings}
                        label="Налаштування"
                        activeTab={activeTab}
                        onClick={() => setActiveTab("settings")}
                      />
                    </nav>
                  </CardContent>
                </Card>

                {/* Quick Stats - Desktop Only */}
                <Card className="border-border/50 hidden lg:block">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-serif text-sm">Статистика</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Активні замовлення</span>
                      <Badge variant="secondary">{userOrders.filter(o => o.status === "active").length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Прочитано книг</span>
                      <Badge variant="secondary">{readingHistory.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">В списку бажаного</span>
                      <Badge variant="secondary">{savedBooks.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Членство</span>
                      <span className="text-sm font-medium">{new Date(currentUser.memberSince).toLocaleDateString("uk-UA")}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Content */}
              <div>
                <TabsContent value="orders" className="mt-0">
                  <div className="mb-4 lg:hidden">
                    <h2 className="font-serif text-xl font-semibold">Мої замовлення</h2>
                    <p className="text-sm text-muted-foreground">Керуйте вашими активними замовленнями та переглядайте історію</p>
                  </div>
                  <OrdersList />
                </TabsContent>

                <TabsContent value="saved" className="mt-0">
                  <div className="mb-4 lg:hidden">
                    <h2 className="font-serif text-xl font-semibold">Збережені книги</h2>
                    <p className="text-sm text-muted-foreground">Книги, які ви додали до списку бажаного</p>
                  </div>
                  {savedBooks.length > 0 ? (
                    <SavedBooksList />
                  ) : (
                    <EmptyState
                      icon={Heart}
                      title="Немає збережених книг"
                      description="Додавайте книги до списку бажаного, щоб швидко знайти їх пізніше"
                      action={<Button asChild><Link href="/">Переглянути книги</Link></Button>}
                    />
                  )}
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <div className="mb-4 lg:hidden">
                    <h2 className="font-serif text-xl font-semibold">Історія читання</h2>
                    <p className="text-sm text-muted-foreground">Книги, які ви вже прочитали</p>
                  </div>
                  {readingHistory.length > 0 ? (
                    <ReadingHistoryList />
                  ) : (
                    <EmptyState
                      icon={History}
                      title="Історія читання порожня"
                      description="Тут з’являтимуться книги, які ви прочитали"
                    />
                  )}
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <div className="mb-4 lg:hidden">
                    <h2 className="font-serif text-xl font-semibold">Налаштування</h2>
                    <p className="text-sm text-muted-foreground">Керуйте налаштуваннями вашого акаунту</p>
                  </div>
                  <SettingsTab />
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                  <div className="mb-4 lg:hidden">
                    <h2 className="font-serif text-xl font-semibold">Сповіщення</h2>
                    <p className="text-sm text-muted-foreground">Ваші сповіщення та повідомлення</p>
                  </div>
                  <NotificationsTab />
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/30 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
        <Icon className="h-8 w-8 text-secondary" />
      </div>
      <h3 className="mt-4 font-serif text-lg font-medium">{title}</h3>
      <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
