'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "写真を選択",
      subtitle: "好みのデザインを直感的に選ぶ",
      description: "豊富なAfter事例から、理想のリノベーションスタイルを選択します。専門知識は不要、写真を見るだけで完成イメージが分かります。",
      details: [
        "Before/After写真を比較して選択",
        "モダン・ナチュラル・ヴィンテージなど豊富なスタイル",
        "実際の施工事例のため安心",
        "費用目安も同時に確認可能"
      ],
      image: "https://readdy.ai/api/search-image?query=Person%20looking%20at%20renovation%20photos%20on%20smartphone%2C%20multiple%20before%20and%20after%20interior%20design%20images%20displayed%20on%20screen%2C%20modern%20apartment%20setting%2C%20natural%20lighting%2C%20clean%20minimalist%20aesthetic%2C%20professional%20photography%20style%2C%20simple%20clean%20background&width=600&height=400&seq=14&orientation=landscape",
      icon: "ri-heart-line",
      color: "teal"
    },
    {
      id: 2,
      title: "平米数を入力",
      subtitle: "お部屋の広さで概算費用を算出",
      description: "リノベーションしたい部屋の広さを入力するだけで、即座に概算費用を表示。透明性の高い料金体系で安心です。",
      details: [
        "面積を入力するだけの簡単操作",
        "部屋タイプ別の料金設定",
        "リアルタイムで概算費用を表示",
        "追加料金の心配なし"
      ],
      image: "https://readdy.ai/api/search-image?query=Person%20measuring%20apartment%20room%20with%20smartphone%20app%2C%20tape%20measure%20and%20calculator%20visible%2C%20modern%20interior%20space%2C%20natural%20lighting%2C%20professional%20measurement%20tools%2C%20clean%20organized%20environment%2C%20simple%20clean%20background&width=600&height=400&seq=15&orientation=landscape",
      icon: "ri-ruler-line",
      color: "orange"
    },
    {
      id: 3,
      title: "問い合わせ送信",
      subtitle: "フォームから詳細相談を開始",
      description: "選択した事例と概算費用を元に、詳細な相談を開始。専門スタッフが丁寧にサポートします。",
      details: [
        "選択した事例を添付して送信",
        "物件情報や希望を詳しく入力",
        "24時間以内に専門スタッフが回答",
        "無料相談で安心スタート"
      ],
      image: "https://readdy.ai/api/search-image?query=Person%20filling%20out%20consultation%20form%20on%20smartphone%2C%20professional%20interior%20designer%20consultation%2C%20modern%20office%20setting%2C%20natural%20lighting%2C%20clean%20workspace%20with%20renovation%20plans%2C%20simple%20clean%20background&width=600&height=400&seq=16&orientation=landscape",
      icon: "ri-mail-line",
      color: "teal"
    }
  ];

  const processSteps = [
    {
      title: "詳細ヒアリング",
      description: "物件の状況や希望を詳しくお聞きします",
      duration: "1-2日",
      icon: "ri-question-answer-line"
    },
    {
      title: "現地調査",
      description: "実際の物件を確認し、最適なプランを提案",
      duration: "3-5日",
      icon: "ri-search-line"
    },
    {
      title: "正式見積",
      description: "詳細な見積書を作成・提出",
      duration: "2-3日",
      icon: "ri-file-text-line"
    },
    {
      title: "契約・着工",
      description: "契約完了後、工事開始",
      duration: "1-2週間",
      icon: "ri-hammer-line"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <Header currentPage="使い方" />

      {/* ヒーローセクション */}
      <section className="relative bg-gray-50 py-16 sm:py-20 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Step%20by%20step%20renovation%20process%20illustration%2C%20modern%20Japanese%20apartment%20transformation%2C%20professional%20interior%20design%20workflow%2C%20clean%20minimalist%20aesthetic%2C%20natural%20lighting%2C%20architectural%20photography%20style%2C%20simple%20clean%20background&width=1400&height=900&seq=17&orientation=landscape')`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 lg:mb-8">
            使い方は<span className="text-teal-600">たった3ステップ</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 lg:mb-12 leading-relaxed max-w-4xl mx-auto">
            面倒な手続きは一切なし。写真選択から問い合わせまで、
            <br />
            すべてスマートフォンで完結します。
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/gallery" className="bg-teal-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
              今すぐ始める
            </Link>
            <Link href="/contact" className="border-2 border-teal-600 text-teal-600 px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-teal-50 transition-all duration-200 whitespace-nowrap cursor-pointer">
              無料相談
            </Link>
          </div>
        </div>
      </section>

      {/* 3ステップ詳細セクション */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              3ステップで完了
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              専門知識不要で、直感的に理想のリノベーションを実現
            </p>
          </div>

          {/* ステップナビゲーション */}
          <div className="flex justify-center mb-12 lg:mb-16">
            <div className="flex space-x-4 sm:space-x-8 bg-gray-100 p-2 rounded-full">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    activeStep === step.id
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  STEP {step.id}
                </button>
              ))}
            </div>
          </div>

          {/* アクティブステップ詳細 */}
          <div className="max-w-6xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`transition-all duration-300 ${
                  activeStep === step.id ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 ${step.color === 'teal' ? 'bg-teal-100' : 'bg-orange-100'} rounded-full flex items-center justify-center mr-4`}>
                        <i className={`${step.icon} text-2xl ${step.color === 'teal' ? 'text-teal-600' : 'text-orange-500'}`}></i>
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${step.color === 'teal' ? 'text-teal-600' : 'text-orange-500'} mb-1`}>
                          STEP {step.id}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-lg text-gray-600 mt-1">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="space-y-3">
                      {step.details.map((detail, index) => (
                        <div key={index} className="flex items-start">
                          <i className="ri-check-line text-teal-600 text-xl mr-3 mt-1"></i>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <div className="relative">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 sm:h-80 lg:h-96 object-cover object-top rounded-2xl shadow-lg"
                      />
                      <div className={`absolute top-4 left-4 ${step.color === 'teal' ? 'bg-teal-600' : 'bg-orange-500'} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                        STEP {step.id}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 問い合わせ後のフローセクション */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              問い合わせ後の流れ
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              専門スタッフが丁寧にサポート。完成まで安心してお任せください。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i className={`${step.icon} text-2xl text-teal-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="text-center">
                  <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {step.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 進捗確認セクション */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                工事中も安心
                <br />
                <span className="text-teal-600">リアルタイム進捗共有</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                工事の進捗状況を写真付きでリアルタイムに共有。
                完成まで安心してお任せいただけます。
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="ri-camera-line text-teal-600 text-xl mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">写真付き進捗報告</h4>
                    <p className="text-gray-600">毎日の作業状況を写真で確認できます</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="ri-message-2-line text-teal-600 text-xl mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">直接コミュニケーション</h4>
                    <p className="text-gray-600">疑問点はすぐに担当者へ相談可能</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="ri-calendar-check-line text-teal-600 text-xl mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">スケジュール管理</h4>
                    <p className="text-gray-600">完成予定日まで明確に管理</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://readdy.ai/api/search-image?query=Construction%20progress%20tracking%20on%20smartphone%20app%2C%20renovation%20work%20updates%20with%20photos%2C%20professional%20construction%20site%20management%2C%20modern%20technology%20interface%2C%20clean%20organized%20workspace%2C%20simple%20clean%20background&width=600&height=500&seq=18&orientation=landscape"
                alt="工事進捗管理"
                className="w-full h-80 sm:h-96 object-cover object-top rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問セクション */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              よくある質問
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              使い方について、よくお寄せいただくご質問
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "本当に写真を選ぶだけで発注できるのですか？",
                answer: "はい。豊富な事例写真からお好みのスタイルを選択し、平米数を入力するだけで概算費用が分かります。その後、お問い合わせフォームから詳細相談を開始していただけます。"
              },
              {
                question: "概算費用と実際の費用に差はありますか？",
                answer: "概算費用は標準的な工事内容での算出となります。現地調査後に詳細見積をご提示し、大幅な変更がない限り概算費用から大きく乖離することはありません。"
              },
              {
                question: "工事期間中の住居はどうなりますか？",
                answer: "工事範囲により異なりますが、多くの場合は住みながらの工事が可能です。事前の現地調査で最適な工事スケジュールをご提案いたします。"
              },
              {
                question: "アフターサポートはありますか？",
                answer: "はい。工事完了後も1年間の保証期間を設けており、不具合やご不明な点がございましたら随時サポートいたします。"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Q. {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/faq" className="text-teal-600 hover:text-teal-700 font-semibold text-lg cursor-pointer">
              すべてのよくある質問を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 sm:py-20 lg:py-28 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            今すぐ始めよう
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 leading-relaxed">
            写真を選んで、面積を入力するだけ。
            <br />
            あとはプロにお任せください。
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/gallery" className="bg-white text-teal-600 px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
              事例を見る
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 whitespace-nowrap cursor-pointer">
              無料相談
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <Footer />
    </div>
  );
}