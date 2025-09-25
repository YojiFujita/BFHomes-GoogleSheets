'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  const categories = [
    { id: 'all', name: 'すべて', icon: 'ri-home-line' },
    { id: 'modern', name: 'モダン', icon: 'ri-building-line' },
    { id: 'natural', name: 'ナチュラル', icon: 'ri-leaf-line' },
    { id: 'vintage', name: 'ヴィンテージ', icon: 'ri-time-line' },
    { id: 'luxury', name: 'ラグジュアリー', icon: 'ri-vip-crown-line' },
    { id: 'minimal', name: 'ミニマル', icon: 'ri-subtract-line' }
  ];

  // Google Sheets APIからプロジェクトデータを読み込み
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();

        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);

          if (data.error) {
            console.warn('ギャラリーページ - 警告:', data.error);
          }
        } else {
          console.error('ギャラリーページ - 無効なデータ形式');
          setProjects([]);
        }
      } catch (error) {
        console.error('ギャラリーページ - プロジェクトデータの読み込みエラー:', error);
        setProjects([]);
      }
    };

    loadProjects();
  }, []);


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