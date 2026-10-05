import { getAccessToken } from './googleAuth';

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  iconLink?: string;
  modifiedTime?: string;
  size?: string;
  owners?: { displayName: string; emailAddress: string }[];
  parents?: string[];
}

export const GoogleDriveService = {
  /**
   * List files in Google Drive
   */
  async listFiles(query = '', pageSize = 25): Promise<{ files: GoogleDriveFile[]; nextPageToken?: string }> {
    const token = await getAccessToken();
    if (!token) throw new Error('Not authenticated with Google. Please sign in first.');

    const fields = 'files(id, name, mimeType, webViewLink, iconLink, modifiedTime, size, owners, parents),nextPageToken';
    const params = new URLSearchParams({
      pageSize: pageSize.toString(),
      fields,
      orderBy: 'modifiedTime desc',
    });

    if (query) {
      params.append('q', query);
    } else {
      // Exclude trashed files by default
      params.append('q', 'trashed = false');
    }

    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Drive API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  },

  /**
   * Create a folder in Google Drive
   */
  async createFolder(name: string, parentId?: string): Promise<GoogleDriveFile> {
    const token = await getAccessToken();
    if (!token) throw new Error('Not authenticated with Google. Please sign in first.');

    const metadata: Record<string, any> = {
      name,
      mimeType: 'application/vnd.google-apps.folder',
    };

    if (parentId) {
      metadata.parents = [parentId];
    }

    const res = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to create folder: ${res.status}`);
    }

    return await res.json();
  },

  /**
   * Create / upload a file with content (multipart upload)
   */
  async createFile(
    name: string,
    content: string,
    mimeType = 'text/plain',
    parentId?: string
  ): Promise<GoogleDriveFile> {
    const token = await getAccessToken();
    if (!token) throw new Error('Not authenticated with Google. Please sign in first.');

    const metadata: Record<string, any> = {
      name,
      mimeType,
    };

    if (parentId) {
      metadata.parents = [parentId];
    }

    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      `Content-Type: ${mimeType}\r\n\r\n` +
      content +
      closeDelimiter;

    const res = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to upload file to Drive: ${res.status}`);
    }

    return await res.json();
  },

  /**
   * Delete a file from Google Drive
   * NOTE: Per workspace-integration rules, an explicit user confirmation must be gathered in UI before calling this!
   */
  async deleteFile(fileId: string): Promise<boolean> {
    const token = await getAccessToken();
    if (!token) throw new Error('Not authenticated with Google. Please sign in first.');

    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok && res.status !== 204) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to delete file: ${res.status}`);
    }

    return true;
  }
};
