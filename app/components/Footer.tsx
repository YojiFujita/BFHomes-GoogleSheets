import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl sm:text-2xl font-pacifico text-white cursor-pointer">
              Before-After Homes
            </Link>
            <p className="mt-4 sm:mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              写真を選び、広さを入力。
              <br />
              あとはプロに任せるだけ。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">
              サービス
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200 cursor-pointer">
                  サービス概要
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors duration-200 cursor-pointer">
                  ギャラリー
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors duration-200 cursor-pointer">
                  料金・見積
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors duration-200 cursor-pointer">
                  使い方
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">
              サポート
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors duration-200 cursor-pointer">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200 cursor-pointer">
                  お問い合わせ
                </Link>
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                利用規約
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                プライバシーポリシー
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">
              お問い合わせ
            </h4>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <p>03-1234-5678</p>
              <p>info@beforeafter-homes.jp</p>
              <p>平日 9:00-18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-400">
          <p>&copy; 2024 Before-After Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}