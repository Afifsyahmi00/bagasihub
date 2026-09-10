'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState({ posts: 0 });

  useEffect(() => {
    fetch('/api/posts?jenis=barang').then(r => r.json()).then(data => {
      setStats(prev => ({ ...prev, posts: data.length }));
    });
  }, []);

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">BagasiHub</h1>
      <p className="text-xl mb-8">Hubungkan Pengirim Barang dengan Jemaah Umrah</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
        <Link href="/dashboard/post-barang" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
          📦 Hantar Barang
        </Link>
        <Link href="/dashboard/post-kuota" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
          ✈️ Tawarkan Kuota
        </Link>
        <Link href="/dashboard/matches" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600">
          🔍 Cari Match
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
        <div className="bg-gray-100 p-4 rounded">
          <div className="text-2xl font-bold">{stats.posts}</div>
          <div className="text-sm">Barang Aktif</div>
        </div>
      </div>
    </div>
  );
}
