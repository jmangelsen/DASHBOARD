import { getAccessToken } from './googleAuth';

export interface SheetMetadata {
  spreadsheetId: string;
  properties: {
    title: string;
    locale?: string;
  };
  sheets: {
    properties: {
      sheetId: number;
      title: string;
      gridProperties?: {
        rowCount: number;
        columnCount: number;
      };
    };
  }[];
  spreadsheetUrl: string;
}

export const GoogleSheetsService = {
  /**
   * Create a new Google Spreadsheet with optional initial data
   */
  async createSpreadsheet(
    title: string,
    initialSheetTitle = 'Data',
    initialRows?: (string | number)[][]
  ): Promise<SheetMetadata> {
    const token = await getAccessToken();
    if (!token) throw new Error('Not authenticated with Google. Please sign in first.');

    const body: Record<string, any> = {
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: initialSheetTitle,
          },
        },
      ],
    };

    const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to create spreadsheet: ${res.status}`);
    }

    const created = (await res.json()) as SheetMetadata;

    // If initial rows provided, append or write them to the first sheet
    if (initialRows && initialRows.length > 0) {
      await this.appendRows(created.spreadsheetId, `${initialSheetTitle}!A1`, initialRows);
    }

    return created;
  },

  /**
   * Get spreadsheet metadata (title, tabs)
   */
  async getSpreadsheet(spreadsheetId: string): Promise<SheetMetadata> {
    const token = await getAccessToken();
    if (!token) throw new Error('Not authenticated with Google. Please sign in first.');

    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to get spreadsheet metadata: ${res.status}`);
    }

    return await res.json();
  },

  /**
   * Read values from range
   */
  async readRange(spreadsheetId: string, range: string): Promise<(string | number)[][]> {
    const token = await getAccessToken();
    if (!token) throw new Error('Not authenticated with Google. Please sign in first.');

    const encodedRange = encodeURIComponent(range);
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to read range ${range}: ${res.status}`);
    }

    const data = await res.json();
    return data.values || [];
  },

  /**
   * Append rows to a spreadsheet
   */
  async appendRows(
    spreadsheetId: string,
    range: string,
    values: (string | number)[][]
  ): Promise<{ updatedRows: number; updatedColumns: number }> {
    const token = await getAccessToken();
    if (!token) throw new Error('Not authenticated with Google. Please sign in first.');

    const encodedRange = encodeURIComponent(range);
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to append rows to sheet: ${res.status}`);
    }

    const data = await res.json();
    return {
      updatedRows: data.updates?.updatedRows || values.length,
      updatedColumns: data.updates?.updatedColumns || (values[0]?.length ?? 0),
    };
  }
};
