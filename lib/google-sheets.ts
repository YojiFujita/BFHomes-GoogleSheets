import { google } from 'googleapis';

// Google Sheets API の設定
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// 環境変数からGoogle認証情報を取得
const getGoogleAuth = () => {
  try {
    // サービスアカウントキーがある場合
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      return new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
      });
    }

    // 個別の環境変数がある場合
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      return new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: SCOPES,
      });
    }

    throw new Error('Google認証情報が設定されていません');
  } catch (error) {
    console.error('Google認証エラー:', error);
    throw error;
  }
};

// Google Sheetsクライアントを取得
export const getSheetsClient = async () => {
  const auth = getGoogleAuth();
  const authClient = await auth.getClient();
  return google.sheets({ version: 'v4', auth: authClient as any });
};

// スプレッドシートID（環境変数から取得）
export const getSpreadsheetId = () => {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SPREADSHEET_ID環境変数が設定されていません');
  }
  return spreadsheetId;
};

// プロジェクトデータをGoogle Sheetsに保存
export interface ProjectData {
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
  featured?: boolean;
}

export const saveProjectsToSheets = async (projects: ProjectData[]) => {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // ヘッダー行
    const headers = [
      'ID', 'タイトル', 'カテゴリー', 'Before画像', 'After画像',
      '説明', '価格', '工期', '場所', '完成日', '面積', '人気', 'フィーチャー'
    ];

    // データ行を準備
    const values = [
      headers,
      ...projects.map(project => [
        project.id,
        project.title,
        project.category,
        project.before,
        project.after,
        project.description,
        project.price,
        project.period,
        project.location,
        project.date,
        project.area,
        project.popular ? 'TRUE' : 'FALSE',
        project.featured ? 'TRUE' : 'FALSE'
      ])
    ];

    // シートをクリアしてからデータを追加
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Projects!A:M',
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Projects!A1',
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    console.log(`${projects.length}件のプロジェクトをGoogle Sheetsに保存しました`);
    return true;
  } catch (error) {
    console.error('Google Sheetsへの保存エラー:', error);
    throw error;
  }
};

// Google Sheetsからプロジェクトデータを読み込み
export const loadProjectsFromSheets = async (): Promise<ProjectData[]> => {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Projects!A:M',
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      return [];
    }

    // ヘッダー行をスキップしてデータを変換
    const projects: ProjectData[] = rows.slice(1).map(row => ({
      id: parseInt(row[0]) || 0,
      title: row[1] || '',
      category: row[2] || 'modern',
      before: row[3] || '',
      after: row[4] || '',
      description: row[5] || '',
      price: row[6] || '',
      period: row[7] || '',
      location: row[8] || '',
      date: row[9] || '',
      area: row[10] || '',
      popular: row[11] === 'TRUE',
      featured: row[12] === 'TRUE'
    }));

    console.log(`Google Sheetsから${projects.length}件のプロジェクトを読み込みました`);
    return projects;
  } catch (error) {
    console.error('Google Sheetsからの読み込みエラー:', error);
    throw error;
  }
};

// 料金データをGoogle Sheetsに保存
export interface PricingData {
  id: number;
  serviceType: string;
  name: string;
  price: number;
  displayPrice: string;
  description?: string;
  category: string;
}

export const savePricingToSheets = async (pricingData: PricingData[]) => {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const headers = ['ID', 'サービス種別', 'サービス名', '価格', '表示価格', '説明', 'カテゴリー'];

    const values = [
      headers,
      ...pricingData.map(item => [
        item.id,
        item.serviceType,
        item.name,
        item.price,
        item.displayPrice,
        item.description || '',
        item.category
      ])
    ];

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Pricing!A:G',
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Pricing!A1',
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    console.log(`${pricingData.length}件の料金データをGoogle Sheetsに保存しました`);
    return true;
  } catch (error) {
    console.error('料金データの保存エラー:', error);
    throw error;
  }
};

// Google Sheetsから料金データを読み込み
export const loadPricingFromSheets = async (): Promise<PricingData[]> => {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Pricing!A:G',
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      return [];
    }

    const pricingData: PricingData[] = rows.slice(1).map(row => ({
      id: parseInt(row[0]) || 0,
      serviceType: row[1] || '',
      name: row[2] || '',
      price: parseInt(row[3]) || 0,
      displayPrice: row[4] || '',
      description: row[5] || '',
      category: row[6] || ''
    }));

    console.log(`Google Sheetsから${pricingData.length}件の料金データを読み込みました`);
    return pricingData;
  } catch (error) {
    console.error('料金データの読み込みエラー:', error);
    throw error;
  }
};