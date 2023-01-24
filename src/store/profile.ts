import { Profiles } from 'types/data-types-exports';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type ProfileStore = {
  profile: Profiles | null;
  setProfile: (profile: Profiles) => void;
  resetProfile: () => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      resetProfile: () => set({ profile: null }),
    }),
    {
      name: 'profile-storage',
    }
  )
);
