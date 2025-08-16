
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [estimateData, setEstimateData] = useState({
    area: '',
    roomType: 'living'
  });
  const [showEstimate, setShowEstimate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [carouselPosition, setCarouselPosition] = useState(1); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setCarouselPosition(1);
        setTimeout(() => {
          const container = document.getElementById('carousel-container');
          if (container) {
            const cardWidth = 400; 
            container.scrollTo({ left: cardWidth * 1, behavior: 'smooth' });
          }
        }, 100);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const beforeAfterExamples = [
    {
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20apartment%20interior%20with%20worn%20tatami%20mats%2C%20dark%20wooden%20floors%2C%20outdated%20lighting%20fixtures%2C%20cramped%20layout%2C%20dim%20natural%20lighting%2C%20dated%20wallpaper%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=800&height=600&seq=1&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20apartment%20interior%20with%20light%20wooden%20flooring%2C%20white%20walls%2C%20contemporary%20LED%20lighting%2C%20open%20layout%2C%20large%20windows%20with%20natural%20light%2C%20minimalist%20design%2C%20clean%20and%20spacious%20feeling%2C%20simple%20clean%20background&width=800&height=600&seq=2&orientation=landscape",
      title: "伝統的な和室から現代的なリビングへ",
      description: "明るい木目フローリング + 白基調の壁で開放的な空間に生まれ変わりました。天然木の温もりと白い壁のコントラストが美しく、自然光を最大限に活かした設計となっています。",
      price: "45万円",
      period: "7日間",
      location: "東京都渋谷区",
      date: "2024年1月"
    },
    {
      before: "https://readdy.ai/api/search-image?query=Old%20cramped%20Japanese%20kitchen%20with%20outdated%20appliances%2C%20dark%20countertops%2C%20poor%20lighting%2C%20limited%20storage%20space%2C%20worn%20cabinets%2C%20traditional%20but%20inefficient%20layout%2C%20simple%20clean%20background&width=800&height=600&seq=3&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20kitchen%20with%20white%20cabinets%2C%20marble%20countertops%2C%20under-cabinet%20LED%20lighting%2C%20efficient%20storage%20solutions%2C%20contemporary%20appliances%2C%20clean%20minimalist%20design%2C%20simple%20clean%20background&width=800&height=600&seq=4&orientation=landscape",
      title: "古いキッチンから機能的な空間へ",
      description: "白いキャビネット + 間接照明で清潔感あふれるモダンキッチンに。収納効率を大幅に向上させ、調理動線も最適化しました。LED照明により作業効率も格段にアップしています。",
      price: "38万円",
      period: "5日間",
      location: "東京都新宿区",
      date: "2024年2月"
    },
    {
      before: "https://readdy.ai/api/search-image?query=Old%20small%20Japanese%20bathroom%20with%20outdated%20tiles%2C%20poor%20lighting%2C%20cramped%20space%2C%20traditional%20fixtures%2C%20worn%20surfaces%2C%20dim%20and%20uninviting%20atmosphere%2C%20simple%20clean%20background&width=800&height=600&seq=5&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20luxurious%20Japanese%20bathroom%20with%20contemporary%20tiles%2C%20bright%20LED%20lighting%2C%20spacious%20layout%2C%20modern%20fixtures%2C%20clean%20surfaces%2C%20spa-like%20atmosphere%20with%20natural%20elements%2C%20simple%20clean%20background&width=800&height=600&seq=6&orientation=landscape",
      title: "狭い浴室からスパのような空間へ",
      description: "現代的なタイル + 高級感のある照明でホテルライクな浴室に変身。防水性能を向上させながら、リラックスできる空間設計を実現しました。",
      price: "52万円",
      period: "8日間",
      location: "東京都港区",
      date: "2024年3月"
    },
    {
      before: "https://readdy.ai/api/search-image?query=Old%20Japanese%20bedroom%20with%20traditional%20tatami%20flooring%2C%20dark%20wooden%20furniture%2C%20poor%20natural%20lighting%2C%20cramped%20space%2C%20outdated%20traditional%20style%2C%20simple%20clean%20background&width=800&height=600&seq=8&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20bedroom%20with%20light%20hardwood%20floors%2C%20contemporary%20furniture%2C%20excellent%20natural%20lighting%2C%20spacious%20layout%2C%20minimalist%20modern%20decor%2C%20simple%20clean%20background&width=800&height=600&seq=9&orientation=landscape",
      title: "昔ながらの寝室からモダン空間へ",
      description: "フローリング + 現代的な家具配置で快適な寝室に。睡眠の質を向上させる照明設計と、収納効率を考慮したレイアウトが特徴です。",
      price: "42万円",
      period: "6日間",
      location: "東京都世田谷区",
      date: "2024年4月"
    },
    {
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20entryway%20with%20worn%20wooden%20floors%2C%20outdated%20storage%2C%20poor%20lighting%2C%20cramped%20layout%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=800&height=600&seq=10&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20entryway%20with%20contemporary%20flooring%2C%20efficient%20storage%20solutions%2C%20excellent%20LED%20lighting%2C%20spacious%20organized%20layout%2C%20clean%20minimalist%20design%2C%20simple%20clean%20background&width=800&height=600&seq=11&orientation=landscape",
      title: "玄関から始まる新しい暮らし",
      description: "効率的な収納 + LED照明で機能的な玄関に。第一印象を決める重要な空間として、来客時の印象も大幅に向上させました。",
      price: "28万円",
      period: "4日間",
      location: "東京都品川区",
      date: "2024年5月"
    },
    {
      before: "https://readdy.ai/api/search-image?query=Old%20Japanese%20dining%20area%20with%20traditional%20low%20table%2C%20tatami%20seating%2C%20poor%20lighting%2C%20cramped%20space%2C%20outdated%20traditional%20style%2C%20simple%20clean%20background&width=800&height=600&seq=12&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20dining%20area%20with%20contemporary%20dining%20table%2C%20modern%20chairs%2C%20excellent%20lighting%2C%20spacious%20layout%2C%20stylish%20modern%20interior%20design%2C%20simple%20clean%20background&width=800&height=600&seq=13&orientation=landscape",
      title: "食事空間の現代的な変身",
      description: "ダイニングテーブル + モダンチェアで家族団らんの時間をより豊かに。照明計画により食事の時間がより楽しくなる空間に仕上げました。",
      price: "35万円",
      period: "5日間",
      location: "東京都目黒区",
      date: "2024年6月"
    }
  ];

  const calculateEstimate = () => {
    const basePrice = parseFloat(estimateData.area) * 15000;
    const multiplier = estimateData.roomType === 'kitchen' ? 1.3 : estimateData.roomType === 'bathroom' ? 1.5 : 1.0;
    return Math.round(basePrice * multiplier);
  };

  const handleEstimate = () => {
    if (estimateData.area) {
      setShowEstimate(true);
    }
  };

  const openModal =  (project: any) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const scrollLeft = () => {
    const container = document.getElementById('carousel-container');
    if (container) {
      const cardWidth = isMobile ? 320 : 400;
      const currentPosition = Math.round(container.scrollLeft / cardWidth);
      const newPosition = currentPosition === 0 ? beforeAfterExamples.length - 1 : currentPosition - 1;
      container.scrollTo({ left: cardWidth * newPosition, behavior: 'smooth' });
      setCarouselPosition(newPosition);
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('carousel-container');
    if (container) {
      const cardWidth = isMobile ? 320 : 400;
      const currentPosition = Math.round(container.scrollLeft / cardWidth);
      const newPosition = currentPosition === beforeAfterExamples.length - 1 ? 0 : currentPosition + 1;
      container.scrollTo({ left: cardWidth * newPosition, behavior: 'smooth' });
      setCarouselPosition(newPosition);
    }
  };
  const goToSlide = (index: number) => {
    const container = document.getElementById('carousel-container');
    if (container) {
      const cardWidth = isMobile ? 320 : 400;
      container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      setCarouselPosition(index);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* レスポンシブヘッダー */}
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Link href="/" className="text-lg sm:text-2xl font-pacifico text-white cursor-pointer">
                Before-After Homes
              </Link>
            </div>
            {/* デスクトップナビゲーション */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">サービス概要</Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">使い方</Link>
              <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">ギャラリー</Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">料金・見積</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">よくある質問</Link>
              <Link href="/contact" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer">
                お問い合わせ
              </Link>
            </nav>
            {/* モバイルメニューボタン */}
            <button className="lg:hidden text-white p-2">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* レスポンシブヒーローセクション */}
      <section className="relative bg-gray-50 py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20apartment%20renovation%20showcase%20with%20before%20and%20after%20comparison%2C%20professional%20interior%20design%2C%20clean%20minimalist%20aesthetic%2C%20natural%20lighting%2C%20contemporary%20furniture%2C%20architectural%20photography%20style%2C%20wide%20angle%20view%2C%20simple%20clean%20background&width=1400&height=900&seq=7&orientation=landscape')`
          }}
        /div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              写真を選び、広さを入力。
              <br />
              <span className="text-teal-600">あとはプロに任せるだけ。</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed px-4">
              品番いらず・5秒で見積
              <br />
              Before / After 写真を比較するだけで完成イメージを直感的に掴める
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
              <Link href="/contact" className="bg-teal-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer mb-6 lg:mb-8 w-full sm:w-52 sm:h-16 flex items-center justify-center">
                見積もり相談
              </Link>
              <Link href="/gallery" className="border-2 border-teal-600 text-teal-600 px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-teal-50 transition-all duration-200 whitespace-nowrap cursor-pointer w-full sm:w-52 sm:h-16 flex items-center justify-center">
                事例を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* レスポンシブギャラリーセクション */}
      <section id="gallery" className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              写真が主役のリノベーション
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Before と After を比較して、理想の空間を見つけよう
            </p>
          </div>

          <div className="relative">
            {/* デスクトップ用左右ナビゲーション */}
            <button
              onClick={scrollLeft}
              className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </button>
            <button
              onClick={scrollRight}
              className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <i className="ri-arrow-right-line text-xl text-gray-700"></i>
            </button>

            {/* レスポンシブカルーセルコンテナ */}
            <div
              id="carousel-container"
              className={`flex overflow-x-auto gap-4 lg:gap-8 pb-4 scrollbar-hide scroll-smooth px-4 lg:px-16 ${isMobile ? '' : 'justify-start'}`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {beforeAfterExamples.map((project, index) => {
                const isCenter = !isMobile && carouselPosition === index;
                const isSide = !isMobile && Math.abs(carouselPosition - index) === 1;
                const isVisible = !isMobile && Math.abs(carouselPosition - index) <= 1;

                return (
                  <div
                    key={index}
                    onClick={() => openModal(project)}
                    className={`flex-shrink-0 transition-all duration-300 cursor-pointer group bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 ${isMobile ? 'w-72 p-4' : isCenter ? 'w-[700px] lg:w-[800px] opacity-100 scale-100 p-6 lg:p-8 z-10 relative' : isSide ? 'w-[280px] lg:w-[320px] opacity-40 scale-85 hover:opacity-60 p-4 lg:p-5' : 'w-[200px] lg:w-[250px] opacity-20 scale-75 p-3 lg:p-4'} ${!isMobile && !isVisible ? 'hidden' : ''}`}
                  >
                    <div className="grid grid-cols-2 gap-2 lg:gap-4 mb-3 lg:mb-6">
                      <div className="relative">
                        <div
                          className={`absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full font-semibold z-10 shadow-md ${isMobile || isCenter ? 'text-xs' : isSide ? 'text-xs scale-90' : 'text-xs scale-75'}`}
                        >
                          BEFORE
                        </div>
                        <img
                          src={project.before}
                          alt="Before renovation"
                          className={`w-full object-cover object-top rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200 ${isMobile ? 'h-24' : isCenter ? 'h-56 lg:h-64' : isSide ? 'h-32 lg:h-36' : 'h-24 lg:h-28'}`}
                        />
                      </div>
                      <div className="relative">
                        <div
                          className={`absolute top-2 left-2 bg-teal-600 text-white px-2 py-1 rounded-full font-semibold z-10 shadow-md ${isMobile || isCenter ? 'text-xs' : isSide ? 'text-xs scale-90' : 'text-xs scale-75'}`}
                        >
                          AFTER
                        </div>
                        <img
                          src={project.after}
                          alt="After renovation"
                          className={`w-full object-cover object-top rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200 ${isMobile ? 'h-24' : isCenter ? 'h-56 lg:h-64' : isSide ? 'h-32 lg:h-36' : 'h-24 lg:h-28'}`}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3
                        className={`font-bold mb-2 line-clamp-2 ${isMobile ? 'text-sm' : isCenter ? 'text-xl lg:text-2xl' : isSide ? 'text-sm lg:text-base' : 'text-xs lg:text-sm'}`}
                      >
                        {project.title}
                      </h3>
                      <div
                        className={`flex justify-center items-center space-x-2 lg:space-x-4 text-gray-600 ${isMobile ? 'text-xs' : isCenter ? 'text-base' : isSide ? 'text-sm' : 'text-xs'}`}
                      >
                        {(isCenter || isMobile) && (
                          <>
                            <span className="text-teal-600 font-bold">{project.price}</span>
                            <span>•</span>
                            <span>{project.period}</span>
                          </>
                        )}
                        {isSide && !isMobile && (
                          <span className="text-teal-600 font-bold text-sm">{project.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* レスポンシブプログレスバー */}
            <div className="flex justify-center mt-6 lg:mt-8 space-x-2">
              {Array.from({ length: beforeAfterExamples.length }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-200 cursor-pointer ${isMobile ? index === Math.floor(carouselPosition) : carouselPosition === index ? 'bg-teal-600 w-6 lg:w-8' : 'bg-gray-300 w-3 lg:w-4 hover:bg-gray-400'}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* デスクトップ用スクロール表示 */}
            <div className="hidden lg:flex justify-between items-center mt-6 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-arrow-left-right-line"></i>
                <span>左右にスクロールして他の事例を見る</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{carouselPosition + 1}</span>
                <span>/</span>
                <span>{beforeAfterExamples.length}</span>
              </div>
            </div>
          </div>

          {/* すべての事例を見るボタン */}
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/gallery" className="bg-teal-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer inline-block">
              すべての事例を見る
            </Link>
          </div>
        </div>
      </section>

      {/* レスポンシブモーダル */}
      {modalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 lg:p-8">
              {/* レスポンシブヘッダー */}
              <div className="flex justify-between items-start mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 pr-4 leading-tight">
                  {selectedProject.title: string } | null
                </h2>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer flex-shrink-0"
                >
                  <i className="ri-close-line text-lg lg:text-xl text-gray-600"></i>
                </button>
              </div>

              {/* レスポンシブ画像セクション */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-6 lg:mb-8">
                <div className="relative">
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-lg font-semibold z-10 shadow-lg">
                    BEFORE
                  </div>
                  <img
                    src={selectedProject.before}
                    alt="Before renovation"
                    className="w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover object-top rounded-2xl shadow-lg"
                  />
                </div>
                <div className="relative">
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-teal-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-lg font-semibold z-10 shadow-lg">
                    AFTER
                  </div>
                  <img
                    src={selectedProject.after}
                    alt="After renovation"
                    className="w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover object-top rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              {/* レスポンシブ詳細情報 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    プロジェクト詳細
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500 mb-1">
                          費用
                        </div>
                        <div className="text-lg sm:text-2xl font-bold text-teal-600">
                          {selectedProject.price}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500 mb-1">
                          工期
                        </div>
                        <div className="text-base sm:text-xl font-semibold text-gray-900">
                          {selectedProject.period}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500 mb-1">
                          場所
                        </div>
                        <div className="text-sm sm:text-lg text-gray-900">
                          {selectedProject.location}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500 mb-1">
                          完成
                        </div>
                        <div className="text-sm sm:text-lg text-gray-900">
                          {selectedProject.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    この事例で見積もり
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    同様のリノベーションをご希望の場合は、こちらから見積もりをご依頼いただけます。
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <Link href="/contact" className="block w-full bg-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-teal-700 transition-all duration-200 whitespace-nowrap cursor-pointer text-center">
                      このプランで相談
                    </Link>
                    <Link href="/gallery" className="block w-full border-2 border-teal-600 text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-teal-50 transition-all duration-200 whitespace-nowrap cursor-pointer text-center">
                      類似事例を見る
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* レスポンシブ見積もりセクション */}
      <section id="estimate" className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              5秒で見積もり
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              広さと部屋タイプを選ぶだけで概算費用がわかります
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  面積（㎡）
                </label>
                <input
                  type="number"
                  value={estimateData.area}
                  onChange={(e) =>
                    setEstimateData({ ...estimateData, area: e.target.value })
                  }
                  placeholder="例: 20"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  部屋タイプ
                </label>
                <div className="relative">
                  <select
                    value={estimateData.roomType}
                    onChange={(e) =>
                      setEstimateData({ ...estimateData, roomType: e.target.value })
                    }
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none appearance-none bg-white pr-10 sm:pr-12 transition-colors duration-200 cursor-pointer"
                  >
                    <option value="living">リビング・居室</option>
                    <option value="kitchen">キッチン</option>
                    <option value="bathroom">浴室・洗面所</option>
                  </select>
                  <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-lg sm:text-xl text-gray-500"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleEstimate}
                className="bg-orange-400 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-orange-500 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer mb-6 lg:mb-8 w-full sm:w-auto"
              >
                概算見積を表示
              </button>

              {showEstimate && estimateData.area && (
                <div className="bg-teal-50 rounded-2xl p-6 lg:p-8 border-2 border-teal-200">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-2">
                    {calculateEstimate().toLocaleString()}円
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                    概算費用（税込）
                  </p>
                  <Link href="/contact" className="inline-block bg-teal-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-teal-700 transition-all duration-200 whitespace-nowrap cursor-pointer">
                    詳細見積を依頼する
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* レスポンシブ機能セクション */}
      <section id="features" className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              "品番いらず"の直感体験
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              専門知識がなくても、写真を選ぶだけで理想のリノベーションが実現
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6 lg:mb-8 mx-auto">
                <i className="ri-image-line text-2xl sm:text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
                写真で一目瞭然
              </h3>
              <p className="text-gray-600 text-center text-base sm:text-lg leading-relaxed">
                Before と After を並べて比較。専門用語不要で直感的に理解できます。
              </p>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 lg:mb-8 mx-auto">
                <i className="ri-time-line text-2xl sm:text-3xl text-orange-500"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
                5秒で見積もり
              </h3>
              <p className="text-gray-600 text-center text-base sm:text-lg leading-relaxed">
                面積と部屋タイプを入力するだけで、即座に概算費用を表示。
              </p>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6 lg:mb-8 mx-auto">
                <i className="ri-smartphone-line text-2xl sm:text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
                スマホで完結
              </h3>
              <p className="text-gray-600 text-center text-base sm:text-lg leading-relaxed">
                発注から進捗確認まで、すべてスマートフォンで完結。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* レスポンシブステップセクション */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              簡単3ステップで完了
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              面倒な手続きは一切なし
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "写真を選択",
                description: "豊富な After 事例から好みのデザインを選択",
                icon: "ri-heart-line",
                color: "teal"
              },
              {
                step: "02",
                title: "平米数を入力",
                description: "お部屋の広さを入力して概算費用を確認",
                icon: "ri-ruler-line",
                color: "orange"
              },
              {
                step: "03",
                title: "問い合わせ",
                description: "フォームから詳細相談・見積依頼を送信",
                icon: "ri-mail-line",
                color: "teal"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${item.color === 'teal' ? 'bg-teal-100' : 'bg-orange-100'} rounded-full flex items-center justify-center mb-6 lg:mb-8 mx-auto group-hover:scale-110 transition-transform duration-200`}
                >
                  <i
                    className={`${item.icon} text-2xl sm:text-3xl lg:text-4xl ${item.color === 'teal' ? 'text-teal-600' : 'text-orange-500'}`}
                  ></i>
                </div>
                <div
                  className={`text-xs sm:text-sm font-bold ${item.color === 'teal' ? 'text-teal-600' : 'text-orange-500'} mb-2 sm:mb-3`}
                >
                  STEP {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 lg:mt-16">
            <Link href="/how-it-works" className="text-teal-600 hover:text-teal-700 font-semibold text-lg cursor-pointer">
              詳しい使い方を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* レスポンシブCTAセクション */}
      <section className="py-12 sm:py-16 lg:py-24 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            品番ゼロ、写真ひとつで。
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 leading-relaxed px-4">
            リノベ初心者の大家さんにも
            <br />
            「自分にもできそう！」と直感的に伝わるプラットフォーム
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
            <Link href="/contact" className="bg-white text-teal-600 px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
              見積もり相談
            </Link>
            <Link href="/about" className="border-2 border-white text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 whitespace-nowrap cursor-pointer">
              サービス詳細
            </Link>
          </div>
        </div>
      </section>

      {/* レスポンシブフッター */}
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

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
