"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Check } from "lucide-react";

interface BookOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
}

const ADDRESSES = [
  "Бібліотека №1 - вул. Соборна, 1",
  "Бібліотека №2 - вул. Шевченка, 15",
  "Бібліотека №3 - вул. Незалежності, 42",
  "Бібліотека №4 - вул. Героїв Крут, 8",
  "Центральна бібліотека - пл. Незалежності, 3",
];

export function BookOrderModal({ isOpen, onClose, bookTitle }: BookOrderModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Здесь можно добавить логику отправки данных на сервер
    console.log("Order submitted:", { ...formData, bookTitle });
    
    setIsSubmitted(true);
    
    // Закрыть модальное окно через 2 секунды после успешной отправки
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
      });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = 
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.address !== "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Замовлення книги
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 py-4">
            <div className="rounded-lg bg-secondary/10 p-3">
              <p className="text-sm text-muted-foreground">Книга:</p>
              <p className="font-medium text-foreground">{bookTitle}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ім'я *</Label>
                <Input
                  id="firstName"
                  placeholder="Введіть ваше ім'я"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Прізвище *</Label>
                <Input
                  id="lastName"
                  placeholder="Введіть ваше прізвище"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+380 XX XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адреса отримання *</Label>
                <Select
                  value={formData.address}
                  onValueChange={(value) => handleChange("address", value)}
                  required
                >
                  <SelectTrigger id="address" className="w-full">
                    <SelectValue placeholder="Оберіть бібліотеку" />
                  </SelectTrigger>
                  <SelectContent>
                    {ADDRESSES.map((address, index) => (
                      <SelectItem key={index} value={address}>
                        {address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Скасувати
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid}
                className="flex-1 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Clock className="h-4 w-4" />
                Підтвердити замовлення
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
              <Check className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Замовлення прийнято!
            </h3>
            <p className="text-center text-muted-foreground">
              Ми зв'яжемося з вами найближчим часом
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}