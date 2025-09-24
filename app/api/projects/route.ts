import { NextRequest, NextResponse } from 'next/server';
import { saveProjectsToSheets, loadProjectsFromSheets, ProjectData } from '../../../lib/google-sheets';

// プロジェクトデータを取得
export async function GET() {
  try {
    // まずGoogle Sheetsからデータを取得を試行
    let projects: ProjectData[] = [];

    try {
      projects = await loadProjectsFromSheets();
    } catch (sheetsError) {
      console.warn('Google Sheetsからの読み込みに失敗しました:', sheetsError);

      // Google Sheetsが利用できない場合は、初期データを返す
      projects = getInitialProjects();
    }

    return NextResponse.json({ projects, source: projects.length > 0 ? 'sheets' : 'initial' });
  } catch (error) {
    console.error('プロジェクトデータの取得エラー:', error);

    // エラーの場合は初期データを返す
    const projects = getInitialProjects();
    return NextResponse.json({
      projects,
      source: 'initial',
      error: 'Google Sheetsからの読み込みに失敗したため、初期データを表示しています'
    });
  }
}

// プロジェクトデータを保存
export async function POST(request: NextRequest) {
  try {
    const { projects }: { projects: ProjectData[] } = await request.json();

    if (!Array.isArray(projects)) {
      return NextResponse.json({ error: '無効なデータ形式です' }, { status: 400 });
    }

    // Google Sheetsに保存
    await saveProjectsToSheets(projects);

    return NextResponse.json({
      success: true,
      message: `${projects.length}件のプロジェクトをGoogle Sheetsに保存しました`
    });
  } catch (error) {
    console.error('プロジェクトデータの保存エラー:', error);
    return NextResponse.json({
      error: 'データの保存に失敗しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 初期プロジェクトデータ（Google Sheetsが利用できない場合のフォールバック）
function getInitialProjects(): ProjectData[] {
  return [
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
    }
  ];
}