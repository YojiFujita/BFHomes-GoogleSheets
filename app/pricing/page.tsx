
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PricingData {
  id: number;
  serviceType: string;
  name: string;
  price: number;
  displayPrice: string;
  description?: string;
  category: string;
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [area, setArea] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [estimateResult, setEstimateResult] = useState<number | null>(null);
  const [pricingData, setPricingData] = useState<PricingData[]>([]);
  const [loading, setLoading] = useState(true);

  // Google Sheets APIから料金データを読み込み
  useEffect(() => {
    const loadPricingData = async () => {
      try {
        const response = await fetch('/api/pricing');
        const data = await response.json();

        if (data.pricingData && Array.isArray(data.pricingData)) {
          console.log('料金ページ - データソース:', data.source);
          console.log('料金ページ - 読み込んだ料金データ数:', data.pricingData.length);
          setPricingData(data.pricingData);

          if (data.error) {
            console.warn('料金ページ - 警告:', data.error);
          }
        } else {
          console.error('料金ページ - 無効なデータ形式');
          setPricingData([]);
        }
      } catch (error) {
        console.error('料金ページ - 料金データの読み込みエラー:', error);
        setPricingData([]);
      } finally {
        setLoading(false);
      }
    };

    loadPricingData();
  }, []);

  // データからサービスリストを生成
  const basicServices = pricingData
    .filter(item => item.serviceType === 'basic')
    .map(item => item.name);

  const optionServices = pricingData
    .filter(item => item.serviceType === 'option')
    .map(item => ({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      displayPrice: item.displayPrice
    }));

  const additionalServices = pricingData
    .filter(item => item.serviceType === 'additional')
    .map(item => ({
      name: item.name,
      price: item.displayPrice,
      description: item.description || ''
    }));

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const calculateEstimate = () => {
    if (!area || area === '') return;
    
    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum <= 0) return;
    
    const basePrice = Math.max(areaNum * 10000, 300000); // 基本料金 1㎡=10,000円（最低30万円）
    
    // オプション料金の計算
    const optionPrice = selectedOptions.reduce((total, optionId) => {
      const option = optionServices.find(opt => opt.id === optionId);
      return total + (option ? option.price : 0);
    }, 0);
    
    const estimate = basePrice + optionPrice;
    setEstimateResult(estimate);
  };

  // ローディング中の表示
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header currentPage="料金・見積" />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">料金データを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <Header currentPage="料金・見積" />

      {/* ヒーローセクション */}
      <section className="relative bg-gray-50 py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20interior%20design%20pricing%20concept%20with%20calculator%20blueprints%20and%20color%20swatches%20on%20clean%20white%20desk%2C%20professional%20renovation%20planning%20tools%2C%20bright%20clean%20background%20with%20natural%20lighting%2C%20minimalist%20style%2C%20business%20consultation%20atmosphere&width=1400&height=900&seq=pricing-hero&orientation=landscape')`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              明確な料金体系で
              <br />
              <span className="text-teal-600">実績のある安心リフォーム</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed px-4">
              追加費用なし・実績付きのプランからご選択いただけます
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
              <button 
                onClick={() => document.getElementById('quick-estimate')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-teal-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer w-full sm:w-52 sm:h-16 flex items-center justify-center"
              >
                クイック見積もり
              </button>
              <button 
                onClick={() => document.getElementById('pricing-plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-teal-600 text-teal-600 px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-teal-50 transition-all duration-200 whitespace-nowrap cursor-pointer w-full sm:w-52 sm:h-16 flex items-center justify-center"
              >
                料金プランを見る
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* レスポンシブ見積もりセクション */}
      <section id="quick-estimate" className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              5秒で見積もり
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              簡単な条件入力で、実績に基づいた改装プランの料金をご確認いただけます
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
            <div className="mb-6 lg:mb-8">
              <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">施工面積（㎡）</label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="例：20"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* オプション選択 */}
            <div className="mb-6 lg:mb-8">
              <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">オプション（複数選択可）</label>
              <div className="grid grid-cols-1 gap-4">
                {optionServices.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-teal-300 transition-colors duration-200">
                    <input
                      type="checkbox"
                      id={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleOptionChange(option.id)}
                      className="mt-1 w-5 h-5 text-teal-600 border-2 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={option.id} 
                        className="block text-sm sm:text-base font-medium text-gray-900 cursor-pointer"
                      >
                        {option.name}
                      </label>
                      <div className="text-teal-600 font-semibold text-sm sm:text-base mt-1">
                        {option.displayPrice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={calculateEstimate}
                className="bg-orange-400 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-orange-500 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer mb-6 lg:mb-8 w-full sm:w-auto"
              >
                概算見積を表示
              </button>

              {estimateResult && area && (
                <div className="bg-teal-50 rounded-2xl p-6 lg:p-8 border-2 border-teal-200">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-2">
                    {estimateResult.toLocaleString()}円
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 mb-2">
                    概算費用（税込）
                  </p>
                  {selectedOptions.length > 0 && (
                    <div className="text-sm text-gray-600 mb-4">
                      基本料金 + 選択オプション料金含む
                    </div>
                  )}
                  <Link href="/contact" className="inline-block bg-teal-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-teal-700 transition-all duration-200 whitespace-nowrap cursor-pointer">
                    詳細見積を依頼する
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section id="pricing-plans" className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              料金プラン（基本料金＋オプション料金の明瞭会計）
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
              写真で選べる基本プランに、必要なオプションを追加するだけ。初心者オーナーでも安心してご利用いただけます。
            </p>
          </div>

          {/* 基本料金 */}
          <div className="mb-16 lg:mb-20">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">基本料金</h3>
                <div className="text-4xl sm:text-5xl font-bold text-teal-600 mb-2">
                  1㎡ = 10,000円
                </div>
                <p className="text-lg text-gray-600">（最低30万円～）</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">基本料金に含まれるサービス</h4>
                  <ul className="space-y-3">
                    {basicServices.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 flex items-center justify-center mt-1">
                          <i className="ri-check-line text-teal-600"></i>
                        </div>
                        <span className="text-gray-700 ml-3 text-base sm:text-lg leading-relaxed">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-teal-50 rounded-xl p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-6 h-6 flex items-center justify-center mt-1">
                      <i className="ri-thumb-up-line text-teal-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-teal-700 mb-2">最低価格でも"実績あり"の安心プラン</h4>
                      <p className="text-teal-700 text-sm leading-relaxed">
                        実際に「空室短縮」「家賃アップ」を実現した施工内容です。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="bg-teal-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-block"
                >
                  基本プランで相談する
                </Link>
              </div>
            </div>
          </div>

          {/* オプション料金 */}
          <div className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                オプション料金（必要に応じて追加）
              </h3>
              <div className="bg-orange-50 rounded-xl p-6 max-w-3xl mx-auto">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center mt-1">
                    <i className="ri-thumb-up-line text-orange-500 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-orange-700 mb-2">必要なものだけ選べる"追加型"料金体系</h4>
                    <p className="text-orange-700 text-sm leading-relaxed">
                      無駄な費用は発生せず、投資判断がしやすい仕組みです。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {optionServices.map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 flex-1 pr-4">{service.name}</h4>
                    <span className="text-teal-600 font-bold text-base sm:text-lg whitespace-nowrap">{service.displayPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 強調コピー */}
          <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 lg:p-12 text-white text-center mb-16 lg:mb-20">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              「基本料金で安心、オプションで自由」
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl opacity-90 leading-relaxed">
              写真を選ぶだけで"実績のある改装"が、明瞭会計で実現できます
            </p>
          </div>
        </div>
      </section>

      {/* 追加サービス */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              追加サービス
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              より充実したリフォームをサポートするオプションサービス
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{service.name}</h3>
                  <span className="text-teal-600 font-bold text-base sm:text-lg">{service.price}</span>
                </div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 価格保証制度 */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              価格保証制度
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              お客様に安心していただくための3つの保証
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-teal-100 rounded-full flex items-center justify-center mb-6 lg:mb-8 mx-auto group-hover:scale-110 transition-transform duration-200">
                <i className="ri-shield-check-line text-teal-600 text-2xl sm:text-3xl lg:text-4xl"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">実績付き安心保証</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                掲載プランはすべて過去の成功事例に基づいてご提供いたします。
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6 lg:mb-8 mx-auto group-hover:scale-110 transition-transform duration-200">
                <i className="ri-tools-line text-orange-500 text-2xl sm:text-3xl lg:text-4xl"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">工事保証</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                施工不良は無償対応いたします。安心してお任せください。
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-teal-100 rounded-full flex items-center justify-center mb-6 lg:mb-8 mx-auto group-hover:scale-110 transition-transform duration-200">
                <i className="ri-image-line text-teal-600 text-2xl sm:text-3xl lg:text-4xl"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">品質保証</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                写真と同等の仕上がりをお約束いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* お支払い方法 */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              お支払い方法
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              お客様のご都合に合わせた柔軟な支払いオプション
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 lg:p-10 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">一括払い</h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-600 text-base sm:text-lg">
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-line text-teal-600 mt-1 mr-3"></i>
                  現金・銀行振込
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-line text-teal-600 mt-1 mr-3"></i>
                  クレジットカード決済
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-line text-teal-600 mt-1 mr-3"></i>
                  一括払い割引あり（3%オフ）
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 lg:p-10 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">分割払い</h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-600 text-base sm:text-lg">
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-line text-teal-600 mt-1 mr-3"></i>
                  3回〜36回まで分割可能
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-line text-teal-600 mt-1 mr-3"></i>
                  金利手数料当社負担（12回まで）
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-line text-teal-600 mt-1 mr-3"></i>
                  月々の負担を軽減
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-12 sm:py-16 lg:py-24 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            まずは無料見積もりから始めましょう
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 leading-relaxed px-4">
            「写真を選ぶだけ」で、成功実績のある改装プランを確認いただけます
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
            <Link
              href="/contact"
              className="bg-white text-teal-600 px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer w-full sm:w-auto"
            >
              無料見積もりを依頼
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-white text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 whitespace-nowrap cursor-pointer w-full sm:w-auto"
            >
              施工事例を見る
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <Footer />
    </div>
  );
}
