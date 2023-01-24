export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      dogs: {
        Row: {
          description: string
          id: number
          race_name: string
          uuid: string
        }
        Insert: {
          description: string
          id?: number
          race_name: string
          uuid: string
        }
        Update: {
          description?: string
          id?: number
          race_name?: string
          uuid?: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          password: string
          username: string
        }
        Insert: {
          created_at: string
          id?: string
          password: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
