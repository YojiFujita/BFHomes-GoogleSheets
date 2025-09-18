'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/about', label: 'サービス概要' },
    { href: '/how-it-works', label: '使い方' },
    { href: '/gallery', label: 'ギャラリー' },
    { href: '/pricing', label: '料金・見積' },
    { href: '/faq', label: 'よくある質問' },
  ];

  return (
    <header className="bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg sm:text-2xl font-pacifico text-white cursor-pointer">
              Before-After Homes
            </Link>
            {currentPage && (
              <div className="ml-4 flex items-center text-gray-300">
                <i className="ri-arrow-right-line mx-2"></i>
                <span className="text-white font-medium">{currentPage}</span>
              </div>
            )}
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer flex items-center"
            >
              <i className="ri-home-line mr-2"></i>
              ホーム
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                  currentPage === item.label
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              お問い合わせ
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white p-2 hover:bg-gray-800 rounded-md transition-colors duration-200"
          >
            <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer flex items-center"
              >
                <i className="ri-home-line mr-3"></i>
                ホーム
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer ${
                    currentPage === item.label
                      ? 'text-white font-semibold bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200 mx-4 text-center cursor-pointer"
              >
                お問い合わせ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}