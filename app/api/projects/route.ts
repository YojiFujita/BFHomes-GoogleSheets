import { NextRequest, NextResponse } from 'next/server';
import { saveProjectsToSheets, loadProjectsFromSheets, ProjectData } from '../../../lib/google-sheets';

// プロジェクトデータを取得
export async function GET() {
  try {
    // Google Sheetsからデータを取得
    const projects = await loadProjectsFromSheets();

    return NextResponse.json({
      projects,
      source: 'sheets',
      count: projects.length
    });
  } catch (error) {
    console.error('Google Sheetsからの読み込みエラー:', error);
    return NextResponse.json({
      projects: [],
      source: 'error',
      error: 'Google Sheetsからのデータ読み込みに失敗しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
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

