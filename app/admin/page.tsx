
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  before: string;
  after: string;
  description: string;
  price: string;
  period: string;
  location: string;
  date: string;
  area: string;
  popular: boolean;
  featured: boolean; // 追加: 写真が主役のリノベーションに掲載するかどうか
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
  visible: boolean;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'faq'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');

  // Google Sheets APIからデータを読み込み
  useEffect(() => {
    const loadData = async () => {
      try {
        // プロジェクトデータの読み込み
        const projectsResponse = await fetch('/api/projects');
        const projectsData = await projectsResponse.json();

        if (projectsData.projects && Array.isArray(projectsData.projects)) {
          console.log('管理画面 - プロジェクトデータ読み込み成功:', projectsData.projects.length);
          setProjects(projectsData.projects);
        } else {
          console.error('管理画面 - 無効なプロジェクトデータ形式');
          setProjects([]);
        }

        // FAQデータはローカルストレージから読み込み（まだGoogle Sheets未対応）
        const savedFaqs = localStorage.getItem('admin_faqs');

        if (savedFaqs) {
          setFaqs(JSON.parse(savedFaqs));
        } else {
          // FAQ データの初期化
          const initialFaqs: FAQ[] = [
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
            }
          ];
          setFaqs(initialFaqs);
        }
      } catch (error) {
        console.error('管理画面 - データ読み込みエラー:', error);
        setProjects([]);
        setFaqs([]);
      }
    };

    loadData();
  }, []);

  // Google Sheetsに保存
  const saveToGoogleSheets = async () => {
    setSaveStatus('saving');
    try {
      console.log('管理画面 - 保存するプロジェクト数:', projects.length);
      console.log('管理画面 - 保存するプロジェクトデータ:', projects);

      // プロジェクトデータをGoogle Sheetsに保存
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projects }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // FAQデータはローカルストレージに保存（まだGoogle Sheets未対応）
        localStorage.setItem('admin_faqs', JSON.stringify(faqs));
        localStorage.setItem('admin_data_timestamp', new Date().toISOString());

        setSaveStatus('saved');
        setHasUnsavedChanges(false);
        alert(`${result.message}\nFAQデータはローカルストレージに保存されました。`);
      } else {
        throw new Error(result.error || '保存に失敗しました');
      }
    } catch (error) {
      console.error('保存エラー:', error);
      setSaveStatus('unsaved');
      alert(`保存に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // プロジェクト保存
  const handleSaveProject = (project: Project) => {
    if (project.id === 0) {
      // 新規作成
      const newProject = { ...project, id: Date.now() };
      setProjects([...projects, newProject]);
    } else {
      // 更新
      setProjects(projects.map(p => p.id === project.id ? project : p));
    }
    setShowProjectModal(false);
    setEditingProject(null);
    setHasUnsavedChanges(true);
    setSaveStatus('unsaved');
  };

  // FAQ保存
  const handleSaveFaq = (faq: FAQ) => {
    if (faq.id === 0) {
      // 新規作成
      const newFaq = { ...faq, id: Date.now() };
      setFaqs([...faqs, newFaq]);
    } else {
      // 更新
      setFaqs(faqs.map(f => f.id === faq.id ? faq : f));
    }
    setShowFaqModal(false);
    setEditingFaq(null);
    setHasUnsavedChanges(true);
    setSaveStatus('unsaved');
  };

  // プロジェクト削除
  const handleDeleteProject = (id: number) => {
    if (confirm('この事例を削除しますか？')) {
      setProjects(projects.filter(p => p.id !== id));
      setHasUnsavedChanges(true);
      setSaveStatus('unsaved');
    }
  };

  // FAQ削除
  const handleDeleteFaq = (id: number) => {
    if (confirm('このFAQを削除しますか？')) {
      setFaqs(faqs.filter(f => f.id !== id));
      setHasUnsavedChanges(true);
      setSaveStatus('unsaved');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-pacifico text-gray-900 cursor-pointer">
                Before-After Homes
              </Link>
              <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                管理画面
              </span>
              {/* 保存状態表示 */}
              <div className="ml-4 flex items-center">
                {saveStatus === 'saved' && !hasUnsavedChanges && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                    <i className="ri-check-line mr-1"></i>
                    保存済み
                  </span>
                )}
                {saveStatus === 'unsaved' && hasUnsavedChanges && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full flex items-center">
                    <i className="ri-time-line mr-1"></i>
                    未保存
                  </span>
                )}
                {saveStatus === 'saving' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center">
                    <i className="ri-loader-4-line mr-1 animate-spin"></i>
                    保存中...
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* 保存ボタン */}
              <button
                onClick={saveToGoogleSheets}
                disabled={saveStatus === 'saving' || (!hasUnsavedChanges && saveStatus === 'saved')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  saveStatus === 'saving' || (!hasUnsavedChanges && saveStatus === 'saved')
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700 transform hover:scale-105'
                }`}
              >
                <i className="ri-save-line mr-2"></i>
                {saveStatus === 'saving' ? '保存中...' : 'Google Sheetsに保存'}
              </button>
              <Link href="/" className="text-gray-600 hover:text-gray-900 cursor-pointer flex items-center">
                <i className="ri-home-line text-xl mr-2"></i>
                サイトに戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-2 px-1 border-b-2 font-semibold text-sm whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              事例管理
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-2 px-1 border-b-2 font-semibold text-sm whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQ管理
            </button>
          </nav>
        </div>

        {/* 事例管理 */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">事例管理</h1>
              <button
                onClick={() => {
                  setEditingProject({
                    id: 0,
                    title: '',
                    category: 'modern',
                    before: '',
                    after: '',
                    description: '',
                    price: '',
                    period: '',
                    location: '',
                    date: '',
                    area: '',
                    popular: false,
                    featured: false
                  });
                  setShowProjectModal(true);
                }}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>
                新規事例追加
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="relative">
                        <div className="absolute top-1 left-1 bg-red-500 text-white px-2 py-1 rounded text-xs z-10">
                          BEFORE
                        </div>
                        <img
                          src={project.before}
                          alt="Before"
                          className="w-full h-20 object-cover rounded"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 left-1 bg-teal-600 text-white px-2 py-1 rounded text-xs z-10">
                          AFTER
                        </div>
                        <img
                          src={project.after}
                          alt="After"
                          className="w-full h-20 object-cover rounded"
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-4">
                      <p>{project.price} / {project.period}</p>
                      <p>{project.location}</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.popular 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.popular ? '人気' : '通常'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.featured 
                            ? 'bg-teal-100 text-teal-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.featured ? 'メイン掲載' : '非掲載'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setShowProjectModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ管理 */}
        {activeTab === 'faq' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">FAQ管理</h1>
              <button
                onClick={() => {
                  setEditingFaq({
                    id: 0,
                    question: '',
                    answer: '',
                    category: '一般',
                    order: faqs.length + 1,
                    visible: true
                  });
                  setShowFaqModal(true);
                }}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>
                新規FAQ追加
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        質問
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        カテゴリー
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        順序
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        表示
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {faqs.sort((a, b) => a.order - b.order).map((faq) => (
                      <tr key={faq.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {faq.question}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {faq.answer}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {faq.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {faq.order}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            faq.visible 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {faq.visible ? '表示' : '非表示'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingFaq(faq);
                                setShowFaqModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            >
                              編集
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              削除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* プロジェクト編集モーダル */}
      {showProjectModal && editingProject && (
        <ProjectModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setShowProjectModal(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* FAQ編集モーダル */}
      {showFaqModal && editingFaq && (
        <FaqModal
          faq={editingFaq}
          onSave={handleSaveFaq}
          onClose={() => {
            setShowFaqModal(false);
            setEditingFaq(null);
          }}
        />
      )}

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

// プロジェクト編集モーダルコンポーネント
function ProjectModal({
  project,
  onSave,
  onClose
}: {
  project: Project;
  onSave: (project: Project) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(project);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 画像が設定されているかチェック
    if (!formData.before || !formData.after) {
      alert('Before画像とAfter画像の両方を設定してください。');
      return;
    }

    onSave(formData);
  };

  // 画像ファイルを選択してBase64に変換する関数
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, imageType: 'before' | 'after') => {
    const file = event.target.files?.[0];
    if (file) {
      // ファイルサイズチェック（5MB以下）
      if (file.size > 5 * 1024 * 1024) {
        alert('ファイルサイズは5MB以下にしてください。');
        return;
      }

      // 画像ファイルかどうかチェック
      if (!file.type.startsWith('image/')) {
        alert('画像ファイルを選択してください。');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setFormData({
          ...formData,
          [imageType]: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {project.id === 0 ? '新規事例作成' : '事例編集'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリー *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="modern">モダン</option>
                  <option value="natural">ナチュラル</option>
                  <option value="vintage">ヴィンテージ</option>
                  <option value="luxury">ラグジュアリー</option>
                  <option value="minimal">ミニマル</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Before画像 *
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={formData.before}
                    onChange={(e) => setFormData({...formData, before: e.target.value})}
                    placeholder="画像URLを入力またはファイルを選択"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">または</span>
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                      <i className="ri-upload-line mr-1"></i>
                      ファイルを選択
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'before')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                {formData.before && (
                  <div className="mt-3">
                    <img src={formData.before} alt="Before preview" className="w-full h-32 object-cover rounded-lg border" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  After画像 *
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={formData.after}
                    onChange={(e) => setFormData({...formData, after: e.target.value})}
                    placeholder="画像URLを入力またはファイルを選択"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">または</span>
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                      <i className="ri-upload-line mr-1"></i>
                      ファイルを選択
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'after')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                {formData.after && (
                  <div className="mt-3">
                    <img src={formData.after} alt="After preview" className="w-full h-32 object-cover rounded-lg border" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                説明 *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  価格 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="45万円"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  工期 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="7日間"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  場所 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="東京都渋谷区"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  面積 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="30㎡"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                完成日 *
              </label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="2024年1月"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="popular"
                checked={formData.popular}
                onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="popular" className="ml-2 text-sm text-gray-700">
                人気事例として表示
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                「写真が主役のリノベーション」セクションに掲載
              </label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                保存
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// FAQ編集モーダルコンポーネント
function FaqModal({ 
  faq, 
  onSave, 
  onClose 
}: { 
  faq: FAQ; 
  onSave: (faq: FAQ) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState(faq);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {faq.id === 0 ? '新規FAQ作成' : 'FAQ編集'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                質問 *
              </label>
              <input
                type="text"
                required
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="例：見積もりは無料ですか？"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                回答 *
              </label>
              <textarea
                required
                rows={4}
                value={formData.answer}
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="詳細な回答を入力してください..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリー *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="一般">一般</option>
                  <option value="料金・見積もり">料金・見積もり</option>
                  <option value="工事・施工">工事・施工</option>
                  <option value="サービス内容">サービス内容</option>
                  <option value="お申し込み">お申し込み</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  表示順序
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="visible"
                checked={formData.visible}
                onChange={(e) => setFormData({...formData, visible: e.target.checked})}
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="visible" className="ml-2 text-sm text-gray-700">
                サイトに表示する
              </label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                保存
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
