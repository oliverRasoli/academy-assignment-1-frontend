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
      Dogs: {
        Row: {
          id: number
          race_name: string
          reason: string
        }
        Insert: {
          id?: number
          race_name: string
          reason: string
        }
        Update: {
          id?: number
          race_name?: string
          reason?: string
        }
      }
      Profiles: {
        Row: {
          created_at: string | null
          id: number
          password: string
          username: string
          uuid: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          password: string
          username: string
          uuid: string
        }
        Update: {
          created_at?: string | null
          id?: number
          password?: string
          username?: string
          uuid?: string
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
