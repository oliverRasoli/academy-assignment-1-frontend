import { Database } from './database.types';

export type Db = Database['public']['Tables'];

export type Dogs = Db['Dogs']['Row'];
