import { NextRequest, NextResponse } from 'next/server';
import { savePricingToSheets, loadPricingFromSheets, PricingData } from '../../../lib/google-sheets';

// 料金データを取得
export async function GET() {
  try {
    // まずGoogle Sheetsからデータを取得を試行
    let pricingData: PricingData[] = [];

    try {
      pricingData = await loadPricingFromSheets();
    } catch (sheetsError) {
      console.warn('Google Sheetsからの料金データ読み込みに失敗しました:', sheetsError);

      // Google Sheetsが利用できない場合は、初期データを返す
      pricingData = getInitialPricingData();
    }

    return NextResponse.json({
      pricingData,
      source: pricingData.length > 0 ? 'sheets' : 'initial'
    });
  } catch (error) {
    console.error('料金データの取得エラー:', error);

    // エラーの場合は初期データを返す
    const pricingData = getInitialPricingData();
    return NextResponse.json({
      pricingData,
      source: 'initial',
      error: 'Google Sheetsからの読み込みに失敗したため、初期データを表示しています'
    });
  }
}

// 料金データを保存
export async function POST(request: NextRequest) {
  try {
    const { pricingData }: { pricingData: PricingData[] } = await request.json();

    if (!Array.isArray(pricingData)) {
      return NextResponse.json({ error: '無効なデータ形式です' }, { status: 400 });
    }

    // Google Sheetsに保存
    await savePricingToSheets(pricingData);

    return NextResponse.json({
      success: true,
      message: `${pricingData.length}件の料金データをGoogle Sheetsに保存しました`
    });
  } catch (error) {
    console.error('料金データの保存エラー:', error);
    return NextResponse.json({
      error: 'データの保存に失敗しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 初期料金データ（Google Sheetsが利用できない場合のフォールバック）
function getInitialPricingData(): PricingData[] {
  return [
    {
      id: 1,
      serviceType: 'basic',
      name: 'CF（クッションフロア）張り替え',
      price: 0,
      displayPrice: '基本料金に含む',
      description: '耐久性の高いクッションフロアへの張り替え',
      category: '基本サービス'
    },
    {
      id: 2,
      serviceType: 'basic',
      name: '壁紙張り替え',
      price: 0,
      displayPrice: '基本料金に含む',
      description: '高品質な壁紙への張り替え',
      category: '基本サービス'
    },
    {
      id: 3,
      serviceType: 'basic',
      name: '簡易補修',
      price: 0,
      displayPrice: '基本料金に含む',
      description: '壁や天井の簡易的な補修作業',
      category: '基本サービス'
    },
    {
      id: 4,
      serviceType: 'basic',
      name: 'ハウスクリーニング',
      price: 0,
      displayPrice: '基本料金に含む',
      description: '専門業者による徹底的な清掃',
      category: '基本サービス'
    },
    {
      id: 5,
      serviceType: 'option',
      name: '天井張替え',
      price: 30000,
      displayPrice: '30,000円～',
      description: '天井材の交換と補修',
      category: 'オプション'
    },
    {
      id: 6,
      serviceType: 'option',
      name: '照明アップグレード（間接照明・LED）',
      price: 20000,
      displayPrice: '20,000円～',
      description: 'LED照明や間接照明の設置',
      category: 'オプション'
    },
    {
      id: 7,
      serviceType: 'option',
      name: '水回り簡易改修（キッチン・洗面台など）',
      price: 50000,
      displayPrice: '50,000円～',
      description: 'キッチンや洗面台の簡易的な改修',
      category: 'オプション'
    },
    {
      id: 8,
      serviceType: 'additional',
      name: '現地調査',
      price: 0,
      displayPrice: '無料',
      description: '専門スタッフによる詳細な現地調査',
      category: '追加サービス'
    },
    {
      id: 9,
      serviceType: 'additional',
      name: '3D完成イメージ',
      price: 10000,
      displayPrice: '10,000円',
      description: '完成後のイメージを3Dで確認',
      category: '追加サービス'
    },
    {
      id: 10,
      serviceType: 'additional',
      name: '解体・廃材処理',
      price: 5000,
      displayPrice: '5,000円/㎡',
      description: '既存材の解体と適切な廃材処理',
      category: '追加サービス'
    }
  ];
}