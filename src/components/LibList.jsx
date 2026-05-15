"use client";


import { use, useState, useTransition } from 'react';
import { Bookmark, BookmarkPlus, Box, Loader, SquareArrowOutUpRight } from 'lucide-react';
import { setModalStatus, setNewEntryStatus, setTarget, useLibStore } from './useLibStore';
import { isBookmarkedAction } from '@/app/action';
import { toast } from 'sonner';
import LibCard from './LibCard';



export default function LibList({ libPromise }) {

  const data = use(libPromise);


  return (
    <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-x-10 gap-y-12 p-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.map(lib => <LibCard key={lib.id} lib={lib} />)}
    </div>
  );
}