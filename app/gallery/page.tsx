'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'すべて', icon: 'ri-home-line' },
    { id: 'modern', name: 'モダン', icon: 'ri-building-line' },
    { id: 'natural', name: 'ナチュラル', icon: 'ri-leaf-line' },
    { id: 'vintage', name: 'ヴィンテージ', icon: 'ri-time-line' },
    { id: 'luxury', name: 'ラグジュアリー', icon: 'ri-vip-crown-line' },
    { id: 'minimal', name: 'ミニマル', icon: 'ri-subtract-line' }
  ];

  const projects = [
    {
      id: 1,
      title: "伝統的な和室から現代的なリビングへ",
      category: 'modern',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20apartment%20interior%20with%20worn%20tatami%20mats%2C%20dark%20wooden%20floors%2C%20outdated%20lighting%20fixtures%2C%20cramped%20layout%2C%20dim%20natural%20lighting%2C%20dated%20wallpaper%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=600&height=400&seq=1&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20apartment%20interior%20with%20light%20wooden%20flooring%2C%20white%20walls%2C%20contemporary%20LED%20lighting%2C%20open%20layout%2C%20large%20windows%20with%20natural%20light%2C%20minimalist%20design%2C%20clean%20and%20spacious%20feeling%2C%20simple%20clean%20background&width=600&height=400&seq=2&orientation=landscape",
      description: "明るい木目フローリング + 白基調の壁で開放的な空間に生まれ変わりました。天然木の温もりと白い壁のコントラストが美しく、自然光を最大限に活かした設計となっています。",
      price: "45万円",
      period: "7日間",
      location: "東京都渋谷区",
      date: "2024年1月",
      area: "30㎡",
      popular: true
    },
    {
      id: 2,
      title: "古いキッチンから機能的な空間へ",
      category: 'modern',
      before: "https://readdy.ai/api/search-image?query=Old%20cramped%20Japanese%20kitchen%20with%20outdated%20appliances%2C%20dark%20countertops%2C%20poor%20lighting%2C%20limited%20storage%20space%2C%20worn%20cabinets%2C%20traditional%20but%20inefficient%20layout%2C%20simple%20clean%20background&width=600&height=400&seq=3&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20kitchen%20with%20white%20cabinets%2C%20marble%20countertops%2C%20under-cabinet%20LED%20lighting%2C%20efficient%20storage%20solutions%2C%20contemporary%20appliances%2C%20clean%20minimalist%20design%2C%20simple%20clean%20background&width=600&height=400&seq=4&orientation=landscape",
      description: "白いキャビネット + 間接照明で清潔感あふれるモダンキッチンに。収納効率を大幅に向上させ、調理動線も最適化しました。LED照明により作業効率も格段にアップしています。",
      price: "38万円",
      period: "5日間",
      location: "東京都新宿区",
      date: "2024年2月",
      area: "25㎡",
      popular: false
    },
    {
      id: 3,
      title: "狭い浴室からスパのような空間へ",
      category: 'luxury',
      before: "https://readdy.ai/api/search-image?query=Old%20small%20Japanese%20bathroom%20with%20outdated%20tiles%2C%20poor%20lighting%2C%20cramped%20space%2C%20traditional%20fixtures%2C%20worn%20surfaces%2C%20dim%20and%20uninviting%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=5&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20luxurious%20Japanese%20bathroom%20with%20contemporary%20tiles%2C%20bright%20LED%20lighting%2C%20spacious%20layout%2C%20modern%20fixtures%2C%20clean%20surfaces%2C%20spa-like%20atmosphere%20with%20natural%20elements%2C%20simple%20clean%20background&width=600&height=400&seq=6&orientation=landscape",
      description: "現代的なタイル + 高級感のある照明でホテルライクな浴室に変身。防水性能を向上させながら、リラックスできる空間設計を実現しました。",
      price: "52万円",
      period: "8日間",
      location: "東京都港区",
      date: "2024年3月",
      area: "18㎡",
      popular: true
    },
    {
      id: 4,
      title: "昔ながらの寝室からモダン空間へ",
      category: 'modern',
      before: "https://readdy.ai/api/search-image?query=Old%20Japanese%20bedroom%20with%20traditional%20tatami%20flooring%2C%20dark%20wooden%20furniture%2C%20poor%20natural%20lighting%2C%20cramped%20space%2C%20outdated%20traditional%20style%2C%20simple%20clean%20background&width=600&height=400&seq=8&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20bedroom%20with%20light%20hardwood%20floors%2C%20contemporary%20furniture%2C%20excellent%20natural%20lighting%2C%20spacious%20layout%2C%20minimalist%20modern%20decor%2C%20simple%20clean%20background&width=600&height=400&seq=9&orientation=landscape",
      description: "フローリング + 現代的な家具配置で快適な寝室に。睡眠の質を向上させる照明設計と、収納効率を考慮したレイアウトが特徴です。",
      price: "42万円",
      period: "6日間",
      location: "東京都世田谷区",
      date: "2024年4月",
      area: "28㎡",
      popular: false
    },
    {
      id: 5,
      title: "玄関から始まる新しい暮らし",
      category: 'minimal',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20entryway%20with%20worn%20wooden%20floors%2C%20outdated%20storage%2C%20poor%20lighting%2C%20cramped%20layout%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=600&height=400&seq=10&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20entryway%20with%20contemporary%20flooring%2C%20efficient%20storage%20solutions%2C%20excellent%20LED%20lighting%2C%20spacious%20organized%20layout%2C%20clean%20minimalist%20design%2C%20simple%20clean%20background&width=600&height=400&seq=11&orientation=landscape",
      description: "効率的な収納 + LED照明で機能的な玄関に。第一印象を決める重要な空間として、来客時の印象も大幅に向上させました。",
      price: "28万円",
      period: "4日間",
      location: "東京都品川区",
      date: "2024年5月",
      area: "15㎡",
      popular: false
    },
    {
      id: 6,
      title: "食事空間の現代的な変身",
      category: 'natural',
      before: "https://readdy.ai/api/search-image?query=Old%20Japanese%20dining%20area%20with%20traditional%20low%20table%2C%20tatami%20seating%2C%20poor%20lighting%2C%20cramped%20space%2C%20outdated%20traditional%20style%2C%20simple%20clean%20background&width=600&height=400&seq=12&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20dining%20area%20with%20contemporary%20dining%20table%2C%20modern%20chairs%2C%20excellent%20lighting%2C%20spacious%20layout%2C%20natural%20wood%20elements%2C%20warm%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=13&orientation=landscape",
      description: "ダイニングテーブル + モダンチェアで家族団らんの時間をより豊かに。自然素材を活用し、照明計画により食事の時間がより楽しくなる空間に仕上げました。",
      price: "35万円",
      period: "5日間",
      location: "東京都目黒区",
      date: "2024年6月",
      area: "22㎡",
      popular: true
    },
    {
      id: 7,
      title: "ヴィンテージ感漂う書斎空間",
      category: 'vintage',
      before: "https://readdy.ai/api/search-image?query=Old%20cramped%20Japanese%20study%20room%20with%20poor%20lighting%2C%20outdated%20furniture%2C%20limited%20storage%2C%20traditional%20but%20inefficient%20layout%2C%20worn%20surfaces%2C%20simple%20clean%20background&width=600&height=400&seq=14&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20vintage-style%20Japanese%20study%20room%20with%20exposed%20brick%20walls%2C%20vintage%20furniture%2C%20warm%20lighting%2C%20efficient%20storage%2C%20leather%20chairs%2C%20classic%20design%20elements%2C%20simple%20clean%20background&width=600&height=400&seq=15&orientation=landscape",
      description: "レンガ調の壁 + ヴィンテージ家具で趣のある書斎に。集中力を高める照明設計と、書籍や資料を効率的に収納できる設計が特徴です。",
      price: "48万円",
      period: "7日間",
      location: "東京都中野区",
      date: "2024年7月",
      area: "20㎡",
      popular: false
    },
    {
      id: 8,
      title: "ラグジュアリーなマスターベッドルーム",
      category: 'luxury',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20bedroom%20with%20worn%20tatami%20flooring%2C%20outdated%20furniture%2C%20poor%20lighting%2C%20cramped%20space%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=600&height=400&seq=16&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20luxury%20Japanese%20bedroom%20with%20premium%20materials%2C%20elegant%20furniture%2C%20sophisticated%20lighting%2C%20spacious%20layout%2C%20high-end%20finishes%2C%20hotel-like%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=17&orientation=landscape",
      description: "高級素材 + 上質な照明でホテルライクな寝室に。プライベート空間としての快適性を追求し、最高の睡眠環境を提供する設計です。",
      price: "68万円",
      period: "10日間",
      location: "東京都港区",
      date: "2024年8月",
      area: "35㎡",
      popular: true
    },
    {
      id: 9,
      title: "ミニマルなワーキングスペース",
      category: 'minimal',
      before: "https://readdy.ai/api/search-image?query=Old%20cluttered%20Japanese%20work%20room%20with%20outdated%20furniture%2C%20poor%20organization%2C%20inadequate%20lighting%2C%20cramped%20layout%2C%20traditional%20but%20inefficient%20setup%2C%20simple%20clean%20background&width=600&height=400&seq=18&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20minimalist%20Japanese%20work%20room%20with%20clean%20lines%2C%20efficient%20storage%2C%20excellent%20lighting%2C%20spacious%20layout%2C%20contemporary%20furniture%2C%20organized%20workspace%2C%20simple%20clean%20background&width=600&height=400&seq=19&orientation=landscape",
      description: "シンプルな家具 + 整理された収納で集中できるワークスペースに。在宅勤務の効率を最大化する設計で、必要なものだけを厳選した空間です。",
      price: "32万円",
      period: "5日間",
      location: "東京都渋谷区",
      date: "2024年9月",
      area: "18㎡",
      popular: false
    },
    {
      id: 10,
      title: "自然素材あふれるリビングルーム",
      category: 'natural',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20living%20room%20with%20worn%20surfaces%2C%20outdated%20furniture%2C%20poor%20lighting%2C%20cramped%20space%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=600&height=400&seq=20&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20natural%20Japanese%20living%20room%20with%20wood%20elements%2C%20plants%2C%20natural%20lighting%2C%20organic%20textures%2C%20earth%20tones%2C%20eco-friendly%20materials%2C%20peaceful%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=21&orientation=landscape",
      description: "天然木 + 観葉植物で自然を感じるリビングに。環境にやさしい素材を使用し、家族がリラックスできる癒しの空間を実現しました。",
      price: "55万円",
      period: "8日間",
      location: "東京都杉並区",
      date: "2024年10月",
      area: "40㎡",
      popular: true
    },
    {
      id: 11,
      title: "モダンなファミリーキッチン",
      category: 'modern',
      before: "https://readdy.ai/api/search-image?query=Old%20cramped%20Japanese%20family%20kitchen%20with%20outdated%20appliances%2C%20poor%20storage%2C%20inefficient%20layout%2C%20worn%20surfaces%2C%20traditional%20but%20outdated%20design%2C%20simple%20clean%20background&width=600&height=400&seq=22&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20family%20kitchen%20with%20island%20counter%2C%20contemporary%20appliances%2C%20efficient%20storage%2C%20open%20layout%2C%20family-friendly%20design%2C%20clean%20minimalist%20style%2C%20simple%20clean%20background&width=600&height=400&seq=23&orientation=landscape",
      description: "アイランドキッチン + 効率的な収納で家族みんなが使いやすいキッチンに。調理、食事、コミュニケーションが自然に生まれる空間設計です。",
      price: "62万円",
      period: "9日間",
      location: "東京都練馬区",
      date: "2024年11月",
      area: "32㎡",
      popular: false
    },
    {
      id: 12,
      title: "ヴィンテージスタイルのカフェ空間",
      category: 'vintage',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20room%20with%20poor%20lighting%2C%20outdated%20furniture%2C%20worn%20surfaces%2C%20cramped%20layout%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=600&height=400&seq=24&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20vintage-style%20Japanese%20cafe%20space%20with%20exposed%20elements%2C%20vintage%20furniture%2C%20warm%20lighting%2C%20cozy%20atmosphere%2C%20rustic%20charm%2C%20antique%20accessories%2C%20simple%20clean%20background&width=600&height=400&seq=25&orientation=landscape",
      description: "アンティーク家具 + 温かみのある照明でカフェのような空間に。友人や家族との時間を特別なものにする、居心地の良い空間です。",
      price: "44万円",
      period: "6日間",
      location: "東京都台東区",
      date: "2024年12月",
      area: "26㎡",
      popular: true
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const popularProjects = projects.filter(project => project.popular);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <Header currentPage="ギャラリー" />

      {/* ヒーローセクション */}
      <section className="relative py-16 lg:py-24 bg-gray-50">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20Japanese%20interior%20renovation%20showcase%20gallery%20with%20multiple%20before%20and%20after%20comparisons%2C%20professional%20photography%2C%20clean%20minimalist%20design%2C%20natural%20lighting%2C%20modern%20aesthetic%2C%20architectural%20photography%20style%2C%20simple%20clean%20background&width=1400&height=600&seq=26&orientation=landscape')`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              リノベーション事例
              <span className="block text-teal-600">ギャラリー</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Before と After を比較して、あなたの理想の空間を見つけてください
            </p>
          </div>
        </div>
      </section>

      {/* 人気事例セクション */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              人気の事例
            </h2>
            <p className="text-lg text-gray-600">
              多くの方に選ばれている人気のリノベーション事例
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProjects.slice(0, 6).map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    人気
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                        BEFORE
                      </div>
                      <img
                        src={project.before}
                        alt="Before renovation"
                        className="w-full h-24 object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                        AFTER
                      </div>
                      <img
                        src={project.after}
                        alt="After renovation"
                        className="w-full h-24 object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-teal-600">{project.price}</span>
                    <span className="text-gray-600">{project.period}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{project.location}</span>
                    <span>{project.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* カテゴリーフィルター */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              スタイル別事例
            </h2>
            <p className="text-lg text-gray-600">
              お好みのスタイルから理想の空間を見つけてください
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <i className={`${category.icon} text-lg`}></i>
                  <span>{category.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* 事例一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="relative">
                  {project.popular && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      人気
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                        BEFORE
                      </div>
                      <img
                        src={project.before}
                        alt="Before renovation"
                        className="w-full h-32 object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                        AFTER
                      </div>
                      <img
                        src={project.after}
                        alt="After renovation"
                        className="w-full h-32 object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-teal-600">{project.price}</span>
                    <span className="text-gray-600">{project.period}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{project.location}</span>
                    <span>{project.area}</span>
                  </div>
                  <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 whitespace-nowrap">
                    この事例で相談する
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* モーダル */}
      {modalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 lg:p-8">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 pr-4 leading-tight">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer flex-shrink-0"
                >
                  <i className="ri-close-line text-xl text-gray-600"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-semibold z-10 shadow-lg">
                    BEFORE
                  </div>
                  <img
                    src={selectedProject.before}
                    alt="Before renovation"
                    className="w-full h-64 lg:h-80 xl:h-96 object-cover object-top rounded-2xl shadow-lg"
                  />
                </div>
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-2 rounded-full text-lg font-semibold z-10 shadow-lg">
                    AFTER
                  </div>
                  <img
                    src={selectedProject.after}
                    alt="After renovation"
                    className="w-full h-64 lg:h-80 xl:h-96 object-cover object-top rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">プロジェクト詳細</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">費用</div>
                        <div className="text-2xl font-bold text-teal-600">
                          {selectedProject.price}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">工期</div>
                        <div className="text-xl font-semibold text-gray-900">
                          {selectedProject.period}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">場所</div>
                        <div className="text-lg text-gray-900">
                          {selectedProject.location}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">面積</div>
                        <div className="text-lg text-gray-900">
                          {selectedProject.area}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">この事例で見積もり</h3>
                  <p className="text-gray-600 mb-6">
                    同様のリノベーションをご希望の場合は、こちらから見積もりをご依頼いただけます。
                  </p>

                  <div className="space-y-4">
                    <Link href={`/gallery/${selectedProject.id}`} className="block w-full bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all duration-200 whitespace-nowrap cursor-pointer text-center">
                      詳細を見る
                    </Link>
                    <Link href="/contact" className="block w-full bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-200 whitespace-nowrap cursor-pointer text-center">
                      この事例で相談する
                    </Link>
                    <button
                      onClick={closeModal}
                      className="block w-full border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-all duration-200 whitespace-nowrap cursor-pointer text-center"
                    >
                      他の事例も見る
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTAセクション */}
      <section className="py-16 lg:py-24 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            お気に入りの事例は見つかりましたか？
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
            あなたの理想の空間を実現するために
            <br />
            まずは無料相談からお気軽にご連絡ください
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact" className="bg-white text-teal-600 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
              無料相談を申し込む
            </Link>
            <Link href="/pricing" className="border-2 border-white text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 whitespace-nowrap cursor-pointer">
              料金を確認する
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <Footer />

      <style jsx>{`
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