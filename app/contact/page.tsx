'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'estimate',
    budget: '',
    area: '',
    roomType: 'living',
    preferredStyle: 'modern',
    timeline: 'within1month',
    message: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({ type: null, message: '' });

    // バリデーション
    if (!formData.name || !formData.email || !formData.message) {
      setSubmissionStatus({
        type: 'error',
        message: '必須項目をすべて入力してください。'
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.message.length > 500) {
      setSubmissionStatus({
        type: 'error',
        message: 'メッセージは500文字以内で入力してください。'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // フォームデータを送信
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          inquiryType: formData.inquiryType,
          budget: formData.budget || '',
          area: formData.area || '',
          roomType: formData.roomType,
          preferredStyle: formData.preferredStyle,
          timeline: formData.timeline,
          message: formData.message
        }).toString()
      });

      if (response.ok) {
        setSubmissionStatus({
          type: 'success',
          message: 'お問い合わせありがとうございます。1営業日以内にご連絡いたします。'
        });
        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'estimate',
          budget: '',
          area: '',
          roomType: 'living',
          preferredStyle: 'modern',
          timeline: 'within1month',
          message: ''
        });
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message: '送信中にエラーが発生しました。しばらくしてから再度お試しください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <Header currentPage="お問い合わせ" />

      {/* ヒーローセクション */}
      <section className="relative bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20apartment%20consultation%20room%20with%20comfortable%20seating%2C%20natural%20lighting%2C%20clean%20minimalist%20design%2C%20professional%20atmosphere%2C%20contemporary%20furniture%2C%20architectural%20photography%20style%2C%20simple%20clean%20background&width=1400&height=800&seq=contact1&orientation=landscape')`
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            お問い合わせ
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
            リノベーションのご相談・見積もり依頼はこちらから
            <br />
            専門スタッフが丁寧にサポートいたします
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* お問い合わせフォーム */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                お問い合わせフォーム
              </h2>
              
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                {/* 基本情報 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">基本情報</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none transition-colors duration-200"
                        placeholder="例：山田太郎"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none transition-colors duration-200"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none transition-colors duration-200"
                      placeholder="例：090-1234-5678"
                    />
                  </div>
                </div>

                {/* お問い合わせ内容 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">お問い合わせ内容</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        お問い合わせ種類
                      </label>
                      <div className="relative">
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none appearance-none bg-white pr-10 transition-colors duration-200 cursor-pointer"
                        >
                          <option value="estimate">見積もり相談</option>
                          <option value="consultation">リノベーション相談</option>
                          <option value="gallery">事例について</option>
                          <option value="service">サービス内容について</option>
                          <option value="other">その他</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <i className="ri-arrow-down-s-line text-xl text-gray-500"></i>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          ご予算
                        </label>
                        <div className="relative">
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none appearance-none bg-white pr-10 transition-colors duration-200 cursor-pointer"
                          >
                            <option value="">選択してください</option>
                            <option value="under30">30万円未満</option>
                            <option value="30-50">30-50万円</option>
                            <option value="50-100">50-100万円</option>
                            <option value="100-200">100-200万円</option>
                            <option value="over200">200万円以上</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <i className="ri-arrow-down-s-line text-xl text-gray-500"></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          施工面積（㎡）
                        </label>
                        <input
                          type="number"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none transition-colors duration-200"
                          placeholder="例：20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          部屋タイプ
                        </label>
                        <div className="relative">
                          <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none appearance-none bg-white pr-10 transition-colors duration-200 cursor-pointer"
                          >
                            <option value="living">リビング・居室</option>
                            <option value="kitchen">キッチン</option>
                            <option value="bathroom">浴室・洗面所</option>
                            <option value="bedroom">寝室</option>
                            <option value="entrance">玄関</option>
                            <option value="dining">ダイニング</option>
                            <option value="whole">全体</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <i className="ri-arrow-down-s-line text-xl text-gray-500"></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          希望スタイル
                        </label>
                        <div className="relative">
                          <select
                            name="preferredStyle"
                            value={formData.preferredStyle}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none appearance-none bg-white pr-10 transition-colors duration-200 cursor-pointer"
                          >
                            <option value="modern">モダン</option>
                            <option value="natural">ナチュラル</option>
                            <option value="vintage">ヴィンテージ</option>
                            <option value="luxury">ラグジュアリー</option>
                            <option value="minimal">ミニマル</option>
                            <option value="industrial">インダストリアル</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <i className="ri-arrow-down-s-line text-xl text-gray-500"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        希望時期
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none appearance-none bg-white pr-10 transition-colors duration-200 cursor-pointer"
                        >
                          <option value="within1month">1ヶ月以内</option>
                          <option value="within3months">3ヶ月以内</option>
                          <option value="within6months">6ヶ月以内</option>
                          <option value="within1year">1年以内</option>
                          <option value="undecided">未定</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <i className="ri-arrow-down-s-line text-xl text-gray-500"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* メッセージ */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    詳細・ご要望 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    maxLength={500}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="リノベーションのご希望やご質問など、お気軽にお書きください。"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.message.length}/500文字
                  </div>
                </div>

                {/* 送信ボタン */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
                >
                  {isSubmitting ? '送信中...' : 'お問い合わせを送信'}
                </button>

                {/* 送信結果メッセージ */}
                {submissionStatus.type && (
                  <div className={`p-4 rounded-lg ${submissionStatus.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className={`flex items-center ${submissionStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                      <i className={`${submissionStatus.type === 'success' ? 'ri-check-circle-line' : 'ri-error-warning-line'} text-xl mr-3`}></i>
                      <span>{submissionStatus.message}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* 連絡先情報・その他の情報 */}
            <div className="space-y-8">
              {/* 直接連絡 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">直接ご連絡</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-phone-line text-xl text-teal-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">お電話</h4>
                      <p className="text-lg font-bold text-teal-600">03-1234-5678</p>
                      <p className="text-sm text-gray-600">平日 9:00-18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line text-xl text-orange-500"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">メール</h4>
                      <p className="text-lg font-bold text-orange-500">info@beforeafter-homes.jp</p>
                      <p className="text-sm text-gray-600">24時間受付</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 営業時間・対応エリア */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">営業時間・対応エリア</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">営業時間</h4>
                    <p className="text-gray-700">月曜日〜金曜日：10:00-17:30</p>
                    <p className="text-sm text-gray-600 mt-1">土日祝日定休</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">対応エリア</h4>
                    <p className="text-gray-700">埼玉県さいたま市</p>
                    <p className="text-gray-700">埼玉県越谷市</p>
                    <p className="text-gray-700">埼玉県草加市</p>
                    <p className="text-sm text-gray-600 mt-1">上記を中心とした近隣地域も対応いたします</p>
                  </div>
                </div>
              </div>

              {/* よくある質問 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">よくある質問</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Q. 見積もりは無料ですか？</h4>
                    <p className="text-gray-700 text-sm">A. はい、見積もりは無料です。現地調査も追加料金なしで承ります。</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Q. 工事期間はどのくらいですか？</h4>
                    <p className="text-gray-700 text-sm">A. 規模により異なりますが、一般的には3-10日程度です。</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Q. 追加費用は発生しますか？</h4>
                    <p className="text-gray-700 text-sm">A. 事前にお見積もりした金額から追加費用は発生しません。</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/faq" className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer">
                    その他のFAQを見る →
                  </Link>
                </div>
              </div>

              {/* 相談の流れ */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">相談の流れ</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">お問い合わせ</h4>
                      <p className="text-sm text-gray-600">フォームまたはお電話でご相談内容をお聞かせください。</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">現地調査</h4>
                      <p className="text-sm text-gray-600">専門スタッフがお客様のご希望をお聞きし、現地を確認します。</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">お見積もり</h4>
                      <p className="text-sm text-gray-600">詳細なお見積もりをご提示いたします。</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">施工開始</h4>
                      <p className="text-sm text-gray-600">ご契約後、経験豊富な職人が丁寧に施工いたします。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 関連ページへのリンク */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              その他のサービス
            </h2>
            <p className="text-xl text-gray-600">
              お問い合わせ前に詳しく知りたい方はこちら
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/gallery" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-image-line text-xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">施工事例</h3>
              <p className="text-gray-600 mb-4">豊富なBefore/After事例をご覧いただけます</p>
              <div className="text-teal-600 font-semibold group-hover:text-teal-700">
                事例を見る →
              </div>
            </Link>

            <Link href="/pricing" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-calculator-line text-xl text-orange-500"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">料金・見積</h3>
              <p className="text-gray-600 mb-4">透明な料金体系と簡単見積もり機能</p>
              <div className="text-orange-500 font-semibold group-hover:text-orange-600">
                料金を見る →
              </div>
            </Link>

            <Link href="/how-it-works" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-question-line text-xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">使い方</h3>
              <p className="text-gray-600 mb-4">サービスの流れと使い方をご説明</p>
              <div className="text-teal-600 font-semibold group-hover:text-teal-700">
                使い方を見る →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <Footer />
    </div>
  );
}
