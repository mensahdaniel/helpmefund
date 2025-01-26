"use client";

import { useEffect, useState } from "react";
import { getUsers, updateUserRole } from "@/lib/firebase/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";

function UsersTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </TableHead>
          <TableHead>
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          </TableHead>
          <TableHead>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </TableHead>
          <TableHead>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </TableHead>
          <TableHead>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    await updateUserRole(userId, newRole);
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      ),
    );
  };

  if (loading) return <UsersTableSkeleton />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {user.role}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleRoleChange(user.id, "student")}
                  >
                    Student
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRoleChange(user.id, "sponsor")}
                  >
                    Sponsor
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRoleChange(user.id, "admin")}
                  >
                    Admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>
              {new Date(user.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm" className="text-red-600">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// function UsersTableSkeleton() {
//   return (
//     <div className="space-y-4">
//       <div className="h-8 w-full animate-pulse rounded-md bg-gray-200" />
//       {[...Array(5)].map((_, i) => (
//         <div
//           key={i}
//           className="h-16 w-full animate-pulse rounded-md bg-gray-100"
//         />
//       ))}
//     </div>
//   );
// }
