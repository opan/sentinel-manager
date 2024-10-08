'use client'

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import React from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Sentinel = {
  id: number
  name: string
  hosts: string
  created_at: string
}

async function handleDeleteSentinel(id: number) {
  try {
    const res = await fetch(`/api/sentinel/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      throw new Error("Failed to remove sentinel");
    }
  } catch (error) {
    console.error("Error while removing sentinel: ", error)
  }
}

export const columns = (deleteSentinel: any): ColumnDef<Sentinel>[] => [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const sentinel = row.original
      return (
        <Link href={"#"}>{sentinel.name}</Link>
      )
    }
  },
  {
    accessorKey: "hosts",
    header: "Sentinel Hosts",
    cell: ({ row }) => {
      const hosts = (row.getValue("hosts") as string).split(',')

      return (
        <div>
          {hosts.map((host, i) => (
            <span className="font-bold mr-1 border p-1" key={i}>{host}</span>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: "created_at",
    header: "Created At"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sentinel = row.original
      const { toast } = useToast()
      const errMsg = 'Error when removing Sentinel'

      const handleRemove = async () => {
        try {
          await handleDeleteSentinel(sentinel.id)
          deleteSentinel(sentinel)
          toast({
            description: 'Sentinel has been removed'
          })
        } catch (error) {
          console.error(`${errMsg}: `, error)
          toast({
            title: 'Error',
            description: errMsg,
            variant: 'destructive'
          })
        }
      }

      return (

        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <AlertDialogTrigger>Remove</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove this sentinel: {sentinel.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove the selected Sentinel servers from database
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild onClick={handleRemove}>
                      <button className="bg-red-400 hover:bg-primary/90">Remove</button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </AlertDialog>
      )
    }
  }
]
