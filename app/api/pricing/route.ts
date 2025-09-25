import { NextRequest, NextResponse } from 'next/server';
import { savePricingToSheets, loadPricingFromSheets, PricingData } from '../../../lib/google-sheets';

// 料金データを取得
export async function GET() {
  try {
    // Google Sheetsからデータを取得
    const pricingData = await loadPricingFromSheets();

    return NextResponse.json({
      pricingData,
      source: 'sheets',
      count: pricingData.length
    });
  } catch (error) {
    console.error('Google Sheetsからの料金データ読み込みエラー:', error);
    return NextResponse.json({
      pricingData: [],
      source: 'error',
      error: 'Google Sheetsからのデータ読み込みに失敗しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
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

