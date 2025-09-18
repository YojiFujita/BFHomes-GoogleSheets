'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
  visible: boolean;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全て');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 初期データとローカルストレージからのデータ読み込み
  useEffect(() => {
    const savedFaqs = localStorage.getItem('admin_faqs');

    if (savedFaqs) {
      try {
        const faqData = JSON.parse(savedFaqs);
        setFaqs(faqData.filter((faq: FAQ) => faq.visible));
      } catch (error) {
        console.error('FAQデータの読み込みに失敗しました:', error);
        setFaqs(getInitialFaqs());
      }
    } else {
      setFaqs(getInitialFaqs());
    }
  }, []);

  // 初期FAQデータ
  const getInitialFaqs = (): FAQ[] => [
    {
      id: 1,
      question: "見積もりは無料ですか？",
      answer: "はい、見積もりは完全無料です。現地調査や詳細なプラン提案も追加料金なしで承ります。お気軽にお問い合わせください。",
      category: "料金・見積もり",
      order: 1,
      visible: true
    },
    {
      id: 2,
      question: "工事期間はどのくらいかかりますか？",
      answer: "工事内容により異なりますが、一般的には3-10日程度です。キッチンリフォームは3-5日、リビング全体は7-10日が目安となります。",
      category: "工事・施工",
      order: 2,
      visible: true
    },
    {
      id: 3,
      question: "追加費用は発生しますか？",
      answer: "事前にお見積もりした金額から追加費用は発生いたしません。透明性のある料金体系で、安心してご利用いただけます。",
      category: "料金・見積もり",
      order: 3,
      visible: true
    },
    {
      id: 4,
      question: "工事中に住み続けることはできますか？",
      answer: "小規模なリフォームの場合は住み続けながらの工事も可能です。大規模な場合は一時的な仮住まいをお勧めする場合があります。詳細はご相談ください。",
      category: "工事・施工",
      order: 4,
      visible: true
    },
    {
      id: 5,
      question: "どのような支払い方法がありますか？",
      answer: "現金、銀行振込、各種クレジットカード、リフォームローンに対応しています。分割払いについてもご相談いただけます。",
      category: "料金・見積もり",
      order: 5,
      visible: true
    },
    {
      id: 6,
      question: "アフターサービスはありますか？",
      answer: "工事完了後1年間の保証期間を設けています。不具合があった場合は無償で対応いたします。定期点検も実施しています。",
      category: "サービス内容",
      order: 6,
      visible: true
    }
  ];

  // カテゴリー一覧を取得
  const categories = ['全て', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // 選択されたカテゴリーでフィルタリング
  const filteredFaqs = selectedCategory === '全て'
    ? faqs.filter(faq => faq.visible)
    : faqs.filter(faq => faq.visible && faq.category === selectedCategory);

  // 順序でソート
  const sortedFaqs = filteredFaqs.sort((a, b) => a.order - b.order);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <Header currentPage="よくある質問" />

      {/* メインコンテンツ */}
      <main className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ページタイトル */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              よくある質問
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              お客様からよくいただくご質問をまとめました
            </p>
          </div>

          {/* カテゴリーフィルター */}
          <div className="mb-8 lg:mb-12">
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ一覧 */}
          <div className="space-y-4">
            {sortedFaqs.length > 0 ? (
              sortedFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          Q{index + 1}
                        </span>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-left">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <i
                          className={`ri-arrow-down-s-line text-xl text-gray-400 transition-transform duration-200 ${
                            openFaq === faq.id ? 'transform rotate-180' : ''
                          }`}
                        ></i>
                      </div>
                    </div>
                  </button>

                  {openFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <div className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          A
                        </span>
                        <div className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-question-line text-2xl text-gray-400"></i>
                </div>
                <p className="text-gray-500 text-lg">
                  選択されたカテゴリーには質問がありません。
                </p>
              </div>
            )}
          </div>

          {/* お問い合わせCTA */}
          <div className="mt-16 lg:mt-20 text-center">
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                他にご質問はありませんか？
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                お困りのことがございましたら、お気軽にお問い合わせください。
              </p>
              <Link
                href="/contact"
                className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
              >
                お問い合わせする
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}