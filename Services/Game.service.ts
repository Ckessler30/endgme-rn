import { supabase } from '@/config/supabase';
import { Game } from '@/types/Games';

export class GameService {
  static async getGames(): Promise<Game[]> {
    try {
      const { data, error } = await supabase.from('games').select('*');
      if (error) throw error;
      return data as Game[];
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  }
}
