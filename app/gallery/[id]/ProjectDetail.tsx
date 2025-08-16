'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [project, setProject] = useState<any>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    area: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const projects = [
    {
      id: 1,
      title: "伝統的な和室から現代的なリビングへ",
      category: 'modern',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20apartment%20interior%20with%20worn%20tatami%20mats%2C%20dark%20wooden%20floors%2C%20outdated%20lighting%20fixtures%2C%20cramped%20layout%2C%20dim%20natural%20lighting%2C%20dated%20wallpaper%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=800&height=600&seq=1&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20apartment%20interior%20with%20light%20wooden%20flooring%2C%20white%20walls%2C%20contemporary%20LED%20lighting%2C%20open%20layout%2C%20large%20windows%20with%20natural%20light%2C%20minimalist%20design%2C%20clean%20and%20spacious%20feeling%2C%20simple%20clean%20background&width=800&height=600&seq=2&orientation=landscape",
      description: "明るい木目フローリング + 白基調の壁で開放的な空間に生まれ変わりました。天然木の温もりと白い壁のコントラストが美しく、自然光を最大限に活かした設計となっています。",
      fullDescription: "この物件は築30年の古い和室を、現代的なリビングスペースに完全リノベーションした事例です。従来の畳や襖、古い照明設備を全て撤去し、明るい木目調のフローリングと白を基調とした壁面で統一。天井も明るい色調に変更し、空間全体の開放感を演出しました。\n\n照明設計では、LED埋め込み式のダウンライトを効果的に配置し、間接照明も組み合わせることで、昼夜を問わず快適な明るさを実現。大きな窓から入る自然光との調和も考慮した設計となっています。\n\n収納面では、従来の押し入れを現代的なクローゼットに変更し、使い勝手を大幅に改善。生活動線も最適化され、家族みんなが快適に過ごせる空間となりました。",
      price: "45万円",
      priceBreakdown: {
        flooring: "18万円",
        walls: "12万円",
        lighting: "8万円",
        other: "7万円"
      },
      period: "7日間",
      location: "東京都渋谷区",
      date: "2024年1月",
      area: "30㎡",
      materials: [
        "無垢材フローリング（オーク）",
        "珪藻土壁材",
        "LED埋め込み照明",
        "スイッチ・コンセント交換"
      ],
      features: [
        "自然光を最大限活用する設計",
        "温もりのある木目調フローリング",
        "シンプルで飽きのこない白基調",
        "効率的な収納スペース"
      ],
      beforeDetails: [
        "築30年の古い和室",
        "暗い畳の床材",
        "古い蛍光灯照明",
        "使いにくい押し入れ収納"
      ],
      afterDetails: [
        "明るい木目調フローリング",
        "白を基調とした壁面",
        "LED埋め込み照明",
        "現代的なクローゼット"
      ]
    },
    {
      id: 2,
      title: "古いキッチンから機能的な空間へ",
      category: 'modern',
      before: "https://readdy.ai/api/search-image?query=Old%20cramped%20Japanese%20kitchen%20with%20outdated%20appliances%2C%20dark%20countertops%2C%20poor%20lighting%2C%20limited%20storage%20space%2C%20worn%20cabinets%2C%20traditional%20but%20inefficient%20layout%2C%20simple%20clean%20background&width=800&height=600&seq=3&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20kitchen%20with%20white%20cabinets%2C%20marble%20countertops%2C%20under-cabinet%20LED%20lighting%2C%20efficient%20storage%20solutions%2C%20contemporary%20appliances%2C%20clean%20minimalist%20design%2C%20simple%20clean%20background&width=800&height=600&seq=4&orientation=landscape",
      description: "白いキャビネット + 間接照明で清潔感あふれるモダンキッチンに。収納効率を大幅に向上させ、調理動線も最適化しました。LED照明により作業効率も格段にアップしています。",
      fullDescription: "築25年のキッチンを、機能性と美しさを兼ね備えた現代的な空間に生まれ変わらせました。古い木製キャビネットを白いモダンキャビネットに交換し、カウンタートップには人工大理石を採用。清潔感と高級感を演出しています。\n\n収納面では、従来の約1.5倍の収納量を実現。引き出し式の収納や、デッドスペースを活用した収納ソリューションにより、調理器具や食器類を効率的に整理できます。\n\n照明設計では、作業面を明るく照らすアンダーキャビネットライトを設置。手元が影になることなく、安全で快適な調理環境を実現しました。",
      price: "38万円",
      priceBreakdown: {
        cabinets: "16万円",
        countertop: "10万円",
        lighting: "6万円",
        other: "6万円"
      },
      period: "5日間",
      location: "東京都新宿区",
      date: "2024年2月",
      area: "25㎡",
      materials: [
        "白いモダンキャビネット",
        "人工大理石カウンタートップ",
        "LED アンダーキャビネットライト",
        "引き出し式収納システム"
      ],
      features: [
        "収納量1.5倍の効率設計",
        "清潔感のある白基調",
        "作業効率を考慮した照明",
        "メンテナンスしやすい素材"
      ],
      beforeDetails: [
        "築25年の古いキッチン",
        "暗い木製キャビネット",
        "限られた収納スペース",
        "不十分な照明設備"
      ],
      afterDetails: [
        "明るい白いキャビネット",
        "人工大理石カウンタートップ",
        "効率的な収納システム",
        "LED アンダーキャビネットライト"
      ]
    },
    {
      id: 3,
      title: "狭い浴室からスパのような空間へ",
      category: 'luxury',
      before: "https://readdy.ai/api/search-image?query=Old%20small%20Japanese%20bathroom%20with%20outdated%20tiles%2C%20poor%20lighting%2C%20cramped%20space%2C%20traditional%20fixtures%2C%20worn%20surfaces%2C%20dim%20and%20uninviting%20atmosphere%2C%20simple%20clean%20background&width=800&height=600&seq=5&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20luxurious%20Japanese%20bathroom%20with%20contemporary%20tiles%2C%20bright%20LED%20lighting%2C%20spacious%20layout%2C%20modern%20fixtures%2C%20clean%20surfaces%2C%20spa-like%20atmosphere%20with%20natural%20elements%2C%20simple%20clean%20background&width=800&height=600&seq=6&orientation=landscape",
      description: "現代的なタイル + 高級感のある照明でホテルライクな浴室に変身。防水性能を向上させながら、リラックスできる空間設計を実現しました。",
      fullDescription: "古い浴室を、まるで高級ホテルのスパのような空間に完全リノベーション。従来の小さなタイルを大判の現代的なタイルに交換し、視覚的な広がりを演出しました。\n\n照明設計では、調光可能なLED照明を採用。リラックスタイムには温かみのある光で、お手入れ時には明るい光でと、用途に応じて調整可能です。\n\n機能面では、最新の防水技術を採用し、カビや水漏れのリスクを大幅に軽減。浴槽も深めのものに交換し、ゆっくりと疲れを癒せる空間となりました。",
      price: "52万円",
      priceBreakdown: {
        tiles: "20万円",
        fixtures: "15万円",
        lighting: "10万円",
        other: "7万円"
      },
      period: "8日間",
      location: "東京都港区",
      date: "2024年3月",
      area: "18㎡",
      materials: [
        "大判現代タイル",
        "調光可能LED照明",
        "深型浴槽",
        "最新防水システム"
      ],
      features: [
        "ホテルライクな高級感",
        "調光可能な照明システム",
        "最新の防水技術",
        "リラックスできる深型浴槽"
      ],
      beforeDetails: [
        "古い小さなタイル",
        "暗い蛍光灯照明",
        "浅い古い浴槽",
        "防水性能の劣化"
      ],
      afterDetails: [
        "大判の現代的タイル",
        "調光可能LED照明",
        "深型のリラックス浴槽",
        "最新防水システム"
      ]
    },
    {
      id: 4,
      title: "昔ながらの寝室からモダン空間へ",
      category: 'modern',
      before: "https://readdy.ai/api/search-image?query=Old%20Japanese%20bedroom%20with%20traditional%20tatami%20flooring%2C%20dark%20wooden%20furniture%2C%20poor%20natural%20lighting%2C%20cramped%20space%2C%20outdated%20traditional%20style%2C%20simple%20clean%20background&width=800&height=600&seq=8&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20bedroom%20with%20light%20hardwood%20floors%2C%20contemporary%20furniture%2C%20excellent%20natural%20lighting%2C%20spacious%20layout%2C%20minimalist%20modern%20decor%2C%20simple%20clean%20background&width=800&height=600&seq=9&orientation=landscape",
      description: "フローリング + 現代的な家具配置で快適な寝室に。睡眠の質を向上させる照明設計と、収納効率を考慮したレイアウトが特徴です。",
      fullDescription: "伝統的な和室の寝室を、睡眠の質を重視した現代的な空間に変身させました。畳を撤去し、足音が響きにくい防音性能を持つフローリングを採用。\n\n照明設計では、概日リズムを考慮した調色機能付きLED照明を設置。朝は爽やかな白い光で目覚めをサポートし、夜は温かみのある光でリラックス効果を促進します。\n\n収納面では、ベッド下収納やウォークインクローゼットを効率的に配置。寝室をすっきりと保ちながら、必要なものにすぐアクセスできる設計となっています。",
      price: "42万円",
      priceBreakdown: {
        flooring: "18万円",
        lighting: "12万円",
        storage: "8万円",
        other: "4万円"
      },
      period: "6日間",
      location: "東京都世田谷区",
      date: "2024年4月",
      area: "28㎡",
      materials: [
        "防音フローリング",
        "調色機能付きLED照明",
        "ベッド下収納システム",
        "ウォークインクローゼット"
      ],
      features: [
        "睡眠の質を向上させる照明",
        "防音性能の高いフローリング",
        "効率的な収納システム",
        "概日リズムを考慮した設計"
      ],
      beforeDetails: [
        "伝統的な畳の床",
        "暗い照明設備",
        "限られた収納スペース",
        "古い和室の雰囲気"
      ],
      afterDetails: [
        "防音フローリング",
        "調色機能付きLED照明",
        "効率的な収納システム",
        "モダンな寝室空間"
      ]
    },
    {
      id: 5,
      title: "玄関から始まる新しい暮らし",
      category: 'minimal',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20entryway%20with%20worn%20wooden%20floors%2C%20outdated%20storage%2C%20poor%20lighting%2C%20cramped%20layout%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=800&height=600&seq=10&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20entryway%20with%20contemporary%20flooring%2C%20efficient%20storage%20solutions%2C%20excellent%20LED%20lighting%2C%20spacious%20organized%20layout%2C%20clean%20minimalist%20design%2C%20simple%20clean%20background&width=800&height=600&seq=11&orientation=landscape",
      description: "効率的な収納 + LED照明で機能的な玄関に。第一印象を決める重要な空間として、来客時の印象も大幅に向上させました。",
      fullDescription: "家の第一印象を決める玄関を、機能性と美しさを兼ね備えた現代的な空間に変身させました。古い木製の床材を、メンテナンスしやすい現代的なフローリングに交換。\n\n収納面では、靴だけでなく傘やコート、宅配物なども効率的に収納できるシステムを導入。来客時もすっきりとした印象を保てます。\n\n照明設計では、人感センサー付きLED照明を採用。帰宅時の安全性を確保しながら、省エネ効果も実現しています。",
      price: "28万円",
      priceBreakdown: {
        flooring: "12万円",
        storage: "10万円",
        lighting: "4万円",
        other: "2万円"
      },
      period: "4日間",
      location: "東京都品川区",
      date: "2024年5月",
      area: "15㎡",
      materials: [
        "現代的なフローリング",
        "効率的収納システム",
        "人感センサー付きLED照明",
        "防汚性能の高い壁材"
      ],
      features: [
        "第一印象を向上させる設計",
        "効率的な収納システム",
        "人感センサー付き照明",
        "メンテナンスしやすい素材"
      ],
      beforeDetails: [
        "古い木製の床材",
        "限られた収納スペース",
        "暗い照明設備",
        "整理しにくいレイアウト"
      ],
      afterDetails: [
        "現代的なフローリング",
        "効率的収納システム",
        "人感センサー付きLED照明",
        "すっきりとした印象"
      ]
    },
    {
      id: 6,
      title: "食事空間の現代的な変身",
      category: 'natural',
      before: "https://readdy.ai/api/search-image?query=Old%20Japanese%20dining%20area%20with%20traditional%20low%20table%2C%20tatami%20seating%2C%20poor%20lighting%2C%20cramped%20space%2C%20outdated%20traditional%20style%2C%20simple%20clean%20background&width=800&height=600&seq=12&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20dining%20area%20with%20contemporary%20dining%20table%2C%20modern%20chairs%2C%20excellent%20lighting%2C%20spacious%20layout%2C%20natural%20wood%20elements%2C%20warm%20atmosphere%2C%20simple%20clean%20background&width=800&height=600&seq=13&orientation=landscape",
      description: "ダイニングテーブル + モダンチェアで家族団らんの時間をより豊かに。自然素材を活用し、照明計画により食事の時間がより楽しくなる空間に仕上げました。",
      fullDescription: "伝統的な座卓スタイルの食事空間を、現代的なダイニングスペースに完全リノベーション。自然素材を活用しながら、家族のコミュニケーションを促進する設計となっています。\n\n家具選定では、天然木のダイニングテーブルと快適な座り心地のチェアを選択。食事の時間がより楽しくなる空間を演出しています。\n\n照明設計では、食事を美味しく見せる暖色系の照明を採用。調光機能により、朝食時には明るく、夕食時には温かみのある光でと、シーンに応じて調整可能です。",
      price: "35万円",
      priceBreakdown: {
        furniture: "15万円",
        flooring: "10万円",
        lighting: "7万円",
        other: "3万円"
      },
      period: "5日間",
      location: "東京都目黒区",
      date: "2024年6月",
      area: "22㎡",
      materials: [
        "天然木ダイニングテーブル",
        "快適なダイニングチェア",
        "暖色系調光照明",
        "自然素材の壁材"
      ],
      features: [
        "家族のコミュニケーション促進",
        "自然素材の温かみ",
        "食事を美味しく見せる照明",
        "調光機能による空間演出"
      ],
      beforeDetails: [
        "伝統的な座卓スタイル",
        "畳の床面",
        "暗い蛍光灯照明",
        "限られた空間利用"
      ],
      afterDetails: [
        "現代的なダイニングテーブル",
        "快適なチェア",
        "暖色系調光照明",
        "家族団らんの空間"
      ]
    },
    {
      id: 7,
      title: "ヴィンテージ感漂う書斎空間",
      category: 'vintage',
      before: "https://readdy.ai/api/search-image?query=Old%20cramped%20Japanese%20study%20room%20with%20poor%20lighting%2C%20outdated%20furniture%2C%20limited%20storage%2C%20traditional%20but%20inefficient%20layout%2C%20worn%20surfaces%2C%20simple%20clean%20background&width=800&height=600&seq=14&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20vintage-style%20Japanese%20study%20room%20with%20exposed%20brick%20walls%2C%20vintage%20furniture%2C%20warm%20lighting%2C%20efficient%20storage%2C%20leather%20chairs%2C%20classic%20design%20elements%2C%20simple%20clean%20background&width=800&height=600&seq=15&orientation=landscape",
      description: "レンガ調の壁 + ヴィンテージ家具で趣のある書斎に。集中力を高める照明設計と、書籍や資料を効率的に収納できる設計が特徴です。",
      fullDescription: "古い書斎を、知的好奇心を刺激するヴィンテージ感あふれる空間に変身させました。レンガ調の壁面が特徴的で、クラシックな雰囲気を演出しています。\n\n家具選定では、ヴィンテージ家具と現代の機能性を融合。革張りのチェアは長時間の作業でも疲れにくく、古材を使用したデスクは使い込むほどに味わいが増します。\n\n照明設計では、読書や執筆作業に適した明るさと、リラックスタイムには温かみのある光でと、用途に応じて調整可能。集中力を高める環境づくりにこだわりました。",
      price: "48万円",
      priceBreakdown: {
        walls: "20万円",
        furniture: "18万円",
        lighting: "6万円",
        other: "4万円"
      },
      period: "7日間",
      location: "東京都中野区",
      date: "2024年7月",
      area: "20㎡",
      materials: [
        "レンガ調壁材",
        "ヴィンテージ家具",
        "革張りチェア",
        "調光機能付きLED照明"
      ],
      features: [
        "知的好奇心を刺激する空間",
        "ヴィンテージ感のある雰囲気",
        "集中力を高める照明設計",
        "効率的な書籍収納"
      ],
      beforeDetails: [
        "古い書斎空間",
        "限られた収納スペース",
        "不十分な照明",
        "機能性の低い家具"
      ],
      afterDetails: [
        "レンガ調の壁面",
        "ヴィンテージ家具",
        "革張りの快適チェア",
        "調光機能付き照明"
      ]
    },
    {
      id: 8,
      title: "ラグジュアリーなマスターベッドルーム",
      category: 'luxury',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20bedroom%20with%20worn%20tatami%20flooring%2C%20outdated%20furniture%2C%20poor%20lighting%2C%20cramped%20space%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=800&height=600&seq=16&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20luxury%20Japanese%20bedroom%20with%20premium%20materials%2C%20elegant%20furniture%2C%20sophisticated%20lighting%2C%20spacious%20layout%2C%20high-end%20finishes%2C%20hotel-like%20atmosphere%2C%20simple%20clean%20background&width=800&height=600&seq=17&orientation=landscape",
      description: "高級素材 + 上質な照明でホテルライクな寝室に。プライベート空間としての快適性を追求し、最高の睡眠環境を提供する設計です。",
      fullDescription: "マスターベッドルームを、5つ星ホテルのような上質な空間に完全リノベーション。高級素材を惜しみなく使用し、プライベート空間としての特別感を演出しています。\n\n素材選定では、天然石や高級木材、上質なファブリックを採用。触感や質感にこだわり、五感で楽しめる空間づくりを実現しました。\n\n照明設計では、段階的な調光システムを導入。起床時には爽やかな光で自然な目覚めをサポートし、就寝前には温かみのある光でリラックス効果を促進します。",
      price: "68万円",
      priceBreakdown: {
        materials: "30万円",
        furniture: "25万円",
        lighting: "8万円",
        other: "5万円"
      },
      period: "10日間",
      location: "東京都港区",
      date: "2024年8月",
      area: "35㎡",
      materials: [
        "天然石アクセントウォール",
        "高級木材フローリング",
        "上質なファブリック",
        "段階調光システム"
      ],
      features: [
        "5つ星ホテルのような上質感",
        "高級素材の贅沢な使用",
        "段階的な調光システム",
        "五感で楽しめる空間設計"
      ],
      beforeDetails: [
        "古い畳の床面",
        "簡素な照明設備",
        "限られた収納スペース",
        "一般的な内装材"
      ],
      afterDetails: [
        "天然石アクセントウォール",
        "高級木材フローリング",
        "段階調光システム",
        "上質なファブリック"
      ]
    },
    {
      id: 9,
      title: "ミニマルなワーキングスペース",
      category: 'minimal',
      before: "https://readdy.ai/api/search-image?query=Old%20cluttered%20Japanese%20work%20room%20with%20outdated%20furniture%2C%20poor%20organization%2C%20inadequate%20lighting%2C%20cramped%20layout%2C%20traditional%20but%20inefficient%20setup%2C%20simple%20clean%20background&width=800&height=600&seq=18&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20minimalist%20Japanese%20work%20room%20with%20clean%20lines%2C%20efficient%20storage%2C%20excellent%20lighting%2C%20spacious%20layout%2C%20contemporary%20furniture%2C%20organized%20workspace%2C%20simple%20clean%20background&width=800&height=600&seq=19&orientation=landscape",
      description: "シンプルな家具 + 整理された収納で集中できるワークスペースに。在宅勤務の効率を最大化する設計で、必要なものだけを厳選した空間です。",
      fullDescription: "在宅勤務に最適化したミニマルなワーキングスペースを実現。不要なものを排除し、本当に必要なものだけを厳選した空間づくりが特徴です。\n\n家具選定では、機能性を重視したシンプルなデザインを採用。デスクは高さ調整可能で、長時間の作業でも疲れにくい設計となっています。\n\n収納設計では、隠す収納を基本とし、視界に入るものを最小限に。集中力を妨げる要素を排除し、生産性向上を図った空間となっています。",
      price: "32万円",
      priceBreakdown: {
        furniture: "15万円",
        storage: "10万円",
        lighting: "5万円",
        other: "2万円"
      },
      period: "5日間",
      location: "東京都渋谷区",
      date: "2024年9月",
      area: "18㎡",
      materials: [
        "高さ調整可能デスク",
        "隠す収納システム",
        "目に優しいLED照明",
        "防音材料"
      ],
      features: [
        "在宅勤務に最適化",
        "集中力を高める設計",
        "必要最小限の厳選アイテム",
        "生産性向上を図った空間"
      ],
      beforeDetails: [
        "雑然とした作業空間",
        "古い家具",
        "不十分な収納",
        "集中しにくい環境"
      ],
      afterDetails: [
        "整理されたワークスペース",
        "機能的な家具",
        "隠す収納システム",
        "集中できる環境"
      ]
    },
    {
      id: 10,
      title: "自然素材あふれるリビングルーム",
      category: 'natural',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20living%20room%20with%20worn%20surfaces%2C%20outdated%20furniture%2C%20poor%20lighting%2C%20cramped%20space%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=800&height=600&seq=20&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20natural%20Japanese%20living%20room%20with%20wood%20elements%2C%20plants%2C%20natural%20lighting%2C%20organic%20textures%2C%20earth%20tones%2C%20eco-friendly%20materials%2C%20peaceful%20atmosphere%2C%20simple%20clean%20background&width=800&height=600&seq=21&orientation=landscape",
      description: "天然木 + 観葉植物で自然を感じるリビングに。環境にやさしい素材を使用し、家族がリラックスできる癒しの空間を実現しました。",
      fullDescription: "自然素材をふんだんに使用したリビングルームで、都市部にいながら自然の癒しを感じられる空間を実現。環境への配慮と快適性を両立した設計となっています。\n\n素材選定では、無垢材や天然繊維、自然塗料など、人と環境に優しい素材を厳選。シックハウス症候群の心配もなく、安心して過ごせる空間です。\n\n植物配置では、空気清浄効果のある観葉植物を効果的に配置。自然光を最大限活用し、植物が健康的に育つ環境を整えています。",
      price: "55万円",
      priceBreakdown: {
        materials: "25万円",
        furniture: "20万円",
        plants: "5万円",
        other: "5万円"
      },
      period: "8日間",
      location: "東京都杉並区",
      date: "2024年10月",
      area: "40㎡",
      materials: [
        "無垢材フローリング",
        "天然繊維ファブリック",
        "自然塗料",
        "観葉植物"
      ],
      features: [
        "自然素材の癒し効果",
        "環境に優しい素材選択",
        "空気清浄効果のある植物",
        "シックハウス症候群対策"
      ],
      beforeDetails: [
        "古い化学素材",
        "人工的な内装材",
        "植物のない空間",
        "閉塞感のある雰囲気"
      ],
      afterDetails: [
        "無垢材フローリング",
        "天然繊維ファブリック",
        "観葉植物のある空間",
        "自然の癒しを感じる雰囲気"
      ]
    },
    {
      id: 11,
      title: "モダンなファミリーキッチン",
      category: 'modern',
      before: "https://readdy.ai/api/search-image?query=Old%20cramped%20Japanese%20family%20kitchen%20with%20outdated%20appliances%2C%20poor%20storage%2C%20inefficient%20layout%2C%20worn%20surfaces%2C%20traditional%20but%20outdated%20design%2C%20simple%20clean%20background&width=800&height=600&seq=22&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20bright%20Japanese%20family%20kitchen%20with%20island%20counter%2C%20contemporary%20appliances%2C%20efficient%20storage%2C%20open%20layout%2C%20family-friendly%20design%2C%20clean%20minimalist%20style%2C%20simple%20clean%20background&width=800&height=600&seq=23&orientation=landscape",
      description: "アイランドキッチン + 効率的な収納で家族みんなが使いやすいキッチンに。調理、食事、コミュニケーションが自然に生まれる空間設計です。",
      fullDescription: "家族のコミュニケーションハブとしてのキッチンを実現。アイランドキッチンを中心とした開放的なレイアウトで、調理をしながら家族との時間を楽しめる空間となっています。\n\n機能面では、最新の調理機器と効率的な収納システムを導入。子どもから大人まで、家族みんなが安全に使えるユニバーサルデザインを採用しています。\n\n動線設計では、調理、配膳、片付けの一連の流れを最適化。複数人で作業してもぶつからない広々とした空間を確保しています。",
      price: "62万円",
      priceBreakdown: {
        island: "25万円",
        appliances: "20万円",
        storage: "12万円",
        other: "5万円"
      },
      period: "9日間",
      location: "東京都練馬区",
      date: "2024年11月",
      area: "32㎡",
      materials: [
        "アイランドキッチン",
        "最新調理機器",
        "効率的収納システム",
        "安全性重視の設計"
      ],
      features: [
        "家族のコミュニケーションハブ",
        "ユニバーサルデザイン",
        "効率的な動線設計",
        "安全性を重視した設計"
      ],
      beforeDetails: [
        "古い調理設備",
        "限られた作業スペース",
        "非効率的な動線",
        "家族が集まりにくい構造"
      ],
      afterDetails: [
        "アイランドキッチン",
        "広々とした作業スペース",
        "効率的な動線",
        "家族が自然に集まる空間"
      ]
    },
    {
      id: 12,
      title: "ヴィンテージスタイルのカフェ空間",
      category: 'vintage',
      before: "https://readdy.ai/api/search-image?query=Old%20traditional%20Japanese%20room%20with%20poor%20lighting%2C%20outdated%20furniture%2C%20worn%20surfaces%2C%20cramped%20layout%2C%20traditional%20but%20tired%20appearance%2C%20simple%20clean%20background&width=800&height=600&seq=24&orientation=landscape",
      after: "https://readdy.ai/api/search-image?query=Modern%20vintage-style%20Japanese%20cafe%20space%20with%20exposed%20elements%2C%20vintage%20furniture%2C%20warm%20lighting%2C%20cozy%20atmosphere%2C%20rustic%20charm%2C%20antique%20accessories%2C%20simple%20clean%20background&width=800&height=600&seq=25&orientation=landscape",
      description: "アンティーク家具 + 温かみのある照明でカフェのような空間に。友人や家族との時間を特別なものにする、居心地の良い空間です。",
      fullDescription: "自宅にいながらカフェのような特別な時間を過ごせる空間を実現。アンティーク家具と現代の快適性を融合し、居心地の良さを追求した設計となっています。\n\n家具選定では、使い込まれた味わいのあるヴィンテージ家具を厳選。それぞれに物語があり、空間に深みと個性を与えています。\n\n照明設計では、温かみのある間接照明を多用。読書や会話を楽しむのに最適な明るさで、リラックスした時間を演出します。",
      price: "44万円",
      priceBreakdown: {
        furniture: "20万円",
        lighting: "12万円",
        decor: "8万円",
        other: "4万円"
      },
      period: "6日間",
      location: "東京都台東区",
      date: "2024年12月",
      area: "26㎡",
      materials: [
        "アンティーク家具",
        "間接照明システム",
        "ヴィンテージ装飾品",
        "温かみのある素材"
      ],
      features: [
        "カフェのような特別感",
        "アンティーク家具の味わい",
        "温かみのある照明",
        "リラックスできる空間"
      ],
      beforeDetails: [
        "一般的な居住空間",
        "特徴のない内装",
        "単調な照明",
        "個性のない雰囲気"
      ],
      afterDetails: [
        "カフェのような特別な空間",
        "個性的なアンティーク家具",
        "温かみのある間接照明",
        "居心地の良い雰囲気"
      ]
    }
  ];

  const similarProjects = [
    {
      id: 13,
      title: "同じスタイルの事例 A",
      after: "https://readdy.ai/api/search-image?query=Similar%20modern%20Japanese%20interior%20renovation%20example%20with%20clean%20design%2C%20contemporary%20elements%2C%20bright%20lighting%2C%20similar%20style%20and%20aesthetic%2C%20simple%20clean%20background&width=400&height=300&seq=27&orientation=landscape",
      price: "43万円",
      period: "6日間"
    },
    {
      id: 14,
      title: "同じスタイルの事例 B",
      after: "https://readdy.ai/api/search-image?query=Similar%20modern%20Japanese%20interior%20renovation%20example%20with%20clean%20design%2C%20contemporary%20elements%2C%20bright%20lighting%2C%20similar%20style%20and%20aesthetic%2C%20simple%20clean%20background&width=400&height=300&seq=28&orientation=landscape",
      price: "47万円",
      period: "7日間"
    },
    {
      id: 15,
      title: "同じスタイルの事例 C",
      after: "https://readdy.ai/api/search-image?query=Similar%20modern%20Japanese%20interior%20renovation%20example%20with%20clean%20design%2C%20contemporary%20elements%2C%20bright%20lighting%2C%20similar%20style%20and%20aesthetic%2C%20simple%20clean%20background&width=400&height=300&seq=29&orientation=landscape",
      price: "41万円",
      period: "5日間"
    }
  ];

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(projectId));
    if (foundProject) {
      setProject(foundProject);
    }
  }, [projectId]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理
    alert('お問い合わせを受け付けました。担当者よりご連絡いたします。');
    setShowContactForm(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">事例が見つかりません</h2>
          <Link href="/gallery" className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer">
            ギャラリーに戻る
          </Link>
        </div>
      </div>
    );
  }

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
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">サービス概要</Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer">使い方</Link>
              <Link href="/gallery" className="text-white font-semibold whitespace-nowrap cursor-pointer">ギャラリー</Link>
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

      {/* パンくずナビ */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 cursor-pointer">ホーム</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link href="/gallery" className="text-gray-500 hover:text-gray-700 cursor-pointer">ギャラリー</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium line-clamp-1">{project.title}</span>
          </div>
        </div>
      </nav>

      {/* メイン画像セクション */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <div className="relative">
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-semibold z-10 shadow-lg">
                BEFORE
              </div>
              <img
                src={project.before}
                alt="Before renovation"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-top rounded-2xl shadow-xl"
              />
            </div>
            <div className="relative">
              <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-2 rounded-full text-lg font-semibold z-10 shadow-lg">
                AFTER
              </div>
              <img
                src={project.after}
                alt="After renovation"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-top rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* プロジェクト詳細 */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {project.title}
                </h1>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-teal-600 mb-1">
                      {project.price}
                    </div>
                    <div className="text-sm text-gray-600">費用</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      {project.period}
                    </div>
                    <div className="text-sm text-gray-600">工期</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      {project.area}
                    </div>
                    <div className="text-sm text-gray-600">面積</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
                      {project.date}
                    </div>
                    <div className="text-sm text-gray-600">完成</div>
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">詳細説明</h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {project.fullDescription}
                    </div>
                  </div>
                </div>
              </div>

              {/* 費用内訳 */}
              <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-8">
                <h2 className="text-xl lg:text-2xl font-bold mb-6">費用内訳</h2>
                <div className="space-y-4">
                  {Object.entries(project.priceBreakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{
                        key === 'flooring' ? 'フローリング工事' :
                        key === 'walls' ? '壁工事' :
                        key === 'lighting' ? '照明工事' :
                        key === 'cabinets' ? 'キャビネット' :
                        key === 'countertop' ? 'カウンタートップ' :
                        key === 'tiles' ? 'タイル工事' :
                        key === 'fixtures' ? '設備工事' :
                        key === 'furniture' ? '家具・装飾' :
                        key === 'storage' ? '収納工事' :
                        key === 'materials' ? '高級素材' :
                        key === 'plants' ? '植物・装飾' :
                        key === 'island' ? 'アイランドキッチン' :
                        key === 'appliances' ? '調理機器' :
                        key === 'decor' ? '装飾品' :
                        key === 'other' ? 'その他' : key
                      }</span>
                      {/* 型エラー修正: value as React.ReactNode */}
                      <span className="font-semibold text-teal-600">{value as React.ReactNode}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 使用素材・特徴 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
                  <h3 className="text-xl font-bold mb-4">使用素材</h3>
                  <ul className="space-y-3">
                    {project.materials.map((material: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <i className="ri-checkbox-circle-line text-teal-600 mt-1 flex-shrink-0"></i>
                        <span className="text-gray-700">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
                  <h3 className="text-xl font-bold mb-4">特徴・こだわり</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <i className="ri-star-line text-orange-500 mt-1 flex-shrink-0"></i>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Before/After 比較詳細 */}
              <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-8">
                <h2 className="text-xl lg:text-2xl font-bold mb-6">Before / After 比較</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-red-600">Before（改装前）</h3>
                    <ul className="space-y-3">
                      {project.beforeDetails.map((detail, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <i className="ri-close-circle-line text-red-500 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-teal-600">After（改装後）</h3>
                    <ul className="space-y-3">
                      {project.afterDetails.map((detail, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <i className="ri-checkbox-circle-line text-teal-600 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* 見積もり・相談 */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-4">この事例で相談する</h3>
                  <p className="text-gray-600 mb-6">
                    同様のリノベーションをご希望の場合は、お気軽にご相談ください。
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 whitespace-nowrap cursor-pointer"
                    >
                      この事例で相談する
                    </button>
                    <Link href="/contact" className="block w-full border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors duration-200 whitespace-nowrap cursor-pointer text-center">
                      詳細見積もりを依頼
                    </Link>
                  </div>
                </div>

                {/* プロジェクト情報 */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-4">プロジェクト情報</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">場所</span>
                      <span className="font-medium">{project.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">完成日</span>
                      <span className="font-medium">{project.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">カテゴリー</span>
                      <span className="font-medium">{
                        project.category === 'modern' ? 'モダン' :
                        project.category === 'natural' ? 'ナチュラル' :
                        project.category === 'vintage' ? 'ヴィンテージ' :
                        project.category === 'luxury' ? 'ラグジュアリー' :
                        project.category === 'minimal' ? 'ミニマル' : project.category
                      }</span>
                    </div>
                  </div>
                </div>

                {/* 類似事例 */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h4 className="text-lg font-semibold mb-4">類似事例</h4>
                  <div className="space-y-4">
                    {similarProjects.map((similar) => (
                      <div key={similar.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                        <img
                          src={similar.after}
                          alt={similar.title}
                          className="w-full h-24 object-cover object-top rounded-lg mb-3"
                        />
                        <h5 className="font-semibold text-sm mb-2 line-clamp-2">{similar.title}</h5>
                        <div className="flex justify-between items-center text-xs text-gray-600">
                          <span className="text-teal-600 font-semibold">{similar.price}</span>
                          <span>{similar.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/gallery" className="block w-full mt-4 text-center text-teal-600 hover:text-teal-700 font-semibold cursor-pointer">
                    すべての事例を見る
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 相談フォームモーダル */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">この事例で相談する</h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-600"></i>
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">お名前 *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="山田 太郎"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="090-1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">面積（㎡）</label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">物件所在地</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="東京都渋谷区"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">予算</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="">選択してください</option>
                      <option value="30万円以下">30万円以下</option>
                      <option value="30-50万円">30-50万円</option>
                      <option value="50-70万円">50-70万円</option>
                      <option value="70万円以上">70万円以上</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">希望工期</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="">選択してください</option>
                      <option value="1週間以内">1週間以内</option>
                      <option value="2週間以内">2週間以内</option>
                      <option value="1ヶ月以内">1ヶ月以内</option>
                      <option value="相談したい">相談したい</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ご質問・ご要望</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="この事例のようなリノベーションを検討しています..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 whitespace-nowrap cursor-pointer"
                  >
                    相談を送信する
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap cursor-pointer"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CTAセクション */}
      <section className="py-16 lg:py-24 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            他にも多数の事例をご用意
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
            あなたの理想の空間を実現するために
            <br />
            まずは無料相談からお気軽にご連絡ください
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/gallery" className="bg-white text-teal-600 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
              他の事例を見る
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 whitespace-nowrap cursor-pointer">
              無料相談を申し込む
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="text-2xl font-pacifico text-white cursor-pointer">
                Before-After Homes
              </Link>
              <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                写真を選び、広さを入力。
                <br />
                あとはプロに任せるだけ。
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">サービス</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors duration-200 cursor-pointer">サービス概要</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors duration-200 cursor-pointer">ギャラリー</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors duration-200 cursor-pointer">料金・見積</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors duration-200 cursor-pointer">使い方</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">サポート</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/faq" className="hover:text-white transition-colors duration-200 cursor-pointer">よくある質問</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors duration-200 cursor-pointer">お問い合わせ</Link></li>
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">利用規約</li>
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">プライバシーポリシー</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">お問い合わせ</h4>
              <div className="space-y-3 text-gray-400">
                <p>03-1234-5678</p>
                <p>info@beforeafter-homes.jp</p>
                <p>平日 9:00-18:00</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Before-After Homes. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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