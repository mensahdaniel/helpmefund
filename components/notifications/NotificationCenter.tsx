"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {
  getUserNotifications,
  Notification,
} from "@/lib/firebase/notifications";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatRelativeDate } from "@/lib/utils";

export function NotificationCenter() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function fetchNotifications() {
      if (user) {
        const userNotifications = await getUserNotifications(user.uid);
        setNotifications(userNotifications);
        setUnreadCount(userNotifications.filter((n) => !n.read).length);
      }
    }

    fetchNotifications();
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="max-h-96 overflow-auto p-4">
          <h3 className="font-semibold mb-4">Notifications</h3>
          {notifications.length === 0
            ? (
              <p className="text-center text-sm text-gray-500">
                No notifications yet
              </p>
            )
            : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read ? "bg-gray-50" : "bg-blue-50"
                    }`}
                  >
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatRelativeDate(notification.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
