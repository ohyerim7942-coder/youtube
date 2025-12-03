import { SavedScript } from '../types';

const STORAGE_KEY = 'youtube_creator_scripts';

export const storageService = {
  // 모든 대본 가져오기 (최신순)
  getAllScripts(): SavedScript[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const scripts: SavedScript[] = JSON.parse(data);
      return scripts.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error('Failed to load scripts:', error);
      return [];
    }
  },

  // 대본 저장
  saveScript(script: Omit<SavedScript, 'id' | 'createdAt'>): SavedScript {
    try {
      const scripts = this.getAllScripts();
      const newScript: SavedScript = {
        ...script,
        id: `script_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
      };
      scripts.push(newScript);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
      return newScript;
    } catch (error) {
      console.error('Failed to save script:', error);
      throw new Error('대본 저장에 실패했습니다.');
    }
  },

  // 대본 삭제
  deleteScript(id: string): void {
    try {
      const scripts = this.getAllScripts();
      const filtered = scripts.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete script:', error);
      throw new Error('대본 삭제에 실패했습니다.');
    }
  },

  // 특정 대본 가져오기
  getScript(id: string): SavedScript | null {
    try {
      const scripts = this.getAllScripts();
      return scripts.find(s => s.id === id) || null;
    } catch (error) {
      console.error('Failed to get script:', error);
      return null;
    }
  },

  // 임시 저장 (자동 저장용)
  saveTempScript(script: Omit<SavedScript, 'id' | 'createdAt'>): void {
    try {
      sessionStorage.setItem('temp_script', JSON.stringify({
        ...script,
        createdAt: Date.now(),
      }));
    } catch (error) {
      console.error('Failed to save temp script:', error);
    }
  },

  // 임시 저장된 대본 가져오기
  getTempScript(): SavedScript | null {
    try {
      const data = sessionStorage.getItem('temp_script');
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get temp script:', error);
      return null;
    }
  },

  // 임시 저장 삭제
  clearTempScript(): void {
    try {
      sessionStorage.removeItem('temp_script');
    } catch (error) {
      console.error('Failed to clear temp script:', error);
    }
  },
};
