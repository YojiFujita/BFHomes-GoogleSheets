
'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Link href="/" className="text-lg sm:text-2xl font-pacifico text-white cursor-pointer">
                Before-After Homes
              </Link>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/about" className="text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">サービス概要</Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">使い方</Link>
              <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">ギャラリー</Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">料金・見積</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">よくある質問</Link>
              <Link href="/contact" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer">
                お問い合わせ
              </Link>
            </nav>
            <button className="lg:hidden text-white p-2">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative bg-gray-50 py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20Japanese%20apartment%20renovation%20concept%20illustration%20showing%20traditional%20old%20room%20transforming%20into%20contemporary%20bright%20space%2C%20clean%20architectural%20drawing%20style%2C%20minimalist%20design%2C%20professional%20business%20presentation%20aesthetic%2C%20simple%20clean%20background&width=1400&height=800&seq=about1&orientation=landscape')`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              従来のリノベーションを
革新する仕組み
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
              100室超の実績が証明。大家目線で厳選した"安価で効果的"リフォームを写真から選ぶだけ。
            </p>
          </div>
        </div>
      </section>

      {/* 従来 vs Before-After Homes 比較セクション */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              従来のリノベーション vs Before-After Homes
            </h2>
            <p className="text-xl text-gray-600">
              面倒な手続きを一切排除した、革新的なアプローチ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* 従来のリノベーション */}
            <div className="bg-red-50 p-8 lg:p-12 rounded-3xl border-2 border-red-200">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-close-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-red-600">
                  従来のリノベーション
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-close-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">複雑な専門用語</h4>
                    <p className="text-gray-600">建材の品番、工法、専門知識が必要で初心者には理解困難</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-close-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">見積もりまで時間がかかる</h4>
                    <p className="text-gray-600">現地調査、詳細打ち合わせが必要で、見積もりまで数週間</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-close-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">完成イメージが不明確</h4>
                    <p className="text-gray-600">図面や説明だけでは最終的な仕上がりが想像しづらい</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-close-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">複数業者との調整が必要</h4>
                    <p className="text-gray-600">設計事務所、工務店、内装業者との個別調整が必要</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Before-After Homes */}
            <div className="bg-teal-50 p-8 lg:p-12 rounded-3xl border-2 border-teal-200">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-check-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-teal-600">
                  Before-After Homes
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">写真で一目瞭然</h4>
                    <p className="text-gray-600">Before/After写真を見るだけで完成イメージが直感的に理解可能</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">5秒で見積もり</h4>
                    <p className="text-gray-600">面積入力だけで即座に概算費用を表示、待ち時間ゼロ</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">完成保証</h4>
                    <p className="text-gray-600">選んだ写真通りの仕上がりを保証、イメージの食い違いなし</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">ワンストップ対応</h4>
                    <p className="text-gray-600">設計から施工まで全て当社が対応、面倒な調整は不要</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3つの強みセクション */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Before-After Homes の3つの強み
            </h2>
            <p className="text-xl text-gray-600">
              専門知識不要で、誰でも簡単にリノベーションを実現
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* 強み1 */}
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <i className="ri-image-2-line text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  写真で一目瞭然
                </h3>
                <img
                  src="https://readdy.ai/api/search-image?query=Split%20screen%20showing%20before%20and%20after%20Japanese%20apartment%20renovation%2C%20left%20side%20shows%20old%20traditional%20room%20with%20worn%20tatami%20and%20dark%20wood%2C%20right%20side%20shows%20modern%20bright%20space%20with%20contemporary%20flooring%20and%20lighting%2C%20clean%20comparison%20layout%2C%20professional%20real%20estate%20photography%20style%2C%20simple%20clean%20background&width=400&height=300&seq=about2&orientation=landscape"
                  alt="Before After comparison"
                  className="w-full h-48 object-cover object-top rounded-2xl mb-6"
                />
                <p className="text-gray-600 leading-relaxed">
                  現役大家が100室以上で検証した"効果あるリフォーム"を、Before/After写真で直感的に比較。
                </p>
              </div>
            </div>

            {/* 強み2 */}
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <i className="ri-timer-flash-line text-3xl text-orange-500"></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  5秒で見積もり
                </h3>
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20smartphone%20showing%20instant%20renovation%20cost%20calculator%20app%20with%20simple%20interface%2C%20clean%20numbers%20and%20pricing%20display%2C%20contemporary%20mobile%20UI%20design%2C%20professional%20app%20screenshot%20style%2C%20bright%20clean%20background&width=400&height=300&seq=about3&orientation=landscape"
                  alt="Quick estimate"
                  className="w-full h-48 object-cover object-top rounded-2xl mb-6"
                />
                <p className="text-gray-600 leading-relaxed">
                  安価で効果的なプランを自動計算。選ぶだけで最適コストを提示。
                </p>
              </div>
            </div>

            {/* 強み3 */}
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <i className="ri-smartphone-line text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  スマホで完結
                </h3>
                <img
                  src="https://readdy.ai/api/search-image?query=Person%20using%20smartphone%20to%20manage%20home%20renovation%20project%2C%20showing%20progress%20photos%20and%20communication%20with%20contractors%2C%20modern%20mobile%20app%20interface%2C%20contemporary%20lifestyle%20photography%2C%20clean%20professional%20background&width=400&height=300&seq=about4&orientation=landscape"
                  alt="Mobile complete solution"
                  className="w-full h-48 object-cover object-top rounded-2xl mb-6"
                />
                <p className="text-gray-600 leading-relaxed">
                  大家経験に基づく安心プランを、すべてオンラインで簡単に依頼可能。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 仕組みの説明セクション */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              専門知識不要で実現する仕組み
            </h2>
            <p className="text-xl text-gray-600">
              初心者でも安心して利用できる、シンプルで確実なプロセス
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20renovation%20team%20working%20on%20Japanese%20apartment%20interior%2C%20showing%20skilled%20craftsmen%20installing%20modern%20flooring%20and%20lighting%2C%20high%20quality%20workmanship%2C%20contemporary%20construction%20process%2C%20clean%20professional%20environment%2C%20natural%20lighting&width=600&height=400&seq=about5&orientation=landscape"
                alt="Professional renovation process"
                className="w-full h-80 object-cover object-top rounded-3xl shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
                プロが全て対応するから安心
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-user-star-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">経験豊富な職人チーム</h4>
                    <p className="text-gray-600">20年以上の実績を持つ熟練職人が、品質の高い施工を保証します</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-shield-check-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">品質保証システム</h4>
                    <p className="text-gray-600">施工後2年間の品質保証と、24時間対応のアフターサポート</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-camera-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">リアルタイム進捗共有</h4>
                    <p className="text-gray-600">工事中の写真を毎日アップロード、進捗状況を常に確認できます</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className="ri-money-dollar-circle-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">透明性のある料金体系</h4>
                    <p className="text-gray-600">追加費用なしの明確な料金設定、見積もり後の変更なし</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 利用者の声セクション */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 補足帯を追加 */}
          <div className="bg-teal-600 text-white rounded-2xl p-6 lg:p-8 mb-12 lg:mb-16 text-center">
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed">
              Before-After Homes のプランは、現役大家が100部屋以上で検証済み。安価で効果があると実証されたものだけを厳選しています。
            </p>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              利用者の声
            </h2>
            <p className="text-xl text-gray-600">
              実際にご利用いただいた大家さんからの評価
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "田中様",
                property: "東京都渋谷区 1LDK",
                rating: 5,
                comment: "写真を見て選ぶだけで、想像以上の仕上がりになりました。専門知識がなくても安心して任せられる素晴らしいサービスです。",
                avatar: "https://readdy.ai/api/search-image?query=Professional%20Japanese%20middle-aged%20man%20in%20business%20suit%2C%20friendly%20smile%2C%20clean%20portrait%20photography%2C%20corporate%20headshot%20style%2C%20bright%20clean%20background&width=150&height=150&seq=avatar1&orientation=squarish"
              },
              {
                name: "佐藤様",
                property: "東京都新宿区 2DK",
                rating: 5,
                comment: "5秒で見積もりが出るのには驚きました。従来の面倒な手続きが一切なく、スムーズに進められました。",
                avatar: "https://readdy.ai/api/search-image?query=Professional%20Japanese%20woman%20in%20business%20attire%2C%20warm%20smile%2C%20clean%20portrait%20photography%2C%20corporate%20headshot%20style%2C%20bright%20clean%20background&width=150&height=150&seq=avatar2&orientation=squarish"
              },
              {
                name: "山田様",
                property: "東京都港区 3LDK",
                rating: 5,
                comment: "スマホで全て完結できるのが本当に便利。忙しい中でも進捗を確認できて、安心して任せられました。",
                avatar: "https://readdy.ai/api/search-image?query=Professional%20Japanese%20senior%20man%20with%20glasses%2C%20confident%20expression%2C%20clean%20portrait%20photography%2C%20corporate%20headshot%20style%2C%20bright%20clean%20background&width=150&height=150&seq=avatar3&orientation=squarish"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover object-top mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.property}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400 text-xl mr-1"></i>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 lg:py-24 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            写真を選ぶだけ。現役大家が100部屋以上で検証した
            <br />
            "安価で効果的"リフォームをお届け。
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
            専門知識は一切不要。まずは気軽にご相談ください。
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact" className="bg-white text-teal-600 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
              無料相談申込み
            </Link>
            <Link href="/gallery" className="border-2 border-white text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 whitespace-nowrap cursor-pointer">
              事例を見る
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
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
    </div>
  );
}
