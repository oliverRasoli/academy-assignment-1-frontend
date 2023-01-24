import { Database } from './database.types';

export type Db = Database['public']['Tables'];

export type Dogs = Db['dogs']['Row'];

export type Profiles = Db['profiles']['Row'];
